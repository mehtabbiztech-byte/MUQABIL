import React, { useMemo } from 'react';
import { Award, BarChart3, Clock, Target, FileText, FileSpreadsheet, type LucideIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { exportCandidateHistoryToPdf, exportCandidateHistoryToExcel } from '../lib/exportUtils';

export const RankingsView: React.FC = () => {
  const { userProfile } = useApp();
  const attempts = userProfile.quizHistory || [];
  const summary = useMemo(() => {
    const answered = attempts.reduce((sum, item) => sum + item.totalQuestions, 0);
    const score = attempts.reduce((sum, item) => sum + item.score, 0);
    const seconds = attempts.reduce((sum, item) => sum + item.timeSpentSeconds, 0);
    return { answered, seconds, accuracy: answered ? Math.round((score / answered) * 100) : 0 };
  }, [attempts]);
  const metrics: Array<[string, string | number, LucideIcon]> = [
    ['Attempts', attempts.length, Award],
    ['Questions', summary.answered, Target],
    ['Accuracy', `${summary.accuracy}%`, BarChart3],
    ['Practice time', `${Math.round(summary.seconds / 60)} min`, Clock],
  ];

  return <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
    <header className="rounded-3xl bg-slate-950 text-white p-7 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <p className="text-emerald-400 text-xs font-black uppercase tracking-widest">Personal progress</p>
        <h1 className="text-3xl sm:text-5xl font-black mt-2">Your Practice Performance</h1>
        <p className="text-slate-300 mt-3 max-w-2xl">These figures come directly from your completed practice attempts and mock examinations on MUQABIL.</p>
      </div>
      {attempts.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => exportCandidateHistoryToPdf(attempts, userProfile.name || 'Candidate')}
            className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition cursor-pointer"
            title="Download complete examination transcript in official PDF format"
          >
            <FileText className="w-4 h-4" />
            <span>Download Transcript (PDF)</span>
          </button>
          <button
            onClick={() => exportCandidateHistoryToExcel(attempts, userProfile.name || 'Candidate')}
            className="px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition cursor-pointer"
            title="Export complete mock test attempt history to Excel (.xlsx)"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export History (.xlsx)</span>
          </button>
        </div>
      )}
    </header>
    <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map(([label, value, Icon]) => <article key={label} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5"><Icon className="text-emerald-600"/><p className="text-sm text-slate-500 mt-4">{label}</p><p className="text-3xl font-black mt-1">{String(value)}</p></article>)}
    </section>
    <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-black">Recent attempts</h2>
        {attempts.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportCandidateHistoryToPdf(attempts, userProfile.name || 'Candidate')}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>PDF Transcript</span>
            </button>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <button
              onClick={() => exportCandidateHistoryToExcel(attempts, userProfile.name || 'Candidate')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Excel Log</span>
            </button>
          </div>
        )}
      </div>
      {!attempts.length ? <p className="text-slate-500 mt-3">Complete a quiz or past paper to start your personal progress history.</p> : <div className="mt-4 divide-y divide-slate-200 dark:divide-slate-800">{attempts.slice(0, 20).map(item => <article key={item.id} className="py-4 flex flex-wrap justify-between gap-3"><div><p className="font-bold">{item.title}</p><p className="text-sm text-slate-500">{new Date(item.date).toLocaleDateString()}</p></div><div className="text-right"><p className="font-black">{item.score}/{item.totalQuestions}</p><p className="text-xs text-slate-500">{Math.round((item.score / (item.totalQuestions || 1)) * 100)}% accuracy</p></div></article>)}</div>}
    </section>
  </main>;
};
