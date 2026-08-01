import React, { useState } from 'react';
import { Delete, History, Trash2 } from 'lucide-react';
import { create, all } from 'mathjs';

// Configure mathjs instance
const math = create(all);

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [history, setHistory] = useState([]);
  const [isDegree, setIsDegree] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  // Append digits and operators
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

  const handleScientificFunc = (funcName) => {
    if (display === 'Error') return;
    if (display === '0') {
      setDisplay(`${funcName}(`);
    } else {
      setDisplay((prev) => `${prev}${funcName}(`);
    }
  };

  // Safe & Robust Math Evaluator
  const evaluateMath = (expr) => {
    try {
      // 1. Prepare expression string for mathjs parsing
      let cleaned = expr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'pi')
        .replace(/√\(/g, 'sqrt(');

      // Auto-close missing brackets
      const openBrackets = (cleaned.match(/\(/g) || []).length;
      const closeBrackets = (cleaned.match(/\)/g) || []).length;
      if (openBrackets > closeBrackets) {
        cleaned += ')'.repeat(openBrackets - closeBrackets);
      }

      // 2. Trigonometric angle conversion for DEG mode
      // If DEG mode is active, wrap angle arguments inside sin/cos/tan in deg-to-rad conversion
      let processedExpr = cleaned;
      if (isDegree) {
        processedExpr = processedExpr
          .replace(/sin\(([^)]+)\)/g, 'sin(($1) * deg)')
          .replace(/cos\(([^)]+)\)/g, 'cos(($1) * deg)')
          .replace(/tan\(([^)]+)\)/g, 'tan(($1) * deg)');
      }

      // 3. Evaluate using mathjs scope
      const scope = {
        deg: Math.PI / 180
      };

      const result = math.evaluate(processedExpr, scope);

      if (typeof result === 'undefined' || result === null || isNaN(result)) {
        return 'Error';
      }

      // Format result to round off floating-point inaccuracies
      return math.format(result, { precision: 10 }).toString();
    } catch (err) {
      return 'Error';
    }
  };

  const handleEqual = () => {
    if (display === 'Error') return;

    const res = evaluateMath(display);
    
    if (res !== 'Error') {
      const newEntry = { eq: display, res };
      setHistory((prev) => [newEntry, ...prev.slice(0, 19)]);
      setEquation(`${display} =`);
      setDisplay(res);
    } else {
      setDisplay('Error');
    }
  };

  const restoreHistoryItem = (item) => {
    setDisplay(item.res);
    setEquation(`${item.eq} =`);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800/90 rounded-3xl shadow-2xl overflow-hidden border border-slate-700/80 relative">
        
        {/* Header Control Bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-slate-900/50 border-b border-slate-700/50 text-xs font-semibold">
          <button
            onClick={() => setIsDegree(!isDegree)}
            className={`px-3 py-1 rounded-lg transition font-mono cursor-pointer ${
              isDegree 
                ? 'bg-emerald-500 text-slate-950 font-bold' 
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            {isDegree ? 'DEG' : 'RAD'}
          </button>

          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg hover:bg-slate-800 transition text-slate-300 hover:text-emerald-400 cursor-pointer border border-slate-700/40"
            title="Toggle Calculation History"
          >
            <History className="w-3.5 h-3.5 text-emerald-400" />
            <span>History ({history.length})</span>
          </button>
        </div>

        {/* Display Area */}
        <div className="p-6 text-right bg-slate-950 min-h-[120px] flex flex-col justify-between border-b border-slate-800">
          <div className="text-emerald-400/80 text-sm h-6 font-mono overflow-x-auto tracking-wide">{equation}</div>
          <div className="text-3xl sm:text-4xl font-bold font-mono text-white tracking-wider overflow-x-auto">
            {display}
          </div>
        </div>

        {/* History Drawer */}
        {showHistory && (
          <div className="p-4 bg-slate-900 border-b border-slate-700 max-h-56 overflow-y-auto text-xs font-mono space-y-2">
            <div className="flex items-center justify-between text-slate-400 font-sans pb-1 border-b border-slate-800 font-semibold uppercase tracking-wider text-[10px]">
              <span>Calculation History</span>
              {history.length > 0 && (
                <button
                  onClick={() => setHistory([])}
                  className="flex items-center gap-1 text-rose-400 hover:text-rose-300 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              )}
            </div>
            {history.length === 0 ? (
              <div className="text-slate-500 py-3 text-center font-sans">No history saved yet.</div>
            ) : (
              history.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => restoreHistoryItem(item)}
                  className="flex justify-between items-center py-2 px-2 rounded hover:bg-slate-800/80 cursor-pointer transition border border-transparent hover:border-slate-700/50"
                >
                  <span className="text-slate-400 truncate max-w-[60%]">{item.eq}</span>
                  <span className="text-emerald-400 font-bold font-mono">{item.res}</span>
                </div>
              ))
            )}
          </div>
        )}

        {/* Keypad Grid */}
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