
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthForm from "@/components/auth/AuthForm";
import AppLayout from "@/components/layout/AppLayout";
import { supabase } from "@/lib/supabase";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
      }
    });

    if (error) {
      throw new Error(error.message);
    }

    toast.success("Account created successfully! Check your email to verify your account.");
    
    // For now, we'll navigate to the login page after a delay
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[80vh]">
        <AuthForm type="signup" onSubmit={handleSignUp} />
      </div>
    </AppLayout>
  );
};

export default SignUp;
