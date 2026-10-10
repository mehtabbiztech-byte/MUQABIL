import React, { useEffect, useMemo, useRef, useState } from 'react';
import { 
  Clock, 
  FileText, 
  LayoutGrid, 
  List, 
  Search, 
  BookOpen, 
  Download, 
  Printer, 
  Sparkles, 
  X, 
  CheckCircle2, 
  ExternalLink, 
  GraduationCap, 
  ChevronRight,
  Filter,
  Layers,
  FileCheck2,
  Table as TableIcon,
  Globe2,
  Landmark,
  Atom,
  Laptop,
  Calculator,
  Briefcase,
  Dna,
  BookOpenCheck,
  CheckSquare,
  Square,
  Play,
  Check,
  ArrowRight,
  FileSpreadsheet,
  Link2,
  PenTool
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PAST_PAPERS_DATA } from '../data/pastPapersData';
import { ALL_PAST_PAPERS_DIRECTORY, AllPastPaperEntry, PAST_PAPERS_DIRECTORY_CAPACITY } from '../data/allPastPapersDirectory';
import { MCQS_DATA } from '../data/mcqsData';
import { PastPaper } from '../types';
import { practiceMinutes, scorePaper } from '../lib/paperResults';
import { useCmsContent } from '../context/CmsContentContext';
import { MeaningText } from '../components/MeaningText';
import { 
  exportPastPapersDirectoryToExcel, 
  exportPastPaperAttemptToPdf, 
  exportPastPaperAttemptToExcel,
  exportMcqsToPdf,
  exportMcqsToExcel
} from '../lib/exportUtils';
import { 
  LinkedPastPaper, 
  getLinkedPastPapersForEntry, 
  getLinkedPastPaperQuestions 
} from '../data/linkedPastPapersData';
import { CssSubjectivePaperView } from '../components/CssSubjectivePaperView';

const panel = 'rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 sm:p-7';
const button = 'px-4 py-2 rounded-xl bg-emerald-700 text-white font-semibold hover:bg-emerald-800 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 cursor-pointer transition';
const secondary = 'px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 cursor-pointer transition';
const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

export function PaperSession({ paper, onExit, onRetake }: { paper: PastPaper; onExit: () => void; onRetake: () => void }) {
  const { recordQuizAttempt, userProfile, setTab } = useApp();
  const limit = (paper.durationMinutes ?? practiceMinutes(paper.mcqs.length)) * 60;
  const [started] = useState(Date.now);
  const [remaining, setRemaining] = useState(limit);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [index, setIndex] = useState(0);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [saving, setSaving] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [onlyMistakes, setOnlyMistakes] = useState(false);
  const finished = useRef(false);
  const saveStarted = useRef(false);
  const result = scorePaper(paper.mcqs, answers);
  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    setElapsed(Math.min(limit, Math.max(0, Math.floor((Date.now() - started) / 1000))));
  };
  useEffect(() => {
    if (elapsed !== null) return;
    const tick = () => {
      const left = Math.max(0, Math.ceil((started + limit * 1000 - Date.now()) / 1000));
      setRemaining(left);
      if (left === 0) finish();
    };
    const timer = window.setInterval(tick, 250);
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => { window.clearInterval(timer); window.removeEventListener('beforeunload', warn); };
  }, [elapsed, started, limit]);

  const save = async () => {
    if (saveStarted.current || elapsed === null) return;
    saveStarted.current = true;
    setSaving('Saving…');
    try {
      const saved = await recordQuizAttempt({ id: crypto.randomUUID(), date: new Date().toISOString(),
        title: `${paper.exam} ${paper.year} — practice selection`, totalQuestions: paper.mcqs.length,
        score: result.correct, timeSpentSeconds: elapsed, incorrectQuestions: result.incorrectQuestions });
      setSaving(saved.success ? 'Result and mistakes saved.' : 'Saved on this device; account sync failed.');
    } catch { setSaving('Could not confirm saving. Check your history before trying again.'); }
  };

  if (elapsed !== null) return <div className="space-y-6">
    <div className={panel}>
      <p className="text-emerald-600 font-bold">Paper complete</p><h1 className="text-3xl font-bold mt-2">Your result</h1><p className="mt-2">{paper.title}</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        {[['Score', `${result.correct}/${paper.mcqs.length}`], ['Accuracy', `${result.accuracy}%`], ['Time (min:sec)', clock(elapsed)], ['Unanswered', result.skipped]].map(([label, value]) => <div key={label} className="rounded-xl bg-slate-100 dark:bg-slate-800 p-4"><p className="text-sm">{label}</p><p className="text-2xl font-bold">{value}</p></div>)}
      </div>
      <p className="text-sm text-slate-500">Score: {result.percentage}% of all questions. Accuracy: correct ÷ answered. One mark per correct answer; no negative marking.</p>
      <p className="text-sm mt-2">Rank: unavailable — no verified comparison results yet.</p>
      <div className="flex flex-wrap gap-3 mt-5">
        <button className={button} disabled={saveStarted.current} onClick={save}>Save result & mistakes</button>
        <button 
          onClick={() => exportPastPaperAttemptToPdf(paper, result, answers, elapsed, userProfile.name || 'Candidate')}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-1.5 transition cursor-pointer shadow-sm"
          title="Download complete result scorecard & question review in PDF format"
        >
          <FileText className="w-4 h-4" />
          <span>Download Scorecard (PDF)</span>
        </button>
        <button 
          onClick={() => exportPastPaperAttemptToExcel(paper, result, answers, elapsed, userProfile.name || 'Candidate')}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center gap-1.5 transition cursor-pointer shadow-sm"
          title="Export question-by-question attempt log to Excel (.xlsx)"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Export Scorecard (Excel)</span>
        </button>
        <button className={secondary} onClick={onRetake}>Retake paper</button>
        <button className={secondary} onClick={onExit}>Back to papers</button>
        <button className={secondary} onClick={() => setTab('mistakes')}>My mistakes</button>
      </div>
      <p role="status" className="mt-3 text-sm">{saving}</p>
    </div>
    <section className={panel}><h2 className="text-xl font-bold">Subject breakdown</h2><p className="text-sm mt-1">Revise subjects below 70%; unanswered questions count as missed.</p><div className="space-y-4 mt-5">{Object.entries(result.subjects).sort((a,b) => a[1].correct/a[1].total - b[1].correct/b[1].total).map(([name, data]) => <div key={name}><div className="flex justify-between gap-3 text-sm"><span className="capitalize">{name.replaceAll('-', ' ')} {data.correct/data.total < .7 ? '· Needs practice' : '· On track'}</span><span>{data.correct}/{data.total}</span></div><progress aria-label={name} value={data.correct} max={data.total} className="w-full accent-emerald-600" /></div>)}</div></section>
    <section className="space-y-4"><div className="flex flex-wrap justify-between gap-3"><h2 className="text-xl font-bold">Question-by-question review</h2><label><input type="checkbox" checked={onlyMistakes} onChange={e => setOnlyMistakes(e.target.checked)} /> Only missed questions</label></div>
      {paper.mcqs.filter(q => !onlyMistakes || answers[q.id] !== q.correctIndex).map(q => <article className={panel} key={q.id}><p className="text-sm text-emerald-600">{answers[q.id] === q.correctIndex ? 'Correct' : answers[q.id] === undefined ? 'Unanswered' : 'Incorrect'}{userProfile.mistakeIds.includes(q.id) ? ' · In your mistakes' : ''}</p><h3 className="font-bold mt-2">{paper.mcqs.indexOf(q)+1}. <MeaningText text={q.question} /></h3><p className="mt-3">Your answer: {q.options[answers[q.id]] ?? 'Not answered'}</p><p className="font-semibold text-emerald-700 dark:text-emerald-400 mt-2">Correct answer: {q.options[q.correctIndex]}</p><p className="mt-3 text-sm leading-7"><MeaningText text={q.explanation || 'An explanation has not been added yet.'} /></p></article>)}
      {onlyMistakes && result.correct === paper.mcqs.length && <p>Perfect score — no mistakes to review.</p>}
    </section>
  </div>;

  const question = paper.mcqs[index];
  return <div className="space-y-5 animate-in fade-in duration-150">
    <div className={panel}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 uppercase tracking-wider">
            {paper.exam} · {paper.year}
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1.5">{paper.title}</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <span role="timer" className={`font-mono font-bold flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm ${remaining < 60 ? 'border-rose-500 bg-rose-50 text-rose-600 animate-pulse' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200'}`}>
            <Clock size={16}/>
            <span>{clock(remaining)} left</span>
          </span>
          
          <button 
            className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:hover:bg-rose-900 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs" 
            onClick={onExit}
            title="Exit this attempt and return to papers"
          >
            <X size={16} />
            <span>Exit attempt</span>
          </button>
        </div>
      </div>
      <p className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        {result.attempted}/{paper.mcqs.length} answered · Timer submits automatically. Leaving this page or clicking Exit attempt closes the attempt cleanly.
      </p>
    </div>
    <div className="grid lg:grid-cols-[1fr_260px] gap-5"><section className={panel}><p className="text-sm text-emerald-600 font-bold">Question {index+1} of {paper.mcqs.length}</p><h2 className="text-xl font-semibold my-5"><MeaningText text={question.question} /></h2><fieldset className="space-y-3"><legend className="sr-only">Choose one answer</legend>{question.options.map((option, i) => <label key={i} className={`flex gap-3 p-4 border rounded-xl cursor-pointer ${answers[question.id] === i ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950' : 'border-slate-300 dark:border-slate-700'}`}><input type="radio" name={question.id} checked={answers[question.id] === i} onChange={() => { if (Date.now() >= started + limit*1000) { finish(); return; } setAnswers(a => ({...a, [question.id]: i})); }} /><span><MeaningText text={option} /></span></label>)}</fieldset><div className="flex flex-wrap gap-3 mt-6"><button className={secondary} disabled={index === 0} onClick={() => setIndex(index-1)}>Previous</button><button className={secondary} disabled={index === paper.mcqs.length-1} onClick={() => setIndex(index+1)}>Next</button><button className={secondary} onClick={() => { if(Date.now() >= started + limit*1000) { finish(); return; } setAnswers(a => { const copy = {...a}; delete copy[question.id]; return copy; }); }}>Clear answer</button></div></section>
    <aside className={panel}><h2 className="font-bold mb-4">Question navigator</h2><div className="grid grid-cols-4 gap-2">{paper.mcqs.map((q, i) => <button key={q.id} aria-label={`Question ${i+1}, ${answers[q.id] === undefined ? 'unanswered' : 'answered'}`} aria-current={index === i ? 'step' : undefined} className={`rounded-lg p-2 border ${index === i ? 'ring-2 ring-emerald-500' : ''} ${answers[q.id] !== undefined ? 'bg-emerald-700 text-white' : ''}`} onClick={() => setIndex(i)}>{i+1}</button>)}</div><button className={`${button} mt-6 w-full`} onClick={() => setConfirm(true)}>Finish paper</button>{confirm && <div className="mt-4 space-y-3" role="alert"><p>{result.skipped} unanswered. Submit now?</p><button className={button} onClick={finish}>Submit answers</button><button className={secondary} onClick={() => setConfirm(false)}>Keep working</button></div>}</aside></div>
  </div>;
}

