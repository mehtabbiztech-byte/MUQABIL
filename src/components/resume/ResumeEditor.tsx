import React, { useState } from 'react';
import { 
  ResumeData, 
  EducationEntry, 
  ExperienceEntry, 
  ProjectEntry,
  SkillEntry, 
  CertificationEntry, 
  ReferenceEntry, 
  ResumeTemplateId, 
  ResumeAccentColor 
} from '../../types/resume';
import { SUMMARY_PRESETS } from '../../data/resumeSampleData';
import { ResumeTemplateGallery } from './ResumeTemplateGallery';
import { 
  User, 
  BookOpen, 
  Briefcase, 
  Award, 
  CheckCircle2, 
  FileText, 
  Plus, 
  Trash2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Palette,
  Sliders,
  Check,
  Code2,
  Globe,
  Link2,
  ShieldCheck,
  ExternalLink,
  Wand2,
  Loader2,
  Zap
} from 'lucide-react';

interface ResumeEditorProps {
  data: ResumeData;
  onChange: (updated: ResumeData) => void;
}

export const ResumeEditor: React.FC<ResumeEditorProps> = ({ data, onChange }) => {
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [showPresetsModal, setShowPresetsModal] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [enhancingExpId, setEnhancingExpId] = useState<string | null>(null);
  const [isSuggestingKeywords, setIsSuggestingKeywords] = useState(false);
  const [keywordSuggestions, setKeywordSuggestions] = useState<string[]>([]);

  const updateField = <K extends keyof ResumeData>(field: K, value: ResumeData[K]) => {
    onChange({ ...data, [field]: value });
  };

  // AI Summary Generator
  const handleAIGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    try {
      const res = await fetch('/api/resume-enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'generate-summary',
          role: data.targetHeadline || 'Professional Candidate',
          skills: data.skills.map((s) => s.name),
          context: data.education[0]?.degreeTitle || '',
        }),
      });
      const json = await res.json();
      if (json.summary) {
        updateField('professionalSummary', json.summary);
      }
    } catch (e) {
      console.error('Failed to generate summary:', e);
      const fallback = `Results-oriented and disciplined ${data.targetHeadline || 'professional'} with proven foundation in ${data.skills.map(s => s.name).slice(0, 3).join(', ') || 'office administration and analytical tasks'}. Dedicated to maintaining accuracy and delivering high performance in competitive environments.`;
      updateField('professionalSummary', fallback);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  // AI Polish Bullets
  const handleAIPolishBullets = async (expId: string) => {
    const targetExp = data.experience.find((e) => e.id === expId);
    if (!targetExp || !targetExp.responsibilities.length) return;

    setEnhancingExpId(expId);
    try {
      const polished: string[] = [];
      for (const bullet of targetExp.responsibilities) {
        if (!bullet.trim()) continue;
        const res = await fetch('/api/resume-enhance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'enhance-bullet',
            text: bullet,
            role: targetExp.designation || data.targetHeadline || 'Professional',
          }),
        });
        const json = await res.json();
        polished.push(json.enhanced || bullet);
      }
      updateExperience(expId, 'responsibilities', polished);
    } catch (e) {
      console.error('Failed to polish bullets:', e);
    } finally {
      setEnhancingExpId(null);
    }
  };

  // AI Suggest Keywords
  const handleAISuggestKeywords = async () => {
    setIsSuggestingKeywords(true);
    try {
      const res = await fetch('/api/resume-enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'suggest-keywords',
          role: data.targetHeadline || 'General Candidate',
        }),
      });
      const json = await res.json();
      if (json.keywords && Array.isArray(json.keywords)) {
        setKeywordSuggestions(json.keywords);
      }
    } catch (e) {
      console.error('Failed to suggest keywords:', e);
      setKeywordSuggestions([
        'MS Word & Excel', 'Record Keeping', 'Typing Speed (40+ WPM)', 
        'Data Entry Accuracy', 'Time Management', 'Official Correspondence'
      ]);
    } finally {
      setIsSuggestingKeywords(false);
    }
  };

  // Education helpers
  const addEducation = () => {
    const newEdu: EducationEntry = {
      id: 'edu-' + Date.now(),
      degreeLevel: 'Bachelor',
      degreeTitle: 'Degree Title',
      instituteOrBoard: 'University / Board Name',
      passingYear: new Date().getFullYear().toString(),
      obtainedMarks: '',
      totalMarks: '',
      percentageOrCgpa: '',
      divisionOrGrade: '1st Division',
      majorSubjects: '',
    };
    updateField('education', [newEdu, ...data.education]);
  };

  const updateEducation = (id: string, field: keyof EducationEntry, value: string) => {
    const updated = data.education.map((item) => 
      item.id === id ? { ...item, [field]: value } : item
    );
    updateField('education', updated);
  };

  const removeEducation = (id: string) => {
    updateField('education', data.education.filter((item) => item.id !== id));
  };

  // Experience helpers
  const addExperience = () => {
    const newExp: ExperienceEntry = {
      id: 'exp-' + Date.now(),
      organization: 'Organization Name',
      designation: 'Job Designation',
      employmentType: 'Full-time',
      location: 'City, Pakistan',
      startDate: '2023-01',
      endDate: '2024-01',
      isCurrent: false,
      responsibilities: ['Key job responsibility or achievement'],
    };
    updateField('experience', [newExp, ...data.experience]);
  };

  const updateExperience = (id: string, field: keyof ExperienceEntry, value: any) => {
    const updated = data.experience.map((item) => 
      item.id === id ? { ...item, [field]: value } : item
    );
    updateField('experience', updated);
  };

  const removeExperience = (id: string) => {
    updateField('experience', data.experience.filter((item) => item.id !== id));
  };

  // Skill helpers
  const [newSkillText, setNewSkillText] = useState('');
  const addSkill = () => {
    if (!newSkillText.trim()) return;
    const newSk: SkillEntry = {
      id: 'sk-' + Date.now(),
      name: newSkillText.trim(),
      category: 'technical',
      level: 'Proficient',
    };
    updateField('skills', [...data.skills, newSk]);
    setNewSkillText('');
  };

  const removeSkill = (id: string) => {
    updateField('skills', data.skills.filter((item) => item.id !== id));
  };

  // Certification helpers
  const addCertification = () => {
    const newCert: CertificationEntry = {
      id: 'cert-' + Date.now(),
      title: 'Certification / License Name',
      issuingAuthority: 'STEDA / SBTE / Institute',
      issueYear: '2024',
      licenseOrCertificateNo: '',
    };
    updateField('certifications', [...data.certifications, newCert]);
  };

  const updateCertification = (id: string, field: keyof CertificationEntry, value: string) => {
    const updated = data.certifications.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    updateField('certifications', updated);
  };

  const removeCertification = (id: string) => {
    updateField('certifications', data.certifications.filter((item) => item.id !== id));
  };

  // References helpers
  const addReference = () => {
    const newRef: ReferenceEntry = {
      id: 'ref-' + Date.now(),
      name: 'Reference Name',
      designation: 'Designation',
      organization: 'Department / Organization',
      contact: 'Email or Phone',
    };
    updateField('references', [...data.references, newRef]);
  };

  const updateReference = (id: string, field: keyof ReferenceEntry, value: string) => {
    const updated = data.references.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    updateField('references', updated);
  };

  const removeReference = (id: string) => {
    updateField('references', data.references.filter((item) => item.id !== id));
  };

  // Projects helpers
  const addProject = () => {
    const newProj: ProjectEntry = {
      id: `proj-${Date.now()}`,
      title: '',
      role: '',
      techStack: '',
      link: '',
      highlights: [''],
    };
    updateField('projects', [...(data.projects || []), newProj]);
  };

  const updateProject = (id: string, field: keyof ProjectEntry, value: any) => {
    const updated = (data.projects || []).map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    updateField('projects', updated);
  };

  const removeProject = (id: string) => {
    updateField('projects', (data.projects || []).filter((item) => item.id !== id));
  };

  const addProjectHighlight = (id: string) => {
    const updated = (data.projects || []).map((p) =>
      p.id === id ? { ...p, highlights: [...p.highlights, ''] } : p
    );
    updateField('projects', updated);
  };

  const updateProjectHighlight = (projId: string, hIdx: number, val: string) => {
    const updated = (data.projects || []).map((p) => {
      if (p.id !== projId) return p;
      const h = [...p.highlights];
      h[hIdx] = val;
      return { ...p, highlights: h };
    });
    updateField('projects', updated);
  };

  const removeProjectHighlight = (projId: string, hIdx: number) => {
    const updated = (data.projects || []).map((p) => {
      if (p.id !== projId) return p;
      return { ...p, highlights: p.highlights.filter((_, i) => i !== hIdx) };
    });
    updateField('projects', updated);
  };

  const SECTIONS = [
    { id: 'personal', label: 'Personal & Contact', icon: <User size={16} /> },
    { id: 'objective', label: 'Target Job & Summary', icon: <FileText size={16} /> },
    { id: 'education', label: `Education (${data.education.length})`, icon: <BookOpen size={16} /> },
    { id: 'experience', label: `Experience (${data.experience.length})`, icon: <Briefcase size={16} /> },
    { id: 'projects', label: `Projects & Impact (${(data.projects || []).length})`, icon: <Code2 size={16} /> },
    { id: 'skills', label: `Skills (${data.skills.length})`, icon: <CheckCircle2 size={16} /> },
    { id: 'certifications', label: `Certifications & Licenses (${data.certifications.length})`, icon: <Award size={16} /> },
    { id: 'references', label: `References (${data.references.length})`, icon: <User size={16} /> },
    { id: 'settings', label: 'Template & Design', icon: <Palette size={16} /> },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
      {/* Section Selector Tab Bar */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar bg-slate-50 dark:bg-slate-950 p-1.5 gap-1">
        {SECTIONS.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeSection === sec.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800'
            }`}
          >
            {sec.icon}
            <span>{sec.label}</span>
          </button>
        ))}
      </div>

      <div className="p-4 sm:p-6 space-y-6 max-h-[calc(100vh-280px)] overflow-y-auto">
        {/* 1. PERSONAL DETAILS */}
        {activeSection === 'personal' && (
          <div className="space-y-4">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Personal & Public Sector Scrutiny Details</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                These fields are standard for Sukkur IBA STS, SPSC, and Govt job verification.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={data.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  placeholder="e.g. Muhammad Farhan"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Father's Name</label>
                <input
                  type="text"
                  value={data.fatherName}
                  onChange={(e) => updateField('fatherName', e.target.value)}
                  placeholder="e.g. Abdul Rasheed Shaikh"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">CNIC Number</label>
                <input
                  type="text"
                  value={data.cnic}
                  onChange={(e) => updateField('cnic', e.target.value)}
                  placeholder="e.g. 45504-1234567-1"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone / WhatsApp *</label>
                <input
                  type="text"
                  value={data.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="e.g. +92 300 1234567"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="e.g. candidate@gmail.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Domicile District (Sindh/Pak)</label>
                <input
                  type="text"
                  value={data.domicileDistrict}
                  onChange={(e) => updateField('domicileDistrict', e.target.value)}
                  placeholder="e.g. Sukkur (Rural) or Larkana"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Province</label>
                <input
                  type="text"
                  value={data.province}
                  onChange={(e) => updateField('province', e.target.value)}
                  placeholder="e.g. Sindh"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={data.dob}
                  onChange={(e) => updateField('dob', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Gender</label>
                <select
                  value={data.gender}
                  onChange={(e) => updateField('gender', e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Religion</label>
                <input
                  type="text"
                  value={data.religion}
                  onChange={(e) => updateField('religion', e.target.value)}
                  placeholder="e.g. Islam"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Postal Address</label>
                <input
                  type="text"
                  value={data.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  placeholder="e.g. House # 42, St. 3, Near Old Bus Stand, Sukkur"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Fortune 500 & Online Profiles */}
              <div className="sm:col-span-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 mb-2">
                  <Globe size={14} className="text-indigo-600 dark:text-indigo-400" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Professional & Global Profiles (Essential for Fortune 500, Tech & Remote Roles)
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      <Link2 size={12} className="text-blue-600" />
                      <span>LinkedIn Profile</span>
                    </label>
                    <input
                      type="text"
                      value={data.linkedinUrl || ''}
                      onChange={(e) => updateField('linkedinUrl', e.target.value)}
                      placeholder="linkedin.com/in/username"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      <Code2 size={12} className="text-slate-800 dark:text-slate-200" />
                      <span>GitHub / Dev Profile</span>
                    </label>
                    <input
                      type="text"
                      value={data.githubUrl || ''}
                      onChange={(e) => updateField('githubUrl', e.target.value)}
                      placeholder="github.com/username"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      <Globe size={12} className="text-emerald-600" />
                      <span>Portfolio / Website</span>
                    </label>
                    <input
                      type="text"
                      value={data.portfolioUrl || ''}
                      onChange={(e) => updateField('portfolioUrl', e.target.value)}
                      placeholder="portfolio.dev"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2 pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={data.hafizEQuran}
                    onChange={(e) => updateField('hafizEQuran', e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                  />
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    Hafiz-e-Quran (Tick if applicable for 20 Extra Marks in Sindh / Pak Govt tests)
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* 2. OBJECTIVE & SUMMARY */}
        {activeSection === 'objective' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Target Job & Professional Statement</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tailored headline and summary matching your target STS or corporate vacancy.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAIGenerateSummary}
                  disabled={isGeneratingSummary}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold hover:opacity-90 shadow-sm transition-all disabled:opacity-50"
                  title="Generate ATS-optimized 2-3 sentence summary based on your profile"
                >
                  {isGeneratingSummary ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} />}
                  <span>{isGeneratingSummary ? 'Writing Summary...' : 'AI Generate Summary'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowPresetsModal(!showPresetsModal)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100 transition-colors"
                >
                  <Sparkles size={14} />
                  <span>Smart Presets</span>
                </button>
              </div>
            </div>

            {/* Smart Presets Inserter */}
            {showPresetsModal && (
              <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-2">
                <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                  Choose a Ready-Made Statement for your Target Role:
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {SUMMARY_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        updateField('targetHeadline', preset.title);
                        updateField('professionalSummary', preset.text);
                        setShowPresetsModal(false);
                      }}
                      className="text-left p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 hover:border-emerald-500 transition-all text-xs group"
                    >
                      <div className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 flex items-center justify-between">
                        <span>{preset.title}</span>
                        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded font-bold">Apply</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] mt-1 line-clamp-2">
                        {preset.text}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Role / Examination Headline
              </label>
              <input
                type="text"
                value={data.targetHeadline}
                onChange={(e) => updateField('targetHeadline', e.target.value)}
                placeholder="e.g. Candidate for STS BPS 05–15 / PST Teacher / Junior Clerk"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Professional Objective & Profile Statement
              </label>
              <textarea
                rows={4}
                value={data.professionalSummary}
                onChange={(e) => updateField('professionalSummary', e.target.value)}
                placeholder="Highlight your academic qualifications, test preparation focus, typing speed, and dedication..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs leading-relaxed focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* 3. EDUCATION */}
        {activeSection === 'education' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Academic Qualifications</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Add from Matric to your Highest Degree. Formatted cleanly for government scrutiny.
                </p>
              </div>

              <button
                type="button"
                onClick={addEducation}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <Plus size={14} />
                <span>Add Degree</span>
              </button>
            </div>

            {data.education.length === 0 ? (
              <div className="text-center py-8 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                No degrees added yet. Click "Add Degree" to start.
              </div>
            ) : (
              <div className="space-y-3">
                {data.education.map((edu, idx) => (
                  <div 
                    key={edu.id}
                    className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        Degree #{data.education.length - idx}: {edu.degreeTitle || 'Untitled Degree'}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeEducation(edu.id)}
                        className="text-rose-500 hover:text-rose-700 p-1 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Delete Degree"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">Level</label>
                        <input
                          type="text"
                          value={edu.degreeLevel}
                          onChange={(e) => updateEducation(edu.id, 'degreeLevel', e.target.value)}
                          placeholder="e.g. Matric / Inter / Bachelor"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">Degree Title</label>
                        <input
                          type="text"
                          value={edu.degreeTitle}
                          onChange={(e) => updateEducation(edu.id, 'degreeTitle', e.target.value)}
                          placeholder="e.g. BS Computer Science / Pre-Engineering"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-medium"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">Board / University</label>
                        <input
                          type="text"
                          value={edu.instituteOrBoard}
                          onChange={(e) => updateEducation(edu.id, 'instituteOrBoard', e.target.value)}
                          placeholder="e.g. BISE Sukkur / University of Sindh"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">Passing Year</label>
                        <input
                          type="text"
                          value={edu.passingYear}
                          onChange={(e) => updateEducation(edu.id, 'passingYear', e.target.value)}
                          placeholder="e.g. 2022"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">Obtained / Total Marks</label>
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={edu.obtainedMarks}
                            onChange={(e) => updateEducation(edu.id, 'obtainedMarks', e.target.value)}
                            placeholder="Obtained"
                            className="w-1/2 px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs text-center"
                          />
                          <span>/</span>
                          <input
                            type="text"
                            value={edu.totalMarks}
                            onChange={(e) => updateEducation(edu.id, 'totalMarks', e.target.value)}
                            placeholder="Total"
                            className="w-1/2 px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs text-center"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">Percentage / CGPA</label>
                        <input
                          type="text"
                          value={edu.percentageOrCgpa}
                          onChange={(e) => updateEducation(edu.id, 'percentageOrCgpa', e.target.value)}
                          placeholder="e.g. 82.5% or 3.5 CGPA"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">Division / Grade</label>
                        <input
                          type="text"
                          value={edu.divisionOrGrade}
                          onChange={(e) => updateEducation(edu.id, 'divisionOrGrade', e.target.value)}
                          placeholder="e.g. 1st Div / Grade A"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-bold"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">Major Subjects</label>
                        <input
                          type="text"
                          value={edu.majorSubjects || ''}
                          onChange={(e) => updateEducation(edu.id, 'majorSubjects', e.target.value)}
                          placeholder="e.g. Physics, Chemistry, Mathematics or Database Systems"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. EXPERIENCE */}
        {activeSection === 'experience' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Work Experience & Internships</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Add full-time, contract, teaching, or data-entry experience.
                </p>
              </div>

              <button
                type="button"
                onClick={addExperience}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <Plus size={14} />
                <span>Add Position</span>
              </button>
            </div>

            {data.experience.length === 0 ? (
              <div className="text-center py-8 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                No experience entries added. Fresh graduates can leave this empty or add coaching / internship experience.
              </div>
            ) : (
              <div className="space-y-3">
                {data.experience.map((exp) => (
                  <div 
                    key={exp.id}
                    className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {exp.designation || 'Position'} at {exp.organization || 'Organization'}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeExperience(exp.id)}
                        className="text-rose-500 hover:text-rose-700 p-1 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/40"
                        title="Delete Position"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">Organization</label>
                        <input
                          type="text"
                          value={exp.organization}
                          onChange={(e) => updateExperience(exp.id, 'organization', e.target.value)}
                          placeholder="e.g. Govt High School / Beacon Academy"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">Designation</label>
                        <input
                          type="text"
                          value={exp.designation}
                          onChange={(e) => updateExperience(exp.id, 'designation', e.target.value)}
                          placeholder="e.g. Computer Operator / Teacher"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">Location</label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                          placeholder="e.g. Sukkur, Sindh"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">Duration</label>
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            placeholder="Start (2022)"
                            className="w-1/2 px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
                          />
                          <span>–</span>
                          <input
                            type="text"
                            value={exp.isCurrent ? 'Present' : exp.endDate}
                            disabled={exp.isCurrent}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            placeholder="End (2024)"
                            className="w-1/2 px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                            Key Responsibilities & Accomplishments (One per line)
                          </label>
                          <button
                            type="button"
                            onClick={() => handleAIPolishBullets(exp.id)}
                            disabled={enhancingExpId === exp.id || !exp.responsibilities.length}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 hover:underline disabled:opacity-40"
                            title="Rewrite bullets with metrics & power verbs using the Google XYZ formula"
                          >
                            {enhancingExpId === exp.id ? (
                              <>
                                <Loader2 size={12} className="animate-spin" />
                                <span>Optimizing Bullets...</span>
                              </>
                            ) : (
                              <>
                                <Wand2 size={12} />
                                <span>AI Polish Bullets (Google XYZ)</span>
                              </>
                            )}
                          </button>
                        </div>
                        <textarea
                          rows={3}
                          value={exp.responsibilities.join('\n')}
                          onChange={(e) => updateExperience(exp.id, 'responsibilities', e.target.value.split('\n').filter(Boolean))}
                          placeholder="Maintained dispatch registers and official records&#10;Prepared MS Excel reports with 100% accuracy"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4B. PROJECTS & IMPACT (FORTUNE 500 & TECH ROLES) */}
        {activeSection === 'projects' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Technical & High-Impact Projects</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Critical for Fortune 500 tech, data science, consulting, and engineering portfolios.
                </p>
              </div>
              <button
                type="button"
                onClick={addProject}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors"
              >
                <Plus size={14} />
                <span>Add Project</span>
              </button>
            </div>

            {(!data.projects || data.projects.length === 0) ? (
              <div className="text-center py-8 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                <p className="text-xs font-medium">No projects added yet.</p>
                <button
                  type="button"
                  onClick={addProject}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800"
                >
                  <Plus size={13} />
                  <span>Add First Project</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {data.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {proj.title || 'Untitled Project'} {proj.role ? `• ${proj.role}` : ''}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeProject(proj.id)}
                        className="text-rose-500 hover:text-rose-700 p-1 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/40"
                        title="Delete Project"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">Project Title</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                          placeholder="e.g. Distributed Cloud Sync Engine"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">Your Role / Capacity</label>
                        <input
                          type="text"
                          value={proj.role}
                          onChange={(e) => updateProject(proj.id, 'role', e.target.value)}
                          placeholder="e.g. Lead Architect / Full Stack Contributor"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">Technologies Used (comma separated)</label>
                        <input
                          type="text"
                          value={Array.isArray(proj.techStack) ? (proj.techStack as any).join(', ') : (proj.techStack || '')}
                          onChange={(e) => updateProject(proj.id, 'techStack', e.target.value)}
                          placeholder="e.g. React, TypeScript, Node.js, PostgreSQL, Docker"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">Project Link / Repo</label>
                        <input
                          type="text"
                          value={proj.link || ''}
                          onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                          placeholder="e.g. github.com/user/project or live-url.com"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
                        />
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                          Accomplishment Bullets (Quantifiable Impact):
                        </label>
                        <button
                          type="button"
                          onClick={() => addProjectHighlight(proj.id)}
                          className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          + Add Bullet
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        {proj.highlights.map((h, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-1.5">
                            <span className="text-slate-400 text-xs">•</span>
                            <input
                              type="text"
                              value={h}
                              onChange={(e) => updateProjectHighlight(proj.id, hIdx, e.target.value)}
                              placeholder="e.g. Architected streaming queue handling 10k events/sec with sub-50ms latency."
                              className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
                            />
                            {proj.highlights.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeProjectHighlight(proj.id, hIdx)}
                                className="text-slate-400 hover:text-rose-500 p-1"
                              >
                                ×
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 5. SKILLS & LANGUAGES */}
        {activeSection === 'skills' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Skills, Typing & Languages</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Crucial for BPS Clerk & Computer Operator tests (WPM typing, MS Office, languages).
                </p>
              </div>

              <button
                type="button"
                onClick={handleAISuggestKeywords}
                disabled={isSuggestingKeywords}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold hover:opacity-90 shadow-sm transition-all disabled:opacity-50"
              >
                {isSuggestingKeywords ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
                <span>{isSuggestingKeywords ? 'Analyzing...' : 'AI Suggest Keywords'}</span>
              </button>
            </div>

            {/* Keyword Suggestions Chips */}
            {keywordSuggestions.length > 0 && (
              <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-200 block">
                  Click to add recommended keywords for "{data.targetHeadline || 'your target role'}":
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {keywordSuggestions.map((kw, i) => {
                    const alreadyHas = data.skills.some(s => s.name.toLowerCase() === kw.toLowerCase());
                    if (alreadyHas) return null;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          const newSk: SkillEntry = {
                            id: 'sk-' + Date.now() + i,
                            name: kw,
                            category: 'technical',
                            level: 'Proficient',
                          };
                          updateField('skills', [...data.skills, newSk]);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 text-slate-800 dark:text-slate-200 text-xs font-medium hover:bg-emerald-100 transition-colors"
                      >
                        <Plus size={11} className="text-emerald-600" />
                        <span>{kw}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                value={newSkillText}
                onChange={(e) => setNewSkillText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                placeholder="e.g. Urdu / Sindhi InPage Typing (45 WPM)"
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shrink-0"
              >
                Add Skill
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {data.skills.map((skill) => (
                <div 
                  key={skill.id}
                  className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full text-xs font-medium text-slate-800 dark:text-slate-200"
                >
                  <span>{skill.name}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill.id)}
                    className="text-slate-400 hover:text-rose-500 transition-colors ml-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. CERTIFICATIONS & TEACHING LICENSES */}
        {activeSection === 'certifications' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Licenses & Diplomas</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  STEDA Sindh Teaching License, 1-Year CIT Diploma, Typing Certificates.
                </p>
              </div>

              <button
                type="button"
                onClick={addCertification}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <Plus size={14} />
                <span>Add Certificate</span>
              </button>
            </div>

            {data.certifications.length === 0 ? (
              <div className="text-center py-6 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                No certifications added. Click "Add Certificate" if you have STEDA license or IT diploma.
              </div>
            ) : (
              <div className="space-y-2.5">
                {data.certifications.map((cert) => (
                  <div 
                    key={cert.id}
                    className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {cert.title || 'Certification Title'}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeCertification(cert.id)}
                        className="text-rose-500 hover:text-rose-700 p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">Certificate / License Title</label>
                        <input
                          type="text"
                          value={cert.title}
                          onChange={(e) => updateCertification(cert.id, 'title', e.target.value)}
                          placeholder="e.g. STEDA Teaching License (PST Category)"
                          className="w-full px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">Issue Year</label>
                        <input
                          type="text"
                          value={cert.issueYear}
                          onChange={(e) => updateCertification(cert.id, 'issueYear', e.target.value)}
                          placeholder="e.g. 2024"
                          className="w-full px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">Issuing Authority / Board</label>
                        <input
                          type="text"
                          value={cert.issuingAuthority}
                          onChange={(e) => updateCertification(cert.id, 'issuingAuthority', e.target.value)}
                          placeholder="e.g. STEDA Sindh / SBTE"
                          className="w-full px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">License / Roll # (Optional)</label>
                        <input
                          type="text"
                          value={cert.licenseOrCertificateNo || ''}
                          onChange={(e) => updateCertification(cert.id, 'licenseOrCertificateNo', e.target.value)}
                          placeholder="e.g. STEDA-TL-8841"
                          className="w-full px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 7. REFERENCES */}
        {activeSection === 'references' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Professional References</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Professors, Head Masters, or previous department supervisors.
                </p>
              </div>

              <button
                type="button"
                onClick={addReference}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <Plus size={14} />
                <span>Add Reference</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {data.references.map((ref) => (
                <div key={ref.id} className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {ref.name || 'Referee'}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeReference(ref.id)}
                      className="text-rose-500 hover:text-rose-700 p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">Name</label>
                      <input
                        type="text"
                        value={ref.name}
                        onChange={(e) => updateReference(ref.id, 'name', e.target.value)}
                        placeholder="e.g. Prof. Ghulam Mustafa"
                        className="w-full px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">Designation & Org</label>
                      <input
                        type="text"
                        value={ref.designation}
                        onChange={(e) => updateReference(ref.id, 'designation', e.target.value)}
                        placeholder="e.g. Head Master (BPS-18)"
                        className="w-full px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">Contact / Email</label>
                      <input
                        type="text"
                        value={ref.contact}
                        onChange={(e) => updateReference(ref.id, 'contact', e.target.value)}
                        placeholder="Phone or 'Upon request'"
                        className="w-full px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. TEMPLATE & DESIGN SETTINGS */}
        {activeSection === 'settings' && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Resume Format & Layout Options</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Switch templates, accent colors, and toggle public sector scrutiny fields.
              </p>
            </div>

            {/* Template Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  Choose Format / Layout:
                </label>
                <button
                  type="button"
                  onClick={() => {
                    onChange({
                      ...data,
                      template: 'fortune-500',
                      showPhoto: false,
                      showFatherName: false,
                      showCnic: false,
                      showDomicile: false,
                      showHafizStatus: false,
                      accentColor: 'navy',
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                >
                  <ShieldCheck size={13} />
                  <span>1-Click Auto-Sanitize for Fortune 500 ATS</span>
                </button>
              </div>

              <ResumeTemplateGallery
                selectedTemplate={data.template}
                onSelect={(template) => onChange({
                  ...data,
                  template: template.id,
                  accentColor: template.accentColor,
                  fontSize: template.fontSize,
                })}
              />
            </div>

            {/* Accent Color */}
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                Accent Theme Color:
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'emerald', label: 'Emerald', bg: 'bg-emerald-600' },
                  { id: 'navy', label: 'Navy', bg: 'bg-blue-900' },
                  { id: 'slate', label: 'Slate', bg: 'bg-slate-700' },
                  { id: 'burgundy', label: 'Burgundy', bg: 'bg-rose-900' },
                  { id: 'indigo', label: 'Indigo', bg: 'bg-indigo-700' },
                  { id: 'teal', label: 'Teal', bg: 'bg-teal-700' },
                  { id: 'blue', label: 'Blue', bg: 'bg-blue-600' },
                  { id: 'violet', label: 'Violet', bg: 'bg-violet-700' },
                  { id: 'rose', label: 'Rose', bg: 'bg-rose-700' },
                  { id: 'amber', label: 'Amber', bg: 'bg-amber-700' },
                ].map((col) => (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => updateField('accentColor', col.id as ResumeAccentColor)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                      data.accentColor === col.id
                        ? 'border-slate-900 dark:border-white ring-2 ring-emerald-400/40 bg-slate-100 dark:bg-slate-800'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full ${col.bg}`} />
                    <span>{col.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Visibility Toggles */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                Government Scrutiny Field Visibility:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <input
                    type="checkbox"
                    checked={data.showFatherName}
                    onChange={(e) => updateField('showFatherName', e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Show Father's Name</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <input
                    type="checkbox"
                    checked={data.showCnic}
                    onChange={(e) => updateField('showCnic', e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Show CNIC Number</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <input
                    type="checkbox"
                    checked={data.showDomicile}
                    onChange={(e) => updateField('showDomicile', e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Show Domicile District</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <input
                    type="checkbox"
                    checked={data.showHafizStatus}
                    onChange={(e) => updateField('showHafizStatus', e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Show Hafiz-e-Quran Bonus Quota</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
