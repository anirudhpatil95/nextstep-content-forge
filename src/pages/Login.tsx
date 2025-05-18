
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthForm from "@/components/auth/AuthForm";
import AppLayout from "@/components/layout/AppLayout";
import { supabase } from "@/lib/supabase";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
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
        <AuthForm type="login" onSubmit={handleLogin} />
      </div>
    </AppLayout>
  );
};

export default Login;
