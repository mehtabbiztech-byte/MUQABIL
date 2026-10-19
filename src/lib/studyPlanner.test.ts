import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addDaysToDateString,
  createAiPlanPrompt,
  createDefaultStudyPlannerForm,
  createMentorPrompt,
  createStudyPlanRecord,
  daysBetweenDates,
  exportPlanScheduleAsIcs,
  exportStudyPlannerBackup,
  getPlanFeasibility,
  getStudyPlanTopics,
  generateStudySchedule,
  getDailyMcqTarget,
  getPlannerProgress,
  getMockSubjectScoresFromQuiz,
  getPositionName,
  getPosition,
  getSyllabusRecord,
  getTopicCount,
  loadStoredStudyPlan,
  loadStoredStudyPlans,
  saveStoredStudyPlans,
  appendStudyPlannerMockAttempt,
  mergeStudyPlannerCollections,
  parseStudyPlannerBackup,
  normalizeWeakArea,
  POPULAR_EXAM_PRESETS,
  rebalancePlanSchedule,
  exportPlanScheduleAsText,
  STUDY_ORGANIZATIONS,
  STUDY_PLANNER_STORAGE_KEY,
  STUDY_PLANS_STORAGE_KEY,
  calculateMeritProjection,
  loadVaultMistakes,
  saveVaultMistakes,
  appendVaultMistake,
  reviewVaultCard,
  getVaultStats,
  getTopicHighYieldSprint,
  type PlannerProgress,
  type StoredStudyPlan,
  type StudyPlannerForm,
} from './studyPlanner';

const fixedToday = '2026-10-11';

const formWith = (patch: Partial<StudyPlannerForm> = {}): StudyPlannerForm => ({
  ...createDefaultStudyPlannerForm(fixedToday),
  ...patch,
});

test('organization choices include the requested agencies and dynamically scoped positions', () => {
  const names = STUDY_ORGANIZATIONS.map((organization) => organization.name);
  for (const name of ['STS (Sukkur IBA Testing Services)', 'FPSC', 'SPSC', 'PPSC', 'BPSC', 'KPPSC', 'NTS', 'IBA Sukkur', 'HEC', 'Teaching License', 'Police Recruitment', 'Custom Test']) {
    assert.ok(names.includes(name), name);
  }
  assert.ok(getPosition('fpsc', 'css-mpt').name.includes('CSS'));
  assert.ok(getPosition('nts', 'nat').name.includes('NAT'));
  assert.notEqual(getPosition('fpsc', 'css-mpt').subjectSlugs.join(','), getPosition('hec', 'hat-general').subjectSlugs.join(','));
});

test('known STS positions connect the existing syllabus record and MUQABIL subtopics', () => {
  const form = formWith({ organizationId: 'sts', positionId: 'graduation-bps-05-15' });
  const record = getSyllabusRecord(form);
  assert.equal(record?.id, 'screen-grad-2025');
  assert.ok(record?.sourceUrl.startsWith('https://'));
  assert.ok(form.subjectSlugs.includes('english'));
  assert.ok(getTopicCount(form.subjectSlugs) > form.subjectSlugs.length);
  assert.equal(getPositionName(form), 'Graduation category · BPS 05–15');

  const policeForm = formWith({ organizationId: 'sts', positionId: 'police-asi', subjectSlugs: [...getPosition('sts', 'police-asi').subjectSlugs] });
  const policeRecord = getSyllabusRecord(policeForm);
  const policeTopics = getStudyPlanTopics(policeForm).filter((topic) => topic.syllabusRecordId === policeRecord?.id);
  assert.ok(policeTopics.some((topic) => topic.subjectSlug === 'urdu'));
  assert.ok(policeTopics.some((topic) => topic.subjectSlug === 'sindhi'));
  policeRecord?.sections.forEach((section) => section.topics.forEach((title) => {
    assert.ok(policeTopics.some((topic) => topic.sectionName === section.name && topic.subtopic === title), `${section.name}: ${title}`);
  }));

  const teachingForm = formWith({ organizationId: 'sts', positionId: 'teaching-license', subjectSlugs: [...getPosition('sts', 'teaching-license').subjectSlugs] });
  const teachingRecord = getSyllabusRecord(teachingForm);
  const sourcedTeachingTopics = getStudyPlanTopics(teachingForm).filter((topic) => topic.syllabusRecordId === teachingRecord?.id);
  const expectedTeachingTopicCount = teachingRecord?.sections.reduce((total, section) => total + section.topics.length, 0) ?? 0;
  assert.equal(sourcedTeachingTopics.length, expectedTeachingTopicCount, 'every published teaching topic maps to a selected syllabus subject');
});

