import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  ChevronRight,
  GraduationCap,
  Sparkles,
  Atom,
  Compass,
  CheckCircle2,
  FileText,
  FileSpreadsheet,
  Calculator,
  Globe,
  Languages,
  Search,
  Maximize2,
  School,
  Table,
  Trophy,
  ArrowRight,
  Flame,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { STUDY_CURRICULUM } from '../data/studyNotesData';
import { PAST_PAPERS_DATA } from '../data/pastPapersData';
import { StudyLesson } from '../types';
import { useApp } from '../context/AppContext';
import { useCmsContent } from '../context/CmsContentContext';
import { StbbClassFiveScienceHub } from '../components/StbbClassFiveScienceHub';
import { TeachingLicenseNotesHub } from '../components/TeachingLicenseNotesHub';
import {
  PEDAGOGICAL_SUBJECTS,
  PedagogicalSubject,
  PedagogicalSubjectTopic
} from '../data/pedagogicalSubjectsData';
import { FullScreenInteractiveNoteReader } from '../components/FullScreenInteractiveNoteReader';
import { HtmlStudyLessonReader } from '../components/HtmlStudyLessonReader';
import { exportStudyLessonToPdf, exportMcqsToExcel } from '../lib/exportUtils';

const panel = 'rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 sm:p-7';
const button = 'rounded-xl px-4 py-2 bg-emerald-700 text-white font-semibold hover:bg-emerald-800 disabled:opacity-40';

const SUBJECT_ICON_MAP: Record<string, React.ElementType> = {
  Calculator,
  Atom,
  Globe,
  Languages,
  BookOpen,
  Sparkles,
};

type StudyNotesMode =
  | 'mathematics'
  | 'science'
  | 'social-studies'
  | 'english'
  | 'urdu-sindhi'
  | 'stbb'
  | 'teaching-license'
  | 'kids'
  | 'advanced';

