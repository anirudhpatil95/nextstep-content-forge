
-- This is a reference file for SQL functions that need to be created in your Supabase project
-- You can copy and paste these into the Supabase SQL Editor

-- Function to create brands table
CREATE OR REPLACE FUNCTION create_brands_table()
RETURNS void AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS public.brands (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    brand_name TEXT NOT NULL,
    description TEXT NOT NULL,
    company_vibe TEXT NOT NULL,
    custom_vibe TEXT,
    selling_points TEXT NOT NULL,
    emotion TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
  );
  
  -- Add RLS policies
  ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
  
  DROP POLICY IF EXISTS "Users can view their own brands" ON public.brands;
  CREATE POLICY "Users can view their own brands"
    ON public.brands
    FOR SELECT
    USING (auth.uid() = user_id);
    
  DROP POLICY IF EXISTS "Users can create their own brands" ON public.brands;
  CREATE POLICY "Users can create their own brands"
    ON public.brands
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);
    
  DROP POLICY IF EXISTS "Users can update their own brands" ON public.brands;
  CREATE POLICY "Users can update their own brands"
    ON public.brands
    FOR UPDATE
    USING (auth.uid() = user_id);
    
  DROP POLICY IF EXISTS "Users can delete their own brands" ON public.brands;
  CREATE POLICY "Users can delete their own brands"
    ON public.brands
    FOR DELETE
    USING (auth.uid() = user_id);
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
    brand_id UUID NOT NULL REFERENCES public.brands(id) ON DELETE CASCADE,
    content_type TEXT NOT NULL,
    prompt TEXT NOT NULL,
    generated_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
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
        WHERE public.brands.id = public.generated_content.brand_id
        AND public.brands.user_id = auth.uid()
      )
    );
    
  DROP POLICY IF EXISTS "Users can create content for their brands" ON public.generated_content;
  CREATE POLICY "Users can create content for their brands"
    ON public.generated_content
    FOR INSERT
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM public.brands
        WHERE public.brands.id = public.generated_content.brand_id
        AND public.brands.user_id = auth.uid()
      )
    );
    
  DROP POLICY IF EXISTS "Users can delete their own content" ON public.generated_content;
  CREATE POLICY "Users can delete their own content"
    ON public.generated_content
    FOR DELETE
    USING (
      EXISTS (
        SELECT 1 FROM public.brands
        WHERE public.brands.id = public.generated_content.brand_id
        AND public.brands.user_id = auth.uid()
      )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