test('published syllabus topics and section weights drive unique, topic-level schedule tasks', () => {
  const form = formWith({ examDate: addDaysToDateString(fixedToday, 60) });
  const topics = getStudyPlanTopics(form);
  assert.ok(topics.length > 0);
  assert.ok(topics.some((topic) => topic.sectionName === 'English' && topic.sectionWeight === 40));
  assert.ok(topics.some((topic) => topic.sectionName === 'Mathematics' && topic.sectionWeight === 20));
  assert.ok(topics.some((topic) => topic.sectionName === 'General Knowledge' && topic.sectionWeight === 40));
  assert.ok(topics.some((topic) => topic.syllabusRecordId === 'screen-grad-2025'));

  const schedule = generateStudySchedule(form, fixedToday);
  const firstPassTasks = schedule.flatMap((day) => day.tasks).filter((task) => task.kind === 'learn' && task.topicId);
  const scheduledTopicIds = new Set(firstPassTasks.map((task) => task.topicId));
  assert.equal(scheduledTopicIds.size, topics.length, 'each matched syllabus topic receives a first-pass task');
  assert.ok(topics.every((topic) => scheduledTopicIds.has(topic.id)));
  assert.equal(new Set(firstPassTasks.map((task) => task.id)).size, topics.length, 'topic tasks use stable, unique IDs');
});

test('coverage feasibility warns on short plans but never silently omits mapped topics', () => {
  const tightForm = formWith({ examDate: addDaysToDateString(fixedToday, 3), dailyStudyMinutes: 30 });
  const feasibility = getPlanFeasibility(tightForm, fixedToday);
  assert.equal(feasibility.feasible, false);
  assert.ok(feasibility.requiredTopicsPerDay > feasibility.topicsPerDayCapacity);
  const schedule = generateStudySchedule(tightForm, fixedToday);
  const scheduledTopicIds = new Set(schedule.flatMap((day) => day.tasks)
    .filter((task) => task.kind === 'learn' && task.topicId)
    .map((task) => task.topicId));
  assert.equal(scheduledTopicIds.size, getStudyPlanTopics(tightForm).length);
  assert.ok(schedule.some((day) => day.studyMinutes > day.budgetMinutes), 'overloaded days expose their real estimated load');
});

test('quiz subject accuracy and selected weak areas adapt the order of future topic work', () => {
  const form = formWith({ examDate: addDaysToDateString(fixedToday, 60), weakAreas: [] });
  const attempt = {
    id: 'adaptive-low-english',
    date: fixedToday,
    score: 10,
    total: 30,
    recordedAt: `${fixedToday}T13:00:00Z`,
    source: 'quiz' as const,
    subjectScores: [
      { subjectSlug: 'english', score: 0, total: 10 },
      { subjectSlug: 'general-knowledge', score: 10, total: 10 },
      { subjectSlug: 'mathematics', score: 10, total: 10 },
    ],
  };
  const defaultOrder = generateStudySchedule(form, fixedToday).flatMap((day) => day.topics).map((topic) => topic.subjectSlug);
  const adaptiveOrder = generateStudySchedule(form, fixedToday, { mockAttempts: [attempt] }).flatMap((day) => day.topics).map((topic) => topic.subjectSlug);
  assert.equal(defaultOrder[0], 'english');
  assert.equal(defaultOrder[1], 'current-affairs');
  assert.deepEqual(adaptiveOrder.slice(0, 2), ['english', 'english']);

  const weakAreaForm = { ...form, weakAreas: ['mathematics'] };
  const weakAreaOrder = generateStudySchedule(weakAreaForm, fixedToday).flatMap((day) => day.topics).map((topic) => topic.subjectSlug);
  assert.ok(weakAreaOrder.indexOf('mathematics') < defaultOrder.indexOf('mathematics'));
  assert.equal(normalizeWeakArea('Pedagogy'), 'pedagogy');
  assert.equal(normalizeWeakArea('General Science'), 'everyday-science');
  assert.ok(POPULAR_EXAM_PRESETS.every((preset) => preset.weakAreas.every((area) => normalizeWeakArea(area) === area)));
});

