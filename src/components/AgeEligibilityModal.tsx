import React from 'react';
import { X, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AgeEligibilityCalculator } from './AgeEligibilityCalculator';

export const AgeEligibilityModal: React.FC = () => {
  const { ageCalculatorOpen, setAgeCalculatorOpen } = useApp();

  if (!ageCalculatorOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150"
      onClick={() => setAgeCalculatorOpen(false)}
    >
      <div 
        className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Sindh Govt STS &amp; SPSC Age Eligibility Engine
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official 15-Year General Age Relaxation Verification
              </p>
            </div>
          </div>

          <button
            onClick={() => setAgeCalculatorOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
          <AgeEligibilityCalculator isEmbedded={true} />
        </div>
      </div>
    </div>
  );
};
