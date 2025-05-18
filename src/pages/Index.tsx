
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";

const Index = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Generate <span className="bg-gradient-to-r from-nextstep-600 to-nextstep-800 bg-clip-text text-transparent">AI-powered</span> content <br className="hidden md:block" />for your brands
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              NextStep AI helps social media managers create tailored content for multiple brands using our unique Vibe Matrix technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="nextstep-button text-lg py-6 px-8">
                <Link to="/signup">Start Creating Content</Link>
              </Button>
              <Button variant="outline" asChild className="nextstep-button-secondary text-lg py-6">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-lg">
              {/* Background decorative elements */}
              <div className="absolute top-0 -left-4 w-72 h-72 bg-nextstep-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-nextstep-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-nextstep-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
              
              {/* Content preview */}
              <div className="relative bg-white rounded-2xl shadow-xl border border-border p-6 z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Brand Profile</h3>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded-md w-3/4 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded-md w-1/2 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1">Vibe</div>
                      <div className="h-9 bg-gray-100 rounded-md animate-pulse"></div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1">Emotion</div>
                      <div className="h-9 bg-gray-100 rounded-md animate-pulse"></div>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-lg border border-border">
                    <div className="absolute inset-0 bg-gradient-to-r from-nextstep-100/50 to-nextstep-300/50 animate-pulse"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-medium text-nextstep-800">AI Generated Content</span>
                    </div>
                    <div className="h-40 w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Generate Content in 3 Simple Steps</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform makes it easy to create brand-aligned content for all your social media needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Create Brand Profiles",
                description: "Set up your brand's identity, vibe, and key selling points"
              },
              {
                title: "Select Content Parameters",
                description: "Choose the type of content, vibe, and emotion you want to convey"
              },
              {
                title: "Generate & Use",
                description: "Our AI generates content that's ready to use across your platforms"
              }
            ].map((feature, idx) => (
              <div key={idx} className="relative nextstep-card group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nextstep-400 to-nextstep-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                <div className="h-12 w-12 rounded-full bg-nextstep-100 flex items-center justify-center mb-4">
                  <span className="text-nextstep-600 font-bold text-xl">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="py-16 px-4 bg-nextstep-50 rounded-2xl border border-nextstep-100">
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <h2 className="text-3xl font-bold">Ready to transform your content workflow?</h2>
            <p className="text-xl text-muted-foreground">
              Join NextStep AI today and start creating tailored content for your brands.
            </p>
            <Button asChild size="lg" className="nextstep-button text-lg py-6 px-8">
              <Link to="/signup">Get Started For Free</Link>
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
