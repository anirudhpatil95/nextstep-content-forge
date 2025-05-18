
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { PlusCircle } from "lucide-react";
import BrandForm from "@/components/brands/BrandForm";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface Brand {
  id: string;
  brand_name: string;
  description: string;
  company_vibe: string;
  selling_points: string;
  created_at: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingBrand, setIsAddingBrand] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        if (!user) return;
        
        const { data, error } = await supabase
          .from('brands')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        setBrands(data || []);
      } catch (error) {
        console.error('Error fetching brands:', error);
        toast.error('Failed to load brand profiles');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBrands();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      toast.success("You have been signed out");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  const handleAddBrand = () => {
    setIsAddingBrand(true);
    setEditingBrand(null);
  };

  const handleEditBrand = (brand: Brand) => {
    setEditingBrand(brand);
    setIsAddingBrand(true);
  };

  const handleCancelBrandForm = () => {
    setIsAddingBrand(false);
    setEditingBrand(null);
  };

  const handleBrandSubmit = async (brandData: Omit<Brand, 'id' | 'created_at'>) => {
    try {
      if (editingBrand) {
        // Update existing brand
        const { error } = await supabase
          .from('brands')
          .update(brandData)
          .eq('id', editingBrand.id);
        
        if (error) throw error;
        
        toast.success("Brand updated successfully");
        
        setBrands(brands.map(brand => 
          brand.id === editingBrand.id ? { ...brand, ...brandData } : brand
        ));
      } else {
        // Create new brand
        const { data, error } = await supabase
          .from('brands')
          .insert({
            ...brandData,
            user_id: user!.id
          })
          .select();
        
        if (error) throw error;
        
        toast.success("Brand created successfully");
        
        if (data) {
          setBrands([...data, ...brands]);
        }
      }
      
      setIsAddingBrand(false);
      setEditingBrand(null);
    } catch (error) {
      console.error('Error saving brand:', error);
      toast.error('Failed to save brand profile');
    }
  };

  const handleDeleteBrand = async (brandId: string) => {
    try {
      const { error } = await supabase
        .from('brands')
        .delete()
        .eq('id', brandId);
      
      if (error) throw error;
      
      toast.success("Brand deleted successfully");
      setBrands(brands.filter(brand => brand.id !== brandId));
    } catch (error) {
      console.error('Error deleting brand:', error);
      toast.error('Failed to delete brand profile');
    }
  };

  const handleSelectBrand = (brandId: string) => {
    navigate(`/brands/${brandId}`);
  };

  if (isAddingBrand || editingBrand) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">
              {editingBrand ? "Edit Brand" : "Create New Brand"}
            </h1>
            <Button variant="outline" onClick={handleCancelBrandForm}>
              Cancel
            </Button>
          </div>
          <BrandForm 
            onSubmit={handleBrandSubmit}
            initialData={editingBrand || undefined}
          />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Brands</h1>
            <p className="text-muted-foreground">Manage your brand profiles</p>
          </div>
          
          <Button onClick={handleAddBrand} className="nextstep-button mt-4 md:mt-0">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Brand
          </Button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="lg" />
          </div>
        ) : brands.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <Card key={brand.id} className="nextstep-card">
                <CardHeader>
                  <CardTitle>{brand.brand_name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {brand.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium">Company Vibe:</span>
                      <span className="ml-1 text-sm text-muted-foreground">{brand.company_vibe}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Selling Points:</span>
                      <p className="text-sm text-muted-foreground line-clamp-3">{brand.selling_points}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => handleEditBrand(brand)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="nextstep-button"
                    onClick={() => handleSelectBrand(brand.id)}
                  >
                    Generate Content
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-dashed border-2 p-6">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-nextstep-100 flex items-center justify-center mx-auto">
                <PlusCircle className="h-6 w-6 text-nextstep-600" />
              </div>
              <h3 className="font-medium text-lg">No Brands Yet</h3>
              <p className="text-muted-foreground">
                Create your first brand to start generating content
              </p>
              <Button onClick={handleAddBrand} className="nextstep-button">
                Add Your First Brand
              </Button>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
