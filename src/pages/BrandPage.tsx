
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface Brand {
  id: string;
  brand_name: string;
  description: string;
  company_vibe: string;
  custom_vibe?: string;
  selling_points: string;
  emotion?: string;
  created_at: string;
  user_id: string;
}

interface GeneratedContent {
  id?: string;
  brand_id: string;
  content_type: string;
  prompt: string;
  generated_text: string;
  created_at?: string;
}

const CONTENT_TYPES = [
  { value: "social_post", label: "Social Media Post" },
  { value: "email_subject", label: "Email Subject Line" },
  { value: "email_body", label: "Email Body" },
  { value: "product_description", label: "Product Description" },
  { value: "ad_copy", label: "Advertisement Copy" },
];

const BrandPage = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [generatingContent, setGeneratingContent] = useState(false);
  const [contentHistory, setContentHistory] = useState<GeneratedContent[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  
  const [contentRequest, setContentRequest] = useState({
    contentType: "social_post",
    prompt: "",
    generatedText: "",
  });

  useEffect(() => {
    if (!brandId || !user) return;
    
    const fetchBrand = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('brands')
          .select('*')
          .eq('id', brandId)
          .eq('user_id', user.id)
          .single();
        
        if (error) throw error;
        
        if (!data) {
          toast.error("Brand not found");
          navigate('/dashboard');
          return;
        }
        
        setBrand(data);
        
        // Auto-populate a default prompt based on the brand
        setContentRequest(prev => ({
          ...prev,
          prompt: `Create a ${prev.contentType === 'social_post' ? 'social media post' : prev.contentType.replace('_', ' ')} for ${data.brand_name} that highlights its key selling points and matches its ${data.company_vibe} vibe.`,
        }));
        
      } catch (error) {
        console.error('Error fetching brand:', error);
        toast.error('Failed to load brand information');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    
    const fetchContentHistory = async () => {
      try {
        setLoadingHistory(true);
        
        const { data, error } = await supabase
          .from('generated_content')
          .select('*')
          .eq('brand_id', brandId)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setContentHistory(data || []);
      } catch (error) {
        console.error('Error fetching content history:', error);
      } finally {
        setLoadingHistory(false);
      }
    };
    
    fetchBrand();
    fetchContentHistory();
  }, [brandId, user, navigate]);

  const handleContentTypeChange = (value: string) => {
    setContentRequest(prev => {
      const contentTypeLabel = CONTENT_TYPES.find(t => t.value === value)?.label || value.replace('_', ' ');
      
      return {
        ...prev,
        contentType: value,
        prompt: brand ? `Create a ${contentTypeLabel} for ${brand.brand_name} that highlights its key selling points and matches its ${brand.company_vibe} vibe.` : prev.prompt,
      };
    });
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentRequest(prev => ({
      ...prev,
      prompt: e.target.value,
    }));
  };

  const handleGenerateContent = async () => {
    if (!brand || !contentRequest.prompt.trim()) {
      toast.error('Please enter a prompt to generate content');
      return;
    }

    try {
      setGeneratingContent(true);
      
      // Here we would normally call an AI service
      // For now, let's simulate a response based on the brand
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate content based on the brand and prompt
      const emotion = brand.emotion || 'neutral';
      const vibe = brand.company_vibe;
      const brandName = brand.brand_name;
      const sellingPoints = brand.selling_points;
      
      let generatedText = '';
      
      switch (contentRequest.contentType) {
        case 'social_post':
          generatedText = `✨ Looking for ${emotion === 'Joy' ? 'exciting' : emotion === 'Trust' ? 'reliable' : 'innovative'} solutions? ${brandName} delivers with our ${vibe} approach!\n\n${sellingPoints.split(".")[0]}.\n\n#${brandName.replace(/\s+/g, '')} #${vibe} #Innovation`;
          break;
        case 'email_subject':
          generatedText = `Discover how ${brandName}'s ${vibe} solutions can transform your experience`;
          break;
        case 'email_body':
          generatedText = `Dear Valued Customer,\n\nWe're excited to share with you our latest ${vibe} innovations at ${brandName}.\n\nOur team has been working tirelessly to create solutions that are not only effective but also embody the ${emotion} feeling that our brand represents.\n\n${sellingPoints}\n\nDiscover more about what we offer and how we can help you achieve your goals.\n\nBest regards,\nThe ${brandName} Team`;
          break;
        case 'product_description':
          generatedText = `Introducing the latest offering from ${brandName}, designed with our signature ${vibe} approach. This product embodies ${emotion} and delivers exceptional results.\n\n${sellingPoints}\n\nExperience the difference with ${brandName}.`;
          break;
        case 'ad_copy':
          generatedText = `${brandName} | ${vibe.toUpperCase()} SOLUTIONS\n\n${sellingPoints.split(".")[0]}.\n\nDiscover the power of ${emotion} in every experience. Click now to transform your expectations.`;
          break;
        default:
          generatedText = `Content for ${brandName} featuring our ${vibe} approach and ${sellingPoints}.`;
      }
      
      setContentRequest(prev => ({
        ...prev,
        generatedText,
      }));
      
      // Save to database
      const newContent: GeneratedContent = {
        brand_id: brandId!,
        content_type: contentRequest.contentType,
        prompt: contentRequest.prompt,
        generated_text: generatedText,
      };
      
      const { data, error } = await supabase
        .from('generated_content')
        .insert(newContent)
        .select();
      
      if (error) throw error;
      
      // Update content history
      if (data) {
        setContentHistory(prev => [data[0], ...prev]);
      }
      
      toast.success('Content generated successfully');
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Failed to generate content');
    } finally {
      setGeneratingContent(false);
    }
  };

  const handleCopyContent = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const handleDeleteContent = async (contentId: string) => {
    try {
      const { error } = await supabase
        .from('generated_content')
        .delete()
        .eq('id', contentId);
      
      if (error) throw error;
      
      setContentHistory(prev => prev.filter(item => item.id !== contentId));
      toast.success('Content deleted');
    } catch (error) {
      console.error('Error deleting content:', error);
      toast.error('Failed to delete content');
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
          <LoadingSpinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  if (!brand) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Brand Not Found</h2>
                <p className="text-muted-foreground mb-4">
                  The brand you're looking for doesn't exist or you don't have access to it.
                </p>
                <Button onClick={() => navigate('/dashboard')}>
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/dashboard')}
                className="mb-2"
              >
                ← Back to Dashboard
              </Button>
            </div>
            <h1 className="text-3xl font-bold">{brand.brand_name}</h1>
            <p className="text-muted-foreground">{brand.company_vibe} brand profile</p>
          </div>
        </div>

        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="generate">Generate Content</TabsTrigger>
            <TabsTrigger value="history">Content History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Generator</CardTitle>
                <CardDescription>
                  Generate content that matches your brand's vibe and emotion.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="content-type">Content Type</Label>
                      <Select 
                        value={contentRequest.contentType} 
                        onValueChange={handleContentTypeChange}
                      >
                        <SelectTrigger id="content-type">
                          <SelectValue placeholder="Select content type" />
                        </SelectTrigger>
                        <SelectContent>
                          {CONTENT_TYPES.map(type => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="prompt">Prompt</Label>
                      <Textarea
                        id="prompt"
                        value={contentRequest.prompt}
                        onChange={handlePromptChange}
                        rows={4}
                        placeholder="Enter your prompt..."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        onClick={handleGenerateContent} 
                        className="nextstep-button w-full"
                        disabled={generatingContent || !contentRequest.prompt.trim()}
                      >
                        {generatingContent && <LoadingSpinner size="sm" className="mr-2" />}
                        {generatingContent ? 'Generating...' : 'Generate Content'}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Label htmlFor="generated-content">Generated Content</Label>
                    <div className="relative">
                      <Textarea
                        id="generated-content"
                        value={contentRequest.generatedText}
                        readOnly
                        rows={10}
                        placeholder="Your generated content will appear here..."
                        className="resize-none bg-gray-50"
                      />
                      {contentRequest.generatedText && (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute top-2 right-2 opacity-70 hover:opacity-100"
                          onClick={() => handleCopyContent(contentRequest.generatedText)}
                        >
                          Copy
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Brand Profile</CardTitle>
                <CardDescription>
                  Reference information about your brand
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Description</h3>
                    <p className="text-muted-foreground">{brand.description}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Key Selling Points</h3>
                    <p className="text-muted-foreground">{brand.selling_points}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Brand Vibe</h3>
                    <p className="text-muted-foreground">{brand.company_vibe}</p>
                  </div>
                  {brand.emotion && (
                    <div>
                      <h3 className="font-medium mb-2">Primary Emotion</h3>
                      <p className="text-muted-foreground">{brand.emotion}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            {loadingHistory ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : contentHistory.length > 0 ? (
              <div className="space-y-6">
                {contentHistory.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 border-b">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-lg">
                            {CONTENT_TYPES.find(t => t.value === item.content_type)?.label || item.content_type}
                          </CardTitle>
                          <CardDescription>
                            {new Date(item.created_at!).toLocaleString()}
                          </CardDescription>
                        </div>
                        <div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyContent(item.generated_text)}
                            className="mr-2"
                          >
                            Copy
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteContent(item.id!)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Prompt:</h4>
                        <p className="text-sm">{item.prompt}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Generated Content:</h4>
                        <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap">
                          {item.generated_text}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    No content has been generated for this brand yet.
                  </p>
                  <Button 
                    onClick={() => document.querySelector('[data-value="generate"]')?.dispatchEvent(new Event('click', { bubbles: true }))}
                  >
                    Generate Your First Content
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default BrandPage;
