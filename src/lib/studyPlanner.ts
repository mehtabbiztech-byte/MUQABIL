import { POPULAR_CATEGORIES } from '../data/categoriesData';
import { STS_SYLLABI } from '../data/stsSyllabi';

export type PreparationMode = 'mcqs' | 'notes' | 'mcqs-notes' | 'mock-tests' | 'complete';
export type CurrentLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type PlannerTaskKind = 'learn' | 'mcq' | 'notes' | 'revision' | 'mock' | 'analysis' | 'light-review';
export type StudyPhase = 'foundation' | 'practice' | 'final-revision' | 'exam-day';

export interface PlannerSubject {
  slug: string;
  name: string;
  description: string;
  subtopics: string[];
  totalMcqs: number;
}

export interface StudyPosition {
  id: string;
  name: string;
  subjectSlugs: string[];
  syllabusRefId?: string;
}

export interface StudyOrganization {
  id: string;
  name: string;
  positions: StudyPosition[];
}

export interface StudyPlannerForm {
  organizationId: string;
  positionId: string;
  customPosition: string;
  subjectSlugs: string[];
  preparationMode: PreparationMode;
  currentLevel: CurrentLevel;
  examDate: string;
  dailyStudyMinutes: number;
  targetScore: 'pass' | '70' | '80' | '90' | 'merit';
  weakAreas: string[];
}

export interface PlannerTopic {
  id: string;
  subjectSlug: string;
  subjectName: string;
  subtopic: string;
  sectionName?: string;
  sectionWeight?: number;
  syllabusRecordId?: string;
}

export interface StudyPlannerTask {
  id: string;
  kind: PlannerTaskKind;
  title: string;
  detail: string;
  durationMinutes: number;
  subjectSlug?: string;
  subtopic?: string;
  topicId?: string;
  sectionName?: string;
  sectionWeight?: number;
  targetCount?: number;
}

export interface StudyDay {
  date: string;
  dayNumber: number;
  weekNumber: number;
  phase: StudyPhase;
  focus: string;
  topics: PlannerTopic[];
  studyMinutes: number;
  budgetMinutes: number;
  mcqTarget: number;
  tasks: StudyPlannerTask[];
}

export interface MockSubjectScore {
  subjectSlug: string;
  score: number;
  total: number;
}

export interface MockAttempt {
  id: string;
  date: string;
  score: number;
  total: number;
  recordedAt: string;
  source?: 'manual' | 'quiz';
  subjectScores?: MockSubjectScore[];
  completedTaskId?: string;
}

export type MistakeReason = 'factual' | 'distractor' | 'time' | 'guessing' | 'unspecified';

export interface VaultMistakeItem {
  id: string;
  planId: string;
  questionId?: string;
  question: string;
  options: string[];
  correctIndex: number;
  userSelected?: number;
  explanation: string;
  subjectSlug: string;
  subtopic?: string;
  reason?: MistakeReason;
  createdAt: string;
  lastReviewedAt?: string;
  nextReviewDate: string; // YYYY-MM-DD
  intervalDays: number;
  repetitionCount: number;
  easeFactor: number; // default 2.5
  status: 'learning' | 'review' | 'mastered';
}

export type VaultReviewRating = 'again' | 'hard' | 'good' | 'easy';

export interface VaultStats {
  totalCards: number;
  dueCards: number;
  masteredCards: number;
  learningCards: number;
  retentionRate: number; // 0-100%
  topTraps: { subjectSlug: string; count: number; reason: MistakeReason }[];
}

export interface MeritProjection {
  projectedMinScore: number;
  projectedMaxScore: number;
  projectedMedian: number;
  targetPercent: number;
  passingLikelihood: number; // 0-100%
  meritRankLikelihood: number; // 0-100%
  tier: 'elite' | 'competitive' | 'on-track' | 'needs-focus';
  tierLabel: string;
  recommendations: string[];
  subjectStrengths: { subjectSlug: string; subjectName: string; scorePercent: number; status: 'strong' | 'average' | 'weak' }[];
}

export interface TopicHighYieldSprint {
  topicTitle: string;
  subjectName: string;
  keyFormulasAndRules: string[];
  examDistractorTrap: string;
  quickRecallCards: { prompt: string; answer: string; mnemonic?: string }[];
}

export const getMockSubjectScoresFromQuiz = (
  questions: ReadonlyArray<{ category: string; correctIndex: number }>,
  answers: Record<number, number>,
): MockSubjectScore[] => {
  const totals = new Map<string, MockSubjectScore>();
  questions.forEach((question, index) => {
    const subjectSlug = normalizeWeakArea(question.category);
    if (!subjectSlug) return;
    const result = totals.get(subjectSlug) ?? { subjectSlug, score: 0, total: 0 };
    result.total += 1;
    if (answers[index] === question.correctIndex) result.score += 1;
    totals.set(subjectSlug, result);
  });
  return [...totals.values()];
};

export interface StoredStudyPlan {
  id: string;
  generatedAt: string;
  updatedAt?: string;
  startDate: string;
  form: StudyPlannerForm;
  completedTaskIds: string[];
  completedTaskDates?: Record<string, string>;
  completedTopicIds?: string[];
  completedSubtopicIds: string[];
  plannedTopicIds?: string[];
  mockAttempts: MockAttempt[];
  aiPersonalizationRequested?: boolean;
  aiPlanStatus?: 'pending' | 'ready' | 'offline';
  aiPlanAdvice?: string;
}

export interface StudyPlannerCollection {
  activePlanId: string | null;
  plans: StoredStudyPlan[];
}

export interface StudyScheduleOptions {
  topicIds?: string[];
  mockAttempts?: MockAttempt[];
}

export interface PlannerTaskHandoff {
  planId: string;
  subjectSlug?: string;
  subtopic?: string;
}

export interface PlannerQuizLaunch extends PlannerTaskHandoff {
  taskId: string;
  questionCount: number;
  examName: string;
}

export interface PlanFeasibility {
  totalTopics: number;
  availableDays: number;
  learningDays: number;
  topicsPerDayCapacity: number;
  requiredTopicsPerDay: number;
  estimatedMinutesPerDay: number;
  feasible: boolean;
  overloadedByTopicsPerDay: number;
}

export interface PlannerProgress {
  completedTasks: number;
  totalTasks: number;
  taskCompletionPercent: number;
  completedSubtopics: number;
  totalSubtopics: number;
  syllabusCoveragePercent: number;
  activeDays: number;
  currentStreak: number;
  averageMockScore: number | null;
  targetScorePercent: number;
  readinessScore: number;
  badges: Array<{ id: string; title: string; description: string; icon: string }>;
}

const CORE_SCREENING = ['english', 'mathematics', 'general-knowledge', 'current-affairs', 'pakistan-studies', 'islamic-studies'];
const GENERAL_RECRUITMENT = [...CORE_SCREENING, 'computer', 'everyday-science'];
const BROAD_COMPETITIVE = [
  'english', 'current-affairs', 'pakistan-affairs', 'pakistan-studies', 'general-knowledge',
  'islamic-studies', 'everyday-science', 'mathematics', 'geography', 'history', 'economics',
  'political-science', 'international-relations',
];
const TEACHING = [
  'english', 'mathematics', 'everyday-science', 'pakistan-studies', 'islamic-studies',
  'urdu', 'sindhi', 'pedagogy', 'computer',
];

const position = (id: string, name: string, subjectSlugs: string[], syllabusRefId?: string): StudyPosition => ({
  id,
  name,
  subjectSlugs,
  ...(syllabusRefId ? { syllabusRefId } : {}),
});

export const STUDY_ORGANIZATIONS: StudyOrganization[] = [
  {
    id: 'sts', name: 'STS (Sukkur IBA Testing Services)', positions: [
      position('graduation-bps-05-15', 'Graduation category · BPS 05–15', GENERAL_RECRUITMENT, 'screen-grad-2025'),
      position('intermediate-bps-05-15', 'Intermediate category · BPS 05–15', GENERAL_RECRUITMENT, 'screen-inter-2026'),
      position('matric-bps-05-15', 'Matriculation category · BPS 05–15', GENERAL_RECRUITMENT, 'screen-matric-2025'),
      position('pst-jest', 'PST / JEST educator screening', TEACHING),
      position('junior-clerk', 'Junior Clerk / clerical recruitment', ['english', 'computer', 'general-knowledge', 'current-affairs', 'pakistan-affairs', 'mathematics']),
      position('police-asi', 'Sindh Police ASI', ['english', 'urdu', 'sindhi', 'mathematics', 'general-knowledge', 'pakistan-affairs', 'current-affairs', 'computer'], 'sindh-police-asi-2025'),
      position('teaching-license', 'Sindh Teaching License (STEDA)', TEACHING, 'steda-teaching-license-2024'),
      position('custom', 'Custom position…', GENERAL_RECRUITMENT),
    ],
  },
  {
    id: 'fpsc', name: 'FPSC', positions: [
      position('css-mpt', 'CSS MPT', BROAD_COMPETITIVE),
      position('one-paper', 'General recruitment · one-paper screening', GENERAL_RECRUITMENT),
      position('assistant-director', 'Assistant Director / Inspector', [...GENERAL_RECRUITMENT, 'pakistan-affairs', 'history']),
      position('custom', 'Custom position…', GENERAL_RECRUITMENT),
    ],
  },
  {
    id: 'spsc', name: 'SPSC', positions: [
      position('cce-screening', 'Combined Competitive Examination (CCE)', BROAD_COMPETITIVE),
      position('section-officer', 'Section Officer / Assistant Director', [...GENERAL_RECRUITMENT, 'pakistan-affairs', 'political-science']),
      position('lecturer', 'Lecturer / subject specialist', ['english', 'general-knowledge', 'current-affairs', 'pakistan-studies', 'islamic-studies', 'pedagogy']),
      position('custom', 'Custom position…', GENERAL_RECRUITMENT),
    ],
  },
  {
    id: 'ppsc', name: 'PPSC', positions: [
      position('pms', 'Punjab PMS / competitive screening', BROAD_COMPETITIVE),
      position('one-paper', 'General recruitment · one-paper screening', GENERAL_RECRUITMENT),
      position('lecturer', 'Lecturer / educator', ['english', 'general-knowledge', 'current-affairs', 'pakistan-studies', 'islamic-studies', 'pedagogy']),
      position('custom', 'Custom position…', GENERAL_RECRUITMENT),
    ],
  },
  {
    id: 'bpsc', name: 'BPSC', positions: [
      position('balochistan-competitive', 'Balochistan competitive examination', BROAD_COMPETITIVE),
      position('one-paper', 'General recruitment · one-paper screening', GENERAL_RECRUITMENT),
      position('lecturer', 'Lecturer / subject specialist', ['english', 'general-knowledge', 'current-affairs', 'pakistan-studies', 'islamic-studies', 'pedagogy']),
      position('custom', 'Custom position…', GENERAL_RECRUITMENT),
    ],
  },
  {
    id: 'kppsc', name: 'KPPSC', positions: [
      position('kpk-pms', 'Khyber Pakhtunkhwa PMS', BROAD_COMPETITIVE),
      position('one-paper', 'General recruitment · one-paper screening', GENERAL_RECRUITMENT),
      position('lecturer', 'Lecturer / educator', ['english', 'general-knowledge', 'current-affairs', 'pakistan-studies', 'islamic-studies', 'pedagogy']),
      position('custom', 'Custom position…', GENERAL_RECRUITMENT),
    ],
  },
  {
    id: 'nts', name: 'NTS', positions: [
      position('nat', 'NAT · National Aptitude Test', ['english', 'mathematics', 'general-knowledge', 'computer', 'everyday-science']),
      position('gat-general', 'GAT General', ['english', 'mathematics', 'general-knowledge', 'economics']),
      position('recruitment', 'Recruitment screening test', GENERAL_RECRUITMENT),
      position('custom', 'Custom position…', GENERAL_RECRUITMENT),
    ],
  },
  {
    id: 'iba-sukkur', name: 'IBA Sukkur', positions: [
      position('undergraduate-admission', 'Undergraduate admission test', ['english', 'mathematics', 'general-knowledge', 'computer']),
      position('graduate-admission', 'Graduate admission / aptitude test', ['english', 'mathematics', 'general-knowledge', 'economics']),
      position('custom', 'Custom position…', GENERAL_RECRUITMENT),
    ],
  },
  {
    id: 'hec', name: 'HEC', positions: [
      position('hat-general', 'HAT · General', ['english', 'mathematics', 'general-knowledge', 'computer']),
      position('hat-subject', 'HAT · Subject / discipline-specific', ['english', 'mathematics', 'biology', 'chemistry', 'physics']),
      position('lat', 'Law Admission Test (LAT)', ['english', 'general-knowledge', 'pakistan-studies', 'islamic-studies']),
      position('custom', 'Custom position…', GENERAL_RECRUITMENT),
    ],
  },
  {
    id: 'teaching-license', name: 'Teaching License', positions: [
      position('sindh-elementary', 'Sindh Teaching License · Elementary', TEACHING, 'steda-teaching-license-2024'),
      position('sindh-secondary', 'Sindh Teaching License · Secondary', TEACHING, 'steda-teaching-license-2024'),
      position('custom', 'Custom license / teaching test…', TEACHING),
    ],
  },
  {
    id: 'police-recruitment', name: 'Police Recruitment', positions: [
      position('constable', 'Police Constable', ['english', 'mathematics', 'general-knowledge', 'pakistan-affairs', 'computer']),
      position('asi', 'ASI / Head Constable', ['english', 'mathematics', 'general-knowledge', 'pakistan-affairs', 'computer']),
      position('sub-inspector', 'Sub-Inspector', ['english', 'mathematics', 'general-knowledge', 'pakistan-affairs', 'current-affairs', 'computer']),
      position('custom', 'Custom police position…', GENERAL_RECRUITMENT),
    ],
  },
  {
    id: 'custom-test', name: 'Custom Test', positions: [
      position('custom', 'Add your test / position…', GENERAL_RECRUITMENT),
    ],
  },
];

