
import React, { useState, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Logo from "@/components/ui/Logo";
import { 
  LucideHome, 
  Menu, 
  X, 
  Settings, 
  LogOut, 
  User, 
  LayoutDashboard 
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      toast.success("You have been signed out");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Top Navigation */}
      <div className="md:hidden bg-white border-b border-gray-200 fixed top-0 w-full z-30">
        <div className="flex items-center justify-between px-4 py-3">
          <Logo textSize="text-xl" linkTo="/dashboard" />
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
          >
            {sidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed inset-0 bg-gray-600 bg-opacity-50 z-20 transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white z-30 transform transition-transform duration-200 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="hidden md:flex items-center justify-center px-4 py-6 border-b border-gray-200">
            <Logo textSize="text-xl" linkTo="/dashboard" />
          </div>

          {/* Sidebar content */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            <Link
              to="/dashboard"
              className="flex items-center px-2 py-3 text-gray-700 rounded-md hover:bg-gray-100 group"
            >
              <LayoutDashboard className="w-5 h-5 mr-3 text-gray-500 group-hover:text-nextstep-600" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center px-2 py-3 text-gray-700 rounded-md hover:bg-gray-100 group"
            >
              <User className="w-5 h-5 mr-3 text-gray-500 group-hover:text-nextstep-600" />
              <span>Profile</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center px-2 py-3 text-gray-700 rounded-md hover:bg-gray-100 group"
            >
              <Settings className="w-5 h-5 mr-3 text-gray-500 group-hover:text-nextstep-600" />
              <span>Settings</span>
            </Link>
          </nav>

          {/* User info and logout */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-nextstep-100 flex items-center justify-center">
                <span className="text-nextstep-600 font-medium">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-gray-700 truncate">
                  {user?.email}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  Free Plan
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-2 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100"
            >
              <LogOut className="w-5 h-5 mr-3 text-gray-500" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:pl-64 pt-16 md:pt-0 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
