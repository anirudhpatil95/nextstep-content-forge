
import React, { useState } from "react";
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

interface BrandFormData {
  brand_name: string;
  description: string;
  company_vibe: string;
  selling_points: string;
}

interface BrandFormProps {
  onSubmit: (data: BrandFormData) => Promise<void>;
  initialData?: {
    brand_name: string;
    description: string;
    company_vibe: string;
    selling_points: string;
  };
}

const VIBE_OPTIONS = [
  "Modern", "Minimalist", "Bold", "Vintage", "Playful", 
  "Elegant", "Casual", "Technical", "Corporate", "Artistic",
  "Luxurious", "Eco-friendly", "Rustic", "Futuristic"
];

const BrandForm: React.FC<BrandFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<BrandFormData>({
    brand_name: initialData?.brand_name || "",
    description: initialData?.description || "",
    company_vibe: initialData?.company_vibe || "",
    selling_points: initialData?.selling_points || "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof BrandFormData, string>>>({});

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

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, company_vibe: value }));
    
    // Clear error when field is edited
    if (errors.company_vibe) {
      setErrors((prev) => ({ ...prev, company_vibe: undefined }));
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
    
    if (!formData.selling_points.trim()) {
      newErrors.selling_points = "Selling points are required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      setLoading(true);
      await onSubmit(formData);
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
            onValueChange={handleSelectChange}
          >
            <SelectTrigger 
              id="company_vibe"
              className={errors.company_vibe ? "border-red-500" : ""}
            >
              <SelectValue placeholder="Select a vibe" />
            </SelectTrigger>
            <SelectContent>
              {VIBE_OPTIONS.map((vibe) => (
                <SelectItem key={vibe} value={vibe}>
                  {vibe}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.company_vibe && (
            <p className="text-sm text-red-500">{errors.company_vibe}</p>
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
