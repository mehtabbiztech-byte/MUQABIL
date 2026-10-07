import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronRight, GraduationCap, Sparkles, Atom, Compass, CheckCircle2, FileText, FileSpreadsheet } from 'lucide-react';
import { STUDY_CURRICULUM } from '../data/studyNotesData';
import { PAST_PAPERS_DATA } from '../data/pastPapersData';
import { StudyLesson } from '../types';
import { useApp } from '../context/AppContext';
import { useCmsContent } from '../context/CmsContentContext';
import { StbbClassFiveScienceHub } from '../components/StbbClassFiveScienceHub';
import { exportStudyLessonToPdf, exportMcqsToExcel } from '../lib/exportUtils';

const panel = 'rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 sm:p-7';
const button = 'rounded-xl px-4 py-2 bg-emerald-700 text-white font-semibold hover:bg-emerald-800 disabled:opacity-40';

function LessonReader({ lesson, onBack }: { lesson: StudyLesson; onBack: () => void }) {
  const { setTab, setSelectedPastPaperId } = useApp();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState(false);
  const kids = lesson.audience === 'kids';
  const related = PAST_PAPERS_DATA.filter(p => p.mcqs.some(q => lesson.relatedQuestionIds.includes(q.id)));
  return <article className="space-y-5">
    <button onClick={onBack} className="text-emerald-700 dark:text-emerald-400 font-semibold cursor-pointer">← All lessons</button>
    <header className={`${panel} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
      <div>
        <p className="text-sm text-emerald-600">{kids ? 'Young learners' : 'Advanced study'} · {lesson.readTime}</p>
        <h1 className="text-3xl font-bold mt-2">{lesson.title}</h1>
      </div>
      <div className="flex flex-wrap items-center gap-2">
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
    <section className={panel}><h2 className="text-xl font-bold">{kids ? '📖 Let’s learn' : 'Detailed notes'}</h2><p className="leading-8 mt-4">{lesson.explanation}</p><h3 className="font-bold mt-6">Important points</h3><ul className="list-disc pl-5 space-y-3 mt-3">{lesson.importantPoints.map(p => <li key={p}>{p}</li>)}</ul></section>
    {(lesson.images ?? []).map(image => <figure key={image.src} className={panel}><img src={image.src} alt={image.alt} className="w-full max-h-80 object-contain"/><figcaption className="text-center text-sm mt-3">{image.caption}</figcaption></figure>)}
    <section className={panel}><h2 className="text-xl font-bold">{kids ? '🖍 Examples' : 'Examples & revision prompts'}</h2><div className="space-y-3 mt-4">{lesson.examples.map((example, i) => <p key={i} className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950 leading-7">{example}</p>)}</div></section>
    {!!lesson.formulas?.length && <section className={panel}><h2 className="text-xl font-bold">Formulas</h2>{lesson.formulas.map(f => <p key={f} className="font-mono bg-slate-100 dark:bg-slate-800 p-4 mt-3 rounded-xl break-words">{f}</p>)}</section>}
    {lesson.tables?.map(table => <div key={table.title} className={`${panel} overflow-x-auto`}><table className="w-full text-left"><caption className="text-left text-xl font-bold mb-4">{table.title}</caption><thead><tr>{table.headers.map(h => <th scope="col" key={h} className="p-3 bg-slate-100 dark:bg-slate-800">{h}</th>)}</tr></thead><tbody>{table.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j} className="p-3 border-b border-slate-200 dark:border-slate-700">{cell}</td>)}</tr>)}</tbody></table></div>)}
    <section className={panel}><h2 className="text-xl font-bold">{kids ? '🎮 Mini quiz' : 'MCQ practice'}</h2>{lesson.mcqs.length ? <><div className="space-y-6 mt-5">{lesson.mcqs.map(q => <fieldset key={q.id}><legend className="font-semibold mb-3">{q.question} {!kids && <span className="text-xs text-slate-500">· {q.difficulty}</span>}</legend><div className="grid sm:grid-cols-2 gap-2">{q.options.map((o, i) => <label key={i} className={`flex gap-3 p-3 border rounded-xl ${checked && i === q.correctIndex ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950' : 'border-slate-300 dark:border-slate-700'}`}><input type="radio" disabled={checked} name={q.id} checked={answers[q.id] === i} onChange={() => setAnswers(a => ({...a, [q.id]: i}))}/>{o}</label>)}</div>{checked && <p role="status" className="mt-3 leading-7">{answers[q.id] === q.correctIndex ? 'Correct! ' : `Correct answer: ${q.options[q.correctIndex]}. `}{q.explanation}</p>}</fieldset>)}</div><div className="flex flex-wrap items-center gap-3 mt-5"><button className={button} disabled={!checked && Object.keys(answers).length !== lesson.mcqs.length} onClick={() => { if(checked) { setAnswers({}); setChecked(false); } else setChecked(true); }}>{checked ? 'Try again' : 'Check answers'}</button>{checked && <p role="status">Score: {lesson.mcqs.filter(q => answers[q.id] === q.correctIndex).length}/{lesson.mcqs.length}</p>}</div></> : <p className="mt-3 text-slate-500">MCQs for this lesson have not been added yet. Try the practice below.</p>}</section>
    <section className={panel}><h2 className="text-xl font-bold">Practice on your own</h2>{lesson.practice.map((p, i) => <div key={i} className="mt-5"><p>{p.prompt}</p><details className="mt-3"><summary className="cursor-pointer text-emerald-700 dark:text-emerald-400 font-semibold">Show model answer</summary><p className="mt-3 whitespace-pre-line leading-7">{p.answer}</p></details></div>)}</section>
    {!kids && <section className={panel}><h2 className="text-xl font-bold">References</h2>{lesson.references?.length ? <ul className="mt-3 space-y-2">{lesson.references.map(r => <li key={r.url}><a href={r.url} target="_blank" rel="noreferrer" className="text-emerald-700 underline">{r.title}</a></li>)}</ul> : <p className="mt-3 text-sm text-slate-500">Source references have not been attached to this lesson. Existing revision material needs editorial verification before use as an authoritative source.</p>}</section>}
    <section className={panel}><h2 className="text-xl font-bold">Related past-paper practice</h2><p className="mt-2 text-sm text-slate-500">These are related questions in the app’s practice selections; official paper provenance is not verified.</p>{related.length ? <div className="space-y-4 mt-4">{related.map(p => <div key={p.id}><h3 className="font-semibold">{p.exam} · {p.year}</h3><ul className="list-disc pl-5 my-3 text-sm space-y-2">{p.mcqs.filter(q => lesson.relatedQuestionIds.includes(q.id)).map(q => <li key={q.id}>{q.question}</li>)}</ul><button className={button} onClick={() => { setSelectedPastPaperId(p.id); setTab('past-papers'); }}>Open practice paper</button></div>)}</div> : <p className="mt-3">No related paper questions linked yet.</p>}</section>
  </article>;
}

export const StudyNotesView: React.FC = () => {
  const { lessons: cmsLessons } = useCmsContent();
  const [mode, setMode] = useState<'stbb' | 'kids' | 'advanced'>(() => {
    if (sessionStorage.getItem('matb_open_stbb_science')) {
      sessionStorage.removeItem('matb_open_stbb_science');
      return 'stbb';
    }
    return 'stbb';
  });
  const [query, setQuery] = useState('');
  const [subjectId, setSubjectId] = useState('all');
  const [lessonId, setLessonId] = useState<string | null>(null);
  const lessons = STUDY_CURRICULUM.flatMap(subject => subject.chapters.flatMap(chapter => chapter.topics.flatMap(topic => topic.lessons.map(lesson => ({subject, chapter, topic, lesson})))));
  const selected = lessons.find(item => item.lesson.id === lessonId);
  const visible = lessons.filter(item => (mode === 'stbb' || item.lesson.audience === mode) && (subjectId === 'all' || item.subject.id === subjectId) && `${item.subject.title} ${item.chapter.title} ${item.topic.title} ${item.lesson.title} ${item.lesson.explanation}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 text-slate-900 dark:text-slate-100 space-y-6">
      {selected ? (
        <div key={selected.lesson.id}>
          <nav aria-label="Lesson location" className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mb-5">
            <span>{selected.subject.title}</span>
            <ChevronRight size={14} />
            <span>{selected.chapter.title}</span>
            <ChevronRight size={14} />
            <span>{selected.topic.title}</span>
            <ChevronRight size={14} />
            <span>{selected.lesson.title}</span>
          </nav>
          <LessonReader lesson={selected.lesson} onBack={() => setLessonId(null)} />
        </div>
      ) : (
        <div className="space-y-6">
          <header className="rounded-3xl p-8 bg-emerald-950 text-white">
            <BookOpen className="text-emerald-300 mb-4" />
            <p className="text-sm text-emerald-300 font-semibold">ONE LESSON AT A TIME</p>
            <h1 className="text-3xl font-bold mt-2">Your study library</h1>
            <p className="mt-3 text-emerald-100">Explore a subject. Understand a topic. Put it into practice.</p>
          </header>

          {/* Mode Switcher Tabs */}
          <div className="flex flex-wrap gap-3">
            <button
              aria-pressed={mode === 'stbb'}
              onClick={() => {
                setMode('stbb');
                setSubjectId('all');
              }}
              className={`flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold transition cursor-pointer ${
                mode === 'stbb' ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm' : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Atom size={18} />
              <span>STBB Class 5 Science (Sindh Board)</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">
                Featured
              </span>
            </button>

            <button
              aria-pressed={mode === 'kids'}
              onClick={() => {
                setMode('kids');
                setSubjectId('all');
              }}
              className={`flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold transition cursor-pointer ${
                mode === 'kids' ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm' : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Sparkles size={18} />
              <span>Kids · Simple &amp; visual</span>
            </button>

            <button
              aria-pressed={mode === 'advanced'}
              onClick={() => {
                setMode('advanced');
                setSubjectId('all');
              }}
              className={`flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold transition cursor-pointer ${
                mode === 'advanced' ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm' : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <GraduationCap size={18} />
              <span>Advanced · Exam preparation</span>
            </button>
          </div>

          {/* If STBB mode is active: show the complete STBB Class 5 Science Hub */}
          {mode === 'stbb' ? (
            <div className="space-y-6 animate-in fade-in duration-150">
              <StbbClassFiveScienceHub />
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-sm text-slate-500">Starter lesson library — more subjects and chapters can be added as content is reviewed.</p>
              <div className="grid sm:grid-cols-[1fr_280px] gap-4">
                <label>
                  Find a lesson
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
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
                    {STUDY_CURRICULUM.filter((s) => lessons.some((item) => item.subject.id === s.id && item.lesson.audience === mode)).map((s) => (
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
                      .filter((item) => `${item.subject} ${item.chapter} ${item.topic} ${item.title}`.toLowerCase().includes(query.toLowerCase()))
                      .map((item) => (
                        <details key={item.id} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                          <summary className="font-bold cursor-pointer">
                            {item.subject} → {item.chapter} → {item.topic} → {item.title}
                          </summary>
                          <p className="mt-4 leading-7 whitespace-pre-line">{item.explanation}</p>
                          {item.importantPoints.length > 0 && (
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
                {STUDY_CURRICULUM.filter((s) => visible.some((i) => i.subject.id === s.id)).map((subject) => (
                  <section className={panel} key={subject.id}>
                    <h2 className="text-2xl font-bold mb-5">{subject.title}</h2>
                    {subject.chapters
                      .filter((c) => visible.some((i) => i.chapter.id === c.id))
                      .map((chapter) => (
                        <div key={chapter.id}>
                          <h3 className="font-semibold text-emerald-700 dark:text-emerald-400">{chapter.title}</h3>
                          {chapter.topics
                            .filter((t) => visible.some((i) => i.topic.id === t.id))
                            .map((topic) => (
                              <div key={topic.id} className="mt-4">
                                <p className="text-sm text-slate-500 mb-2">{topic.title}</p>
                                <div className="grid md:grid-cols-2 gap-3">
                                  {visible
                                    .filter((i) => i.topic.id === topic.id)
                                    .map(({ lesson }) => (
                                      <button
                                        key={lesson.id}
                                        onClick={() => setLessonId(lesson.id)}
                                        className="text-left rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
                                      >
                                        <span className="font-bold block">{lesson.title}</span>
                                        <span className="block text-sm text-slate-500 mt-2">
                                          {lesson.readTime} · {lesson.mcqs.length} MCQs
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
              {!visible.length && <p className={panel}>No lessons match. Try another subject or search.</p>}
            </div>
          )}
        </div>
      )}
    </main>
  );
};

