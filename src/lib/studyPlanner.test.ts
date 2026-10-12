import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addDaysToDateString,
  createAiPlanPrompt,
  createDefaultStudyPlannerForm,
  createMentorPrompt,
  createStudyPlanRecord,
  daysBetweenDates,
  generateStudySchedule,
  getDailyMcqTarget,
  getPlannerProgress,
  getPositionName,
  getPosition,
  getSyllabusRecord,
  getTopicCount,
  loadStoredStudyPlan,
  POPULAR_EXAM_PRESETS,
  rebalancePlanSchedule,
  exportPlanScheduleAsText,
  STUDY_ORGANIZATIONS,
  STUDY_PLANNER_STORAGE_KEY,
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
  const shortWindow = generateStudySchedule(formWith({ examDate: addDaysToDateString(fixedToday, 5) }), fixedToday);
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
  plan.completedSubtopicIds = ['english::0', 'english::1'];
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
  assert.match(prompt, /Selected syllabus|Mapped MUQABIL syllabus/);
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

test('popular exam presets, rebalancer and text export work smoothly', () => {
  assert.ok(POPULAR_EXAM_PRESETS.length >= 6);
  const stsGrad = POPULAR_EXAM_PRESETS.find((p) => p.id === 'sts-grad');
  assert.ok(stsGrad);
  assert.equal(stsGrad.organizationId, 'sts');

  const basePlan = createStudyPlanRecord(formWith({ examDate: '2026-10-12' }));
  const rebalanced = rebalancePlanSchedule(basePlan, '2026-10-15');
  assert.equal(rebalanced.startDate, '2026-10-15');
  assert.ok(rebalanced.form.examDate > '2026-10-15');

  const schedule = generateStudySchedule(basePlan.form, fixedToday);
  const exported = exportPlanScheduleAsText(basePlan, schedule);
  assert.match(exported, /MUQABIL SMART STUDY ROADMAP/);
  assert.match(exported, /DAILY STUDY SCHEDULE/);
});

