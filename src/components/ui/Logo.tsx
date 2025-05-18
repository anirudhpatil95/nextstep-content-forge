
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  textSize?: string;
  className?: string;
  linkTo?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  textSize = "text-2xl", 
  className = "", 
  linkTo = "/"
}) => {
  const content = (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <div className="h-8 w-8 bg-gradient-to-br from-nextstep-500 to-nextstep-700 rounded-lg shadow-md flex items-center justify-center">
          <span className="text-white font-bold text-xl">N</span>
        </div>
        <div className="absolute -top-1 -right-1 h-3 w-3 bg-nextstep-300 rounded-full shadow-sm animate-pulse"></div>
      </div>
      <span className={`font-bold ${textSize} bg-clip-text text-transparent bg-gradient-to-r from-nextstep-600 to-nextstep-800`}>
        NextStep AI
      </span>
    </div>
  );
  
  if (linkTo) {
    return <Link to={linkTo}>{content}</Link>;
  }
  
  return content;
};

export default Logo;
