import React, { useState, useMemo } from 'react';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  ShieldCheck, 
  FileText, 
  Download, 
  Printer, 
  Share2, 
  HelpCircle, 
  Sparkles,
  Info,
  Building2,
  ChevronRight,
  ArrowRight,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export interface PostPreset {
  id: string;
  name: string;
  agency: 'STS' | 'SPSC' | 'FPSC' | 'Police' | 'STEDA';
  bps: string;
  minAge: number;
  baseMaxAge: number;
  allowsGeneralRelaxation: boolean;
  notes: string;
}

export const POST_PRESETS: PostPreset[] = [
  {
    id: 'sts-bps-5-15',
    name: 'STS BPS 05–15 Screening Test (All Categories)',
    agency: 'STS',
    bps: 'BPS 05–15',
    minAge: 18,
    baseMaxAge: 28,
    allowsGeneralRelaxation: true,
    notes: 'Sindh Govt 15-Year General Relaxation applies; upper age extends up to 43 years.'
  },
  {
    id: 'spsc-cce-17',
    name: 'SPSC CCE (Combined Competitive Examination) BS-17',
    agency: 'SPSC',
    bps: 'BS-17',
    minAge: 21,
    baseMaxAge: 30,
    allowsGeneralRelaxation: false,
    notes: 'CCE rules are governed under special examination rules; general relaxation does not apply automatically without specific cabinet order.'
  },
  {
    id: 'spsc-lecturer-17',
    name: 'SPSC College Lecturer / Subject Specialist BPS-17',
    agency: 'SPSC',
    bps: 'BPS-17',
    minAge: 21,
    baseMaxAge: 30,
    allowsGeneralRelaxation: true,
    notes: '15-Year General Age Relaxation applies; upper age extends up to 45 years under Higher Education Department notifications.'
  },
  {
    id: 'spsc-mo-to-17',
    name: 'SPSC Municipal Officer (MO) / Town Officer (TO) BPS-17',
    agency: 'SPSC',
    bps: 'BPS-17',
    minAge: 21,
    baseMaxAge: 30,
    allowsGeneralRelaxation: true,
    notes: 'Local Government Department posts covered under General Age Relaxation.'
  },
  {
    id: 'junior-clerk-11',
    name: 'Junior Clerk (BPS-11) / Data Entry Operator (BPS-12)',
    agency: 'STS',
    bps: 'BPS 11–12',
    minAge: 18,
    baseMaxAge: 28,
    allowsGeneralRelaxation: true,
    notes: 'Standard ministerial cadre post covered under Sindh Govt general 15-year relaxation up to 43 years.'
  },
  {
    id: 'police-constable-7',
    name: 'Sindh Police Constable (BPS-07) / Driver Constable',
    agency: 'Police',
    bps: 'BPS-07',
    minAge: 18,
    baseMaxAge: 28,
    allowsGeneralRelaxation: false,
    notes: 'Uniformed armed forces/police cadres enforce strict physical/age standards (usually 18–28 years).'
  },
  {
    id: 'steda-teaching-license',
    name: 'STEDA Sindh Teaching License Exam (BPS 16–17)',
    agency: 'STEDA',
    bps: 'BPS 16–17',
    minAge: 20,
    baseMaxAge: 35,
    allowsGeneralRelaxation: true,
    notes: 'Teacher licensing test administered through Sukkur IBA STS with education sector relaxation allowances.'
  }
];

export interface RelaxationCategory {
  id: string;
  name: string;
  years: number;
  description: string;
  officialNotification: string;
}