test('quiz subject results normalize MCQ category labels and include unanswered questions', () => {
  const subjectScores = getMockSubjectScoresFromQuiz([
    { category: 'English', correctIndex: 1 },
    { category: 'mathematics', correctIndex: 0 },
    { category: 'General Science', correctIndex: 2 },
    { category: 'English', correctIndex: 3 },
  ], { 0: 1, 1: 1, 2: 2 });
  assert.deepEqual(subjectScores, [
    { subjectSlug: 'english', score: 1, total: 2 },
    { subjectSlug: 'mathematics', score: 0, total: 1 },
    { subjectSlug: 'everyday-science', score: 1, total: 1 },
  ]);
});

test('date helpers handle inclusive planning boundaries and leap days without timezone drift', () => {
  assert.equal(daysBetweenDates('2028-02-28', '2028-03-01'), 2);
  assert.equal(addDaysToDateString('2028-02-28', 1), '2028-02-29');
  assert.equal(daysBetweenDates('2026-10-11', '2026-10-10'), -1);
});

test('schedule generation makes daily plans through the day before the exam and includes a weekly mock', () => {
  const form = formWith({ examDate: addDaysToDateString(fixedToday, 8) });
  const schedule = generateStudySchedule(form, fixedToday);
  assert.equal(schedule.length, 8);
  assert.equal(schedule[0].date, fixedToday);
  assert.equal(schedule.at(-1)?.date, '2026-10-18');
  assert.ok(schedule.some((day) => day.tasks.some((task) => task.kind === 'mock')));
  assert.ok(schedule.every((day) => day.tasks.length > 0));
  assert.ok(schedule.every((day) => day.tasks.every((task) => task.durationMinutes >= 5)));
  assert.ok(schedule.some((day) => day.tasks.some((task) => task.kind === 'revision')));
  const fiveDayForm = formWith({ examDate: addDaysToDateString(fixedToday, 5) });
  const shortWindow = generateStudySchedule(fiveDayForm, fixedToday);
  assert.equal(getPlanFeasibility(fiveDayForm, fixedToday).learningDays, 5, 'short plans use every available day to check topic feasibility');
  const sixDayForm = formWith({ examDate: addDaysToDateString(fixedToday, 6) });
  assert.equal(getPlanFeasibility(sixDayForm, fixedToday).learningDays, 4, 'plans longer than five days reserve final-revision time');
  assert.equal(shortWindow.at(-1)?.phase, 'final-revision');
  assert.ok(!shortWindow.at(-1)?.tasks.some((task) => task.kind === 'mock'), 'avoid a timed mock on the day before the exam');
});

test('exam-day plans are a light warm-up; expired exam dates do not create future tasks', () => {
  const examDay = generateStudySchedule(formWith({ examDate: fixedToday }), fixedToday);
  assert.equal(examDay.length, 1);
  assert.equal(examDay[0].phase, 'exam-day');
  assert.equal(examDay[0].mcqTarget, 0);
  assert.deepEqual(examDay[0].tasks.map((task) => task.kind), ['light-review']);
  const dayBeforeExam = generateStudySchedule(formWith({ examDate: addDaysToDateString(fixedToday, 1) }), fixedToday);
  assert.equal(dayBeforeExam[0].phase, 'final-revision');
  assert.notEqual(dayBeforeExam[0].phase, 'exam-day');
  assert.deepEqual(generateStudySchedule(formWith({ examDate: '2026-10-10' }), fixedToday), []);
});

