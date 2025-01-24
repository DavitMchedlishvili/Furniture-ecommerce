"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility

  useEffect(() => {
    setMounted(true);
  }, []);

  // Wait until the component is mounted to handle theme rendering.
  if (!mounted) return null;

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setIsDropdownOpen(false); // Close the dropdown after selecting the theme
  };

  return (
    <div className="relative">
      {/* Button to trigger the dropdown */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="px-2 py-1 bg-transparent border-2 border-black  "
      >
        {theme === "light" ? "☀️" : theme === "dark" ? "🌙" : "🖥️"} {/* Display current theme icon */}
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        
          <div className="absolute right-0 mt-2 bg-white shadow-lg z-10 border-2 border-black">
          <button
            onClick={() => handleThemeChange("system")}
            className="w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
          >
            🖥️ 
          </button>
          <button
            onClick={() => handleThemeChange("light")}
            className="w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
          >
            ☀️ 
          </button>
          <button
            onClick={() => handleThemeChange("dark")}
            className="w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
          >
            🌙 
          </button>
        </div>
      
        
      )}
    </div>
  );
};

export default ThemeSwitcher;