export const PastPapersView: React.FC = () => {
  const { papers: cmsPapers } = useCmsContent();
  const { 
    selectedPastPaperId, 
    setSelectedPastPaperId, 
    openPrintablePaper,
    setAgeCalculatorOpen 
  } = useApp();
  const [active, setActive] = useState<PastPaper | null>(null);
  const [session, setSession] = useState(0);

  // Search & Navigation state
  const [search, setSearch] = useState('');
  const [selectedExam, setSelectedExam] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [layoutMode, setLayoutMode] = useState<'table' | 'grid' | 'list'>('table');
  const [activeTab, setActiveTab] = useState<'directory' | 'simulated-sessions'>('directory');

  // Modal State for Syllabus & PDF preview
  const [selectedModalEntry, setSelectedModalEntry] = useState<AllPastPaperEntry | null>(null);
  const [showPdfModal, setShowPdfModal] = useState<AllPastPaperEntry | null>(null);

  // All Linked Past Papers Modal State
  const [selectedLinkedEntry, setSelectedLinkedEntry] = useState<AllPastPaperEntry | null>(null);
  const [linkedPaperFilter, setLinkedPaperFilter] = useState<'All' | 'Official Past Paper' | 'Authentic Solved Set' | 'CBT Model Paper'>('All');
  const [linkedPaperSearch, setLinkedPaperSearch] = useState<string>('');

  // Active CSS Subjective / Descriptive Paper State (for full 16-year 2010 to 2025 descriptive papers)
  const [activeCssSubjectivePaper, setActiveCssSubjectivePaper] = useState<{ year: number; entryNumber?: number } | null>(null);

  const basePracticePapers: PastPaper[] = useMemo(() => [
    ...cmsPapers.map(p => ({ 
      id: p.id, 
      title: p.title, 
      exam: p.exam, 
      conductedBy: p.conductedBy, 
      year: p.year, 
      postName: p.postName, 
      bps: p.bps, 
      totalQuestions: p.questions.length, 
      mcqs: p.questions.map((q, i) => ({ ...q, id: `${p.id}-${i + 1}` })), 
      recordType: 'Official Past Paper' as const, 
      testDateLabel: String(p.year), 
      sourceUrl: p.sourceUrls[0], 
      sourceNote: 'Published through the MEQSA editorial CMS.' 
    })), 
    ...PAST_PAPERS_DATA
  ], [cmsPapers]);

  // Subject Selection Popup Modal State
  const [subjectSelectionModalData, setSubjectSelectionModalData] = useState<{
    entry?: AllPastPaperEntry;
    paper?: PastPaper;
  } | null>(null);

  const [selectedSubjectSlugs, setSelectedSubjectSlugs] = useState<string[]>([
    'general-knowledge',
    'pakistan-affairs',
    'current-affairs',
    'english',
    'islamic-studies',
    'everyday-science',
    'computer-science',
    'mathematics'
  ]);

  const [questionCountChoice, setQuestionCountChoice] = useState<'all' | '25' | '50' | '100'>('all');

  const AVAILABLE_PAPER_SUBJECTS = [
    { id: 'general-knowledge', name: 'General Knowledge MCQs', icon: Globe2, desc: 'World geography, capitals, international bodies, treaties & discoveries' },
    { id: 'pakistan-affairs', name: 'Pakistan Affairs & History', icon: Landmark, desc: '1857–1947 struggle, 1973 Constitution, Kashmir dispute & national institutions' },
    { id: 'current-affairs', name: 'Current Affairs MCQs', icon: Sparkles, desc: '2025–2026 Pakistan & global developments, summits & leadership' },
    { id: 'english', name: 'English Language MCQs', icon: BookOpen, desc: 'Grammar, prepositions, active/passive, idioms, sentence correction' },
    { id: 'islamic-studies', name: 'Islamic Studies (Islamiat)', icon: BookOpenCheck, desc: 'Quran, Seerat-un-Nabi, Caliphate era, Ghazwat, Pillars of Islam' },
    { id: 'everyday-science', name: 'Everyday Science MCQs', icon: Atom, desc: 'General science, biology, vitamins, human body, physics & chemistry' },
    { id: 'computer-science', name: 'Computer Science & IT', icon: Laptop, desc: 'MS Office, networking, IT fundamentals, database, operating systems' },
    { id: 'mathematics', name: 'Mathematics & Basic Arithmetic', icon: Calculator, desc: 'Percentages, ratios, word problems, algebra, basic equations' },
    { id: 'management-sciences', name: 'Management Sciences & Finance', icon: Briefcase, desc: 'Accounting, auditing, financial management, HRM, marketing' },
    { id: 'pedagogy', name: 'Pedagogy & Teaching Methodology', icon: GraduationCap, desc: 'Curriculum development, Bloom taxonomy, classroom management' },
    { id: 'biology', name: 'Biology & Medical Sciences', icon: Dna, desc: 'Cell biology, genetics, human anatomy, physiology, botany & zoology' },
  ];

  const handleOpenSubjectSelection = (item: { entry?: AllPastPaperEntry; paper?: PastPaper }) => {
    const title = (item.entry?.title || item.paper?.title || '').toLowerCase();
    const category = (item.entry?.category || '').toLowerCase();

    const preselected = [
      'general-knowledge',
      'pakistan-affairs',
      'current-affairs',
      'english',
      'islamic-studies',
      'everyday-science',
    ];

    if (title.includes('computer') || title.includes('it') || title.includes('clerk') || title.includes('assistant') || title.includes('operator')) {
      preselected.push('computer-science');
    }
    if (title.includes('math') || title.includes('account') || title.includes('auditor') || title.includes('clerk') || title.includes('assistant')) {
      preselected.push('mathematics');
    }
    if (category.includes('teaching') || title.includes('teacher') || title.includes('lecturer') || title.includes('sst') || title.includes('pst') || title.includes('jest')) {
      preselected.push('pedagogy');
    }
    if (category.includes('auditing') || category.includes('finance') || title.includes('auditor') || title.includes('accountant') || title.includes('bank') || title.includes('finance')) {
      preselected.push('management-sciences');
    }
    if (category.includes('health') || title.includes('nurse') || title.includes('medical') || title.includes('doctor') || title.includes('biology')) {
      preselected.push('biology');
    }

    setSelectedSubjectSlugs([...new Set(preselected)]);
    setQuestionCountChoice('all');
    setSubjectSelectionModalData(item);
  };

  const startPaperFromDirectory = (item: AllPastPaperEntry | PastPaper) => {
    // Check if item is a CSS Subjective descriptive paper
    const titleLower = item.title.toLowerCase();
    const isCssSubjective = 
      ('id' in item && item.id.startsWith('css-ca-')) || 
      ('isSubjectivePaper' in item && item.isSubjectivePaper) ||
      (titleLower.includes('current affairs') && (titleLower.includes('css') || ('exam' in item && item.exam === 'CSS')));

    if (isCssSubjective) {
      let yr = 2025;
      if ('id' in item && item.id.startsWith('css-ca-') && item.id !== 'css-ca-master-archive') {
        const parsed = parseInt(item.id.replace('css-ca-', ''), 10);
        if (!isNaN(parsed)) yr = parsed;
      } else if ('number' in item && item.number >= 201 && item.number <= 216) {
        yr = 2010 + (item.number - 201);
      } else if ('year' in item && typeof item.year === 'number') {
        yr = item.year;
      }
      setActiveCssSubjectivePaper({ year: yr, entryNumber: 'number' in item ? item.number : undefined });
      setSelectedLinkedEntry(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if ('number' in item) {
      handleOpenSubjectSelection({ entry: item });
    } else {
      handleOpenSubjectSelection({ paper: item });
    }
  };

  const startLinkedPaperSession = (linkedPaper: LinkedPastPaper) => {
    if (
      linkedPaper.isSubjectivePaper ||
      linkedPaper.id.startsWith('css-ca-') ||
      linkedPaper.paperType?.includes('Subjective') ||
      (linkedPaper.title.toLowerCase().includes('current affairs') && linkedPaper.exam === 'CSS')
    ) {
      setSelectedLinkedEntry(null);
      setActiveCssSubjectivePaper({ year: linkedPaper.year });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const questions = getLinkedPastPaperQuestions(linkedPaper, linkedPaper.totalQuestions);
    const sessionObj: PastPaper = {
      id: linkedPaper.id,
      title: linkedPaper.title,
      exam: linkedPaper.exam,
      conductedBy: linkedPaper.agency,
      year: linkedPaper.year,
      postName: linkedPaper.postName,
      bps: linkedPaper.bps,
      totalQuestions: questions.length,
      testDateLabel: linkedPaper.yearLabel,
      recordType: linkedPaper.paperType as any,
      sourceNote: `Official reconstructed and verified linked examination paper for ${linkedPaper.postName} (${linkedPaper.bps}) conducted by ${linkedPaper.agency}.`,
      durationMinutes: linkedPaper.durationMinutes,
      mcqs: questions.length > 0 ? questions : MCQS_DATA.slice(0, 50),
    };
    setSelectedLinkedEntry(null);
    setActive(sessionObj);
    setSelectedPastPaperId(sessionObj.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadLinkedPaperPdf = (linkedPaper: LinkedPastPaper) => {
    if (linkedPaper.pdfPath) {
      const link = document.createElement('a');
      link.href = linkedPaper.pdfPath;
      link.download = `${linkedPaper.id}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
    const questions = getLinkedPastPaperQuestions(linkedPaper, linkedPaper.totalQuestions);
    exportMcqsToPdf(questions, {
      title: linkedPaper.title,
      subtitle: `${linkedPaper.agency} · ${linkedPaper.bps} · ${linkedPaper.yearLabel}`,
      includeAnswers: true,
      includeExplanations: true,
      includeOmrSheet: true,
      subject: linkedPaper.syllabus.slice(0, 80),
    });
  };

  const handleExportLinkedPaperExcel = (linkedPaper: LinkedPastPaper) => {
    const questions = getLinkedPastPaperQuestions(linkedPaper, linkedPaper.totalQuestions);
    exportMcqsToExcel(
      questions, 
      `MUQABIL_${linkedPaper.id.replace(/[^a-zA-Z0-9]/g, '_')}`, 
      { subject: linkedPaper.title, filterName: linkedPaper.agency }
    );
  };

  const linkedPapersList = useMemo(() => {
    if (!selectedLinkedEntry) return [];
    let list = getLinkedPastPapersForEntry(selectedLinkedEntry);
    if (linkedPaperFilter !== 'All') {
      list = list.filter(p => p.paperType === linkedPaperFilter);
    }
    if (linkedPaperSearch.trim()) {
      const q = linkedPaperSearch.toLowerCase();
      list = list.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.postName.toLowerCase().includes(q) ||
        p.yearLabel.toLowerCase().includes(q) ||
        p.syllabus.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedLinkedEntry, linkedPaperFilter, linkedPaperSearch]);

  useEffect(() => {
    if (selectedPastPaperId && !active && !subjectSelectionModalData) {
      // Check if it matches an existing paper session
      const matchPractice = basePracticePapers.find(p => p.id === selectedPastPaperId);
      if (matchPractice && matchPractice.mcqs && matchPractice.mcqs.length > 0) {
        handleOpenSubjectSelection({ paper: matchPractice });
        return;
      }

      // Check if it matches an entry in the directory
      const matchDirectory = ALL_PAST_PAPERS_DIRECTORY.find(p => p.id === selectedPastPaperId);
      if (matchDirectory) {
        handleOpenSubjectSelection({ entry: matchDirectory });
        return;
      }

      if (matchPractice) {
        setSearch(matchPractice.title.split('—')[0].trim());
      }
    }
  }, [selectedPastPaperId, active, subjectSelectionModalData]);

  // Launch paper session with chosen subjects and question count
  const launchCustomPaper = (
    target: { entry?: AllPastPaperEntry; paper?: PastPaper }, 
    selectedSubjects: string[],
    limitCount: number
  ) => {
    const paperTitle = target.entry?.title || target.paper?.title || 'Competitive Past Paper';
    const exam = target.entry?.exam || target.paper?.exam || 'Competitive Exam';
    const conductedBy = target.entry?.conductedBy || target.paper?.conductedBy || 'Testing Commission';
    const bps = target.entry?.bps || target.paper?.bps || 'BPS-11 to 17';
    const yearLabel = target.entry?.yearLabel || target.paper?.testDateLabel || '2025';

    let candidatePool = MCQS_DATA.filter(mcq => {
      return selectedSubjects.some(subjSlug => {
        if (subjSlug === 'management-sciences') {
          return ['management-sciences', 'accounting', 'auditing', 'finance', 'hrm', 'marketing'].includes(mcq.category);
        }
        if (subjSlug === 'pakistan-studies' || subjSlug === 'pakistan-affairs') {
          return mcq.category === 'pakistan-studies' || mcq.category === 'pakistan-affairs';
        }
        if (subjSlug === 'computer-science') {
          return mcq.category === 'computer-science' || mcq.category === 'computer';
        }
        return mcq.category === subjSlug;
      });
    });

    const examTagged = candidatePool.filter(m => 
      m.examTags?.some(t => t.toLowerCase() === exam.toLowerCase() || exam.toLowerCase().includes(t.toLowerCase()))
    );
    const others = candidatePool.filter(m => !examTagged.includes(m));
    let finalQuestions = [...examTagged, ...others];

    if (limitCount > 0 && finalQuestions.length > limitCount) {
      finalQuestions = finalQuestions.slice(0, limitCount);
    }

    const durationMins = Math.min(120, Math.max(15, Math.ceil(finalQuestions.length * 0.9)));

    const sessionObj: PastPaper = {
      id: target.entry?.id || target.paper?.id || `custom-session-${Date.now()}`,
      title: `${paperTitle} (${selectedSubjects.length} Subjects · ${finalQuestions.length} Questions)`,
      exam: exam,
      conductedBy: conductedBy,
      year: 2025,
      postName: target.entry?.title.replace(/Past Papers.*$/i, '').trim() || target.paper?.postName || 'Candidate',
      bps: bps,
      totalQuestions: finalQuestions.length,
      testDateLabel: yearLabel,
      recordType: 'Reconstructed Practice Paper',
      sourceNote: `Reconstructed practice paper aligned strictly to ${conductedBy} syllabus. This set is assembled from exam-tagged MEQSA practice questions and is not a complete official paper release.`,
      durationMinutes: durationMins,
      mcqs: finalQuestions.length > 0 ? finalQuestions : MCQS_DATA.slice(0, 20),
    };

    setSubjectSelectionModalData(null);
    setActive(sessionObj);
    setSelectedPastPaperId(sessionObj.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSubjectQuestionCount = (subjSlug: string) => {
    return MCQS_DATA.filter(m => {
      if (subjSlug === 'management-sciences') {
        return ['management-sciences', 'accounting', 'auditing', 'finance', 'hrm', 'marketing'].includes(m.category);
      }
      if (subjSlug === 'pakistan-studies' || subjSlug === 'pakistan-affairs') {
        return m.category === 'pakistan-studies' || m.category === 'pakistan-affairs';
      }
      if (subjSlug === 'computer-science') {
        return m.category === 'computer-science' || m.category === 'computer';
      }
      return m.category === subjSlug;
    }).length;
  };

  const totalMatchingQuestions = useMemo(() => {
    if (!subjectSelectionModalData) return 0;
    const pool = MCQS_DATA.filter(mcq => {
      return selectedSubjectSlugs.some(subjSlug => {
        if (subjSlug === 'management-sciences') {
          return ['management-sciences', 'accounting', 'auditing', 'finance', 'hrm', 'marketing'].includes(mcq.category);
        }
        if (subjSlug === 'pakistan-studies' || subjSlug === 'pakistan-affairs') {
          return mcq.category === 'pakistan-studies' || mcq.category === 'pakistan-affairs';
        }
        if (subjSlug === 'computer-science') {
          return mcq.category === 'computer-science' || mcq.category === 'computer';
        }
        return mcq.category === subjSlug;
      });
    });
    return pool.length;
  }, [subjectSelectionModalData, selectedSubjectSlugs]);

  // Filter and cap directory entries
  const filteredDirectoryPapers = useMemo(() => {
    return [...ALL_PAST_PAPERS_DIRECTORY].sort((a, b) => a.number - b.number).filter((paper) => {
      // Exam filter
      if (selectedExam !== 'All') {
        const matchesExam = 
          paper.exam.toLowerCase() === selectedExam.toLowerCase() ||
          paper.title.toLowerCase().includes(selectedExam.toLowerCase());
        if (!matchesExam) return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && paper.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesQuery = 
          paper.title.toLowerCase().includes(q) ||
          paper.conductedBy.toLowerCase().includes(q) ||
          paper.bps.toLowerCase().includes(q) ||
          paper.syllabus.toLowerCase().includes(q) ||
          String(paper.number) === q.replace('#', '');
        if (!matchesQuery) return false;
      }

      return true;
    }).slice(0, PAST_PAPERS_DIRECTORY_CAPACITY);
  }, [search, selectedExam, selectedCategory]);

  // Filter practice papers
  const filteredPracticePapers = useMemo(() => {
    return basePracticePapers.filter(p => 
      (selectedExam === 'All' || p.exam.toLowerCase().includes(selectedExam.toLowerCase())) && 
      `${p.title} ${p.postName} ${p.year}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [basePracticePapers, selectedExam, search]);

  const examAgenciesList = [
    'All',
    'PPSC',
    'FPSC',
    'SPSC',
    'BPSC',
    'KPPSC',
    'CSS',
    'STS',
    'NTS',
    'ETEA',
    'Police',
    'FIA',
    'ASF',
    'MOD',
    'WAPDA',
    'HEC',
    'Banking',
    'Medical / MDCAT',
    'University / Entry Test'
  ];

  const categoriesList = [
    'All',
    'Civil Service',
    'Teaching & Education',
    'Police & Security',
    'Healthcare & Medical',
    'Auditing & Finance',
    'Clerical & Ministerial',
    'Engineering & Technical',
    'Admissions & Universities'
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 text-slate-900 dark:text-slate-100">
      {active ? (
        <div key={`${active.id}-${session}`}>
          <PaperSession 
            paper={active} 
            onExit={() => { setActive(null); setSelectedPastPaperId(''); }} 
            onRetake={() => setSession(s => s+1)} 
          />
        </div>
      ) : activeCssSubjectivePaper ? (
        <CssSubjectivePaperView
          initialYear={activeCssSubjectivePaper.year}
          initialEntryNumber={activeCssSubjectivePaper.entryNumber}
          onClose={() => { setActiveCssSubjectivePaper(null); setSelectedPastPaperId(''); }}
        />
      ) : (
        <div className="space-y-6">
          {/* Header Banner */}
          <header className="rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white p-6 sm:p-10 shadow-lg border border-emerald-800/30 relative overflow-hidden">
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-500/30">
                <FileText className="w-4 h-4 text-emerald-300" />
                <span>ALL PAST PAPERS ARCHIVE · UP TO 1,000</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white font-display">
                ALL PAST PAPERS &amp; SYLLABUS DIRECTORY
              </h1>
              <p className="mt-3 text-sm sm:text-base text-emerald-100/90 leading-relaxed">
                Search past-paper and syllabus entries across PPSC, FPSC, SPSC, STS IBA, NTS, CSS, Police, FIA, ASF, lecturer recruitment, and banking. The directory supports up to 1,000 entries; PDFs and practice questions are available where provided.
              </p>

              {/* Quick stats pills */}
              <div className="flex flex-wrap gap-2.5 mt-5">
                <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs text-xs font-bold border border-white/10 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{ALL_PAST_PAPERS_DIRECTORY.length} Directory Entries</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs text-xs font-bold border border-white/10 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>1,000 Entry Capacity</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs text-xs font-bold border border-white/10 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
                  <span>Source PDFs When Available</span>
                </div>
              </div>

              {/* High-Impact Utility Buttons */}
              <div className="flex flex-wrap gap-2.5 mt-4">
                <button
                  onClick={() => openPrintablePaper({
                    id: 'sts-master-export',
                    title: 'Sukkur IBA STS BPS 05–15 Official Master Paper',
                    exam: 'Sukkur IBA STS',
                    bps: 'BPS 05–15',
                    totalQuestions: 100,
                    conductedBy: 'Sukkur IBA Testing Services (STS)',
                    syllabus: 'English (40%) | Math (20%) | General Knowledge (40%)'
                  })}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-lg transition cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Export Solved Paper (PDF)</span>
                </button>

                <button
                  onClick={() => exportPastPapersDirectoryToExcel(filteredDirectoryPapers, 'MUQABIL_Past_Papers_Index')}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg transition cursor-pointer"
                  title="Export complete past papers directory to Excel (.xlsx)"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Export Index (Excel)</span>
                </button>

                <button
                  onClick={() => setAgeCalculatorOpen(true)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer backdrop-blur-md"
                >
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Age Eligibility Calculator</span>
                </button>
              </div>
            </div>
            {/* Background decoration */}
            <div className="absolute right-0 top-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          </header>

          {/* Directory vs practice sessions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-xs">
            <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <button
                onClick={() => setActiveTab('directory')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeTab === 'directory'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Past Papers &amp; Syllabi ({filteredDirectoryPapers.length}/{PAST_PAPERS_DIRECTORY_CAPACITY})</span>
              </button>
              <button
                onClick={() => setActiveTab('simulated-sessions')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeTab === 'simulated-sessions'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Timed Practice Exams ({filteredPracticePapers.length})</span>
              </button>
            </div>

            {/* Layout switch buttons */}
            {activeTab === 'directory' && (
              <div className="flex items-center gap-1 self-end sm:self-center">
                <span className="text-xs text-slate-400 mr-1 hidden md:inline">Layout:</span>
                <button
                  onClick={() => setLayoutMode('table')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    layoutMode === 'table' 
                      ? 'bg-emerald-600 text-white shadow-xs' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                  title={`Numbered directory table, up to ${PAST_PAPERS_DIRECTORY_CAPACITY} entries`}
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span>Table #1–1,000</span>
                </button>
                <button
                  onClick={() => setLayoutMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    layoutMode === 'grid' 
                      ? 'bg-emerald-600 text-white shadow-xs' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                  title="Grid Cards"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Cards</span>
                </button>
                <button
                  onClick={() => setLayoutMode('list')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    layoutMode === 'list' 
                      ? 'bg-emerald-600 text-white shadow-xs' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                  title="Compact List"
                >
                  <List className="w-3.5 h-3.5" />
                  <span>Compact</span>
                </button>

                <button
                  onClick={() => exportPastPapersDirectoryToExcel(filteredDirectoryPapers, 'MUQABIL_Past_Papers_Directory')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition cursor-pointer"
                  title="Export current filtered directory to Excel spreadsheet (.xlsx)"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Excel (.xlsx)</span>
                </button>
              </div>
            )}
          </div>

          {/* Search Past Paper & Filters Bar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
            {/* Search Input matching "Search Past Paper" */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Search Past Paper</span>
                </label>
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    Clear Search
                  </button>
                )}
              </div>
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Past Paper by title, paper #, post, or syllabus (e.g. 'PPSC Assistant', 'Lecturer', '#42', 'Junior Clerk', 'FIA')..."
                  className="w-full pl-11 pr-12 py-2.5 sm:py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 text-sm placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter pills: Agency & Category */}
            <div className="space-y-3 pt-1 border-t border-slate-100 dark:border-slate-800">
              {/* Agency Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                <span className="text-xs font-extrabold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3" />
                  <span>Agency:</span>
                </span>
                {examAgenciesList.map((agency) => (
                  <button
                    key={agency}
                    onClick={() => setSelectedExam(agency)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                      selectedExam === agency
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750'
                    }`}
                  >
                    {agency}
                  </button>
                ))}
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                <span className="text-xs font-extrabold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  <span>Category:</span>
                </span>
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* TAB 1: PAST PAPERS DIRECTORY */}
          {activeTab === 'directory' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 px-1">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Showing <strong className="text-emerald-600 dark:text-emerald-400">{filteredDirectoryPapers.length}</strong> of {ALL_PAST_PAPERS_DIRECTORY.length} available entries · capacity {PAST_PAPERS_DIRECTORY_CAPACITY}
                </p>
                {(selectedExam !== 'All' || selectedCategory !== 'All' || search) && (
                  <button
                    onClick={() => {
                      setSelectedExam('All');
                      setSelectedCategory('All');
                      setSearch('');
                    }}
                    className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    Reset all filters
                  </button>
                )}
              </div>

              {/* Selectable Helper Banner */}
              <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-600/10 to-teal-500/10 border border-emerald-500/25 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Link2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      Select Any Past Paper to View All Linked Papers
                    </p>
                    <p className="text-slate-500 dark:text-slate-400">
                      Click any past paper row or the &quot;Linked Papers&quot; button to access all solved batches, agency cadres, and CBT model exams.
                    </p>
                  </div>
                </div>
                {selectedLinkedEntry && (
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/80 px-2 py-1 rounded-lg border border-emerald-300/60 dark:border-emerald-800">
                      Selected: #{selectedLinkedEntry.number} · {selectedLinkedEntry.title.slice(0, 30)}...
                    </span>
                    <button
                      onClick={() => setSelectedLinkedEntry(selectedLinkedEntry)}
                      className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition cursor-pointer shadow-2xs"
                    >
                      View Linked Papers
                    </button>
                    <button
                      onClick={() => setSelectedLinkedEntry(null)}
                      className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
                      title="Clear Selection"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Dedicated CSS Current Affairs 16-Year Series Feature Banner */}
              {(selectedExam === 'CSS' || search.toLowerCase().includes('css') || search.toLowerCase().includes('current affairs')) && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 text-white border border-emerald-700/50 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-2xl">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider border border-emerald-500/30">
                      <GraduationCap className="w-3 h-3 text-emerald-300" />
                      <span>FPSC CSS Competitive Examination · 16 Consecutive Years (2010–2025)</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-white">
                      CSS Current Affairs Past Papers (2010 to 2025) · Subjective Examination Papers
                    </h3>
                    <p className="text-xs text-emerald-100/80 leading-relaxed">
                      All 16 years (Entries #201 to #216) are official FPSC General Knowledge Paper-II descriptive subjective papers with 80-mark essay questions, model outlines, syllabus blueprints, answer writing scratchpads, and source PDFs. <em>These are full subjective papers, not just MCQs.</em>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        const firstCss = ALL_PAST_PAPERS_DIRECTORY.find(p => p.number === 201) || ALL_PAST_PAPERS_DIRECTORY.find(p => p.id === 'css-ca-2010');
                        if (firstCss) {
                          setSelectedLinkedEntry(firstCss);
                        }
                      }}
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Link2 className="w-3.5 h-3.5 text-emerald-300" />
                      <span>View All 16 Linked Papers</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveCssSubjectivePaper({ year: 2025, entryNumber: 216 });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <PenTool className="w-3.5 h-3.5 text-slate-950" />
                      <span>Start Subjective Paper (2010–2025)</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Numbered directory table (up to 1,000 records) */}
              {layoutMode === 'table' && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 font-bold text-slate-600 dark:text-slate-400">
                          <th className="py-3.5 px-4 w-14 text-center">#</th>
                          <th className="py-3.5 px-4">Past Paper Title &amp; Post</th>
                          <th className="py-3.5 px-3">Agency</th>
                          <th className="py-3.5 px-3 hidden md:table-cell">BPS</th>
                          <th className="py-3.5 px-3 hidden lg:table-cell">Syllabus Breakdown</th>
                          <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {filteredDirectoryPapers.map((paper) => {
                          const linkedCount = getLinkedPastPapersForEntry(paper).length;
                          const isSelected = selectedLinkedEntry?.id === paper.id;
                          return (
                            <tr 
                              key={paper.id} 
                              onClick={() => setSelectedLinkedEntry(paper)}
                              className={`transition group cursor-pointer ${
                                isSelected 
                                  ? 'bg-emerald-50/90 dark:bg-emerald-950/50 ring-1 ring-emerald-500/70' 
                                  : 'hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20'
                              }`}
                            >
                              <td className="py-3.5 px-4 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <span className={`w-2 h-2 rounded-full transition ${
                                    isSelected 
                                      ? 'bg-emerald-500 scale-125' 
                                      : 'bg-slate-300 dark:bg-slate-700 group-hover:bg-emerald-400'
                                  }`} />
                                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                                    {paper.number}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                                <div className="flex flex-col">
                                  <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition flex items-center gap-2">
                                    <span>{paper.title}</span>
                                    {isSelected && (
                                      <span className="text-[10px] font-black px-1.5 py-0.2 rounded-sm bg-emerald-600 text-white">
                                        Selected
                                      </span>
                                    )}
                                  </span>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[11px] text-slate-500 font-normal">
                                      {paper.conductedBy}
                                    </span>
                                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                                      · {linkedCount} linked papers available
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3.5 px-3 whitespace-nowrap">
                                <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50">
                                  {paper.exam}
                                </span>
                              </td>
                              <td className="py-3.5 px-3 hidden md:table-cell whitespace-nowrap font-medium text-slate-600 dark:text-slate-400 text-xs">
                                {paper.bps}
                              </td>
                              <td className="py-3.5 px-3 hidden lg:table-cell text-xs text-slate-500 dark:text-slate-400 max-w-xs truncate" title={paper.syllabus}>
                                {paper.syllabus}
                              </td>
                              <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedLinkedEntry(paper);
                                    }}
                                    className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950 dark:hover:bg-emerald-900 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-xs font-black transition cursor-pointer flex items-center gap-1 shadow-2xs"
                                    title="View all linked past papers, year-wise sets & CBT model exams"
                                  >
                                    <Link2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                    <span>Linked Papers ({linkedCount})</span>
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedModalEntry(paper);
                                    }}
                                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition cursor-pointer"
                                    title="View Official Syllabus and Test Pattern"
                                  >
                                    Syllabus
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openPrintablePaper(paper);
                                    }}
                                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition cursor-pointer"
                                    title="Print or Export Solved Past Paper (PDF)"
                                  >
                                    <Printer className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      startPaperFromDirectory(paper);
                                    }}
                                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer shadow-2xs"
                                  >
                                    Start Paper
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* GRID CARDS VIEW */}
              {layoutMode === 'grid' && (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredDirectoryPapers.map((paper) => {
                    const linkedCount = getLinkedPastPapersForEntry(paper).length;
                    const isSelected = selectedLinkedEntry?.id === paper.id;
                    return (
                      <article 
                        key={paper.id} 
                        onClick={() => setSelectedLinkedEntry(paper)}
                        className={`p-5 rounded-2xl border bg-white dark:bg-slate-900 flex flex-col justify-between transition cursor-pointer ${
                          isSelected
                            ? 'border-emerald-500 ring-2 ring-emerald-500/40 bg-emerald-50/20 dark:bg-emerald-950/20 shadow-md'
                            : 'border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-sm'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                              #{paper.number} · {paper.exam}
                            </span>
                            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                              {paper.bps}
                            </span>
                          </div>

                          <h3 className="font-extrabold text-base text-slate-900 dark:text-white mt-1 leading-snug">
                            {paper.title}
                          </h3>

                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {paper.conductedBy}
                          </p>

                          <div className="my-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                            <p className="font-bold text-[11px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                              Syllabus Outline:
                            </p>
                            <p className="line-clamp-2">{paper.syllabus}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 mt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLinkedEntry(paper);
                            }}
                            className="px-2.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 text-xs font-black transition cursor-pointer flex items-center gap-1"
                          >
                            <Link2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span>Linked ({linkedCount})</span>
                          </button>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedModalEntry(paper);
                              }}
                              className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer flex items-center gap-1"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>Syllabus</span>
                            </button>
                            <span className="text-slate-300 dark:text-slate-700">|</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openPrintablePaper(paper);
                              }}
                              className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer flex items-center gap-1"
                              title="Export Printable PDF"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              <span>PDF</span>
                            </button>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startPaperFromDirectory(paper);
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1"
                          >
                            <span>Start</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {/* COMPACT LIST VIEW */}
              {layoutMode === 'list' && (
                <div className="space-y-2.5">
                  {filteredDirectoryPapers.map((paper) => {
                    const linkedCount = getLinkedPastPapersForEntry(paper).length;
                    const isSelected = selectedLinkedEntry?.id === paper.id;
                    return (
                      <article 
                        key={paper.id} 
                        onClick={() => setSelectedLinkedEntry(paper)}
                        className={`p-3.5 sm:p-4 rounded-xl border bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition cursor-pointer ${
                          isSelected
                            ? 'border-emerald-500 ring-2 ring-emerald-500/40 bg-emerald-50/20 dark:bg-emerald-950/20 shadow-xs'
                            : 'border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700'
                        }`}
                      >
                        <div className="flex items-start sm:items-center gap-3 min-w-0">
                          <span className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-black text-xs flex items-center justify-center shrink-0 border border-emerald-500/20">
                            {paper.number}
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="font-extrabold text-xs text-emerald-600 dark:text-emerald-400">
                                {paper.exam}
                              </span>
                              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 rounded-sm">
                                {paper.bps}
                              </span>
                              <span className="text-[10px] text-slate-400 hidden md:inline">
                                · {paper.category}
                              </span>
                              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                                · {linkedCount} Linked Papers
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                              {paper.title}
                            </h4>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLinkedEntry(paper);
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 text-xs font-black cursor-pointer flex items-center gap-1"
                          >
                            <Link2 className="w-3.5 h-3.5" />
                            <span>Linked ({linkedCount})</span>
                          </button>
                          {!paper.pdfPath && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedModalEntry(paper);
                              }}
                              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer"
                            >
                              Syllabus
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowPdfModal(paper);
                            }}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs text-emerald-600 dark:text-emerald-400 cursor-pointer"
                            title={paper.pdfPath ? "View uploaded past paper" : "PDF Guide"}
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startPaperFromDirectory(paper);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                          >
                            Start Paper
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {filteredDirectoryPapers.length === 0 && (
                <div className={`${panel} text-center py-12`}>
                  <FileText className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold">No matching past papers found</h3>
                  <p className="text-sm text-slate-500 mt-1">Try another search keyword or clear your agency filters.</p>
                  <button 
                    onClick={() => { setSelectedExam('All'); setSelectedCategory('All'); setSearch(''); }}
                    className={`${button} mt-4`}
                  >
                    Reset Search
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SIMULATED EXAM SESSIONS & MOCK TESTS */}
          {activeTab === 'simulated-sessions' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-500">
                Official reconstructed test papers with authentic questions from past exam administrations. Fully timed with question navigator, real-time score calculation, and mistake saving.
              </p>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredPracticePapers.map(p => (
                  <article key={p.id} className={`${panel} flex flex-col ${selectedPastPaperId === p.id ? 'ring-2 ring-emerald-500' : ''}`}>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-emerald-600 font-bold text-xs uppercase tracking-wider">{p.exam} · {p.year}</p>
                      {p.recordType && (
                        <span className="rounded-md bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
                          {p.recordType}
                        </span>
                      )}
                    </div>
                    <h2 className="text-base sm:text-lg font-bold my-3 text-slate-900 dark:text-white leading-snug">{p.title}</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Post: {p.postName} {p.bps ? `(${p.bps})` : ''}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Reference: {p.testDateLabel || p.solvedDate || p.year}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 my-3">
                      {p.mcqs.length ? `Practice selection · ${p.mcqs.length} questions · ${p.durationMinutes ?? practiceMinutes(p.mcqs.length)} minutes` : p.sourceNote}
                    </p>
                    {p.mcqs.length ? (
                      <button 
                        className={`${button} mt-auto w-full text-center`} 
                        onClick={() => startPaperFromDirectory(p)}
                      >
                        Start Timed Paper
                      </button>
                    ) : p.sourceUrl ? (
                      <a
                        className={`${button} mt-auto text-center flex items-center justify-center gap-1.5`}
                        href={p.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span>Open Official Reference</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button className={`${button} mt-auto w-full`} disabled>
                        Questions unavailable
                      </button>
                    )}
                  </article>
                ))}
              </div>

              {filteredPracticePapers.length === 0 && (
                <p className={panel}>No matching simulated papers. Try another filter.</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* SYLLABUS & EXAM PATTERN MODAL */}
      {selectedModalEntry && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setSelectedModalEntry(null)}
        >
          <div 
            className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4 bg-emerald-950 text-white">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    PAPER #{selectedModalEntry.number}
                  </span>
                  <span className="text-xs font-bold text-emerald-200">
                    {selectedModalEntry.exam} · {selectedModalEntry.bps}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-display text-white">
                  {selectedModalEntry.title}
                </h3>
                <p className="text-xs text-emerald-100/80 mt-1">
                  {selectedModalEntry.conductedBy}
                </p>
              </div>

              <button
                onClick={() => setSelectedModalEntry(null)}
                className="p-1 rounded-full text-emerald-200 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Paper Overview Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 text-center">
                  <p className="text-[11px] font-bold text-slate-400 uppercase">Total Marks</p>
                  <p className="text-lg font-black text-slate-900 dark:text-white mt-0.5">100 MCQs</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 text-center">
                  <p className="text-[11px] font-bold text-slate-400 uppercase">Duration</p>
                  <p className="text-lg font-black text-slate-900 dark:text-white mt-0.5">90 Minutes</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 text-center">
                  <p className="text-[11px] font-bold text-slate-400 uppercase">Negative Marking</p>
                  <p className="text-lg font-black text-rose-600 dark:text-rose-400 mt-0.5">0.25 / wrong</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 text-center">
                  <p className="text-[11px] font-bold text-slate-400 uppercase">Medium</p>
                  <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5">English / Bil.</p>
                </div>
              </div>

              {/* Official Syllabus Breakdown */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40">
                <div className="flex items-center gap-2 mb-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Prescribed Examination Syllabus</span>
                </div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                  {selectedModalEntry.syllabus}
                </p>
              </div>

              {/* Preparation Advice */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Recommended Study Strategy
                </h4>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc pl-4">
                  <li>Revise standard one-paper General Knowledge, Pakistan Studies (1857–Present), and Everyday Science principles.</li>
                  <li>Practice active vocabulary, prepositions, direct/indirect narration, and sentence correction for English language.</li>
                  <li>Solve past paper model MCQs under strict 90-minute time conditions to build speed and accuracy.</li>
                  <li>Maintain negative-marking discipline by leaving questions blank when unsure.</li>
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  const entry = selectedModalEntry;
                  setSelectedModalEntry(null);
                  setShowPdfModal(entry);
                }}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-750 text-xs font-bold text-slate-700 dark:text-slate-200 transition cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>PDF Syllabus Outline</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedModalEntry(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const entry = selectedModalEntry;
                    setSelectedModalEntry(null);
                    startPaperFromDirectory(entry);
                  }}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <span>{selectedModalEntry.isSubjectivePaper || selectedModalEntry.id.startsWith('css-ca-') ? 'Open Subjective Exam Paper' : 'Solve Paper MCQs'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PDF PRINTABLE PREVIEW MODAL */}
      {showPdfModal && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setShowPdfModal(null)}
        >
          <div
            className={`w-full ${showPdfModal.pdfPath ? 'max-w-6xl h-[90vh]' : 'max-w-2xl'} bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            {showPdfModal.pdfPath ? (
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="font-bold text-slate-900 dark:text-white">{showPdfModal.title}</h2>
                    <p className="text-xs text-slate-500">{showPdfModal.sourceNote}</p>
                  </div>
                  <button onClick={() => setShowPdfModal(null)} className={secondary}>Close</button>
                </div>
                <iframe title={showPdfModal.title} src={showPdfModal.pdfPath} className="w-full flex-1" />
              </div>
            ) : (
            <>
            {/* Printable Document Preview */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="border-b-2 border-emerald-800 pb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    ISLAMIC REPUBLIC OF PAKISTAN · COMPETITIVE EXAMINATIONS
                  </p>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                    {showPdfModal.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Official Reference Archive No: MEQSA-PP-{showPdfModal.number} · {showPdfModal.conductedBy}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    #{showPdfModal.number}
                  </span>
                  <p className="text-[10px] font-bold text-slate-400">{showPdfModal.bps}</p>
                </div>
              </div>

              {/* Specification Table */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                  Paper Specifications &amp; Blueprint
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80">
                    <span className="text-slate-400">Exam Body:</span>{' '}
                    <strong className="text-slate-900 dark:text-white">{showPdfModal.exam}</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80">
                    <span className="text-slate-400">Pay Scale:</span>{' '}
                    <strong className="text-slate-900 dark:text-white">{showPdfModal.bps}</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80">
                    <span className="text-slate-400">Paper Type:</span>{' '}
                    <strong className="text-slate-900 dark:text-white">Objective MCQs (100 Marks)</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80">
                    <span className="text-slate-400">Negative Marking:</span>{' '}
                    <strong className="text-rose-600 dark:text-rose-400">Yes (0.25 Mark Deducted)</strong>
                  </div>
                </div>
              </div>

              {/* Syllabus Section */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                  Prescribed Syllabus Components
                </h4>
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50">
                  {showPdfModal.syllabus}
                </div>
              </div>

              {/* Authenticity Watermark Notice */}
              <div className="text-[11px] text-slate-400 text-center italic border-t border-slate-100 dark:border-slate-800 pt-3">
                This document is generated by MEQSA Educational Portal for candidate test preparation. Official papers remain property of the respective testing authority.
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Document</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPdfModal(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const entry = showPdfModal;
                    setShowPdfModal(null);
                    startPaperFromDirectory(entry);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer flex items-center gap-1"
                >
                  <span>Practice Now</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            </>
            )}
          </div>
        </div>
      )}

      {/* ALL LINKED PAST PAPERS MODAL */}
      {selectedLinkedEntry && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150"
          onClick={() => setSelectedLinkedEntry(null)}
        >
          <div 
            className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Banner */}
            <div className="p-6 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white border-b border-emerald-800/40 relative overflow-hidden shrink-0">
              <div className="flex items-start justify-between gap-4 relative z-10">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-black uppercase tracking-wider border border-emerald-500/30">
                      <Link2 className="w-3.5 h-3.5" />
                      <span>ALL LINKED PAST PAPERS ARCHIVE</span>
                    </span>
                    <span className="text-xs font-bold text-emerald-200 bg-white/10 px-2.5 py-0.5 rounded-md">
                      #{selectedLinkedEntry.number} · {selectedLinkedEntry.exam}
                    </span>
                    <span className="text-xs text-emerald-100/80 font-medium">
                      {selectedLinkedEntry.bps}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black font-display text-white leading-tight">
                    {selectedLinkedEntry.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-100/90 mt-1.5 flex items-center gap-2">
                    <span>{selectedLinkedEntry.conductedBy}</span>
                    <span>·</span>
                    <span className="text-emerald-300 font-semibold">{getLinkedPastPapersForEntry(selectedLinkedEntry).length} Linked Solved Papers &amp; CBT Sessions Available</span>
                  </p>
                </div>

                <button
                  onClick={() => setSelectedLinkedEntry(null)}
                  className="p-2 rounded-full text-emerald-200 hover:text-white hover:bg-white/10 transition cursor-pointer shrink-0"
                  title="Close Archive"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Syllabus Quote */}
              <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-emerald-100/90 max-w-3xl line-clamp-2">
                <strong className="text-emerald-300 uppercase tracking-wider mr-1.5 text-[10px]">Prescribed Blueprint:</strong>
                {selectedLinkedEntry.syllabus}
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={linkedPaperSearch}
                  onChange={(e) => setLinkedPaperSearch(e.target.value)}
                  placeholder="Filter by year, cadre, batch, or post keyword..."
                  className="w-full pl-9 pr-8 py-1.5 sm:py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
                {linkedPaperSearch && (
                  <button
                    onClick={() => setLinkedPaperSearch('')}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Type Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {(['All', 'Official Past Paper', 'Authentic Solved Set', 'CBT Model Paper'] as const).map((filterOpt) => (
                  <button
                    key={filterOpt}
                    onClick={() => setLinkedPaperFilter(filterOpt)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                      linkedPaperFilter === filterOpt
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {filterOpt === 'All' ? `All (${getLinkedPastPapersForEntry(selectedLinkedEntry).length})` : filterOpt}
                  </button>
                ))}
              </div>
            </div>

            {/* Linked Papers List */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
              {linkedPapersList.map((paper) => {
                const totalQuestions = paper.totalQuestions || 100;
                return (
                  <div
                    key={paper.id}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:border-emerald-500/60 hover:shadow-md transition flex flex-col gap-3 group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-md border ${
                            paper.paperType === 'Official Past Paper'
                              ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                              : paper.paperType === 'CBT Model Paper'
                              ? 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30'
                              : 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30'
                          }`}>
                            {paper.paperType}
                          </span>
                          <span className="text-xs font-extrabold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                            {paper.yearLabel}
                          </span>
                          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                            {paper.bps}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                          {paper.title}
                        </h3>

                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Cadre / Post: <strong className="text-slate-700 dark:text-slate-200">{paper.postName}</strong> · Conducted by {paper.agency}
                        </p>
                      </div>

                      {/* Specs badges */}
                      <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                        <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {paper.isSubjectivePaper ? 'Subjective (Part-II)' : `${totalQuestions} MCQs`}
                        </span>
                        <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {paper.durationMinutes} Mins
                        </span>
                      </div>
                    </div>

                    {/* Subject Distribution pills */}
                    {paper.subjectDistribution && paper.subjectDistribution.length > 0 && (
                      <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                          <Atom className="w-3 h-3 text-emerald-500" />
                          <span>Official Subject Breakdown:</span>
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {paper.subjectDistribution.map((dist, idx) => (
                            <span 
                              key={idx}
                              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                            >
                              <strong>{dist.subject}:</strong> {dist.percentage}%
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 mt-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => handleDownloadLinkedPaperPdf(paper)}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
                          title="Generate and download question paper booklet with answer key & OMR bubble sheet"
                        >
                          <Printer className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>Download Paper (PDF)</span>
                        </button>

                        {!paper.isSubjectivePaper && (
                          <button
                            onClick={() => handleExportLinkedPaperExcel(paper)}
                            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
                            title="Export all questions with full options and explanations to Excel (.xlsx)"
                          >
                            <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                            <span>Export MCQs (Excel)</span>
                          </button>
                        )}

                        {!paper.isSubjectivePaper && (
                          <button
                            onClick={() => {
                              const entryToUse = selectedLinkedEntry;
                              setSelectedLinkedEntry(null);
                              handleOpenSubjectSelection({ entry: entryToUse });
                            }}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer flex items-center gap-1"
                          >
                            <span>Customize Subjects</span>
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => startLinkedPaperSession(paper)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-1.5 shadow-sm hover:shadow-md"
                      >
                        {paper.isSubjectivePaper ? (
                          <>
                            <PenTool className="w-3.5 h-3.5" />
                            <span>Open Subjective Paper</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Start Exam Now</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}

              {linkedPapersList.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-sm font-bold text-slate-500">No linked papers matched your filter.</p>
                  <button
                    onClick={() => { setLinkedPaperFilter('All'); setLinkedPaperSearch(''); }}
                    className="mt-3 px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Official verified past papers reconstructed from past testing session administrations.
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedLinkedEntry(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const entry = selectedLinkedEntry;
                    setSelectedLinkedEntry(null);
                    startPaperFromDirectory(entry);
                  }}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <span>Solve Master Paper</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBJECT SELECTION POPUP MODAL (When user clicks Start Paper) */}
      {subjectSelectionModalData && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150"
          onClick={() => setSubjectSelectionModalData(null)}
        >
          <div 
            className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white border-b border-emerald-800/40 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                    {subjectSelectionModalData.entry?.exam || subjectSelectionModalData.paper?.exam || 'Competitive'} Paper
                  </span>
                  {subjectSelectionModalData.entry?.number && (
                    <span className="text-[11px] font-bold text-emerald-200">
                      Paper #{subjectSelectionModalData.entry.number}
                    </span>
                  )}
                  <span className="text-[11px] text-slate-300">
                    · {subjectSelectionModalData.entry?.bps || subjectSelectionModalData.paper?.bps || 'BPS 11-17'}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-display text-white leading-snug">
                  Select Subjects for Paper
                </h3>
                <p className="text-xs text-emerald-100/80 mt-1 line-clamp-1">
                  {subjectSelectionModalData.entry?.title || subjectSelectionModalData.paper?.title}
                </p>
              </div>

              <button
                onClick={() => setSubjectSelectionModalData(null)}
                className="p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-white/10 transition cursor-pointer"
                title="Cancel & Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-6 space-y-5 max-h-[68vh] overflow-y-auto">
              
              {/* Presets and Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/70 dark:border-slate-700/60">
                <div className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Subject Presets:</span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedSubjectSlugs([
                      'general-knowledge',
                      'pakistan-affairs',
                      'current-affairs',
                      'english',
                      'islamic-studies',
                      'everyday-science',
                      'computer-science',
                      'mathematics'
                    ])}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700 transition cursor-pointer"
                  >
                    Core (8)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedSubjectSlugs(AVAILABLE_PAPER_SUBJECTS.map(s => s.id))}
                    className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-bold hover:bg-slate-300 transition cursor-pointer"
                  >
                    All Available
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedSubjectSlugs(['general-knowledge', 'pakistan-affairs', 'current-affairs'])}
                    className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-bold hover:bg-slate-300 transition cursor-pointer"
                  >
                    GK &amp; Affairs
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedSubjectSlugs([])}
                    className="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-[11px] font-bold transition cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Subjects Checklist Grid */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs px-1">
                  <span className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                    Select Subjects ({selectedSubjectSlugs.length} chosen):
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    {totalMatchingQuestions} questions available in bank
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {AVAILABLE_PAPER_SUBJECTS.map((subj) => {
                    const isChecked = selectedSubjectSlugs.includes(subj.id);
                    const count = getSubjectQuestionCount(subj.id);
                    const Icon = subj.icon;
                    return (
                      <div
                        key={subj.id}
                        onClick={() => {
                          if (isChecked) {
                            setSelectedSubjectSlugs(prev => prev.filter(s => s !== subj.id));
                          } else {
                            setSelectedSubjectSlugs(prev => [...prev, subj.id]);
                          }
                        }}
                        className={`p-3 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                          isChecked
                            ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/30 ring-1 ring-emerald-500/30'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // handled by parent div click
                          className="mt-1 h-4 w-4 rounded-md border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer pointer-events-none"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {subj.name}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 px-1.5 py-0.2 rounded-md bg-emerald-100/60 dark:bg-emerald-950/80 shrink-0">
                              {count} Qs
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                            {subj.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Number of Questions Selection */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider block">
                  Select Question Count &amp; Duration:
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'all', label: 'All Matching', desc: `${totalMatchingQuestions} Questions` },
                    { id: '100', label: '100 Questions', desc: 'Full Paper · 90 Mins' },
                    { id: '50', label: '50 Questions', desc: 'Half Mock · 45 Mins' },
                    { id: '25', label: '25 Questions', desc: 'Quick Drill · 25 Mins' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setQuestionCountChoice(opt.id as any)}
                      className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                        questionCountChoice === opt.id
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 font-bold ring-2 ring-emerald-500/20 shadow-xs'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold">{opt.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Exam Rules Pill */}
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 rounded-xl p-3 text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Official One-Paper standard: 0.25 negative marking per incorrect answer.</span>
                </div>
                <span className="font-bold text-[11px] uppercase tracking-wider text-amber-700 dark:text-amber-300 shrink-0">
                  Timed Practice
                </span>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSubjectSelectionModalData(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={selectedSubjectSlugs.length === 0}
                onClick={() => {
                  const limit = questionCountChoice === 'all' 
                    ? 0 
                    : parseInt(questionCountChoice, 10);
                  launchCustomPaper(subjectSelectionModalData, selectedSubjectSlugs, limit);
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-2 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
              >
                <span>Start Paper Attempt</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
};
