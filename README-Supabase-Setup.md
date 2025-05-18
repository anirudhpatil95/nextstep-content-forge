# NextStep AI - Supabase Setup Guide

This document provides step-by-step instructions for setting up your Supabase backend for the NextStep AI application.

## Prerequisites

1. A Supabase account (sign up at [https://supabase.com](https://supabase.com) if you don't have one)
2. Your NextStep AI frontend deployed (e.g., on Vercel)

## Step 1: Create a Supabase Project

1. Log in to your Supabase account
2. Click on "New Project" 
3. Enter a name for your project (e.g., "NextStep AI")
4. Set a strong database password (keep this safe)
5. Choose a region closest to your users
6. Click "Create Project"

## Step 2: Get Your Supabase Credentials

1. Once your project is created, go to the project dashboard
2. Click on "Settings" in the sidebar (gear icon)
3. Click on "API" in the submenu
4. Look for "Project URL" - this is your `SUPABASE_URL`
5. Look for "anon public" key - this is your `SUPABASE_ANON_KEY`

## Step 3: Set Up Environment Variables in Your Frontend Deployment

Add these environment variables to your deployment platform (e.g., Vercel):

1. `VITE_SUPABASE_URL` - set this to your Project URL
2. `VITE_SUPABASE_ANON_KEY` - set this to your anon public key

## Step 4: Create Database Tables Using SQL Functions

1. Go to your Supabase dashboard
2. Click on "SQL Editor" in the sidebar
3. Click "New Query"
4. Copy and paste the SQL from the section below into the editor
5. Click "Run" to execute the SQL

### SQL Script to Copy

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Function to create brands table
CREATE OR REPLACE FUNCTION create_brands_table()
RETURNS void AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS public.brands (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    brand_name TEXT NOT NULL,
    description TEXT NOT NULL,
    company_vibe TEXT NOT NULL,
    custom_vibe TEXT,
    selling_points TEXT NOT NULL,
    emotion TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
  );
  
  -- Add RLS policies
  ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
  
  DROP POLICY IF EXISTS "Users can view their own brands" ON public.brands;
  CREATE POLICY "Users can view their own brands"
    ON public.brands
    FOR SELECT
    USING (auth.uid()::uuid = user_id::uuid);
    
  DROP POLICY IF EXISTS "Users can create their own brands" ON public.brands;
  CREATE POLICY "Users can create their own brands"
    ON public.brands
    FOR INSERT
    WITH CHECK (auth.uid()::uuid = user_id::uuid);
    
  DROP POLICY IF EXISTS "Users can update their own brands" ON public.brands;
  CREATE POLICY "Users can update their own brands"
    ON public.brands
    FOR UPDATE
    USING (auth.uid()::uuid = user_id::uuid);
    
  DROP POLICY IF EXISTS "Users can delete their own brands" ON public.brands;
  CREATE POLICY "Users can delete their own brands"
    ON public.brands
    FOR DELETE
    USING (auth.uid()::uuid = user_id::uuid);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create vibe_matrix table
CREATE OR REPLACE FUNCTION create_vibe_matrix_table()
RETURNS void AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS public.vibe_matrix (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    vibe_name TEXT NOT NULL UNIQUE,
    tone TEXT NOT NULL,
    emotion TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
  );
  
  -- Add RLS policies
  ALTER TABLE public.vibe_matrix ENABLE ROW LEVEL SECURITY;
  
  DROP POLICY IF EXISTS "Everyone can view vibe_matrix" ON public.vibe_matrix;
  CREATE POLICY "Everyone can view vibe_matrix"
    ON public.vibe_matrix
    FOR SELECT
    TO authenticated
    USING (true);

  DROP POLICY IF EXISTS "Allow authenticated users to insert new vibes" ON public.vibe_matrix;
  CREATE POLICY "Allow authenticated users to insert new vibes"
    ON public.vibe_matrix
    FOR INSERT
    TO authenticated
    WITH CHECK (true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create generated_content table
CREATE OR REPLACE FUNCTION create_generated_content_table()
RETURNS void AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS public.generated_content (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    brand_id UUID NOT NULL,
    content_type TEXT NOT NULL,
    prompt TEXT NOT NULL,
    generated_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    FOREIGN KEY (brand_id) REFERENCES public.brands(id) ON DELETE CASCADE
  );
  
  -- Add RLS policies
  ALTER TABLE public.generated_content ENABLE ROW LEVEL SECURITY;
  
  DROP POLICY IF EXISTS "Users can view content for their brands" ON public.generated_content;
  CREATE POLICY "Users can view content for their brands"
    ON public.generated_content
    FOR SELECT
    USING (
      EXISTS (
        SELECT 1 FROM public.brands
        WHERE public.brands.id::uuid = public.generated_content.brand_id::uuid
        AND public.brands.user_id::uuid = auth.uid()::uuid
      )
    );
    
  DROP POLICY IF EXISTS "Users can create content for their brands" ON public.generated_content;
  CREATE POLICY "Users can create content for their brands"
    ON public.generated_content
    FOR INSERT
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM public.brands
        WHERE public.brands.id::uuid = public.generated_content.brand_id::uuid
        AND public.brands.user_id::uuid = auth.uid()::uuid
      )
    );
    
  DROP POLICY IF EXISTS "Users can delete their own content" ON public.generated_content;
  CREATE POLICY "Users can delete their own content"
    ON public.generated_content
    FOR DELETE
    USING (
      EXISTS (
        SELECT 1 FROM public.brands
        WHERE public.brands.id::uuid = public.generated_content.brand_id::uuid
        AND public.brands.user_id::uuid = auth.uid()::uuid
      )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Now let's call these functions to create the tables
SELECT create_brands_table();
SELECT create_vibe_matrix_table();
SELECT create_generated_content_table();

-- Initialize standard vibes in the vibe matrix (common for all users)
INSERT INTO public.vibe_matrix (vibe_name, tone, emotion, description)
VALUES
  ('Modern', 'Contemporary, sleek', 'Confident', 'Clean, minimalist aesthetic with cutting-edge appeal'),
  ('Minimalist', 'Simple, direct', 'Calm', 'Stripped back, focuses on essentials with clean design'),
  ('Bold', 'Strong, assertive', 'Energetic', 'Makes a statement, stands out with confidence'),
  ('Vintage', 'Nostalgic, classic', 'Sentimental', 'Draws on past eras with retro charm'),
  ('Playful', 'Fun, lighthearted', 'Joy', 'Whimsical, casual, doesn''t take itself too seriously'),
  ('Elegant', 'Refined, polished', 'Sophisticated', 'Upscale, luxurious, with attention to detail'),
  ('Casual', 'Relaxed, conversational', 'Friendly', 'Approachable, down-to-earth feel'),
  ('Technical', 'Precise, detailed', 'Analytical', 'Data-driven, focuses on specifications and expertise'),
  ('Corporate', 'Professional, formal', 'Trustworthy', 'Business-oriented, conveys stability and reliability'),
  ('Artistic', 'Creative, expressive', 'Inspired', 'Emphasizes imagination and unique perspective'),
  ('Luxurious', 'Premium, exclusive', 'Desire', 'High-end, focuses on quality and prestige'),
  ('Eco-friendly', 'Natural, conscientious', 'Mindful', 'Sustainable, environmental focus'),
  ('Rustic', 'Earthy, traditional', 'Authentic', 'Natural materials, handcrafted feel'),
  ('Futuristic', 'Innovative, forward-looking', 'Wonder', 'Cutting-edge, technology-focused')
ON CONFLICT (vibe_name) DO NOTHING;
```

## Step 5: Run Table Initialization From Your App

1. Load your frontend application
2. Sign up for an account or sign in if you already have one
3. The database tables will automatically be initialized when you first log in

## Troubleshooting

If you encounter issues with the database setup:

1. Check the browser console for error messages
2. Verify your environment variables are correctly set
3. Make sure you have executed the SQL function scripts
4. Check that the user has permission to create tables in Supabase
