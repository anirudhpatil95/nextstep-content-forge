
# NextStep AI - Edge Function Setup Guide

This document provides step-by-step instructions for setting up the Edge Function for content generation in the NextStep AI application.

## What is an Edge Function?

An Edge Function is a serverless function that runs on Supabase's edge network. For NextStep AI, we use an Edge Function to generate content based on brand profiles.

## Prerequisites

1. A Supabase account with a project set up
2. Your SQL tables already created (see README-Supabase-Setup.md)

## Step 1: Set Up the Supabase CLI

You'll need the Supabase CLI to deploy edge functions. Here's how to set it up:

1. Install the Supabase CLI:
   - With npm: `npm install -g supabase`
   - With Homebrew (Mac): `brew install supabase/tap/supabase`

2. Log in to Supabase CLI:
   ```
   supabase login
   ```

## Step 2: Initialize Supabase in Your Project (if not done already)

1. Create a folder for your Supabase functions
2. Initialize Supabase:
   ```
   supabase init
   ```

## Step 3: Create the Edge Function

Instead of using the CLI, you can create the Edge Function directly from the Supabase dashboard:

1. Go to your Supabase project dashboard
2. Click on "Edge Functions" in the sidebar
3. Click "Create a new function"
4. Name your function "content-generator"
5. Copy and paste the following code into the editor:

```javascript
// content-generator.js - Edge Function for NextStep AI content generation

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
```

6. Click "Save" to create the function

## Step 4: Deploy the Edge Function

If you're creating the function through the Supabase dashboard, the function is automatically deployed when you save it.

## Step 5: Get the Function URL

1. After deployment, you'll see your function in the list of Edge Functions
2. Click on your function to view its details
3. Copy the "Function URL" - this is what your frontend will call to generate content

## Step 6: Test the Edge Function

You can test the function directly from your application:

1. Sign in to your NextStep AI application
2. Create a brand if you haven't already
3. Try to generate content for your brand
4. Check the browser console for any error messages

## Troubleshooting

If you encounter issues with the Edge Function:

1. Check the logs in the Supabase dashboard (Edge Functions section)
2. Verify your function URL is correct
3. Make sure your authentication is working properly (the function requires authentication)
4. Check that all required tables exist in your database

## Advanced: Integrating with OpenAI or Other AI Services

For a more sophisticated content generation, you could integrate with OpenAI's API:

1. Sign up for an OpenAI API key
2. Add the key as a secret in your Supabase project:
   ```
   supabase secrets set OPENAI_KEY=your_api_key
   ```
3. Modify the edge function to use the OpenAI API for content generation
