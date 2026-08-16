import React from 'react'
import Navbar from './components/Navbar'
import ExplodedCarShowcase from './components/ExplodedCarShowcase'

const App = () => {
  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <Navbar />
      <ExplodedCarShowcase />
    </div>
  )
}

export default App