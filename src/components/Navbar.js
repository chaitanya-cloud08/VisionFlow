import React, { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <nav className="p-3 text-lg sticky top-0 z-50 w-full bg-inherit transition-all duration-300">
        <div className="container flex justify-between items-center">
          {/* Navbar Title */}
          <a className="text-white font-lobster text-2xl">VisionFlow</a>

          {/* Hamburger Menu Icon */}
          <button
            className="text-white md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="space-y-1">
              <div className="w-6 h-1 bg-white"></div>
              <div className="w-6 h-1 bg-white"></div>
              <div className="w-6 h-1 bg-white"></div>
            </div>
          </button>

          {/* Navbar Links for Desktop */}
          <div className="hidden md:flex space-x-10">
            <a href="#home" className="text-white">Home</a>
            <a href="#features" className="text-white">Features</a>
            <a href="#switch" className="text-white">Mode</a>
            <a href="#guide" className="text-white">Guide</a>
          </div>
        </div>

        {/* Navbar Links for Mobile */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-40" : "max-h-0"
          } md:hidden`}
        >
          <div className="flex flex-col space-y-3  mt-2 mb-2">
            <a href="#home" className="text-white">Home</a>
            <a href="#features" className="text-white">Features</a>
            <a href="#switch" className="text-white">Mode</a>
            <a href="#guide" className="text-white">Guide</a>
          </div>
        </div>
      </nav>
    </div>
  );
}
