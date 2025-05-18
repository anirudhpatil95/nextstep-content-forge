
import React, { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-nextstep-600 to-nextstep-800">
              NextStep AI
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="#features" className="text-sm font-medium text-foreground hover:text-nextstep-600 transition-colors">
              Features
            </Link>
            <Link to="#how-it-works" className="text-sm font-medium text-foreground hover:text-nextstep-600 transition-colors">
              How It Works
            </Link>
            <Link to="#pricing" className="text-sm font-medium text-foreground hover:text-nextstep-600 transition-colors">
              Pricing
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-sm font-medium text-nextstep-600 hover:text-nextstep-700">
              Sign In
            </Link>
            <Button asChild className="bg-nextstep-600 hover:bg-nextstep-700 text-white">
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link to="#features" className="block text-foreground hover:text-nextstep-600 transition-colors">
                Features
              </Link>
              <Link to="#how-it-works" className="block text-foreground hover:text-nextstep-600 transition-colors">
                How It Works
              </Link>
              <Link to="#pricing" className="block text-foreground hover:text-nextstep-600 transition-colors">
                Pricing
              </Link>
              <div className="pt-4 flex flex-col space-y-4">
                <Link to="/login" className="text-nextstep-600 hover:text-nextstep-700">
                  Sign In
                </Link>
                <Button asChild className="bg-nextstep-600 hover:bg-nextstep-700 text-white">
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="border-t border-border py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="inline-block mb-4">
                <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-nextstep-600 to-nextstep-800">
                  NextStep AI
                </span>
              </Link>
              <p className="text-sm text-muted-foreground">
                AI-powered content generation for multiple brand profiles
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="#features" className="text-muted-foreground hover:text-nextstep-600">Features</Link></li>
                <li><Link to="#how-it-works" className="text-muted-foreground hover:text-nextstep-600">How It Works</Link></li>
                <li><Link to="#pricing" className="text-muted-foreground hover:text-nextstep-600">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="#about" className="text-muted-foreground hover:text-nextstep-600">About</Link></li>
                <li><Link to="#blog" className="text-muted-foreground hover:text-nextstep-600">Blog</Link></li>
                <li><Link to="#careers" className="text-muted-foreground hover:text-nextstep-600">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="#privacy" className="text-muted-foreground hover:text-nextstep-600">Privacy Policy</Link></li>
                <li><Link to="#terms" className="text-muted-foreground hover:text-nextstep-600">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} NextStep AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