test('preparation modes alter task mix and MCQ targets appropriately', () => {
  const mcqs = formWith({ preparationMode: 'mcqs', dailyStudyMinutes: 60 });
  const notes = formWith({ preparationMode: 'notes', dailyStudyMinutes: 60 });
  const mocks = formWith({ preparationMode: 'mock-tests', dailyStudyMinutes: 60 });
  const mcqTasks = generateStudySchedule({ ...mcqs, examDate: addDaysToDateString(fixedToday, 4) }, fixedToday)[0].tasks;
  const noteTasks = generateStudySchedule({ ...notes, examDate: addDaysToDateString(fixedToday, 4) }, fixedToday)[0].tasks;
  const mockTasks = generateStudySchedule({ ...mocks, examDate: addDaysToDateString(fixedToday, 4) }, fixedToday)[0].tasks;
  assert.ok(mcqTasks.some((task) => task.kind === 'mcq'));
  assert.equal(getDailyMcqTarget(notes), 0);
  assert.equal(getDailyMcqTarget(mocks), 0);
  assert.ok(noteTasks.some((task) => task.kind === 'notes'));
  assert.ok(mockTasks.some((task) => task.kind === 'mock'));
  assert.ok(getDailyMcqTarget(mcqs) > 0);
});

test('progress measures syllabus, completed targets, mock results, streaks and earned badges', () => {
  const form = formWith({ examDate: addDaysToDateString(fixedToday, 8) });
  const plan = createStudyPlanRecord(form, new Date(`${fixedToday}T12:00:00Z`));
  const schedule = generateStudySchedule(form, fixedToday);
  plan.completedTaskIds = schedule[0].tasks.map((task) => task.id);
  plan.completedSubtopicIds = getStudyPlanTopics(form).slice(0, 2).map((topic) => topic.id);
  plan.mockAttempts = [{ id: 'mock-one', date: fixedToday, score: 8, total: 10, recordedAt: `${fixedToday}T13:00:00Z` }];
  const progress = getPlannerProgress(plan, schedule, fixedToday);
  assert.equal(progress.completedTasks, schedule[0].tasks.length);
  assert.equal(progress.averageMockScore, 80);
  assert.equal(progress.currentStreak, 1);
  assert.ok(progress.syllabusCoveragePercent > 0);
  assert.ok(progress.readinessScore > 0);
  assert.ok(progress.badges.some((badge) => badge.id === 'first-step'));
  assert.ok(progress.badges.some((badge) => badge.id === 'first-mock'));
  const mockOnlyActivity = getPlannerProgress({ ...plan, completedTaskIds: [] }, schedule, fixedToday);
  assert.equal(mockOnlyActivity.activeDays, 1);
  assert.equal(mockOnlyActivity.currentStreak, 1);
});

test('mentor prompt includes the user’s chosen exam and today focus without sending it anywhere', () => {
  const form = formWith({ customPosition: 'Assistant Director', positionId: 'custom', organizationId: 'fpsc' });
  const plan = createStudyPlanRecord(form, new Date(`${fixedToday}T12:00:00Z`));
  const schedule = generateStudySchedule(form, fixedToday);
  const prompt = createMentorPrompt(plan, schedule[0]);
  assert.equal(getPositionName(form), 'Assistant Director');
  assert.match(prompt, /Assistant Director/);
  assert.match(prompt, /today/i);
  assert.match(prompt, /English/);
});

test('AI plan prompt uses only the selected syllabus and qualifies official claims', () => {
  const prompt = createAiPlanPrompt(formWith({ examDate: '2026-12-10', weakAreas: ['English'] }));
  assert.match(prompt, /2026-12-10/);
  assert.match(prompt, /Selected syllabus topics/);
  assert.match(prompt, /Reading comprehension|Appropriate Prepositions/);
  assert.match(prompt, /Do not invent official syllabus weights/);
});

test('stored planner data is validated and safely defaults optional progress', () => {
  const record = { ...createStudyPlanRecord(formWith(), new Date(`${fixedToday}T12:00:00Z`)), aiPersonalizationRequested: true, aiPlanStatus: 'ready' as const, aiPlanAdvice: 'A short strategy.' };
  const storage = { getItem: (key: string) => key === STUDY_PLANNER_STORAGE_KEY ? JSON.stringify(record) : null };
  const loaded = loadStoredStudyPlan(storage as Pick<Storage, 'getItem'>);
  assert.equal(loaded?.id, record.id);
  assert.deepEqual(loaded?.completedTaskIds, []);
  assert.equal(loaded?.aiPlanAdvice, 'A short strategy.');
  const interruptedRequest = { ...record, aiPlanStatus: 'pending' as const };
  assert.equal(loadStoredStudyPlan({ getItem: () => JSON.stringify(interruptedRequest) })?.aiPlanStatus, 'offline');
  assert.equal(loadStoredStudyPlan({ getItem: () => '{broken' }), null);
});

