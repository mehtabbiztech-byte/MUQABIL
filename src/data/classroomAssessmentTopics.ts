import type { LicenseTopicNote } from './teachingLicenseNotesData';

/**
 * Classroom Assessment module for the Teaching License Master Notes Hub.
 * Eleven supplied standalone HTML notes render through htmlNotesPath so the
 * shared design system — hero, objectives, table of contents, key vocabulary,
 * comparison table, application, misconceptions, takeaways and the MCQ / CRQ /
 * ERQ practice block — is preserved. The structured fields below power the
 * hub's syllabus index and revision aids.
 */
export const CLASSROOM_ASSESSMENT_TOPICS: LicenseTopicNote[] = [
  {
    id: 'definitions-of-assessment-evaluation-and-testing',
    topicNumber: '1',
    title: 'Definitions of Assessment, Evaluation and Testing',
    readTime: '11 min read',
    htmlNotesPath:
      'notes/classroom-assessment/definitions-of-assessment-evaluation-and-testing.html',
    summary:
      'Assessment is the systematic process of collecting, interpreting and using evidence about learning; evaluation is the judgement of that evidence against a standard, followed by a decision; testing is one formal instrument for collecting evidence; measurement is the quantification that sits underneath. The four terms describe stages of a single chain — evidence, interpretation, judgement, decision — and most terminology errors come from treating them as synonyms.',
    highYieldAlert:
      'STS High-Yield: measurement produces numbers, assessment gathers and interprets, evaluation judges and decides, testing is one instrument. If the stem says “judge” or “decide”, the answer is evaluation; if it says “controlled conditions”, it is a test.',
    concepts: [
      {
        conceptTitle: 'Assessment as the umbrella process',
        explanation:
          'Assessment is broader than testing: observation, questioning, projects, portfolios and conversation are all assessment, provided the evidence is interpreted and used.',
        bulletPoints: [
          'The defining feature is purpose — evidence must shape the next teaching step or inform a report.',
        ],
      },
      {
        conceptTitle: 'Evaluation as judgement',
        explanation:
          'Evaluation compares performance with a criterion, standard or benchmark and assigns worth, then decides what follows (promotion, remediation, revision of a scheme of work).',
        bulletPoints: ['Evaluation always contains a comparison; without a standard it is opinion.'],
      },
      {
        conceptTitle: 'Testing and measurement',
        explanation:
          'A test samples behaviour under controlled conditions so responses can be scored consistently; measurement assigns a number or level using a stated rule.',
        bulletPoints: [
          'A precise score can still measure the wrong thing, which is why validity matters alongside reliability.',
        ],
      },
      {
        conceptTitle: 'The evidence-to-decision chain',
        explanation:
          'The chain runs measurement → assessment → evaluation → feedback. Breaking it anywhere turns assessment into paperwork with no learning consequence.',
        bulletPoints: ['Name the user of every result: learner, teacher, parent, head teacher or system.'],
      },
    ],
    comparisonTable: {
      title: 'Measurement, Testing, Assessment and Evaluation',
      headers: ['Term', 'Core question', 'Produces', 'Example'],
      rows: [
        ['Measurement', 'How much?', 'A number from a scoring rule', 'A paragraph scored 6/10 on a rubric'],
        ['Testing', 'How do learners perform under controlled conditions?', 'A scored sample of performance', 'A 40-mark unit test'],
        ['Assessment', 'What can the learner do, and what does that mean for teaching?', 'Interpreted evidence plus feedback', 'Item analysis leading to regrouping'],
        ['Evaluation', 'How good is this, and what decision follows?', 'A judgement and a decision', 'Deciding to reteach the unit'],
      ],
    },
    classroomApplication:
      'Plan every assessment with a stated purpose, criterion and user of the result, and keep measurement and evaluation separate when marking: first the evidence, then the judgement. Report evaluative decisions in terms of learning rather than learner character.',
    mnemonicAid: 'MATE — Measure, Assess, Test, Evaluate: numbers, interpretation, instrument, judgement.',
    frequentExamQuestions: [
      {
        question: 'Distinguish between assessment, evaluation, measurement and testing with examples.',
        answer:
          'Assessment is the systematic process of gathering, interpreting and using evidence; observation notes during group work are assessment. Measurement assigns a number by a rule; scoring a presentation 14/20 on a rubric is measurement. Testing is a formal instrument sampling behaviour under controlled conditions; a 30-mark unit test is testing. Evaluation judges worth against a criterion and decides; deciding the class has not mastered place value and reteaching it is evaluation. They form a chain: tests and observation produce evidence, measurement quantifies it, assessment interprets it, evaluation judges it.',
      },
      {
        question: 'Why can a single test score not be treated as a complete evaluation of a learner?',
        answer:
          'A test samples a limited set of behaviours on one occasion, so coverage is partial and oral, practical and collaborative outcomes may be missed. Validity depends on alignment with the intended outcomes and reliability on conditions, marking and learner state. A single score also mixes measurement with error and offers no diagnostic information. Evaluation requires a defensible judgement against criteria built from multiple sources of evidence collected over time; using one score for high-stakes decisions risks misclassification and encourages teaching to the test.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-ca-1-1',
        question: 'Gathering, interpreting and using evidence about learning is called:',
        options: ['Evaluation', 'Measurement', 'Assessment', 'Examination'],
        correctIndex: 2,
        explanation: 'Assessment is the umbrella process; evaluation is the judgement that follows.',
      },
      {
        id: 'quiz-ca-1-2',
        question: 'Awarding 7 out of 10 using a rubric is an example of:',
        options: ['Evaluation', 'Measurement', 'Diagnosis', 'Moderation'],
        correctIndex: 1,
        explanation: 'Measurement converts performance into a number using a stated rule.',
      },
      {
        id: 'quiz-ca-1-3',
        question: 'Which statement is correct?',
        options: [
          'A test is a synonym for assessment',
          'A test is one instrument within assessment',
          'Evaluation precedes measurement',
          'Measurement is a judgement of worth',
        ],
        correctIndex: 1,
        explanation: 'Testing is a subset of assessment, not its equivalent.',
      },
    ],
    examDistractorTraps: [
      'Trap: Assessment and evaluation are synonyms. — Assessment gathers and interprets evidence; evaluation judges it against a standard and decides what follows.',
      'Trap: Marks are evaluation. — Marks are measurement. Evaluation begins when marks are compared with a criterion and a decision follows.',
    ],
  },
  {
    id: 'assessment-versus-evaluation',
    topicNumber: '2',
    title: 'Assessment and Evaluation: What Is the Difference?',
    readTime: '10 min read',
    htmlNotesPath: 'notes/classroom-assessment/assessment-versus-evaluation.html',
    summary:
      'Assessment is a continuous, evidence-gathering process whose purpose is to improve learning; evaluation is the act of judging that evidence against standards and using the judgement to decide about learners, teaching or programmes. They differ in purpose, timing, focus, process and outcome, yet they interlock: assessment supplies the evidence, evaluation turns it into decisions, and those decisions reshape teaching.',
    highYieldAlert:
      'STS High-Yield: “assessment for learning” describes process; “assessment of learning” describes judgement. Do not answer a “differentiate between” question without naming dimensions — purpose, timing, focus, process, outcome.',
    concepts: [
      {
        conceptTitle: 'Purpose: improvement versus judgement',
        explanation:
          'Assessment asks where the learner is and what will move them forward; evaluation asks how good the performance or programme is and what decision follows.',
      },
      {
        conceptTitle: 'Timing and focus',
        explanation:
          'Assessment is continuous — diagnostic, formative, summative — while evaluation occurs at decision points. Assessment focuses on the learner; evaluation can focus on teaching, curriculum or the school.',
        bulletPoints: ['Frequent measurement is not the same as continuous assessment.'],
      },
      {
        conceptTitle: 'Process and outcome',
        explanation:
          'Assessment describes performance against criteria and produces feedback; evaluation compares with a standard, assigns value and produces a recorded judgement or decision.',
      },
      {
        conceptTitle: 'Why both are necessary',
        explanation:
          'Assessment without evaluation changes nothing; evaluation without assessment is guesswork. The loop is evidence → judgement → decision → new teaching → new evidence.',
      },
    ],
    comparisonTable: {
      title: 'Assessment versus Evaluation',
      headers: ['Dimension', 'Assessment', 'Evaluation', 'Illustration'],
      rows: [
        ['Purpose', 'Improve learning', 'Judge worth and decide', 'Exit ticket vs. term grade'],
        ['Timing', 'Continuous', 'At decision points', 'Daily questioning vs. end-of-term review'],
        ['Focus', 'Individual learner and next step', 'Teaching, curriculum or programme', '“Ali needs inference practice” vs. “the unit was too ambitious”'],
        ['Outcome', 'Actionable feedback', 'Recorded judgement or decision', 'Next-step prompt vs. promotion decision'],
      ],
    },
    classroomApplication:
      'Keep continuous assessment mostly ungraded and feedback-rich, and reserve recorded evaluation for reporting points. When a class performs poorly, evaluate the task and the teaching before judging the learners.',
    mnemonicAid: 'Assessment Asks and Adjusts; Evaluation Endorses or Ends.',
    frequentExamQuestions: [
      {
        question: 'Differentiate between assessment and evaluation with reference to purpose, timing, process and outcome.',
        answer:
          'By purpose, assessment improves learning while it happens and evaluation judges quality and supports a decision. By timing, assessment is continuous — before, during and after a unit — while evaluation occurs at decision points such as the end of term. By process, assessment describes performance against success criteria and produces feedback, whereas evaluation compares performance with a standard and assigns value. By outcome, assessment yields a next teaching step while evaluation yields a recorded judgement such as a grade, promotion or a decision to revise the scheme of work.',
      },
      {
        question: 'A school decides to record a grade for every class activity. Evaluate this policy.',
        answer:
          'The policy converts assessment into continuous evaluation. When every activity is graded and recorded, learners attend to the number rather than the feedback, take fewer risks and ask whether work “counts” before beginning. Teachers spend their time on documentation rather than on acting on evidence, and formative purposes disappear. Evaluation is still needed for reporting, but it should be periodic and based on a documented record; routine practice should be comment-only and ungraded so that feedback remains the main message.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-ca-2-1',
        question: 'The defining difference between assessment and evaluation is:',
        options: ['Timing', 'Purpose — improvement versus judgement', 'Use of paper', 'Number of learners'],
        correctIndex: 1,
        explanation: 'Purpose drives the other differences.',
      },
      {
        id: 'quiz-ca-2-2',
        question: 'Deciding that a learner must repeat a unit is:',
        options: ['Assessment', 'Measurement', 'Evaluation', 'Testing'],
        correctIndex: 2,
        explanation: 'It is a judgement with a decision attached.',
      },
      {
        id: 'quiz-ca-2-3',
        question: 'Assessment without evaluation is a problem because:',
        options: ['It takes too long', 'Evidence is never acted on', 'It lowers marks', 'It removes feedback'],
        correctIndex: 1,
        explanation: 'Without judgement and decision, evidence changes nothing.',
      },
    ],
    examDistractorTraps: [
      'Trap: Frequent testing is formative assessment. — Frequency is not the criterion; formative assessment exists only when evidence changes the next teaching step.',
      'Trap: Evaluation happens only at the end of a course. — Teachers evaluate continuously, for example when deciding a class needs reteaching.',
    ],
  },
  {
    id: 'two-key-types-of-classroom-assessment',
    topicNumber: '3',
    title: 'Two Key Types of Classroom Assessment',
    readTime: '10 min read',
    htmlNotesPath: 'notes/classroom-assessment/two-key-types-of-classroom-assessment.html',
    summary:
      'Formative assessment happens during learning and is used to adapt teaching and give feedback; summative assessment summarises achievement at the end of a period and is used to judge and report. The distinction is about purpose and use, not the instrument or the presence of marks, and a third type — diagnostic assessment — is usually treated as a specialised form of formative assessment carried out before teaching.',
    highYieldAlert:
      'STS High-Yield: the same quiz is formative if its results change tomorrow’s lesson and summative if it is graded for the report. Diagnostic assessment looks backwards at prior learning but acts formatively on teaching.',
    concepts: [
      {
        conceptTitle: 'Formative assessment: assessment for learning',
        explanation:
          'Any evidence gathered during learning that is interpreted and used to adapt teaching and give feedback. Tools include hinge questions, exit tickets, whiteboards, drafts, peer and self-assessment.',
        bulletPoints: ['The test of whether it is formative is whether anything changes as a result.'],
      },
      {
        conceptTitle: 'Summative assessment: assessment of learning',
        explanation:
          'Summarises achievement at the end of a unit, term or stage for reporting, certification or progression, so it demands coverage, comparability and defensible marking.',
        bulletPoints: ['Build papers from a table of specifications so marks match taught outcomes.'],
      },
      {
        conceptTitle: 'Purpose, not instrument',
        explanation:
          'Labelling a task formative in a plan is meaningless unless the plan states how the evidence will be used.',
      },
      {
        conceptTitle: 'Diagnosis and the balance',
        explanation:
          'Diagnostic assessment locates prior knowledge and misconceptions before teaching. A defensible classroom combines frequent low-stakes formative checks with periodic, well-designed summative tasks.',
      },
    ],
    comparisonTable: {
      title: 'Formative versus Summative Assessment',
      headers: ['Dimension', 'Formative', 'Summative', 'Example'],
      rows: [
        ['Purpose', 'Improve learning', 'Judge and report achievement', 'Hinge question vs. term examination'],
        ['Timing', 'During the unit', 'End of unit, term or stage', 'Mid-lesson check vs. final paper'],
        ['Stakes', 'Low or none', 'Often high', 'Whiteboard work vs. promotion decision'],
        ['Use of results', 'Adjust teaching, give feedback', 'Record, report, certify', 'Regrouping vs. report card'],
      ],
    },
    classroomApplication:
      'Plan one hinge question and one exit ticket per lesson and act on both; reserve graded tasks for a small, signposted set. At reporting time, build the judgement from documented formative evidence plus summative tasks rather than one paper.',
    mnemonicAid: 'Formative Feeds forward; Summative Sums up.',
    frequentExamQuestions: [
      {
        question: 'Explain why the same assessment instrument can be formative or summative.',
        answer:
          'The type is determined by purpose and use, not by the instrument. A ten-item multiple-choice quiz is summative if it is marked, recorded and weighted in the term grade without further action. The identical quiz is formative if it is ungraded and the teacher sorts responses by item to find that most learners confuse evaporation with condensation, then begins the next lesson by reteaching that distinction. The instrument is unchanged; what differs is whether evidence is interpreted and used to adapt teaching.',
      },
      {
        question: 'How should formative evidence influence the design of summative assessment?',
        answer:
          'Formative evidence shows which outcomes were securely taught, which misconceptions learners hold, and which learners need access arrangements. It therefore shapes the table of specifications and the weighting of the paper, supplies realistic distractors, and prevents unfair assessment of objectives that were never properly taught. It also provides the documented basis on which the summative judgement rests, which is what makes reporting defensible in moderation and in conversations with parents.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-ca-3-1',
        question: 'An exit ticket used to regroup the next lesson is:',
        options: ['Summative', 'Formative', 'Norm-referenced', 'Standardized'],
        correctIndex: 1,
        explanation: 'The evidence changes teaching.',
      },
      {
        id: 'quiz-ca-3-2',
        question: 'A table of specifications mainly improves:',
        options: ['Marking speed', 'Validity and balance of a summative paper', 'Learner motivation', 'Seating'],
        correctIndex: 1,
        explanation: 'It maps marks to content and cognitive levels.',
      },
      {
        id: 'quiz-ca-3-3',
        question: 'Diagnostic assessment is best administered:',
        options: ['At the end of the year', 'Before teaching a unit', 'Only in board examinations', 'After reporting'],
        correctIndex: 1,
        explanation: 'It establishes starting points before instruction.',
      },
    ],
    examDistractorTraps: [
      'Trap: Formative means ungraded. — The criterion is use, not grading; a graded quiz analysed and used for reteaching functions formatively.',
      'Trap: Summative assessment cannot inform teaching. — Summative results should feed the next unit; the problem is over-use, not the purpose.',
    ],
  },
  {
    id: 'feedback-characteristics-and-benefits',
    topicNumber: '4',
    title: 'Feedback: Characteristics and Benefits',
    readTime: '10 min read',
    htmlNotesPath: 'notes/classroom-assessment/feedback-characteristics-and-benefits.html',
    summary:
      'Feedback is information about the gap between current and target performance, with guidance on closing it. Hattie and Timperley reduce it to three questions — where am I going, how am I going, where to next — and it works best when it is specific, timely, criterion-referenced, task- or process-focused, actionable and acted upon. It differs from praise, which evaluates the person, and from a grade, which summarises performance.',
    highYieldAlert:
      'STS High-Yield: task and process feedback beat praise and personal comments; marks dominate comments when both are given; and feedback has no effect until the learner acts on it in improvement time.',
    concepts: [
      {
        conceptTitle: 'The three feedback questions',
        explanation:
          'Powerful feedback tells the learner the goal, the gap and the next step. A comment that does not help answer “where to next?” is description, not feedback.',
      },
      {
        conceptTitle: 'Characteristics of effective feedback',
        explanation:
          'Specific, timely, criterion-referenced, task or process focused, actionable in one or two steps, manageable in quantity, and dialogic so the learner must process it.',
      },
      {
        conceptTitle: 'Four levels: task, process, self-regulation, self',
        explanation:
          'Task and process feedback carry the most learning value; self-regulation prompts build independence; self-level praise or criticism carries the least task information.',
        bulletPoints: ['Move from “this is wrong” to “check step two — you multiplied before dividing”.'],
      },
      {
        conceptTitle: 'Closing the loop',
        explanation:
          'Forms include oral or written, immediate or delayed, teacher, peer or self, directive or facilitative. Whatever the form, the loop closes only through learner action.',
        bulletPoints: ['Schedule improvement time so learners redraft, correct or retry.'],
      },
    ],
    comparisonTable: {
      title: 'What Good Feedback Looks Like',
      headers: ['Characteristic', 'In practice', 'Avoid'],
      rows: [
        ['Specific', '“Your topic sentence names the cause; add one example.”', '“Develop your answer.”'],
        ['Timely', 'Returned before the next piece is written', 'Returned after the unit has moved on'],
        ['Criterion-referenced', 'Judged against shared success criteria', 'Compared with the class average'],
        ['Actionable', 'One strength and one next step', 'Twelve corrections on one page'],
        ['Dialogic', 'Learner redrafts and the change is checked', 'A comment never revisited'],
      ],
    },
    classroomApplication:
      'Share success criteria before the task, mark drafts with comments only, and protect ten minutes of improvement time in the next lesson. Use whole-class feedback for common errors instead of writing the same comment forty times.',
    mnemonicAid: 'SPECS — Specific, Prompt, Explained against criteria, Clear next step, Shared with the learner.',
    frequentExamQuestions: [
      {
        question: 'List and explain five characteristics of effective feedback.',
        answer:
          'Specific: it names what was done and what to change, as in “your topic sentence names the cause; add one example”. Timely: it arrives while the learner can still use it, such as comments on a draft before the final version. Criterion-referenced: it judges the work against shared success criteria rather than against classmates. Actionable: it gives one or two concrete next steps instead of a page of corrections. Dialogic: the learner must respond by redrafting or answering, and the teacher checks that the specific change was made.',
      },
      {
        question: 'Why does comment-only marking often produce better learning than marks with comments?',
        answer:
          'Attention is limited and marks are highly salient. When a grade accompanies a comment, learners compare the number with peers, classify themselves and ignore the guidance. Comment-only marking removes that competition, so the specific next step becomes the message, and it supports a climate in which drafts and revision are normal. Marks remain necessary for reporting, which is why they should be attached to final, reported tasks rather than to every piece of practice.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-ca-4-1',
        question: 'Feedback is best defined as information about:',
        options: ['The learner’s ability', 'The gap between current and target performance', 'The class average', 'Effort'],
        correctIndex: 1,
        explanation: 'Feedback concerns the gap and how to close it.',
      },
      {
        id: 'quiz-ca-4-2',
        question: '“Excellent work!” is best described as:',
        options: ['Descriptive feedback', 'Praise', 'Feed-forward', 'Self-regulation feedback'],
        correctIndex: 1,
        explanation: 'It evaluates the person and carries little task information.',
      },
      {
        id: 'quiz-ca-4-3',
        question: 'Improvement time exists in a lesson so that learners can:',
        options: ['Rest', 'Act on feedback and redraft', 'Cover more content', 'Take notes'],
        correctIndex: 1,
        explanation: 'Feedback only works when it is used.',
      },
    ],
    examDistractorTraps: [
      'Trap: More marking means better feedback. — Quantity is not quality; two actionable comments that are used outperform a page of corrections.',
      'Trap: Praise raises achievement. — Praise evaluates the person; task and process feedback carry the learning value.',
    ],
  },
  {
    id: 'assessment-policies-and-practices-in-pakistani-schools',
    topicNumber: '5',
    title: 'Assessment Policies and Practices in Pakistani Schools',
    readTime: '11 min read',
    htmlNotesPath:
      'notes/classroom-assessment/assessment-policies-and-practices-in-pakistani-schools.html',
    summary:
      'Assessment in Pakistan operates simultaneously at classroom, school, provincial, board and national levels. The Single National Curriculum organises learning around competencies, standards and student learning outcomes and encourages formative assessment; BISEs and FBISE certify Grades 9–12; provincial commissions and NEAS conduct cohort and sample-based assessment; and classroom practice remains dominated by teacher-made tests whose feedback potential is largely unrealised.',
    highYieldAlert:
      'STS High-Yield: match the body to the purpose — BISE/FBISE certify, PEC has examined Grade 5 and 8, NEAS and TIMSS monitor the system, and the SNC supplies the outcomes. Public examinations create washback that narrows teaching.',
    concepts: [
      {
        conceptTitle: 'The policy architecture',
        explanation:
          'Federal curriculum and national priorities; provincial delivery, teacher employment and textbook boards; boards for certification; national bodies for monitoring. Classroom assessment is delegated to teachers.',
      },
      {
        conceptTitle: 'SNC and outcomes-based assessment',
        explanation:
          'The Single National Curriculum, introduced from 2020 and phased by grade, is built on competencies, standards, benchmarks and student learning outcomes, and encourages continuous and formative assessment.',
        bulletPoints: ['SLOs make the criterion for assessment explicit.'],
      },
      {
        conceptTitle: 'Public examinations and washback',
        explanation:
          'Board examinations are high-stakes and determine progression and admission, so teaching narrows to tested content and recall items.',
      },
      {
        conceptTitle: 'Practice, challenges and reform',
        explanation:
          'Classroom practice centres on teacher-made monthly and terminal tests, often with marks and little feedback. Reform depends on assessment literacy, moderation, item quality and credible classroom evidence.',
      },
    ],
    comparisonTable: {
      title: 'Levels of Assessment in Pakistan',
      headers: ['Level', 'Instrument', 'Purpose', 'Consequence'],
      rows: [
        ['Classroom', 'Teacher-made quiz, exit ticket, project', 'Improve learning', 'Regrouping and reteaching'],
        ['School', 'Term examination, report card', 'Report progress', 'Promotion and parent communication'],
        ['Provincial commission', 'Grade 5 and Grade 8 examinations (e.g. PEC)', 'Verify foundation learning', 'District and school accountability'],
        ['Board', 'SSC and HSSC papers (BISE/FBISE)', 'Certify achievement', 'Grades, admission, eligibility'],
        ['National sample', 'NEAS; international studies such as TIMSS', 'Monitor the system', 'Policy and curriculum review'],
      ],
    },
    classroomApplication:
      'Assess against the curriculum’s student learning outcomes, use formative evidence to reduce dependence on the terminal paper, and share marking schemes so criteria are transparent. Prepare learners for public examinations without abandoning untested skills.',
    mnemonicAid: 'Four levels, four purposes: Classroom improves, School reports, Board certifies, Nation monitors.',
    frequentExamQuestions: [
      {
        question: 'Describe the levels of assessment operating in Pakistani schools and the purpose of each.',
        answer:
          'At classroom level, teachers use questioning, observation, quizzes and teacher-made tests to improve learning and give feedback, with regrouping or reteaching as the consequence. School-level term examinations and reports summarise progress for parents and inform promotion. Provincial commissions such as the Punjab Examination Commission have conducted Grade 5 and Grade 8 examinations to verify foundation learning. BISEs and FBISE certify achievement at SSC and HSSC with consequences for admission and employment. The National Education Assessment System and participation in TIMSS sample learning to monitor system performance without grading individuals.',
      },
      {
        question: 'Explain washback and its effects on classroom practice in Pakistan.',
        answer:
          'Washback is the influence of an examination on teaching and learning. In Pakistan, high-stakes board examinations lead teachers to allocate time to tested subjects and item types, to use past papers as the main resource and to rehearse examination technique. The advantage is a common standard and focused preparation; the disadvantage is narrowing, because untested outcomes such as inquiry, practical work and extended writing are marginalised and recall is rewarded over understanding. The professional response is to teach examined content through tasks that also develop the untested skills.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-ca-5-1',
        question: 'Which body certifies achievement at Grades 9–12 in the provinces?',
        options: ['NEAS', 'BISE', 'PEC', 'PCTB'],
        correctIndex: 1,
        explanation: 'Boards of Intermediate and Secondary Education conduct SSC and HSSC examinations.',
      },
      {
        id: 'quiz-ca-5-2',
        question: 'NEAS is best described as:',
        options: ['A board examination', 'A sample-based national assessment for system monitoring', 'A textbook board', 'A teacher union'],
        correctIndex: 1,
        explanation: 'NEAS reports at system level, not for individuals.',
      },
      {
        id: 'quiz-ca-5-3',
        question: 'The influence of examinations on teaching is called:',
        options: ['Washback', 'Moderation', 'Sampling', 'Scaffolding'],
        correctIndex: 0,
        explanation: 'Washback describes the effect of assessment on teaching and learning.',
      },
    ],
    examDistractorTraps: [
      'Trap: The SNC abolished examinations. — It changed curriculum structure and assessment expectations; public examinations continue and still shape practice.',
      'Trap: NEAS results are used to fail learners. — Sample-based national assessment monitors the system and does not certify individuals.',
    ],
  },
  {
    id: 'assessment-embedded-lesson-plans',
    topicNumber: '6',
    title: 'Developing Assessment-Embedded Lesson Plans',
    readTime: '10 min read',
    htmlNotesPath: 'notes/classroom-assessment/assessment-embedded-lesson-plans.html',
    summary:
      'An assessment-embedded lesson plan designs assessment at the same time as activities. It rests on constructive alignment — outcome, activity and evidence at the same cognitive level — and on backward design, which decides acceptable evidence before planning experiences. In practice every plan carries observable outcomes, shared success criteria, an opening diagnostic, a mid-lesson check with a decision rule, and an exit ticket that shapes the next lesson.',
    highYieldAlert:
      'STS High-Yield: the sequence is outcome and success criteria → diagnostic → hinge question with a decision rule → exit ticket → next-lesson action. An assessment point without a decision attached is decoration.',
    concepts: [
      {
        conceptTitle: 'Constructive alignment',
        explanation:
          'Outcome, activity and assessment must demand the same verb at the same cognitive level. A “compare” outcome with a recall test is misaligned.',
      },
      {
        conceptTitle: 'Backward design',
        explanation:
          'Identify desired results, determine acceptable evidence, then plan learning experiences. Drafting the exit ticket first is backward design in miniature.',
      },
      {
        conceptTitle: 'Observable outcomes and criteria',
        explanation:
          'Outcomes name an observable performance; success criteria unpack it into what the work will contain, written in learner-facing language and displayed.',
      },
      {
        conceptTitle: 'Diagnostic, hinge and exit points',
        explanation:
          'A two-minute diagnostic checks the prerequisite; a hinge question at the teaching-to-practice transition carries a written decision rule; the exit ticket produces evidence from every learner.',
        bulletPoints: ['Sort exit tickets into secure, partial and not yet, and start the next lesson with the middle pile.'],
      },
    ],
    comparisonTable: {
      title: 'Assessment Map for One 40-Minute Lesson',
      headers: ['Phase', 'Assessment moment', 'Tool', 'Decision if weak'],
      rows: [
        ['Opening', 'Prerequisite check', 'Three-question diagnostic', 'Repair the prerequisite before proceeding'],
        ['Teaching', 'Guided questioning', 'Cold call and whiteboards', 'Re-explain with a second representation'],
        ['Transition', 'Hinge question', 'One item with misconception distractors', 'Reteach if over one third choose a distractor'],
        ['Close', 'Exit ticket', 'One routine and one transfer item', 'Sort into three piles for the next lesson'],
      ],
    },
    classroomApplication:
      'Write the outcome as a performance, display the success criteria, and annotate each assessment point with the action it triggers. Keep one plan per week assessment-embedded at first, then extend and share hinge questions across the department.',
    mnemonicAid: 'OBE-DHE — Outcome, Backwards evidence, Diagnostic, Hinge, Exit ticket.',
    frequentExamQuestions: [
      {
        question: 'Explain constructive alignment with an aligned and a misaligned example.',
        answer:
          'Constructive alignment means the intended outcome, the activity and the assessment all require the same learning at the same cognitive level. Aligned: the outcome is “compare two sources on the causes of the 1857 uprising”, the activity gives two sources and a comparison grid, and the assessment asks for two similarities and two differences with evidence. Misaligned: the same outcome is taught by lecture and assessed by asking learners to list five causes from memory; the activity and assessment require recall, so the stated outcome is never taught or assessed.',
      },
      {
        question: 'Why is a mid-lesson check more valuable than an end-of-lesson test for improving learning?',
        answer:
          'A mid-lesson check arrives while the lesson can still change, so the teacher can reteach, adjust practice or pull a group in the same lesson. An end-of-lesson test produces information only after teaching has finished, when learners may have practised the error. The hinge question asks “should I proceed?”, while the exit ticket asks “what must I do next lesson?”; both are useful, but they serve different purposes.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-ca-6-1',
        question: 'Backward design begins with:',
        options: ['Selecting activities', 'Desired results and acceptable evidence', 'Choosing a textbook', 'Writing a key'],
        correctIndex: 1,
        explanation: 'Evidence is planned before activities.',
      },
      {
        id: 'quiz-ca-6-2',
        question: 'A decision rule in a lesson plan specifies:',
        options: ['Classroom rules', 'What the teacher will do for each pattern of results', 'Mark allocation', 'Seating'],
        correctIndex: 1,
        explanation: 'It converts evidence into a planned action.',
      },
      {
        id: 'quiz-ca-6-3',
        question: 'Which outcome is observable?',
        options: [
          'Students will understand fractions',
          'Students will appreciate mathematics',
          'Students will convert 3/4 to 0.75 and 75%',
          'Students will know about percentages',
        ],
        correctIndex: 2,
        explanation: 'Only this names a performance that can be seen.',
      },
    ],
    examDistractorTraps: [
      'Trap: Assessment belongs at the end of a unit. — Embedded assessment places evidence points inside the lesson so teaching can respond.',
      'Trap: A well-written objective guarantees alignment. — The activity and assessment must also demand the same cognitive level.',
    ],
  },
  {
    id: 'types-of-test-questions',
    topicNumber: '7',
    title: 'Types of Test Questions',
    readTime: '10 min read',
    htmlNotesPath: 'notes/classroom-assessment/types-of-test-questions.html',
    summary:
      'Test items divide into selected-response items — multiple choice, true or false, matching and completion — and constructed-response items such as short answers and essays. Selected-response items give wide coverage with consistent scoring but allow guessing; constructed-response items reveal reasoning but need a marking scheme and moderation. Item type does not fix cognitive demand: a table of specifications and item analysis determine whether the test is defensible.',
    highYieldAlert:
      'STS High-Yield: “objective” and “subjective” describe scoring, not difficulty. Difficulty index = proportion correct; discrimination index = success of the top group minus the bottom group, and a negative value means a faulty item.',
    concepts: [
      {
        conceptTitle: 'Selected-response items',
        explanation:
          'Multiple choice, true or false, matching and completion allow broad coverage and perfectly consistent scoring, but permit guessing and cannot show reasoning.',
      },
      {
        conceptTitle: 'Constructed-response items',
        explanation:
          'Short answer and extended response require production, so they assess organisation and reasoning, at the cost of slower marking and marker variance.',
      },
      {
        conceptTitle: 'Writing multiple-choice items',
        explanation:
          'One clear problem in the stem, four parallel options, one defensible key, and distractors built from real misconceptions. Avoid “all of the above” and length cueing.',
      },
      {
        conceptTitle: 'Blueprints and item analysis',
        explanation:
          'A table of specifications controls content and cognitive levels; difficulty and discrimination indices identify items to keep, revise or discard.',
        bulletPoints: ['An item nobody answers correctly and an item everybody answers correctly both carry little information.'],
      },
    ],
    comparisonTable: {
      title: 'Choosing an Item Type',
      headers: ['Item type', 'Best at assessing', 'Marking', 'Main risk'],
      rows: [
        ['Multiple choice', 'Discrimination between close alternatives', 'Fast and objective', 'Guessing and cueing'],
        ['True or false', 'Verifying one proposition', 'Very fast', 'Fifty per cent guess rate'],
        ['Matching', 'Relationships between sets', 'Fast and objective', 'Elimination gives clues'],
        ['Short answer', 'Explanation and application', 'Moderate; needs a scheme', 'Marker drift'],
        ['Essay', 'Organisation and extended argument', 'Slow; needs rubric and moderation', 'Halo effect'],
      ],
    },
    classroomApplication:
      'Write the table of specifications first, then choose item types that fit each cell. After marking, compute difficulty and discrimination for five items, rewrite the worst, and keep good items in a shared bank.',
    mnemonicAid: 'SD-KDA — Stem, Distractors, Key, Difficulty, Analysis.',
    frequentExamQuestions: [
      {
        question: 'Compare selected-response and constructed-response items.',
        answer:
          'Selected-response items give wide coverage quickly and are scored objectively once the key is fixed, but they allow guessing and cannot show how an answer was reached. Constructed-response items require learners to produce language or working, so they reveal reasoning, organisation and originality, but they take longer to answer and mark and are vulnerable to marker drift unless scored with a rubric and moderated. Both can reach higher cognitive levels; the choice should follow the outcome and the evidence required, and most defensible tests combine the two.',
      },
      {
        question: 'How would you use item analysis to improve a class test?',
        answer:
          'Compute the difficulty index as the proportion answering correctly, and the discrimination index by comparing the top and bottom groups on total score. Keep hard items with positive discrimination, replace items everyone answered correctly, and rewrite items with zero or negative discrimination because they indicate a faulty key, ambiguity or trick wording. Inspect the distribution of choices to find distractors nobody selected, replace them with misconception-based alternatives, and record revised items in an item bank.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-ca-7-1',
        question: 'Matching is an example of:',
        options: ['Constructed response', 'Selected response', 'Performance task', 'Portfolio'],
        correctIndex: 1,
        explanation: 'Learners choose from given options.',
      },
      {
        id: 'quiz-ca-7-2',
        question: 'The incorrect options in a multiple-choice item are:',
        options: ['Stems', 'Keys', 'Distractors', 'Anchors'],
        correctIndex: 2,
        explanation: 'Distractors attract specific misconceptions.',
      },
      {
        id: 'quiz-ca-7-3',
        question: 'A negative discrimination index suggests:',
        options: ['An easy item', 'A faulty key or trick wording', 'Too many learners', 'A reliable item'],
        correctIndex: 1,
        explanation: 'Strong learners doing worse signals a broken item.',
      },
    ],
    examDistractorTraps: [
      'Trap: Multiple-choice items can only test recall. — Well-written items test application and analysis through close alternatives.',
      'Trap: Objective tests are always fairer. — Objective scoring is not the same as validity; ambiguous keys and guessing introduce error.',
    ],
  },
  {
    id: 'performance-based-assessments',
    topicNumber: '8',
    title: 'Performance-Based Assessment',
    readTime: '10 min read',
    htmlNotesPath: 'notes/classroom-assessment/performance-based-assessments.html',
    summary:
      'Performance-based assessment asks learners to demonstrate knowledge and skill by producing a performance or product judged against explicit criteria, which makes it the appropriate method for practical, oral and applied outcomes. Authentic tasks raise transfer and motivation, while reliability, time and fairness must be managed through analytic rubrics, anchors, process evidence, checkpoints and moderation.',
    highYieldAlert:
      'STS High-Yield: performance tasks trade reliability for validity. Recover reliability with criteria from the outcome, level descriptors, anchors, standardised conditions, process evidence and moderation — never by scoring neatness or confidence.',
    concepts: [
      {
        conceptTitle: 'What makes it performance-based',
        explanation:
          'The learner constructs a product or demonstration rather than selecting an answer, and the evidence may be the product, the process, or both.',
      },
      {
        conceptTitle: 'Authenticity',
        explanation:
          'Real audiences and real constraints raise transfer and motivation; a task that resembles practice is more likely to measure what practitioners actually do.',
      },
      {
        conceptTitle: 'Design from criteria',
        explanation:
          'Specify the outcome, criteria, conditions, evidence and rubric before learners begin, so teaching, feedback and judgement point at the same target.',
      },
      {
        conceptTitle: 'Process evidence and reliability',
        explanation:
          'Checkpoints — plans, drafts, logs, conferences — connect the product to the learner and enable feedback. Rubrics, anchors and moderation constrain judgement.',
        bulletPoints: ['Separate criteria for collaboration and content so group work does not mask individual mastery.'],
      },
    ],
    comparisonTable: {
      title: 'Performance Task Types',
      headers: ['Task type', 'Skill evidenced', 'Evidence', 'Main pitfall'],
      rows: [
        ['Practical', 'Technique, safety, recording', 'Observation checklist plus report', 'Judging the report and not the technique'],
        ['Project or model', 'Design and application', 'Product plus process log', 'Product made by an adult'],
        ['Presentation', 'Explanation and organisation', 'Live rubric or recording', 'Scoring confidence instead of content'],
        ['Debate or role play', 'Argument and evidence use', 'Rubric on claim, evidence, rebuttal', 'Dominant speakers rewarded'],
      ],
    },
    classroomApplication:
      'Derive three to five criteria from the outcome, write the rubric before the task sheet, and schedule checkpoints so process evidence exists. Standardise materials and time, and moderate a sample of judgements each term.',
    mnemonicAid: 'CAPR — Criteria, Authentic task, Process evidence, Rubric and moderation.',
    frequentExamQuestions: [
      {
        question: 'Distinguish performance-based assessment from a written test and state when each is appropriate.',
        answer:
          'In a written test learners respond to prompts under controlled conditions and the evidence is the written response. In performance-based assessment learners produce a performance or product, and the evidence includes the process as well as the result. Written tests are efficient for broad coverage of knowledge and reasoning and are easier to standardise. Performance tasks are appropriate when the outcome is a skill or complex product — conducting an experiment, presenting, building, collaborating — because a written description cannot establish that the learner can do it.',
      },
      {
        question: 'How can reliability be improved in performance assessment without reducing validity?',
        answer:
          'Use analytic rubrics with observable descriptors to limit global impressions, calibrate markers with anchor scripts, standardise conditions and time, collect process evidence at checkpoints, and moderate a sample between assessors. Where stakes are high, use two independent assessors. None of these changes what the learner must do, so the task keeps its validity while judgement becomes consistent.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-ca-8-1',
        question: 'Performance-based assessment is characterised by:',
        options: ['Selecting from options', 'Producing a performance or product judged against criteria', 'Timed papers', 'Norm referencing'],
        correctIndex: 1,
        explanation: 'The learner demonstrates by producing.',
      },
      {
        id: 'quiz-ca-8-2',
        question: 'An anchor in performance assessment is:',
        options: ['A time limit', 'An exemplar used to calibrate judgement', 'A rubric type', 'A practical skill'],
        correctIndex: 1,
        explanation: 'Anchors show what a level looks like.',
      },
      {
        id: 'quiz-ca-8-3',
        question: 'Process evidence matters because it:',
        options: ['Speeds marking', 'Connects the product to the learner', 'Replaces the rubric', 'Increases difficulty'],
        correctIndex: 1,
        explanation: 'It documents how the work was produced.',
      },
    ],
    examDistractorTraps: [
      'Trap: Performance assessment needs no criteria because the task is authentic. — Without criteria it becomes an impression; validity needs alignment and defensible judgement.',
      'Trap: A good product proves the learning. — Products can be copied; process evidence is what links the product to the learner.',
    ],
  },
  {
    id: 'assessment-rubrics-and-their-importance',
    topicNumber: '9',
    title: 'Assessment Rubrics and Their Importance',
    readTime: '10 min read',
    htmlNotesPath: 'notes/classroom-assessment/assessment-rubrics-and-their-importance.html',
    summary:
      'A rubric lists the criteria for a task and describes levels of performance for each criterion. Analytic rubrics score criteria separately and generate detailed feedback; holistic rubrics give one overall judgement quickly. Rubrics improve transparency, reliability and feedback only when criteria are derived from the learning outcome, descriptors are observable, and marking is calibrated with anchors and moderated.',
    highYieldAlert:
      'STS High-Yield: descriptors must state observable features, not adjectives of quality. Three to five criteria beat twelve vague ones, and the rubric must be shared before the task, not after marking.',
    concepts: [
      {
        conceptTitle: 'Anatomy of a rubric',
        explanation:
          'Criteria, performance levels, descriptors and a scoring rule; anchors are exemplars used for calibration.',
      },
      {
        conceptTitle: 'Analytic versus holistic',
        explanation:
          'Analytic scoring produces a criterion profile and specific feedback but is slower; holistic scoring is fast but hides which element failed.',
      },
      {
        conceptTitle: 'Criteria come from the outcome',
        explanation:
          'Split the outcome into observable components; criteria copied from a generic template drift away from what was taught.',
      },
      {
        conceptTitle: 'Observable descriptors',
        explanation:
          'Describe what is present in the work — quantity, quality, features — rather than labelling it “excellent” or “satisfactory”.',
        bulletPoints: ['Share the rubric in advance and use it for peer and self-checking before submission.'],
      },
    ],
    comparisonTable: {
      title: 'Rubric Types Compared',
      headers: ['Type', 'Structure', 'Best used for', 'Limitation'],
      rows: [
        ['Analytic', 'Separate score per criterion', 'Assessed work with feedback', 'Slower; risk of double counting'],
        ['Holistic', 'One overall score', 'Rapid screening and exhibitions', 'Hides what failed; halo effect'],
        ['Single-point', 'Proficiency plus strengths and next steps', 'Formative drafting', 'Not built for marks'],
        ['Checklist', 'Present or absent', 'Procedures and safety', 'No quality discrimination'],
      ],
    },
    classroomApplication:
      'Give learners the rubric with the task and use it for a peer check a week before submission. Mark criterion by criterion, moderate a sample with a colleague, and return the rubric with one next step per criterion.',
    mnemonicAid: 'CLDS — Criteria, Levels, Descriptors, Sharing.',
    frequentExamQuestions: [
      {
        question: 'How do rubrics improve reliability and feedback, and what limits their effectiveness?',
        answer:
          'Explicit criteria and descriptors constrain marker judgement: criteria judged separately reduce the halo effect, descriptors define boundaries between levels, and a shared rubric allows moderation of a specific criterion rather than a general impression. Learners receive criterion-level information linked to a next step. Limits are real: vague descriptors reproduce the original problem, too many criteria cause overlap and double counting, and professional judgement is still needed for unusual responses. Reliability also depends on anchors and moderation.',
      },
      {
        question: 'Describe how you would construct a rubric for a persuasive letter.',
        answer:
          'Begin from the outcome: write a persuasive letter taking a clear position supported by evidence for a specified audience. Split it into four criteria — position and argument, use of evidence, organisation, register and accuracy — and write four observable level descriptors for each. Weight marks to reflect the outcome, with argument and evidence above accuracy, and check that no criterion double counts another. Trial the rubric on three anonymised letters with a colleague, revise any descriptor that produces disagreement, share it with learners before writing, and keep an exemplar at each level as an anchor.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-ca-9-1',
        question: 'An analytic rubric differs from a holistic rubric because it:',
        options: ['Has no criteria', 'Scores each criterion separately', 'Cannot be moderated', 'Is only for essays'],
        correctIndex: 1,
        explanation: 'Analytic scoring gives a criterion profile.',
      },
      {
        id: 'quiz-ca-9-2',
        question: 'Rubric criteria should come from:',
        options: ['The task sheet', 'The learning outcome', 'The class average', 'The marking time'],
        correctIndex: 1,
        explanation: 'Alignment with the outcome gives validity.',
      },
      {
        id: 'quiz-ca-9-3',
        question: 'The most common rubric error is:',
        options: ['Three criteria', 'Vague, unobservable descriptors', 'Sharing the rubric', 'Moderation'],
        correctIndex: 1,
        explanation: 'Vagueness destroys reliability and feedback.',
      },
    ],
    examDistractorTraps: [
      'Trap: Rubrics make marking objective. — They reduce variation and make judgement visible, but judgement remains; anchors and moderation are still required.',
      'Trap: Learners should not see the rubric. — Hiding criteria makes success mysterious and increases appeals.',
    ],
  },
  {
    id: 'portfolio-assessment',
    topicNumber: '10',
    title: 'Portfolio Assessment',
    readTime: '10 min read',
    htmlNotesPath: 'notes/classroom-assessment/portfolio-assessment.html',
    summary:
      'Portfolio assessment uses a purposeful, curated collection of dated work with reflection to evidence effort, progress and achievement over time. Process portfolios document development, showcase portfolios present best work, and assessment portfolios are judged against criteria. The method offers strong validity for process outcomes but demands clear criteria, checkpoints, rubric scoring and moderation to control workload and reliability.',
    highYieldAlert:
      'STS High-Yield: the defining feature of a portfolio is selection plus reflection, not volume. Date every artefact, hold checkpoints for authenticity, and score progress separately from final attainment.',
    concepts: [
      {
        conceptTitle: 'Purpose and selection',
        explanation:
          'A portfolio is built against stated outcomes and contains deliberately selected artefacts; without selection and purpose it is storage.',
      },
      {
        conceptTitle: 'Types of portfolio',
        explanation:
          'Process portfolios show development through drafts; showcase portfolios present best work; assessment portfolios are scored; e-portfolios add multimedia and version history.',
      },
      {
        conceptTitle: 'Reflection as the learning engine',
        explanation:
          'Structured prompts about what was attempted, what changed and what comes next build metacognition and self-regulation; unstructured reflection produces description only.',
      },
      {
        conceptTitle: 'Reliability and workload',
        explanation:
          'Analytic rubrics, dated drafts, checkpoints and moderation control inconsistency; capping artefacts and assessing termly keeps the method sustainable.',
        bulletPoints: ['Score progress and attainment as separate criteria so growth is recognised without inflating final quality.'],
      },
    ],
    comparisonTable: {
      title: 'Portfolio Types',
      headers: ['Type', 'Purpose', 'Contents', 'Audience'],
      rows: [
        ['Process', 'Show development', 'Plans, drafts, feedback, revisions', 'Learner and teacher'],
        ['Showcase', 'Present best work', 'Final pieces and products', 'Parents and panels'],
        ['Assessment', 'Judge achievement against criteria', 'Selected artefacts plus reflections', 'Teacher and moderation'],
        ['E-portfolio', 'Document learning digitally', 'Files, images, audio, timestamped drafts', 'Learner and wider audience'],
      ],
    },
    classroomApplication:
      'Name the portfolio type, share the rubric, and require five dated artefacts with a rationale and reflection each. Hold three checkpoints per term, give feedback at each, and moderate a sample before reporting.',
    mnemonicAid: 'SARC — Select, Annotate, Reflect, Checkpoint.',
    frequentExamQuestions: [
      {
        question: 'Define portfolio assessment and describe its essential components.',
        answer:
          'Portfolio assessment uses a purposeful, curated collection of a learner’s work accumulated over time and accompanied by reflection to evidence effort, progress and achievement against stated outcomes. Components are: a stated purpose and outcome-derived criteria; a limited set of selected artefacts with rationales; dated drafts showing progression; evidence of feedback and response to it; structured reflections and self-assessment; and scheduled checkpoints at which the teacher reviews evidence and gives feedback. Without selection and reflection the collection is storage.',
      },
      {
        question: 'Explain the challenges of portfolio assessment and how each can be managed.',
        answer:
          'Time is managed by capping artefacts and using checkpoints rather than continuous collection. Reliability is managed with an analytic rubric, separate criteria for progress and attainment, and moderation of a sample. Authenticity is protected by dated drafts, checkpoint conferences and short oral defences. Storage is managed by a numbered folder or e-portfolio. Fairness requires in-class drafting and limited materials so that home resources are not assessed. Learner capacity for reflection requires structured prompts and modelled examples.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-ca-10-1',
        question: 'The defining feature of portfolio assessment is:',
        options: ['Volume of work', 'Purposeful selection plus reflection', 'Neat presentation', 'Digital storage'],
        correctIndex: 1,
        explanation: 'Selection and reflection distinguish it from storage.',
      },
      {
        id: 'quiz-ca-10-2',
        question: 'A process portfolio primarily documents:',
        options: ['Best work only', 'Development through drafts and feedback', 'Final grades', 'Attendance'],
        correctIndex: 1,
        explanation: 'Process portfolios show growth over time.',
      },
      {
        id: 'quiz-ca-10-3',
        question: 'Which practice best protects authenticity?',
        options: ['Collecting only final work', 'Scheduled checkpoints with process evidence', 'Marking presentation', 'More artefacts'],
        correctIndex: 1,
        explanation: 'Checkpoints connect the work to the learner.',
      },
    ],
    examDistractorTraps: [
      'Trap: A portfolio is a folder of all the learner’s work. — It is a curated selection with reflection against criteria.',
      'Trap: Portfolios are easier to assess than tests. — They generate more evidence and require rubrics, sampling and moderation to be manageable.',
    ],
  },
  {
    id: 'significance-of-teacher-made-tests',
    topicNumber: '11',
    title: 'Significance of Teacher-Made Tests',
    readTime: '10 min read',
    htmlNotesPath: 'notes/classroom-assessment/significance-of-teacher-made-tests.html',
    summary:
      'A teacher-made test is constructed by the classroom teacher for a specific class and unit, so it aligns closely with what was actually taught, returns evidence quickly and cheaply, supports diagnosis, and builds the teacher’s assessment literacy. Its weaknesses — limited comparability, variable technical quality and bias — are corrected through a table of specifications, marking schemes, item analysis and moderation.',
    highYieldAlert:
      'STS High-Yield: teacher-made tests win on alignment, speed, diagnosis and professional development; they lose on comparability and standardisation. Correct the loss with blueprints, schemes, item analysis and moderation.',
    concepts: [
      {
        conceptTitle: 'Alignment with what was taught',
        explanation:
          'The teacher knows the content, examples, emphasis and learners, so items can match the taught outcomes more closely than an external test.',
      },
      {
        conceptTitle: 'Speed, cost and diagnosis',
        explanation:
          'Class tests can be written, administered and marked within a week, and items built from observed misconceptions turn the results into a reteaching map.',
      },
      {
        conceptTitle: 'Professional development',
        explanation:
          'Writing items clarifies outcomes and cognitive demand; item analysis shows which items worked, building assessment literacy and departmental standards.',
      },
      {
        conceptTitle: 'Limitations and corrections',
        explanation:
          'Comparability, technical quality and bias are the main weaknesses; a table of specifications, marking scheme, item analysis and moderation address them.',
        bulletPoints: ['A high class average may indicate an easy recall paper, not good teaching.'],
      },
    ],
    comparisonTable: {
      title: 'Teacher-Made versus Standardized Tests',
      headers: ['Feature', 'Teacher-made test', 'Standardized test'],
      rows: [
        ['Alignment', 'High — written by the teacher who taught the unit', 'Limited — assumes a common curriculum'],
        ['Comparability', 'Low across classes and schools', 'High, with fixed procedures'],
        ['Technical quality', 'Variable; depends on item-writing skill', 'Usually piloted and analysed'],
        ['Feedback speed', 'Hours to days', 'Weeks to months'],
        ['Cost', 'Very low', 'High to develop and administer'],
      ],
    },
    classroomApplication:
      'Build each test from a table of specifications, write items from misconceptions, prepare the marking scheme first, and analyse five items afterwards. Keep good items in a departmental bank and moderate one set per term.',
    mnemonicAid: 'ASTD — Alignment, Speed, Diagnosis, Development.',
    frequentExamQuestions: [
      {
        question: 'Explain the significance of teacher-made tests for classroom learning.',
        answer:
          'First, alignment: the teacher knows what was taught and at what depth, so items match the unit’s outcomes. Second, speed and cost: the test can be written, administered and marked within a week, so evidence arrives while the unit is current. Third, diagnosis: items and distractors can be built from observed misconceptions, turning results into a reteaching map. Fourth, professional development: constructing items clarifies outcomes and analysing results builds assessment literacy. The benefits depend on a blueprint, a marking scheme and item analysis.',
      },
      {
        question: 'Compare teacher-made and standardized tests.',
        answer:
          'Teacher-made tests align closely with taught content and give fast, cheap evidence, but lack comparability, vary in technical quality and may be biased towards the teacher’s examples. Standardized tests have fixed items, administration and scoring, so scores are comparable and usually technically sound, but they cannot match a specific class and return results slowly and expensively. The implication is complementary use: teacher-made tests for diagnosis and feedback, standardized tests for monitoring, with moderation to reduce inconsistency.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-ca-11-1',
        question: 'The main advantage of a teacher-made test is:',
        options: ['Standardisation', 'Alignment with what was taught', 'Norm referencing', 'No marking scheme needed'],
        correctIndex: 1,
        explanation: 'Curricular alignment is the defining strength.',
      },
      {
        id: 'quiz-ca-11-2',
        question: 'A table of specifications ensures:',
        options: ['Shorter tests', 'Representative coverage of content and cognitive levels', 'Higher marks', 'Quicker marking'],
        correctIndex: 1,
        explanation: 'It is a blueprint for representativeness.',
      },
      {
        id: 'quiz-ca-11-3',
        question: 'An item with negative discrimination should be:',
        options: ['Kept', 'Rewritten or discarded', 'Given more marks', 'Moved to the end'],
        correctIndex: 1,
        explanation: 'It signals a faulty key or trick wording.',
      },
    ],
    examDistractorTraps: [
      'Trap: Teacher-made tests are inferior in every respect. — They are better aligned and faster to act on; they lose only on comparability and technical standardisation.',
      'Trap: High scores mean a good test. — Easy or recall-only items raise averages without measuring learning.',
    ],
  },
];
