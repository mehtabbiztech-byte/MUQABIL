import React, { useState } from 'react';
import type { StbbChapterConfig } from '../data/stbbChapterTwoMicroorganismsData';

export function normalizeStudyAnswer(value: string): string {
  return value.normalize('NFKC').trim().toLowerCase().replace(/[–—]/g, '-').replace(/\s+/g, ' ');
}

const card = 'rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 space-y-4';
const button = 'px-3 py-2 rounded-lg bg-emerald-700 text-white text-sm font-bold hover:bg-emerald-800 disabled:opacity-50';
const input = 'w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 p-3 text-sm';

export const StbbActivitiesAndQA: React.FC<{
  chapter: StbbChapterConfig;
  mode: 'activities' | 'qa';
}> = ({ chapter, mode }) => {
  const extras = chapter.activitiesAndQA;
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [choices, setChoices] = useState<Record<string, boolean>>({});
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState('all');
  if (!extras) return null;
  const setDraft = (key: string, value: string) => setDrafts(prev => ({ ...prev, [key]: value }));
  const reset = () => { setDrafts({}); setChecked({}); setChoices({}); setCompleted({}); };
  const totalDone = extras.activities.filter(a => completed[a.id]).length;
  const blankCorrect = extras.fillInBlanks.filter(q => checked[q.id] && [q.answer, ...(q.acceptedVariants || [])].some(a => normalizeStudyAnswer(a) === normalizeStudyAnswer(drafts[q.id] || ''))).length;
  const tfCorrect = extras.trueFalse.filter(q => choices[q.id] === q.isTrue).length;
  const categories = [
    ['all', 'All Types'], ['blanks', 'Fill in the Blanks'], ['tf', 'True / False'],
    ['definition-short', 'Definitions & Short Answers'], ['give-reason', 'Give Reasons'],
    ['structured-long', 'Long Answers / Diagrams'], ['problem-solving', 'Scientific Problem Solving'], ['mcqs', 'Multiple Choice']
  ];
  return <section className="space-y-5" aria-label={mode === 'activities' ? 'Chapter activities' : 'Questions and answers'}>
    <header className={card}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Chapter {chapter.chapterNumber} • Learn by doing</p>
          <h2 className="text-2xl font-black mt-1">{mode === 'activities' ? 'Activities & Investigation Journal' : 'Questions & Answers — All Types'}</h2></div>
        <button type="button" className={button} onClick={reset}>Reset practice & journal</button>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300">{mode === 'activities' ? `${totalDone} / ${extras.activities.length} activities marked complete. Write predictions and actual observations, then compare with the guide.` : `Practise before revealing model answers. Blanks: ${blankCorrect}/${extras.fillInBlanks.length} correct; True/False: ${tfCorrect}/${extras.trueFalse.length} correct.`}</p>
      <p className="text-xs text-slate-500">Your journal and practice answers are kept only while this tab is open; switching chapter or tab resets them.</p>
    </header>
    {mode === 'activities' ? extras.activities.map(a => <article key={a.id} className={card}>
      <div className="flex flex-wrap justify-between items-center gap-3"><h3 className="text-lg font-extrabold">{a.emoji} {a.activityNumber}: {a.title}</h3>
        <label className="text-sm font-bold flex items-center gap-2"><input type="checkbox" checked={!!completed[a.id]} onChange={e => setCompleted(prev => ({ ...prev, [a.id]: e.target.checked }))} /> Mark complete</label></div>
      <p><strong>Aim: </strong>{a.aim}</p>
      <div className="grid md:grid-cols-2 gap-5"><div><h4 className="font-bold mb-2">Materials</h4><ul className="list-disc pl-5 space-y-1 text-sm">{a.materials.map(m => <li key={m}>{m}</li>)}</ul></div>
        <div><h4 className="font-bold mb-2">Procedure</h4><ol className="list-decimal pl-5 space-y-2 text-sm">{a.procedure.map((p,i) => <li key={i}>{p}</li>)}</ol></div></div>
      {a.safetyOrTeacherTip && <p className="rounded-xl bg-amber-50 dark:bg-amber-950/40 p-3 text-sm"><strong>Safety / teacher guidance: </strong>{a.safetyOrTeacherTip}</p>}
      <label className="block text-sm font-bold">My prediction<textarea className={`${input} mt-2`} value={drafts[`${a.id}-predict`] || ''} onChange={e => setDraft(`${a.id}-predict`, e.target.value)} placeholder="What do you think will happen, and why?" /></label>
      {a.observationTable && <div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><caption className="text-left font-bold mb-2">Observation record — blank cells are for your measurements</caption><thead><tr>{a.observationTable.headers.map((h,i) => <th key={i} className="p-3 border border-slate-200 dark:border-slate-700 text-left">{h}</th>)}</tr></thead><tbody>{a.observationTable.rows.map((row,r) => <tr key={r}>{row.map((cell,c) => <td key={c} className="p-2 border border-slate-200 dark:border-slate-700">{cell || <input aria-label={`${a.title}, row ${r+1}, ${a.observationTable!.headers[c]}`} className={input} value={drafts[`${a.id}-${r}-${c}`] || ''} onChange={e => setDraft(`${a.id}-${r}-${c}`,e.target.value)} />}</td>)}</tr>)}</tbody></table></div>}
      <label className="block text-sm font-bold">My observations & conclusion<textarea className={`${input} mt-2`} value={drafts[`${a.id}-notes`] || ''} onChange={e => setDraft(`${a.id}-notes`,e.target.value)} placeholder="Record what actually happened. Include measurements and explain any unexpected result." /></label>
      <details className="rounded-xl bg-emerald-50 dark:bg-emerald-950/30 p-4"><summary className="font-bold cursor-pointer">Compare with expected observations & answers</summary><div className="space-y-3 mt-3 text-sm">{a.questions.map((q,i) => <div key={i}><p className="font-bold">{q.question}</p><p>{q.answer}</p></div>)}<p><strong>Conclusion: </strong>{a.conclusion}</p></div></details>
    </article>) : <>
      <nav className="flex flex-wrap gap-2" aria-label="Question types">{categories.map(([id,label]) => <button key={id} type="button" aria-pressed={filter === id} onClick={() => setFilter(id)} className={filter === id ? button : 'px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-bold'}>{label}</button>)}</nav>
      {(filter === 'all' || filter === 'blanks') && <section className={card}><h3 className="text-xl font-bold">Fill in the Blanks</h3>{extras.fillInBlanks.map(q => {
        const correct = [q.answer,...(q.acceptedVariants || [])].some(a => normalizeStudyAnswer(a) === normalizeStudyAnswer(drafts[q.id] || ''));
        return <div key={q.id} className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-2"><label className="block font-semibold" htmlFor={q.id}>{q.promptWithBlank}</label><div className="flex gap-2"><input id={q.id} className={input} value={drafts[q.id] || ''} onChange={e => {setDraft(q.id,e.target.value);setChecked(prev => ({...prev,[q.id]:false}));}} /><button type="button" className={button} disabled={!drafts[q.id]?.trim()} onClick={() => setChecked(prev => ({...prev,[q.id]:true}))}>Check</button></div>{q.hint && <p className="text-xs">Hint: {q.hint}</p>}{checked[q.id] && <p role="status" className={correct ? 'text-emerald-600' : 'text-amber-600'}>{correct ? 'Correct!' : 'Not yet — compare with the answer below.'}</p>}<details><summary className="cursor-pointer text-sm font-bold text-emerald-600">Reveal answer & explanation</summary><p className="text-sm">{q.answer} — {q.explanation}</p></details></div>;
      })}</section>}
      {(filter === 'all' || filter === 'tf') && <section className={card}><h3 className="text-xl font-bold">True or False — Correct the False Statements</h3>{extras.trueFalse.map(q => <div key={q.id} className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-3"><p className="font-semibold">{q.statement}</p><div className="flex gap-2">{[true,false].map(v => <button type="button" key={String(v)} aria-pressed={choices[q.id] === v} className={choices[q.id] === v ? button : 'rounded-lg border px-4 py-2'} onClick={() => setChoices(prev => ({...prev,[q.id]:v}))}>{v ? 'True' : 'False'}</button>)}</div>{choices[q.id] !== undefined && <p role="status" className="text-sm"><strong>{choices[q.id] === q.isTrue ? 'Correct!' : 'Try again.'} Answer: {q.isTrue ? 'True' : 'False'}. </strong>{q.explanation}</p>}</div>)}</section>}
      {extras.descriptiveQA.filter(q => filter === 'all' || filter === q.category).map(q => <article key={q.id} className={card}><span className="text-xs uppercase font-black text-emerald-600">{q.badgeLabel}</span><h3 className="text-lg font-bold">{q.question}</h3><label className="block text-sm font-bold">My answer<textarea className={`${input} mt-2`} value={drafts[q.id] || ''} onChange={e => setDraft(q.id,e.target.value)} placeholder="Write your own answer before comparing. Diagrams: sketch on paper and record labels here." /></label><details><summary className="cursor-pointer font-bold text-emerald-600">Reveal model answer</summary><p className="mt-3 text-sm leading-relaxed">{q.answer}</p>{q.bulletPoints && <ul className="list-disc pl-5 text-sm">{q.bulletPoints.map(p => <li key={p}>{p}</li>)}</ul>}{q.examKeywords && <p className="mt-2 text-xs font-bold">Keywords: {q.examKeywords.join(' • ')}</p>}</details></article>)}
      {(filter === 'all' || filter === 'mcqs') && <section className={card}><h3 className="text-xl font-bold">Multiple Choice — Answer Key</h3><p className="text-sm">Use the “40 Solved MCQs” tab for scored practice, bookmarks and timed mock exams. Below is a revision answer key.</p>{chapter.mcqs.map(q => <details key={q.id} className="border-t border-slate-200 dark:border-slate-700 pt-3"><summary className="cursor-pointer font-semibold text-sm">{q.number}. {q.question}</summary><ul className="text-sm my-2">{q.options.map((o,i) => <li key={i}>{String.fromCharCode(65+i)}. {o}</li>)}</ul><p className="text-sm"><strong>Answer: {String.fromCharCode(65+q.correctIndex)}. {q.options[q.correctIndex]}.</strong> {q.explanation}</p></details>)}</section>}
    </>}
  </section>;
};
