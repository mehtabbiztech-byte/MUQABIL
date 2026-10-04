import React, { useState } from 'react';
import { Bot, X, Sparkles, Maximize2, Minimize2 } from 'lucide-react';
import { GeminiChatbot } from './GeminiChatbot';
import { useApp } from '../context/AppContext';

export const GeminiFloatingWidget: React.FC = () => {
  const { tab, setTab } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // If already on the dedicated ai-chat tab, hide floating drawer to avoid redundancy
  if (tab === 'ai-chat') return null;

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white shadow-2xl hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer ring-4 ring-purple-500/20"
          aria-label="Open Gemini AI Chatbot"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <Bot className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
              </span>
            </div>
          )}

          {/* Hover Tooltip */}
          {!isOpen && (
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-slate-900/90 text-white text-xs font-bold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 border border-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Ask Gemini AI</span>
            </span>
          )}
        </button>
      </div>

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ${
            isExpanded
              ? 'inset-4 sm:inset-10'
              : 'bottom-20 right-4 sm:right-6 w-[95vw] sm:w-[500px] h-[660px] max-h-[88vh]'
          }`}
        >
          <div className="relative h-full shadow-2xl rounded-3xl overflow-hidden ring-1 ring-slate-900/10">
            {/* Quick Top Bar Controls */}
            <div className="absolute top-4 right-14 z-50 flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition cursor-pointer"
                title={isExpanded ? 'Restore compact view' : 'Maximize window'}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (setTab) setTab('ai-chat');
                }}
                className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition cursor-pointer"
                title="Open in full page view"
              >
                Full Page
              </button>
            </div>

            <GeminiChatbot
              compactMode={!isExpanded}
              onNavigateTab={(targetTab) => {
                setIsOpen(false);
                if (setTab) setTab(targetTab as any);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};
