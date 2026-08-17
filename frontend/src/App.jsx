import React from 'react';
import Navbar from './components/Navbar';
import ExploreScrollytelling from './components/ExploreScrollytelling';

export default function App() {
  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-white/20 selection:text-white overflow-x-hidden">
      <Navbar />
      <ExploreScrollytelling />
    </main>
  );
}