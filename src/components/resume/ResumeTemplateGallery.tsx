import React, { useMemo, useState } from 'react';
import { Check, Search, Sparkles } from 'lucide-react';
import type { ResumeTemplateDefinition } from '../../data/resumeTemplates';
import { RESUME_TEMPLATE_CATEGORIES, RESUME_TEMPLATES } from '../../data/resumeTemplates';
import type { ResumeTemplateId } from '../../types/resume';

interface ResumeTemplateGalleryProps {
  selectedTemplate: ResumeTemplateId;
  onSelect: (template: ResumeTemplateDefinition) => void;
}

const MiniPreview: React.FC<{ template: ResumeTemplateDefinition }> = ({ template }) => {
  const color = template.previewLayout === 'sts-govt' ? '#334155' : '#e2e8f0';
  return (
    <div aria-hidden="true" className="h-[76px] overflow-hidden rounded-lg border border-slate-200 bg-white p-2">
      {template.previewLayout === 'executive' ? (
        <div className="flex h-full gap-1.5">
          <div className="w-1/3 rounded-sm p-1" style={{ backgroundColor: template.accentColor === 'amber' ? '#b45309' : undefined, background: template.accentColor === 'amber' ? '#b45309' : undefined, backgroundColor: undefined }}>
            <div className="mb-2 h-2 rounded-sm bg-white/80" />
            <div className="mb-1 h-1 rounded-sm bg-white/50" />
            <div className="h-1 w-2/3 rounded-sm bg-white/50" />
          </div>
          <div className="flex-1 pt-1">
            <div className="mb-2 h-2 w-3/4 rounded-sm" style={{ backgroundColor: '#cbd5e1' }} />
            <div className="mb-1 h-1 rounded-sm bg-slate-200" />
            <div className="mb-1 h-1 w-5/6 rounded-sm bg-slate-200" />
            <div className="mt-2 h-1 rounded-sm bg-slate-200" />
          </div>
        </div>
      ) : template.previewLayout === 'sts-govt' ? (
        <div>
          <div className="mx-auto mb-2 h-2 w-1/2 rounded-sm" style={{ backgroundColor: color }} />
          <div className="mb-1 h-1 rounded-sm bg-slate-200" />
          <div className="grid grid-cols-3 gap-1"><span className="h-3 rounded-sm bg-slate-100" /><span className="h-3 rounded-sm bg-slate-100" /><span className="h-3 rounded-sm bg-slate-100" /></div>
          <div className="mt-2 h-1 rounded-sm bg-slate-200" />
        </div>
      ) : (
        <div className={template.previewLayout === 'modern-ats' || template.previewLayout === 'tech-compact' ? 'grid grid-cols-[1fr_2fr] gap-2' : ''}>
          <div className="mb-2 h-2 w-2/3 rounded-sm" style={{ backgroundColor: color }} />
          <div className="mb-1 h-1 rounded-sm bg-slate-200" />
          <div className="mb-1 h-1 w-5/6 rounded-sm bg-slate-200" />
          <div className="mt-2 h-1 w-1/2 rounded-sm bg-slate-200" />
        </div>
      )}
      <div className="mt-1 h-[3px] w-full rounded-full" style={{ backgroundColor: template.accentColor === 'emerald' ? '#047857' : template.accentColor === 'rose' ? '#be123c' : template.accentColor === 'amber' ? '#b45309' : template.accentColor === 'teal' ? '#0f766e' : template.accentColor === 'violet' ? '#6d28d9' : template.accentColor === 'blue' ? '#2563eb' : template.accentColor === 'indigo' ? '#4338ca' : template.accentColor === 'burgundy' ? '#9f1239' : template.accentColor === 'slate' ? '#475569' : '#1e3a8a' }} />
    </div>
  );
};

export const ResumeTemplateGallery: React.FC<ResumeTemplateGalleryProps> = ({ selectedTemplate, onSelect }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const visibleTemplates = useMemo(() => {
    const term = search.trim().toLowerCase();
    return RESUME_TEMPLATES.filter((template) => {
      const categoryMatch = category === 'All' || template.category === category;
      const textMatch = !term || `${template.name} ${template.description} ${template.category}`.toLowerCase().includes(term);
      return categoryMatch && textMatch;
    });
  }, [search, category]);

  return (
    <section aria-label="Resume template gallery" className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="flex items-center gap-1.5 text-xs font-black text-slate-800 dark:text-slate-100">
            <Sparkles size={14} className="text-indigo-600" />
            {RESUME_TEMPLATES.length} professional templates
          </h4>
          <p className="mt-1 text-[10px] text-slate-500">Choose a design to update the live resume preview.</p>
        </div>
        <label className="relative block sm:w-64">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search templates"
            aria-label="Search resume templates"
            className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-8 pr-3 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </label>
      </div>
      <div className="flex gap-1.5 overflow-x-auto pb-1" role="group" aria-label="Filter templates by category">
        {['All', ...RESUME_TEMPLATE_CATEGORIES].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
            className={`whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] font-bold transition-colors ${category === item ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'}`}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="text-[10px] font-semibold text-slate-500" aria-live="polite">Showing {visibleTemplates.length} of {RESUME_TEMPLATES.length} templates</p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {visibleTemplates.map((template) => {
          const isSelected = selectedTemplate === template.id;
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelect(template)}
              aria-pressed={isSelected}
              aria-label={`Use ${template.name} resume template`}
              className={`rounded-xl border p-2.5 text-left transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isSelected ? 'border-indigo-500 bg-indigo-50/70 ring-2 ring-indigo-500/20 dark:bg-indigo-950/30' : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900'}`}
            >
              <MiniPreview template={template} />
              <div className="mt-2 flex items-start justify-between gap-2">
                <span className="text-[11px] font-extrabold leading-snug text-slate-900 dark:text-white">{template.name}</span>
                {isSelected && <Check size={14} className="shrink-0 text-indigo-600" />}
              </div>
              <p className="mt-1 line-clamp-2 min-h-[28px] text-[9.5px] leading-snug text-slate-500 dark:text-slate-400">{template.description}</p>
              <div className="mt-2 flex flex-wrap items-center gap-1">
                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{template.category}</span>
                {template.atsFriendly && <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">ATS-friendly</span>}
              </div>
            </button>
          );
        })}
      </div>
      {visibleTemplates.length === 0 && <p className="rounded-xl border border-dashed border-slate-300 p-5 text-center text-xs text-slate-500">No templates match that search. Try another name or category.</p>}
    </section>
  );
};
