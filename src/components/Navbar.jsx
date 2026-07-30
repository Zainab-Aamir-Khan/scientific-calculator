import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calculator, Home } from 'lucide-react';

export default function Navbar() {
  const linkStyles = ({ isActive }) =>
    `flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
      isActive
        ? 'bg-emerald-500 text-slate-950 shadow-md font-semibold'
        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <NavLink to="/" className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
          Zainab <span className="text-emerald-400 font-mono text-xs px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">Dev</span>
        </NavLink>

        <nav className="flex items-center gap-2">
          <NavLink to="/" className={linkStyles}>
            <Home className="w-4 h-4" /> Home
          </NavLink>
          <NavLink to="/calculator" className={linkStyles}>
            <Calculator className="w-4 h-4" /> Calculator
          </NavLink>
        </nav>
      </div>
    </header>
  );
}