const SUBJECTS_BY_SLUG = new Map<string, PlannerSubject>();
for (const category of POPULAR_CATEGORIES) {
  if (!SUBJECTS_BY_SLUG.has(category.slug)) {
    SUBJECTS_BY_SLUG.set(category.slug, {
      slug: category.slug,
      name: category.name,
      description: category.description,
      subtopics: category.subtopics?.length ? [...category.subtopics] : ['Core concepts', 'Practice and review'],
      totalMcqs: category.totalMcqs,
    });
  }
}

export const PLANNER_SUBJECTS = [...SUBJECTS_BY_SLUG.values()];
export const MAX_PLAN_HORIZON_DAYS = 730;
export const MAX_STORED_STUDY_PLANS = 20;
export const STUDY_PLANNER_STORAGE_KEY = 'muqabil_smart_study_planner_v1';
export const STUDY_PLANS_STORAGE_KEY = 'muqabil_smart_study_plans_v2';
export const STUDY_PLANNER_SYNC_KEY = 'muqabil_smart_study_planner_cloud_sync_v1';
export const STUDY_PLANNER_TASK_HANDOFF_KEY = 'muqabil_study_planner_task_handoff';
export const STUDY_PLANNER_QUIZ_LAUNCH_KEY = 'muqabil_study_planner_quiz_launch';
export const WEAK_AREAS = PLANNER_SUBJECTS.map((subject) => subject.slug);
export type WeakArea = string;

const WEAK_AREA_ALIASES: Record<string, string> = {
  english: 'english',
  mathematics: 'mathematics',
  'current affairs': 'current-affairs',
  'general knowledge': 'general-knowledge',
  gk: 'general-knowledge',
  computer: 'computer',
  'islamic studies': 'islamic-studies',
  islamiat: 'islamic-studies',
  pedagogy: 'pedagogy',
  'general science': 'everyday-science',
  'pakistan studies': 'pakistan-studies',
  'pakistan affairs': 'pakistan-affairs',
};

export const normalizeWeakArea = (area: unknown): string | null => {
  if (typeof area !== 'string') return null;
  if (SUBJECTS_BY_SLUG.has(area)) return area;
  const normalized = area.trim().toLowerCase().replace(/[_-]+/g, ' ');
  const alias = WEAK_AREA_ALIASES[normalized];
  if (alias && SUBJECTS_BY_SLUG.has(alias)) return alias;
  return PLANNER_SUBJECTS.find((subject) => subject.name.trim().toLowerCase() === normalized)?.slug ?? null;
};

export const getWeakAreaName = (slug: string): string =>
  SUBJECTS_BY_SLUG.get(slug)?.name ?? slug;

export const PREPARATION_MODES: Array<{ id: PreparationMode; label: string; description: string }> = [
  { id: 'mcqs', label: 'MCQs Only', description: 'Timed questions, accuracy drills and mistake review.' },
  { id: 'notes', label: 'Notes Only', description: 'Focused reading, note-making and spaced revision.' },
  { id: 'mcqs-notes', label: 'MCQs + Notes', description: 'Balance concept review with active recall.' },
  { id: 'mock-tests', label: 'Mock Tests Only', description: 'Timed mock tests followed by careful score analysis.' },
  { id: 'complete', label: 'Complete Preparation', description: 'Topics, MCQs, notes, revision and weekly mock tests.' },
];

export const CURRENT_LEVELS: Array<{ id: CurrentLevel; label: string; description: string }> = [
  { id: 'beginner', label: 'Beginner', description: 'Build the foundations first.' },
  { id: 'intermediate', label: 'Intermediate', description: 'Strengthen recall and speed.' },
  { id: 'advanced', label: 'Advanced', description: 'Focus on application and exam traps.' },
  { id: 'expert', label: 'Expert', description: 'Polish accuracy and high-yield details.' },
];

export const DAILY_TIME_PRESETS = [
  { id: '30', label: '30 min', minutes: 30 },
  { id: '60', label: '1 hour', minutes: 60 },
  { id: '120', label: '2 hours', minutes: 120 },
  { id: '180', label: '3 hours', minutes: 180 },
  { id: '240', label: '4 hours', minutes: 240 },
  { id: '300', label: '5+ hours', minutes: 330 },
] as const;

export const TARGET_SCORE_OPTIONS = [
  { id: 'pass', label: 'Pass Test', percent: 60, detail: 'Secure the qualifying fundamentals' },
  { id: '70', label: '70%', percent: 70, detail: 'Build a comfortable pass margin' },
  { id: '80', label: '80%', percent: 80, detail: 'Aim for strong competitive performance' },
  { id: '90', label: '90%', percent: 90, detail: 'Push for high accuracy' },
  { id: 'merit', label: 'Top Merit Position', percent: 95, detail: 'Maximise consistency across the syllabus' },
] as const;

export const getOrganization = (organizationId: string): StudyOrganization =>
  STUDY_ORGANIZATIONS.find((item) => item.id === organizationId) ?? STUDY_ORGANIZATIONS[0];

export const getPosition = (organizationId: string, positionId: string): StudyPosition => {
  const organization = getOrganization(organizationId);
  return organization.positions.find((item) => item.id === positionId) ?? organization.positions[0];
};

export const getPositionName = (form: StudyPlannerForm): string => {
  const selected = getPosition(form.organizationId, form.positionId);
  if (form.positionId === 'custom' && form.customPosition.trim()) return form.customPosition.trim();
  return selected.name.replace(/…$/, '').trim();
};

export const getSyllabusRecord = (form: StudyPlannerForm) => {
  const selected = getPosition(form.organizationId, form.positionId);
  if (!selected.syllabusRefId) return null;
  return STS_SYLLABI.find((item) => item.id === selected.syllabusRefId) ?? null;
};

export const getOrganizationPositions = (organizationId: string): StudyPosition[] =>
  getOrganization(organizationId).positions;

export const getSubjectsForPosition = (organizationId: string, positionId: string): PlannerSubject[] => {
  const selectedPosition = getPosition(organizationId, positionId);
  return selectedPosition.subjectSlugs
    .map((slug) => SUBJECTS_BY_SLUG.get(slug))
    .filter((subject): subject is PlannerSubject => Boolean(subject));
};

export const getPlannerSubjects = (subjectSlugs: string[]): PlannerSubject[] => {
  const uniqueSlugs = [...new Set(subjectSlugs)];
  return uniqueSlugs
    .map((slug) => SUBJECTS_BY_SLUG.get(slug))
    .filter((subject): subject is PlannerSubject => Boolean(subject));
};

export const getTopicCount = (subjectSlugs: string[]): number =>
  getPlannerSubjects(subjectSlugs).reduce((total, subject) => total + subject.subtopics.length, 0);

const getOfficialTopicSubjectSlugs = (
  sectionName: string,
  topicTitle: string,
  selectedSlugs: Set<string>,
): string[] => {
  const section = sectionName.toLowerCase();
  const topic = topicTitle.toLowerCase();
  const candidates: string[] = [];

  if (/mother tongue/.test(section)) {
    if (/urdu/.test(topic)) candidates.push('urdu');
    if (/sindhi/.test(topic)) candidates.push('sindhi');
    if (!candidates.length) candidates.push('urdu', 'sindhi');
  } else {
    // Prefer the listed topic itself over a broad section label (e.g. maths inside
    // an early-learning assessment section) to keep source topics accurately mapped.
    if (/english|language and literacy|\bliteracy\b|grammar|reading comprehension|prepositions|vocabulary|spelling|synonyms|antonyms/.test(topic)) candidates.push('english');
    if (/mathematics|\bmath\b|arithmetic|numeracy|fractions|percentages|ratio|proportion|geometry|mensuration|data handling/.test(topic)) candidates.push('mathematics');
    if (/everyday science|\bscience\b|biology|living things|cell biology|plant processes|photosynthesis|atoms|energy|forces|matter/.test(topic)) candidates.push('everyday-science');
    if (/computer|ms office|it skills|web search|information technology/.test(topic)) candidates.push('computer');
    if (/current affairs/.test(topic)) candidates.push('current-affairs');
    if (/world knowledge|world around us|international/.test(topic)) candidates.push('general-knowledge');
    if (/islamiat|islamic/.test(topic)) candidates.push('islamic-studies');
    if (/pakistan affairs/.test(topic)) candidates.push('pakistan-affairs');
    if (/pakistan studies|pak studies|pakistan history|indus valley|sindh heritage|constitution of pakistan|geography of pakistan/.test(topic)) candidates.push('pakistan-studies');
    if (/\biq\b/.test(topic)) candidates.push('general-knowledge');
    if (/reasoning|aptitude|arithmetic|word problem/.test(topic)) candidates.push('mathematics');
    if (/social and emotional|child|development|learning theory|classroom|instruction|play-based|assessment|creative arts|health and nutrition|physical development|child rights|behavior|discipline|inclusive education|professional ethics/.test(topic)) candidates.push('pedagogy');

    if (!candidates.length) {
      if (/current affairs/.test(section)) candidates.push('current-affairs');
      else if (/english/.test(section)) candidates.push('english');
      else if (/mathematics|\bmath\b/.test(section)) candidates.push('mathematics');
      else if (/science/.test(section)) candidates.push('everyday-science');
      else if (/social studies|pakistan studies|pak studies/.test(section)) candidates.push('pakistan-studies');
      else if (/computer|\bit skills\b|information technology/.test(section)) candidates.push('computer');
      else if (/pedagogy|teaching|learning|child development|child wellbeing|classroom|assessment|curriculum|professional ethics|instructional strategies/.test(section)) candidates.push('pedagogy');
      else candidates.push('general-knowledge');
    }
  }

  return [...new Set(candidates)].filter((slug) => selectedSlugs.has(slug));
};

/**
 * Returns the actual topic units used by the planner. A position-linked source
 * syllabus wins where it can be mapped to selected MUQABIL subjects; unmapped
 * selected subjects retain their bank topics rather than silently disappearing.
 */
