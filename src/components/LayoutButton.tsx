import React from 'react';
import { Layout, Columns, Sidebar, Maximize2 } from 'lucide-react';
import { useLayout } from '../context/LayoutContext';
import { QuickLayoutSwitcher } from './QuickLayoutSwitcher';

interface LayoutButtonProps {
  variant?: 'navbar' | 'compact' | 'pill' | 'sidebar' | 'inline';
  className?: string;
}

export const LayoutButton: React.FC<LayoutButtonProps> = ({ variant = 'navbar', className = '' }) => {
  const { shellLayout, setLayoutModalOpen } = useLayout();

  const getLayoutIcon = () => {
    switch (shellLayout) {
      case 'sidebar':
        return <Sidebar className="w-4 h-4 text-teal-600 dark:text-teal-400" />;
      case 'split':
        return <Columns className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'zen':
        return <Maximize2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'standard':
      default:
        return <Layout className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  const getLayoutLabel = () => {
    switch (shellLayout) {
      case 'sidebar':
        return 'Executive Sidebar';
      case 'split':
        return 'Dual Split';
      case 'zen':
        return 'Zen Focus';
      case 'standard':
      default:
        return 'Standard Top Nav';
    }
  };

  // Inline segmented bar
  if (variant === 'inline') {
    return <QuickLayoutSwitcher variant="inline" className={className} />;
  }

  // Compact icon button
  if (variant === 'compact') {
    return (
      <button
        onClick={() => setLayoutModalOpen(true)}
        className={`p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition shadow-xs cursor-pointer ${className}`}
        title="Customize Layout & Display"
        aria-label="Customize Layout"
      >
        {getLayoutIcon()}
      </button>
    );
  }

  // Sidebar item button
  if (variant === 'sidebar') {
    return (
      <button
        onClick={() => setLayoutModalOpen(true)}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100/60 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-700/80 hover:border-emerald-400 transition cursor-pointer ${className}`}
      >
        <div className="flex items-center gap-2">
          {getLayoutIcon()}
          <span>Layout Architecture</span>
        </div>
        <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-black uppercase">
          {getLayoutLabel().split(' ')[0]}
        </span>
      </button>
    );
  }

  // Default navbar pill uses the new interactive QuickLayoutSwitcher
  return <QuickLayoutSwitcher variant="header" className={className} />;
};
