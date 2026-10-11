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

export interface StudyPlannerTask {
  id: string;
  kind: PlannerTaskKind;
  title: string;
  detail: string;
  durationMinutes: number;
  subjectSlug?: string;
  subtopic?: string;
  targetCount?: number;
}

export interface StudyDay {
  date: string;
  dayNumber: number;
  weekNumber: number;
  phase: StudyPhase;
  focus: string;
  topics: Array<{ id: string; subjectSlug: string; subjectName: string; subtopic: string }>;
  studyMinutes: number;
  mcqTarget: number;
  tasks: StudyPlannerTask[];
}

export interface MockAttempt {
  id: string;
  date: string;
  score: number;
  total: number;
  recordedAt: string;
}

export interface StoredStudyPlan {
  id: string;
  generatedAt: string;
  startDate: string;
  form: StudyPlannerForm;
  completedTaskIds: string[];
  completedSubtopicIds: string[];
  mockAttempts: MockAttempt[];
  aiPersonalizationRequested?: boolean;
  aiPlanStatus?: 'pending' | 'ready' | 'offline';
  aiPlanAdvice?: string;
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
      position('police-asi', 'Sindh Police ASI', ['english', 'mathematics', 'general-knowledge', 'pakistan-affairs', 'current-affairs', 'computer'], 'sindh-police-asi-2025'),
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
export const STUDY_PLANNER_STORAGE_KEY = 'muqabil_smart_study_planner_v1';
export const WEAK_AREAS = ['English', 'Mathematics', 'Current Affairs', 'GK', 'Computer', 'Islamic Studies'] as const;
export type WeakArea = typeof WEAK_AREAS[number];

const WEAK_AREA_SUBJECTS: Record<WeakArea, string> = {
  English: 'english',
  Mathematics: 'mathematics',
  'Current Affairs': 'current-affairs',
  GK: 'general-knowledge',
  Computer: 'computer',
  'Islamic Studies': 'islamic-studies',
};

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
    weakAreas: ['English', 'Mathematics'],
  };
};

export const createStudyPlanRecord = (form: StudyPlannerForm, now = new Date()): StoredStudyPlan => ({
  id: `study-plan-${now.getTime()}`,
  generatedAt: now.toISOString(),
  startDate: toLocalDateString(now),
  form: {
    ...form,
    subjectSlugs: [...new Set(form.subjectSlugs)],
    weakAreas: [...new Set(form.weakAreas)],
  },
  completedTaskIds: [],
  completedSubtopicIds: [],
  mockAttempts: [],
});

const topicId = (subjectSlug: string, subtopicIndex: number): string => `${subjectSlug}::${subtopicIndex}`;

