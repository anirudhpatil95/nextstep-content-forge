
import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = "md", 
  className = ""
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`animate-spin rounded-full border-t-2 border-nextstep-600 border-r-2 border-nextstep-600 border-b-2 border-nextstep-600 border-l-2 border-transparent ${sizeClasses[size]}`}></div>
    </div>
  );
};

export default LoadingSpinner;
