import type { ResumeAccentColor, ResumeFontSize, ResumeLayoutFamily, ResumeTemplateId } from '../types/resume';

export interface ResumeTemplateDefinition {
  id: ResumeTemplateId;
  name: string;
  category: string;
  description: string;
  previewLayout: ResumeLayoutFamily;
  accentColor: ResumeAccentColor;
  fontSize: ResumeFontSize;
  fontFamily: string;
  atsFriendly: boolean;
}

export const RESUME_TEMPLATE_CATEGORIES = [
  'Government & Public',
  'Classic & ATS',
  'Modern & Executive',
  'Technology & Product',
  'Business & Finance',
  'Education & Healthcare',
  'Creative & Global',
] as const;

const accents: ResumeAccentColor[] = ['navy','blue','teal','emerald','indigo','violet','burgundy','rose','slate','amber'];
const sizes: ResumeFontSize[] = ['normal','compact','spacious'];
const fonts = [
  'Arial, Helvetica, sans-serif',
  'Georgia, Times New Roman, serif',
  'Trebuchet MS, Arial, sans-serif',
  'Verdana, Geneva, sans-serif',
  'Palatino Linotype, Book Antiqua, serif',
  'Tahoma, Arial, sans-serif',
];

type TemplateSeed = [id: string, name: string, category: string, description: string, layout: ResumeLayoutFamily, atsFriendly: boolean];

