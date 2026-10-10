import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Download, 
  ExternalLink, 
  Printer, 
  CheckCircle2, 
  Layers, 
  Database, 
  Server, 
  Cpu, 
  ShieldCheck, 
  BookOpen, 
  Sparkles,
  Layout,
  Terminal,
  Code2
} from 'lucide-react';

interface TechnicalDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechnicalDetailsModal: React.FC<TechnicalDetailsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'stack' | 'layouts' | 'database' | 'css-papers' | 'apis'>('overview');

  if (!isOpen) return null;

  const pdfUrl = '/technical-details-muqabil.pdf';
  const pdfDownloadName = 'MUQABIL_Technical_Specification_Document.pdf';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tech-details-title"
    >
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-500/50 shadow-2xl shadow-slate-950/70 text-slate-900 dark:text-slate-100 flex flex-col z-10">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-950/40">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="tech-details-title" className="text-lg sm:text-xl font-black font-display text-white">
                  MUQABIL Technical Specification &amp; System Architecture
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                  v1.0.0 Production Manual
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 mt-0.5">
                Complete engineering documentation, technology stack, database schemas, and multi-layout specifications.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={pdfUrl}
              download={pdfDownloadName}
              className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition shadow-md shadow-emerald-950/50 flex items-center gap-1.5 cursor-pointer"
              title="Download Full 8-Page Technical PDF Manual"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="px-6 pt-3 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          {[
            { id: 'overview', label: 'Overview & Metadata', icon: <Cpu className="w-4 h-4" /> },
            { id: 'stack', label: 'Tech Stack Matrix', icon: <Code2 className="w-4 h-4" /> },
            { id: 'layouts', label: 'Multi-Shell Layouts', icon: <Layout className="w-4 h-4" /> },
            { id: 'css-papers', label: 'CSS Subjective Engine', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'database', label: 'Cloud Firestore & RBAC', icon: <Database className="w-4 h-4" /> },
            { id: 'apis', label: 'APIs & PDF Export', icon: <Server className="w-4 h-4" /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-xl text-xs font-bold transition border-b-2 cursor-pointer shrink-0 ${
                activeTab === item.id
                  ? 'border-emerald-500 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-800 shadow-xs'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
          
          {/* TAB 1: OVERVIEW & METADATA */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Quick Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
                  <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">Total MCQs Bank</span>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">1,200+</div>
                  <span className="text-[11px] text-slate-500">15+ Academic Subjects</span>
                </div>
                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60">
                  <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400">Past Papers Index</span>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">216+</div>
                  <span className="text-[11px] text-slate-500">FPSC, PPSC, SPSC, STS</span>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
                  <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400">CSS Subjective Series</span>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">16 Years</div>
                  <span className="text-[11px] text-slate-500">2010 to 2025 Archive</span>
                </div>
                <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60">
                  <span className="text-[10px] font-black uppercase text-purple-600 dark:text-purple-400">UI Layout Shells</span>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">4 Modes</div>
                  <span className="text-[11px] text-slate-500">Standard, Sidebar, Split, Zen</span>
                </div>
              </div>

              {/* Metadata Table */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800/80 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 font-bold text-xs text-slate-700 dark:text-slate-300">
                  Platform Identification &amp; Deployment Metadata
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {[
                    ['Application Name', 'MUQABIL (مقابل) — Competitive Exam Preparation Hub'],
                    ['Primary Domain', 'muqabil.pk (Secondary: muqabilprep.com)'],
                    ['Founder & System Architect', 'Mehtab Ali (mehtabbiztech@gmail.com)'],
                    ['GitHub Repository', 'https://github.com/mehtabbiztech-byte/MUQABIL'],
                    ['Cloud Platform & Region', 'Google Cloud Run (asia-east1 containerized service)'],
                    ['Runtime Port', 'Port 3000 (Express Node.js proxy with Vite integration)'],
                    ['Database Instance', 'Cloud Firestore (ai-studio-matbstsprep-90fe2907-d1f4-4ae9-982e-e6829a98ebb9)'],
                    ['AI Engine', 'Google Gemini 2.5 Flash via @google/genai SDK (Server-Side Proxy)'],
                    ['Document Engine', 'Client-Side jsPDF 4.2.1 + SheetJS (XLSX) 0.18.5'],
                  ].map(([k, v], idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center px-4 py-2.5 gap-1 sm:gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <span className="w-52 shrink-0 font-bold text-slate-800 dark:text-slate-200">{k}</span>
                      <span className="font-mono text-slate-600 dark:text-slate-400 break-all">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scope & Philosophy */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Architectural Philosophy
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  MUQABIL is architected as an offline-resilient, zero-slop single page application (SPA) designed to empower Pakistani civil service and competitive exam aspirants across federal and provincial jurisdictions (FPSC, PPSC, SPSC, BPSC, KPPSC, Sukkur IBA STS, NTS, ETEA, STEDA). The platform guarantees instantaneous screen transitions, authentic testing blueprints with real countdown timers and negative marking penalties, printable official question booklets with bubble-fill OMR sheets, and complete 16-year subjective essay past papers.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: TECH STACK MATRIX */}
          {activeTab === 'stack' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Frontend Tier */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                    <Code2 className="w-4 h-4" />
                    <span>Frontend &amp; UI Architecture</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>React 19.0.1:</strong> Pure functional component tree with strict hook discipline and concurrent rendering.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>TypeScript 5.8.3:</strong> 100% strict type safety with comprehensive model schemas across questions, papers, and user profiles.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Tailwind CSS v4.1.14:</strong> Zero runtime CSS engine with dynamic CSS custom properties for dark/light themes.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Vite 8.3.0:</strong> Lightning-fast ES module build system with optimized asset chunking.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Lucide React 1.45.0:</strong> Consistent, accessible SVG vector icons.</span>
                    </li>
                  </ul>
                </div>

                {/* Server & Backend Tier */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                    <Server className="w-4 h-4" />
                    <span>Backend &amp; Cloud Infrastructure</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span><strong>Express 5.2.1:</strong> Lightweight HTTP proxy and static bundle server running on Node.js LTS.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span><strong>Google Cloud Run:</strong> Autoscaling container environment on Google Cloud (asia-east1).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span><strong>Firebase Firestore:</strong> NoSQL cloud database providing low-latency user data persistence and leaderboards.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span><strong>Esbuild 0.28.2:</strong> Server bundling pipeline producing self-contained CommonJS binaries for production.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span><strong>@google/genai 2.22.0:</strong> Official Google GenAI SDK interfacing with Gemini 2.5 Flash server-side.</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Document Generation */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Client-Side Vector Document Compilers
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-400">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <strong className="text-slate-900 dark:text-white block mb-1">jsPDF Vector Engine (v4.2.1)</strong>
                    Compiles candidate performance scorecards, 100-MCQ test booklets with official headers, bubble-fill OMR sheets, and descriptive examination booklets directly in the user's browser in under 300ms.
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <strong className="text-slate-900 dark:text-white block mb-1">SheetJS / XLSX Engine (v0.18.5)</strong>
                    Allows candidate data exports and repository downloads as formatted Microsoft Excel (.xlsx) workbooks with separate tabs for questions, choices, answers, and syllabus taxonomy.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MULTI-SHELL LAYOUTS */}
          {activeTab === 'layouts' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
                <h4 className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-300 mb-1">
                  Dynamic Multi-Shell Layout Architecture
                </h4>
                <p className="text-xs text-emerald-900 dark:text-emerald-200/90 leading-relaxed">
                  Unlike conventional exam sites locked to a single rigid template, MUQABIL features a high-performance LayoutContext offering 4 interchangeable shell architectures, 3 responsive viewport container widths, 3 information density scales, and typography size scalers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Standard */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">🏛️ Standard Top Nav</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">Classic Portal</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Familiar government portal layout with sticky top header, mega-menu dropdowns, live announcement ticker, and responsive container centering. Ideal for standard laptop and mobile web browsing.
                  </p>
                </div>

                {/* Sidebar */}
                <div className="p-4 rounded-2xl border border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/20 dark:bg-emerald-950/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">📊 Executive Sidebar</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">Executive Workspace</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Modern administrative LMS layout with collapsible left rail (expanded 288px / collapsed 80px), executive top breadcrumbs, profile streak counter, and instant search bar.
                  </p>
                </div>

                {/* Split */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">📑 Dual Split Workspace</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">Master-Detail Study</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Two-column workspace featuring a persistent left syllabus and test room navigator alongside the main reading canvas. Perfect for continuous question scanning without navigating away.
                  </p>
                </div>

                {/* Zen */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">🧘 Zen Focus Mode</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300">Distraction-Free</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Immersion exam hall layout that strips away headers and sidebars. Features a subtle escape pill at top and a floating glass bottom command hub with study stopwatch, font scaler, and bookmarks.
                  </p>
                </div>

              </div>

              {/* Customization Options */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200 block">
                  Fine-Grained Viewport &amp; Typography Parameters
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-600 dark:text-slate-400">
                  <div>
                    <strong className="text-slate-900 dark:text-white">Container Width:</strong>
                    <div className="mt-0.5">Standard (1280px), Widescreen (1536px), or Full Fluid (100%).</div>
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Information Density:</strong>
                    <div className="mt-0.5">Comfortable (generous padding), Standard (balanced), or Compact (maximum data density).</div>
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Typography Scaling:</strong>
                    <div className="mt-0.5">Normal (100%), Large (112%), or Extra Large (125%) for fatigue-free long study hours.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CSS SUBJECTIVE ENGINE */}
          {activeTab === 'css-papers' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 to-slate-900 text-white border border-emerald-800 space-y-1">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  FPSC CSS Current Affairs 16-Year Subjective Series
                </div>
                <h3 className="text-base font-bold text-white font-display">
                  Complete 2010 to 2025 General Knowledge Paper-II Archive
                </h3>
                <p className="text-xs text-emerald-200/90 leading-relaxed pt-1">
                  Full 16-year consecutive subjective examination papers for Central Superior Services (CSS) competitive examinations, featuring authentic Part-I (20 MCQs) and Part-II (80 Marks Descriptive Essay) questions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                  <span className="font-bold text-slate-900 dark:text-white block text-sm">
                    FPSC Paper Simulation Subsystem
                  </span>
                  <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
                    <li>• <strong>Part-I Objective:</strong> 20 verified MCQs with 30-minute countdown timer.</li>
                    <li>• <strong>Part-II Subjective:</strong> 7 descriptive essay questions (20 marks each).</li>
                    <li>• <strong>4-of-7 Attempt Rule:</strong> Enforces candidates choose exactly 4 questions with live progress tracker.</li>
                    <li>• <strong>Model Outlines &amp; Theory:</strong> Pre-built analytical frameworks and multidimensional arguments.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                  <span className="font-bold text-slate-900 dark:text-white block text-sm">
                    Writing Editor &amp; Official Question Papers
                  </span>
                  <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
                    <li>• <strong>In-App Scratchpad:</strong> Built-in written response editor with word counter and local storage autosave.</li>
                    <li>• <strong>Official Source PDFs:</strong> Pre-bundled original FPSC booklet PDF download links for all 16 years.</li>
                    <li>• <strong>Vector PDF Export:</strong> On-demand compiler generates letterhead subjective question booklets.</li>
                    <li>• <strong>Master Directory Index:</strong> Accessible via entries #201 through #216 in the master directory.</li>
                  </ul>
                </div>
              </div>

              {/* Years Grid */}
              <div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
                  16 Chronological Years Available in Archive:
                </span>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 text-center text-xs">
                  {[2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025].map(year => (
                    <div key={year} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200">
                      {year}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DATABASE & RBAC */}
          {activeTab === 'database' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  <Database className="w-4 h-4" />
                  <span>Cloud Firestore Data Collections</span>
                </div>
                <div className="space-y-2 text-xs">
                  {[
                    { name: 'users', desc: 'Candidate profiles, target exams, merit points, streak tracking, and bookmarks.' },
                    { name: 'attempts', desc: 'Detailed test submissions, scores, accuracy percentage, time elapsed, and question response maps.' },
                    { name: 'saved_mistakes', desc: 'Spaced-repetition mistake logs storing incorrect answers and review mastery flags.' },
                    { name: 'leaderboards', desc: 'Daily, weekly, and nationwide merit score aggregations and rankings.' },
                    { name: 'cms_content', desc: 'Administrative announcements, verified job bulletins, and system notices.' },
                  ].map((col, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <code className="text-emerald-600 dark:text-emerald-400 font-mono font-bold w-36 shrink-0">{col.name}</code>
                      <span className="text-slate-600 dark:text-slate-400">{col.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Security Rules &amp; RBAC (firestore.rules)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                    <span><strong>Data Isolation:</strong> Non-admin users are restricted to modifying documents matching their authenticated UID (`request.auth.uid == userId`).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                    <span><strong>Payload Validation:</strong> Enforces score bounds (0–100%) and immutable creation timestamps to prevent spoofing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                    <span><strong>Public Read:</strong> High-yield question repositories and verified syllabus data are globally readable without authentication.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 6: APIS & EXPORT */}
          {activeTab === 'apis' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-sm">
                  <Terminal className="w-4 h-4" />
                  <span>Server-Side REST Proxy Endpoints</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-[10px]">GET</span>
                      <code className="font-mono font-bold text-slate-900 dark:text-white">/api/health</code>
                    </div>
                    <p className="text-slate-500 mt-1">Liveness probe returning service status and the active feature set, for deployment monitoring and smoke tests.</p>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-mono font-bold text-[10px]">POST</span>
                      <code className="font-mono font-bold text-slate-900 dark:text-white">/api/chat</code>
                    </div>
                    <p className="text-slate-500 mt-1">Multi-turn Gemini chat with role-based system instructions, model routing, optional screenshot analysis and Google Search grounding. Rate-limited per client IP.</p>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-mono font-bold text-[10px]">POST</span>
                      <code className="font-mono font-bold text-slate-900 dark:text-white">/api/chat/stream</code>
                    </div>
                    <p className="text-slate-500 mt-1">Server-sent-events streaming variant of the chat endpoint for real-time typewriter rendering.</p>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-mono font-bold text-[10px]">POST</span>
                      <code className="font-mono font-bold text-slate-900 dark:text-white">/api/word-meaning</code>
                    </div>
                    <p className="text-slate-500 mt-1">Structured dictionary lookup returning Simple English, Urdu and Sindhi meanings with an exam-style example sentence.</p>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-mono font-bold text-[10px]">POST</span>
                      <code className="font-mono font-bold text-slate-900 dark:text-white">/api/resume-enhance</code>
                    </div>
                    <p className="text-slate-500 mt-1">ATS resume helpers: bullet-point enhancement, professional summary generation and keyword suggestions.</p>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-mono font-bold text-[10px]">POST</span>
                      <code className="font-mono font-bold text-slate-900 dark:text-white">/api/subjective-feedback</code>
                    </div>
                    <p className="text-slate-500 mt-1">Criterion-by-criterion AI feedback for Teaching License writing practice. Feedback is guidance, never official marking.</p>
                  </div>

                  <p className="text-slate-500 mt-1 px-1">
                    All AI endpoints require <code className="font-mono font-bold">GEMINI_API_KEY</code> server-side, validate their payloads, and are throttled per client IP to protect the paid model quota.
                  </p>
                </div>
              </div>

              {/* Direct PDF manual access */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-white">Full PDF Document Available</h4>
                  <p className="text-xs text-emerald-200 mt-0.5">
                    Official publication-grade PDF file (79 KB) generated with vector graphics, typography hierarchy, and complete schematics.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={pdfUrl}
                    download={pdfDownloadName}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </a>
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition flex items-center gap-1 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Open in Browser</span>
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>MUQABIL Engineering Spec • Production Ready</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              download={pdfDownloadName}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Technical PDF</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
