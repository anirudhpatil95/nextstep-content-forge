
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-nextstep-600 to-nextstep-800">
              NextStep AI
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-sm font-medium text-nextstep-600 hover:text-nextstep-700">
              Sign In
            </Link>
            <Link to="/signup" className="text-sm font-medium px-4 py-2 rounded-md bg-nextstep-600 text-white hover:bg-nextstep-700 transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} NextStep AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
