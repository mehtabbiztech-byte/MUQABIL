import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpenCheck, 
  ShieldCheck, 
  Mail, 
  CheckCircle2, 
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  FileText
} from 'lucide-react';
import { POPULAR_CATEGORIES, TOP_SUBJECTS_DIRECTORY, TEST_PREPARATION_ONLINE_SERVICES } from '../data/categoriesData';
import { EXAMS_DATA } from '../data/examsData';

export const Footer: React.FC = () => {
  const { setTab, setSelectedCategorySlug, setSelectedExamId, setDomainModalOpen } = useApp();

  const handleCategoryClick = (slug: string) => {
    setSelectedCategorySlug(slug);
    setTab('mcqs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExamClick = (examId: string) => {
    setSelectedExamId(examId);
    setTab('exams');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-300 transition-colors">
      {/* Upper Newsletter & Mission Strip */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Pakistan’s Free & Premium Exam Preparation Hub</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Ready to crack your upcoming FPSC, PPSC, SPSC, or STS Test?
            </h3>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Practice generated STS-style items, use clearly labelled paper records, and review your mistakes with the adaptive study engine.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => {
                setTab('quiz');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition shadow-lg shadow-emerald-900/30 cursor-pointer flex items-center gap-2"
            >
              <span>Take a Timed Quiz</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setTab('past-papers');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition border border-slate-700 cursor-pointer"
            >
              View Solved Papers
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md">
                <BookOpenCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white font-display">
                  MUQABIL <span className="text-emerald-400">مقابل</span>
                </span>
                <p className="text-xs text-emerald-400 font-medium tracking-wide">
                  “Har Test Mein Sab Se Agay — The Contender’s Edge”
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              <strong>MUQABIL (muqabil.pk)</strong> is Pakistan's premier competitive examination portal founded and developed by <strong className="text-white font-semibold">Mehtab Ali</strong> for STS BPS 05–15, STEDA Teaching License, SPSC, and FPSC aspirants.
            </p>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Founded & Managed by <strong>Mehtab Ali</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Per-question source status shown where available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Free mock exams & negative marking simulator</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href="https://github.com/mehtabbiztech-byte/MUQABIL/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition underline cursor-pointer"
                >
                  Feedback &amp; corrections on GitHub Issues
                </a>
              </div>
            </div>
          </div>

          {/* Top Subjects */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-3 font-display">
              Top Subjects
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {TOP_SUBJECTS_DIRECTORY.slice(0, 8).map((subj) => (
                <li key={subj.id}>
                  <button
                    onClick={() => handleCategoryClick(subj.categorySlug)}
                    className="hover:text-emerald-400 transition cursor-pointer text-left"
                  >
                    {subj.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setTab('mcqs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-emerald-400 hover:underline font-medium text-xs pt-1 flex items-center gap-1"
                >
                  <span>View All {POPULAR_CATEGORIES.length} Subjects (Management, Law &amp; more)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Test Preparation Online */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-3 font-display">
              Test Prep Online
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {TEST_PREPARATION_ONLINE_SERVICES.slice(0, 8).map((agency) => (
                <li key={agency.id}>
                  <button
                    onClick={() => handleExamClick(agency.examId)}
                    className="hover:text-emerald-400 transition cursor-pointer text-left"
                  >
                    {agency.code} — {agency.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setTab('exams');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-emerald-400 hover:underline font-medium text-xs pt-1 flex items-center gap-1"
                >
                  <span>View All {TEST_PREPARATION_ONLINE_SERVICES.length} Testing Bodies</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Study Resources */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-3 font-display">
              Prep Resources
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => setTab('past-papers')} className="hover:text-emerald-400 transition">
                  Solved Past Papers (2020-2025)
                </button>
              </li>
              <li>
                <button onClick={() => setTab('current-affairs')} className="hover:text-emerald-400 transition">
                  Pakistan Current Affairs 2026
                </button>
              </li>
              <li>
                <button onClick={() => setTab('study-notes')} className="hover:text-emerald-400 transition">
                  High-Yield Study Notes
                </button>
              </li>
              <li>
                <button onClick={() => setTab('jobs')} className="hover:text-emerald-400 transition">
                  Govt Job Notifications
                </button>
              </li>
              <li>
                <button onClick={() => setTab('rankings')} className="hover:text-emerald-400 transition">
                  Aspirants Leaderboard
                </button>
              </li>
              <li>
                <button onClick={() => setTab('mistakes')} className="hover:text-emerald-400 transition">
                  Mistake Review Notebook
                </button>
              </li>
              <li>
                <button onClick={() => setTab('about')} className="hover:text-emerald-400 transition cursor-pointer">
                  About MUQABIL (مقابل)
                </button>
              </li>
              <li>
                <a 
                  href="/technical-details-muqabil.pdf"
                  download="MUQABIL_Technical_Specification_Document.pdf"
                  className="hover:text-emerald-400 transition inline-flex items-center gap-1.5 cursor-pointer text-emerald-400/90 font-medium"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Technical Details &amp; Specs (PDF)</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/mehtabbiztech-byte/MUQABIL" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-400 transition inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </li>
              <li>
                <button 
                  onClick={() => setDomainModalOpen(true)} 
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition cursor-pointer"
                >
                  <span>🌐 Custom Domain (muqabil.pk)</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>
              Disclaimer: MUQABIL (muqabil.pk) is an independent educational platform. All questions are compiled from public past papers, standard syllabi, and official curriculum for study and practice purposes.
            </span>
          </div>
          <div className="text-slate-400 shrink-0 text-center md:text-right">
            © {new Date().getFullYear()} <span className="font-semibold text-white">MUQABIL (مقابل)</span> • Founded &amp; Developed by <span className="text-emerald-400 font-semibold">Mehtab Ali</span>. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
