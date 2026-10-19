import React, { useEffect, useState } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

interface HtmlTopicNoteViewerProps {
  title: string;
  htmlNotesPath: string;
  baseUrl?: string;
}

/**
 * Renders a supplied standalone HTML note inside the Master Notes Hub.
 *
 * The document stays in its own sandboxed frame so its original layout,
 * styles, search, MCQ feedback, and CRQ/ERQ tabs keep working exactly as
 * authored. Scripts are enabled; same-origin access is deliberately withheld.
 */
export function HtmlTopicNoteViewer({
  title,
  htmlNotesPath,
  baseUrl = import.meta.env?.BASE_URL ?? '/',
}: HtmlTopicNoteViewerProps) {
  const [expanded, setExpanded] = useState(false);
  // BASE_URL is /MUQABIL/ on GitHub Pages and / on local/Vercel deployments.
  const src = `${baseUrl.replace(/\/?$/, '/')}${htmlNotesPath}`;

  useEffect(() => {
    setExpanded(false);
  }, [htmlNotesPath]);

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
    <section
      aria-label={`${title} original interactive note`}
      className={
        expanded
          ? 'fixed inset-0 z-[100] flex flex-col bg-white dark:bg-slate-900'
          : 'overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs dark:border-slate-700 dark:bg-slate-900'
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-3 dark:border-slate-700">
        <div className="min-w-0">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Original interactive note · search &amp; practice quiz
          </p>
          <h3 className="truncate text-sm font-extrabold text-slate-900 dark:text-white">{title}</h3>
        </div>
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-pressed={expanded}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-700 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-800"
        >
          {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          {expanded ? 'Exit full screen' : 'Full screen'}
        </button>
      </div>

      {/* Keep the iframe mounted while expanding so quiz answers and search survive. */}
      <iframe
        src={src}
        title={`${title} — original interactive HTML notes`}
        sandbox="allow-scripts"
        className={
          expanded
            ? 'min-h-0 w-full flex-1 border-0 bg-white'
            : 'h-[75vh] min-h-[520px] w-full border-0 bg-white'
        }
      />
    </section>
  );
}