const getPhase = (dayIndex: number, totalDays: number, isExamDay: boolean): StudyPhase => {
  if (isExamDay && dayIndex === 0) return 'exam-day';
  if (totalDays <= 3) return 'final-revision';
  const finalRevisionDays = Math.max(2, Math.ceil(totalDays * 0.18));
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

const makeTask = (
  dayDate: string,
  index: number,
  kind: PlannerTaskKind,
  title: string,
  detail: string,
  metadata: Pick<StudyPlannerTask, 'subjectSlug' | 'subtopic' | 'targetCount'> = {},
): StudyPlannerTask => ({
  id: `${dayDate}:${kind}:${index}`,
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

const getSelectedFocusTopics = (form: StudyPlannerForm, dayCount: number): StudyDay['topics'][] => {
  const subjects = getPlannerSubjects(form.subjectSlugs);
  if (!subjects.length) return Array.from({ length: dayCount }, () => []);

  const weakSlugs = new Set(
    form.weakAreas
      .map((area) => WEAK_AREA_SUBJECTS[area as WeakArea])
      .filter((slug) => subjects.some((subject) => subject.slug === slug)),
  );
  const wheel = subjects.flatMap((subject) => [
    subject.slug,
    ...(weakSlugs.has(subject.slug) ? [subject.slug] : []),
  ]);
  const subjectBySlug = new Map(subjects.map((subject) => [subject.slug, subject]));
  const nextSubtopicIndex = new Map(subjects.map((subject) => [subject.slug, 0]));
  const result: StudyDay['topics'][] = [];
  let wheelIndex = 0;

  for (let dayIndex = 0; dayIndex < dayCount; dayIndex += 1) {
    const numberOfTopics = form.dailyStudyMinutes >= 180 ? 2 : 1;
    const selected: StudyDay['topics'] = [];
    for (let slot = 0; slot < numberOfTopics; slot += 1) {
      const subjectSlug = wheel[wheelIndex % wheel.length];
      wheelIndex += 1;
      const subject = subjectBySlug.get(subjectSlug);
      if (!subject) continue;
      const nextIndex = nextSubtopicIndex.get(subjectSlug) ?? 0;
      const subtopicIndex = nextIndex % subject.subtopics.length;
      nextSubtopicIndex.set(subjectSlug, nextIndex + 1);
      selected.push({
        id: topicId(subjectSlug, subtopicIndex),
        subjectSlug,
        subjectName: subject.name,
        subtopic: subject.subtopics[subtopicIndex],
      });
    }
    result.push(selected);
  }
  return result;
};

export const generateStudySchedule = (form: StudyPlannerForm, startDate: string): StudyDay[] => {
  const rawDayCount = daysBetweenDates(startDate, form.examDate);
  if (rawDayCount < 0) return [];
  const dayCount = Math.min(MAX_PLAN_HORIZON_DAYS, Math.max(1, rawDayCount));
  const focusTopics = getSelectedFocusTopics(form, dayCount);
  const dailyMcqTarget = getDailyMcqTarget(form);
  const mockOnly = form.preparationMode === 'mock-tests';
  const includesMcqs = ['mcqs', 'mcqs-notes', 'complete'].includes(form.preparationMode);
  const includesNotes = ['notes', 'mcqs-notes', 'complete'].includes(form.preparationMode);
  const days: StudyDay[] = [];

  for (let dayIndex = 0; dayIndex < dayCount; dayIndex += 1) {
    const date = addDaysToDateString(startDate, dayIndex);
    const phase = getPhase(dayIndex, dayCount, rawDayCount === 0);
    const topics = focusTopics[dayIndex] ?? [];
    const mainTopic = topics[0];
    const focus = topics.length
      ? topics.map((topic) => `${topic.subjectName}: ${topic.subtopic}`).join(' · ')
      : 'Review your selected syllabus';
    const tasks: StudyPlannerTask[] = [];

    if (phase === 'exam-day') {
      tasks.push(makeTask(date, tasks.length, 'light-review', 'Exam-day warm-up', 'Review a short formula / fact sheet, prepare your materials and protect your rest.', mainTopic ? { subjectSlug: mainTopic.subjectSlug, subtopic: mainTopic.subtopic } : {}));
    } else if (mockOnly) {
      const isMockDay = (dayIndex % 3 === 0 || dayIndex % 7 === 6) && dayIndex < dayCount - 1;
      if (isMockDay) {
        const count = Math.max(10, Math.round(Math.min(60, form.dailyStudyMinutes * 0.7) / 5) * 5);
        tasks.push(makeTask(date, tasks.length, 'mock', `Take a ${count}-question timed mock`, 'Use exam conditions, then record the score in your progress dashboard.', { targetCount: count }));
      } else {
        tasks.push(makeTask(date, tasks.length, 'analysis', 'Analyse your latest mock', 'Review every wrong answer, identify the pattern and note one correction for your next attempt.'));
      }
    } else {
      if (phase !== 'final-revision' && mainTopic && form.preparationMode !== 'mcqs') {
        tasks.push(makeTask(date, tasks.length, 'learn', `Study ${mainTopic.subtopic}`, `Learn the core ideas in ${mainTopic.subjectName}; explain the topic in your own words.`, { subjectSlug: mainTopic.subjectSlug, subtopic: mainTopic.subtopic }));
      }
      if (includesMcqs && dailyMcqTarget > 0) {
        const mcqSubject = mainTopic?.subjectName ?? 'selected topics';
        tasks.push(makeTask(date, tasks.length, 'mcq', `Practise ${dailyMcqTarget} MCQs`, `Work through a timed set on ${mcqSubject}; review each incorrect answer.`, { ...(mainTopic ? { subjectSlug: mainTopic.subjectSlug } : {}), targetCount: dailyMcqTarget }));
      }
      if (includesNotes && mainTopic) {
        tasks.push(makeTask(date, tasks.length, 'notes', `Make smart notes: ${mainTopic.subtopic}`, `Capture key facts, a short example and one likely exam trap for ${mainTopic.subjectName}.`, { subjectSlug: mainTopic.subjectSlug, subtopic: mainTopic.subtopic }));
      }
      if (phase === 'final-revision' || (dayIndex > 0 && dayIndex % 3 === 0)) {
        const reviewTopic = focusTopics[Math.max(0, dayIndex - 2)]?.[0] ?? mainTopic;
        tasks.push(makeTask(date, tasks.length, 'revision', reviewTopic ? `Spaced revision: ${reviewTopic.subtopic}` : 'Spaced revision', 'Recall first without notes, then check gaps and correct the error log.', reviewTopic ? { subjectSlug: reviewTopic.subjectSlug, subtopic: reviewTopic.subtopic } : {}));
      }
      if (includesMcqs && dayIndex % 7 === 6 && dayIndex < dayCount - 1) {
        tasks.push(makeTask(date, tasks.length, 'mock', 'Weekly mock test', 'Complete a timed mixed mock, then log your score to track progress.', { targetCount: 50 }));
      }
      if (!tasks.length) {
        tasks.push(makeTask(date, tasks.length, 'revision', 'Review your selected syllabus', 'Use active recall on a weak topic and write down one question to revisit.'));
      }
    }

    days.push({
      date,
      dayNumber: dayIndex + 1,
      weekNumber: Math.floor(dayIndex / 7) + 1,
      phase,
      focus,
      topics,
      studyMinutes: form.dailyStudyMinutes,
      mcqTarget: phase === 'exam-day' ? 0 : dailyMcqTarget,
      tasks: allocateTaskMinutes(tasks, form.dailyStudyMinutes),
    });
  }
  return days;
};

export const getTargetScorePercent = (targetScore: StudyPlannerForm['targetScore']): number =>
  TARGET_SCORE_OPTIONS.find((item) => item.id === targetScore)?.percent ?? 70;

const dateFromTaskId = (taskId: string): string => taskId.slice(0, 10);

export const getPlannerProgress = (
  plan: StoredStudyPlan,
  schedule: StudyDay[],
  today: string,
): PlannerProgress => {
  const scheduledTaskIds = new Set(schedule.flatMap((day) => day.tasks.map((task) => task.id)));
  const completedTaskIds = new Set(plan.completedTaskIds.filter((id) => scheduledTaskIds.has(id)));
  const totalTasks = scheduledTaskIds.size;
  const completedTasks = completedTaskIds.size;
  const taskCompletionPercent = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const totalSubtopics = getTopicCount(plan.form.subjectSlugs);
  const completedSubtopicSet = new Set(plan.completedSubtopicIds);
  const completedSubtopics = getPlannerSubjects(plan.form.subjectSlugs).reduce((total, subject) =>
    total + subject.subtopics.filter((_, index) => completedSubtopicSet.has(topicId(subject.slug, index))).length, 0);
  const syllabusCoveragePercent = totalSubtopics ? Math.round((completedSubtopics / totalSubtopics) * 100) : 0;

  const activityDates = new Set(
    [...[...completedTaskIds].map(dateFromTaskId), ...plan.mockAttempts.map((attempt) => attempt.date)]
      .filter((date) => date <= today),
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
  const mockAttainment = averageMockScore === null ? 0 : Math.min(100, Math.round((averageMockScore / targetScorePercent) * 100));
  const readinessScore = Math.round(syllabusCoveragePercent * 0.4 + taskCompletionPercent * 0.35 + mockAttainment * 0.25);

  const badges: PlannerProgress['badges'] = [];
  if (completedTasks > 0) badges.push({ id: 'first-step', title: 'First Step', description: 'Completed your first study target.', icon: '🌱' });
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
  const subjects = getPlannerSubjects(form.subjectSlugs);
  const syllabusLines = subjects.map((subject) => `- ${subject.name}: ${subject.subtopics.join('; ')}`).join('\n');
  const weakAreas = form.weakAreas.length ? form.weakAreas.join(', ') : 'none selected';
  const target = form.targetScore === 'merit' ? 'top merit position' : form.targetScore === 'pass' ? 'pass the test' : `${form.targetScore}%`;
  const mode = PREPARATION_MODES.find((item) => item.id === form.preparationMode)?.label ?? form.preparationMode;
  return `Create a personalised coaching overlay for this MUQABIL study roadmap. Keep it practical and concise (under 350 words). Include a daily routine that fits ${form.dailyStudyMinutes} minutes, a weekly checkpoint, a first-week focus sequence using only the syllabus topics below, a strategy for the weak areas, and a final-revision tip. Do not invent official syllabus weights, topics, dates, or guarantee a result.\n\nExam: ${organization} — ${positionName}\nExam date: ${form.examDate}\nCurrent level: ${form.currentLevel}\nPreparation mode: ${mode}\nTarget: ${target}\nWeak areas: ${weakAreas}\nMapped MUQABIL syllabus:\n${syllabusLines}`;
};

export const createMentorPrompt = (plan: StoredStudyPlan, day?: StudyDay): string => {
  const organization = getOrganization(plan.form.organizationId).name;
  const positionName = getPositionName(plan.form);
  const topicText = day?.topics.map((topic) => `${topic.subjectName} — ${topic.subtopic}`).join('; ')
    || getPlannerSubjects(plan.form.subjectSlugs).map((subject) => subject.name).join(', ');
  const weakAreas = plan.form.weakAreas.length ? plan.form.weakAreas.join(', ') : 'none selected';
  return `I am preparing for ${positionName} through ${organization}. My exam date is ${plan.form.examDate}, my current level is ${plan.form.currentLevel}, I can study ${plan.form.dailyStudyMinutes} minutes per day, and my target is ${plan.form.targetScore === 'merit' ? 'a top merit position' : plan.form.targetScore === 'pass' ? 'to pass' : `${plan.form.targetScore}%`} . My selected preparation mode is ${PREPARATION_MODES.find((item) => item.id === plan.form.preparationMode)?.label}. Today's focus is ${topicText}. My weak areas are ${weakAreas}. Give me one focused, practical study session for today: explain the highest-yield concept, include a short recall check, and end with a realistic next step. Keep claims about official syllabi qualified and tell me to verify details against the latest official notice.`;
};

export const loadStoredStudyPlan = (storage: Pick<Storage, 'getItem'> | null | undefined): StoredStudyPlan | null => {
  if (!storage) return null;
  try {
    const serialized = storage.getItem(STUDY_PLANNER_STORAGE_KEY);
    if (!serialized) return null;
    const value = JSON.parse(serialized) as Partial<StoredStudyPlan>;
    if (!value || typeof value !== 'object' || !value.form || !Array.isArray(value.form.subjectSlugs)) return null;
    if (!value.id || !value.startDate || !value.form.organizationId || !value.form.positionId || !value.form.examDate) return null;
    return {
      id: value.id,
      generatedAt: value.generatedAt ?? new Date().toISOString(),
      startDate: value.startDate,
      form: {
        ...createDefaultStudyPlannerForm(value.startDate),
        ...value.form,
        subjectSlugs: [...new Set(value.form.subjectSlugs.filter((slug): slug is string => typeof slug === 'string' && SUBJECTS_BY_SLUG.has(slug)))],
        weakAreas: Array.isArray(value.form.weakAreas) ? value.form.weakAreas.filter((area): area is string => typeof area === 'string' && WEAK_AREAS.includes(area as WeakArea)) : [],
      } as StudyPlannerForm,
      completedTaskIds: Array.isArray(value.completedTaskIds) ? value.completedTaskIds.filter((id): id is string => typeof id === 'string') : [],
      completedSubtopicIds: Array.isArray(value.completedSubtopicIds) ? value.completedSubtopicIds.filter((id): id is string => typeof id === 'string') : [],
      mockAttempts: Array.isArray(value.mockAttempts) ? value.mockAttempts.filter((attempt): attempt is MockAttempt =>
        Boolean(attempt && typeof attempt.id === 'string' && typeof attempt.date === 'string' && Number.isFinite(attempt.score) && Number.isFinite(attempt.total) && attempt.total > 0),
      ) : [],
      ...(value.aiPersonalizationRequested === true ? { aiPersonalizationRequested: true } : {}),
      ...(value.aiPlanStatus === 'pending' ? { aiPlanStatus: 'offline' as const } : value.aiPlanStatus === 'ready' || value.aiPlanStatus === 'offline' ? { aiPlanStatus: value.aiPlanStatus } : {}),
      ...(typeof value.aiPlanAdvice === 'string' ? { aiPlanAdvice: value.aiPlanAdvice.slice(0, 3500) } : {}),
    };
  } catch {
    return null;
  }
};
