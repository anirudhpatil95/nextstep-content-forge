
import { createClient } from '@supabase/supabase-js';

// Default to empty strings so the client can be created without errors
// These will be overridden when proper environment variables are set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Log a warning instead of an error to prevent app from crashing during development
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Missing Supabase environment variables. The app will not be able to connect to Supabase until these are provided.');
  console.warn('To fix this, add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY;
};

// Helper function to initialize database schema
export const initializeDatabase = async () => {
  if (!isSupabaseConfigured()) {
    console.warn('Cannot initialize database: Supabase is not configured');
    return;
  }

  try {
    // Check if tables exist and create them if they don't
    // Note: This should normally be done through migrations, but this is a simple approach
    
    // Check if the brands table exists
    const { error: brandTableError } = await supabase.from('brands').select('id').limit(1);
    
    if (brandTableError && brandTableError.code === '42P01') { // Table doesn't exist
      console.log('Creating brands table...');
      // Create brands table
      const { error } = await supabase.rpc('create_brands_table');
      if (error) console.error('Error creating brands table:', error);
    }
    
    // Check if the vibe_matrix table exists
    const { error: vibeMatrixTableError } = await supabase.from('vibe_matrix').select('id').limit(1);
    
    if (vibeMatrixTableError && vibeMatrixTableError.code === '42P01') { // Table doesn't exist
      console.log('Creating vibe_matrix table...');
      // Create vibe_matrix table
      const { error } = await supabase.rpc('create_vibe_matrix_table');
      if (error) console.error('Error creating vibe_matrix table:', error);
    }
    
    // Check if the generated_content table exists
    const { error: contentTableError } = await supabase.from('generated_content').select('id').limit(1);
    
    if (contentTableError && contentTableError.code === '42P01') { // Table doesn't exist
      console.log('Creating generated_content table...');
      // Create generated_content table
      const { error } = await supabase.rpc('create_generated_content_table');
      if (error) console.error('Error creating generated_content table:', error);
    }
    
    console.log('Database initialization complete');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Initialize standard vibes in the vibe matrix
export const initializeVibeMatrix = async () => {
  if (!isSupabaseConfigured()) {
    console.warn('Cannot initialize vibe matrix: Supabase is not configured');
    return;
  }

  const standardVibes = [
    { vibe_name: "Modern", tone: "Contemporary, sleek", emotion: "Confident", description: "Clean, minimalist aesthetic with cutting-edge appeal" },
    { vibe_name: "Minimalist", tone: "Simple, direct", emotion: "Calm", description: "Stripped back, focuses on essentials with clean design" },
    { vibe_name: "Bold", tone: "Strong, assertive", emotion: "Energetic", description: "Makes a statement, stands out with confidence" },
    { vibe_name: "Vintage", tone: "Nostalgic, classic", emotion: "Sentimental", description: "Draws on past eras with retro charm" },
    { vibe_name: "Playful", tone: "Fun, lighthearted", emotion: "Joy", description: "Whimsical, casual, doesn't take itself too seriously" },
    { vibe_name: "Elegant", tone: "Refined, polished", emotion: "Sophisticated", description: "Upscale, luxurious, with attention to detail" },
    { vibe_name: "Casual", tone: "Relaxed, conversational", emotion: "Friendly", description: "Approachable, down-to-earth feel" },
    { vibe_name: "Technical", tone: "Precise, detailed", emotion: "Analytical", description: "Data-driven, focuses on specifications and expertise" },
    { vibe_name: "Corporate", tone: "Professional, formal", emotion: "Trustworthy", description: "Business-oriented, conveys stability and reliability" },
    { vibe_name: "Artistic", tone: "Creative, expressive", emotion: "Inspired", description: "Emphasizes imagination and unique perspective" },
    { vibe_name: "Luxurious", tone: "Premium, exclusive", emotion: "Desire", description: "High-end, focuses on quality and prestige" },
    { vibe_name: "Eco-friendly", tone: "Natural, conscientious", emotion: "Mindful", description: "Sustainable, environmental focus" },
    { vibe_name: "Rustic", tone: "Earthy, traditional", emotion: "Authentic", description: "Natural materials, handcrafted feel" },
    { vibe_name: "Futuristic", tone: "Innovative, forward-looking", emotion: "Wonder", description: "Cutting-edge, technology-focused" }
  ];

  try {
    for (const vibe of standardVibes) {
      // Check if vibe already exists
      const { data, error: checkError } = await supabase
        .from('vibe_matrix')
        .select('id')
        .eq('vibe_name', vibe.vibe_name)
        .single();
      
      if (checkError && checkError.code !== 'PGRST116') { // Not a "no rows returned" error
        console.error(`Error checking for vibe ${vibe.vibe_name}:`, checkError);
        continue;
      }
      
      if (!data) {
        // Vibe doesn't exist, insert it
        const { error: insertError } = await supabase
          .from('vibe_matrix')
          .insert(vibe);
        
        if (insertError) {
          console.error(`Error inserting vibe ${vibe.vibe_name}:`, insertError);
        } else {
          console.log(`Inserted vibe: ${vibe.vibe_name}`);
        }
      }
    }
    console.log('Vibe matrix initialization complete');
  } catch (error) {
    console.error('Error initializing vibe matrix:', error);
  }
};
