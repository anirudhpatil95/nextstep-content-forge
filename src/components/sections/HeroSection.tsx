
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-72 h-72 bg-nextstep-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-1/4 translate-x-1/2 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nextstep-600 to-nextstep-800 mb-6 animate-fade-in">
            Generate Brand-Perfect Content with AI
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-10 animate-fade-in animation-delay-200 max-w-3xl mx-auto">
            Create content that perfectly matches your brand's unique voice and style using our AI-powered content generation platform.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-fade-in animation-delay-400">
            <Button asChild size="lg" className="nextstep-button text-lg px-8 py-6">
              <Link to="/signup">Get Started for Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
          
          <div className="mt-16 animate-bounce cursor-pointer" onClick={scrollToFeatures}>
            <ArrowDown className="mx-auto h-8 w-8 text-nextstep-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
