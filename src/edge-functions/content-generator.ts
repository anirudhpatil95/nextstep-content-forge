
// This is a reference file for creating an Edge Function in your Supabase project
// Copy this code to your Supabase Edge Functions section

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

interface ContentRequest {
  brandId: string;
  contentType: string;
  prompt: string;
}

serve(async (req) => {
  // Create a Supabase client with the Auth context of the logged in user
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: { headers: { Authorization: req.headers.get("Authorization")! } },
    }
  );

  // Get the JWT token from the request
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  
  if (!token) {
    return new Response(
      JSON.stringify({ error: "No authorization token provided" }),
      { headers: { "Content-Type": "application/json" }, status: 401 }
    );
  }

  // Verify the user is authenticated
  const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
  
  if (userError || !userData.user) {
    return new Response(
      JSON.stringify({ error: "Invalid authorization token" }),
      { headers: { "Content-Type": "application/json" }, status: 401 }
    );
  }

  // Get the request body
  const contentRequest: ContentRequest = await req.json();
  const { brandId, contentType, prompt } = contentRequest;

  if (!brandId || !contentType || !prompt) {
    return new Response(
      JSON.stringify({ error: "Missing required fields" }),
      { headers: { "Content-Type": "application/json" }, status: 400 }
    );
  }

  try {
    // Verify the user owns this brand
    const { data: brandData, error: brandError } = await supabaseClient
      .from("brands")
      .select("*")
      .eq("id", brandId)
      .eq("user_id", userData.user.id)
      .single();
    
    if (brandError || !brandData) {
      return new Response(
        JSON.stringify({ error: "Brand not found or access denied" }),
        { headers: { "Content-Type": "application/json" }, status: 404 }
      );
    }
    
    // Get the vibe information
    const { data: vibeData, error: vibeError } = await supabaseClient
      .from("vibe_matrix")
      .select("*")
      .eq("vibe_name", brandData.company_vibe)
      .single();
    
    // Generate content based on the brand and vibe
    // In a real implementation, this would call an AI service
    // For now, we'll generate simple template-based content
    
    const brandName = brandData.brand_name;
    const brandDescription = brandData.description;
    const sellingPoints = brandData.selling_points;
    const emotion = brandData.emotion || (vibeData ? vibeData.emotion : "neutral");
    const vibe = brandData.company_vibe;
    
    let generatedText = "";
    
    switch (contentType) {
      case "social_post":
        generatedText = `✨ Looking for ${emotion === "Joy" ? "exciting" : emotion === "Trust" ? "reliable" : "innovative"} solutions? ${brandName} delivers with our ${vibe} approach!\n\n${sellingPoints.split(".")[0]}.\n\n#${brandName.replace(/\s+/g, "")} #${vibe} #Innovation`;
        break;
      case "email_subject":
        generatedText = `Discover how ${brandName}'s ${vibe} solutions can transform your experience`;
        break;
      case "email_body":
        generatedText = `Dear Valued Customer,\n\nWe're excited to share with you our latest ${vibe} innovations at ${brandName}.\n\nOur team has been working tirelessly to create solutions that are not only effective but also embody the ${emotion} feeling that our brand represents.\n\n${sellingPoints}\n\nDiscover more about what we offer and how we can help you achieve your goals.\n\nBest regards,\nThe ${brandName} Team`;
        break;
      case "product_description":
        generatedText = `Introducing the latest offering from ${brandName}, designed with our signature ${vibe} approach. This product embodies ${emotion} and delivers exceptional results.\n\n${sellingPoints}\n\nExperience the difference with ${brandName}.`;
        break;
      case "ad_copy":
        generatedText = `${brandName} | ${vibe.toUpperCase()} SOLUTIONS\n\n${sellingPoints.split(".")[0]}.\n\nDiscover the power of ${emotion} in every experience. Click now to transform your expectations.`;
        break;
      default:
        generatedText = `Content for ${brandName} featuring our ${vibe} approach and ${sellingPoints}.`;
    }
    
    // Store the generated content in the database
    const { data: contentData, error: contentError } = await supabaseClient
      .from("generated_content")
      .insert({
        brand_id: brandId,
        content_type: contentType,
        prompt: prompt,
        generated_text: generatedText,
      })
      .select()
      .single();
      
    if (contentError) {
      throw contentError;
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        content: contentData
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { "Content-Type": "application/json" }, status: 500 }
    );
  }
});
