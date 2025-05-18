
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const Dashboard = () => {
  // Mock data for demonstration purposes
  const mockBrands = [
    { id: "1", name: "Brand One", description: "A creative fashion brand" },
    { id: "2", name: "Brand Two", description: "A tech startup with a focus on innovation" },
  ];
  
  const handleAddBrand = () => {
    toast.info("Brand creation will be available in the next iteration");
  };

  const handleSelectBrand = (brandId: string) => {
    toast("Brand selected", {
      description: `You selected brand with ID: ${brandId}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-nextstep-600 to-nextstep-800">
              NextStep AI
            </span>
          </Link>
          
          <Button variant="ghost" onClick={() => toast.success("You have been signed out")}>
            <Link to="/">Sign Out</Link>
          </Button>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Manage your brand profiles</p>
          </div>
          
          <Button onClick={handleAddBrand} className="nextstep-button mt-4 md:mt-0">
            Add New Brand
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBrands.map((brand) => (
            <Card key={brand.id} className="nextstep-card">
              <CardHeader>
                <CardTitle>{brand.name}</CardTitle>
                <CardDescription>{brand.description}</CardDescription>
              </CardHeader>
              <CardContent className="min-h-[100px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Brand Profile</p>
                  <p className="text-sm">Content settings will be available in the next iteration</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full nextstep-button"
                  onClick={() => handleSelectBrand(brand.id)}
                >
                  Select Brand
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          <Card className="nextstep-card border-dashed border-2 bg-muted/50 flex flex-col items-center justify-center p-6">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-nextstep-100 flex items-center justify-center mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-nextstep-600"
                >
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
              </div>
              <h3 className="font-medium">Add New Brand</h3>
              <p className="text-sm text-muted-foreground">
                Create a new brand profile to generate content for
              </p>
              <Button onClick={handleAddBrand} className="nextstep-button-secondary">
                Create Brand
              </Button>
            </div>
          </Card>
        </div>
        
        <div className="mt-12 py-8 border-t border-border">
          <h2 className="text-2xl font-bold mb-6">Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Brand Profile Management",
                description: "Create and configure detailed brand profiles"
              },
              {
                title: "Content Generation",
                description: "Generate AI-powered content using our Vibe Matrix"
              },
              {
                title: "Content History",
                description: "View and reuse previously generated content"
              }
            ].map((feature, idx) => (
              <Card key={idx} className="bg-muted/50">
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent className="h-20 flex items-center justify-center">
                  <LoadingSpinner size="sm" />
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground w-full text-center">
                    Coming in the next iteration
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} NextStep AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