test('multi-plan storage migrates, backs up, restores and records planner-linked quiz results', () => {
  const store = new Map<string, string>();
  const storage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => { store.set(key, value); },
    removeItem: (key: string) => { store.delete(key); },
  } as Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
  const first = createStudyPlanRecord(formWith({ examDate: '2026-12-01' }), new Date(`${fixedToday}T10:00:00Z`));
  const second = createStudyPlanRecord(formWith({ examDate: '2027-01-01', organizationId: 'fpsc', positionId: 'css-mpt' }), new Date(`${fixedToday}T11:00:00Z`));
  const collection = { activePlanId: second.id, plans: [first, second] };
  assert.equal(saveStoredStudyPlans(storage, collection), true);
  assert.ok(store.has(STUDY_PLANS_STORAGE_KEY));
  const loaded = loadStoredStudyPlans(storage);
  assert.equal(loaded.activePlanId, second.id);
  assert.deepEqual(loaded.plans.map((plan) => plan.id), [first.id, second.id]);

  const backup = exportStudyPlannerBackup(loaded);
  const restored = parseStudyPlannerBackup(backup);
  assert.equal(restored?.plans.length, 2);
  assert.equal(restored?.activePlanId, second.id);
  assert.equal(parseStudyPlannerBackup('{"format":"other"}'), null);

  const merged = mergeStudyPlannerCollections({ activePlanId: first.id, plans: [first] }, restored!);
  assert.equal(merged.plans.length, 2);
  assert.equal(merged.activePlanId, first.id, 'local active selection wins when merging device and account data');

  const scheduledMock = generateStudySchedule(first.form, first.startDate).flatMap((day) => day.tasks).find((task) => task.kind === 'mock');
  assert.ok(scheduledMock);
  const saved = appendStudyPlannerMockAttempt(storage, first.id, {
    id: 'linked-quiz',
    date: fixedToday,
    score: 7,
    total: 10,
    recordedAt: `${fixedToday}T12:00:00Z`,
    source: 'quiz',
    subjectScores: [{ subjectSlug: 'english', score: 5, total: 8 }],
    completedTaskId: scheduledMock.id,
  });
  assert.equal(saved, true);
  const updated = loadStoredStudyPlans(storage).plans.find((plan) => plan.id === first.id);
  assert.equal(updated?.mockAttempts[0].source, 'quiz');
  assert.deepEqual(updated?.mockAttempts[0].subjectScores, [{ subjectSlug: 'english', score: 5, total: 8 }]);
  assert.ok(updated?.completedTaskIds.includes(scheduledMock.id));
  assert.equal(saveStoredStudyPlans(storage, { activePlanId: null, plans: [] }), true);
  assert.equal(store.has(STUDY_PLANNER_STORAGE_KEY), false, 'deleting the last plan also clears its legacy single-plan backup');
});

