import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { supabase } from "@/lib/supabase";
import { PlusCircle } from "lucide-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "@/components/ui/use-toast";

interface BrandFormData {
  brand_name: string;
  description: string;
  company_vibe: string;
  custom_vibe?: string;
  selling_points: string;
  emotion?: string;
}

interface BrandFormProps {
  onSubmit: (data: BrandFormData) => Promise<void>;
  initialData?: {
    brand_name: string;
    description: string;
    company_vibe: string;
    custom_vibe?: string;
    selling_points: string;
    emotion?: string;
  };
}

interface VibeOption {
  id: string;
  vibe_name: string;
}

const EMOTIONS = [
  "Joy", "Trust", "Fear", "Surprise", "Sadness", 
  "Anticipation", "Anger", "Confidence", "Calm", 
  "Energetic", "Sentimental", "Sophisticated", 
  "Friendly", "Analytical", "Trustworthy", "Inspired", 
  "Desire", "Mindful", "Authentic", "Wonder"
];

const BrandForm: React.FC<BrandFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<BrandFormData>({
    brand_name: initialData?.brand_name || "",
    description: initialData?.description || "",
    company_vibe: initialData?.company_vibe || "",
    custom_vibe: initialData?.custom_vibe || "",
    selling_points: initialData?.selling_points || "",
    emotion: initialData?.emotion || "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof BrandFormData, string>>>({});
  const [vibeOptions, setVibeOptions] = useState<VibeOption[]>([]);
  const [isLoadingVibes, setIsLoadingVibes] = useState(true);
  const [showCustomVibe, setShowCustomVibe] = useState(false);

  // Load vibe options from the database
  useEffect(() => {
    const fetchVibes = async () => {
      setIsLoadingVibes(true);
      try {
        const { data, error } = await supabase
          .from('vibe_matrix')
          .select('id, vibe_name')
          .order('vibe_name', { ascending: true });
        
        if (error) {
          console.error("Error fetching vibes:", error);
          return;
        }
        
        setVibeOptions(data || []);
      } catch (err) {
        console.error("Failed to fetch vibes:", err);
      } finally {
        setIsLoadingVibes(false);
      }
    };
    
    fetchVibes();
    
    // Set showCustomVibe based on initialData
    if (initialData?.company_vibe === "Custom") {
      setShowCustomVibe(true);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof BrandFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (field: string, value: string) => {
    if (field === 'company_vibe') {
      if (value === 'Custom') {
        setShowCustomVibe(true);
      } else {
        setShowCustomVibe(false);
        // Clear custom vibe if not showing
        setFormData((prev) => ({ ...prev, custom_vibe: '', [field]: value }));
      }
    }
    
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error when field is edited
    if (errors[field as keyof BrandFormData]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BrandFormData, string>> = {};
    
    if (!formData.brand_name.trim()) {
      newErrors.brand_name = "Brand name is required";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    
    if (!formData.company_vibe) {
      newErrors.company_vibe = "Please select a vibe";
    }
    
    if (formData.company_vibe === "Custom" && !formData.custom_vibe?.trim()) {
      newErrors.custom_vibe = "Custom vibe name is required";
    }
    
    if (!formData.selling_points.trim()) {
      newErrors.selling_points = "Selling points are required";
    }
    
    if (!formData.emotion) {
      newErrors.emotion = "Please select an emotion";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      setLoading(true);
      
      // If using a custom vibe, add it to the vibe_matrix
      if (formData.company_vibe === "Custom" && formData.custom_vibe) {
        // Check if this custom vibe already exists
        const { data: existingVibe, error: checkError } = await supabase
          .from('vibe_matrix')
          .select('id')
          .eq('vibe_name', formData.custom_vibe)
          .single();
        
        if (!existingVibe && formData.emotion) {
          // Add new vibe to matrix
          const { error: insertError } = await supabase
            .from('vibe_matrix')
            .insert({
              vibe_name: formData.custom_vibe,
              tone: `Custom ${formData.custom_vibe} tone`,
              emotion: formData.emotion,
              description: `Custom vibe created by user: ${formData.custom_vibe}`
            });
          
          if (insertError) {
            console.error("Error adding custom vibe to matrix:", insertError);
            toast({
              variant: "destructive",
              title: "Error",
              description: "Failed to add custom vibe"
            });
          } else {
            console.log("Custom vibe added to matrix");
          }
        }
        
        // Update the submission data to use the custom vibe name
        await onSubmit({
          ...formData,
          company_vibe: formData.custom_vibe
        });
      } else {
        // Use the selected vibe
        await onSubmit(formData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="brand_name">Brand Name *</Label>
          <Input
            id="brand_name"
            name="brand_name"
            value={formData.brand_name}
            onChange={handleChange}
            placeholder="e.g. Acme Corporation"
            className={errors.brand_name ? "border-red-500" : ""}
          />
          {errors.brand_name && (
            <p className="text-sm text-red-500">{errors.brand_name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Brand Description *</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your brand's mission, values, and target audience..."
            rows={4}
            className={errors.description ? "border-red-500" : ""}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company_vibe">Company Vibe *</Label>
          <Select
            value={formData.company_vibe}
            onValueChange={(value) => handleSelectChange('company_vibe', value)}
          >
            <SelectTrigger 
              id="company_vibe"
              className={errors.company_vibe ? "border-red-500" : ""}
            >
              <SelectValue placeholder="Select a vibe" />
            </SelectTrigger>
            <SelectContent>
              {isLoadingVibes ? (
                <div className="flex justify-center p-2">
                  <LoadingSpinner size="sm" />
                </div>
              ) : (
                <>
                  {vibeOptions.map((vibe) => (
                    <SelectItem key={vibe.id} value={vibe.vibe_name}>
                      {vibe.vibe_name}
                    </SelectItem>
                  ))}
                  <SelectItem value="Custom">
                    <div className="flex items-center">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Custom Vibe
                    </div>
                  </SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
          {errors.company_vibe && (
            <p className="text-sm text-red-500">{errors.company_vibe}</p>
          )}
        </div>

        {showCustomVibe && (
          <div className="space-y-2">
            <Label htmlFor="custom_vibe">Custom Vibe Name *</Label>
            <Input
              id="custom_vibe"
              name="custom_vibe"
              value={formData.custom_vibe}
              onChange={handleChange}
              placeholder="Enter your custom vibe name"
              className={errors.custom_vibe ? "border-red-500" : ""}
            />
            {errors.custom_vibe && (
              <p className="text-sm text-red-500">{errors.custom_vibe}</p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="emotion">Primary Emotion *</Label>
          <Select
            value={formData.emotion}
            onValueChange={(value) => handleSelectChange('emotion', value)}
          >
            <SelectTrigger 
              id="emotion"
              className={errors.emotion ? "border-red-500" : ""}
            >
              <SelectValue placeholder="Select an emotion" />
            </SelectTrigger>
            <SelectContent>
              {EMOTIONS.map((emotion) => (
                <SelectItem key={emotion} value={emotion}>
                  {emotion}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.emotion && (
            <p className="text-sm text-red-500">{errors.emotion}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="selling_points">Key Selling Points *</Label>
          <Textarea
            id="selling_points"
            name="selling_points"
            value={formData.selling_points}
            onChange={handleChange}
            placeholder="List your brand's key selling points or unique value propositions..."
            rows={4}
            className={errors.selling_points ? "border-red-500" : ""}
          />
          {errors.selling_points && (
            <p className="text-sm text-red-500">{errors.selling_points}</p>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="nextstep-button"
            disabled={loading}
          >
            {loading && <LoadingSpinner size="sm" className="mr-2" />}
            {initialData ? "Update Brand" : "Create Brand"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default BrandForm;
