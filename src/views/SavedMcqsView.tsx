import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bookmark, 
  HelpCircle, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  RotateCcw, 
  Trophy,
  ArrowRight,
  BookOpen,
  Cloud,
  LogIn,
  FileDown,
  FileSpreadsheet,
  FileText
} from 'lucide-react';
import { MCQS_DATA } from '../data/mcqsData';
import { MCQ } from '../types';
import { ExportModal } from '../components/ExportModal';
import { exportMcqsToExcel } from '../lib/exportUtils';

interface SavedMcqsViewProps {
  initialSubTab?: 'bookmarks' | 'mistakes';
}

export const SavedMcqsView: React.FC<SavedMcqsViewProps> = ({ initialSubTab = 'bookmarks' }) => {
  const { 
    user,
    userProfile, 
    toggleBookmark, 
    removeMistake, 
    clearAllMistakes,
    setTab,
    setAuthModalOpen,
    recordQuizAttempt
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'bookmarks' | 'mistakes'>(initialSubTab);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [exportModalOpen, setExportModalOpen] = useState(false);

  React.useEffect(() => {
    setActiveSubTab(initialSubTab);
  }, [initialSubTab]);

  // Bookmarked MCQs
  const bookmarkedMcqs = useMemo(() => {
    return MCQS_DATA.filter((m) => userProfile.bookmarks.includes(m.id));
  }, [userProfile.bookmarks]);

  // Mistakes MCQs
  const mistakeMcqs = useMemo(() => {
    return MCQS_DATA.filter((m) => userProfile.mistakeIds.includes(m.id));
  }, [userProfile.mistakeIds]);

  const toggleReveal = (id: string) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentList = activeSubTab === 'bookmarks' ? bookmarkedMcqs : mistakeMcqs;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              Personalized Revision Notebook
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
              {activeSubTab === 'bookmarks' ? 'Bookmarked Questions' : 'Incorrect Answers & Mistake Notebook'}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              {activeSubTab === 'bookmarks'
                ? 'Review important, tricky, and repeated questions you saved during your study sessions.'
                : 'Focus on your weaknesses. Every question answered incorrectly during quizzes is automatically recorded here for targeted review.'}
            </p>
          </div>

          {activeSubTab === 'mistakes' && mistakeMcqs.length > 0 && (
            <button
              onClick={clearAllMistakes}
              className="px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-950/50 cursor-pointer flex items-center gap-1 self-start sm:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Mistake Notebook</span>
            </button>
          )}
        </div>

        {/* Tab switchers and Download buttons */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubTab('bookmarks')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
                activeSubTab === 'bookmarks'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved Bookmarks ({userProfile.bookmarks.length})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('mistakes')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
                activeSubTab === 'mistakes'
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Mistakes Notebook ({userProfile.mistakeIds.length})</span>
            </button>
          </div>

          {currentList.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setExportModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-2xs cursor-pointer"
                title="Download as PDF practice paper"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const title = activeSubTab === 'bookmarks' ? 'MUQABIL_Bookmarked_MCQs' : 'MUQABIL_Mistakes_Notebook';
                  exportMcqsToExcel(currentList, title, { subject: activeSubTab === 'bookmarks' ? 'Bookmarked MCQs' : 'Mistakes Notebook' });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-xs font-bold transition cursor-pointer"
                title="Download as Excel spreadsheet"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Download Excel</span>
              </button>
            </div>
          )}
        </div>

        {/* Database Sync Status Alert */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          {user ? (
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
              <Cloud className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>
                <strong>Cloud Firestore Synced:</strong> Your saved questions and mistakes are safely backed up for <strong>{user.email}</strong>.
              </span>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2 text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 p-2.5 rounded-xl border border-amber-200 dark:border-amber-900/40">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                <span><strong>Guest Mode:</strong> Questions are stored in this browser only. Sign in to sync across all your devices.</span>
              </span>
              <button
                type="button"
                onClick={() => setAuthModalOpen(true)}
                className="self-start sm:self-auto px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-[11px] flex items-center gap-1 shadow-2xs cursor-pointer"
              >
                <LogIn className="w-3 h-3" />
                <span>Sign In & Sync</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MCQs List */}
      {currentList.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center text-slate-500 space-y-4">
          <BookOpen className="w-12 h-12 mx-auto text-slate-400" />
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              {activeSubTab === 'bookmarks' ? 'No Saved Bookmarks Yet' : 'Your Mistake Notebook is Clean!'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              {activeSubTab === 'bookmarks'
                ? 'Click the bookmark icon on any MCQ across the platform to save it for rapid revision.'
                : 'Whenever you answer a question incorrectly in quiz mode or MCQ practice, it automatically appears here so you can master it.'}
            </p>
          </div>
          <button
            onClick={() => {
              setTab('mcqs');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition cursor-pointer"
          >
            Start Practicing MCQs Now
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {currentList.map((mcq, idx) => {
            const isRevealed = revealed[mcq.id] || false;
            return (
              <div
                key={mcq.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs"
              >
                <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                  <span className="font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider text-[11px]">
                    Q {idx + 1} • {mcq.category.replace('-', ' ')}
                  </span>

                  <div className="flex items-center gap-2">
                    {activeSubTab === 'bookmarks' && (
                      <button
                        onClick={() => toggleBookmark(mcq.id)}
                        className="text-xs text-rose-600 hover:underline cursor-pointer"
                      >
                        Remove Bookmark
                      </button>
                    )}
                    {activeSubTab === 'mistakes' && (
                      <button
                        onClick={() => removeMistake(mcq.id)}
                        className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-100 cursor-pointer"
                      >
                        Mark Mastered ✓
                      </button>
                    )}
                  </div>
                </div>

                <p className="font-bold text-base text-slate-900 dark:text-white mb-3">
                  {mcq.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                  {mcq.options.map((opt, oIdx) => {
                    const isCorrect = oIdx === mcq.correctIndex;
                    return (
                      <div
                        key={oIdx}
                        className={`p-2.5 rounded-xl border flex items-center justify-between ${
                          isRevealed && isCorrect
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-100 font-bold ring-1 ring-emerald-500'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{String.fromCharCode(65 + oIdx)}.</span>
                          <span>{opt}</span>
                        </div>
                        {isRevealed && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {isRevealed && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 mb-3">
                    <strong className="text-emerald-700 dark:text-emerald-400 block mb-0.5">
                      Correct Answer & Explanation:
                    </strong>
                    {mcq.explanation}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <button
                    onClick={() => toggleReveal(mcq.id)}
                    className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
                  >
                    {isRevealed ? 'Hide Answer' : 'Show Answer & Explanation'}
                  </button>

                  <span className="text-slate-400">
                    Exam tags: {mcq.examTags?.join(', ')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Export Options Modal */}
      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        mcqs={currentList}
        subjectTitle={activeSubTab === 'bookmarks' ? 'My Bookmarked Questions' : 'My Mistakes Revision Notebook'}
        defaultCandidateName={userProfile?.name}
      />

    </div>
  );
};
