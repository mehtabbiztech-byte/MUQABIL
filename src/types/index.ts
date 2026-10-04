export type ThemeStyle = 
  | 'rose' 
  | 'lavender' 
  | 'galaxy' 
  | 'cyber' 
  | 'emerald' 
  | 'sapphire' 
  | 'sunset' 
  | 'ocean'
  | 'pastel-network'
  | 'pastel-ribbons';

export type UserPersona = 'kids' | 'middle' | 'matric' | 'school' | 'college' | 'intermediate' | 'entry-test' | 'university' | 'jobs' | 'competitive';

export type ExamCategory = 'middle' | 'matric' | 'school' | 'college' | 'intermediate' | 'entry-test' | 'university' | 'jobs' | 'competitive' | 'general';

export type NavigationTab = 
  | 'home' 
  | 'mcqs' 
  | 'quiz' 
  | 'past-papers' 
  | 'past-papers-pdf'
  | 'current-affairs' 
  | 'exams' 
  | 'jobs' 
  | 'resume'
  | 'study-notes' 
  | 'rankings' 
  | 'learning-lab'
  | 'ai-chat'
  | 'about'
  | 'bookmarks'
  | 'mistakes'
  | 'age-calculator';

export * from './resume';

export type ContentStatus = 'Draft' | 'Reviewed' | 'Published';

export interface CmsBase {
  id: string;
  status: ContentStatus;
  sourceUrls: string[];
  syllabusReferences: string[];
  publishAt?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface CmsMcq extends CmsBase {
  kind: 'mcq';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
  subtopic?: string;
  examTags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  normalizedQuestion: string;
  year?: number;
  viewsCount?: number;
  sourceUrl?: string;
  verificationStatus?: 'generated-practice' | 'source-aligned' | 'editor-reviewed' | 'official-paper';
  verificationMethod?: string;
}

export interface CmsPastPaper extends CmsBase {
  kind: 'past-paper';
  title: string;
  exam: string;
  conductedBy: string;
  year: number;
  postName: string;
  bps: string;
  durationMinutes: number;
  questions: Omit<CmsMcq, keyof CmsBase | 'kind'>[];
}

export interface CmsLesson extends CmsBase {
  kind: 'lesson';
  subject: string;
  chapter: string;
  topic: string;
  title: string;
  explanation: string;
  importantPoints: string[];
  examples: string[];
}

export interface MCQ {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
  subtopic?: string;
  examTags?: string[];
  year?: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  viewsCount?: number;
  submittedBy?: string;
  sourceId?: string;
  sourceUrl?: string;
  sourceCheckedOn?: string;
  verificationStatus?: 'generated-practice' | 'source-aligned' | 'editor-reviewed' | 'official-paper';
  verificationMethod?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  totalMcqs: number;
  subtopics: string[];
  featured?: boolean;
}

export interface ExamInfo {
  id: string;
  name: string;
  shortName: string;
  fullName: string;
  conductedBy: string;
  category: ExamCategory;
  subCategory?: string;
  targetAudience?: string;
  description: string;
  eligibility: string;
  ageLimit: string;
  screeningStructure: string;
  syllabus: {
    section: string;
    weightage?: string;
    topics: string[];
  }[];
  subjects: string[];
  pastPapersCount: number;
  mockTestsCount: number;
  resources: {
    title: string;
    type: 'Guide' | 'Book' | 'Syllabus PDF' | 'Official Link';
    url?: string;
    description: string;
  }[];
}

export interface PastPaper {
  id: string;
  title: string;
  exam: string;
  conductedBy: string;
  year: number;
  postName: string;
  bps: string;
  totalQuestions: number;
  durationMinutes?: number;
  solvedDate?: string;
  mcqs: MCQ[];
  recordType?: 'Official Past Paper' | 'Official Sample Paper' | 'Official Answer Key / Date Record' | 'Reconstructed Practice Paper';
  testDateLabel?: string;
  sourceUrl?: string;
  sourceNote?: string;
}

export interface JobAlert {
  id: string;
  title: string;
  department: string;
  agency: string;
  commission?: string;
  location: string;
  bps: string;
  postsCount: number;
  vacancies?: number;
  lastDate: string;
  publishedDate?: string;
  eligibility: string;
  qualification?: string;
  experience?: string;
  ageLimit?: string;
  applicationMethod?: string;
  examCategory?: string;
  advertisementNo: string;
  sourceUrl?: string;
  applyUrl?: string;
  sourceLabel?: string;
  verifiedAt?: string;
  status: 'Active' | 'Closing Soon' | 'Announced' | 'Walk-in';
}

export interface StudyNote {
  id: string;
  title: string;
  subject: string;
  category?: string;
  readTime: string;
  keyPoints: string[];
  summary: string;
  frequentlyAsked: string[];
  tags?: string[];
}

export interface StudyLesson {
  id: string;
  title: string;
  audience: 'kids' | 'advanced';
  readTime: string;
  explanation: string;
  examples: string[];
  importantPoints: string[];
  images?: { src: string; alt: string; caption?: string }[];
  tables?: { title: string; headers: string[]; rows: string[][] }[];
  formulas?: string[];
  mcqs: MCQ[];
  practice: { prompt: string; answer: string }[];
  references?: { title: string; url: string }[];
  relatedQuestionIds: string[];
}

export interface StudySubject {
  id: string;
  title: string;
  chapters: { id: string; title: string; topics: {
    id: string; title: string; lessons: StudyLesson[];
  }[] }[];
}

export interface RankingUser {
  id: string;
  name: string;
  avatar: string;
  city: string;
  province: string;
  points: number;
  quizzesTaken: number;
  accuracyRate: number;
  streakDays: number;
  rank: number;
  badge: string;
}

export interface CurrentAffairItem {
  id: string;
  title: string;
  category: 'Pakistan' | 'International';
  scope?: 'Pakistan' | 'International';
  date: string;
  monthYear?: string;
  summary: string;
  importance: 'High' | 'Medium';
  bullets?: string[];
  tags?: string[];
  relatedMcq?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export type RankTier = 
  | 'Gold Distinction' 
  | 'Silver Merit' 
  | 'Bronze Honor' 
  | 'Certified Aspirant' 
  | 'Participation';

export interface QuizCertificate {
  id: string;
  quizId: string;
  candidateName: string;
  quizTitle: string;
  category: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  grade: string;
  rankTier: RankTier;
  rankPosition: number;
  percentile: number;
  timeSpentSeconds: number;
  issuedDate: string;
  verificationCode: string;
}

export interface QuizAttempt {
  id: string;
  date: string;
  title: string;
  totalQuestions: number;
  score: number;
  timeSpentSeconds: number;
  incorrectQuestions: {
    mcq: MCQ;
    selectedIndex: number;
  }[];
  certificate?: QuizCertificate;
  certificateId?: string;
  rankTier?: RankTier;
  rankPosition?: number;
  percentile?: number;
}

export interface UserProfile {
  name: string;
  email: string;
  targetExam: string;
  province: string;
  persona?: UserPersona;
  gradeOrClass?: string;
  points: number;
  streakDays: number;
  bookmarks: string[]; // MCQ IDs
  mistakeIds: string[]; // MCQ IDs
  quizHistory: QuizAttempt[];
  certificates?: QuizCertificate[];
}
