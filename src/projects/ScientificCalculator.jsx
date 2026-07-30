import React, { useState } from 'react';
import { Delete, History } from 'lucide-react';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [history, setHistory] = useState([]);
  const [isDegree, setIsDegree] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  const handleInput = (val) => {
    if (display === '0' || display === 'Error') {
      setDisplay(val);
    } else {
      setDisplay((prev) => prev + val);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handleDelete = () => {
    if (display.length > 1 && display !== 'Error') {
      setDisplay((prev) => prev.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const toggleSign = () => {
    if (display === '0' || display === 'Error') return;
    if (display.startsWith('-')) {
      setDisplay((prev) => prev.slice(1));
    } else {
      setDisplay((prev) => '-' + prev);
    }
  };

  const evaluateMath = (expr) => {
    try {
      let parsed = expr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/\^/g, '**');

      const toRad = (angle) => (isDegree ? (angle * Math.PI) / 180 : angle);

      const func = new Function(
        'sin', 'cos', 'tan', 'sqrt', 'log', 'ln', 'toRad',
        `return ${parsed};`
      );

      const sin = (x) => Math.sin(toRad(x));
      const cos = (x) => Math.cos(toRad(x));
      const tan = (x) => Math.tan(toRad(x));
      const sqrt = (x) => Math.sqrt(x);
      const log = (x) => Math.log10(x);
      const ln = (x) => Math.log(x);

      const result = func(sin, cos, tan, sqrt, log, ln, toRad);

      if (isNaN(result) || !isFinite(result)) return 'Error';
      return Number(result.toFixed(8)).toString();
    } catch (err) {
      return 'Error';
    }
  };

  const handleScientificFunc = (funcName) => {
    if (display === 'Error') return;
    if (display === '0') {
      setDisplay(`${funcName}(`);
    } else {
      setDisplay((prev) => `${prev}${funcName}(`);
    }
  };

  const handleEqual = () => {
    if (display === 'Error') return;
    const res = evaluateMath(display);
    setEquation(`${display} =`);
    
    if (res !== 'Error') {
      setHistory((prev) => [{ eq: display, res }, ...prev.slice(0, 9)]);
    }
    setDisplay(res);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800/90 rounded-3xl shadow-2xl overflow-hidden border border-slate-700/80">
        
        {/* Header Control Bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-slate-900/50 border-b border-slate-700/50 text-xs font-semibold">
          <button
            onClick={() => setIsDegree(!isDegree)}
            className={`px-3 py-1 rounded-lg transition font-mono ${
              isDegree 
                ? 'bg-emerald-500 text-slate-950 font-bold' 
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            {isDegree ? 'DEG' : 'RAD'}
          </button>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="p-1.5 hover:bg-slate-800 rounded-lg transition text-slate-400 hover:text-emerald-400"
            title="Toggle History"
          >
            <History className="w-4 h-4" />
          </button>
        </div>

        {/* Display */}
        <div className="p-6 text-right bg-slate-950 min-h-[120px] flex flex-col justify-between border-b border-slate-800">
          <div className="text-emerald-400/80 text-sm h-6 font-mono overflow-x-auto tracking-wide">{equation}</div>
          <div className="text-3xl sm:text-4xl font-bold font-mono text-white tracking-wider overflow-x-auto">
            {display}
          </div>
        </div>

        {/* History Drawer */}
        {showHistory && (
          <div className="p-4 bg-slate-900 border-b border-slate-700 max-h-40 overflow-y-auto text-xs font-mono">
            <div className="text-slate-400 font-sans mb-2 font-semibold uppercase tracking-wider text-[10px]">Recent Calculations</div>
            {history.length === 0 ? (
              <div className="text-slate-500 py-1">No history available yet.</div>
            ) : (
              history.map((item, idx) => (
                <div key={idx} className="flex justify-between py-1.5 border-b border-slate-800 last:border-0">
                  <span className="text-slate-300">{item.eq}</span>
                  <span className="text-emerald-400 font-bold">{item.res}</span>
                </div>
              ))
            )}
          </div>
        )}

        {/* Keypad */}
        <div className="p-4 grid grid-cols-5 gap-2 bg-slate-800/90">
          <button onClick={() => handleScientificFunc('sin')} className="btn-sci">sin</button>
          <button onClick={() => handleScientificFunc('cos')} className="btn-sci">cos</button>
          <button onClick={() => handleScientificFunc('tan')} className="btn-sci">tan</button>
          <button onClick={handleClear} className="btn-action text-rose-400 hover:text-rose-300">AC</button>
          <button onClick={handleDelete} className="btn-action"><Delete className="w-4 h-4 mx-auto" /></button>

          <button onClick={() => handleScientificFunc('sqrt')} className="btn-sci">√</button>
          <button onClick={() => handleInput('^')} className="btn-sci">xⁿ</button>
          <button onClick={() => handleScientificFunc('log')} className="btn-sci">log</button>
          <button onClick={() => handleInput('(')} className="btn-sci">(</button>
          <button onClick={() => handleInput(')')} className="btn-sci">)</button>

          <button onClick={() => handleScientificFunc('ln')} className="btn-sci">ln</button>
          <button onClick={() => handleInput('7')} className="btn-num">7</button>
          <button onClick={() => handleInput('8')} className="btn-num">8</button>
          <button onClick={() => handleInput('9')} className="btn-num">9</button>
          <button onClick={() => handleInput('÷')} className="btn-op">÷</button>

          <button onClick={() => handleInput('π')} className="btn-sci">π</button>
          <button onClick={() => handleInput('4')} className="btn-num">4</button>
          <button onClick={() => handleInput('5')} className="btn-num">5</button>
          <button onClick={() => handleInput('6')} className="btn-num">6</button>
          <button onClick={() => handleInput('×')} className="btn-op">×</button>

          <button onClick={() => handleInput('e')} className="btn-sci">e</button>
          <button onClick={() => handleInput('1')} className="btn-num">1</button>
          <button onClick={() => handleInput('2')} className="btn-num">2</button>
          <button onClick={() => handleInput('3')} className="btn-num">3</button>
          <button onClick={() => handleInput('-')} className="btn-op">-</button>

          <button onClick={toggleSign} className="btn-num">±</button>
          <button onClick={() => handleInput('0')} className="btn-num">0</button>
          <button onClick={() => handleInput('.')} className="btn-num">.</button>
          <button onClick={handleEqual} className="btn-equal col-span-1">=</button>
          <button onClick={() => handleInput('+')} className="btn-op">+</button>
        </div>
      </div>
    </div>
  );
}