const seeds: TemplateSeed[] = [
  ['sts-govt','STS & Government Official','Government & Public','Pakistan public-sector CV with scrutiny fields and education table.','sts-govt',false],
  ['modern-ats','Modern ATS','Classic & ATS','Clean, readable layout for online applications.','modern-ats',true],
  ['executive','Executive Sidebar','Modern & Executive','Leadership CV with a strong sidebar and compact profile.','executive',false],
  ['minimal','Classic Minimal','Classic & ATS','Quiet typography, clear hierarchy and generous whitespace.','minimal',true],
  ['fortune-500','Fortune 500 Standard','Classic & ATS','Single-column corporate format for global employers.','fortune-500',true],
  ['tech-compact','Tech & Digital','Technology & Product','Compact layout for technical skills, projects and results.','tech-compact',true],

  ['pakistan-public-service','Pakistan Public Service','Government & Public','Formal civil-service application CV with domicile and qualification emphasis.','sts-govt',false],
  ['sts-iba-application','STS IBA Candidate','Government & Public','Exam-candidate format for STS applications and teaching roles.','sts-govt',false],
  ['spsc-cce-officer','SPSC CCE Officer','Government & Public','Structured profile for provincial competitive-exam applications.','sts-govt',false],
  ['fpsc-civil-service','FPSC Civil Service','Government & Public','Formal federal-service CV with clear education and employment chronology.','sts-govt',false],
  ['nts-professional','NTS Professional','Government & Public','Compact, form-friendly CV for screening tests and public recruitment.','fortune-500',true],
  ['teacher-government','Government Teacher','Government & Public','Teaching application with qualifications, training and classroom experience.','sts-govt',false],
  ['university-faculty','University Faculty','Education & Healthcare','Academic faculty CV with education, research, teaching and credentials.','minimal',true],
  ['research-scholar','Research Scholar','Education & Healthcare','Research-focused profile for publications, projects and academic work.','minimal',true],

  ['harvard-inspired-classic','Harvard-Inspired Classic','Classic & ATS','Traditional one-column academic style with conservative section headings.','fortune-500',true],
  ['oxford-academic','Oxford Academic Style','Classic & ATS','Refined academic CV with a serif tone and structured credentials.','minimal',true],
  ['cambridge-research','Cambridge Research','Classic & ATS','Research-ready chronology for academic roles and grants.','minimal',true],
  ['stanford-ats','Stanford-Style ATS','Classic & ATS','Straightforward single-column layout that keeps text easy to scan.','fortune-500',true],
  ['mit-engineering','Engineering Professional','Classic & ATS','Technical education, projects and impact in a clean hierarchy.','tech-compact',true],
  ['princeton-traditional','Traditional Professional','Classic & ATS','Conservative format for established industries and formal applications.','minimal',true],
  ['cornell-chronological','Chronological Career','Classic & ATS','Experience-first chronology with clear dates and progression.','fortune-500',true],
  ['wharton-finance','Finance Leadership','Business & Finance','Executive finance profile with measurable outcomes and credentials.','executive',true],
  ['mckinsey-consulting','Consulting Impact','Business & Finance','Consulting-style, achievement-led format with concise results.','fortune-500',true],
  ['zurich-minimal','Swiss Minimal','Classic & ATS','Precise monochrome layout with disciplined spacing.','minimal',true],
  ['london-professional','International Professional','Creative & Global','Polished international profile with concise contact and career sections.','modern-ats',true],

  ['modern-one-column','Modern One-Column','Modern & Executive','Contemporary single-column design with restrained color accents.','modern-ats',true],
  ['modern-two-column','Modern Two-Column','Modern & Executive','Balanced two-column layout for a compact professional profile.','modern-ats',false],
  ['elegant-serif','Elegant Serif','Modern & Executive','Editorial serif typography for a polished senior profile.','minimal',false],
  ['editorial-profile','Editorial Profile','Modern & Executive','Personal-brand headline with clear, magazine-like section rhythm.','minimal',false],
  ['charcoal-executive','Charcoal Executive','Modern & Executive','Leadership sidebar with high-contrast charcoal styling.','executive',false],
  ['blue-ribbon','Blue Ribbon Professional','Modern & Executive','Clean blue-accented design for corporate applications.','modern-ats',true],
  ['emerald-professional','Emerald Professional','Modern & Executive','Fresh green accent with a formal, readable structure.','modern-ats',true],
  ['burgundy-formal','Burgundy Formal','Modern & Executive','Elegant burgundy detail for senior and formal roles.','executive',false],
  ['indigo-grid','Indigo Grid','Modern & Executive','Organized grid presentation with a confident indigo palette.','executive',false],
  ['career-timeline','Career Timeline','Modern & Executive','Timeline-led employment history for clear career progression.','executive',false],
  ['compact-one-page','Compact One-Page','Modern & Executive','Space-conscious layout designed for a concise one-page resume.','tech-compact',true],

  ['software-engineer','Software Engineer','Technology & Product','Projects, technical stack and engineering outcomes come first.','tech-compact',true],
  ['data-analyst','Data Analyst','Technology & Product','Highlights analytical tools, reporting, projects and quantified results.','tech-compact',true],
  ['product-manager','Product Manager','Technology & Product','Emphasizes product strategy, launch outcomes and cross-team leadership.','modern-ats',true],
  ['ux-designer','UX / UI Designer','Technology & Product','Portfolio-forward structure for design process and product impact.','modern-ats',false],
  ['cybersecurity-specialist','Cybersecurity Specialist','Technology & Product','Prioritizes security skills, certifications and incident outcomes.','tech-compact',true],
  ['cloud-architect','Cloud Architect','Technology & Product','Technical leadership format for platforms, architecture and reliability.','tech-compact',true],

  ['finance-professional','Finance Professional','Business & Finance','Finance-focused hierarchy for analysis, controls and business impact.','fortune-500',true],
  ['accountant-auditor','Accountant / Auditor','Business & Finance','Formal structure for accounting, audit, compliance and credentials.','fortune-500',true],
  ['sales-leader','Sales Leader','Business & Finance','Revenue and customer-growth achievements are easy to scan.','executive',false],
  ['digital-marketer','Digital Marketing Strategist','Business & Finance','Campaign, channel and growth metrics have clear visual priority.','modern-ats',false],
  ['hr-specialist','Human Resources Specialist','Business & Finance','People operations, hiring, compliance and employee programs.','modern-ats',true],
  ['project-manager','Project Manager','Business & Finance','Delivery, budgets, stakeholder work and milestones in a clear format.','executive',false],
  ['operations-manager','Operations Manager','Business & Finance','Process improvement, service levels and team leadership emphasis.','executive',false],

  ['teacher-educator','Teacher & Educator','Education & Healthcare','Teaching practice, qualifications and student-support achievements.','sts-govt',false],
  ['healthcare-professional','Healthcare Professional','Education & Healthcare','Clinical or health-service credentials and experience in a formal layout.','minimal',true],
  ['medical-clinical','Medical / Clinical','Education & Healthcare','Clinical training, placements, licenses and patient-care experience.','minimal',true],
  ['nonprofit-public-service','Nonprofit & Public Service','Education & Healthcare','Mission-led work, community outcomes and program experience.','modern-ats',false],

  ['creative-portfolio','Creative Portfolio','Creative & Global','Visual profile for creative work, selected projects and portfolio links.','modern-ats',false],
  ['startup-founder','Startup Founder','Creative & Global','Founder profile focused on product, traction, teams and fundraising milestones.','executive',false],
  ['international-cv','Global International CV','Creative & Global','Adaptable international CV layout with clear contact and career sections.','minimal',true],
];

export const RESUME_TEMPLATES: ResumeTemplateDefinition[] = seeds.map((seed, index) => ({
  id: seed[0],
  name: seed[1],
  category: seed[2],
  description: seed[3],
  previewLayout: seed[4],
  atsFriendly: seed[5],
  accentColor: accents[index % accents.length],
  fontSize: sizes[Math.floor(index / 2) % sizes.length],
  fontFamily: fonts[index % fonts.length],
}));

export const resolveResumeTemplate = (id: ResumeTemplateId): ResumeTemplateDefinition =>
  RESUME_TEMPLATES.find((template) => template.id === id) ??
  RESUME_TEMPLATES.find((template) => template.id === 'minimal')!;

export const RESUME_ACCENT_HEX: Record<ResumeAccentColor, string> = {
  emerald: '#047857',
  navy: '#1e3a8a',
  slate: '#475569',
  burgundy: '#9f1239',
  indigo: '#4338ca',
  teal: '#0f766e',
  blue: '#2563eb',
  violet: '#6d28d9',
  rose: '#be123c',
  amber: '#b45309',
};
