
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import LoadingSpinner from "../ui/LoadingSpinner";

interface AuthFormProps {
  type: "login" | "signup";
  onSubmit: (email: string, password: string) => Promise<void>;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await onSubmit(email, password);
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : "An error occurred during authentication"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-xl shadow-xl border border-border">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-nextstep-600 to-nextstep-800 bg-clip-text text-transparent">
          {type === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="text-muted-foreground">
          {type === "login"
            ? "Enter your credentials to access your account"
            : "Start generating AI content for your brands"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            className="h-12 border-gray-300 focus:border-nextstep-500 focus:ring-nextstep-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
            {type === "login" && (
              <Link to="/forgot-password" className="text-xs text-nextstep-600 hover:text-nextstep-700">
                Forgot password?
              </Link>
            )}
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            className="h-12 border-gray-300 focus:border-nextstep-500 focus:ring-nextstep-500"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 bg-nextstep-600 hover:bg-nextstep-700 text-white font-medium transition-colors"
          disabled={loading}
        >
          {loading ? (
            <LoadingSpinner size="sm" className="mr-2" />
          ) : null}
          {type === "login" ? "Sign In" : "Create Account"}
        </Button>
      </form>

      <div className="text-center text-sm">
        {type === "login" ? (
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-nextstep-600 hover:text-nextstep-700 hover:underline">
              Create one
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-nextstep-600 hover:text-nextstep-700 hover:underline">
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
