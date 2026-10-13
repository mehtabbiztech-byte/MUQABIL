export interface QuickQuizItem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ConceptBlock {
  conceptTitle: string;
  explanation?: string;
  keyTerms?: { term: string; definition: string }[];
  bulletPoints?: string[];
}

export interface ComparisonTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface LicenseTopicNote {
  id: string;
  topicNumber: string;
  title: string;
  readTime: string;
  summary: string;
  highYieldAlert: string;
  concepts: ConceptBlock[];
  comparisonTable?: ComparisonTable;
  classroomApplication?: string;
  mnemonicAid?: string;
  frequentExamQuestions: { question: string; answer: string }[];
  quickQuiz: QuickQuizItem[];
  examDistractorTraps?: string[];
}

export interface LicensePartModule {
  id: string;
  partNumber: number;
  partCategory: 'Part I: Content Knowledge (50%)' | 'Part II: Pedagogical Content Knowledge (50%)';
  subjectName: string;
  weightage: string;
  marks: number;
  targetLevel: string;
  iconName: string;
  themeColor: string;
  badgeBg: string;
  badgeText: string;
  description: string;
  topics: LicenseTopicNote[];
}

export const TEACHING_LICENSE_PARTS: LicensePartModule[] = [
  {
    id: 'steda-part-2-methods-of-teaching',
    partNumber: 6,
    partCategory: 'Part II: Pedagogical Content Knowledge (50%)',
    subjectName: 'Methods of Teaching',
    weightage: '10 MCQs · 10 Marks',
    marks: 10,
    targetLevel: 'Elementary (BPS-16) & Secondary (BPS-17)',
    iconName: 'Lightbulb',
    themeColor: 'from-amber-500 to-orange-600',
    badgeBg: 'bg-amber-500/10',
    badgeText: 'text-amber-600 dark:text-amber-400',
    description: 'Foundational instructional approaches & strategies, direct instruction (Hunter model), constructivist 5E cycle, inductive vs deductive reasoning, cooperative learning (Jigsaw, TPS, STAD), Socratic dialogue, and differentiated instruction for STEDA licensing.',
    topics: [],
  },
  {
    id: 'steda-part-2-child-development',
    partNumber: 7,
    partCategory: 'Part II: Pedagogical Content Knowledge (50%)',
    subjectName: 'Child Development & Educational Psychology',
    weightage: '10 MCQs · 10 Marks',
    marks: 10,
    targetLevel: 'Elementary (BPS-16) & Secondary (BPS-17)',
    iconName: 'Brain',
    themeColor: 'from-purple-600 to-indigo-700',
    badgeBg: 'bg-purple-500/10',
    badgeText: 'text-purple-600 dark:text-purple-400',
    description: 'Cognitive, physical, and socio-emotional development stages (Piaget, Vygotsky, Erikson, Kohlberg), learning theories, motivation, and inclusive education strategies.',
    topics: [],
  },
  {
    id: 'steda-part-2-classroom-management',
    partNumber: 8,
    partCategory: 'Part II: Pedagogical Content Knowledge (50%)',
    subjectName: 'Classroom Management',
    weightage: '10 MCQs · 10 Marks',
    marks: 10,
    targetLevel: 'Elementary (BPS-16) & Secondary (BPS-17)',
    iconName: 'ShieldCheck',
    themeColor: 'from-blue-600 to-cyan-600',
    badgeBg: 'bg-blue-500/10',
    badgeText: 'text-blue-600 dark:text-blue-400',
    description: 'Routines, positive discipline, Jacob Kounin\'s group management techniques (withitness, overlapping, smoothness), conflict resolution, and creating an enabling classroom environment.',
    topics: [],
  },
  {
    id: 'steda-part-2-classroom-assessment',
    partNumber: 9,
    partCategory: 'Part II: Pedagogical Content Knowledge (50%)',
    subjectName: 'Classroom Assessment & Evaluation',
    weightage: '10 MCQs · 10 Marks',
    marks: 10,
    targetLevel: 'Elementary (BPS-16) & Secondary (BPS-17)',
    iconName: 'Award',
    themeColor: 'from-emerald-600 to-teal-700',
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-600 dark:text-emerald-400',
    description: 'Diagnostic, formative, and summative assessments, Bloom\'s revised cognitive taxonomy (Anderson & Krathwohl), test construction, rubrics, and continuous assessment schemes.',
    topics: [],
  },
  {
    id: 'steda-part-2-school-community',
    partNumber: 10,
    partCategory: 'Part II: Pedagogical Content Knowledge (50%)',
    subjectName: 'School, Community & Teacher',
    weightage: '10 MCQs · 10 Marks',
    marks: 10,
    targetLevel: 'Elementary (BPS-16) & Secondary (BPS-17)',
    iconName: 'School',
    themeColor: 'from-rose-600 to-pink-600',
    badgeBg: 'bg-rose-500/10',
    badgeText: 'text-rose-600 dark:text-rose-400',
    description: 'School Management Committees (SMCs), community mobilization, parent-teacher collaboration, Article 25-A, NPSTP standards, and the ethical responsibilities of professional educators.',
    topics: [],
  },
];
