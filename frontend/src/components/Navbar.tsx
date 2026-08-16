import React from 'react';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-40 px-6 md:px-12 py-6 pointer-events-none transition-all duration-300">
      <nav className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <span className="text-lg md:text-xl font-normal tracking-[0.3em] uppercase text-white font-mono">
            VANTORA
          </span>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-10 text-xs tracking-[0.25em] uppercase font-light text-white/70">
          <a href="#machine" className="hover:text-white transition-colors duration-200">
            THE MACHINE
          </a>
          <a href="#technology" className="hover:text-white transition-colors duration-200">
            TECHNOLOGY
          </a>
          <a href="#performance" className="hover:text-white transition-colors duration-200">
            PERFORMANCE
          </a>
        </div>

        {/* Right CTA */}
        <div>
          <a 
            href="#explore" 
            className="text-xs uppercase tracking-[0.2em] font-medium text-white/80 hover:text-white px-5 py-2.5 rounded-full border border-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-200"
          >
            EXPLORE
          </a>
        </div>

      </nav>
    </header>
  );
}
