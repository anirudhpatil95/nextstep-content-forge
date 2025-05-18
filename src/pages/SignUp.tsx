
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthForm from "@/components/auth/AuthForm";
import AppLayout from "@/components/layout/AppLayout";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = async (email: string, password: string) => {
    // This is a placeholder for the actual Supabase authentication
    // In the next iteration, we'll implement the actual authentication
    console.log("SignUp attempt with:", email);

    // Simulate signup success
    toast.success("Account created successfully! Redirecting to dashboard...");
    
    // For the MVP, we'll just navigate to the dashboard
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[70vh]">
        <AuthForm type="signup" onSubmit={handleSignUp} />
      </div>
    </AppLayout>
  );
};

export default SignUp;