export const getStudyPlanTopics = (form: StudyPlannerForm): PlannerTopic[] => {
  const subjects = getPlannerSubjects(form.subjectSlugs);
  const selectedSlugs = new Set(subjects.map((subject) => subject.slug));
  const record = getSyllabusRecord(form);
  const officialTopics: PlannerTopic[] = [];
  const officialSlugs = new Set<string>();

  if (record) {
    record.sections.forEach((section, sectionIndex) => {
      section.topics.forEach((topicTitle, topicIndex) => {
        getOfficialTopicSubjectSlugs(section.name, topicTitle, selectedSlugs).forEach((subjectSlug) => {
          const subject = SUBJECTS_BY_SLUG.get(subjectSlug);
          if (!subject) return;
          officialSlugs.add(subjectSlug);
          officialTopics.push({
            id: `official:${record.id}:${sectionIndex}:${topicIndex}:${subjectSlug}`,
            subjectSlug,
            subjectName: subject.name,
            subtopic: topicTitle,
            sectionName: section.name,
            sectionWeight: section.percent,
            syllabusRecordId: record.id,
          });
        });
      });
    });
  }

  const bankTopics = subjects
    .filter((subject) => !officialSlugs.has(subject.slug))
    .flatMap((subject) => subject.subtopics.map((subtopic, index): PlannerTopic => ({
      id: `${subject.slug}::${index}`,
      subjectSlug: subject.slug,
      subjectName: subject.name,
      subtopic,
    })));

  return [...officialTopics, ...bankTopics];
};

const pad2 = (value: number) => String(value).padStart(2, '0');

