
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";

const Index = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-12 md:py-24">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 space-y-6 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Generate <span className="text-nextstep-600">AI-powered</span> content for your brands
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
              NextStep AI helps social media managers create tailored content for multiple brands using our unique Vibe Matrix technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="nextstep-button">
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button variant="outline" asChild className="nextstep-button-secondary">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full max-w-md rounded-xl overflow-hidden shadow-lg border border-border bg-gradient-to-br from-nextstep-100 to-nextstep-50 p-6">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-border mb-4">
                <h3 className="text-lg font-medium mb-2">Brand Profile</h3>
                <div className="space-y-2">
                  <div className="h-4 bg-nextstep-100 rounded-md w-3/4"></div>
                  <div className="h-4 bg-nextstep-100 rounded-md w-1/2"></div>
                </div>
              </div>
              <div className="flex space-x-2 mb-4">
                <div className="h-8 bg-nextstep-200 rounded-md flex-1"></div>
                <div className="h-8 bg-nextstep-200 rounded-md flex-1"></div>
              </div>
              <div className="h-40 bg-nextstep-200 rounded-md w-full animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Multiple Brand Profiles",
                description: "Manage all your brands in one place with customizable profiles"
              },
              {
                title: "AI-Powered Generation",
                description: "Create content with our unique Vibe Matrix technology"
              },
              {
                title: "Mobile-Friendly Design",
                description: "Create content on the go with our responsive interface"
              }
            ].map((feature, idx) => (
              <div key={idx} className="nextstep-card">
                <div className="h-12 w-12 rounded-full bg-nextstep-100 flex items-center justify-center mb-4">
                  <span className="text-nextstep-600 font-medium">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="py-16 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Ready to transform your social media workflow?</h2>
            <p className="text-lg text-muted-foreground">
              Join NextStep AI today and start creating tailored content for your brands.
            </p>
            <Button asChild size="lg" className="nextstep-button">
              <Link to="/signup">Get Started For Free</Link>
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
