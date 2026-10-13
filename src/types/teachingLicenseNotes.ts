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
