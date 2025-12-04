import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface KYCData {
  webhookUrl: string;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  organization: {
    companyName: string;
    companyWebsite: string;
    companyEmail: string;
  };
  solutions: {
    whiteLabel: boolean;
    exchange: boolean;
    casinoGames: boolean;
    customGame: boolean;
    paymentGateway: boolean;
    fraudDetection: boolean;
    exchangeApi: boolean;
    mobileApps: boolean;
    liveDealer: boolean;
    regulatory: boolean;
    customPayment: boolean;
    devTeam: boolean;
  };
  hasPassportPhoto: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: KYCData = await req.json();
    
    console.log("Received KYC data:", JSON.stringify(data, null, 2));

    // Convert solutions to readable list
    const selectedSolutions: string[] = [];
    if (data.solutions.whiteLabel) selectedSolutions.push("White-Label Casino Platform");
    if (data.solutions.exchange) selectedSolutions.push("Exchange Solutions");
    if (data.solutions.casinoGames) selectedSolutions.push("Casino Games (1,000+ titles)");
    if (data.solutions.customGame) selectedSolutions.push("Custom Game Development");
    if (data.solutions.paymentGateway) selectedSolutions.push("Payment Gateway Integration");
    if (data.solutions.fraudDetection) selectedSolutions.push("AI-Powered Fraud Detection");
    if (data.solutions.exchangeApi) selectedSolutions.push("Exchange API");
    if (data.solutions.mobileApps) selectedSolutions.push("White-Label Mobile Apps");
    if (data.solutions.liveDealer) selectedSolutions.push("Live Dealer Studio Setup");
    if (data.solutions.regulatory) selectedSolutions.push("Regulatory Consultation");
    if (data.solutions.customPayment) selectedSolutions.push("Custom Payment Integration");
    if (data.solutions.devTeam) selectedSolutions.push("Dedicated Development Team");

    // Prepare data for Google Sheets
    const sheetData = {
      timestamp: new Date().toISOString(),
      name: data.personalInfo.name,
      email: data.personalInfo.email,
      phone: data.personalInfo.phone,
      address: data.personalInfo.address,
      companyName: data.organization.companyName,
      companyWebsite: data.organization.companyWebsite,
      companyEmail: data.organization.companyEmail,
      solutions: selectedSolutions.join(", "),
      hasPassportPhoto: data.hasPassportPhoto ? "Yes" : "No",
    };

    console.log("Sending to Google Sheets:", JSON.stringify(sheetData, null, 2));

    // Send to Google Apps Script webhook
    const response = await fetch(data.webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sheetData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Sheets webhook error:", errorText);
      throw new Error(`Webhook failed: ${response.status}`);
    }

    console.log("Successfully sent to Google Sheets");

    return new Response(
      JSON.stringify({ success: true, message: "KYC data sent to Google Sheets" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in submit-kyc-to-sheets:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
