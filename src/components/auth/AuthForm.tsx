
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
    <div className="w-full max-w-md space-y-6 p-6 bg-card rounded-xl shadow-lg border border-border">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">
          {type === "login" ? "Welcome back" : "Create an account"}
        </h1>
        <p className="text-muted-foreground">
          {type === "login"
            ? "Enter your credentials to access your account"
            : "Enter your information to create your account"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            className="nextstep-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            className="nextstep-input"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full nextstep-button" 
          disabled={loading}
        >
          {loading ? (
            <LoadingSpinner size="sm" className="mr-2" />
          ) : null}
          {type === "login" ? "Sign In" : "Sign Up"}
        </Button>
      </form>

      <div className="text-center text-sm">
        {type === "login" ? (
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-nextstep-600 hover:text-nextstep-700">
              Create one
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-nextstep-600 hover:text-nextstep-700">
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
