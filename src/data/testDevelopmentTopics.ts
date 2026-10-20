import type { LicenseTopicNote } from './teachingLicenseNotesData';

/**
 * Test Development and Evaluation module for the Teaching License Master Notes
 * Hub. Five supplied standalone HTML notes render through htmlNotesPath using
 * design system v2 — sticky side navigation, worked-example blocks, in-body
 * exam questions with model answers and a persistent revision checklist. The
 * structured fields below power the hub's syllabus index and revision aids.
 */
export const TEST_DEVELOPMENT_TOPICS: LicenseTopicNote[] = [
  {
    id: 'tests-and-measurement',
    topicNumber: '1',
    title: 'Tests and Measurement',
    readTime: '16 min read',
    htmlNotesPath: 'notes/test-development-and-evaluation/tests-and-measurement.html',
    summary:
      'A test is a systematic procedure for sampling behaviour under standard conditions and scoring it by a fixed rule; measurement assigns numerals to attributes by rule. Educational attributes are latent, so measurement is indirect and every score carries error. The scale of measurement — nominal, ordinal, interval or ratio — determines which statistics and claims are legitimate, and raw scores become meaningful only through derived scores such as percentage, percentile rank, z-score, T-score or stanine.',
    highYieldAlert:
      'STS High-Yield: a percentile rank of 80 means the learner scored at or above 80 per cent of the group — not 80 per cent correct. Interval scores have no true zero, so “twice as able” claims are invalid.',
    concepts: [
      {
        conceptTitle: 'Test, measurement and the inferential chain',
        explanation:
          'A test samples behaviour under standard conditions; measurement quantifies it by rule; assessment interprets it; evaluation judges it and decides. Educational attributes are latent, so every inference carries error.',
        bulletPoints: ['State the scoring rule and conditions before administering the test.'],
      },
      {
        conceptTitle: 'The four scales of measurement',
        explanation:
          'Nominal data are labels; ordinal data are ordered but unequally spaced; interval data have equal units without a true zero; ratio data have equal units and a true zero. The scale determines permissible statistics.',
        bulletPoints: ['Most test scores are treated as interval: differences are meaningful, ratios are not.'],
      },
      {
        conceptTitle: 'Types of tests',
        explanation:
          'Achievement tests sample taught content, aptitude tests predict future performance, diagnostic tests locate specific difficulties, and proficiency tests establish a functional level. Tests also divide by construction, reference and scoring.',
        bulletPoints: ['Let the decision select the type: diagnostic for gaps, achievement for attainment, aptitude for prediction.'],
      },
      {
        conceptTitle: 'Derived scores and honest reporting',
        explanation:
          'Percentage standardises for total marks; percentile rank locates a learner in a group; z-scores express standard-deviation distance; T-scores rescale z to mean 50, SD 10; stanines divide the distribution into nine bands.',
        bulletPoints: ['Report the scale and reference group with every derived score.'],
      },
    ],
    comparisonTable: {
      title: 'Scales of Measurement in Education',
      headers: ['Scale', 'Properties', 'Education example', 'Permitted statistics'],
      rows: [
        ['Nominal', 'Labels only; no order', 'Subject choice; first language', 'Frequency, mode'],
        ['Ordinal', 'Ordered, unequal intervals', 'Class rank; grade A–F', 'Median, percentile, rank correlation'],
        ['Interval', 'Equal units, no true zero', 'Standardized test scores; IQ', 'Mean, SD, Pearson correlation'],
        ['Ratio', 'Equal units and true zero', 'Time on task; errors per 100 words', 'All statistics plus ratios'],
      ],
    },
    classroomApplication:
      'Write the scoring rule before marking and report derived scores with their reference group. When reporting to parents, lead with criterion-referenced information about what the learner can do, and add percentile or stanine only as supplementary context.',
    mnemonicAid: 'NOIR — Nominal, Ordinal, Interval, Ratio: the ladder of what numbers may claim.',
    frequentExamQuestions: [
      {
        question: 'Why is educational measurement described as indirect, and what follows for interpretation?',
        answer:
          'Achievement, aptitude and attitude are latent constructs that cannot be observed directly; we observe a sample of behaviour and infer the attribute. Two consequences follow. Every score contains error, because the sample may not represent the domain and performance varies with conditions, so scores are estimates and reliability and the standard error of measurement matter. And the inference must be warranted by validity evidence: the same score could reflect understanding, memorisation or test-taking skill, so claims must be limited to what the instrument was designed and shown to measure.',
      },
      {
        question: 'A learner scores 34 on a test with a mean of 26 and SD of 4. Calculate z and T and interpret them.',
        answer:
          'z = (34 − 26) ÷ 4 = 2.0, so the learner is two standard deviations above the class mean; T = 10z + 50 = 70. Both are norm-referenced: they locate the learner in this class distribution and would change with a different group or paper. They do not show which outcomes are secure, so criterion information is still needed, and the scores carry measurement error, so small differences should not be over-interpreted.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-td-1-1',
        question: 'A test is best defined as:',
        options: [
          'A set of questions used to grade learners',
          'A systematic procedure for sampling behaviour and scoring it by a rule',
          'Any measurement of learning',
          'A national examination',
        ],
        correctIndex: 1,
        explanation: 'Systematic sampling, standard conditions and a scoring rule define a test.',
      },
      {
        id: 'quiz-td-1-2',
        question: 'Class rank is measured on which scale?',
        options: ['Nominal', 'Ordinal', 'Interval', 'Ratio'],
        correctIndex: 1,
        explanation: 'Ranks are ordered but intervals between them are not equal.',
      },
      {
        id: 'quiz-td-1-3',
        question: 'A percentile rank of 65 means the learner:',
        options: [
          'Answered 65 per cent of items correctly',
          'Scored at or above 65 per cent of the reference group',
          'Is 65 marks above average',
          'Achieved 65 per cent of objectives',
        ],
        correctIndex: 1,
        explanation: 'Percentile rank is a position in a group, not a percentage score.',
      },
    ],
    examDistractorTraps: [
      'Trap: A percentile rank is a percentage of correct answers. — It is the percentage of the group scoring at or below that score.',
      'Trap: Test scores are ratio data, so “twice as able” is meaningful. — Most educational scores are interval at best, without a true zero.',
    ],
  },
  {
    id: 'principles-of-testing',
    topicNumber: '2',
    title: 'Principles of Testing',
    readTime: '16 min read',
    htmlNotesPath: 'notes/test-development-and-evaluation/principles-of-testing.html',
    summary:
      'The principles of testing — purpose, validity, reliability, fairness, objectivity, comprehensiveness, practicality and ethics — are the standards a test must satisfy if its results are to support decisions. Each principle has a concrete indicator that can be inspected on a real paper, and when principles conflict the resolution is to protect the construct while managing the constraint.',
    highYieldAlert:
      'STS High-Yield: reliability is necessary but not sufficient for validity, and fairness means the same construct is assessed — not that every learner receives identical conditions regardless of access needs.',
    concepts: [
      {
        conceptTitle: 'Purpose and validity',
        explanation:
          'A test must state the decision it supports and the user of the result; validity is the extent to which it measures the intended outcomes, chiefly through a table of specifications at classroom level.',
        bulletPoints: ['Write the purpose sentence before writing the first item.'],
      },
      {
        conceptTitle: 'Reliability, objectivity and consistency',
        explanation:
          'Consistency across occasions, forms and markers comes from clear items, adequate length, marking schemes, rubrics, anchors and moderation. Objectivity is the narrower requirement that scoring does not depend on the marker.',
      },
      {
        conceptTitle: 'Fairness, bias and access',
        explanation:
          'Fairness requires that irrelevant factors — language load, cultural references, cost, speed when speed is not the construct — do not advantage or disadvantage groups. Bias is systematic, and access arrangements remove barriers without changing the standard.',
      },
      {
        conceptTitle: 'Comprehensiveness, practicality and ethics',
        explanation:
          'Coverage must be proportionate to emphasis and cognitive level; the test must be buildable, administrable, markable and reportable within resources; and it must be secure, confidential and harmless in its consequences.',
        bulletPoints: ['Practicality failures are solved by narrowing the evidence, not lowering the standard.'],
      },
    ],
    comparisonTable: {
      title: 'Principles and Their Practical Indicators',
      headers: ['Principle', 'Question', 'Indicator', 'Typical failure'],
      rows: [
        ['Purpose', 'What decision will this support?', 'Written purpose and named user', 'A test set because it is the end of term'],
        ['Validity', 'Does it measure the intended outcomes?', 'Every item traceable to an outcome', 'A recall paper for an application objective'],
        ['Reliability', 'Would the result be consistent?', 'Scheme, rubric and moderation', 'Sections differing by 18 points'],
        ['Fairness', 'Is anyone disadvantaged irrelevantly?', 'Reading level and access checked', 'Wordy items in a mathematics test'],
        ['Practicality', 'Can we actually do this?', 'Marking time estimated', 'Sixty essays due in two days'],
        ['Ethics', 'Is it secure and harmless?', 'Secure storage; confidential reporting', 'Rank lists on a noticeboard'],
      ],
    },
    classroomApplication:
      'Audit every test against the principles before it is administered: purpose, blueprint, scheme, bias review, marking-time estimate and reporting plan. When resources are tight, compress the artefact rather than the cognitive demand.',
    mnemonicAid: 'PVA-FORCE — Purpose, Validity, Access/Fairness, Objectivity, Reliability, Comprehensiveness, Ethics.',
    frequentExamQuestions: [
      {
        question: '“A test that is valid and reliable is a good test.” Discuss.',
        answer:
          'The statement is necessary but not sufficient. Validity and reliability are central, but a good test must also be fair, so that irrelevant factors such as reading load or cultural context do not advantage groups; comprehensive, so that coverage is proportionate to emphasis and level; practical, so that it can be marked and returned in time to be useful; and ethical, so that it is secure and does not label learners. A technically sound test used for a decision it was not designed to support is still a bad test. The weight given to each principle should rise with the stakes of the decision.',
      },
      {
        question: 'How can validity and practicality both be respected when time is short?',
        answer:
          'Keep the cognitive demand and shrink the artefact. For an outcome about designing a fair test, replace a full investigation with a one-page design brief — variables table, controls and a short justification — marked with a three-criterion rubric. The construct is preserved because the decision-making is still required, while administration and marking fit the available time. Moderation of a sample protects consistency, and access arrangements should be planned in advance so that practicality is not achieved at the expense of fairness.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-td-2-1',
        question: 'Which principle requires a test to measure what it claims?',
        options: ['Reliability', 'Validity', 'Practicality', 'Objectivity'],
        correctIndex: 1,
        explanation: 'Validity concerns measuring the intended construct.',
      },
      {
        id: 'quiz-td-2-2',
        question: 'Bias in a test is:',
        options: [
          'Random error',
          'A systematic advantage or disadvantage unrelated to the construct',
          'Any difficult item',
          'A marking mistake',
        ],
        correctIndex: 1,
        explanation: 'Bias is systematic, not random.',
      },
      {
        id: 'quiz-td-2-3',
        question: 'Which is a fairness issue rather than a validity issue?',
        options: [
          'Items do not match the outcomes',
          'Wordy items disadvantage second-language learners in a mathematics test',
          'The paper is too short',
          'The marking scheme is missing',
        ],
        correctIndex: 1,
        explanation: 'The construct is mathematics; reading demand is irrelevant and unevenly distributed.',
      },
    ],
    examDistractorTraps: [
      'Trap: Fairness means identical treatment for everyone. — Fairness means the same construct is assessed; access arrangements change the route, not the standard.',
      'Trap: Comprehensiveness means one item per topic. — Coverage must be proportionate to emphasis and cognitive level.',
    ],
  },
  {
    id: 'domains-of-learning-standards-taxonomy-and-frameworks',
    topicNumber: '3',
    title: 'Domains of Learning, Standards, Taxonomy and Frameworks',
    readTime: '15 min read',
    htmlNotesPath:
      'notes/test-development-and-evaluation/domains-of-learning-standards-taxonomy-and-frameworks.html',
    summary:
      'Outcomes belong to a domain (cognitive, affective, psychomotor) and sit at a level within a taxonomy; standards, benchmarks and student learning outcomes express them at increasing specificity. Revised Bloom (2001) runs from remember to create and adds a knowledge dimension; Krathwohl orders the affective domain; Simpson orders the psychomotor domain. The domain and level determine the assessment method, and constructive alignment requires the task and rubric to demand the stated level.',
    highYieldAlert:
      'STS High-Yield: in the 2001 revision, create is the apex and the categories are verbs; the knowledge dimension is factual, conceptual, procedural, metacognitive. Match method to domain: items for cognitive, observation for affective, performance for psychomotor.',
    concepts: [
      {
        conceptTitle: 'Domains and why they matter',
        explanation:
          'Cognitive, affective and psychomotor learning require different evidence. Naming the domain in the outcome is the first act of assessment design.',
      },
      {
        conceptTitle: 'Bloom then and now',
        explanation:
          'The 1956 taxonomy ran knowledge to evaluation; the 2001 revision uses verbs and places create at the apex, above evaluate.',
        bulletPoints: ['Label every item with its intended level and check the paper’s distribution.'],
      },
      {
        conceptTitle: 'The knowledge dimension and taxonomy table',
        explanation:
          'Factual, conceptual, procedural and metacognitive knowledge crossed with the six processes gives a grid that positions any outcome precisely and reveals what a paper ignores.',
      },
      {
        conceptTitle: 'Affective, psychomotor and curriculum frameworks',
        explanation:
          'Krathwohl’s affective levels run from receiving to characterising and require sustained observation; Simpson’s psychomotor levels run from perception to origination and require observed performance. Standards, benchmarks and SLOs move from broad expectation to observable evidence.',
        bulletPoints: ['Command words in examination questions are the visible signal of cognitive level.'],
      },
    ],
    comparisonTable: {
      title: 'The Three Domains and How to Assess Them',
      headers: ['Domain', 'Levels', 'Assessment method', 'Example outcome'],
      rows: [
        ['Cognitive', 'Remember → Create', 'Items, tasks and rubrics matched to level', 'Evaluate two sources and justify a judgement'],
        ['Affective', 'Receiving → Characterising', 'Sustained observation and reflection', 'Persist with a task and support peers unprompted'],
        ['Psychomotor', 'Perception → Origination', 'Observed performance with checklist', 'Focus a microscope unaided and safely'],
      ],
    },
    classroomApplication:
      'Write outcomes with observable verbs, check that the task demands the level, and plot marks on the taxonomy table to expose gaps. Assess affective outcomes through observation schedules and psychomotor outcomes through performance checklists.',
    mnemonicAid: 'RUA-AEC — Remember, Understand, Apply, Analyse, Evaluate, Create.',
    frequentExamQuestions: [
      {
        question: 'Explain the relationship between standards, benchmarks and student learning outcomes.',
        answer:
          'A standard is a broad statement of what learners should know and be able to do; a benchmark specifies the expected level of that standard at a stage; a student learning outcome makes the expectation observable at unit level. Specificity increases from standard to benchmark to SLO. Assessment is written against SLOs and aggregated upward to judge whether the standard has been achieved, which is why SLOs must name observable performances.',
      },
      {
        question: 'How does constructive alignment operate from standard to marked task?',
        answer:
          'The standard states the capability; the benchmark locates it at the grade; the SLO states the observable evidence. The teaching activity must give practice in exactly that operation, and the assessment must demand it, so a design task requires designing rather than defining. Rubric descriptors at the same level ensure marks are awarded for justification rather than naming. If any link weakens, the standard is no longer being assessed even if the paperwork cites it.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-td-3-1',
        question: 'In the revised Bloom taxonomy (2001), the highest level is:',
        options: ['Evaluation', 'Synthesis', 'Create', 'Analyse'],
        correctIndex: 2,
        explanation: 'Create replaced synthesis at the apex.',
      },
      {
        id: 'quiz-td-3-2',
        question: 'The affective domain is best assessed through:',
        options: ['Multiple-choice items', 'Sustained observation and reflection', 'A timed essay', 'A practical checklist'],
        correctIndex: 1,
        explanation: 'Attitudes are inferred from behaviour over time.',
      },
      {
        id: 'quiz-td-3-3',
        question: 'Simpson’s psychomotor taxonomy begins with:',
        options: ['Mechanism', 'Perception', 'Origination', 'Guided response'],
        correctIndex: 1,
        explanation: 'Perception is followed by set and guided response.',
      },
    ],
    examDistractorTraps: [
      'Trap: Evaluation is the highest level. — In the 2001 revision, create is the apex; evaluation was the apex only in 1956.',
      'Trap: A higher-order verb guarantees a higher-order task. — The demand of the task sets the level, not the verb.',
    ],
  },
  {
    id: 'validity-reliability-and-characteristics-of-tests',
    topicNumber: '4',
    title: 'Validity, Reliability and Characteristics of Tests',
    readTime: '15 min read',
    htmlNotesPath:
      'notes/test-development-and-evaluation/validity-reliability-and-characteristics-of-tests.html',
    summary:
      'Validity is the extent to which a test measures what it claims for the purpose intended; reliability is the consistency of its results. Reliability is necessary but not sufficient for validity, and validity is bounded by reliability. A good test is also objective, usable, fair, discriminating, comprehensive and appropriately normed, all of which are secured through blueprints, careful items, rubrics, piloting and moderation.',
    highYieldAlert:
      'STS High-Yield: SEM = SD × √(1 − r), and split-half estimates must be corrected with Spearman–Brown: r_full = 2r ÷ (1 + r). A score within one SEM of a cut-off cannot decide a high-stakes outcome alone.',
    concepts: [
      {
        conceptTitle: 'Validity and its types',
        explanation:
          'Content validity is representative coverage; construct validity is measuring the intended trait; criterion validity is agreement with or prediction of a criterion; face validity is apparent appropriateness.',
        bulletPoints: ['Validity belongs to interpretations and uses, not to the paper itself.'],
      },
      {
        conceptTitle: 'Reliability and its estimation',
        explanation:
          'Test-retest, parallel forms, internal consistency and inter-rater agreement answer different questions. Reliability coefficients run from 0 to 1, and the standard error of measurement converts them into a band around a score.',
      },
      {
        conceptTitle: 'The relationship between the two',
        explanation:
          'An inconsistent test cannot support a stable interpretation, and a test’s correlation with a criterion cannot exceed the square root of its reliability. But a reliable test can still measure the wrong construct.',
      },
      {
        conceptTitle: 'The other characteristics',
        explanation:
          'Objectivity, usability, fairness, discrimination, comprehensiveness and adequate norms complete the picture. Each has a practical indicator, and each is a separate claim requiring its own evidence.',
        bulletPoints: ['Audit a paper on all seven characteristics and fix the weakest first.'],
      },
    ],
    comparisonTable: {
      title: 'Types of Reliability and How They Are Estimated',
      headers: ['Type', 'Method', 'Coefficient', 'Main threat'],
      rows: [
        ['Test-retest', 'Same test twice with an interval', 'Correlation between scores', 'Memory or learning between sittings'],
        ['Parallel forms', 'Two equivalent versions', 'Correlation between forms', 'Forms differing in difficulty'],
        ['Split-half', 'Odd and even items, Spearman–Brown corrected', 'Corrected correlation', 'Heterogeneous items'],
        ['Internal consistency', 'KR-20 or Cronbach’s alpha', 'KR-20 or alpha', 'Very short tests'],
        ['Inter-rater', 'Two markers score the same scripts', 'Agreement or correlation', 'Unclear rubric or untrained markers'],
      ],
    },
    classroomApplication:
      'Design validity in with a blueprint and review items for construct-irrelevant difficulty; estimate reliability with the method that fits the test; report scores with an error band; and moderate marking. Never use a score within one SEM of a cut-off to decide a high-stakes outcome alone.',
    mnemonicAid: 'R-V-O-F-D-C-N — Reliability, Validity, Objectivity, Fairness, Discrimination, Comprehensiveness, Norms.',
    frequentExamQuestions: [
      {
        question: 'Explain why reliability is necessary but not sufficient for validity.',
        answer:
          'Reliability is consistency; validity is meaning. An inconsistent test cannot support a stable claim, and a test’s correlation with a criterion cannot exceed the square root of its reliability. But consistency does not establish meaning: a spelling test marked with a perfect key is highly reliable yet invalid as a measure of essay-writing competence. Validity therefore needs separate evidence about content coverage, construct relationships or criterion agreement, while reliability only shows the numbers are stable.',
      },
      {
        question: 'A test has reliability 0.62 and SD 8. A learner scores 54 against a pass mark of 50. Advise the school.',
        answer:
          'SEM = 8 × √(1 − 0.62) ≈ 4.9, so the learner’s true score likely lies roughly between 49 and 59. The band straddles the pass mark, so the decision is not secure on this evidence. The school should use corroborating evidence — classwork, a practical or a retest — for learners near the boundary, and should not present the result as a precise determination.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-td-4-1',
        question: 'Which is a form of reliability rather than validity?',
        options: ['Content validity', 'Construct validity', 'Inter-rater agreement', 'Predictive validity'],
        correctIndex: 2,
        explanation: 'Inter-rater agreement is a reliability estimate.',
      },
      {
        id: 'quiz-td-4-2',
        question: 'Split-half reliability must be corrected using:',
        options: ['Cronbach’s alpha', 'The Spearman–Brown formula', 'The standard error', 'A z-score'],
        correctIndex: 1,
        explanation: 'The correction estimates full-test reliability from half-test correlation.',
      },
      {
        id: 'quiz-td-4-3',
        question: 'A test correlating highly with reading but weakly with numeracy shows:',
        options: ['High validity', 'Construct-irrelevant variance', 'Low reliability', 'Adequate norms'],
        correctIndex: 1,
        explanation: 'The test is measuring reading as well as mathematics.',
      },
    ],
    examDistractorTraps: [
      'Trap: A reliable test is a valid test. — Consistency does not establish meaning; a reliable test can measure the wrong construct.',
      'Trap: Reporting a split-half correlation directly. — It must be corrected with Spearman–Brown to estimate full-test reliability.',
    ],
  },
  {
    id: 'test-development-and-review',
    topicNumber: '5',
    title: 'Test Development and Review',
    readTime: '16 min read',
    htmlNotesPath: 'notes/test-development-and-evaluation/test-development-and-review.html',
    summary:
      'Test development runs from a one-page test plan through a table of specifications, item writing and three-pass review, piloting, item analysis, assembly, administration, scoring and post-test review. The blueprint secures validity; difficulty, discrimination and distractor analysis secure item quality; and the item bank turns each administration into an improving departmental resource.',
    highYieldAlert:
      'STS High-Yield: difficulty = number correct ÷ candidates; discrimination = top-group proportion − bottom-group proportion. A negative discrimination index means a faulty key or ambiguous wording, not a hard item.',
    concepts: [
      {
        conceptTitle: 'Planning and the blueprint',
        explanation:
          'A test plan states purpose, construct, outcomes, formats, time, marks and constraints. The table of specifications allocates marks across content and cognitive levels and is the operational definition of content validity.',
      },
      {
        conceptTitle: 'Item writing and pre-test review',
        explanation:
          'Items are written to the grid and reviewed editorially, technically and for sensitivity — bias, access and reading load.',
        bulletPoints: ['Ask a colleague to answer each item without the key; disagreement is a defect.'],
      },
      {
        conceptTitle: 'Piloting and item analysis',
        explanation:
          'Piloting generates difficulty, discrimination and distractor data. Together the indices show whether an item is accessible and whether it separates secure from insecure performance.',
      },
      {
        conceptTitle: 'Assembly, scoring and post-test review',
        explanation:
          'Assembly checks order, instructions, timing and totals; scoring needs a scheme and moderation; post-test review decides what is kept, revised or retired and records it in the item bank.',
      },
    ],
    comparisonTable: {
      title: 'Reading Difficulty and Discrimination Together',
      headers: ['Difficulty', 'Discrimination', 'Interpretation', 'Action'],
      rows: [
        ['High (0.85–1.00)', 'Positive', 'Easy but functional', 'Keep for coverage; do not over-use'],
        ['Moderate (0.30–0.80)', 'Above 0.30', 'Well-functioning', 'Keep and bank'],
        ['Low (below 0.25)', 'Positive', 'Hard but discriminating', 'Keep; check it is taught and not trick wording'],
        ['Any', 'Near zero or negative', 'Not separating, or faulty', 'Revise or retire; check key and wording'],
      ],
    },
    classroomApplication:
      'Write a one-page plan and a filled blueprint before any item; review items with a colleague; analyse five items after every test; and bank only items whose statistics are known. Write the marking scheme while writing the items.',
    mnemonicAid: 'P-B-I-P-A-S-R — Plan, Blueprint, Items, Pilot, Assemble, Score, Review.',
    frequentExamQuestions: [
      {
        question: 'Describe the stages of test development and the output of each.',
        answer:
          'Planning yields a one-page test plan stating purpose, construct, formats, time, marks and constraints. The blueprint yields a table of specifications allocating marks across content and levels. Item writing and review yield draft items with a key, checked editorially, technically and for sensitivity. Piloting yields item statistics. Assembly and scoring yield the final paper, instructions and marking scheme with moderation. Post-test review yields revised items, item bank entries and reliability evidence for the next cycle.',
      },
      {
        question: 'Item 7: 28/40 correct, top ten 9 correct, bottom ten 3 correct. Item 12: 30/40 correct, top ten 6, bottom ten 7. Decide.',
        answer:
          'Item 7 has p = 0.70 and D = 0.90 − 0.30 = 0.60, so it is moderately easy and strongly discriminating: keep and bank it. Item 12 has p = 0.75 and D = 0.60 − 0.70 = −0.10, so weaker learners outperformed stronger ones: check the key and wording, then rewrite or retire it. Difficulty alone is not a defect; negative discrimination is.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-td-5-1',
        question: 'The first stage of test development is:',
        options: ['Writing items', 'Planning purpose and construct', 'Piloting', 'Moderation'],
        correctIndex: 1,
        explanation: 'Purpose and construct determine every later decision.',
      },
      {
        id: 'quiz-td-5-2',
        question: 'A discrimination index of −0.15 indicates:',
        options: ['A well-functioning item', 'A faulty item or key', 'An easy item', 'A reliable test'],
        correctIndex: 1,
        explanation: 'Stronger learners did worse than weaker ones.',
      },
      {
        id: 'quiz-td-5-3',
        question: 'Distractor analysis is used to:',
        options: [
          'Increase difficulty',
          'Check whether incorrect options are plausible and functioning',
          'Calculate reliability',
          'Set the cut score',
        ],
        correctIndex: 1,
        explanation: 'It shows how often each wrong option was chosen.',
      },
    ],
    examDistractorTraps: [
      'Trap: A hard item is a bad item. — Difficulty is not a defect; a hard item with positive discrimination may be the most informative on the paper.',
      'Trap: Review means checking grammar. — Review has editorial, technical and sensitivity passes; grammar is the smallest part.',
    ],
  },
];
