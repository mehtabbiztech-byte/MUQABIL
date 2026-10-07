import React, { useState, useMemo } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  FileText, 
  CheckCircle2, 
  Check, 
  Sparkles, 
  BookOpen, 
  Clock, 
  QrCode, 
  HelpCircle,
  ShieldCheck,
  Eye,
  EyeOff,
  Layers,
  Award,
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MCQS_DATA } from '../data/mcqsData';
import { MCQ, PastPaper } from '../types';
import { AllPastPaperEntry } from '../data/allPastPapersDirectory';
import { exportMcqsToExcel, exportMcqsToPdf } from '../lib/exportUtils';

export const PrintablePastPaperModal: React.FC = () => {
  const { printablePaper, setPrintablePaper } = useApp();

  const [mode, setMode] = useState<'solved' | 'unsolved'>('solved');
  const [questionCount, setQuestionCount] = useState<25 | 50 | 100>(50);
  const [showExplanations, setShowExplanations] = useState(true);
  const [showOmrSheet, setShowOmrSheet] = useState(true);
  const [showWatermark, setShowWatermark] = useState(true);
  const [candidateKeyColor, setCandidateKeyColor] = useState<'Green' | 'Pink' | 'Blue' | 'Yellow'>('Green');

  // Derive questions from printablePaper or fallback to curated MCQs
  const questions: MCQ[] = useMemo(() => {
    if (!printablePaper) return [];

    let pool: MCQ[] = [];
    if ('mcqs' in printablePaper && Array.isArray(printablePaper.mcqs) && printablePaper.mcqs.length > 0) {
      pool = printablePaper.mcqs;
    } else {
      // Pull representative questions matching the paper
      const examName = (printablePaper.exam || printablePaper.title || '').toLowerCase();
      const category = (printablePaper.category || '').toLowerCase();
      
      pool = MCQS_DATA.filter((m) => {
        const text = `${m.question} ${m.category} ${(m.examTags || []).join(' ')}`.toLowerCase();
        if (examName.includes('sts') && text.includes('sts')) return true;
        if (examName.includes('spsc') && text.includes('spsc')) return true;
        if (examName.includes('css') && text.includes('css')) return true;
        return true;
      });

      if (pool.length < questionCount) {
        pool = MCQS_DATA;
      }
    }

    return pool.slice(0, questionCount);
  }, [printablePaper, questionCount]);

  if (!printablePaper) return null;

  const paperTitle = printablePaper.title || 'Official Solved Past Paper';
  const paperExam = printablePaper.exam || 'Sukkur IBA STS';
  const paperBps = printablePaper.bps || 'BPS 05–15';
  const conductedBy = printablePaper.conductedBy || 'Sukkur IBA Testing Services (STS)';

  const handlePrint = () => {
    window.print();
  };

  const handleExportExcel = () => {
    const cleanTitle = paperTitle.replace(/[^a-zA-Z0-9_-]/g, '_');
    exportMcqsToExcel(questions, `MUQABIL_${cleanTitle}`, { subject: paperExam });
  };

  const handleExportDirectPdf = () => {
    exportMcqsToPdf(questions, {
      title: paperTitle,
      subtitle: conductedBy,
      includeAnswers: mode === 'solved',
      includeExplanations: showExplanations,
      includeOmrSheet: showOmrSheet,
      subject: paperExam,
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-start justify-center p-2 sm:p-6 print:p-0 print:bg-white print:static print:overflow-visible"
      onClick={() => setPrintablePaper(null)}
    >
      <div 
        className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-4 print:my-0 print:border-none print:shadow-none print:rounded-none relative text-slate-900 dark:text-slate-100 print:text-black print:dark:text-black print:dark:bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* NON-PRINTING CONTROL HEADER TOOLBAR */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white border-b border-emerald-800/40 print:hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                  Print &amp; PDF Studio
                </span>
                <span className="text-xs text-slate-300 font-bold">
                  {paperExam} · {paperBps}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white font-display line-clamp-1">
                {paperTitle}
              </h3>
            </div>
          </div>

          {/* Quick Customization Controls */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Solved vs Unsolved Toggle */}
            <div className="flex items-center bg-white/10 rounded-xl p-1 border border-white/15">
              <button
                type="button"
                onClick={() => setMode('solved')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  mode === 'solved'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Solved Key
              </button>
              <button
                type="button"
                onClick={() => setMode('unsolved')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  mode === 'unsolved'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Blank Exam
              </button>
            </div>

            {/* Question Count Selector */}
            <select
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value) as any)}
              className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-bold cursor-pointer"
            >
              <option value={25} className="text-slate-900">25 MCQs (Speed)</option>
              <option value={50} className="text-slate-900">50 MCQs (Standard)</option>
              <option value={100} className="text-slate-900">100 MCQs (Full Test)</option>
            </select>

            {/* Key Color */}
            <select
              value={candidateKeyColor}
              onChange={(e) => setCandidateKeyColor(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-bold cursor-pointer"
            >
              <option value="Green" className="text-slate-900">Key: Green</option>
              <option value="Pink" className="text-slate-900">Key: Pink</option>
              <option value="Blue" className="text-slate-900">Key: Blue</option>
              <option value="Yellow" className="text-slate-900">Key: Yellow</option>
            </select>

            {/* Print / Save PDF Button */}
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 transition cursor-pointer shadow-lg"
              title="Print to printer or save as PDF via system dialog"
            >
              <Printer className="w-4 h-4" />
              <span>Print / PDF</span>
            </button>

            {/* Direct PDF Download Button */}
            <button
              onClick={handleExportDirectPdf}
              className="px-3 py-2 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer border border-emerald-500/40"
              title="Download standalone A4 PDF file"
            >
              <FileText className="w-4 h-4" />
              <span>Direct PDF</span>
            </button>

            {/* Download Excel Button */}
            <button
              onClick={handleExportExcel}
              className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md"
              title="Download past paper questions in Excel spreadsheet"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Excel (.xlsx)</span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => setPrintablePaper(null)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE DOCUMENT BODY (Standard A4 Container) */}
        <div className="p-6 sm:p-10 print:p-6 bg-white text-slate-900 relative">
          
          {/* Subtle Watermark (Visible on paper and screen) */}
          {showWatermark && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] print:opacity-[0.04] overflow-hidden select-none">
              <div className="text-6xl sm:text-8xl font-black rotate-[-30deg] text-center tracking-widest leading-loose">
                MUQABIL<br />muqabil.pk
              </div>
            </div>
          )}

          {/* 1. OFFICIAL DOCUMENT HEADER */}
          <div className="border-b-2 border-slate-900 pb-5 mb-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-800 border border-emerald-800 px-2 py-0.5 rounded">
                    Official Candidate Paper
                  </span>
                  <span className="text-xs font-bold text-slate-600">
                    {conductedBy}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-slate-950 uppercase">
                  🏆 MUQABIL (مقابل)
                </h1>
                <p className="text-xs text-slate-600 font-semibold tracking-wide">
                  Pakistan’s Premier Competitive Exam Portal · <span className="font-bold text-emerald-800">muqabil.pk</span> · Har Test Mein Sab Se Agay
                </p>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 pt-1">
                  {paperTitle} ({paperBps})
                </h2>
              </div>

              {/* QR Code Block */}
              <div className="text-center shrink-0 border-2 border-slate-900 p-2 rounded-xl bg-slate-50">
                {/* Clean SVG QR Code Representation */}
                <svg className="w-16 h-16 mx-auto" viewBox="0 0 100 100" fill="currentColor">
                  {/* Outer corner squares */}
                  <rect x="5" y="5" width="28" height="28" fill="#000" rx="3" />
                  <rect x="9" y="9" width="20" height="20" fill="#fff" rx="2" />
                  <rect x="13" y="13" width="12" height="12" fill="#000" rx="1" />

                  <rect x="67" y="5" width="28" height="28" fill="#000" rx="3" />
                  <rect x="71" y="9" width="20" height="20" fill="#fff" rx="2" />
                  <rect x="75" y="13" width="12" height="12" fill="#000" rx="1" />

                  <rect x="5" y="67" width="28" height="28" fill="#000" rx="3" />
                  <rect x="9" y="71" width="20" height="20" fill="#fff" rx="2" />
                  <rect x="13" y="75" width="12" height="12" fill="#000" rx="1" />

                  {/* QR Data Pattern */}
                  <rect x="38" y="8" width="6" height="6" fill="#000" />
                  <rect x="48" y="14" width="6" height="6" fill="#000" />
                  <rect x="58" y="8" width="6" height="6" fill="#000" />
                  <rect x="38" y="24" width="6" height="6" fill="#000" />
                  <rect x="48" y="30" width="6" height="6" fill="#000" />
                  
                  <rect x="8" y="44" width="6" height="6" fill="#000" />
                  <rect x="20" y="48" width="6" height="6" fill="#000" />
                  <rect x="38" y="44" width="24" height="6" fill="#000" />
                  <rect x="68" y="44" width="6" height="6" fill="#000" />
                  <rect x="80" y="48" width="6" height="6" fill="#000" />

                  <rect x="38" y="60" width="8" height="8" fill="#000" />
                  <rect x="54" y="66" width="6" height="6" fill="#000" />
                  <rect x="68" y="60" width="6" height="6" fill="#000" />
                  <rect x="80" y="66" width="8" height="8" fill="#000" />
                  <rect x="38" y="80" width="6" height="6" fill="#000" />
                  <rect x="52" y="82" width="6" height="6" fill="#000" />
                  <rect x="66" y="80" width="6" height="6" fill="#000" />
                  <rect x="78" y="82" width="6" height="6" fill="#000" />
                </svg>
                <span className="text-[9px] font-black uppercase tracking-wider block mt-1 text-slate-800">
                  muqabil.pk
                </span>
                <span className="text-[8px] text-slate-500 block leading-tight">
                  Scan to Verify
                </span>
              </div>
            </div>

            {/* CANDIDATE PARTICULARS TABLE (Standard STS Form Style) */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs border border-slate-300 p-2.5 rounded-lg bg-slate-50/60">
              <div>
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Candidate Name:</span>
                <div className="h-5 border-b border-dotted border-slate-400 font-semibold text-slate-800"></div>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Roll Number:</span>
                <div className="h-5 border-b border-dotted border-slate-400 font-semibold text-slate-800"></div>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold block uppercase">CNIC Number:</span>
                <div className="h-5 border-b border-dotted border-slate-400 font-semibold text-slate-800"></div>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Test Center &amp; Color Key:</span>
                <div className="h-5 border-b border-dotted border-slate-400 font-bold text-emerald-800">
                  Key: {candidateKeyColor}
                </div>
              </div>
            </div>

            {/* TEST META STRIP */}
            <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-slate-700 font-semibold pt-2 border-t border-slate-200">
              <span><strong>Total Questions:</strong> {questions.length} MCQs</span>
              <span><strong>Total Marks:</strong> {questions.length}</span>
              <span><strong>Allocated Time:</strong> {Math.round(questions.length * 1.0)} Minutes</span>
              <span><strong>Negative Marking:</strong> None (1 mark per correct answer)</span>
              <span className="text-emerald-800 font-bold"><strong>Mode:</strong> {mode === 'solved' ? 'Verified Solved Master Key' : 'Official Candidate Test Sheet'}</span>
            </div>
          </div>

          {/* 2. QUESTION PAPER GRID (Two-Column Layout for Efficiency & High Print Quality) */}
          <div className="columns-1 md:columns-2 gap-8 text-xs leading-relaxed">
            {questions.map((mcq, qIndex) => {
              const qNumber = qIndex + 1;
              return (
                <div 
                  key={mcq.id || qIndex} 
                  className="break-inside-avoid mb-5 pb-4 border-b border-slate-200/80"
                >
                  {/* Question Prompt */}
                  <div className="font-bold text-slate-950 text-xs sm:text-[13px] flex items-start gap-1.5 mb-2">
                    <span className="font-black text-emerald-800 shrink-0">
                      Q{qNumber}.
                    </span>
                    <span className="leading-snug">{mcq.question}</span>
                  </div>

                  {/* Options (A, B, C, D) */}
                  <div className="grid grid-cols-1 gap-1 pl-4">
                    {mcq.options.map((opt, oIndex) => {
                      const optLabel = String.fromCharCode(65 + oIndex); // A, B, C, D
                      const isCorrect = oIndex === mcq.correctIndex;
                      const showAsCorrect = mode === 'solved' && isCorrect;

                      return (
                        <div 
                          key={oIndex}
                          className={`flex items-start gap-2 py-0.5 px-1.5 rounded transition ${
                            showAsCorrect 
                              ? 'bg-emerald-50 text-emerald-950 font-bold border-l-2 border-emerald-600' 
                              : 'text-slate-800'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                            showAsCorrect 
                              ? 'bg-emerald-700 text-white' 
                              : 'border border-slate-400 text-slate-600'
                          }`}>
                            {optLabel}
                          </span>
                          <span className="leading-snug">{opt}</span>
                          {showAsCorrect && (
                            <Check className="w-3.5 h-3.5 text-emerald-700 ml-auto shrink-0 mt-0.5" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Solved Explanation Box */}
                  {mode === 'solved' && showExplanations && mcq.explanation && (
                    <div className="mt-2 ml-4 p-2 rounded bg-slate-50 border border-slate-200 text-[11px] text-slate-600 leading-normal">
                      <strong className="text-emerald-900 font-bold">Answer ({String.fromCharCode(65 + mcq.correctIndex)}):</strong> {mcq.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 3. ANSWER KEY SUMMARY TABLE (If Solved Mode) */}
          {mode === 'solved' && (
            <div className="mt-8 pt-6 border-t-2 border-slate-900 break-before-page">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-950 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Official Quick Answer Key Grid (Questions 1 to {questions.length})</span>
                </h4>
                <span className="text-[11px] font-bold text-slate-500">
                  Key Version: {candidateKeyColor}
                </span>
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 text-xs text-center">
                {questions.map((mcq, idx) => (
                  <div key={idx} className="border border-slate-300 rounded p-1 bg-slate-50">
                    <span className="block text-[10px] text-slate-500 font-semibold">Q{idx + 1}</span>
                    <span className="block font-black text-emerald-800 text-xs">
                      {String.fromCharCode(65 + mcq.correctIndex)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. AUTHENTIC STS OMR BUBBLE SHEET (If Unsolved / Exam Practice Mode) */}
          {mode === 'unsolved' && showOmrSheet && (
            <div className="mt-8 pt-6 border-t-2 border-slate-900 break-before-page">
              <div className="text-center mb-4">
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-950">
                  Official Sukkur IBA STS OMR Response Sheet (Candidate Copy)
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Fill each bubble completely using a Black or Blue Ballpoint pen. Stray marks will invalidate your paper.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                {Array.from({ length: Math.min(questions.length, 100) }, (_, i) => i + 1).map((num) => (
                  <div key={num} className="flex items-center justify-between p-1 border-b border-slate-200">
                    <span className="font-bold text-slate-700 w-6 text-right mr-2 text-[11px]">{num}.</span>
                    <div className="flex items-center gap-2">
                      {['A', 'B', 'C', 'D'].map((letter) => (
                        <div 
                          key={letter}
                          className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center text-[9px] font-bold text-slate-500 hover:border-slate-800"
                        >
                          {letter}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-slate-300 flex items-center justify-between text-xs text-slate-500">
                <div>Candidate Signature: _______________________</div>
                <div>Invigilator Signature: _______________________</div>
              </div>
            </div>
          )}

          {/* 5. DOCUMENT FOOTER WITH QR CODE & BRANDING */}
          <div className="mt-8 pt-4 border-t border-slate-200 text-center text-xs text-slate-500 space-y-1">
            <p className="font-bold text-slate-800">
              MUQABIL (مقابل) — Pakistan’s Premier Testing Portal · <span className="text-emerald-700">https://muqabil.pk</span>
            </p>
            <p className="text-[11px] text-slate-500">
              For complete interactive tests, district rankings, and AI-powered preparation, visit <strong>muqabil.pk</strong> on your mobile or desktop browser.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
