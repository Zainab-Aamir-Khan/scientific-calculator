import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CalculatorPage from './pages/CalculatorPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<CalculatorPage />} />
          </Routes>
        </main>
        <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-800">
          © {new Date().getFullYear()} Zainab. Built with React & Tailwind CSS.
        </footer>
      </div>
    </BrowserRouter>
  );
}