export const toLocalDateString = (date: Date): string =>
  `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;

export const addDaysToDateString = (dateString: string, days: number): string => {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + days));
  return `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())}`;
};

export const daysBetweenDates = (startDate: string, endDate: string): number => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) return 0;
  const [startYear, startMonth, startDay] = startDate.split('-').map(Number);
  const [endYear, endMonth, endDay] = endDate.split('-').map(Number);
  const start = Date.UTC(startYear, startMonth - 1, startDay);
  const end = Date.UTC(endYear, endMonth - 1, endDay);
  return Math.round((end - start) / 86_400_000);
};

export const formatDateInput = (date: Date): string => toLocalDateString(date);

export const createDefaultStudyPlannerForm = (today = toLocalDateString(new Date())): StudyPlannerForm => {
  const organizationId = 'sts';
  const positionId = 'graduation-bps-05-15';
  return {
    organizationId,
    positionId,
    customPosition: '',
    subjectSlugs: getSubjectsForPosition(organizationId, positionId).map((subject) => subject.slug),
    preparationMode: 'complete',
    currentLevel: 'beginner',
    examDate: addDaysToDateString(today, 60),
    dailyStudyMinutes: 60,
    targetScore: '70',
    weakAreas: ['english', 'mathematics'],
  };
};

export const createStudyPlanRecord = (form: StudyPlannerForm, now = new Date()): StoredStudyPlan => ({
  id: `study-plan-${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`,
  generatedAt: now.toISOString(),
  updatedAt: now.toISOString(),
  startDate: toLocalDateString(now),
  form: {
    ...form,
    subjectSlugs: [...new Set(form.subjectSlugs)],
    weakAreas: [...new Set(form.weakAreas.map(normalizeWeakArea).filter((slug): slug is string => Boolean(slug)))],
  },
  completedTaskIds: [],
  completedTaskDates: {},
  completedTopicIds: [],
  completedSubtopicIds: [],
  mockAttempts: [],
});

const getFinalRevisionDays = (totalDays: number): number =>
  totalDays > 3 ? Math.max(2, Math.ceil(totalDays * 0.18)) : 0;

const getPhase = (dayIndex: number, totalDays: number, isExamDay: boolean): StudyPhase => {
  if (isExamDay && dayIndex === 0) return 'exam-day';
  if (totalDays <= 3) return 'final-revision';
  const finalRevisionDays = getFinalRevisionDays(totalDays);
  if (dayIndex >= totalDays - finalRevisionDays) return 'final-revision';
  const foundationDays = Math.max(1, Math.floor(totalDays * 0.45));
  return dayIndex < foundationDays ? 'foundation' : 'practice';
};

export const getDailyMcqTarget = (form: StudyPlannerForm): number => {
  if (form.preparationMode === 'notes' || form.preparationMode === 'mock-tests') return 0;
  const hourlyRate = form.preparationMode === 'mcqs' ? 28 : form.preparationMode === 'mcqs-notes' ? 18 : 16;
  const levelMultiplier: Record<CurrentLevel, number> = {
    beginner: 0.8,
    intermediate: 1,
    advanced: 1.15,
    expert: 1.3,
  };
  const targetMultiplier = form.targetScore === 'merit' ? 1.2 : form.targetScore === '90' ? 1.12 : form.targetScore === '80' ? 1.06 : 1;
  const rawTarget = (form.dailyStudyMinutes / 60) * hourlyRate * levelMultiplier[form.currentLevel] * targetMultiplier;
  return Math.max(5, Math.round(rawTarget / 5) * 5);
};

const minutesPerTopic = (mode: PreparationMode): number => ({
  mcqs: 20,
  notes: 30,
  'mcqs-notes': 40,
  'mock-tests': 0,
  complete: 45,
}[mode]);

const getDailyTopicCapacity = (form: StudyPlannerForm): number => {
  if (form.preparationMode === 'mock-tests') return 0;
  return Math.max(1, Math.min(3, Math.floor(form.dailyStudyMinutes / minutesPerTopic(form.preparationMode))));
};

export const getPlanFeasibility = (
  form: StudyPlannerForm,
  startDate: string,
  topicCountOverride?: number,
): PlanFeasibility => {
  const rawDayCount = daysBetweenDates(startDate, form.examDate);
  const availableDays = rawDayCount < 0 ? 0 : Math.min(MAX_PLAN_HORIZON_DAYS, Math.max(1, rawDayCount));
  const finalRevisionDays = availableDays > 5 ? getFinalRevisionDays(availableDays) : 0;
  const learningDays = availableDays ? Math.max(1, availableDays - finalRevisionDays) : 0;
  const totalTopics = topicCountOverride ?? getStudyPlanTopics(form).length;
  const topicsPerDayCapacity = getDailyTopicCapacity(form);
  const requiredTopicsPerDay = form.preparationMode === 'mock-tests' || !learningDays
    ? 0
    : Math.ceil(totalTopics / learningDays);
  const feasible = form.preparationMode === 'mock-tests'
    || (learningDays > 0 && requiredTopicsPerDay <= topicsPerDayCapacity);
  const estimatedMinutesPerDay = form.preparationMode === 'mock-tests'
    ? form.dailyStudyMinutes
    : Math.max(form.dailyStudyMinutes, requiredTopicsPerDay * minutesPerTopic(form.preparationMode) + 10);

  return {
    totalTopics,
    availableDays,
    learningDays,
    topicsPerDayCapacity,
    requiredTopicsPerDay,
    estimatedMinutesPerDay,
    feasible,
    overloadedByTopicsPerDay: Math.max(0, requiredTopicsPerDay - topicsPerDayCapacity),
  };
};

const getSubjectAccuracy = (attempts: MockAttempt[]): Map<string, number> => {
  const totals = new Map<string, { score: number; total: number }>();
  attempts.forEach((attempt) => attempt.subjectScores?.forEach((subjectScore) => {
    if (!SUBJECTS_BY_SLUG.has(subjectScore.subjectSlug) || subjectScore.total <= 0) return;
    const current = totals.get(subjectScore.subjectSlug) ?? { score: 0, total: 0 };
    current.score += Math.max(0, Math.min(subjectScore.total, subjectScore.score));
    current.total += subjectScore.total;
    totals.set(subjectScore.subjectSlug, current);
  }));
  return new Map([...totals].map(([slug, result]) => [slug, result.total ? result.score / result.total : 0]));
};

const getWeightedTopicOrder = (
  topics: PlannerTopic[],
  form: StudyPlannerForm,
  attempts: MockAttempt[],
): PlannerTopic[] => {
  const accuracyBySubject = getSubjectAccuracy(attempts);
  const weakSubjects = new Set(form.weakAreas.map(normalizeWeakArea).filter((slug): slug is string => Boolean(slug)));
  const groups = new Map<string, { topics: PlannerTopic[]; weight: number; index: number }>();

  topics.forEach((topic) => {
    const key = topic.sectionName ? `section:${topic.sectionName}` : `subject:${topic.subjectSlug}`;
    const accuracy = accuracyBySubject.get(topic.subjectSlug);
    const weakMultiplier = weakSubjects.has(topic.subjectSlug) ? 1.4 : 1;
    const performanceMultiplier = accuracy === undefined ? 1 : accuracy < 0.45 ? 2.4 : accuracy < 0.6 ? 1.8 : accuracy < 0.75 ? 1.45 : accuracy < 0.85 ? 1.15 : 0.85;
    const officialWeight = topic.sectionWeight ? topic.sectionWeight / 100 : 1;
    const nextWeight = Math.max(0.1, officialWeight * weakMultiplier * performanceMultiplier);
    const existing = groups.get(key);
    if (existing) {
      existing.topics.push(topic);
      existing.weight = Math.max(existing.weight, nextWeight);
    } else {
      groups.set(key, { topics: [topic], weight: nextWeight, index: 0 });
    }
  });

  const ordered: PlannerTopic[] = [];
  while (ordered.length < topics.length) {
    let bestGroup: { topics: PlannerTopic[]; weight: number; index: number } | null = null;
    let bestPriority = -1;
    groups.forEach((group) => {
      if (group.index >= group.topics.length) return;
      const priority = group.weight / (group.index + 1);
      if (priority > bestPriority) {
        bestPriority = priority;
        bestGroup = group;
      }
    });
    if (!bestGroup) break;
    ordered.push(bestGroup.topics[bestGroup.index]);
    bestGroup.index += 1;
  }
  return ordered;
};

const makeTask = (
  dayDate: string,
  index: number,
  kind: PlannerTaskKind,
  title: string,
  detail: string,
  metadata: Pick<StudyPlannerTask, 'subjectSlug' | 'subtopic' | 'topicId' | 'sectionName' | 'sectionWeight' | 'targetCount'> & { occurrence?: number } = {},
): StudyPlannerTask => ({
  id: metadata.topicId
    ? `${kind}:${metadata.topicId}${metadata.occurrence ? `:${metadata.occurrence}` : ''}`
    : `${dayDate}:${kind}:${index}`,
  kind,
  title,
  detail,
  durationMinutes: 0,
  ...metadata,
});

const allocateTaskMinutes = (tasks: StudyPlannerTask[], totalMinutes: number): StudyPlannerTask[] => {
  if (!tasks.length) return tasks;
  const budget = Math.max(tasks.length * 5, totalMinutes);
  const each = Math.floor(budget / tasks.length / 5) * 5;
  let remainder = Math.max(0, budget - each * tasks.length);
  return tasks.map((task) => {
    const addFive = remainder >= 5;
    if (addFive) remainder -= 5;
    return { ...task, durationMinutes: Math.max(5, each + (addFive ? 5 : 0)) };
  });
};

export const generateStudySchedule = (
  form: StudyPlannerForm,
  startDate: string,
  options: StudyScheduleOptions = {},
): StudyDay[] => {
  const rawDayCount = daysBetweenDates(startDate, form.examDate);
  if (rawDayCount < 0) return [];
  const dayCount = Math.min(MAX_PLAN_HORIZON_DAYS, Math.max(1, rawDayCount));
  const examDay = rawDayCount === 0;
  const topicIds = options.topicIds ? new Set(options.topicIds) : null;
  const allTopics = form.preparationMode === 'mock-tests' || examDay ? [] : getStudyPlanTopics(form);
  const selectedTopics = topicIds ? allTopics.filter((topic) => topicIds.has(topic.id)) : allTopics;
  const topicOrder = getWeightedTopicOrder(selectedTopics, form, options.mockAttempts ?? []);
  const feasibility = getPlanFeasibility(form, startDate, topicOrder.length);
  const reservedFinalRevisionDays = dayCount > 5 ? getFinalRevisionDays(dayCount) : 0;
  const learningWindowDays = Math.max(1, dayCount - reservedFinalRevisionDays);
  const assignmentDays = feasibility.feasible ? learningWindowDays : dayCount;
  const topicsPerDay = topicOrder.length
    ? feasibility.feasible
      ? Math.max(1, feasibility.topicsPerDayCapacity)
      : Math.max(1, Math.ceil(topicOrder.length / assignmentDays))
    : 0;
  const topicAssignments: PlannerTopic[][] = Array.from({ length: dayCount }, () => []);
  topicOrder.forEach((topic, index) => {
    const dayIndex = Math.min(assignmentDays - 1, Math.floor(index / Math.max(1, topicsPerDay)));
    topicAssignments[dayIndex]?.push(topic);
  });

  const dailyMcqTarget = getDailyMcqTarget(form);
  const mockOnly = form.preparationMode === 'mock-tests';
  const includesMcqs = ['mcqs', 'mcqs-notes', 'complete'].includes(form.preparationMode);
  const includesNotes = ['notes', 'mcqs-notes', 'complete'].includes(form.preparationMode);
  const days: StudyDay[] = [];
  const revisionOccurrences = new Map<string, number>();

  for (let dayIndex = 0; dayIndex < dayCount; dayIndex += 1) {
    const date = addDaysToDateString(startDate, dayIndex);
    const phase = getPhase(dayIndex, dayCount, examDay);
    const topics = topicAssignments[dayIndex] ?? [];
    const focus = topics.length
      ? topics.map((topic) => `${topic.subjectName}: ${topic.subtopic}`).join(' · ')
      : 'Review your selected syllabus';
    const tasks: StudyPlannerTask[] = [];

    if (phase === 'exam-day') {
      tasks.push(makeTask(date, tasks.length, 'light-review', 'Exam-day warm-up', 'Review a short formula / fact sheet, prepare your materials and protect your rest.'));
    } else if (mockOnly) {
      const isMockDay = (dayIndex % 3 === 0 || dayIndex % 7 === 6) && dayIndex < dayCount - 1;
      if (isMockDay) {
        const count = Math.max(10, Math.round(Math.min(60, form.dailyStudyMinutes * 0.7) / 5) * 5);
        tasks.push(makeTask(date, tasks.length, 'mock', `Take a ${count}-question timed mock`, 'Start a timed MUQABIL mock. Your score and subject accuracy will update your future revision priorities.', { targetCount: count }));
      } else {
        tasks.push(makeTask(date, tasks.length, 'analysis', 'Analyse your latest mock', 'Review every wrong answer, identify the pattern and note one correction for your next attempt.'));
      }
    } else {
      topics.forEach((topic) => {
        const metadata = {
          subjectSlug: topic.subjectSlug,
          subtopic: topic.subtopic,
          topicId: topic.id,
          ...(topic.sectionName ? { sectionName: topic.sectionName } : {}),
          ...(topic.sectionWeight ? { sectionWeight: topic.sectionWeight } : {}),
        };
        if (form.preparationMode !== 'mcqs') {
          tasks.push(makeTask(date, tasks.length, 'learn', `Study ${topic.subtopic}`, `Learn the core ideas in ${topic.subjectName}; explain the topic in your own words.`, metadata));
        }
        if (includesMcqs && dailyMcqTarget > 0) {
          const targetCount = Math.max(1, Math.floor(dailyMcqTarget / Math.max(1, topics.length)));
          tasks.push(makeTask(date, tasks.length, 'mcq', `Practise ${targetCount} MCQs: ${topic.subtopic}`, `Complete a focused set for ${topic.subjectName}; review every wrong answer.`, { ...metadata, targetCount }));
        }
        if (includesNotes) {
          tasks.push(makeTask(date, tasks.length, 'notes', `Make smart notes: ${topic.subtopic}`, `Capture key facts, a short example and one likely exam trap for ${topic.subjectName}.`, metadata));
        }
      });

      if (phase === 'final-revision' || (dayIndex > 0 && dayIndex % 3 === 0)) {
        const priorTopics = topicAssignments.slice(0, dayIndex).flat();
        const reviewTopic = priorTopics.length
          ? priorTopics[Math.max(0, priorTopics.length - 2)]
          : topicOrder[0];
        if (reviewTopic) {
          const occurrence = (revisionOccurrences.get(reviewTopic.id) ?? 0) + 1;
          revisionOccurrences.set(reviewTopic.id, occurrence);
          tasks.push(makeTask(date, tasks.length, 'revision', `Spaced revision: ${reviewTopic.subtopic}`, 'Recall first without notes, then check gaps and correct the error log.', {
            subjectSlug: reviewTopic.subjectSlug,
            subtopic: reviewTopic.subtopic,
            topicId: reviewTopic.id,
            occurrence,
            ...(reviewTopic.sectionName ? { sectionName: reviewTopic.sectionName } : {}),
            ...(reviewTopic.sectionWeight ? { sectionWeight: reviewTopic.sectionWeight } : {}),
          }));
        }
      }

      if (includesMcqs && dayIndex % 7 === 6 && dayIndex < dayCount - 1) {
        tasks.push(makeTask(date, tasks.length, 'mock', 'Weekly mixed mock test', 'Start a timed MUQABIL quiz. The recorded result will inform your next revision priorities.', { targetCount: 50 }));
      }
      if (!tasks.length) {
        tasks.push(makeTask(date, tasks.length, 'revision', 'Review your selected syllabus', 'Use active recall on a weak topic and write down one question to revisit.'));
      }
    }

    const allocatedTasks = allocateTaskMinutes(tasks, form.dailyStudyMinutes);
    days.push({
      date,
      dayNumber: dayIndex + 1,
      weekNumber: Math.floor(dayIndex / 7) + 1,
      phase,
      focus,
      topics,
      studyMinutes: allocatedTasks.reduce((sum, task) => sum + task.durationMinutes, 0),
      budgetMinutes: form.dailyStudyMinutes,
      mcqTarget: phase === 'exam-day' ? 0 : dailyMcqTarget,
      tasks: allocatedTasks,
    });
  }
  return days;
};

export const getTargetScorePercent = (targetScore: StudyPlannerForm['targetScore']): number =>
  TARGET_SCORE_OPTIONS.find((item) => item.id === targetScore)?.percent ?? 70;

const dateFromTaskId = (taskId: string): string | null => {
  const match = taskId.match(/^(\d{4}-\d{2}-\d{2}):/);
  return match?.[1] ?? null;
};

export const getPlannerProgress = (
  plan: StoredStudyPlan,
  schedule: StudyDay[],
  today: string,
): PlannerProgress => {
  const scheduledTasks = schedule.flatMap((day) => day.tasks.map((task) => ({ task, date: day.date })));
  const scheduledTaskIds = new Set(scheduledTasks.map(({ task }) => task.id));
  const completedTaskIdSet = new Set(plan.completedTaskIds);
  const scheduledCompletedTaskIds = plan.completedTaskIds.filter((id) => scheduledTaskIds.has(id));
  const validTopicIds = new Set(getStudyPlanTopics(plan.form).map((topic) => topic.id));
  const historicalCompletedTaskIds = plan.completedTaskIds.filter((id) => {
    if (scheduledTaskIds.has(id)) return false;
    const topicTask = id.match(/^(learn|mcq|notes|revision):(.+?)(?::\d+)?$/);
    if (topicTask) return validTopicIds.has(topicTask[2]);
    return Boolean(dateFromTaskId(id)) && Boolean(plan.completedTaskDates?.[id] || dateFromTaskId(id));
  });
  const totalTasks = scheduledTaskIds.size + historicalCompletedTaskIds.length;
  const completedTasks = scheduledCompletedTaskIds.length + historicalCompletedTaskIds.length;
  const taskCompletionPercent = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const planTopics = getStudyPlanTopics(plan.form);
  const totalSubtopics = planTopics.length;
  const completedSubtopicSet = new Set([...plan.completedSubtopicIds, ...(plan.completedTopicIds ?? [])]);
  const completedSubtopics = planTopics.filter((topic) => completedSubtopicSet.has(topic.id)).length;
  const syllabusCoveragePercent = totalSubtopics ? Math.round((completedSubtopics / totalSubtopics) * 100) : 0;

  const taskDates = Object.values(plan.completedTaskDates ?? {});
  const legacyTaskDates = plan.completedTaskIds.map(dateFromTaskId).filter((date): date is string => Boolean(date));
  const activityDates = new Set(
    [...taskDates, ...legacyTaskDates, ...plan.mockAttempts.map((attempt) => attempt.date)]
      .filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date) && date <= today),
  );
  const activeDays = activityDates.size;
  let currentStreak = 0;
  let streakDate = today;
  if (!activityDates.has(streakDate)) {
    const yesterday = addDaysToDateString(today, -1);
    if (activityDates.has(yesterday)) streakDate = yesterday;
    else streakDate = '';
  }
  while (streakDate && activityDates.has(streakDate)) {
    currentStreak += 1;
    streakDate = addDaysToDateString(streakDate, -1);
  }

  const averageMockScore = plan.mockAttempts.length
    ? Math.round(plan.mockAttempts.reduce((sum, attempt) => sum + (attempt.total > 0 ? (attempt.score / attempt.total) * 100 : 0), 0) / plan.mockAttempts.length)
    : null;
  const targetScorePercent = getTargetScorePercent(plan.form.targetScore);
  const mockAttainment = averageMockScore === null ? null : Math.min(100, Math.round((averageMockScore / targetScorePercent) * 100));
  const dueTasks = scheduledTasks.filter(({ date }) => date <= today);
  const dueTaskIds = new Set(dueTasks.map(({ task }) => task.id));
  const dueCompletion = dueTasks.length
    ? Math.round([...completedTaskIdSet].filter((id) => dueTaskIds.has(id)).length / dueTasks.length * 100)
    : taskCompletionPercent;
  const readinessScore = mockAttainment === null
    ? Math.round((syllabusCoveragePercent * 0.4 + dueCompletion * 0.35) / 0.75)
    : Math.round(syllabusCoveragePercent * 0.4 + dueCompletion * 0.35 + mockAttainment * 0.25);

  const badges: PlannerProgress['badges'] = [];
  if (plan.completedTaskIds.length > 0 || completedSubtopics > 0 || plan.mockAttempts.length > 0) badges.push({ id: 'first-step', title: 'First Step', description: 'Completed your first study target.', icon: '🌱' });
  if (currentStreak >= 3 || activeDays >= 3) badges.push({ id: 'three-day-streak', title: 'Consistency Builder', description: 'Studied on three different days.', icon: '🔥' });
  if (currentStreak >= 7) badges.push({ id: 'seven-day-streak', title: '7-Day Streak', description: 'Built a full week of consecutive study momentum.', icon: '⚡' });
  if (syllabusCoveragePercent >= 25) badges.push({ id: 'quarter-syllabus', title: 'Quarter Covered', description: 'Marked at least 25% of your mapped syllabus as mastered.', icon: '📚' });
  if (syllabusCoveragePercent >= 50) badges.push({ id: 'half-syllabus', title: 'Halfway There', description: 'Marked at least half of your mapped syllabus as mastered.', icon: '🎯' });
  if (syllabusCoveragePercent === 100) badges.push({ id: 'syllabus-master', title: 'Syllabus Master', description: 'Reviewed every selected subtopic.', icon: '🏅' });
  if (plan.mockAttempts.length > 0) badges.push({ id: 'first-mock', title: 'Mock Test Finisher', description: 'Recorded your first mock test score.', icon: '📝' });
  if (averageMockScore !== null && averageMockScore >= targetScorePercent) badges.push({ id: 'target-reached', title: 'Target in Sight', description: 'Your average mock score is at or above your chosen target.', icon: '🏆' });

  return {
    completedTasks,
    totalTasks,
    taskCompletionPercent,
    completedSubtopics,
    totalSubtopics,
    syllabusCoveragePercent,
    activeDays,
    currentStreak,
    averageMockScore,
    targetScorePercent,
    readinessScore,
    badges,
  };
};

export const getMotivationMessage = (progress: PlannerProgress): string => {
  if (progress.currentStreak >= 7) return 'A full week of consistency. Keep the rhythm; it compounds.';
  if (progress.currentStreak >= 3) return 'Your consistency is building. One focused session at a time.';
  if (progress.syllabusCoveragePercent >= 75) return 'Most of your mapped syllabus is covered. Shift your attention to recall and mock analysis.';
  if (progress.averageMockScore !== null && progress.averageMockScore >= progress.targetScorePercent) return 'Your mock average has reached your target. Protect accuracy and keep revising.';
  if (progress.completedTasks > 0) return 'Good start. Small, repeatable sessions beat last-minute cramming.';
  return 'Start with today’s smallest target. Momentum begins with one completed task.';
};

export const createAiPlanPrompt = (form: StudyPlannerForm): string => {
  const organization = getOrganization(form.organizationId).name;
  const positionName = getPositionName(form);
  const syllabusLines = getStudyPlanTopics(form).map((topic) => {
    const sourceWeight = topic.sectionWeight ? ` · ${topic.sectionWeight}% section weight` : '';
    const source = topic.sectionName ? ` · ${topic.sectionName}${sourceWeight}` : '';
    return `- ${topic.subjectName}: ${topic.subtopic}${source}`;
  }).join('\n');
  const weakAreas = form.weakAreas.length ? form.weakAreas.map(getWeakAreaName).join(', ') : 'none selected';
  const target = form.targetScore === 'merit' ? 'top merit position' : form.targetScore === 'pass' ? 'pass the test' : `${form.targetScore}%`;
  const mode = PREPARATION_MODES.find((item) => item.id === form.preparationMode)?.label ?? form.preparationMode;
  return `Create a personalised coaching overlay for this MUQABIL study roadmap. Keep it practical and concise (under 350 words). Include a daily routine that fits ${form.dailyStudyMinutes} minutes, a weekly checkpoint, a first-week focus sequence using only the syllabus topics below, a strategy for the weak areas, and a final-revision tip. Do not invent official syllabus weights, topics, dates, or guarantee a result.\n\nExam: ${organization} — ${positionName}\nExam date: ${form.examDate}\nCurrent level: ${form.currentLevel}\nPreparation mode: ${mode}\nTarget: ${target}\nWeak areas: ${weakAreas}\nSelected syllabus topics (published source details where matched):\n${syllabusLines}`;
};

export const createMentorPrompt = (plan: StoredStudyPlan, day?: StudyDay): string => {
  const organization = getOrganization(plan.form.organizationId).name;
  const positionName = getPositionName(plan.form);
  const topicText = day?.topics.map((topic) => `${topic.subjectName} — ${topic.subtopic}`).join('; ')
    || getPlannerSubjects(plan.form.subjectSlugs).map((subject) => subject.name).join(', ');
  const weakAreas = plan.form.weakAreas.length ? plan.form.weakAreas.map(getWeakAreaName).join(', ') : 'none selected';
  return `I am preparing for ${positionName} through ${organization}. My exam date is ${plan.form.examDate}, my current level is ${plan.form.currentLevel}, I can study ${plan.form.dailyStudyMinutes} minutes per day, and my target is ${plan.form.targetScore === 'merit' ? 'a top merit position' : plan.form.targetScore === 'pass' ? 'to pass' : `${plan.form.targetScore}%`} . My selected preparation mode is ${PREPARATION_MODES.find((item) => item.id === plan.form.preparationMode)?.label}. Today's focus is ${topicText}. My weak areas are ${weakAreas}. Give me one focused, practical study session for today: explain the highest-yield concept, include a short recall check, and end with a realistic next step. Keep claims about official syllabi qualified and tell me to verify details against the latest official notice.`;
};

