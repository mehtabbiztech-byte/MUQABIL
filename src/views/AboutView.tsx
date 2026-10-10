import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Target, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Award, 
  HelpCircle,
  ArrowRight,
  Globe,
  ExternalLink,
  GraduationCap,
  Code,
  Heart,
  FileText,
  Download
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setTab, setDomainModalOpen } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Brand Mission Hero */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>MUQABIL (مقابل) Platform Vision</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-display">
          “Har Test Mein Sab Se Agay. <br />
          <span className="text-emerald-600 dark:text-emerald-400">The Contender’s Edge.”</span>
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          <strong>MUQABIL (muqabil.pk)</strong> is an independent, state-of-the-art educational testing platform founded by <strong>Mehtab Ali</strong>, designed specifically to help Pakistani students and civil service aspirants conquer public examinations (STS BPS 05–15, STEDA Teaching License, SPSC, and FPSC).
        </p>
      </div>

      {/* Founder Profile Spotlight */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 text-white border border-emerald-800/60 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-emerald-300 text-slate-950 font-black text-2xl sm:text-3xl flex items-center justify-center shadow-xl ring-4 ring-emerald-500/30 shrink-0 font-display">
              M
            </div>
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-600/60 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Founder &amp; Lead Architect</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
                Mehtab Ali
              </h2>
              <p className="text-emerald-400 font-semibold text-xs sm:text-sm">
                Creator of MUQABIL (مقابل) • Tech &amp; Education Lead
              </p>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl pt-1">
                “I built MUQABIL to empower every candidate with rigorous test simulators, official past paper solutions, and comprehensive notes for Sukkur IBA STS, STEDA, SPSC, and FPSC.”
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full md:w-auto">
            <a 
              href="https://github.com/mehtabbiztech-byte/MUQABIL/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-xs cursor-pointer"
            >
              <span>Feedback via GitHub Issues</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/mehtabbiztech-byte/MUQABIL"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 text-slate-300 hover:text-white text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Code className="w-3.5 h-3.5 text-emerald-400" />
              <span>mehtabbiztech-byte/MUQABIL</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3 Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white font-display">
            Authentic & Verified Content
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Every question undergoes multi-tier academic verification against authentic textbooks, official acts of Parliament, and historic Gazettes.
          </p>
        </div>

        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/60 flex items-center justify-center text-teal-600 dark:text-teal-400">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white font-display">
            Exact Commission Testing Schemes
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            From PPSC 0.25 negative penalties to STS IBA Sukkur screening patterns, our mock engines reproduce the exact environment of testing agencies.
          </p>
        </div>

        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white font-display">
            Mistake Review Architecture
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            We believe true retention comes from understanding mistakes. Our automatic Mistake Notebook ensures you never repeat an incorrect answer twice.
          </p>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
            Answers & Clarity
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
              Who is the founder and developer of MUQABIL (مقابل)?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              MUQABIL was founded and built by <strong className="text-slate-900 dark:text-white">Mehtab Ali</strong>. Direct email support and inquiries are available at <code className="text-emerald-500 font-bold">mehtabbiztech@gmail.com</code>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
              Is MUQABIL free to use?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Yes, our MCQ practice banks, subject-wise quizzes, study notes, and solved past paper archives are completely accessible for all aspirants across Pakistan.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
              Are past papers authentic?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              All questions are compiled from official candidate memory transcripts, gazetted answer keys, and authentic past testing papers from FPSC, PPSC, SPSC, and STS.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
              How does the negative marking feature work?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              In commissions like PPSC (Punjab Public Service Commission) and PMS screening, each incorrect answer deducts 0.25 marks. You can toggle this setting on or off in the Timed Quiz engine.
            </p>
          </div>
        </div>
      </div>

      {/* Technical Architecture & Specification Manual (PDF) */}
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white border border-emerald-800/80 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Platform Engineering &amp; Whitepaper</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
            MUQABIL Technical Details &amp; Architecture Manual (PDF)
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Download the official publication-grade technical specification of MUQABIL (muqabil.pk). Includes React 19 architecture, Node/Express server runtime, Google Cloud Firestore schemas &amp; security rules, 1,200+ MCQs repository, 16-year FPSC CSS Current Affairs subjective exam engine, and client-side jsPDF/XLSX export subsystems.
          </p>
          <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-semibold text-emerald-200">
            <span className="bg-white/10 px-2.5 py-1 rounded-lg">React 19 + TypeScript + Vite</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-lg">Express 5 + Google GenAI</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-lg">Cloud Firestore RBAC</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-lg">jsPDF Document Engine</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 w-full md:w-auto relative z-10">
          <a
            href="/technical-details-muqabil.pdf"
            download="MUQABIL_Technical_Specification_Document.pdf"
            className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm transition shadow-lg shadow-emerald-950/60 cursor-pointer flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Technical Details (PDF)</span>
          </a>
          <a
            href="/technical-details-muqabil.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-300" />
            <span>View PDF in Browser</span>
          </a>
        </div>
      </div>

      {/* Custom Domain & Deployment Box */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-bold">
            <Globe className="w-3.5 h-3.5" />
            <span>Official Domain Configuration</span>
          </div>
          <h3 className="text-xl font-bold font-display">
            Official Production URL: muqabil.pk
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Target primary URL: <code className="text-emerald-400 font-mono font-bold">muqabil.pk</code> (Secondary: <code className="text-emerald-300 font-mono">muqabilprep.com</code>). Automated SSL certificate, edge routing, and cloud synchronization are built-in.
          </p>
        </div>

        <button
          onClick={() => setDomainModalOpen(true)}
          className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition shadow-lg shadow-emerald-950/40 cursor-pointer flex items-center gap-2 shrink-0"
        >
          <Globe className="w-4 h-4" />
          <span>DNS Setup Guide</span>
        </button>
      </div>

      {/* Disclaimer */}
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/40 text-center text-xs text-slate-500 dark:text-slate-400">
        <strong>Academic Disclaimer:</strong> MUQABIL (muqabil.pk) is an independent educational preparatory resource. It is not officially affiliated with or endorsed by the Federal Public Service Commission (FPSC), Punjab Public Service Commission (PPSC), Sindh Public Service Commission (SPSC), or Sukkur IBA Testing Services (STS).
      </div>

    </div>
  );
};
