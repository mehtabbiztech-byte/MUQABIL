import React, { useState } from 'react';
import { 
  X, 
  Layout, 
  Columns, 
  Sidebar as SidebarIcon, 
  Maximize2, 
  Sliders, 
  Check, 
  Type, 
  Sparkles,
  Zap,
  RotateCcw,
  Monitor,
  Smartphone,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { useLayout, ShellLayout, ContainerWidth, ContentDensity, FontSizeScale } from '../context/LayoutContext';

interface LayoutWireframeProps {
  layout: ShellLayout;
  isActive: boolean;
}

const LayoutWireframe: React.FC<LayoutWireframeProps> = ({ layout, isActive }) => {
  const activeRing = isActive 
    ? 'border-emerald-500 ring-2 ring-emerald-500/50 shadow-md shadow-emerald-500/20' 
    : 'border-slate-200 dark:border-slate-700/80 group-hover:border-slate-400 dark:group-hover:border-slate-600';

  if (layout === 'standard') {
    return (
      <div className={`w-full h-24 rounded-xl border bg-slate-50 dark:bg-slate-900/80 p-2 flex flex-col gap-1.5 transition-all ${activeRing}`}>
        {/* Top Navbar */}
        <div className="h-4 rounded-md bg-gradient-to-r from-emerald-600 to-teal-700 flex items-center justify-between px-2 shadow-xs">
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-white" />
            <div className="w-8 h-1 rounded-xs bg-white/90" />
          </div>
          <div className="flex gap-1">
            <div className="w-3.5 h-1 rounded-xs bg-white/70" />
            <div className="w-3.5 h-1 rounded-xs bg-white/70" />
            <div className="w-3.5 h-1 rounded-xs bg-white/70" />
          </div>
        </div>
        {/* News ticker */}
        <div className="h-2.5 rounded-xs bg-emerald-100 dark:bg-emerald-950/80 flex items-center px-2">
          <div className="w-20 h-1 rounded-xs bg-emerald-600/70 dark:bg-emerald-400/70" />
        </div>
        {/* Content grid */}
        <div className="flex-1 grid grid-cols-3 gap-1">
          <div className="rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 flex flex-col justify-between">
            <div className="w-6 h-1 rounded-xs bg-slate-300 dark:bg-slate-600" />
            <div className="w-full h-1.5 rounded-xs bg-emerald-500/30" />
          </div>
          <div className="rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 flex flex-col justify-between">
            <div className="w-6 h-1 rounded-xs bg-slate-300 dark:bg-slate-600" />
            <div className="w-full h-1.5 rounded-xs bg-amber-500/30" />
          </div>
          <div className="rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 flex flex-col justify-between">
            <div className="w-6 h-1 rounded-xs bg-slate-300 dark:bg-slate-600" />
            <div className="w-full h-1.5 rounded-xs bg-purple-500/30" />
          </div>
        </div>
      </div>
    );
  }

  if (layout === 'sidebar') {
    return (
      <div className={`w-full h-24 rounded-xl border bg-slate-50 dark:bg-slate-900/80 p-2 flex gap-1.5 transition-all ${activeRing}`}>
        {/* Left Sidebar */}
        <div className="w-12 rounded-lg bg-gradient-to-b from-teal-800 to-emerald-900 flex flex-col p-1.5 gap-1 shadow-xs">
          <div className="w-5 h-2 rounded-xs bg-white font-black" />
          <div className="w-full h-1.5 rounded-xs bg-white/40 mt-1" />
          <div className="w-full h-1.5 rounded-xs bg-emerald-300/80 font-bold" />
          <div className="w-full h-1.5 rounded-xs bg-white/40" />
          <div className="w-full h-1.5 rounded-xs bg-white/40" />
          <div className="mt-auto w-4 h-1.5 rounded-xs bg-emerald-400" />
        </div>
        {/* Right workspace */}
        <div className="flex-1 flex flex-col gap-1">
          {/* Top header bar */}
          <div className="h-3.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between px-1.5 shadow-xs">
            <div className="w-14 h-1.5 rounded-xs bg-slate-400 dark:bg-slate-500" />
            <div className="w-5 h-1.5 rounded-full bg-emerald-500/80" />
          </div>
          {/* Main Content Area */}
          <div className="flex-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1.5 flex flex-col gap-1">
            <div className="w-20 h-2 rounded-xs bg-slate-400 dark:bg-slate-500" />
            <div className="grid grid-cols-2 gap-1 flex-1">
              <div className="rounded-xs bg-slate-100 dark:bg-slate-700/60" />
              <div className="rounded-xs bg-slate-100 dark:bg-slate-700/60" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (layout === 'split') {
    return (
      <div className={`w-full h-24 rounded-xl border bg-slate-50 dark:bg-slate-900/80 p-2 flex flex-col gap-1.5 transition-all ${activeRing}`}>
        {/* Mini Header */}
        <div className="h-3.5 rounded-md bg-gradient-to-r from-blue-700 to-indigo-800 flex items-center justify-between px-2">
          <div className="w-12 h-1 rounded-xs bg-white/90" />
          <div className="w-6 h-1 rounded-xs bg-white/60" />
        </div>
        {/* Dual Pane Master-Detail Split */}
        <div className="flex-1 flex gap-1.5">
          {/* Left Master List */}
          <div className="w-2/5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 flex flex-col gap-1">
            <div className="w-full h-1.5 rounded-xs bg-blue-500 font-bold" />
            <div className="w-full h-1.5 rounded-xs bg-slate-200 dark:bg-slate-700" />
            <div className="w-full h-1.5 rounded-xs bg-slate-200 dark:bg-slate-700" />
            <div className="w-full h-1.5 rounded-xs bg-slate-200 dark:bg-slate-700" />
          </div>
          {/* Right Detail Reading Canvas */}
          <div className="flex-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1.5 flex flex-col gap-1">
            <div className="w-20 h-2 rounded-xs bg-slate-400 dark:bg-slate-500" />
            <div className="w-full h-1.5 rounded-xs bg-slate-200 dark:bg-slate-700" />
            <div className="w-4/5 h-1.5 rounded-xs bg-slate-200 dark:bg-slate-700" />
            <div className="mt-auto h-2 rounded-xs bg-blue-100 dark:bg-blue-950/80" />
          </div>
        </div>
      </div>
    );
  }

  // Zen / Focus layout wireframe
  return (
    <div className={`w-full h-24 rounded-xl border bg-slate-900 dark:bg-slate-950 p-2 flex flex-col justify-between transition-all ${activeRing}`}>
      {/* Top minimal escape pill */}
      <div className="w-20 h-2.5 rounded-full bg-slate-800 border border-slate-700 mx-auto flex items-center justify-center px-1">
        <div className="w-2 h-1 rounded-full bg-emerald-400 animate-pulse" />
      </div>
      {/* Centered reading canvas */}
      <div className="space-y-1 w-3/4 mx-auto">
        <div className="w-full h-3 rounded-md bg-slate-800" />
        <div className="w-4/5 h-2 rounded-xs bg-slate-700/80 mx-auto" />
      </div>
      {/* Floating Bottom Glass Hub */}
      <div className="w-32 h-3.5 rounded-full bg-emerald-500/90 shadow-lg mx-auto flex items-center justify-around px-2">
        <div className="w-2 h-1.5 rounded-full bg-white" />
        <div className="w-5 h-1.5 rounded-full bg-white font-mono" />
        <div className="w-2 h-1.5 rounded-full bg-white" />
      </div>
    </div>
  );
};

export const LayoutSwitcherModal: React.FC = () => {
  const { 
    shellLayout, 
    setShellLayout, 
    containerWidth, 
    setContainerWidth, 
    contentDensity, 
    setContentDensity, 
    fontSize, 
    setFontSize,
    layoutModalOpen, 
    setLayoutModalOpen 
  } = useLayout();

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!layoutModalOpen) return null;

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  const shellLayouts: { 
    id: ShellLayout; 
    title: string; 
    subtitle: string; 
    tag: string;
    bestFor: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'standard',
      title: 'Standard Top Nav',
      subtitle: 'Classic government testing portal layout with sticky top header and news ticker.',
      tag: 'Classic Standard',
      bestFor: '🏛️ Best for laptops & desktops with large monitors',
      icon: <Layout className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
    },
    {
      id: 'sidebar',
      title: 'Executive Sidebar',
      subtitle: 'Modern LMS & workspace layout with collapsible left navigation rail and top breadcrumbs.',
      tag: 'Executive Workspace',
      bestFor: '📊 Best for rapid switching across 15+ sections & modules',
      icon: <SidebarIcon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
    },
    {
      id: 'split',
      title: 'Dual Split Workspace',
      subtitle: 'Master-detail view with persistent syllabus index on left and reading canvas on right.',
      tag: 'Master-Detail Study',
      bestFor: '📑 Best for continuous syllabus browsing & MCQs practice',
      icon: <Columns className="w-4 h-4 text-blue-600 dark:text-blue-400" />
    },
    {
      id: 'zen',
      title: 'Zen Focus Mode',
      subtitle: 'Distraction-free exam hall immersion with clean viewport and floating glass bottom dock.',
      tag: 'Exam Immersion',
      bestFor: '🧘 Best for deep timed mock tests without distractions',
      icon: <Maximize2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
    }
  ];

  const widths: { id: ContainerWidth; label: string; desc: string; previewWidth: string }[] = [
    { id: 'standard', label: 'Standard Max-Width', desc: '1280px (Optimal reading margin)', previewWidth: 'w-2/3' },
    { id: 'wide', label: 'Widescreen Max-Width', desc: '1536px (Spacious multi-column canvas)', previewWidth: 'w-5/6' },
    { id: 'fluid', label: 'Full Edge-to-Edge', desc: '100% Fluid (Edge-to-edge full width)', previewWidth: 'w-full' }
  ];

  const densities: { id: ContentDensity; label: string; desc: string; sampleHeight: string }[] = [
    { id: 'comfortable', label: 'Comfortable', desc: 'Generous padding & larger touch targets', sampleHeight: 'h-6' },
    { id: 'standard', label: 'Standard', desc: 'Balanced spacing for desktop & mobile', sampleHeight: 'h-4' },
    { id: 'compact', label: 'Compact', desc: 'High density for rapid test solving & scanning', sampleHeight: 'h-2.5' }
  ];

  const fontScales: { id: FontSizeScale; label: string; preview: string; multiplier: string }[] = [
    { id: 'normal', label: 'Standard (100%)', preview: 'STS IBA Sindh BPS 5–15 Solved Bank', multiplier: '1.0x' },
    { id: 'large', label: 'Large (112%)', preview: 'STS IBA Sindh BPS 5–15 Solved Bank', multiplier: '1.12x' },
    { id: 'xlarge', label: 'Extra Large (125%)', preview: 'STS IBA Sindh BPS 5–15 Solved Bank', multiplier: '1.25x' }
  ];

  const applyPreset = (preset: 'classic' | 'pro' | 'exam') => {
    if (preset === 'classic') {
      setShellLayout('standard');
      setContainerWidth('standard');
      setContentDensity('standard');
      setFontSize('normal');
      triggerToast('Applied Standard Portal Preset');
    } else if (preset === 'pro') {
      setShellLayout('sidebar');
      setContainerWidth('wide');
      setContentDensity('comfortable');
      setFontSize('normal');
      triggerToast('Applied Executive Workspace Preset');
    } else if (preset === 'exam') {
      setShellLayout('zen');
      setContainerWidth('standard');
      setContentDensity('compact');
      setFontSize('large');
      triggerToast('Applied Zen Exam Hall Preset');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="layout-modal-title"
    >
      <div 
        className="fixed inset-0" 
        onClick={() => setLayoutModalOpen(false)} 
      />

      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-500/50 shadow-2xl shadow-slate-950/70 p-5 sm:p-8 text-slate-900 dark:text-slate-100 z-10 scrollbar-thin">
        
        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-emerald-600 text-white font-black text-xs shadow-xl animate-in fade-in slide-in-from-top-2 duration-150 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 flex items-center justify-center text-white shadow-lg shadow-emerald-950/30">
              <Layout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="layout-modal-title" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-display">
                  Display &amp; Layout Architecture Studio
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-black uppercase">
                  4 Dynamic Modes
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Switch your workspace layout with 1-click, or adjust container width, information density, and reading text scale.
              </p>
            </div>
          </div>

          <button
            onClick={() => setLayoutModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            aria-label="Close layout settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets Bar */}
        <div className="mt-5 p-3.5 rounded-2xl bg-gradient-to-r from-slate-50 to-emerald-50/40 dark:from-slate-800/60 dark:to-emerald-950/20 border border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Recommended Ready-To-Use Presets:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => applyPreset('classic')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer shadow-xs"
            >
              🏛️ Standard Government Portal
            </button>
            <button
              onClick={() => applyPreset('pro')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer shadow-xs"
            >
              📊 Executive LMS Dashboard
            </button>
            <button
              onClick={() => applyPreset('exam')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer shadow-xs"
            >
              🧘 Zen Distraction-Free Exam Hall
            </button>
          </div>
        </div>

        {/* Section 1: Shell Layout Architecture */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <SidebarIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              1. Primary Application Shell Layout (Click to Select)
            </h3>
            <span className="text-xs text-slate-500 hidden sm:inline">Instant live preview</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {shellLayouts.map((item) => {
              const isSelected = shellLayout === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setShellLayout(item.id);
                    triggerToast(`Switched to ${item.title}`);
                  }}
                  className={`group relative text-left rounded-2xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 shadow-lg shadow-emerald-900/10 ring-2 ring-emerald-500/40'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Live Realistic Wireframe */}
                    <div className="mb-3.5">
                      <LayoutWireframe layout={item.id} isActive={isSelected} />
                    </div>

                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        isSelected 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        {item.tag}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <h4 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 block mb-2">
                      {item.bestFor}
                    </span>
                    <button
                      type="button"
                      className={`w-full py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-emerald-500 group-hover:text-white'
                      }`}
                    >
                      {isSelected ? 'Active Layout' : 'Select Layout'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Width & Density Controls */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          
          {/* Container Width */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Columns className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                2. Viewport Max Width
              </h3>
              <span className="text-xs text-slate-500">Screen real estate</span>
            </div>

            <div className="space-y-2">
              {widths.map((w) => {
                const isSelected = containerWidth === w.id;
                return (
                  <button
                    key={w.id}
                    onClick={() => {
                      setContainerWidth(w.id);
                      triggerToast(`Width set to ${w.label}`);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-semibold ring-1 ring-emerald-500 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex-1 pr-2">
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {w.label}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {w.desc}
                      </div>
                      {/* Visual proportion bar */}
                      <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 mt-2 max-w-[140px] overflow-hidden">
                        <div className={`h-full rounded-full ${isSelected ? 'bg-emerald-500' : 'bg-slate-400'} ${w.previewWidth}`} />
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Density */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                3. Information Density
              </h3>
              <span className="text-xs text-slate-500">Padding &amp; touch targets</span>
            </div>

            <div className="space-y-2">
              {densities.map((d) => {
                const isSelected = contentDensity === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => {
                      setContentDensity(d.id);
                      triggerToast(`Density set to ${d.label}`);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-semibold ring-1 ring-emerald-500 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex-1 pr-2">
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {d.label}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {d.desc}
                      </div>
                      {/* Visual spacing indicator */}
                      <div className="flex items-center gap-1 mt-2">
                        <span className={`w-12 ${d.sampleHeight} rounded-xs border border-dashed ${isSelected ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-950' : 'border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800'}`} />
                        <span className="text-[10px] text-slate-400">Sample Row</span>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Section 3: Typography Scaling */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Type className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              4. Reading Text Size Scaling
            </h3>
            <span className="text-xs text-slate-500">Fatigue-free reading</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {fontScales.map((f) => {
              const isSelected = fontSize === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => {
                    setFontSize(f.id);
                    triggerToast(`Font scale set to ${f.label}`);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 ring-1 ring-emerald-500 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {f.label}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                  </div>
                  <p className={`text-slate-700 dark:text-slate-300 leading-snug p-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 ${
                    f.id === 'xlarge' ? 'text-base font-bold' : f.id === 'large' ? 'text-sm font-semibold' : 'text-xs'
                  }`}>
                    {f.preview}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>Preferences auto-save immediately to your browser storage.</span>
          </div>
          <button
            onClick={() => setLayoutModalOpen(false)}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-md shadow-emerald-900/20 transition cursor-pointer"
          >
            Apply &amp; Continue Practicing
          </button>
        </div>

      </div>
    </div>
  );
};