export interface ExamPreset {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  organizationId: string;
  positionId: string;
  days: number;
  dailyMinutes: number;
  preparationMode: PreparationMode;
  targetScore: 'pass' | '70' | '80' | '90' | 'merit';
  weakAreas: string[];
}

export const POPULAR_EXAM_PRESETS: ExamPreset[] = [
  {
    id: 'sts-teaching-license',
    badge: 'Teaching License',
    title: 'STS IBA Teaching License Test',
    subtitle: 'STEDA 50–50 Pattern · Class 1–8 DCAR & Pedagogy',
    organizationId: 'sts',
    positionId: 'teaching-license',
    days: 60,
    dailyMinutes: 120,
    preparationMode: 'complete',
    targetScore: '80',
    weakAreas: ['pedagogy', 'mathematics', 'everyday-science'],
  },
  {
    id: 'sts-grad',
    badge: 'Most Popular',
    title: 'STS BPS 05–15 (Graduation)',
    subtitle: 'Screening test · IBA Sukkur Testing Services',
    organizationId: 'sts',
    positionId: 'graduation-bps-05-15',
    days: 60,
    dailyMinutes: 90,
    preparationMode: 'complete',
    targetScore: '80',
    weakAreas: ['english', 'mathematics'],
  },
  {
    id: 'sts-inter',
    badge: 'High Demand',
    title: 'STS BPS 05–15 (Intermediate)',
    subtitle: 'Screening test · Intermediate category',
    organizationId: 'sts',
    positionId: 'intermediate-bps-05-15',
    days: 45,
    dailyMinutes: 60,
    preparationMode: 'complete',
    targetScore: '80',
    weakAreas: ['english', 'mathematics'],
  },
  {
    id: 'fpsc-css',
    badge: 'Competitive',
    title: 'CSS MPT / Screening (FPSC)',
    subtitle: 'Preliminary screening examination',
    organizationId: 'fpsc',
    positionId: 'css-mpt',
    days: 90,
    dailyMinutes: 180,
    preparationMode: 'complete',
    targetScore: 'merit',
    weakAreas: ['english', 'current-affairs', 'general-knowledge'],
  },
  {
    id: 'police-asi',
    badge: 'Uniform Service',
    title: 'Sindh Police ASI / Constable',
    subtitle: 'STS recruitment screening',
    organizationId: 'sts',
    positionId: 'police-asi',
    days: 45,
    dailyMinutes: 60,
    preparationMode: 'mcqs-notes',
    targetScore: '80',
    weakAreas: ['english', 'computer'],
  },
  {
    id: 'sts-pst-jest',
    badge: 'Education',
    title: 'PST / JEST Educator',
    subtitle: 'School Education & Literacy Dept.',
    organizationId: 'sts',
    positionId: 'pst-jest',
    days: 60,
    dailyMinutes: 90,
    preparationMode: 'complete',
    targetScore: 'merit',
    weakAreas: ['mathematics', 'english'],
  },
  {
    id: 'spsc-cce',
    badge: 'Provincial',
    title: 'SPSC CCE / Section Officer',
    subtitle: 'Sindh Public Service Commission',
    organizationId: 'spsc',
    positionId: 'cce-screening',
    days: 75,
    dailyMinutes: 120,
    preparationMode: 'complete',
    targetScore: '80',
    weakAreas: ['general-knowledge', 'current-affairs'],
  },
  {
    id: 'ppsc-one-paper',
    badge: 'General',
    title: 'PPSC One-Paper Screening',
    subtitle: 'Punjab Public Service Commission',
    organizationId: 'ppsc',
    positionId: 'one-paper',
    days: 45,
    dailyMinutes: 90,
    preparationMode: 'complete',
    targetScore: '80',
    weakAreas: ['general-knowledge', 'pakistan-studies'],
  },
  {
    id: 'nts-gat',
    badge: 'Aptitude',
    title: 'NTS NAT / GAT General',
    subtitle: 'Higher education & aptitude entry',
    organizationId: 'nts',
    positionId: 'gat-general',
    days: 30,
    dailyMinutes: 60,
    preparationMode: 'mcqs',
    targetScore: '80',
    weakAreas: ['english', 'mathematics'],
  },
];

export const STUDY_QUOTES = [
  { text: "It's not about being the best. It's about being better than you were yesterday.", author: 'Consistency Principle' },
  { text: 'Koshish karne walon ki kabhi haar nahi hoti.', author: 'Urdu Adab' },
  { text: 'Success in competitive exams is built in the quiet hours when nobody is clapping.', author: "Aspirant's Creed" },
  { text: 'Small daily improvements over time lead to stunning results.', author: 'Robin Sharma' },
  { text: 'Sitaron se aagay jahan aur bhi hain, abhi ishq ke imtehan aur bhi hain.', author: 'Allama Iqbal' },
  { text: 'Discipline is choosing between what you want now and what you want most.', author: 'Abraham Lincoln' },
];

export const rebalancePlanSchedule = (
  currentPlan: StoredStudyPlan,
  today: string,
  extendDaysIfShort = 14,
): StoredStudyPlan => {
  // Kept as an ignored compatibility argument; a fixed exam date must never move silently.
  void extendDaysIfShort;
  const currentSchedule = generateStudySchedule(currentPlan.form, currentPlan.startDate, {
    topicIds: currentPlan.plannedTopicIds,
    mockAttempts: currentPlan.mockAttempts,
  });
  const completedTaskIds = new Set(currentPlan.completedTaskIds);
  const completedTopicIds = new Set(currentPlan.completedTopicIds ?? []);
  const coveredTaskKinds = new Set<PlannerTaskKind>(['learn', 'mcq', 'notes']);

  currentSchedule.flatMap((day) => day.tasks).forEach((task) => {
    if (completedTaskIds.has(task.id) && task.topicId && coveredTaskKinds.has(task.kind)) {
      completedTopicIds.add(task.topicId);
    }
  });

  const alreadyCovered = new Set([...completedTopicIds, ...currentPlan.completedSubtopicIds]);
  const plannedTopicIds = getStudyPlanTopics(currentPlan.form)
    .filter((topic) => !alreadyCovered.has(topic.id))
    .map((topic) => topic.id);

  return {
    ...currentPlan,
    updatedAt: new Date().toISOString(),
    startDate: today,
    completedTopicIds: [...completedTopicIds],
    plannedTopicIds,
    // Preserve the candidate's announced exam date, even when it is imminent or has passed.
    form: { ...currentPlan.form },
  };
};

export const exportPlanScheduleAsText = (plan: StoredStudyPlan, schedule: StudyDay[]): string => {
  const org = getOrganization(plan.form.organizationId).name;
  const pos = getPositionName(plan.form);
  const subjects = getPlannerSubjects(plan.form.subjectSlugs).map((subject) => subject.name).join(', ');
  const source = getSyllabusRecord(plan.form);
  const lines: string[] = [
    '==================================================',
    '   MUQABIL SMART STUDY ROADMAP & EXAM SCHEDULE',
    '==================================================',
    `Exam Target    : ${pos} (${org})`,
    `Exam Date      : ${plan.form.examDate} (fixed; edit explicitly to change)`,
    `Daily Budget   : ${plan.form.dailyStudyMinutes} minutes/day`,
    `Target Score   : ${plan.form.targetScore.toUpperCase()}`,
    `Study Mode     : ${PREPARATION_MODES.find((mode) => mode.id === plan.form.preparationMode)?.label ?? plan.form.preparationMode}`,
    `Mapped Subjects: ${subjects}`,
    `Weak Areas     : ${plan.form.weakAreas.map(getWeakAreaName).join(', ') || 'None selected'}`,
    `Generated On   : ${plan.generatedAt.slice(0, 10)}`,
    ...(source ? [`Syllabus Source: ${source.sourceUrl}`] : []),
    '--------------------------------------------------',
    'DAILY STUDY SCHEDULE (DAY BY DAY):',
    '--------------------------------------------------',
  ];

  schedule.forEach((day) => {
    lines.push(`\n[Day ${day.dayNumber} · Week ${day.weekNumber}] - ${day.date} (${day.phase.toUpperCase()})`);
    lines.push(`  Focus: ${day.focus}`);
    lines.push(`  Planned: ${day.studyMinutes}m / ${day.budgetMinutes}m budget | MCQ Target: ${day.mcqTarget}`);
    day.tasks.forEach((task, index) => {
      const status = plan.completedTaskIds.includes(task.id) ? '[DONE]' : '[TODO]';
      const section = task.sectionName ? ` · ${task.sectionName}${task.sectionWeight ? ` (${task.sectionWeight}%)` : ''}` : '';
      lines.push(`    ${index + 1}. ${status} ${task.title} (${task.durationMinutes}m)${section}`);
      lines.push(`       Detail: ${task.detail}`);
    });
  });

  lines.push('\n==================================================');
  lines.push('Practice consistently. Track progress on MUQABIL.');
  lines.push('Readiness is a study indicator, not a predicted result.');
  lines.push('==================================================');
  return lines.join('\n');
};