export const RELAXATION_CATEGORIES: RelaxationCategory[] = [
  {
    id: 'sindh-general-15',
    name: 'General Candidate (Sindh 15-Year General Age Relaxation)',
    years: 15,
    description: 'Sindh Government grants 15 years general relaxation across ministerial, provincial, and screening cadres.',
    officialNotification: 'Government of Sindh Services, General Administration & Coordination Department Notification No. SO-II(SGA&CD)5-64/2011.'
  },
  {
    id: 'govt-servant-10',
    name: 'Sindh Govt Regular Employee (3+ Years Continuous Service)',
    years: 10,
    description: 'For in-service civil servants of Sindh Government applying through proper channel with Departmental Permission Certificate (DPC).',
    officialNotification: 'Sindh Civil Servants (Appointment, Promotion and Transfer) Rules, 1974, Rule 12.'
  },
  {
    id: 'differently-abled-10',
    name: 'Person with Disabilities (Differently-Abled Quota)',
    years: 10,
    description: 'Applies to certified differently-abled candidates holding Social Welfare Department CNIC / Disability Certificate.',
    officialNotification: 'Sindh Differently Abled Persons (Employment, Rehabilitation and Welfare) Act, 2014.'
  },
  {
    id: 'minorities-3',
    name: 'Scheduled Castes & Recognized Minority Communities',
    years: 3,
    description: '3 years relaxation for candidates belonging to scheduled castes and recognized minority religious denominations.',
    officialNotification: 'Sindh Government Public Sector Recruitment Guidelines (Minority Reservation).'
  },
  {
    id: 'armed-forces-10',
    name: 'Retired / Released Armed Forces Personnel',
    years: 10,
    description: 'Relaxation equal to the period of actual military service rendered, up to a maximum ceiling of 10 years.',
    officialNotification: 'Federal and Provincial Ex-Servicemen Re-employment Rules.'
  },
  {
    id: 'deceased-servant-5',
    name: 'Son / Daughter / Spouse of Civil Servant who died in service',
    years: 5,
    description: 'Special relaxation under Rule 11-A for legal heirs of government employees who passed away while on duty.',
    officialNotification: 'Sindh Civil Servants Rule 11-A (Deceased Quota Policy).'
  },
  {
    id: 'none',
    name: 'No Relaxation Claimed (Standard Base Limits)',
    years: 0,
    description: 'Strict evaluation against the base advertised age without any additional relaxation concessions.',
    officialNotification: 'Standard Prescribed Advertisement Rules.'
  }
];