test('popular exam presets, rebalancer and text export work smoothly', () => {
  assert.ok(POPULAR_EXAM_PRESETS.length >= 6);
  const stsGrad = POPULAR_EXAM_PRESETS.find((p) => p.id === 'sts-grad');
  assert.ok(stsGrad);
  assert.equal(stsGrad.organizationId, 'sts');

  const teachingPreset = POPULAR_EXAM_PRESETS.find((p) => p.id === 'sts-teaching-license');
  assert.ok(teachingPreset);
  assert.equal(teachingPreset.positionId, 'teaching-license');
  assert.equal(teachingPreset.organizationId, 'sts');

  const baseForm = formWith({ examDate: '2026-10-20' });
  const basePlan = createStudyPlanRecord(baseForm, new Date(`${fixedToday}T12:00:00Z`));
  const originalSchedule = generateStudySchedule(basePlan.form, basePlan.startDate);
  const completedContentTask = originalSchedule.flatMap((day) => day.tasks).find((task) => task.kind === 'learn' && task.topicId);
  assert.ok(completedContentTask?.topicId);
  basePlan.completedTaskIds = [completedContentTask.id];
  basePlan.completedTaskDates = { [completedContentTask.id]: fixedToday };
  const rebalanced = rebalancePlanSchedule(basePlan, '2026-10-15');
  assert.equal(rebalanced.startDate, '2026-10-15');
  assert.equal(rebalanced.form.examDate, basePlan.form.examDate, 'rebalancing never moves a fixed exam date');
  assert.ok(rebalanced.completedTaskIds.includes(completedContentTask.id));
  assert.ok(rebalanced.completedTopicIds?.includes(completedContentTask.topicId));
  assert.ok(!rebalanced.plannedTopicIds?.includes(completedContentTask.topicId));
  const pendingSchedule = generateStudySchedule(rebalanced.form, rebalanced.startDate, { topicIds: rebalanced.plannedTopicIds });
  assert.ok(pendingSchedule.flatMap((day) => day.topics).every((topic) => topic.id !== completedContentTask.topicId));
  const rebalancedProgress = getPlannerProgress(rebalanced, pendingSchedule, '2026-10-15');
  assert.ok(rebalancedProgress.completedTasks >= 1, 'completed work remains visible after the schedule moves forward');

  const passedExamPlan = rebalancePlanSchedule({ ...basePlan, form: { ...basePlan.form, examDate: '2026-10-12' } }, '2026-10-15');
  assert.equal(passedExamPlan.form.examDate, '2026-10-12', 'past exam dates are never extended silently');

  const schedule = generateStudySchedule(basePlan.form, fixedToday);
  const exported = exportPlanScheduleAsText(basePlan, schedule);
  assert.match(exported, /MUQABIL SMART STUDY ROADMAP/);
  assert.match(exported, /DAILY STUDY SCHEDULE/);
  assert.match(exported, /Syllabus Source/);
  const calendar = exportPlanScheduleAsIcs(basePlan, schedule);
  assert.match(calendar, /BEGIN:VCALENDAR/);
  assert.match(calendar, /SUMMARY:/);
});

test('merit rank & score projection engine calculates realistic ranges, cutoffs and recommendations', () => {
  const baseForm = formWith({ examDate: '2026-10-20', targetScore: 'merit' });
  const plan = createStudyPlanRecord(baseForm, new Date(`${fixedToday}T12:00:00Z`));
  const schedule = generateStudySchedule(plan.form, fixedToday);
  const progress = getPlannerProgress(plan, schedule, fixedToday);

  const projection = calculateMeritProjection(plan, progress);
  assert.ok(projection.projectedMedian >= 20 && projection.projectedMedian <= 96);
  assert.ok(projection.projectedMinScore <= projection.projectedMedian);
  assert.ok(projection.projectedMaxScore >= projection.projectedMedian);
  assert.ok(projection.passingLikelihood >= 1 && projection.passingLikelihood <= 99);
  assert.ok(projection.meritRankLikelihood >= 1 && projection.meritRankLikelihood <= 98);
  assert.ok(typeof projection.tier === 'string');
  assert.ok(typeof projection.tierLabel === 'string');
  assert.ok(Array.isArray(projection.recommendations));
  assert.ok(projection.recommendations.length > 0);

  // Test with mock attempts and coverage
  const highMockPlan: StoredStudyPlan = {
    ...plan,
    mockAttempts: [
      { id: 'mock-1', date: fixedToday, score: 85, total: 100, recordedAt: `${fixedToday}T12:00:00Z` },
      { id: 'mock-2', date: fixedToday, score: 90, total: 100, recordedAt: `${fixedToday}T12:00:00Z` },
    ],
  };
  const highProgress: PlannerProgress = {
    ...progress,
    syllabusCoveragePercent: 80,
    taskCompletionPercent: 75,
  };
  const highProjection = calculateMeritProjection(highMockPlan, highProgress);
  assert.ok(highProjection.projectedMedian > projection.projectedMedian, 'higher mock scores boost projected median');
  assert.ok(highProjection.passingLikelihood >= 80, 'high performers have high passing likelihood');
});