const escapeIcsText = (value: string): string => value
  .replace(/\\/g, '\\\\')
  .replace(/\n/g, '\\n')
  .replace(/,/g, '\\,')
  .replace(/;/g, '\\;');

const toIcsDate = (date: string): string => date.replace(/-/g, '');

export const exportPlanScheduleAsIcs = (plan: StoredStudyPlan, schedule: StudyDay[]): string => {
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  const events = schedule.flatMap((day) => day.tasks.map((task) => [
    'BEGIN:VEVENT',
    `UID:${escapeIcsText(`${plan.id}-${task.id}@muqabil.org`)}`,
    `DTSTAMP:${timestamp}`,
    `DTSTART;VALUE=DATE:${toIcsDate(day.date)}`,
    `DTEND;VALUE=DATE:${toIcsDate(addDaysToDateString(day.date, 1))}`,
    `SUMMARY:${escapeIcsText(task.title)}`,
    `DESCRIPTION:${escapeIcsText(`${task.detail} (${task.durationMinutes} minutes)`)}`,
    'END:VEVENT',
  ].join('\r\n')));
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MUQABIL//Study Planner//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...events,
    'END:VCALENDAR',
    '',
  ].join('\r\n');
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value && typeof value === 'object' && !Array.isArray(value));

const isValidDateString = (value: unknown): value is string => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return parsed.getUTCFullYear() === year && parsed.getUTCMonth() === month - 1 && parsed.getUTCDate() === day;
};

const sanitizeMockAttempt = (value: unknown): MockAttempt | null => {
  if (!isRecord(value)
    || typeof value.id !== 'string'
    || !isValidDateString(value.date)
    || !Number.isFinite(value.score)
    || !Number.isFinite(value.total)
    || Number(value.total) <= 0
    || Number(value.total) > 10000
    || Number(value.score) < 0
    || Number(value.score) > Number(value.total)) return null;

  const subjectScores = Array.isArray(value.subjectScores)
    ? value.subjectScores.flatMap((score): MockSubjectScore[] => {
      if (!isRecord(score) || typeof score.subjectSlug !== 'string' || !SUBJECTS_BY_SLUG.has(score.subjectSlug)
        || !Number.isFinite(score.score) || !Number.isFinite(score.total) || Number(score.total) <= 0) return [];
      const total = Math.min(10000, Number(score.total));
      return [{ subjectSlug: score.subjectSlug, score: Math.max(0, Math.min(total, Number(score.score))), total }];
    })
    : undefined;

  return {
    id: value.id.slice(0, 200),
    date: value.date,
    score: Number(value.score),
    total: Number(value.total),
    recordedAt: typeof value.recordedAt === 'string' ? value.recordedAt.slice(0, 50) : new Date(`${value.date}T12:00:00.000Z`).toISOString(),
    ...(value.source === 'manual' || value.source === 'quiz' ? { source: value.source } : {}),
    ...(subjectScores?.length ? { subjectScores } : {}),
    ...(typeof value.completedTaskId === 'string' ? { completedTaskId: value.completedTaskId.slice(0, 300) } : {}),
  };
};

export const sanitizeStoredStudyPlan = (value: unknown): StoredStudyPlan | null => {
  if (!isRecord(value) || !isRecord(value.form)) return null;
  const formValue = value.form;
  if (typeof value.id !== 'string'
    || !isValidDateString(value.startDate)
    || typeof formValue.organizationId !== 'string'
    || typeof formValue.positionId !== 'string'
    || !isValidDateString(formValue.examDate)) return null;

  const organization = STUDY_ORGANIZATIONS.find((item) => item.id === formValue.organizationId);
  if (!organization) return null;
  const position = organization.positions.find((item) => item.id === formValue.positionId);
  if (!position) return null;

  const defaults = createDefaultStudyPlannerForm(value.startDate);
  const subjectSlugs = Array.isArray(formValue.subjectSlugs)
    ? [...new Set(formValue.subjectSlugs.filter((slug): slug is string => typeof slug === 'string' && SUBJECTS_BY_SLUG.has(slug)))]
    : defaults.subjectSlugs;
  const validSubjectSlugs = subjectSlugs.length ? subjectSlugs : position.subjectSlugs.filter((slug) => SUBJECTS_BY_SLUG.has(slug));
  const weakAreas = Array.isArray(formValue.weakAreas)
    ? [...new Set(formValue.weakAreas.map(normalizeWeakArea).filter((slug): slug is string => Boolean(slug)))].slice(0, 30)
    : [];
  const validModes: PreparationMode[] = ['mcqs', 'notes', 'mcqs-notes', 'mock-tests', 'complete'];
  const validLevels: CurrentLevel[] = ['beginner', 'intermediate', 'advanced', 'expert'];
  const validTargets: StudyPlannerForm['targetScore'][] = ['pass', '70', '80', '90', 'merit'];
  const dailyStudyMinutes = Number.isFinite(formValue.dailyStudyMinutes)
    ? Math.max(15, Math.min(600, Math.round(Number(formValue.dailyStudyMinutes))))
    : defaults.dailyStudyMinutes;

  const completedTaskDates: Record<string, string> = {};
  if (isRecord(value.completedTaskDates)) {
    Object.entries(value.completedTaskDates).slice(-10000).forEach(([taskId, date]) => {
      if (typeof date === 'string' && isValidDateString(date)) completedTaskDates[taskId.slice(0, 300)] = date;
    });
  }

  const mockAttempts = Array.isArray(value.mockAttempts)
    ? value.mockAttempts.map(sanitizeMockAttempt).filter((attempt): attempt is MockAttempt => Boolean(attempt)).slice(-500)
    : [];
  const form: StudyPlannerForm = {
    organizationId: organization.id,
    positionId: position.id,
    customPosition: typeof formValue.customPosition === 'string' ? formValue.customPosition.slice(0, 120) : '',
    subjectSlugs: validSubjectSlugs,
    preparationMode: validModes.includes(formValue.preparationMode as PreparationMode) ? formValue.preparationMode as PreparationMode : defaults.preparationMode,
    currentLevel: validLevels.includes(formValue.currentLevel as CurrentLevel) ? formValue.currentLevel as CurrentLevel : defaults.currentLevel,
    examDate: formValue.examDate,
    dailyStudyMinutes,
    targetScore: validTargets.includes(formValue.targetScore as StudyPlannerForm['targetScore']) ? formValue.targetScore as StudyPlannerForm['targetScore'] : defaults.targetScore,
    weakAreas,
  };

  const completedTaskIds = Array.isArray(value.completedTaskIds)
    ? [...new Set(value.completedTaskIds.filter((id): id is string => typeof id === 'string').map((id) => id.slice(0, 300)))].slice(-10000)
    : [];
  const completedTopicIds = Array.isArray(value.completedTopicIds)
    ? [...new Set(value.completedTopicIds.filter((id): id is string => typeof id === 'string').map((id) => id.slice(0, 300)))].slice(-10000)
    : [];
  const completedSubtopicIds = Array.isArray(value.completedSubtopicIds)
    ? [...new Set(value.completedSubtopicIds.filter((id): id is string => typeof id === 'string').map((id) => id.slice(0, 300)))].slice(-10000)
    : [];
  const plannedTopicIds = Array.isArray(value.plannedTopicIds)
    ? [...new Set(value.plannedTopicIds.filter((id): id is string => typeof id === 'string').map((id) => id.slice(0, 300)))].slice(-10000)
    : undefined;

  return {
    id: value.id.slice(0, 200),
    generatedAt: typeof value.generatedAt === 'string' ? value.generatedAt.slice(0, 50) : new Date().toISOString(),
    ...(typeof value.updatedAt === 'string' ? { updatedAt: value.updatedAt.slice(0, 50) } : {}),
    startDate: value.startDate,
    form,
    completedTaskIds,
    completedTaskDates,
    completedTopicIds,
    completedSubtopicIds,
    ...(plannedTopicIds ? { plannedTopicIds } : {}),
    mockAttempts,
    ...(value.aiPersonalizationRequested === true ? { aiPersonalizationRequested: true } : {}),
    ...(value.aiPlanStatus === 'pending' ? { aiPlanStatus: 'offline' as const } : value.aiPlanStatus === 'ready' || value.aiPlanStatus === 'offline' ? { aiPlanStatus: value.aiPlanStatus } : {}),
    ...(typeof value.aiPlanAdvice === 'string' ? { aiPlanAdvice: value.aiPlanAdvice.slice(0, 3500) } : {}),
  };
};

const sanitizeCollection = (value: unknown): StudyPlannerCollection | null => {
  if (!isRecord(value) || !Array.isArray(value.plans)) return null;
  const plans = value.plans.map(sanitizeStoredStudyPlan).filter((plan): plan is StoredStudyPlan => Boolean(plan)).slice(-MAX_STORED_STUDY_PLANS);
  const requestedActiveId = typeof value.activePlanId === 'string' ? value.activePlanId : null;
  const activePlanId = plans.some((plan) => plan.id === requestedActiveId) ? requestedActiveId : plans[0]?.id ?? null;
  return { activePlanId, plans };
};

export const loadStoredStudyPlans = (storage: Pick<Storage, 'getItem'> | null | undefined): StudyPlannerCollection => {
  if (!storage) return { activePlanId: null, plans: [] };
  try {
    const serialized = storage.getItem(STUDY_PLANS_STORAGE_KEY);
    if (serialized) {
      const collection = sanitizeCollection(JSON.parse(serialized));
      if (collection) return collection;
    }
  } catch {
    // A malformed or inaccessible v2 value should not prevent recovery of the legacy plan below.
  }
  try {
    const legacy = storage.getItem(STUDY_PLANNER_STORAGE_KEY);
    if (!legacy) return { activePlanId: null, plans: [] };
    const plan = sanitizeStoredStudyPlan(JSON.parse(legacy));
    return plan ? { activePlanId: plan.id, plans: [plan] } : { activePlanId: null, plans: [] };
  } catch {
    return { activePlanId: null, plans: [] };
  }
};

export const loadStoredStudyPlan = (storage: Pick<Storage, 'getItem'> | null | undefined): StoredStudyPlan | null => {
  const collection = loadStoredStudyPlans(storage);
  return collection.plans.find((plan) => plan.id === collection.activePlanId) ?? collection.plans[0] ?? null;
};

