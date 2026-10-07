import React, { useState } from 'react';
import { 
  X, 
  FileDown, 
  FileSpreadsheet, 
  FileText, 
  Check, 
  Sparkles, 
  CheckCircle2, 
  Settings2, 
  BookOpen,
  Printer
} from 'lucide-react';
import { MCQ } from '../types';
import { exportMcqsToExcel, exportMcqsToPdf } from '../lib/exportUtils';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  mcqs: MCQ[];
  subjectTitle?: string;
  defaultCandidateName?: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  mcqs,
  subjectTitle = 'Competitive Exam MCQs',
  defaultCandidateName = '',
}) => {
  const [format, setFormat] = useState<'pdf' | 'excel'>('pdf');
  const [pdfMode, setPdfMode] = useState<'solved' | 'unsolved'>('solved');
  const [includeExplanations, setIncludeExplanations] = useState(true);
  const [includeOmr, setIncludeOmr] = useState(true);
  const [candidateName, setCandidateName] = useState(defaultCandidateName);
  const [rollNumber, setRollNumber] = useState('');
  const [limitCount, setLimitCount] = useState<number | 'all'>('all');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  if (!isOpen) return null;

  const targetMcqs = limitCount === 'all' ? mcqs : mcqs.slice(0, limitCount);

  const handleDownload = () => {
    setIsExporting(true);
    setExportSuccess(false);

    try {
      if (format === 'excel') {
        const cleanTitle = (subjectTitle || 'MUQABIL_MCQs').replace(/[^a-zA-Z0-9_-]/g, '_');
        exportMcqsToExcel(targetMcqs, `MUQABIL_${cleanTitle}`, { subject: subjectTitle });
        setExportSuccess(true);
        setTimeout(() => {
          setIsExporting(false);
          onClose();
        }, 1200);
      } else {
        exportMcqsToPdf(targetMcqs, {
          title: `${subjectTitle} — Practice Paper`,
          subtitle: "Sukkur IBA STS BPS 05–15, SPSC CCE, FPSC & Provincial Screening",
          candidateName: candidateName.trim() || undefined,
          rollNumber: rollNumber.trim() || undefined,
          includeAnswers: pdfMode === 'solved',
          includeExplanations: pdfMode === 'solved' && includeExplanations,
          includeOmrSheet: includeOmr,
          subject: subjectTitle,
        });
        setExportSuccess(true);
        setTimeout(() => {
          setIsExporting(false);
          onClose();
        }, 1200);
      }
    } catch (err) {
      console.error('Export error:', err);
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <FileDown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-display">
                Download &amp; Export
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {subjectTitle} • {targetMcqs.length.toLocaleString()} Questions
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          {/* Format Selection Tab */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
              Choose Export Format
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormat('pdf')}
                className={`p-4 rounded-2xl border text-left transition flex items-start gap-3 cursor-pointer ${
                  format === 'pdf'
                    ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${format === 'pdf' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}>
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>PDF Document</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-600 text-white">Print</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    Printable Question Paper with candidate box, answer key &amp; OMR sheet
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormat('excel')}
                className={`p-4 rounded-2xl border text-left transition flex items-start gap-3 cursor-pointer ${
                  format === 'excel'
                    ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${format === 'excel' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}>
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>Excel (.xlsx)</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-blue-600 text-white">Data</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    Structured spreadsheet table for Excel, Google Sheets, or flashcards
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Question Limit Selection */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
              Number of Questions to Include
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: '25 Speed', val: 25 },
                { label: '50 Standard', val: 50 },
                { label: '100 Full', val: 100 },
                { label: `All (${mcqs.length})`, val: 'all' },
              ].map((opt) => (
                <button
                  key={String(opt.val)}
                  type="button"
                  onClick={() => setLimitCount(opt.val as any)}
                  className={`py-2 px-1 text-xs font-bold rounded-xl border transition cursor-pointer text-center ${
                    limitCount === opt.val
                      ? 'border-emerald-600 bg-emerald-600 text-white shadow-2xs'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* PDF Specific Options */}
          {format === 'pdf' && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 space-y-3.5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Paper Mode:
                </span>
                <div className="flex items-center bg-white dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => setPdfMode('solved')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      pdfMode === 'solved'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Solved with Answer Key
                  </button>
                  <button
                    type="button"
                    onClick={() => setPdfMode('unsolved')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      pdfMode === 'unsolved'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Blank Mock Test
                  </button>
                </div>
              </div>

              {pdfMode === 'solved' && (
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={includeExplanations}
                    onChange={(e) => setIncludeExplanations(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span>Include study notes &amp; explanations under questions</span>
                </label>
              )}

              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={includeOmr}
                  onChange={(e) => setIncludeOmr(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Include Candidate OMR Bubble Sheet at end</span>
              </label>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200 dark:border-slate-700">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">
                    Candidate Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="e.g. Mehtab Ali"
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">
                    Roll / Seat No (Optional)
                  </label>
                  <input
                    type="text"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    placeholder="e.g. STS-84920"
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Excel Specific Summary */}
          {format === 'excel' && (
            <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200 space-y-1.5 animate-in fade-in duration-150">
              <div className="font-bold flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                <span>What's inside your Excel Workbook:</span>
              </div>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-blue-800 dark:text-blue-300">
                <li>Complete columns: Q#, Question Text, Options A–D, Correct Key, Full Explanation</li>
                <li>Subject, Subtopic, Commission (FPSC/SPSC/STS), and Provenance source</li>
                <li>Overview tab with export timestamp and total count metadata</li>
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isExporting}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleDownload}
              disabled={isExporting || targetMcqs.length === 0}
              className={`px-5 py-2.5 rounded-xl text-white text-xs font-bold flex items-center gap-2 transition shadow-md cursor-pointer ${
                exportSuccess
                  ? 'bg-emerald-700'
                  : format === 'pdf'
                  ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20'
                  : 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/20'
              }`}
            >
              {exportSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Downloaded Successfully!</span>
                </>
              ) : isExporting ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Generating {format.toUpperCase()}...</span>
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4" />
                  <span>Download {format.toUpperCase()}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
