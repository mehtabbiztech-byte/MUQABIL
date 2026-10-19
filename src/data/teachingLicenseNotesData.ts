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
  /** Supplied standalone HTML note that replaces the generated note body. */
  htmlNotesPath?: string;
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

export const METHODS_OF_TEACHING_TOPICS: LicenseTopicNote[] = [
  {
    id: 'methods-blooms-taxonomy',
    topicNumber: '1',
    title: "Bloom's Taxonomy of Educational Objectives",
    readTime: '10 min read',
    summary:
      "Bloom's Taxonomy is a hierarchical classification system arranging educational learning objectives from simple recall to complex synthesis. Developed by Benjamin Bloom in 1956 and revised by Lorin Anderson & David Krathwohl in 2001, it establishes three learning domains: Cognitive (mental skills), Affective (feelings and values), and Psychomotor (physical and manual dexterity). Teaching must move beyond rote recall (LOTS) toward higher-order critical thinking (HOTS), while maintaining strict constructive alignment between curriculum objectives, classroom activities, and exam assessment.",
    highYieldAlert:
      "STS & STEDA Core Exam Trap: In the 2001 revised taxonomy, 'Create' was established as the apex level (surpassing Evaluate), and noun categories were converted into active verbs (Knowledge → Remember, Comprehension → Understand, Application → Apply, Analysis → Analyse, Synthesis → Evaluate/Create).",
    concepts: [
      {
        conceptTitle: 'The Three Domains of Learning (Bloom & Krathwohl)',
        explanation:
          'Education educates the whole learner through three interrelated domains of learning.',
        keyTerms: [
          {
            term: 'Cognitive Domain (Bloom 1956; Anderson & Krathwohl 2001)',
            definition:
              'Focuses on intellectual skills, knowledge acquisition, and critical problem-solving.',
          },
          {
            term: 'Affective Domain (Krathwohl, Bloom, Masia 1964)',
            definition:
              'Focuses on attitudes, emotional dispositions, ethical appreciation, values, and characterisation.',
          },
          {
            term: 'Psychomotor Domain (Simpson, Dave, Harrow)',
            definition:
              'Focuses on manual dexterity, motor coordination, practical laboratory skills, and bodily execution.',
          },
        ],
        bulletPoints: [
          'Revised cognitive hierarchy: Remember → Understand → Apply → Analyse → Evaluate → Create.',
          'LOTS (Lower-Order Thinking Skills) includes Remember, Understand, and routine Apply.',
          'HOTS (Higher-Order Thinking Skills) includes Analyse, Evaluate, and Create.',
          'Four Knowledge Dimensions in the 2001 revision: Factual, Conceptual, Procedural, and Metacognitive Knowledge.',
          'Affective hierarchy: Receiving → Responding → Valuing → Organising → Characterising by value.',
        ],
      },
      {
        conceptTitle: 'Cognitive Domain Levels & Measurable Action Verbs',
        explanation:
          'Each cognitive tier requires unambiguous, observable action verbs for lesson planning and exam item generation.',
        bulletPoints: [
          'Remember: List, recite, name, define, identify, label, match (e.g. List the stages of the water cycle).',
          'Understand: Explain, summarize, classify, describe, paraphrase, interpret (e.g. Explain how clouds are formed).',
          'Apply: Demonstrate, calculate, solve, implement, operate, show (e.g. Use a diagram to show how rain forms in your area).',
          'Analyse: Differentiate, deconstruct, compare, contrast, distinguish causes from effects (e.g. What would happen if evaporation stopped?).',
          'Evaluate: Judge, critique, justify, defend, appraise, argue with evidence (e.g. Which is a bigger threat to water supply—pollution or wastage? Why?).',
          'Create: Design, formulate, construct, plan, invent, assemble (e.g. Design a prototype or poster showing sustainable water harvesting).',
        ],
      },
      {
        conceptTitle: 'Constructive Alignment & Classroom Utility',
        explanation:
          'John Biggs’ Constructive Alignment requires that the verbs used in learning objectives match the learning activities and the assessment instruments.',
        bulletPoints: [
          'Taxonomy as a flexible guide: Levels can overlap and learning does not always follow a rigid, one-way staircase.',
          'Preventing Lower-Order Trap: Assessments dominated by "Define" and "State" encourage rote learning; effective teachers balance LOTS with HOTS.',
          'Diagnostic utility: Helps educators identify whether student struggles stem from missing foundational facts (Factual) or failure to deconstruct relationships (Analyse).',
        ],
      },
    ],
    comparisonTable: {
      title: "1956 Original vs 2001 Revised Bloom's Taxonomy",
      headers: ['Hierarchy', '1956 Original (Bloom)', '2001 Revised (Anderson & Krathwohl)', 'Cognitive Tier'],
      rows: [
        ['Level 1 (Base)', 'Knowledge (Noun)', 'Remember (Active Verb)', 'LOTS (Foundational Recall)'],
        ['Level 2', 'Comprehension (Noun)', 'Understand (Active Verb)', 'LOTS (Comprehension)'],
        ['Level 3', 'Application (Noun)', 'Apply (Active Verb)', 'LOTS / Foundational Execution'],
        ['Level 4', 'Analysis (Noun)', 'Analyse (Active Verb)', 'HOTS (Critical Deconstruction)'],
        ['Level 5', 'Synthesis (Noun - Level 5)', 'Evaluate (Active Verb - Level 5)', 'HOTS (Critical Judgement)'],
        ['Level 6 (Apex)', 'Evaluation (Noun - Level 6)', 'Create (Active Verb - Top Tier)', 'HOTS (Creative Production)'],
      ],
    },
    classroomApplication:
      "When teaching the Water Cycle to Grade 6 in Sindh, do not stop at asking students to 'List the stages' (Remember). Advance to asking 'What would happen if evaporation stopped?' (Analyse), 'Critique water pollution vs wastage in our district' (Evaluate), and 'Design a water-filtration prototype for flood-affected villages' (Create).",
    mnemonicAid:
      "Remember: 'RUAAEC' -> Remember, Understand, Apply, Analyse, Evaluate, Create ('Real Understanding Always Accelerates Educational Creativity').",
    frequentExamQuestions: [
      {
        question: "Explain the main changes made in the 2001 revision of Bloom's Taxonomy.",
        answer:
          'The revision changed static noun categories into active cognitive verbs (Knowledge → Remember, Comprehension → Understand), renamed Synthesis to Create, and placed Create at the apex above Evaluate.',
      },
      {
        question: 'Differentiate between LOTS and HOTS.',
        answer:
          'LOTS (Remember, Understand, Apply) focuses on foundational recall and routine execution; HOTS (Analyse, Evaluate, Create) demands deeper critical reasoning, evaluation, and creative problem-solving. Effective teaching begins with solid foundations and moves toward higher-order thinking.',
      },
      {
        question: 'A Grade 6 assessment asks only for the stages of the water cycle. What is missing?',
        answer:
          'The question tests only Remember. Add Understand, Apply, Analyse, Evaluate, and Create questions so the assessment measures deeper conceptual understanding and higher-order reasoning.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-bt-1',
        question:
          "Which of the following represents the highest cognitive level according to Anderson and Krathwohl's 2001 revision?",
        options: ['Evaluate', 'Create', 'Synthesis', 'Analyse'],
        correctIndex: 1,
        explanation:
          'In the 2001 revision, Create was placed at the highest level (Level 6), surpassing Evaluate.',
      },
      {
        id: 'quiz-bt-2',
        question:
          'Which knowledge dimension was explicitly added in the 2001 revision alongside Factual, Conceptual, and Procedural?',
        options: ['Emotional Knowledge', 'Metacognitive Knowledge', 'Empirical Knowledge', 'Theoretical Knowledge'],
        correctIndex: 1,
        explanation:
          'Metacognitive knowledge (awareness and knowledge of one’s own cognition and thinking processes) was added as the fourth dimension.',
      },
      {
        id: 'quiz-bt-3',
        question:
          'A test item asks students: "Calculate the acceleration of a vehicle given mass and force." Which cognitive level does this measure?',
        options: ['Remember', 'Understand', 'Apply', 'Create'],
        correctIndex: 2,
        explanation:
          'Applying formulas and executing mathematical procedures to solve a problem corresponds to the Apply level.',
      },
    ],
    examDistractorTraps: [
      "Trap: Believing Evaluation is still the highest level; in the 2001 revision, Create is the apex.",
      "Trap: Confusing Knowledge dimensions (Factual, Conceptual, Procedural, Metacognitive) with Cognitive process levels (Remember through Create).",
    ],
  },
  {
    id: 'methods-cooperative-learning',
    topicNumber: '2',
    title: 'Cooperative Learning Strategies',
    readTime: '9 min read',
    summary:
      'Cooperative learning organizes students into structured small groups to accomplish shared learning goals. Distinct from ordinary group work, it relies on structured positive interdependence and individual accountability. Every member has a designated role or unique topic piece to master and teach, ensuring no student dominates while others free-ride. The teacher functions as an active facilitator and coach rather than a transmission lecturer, fostering critical thinking, inclusion, social communication, and deep conceptual mastery.',
    highYieldAlert:
      "STS Core Pedagogical Principle (Johnson & Johnson): True cooperative learning requires both Positive Interdependence ('We sink or swim together') and Individual Accountability (every student is assessed individually). Without both, it degrades into chaotic group work.",
    concepts: [
      {
        conceptTitle: 'Five Essential Elements (Johnson & Johnson)',
        explanation:
          'For small-group learning to be cooperative, five foundational elements must be deliberately structured.',
        keyTerms: [
          {
            term: 'Positive Interdependence',
            definition:
              'Students perceive that their personal success is tied to the success of all group members.',
          },
          {
            term: 'Individual Accountability',
            definition:
              'Each member is held responsible for mastering the material; no student can ride on the efforts of peers.',
          },
          {
            term: 'Face-to-Face Promotive Interaction',
            definition:
              'Learners actively assist, explain, encourage, and praise each other’s academic efforts.',
          },
          {
            term: 'Interpersonal & Small-Group Skills',
            definition:
              'Direct instruction in active listening, respectful disagreement, shared leadership, and conflict resolution.',
          },
          {
            term: 'Group Processing',
            definition:
              'Regular reflection on group dynamics to identify what worked well and what requires adjustment.',
          },
        ],
        bulletPoints: [
          'The teacher acts as facilitator: monitors groups, intervenes to scaffold, and assesses interaction.',
          'Small-group learning must include meaningful roles and transparent individual contribution tracking.',
          'Cooperative learning works best when positive interdependence and individual responsibility operate together.',
        ],
      },
      {
        conceptTitle: 'The Eight Authentic Cooperative Strategies',
        explanation:
          'Practical classroom protocols to maximize active learning and promote equal participation.',
        bulletPoints: [
          'Speed Quizzes: Paired flashcard question-and-answer rounds for rapid factual reinforcement.',
          'Puzzle Pieces (Jigsaw): Each learner researches one part in an Expert Group, then returns to teach their Home Group.',
          'One-Minute Papers: Students quickly record key takeaways, then compare and consolidate notes with a partner.',
          'Sentence Completion: Group members collaboratively complete open-ended prompt stems to synthesize complex lessons.',
          'Classmate Interviews: Triads rotate roles: Interviewer, Interviewee, and Note-taker/Synthesizer.',
          'Student Expertise: A learner who masters a concept mentors classmates, reinforcing their own mastery through peer teaching.',
          'Freeride Elimination: Designated task checklists, colored signature markers, and individual accountability sheets ensure equal participation.',
          'Teamwork 101: Upfront training in active listening, fair turn-taking, and polite conflict resolution before major tasks.',
        ],
      },
    ],
    comparisonTable: {
      title: 'Cooperative Learning vs Traditional Group Work',
      headers: ['Attribute', 'Cooperative Learning', 'Traditional Group Work'],
      rows: [
        ['Interdependence', 'Positive interdependence structured by design', 'Unstructured; students work alongside each other'],
        ['Accountability', 'Individual accountability; each member tested individually', 'Group grade; dominant members carry free-riders'],
        ['Leadership', 'Shared, rotating leadership with designated roles', 'One vocal student dominates or is appointed leader'],
        ['Teacher Role', 'Active facilitator who monitors and intervenes', 'Passive observer who grades final submission only'],
        ['Social Skills', 'Directly taught, practiced, and reflected upon', 'Assumed or ignored, frequently resulting in conflict'],
      ],
    },
    classroomApplication:
      "To prevent two students from doing all the work in a 6-student science project on 'Ecosystems of Sindh', assign specific roles (Researcher, Materials Manager, Diagram Artist, Data Recorder, Spokesperson) and use Freeride Elimination with signature sign-offs for each section.",
    mnemonicAid:
      "Remember the 5 Elements: 'PIGS-F' -> Positive interdependence, Individual accountability, Group processing, Social skills, Face-to-face interaction.",
    frequentExamQuestions: [
      {
        question: 'Explain how cooperative learning differs from simple group work.',
        answer:
          'Cooperative learning uses structured positive interdependence and individual accountability: each member has a meaningful role, an individual task or concept, and accountability for contributing to group mastery, preventing free-riding.',
      },
      {
        question: 'How can a teacher stop two students from doing all the group work?',
        answer:
          'Use individual roles, task checklists, colored markers or signatures, visible individual accountability, and activities such as Jigsaw (Puzzle Pieces), Classmate Interviews, and Freeride Elimination.',
      },
      {
        question: 'Describe four benefits of cooperative learning.',
        answer:
          'It improves conceptual comprehension, oral communication confidence, social skills, critical thinking, motivation, inclusion of diverse learners, and perspective-taking.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-cl-1',
        question:
          'Which of the following is an essential element that distinguishes cooperative learning from ordinary group work?',
        options: ['Unstructured discussion', 'Individual accountability', 'Homogeneous grouping', 'Individual ranking'],
        correctIndex: 1,
        explanation:
          'Individual accountability ensures every student is responsible for their own learning and contribution.',
      },
      {
        id: 'quiz-cl-2',
        question:
          'In the Jigsaw (Puzzle Pieces) strategy, where do students first master their specific assigned subtopic before teaching others?',
        options: ['Home group', 'Expert group', 'Evaluation panel', 'Pairs'],
        correctIndex: 1,
        explanation:
          'Students meet first in Expert Groups with peers who received the same subtopic, then return to their Home Groups.',
      },
      {
        id: 'quiz-cl-3',
        question:
          'Which cooperative learning technique is designed specifically to eliminate "free-riders"?',
        options: [
          'Unregulated group grades',
          'Freeride Elimination using assigned roles and sign-off task lists',
          'Open unstructured library periods',
          'Lecture delivery',
        ],
        correctIndex: 1,
        explanation:
          'Freeride elimination uses distinct roles, visible personal contributions, and individual assessments.',
      },
    ],
    examDistractorTraps: [
      'Trap: Believing that assigning a group project automatically creates cooperative learning; without positive interdependence and individual accountability, it is just unstructured group work.',
      'Trap: Thinking cooperative learning means giving the whole group one single grade; individual evaluation is required.',
    ],
  },
  {
    id: 'methods-effective-questioning',
    topicNumber: '3',
    title: 'Effective Questioning Strategies in Teaching',
    readTime: '7 min read',
    htmlNotesPath: 'notes/methods-of-teaching/effective-questioning-strategies.html',
    summary:
      'Questioning is one of the most powerful pedagogical tools available to educators to engage students, stimulate critical thinking, assess understanding, and make thinking visible. Lower-order or convergent questions focus on factual recall and single correct answers. Higher-order or divergent questions encourage analysis, evaluation, and creative thinking. Probing questions ask learners to clarify, justify, or expand an answer. Effective questioning incorporates Mary Budd Rowe’s wait time rule, equitable participation, structured peer discussion, and redirection of responses to classmates.',
    highYieldAlert:
      "Mary Budd Rowe's Wait Time Rule: Increasing the pause after posing a question from 1 second to 3–5 seconds dramatically increases response length, student confidence, participation from quiet students, and the complexity of student reasoning.",
    concepts: [
      {
        conceptTitle: 'Convergent vs Divergent Questioning',
        explanation:
          'Classroom questions fall along a cognitive spectrum that teachers intentionally modulate based on lesson objectives.',
        keyTerms: [
          {
            term: 'Convergent (Lower-Order) Questions',
            definition:
              'Closed questions seeking specific facts, definitions, or single correct answers (e.g. "What is the capital of Sindh?").',
          },
          {
            term: 'Divergent (Higher-Order) Questions',
            definition:
              'Open-ended questions encouraging multiple defensible answers, analysis, evaluation, and hypothesis generation.',
          },
          {
            term: 'Probing Questions',
            definition:
              'Follow-up questions asking students to clarify, elaborate, provide evidence, or justify their initial response.',
          },
        ],
        bulletPoints: [
          'Convergent questions check background knowledge and factual recall during direct instruction.',
          'Divergent questions stimulate discussion, promote critical thinking, and reveal conceptual depth.',
          'Probing questions transform brief, superficial answers into rigorous learning opportunities.',
        ],
      },
      {
        conceptTitle: 'Classroom Questioning Routines',
        explanation:
          'Equitable instructional routines that eliminate bias and ensure every learner is cognitively engaged.',
        bulletPoints: [
          'Wait Time (3–5 seconds): Pause after posing a question before selecting a student, giving all students time to process.',
          'Cold Call: Pose question to whole class, pause, then call on a student by name rather than relying on raised hands.',
          'Think-Pair-Share: Think individually (1 min) → Pair with partner (2 min) → Share with class (supports reserved learners).',
          'Bounce / Pass-the-Mic: Redirect student answers to peers (“Sara, do you agree with Ali’s explanation? Why or why not?”).',
          'No Opt-Out: If a student says "I don\'t know", return to them after another student answers so they voice the correct concept.',
          'Do not reject incorrect answers outright; explore the misconception constructively.',
        ],
      },
    ],
    comparisonTable: {
      title: 'Convergent Questions vs Divergent Questions',
      headers: ['Attribute', 'Convergent Questions', 'Divergent Questions'],
      rows: [
        ['Expected Answers', 'One correct or predetermined response', 'Multiple valid, creative, or defensible responses'],
        ['Thinking Required', 'Recall, factual memory, simple comprehension (LOTS)', 'Analysis, evaluation, hypothesizing, synthesis (HOTS)'],
        ['Classroom Purpose', 'Check background knowledge, verify factual recall', 'Stimulate debate, explore perspectives, spark inquiry'],
        ['Example', '"What is the boiling point of pure water at sea level?"', '"Why might a coastal city have milder winters than an inland desert?"'],
        ['Follow-up Strategy', 'Confirm correctness immediately', 'Probe for reasoning: "What evidence supports your answer?"'],
      ],
    },
    classroomApplication:
      "Instead of asking 'Who knows what photosynthesis is?' and picking the fastest hand, the teacher asks: 'How would life on Earth change if all green plants died?' (Pause 4 seconds) → 'Turn to your partner for 60 seconds' → 'Zainab, share your partner Bilal\\'s best point'.",
    mnemonicAid:
      "Remember: 'W-C-P-B' -> Wait time (3-5s), Cold call equitably, Probe for reasoning, Bounce to peers.",
    frequentExamQuestions: [
      {
        question: 'What is wait time and why is it important in classroom instruction?',
        answer:
          'Wait time is a deliberate 3–5 second pause after asking a question before selecting a student. It gives all students time to process, increases participation from introverted learners, and produces significantly longer and deeper cognitive responses.',
      },
      {
        question: 'Differentiate between convergent and divergent questions.',
        answer:
          'Convergent questions seek facts or one correct answer; divergent questions invite analysis, evaluation, creativity, and multiple defensible perspectives.',
      },
      {
        question: 'How can a teacher deepen one-word answers in a classroom discussion?',
        answer:
          'Use probing questions (“What makes you say that?”), wait time, Think-Pair-Share, and Bounce / Pass-the-Mic to invite classmates to add evidence or alternative views.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-eq-1',
        question:
          'According to educational research by Mary Budd Rowe, the recommended minimum wait time after posing a question is:',
        options: ['1 second', '3 to 5 seconds', '10 to 15 seconds', '30 seconds'],
        correctIndex: 1,
        explanation:
          '3 to 5 seconds is the optimal wait time to boost participation, response length, and higher-order thinking.',
      },
      {
        id: 'quiz-eq-2',
        question:
          'When a teacher asks: "Ahmad, do you agree with Fatima’s reasoning? Why or why not?", which questioning technique is being used?',
        options: ['Drill and practice', 'Bounce / Pass-the-Mic (Redirection)', 'Choral response', 'Closed convergent prompt'],
        correctIndex: 1,
        explanation:
          'Redirecting a student’s response to a classmate for validation or extension is known as Bounce or Pass-the-Mic.',
      },
      {
        id: 'quiz-eq-3',
        question: 'Which of the following is a divergent question?',
        options: [
          'In which year was the 1973 Constitution enacted?',
          'What is the SI unit of electric current?',
          'How might the economy of Sindh benefit if solar farming replaces fossil fuel plants?',
          'Who wrote the national anthem of Pakistan?',
        ],
        correctIndex: 2,
        explanation:
          'Evaluating potential economic benefits requires divergent, analytical thinking with multiple defensible points.',
      },
    ],
    examDistractorTraps: [
      'Trap: Calling on a student BEFORE asking the question (e.g. "Ali, what is..."); this causes everyone else to stop thinking. Always pose question first, pause, then name the student.',
      'Trap: Answering your own question immediately when students hesitate instead of granting wait time or providing scaffolding.',
    ],
  },
  {
    id: 'methods-instructional-approaches',
    topicNumber: '4',
    title: 'Instructional Approaches and Strategies',
    readTime: '12 min read',
    htmlNotesPath: 'notes/methods-of-teaching/instructional-approaches-and-strategies.html',
    summary:
      'Instructional approaches and strategies govern how educators organize the learning environment, deliver curriculum, engage students, and scaffold conceptual mastery. These range from direct, expository instruction to student-centred inquiry models. Key approaches include Lecture-Based Instruction, Active Learning, Project-Based Learning (PBL), Flipped Learning, Collaborative Learning, Differentiated Instruction, Scaffolded Instruction, Gamification, Formative Assessment, Inquiry-Based Learning (5E Cycle), Modeling, and Chunking. Master teachers blend and adapt these approaches based on learning goals, learner readiness, and resource availability.',
    highYieldAlert:
      "High-Yield Distinction: Inductive reasoning moves from Specific Examples to General Rules (eg-rule approach); Deductive reasoning moves from General Rule to Specific Applications (rule-eg approach). In the 5E Constructivist Cycle, Explore comes BEFORE Explain.",
    concepts: [
      {
        conceptTitle: 'Direct vs Inquiry-Based Approaches',
        explanation:
          'Different instructional goals require different pedagogy: direct approaches build foundational procedural competence, while inquiry approaches develop conceptual problem-solving.',
        keyTerms: [
          {
            term: 'Direct Instruction (Hunter Model)',
            definition:
              'Teacher-led explicit instruction with Anticipatory Set, Objective, Input, Modeling, Checking Understanding, Guided Practice, and Independent Practice.',
          },
          {
            term: '5E Constructivist Model (Bybee)',
            definition:
              'Engage → Explore → Explain → Elaborate → Evaluate. Students explore phenomena before formal terminology is defined.',
          },
          {
            term: 'Inductive vs Deductive Reasoning',
            definition:
              'Inductive: Examples → Pattern → Rule. Deductive: Rule → Formula → Example applications.',
          },
        ],
        bulletPoints: [
          'Lecture-Based Instruction delivers structured content efficiently through spoken explanation.',
          'Inquiry-Based and Experiential Learning make students active investigators discovering underlying principles.',
          'Flipped Learning places content acquisition (reading/video) outside class and uses class time for active problem-solving.',
        ],
      },
      {
        conceptTitle: 'Scaffolding, Differentiation, and Modern Strategies',
        explanation:
          'Adaptive strategies to meet diverse student readiness levels in mixed-ability classrooms.',
        bulletPoints: [
          'Scaffolded Instruction (Vygotsky ZPD): Breaks complex tasks into manageable milestones, gradually removing support (I do, We do, You do).',
          'Differentiated Instruction (Tomlinson): Adapts Content (what is learned), Process (how it is learned), Product (how mastery is shown), or Environment.',
          'Project-Based Learning (PBL): Students solve an authentic, sustained real-world problem over several weeks.',
          'Gamification: Integrates game elements (points, badges, leaderboards, timers) to enhance engagement in academic tasks.',
          'Modeling: Demonstrates the skill explicitly with "think-aloud" metacognitive explanation.',
          'Chunking: Breaks large cognitive loads into 3–5 bite-sized, memorable units.',
        ],
      },
    ],
    comparisonTable: {
      title: 'Comparative Matrix of Modern Instructional Approaches',
      headers: ['Approach', 'Core Feature', 'Teacher Role', 'Student Role', 'Best Classroom Use'],
      rows: [
        ['Direct Instruction', 'Step-by-step explicit modeling & practice', 'Instructor & Director', 'Attentive practitioner', 'Foundational math algorithms, grammar rules, lab safety'],
        ['5E Constructivist', 'Engage, Explore, Explain, Elaborate, Evaluate', 'Facilitator & Guide', 'Investigator & Concept Builder', 'Science experiments, discovering conceptual laws'],
        ['Flipped Learning', 'Content at home, practice in class', 'Mentor & Coach', 'Active collaborator in class', 'Secondary and higher education with digital/text access'],
        ['Differentiated Instruction', 'Varying content, process, or product', 'Diagnostician & Adaptive planner', 'Self-paced learner', 'Mixed-ability, inclusive classrooms with varied readiness'],
        ['Project-Based Learning', 'Sustained authentic inquiry solving real problem', 'Resource coordinator', 'Project manager & problem solver', 'Community issues, environmental audits, cross-curricular'],
      ],
    },
    classroomApplication:
      "In a Grade 7 Science class on 'Acids and Bases', instead of lecturing definitions on the blackboard, use 5E: Engage with a litmus paper color-change demo; Explore by testing lemon juice and soap in pairs; Explain definitions; Elaborate by testing soil samples; Evaluate with a short diagnostic exit ticket.",
    mnemonicAid:
      "5E Model: 'EE-EEE' -> Engage, Explore, Explain, Elaborate, Evaluate. (Remember: Explore ALWAYS precedes Explain!).",
    frequentExamQuestions: [
      {
        question: 'Explain the difference between Flipped Learning and traditional Lecture-Based Instruction.',
        answer:
          'Flipped Learning moves direct content acquisition (reading, recorded lessons) outside class time and uses precious classroom sessions for interactive discussion, application, and problem-solving, whereas traditional lecture delivers content in class while homework is done alone.',
      },
      {
        question: 'What is Scaffolded Instruction?',
        answer:
          'Scaffolded Instruction (rooted in Vygotsky’s Zone of Proximal Development) breaks complex learning into smaller, manageable steps, provides temporary support and modeling, and gradually fades support as students gain independent mastery.',
      },
      {
        question: 'Contrast Inductive and Deductive teaching methods with examples.',
        answer:
          'Inductive teaching starts with specific examples so students infer the general rule (e.g., observing dropped objects to derive gravity). Deductive teaching states the general rule first, then applies it to specific examples (e.g., stating F=ma then calculating force).',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-ia-1',
        question: 'In the 5E Constructivist Instructional Model, which stage immediately follows "Explore"?',
        options: ['Engage', 'Explain', 'Elaborate', 'Evaluate'],
        correctIndex: 1,
        explanation: 'The 5E sequence is: Engage → Explore → Explain → Elaborate → Evaluate.',
      },
      {
        id: 'quiz-ia-2',
        question:
          'Which teaching strategy provides temporary support that is gradually withdrawn as learner autonomy increases?',
        options: ['Direct drilling', 'Scaffolding', 'Lecture delivery', 'Rote memorization'],
        correctIndex: 1,
        explanation:
          'Scaffolding (Vygotsky / Bruner) provides structured support within the ZPD that is systematically removed as mastery develops.',
      },
      {
        id: 'quiz-ia-3',
        question:
          'A teacher presents 10 sentences with underlined subjects and verbs, prompting students to formulate the rule for subject-verb agreement. This approach is:',
        options: ['Deductive teaching', 'Inductive teaching', 'Behaviorist conditioning', 'Expository lecturing'],
        correctIndex: 1,
        explanation:
          'Guiding students to derive a general rule from specific examples is an Inductive approach.',
      },
    ],
    examDistractorTraps: [
      'Trap: Placing Explain before Explore in the 5E model; the constructivist core requires students to explore and grapple with the phenomenon first.',
      'Trap: Confusing Differentiated Instruction with tracking or streaming students into fixed low-ability and high-ability tracks.',
    ],
  },
  {
    id: 'methods-npstp-pakistan',
    topicNumber: '5',
    title: 'National Professional Standards for Teachers in Pakistan (NPSTP)',
    readTime: '10 min read',
    summary:
      'The National Professional Standards for Teachers in Pakistan (NPSTP) provide a standardized national benchmark describing what competent educators must know, value, and practice. Developed in 2009 by the Policy and Planning Wing of the Ministry of Education with USAID support under the National Education Policy 2009, they guide teacher education accreditation, recruitment, performance appraisal, promotion, and continuous professional development (CPD). Each of the 10 standards is evaluated across three pillars: Knowledge, Dispositions, and Performances.',
    highYieldAlert:
      'STS High-Yield Architecture: There are exactly 10 National Professional Standards. Every standard has a uniform tripartite structure: (1) Knowledge (what teachers know), (2) Dispositions (values and attitudes held), and (3) Performances (what teachers demonstrate in the classroom).',
    concepts: [
      {
        conceptTitle: 'The 10 National Professional Standards',
        explanation:
          'Enacted in 2009 under the National Education Policy to professionalize teaching across Pakistan.',
        keyTerms: [
          {
            term: 'Standard 1: Subject Matter Knowledge',
            definition:
              'Deep mastery of curriculum content, underlying concepts, history of ideas, and evolving paradigms.',
          },
          {
            term: 'Standard 2: Human Growth and Development',
            definition:
              'Understanding physical, cognitive, socio-emotional stages of students and adapting pedagogy accordingly.',
          },
          {
            term: 'Standard 3: Islamic Ethical Values / Social Life Skills',
            definition:
              'Promoting national cohesion, universal moral values, peace, tolerance, and Islamic ethics.',
          },
          {
            term: 'Standard 4: Instructional Planning and Strategies',
            definition:
              'Formulating learning objectives, designing aligned lesson plans, and employing varied instructional approaches.',
          },
          {
            term: 'Standard 5: Assessment',
            definition:
              'Employing continuous formative, diagnostic, and summative assessments to monitor learning and inform instruction.',
          },
          {
            term: 'Standard 6: Learning Environment',
            definition:
              'Maintaining safe, respectful, positive, disciplined classrooms free from corporal punishment.',
          },
          {
            term: 'Standard 7: Effective Communication & Language Proficiency',
            definition:
              'Articulate verbal, non-verbal, and written communication in instruction and interactions.',
          },
          {
            term: 'Standard 8: Collaboration and Partnerships',
            definition:
              'Working cooperatively with parents, School Management Committees (SMCs), and communities.',
          },
          {
            term: 'Standard 9: Continuous Professional Development (CPD)',
            definition:
              'Commitment to lifelong learning, self-reflection, action research, and adherence to codes of conduct.',
          },
          {
            term: 'Standard 10: Teaching of Islamic Studies / Holy Quran',
            definition:
              'Proficiency in teaching Holy Quran / Islamiat where required by the national curriculum.',
          },
        ],
        bulletPoints: [
          'The standards bridge pre-service teacher education (B.Ed/ADE) and in-service professional practice.',
          'Implementation challenges: uneven monitoring, large class sizes, resource shortages, and provincial administrative variations.',
          'Continuous Professional Development (CPD) is required to maintain licensure and advance career ladders.',
        ],
      },
      {
        conceptTitle: 'The Tripartite Structure of Each Standard',
        explanation:
          'Each of the 10 standards evaluates the educator across three distinct components.',
        bulletPoints: [
          '1. Knowledge: Theoretical understanding, principles, subject concepts, pedagogical theories.',
          '2. Dispositions: Professional values, beliefs, attitudes, fairness, empathy, commitment.',
          '3. Performances: Observable classroom behaviors, teaching actions, assessment practices.',
        ],
      },
    ],
    comparisonTable: {
      title: 'Tripartite Anatomy of NPSTP Standards (Example: Standard 5 - Assessment)',
      headers: ['Component', 'Description', 'Classroom Indicator'],
      rows: [
        ['Knowledge (Cognitive)', 'What the teacher knows and understands', 'Understands formative vs summative assessment, Bloom taxonomy, validity, and reliability'],
        ['Dispositions (Affective)', 'Beliefs, ethical commitments, and professional attitudes', 'Believes every student can improve; commits to fair, unbiased, transparent grading'],
        ['Performances (Behavioral)', 'Observable pedagogical actions in classroom practice', 'Conducts daily exit tickets, writes rubric-based feedback, maintains diagnostic grade logs'],
      ],
    },
    classroomApplication:
      "A primary school teacher in Larkana who uses positive reinforcement, bans corporal punishment, conducts weekly parent-teacher meetings, and adapts math problems to students' developmental levels is fulfilling Standards 2 (Human Growth), 6 (Learning Environment), and 8 (Collaboration).",
    mnemonicAid:
      "NPSTP Tripartite Formula: 'K-D-P' -> Knowledge (Head), Dispositions (Heart), Performances (Hands).",
    frequentExamQuestions: [
      {
        question: 'What is the purpose of the National Professional Standards for Teachers in Pakistan (NPSTP)?',
        answer:
          'NPSTP establishes a unified national benchmark for teacher competence, guiding teacher accreditation, curriculum design, recruitment criteria, promotion systems, and continuous professional development.',
      },
      {
        question: 'Describe the three-part structure of each standard.',
        answer:
          'Each standard consists of Knowledge (what the teacher knows), Dispositions (the professional attitudes and values the teacher maintains), and Performances (the observable pedagogical skills demonstrated in classroom practice).',
      },
      {
        question: 'Identify four standards a teacher violates by only lecturing, planning poorly, assessing only at term-end, and avoiding colleagues and parents.',
        answer:
          'Instructional Planning and Strategies (Std 4), Assessment (Std 5), Collaboration and Partnerships (Std 8), and Continuous Professional Development / Code of Conduct (Std 9).',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-npstp-1',
        question:
          'How many National Professional Standards for Teachers in Pakistan (NPSTP) were formulated in 2009?',
        options: ['5 standards', '7 standards', '10 standards', '12 standards'],
        correctIndex: 2,
        explanation: 'There are exactly 10 National Professional Standards for Teachers in Pakistan.',
      },
      {
        id: 'quiz-npstp-2',
        question:
          'Which standard specifically emphasizes establishing productive partnerships with School Management Committees (SMCs) and parents?',
        options: ['Standard 4 (Planning)', 'Standard 6 (Environment)', 'Standard 8 (Collaboration & Partnerships)', 'Standard 9 (CPD)'],
        correctIndex: 2,
        explanation:
          'Standard 8 focuses on Collaboration and Partnerships with families, communities, and educational stakeholders.',
      },
      {
        id: 'quiz-npstp-3',
        question: 'In the NPSTP framework, "Dispositions" refers to:',
        options: [
          'Subject matter syllabus facts',
          'Professional attitudes, beliefs, and ethical values',
          'Classroom disciplinary physical punishments',
          'Years of administrative seniority',
        ],
        correctIndex: 1,
        explanation:
          'Dispositions refer to the values, commitments, ethical stances, and attitudes held by professional educators.',
      },
    ],
    examDistractorTraps: [
      'Trap: Believing NPSTP only evaluates subject matter knowledge; it encompasses 10 holistic standards including ethics, collaboration, and learning environment.',
      'Trap: Confusing NPSTP (National Standards 2009) with the Sindh Teacher Education Development Authority (STEDA) licensing act (provincial mandate).',
    ],
  },
  {
    id: 'methods-teacher-student-centred',
    topicNumber: '6',
    title: 'Teacher-Centred and Student-Centred Approaches',
    readTime: '8 min read',
    htmlNotesPath: 'notes/methods-of-teaching/teacher-centred-and-student-centred-approaches.html',
    summary:
      'Teacher-centred and student-centred approaches are two ends of an instructional spectrum, and high-performing classrooms strategically blend them. In a teacher-centred approach, the instructor acts as the primary expert and transmitter who directs the pace, content, and activities, while students predominantly receive information (direct instruction, expository lecturing, modeling). In a student-centred approach, the teacher acts as a facilitator and guide, while learners construct meaning through inquiry, collaborative discussion, hands-on projects, and problem-solving. Effective educators balance direct instruction for foundational concepts with student-centred inquiry for higher-order reasoning.',
    highYieldAlert:
      'Theoretical Foundations: Teacher-centred instruction is rooted in Behaviourism (Skinner, Pavlov, Thorndike - passive conditioning and stimulus-response). Student-centred instruction is grounded in Constructivism and Humanism (Piaget, Vygotsky, Bruner, Dewey, Carl Rogers - active schema building).',
    concepts: [
      {
        conceptTitle: 'The Pedagogical Continuum',
        explanation:
          'Rather than mutually exclusive dogmas, teacher-centred and student-centred methods represent an instructional continuum blended to suit learning phases.',
        keyTerms: [
          {
            term: 'Teacher-Centred (Expository / Direct)',
            definition:
              'Teacher acts as primary source of knowledge; classroom characterized by quiet order, transmission of facts, and teacher-directed pacing.',
          },
          {
            term: 'Student-Centred (Constructivist / Experiential)',
            definition:
              'Learner acts as active investigator; teacher facilitates inquiry, collaborative discovery, problem-solving, and critical thinking.',
          },
          {
            term: 'Blended Instructional Balance',
            definition:
              'Combining brief direct teacher modeling (10-15 mins) with student-led active inquiry, cooperative learning, and structured debriefing.',
          },
        ],
        bulletPoints: [
          'Teacher-centred strengths: Efficient content delivery, high structure, clear modeling, suitable for large classes and introduction of entirely unfamiliar topics.',
          'Teacher-centred limitations: Passive student role, promotes rote recall rather than critical problem-solving, limited individual differentiation.',
          'Student-centred strengths: Fosters intrinsic motivation, critical thinking, teamwork, creative synthesis, and deep retention.',
          'Student-centred limitations: Demands more preparation, complex classroom management, time-consuming, and risks knowledge gaps without strong structure.',
        ],
      },
      {
        conceptTitle: 'Practical Strategies for Large Classrooms',
        explanation:
          'How teachers in resource-constrained or crowded classrooms can successfully introduce student-centred elements.',
        bulletPoints: [
          'Think-Pair-Share: Requires no additional space or supplies; students discuss questions in pairs at their desks.',
          'Peer Problem-Solving: Students solve alternate math problems in pairs and check each other’s work.',
          'Short Explanation + Application: Limit teacher lecture to 10 minutes, followed immediately by small-group application.',
          'Exit Tickets: 2-minute end-of-class slips assessing whether students mastered the day’s core concept.',
        ],
      },
    ],
    comparisonTable: {
      title: 'Teacher-Centred vs Student-Centred Paradigm Comparison',
      headers: ['Dimension', 'Teacher-Centred Approach', 'Student-Centred Approach'],
      rows: [
        ['Role of Teacher', 'Knowledge transmitter, authority figure, director', 'Facilitator, mentor, resource curator, guide'],
        ['Role of Student', 'Passive recipient, listener, note-taker', 'Active investigator, problem-solver, collaborator'],
        ['Learning Process', 'Direct instruction, recitation, drills, rote memorization', 'Inquiry, discovery, collaborative projects, reflection'],
        ['Theoretical Root', 'Behaviourism (Skinner, Pavlov)', 'Constructivism & Humanism (Piaget, Vygotsky, Dewey)'],
        ['Assessment Focus', 'Summative tests, correct answers, factual recall', 'Continuous formative checks, rubrics, self-assessment'],
        ['Classroom Atmosphere', 'Silent, formal rows, teacher-monitored talk', 'Collaborative buzz, group pods, purposeful interaction'],
      ],
    },
    classroomApplication:
      'In an STS Sindh secondary school class of 60 students, rather than lecturing for the full 45 minutes, the teacher delivers an 8-minute demonstration on quadratic equations, gives students 15 minutes of paired problem-solving with worked examples, and spends 10 minutes having student pairs explain their solutions at the board.',
    mnemonicAid:
      "Remember: 'Guide on the side vs Sage on the stage' -> Student-centred is Guide on the side; Teacher-centred is Sage on the stage.",
    frequentExamQuestions: [
      {
        question: 'Compare teacher-centred and student-centred approaches.',
        answer:
          'Teacher-centred teaching places the instructor as the expert authority transmitting facts to passive receivers. Student-centred teaching positions the teacher as a facilitator helping active learners construct understanding through inquiry, discussion, and problem-solving.',
      },
      {
        question: 'Why is a balanced instructional approach often most effective in real classrooms?',
        answer:
          'Different objectives demand different methods: new, foundational, or safety-critical concepts require direct teacher modeling and structure, while higher-order reasoning, application, and synthesis require student-led inquiry and collaboration.',
      },
      {
        question: 'Suggest four practical student-centred strategies for large, lecture-based classes.',
        answer:
          'Use Think-Pair-Share, peer review / pair problem-solving, brief 10-minute micro-lectures followed by active group tasks, and daily exit tickets for formative feedback.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-tc-1',
        question: 'Which educational philosophy/learning theory is most strongly associated with student-centred teaching?',
        options: ['Classical Behaviourism', 'Constructivism', 'Positivism', 'Essentialism'],
        correctIndex: 1,
        explanation:
          'Constructivism (Piaget, Vygotsky, Bruner) posits that learners actively construct knowledge through experience and reflection.',
      },
      {
        id: 'quiz-tc-2',
        question: 'In a student-centred classroom, the role of the teacher is best described as:',
        options: ['Sage on the stage', 'Sole authority and disciplinarian', 'Facilitator and learning guide', 'Passive bystander'],
        correctIndex: 2,
        explanation:
          'The teacher acts as a facilitator and guide ("guide on the side") who scaffolds student inquiry.',
      },
      {
        id: 'quiz-tc-3',
        question: 'Which method is most characteristic of teacher-centred pedagogy?',
        options: ['Discovery learning', 'Expository lecture and drill', 'Project-based learning', 'Socratic seminar'],
        correctIndex: 1,
        explanation:
          'Expository lecturing and repetitive drill practice are hallmarks of teacher-centred direct instruction.',
      },
    ],
    examDistractorTraps: [
      'Trap: Assuming student-centred classrooms have no rules or teacher planning; they actually require more rigorous upfront structuring and clear facilitation protocols.',
      'Trap: Thinking teacher-centred instruction has zero utility; it remains the most efficient method for introducing completely novel foundational procedures.',
    ],
  },
];

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
    description:
      'Foundational instructional approaches & strategies, direct instruction (Hunter model), constructivist 5E cycle, Bloom’s taxonomy, cooperative learning (Jigsaw, TPS, STAD), effective questioning, NPSTP standards, and teacher-centred vs student-centred pedagogy for STEDA licensing.',
    topics: METHODS_OF_TEACHING_TOPICS,
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
    description:
      'Cognitive, physical, and socio-emotional development stages (Piaget, Vygotsky, Erikson, Kohlberg), learning theories, motivation, and inclusive education strategies.',
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
    description:
      "Routines, positive discipline, Jacob Kounin's group management techniques (withitness, overlapping, smoothness), conflict resolution, and creating an enabling classroom environment.",
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
    description:
      "Diagnostic, formative, and summative assessments, Bloom's revised cognitive taxonomy (Anderson & Krathwohl), test construction, rubrics, and continuous assessment schemes.",
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
    description:
      'School Management Committees (SMCs), community mobilization, parent-teacher collaboration, Article 25-A, NPSTP standards, and the ethical responsibilities of professional educators.',
    topics: [],
  },
];
