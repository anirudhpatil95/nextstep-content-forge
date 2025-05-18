
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthForm from "@/components/auth/AuthForm";
import AppLayout from "@/components/layout/AppLayout";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { supabaseConfigured } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    if (!supabaseConfigured) {
      toast.error("Cannot log in: Supabase is not configured");
      throw new Error("Supabase not configured");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    toast.success("Successfully logged in! Redirecting to dashboard...");
    
    // Navigate to the dashboard after successful login
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[80vh]">
        {!supabaseConfigured && (
          <Alert variant="destructive" className="mb-6 max-w-md">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Supabase is not configured. Please add the required environment variables to enable authentication.
            </AlertDescription>
          </Alert>
        )}
        <AuthForm type="login" onSubmit={handleLogin} />
      </div>
    </AppLayout>
  );
};

export default Login;
