import React, { useEffect, useState } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import type { StudyLesson } from '../types';

interface HtmlStudyLessonReaderProps {
  lesson: StudyLesson & { htmlNotesPath: string };
  onBack: () => void;
  baseUrl?: string;
}

/** Keep supplied HTML/CSS and quiz scripts separate from the application DOM. */
export function HtmlStudyLessonReader({
  lesson,
  onBack,
  baseUrl = import.meta.env?.BASE_URL ?? '/',
}: HtmlStudyLessonReaderProps) {
  const [expanded, setExpanded] = useState(false);
  // BASE_URL is /MUQABIL/ on GitHub Pages and / on local/Vercel deployments.
  const src = `${baseUrl.replace(/\/?$/, '/')}${lesson.htmlNotesPath}`;

  useEffect(() => {
    if (!expanded) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpanded(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [expanded]);

  return (
    <article
      aria-label={lesson.title}
      className={expanded
        ? 'fixed inset-0 z-[100] flex flex-col bg-white dark:bg-slate-900'
        : 'flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-700 p-4">
        <button onClick={onBack} className="font-semibold text-emerald-700 dark:text-emerald-400 cursor-pointer">
          ← All lessons
        </button>
        <h1 className="text-sm font-bold text-slate-900 dark:text-white">{lesson.title}</h1>
        <button
          onClick={() => setExpanded(value => !value)}
          aria-pressed={expanded}
          className="flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 cursor-pointer"
        >
          {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          {expanded ? 'Exit full screen' : 'Full screen'}
        </button>
      </div>
      {/* Scripts enable the original quizzes. No same-origin permission: the
          supplied document cannot access app data, cookies, or the parent DOM.
          The iframe stays mounted when expanded so answers/search are retained. */}
      <iframe
        src={src}
        title={`${lesson.title} — original interactive HTML notes`}
        sandbox="allow-scripts"
        className={expanded ? 'min-h-0 w-full flex-1 border-0 bg-white' : 'h-[80vh] min-h-[480px] w-full border-0 bg-white'}
      />
    </article>
  );
}