export const saveStoredStudyPlans = (
  storage: Pick<Storage, 'setItem'> & Partial<Pick<Storage, 'removeItem'>> | null | undefined,
  collection: StudyPlannerCollection,
): boolean => {
  if (!storage) return false;
  const plans = collection.plans.map(sanitizeStoredStudyPlan).filter((plan): plan is StoredStudyPlan => Boolean(plan));
  if (plans.length > MAX_STORED_STUDY_PLANS) return false;
  const activePlanId = plans.some((plan) => plan.id === collection.activePlanId) ? collection.activePlanId : plans[0]?.id ?? null;
  try {
    storage.setItem(STUDY_PLANS_STORAGE_KEY, JSON.stringify({ schemaVersion: 2, activePlanId, plans }));
    const activePlan = plans.find((plan) => plan.id === activePlanId);
    if (activePlan) storage.setItem(STUDY_PLANNER_STORAGE_KEY, JSON.stringify(activePlan));
    else storage.removeItem?.(STUDY_PLANNER_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
};

export const mergeStudyPlannerCollections = (
  local: StudyPlannerCollection,
  remote: StudyPlannerCollection,
): StudyPlannerCollection => {
  const byId = new Map<string, StoredStudyPlan>();
  [...local.plans, ...remote.plans].forEach((plan) => {
    const existing = byId.get(plan.id);
    const existingTime = Date.parse(existing?.updatedAt ?? existing?.generatedAt ?? '') || 0;
    const nextTime = Date.parse(plan.updatedAt ?? plan.generatedAt) || 0;
    if (!existing || nextTime >= existingTime) byId.set(plan.id, plan);
  });
  const plans = [...byId.values()]
    .sort((left, right) => (Date.parse(left.generatedAt) || 0) - (Date.parse(right.generatedAt) || 0))
    .slice(-MAX_STORED_STUDY_PLANS);
  const activePlanId = plans.some((plan) => plan.id === local.activePlanId)
    ? local.activePlanId
    : plans.some((plan) => plan.id === remote.activePlanId) ? remote.activePlanId : plans[0]?.id ?? null;
  return { activePlanId, plans };
};

export interface StudyPlannerBackupPayload extends StudyPlannerCollection {
  vault?: VaultMistakeItem[];
}

export const STUDY_PLANNER_VAULT_STORAGE_KEY = 'muqabil_smart_study_planner_vault_v1';

export const exportStudyPlannerBackup = (
  collection: StudyPlannerCollection,
  vault?: VaultMistakeItem[],
): string => JSON.stringify({
  format: 'muqabil-study-planner-backup',
  version: 2,
  exportedAt: new Date().toISOString(),
  activePlanId: collection.activePlanId,
  plans: collection.plans,
  vault: vault ?? [],
}, null, 2);

export const parseStudyPlannerBackup = (serialized: string): StudyPlannerBackupPayload | null => {
  try {
    const value = JSON.parse(serialized) as unknown;
    if (!isRecord(value) || value.format !== 'muqabil-study-planner-backup') return null;
    if (value.version !== 1 && value.version !== 2) return null;
    const base = sanitizeCollection(value);
    if (!base) return null;
    const vault = Array.isArray((value as any).vault) ? (value as any).vault : [];
    return {
      ...base,
      vault: vault.filter((it: any) => it && typeof it === 'object' && typeof it.id === 'string' && typeof it.question === 'string'),
    };
  } catch {
    return null;
  }
};

export const appendStudyPlannerMockAttempt = (
  storage: Pick<Storage, 'getItem' | 'setItem'> | null | undefined,
  planId: string,
  attempt: MockAttempt,
): boolean => {
  if (!storage) return false;
  const collection = loadStoredStudyPlans(storage);
  const planIndex = collection.plans.findIndex((plan) => plan.id === planId);
  if (planIndex < 0) return false;
  const plan = collection.plans[planIndex];
  const sanitizedAttempt = sanitizeMockAttempt(attempt);
  if (!sanitizedAttempt) return false;
  const mockAttempts = plan.mockAttempts.filter((existing) => existing.id !== sanitizedAttempt.id);
  mockAttempts.push(sanitizedAttempt);
  const completedTaskIds = new Set(plan.completedTaskIds);
  const completedTaskDates = { ...(plan.completedTaskDates ?? {}) };
  if (sanitizedAttempt.completedTaskId) {
    completedTaskIds.add(sanitizedAttempt.completedTaskId);
    completedTaskDates[sanitizedAttempt.completedTaskId] = sanitizedAttempt.date;
  }
  const updatedPlan: StoredStudyPlan = {
    ...plan,
    updatedAt: sanitizedAttempt.recordedAt,
    completedTaskIds: [...completedTaskIds],
    completedTaskDates,
    mockAttempts: mockAttempts.slice(-500),
  };
  const plans = [...collection.plans];
  plans[planIndex] = updatedPlan;
  return saveStoredStudyPlans(storage, { ...collection, plans });
};

export const loadVaultMistakes = (
  storage: Pick<Storage, 'getItem'> | null | undefined,
  planId?: string,
): VaultMistakeItem[] => {
  if (!storage) return [];
  try {
    const raw = storage.getItem(STUDY_PLANNER_VAULT_STORAGE_KEY);
    if (!raw) return [];
    const items = JSON.parse(raw);
    if (!Array.isArray(items)) return [];
    const sanitized = items.filter(
      (it) => it && typeof it === 'object' && typeof it.id === 'string' && typeof it.question === 'string',
    );
    return planId ? sanitized.filter((it) => it.planId === planId) : sanitized;
  } catch {
    return [];
  }
};

export const saveVaultMistakes = (
  storage: Pick<Storage, 'setItem'> | null | undefined,
  items: VaultMistakeItem[],
): boolean => {
  if (!storage) return false;
  try {
    const capped = items.slice(-2000);
    storage.setItem(STUDY_PLANNER_VAULT_STORAGE_KEY, JSON.stringify(capped));
    return true;
  } catch {
    return false;
  }
};

export const appendVaultMistake = (
  storage: Pick<Storage, 'getItem' | 'setItem'> | null | undefined,
  item: {
    planId: string;
    questionId?: string;
    question: string;
    options: string[];
    correctIndex: number;
    userSelected?: number;
    explanation: string;
    subjectSlug: string;
    subtopic?: string;
    reason?: MistakeReason;
  },
  todayDate?: string,
): boolean => {
  if (!storage) return false;
  const existing = loadVaultMistakes(storage);
  const now = new Date();
  const today = todayDate || toLocalDateString(now);

  const duplicate = existing.find(
    (ex) =>
      ex.planId === item.planId &&
      ((item.questionId && ex.questionId === item.questionId) ||
        ex.question.trim().toLowerCase() === item.question.trim().toLowerCase()),
  );

  if (duplicate) {
    duplicate.userSelected = item.userSelected;
    duplicate.reason = item.reason ?? duplicate.reason ?? 'unspecified';
    duplicate.nextReviewDate = today;
    duplicate.status = 'learning';
    duplicate.intervalDays = 1;
    return saveVaultMistakes(storage, existing);
  }

  const newItem: VaultMistakeItem = {
    id: `vault-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    planId: item.planId,
    questionId: item.questionId,
    question: item.question,
    options: item.options,
    correctIndex: item.correctIndex,
    userSelected: item.userSelected,
    explanation: item.explanation,
    subjectSlug: item.subjectSlug,
    subtopic: item.subtopic,
    reason: item.reason ?? 'unspecified',
    createdAt: now.toISOString(),
    nextReviewDate: today,
    intervalDays: 1,
    repetitionCount: 0,
    easeFactor: 2.5,
    status: 'learning',
  };

  existing.push(newItem);
  return saveVaultMistakes(storage, existing);
};

export const reviewVaultCard = (
  storage: Pick<Storage, 'getItem' | 'setItem'> | null | undefined,
  cardId: string,
  rating: VaultReviewRating,
  today: string,
  reason?: MistakeReason,
): boolean => {
  if (!storage) return false;
  const existing = loadVaultMistakes(storage);
  const cardIndex = existing.findIndex((c) => c.id === cardId);
  if (cardIndex < 0) return false;
  const card = existing[cardIndex];

  let nextInterval = 1;
  let nextRepetitions = card.repetitionCount;
  let nextEase = card.easeFactor;
  let nextStatus: VaultMistakeItem['status'] = 'learning';

  if (rating === 'again') {
    nextRepetitions = 0;
    nextInterval = 1;
    nextEase = Math.max(1.3, nextEase - 0.2);
    nextStatus = 'learning';
  } else if (rating === 'hard') {
    nextRepetitions += 1;
    nextInterval = Math.max(1, Math.round(card.intervalDays * 1.2));
    nextEase = Math.max(1.3, nextEase - 0.15);
    nextStatus = nextRepetitions >= 3 ? 'review' : 'learning';
  } else if (rating === 'good') {
    nextRepetitions += 1;
    if (nextRepetitions === 1) nextInterval = 1;
    else if (nextRepetitions === 2) nextInterval = 3;
    else nextInterval = Math.max(4, Math.round(card.intervalDays * nextEase));
    nextStatus = nextRepetitions >= 4 ? 'mastered' : 'review';
  } else if (rating === 'easy') {
    nextRepetitions += 1;
    if (nextRepetitions === 1) nextInterval = 3;
    else if (nextRepetitions === 2) nextInterval = 6;
    else nextInterval = Math.max(7, Math.round(card.intervalDays * nextEase * 1.3));
    nextEase = Math.min(3.0, nextEase + 0.15);
    nextStatus = nextRepetitions >= 3 ? 'mastered' : 'review';
  }

  const updatedCard: VaultMistakeItem = {
    ...card,
    lastReviewedAt: new Date().toISOString(),
    nextReviewDate: addDaysToDateString(today, nextInterval),
    intervalDays: nextInterval,
    repetitionCount: nextRepetitions,
    easeFactor: Number(nextEase.toFixed(2)),
    status: nextStatus,
    ...(reason ? { reason } : {}),
  };

  existing[cardIndex] = updatedCard;
  return saveVaultMistakes(storage, existing);
};

export const deleteVaultCard = (
  storage: Pick<Storage, 'getItem' | 'setItem'> | null | undefined,
  cardId: string,
): boolean => {
  if (!storage) return false;
  const existing = loadVaultMistakes(storage);
  const filtered = existing.filter((c) => c.id !== cardId);
  return saveVaultMistakes(storage, filtered);
};

export const getVaultStats = (
  items: VaultMistakeItem[],
  today: string,
): VaultStats => {
  const totalCards = items.length;
  const dueCards = items.filter((c) => c.nextReviewDate <= today).length;
  const masteredCards = items.filter((c) => c.status === 'mastered').length;
  const learningCards = items.filter((c) => c.status === 'learning').length;
  const retentionRate = totalCards > 0 ? Math.round((masteredCards / totalCards) * 100) : 100;

  const trapMap = new Map<string, { subjectSlug: string; count: number; reason: MistakeReason }>();
  items.forEach((it) => {
    const key = `${it.subjectSlug}:${it.reason || 'unspecified'}`;
    const ex = trapMap.get(key) || { subjectSlug: it.subjectSlug, count: 0, reason: it.reason || 'unspecified' };
    ex.count += 1;
    trapMap.set(key, ex);
  });

  const topTraps = [...trapMap.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalCards,
    dueCards,
    masteredCards,
    learningCards,
    retentionRate,
    topTraps,
  };
};

export const calculateMeritProjection = (
  plan: StoredStudyPlan,
  progress: PlannerProgress,
): MeritProjection => {
  const targetPercent = getTargetScorePercent(plan.form.targetScore);
  const syllabusWeight = progress.syllabusCoveragePercent;
  const taskWeight = progress.taskCompletionPercent;

  const mockCount = plan.mockAttempts.length;
  let averageMock = 0;
  if (mockCount > 0) {
    const sum = plan.mockAttempts.reduce((acc, curr) => acc + (curr.total > 0 ? (curr.score / curr.total) * 100 : 0), 0);
    averageMock = sum / mockCount;
  } else {
    const levelBase: Record<string, number> = {
      beginner: 48,
      intermediate: 60,
      advanced: 70,
      expert: 78,
    };
    averageMock = levelBase[plan.form.currentLevel] ?? 60;
  }

  let rawExpected = (syllabusWeight * 0.40) + (taskWeight * 0.25) + (averageMock * 0.35);
  if (progress.currentStreak >= 3) rawExpected += Math.min(5, progress.currentStreak * 0.8);

  const spread = Math.max(3, Math.min(8, Math.round(9 - Math.min(mockCount, 5) * 1.2)));
  const projectedMedian = Math.max(20, Math.min(96, Math.round(rawExpected)));
  const projectedMinScore = Math.max(15, projectedMedian - spread);
  const projectedMaxScore = Math.min(100, projectedMedian + spread);

  const passCutoff = plan.form.positionId === 'teaching-license' ? 60 : 50;
  const meritCutoff = 75;

  const passingLikelihood = Math.max(5, Math.min(99, Math.round(
    100 / (1 + Math.exp(-0.15 * (projectedMedian - passCutoff))),
  )));

  const meritRankLikelihood = Math.max(2, Math.min(98, Math.round(
    100 / (1 + Math.exp(-0.14 * (projectedMedian - meritCutoff))),
  )));

  let tier: MeritProjection['tier'] = 'on-track';
  let tierLabel = 'On Track (Passing Range)';
  if (projectedMedian >= 78) {
    tier = 'elite';
    tierLabel = 'Top Merit Range (Top 5% Aspirant)';
  } else if (projectedMedian >= 68) {
    tier = 'competitive';
    tierLabel = 'Competitive Selection Zone';
  } else if (projectedMedian < 50) {
    tier = 'needs-focus';
    tierLabel = 'Needs Immediate Focus (Below Safe Cutoff)';
  }

  const subjectMap = new Map<string, { score: number; total: number }>();
  plan.mockAttempts.forEach((attempt) => {
    attempt.subjectScores?.forEach((sc) => {
      const existing = subjectMap.get(sc.subjectSlug) || { score: 0, total: 0 };
      existing.score += sc.score;
      existing.total += sc.total;
      subjectMap.set(sc.subjectSlug, existing);
    });
  });

  const subjects = getPlannerSubjects(plan.form.subjectSlugs);
  const subjectStrengths = subjects.map((sub) => {
    const data = subjectMap.get(sub.slug);
    let scorePercent = 60;
    if (data && data.total > 0) {
      scorePercent = Math.round((data.score / data.total) * 100);
    } else {
      const isWeak = plan.form.weakAreas.some((w) => normalizeWeakArea(w) === sub.slug);
      scorePercent = isWeak ? 45 : 65;
    }
    const status: 'strong' | 'average' | 'weak' = scorePercent >= 75 ? 'strong' : scorePercent >= 55 ? 'average' : 'weak';
    return {
      subjectSlug: sub.slug,
      subjectName: sub.name,
      scorePercent,
      status,
    };
  });

  const recommendations: string[] = [];
  const weakSubs = subjectStrengths.filter((s) => s.status === 'weak');
  if (weakSubs.length > 0) {
    recommendations.push(`Prioritise ${weakSubs.map((s) => s.subjectName).join(' & ')} to gain +${weakSubs.length * 4} marks toward your target.`);
  }
  if (mockCount < 2) {
    recommendations.push(`Complete at least 2 full timed mocks to tighten your score projection range and discover hidden exam traps.`);
  }
  if (progress.syllabusCoveragePercent < 50) {
    recommendations.push(`Review unchecked syllabus topics; high-weight sections directly drive test question selection.`);
  }
  if (recommendations.length === 0) {
    recommendations.push(`Maintain your consistent study streak and use the Memory Vault to eliminate residual careless errors.`);
  }

  return {
    projectedMinScore,
    projectedMaxScore,
    projectedMedian,
    targetPercent,
    passingLikelihood,
    meritRankLikelihood,
    tier,
    tierLabel,
    recommendations,
    subjectStrengths,
  };
};

export const getTopicHighYieldSprint = (
  subjectSlug: string,
  subtopicTitle: string,
): TopicHighYieldSprint => {
  const normSubject = normalizeWeakArea(subjectSlug) || subjectSlug;
  const titleLower = subtopicTitle.toLowerCase();

  if (normSubject === 'english') {
    if (/preposition/.test(titleLower)) {
      return {
        topicTitle: subtopicTitle,
        subjectName: 'English',
        keyFormulasAndRules: [
          'Latin comparatives take "TO" (never "than"): senior to, junior to, prior to, superior to, inferior to, prefer X to Y.',
          'Die OF disease/hunger/thirst vs. Die FROM wound/overwork/snakebite/loss of blood.',
          'Blind IN one eye (physical sight) vs. Blind TO faults (metaphorical/moral blindness).',
        ],
        examDistractorTrap: 'STS Trap: "He is senior than me" is incorrect. The correct STS form is "He is senior to me".',
        quickRecallCards: [
          { prompt: 'Which preposition follows "prefer"?', answer: 'TO (e.g. "I prefer tea to coffee")', mnemonic: '"Prefer... to" is a Latin comparative pair' },
          { prompt: 'He died _____ cholera. Fill in the blank.', answer: 'OF (die OF a disease)', mnemonic: 'Disease = OF; Injury/external cause = FROM' },
          { prompt: "She is blind _____ her brother's shortcomings.", answer: 'TO (blind TO moral faults)', mnemonic: 'Eye = IN; Character = TO' },
        ],
      };
    }
    if (/tense|grammar|verb|voice|narration/.test(titleLower)) {
      return {
        topicTitle: subtopicTitle,
        subjectName: 'English',
        keyFormulasAndRules: [
          'Subject-Verb Agreement: Phrases with "as well as", "along with", "together with" do not affect the main subject.',
          '"Neither of", "Either of", "Each of" always take a singular verb (e.g. "Each of the boys IS present").',
          'Past unreal conditional: "If I had known, I WOULD HAVE attended" (never "would had").',
        ],
        examDistractorTrap: 'STS Trap: "The teacher, along with the students, ARE coming" is wrong. The subject is singular teacher -> "IS coming".',
        quickRecallCards: [
          { prompt: '"Each of the candidates _____ qualified." (was / were)', answer: 'WAS (Each is grammatically singular)', mnemonic: 'Each/Every/Neither = Singular' },
          { prompt: 'In past perfect conditional, what accompanies "If + had + V3"?', answer: 'would have + V3', mnemonic: 'Had done -> Would have done' },
          { prompt: '"Neither the teacher nor the students _____ present." (was / were)', answer: 'WERE (Verb agrees with the closer subject "students")', mnemonic: 'Proximity rule for Neither... Nor' },
        ],
      };
    }
  }

  if (normSubject === 'mathematics') {
    if (/percentage/.test(titleLower)) {
      return {
        topicTitle: subtopicTitle,
        subjectName: 'Mathematics',
        keyFormulasAndRules: [
          'Percentage Change = ((New Value - Original Value) / Original Value) × 100%. Always divide by the ORIGINAL base.',
          'Successive % changes: Net = a + b + (ab / 100). If a price increases 20% and decreases 20%, net is -4% (a decrease).',
          'Fraction equivalents: 1/8 = 12.5%, 3/8 = 37.5%, 5/8 = 62.5%, 1/6 = 16.67%, 1/7 = 14.28%.',
        ],
        examDistractorTrap: 'STS Trap: A price increased by 25%. To restore the original price, it must decrease by 20%, NOT 25% (1/4 increase -> 1/5 decrease).',
        quickRecallCards: [
          { prompt: 'What is the net change after a 10% increase followed by a 10% decrease?', answer: '1% decrease (10 - 10 - 100/100 = -1%)', mnemonic: 'Equal increase & decrease always produces a net loss of x²/100%' },
          { prompt: 'What fraction corresponds to 37.5%?', answer: '3/8', mnemonic: '1/8 is 12.5%, so 3 × 12.5% = 37.5%' },
          { prompt: 'A salary rises from 40,000 to 50,000. Calculate % increase.', answer: '25% (10,000 / 40,000 × 100)', mnemonic: 'Difference ÷ Original base' },
        ],
      };
    }
    if (/ratio|proportion/.test(titleLower)) {
      return {
        topicTitle: subtopicTitle,
        subjectName: 'Mathematics',
        keyFormulasAndRules: [
          'Direct Proportion: y = kx -> y₁/x₁ = y₂/x₂ (more workers = more work done).',
          'Inverse Proportion: x₁y₁ = x₂y₂ (more workers = fewer hours needed to complete same task).',
          'Compound Ratio: If A:B = 2:3 and B:C = 4:5, then A:B:C = (2×4):(3×4):(3×5) = 8:12:15.',
        ],
        examDistractorTrap: 'STS Trap: Men and Days problem is INVERSE proportion (Men₁ × Days₁ = Men₂ × Days₂). Do not cross-multiply directly.',
        quickRecallCards: [
          { prompt: 'If 6 men complete a wall in 10 days, how many days will 15 men take?', answer: '4 days (6 × 10 = 15 × D -> 60/15 = 4)', mnemonic: 'Inverse proportion: Man-Days remains constant' },
          { prompt: 'Simplify the compound ratio of 2:3 and 4:5.', answer: '8:15 for A:C, or 8:12:15 for A:B:C', mnemonic: 'Multiply first by first, second by second' },
          { prompt: 'Three parts of 100 in the ratio 2:3:5 are:', answer: '20, 30, and 50 (Sum of parts = 10; unit = 10)', mnemonic: 'Total ÷ sum of ratio parts' },
        ],
      };
    }
  }

  if (normSubject === 'pedagogy') {
    return {
      topicTitle: subtopicTitle,
      subjectName: 'Pedagogy',
      keyFormulasAndRules: [
        'Bloom 2001 Revised Sequence: Remember → Understand → Apply → Analyse → Evaluate → Create (Apex level).',
        '5E Constructivist Sequence: Engage → Explore → Explain → Elaborate → Evaluate (Explore always comes before Explain).',
        'Mary Budd Rowe Wait Time: 3 to 5 seconds pause after posing a question boosts student response depth significantly.',
      ],
      examDistractorTrap: 'STS Trap: Thinking "Synthesis" is still the 5th level; Anderson & Krathwohl placed "Evaluate" at 5 and "Create" at 6.',
      quickRecallCards: [
        { prompt: 'In the 5E Model, which phase immediately precedes "Explain"?', answer: 'EXPLORE (Students must explore phenomena before formal naming)', mnemonic: 'Engage -> Explore -> Explain -> Elaborate -> Evaluate' },
        { prompt: 'What is the optimal teacher wait time after asking a question?', answer: '3 to 5 seconds', mnemonic: 'Mary Budd Rowe Rule' },
        { prompt: 'What are the two core pillars of true cooperative learning (Johnson & Johnson)?', answer: 'Positive Interdependence and Individual Accountability', mnemonic: '"Sink or swim together" + no free-riding' },
      ],
    };
  }

  if (normSubject === 'computer') {
    return {
      topicTitle: subtopicTitle,
      subjectName: 'Computer',
      keyFormulasAndRules: [
        'Storage Hierarchy (Fastest to Slowest): Registers → Cache (L1/L2/L3) → RAM → SSD → HDD → Optical/Tape.',
        'Binary Data Units: 1 Byte = 8 Bits, 1 KB = 1024 Bytes, 1 MB = 1024 KB, 1 GB = 1024 MB, 1 TB = 1024 GB.',
        'Essential STS Shortcuts: Ctrl+K (Hyperlink), F4 (Repeat action / Absolute reference $ in Excel), F7 (Spelling check).',
      ],
      examDistractorTrap: 'STS Trap: ROM is non-volatile (retains data without power); RAM is volatile (erases data when power is off).',
      quickRecallCards: [
        { prompt: 'Which computer memory is fastest and closest to the CPU?', answer: 'Registers (followed by L1 Cache)', mnemonic: 'Registers > Cache > RAM' },
        { prompt: 'What does pressing F7 do in MS Word and Excel?', answer: 'Opens Spelling & Grammar Check', mnemonic: 'F7 = Spellcheck' },
        { prompt: 'What is the difference between RAM and ROM?', answer: 'RAM is volatile (temporary); ROM is non-volatile (permanent firmware)', mnemonic: 'RAM forgets when powered down' },
      ],
    };
  }

  const subName = SUBJECTS_BY_SLUG.get(normSubject)?.name || 'General Knowledge';
  return {
    topicTitle: subtopicTitle,
    subjectName: subName,
    keyFormulasAndRules: [
      `Master the core definitions and official terminology in ${subtopicTitle}.`,
      `Distinguish primary causes from secondary effects; examine past exam paper recurrences in ${subName}.`,
      `Eliminate extreme options ("always", "never", "only") in STS multiple-choice questions.`,
    ],
    examDistractorTrap: 'STS Trap: Look out for negative questions containing "NOT", "EXCEPT", or "LEAST"; candidates frequently overlook the negative stem.',
    quickRecallCards: [
      { prompt: `What is the single most tested foundational concept in ${subtopicTitle}?`, answer: `Core definitions, key principles, and real-world exam applications in ${subName}.`, mnemonic: 'Focus on primary facts first' },
      { prompt: 'When faced with 4 options in an STS paper, what should you do first?', answer: 'Eliminate two clearly incorrect distractor options, then compare the remaining two on precise definitions.', mnemonic: 'Process of Elimination (POE)' },
      { prompt: 'Why is active self-testing more effective than passive re-reading?', answer: 'Active recall strengthens neural retrieval pathways and reveals genuine knowledge gaps before test day.', mnemonic: 'Testing effect > Re-reading' },
    ],
  };
};
