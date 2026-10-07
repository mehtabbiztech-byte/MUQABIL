import React, { useEffect, useMemo, useState } from 'react';
import { BookOpenCheck, CheckCircle2, ChevronDown, Clock3, Search, Sparkles, Target, FileText } from 'lucide-react';
import { SubjectiveAnswerEditor } from './SubjectiveAnswerEditor';
import { TEACHING_LICENSE_SUBJECTIVE_QUESTIONS, type SubjectiveQuestionType } from '../data/teachingLicenseSubjectiveData';
import { exportSubjectivePracticeToPdf } from '../lib/exportUtils';


export const TeachingLicenseSubjectivePractice: React.FC = () => {
  const [type, setType] = useState<SubjectiveQuestionType>('CRQ');
  const [query, setQuery] = useState('');
  const typeQuestions = useMemo(() => TEACHING_LICENSE_SUBJECTIVE_QUESTIONS.filter((item) => item.type === type), [type]);
  const questions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return typeQuestions;
    return typeQuestions.filter((item) => `${item.subject} ${item.area} ${item.prompt}`.toLowerCase().includes(normalized));
  }, [query, typeQuestions]);
  const [selectedId, setSelectedId] = useState(typeQuestions[0].id);
  const [timed, setTimed] = useState(false);
  const [showPlan, setShowPlan] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const selected = TEACHING_LICENSE_SUBJECTIVE_QUESTIONS.find((item) => item.id === selectedId) ?? typeQuestions[0];

  useEffect(() => {
    if (!typeQuestions.some((item) => item.id === selectedId)) setSelectedId(typeQuestions[0].id);
  }, [typeQuestions, selectedId]);

  useEffect(() => { setShowPlan(false); setShowModel(false); }, [selected.id]);

  const rubricTotal = selected.rubric.reduce((sum, item) => sum + item.marks, 0);

  return (
    <section className="space-y-6" aria-label="Teaching License CRQ and ERQ practice">
      <header className="overflow-hidden rounded-3xl border border-rose-200 bg-gradient-to-br from-rose-600 via-fuchsia-700 to-purple-800 p-6 text-white shadow-xl sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider"><Sparkles className="h-3.5 w-3.5 text-amber-300" />Subjective Answer Lab</div>
            <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">CRQ &amp; ERQ Writing Practice</h2>
            <p className="mt-3 text-sm leading-6 text-rose-100">Build concise constructed responses and well-organized extended answers with answer plans, model responses, and transparent marking rubrics.</p>
          </div>
          <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/15 bg-slate-950/25 p-2 backdrop-blur">
            <div className="rounded-xl bg-white/10 px-4 py-3 text-center"><p className="text-2xl font-black">{TEACHING_LICENSE_SUBJECTIVE_QUESTIONS.filter((item) => item.type === 'CRQ').length}</p><p className="text-[10px] font-bold uppercase tracking-wider text-rose-200">CRQs</p></div>
            <div className="rounded-xl bg-white/10 px-4 py-3 text-center"><p className="text-2xl font-black">{TEACHING_LICENSE_SUBJECTIVE_QUESTIONS.filter((item) => item.type === 'ERQ').length}</p><p className="text-[10px] font-bold uppercase tracking-wider text-rose-200">ERQs</p></div>
          </div>
        </div>
      </header>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
          <aside className="space-y-4">
            <div className="grid grid-cols-2 gap-1 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
              {(['CRQ', 'ERQ'] as const).map((item) => <button key={item} onClick={() => setType(item)} className={`rounded-xl px-3 py-2.5 text-sm font-extrabold transition ${type === item ? 'bg-white text-purple-700 shadow dark:bg-slate-950 dark:text-purple-300' : 'text-slate-500'}`}>{item}</button>)}
            </div>
            <label className="relative block"><Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search topic or subject…" className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs text-slate-900 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" /></label>
            <p className="text-[11px] font-bold text-slate-500">Showing {questions.length} of {typeQuestions.length} {type}s</p>
            <div className="max-h-[720px] space-y-2 overflow-y-auto pr-1 [scrollbar-color:rgb(168_85_247)_transparent] [scrollbar-width:thin]">
              {questions.map((item, index) => <button key={item.id} onClick={() => setSelectedId(item.id)} className={`w-full rounded-2xl border p-3 text-left transition ${selected.id === item.id ? 'border-purple-400 bg-purple-50 shadow-sm dark:border-purple-700 dark:bg-purple-950/30' : 'border-slate-200 hover:border-purple-200 dark:border-slate-800 dark:hover:border-purple-800'}`}>
                <div className="flex items-center justify-between gap-2"><span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600">{type} {index + 1}</span><span className="text-[10px] font-bold text-slate-500">{item.marks} marks</span></div>
                <p className="mt-1.5 line-clamp-2 text-xs font-bold leading-5 text-slate-800 dark:text-slate-100">{item.subject}: {item.prompt}</p>
              </button>)}
              {!questions.length && <div className="rounded-2xl border border-dashed border-slate-300 p-5 text-center text-xs text-slate-500 dark:border-slate-700">No matching questions. Try another keyword.</div>}
            </div>
          </aside>

          <article className="min-w-0 space-y-5 rounded-3xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-950/40 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-extrabold text-purple-800 dark:bg-purple-950 dark:text-purple-200">{selected.type} · {selected.area}</span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600 shadow-sm dark:bg-slate-900 dark:text-slate-300">{selected.subject}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600 shadow-sm dark:bg-slate-900 dark:text-slate-300"><Clock3 className="h-3.5 w-3.5" />{selected.suggestedMinutes} minutes</span>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-800 dark:bg-amber-950 dark:text-amber-200">{selected.marks} marks</span>
              </div>
              <button
                onClick={() => exportSubjectivePracticeToPdf(selected)}
                className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                title="Download prompt, answer plan, model answer and rubric as PDF"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Download Dossier (PDF)</span>
              </button>
            </div>

            <div><p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Question</p><h3 className="mt-2 text-lg font-extrabold leading-8 text-slate-950 dark:text-white">{selected.prompt}</h3></div>
            <div className="flex flex-wrap gap-2">{selected.commandWords.map((word) => <span key={word} className="rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">{word}</span>)}</div>

            <SubjectiveAnswerEditor key={selected.id} question={selected} onTimedChange={(active) => { setTimed(active); if (active) { setShowPlan(false); setShowModel(false); } }} />

            <div className="grid gap-3 sm:grid-cols-2">
              <button disabled={timed} title={timed ? 'Available after submission' : undefined} onClick={() => setShowPlan((value) => !value)} className="flex items-center justify-between rounded-2xl border border-blue-200 bg-blue-50 p-4 text-left text-sm font-extrabold text-blue-800 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-200"><span className="inline-flex items-center gap-2"><Target className="h-4 w-4" />Answer plan</span><ChevronDown className={`h-4 w-4 transition ${showPlan ? 'rotate-180' : ''}`} /></button>
              <button disabled={timed} title={timed ? 'Available after submission' : undefined} onClick={() => setShowModel((value) => !value)} className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-left text-sm font-extrabold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200"><span className="inline-flex items-center gap-2"><BookOpenCheck className="h-4 w-4" />Model answer &amp; rubric</span><ChevronDown className={`h-4 w-4 transition ${showModel ? 'rotate-180' : ''}`} /></button>
            </div>

            {showPlan && !timed && <div className="rounded-2xl border border-blue-200 bg-white p-5 dark:border-blue-900 dark:bg-slate-900"><h4 className="font-extrabold text-blue-900 dark:text-blue-200">Plan before writing</h4><ol className="mt-3 space-y-2">{selected.answerPlan.map((step, index) => <li key={step} className="flex gap-3 text-sm leading-6 text-slate-700 dark:text-slate-300"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue-100 text-xs font-black text-blue-700 dark:bg-blue-950 dark:text-blue-300">{index + 1}</span>{step}</li>)}</ol></div>}
            {showModel && !timed && <div className="space-y-4 rounded-2xl border border-emerald-200 bg-white p-5 dark:border-emerald-900 dark:bg-slate-900"><div><h4 className="font-extrabold text-emerald-900 dark:text-emerald-200">Model answer</h4><p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{selected.modelAnswer}</p></div><div className="border-t border-slate-200 pt-4 dark:border-slate-800"><div className="flex items-center justify-between"><h4 className="font-extrabold text-slate-900 dark:text-white">Self-marking rubric</h4><span className="text-xs font-black text-emerald-700">Total: {rubricTotal}</span></div><div className="mt-3 space-y-2">{selected.rubric.map((item) => <div key={item.criterion} className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-3 py-2 text-sm dark:bg-slate-950"><span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" />{item.criterion}</span><strong>{item.marks}</strong></div>)}</div></div></div>}
          </article>
        </div>
      </div>
      <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200"><strong>Practice notice:</strong> These CRQs and ERQs are skills-building practice aligned with Teaching License content and pedagogy. They are not presented as verified questions from an official STEDA/STS paper.</p>
    </section>
  );
};
