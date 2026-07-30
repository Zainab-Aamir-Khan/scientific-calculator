import React from 'react';
import ScientificCalculator from '../projects/ScientificCalculator';

export default function CalculatorPage() {
  return (
    <div className="py-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Scientific Calculator!</h2>
        <p className="text-slate-400 text-sm">
          Supports algebraic order, trigonometric functions, DEG/RAD modes, and memory history.
        </p>
      </div>
      <ScientificCalculator />
    </div>
  );
}