test('memory vault SM-2 spaced repetition, review ratings, stats and deduplication work correctly', () => {
  const store = new Map<string, string>();
  const mockStorage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, val: string) => store.set(key, val),
  };

  const initialItems = loadVaultMistakes(mockStorage);
  assert.equal(initialItems.length, 0);

  const added = appendVaultMistake(mockStorage, {
    planId: 'plan-123',
    questionId: 'q-sindh-barrage',
    question: 'Which barrage is located closest to the Arabian Sea in Sindh?',
    options: ['Guddu Barrage', 'Sukkur Barrage', 'Kotri Barrage', 'Taunsa Barrage'],
    correctIndex: 2,
    userSelected: 1,
    explanation: 'Kotri Barrage is southernmost and nearest to the Arabian Sea.',
    subjectSlug: 'pakistan-studies',
    subtopic: 'Geography of Sindh',
    reason: 'distractor',
  }, fixedToday);
  assert.ok(added);

  const vault = loadVaultMistakes(mockStorage);
  assert.equal(vault.length, 1);
  assert.equal(vault[0].status, 'learning');
  assert.equal(vault[0].intervalDays, 1);
  assert.equal(vault[0].repetitionCount, 0);

  // Deduplication check
  appendVaultMistake(mockStorage, {
    planId: 'plan-123',
    questionId: 'q-sindh-barrage',
    question: 'Which barrage is located closest to the Arabian Sea in Sindh?',
    options: ['Guddu', 'Sukkur', 'Kotri', 'Taunsa'],
    correctIndex: 2,
    userSelected: 0,
    explanation: 'Kotri Barrage is southernmost.',
    subjectSlug: 'pakistan-studies',
  }, fixedToday);
  const vaultAfterDedup = loadVaultMistakes(mockStorage);
  assert.equal(vaultAfterDedup.length, 1, 'duplicate questions in same plan update rather than duplicating');
  assert.equal(vaultAfterDedup[0].userSelected, 0);

  // Stats calculation
  const stats = getVaultStats(vaultAfterDedup, fixedToday);
  assert.equal(stats.totalCards, 1);
  assert.equal(stats.dueCards, 1);
  assert.equal(stats.learningCards, 1);
  assert.equal(stats.masteredCards, 0);

  // Review card with 'good'
  const reviewed = reviewVaultCard(mockStorage, vaultAfterDedup[0].id, 'good', fixedToday);
  assert.ok(reviewed);

  const vaultAfterReview = loadVaultMistakes(mockStorage);
  assert.equal(vaultAfterReview[0].repetitionCount, 1);
  assert.ok(vaultAfterReview[0].intervalDays >= 1);
  assert.notEqual(vaultAfterReview[0].nextReviewDate, fixedToday, 'reviewed card date moves into the future');

  // Review card with 'again'
  reviewVaultCard(mockStorage, vaultAfterReview[0].id, 'again', fixedToday);
  const vaultAfterReset = loadVaultMistakes(mockStorage);
  assert.equal(vaultAfterReset[0].repetitionCount, 0, 'again rating resets repetition count');
  assert.equal(vaultAfterReset[0].intervalDays, 1);
  assert.equal(vaultAfterReset[0].nextReviewDate, '2026-10-12', 'rescheduled for next day on again rating');
});

test('high-yield topic sprint delivers key formulas, traps and flashcards for Pakistani exams', () => {
  const gkSprint = getTopicHighYieldSprint('general-knowledge', 'Rivers and Barrages of Sindh');
  assert.ok(gkSprint.keyFormulasAndRules.length > 0);
  assert.ok(gkSprint.examDistractorTrap.length > 0);
  assert.ok(gkSprint.quickRecallCards.length > 0);
  assert.ok(gkSprint.quickRecallCards.every((f) => Boolean(f.prompt && f.answer)));

  const englishSprint = getTopicHighYieldSprint('english', 'Subject-Verb Agreement');
  assert.ok(englishSprint.keyFormulasAndRules.length > 0);
  assert.ok(englishSprint.examDistractorTrap.length > 0);

  const mathSprint = getTopicHighYieldSprint('mathematics', 'Percentages and Profit/Loss');
  assert.ok(mathSprint.keyFormulasAndRules.length > 0);
  assert.ok(mathSprint.examDistractorTrap.length > 0);
});


