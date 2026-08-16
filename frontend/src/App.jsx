import React from 'react';
import Navbar from './components/Navbar';
import CarScrollytelling from './components/CarScrollytelling';

export default function App() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-white/20 selection:text-white overflow-x-hidden">
      <Navbar />
      <CarScrollytelling />
    </main>
  );
}