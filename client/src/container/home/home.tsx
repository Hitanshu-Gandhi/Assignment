import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-slate-800 p-4 flex justify-between items-center shadow-md">
        <h1 className="text-white text-2xl font-bold">Assignments</h1>
        <Button 
          onClick={handleLoginClick} 
          className="bg-white text-slate-800 hover:bg-gray-200 transition duration-300"
        >
          Login
        </Button>
      </nav>

      {/* Content Area */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">
        <div className="max-w-md w-full text-center bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the Online Lecture Scheduling Module</h2>
          <p className="text-gray-600 mb-6">
            Efficiently manage your online lectures and assignments with our user-friendly scheduling module. 
          </p>
          <Button 
            onClick={handleLoginClick}
            className="w-full bg-slate-800 text-white hover:bg-slate-600 transition duration-300 py-3 rounded-lg"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
