import React, { useState } from 'react';
import { 
  Layout, 
  Sidebar as SidebarIcon, 
  Columns, 
  Maximize2, 
  Sliders, 
  Sparkles,
  Check,
  ChevronDown
} from 'lucide-react';
import { useLayout, ShellLayout } from '../context/LayoutContext';

interface QuickLayoutSwitcherProps {
  variant?: 'inline' | 'dropdown' | 'floating' | 'header';
  className?: string;
}

export const QuickLayoutSwitcher: React.FC<QuickLayoutSwitcherProps> = ({ 
  variant = 'header',
  className = ''
}) => {
  const { shellLayout, setShellLayout, setLayoutModalOpen } = useLayout();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [justSwitched, setJustSwitched] = useState<string | null>(null);

  const layouts: {
    id: ShellLayout;
    label: string;
    shortLabel: string;
    icon: React.ReactNode;
    badge: string;
    desc: string;
    color: string;
  }[] = [
    {
      id: 'standard',
      label: 'Standard Top Nav',
      shortLabel: 'Standard',
      icon: <Layout className="w-4 h-4" />,
      badge: 'Classic',
      desc: 'Familiar sticky header with announcements and mega-menus',
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
    },
    {
      id: 'sidebar',
      label: 'Executive Sidebar',
      shortLabel: 'Sidebar',
      icon: <SidebarIcon className="w-4 h-4" />,
      badge: 'Executive',
      desc: 'Modern LMS workspace with collapsible left navigation rail',
      color: 'text-teal-600 dark:text-teal-400 bg-teal-500/10'
    },
    {
      id: 'split',
      label: 'Dual Split Workspace',
      shortLabel: 'Split',
      icon: <Columns className="w-4 h-4" />,
      badge: 'Master-Detail',
      desc: 'Side-by-side study index and uninterrupted reading canvas',
      color: 'text-blue-600 dark:text-blue-400 bg-blue-500/10'
    },
    {
      id: 'zen',
      label: 'Zen Focus Mode',
      shortLabel: 'Zen Focus',
      icon: <Maximize2 className="w-4 h-4" />,
      badge: 'Exam Immersion',
      desc: 'Distraction-free test taking with floating bottom glass hub',
      color: 'text-purple-600 dark:text-purple-400 bg-purple-500/10'
    }
  ];

  const handleSelect = (id: ShellLayout, label: string) => {
    setShellLayout(id);
    setDropdownOpen(false);
    setJustSwitched(label);
    setTimeout(() => {
      setJustSwitched(null);
    }, 2500);
  };

  const currentLayoutObj = layouts.find(l => l.id === shellLayout) || layouts[0];

  // 1. INLINE SEGMENTED CONTROL (Best for headers where space allows)
  if (variant === 'inline') {
    return (
      <div className={`relative flex items-center p-1 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs ${className}`}>
        {layouts.map((item) => {
          const isActive = shellLayout === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id, item.label)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-sm shadow-slate-900/10 border border-emerald-500/40 ring-1 ring-emerald-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-700/50'
              }`}
              title={`${item.label} — ${item.desc}`}
            >
              <span className={isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}>
                {item.icon}
              </span>
              <span>{item.shortLabel}</span>
            </button>
          );
        })}

        <button
          onClick={() => setLayoutModalOpen(true)}
          className="ml-1 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/70 dark:hover:bg-slate-700/60 transition cursor-pointer"
          title="Advanced Display & Spacing Settings"
        >
          <Sliders className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  // 2. HEADER POPOVER / COMPACT DROPDOWN (Fits in all navbars and headers)
  return (
    <div className={`relative inline-block ${className}`}>
      
      {/* Toast Notification when layout switched */}
      {justSwitched && (
        <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-black shadow-lg animate-in fade-in slide-in-from-top-1 duration-150 z-50 flex items-center gap-1">
          <Check className="w-3 h-3 stroke-[3]" />
          <span>Switched to {justSwitched}</span>
        </div>
      )}

      {/* Main Trigger Pill */}
      <div className="flex items-center">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="inline-flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-full border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/30 text-slate-800 dark:text-slate-100 transition shadow-xs cursor-pointer text-xs font-bold"
          title="Switch Layout (Standard, Executive Sidebar, Split Workspace, Zen Focus)"
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            {currentLayoutObj.icon}
          </div>
          <span className="hidden sm:inline font-bold">
            {currentLayoutObj.shortLabel}
          </span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-extrabold uppercase hidden md:inline">
            Layout
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Dropdown Menu Popover */}
      {dropdownOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setDropdownOpen(false)} 
          />
          <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-2 border-emerald-500/30 shadow-2xl shadow-slate-950/50 p-2.5 z-50 text-slate-900 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-150">
            
            {/* Header info */}
            <div className="px-2.5 py-2 mb-1 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 text-xs">
              <span className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                Select Preferred Layout
              </span>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  setLayoutModalOpen(true);
                }}
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Sliders className="w-3 h-3" />
                <span>More Settings</span>
              </button>
            </div>

            {/* Layout Options List */}
            <div className="space-y-1">
              {layouts.map((item) => {
                const isSelected = shellLayout === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id, item.label)}
                    className={`w-full text-left p-2.5 rounded-xl transition flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-400/60 dark:border-emerald-700/60 shadow-xs'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800/70 border border-transparent'
                    }`}
                  >
                    <div className={`p-2 rounded-xl mt-0.5 shrink-0 ${item.color}`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-xs font-bold truncate ${isSelected ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-900 dark:text-white'}`}>
                          {item.label}
                        </span>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5 line-clamp-1">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800 px-2 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">1-click instant layout switch</span>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  setLayoutModalOpen(true);
                }}
                className="font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition cursor-pointer"
              >
                ⚙️ Width &amp; Density
              </button>
            </div>

          </div>
        </>
      )}

    </div>
  );
};
