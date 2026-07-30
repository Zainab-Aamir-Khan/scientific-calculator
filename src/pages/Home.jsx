import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Sparkles, ShieldCheck, Zap, History } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto py-12 text-center space-y-8">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
        <Sparkles className="w-4 h-4" /> Next-Gen Web Tools
      </div>
      
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
        Precision Engineering for <span className="text-emerald-400">Scientific Math</span>
      </h1>
      
      <p className="text-slate-400 text-lg max-w-2xl mx-auto">
        Perform advanced mathematical calculations, trigonometric functions, logarithms, and track calculation histories effortlessly.
      </p>

      <div className="pt-4">
        <Link
          to="/calculator"
          className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg transition active:scale-95 text-lg"
        >
          <Calculator className="w-5 h-5" /> Open Scientific Calculator
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 text-left">
        <div className="p-6 bg-slate-800/40 border border-slate-800 rounded-2xl space-y-2">
          <Zap className="w-6 h-6 text-emerald-400" />
          <h3 className="font-semibold text-white">Instant Evaluation</h3>
          <p className="text-slate-400 text-sm">Trigonometry, logarithms, exponentials, and algebra powered by custom parsing.</p>
        </div>
        <div className="p-6 bg-slate-800/40 border border-slate-800 rounded-2xl space-y-2">
          <History className="w-6 h-6 text-emerald-400" />
          <h3 className="font-semibold text-white">Calculation History</h3>
          <p className="text-slate-400 text-sm">Keep track of your active session's calculations for quick reference.</p>
        </div>
        <div className="p-6 bg-slate-800/40 border border-slate-800 rounded-2xl space-y-2">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          <h3 className="font-semibold text-white">DEG & RAD Modes</h3>
          <p className="text-slate-400 text-sm">Easily switch between Degrees and Radians for exact trigonometric outputs.</p>
        </div>
      </div>
    </div>
  );
}