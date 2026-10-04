import React, { useState } from 'react';
import { 
  GraduationCap, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Calculator, 
  HelpCircle, 
  Play, 
  Download, 
  Printer, 
  ArrowRight, 
  Layers, 
  Award, 
  Compass, 
  Check, 
  Zap,
  Clock,
  Briefcase,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { STS_CATEGORIES } from '../data/stsPatternData';

export const StsCategoryTierHub: React.FC = () => {
  const { 
    selectedStsTier, 
    setSelectedStsTier, 
    setTab, 
    launchSimulator,
    openPrintablePaper,
    setAgeCalculatorOpen
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'papers' | 'guidelines'>('overview');

  const tierDetails = {
    graduation: {
      name: 'Graduation Category',
      bps: 'BPS 11 to 15',
      minEducation: '14 / 16 Years Bachelor’s Degree (BA, BSc, B.Com, BS, BE, BBA)',
      targetPosts: 'Assistants, Statistical Officers, Accounts Officers, Planning Officers, Municipal Officers',
      color: 'emerald',
      passingCutoff: '50% (50 Marks)',
      quotaCutoff: '40% (40 Marks for Women, Differently-Abled & Minorities)',
      syllabus: [
        {
          subject: 'Part 1: English Language',
          weight: '40%',
          marks: '40 Marks',
          topics: [
            'Reading Comprehension (Two Passages — 10 MCQs)',
            'Synonyms & Antonyms (Advanced Contextual — 10 MCQs)',
            'Spellings & Word Formation (5 MCQs)',
            'Error Detection & Subject-Verb Agreement (5 MCQs)',
            'Prepositions & Phrasal Verbs (5 MCQs)',
            'Sentence Structure & Conjunctions (5 MCQs)'
          ]
        },
        {
          subject: 'Part 2: Mathematics & Basic Arithmetic',
          weight: '20%',
          marks: '20 Marks',
          topics: [
            'Percentages, Profit & Loss, Simple & Compound Interest',
            'Ratio, Proportion & Unitary Method',
            'Word Problems & Algebraic Equations',
            'Age Problems, Time, Speed & Distance',
            'Averages, Sequences, Series & Basic Geometry'
          ]
        },
        {
          subject: 'Part 3: General Knowledge',
          weight: '40%',
          marks: '40 Marks',
          topics: [
            'Pakistan Affairs & Constitution (10 MCQs)',
            'Current Affairs & Global Summits (10 MCQs)',
            'Everyday Science & Biology/Physics (10 MCQs)',
            'Computer Science & MS Office/IT (10 MCQs)'
          ]
        }
      ],
      samplePaperTitle: 'STS BPS 11–15 Graduation Category — Official Solved Paper'
    },
    intermediate: {
      name: 'Intermediate Category',
      bps: 'BPS 05 to 12',
      minEducation: '12 Years Intermediate (FA, FSc, I.Com, ICS, D.Com)',
      targetPosts: 'Junior Clerks, Data Entry Operators, Field Assistants, Accounts Clerks, Sub-Inspectors',
      color: 'sky',
      passingCutoff: '50% (50 Marks)',
      quotaCutoff: '40% (40 Marks for Women, Differently-Abled & Minorities)',
      syllabus: [
        {
          subject: 'Part 1: English Language',
          weight: '40%',
          marks: '40 Marks',
          topics: [
            'Reading Comprehension (Simple Passage — 5 MCQs)',
            'Synonyms & Antonyms (Standard Vocabulary — 10 MCQs)',
            'Spellings Identification (5 MCQs)',
            'Prepositions & Articles (10 MCQs)',
            'Active & Passive Voice, Direct & Indirect (5 MCQs)',
            'Sentence Completion & Tenses (5 MCQs)'
          ]
        },
        {
          subject: 'Part 2: Mathematics',
          weight: '20%',
          marks: '20 Marks',
          topics: [
            'Fractions, Decimals & Basic BODMAS',
            'Percentages & Ratios in Practical Problems',
            'Simple Linear Equations & Algebraic Expressions',
            'Area, Perimeter & Simple Mensuration',
            'Averages & Unitary Calculations'
          ]
        },
        {
          subject: 'Part 3: General Knowledge',
          weight: '40%',
          marks: '40 Marks',
          topics: [
            'Pakistan Geography & Historical Milestones (10 MCQs)',
            'Current Affairs 2025–2026 & Important Leaders (10 MCQs)',
            'Everyday Science & Human Health/Vitamins (10 MCQs)',
            'Computer Fundamentals & Keyboard Shortcuts (10 MCQs)'
          ]
        }
      ],
      samplePaperTitle: 'STS BPS 05–12 Intermediate Category — Official Solved Paper'
    },
    matric: {
      name: 'Matriculation Category',
      bps: 'BPS 05 to 10',
      minEducation: '10 Years Matriculation (SSC Science / General / Arts)',
      targetPosts: 'Laboratory Attendants, Dispatch Riders, Record Keepers, Field Staff, Naib Qasid',
      color: 'amber',
      passingCutoff: '50% (50 Marks)',
      quotaCutoff: '40% (40 Marks for Women, Differently-Abled & Minorities)',
      syllabus: [
        {
          subject: 'Part 1: English Language',
          weight: '40%',
          marks: '40 Marks',
          topics: [
            'Spelling Correction & Word Meanings (10 MCQs)',
            'Basic Synonyms & Antonyms (10 MCQs)',
            'Use of Prepositions (in, on, at, by, for) (10 MCQs)',
            'Plurals, Genders & Parts of Speech (5 MCQs)',
            'Simple Sentence Completion (5 MCQs)'
          ]
        },
        {
          subject: 'Part 2: Basic Arithmetic',
          weight: '20%',
          marks: '20 Marks',
          topics: [
            'Basic Addition, Subtraction, Multiplication, Division',
            'BODMAS Rule & Order of Operations',
            'Fractions, Decimals & Simple Percentages',
            'Unitary Method (Cost of 1 item vs Many)',
            'Simple Averages & Word Arithmetic'
          ]
        },
        {
          subject: 'Part 3: General Knowledge',
          weight: '40%',
          marks: '40 Marks',
          topics: [
            'Pakistan National Symbols, Provinces & Rivers (10 MCQs)',
            'Islamic Studies Basics & Ghazwat (10 MCQs)',
            'Basic Everyday Science & Solar System (10 MCQs)',
            'Basic Computer & General Awareness (10 MCQs)'
          ]
        }
      ],
      samplePaperTitle: 'STS BPS 05–10 Matriculation Category — Official Solved Paper'
    }
  };

  const currentTierKey = selectedStsTier === 'all' ? 'graduation' : selectedStsTier;
  const currentTier = tierDetails[currentTierKey];

  const handleLaunchTierMock = (tierKey: 'graduation' | 'intermediate' | 'matric') => {
    const t = tierDetails[tierKey];
    launchSimulator({
      simulatorId: 'sts',
      title: `Sukkur IBA STS Screening — ${t.name} (100 MCQs)`,
      category: tierKey === 'graduation' 
        ? 'Graduation (BPS 11–15)' 
        : tierKey === 'intermediate' 
        ? 'Intermediate (BPS 05–10)' 
        : 'Matric (BPS 05)',
      durationMinutes: 100,
      questionCount: 100,
      negativeMarking: false
    });
  };

  const handleOpenPrintTier = (tierKey: 'graduation' | 'intermediate' | 'matric') => {
    const t = tierDetails[tierKey];
    openPrintablePaper({
      id: `sts-${tierKey}-official-master`,
      title: `Sukkur IBA STS BPS 05–15 Screening (${t.name})`,
      exam: 'STS IBA',
      bps: t.bps,
      category: t.name,
      conductedBy: 'Sukkur IBA Testing Services (STS)',
      totalQuestions: 100,
      durationMinutes: 100,
      syllabus: `${t.syllabus.map(s => `${s.subject} (${s.weight})`).join(' | ')}`
    });
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl overflow-hidden transition-all">
      
      {/* 1. TOP HEADER & TIER BUTTON STRIP */}
      <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white relative overflow-hidden">
        
        {/* Ambient background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>STS BPS 05–15 Educational Tier Separation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-white">
                Select Your Educational Tier
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-2xl">
                Sukkur IBA separates test difficulty and syllabus strictly by qualification. Select your category to unlock customized mock tests, syllabus weightages, and solved papers.
              </p>
            </div>

            {/* Quick Utility Launch Button */}
            <div className="shrink-0 flex items-center gap-2">
              <button
                onClick={() => setAgeCalculatorOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold flex items-center gap-2 transition cursor-pointer backdrop-blur-md shadow-lg"
              >
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Age Eligibility Calculator</span>
              </button>
            </div>
          </div>

          {/* 1-CLICK TIER SELECTOR PILLS */}
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {[
              {
                id: 'all',
                label: 'All Categories',
                sub: 'Comprehensive View',
                icon: Layers,
                color: 'emerald'
              },
              {
                id: 'graduation',
                label: 'Graduation Category',
                sub: 'BPS 11–15 · 14-16 Yrs',
                icon: GraduationCap,
                color: 'emerald'
              },
              {
                id: 'intermediate',
                label: 'Intermediate Category',
                sub: 'BPS 05–12 · 12 Yrs',
                icon: BookOpen,
                color: 'sky'
              },
              {
                id: 'matric',
                label: 'Matriculation Category',
                sub: 'BPS 05–10 · 10 Yrs',
                icon: Award,
                color: 'amber'
              }
            ].map((tier) => {
              const isSelected = selectedStsTier === tier.id;
              const Icon = tier.icon;
              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedStsTier(tier.id as any)}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white border-emerald-400 shadow-xl shadow-emerald-950/40 ring-2 ring-emerald-400/50 -translate-y-0.5'
                      : 'bg-white/10 hover:bg-white/15 text-slate-200 border-white/10 backdrop-blur-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/20 text-white' : 'bg-white/5 text-emerald-400'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-emerald-900">
                        <Check className="w-3 h-3" />
                        Active
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold leading-tight">{tier.label}</h3>
                    <p className={`text-xs mt-0.5 ${isSelected ? 'text-emerald-100 font-medium' : 'text-slate-400'}`}>{tier.sub}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC TIER CONTENT SHOWCASE */}
      <div className="p-6 sm:p-8 space-y-6">
        
        {/* Tier Meta Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/40 dark:from-slate-800/60 dark:to-emerald-950/20 border border-slate-200 dark:border-slate-700/80 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-600 text-white">
                {currentTier.bps}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                Passing Cutoff: {currentTier.passingCutoff}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300">
                Reserved Quota: {currentTier.quotaCutoff}
              </span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {currentTier.name} — Full Preparation Suite
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <strong className="text-slate-800 dark:text-slate-100">Eligibility:</strong> {currentTier.minEducation}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <strong className="text-slate-800 dark:text-slate-100">Target Posts:</strong> {currentTier.targetPosts}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => handleLaunchTierMock(currentTierKey as any)}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 transition cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Take {currentTier.name.split(' ')[0]} Mock Exam</span>
            </button>

            <button
              onClick={() => handleOpenPrintTier(currentTierKey as any)}
              className="w-full sm:w-auto px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
              title="Generate Clean Solved Paper PDF for Printing"
            >
              <Printer className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Export Printable Paper (PDF)</span>
            </button>
          </div>
        </div>

        {/* 3. SYLLABUS BREAKDOWN (40% - 20% - 40%) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Official 100-Mark STS Syllabus Matrix ({currentTier.name})</span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Exact testing blueprint administered by Sukkur IBA across Sindh testing centers.
              </p>
            </div>
            
            <button
              onClick={() => {
                setTab('mcqs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Practice MCQs</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentTier.syllabus.map((sec, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/60">
                      {sec.marks} ({sec.weight})
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">Section {idx + 1}</span>
                  </div>
                  <h5 className="font-extrabold text-slate-900 dark:text-white text-base mb-3 leading-snug">
                    {sec.subject}
                  </h5>
                  <ul className="space-y-2">
                    {sec.topics.map((top, tIdx) => (
                      <li key={tIdx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{top}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">Difficulty Level:</span>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    {currentTierKey === 'matric' ? 'Basic to Standard' : currentTierKey === 'intermediate' ? 'Standard to Intermediate' : 'Advanced & Analytical'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. TIER-SPECIFIC SOLVED PAST PAPERS & RECENT RECORDS */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Verified Solved Past Papers for {currentTier.name}</span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official test keys and carbon-copy verified papers from Sukkur IBA STS 2023, 2024, and 2025 screening rounds.
              </p>
            </div>

            <button
              onClick={() => {
                setTab('past-papers');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 transition cursor-pointer shrink-0"
            >
              Browse All Past Papers Archive &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                title: `${currentTier.name} — Morning Paper`,
                year: '2024',
                color: 'Green Key',
                questions: 100
              },
              {
                title: `${currentTier.name} — Evening Paper`,
                year: '2024',
                color: 'Yellow Key',
                questions: 100
              },
              {
                title: `${currentTier.name} — Sukkur IBA Official Sample`,
                year: '2025',
                color: 'Blue Key',
                questions: 100
              }
            ].map((p, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col justify-between shadow-2xs hover:border-emerald-500/50 transition group"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="font-extrabold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50">
                      {p.year} Exam
                    </span>
                    <span className="font-semibold text-slate-500">{p.color}</span>
                  </div>
                  <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 transition">
                    {p.title}
                  </h5>
                  <p className="text-[11px] text-slate-500 mt-1">
                    100 MCQs · 100 Mins · Official Sukkur IBA OMR Pattern
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleLaunchTierMock(currentTierKey as any)}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer flex items-center gap-1"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Practice Paper</span>
                  </button>
                  <button
                    onClick={() => handleOpenPrintTier(currentTierKey as any)}
                    className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer flex items-center gap-1"
                  >
                    <Printer className="w-3 h-3" />
                    <span>Print PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