export const AgeEligibilityCalculator: React.FC<{ isEmbedded?: boolean }> = ({ isEmbedded = false }) => {
  const { setTab, launchSimulator } = useApp();

  // Inputs
  const [birthYear, setBirthYear] = useState('1998');
  const [birthMonth, setBirthMonth] = useState('06');
  const [birthDay, setBirthDay] = useState('15');

  const [gender, setGender] = useState<'male' | 'female' | 'transgender'>('male');
  const [domicile, setDomicile] = useState<'sindh-rural' | 'sindh-urban' | 'other'>('sindh-rural');
  
  const [selectedPostId, setSelectedPostId] = useState('sts-bps-5-15');
  const [selectedRelaxationId, setSelectedRelaxationId] = useState('sindh-general-15');

  // Cut-off / Closing date of advertisement (default to today)
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const [cutoffDate, setCutoffDate] = useState(todayStr);

  const selectedPost = useMemo(() => {
    return POST_PRESETS.find(p => p.id === selectedPostId) || POST_PRESETS[0];
  }, [selectedPostId]);

  const selectedRelaxation = useMemo(() => {
    return RELAXATION_CATEGORIES.find(r => r.id === selectedRelaxationId) || RELAXATION_CATEGORIES[0];
  }, [selectedRelaxationId]);

  // Exact Age Calculation Engine
  const calculation = useMemo(() => {
    const dob = new Date(parseInt(birthYear, 10), parseInt(birthMonth, 10) - 1, parseInt(birthDay, 10));
    const target = new Date(cutoffDate);

    if (isNaN(dob.getTime()) || isNaN(target.getTime())) {
      return null;
    }

    let years = target.getFullYear() - dob.getFullYear();
    let months = target.getMonth() - dob.getMonth();
    let days = target.getDate() - dob.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Determine Upper Age Limit
    let effectiveMaxAge = selectedPost.baseMaxAge;
    let appliedRelaxationYears = 0;

    if (selectedPost.allowsGeneralRelaxation || selectedRelaxation.id !== 'sindh-general-15') {
      appliedRelaxationYears = selectedRelaxation.years;
      effectiveMaxAge += appliedRelaxationYears;
    } else {
      appliedRelaxationYears = 0;
    }

    // Hard ceiling for Sindh Government general posts is 43 years (or 45 for College Education)
    const upperAgeCeiling = Math.min(effectiveMaxAge, selectedPost.id === 'spsc-lecturer-17' ? 45 : 43);

    // Evaluate Status
    let status: 'ELIGIBLE' | 'OVERAGE' | 'UNDERAGE' = 'ELIGIBLE';
    let excessYears = 0;
    let excessMonths = 0;
    let excessDays = 0;
    let cushionYears = 0;
    let cushionMonths = 0;
    let cushionDays = 0;

    if (years < selectedPost.minAge) {
      status = 'UNDERAGE';
    } else if (years > upperAgeCeiling || (years === upperAgeCeiling && (months > 0 || days > 0))) {
      status = 'OVERAGE';
      excessYears = years - upperAgeCeiling;
      excessMonths = months;
      excessDays = days;
    } else {
      status = 'ELIGIBLE';
      cushionYears = upperAgeCeiling - years - 1;
      cushionMonths = 11 - months;
      const daysInMonth = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      cushionDays = daysInMonth - days;
      if (cushionDays >= 30) {
        cushionMonths += 1;
        cushionDays -= 30;
      }
      if (cushionMonths >= 12) {
        cushionYears += 1;
        cushionMonths -= 12;
      }
    }

    return {
      years,
      months,
      days,
      minAge: selectedPost.minAge,
      baseMaxAge: selectedPost.baseMaxAge,
      appliedRelaxationYears,
      upperAgeCeiling,
      status,
      excessYears,
      excessMonths,
      excessDays,
      cushionYears,
      cushionMonths,
      cushionDays,
    };
  }, [birthYear, birthMonth, birthDay, cutoffDate, selectedPost, selectedRelaxation]);

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    if (!calculation) return;
    const text = `*MUQABIL Age Eligibility Check (muqabil.pk)*\nTarget Post: ${selectedPost.name}\nCalculated Age: ${calculation.years} Years, ${calculation.months} Months, ${calculation.days} Days\nStatus: *${calculation.status}*\nUpper Limit Allowed: ${calculation.upperAgeCeiling} Years (with ${calculation.appliedRelaxationYears} Years Relaxation)\nCheck your eligibility at https://muqabil.pk`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className={`w-full ${isEmbedded ? '' : 'max-w-5xl mx-auto space-y-6 pb-12'}`}>
      
      {/* 1. CALCULATOR HEADER */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white p-6 sm:p-8 border border-emerald-800/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider mb-2">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Sindh Government Rules Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-white">
              STS &amp; SPSC Age Eligibility &amp; Relaxation Calculator
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Verify your exact age against official Sukkur IBA STS and Sindh Public Service Commission advertisement cut-offs, including the 15-year general age relaxation notification.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold flex items-center gap-2 transition cursor-pointer backdrop-blur-md"
              title="Print Clean Verification Slip"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>Print Slip</span>
            </button>
            <button
              onClick={handleShareWhatsApp}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-lg"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN CALCULATOR GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Form: Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-md space-y-5">
          
          {/* Target Post Selection */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              1. Select Target Post / Examination:
            </label>
            <select
              value={selectedPostId}
              onChange={(e) => setSelectedPostId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {POST_PRESETS.map((post) => (
                <option key={post.id} value={post.id}>
                  [{post.agency}] {post.name} — {post.bps}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{selectedPost.notes}</span>
            </p>
          </div>

          {/* Date of Birth Inputs */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              2. Your Date of Birth (as per Matriculation Certificate / CNIC):
            </label>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <span className="block text-[11px] text-slate-500 font-medium mb-1">Day</span>
                <select
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold"
                >
                  {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')).map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <span className="block text-[11px] text-slate-500 font-medium mb-1">Month</span>
                <select
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold"
                >
                  {[
                    '01 - Jan', '02 - Feb', '03 - Mar', '04 - Apr', '05 - May', '06 - Jun',
                    '07 - Jul', '08 - Aug', '09 - Sep', '10 - Oct', '11 - Nov', '12 - Dec'
                  ].map((m) => (
                    <option key={m.slice(0, 2)} value={m.slice(0, 2)}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <span className="block text-[11px] text-slate-500 font-medium mb-1">Year</span>
                <select
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold"
                >
                  {Array.from({ length: 50 }, (_, i) => String(2010 - i)).map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Relaxation Category Selection */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              3. Applicable Age Relaxation Category:
            </label>
            <select
              value={selectedRelaxationId}
              onChange={(e) => setSelectedRelaxationId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {RELAXATION_CATEGORIES.map((rel) => (
                <option key={rel.id} value={rel.id}>
                  {rel.name} (+{rel.years} Yrs)
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
              {selectedRelaxation.description}
            </p>
          </div>

          {/* Domicile & Advertisement Closing Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                4. Domicile &amp; Quota:
              </label>
              <select
                value={domicile}
                onChange={(e) => setDomicile(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold"
              >
                <option value="sindh-rural">Sindh (Rural Quota — 60%)</option>
                <option value="sindh-urban">Sindh (Urban Quota — 40%)</option>
                <option value="other">Federal / Other Province</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                5. Advertisement Closing Date:
              </label>
              <input
                type="date"
                value={cutoffDate}
                onChange={(e) => setCutoffDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Age is calculated strictly as of this cut-off date.
              </span>
            </div>
          </div>

        </div>

        {/* Right Panel: Official Verdict & Breakdown (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {calculation && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
              
              {/* STATUS BANNER */}
              <div className={`p-5 rounded-2xl border text-center transition-all ${
                calculation.status === 'ELIGIBLE'
                  ? 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/40 text-emerald-900 dark:text-emerald-300 ring-2 ring-emerald-500/30'
                  : calculation.status === 'OVERAGE'
                  ? 'bg-gradient-to-br from-rose-500/10 to-red-500/10 border-rose-500/40 text-rose-900 dark:text-rose-300 ring-2 ring-rose-500/30'
                  : 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/40 text-amber-900 dark:text-amber-300 ring-2 ring-amber-500/30'
              }`}>
                <div className="inline-flex p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm mb-2">
                  {calculation.status === 'ELIGIBLE' ? (
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  ) : calculation.status === 'OVERAGE' ? (
                    <XCircle className="w-8 h-8 text-rose-600 dark:text-rose-400" />
                  ) : (
                    <AlertCircle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
                  {calculation.status === 'ELIGIBLE' && 'ELIGIBLE FOR THIS POST'}
                  {calculation.status === 'OVERAGE' && 'OVERAGE (EXCEEDED LIMIT)'}
                  {calculation.status === 'UNDERAGE' && 'UNDERAGE FOR THIS POST'}
                </h3>

                <p className="text-xs font-semibold mt-1 opacity-90">
                  {calculation.status === 'ELIGIBLE' && `You are fully within the legal age limit for ${selectedPost.bps}!`}
                  {calculation.status === 'OVERAGE' && `Exceeded the upper ceiling by ${calculation.excessYears} Years, ${calculation.excessMonths} Months.`}
                  {calculation.status === 'UNDERAGE' && `Minimum required age is ${calculation.minAge} Years.`}
                </p>
              </div>

              {/* AGE MATRIX BREAKDOWN */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                    Your Exact Age on Closing Date:
                  </span>
                  <div className="text-2xl font-black text-slate-900 dark:text-white flex items-baseline gap-1">
                    <span>{calculation.years}</span>
                    <span className="text-xs font-bold text-slate-500 mr-2">Yrs</span>
                    <span>{calculation.months}</span>
                    <span className="text-xs font-bold text-slate-500 mr-2">Mos</span>
                    <span>{calculation.days}</span>
                    <span className="text-xs font-bold text-slate-500">Days</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                    <span className="text-[10px] text-slate-400 font-semibold block">Base Age Limit:</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">
                      {calculation.minAge} to {calculation.baseMaxAge} Years
                    </span>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                    <span className="text-[10px] text-slate-400 font-semibold block">Applied Relaxation:</span>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                      +{calculation.appliedRelaxationYears} Years
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/50 dark:bg-emerald-950/30 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-950 dark:text-emerald-200">
                    Max Permissible Upper Ceiling:
                  </span>
                  <span className="text-base font-black text-emerald-700 dark:text-emerald-400">
                    {calculation.upperAgeCeiling} Years
                  </span>
                </div>

                {calculation.status === 'ELIGIBLE' && (
                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Remaining Cushion: </span>
                    You still have <strong>{calculation.cushionYears} Years, {calculation.cushionMonths} Months, {calculation.cushionDays} Days</strong> of eligibility remaining before reaching the age limit!
                  </div>
                )}
              </div>

              {/* LEGAL CITATION NOTICE */}
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300 space-y-1 border border-slate-200 dark:border-slate-700">
                <span className="font-black text-slate-800 dark:text-slate-200 block uppercase tracking-wider">
                  Official Legal Authority &amp; Reference:
                </span>
                <p className="leading-relaxed">
                  {selectedRelaxation.officialNotification}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 italic pt-1 border-t border-slate-200 dark:border-slate-700">
                  Note: Candidates must present original Domicile, PRC Form D, and CNIC at scrutiny. In-service candidates require Departmental Permission Certificate (DPC).
                </p>
              </div>

              {/* DIRECT START TEST CTA */}
              <button
                onClick={() => {
                  launchSimulator({
                    simulatorId: 'sts',
                    title: `Screening Test Simulation — ${selectedPost.name}`,
                    category: selectedPost.bps.includes('11') || selectedPost.bps.includes('15') || selectedPost.bps.includes('17')
                      ? 'Graduation (BPS 11–15)'
                      : selectedPost.bps.includes('07') || selectedPost.bps.includes('05')
                      ? 'Matric (BPS 05)'
                      : 'Intermediate (BPS 05–10)',
                    durationMinutes: 100,
                    questionCount: 100,
                    negativeMarking: false
                  });
                }}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-emerald-900/20"
              >
                <span>Start Practice for {selectedPost.agency} {selectedPost.bps}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}
        </div>

      </div>

    </div>
  );
};
