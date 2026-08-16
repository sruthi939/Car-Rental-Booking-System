import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header className="px-6 py-4 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between">
            <Link to="/">
                <img src={assets.logo} alt='logo' className='h-8 object-contain' />
            </Link>
        </header>
    )
}

export default Navbar