function LessonReader({
  lesson,
  onBack,
  onOpenTeachingLicenseHub
}: {
  lesson: StudyLesson;
  onBack: () => void;
  onOpenTeachingLicenseHub?: () => void;
}) {
  const { setTab, setSelectedPastPaperId } = useApp();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState(false);
  const kids = lesson.audience === 'kids';
  const related = PAST_PAPERS_DATA.filter((p) => p.mcqs.some((q) => lesson.relatedQuestionIds.includes(q.id)));
  const isPedagogyNote = lesson.id.includes('instructional-approaches') || lesson.id.includes('ped') || lesson.id.includes('tlt');

  if (lesson.htmlNotesPath) {
    return <HtmlStudyLessonReader lesson={{ ...lesson, htmlNotesPath: lesson.htmlNotesPath }} onBack={onBack} />;
  }

  return (
    <article className="space-y-5 animate-in fade-in duration-150">
      <div className="flex items-center justify-between gap-4">
        <button onClick={onBack} className="text-emerald-700 dark:text-emerald-400 font-semibold cursor-pointer">
          ← All lessons
        </button>
        {isPedagogyNote && onOpenTeachingLicenseHub && (
          <button
            onClick={onOpenTeachingLicenseHub}
            className="text-xs px-3 py-1.5 rounded-xl bg-purple-600/10 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700/60 font-bold hover:bg-purple-600/20 transition cursor-pointer flex items-center gap-1.5"
          >
            <GraduationCap className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Open in Interactive STEDA Hub (Audio TTS &amp; Active Recall) →</span>
          </button>
        )}
      </div>

      <header className={`${panel} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
        <div>
          <p className="text-sm text-emerald-600">
            {kids ? 'Young learners' : 'Advanced study'} · {lesson.readTime}
          </p>
          <h1 className="text-3xl font-bold mt-2">{lesson.title}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {isPedagogyNote && onOpenTeachingLicenseHub && (
            <button
              onClick={onOpenTeachingLicenseHub}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
              title="Open in dedicated Teaching License Notes Hub"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Interactive STEDA Hub</span>
            </button>
          )}
          <button
            onClick={() => exportStudyLessonToPdf(lesson)}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
            title="Download complete lesson notes in PDF format"
          >
            <FileText className="w-4 h-4" />
            <span>Download Notes (PDF)</span>
          </button>
          {lesson.mcqs && lesson.mcqs.length > 0 && (
            <button
              onClick={() => exportMcqsToExcel(lesson.mcqs, `MUQABIL_Notes_MCQs_${lesson.title.replace(/\s+/g, '_')}`, { subject: lesson.title })}
              className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
              title="Download lesson practice MCQs in Excel (.xlsx)"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>MCQs (Excel)</span>
            </button>
          )}
        </div>
      </header>

      <section className={panel}>
        <h2 className="text-xl font-bold">{kids ? '📖 Let’s learn' : 'Detailed notes'}</h2>
        <p className="leading-8 mt-4 whitespace-pre-line">{lesson.explanation}</p>
        <h3 className="font-bold mt-6">Important points</h3>
        <ul className="list-disc pl-5 space-y-3 mt-3">
          {lesson.importantPoints.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      {(lesson.images ?? []).map((image) => (
        <figure key={image.src} className={panel}>
          <img src={image.src} alt={image.alt} className="w-full max-h-80 object-contain" />
          <figcaption className="text-center text-sm mt-3">{image.caption}</figcaption>
        </figure>
      ))}

      <section className={panel}>
        <h2 className="text-xl font-bold">{kids ? '🖍 Examples' : 'Examples & revision prompts'}</h2>
        <div className="space-y-3 mt-4">
          {lesson.examples.map((example, i) => (
            <p key={i} className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950 leading-7">
              {example}
            </p>
          ))}
        </div>
      </section>

      {!!lesson.formulas?.length && (
        <section className={panel}>
          <h2 className="text-xl font-bold">Formulas &amp; Rules</h2>
          {lesson.formulas.map((f) => (
            <p key={f} className="font-mono bg-slate-100 dark:bg-slate-800 p-4 mt-3 rounded-xl break-words">
              {f}
            </p>
          ))}
        </section>
      )}

      {lesson.tables?.map((table) => (
        <div key={table.title} className={`${panel} overflow-x-auto`}>
          <table className="w-full text-left">
            <caption className="text-left text-xl font-bold mb-4">{table.title}</caption>
            <thead>
              <tr>
                {table.headers.map((h) => (
                  <th scope="col" key={h} className="p-3 bg-slate-100 dark:bg-slate-800">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="p-3 border-b border-slate-200 dark:border-slate-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <section className={panel}>
        <h2 className="text-xl font-bold">{kids ? '🎮 Mini quiz' : 'MCQ practice'}</h2>
        {lesson.mcqs && lesson.mcqs.length > 0 ? (
          <>
            <div className="space-y-6 mt-5">
              {lesson.mcqs.map((q) => (
                <fieldset key={q.id}>
                  <legend className="font-semibold mb-3">
                    {q.question} {!kids && <span className="text-xs text-slate-500">· {q.difficulty}</span>}
                  </legend>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {q.options.map((o, i) => (
                      <label
                        key={i}
                        className={`flex gap-3 p-3 border rounded-xl cursor-pointer ${
                          checked && i === q.correctIndex
                            ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950 font-semibold'
                            : 'border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        <input
                          type="radio"
                          disabled={checked}
                          name={q.id}
                          checked={answers[q.id] === i}
                          onChange={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                        />
                        {o}
                      </label>
                    ))}
                  </div>
                  {checked && (
                    <p role="status" className="mt-3 leading-7 text-sm font-medium">
                      {answers[q.id] === q.correctIndex ? '✓ Correct! ' : `✗ Correct answer: ${q.options[q.correctIndex]}. `}
                      {q.explanation}
                    </p>
                  )}
                </fieldset>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <button
                className={button}
                disabled={!checked && Object.keys(answers).length !== lesson.mcqs.length}
                onClick={() => {
                  if (checked) {
                    setAnswers({});
                    setChecked(false);
                  } else {
                    setChecked(true);
                  }
                }}
              >
                {checked ? 'Try again' : 'Check answers'}
              </button>
              {checked && (
                <p role="status" className="font-bold text-emerald-600">
                  Score: {lesson.mcqs.filter((q) => answers[q.id] === q.correctIndex).length}/{lesson.mcqs.length}
                </p>
              )}
            </div>
          </>
        ) : (
          <p className="mt-3 text-slate-500">MCQs for this lesson have not been added yet.</p>
        )}
      </section>

      <section className={panel}>
        <h2 className="text-xl font-bold">Practice on your own</h2>
        {lesson.practice.map((p, i) => (
          <div key={i} className="mt-5">
            <p className="font-semibold text-slate-800 dark:text-slate-200">{p.prompt}</p>
            <details className="mt-3">
              <summary className="cursor-pointer text-emerald-700 dark:text-emerald-400 font-semibold">
                Show model answer
              </summary>
              <p className="mt-3 whitespace-pre-line leading-7 text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                {p.answer}
              </p>
            </details>
          </div>
        ))}
      </section>

      {related.length > 0 && (
        <section className={panel}>
          <h2 className="text-xl font-bold">Related past-paper practice</h2>
          <div className="space-y-4 mt-4">
            {related.map((p) => (
              <div key={p.id}>
                <h3 className="font-semibold">{p.exam} · {p.year}</h3>
                <ul className="list-disc pl-5 my-3 text-sm space-y-2">
                  {p.mcqs
                    .filter((q) => lesson.relatedQuestionIds.includes(q.id))
                    .map((q) => (
                      <li key={q.id}>{q.question}</li>
                    ))}
                </ul>
                <button
                  className={button}
                  onClick={() => {
                    setSelectedPastPaperId(p.id);
                    setTab('past-papers');
                  }}
                >
                  Open practice paper
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

export const StudyNotesView: React.FC = () => {
  const { lessons: cmsLessons } = useCmsContent();

  const [mode, setMode] = useState<StudyNotesMode>(() => {
    if (sessionStorage.getItem('matb_open_teaching_license')) {
      sessionStorage.removeItem('matb_open_teaching_license');
      return 'teaching-license';
    }
    if (sessionStorage.getItem('matb_open_stbb_science')) {
      sessionStorage.removeItem('matb_open_stbb_science');
      return 'stbb';
    }
    return 'mathematics';
  });

  const [topicQuery, setTopicQuery] = useState('');
  const [subjectId, setSubjectId] = useState('all');
  const [lessonId, setLessonId] = useState<string | null>(null);

  // Full-Screen Interactive Note Reader state
  const [fullScreenTopic, setFullScreenTopic] = useState<PedagogicalSubjectTopic | null>(null);

  // General curriculum lessons for kids/advanced
  const lessons = (STUDY_CURRICULUM || []).flatMap((subject) =>
    (subject?.chapters || []).flatMap((chapter) =>
      (chapter?.topics || []).flatMap((topic) =>
        (topic?.lessons || []).map((lesson) => ({ subject, chapter, topic, lesson }))
      )
    )
  );
  const selectedLesson = lessons.find((item) => item?.lesson?.id === lessonId);
  const visibleLessons = lessons.filter(
    (item) =>
      item?.lesson &&
      (mode === 'stbb' || item.lesson.audience === mode) &&
      (subjectId === 'all' || item.subject?.id === subjectId) &&
      `${item.subject?.title || ''} ${item.chapter?.title || ''} ${item.topic?.title || ''} ${item.lesson?.title || ''} ${item.lesson?.explanation || ''}`
        .toLowerCase()
        .includes(topicQuery.toLowerCase())
  );

  // Find active pedagogical subject if mode is one of the 5 subjects
  const currentPedagogicalSubject = PEDAGOGICAL_SUBJECTS.find((s) => s.id === mode);

  // Filtered topics within active pedagogical subject
  const filteredPedagogicalTopics = (currentPedagogicalSubject?.topics || []).filter((t) => {
    if (!topicQuery.trim()) return true;
    const q = topicQuery.toLowerCase();
    return (
      t.title.toLowerCase().includes(q) ||
      t.summary.toLowerCase().includes(q) ||
      t.dcarClassRange.toLowerCase().includes(q) ||
      t.didacticStrategy.frameworkName.toLowerCase().includes(q) ||
      t.didacticStrategy.commonStudentMisconception.toLowerCase().includes(q)
    );
  });

  // Handle Full-Screen Reader navigation between topics
  const handleNavigateFullScreenTopic = (direction: 'prev' | 'next') => {
    if (!currentPedagogicalSubject || !fullScreenTopic) return;
    const topics = currentPedagogicalSubject.topics;
    const currentIdx = topics.findIndex((t) => t.id === fullScreenTopic.id);
    if (direction === 'prev' && currentIdx > 0) {
      setFullScreenTopic(topics[currentIdx - 1]);
    } else if (direction === 'next' && currentIdx < topics.length - 1) {
      setFullScreenTopic(topics[currentIdx + 1]);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 text-slate-900 dark:text-slate-100 space-y-6">
      {/* FULL-SCREEN INTERACTIVE NOTES READER MODAL */}
      {fullScreenTopic && currentPedagogicalSubject && (
        <FullScreenInteractiveNoteReader
          topic={fullScreenTopic}
          subject={currentPedagogicalSubject}
          onClose={() => setFullScreenTopic(null)}
          onNavigateTopic={handleNavigateFullScreenTopic}
          hasPrevTopic={
            currentPedagogicalSubject.topics.findIndex((t) => t.id === fullScreenTopic.id) > 0
          }
          hasNextTopic={
            currentPedagogicalSubject.topics.findIndex((t) => t.id === fullScreenTopic.id) <
            currentPedagogicalSubject.topics.length - 1
          }
        />
      )}

      {/* If a general curriculum lesson is open */}
      {selectedLesson ? (
        <div key={selectedLesson.lesson.id}>
          <nav aria-label="Lesson location" className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mb-5">
            <span>{selectedLesson.subject?.title || ''}</span>
            <ChevronRight size={14} />
            <span>{selectedLesson.chapter?.title || ''}</span>
            <ChevronRight size={14} />
            <span>{selectedLesson.topic?.title || ''}</span>
            <ChevronRight size={14} />
            <span>{selectedLesson.lesson?.title || ''}</span>
          </nav>
          <LessonReader
            lesson={selectedLesson.lesson}
            onBack={() => setLessonId(null)}
            onOpenTeachingLicenseHub={() => {
              setMode('teaching-license');
              setLessonId(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* HEADER: Exactly matched to 'ONE LESSON AT A TIME / Your study library' */}
          <header className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 text-white shadow-xl border border-emerald-900/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <BookOpen className="text-emerald-400 mb-3 w-8 h-8" />
            <p className="text-xs text-emerald-400 font-extrabold tracking-widest uppercase">
              ONE LESSON AT A TIME
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold mt-1 font-display tracking-tight text-white">
              Your study library
            </h1>
            <p className="mt-2 text-slate-300 text-sm max-w-2xl leading-relaxed">
              Explore a subject. Understand a topic. Put it into practice. Assessed directly from the
              ‘School Curriculum of Class one to eight (available at DCAR) STBB’ for STS IBA Teaching License &amp; Educator Tests.
            </p>
          </header>

          {/* REDESIGNED SUBJECT SELECTOR PILLS */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
              <span className="uppercase tracking-wider">Core Subjects (Pedagogical Content Knowledge)</span>
              <span>50% Exam Blueprint</span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {/* 1. Mathematics */}
              <button
                aria-pressed={mode === 'mathematics'}
                onClick={() => {
                  setMode('mathematics');
                  setTopicQuery('');
                }}
                className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 font-bold text-xs sm:text-sm transition cursor-pointer shadow-xs ${
                  mode === 'mathematics'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md ring-2 ring-blue-500/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700 text-slate-700 dark:text-slate-200'
                }`}
              >
                <Calculator className="w-4 h-4 text-blue-400" />
                <span>Mathematics</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 font-extrabold">
                  10 MCQs
                </span>
              </button>

              {/* 2. Science */}
              <button
                aria-pressed={mode === 'science'}
                onClick={() => {
                  setMode('science');
                  setTopicQuery('');
                }}
                className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 font-bold text-xs sm:text-sm transition cursor-pointer shadow-xs ${
                  mode === 'science'
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md ring-2 ring-emerald-500/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-300 dark:hover:border-emerald-700 text-slate-700 dark:text-slate-200'
                }`}
              >
                <Atom className="w-4 h-4 text-emerald-400" />
                <span>Science</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-extrabold">
                  10 MCQs
                </span>
              </button>

              {/* 3. Social Studies */}
              <button
                aria-pressed={mode === 'social-studies'}
                onClick={() => {
                  setMode('social-studies');
                  setTopicQuery('');
                }}
                className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 font-bold text-xs sm:text-sm transition cursor-pointer shadow-xs ${
                  mode === 'social-studies'
                    ? 'bg-amber-600 text-white border-amber-500 shadow-md ring-2 ring-amber-500/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-amber-300 dark:hover:border-amber-700 text-slate-700 dark:text-slate-200'
                }`}
              >
                <Globe className="w-4 h-4 text-amber-400" />
                <span>Social Studies</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-extrabold">
                  10 MCQs
                </span>
              </button>

              {/* 4. English */}
              <button
                aria-pressed={mode === 'english'}
                onClick={() => {
                  setMode('english');
                  setTopicQuery('');
                }}
                className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 font-bold text-xs sm:text-sm transition cursor-pointer shadow-xs ${
                  mode === 'english'
                    ? 'bg-purple-600 text-white border-purple-500 shadow-md ring-2 ring-purple-500/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-purple-300 dark:hover:border-purple-700 text-slate-700 dark:text-slate-200'
                }`}
              >
                <Languages className="w-4 h-4 text-purple-400" />
                <span>English</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-extrabold">
                  10 MCQs
                </span>
              </button>

              {/* 5. Urdu or Sindhi */}
              <button
                aria-pressed={mode === 'urdu-sindhi'}
                onClick={() => {
                  setMode('urdu-sindhi');
                  setTopicQuery('');
                }}
                className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 font-bold text-xs sm:text-sm transition cursor-pointer shadow-xs ${
                  mode === 'urdu-sindhi'
                    ? 'bg-rose-600 text-white border-rose-500 shadow-md ring-2 ring-rose-500/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-rose-300 dark:hover:border-rose-700 text-slate-700 dark:text-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4 text-rose-400" />
                <span>Urdu or Sindhi</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-extrabold">
                  10 MCQs
                </span>
              </button>

              {/* STBB Class 5 Science Hub Tab */}
              <button
                aria-pressed={mode === 'stbb'}
                onClick={() => {
                  setMode('stbb');
                  setSubjectId('all');
                }}
                className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 font-bold text-xs sm:text-sm transition cursor-pointer ${
                  mode === 'stbb'
                    ? 'bg-teal-700 text-white border-teal-600 shadow-md ring-2 ring-teal-500/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Atom className="w-4 h-4 text-teal-400" />
                <span>STBB Class 5 Science (Sindh Board)</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">
                  Featured
                </span>
              </button>

              {/* STEDA Teaching License Master Hub */}
              <button
                aria-pressed={mode === 'teaching-license'}
                onClick={() => {
                  setMode('teaching-license');
                  setSubjectId('all');
                }}
                className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 font-bold text-xs sm:text-sm transition cursor-pointer ${
                  mode === 'teaching-license'
                    ? 'bg-gradient-to-r from-purple-700 to-indigo-800 text-white border-purple-700 shadow-md ring-2 ring-purple-500/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-pink-300" />
                <span>STEDA Master Hub (210+ CRQs &amp; ERQs)</span>
              </button>

              {/* Kids / Advanced Switcher */}
              <button
                aria-pressed={mode === 'kids'}
                onClick={() => {
                  setMode('kids');
                  setSubjectId('all');
                }}
                className={`flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 font-semibold text-xs transition cursor-pointer ${
                  mode === 'kids'
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kids · Simple</span>
              </button>

              <button
                aria-pressed={mode === 'advanced'}
                onClick={() => {
                  setMode('advanced');
                  setSubjectId('all');
                }}
                className={`flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 font-semibold text-xs transition cursor-pointer ${
                  mode === 'advanced'
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>General Lessons</span>
              </button>
            </div>
          </div>

          {/* VIEW RENDERER BASED ON SELECTED MODE */}
          {currentPedagogicalSubject ? (
            /* PEDAGOGICAL CONTENT KNOWLEDGE SUBJECT DASHBOARD */
            <section className="space-y-6 animate-in fade-in duration-200">
              {/* Subject Hero Card (Styled like image.png) */}
              <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/80 p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      STBB SINDH TEXTBOOK BOARD · CLASS 1 TO 8
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Sukkur IBA STS Teaching License Syllabus Aligned
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
                    {currentPedagogicalSubject.name}
                  </h2>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
                    {currentPedagogicalSubject.description}
                  </p>

                  {/* Feature Stats Pills (from screenshot) */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800/80 text-xs font-bold text-slate-200 flex items-center gap-1.5 shadow-2xs">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{currentPedagogicalSubject.topics.length} Topic Deep-Dives</span>
                    </span>
                    <span className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800/80 text-xs font-bold text-slate-200 flex items-center gap-1.5 shadow-2xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>10 Topic-Covering MCQs</span>
                    </span>
                    <span className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800/80 text-xs font-bold text-slate-200 flex items-center gap-1.5 shadow-2xs">
                      <Compass className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Didactic Frameworks Studio</span>
                    </span>
                    <span className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800/80 text-xs font-bold text-slate-200 flex items-center gap-1.5 shadow-2xs">
                      <Maximize2 className="w-3.5 h-3.5 text-purple-400" />
                      <span>Full-Screen Interactive Notes</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Sub-Navigation & Topic Search Bar */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 font-extrabold text-xs">
                    {filteredPedagogicalTopics.length} Topics Available
                  </span>
                  <p className="text-xs text-slate-500">
                    Click any topic card to open the <strong>Interactive Notes in Full Screen</strong>.
                  </p>
                </div>

                <div className="relative min-w-[260px]">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={topicQuery}
                    onChange={(e) => setTopicQuery(e.target.value)}
                    placeholder={`Search ${currentPedagogicalSubject.shortName} topics...`}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500/30"
                  />
                </div>
              </div>

              {/* INTERACTIVE TOPIC CARDS GRID */}
              <div className="grid gap-5 md:grid-cols-2">
                {filteredPedagogicalTopics.map((topic) => {
                  return (
                    <div
                      key={topic.id}
                      onClick={() => setFullScreenTopic(topic)}
                      className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 space-y-4 shadow-sm hover:shadow-xl hover:border-purple-400 dark:hover:border-purple-600 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        {/* Top Badges */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-lg bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 font-black text-xs">
                              Topic {topic.topicNumber}
                            </span>
                            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-xs">
                              {topic.dcarClassRange}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            <span>{topic.readTime}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition leading-snug">
                          {topic.title}
                        </h3>

                        {/* Summary */}
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                          {topic.summary}
                        </p>

                        {/* Didactic Framework Badge */}
                        <div className="rounded-xl border border-indigo-100 dark:border-indigo-950/60 bg-indigo-50/70 dark:bg-indigo-950/30 p-2.5 text-xs space-y-1">
                          <span className="font-extrabold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                            <Compass className="w-3.5 h-3.5" />
                            <span>Didactic Framework: {topic.didacticStrategy.frameworkName}</span>
                          </span>
                          <p className="text-slate-600 dark:text-slate-400 text-[11px] line-clamp-1">
                            Misconception: {topic.didacticStrategy.commonStudentMisconception}
                          </p>
                        </div>

                        {/* Interactive Feature Checkmarks */}
                        <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                            <Lightbulb className="w-3 h-3 text-amber-500" />
                            <span>Concept Breakdown</span>
                          </span>
                          {topic.comparisonTable && (
                            <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                              <Table className="w-3 h-3 text-cyan-500" />
                              <span>Comparative Matrix</span>
                            </span>
                          )}
                          {topic.quickQuiz && (
                            <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                              <Trophy className="w-3 h-3 text-purple-500" />
                              <span>{topic.quickQuiz.length} Practice MCQs</span>
                            </span>
                          )}
                          <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                            <School className="w-3 h-3 text-emerald-500" />
                            <span>Sindh Classroom Case</span>
                          </span>
                        </div>
                      </div>

                      {/* Prominent Action Button: Full Screen Trigger */}
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                        <span className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                          <span>Interactive Studio</span>
                        </span>
                        <button
                          type="button"
                          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/20 group-hover:scale-105 transition cursor-pointer"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Open in Full Screen</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredPedagogicalTopics.length === 0 && (
                <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center space-y-3">
                  <Search className="w-8 h-8 mx-auto text-slate-400" />
                  <h4 className="font-bold text-slate-900 dark:text-white">No matching topics found</h4>
                  <p className="text-xs text-slate-500">Try adjusting your keyword filter or browse all topics above.</p>
                </div>
              )}
            </section>
          ) : mode === 'stbb' ? (
            /* STBB Class 5 Science Hub */
            <div className="space-y-6 animate-in fade-in duration-150">
              <StbbClassFiveScienceHub />
            </div>
          ) : mode === 'teaching-license' ? (
            /* STEDA Teaching License Notes Hub */
            <div className="space-y-6 animate-in fade-in duration-150">
              <TeachingLicenseNotesHub />
            </div>
          ) : (
            /* General Lesson Curriculum (Kids & Advanced) */
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="grid sm:grid-cols-[1fr_280px] gap-4">
                <label>
                  Find a lesson
                  <input
                    value={topicQuery}
                    onChange={(e) => setTopicQuery(e.target.value)}
                    className="block w-full border rounded-xl p-3 mt-1 bg-transparent"
                    placeholder="Search subject, chapter or topic"
                  />
                </label>
                <label>
                  Subject
                  <select
                    value={subjectId}
                    onChange={(e) => setSubjectId(e.target.value)}
                    className="block w-full border rounded-xl p-3 mt-1 bg-white dark:bg-slate-900"
                  >
                    <option value="all">All subjects</option>
                    {STUDY_CURRICULUM.filter((s) =>
                      lessons.some((item) => item.subject.id === s.id && item.lesson.audience === mode)
                    ).map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {!!cmsLessons.length && (
                <section className={panel}>
                  <h2 className="text-2xl font-bold mb-5">New published lessons</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {cmsLessons
                      .filter((item) =>
                        `${item?.subject || ''} ${item?.chapter || ''} ${item?.topic || ''} ${item?.title || ''}`
                          .toLowerCase()
                          .includes(topicQuery.toLowerCase())
                      )
                      .map((item) => (
                        <details key={item.id} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                          <summary className="font-bold cursor-pointer">
                            {item.subject} → {item.chapter} → {item.topic} → {item.title}
                          </summary>
                          <p className="mt-4 leading-7 whitespace-pre-line">{item.explanation}</p>
                          {item.importantPoints && item.importantPoints.length > 0 && (
                            <ul className="list-disc pl-5 mt-4 space-y-2">
                              {item.importantPoints.map((point) => (
                                <li key={point}>{point}</li>
                              ))}
                            </ul>
                          )}
                        </details>
                      ))}
                  </div>
                </section>
              )}

              <div className="space-y-6">
                {(STUDY_CURRICULUM || []).filter((s) => visibleLessons.some((i) => i.subject?.id === s.id)).map((subject) => (
                  <section className={panel} key={subject.id}>
                    <h2 className="text-2xl font-bold mb-5">{subject.title}</h2>
                    {(subject.chapters || [])
                      .filter((c) => visibleLessons.some((i) => i.chapter?.id === c.id))
                      .map((chapter) => (
                        <div key={chapter.id}>
                          <h3 className="font-semibold text-emerald-700 dark:text-emerald-400">{chapter.title}</h3>
                          {(chapter.topics || [])
                            .filter((t) => visibleLessons.some((i) => i.topic?.id === t.id))
                            .map((topic) => (
                              <div key={topic.id} className="mt-4">
                                <p className="text-sm text-slate-500 mb-2">{topic.title}</p>
                                <div className="grid md:grid-cols-2 gap-3">
                                  {visibleLessons
                                    .filter((i) => i.topic?.id === topic.id)
                                    .map(({ lesson }) => (
                                      <button
                                        key={lesson.id}
                                        onClick={() => setLessonId(lesson.id)}
                                        className="text-left rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
                                      >
                                        <span className="font-bold block">{lesson?.title}</span>
                                        <span className="block text-sm text-slate-500 mt-2">
                                          {lesson?.readTime} · {lesson.htmlNotesPath ? 'Interactive HTML & practice quiz' : `${lesson?.mcqs?.length ?? 0} MCQs`}
                                        </span>
                                        <span className="block mt-3 text-emerald-700 dark:text-emerald-400 font-semibold">
                                          Open lesson →
                                        </span>
                                      </button>
                                    ))}
                                </div>
                              </div>
                            ))}
                        </div>
                      ))}
                  </section>
                ))}
              </div>
              {!visibleLessons.length && (
                <p className={panel}>No lessons match. Try another subject or search.</p>
              )}
            </div>
          )}
        </div>
      )}
    </main>
  );
};
