import React, { useState } from "react";
import {  User, Settings, LogOut, X, AlignJustify, Book } from "lucide-react"; 
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Sidebar: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  const links = [
    { name: "Instructors", icon: <User className="w-6 h-6" />, href: "/admin/instructors" },
    { name: "Courses", icon: <Book className="w-6 h-6" />, href: "/admin/courses" },
    { name: "Add Courses", icon: <Settings className="w-6 h-6" />, href: "/admin/add-courses" },
  ];

  return (
    <div className="flex">

      {/* Sidebar Container */}
      <div
        className={cn(
          "bg-gray-900 text-white h-screen p-4 flex flex-col justify-between",
          isMinimized ? "w-20" : "w-64",
          "transition-all duration-300 shadow-lg"
        )}
      >

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className={cn(
            "p-2 mb-6 rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700",
            "focus:outline-none"
          )}
        >
          {isMinimized ? <AlignJustify className="w-6 h-6" /> : <X className="w-6 h-6" />}
        </button>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-3">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className={cn(
                "flex items-center space-x-3 text-gray-300 hover:text-white p-2 rounded-md transition-all",
                "hover:bg-gray-800",
                isMinimized ? "justify-center" : "justify-start"
              )}
            >
              {link.icon}
              {!isMinimized && <span className="font-medium">{link.name}</span>}
            </a>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="mt-auto">
          <Button
            onClick={handleLogout}
            className={cn(
              "flex items-center space-x-3 p-2 rounded-md text-red-500 hover:bg-red-600 w-full",
              "hover:text-white transition-all",
              isMinimized ? "justify-center" : "justify-start"
            )}
          >
            <LogOut className="w-6 h-6" />
            {!isMinimized && <span className="font-medium">Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
