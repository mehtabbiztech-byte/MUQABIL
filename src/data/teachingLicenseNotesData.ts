import { EDUCATIONAL_PSYCHOLOGY_TOPICS } from './educationalPsychologyTopics';
import { CLASSROOM_MANAGEMENT_TOPICS } from './classroomManagementTopics';
import { CLASSROOM_ASSESSMENT_TOPICS } from './classroomAssessmentTopics';

export { EDUCATIONAL_PSYCHOLOGY_TOPICS };
export { CLASSROOM_MANAGEMENT_TOPICS };
export { CLASSROOM_ASSESSMENT_TOPICS };

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
    htmlNotesPath: 'notes/methods-of-teaching/blooms-taxonomy-of-educational-objectives.html',
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
    htmlNotesPath: 'notes/methods-of-teaching/cooperative-learning-strategies.html',
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
    htmlNotesPath: 'notes/methods-of-teaching/national-professional-standards-for-teachers-in-pakistan.html',
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

export const FOUNDATIONS_OF_EDUCATION_TOPICS: LicenseTopicNote[] = [
  {
    id: 'foundations-ideological',
    topicNumber: '1',
    title: 'Ideological Foundations of Education',
    readTime: '9 min read',
    htmlNotesPath: 'notes/foundations-of-education/ideological-foundations-of-education.html',
    summary:
      "The ideological foundation determines the vision, ethos, values, and ultimate purpose of education in a society, aligning educational practice with the community's core beliefs and philosophy. Without it, an educational system lacks direction, purpose, and cultural relevance. Its core components are the core belief system, national identity, moral and ethical character, and social cohesion, and its main functions are goal setting, curriculum design, teaching methodology, and policy formulation. In Pakistan, the ideological foundation of education is explicitly rooted in Islamic ideology and the ideology of Pakistan, as emphasised in the National Education Policy of 1979.",
    highYieldAlert:
      "STS High-Yield: Pakistan's ideological foundation of education is rooted in Islamic ideology and the ideology of Pakistan. The National Education Policy of 1979 stressed loyalty to Islam, character in accordance with the Quran and Sunnah, awareness of the universal Muslim Ummah, and knowledge of the Pakistan Movement's ideological foundations — and curricula/textbooks are reviewed to promote national cohesiveness and Islamic ideology.",
    concepts: [
      {
        conceptTitle: 'Core Components & Themes',
        explanation:
          'The four building blocks that give an education system its values and identity.',
        keyTerms: [
          {
            term: 'Core Belief System',
            definition:
              'Incorporates religious, ethical, philosophical, and cultural values that guide human life and social structure (e.g., an Islamic society prioritizing Tawhid and moral accountability).',
          },
          {
            term: 'National Identity',
            definition:
              'Fosters patriotism, unity, civic responsibility, and respect for cultural heritage (e.g., teaching the Pakistan Movement and the ideology of Pakistan).',
          },
          {
            term: 'Moral & Ethical Character',
            definition:
              'Shapes individual personality, moral discernment, integrity, and self-discipline (e.g., character education programs emphasizing honesty and responsibility).',
          },
          {
            term: 'Social Cohesion',
            definition:
              'Promotes social justice, tolerance, equality, and mutual respect among diverse groups (e.g., inclusive curricula representing all ethnic and religious communities).',
          },
        ],
      },
      {
        conceptTitle: 'Main Functions of Ideological Foundations',
        explanation: 'How ideology is translated into educational practice.',
        keyTerms: [
          {
            term: 'Goal Setting',
            definition:
              'Defines the overarching aims of the education system — character building, civic duty, spiritual development.',
          },
          {
            term: 'Curriculum Design',
            definition:
              'Determines what subjects, historical narratives, literature, and value-based content are prioritized — the curriculum is never neutral.',
          },
          {
            term: 'Teaching Methodology',
            definition:
              'Guides pedagogical approaches to instill discipline, critical thinking, or moral reflection.',
          },
          {
            term: 'Policy Formulation',
            definition:
              'Serves as the benchmark for educational reforms, standards, and national goals — from teacher standards to textbook approval.',
          },
        ],
      },
      {
        conceptTitle: 'Major Philosophical & Ideological Streams',
        explanation: 'The lenses through which societies answer what education is for.',
        keyTerms: [
          {
            term: 'Idealism',
            definition:
              'Emphasizes spiritual, moral, and intellectual development through truth, beauty, and goodness.',
          },
          {
            term: 'Realism',
            definition:
              'Focuses on objective truth, empirical knowledge, scientific inquiry, and practical understanding of the physical world.',
          },
          {
            term: 'Pragmatism / Progressivism',
            definition:
              'Focuses on learning by doing, adaptability, problem-solving, and democratically oriented education.',
          },
          {
            term: 'Religious / Cultural Ideologies',
            definition:
              'Focus on holistic development guided by sacred texts, spiritual values, and historical continuity (e.g., Islamic, Christian, or Eastern frameworks).',
          },
        ],
      },
      {
        conceptTitle: 'Ideological Foundations in the Pakistani Context',
        explanation:
          'Rooted in Islamic ideology and the ideology of Pakistan, particularly emphasized in the National Education Policy of 1979.',
        bulletPoints: [
          'Islamic Ideology: education aims to develop character, conduct, and motivation in accordance with the Quran and Sunnah.',
          'National Identity: fostering deep loyalty to Pakistan and a consciousness of spiritual and ideological identity.',
          'Universal Ummah: creating awareness that Pakistani students are part of the universal Muslim Ummah and should contribute to its welfare.',
          'Pakistan Movement: producing citizens fully conversant with the Pakistan Movement, its ideological foundations, history, and culture.',
          'Curriculum Review: mechanisms to review curricula and textbooks so they promote national cohesiveness, integration, and Islamic ideology.',
          'Moral & Social Values: textbooks emphasize virtues like tolerance, charity, and acceptance of non-Muslims through stories from Islamic history.',
        ],
      },
    ],
    frequentExamQuestions: [
      {
        question: 'Explain the four core components of ideological foundations of education and why each matters.',
        answer:
          'The four components are the Core Belief System (religious, ethical, and cultural values that guide life), National Identity (patriotism, unity, and respect for heritage), Moral & Ethical Character (personality, integrity, and self-discipline), and Social Cohesion (justice, tolerance, and mutual respect among diverse groups). Together they give the education system its direction, identity, and social purpose.',
      },
      {
        question: 'Describe the four main functions of ideological foundations in education.',
        answer:
          'Goal Setting defines overarching aims such as character building and civic duty; Curriculum Design determines which subjects, historical narratives, and values are prioritized; Teaching Methodology guides pedagogical approaches that instill discipline, critical thinking, or moral reflection; Policy Formulation serves as the benchmark for educational reforms, standards, and national goals.',
      },
      {
        question: 'Compare Idealism and Realism as philosophical streams of educational ideology.',
        answer:
          'Idealism emphasizes spiritual, moral, and intellectual development through truth, beauty, and goodness, treating reality as mental or spiritual. Realism focuses on objective truth, empirical knowledge, scientific inquiry, and the physical world. Idealism shapes education around values and ideals, while Realism shapes it around observation and evidence.',
      },
      {
        question:
          'How has the ideological foundation of education in Pakistan been shaped by Islamic ideology and the Pakistan Movement?',
        answer:
          'Pakistan has consistently rooted education in Islamic ideology and the ideology of Pakistan. The National Education Policy of 1979 emphasized loyalty to Islam, character in accordance with the Quran and Sunnah, awareness of the universal Muslim Ummah, knowledge of the Pakistan Movement, and curriculum/textbook review for national cohesiveness and Islamic ideology.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-ide-1',
        question:
          'Why is the ideological foundation considered the primary pillar of any educational system?',
        options: [
          'It determines the budget of schools',
          'It determines the vision, ethos, values, and ultimate purpose of education',
          'It decides the number of teachers hired',
          'It replaces the need for a curriculum',
        ],
        correctIndex: 1,
        explanation:
          "The ideological foundation determines the vision, ethos, values, and ultimate purpose of education, aligning practice with the community's core beliefs.",
      },
      {
        id: 'quiz-ide-2',
        question:
          'Which philosophical stream emphasizes spiritual, moral, and intellectual development through truth, beauty, and goodness?',
        options: ['Realism', 'Pragmatism', 'Idealism', 'Progressivism'],
        correctIndex: 2,
        explanation:
          'Idealism emphasizes spiritual, moral, and intellectual development through truth, beauty, and goodness.',
      },
      {
        id: 'quiz-ide-3',
        question:
          'According to the 1979 National Education Policy, one aim of education in Pakistan is to create awareness that students are part of:',
        options: [
          'A global secular community',
          'The universal Muslim Ummah',
          'A purely provincial identity',
          'A Western educational tradition',
        ],
        correctIndex: 1,
        explanation:
          'The policy aimed to create awareness that Pakistani students are part of the universal Muslim Ummah and should contribute to its welfare.',
      },
    ],
    examDistractorTraps: [
      'Trap: Treating Pragmatism as focused on spiritual ideals — that is Idealism; Pragmatism/Progressivism emphasizes learning by doing and problem-solving.',
      'Trap: Attributing the universal Ummah and Quran & Sunnah character aims to the National Education Policy 2009 — these were stressed in the 1979 policy.',
      'Trap: Thinking the ideological foundation only selects curriculum content; it also sets goals, guides teaching methodology, and benchmarks policy formulation.',
      'Trap: Confusing Moral & Ethical Character (individual integrity and self-discipline) with Social Cohesion (justice, tolerance, and mutual respect among groups).',
    ],
  },
  {
    id: 'foundations-philosophical',
    topicNumber: '2',
    title: 'Philosophical Foundations of Education',
    readTime: '9 min read',
    htmlNotesPath: 'notes/foundations-of-education/philosophical-foundations-of-education.html',
    summary:
      'Philosophy forms the foundational logic and intellectual structure of education. While ideological foundations supply the values and vision of a specific society, philosophical foundations examine the nature of reality, knowledge, and value — addressing what should be taught, how we know what is true, and what is worth knowing. The three core branches are Metaphysics, Epistemology, and Axiology; the four major schools are Idealism, Realism, Pragmatism/Experimentalism, and Existentialism. The philosophical foundation serves as the framework for every decision in an educational system, shaping curriculum, instruction, assessment, and the overall role of the school in human development.',
    highYieldAlert:
      'STS High-Yield: Match each school to its thinkers — Idealism (Plato, Kant, Hegel), Realism (Aristotle, Francis Bacon, John Locke), Pragmatism/Experimentalism (John Dewey, Charles Sanders Peirce, William James), Existentialism (Jean-Paul Sartre, Søren Kierkegaard, Friedrich Nietzsche) — and each branch to its question: Metaphysics "What is real?", Epistemology "How do we know what is true?", Axiology "What is good, right, or beautiful?"',
    concepts: [
      {
        conceptTitle: 'Core Branches of Philosophy in Education',
        explanation: 'The three lenses through which philosophy shapes schooling.',
        keyTerms: [
          {
            term: 'Metaphysics — What is real?',
            definition:
              'Examines the nature of reality and existence; determines curriculum content — whether we teach physical science, spiritual concepts, or both.',
          },
          {
            term: 'Epistemology — How do we know what is true?',
            definition:
              'Examines the nature, sources, and limits of knowledge; guides teaching and learning methods — lecture, inquiry, observation, or deduction.',
          },
          {
            term: 'Axiology — What is good, right, or beautiful?',
            definition:
              'Examines values and ethics; shapes character education, moral reasoning, aesthetics, and school culture.',
          },
        ],
      },
      {
        conceptTitle: 'Major Schools of Educational Philosophy',
        explanation: 'Four schools, each with its own view of reality, thinkers, and methods.',
        keyTerms: [
          {
            term: 'Idealism (Plato, Immanuel Kant, Hegel)',
            definition:
              'Reality is grounded in ideas, mind, and spirit. Focuses on character development, wisdom, and eternal truths via classics, philosophy, humanities, and history taught through the Socratic method and lecture.',
          },
          {
            term: 'Realism (Aristotle, Francis Bacon, John Locke)',
            definition:
              'Reality exists independently of human minds and is governed by physical laws. Focuses on understanding the physical world through systematic observation and logic, taught through demonstration, experiment, and direct instruction.',
          },
          {
            term: 'Pragmatism / Experimentalism (John Dewey, Charles Sanders Peirce, William James)',
            definition:
              'Truth and reality are dynamic, changing with practical experience and problem-solving. Education is life itself; project-based learning, hands-on tasks, integrated subjects, and collaborative problem-solving.',
          },
          {
            term: 'Existentialism (Jean-Paul Sartre, Søren Kierkegaard, Friedrich Nietzsche)',
            definition:
              'Reality is defined by individual existence, free will, and personal responsibility. Helps students discover their unique identity through arts, literature, humanities, and self-directed study, with open discussion, creative expression, and self-reflection.',
          },
        ],
      },
      {
        conceptTitle: 'Impact on Key Educational Dimensions',
        explanation: 'Philosophy shapes every decision — curriculum, instruction, assessment, and the school’s role.',
        bulletPoints: [
          'Purpose: transmit timeless truths (Idealism), master real-world facts (Realism), solve practical problems (Pragmatism), or foster self-actualization (Existentialism).',
          "Teacher's role: moral authority/model (Idealism), subject-matter expert (Realism), facilitator/guide (Pragmatism), or provocative mentor (Existentialism).",
          "Learner's role: from a passive absorber of universal principles to an active, self-directed inquirer shaping their own learning path.",
        ],
      },
    ],
    comparisonTable: {
      title: 'Schools at a Glance',
      headers: ['Feature', 'Idealism', 'Realism', 'Pragmatism', 'Existentialism'],
      rows: [
        ['Reality', 'Ideas & spirit', 'Physical world', 'Dynamic experience', 'Individual existence'],
        ['Purpose', 'Eternal truths', 'Master real-world facts', 'Solve practical problems', 'Self-actualization'],
        ["Teacher's role", 'Moral authority / model', 'Subject-matter expert', 'Facilitator / guide', 'Provocative mentor'],
        ["Learner's role", 'Absorber of universal principles', 'Observer of facts', 'Active problem-solver', 'Self-directed inquirer'],
        ['Method', 'Socratic, lecture', 'Demonstration, experiment', 'Project, hands-on', 'Discussion, self-reflection'],
      ],
    },
    frequentExamQuestions: [
      {
        question: 'Explain the three core branches of philosophy and how each applies to education.',
        answer:
          'Metaphysics asks "What is real?" and determines curriculum content (physical science, spiritual concepts, or both). Epistemology asks "How do we know what is true?" and guides teaching and learning methods (lecture, inquiry, observation, deduction). Axiology asks "What is good, right, or beautiful?" and shapes character education, moral reasoning, aesthetics, and school culture.',
      },
      {
        question: 'Compare Idealism and Pragmatism as educational philosophies, including their key thinkers and methods.',
        answer:
          'Idealism (Plato, Kant, Hegel) holds that reality is grounded in ideas and spirit; it aims at character development and eternal truths and uses classics, philosophy, and history taught via the Socratic method and lecture. Pragmatism (Dewey, Peirce, James) holds that truth is dynamic and practical; education is life itself and democratic and student-centered, using project-based learning, hands-on tasks, integrated subjects, and collaborative problem-solving.',
      },
      {
        question:
          'How does philosophical foundation shape the purpose of education, the teacher’s role, and the learner’s role?',
        answer:
          'Purpose ranges from transmitting timeless truths (Idealism) and mastering real-world facts (Realism) to solving practical problems (Pragmatism) and fostering self-actualization (Existentialism). The teacher is a moral authority/model, subject-matter expert, facilitator/guide, or provocative mentor respectively. The learner moves from a passive absorber of universal principles to an active, self-directed inquirer.',
      },
      {
        question:
          'Describe Existentialism as an educational philosophy — its core view, key thinkers, and how it shapes curriculum and method.',
        answer:
          'Its core view is that reality is defined by individual existence, free will, and personal responsibility. Key thinkers are Jean-Paul Sartre, Søren Kierkegaard, and Friedrich Nietzsche. It helps students discover their unique identity, choices, and personal values; its curriculum includes arts, literature, humanities, and self-directed study, taught through open discussion, creative expression, and self-reflection.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-phi-1',
        question:
          "Which branch of philosophy asks 'What is real?' and determines curriculum content?",
        options: ['Epistemology', 'Axiology', 'Metaphysics', 'Logic'],
        correctIndex: 2,
        explanation:
          'Metaphysics examines the nature of reality and determines curriculum content — e.g., whether to teach physical science, spiritual concepts, or both.',
      },
      {
        id: 'quiz-phi-2',
        question:
          'Which philosophy holds that reality is grounded in ideas, mind, and spirit?',
        options: ['Realism', 'Pragmatism', 'Idealism', 'Existentialism'],
        correctIndex: 2,
        explanation:
          'Idealism (Plato, Kant, Hegel) holds that reality is grounded in ideas, mind, and spirit rather than material objects.',
      },
      {
        id: 'quiz-phi-3',
        question: 'Who are key thinkers associated with Realism?',
        options: [
          'Plato, Kant, Hegel',
          'Aristotle, Francis Bacon, John Locke',
          'Dewey, Peirce, James',
          'Sartre, Kierkegaard, Nietzsche',
        ],
        correctIndex: 1,
        explanation: 'Realism is associated with Aristotle, Francis Bacon, and John Locke.',
      },
    ],
    examDistractorTraps: [
      'Trap: Mixing up the branches — Metaphysics = reality/curriculum content; Epistemology = knowledge/teaching methods; Axiology = values/character and school culture.',
      'Trap: Attributing Dewey, Peirce, or James to Idealism — they are Pragmatism/Experimentalism thinkers.',
      'Trap: Giving the teacher the "subject-matter expert" role under Idealism — that is Realism; Idealism casts the teacher as moral authority/model.',
      'Trap: Treating Existentialism as focused on external authority; it centers individual existence, free will, and personal responsibility.',
    ],
  },
  {
    id: 'foundations-sociological',
    topicNumber: '3',
    title: 'Sociological Foundations of Education',
    readTime: '9 min read',
    htmlNotesPath: 'notes/foundations-of-education/sociological-foundations-of-education.html',
    summary:
      'The sociological foundation views education as a vital social institution that shapes, and is shaped by, society. It examines how schools socialize individuals, influence social mobility, reproduce or challenge social stratification, and transmit cultural capital. Core functions include manifest functions (cultural transmission, secondary socialization, economic and workforce sorting, social cohesion) and latent functions (peer networking, custodial supervision, creation of generation gaps). Major sociological perspectives include Functionalism (Durkheim, Parsons — education maintains social stability and consensus), Conflict Theory (Marx, Bourdieu — education reproduces class inequality and preserves elite privilege through cultural capital and hidden curricula), and Symbolic Interactionism (Mead, Cooley — face-to-face classroom interactions, labeling, and self-fulfilling prophecies). Crucially, educational equity focuses on distributing resources based on learner need to overcome historical and socio-economic disparities, rather than merely treating unequal starting points with identical resources (equality).',
    highYieldAlert:
      'STS High-Yield: Distinguish between manifest functions (intended: cultural transmission, socialization, workforce sorting) and latent functions (unintended: peer networks, childcare, generation gap); match theories: Functionalism (Durkheim/Parsons: consensus & meritocracy) vs Conflict Theory (Marx/Bourdieu: inequality reproduction & cultural capital) vs Symbolic Interactionism (Mead/Cooley: labeling & self-fulfilling prophecy); and remember Equity = needs-based resources vs Equality = identical resources.',
    concepts: [
      {
        conceptTitle: 'Core Functions of Education in Society',
        explanation: 'Manifest (explicit) vs Latent (implicit/unintended) societal outcomes.',
        keyTerms: [
          {
            term: 'Manifest Functions',
            definition:
              'Explicit, intended goals: Cultural Transmission (passing down values/norms), Socialization (learning laws/rules), Social & Economic Sorting (allocating careers by merit), and Social Integration/Cohesion (unifying diverse groups).',
          },
          {
            term: 'Latent Functions',
            definition:
              'Implicit, unintended outcomes: Peer network formation, youth custodial supervision while guardians work, generation gap creation, and status hierarchy maintenance.',
          },
        ],
      },
      {
        conceptTitle: 'Major Sociological Perspectives',
        explanation: 'The three theoretical paradigms that explain the social role of schools.',
        keyTerms: [
          {
            term: 'Functionalism (Durkheim, Parsons)',
            definition:
              'Views society as an interdependent system where education maintains stability, social consensus, and meritocratic occupational allocation.',
          },
          {
            term: 'Conflict Theory (Marx, Bourdieu)',
            definition:
              'Views education as reproducing social inequality, class stratification, and elite privilege through cultural capital and unequal institutional resources.',
          },
          {
            term: 'Symbolic Interactionism (Mead, Cooley)',
            definition:
              'Focuses on micro-level classroom interactions, teacher expectations, student labeling, and self-fulfilling prophecies.',
          },
        ],
      },
      {
        conceptTitle: 'Key Sociological Mechanisms',
        explanation: 'Structures that mediate school outcomes.',
        keyTerms: [
          {
            term: 'Hidden Curriculum',
            definition:
              'Implicit, unwritten norms taught in schools: punctuality, deference to authority, competition, and adherence to bureaucratic routines.',
          },
          {
            term: 'Cultural Capital (Bourdieu)',
            definition:
              'Non-financial assets (speech styles, etiquette, cultural background, family networks) passed down by higher-status families that confer school advantages.',
          },
          {
            term: 'Educational Equity vs. Equality',
            definition:
              'Equality gives every student identical resources regardless of starting position; Equity allocates resources according to individual student need to ensure fair, equal outcomes.',
          },
        ],
      },
    ],
    frequentExamQuestions: [
      {
        question: 'Explain the difference between manifest and latent functions of education with two examples of each.',
        answer:
          'Manifest functions are explicit and intentional — such as cultural transmission (passing down national history and values) and economic sorting (preparing students for careers). Latent functions are secondary and unintended — such as peer network formation and providing daytime childcare for working parents.',
      },
      {
        question: 'Compare Functionalism and Conflict Theory regarding the role of schooling in society.',
        answer:
          'Functionalism (Durkheim, Parsons) asserts that schooling creates harmony, social integration, and meritocracy. Conflict Theory (Marx, Bourdieu) argues that schooling preserves power differentials, legitimizes socio-economic inequality, and favors students possessing dominant cultural capital.',
      },
      {
        question: 'What is the "hidden curriculum" and what implicit behaviors does it reinforce?',
        answer:
          'The hidden curriculum consists of unwritten institutional lessons transmitted through classroom norms, such as punctuality, compliance with authority, competition for rank, and respect for social hierarchy.',
      },
      {
        question: 'Distinguish between educational equality and educational equity with a practical example.',
        answer:
          'Equality provides identical resources (e.g. giving every student the same textbook). Equity provides resources based on specific learner needs (e.g. providing assistive technology or remedial tutoring to disadvantaged students so all can succeed).',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-soc-1',
        question: 'Which of the following is considered a latent function of schooling?',
        options: [
          'Cultural transmission',
          'Peer network formation and childcare',
          'Vocational workforce sorting',
          'Civic knowledge instruction',
        ],
        correctIndex: 1,
        explanation:
          'Peer network formation and custodial childcare are latent (unintended/secondary) functions of schools.',
      },
      {
        id: 'quiz-soc-2',
        question: 'Which perspective argues that schools reproduce social class inequality and reward cultural capital?',
        options: ['Functionalism', 'Conflict Theory', 'Symbolic Interactionism', 'Behaviorism'],
        correctIndex: 1,
        explanation:
          'Conflict Theory (Karl Marx, Pierre Bourdieu) argues that schooling reproduces class inequality and advantages those with dominant cultural capital.',
      },
      {
        id: 'quiz-soc-3',
        question: 'What does "educational equity" mean compared to "equality"?',
        options: [
          'Giving every single student the exact same materials',
          'Distributing resources according to individual student need for fair outcomes',
          'Lowering standards for all learners',
          'Privatizing underperforming schools',
        ],
        correctIndex: 1,
        explanation:
          'Equity means differentiating resource distribution based on learner need so that all students achieve equal opportunity and success.',
      },
    ],
    examDistractorTraps: [
      'Trap: Conflating Equality and Equity — equality gives identical inputs, equity gives differentiated inputs based on need for fair outcomes.',
      'Trap: Labeling cultural transmission as a latent function — it is an explicit, intentional manifest function.',
      'Trap: Attributing teacher-expectancy self-fulfilling prophecies to Conflict Theory; that micro-level phenomenon is analyzed by Symbolic Interactionism.',
    ],
  },
  {
    id: 'foundations-psychological',
    topicNumber: '4',
    title: 'Psychological Foundations of Education',
    readTime: '9 min read',
    htmlNotesPath: 'notes/foundations-of-education/psychological-foundations-of-education.html',
    summary:
      'Educational psychology provides the scientific understanding of how learning takes place, how human beings develop across cognitive, physical, and socio-emotional domains, and how motivation influences achievement. The four major learning theories each provide indispensable pedagogical tools: Behaviorism (Pavlov, Watson, Skinner) focuses on observable behavior shaped by stimuli, conditioning, drills, and reinforcement; Cognitivism (Piaget, Bruner, Gagné) examines internal information processing, sensory/working/long-term memory structures, chunking, and schemas; Constructivism (Piaget, Vygotsky) posits that learners actively construct knowledge through experiential inquiry, scaffolding, and interaction within the Zone of Proximal Development (ZPD); and Humanism (Maslow, Rogers) addresses holistic personal growth, affective needs, emotional safety, and self-actualization. Developmental stages (Piaget\'s preoperational, concrete operational, and formal operational) guide age-appropriate curriculum design, while Gardner\'s Multiple Intelligences and motivation theory (intrinsic vs extrinsic) drive differentiated, inclusive instruction.',
    highYieldAlert:
      'STS High-Yield: Match theories to thinkers: Behaviorism (Skinner/Pavlov/Watson — conditioning/reinforcement), Cognitivism (Piaget/Bruner/Gagné — memory models/schemas), Constructivism (Vygotsky ZPD/scaffolding; Piaget active construction), Humanism (Maslow hierarchy/Rogers); know Piaget stages: Preoperational (2-7 yrs), Concrete (7-11 yrs), Formal (12+ yrs); and recognize that Maslow deficiency needs must be met before higher learning occurs.',
    concepts: [
      {
        conceptTitle: 'Major Learning Theories in Education',
        explanation: 'Four psychological paradigms explaining how learning happens.',
        keyTerms: [
          {
            term: 'Behaviorism (Pavlov, Watson, Skinner)',
            definition:
              'Learning is an observable change in behavior resulting from external stimuli, classical/operant conditioning, practice drills, and immediate positive reinforcement.',
          },
          {
            term: 'Cognitivism (Piaget, Bruner, Gagné)',
            definition:
              'Learning is an internal mental process of encoding, organizing, storing, and retrieving information using sensory, working, and long-term memory schemas.',
          },
          {
            term: 'Constructivism (Piaget, Vygotsky)',
            definition:
              'Learners actively construct their own knowledge through experience, inquiry, and social collaboration within the Zone of Proximal Development (ZPD) with scaffolding.',
          },
          {
            term: 'Humanism (Maslow, Rogers)',
            definition:
              'Learning is a holistic, person-centered process driven by emotional security, self-esteem, unconditional positive regard, and self-actualization.',
          },
        ],
      },
      {
        conceptTitle: 'Developmental Stages & Cognitive Growth',
        explanation: 'Piaget’s stages of cognitive development.',
        keyTerms: [
          {
            term: 'Preoperational Stage (Ages 2–7)',
            definition:
              'Symbolic thinking, rapid language acquisition, egocentric worldview; requires sensory manipulatives and play-based activities.',
          },
          {
            term: 'Concrete Operational Stage (Ages 7–11)',
            definition:
              'Logical thinking about tangible, concrete objects; mastery of conservation, seriation, and classification using hands-on experiments.',
          },
          {
            term: 'Formal Operational Stage (Ages 12+)',
            definition:
              'Abstract logic, hypothetical-deductive reasoning, metacognition, and systematic problem solving.',
          },
        ],
      },
      {
        conceptTitle: 'Motivation & Individual Differences',
        explanation: 'Factors driving student engagement and diversity.',
        keyTerms: [
          {
            term: 'Intrinsic vs Extrinsic Motivation',
            definition:
              'Intrinsic motivation stems from internal curiosity and joy of mastery; extrinsic motivation is driven by grades, praise, tokens, or avoiding sanctions.',
          },
          {
            term: 'Multiple Intelligences (Howard Gardner)',
            definition:
              'Eight distinct modalities of intelligence (Linguistic, Logical-Mathematical, Spatial, Musical, Bodily-Kinesthetic, Interpersonal, Intrapersonal, Naturalistic) supporting differentiated instruction.',
          },
        ],
      },
    ],
    frequentExamQuestions: [
      {
        question: 'Compare Behaviorism and Constructivism in their view of instruction and classroom roles.',
        answer:
          'Behaviorism treats the learner as a responder to stimuli, using direct instruction, reinforcement, and repetitive drill. Constructivism views the learner as an active investigator, using inquiry-based tasks, peer collaboration, and scaffolded problem-solving.',
      },
      {
        question: 'Explain Vygotsky’s Zone of Proximal Development (ZPD) and how scaffolding operates within it.',
        answer:
          'The ZPD is the distance between what a child can do independently and what they can achieve with guidance. Scaffolding consists of temporary teacher or peer prompts, cues, and models that are systematically faded as learner mastery increases.',
      },
      {
        question: 'What instructional shift must occur between Piaget’s Concrete and Formal Operational stages?',
        answer:
          'Concrete operational students need physical manipulatives, visual aids, and concrete demonstrations. Formal operational students can manipulate hypothetical propositions, symbolic formulas, and abstract philosophical questions.',
      },
      {
        question: 'How does Maslow’s Hierarchy of Needs influence classroom readiness to learn?',
        answer:
          'Lower deficiency needs (physiological safety, nutrition, feeling emotionally welcome) take neurological precedence. If a student is hungry, fearful, or humiliated, cognitive processing is impaired and higher-order learning cannot occur.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-psy-1',
        question: 'According to Vygotsky, the gap between what a learner can do independently and with guidance is called:',
        options: ['Schema equilibrium', 'Zone of Proximal Development (ZPD)', 'Operant conditioning', 'Information processing window'],
        correctIndex: 1,
        explanation:
          'The Zone of Proximal Development (ZPD) is the range between independent capability and assisted achievement.',
      },
      {
        id: 'quiz-psy-2',
        question: 'Which learning theory emphasizes internal memory structures, chunking, and schemas?',
        options: ['Behaviorism', 'Cognitivism', 'Humanism', 'Existentialism'],
        correctIndex: 1,
        explanation:
          'Cognitivism focuses on internal mental operations: information processing, sensory/working/long-term memory, and cognitive schemas.',
      },
      {
        id: 'quiz-psy-3',
        question: 'Who proposed the theory of Multiple Intelligences?',
        options: ['B.F. Skinner', 'Howard Gardner', 'Jean Piaget', 'Abraham Maslow'],
        correctIndex: 1,
        explanation:
          'Howard Gardner developed the theory of Multiple Intelligences, identifying at least 8 distinct modalities.',
      },
    ],
    examDistractorTraps: [
      'Trap: Crediting Piaget with the Zone of Proximal Development — ZPD and scaffolding belong to Lev Vygotsky’s social constructivism.',
      'Trap: Assuming extrinsic rewards always improve learning — over-reliance on extrinsic rewards can undermine intrinsic curiosity (overjustification effect).',
      'Trap: Believing Formal Operational thinking begins in early childhood — Piaget identified formal abstract reasoning starting around age 12.',
    ],
  },
  {
    id: 'foundations-historical',
    topicNumber: '5',
    title: 'Historical Foundations of Education',
    readTime: '9 min read',
    htmlNotesPath: 'notes/foundations-of-education/historical-foundations-of-education.html',
    summary:
      'The historical foundation traces the evolution of educational systems, philosophical currents, institutions, and policies over time. It reveals that contemporary school practices — such as age-grading, compulsory attendance, standardized testing, and liberal arts curricula — are not accidental, but the outcomes of historical struggles and social transformations. Ancient Civilizations (India, China, Egypt, Mesopotamia) focused on religious preservation, scribal record-keeping, and moral ethics. Classical Antiquity (Athens and Rome) birthed liberal education for democratic citizenship, the Socratic method of dialogue, rhetoric, and civic duty, contrasted with Spartan military training. The Medieval Era and Islamic Golden Age synthesized classical scholarship with religious ethics, establishing early universities (Bologna, Paris, Oxford) and renowned research academies/libraries (House of Wisdom in Baghdad, Ibn Sina, Al-Farabi, Ibn Khaldun). The Renaissance, Reformation, and Scientific Revolution brought humanism, universal vernacular literacy (Martin Luther), and empirical science (Bacon, Descartes). The Industrial Era established the Prussian factory model of compulsory age-graded schooling and Horace Mann\'s Common School Movement. Three overarching historical lessons emerge: the evolution of educational purpose from religious preservation to global innovation; the shift in access from elite privilege to universal human right; and the pedagogical shift from rote memorization and corporal punishment to student-centered, psychologically informed learning.',
    highYieldAlert:
      'STS High-Yield: Know the key historical milestones: Ancient era (moral order/religious texts/scribes); Classical Athens (Liberal Education for citizenship & Socratic method); Medieval (Trivium & Quadrivium liberal arts; Islamic Golden Age House of Wisdom, Ibn Sina, Ibn Khaldun); Reformation (Martin Luther: universal vernacular literacy); Industrial Era (Prussian age-graded compulsory schooling; Horace Mann: Common School Movement); and the 3 Core Lessons (Purpose, Access, Pedagogy).',
    concepts: [
      {
        conceptTitle: 'Ancient & Classical Eras in Education',
        explanation: 'The roots of formal instruction, citizenship, and scholarship.',
        keyTerms: [
          {
            term: 'Ancient Civilizations',
            definition:
              'India (Gurukul oral Vedic traditions and character formation), China (Confucian civil service exams and meritocracy), Egypt & Mesopotamia (scribal administration, mathematics, astronomy).',
          },
          {
            term: 'Classical Antiquity (Greece & Rome)',
            definition:
              'Athens: Liberal education educating the whole person (mind, body, spirit) for democratic citizenship, Socratic dialogue; Sparta: military Agoge; Rome: law, administration, rhetoric, and Quintilian’s teacher training.',
          },
        ],
      },
      {
        conceptTitle: 'Medieval & Early Modern Eras',
        explanation: 'Institutional universities and scientific revolution.',
        keyTerms: [
          {
            term: 'Medieval & Islamic Golden Age',
            definition:
              'Western Europe: Trivium (Grammar, Rhetoric, Logic) + Quadrivium (Arithmetic, Geometry, Music, Astronomy), early universities (Bologna, Oxford); Islamic Golden Age: House of Wisdom, madrasahs, translating Greek science, Ibn Sina, Ibn Khaldun.',
          },
          {
            term: 'Renaissance, Reformation & Scientific Revolution',
            definition:
              'Humanist focus on classical arts; Martin Luther’s call for universal literacy so common citizens could read vernacular scriptures; Bacon and Descartes introducing empiricism and the scientific method.',
          },
        ],
      },
      {
        conceptTitle: 'Industrial Era & Modern Schooling',
        explanation: 'The creation of public, universal, standardized mass education.',
        keyTerms: [
          {
            term: 'Prussian Factory Model of Schooling',
            definition:
              'Introduced compulsory attendance, standardized age-graded classrooms, uniform curricula, and bells to produce a disciplined, literate industrial population.',
          },
          {
            term: 'Horace Mann & Common School Movement',
            definition:
              '19th-century American reform establishing taxpayer-funded, universal, non-sectarian public schools open to all social classes.',
          },
          {
            term: 'Three Core Lessons of Educational History',
            definition:
              '1. Purpose evolved from religious dogma to holistic self-actualization; 2. Access shifted from elite privilege to a universal human right; 3. Pedagogy shifted from punitive rote drill to student-centered inquiry.',
          },
        ],
      },
    ],
    frequentExamQuestions: [
      {
        question: 'Explain how Athenian liberal education differed from the Spartan educational model.',
        answer:
          'Athens focused on cultivating the whole person (intellectual inquiry, physical prowess, aesthetic appreciation, and civic participation) for democratic governance. Sparta focused on the Agoge — a state-run, rigorous military training regimen enforcing strict discipline and martial obedience.',
      },
      {
        question: 'What were the Trivium and Quadrivium in medieval education?',
        answer:
          'The Trivium consisted of the language arts: Grammar, Rhetoric, and Logic. The Quadrivium comprised the mathematical arts: Arithmetic, Geometry, Music, and Astronomy. Together they made up the seven liberal arts.',
      },
      {
        question: 'Why was Martin Luther’s advocacy for vernacular literacy a watershed moment for public education?',
        answer:
          'By demanding that every Christian be able to read scriptures in their own native language, Martin Luther laid the philosophical and moral justification for state-supported, universal public schooling for boys and girls alike.',
      },
      {
        question: 'Summarize the three core lessons learned from educational history.',
        answer:
          '1. Evolution of Purpose: Education transitioned from religious preservation and elite leadership toward workforce efficiency, individual empowerment, and global problem solving. 2. Access: Schooling transformed from an exclusive privilege into a universal human right. 3. Pedagogy: Methods evolved from harsh rote drill and corporal punishment into empathetic, student-centered, scientifically validated instruction.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-hist-1',
        question: 'The concept of "Liberal Education" for democratic citizenship originated in:',
        options: ['Ancient Sparta', 'Classical Athens', 'Ancient Egypt', 'Prussia'],
        correctIndex: 1,
        explanation:
          'Athens established the ideal of Liberal Education — educating the whole person for democratic citizenship.',
      },
      {
        id: 'quiz-hist-2',
        question: 'Which curriculum formed the core of medieval higher education?',
        options: [
          'STEM and Vocational studies',
          'The Trivium and Quadrivium',
          'Only military tactics',
          'Exclusively theological scripture without logic',
        ],
        correctIndex: 1,
        explanation:
          'The Trivium (Grammar, Rhetoric, Logic) and Quadrivium (Arithmetic, Geometry, Music, Astronomy) formed the core curriculum.',
      },
      {
        id: 'quiz-hist-3',
        question: 'Who championed the Common School Movement for universal, taxpayer-funded education?',
        options: ['John Dewey', 'Horace Mann', 'Friedrich Froebel', 'Jean-Jacques Rousseau'],
        correctIndex: 1,
        explanation:
          'Horace Mann was the pioneer of the Common School Movement in the 19th century.',
      },
    ],
    examDistractorTraps: [
      'Trap: Conflating Athens with Sparta — Athens emphasized liberal education of the whole person, while Sparta focused strictly on military drill (Agoge).',
      'Trap: Believing the Prussian model was invented for creative inquiry — it was designed for mass, factory-like discipline and industrial workforce efficiency.',
      'Trap: Thinking the Trivium contained arithmetic — Arithmetic, Geometry, Music, and Astronomy belong to the Quadrivium.',
    ],
  },
];

export const CHILD_DEVELOPMENT_TOPICS: LicenseTopicNote[] = [
  {
    id: 'child-dev-conceptions-implications',
    topicNumber: '1',
    title: 'Conceptions of Child Development & Their Implications for Teaching and Learning',
    readTime: '10 min read',
    htmlNotesPath:
      'notes/child-development/conceptions-of-child-development-and-their-implications-for-teaching-and-learning.html',
    summary:
      'Child development is the continuous process of physical, cognitive, emotional, social, and language changes from birth through childhood and adolescence, shaped by both heredity (nature) and environment (nurture). Seven major conceptions frame classroom practice: Continuous Process, Sequential Process, Individual Differences, Holistic Process, Nature and Nurture, Active Learning, and Developmental Readiness. Core theorists (Piaget, Vygotsky, Erikson, Kohlberg, Bowlby, Skinner, Bandura) inform nine key implications across readiness, differentiation, active learning, social interaction, motivation, emotional security, holistic growth, continuous assessment, and learning environments.',
    highYieldAlert:
      'STS High-Yield: Child development is both continuous and sequential, holistic across physical-cognitive-social-emotional domains, and shaped jointly by nature (genetics) and nurture (environment). Match Vygotsky to ZPD & Scaffolding, Bowlby to Attachment Theory, Bandura to Social Learning, and Skinner to Operant Conditioning.',
    concepts: [
      {
        conceptTitle: 'Seven Major Conceptions of Child Development',
        explanation:
          'Foundational principles describing how human growth unfolds across childhood and adolescence.',
        keyTerms: [
          {
            term: 'Continuous & Sequential Process',
            definition:
              'Development takes place gradually over time while passing through developmental stages in an orderly sequence.',
          },
          {
            term: 'Individual Differences & Holistic Process',
            definition:
              'Every child develops at a unique rate, and physical, mental, emotional, and social changes are deeply interconnected.',
          },
          {
            term: 'Nature & Nurture',
            definition:
              'Development is jointly shaped by hereditary genetic endowments (nature) and environmental experiences (nurture).',
          },
          {
            term: 'Active Learning & Developmental Readiness',
            definition:
              'Children construct understanding through exploration, interaction, and experience, learning skills most effectively when developmentally ready.',
          },
        ],
      },
      {
        conceptTitle: 'Major Psychologists & Core Contributions',
        explanation:
          'How foundational developmental and learning theorists inform classroom instruction.',
        keyTerms: [
          {
            term: 'Jean Piaget & Lev Vygotsky',
            definition:
              'Piaget formulated Cognitive Development Theory across stages; Vygotsky formulated Sociocultural Theory and the Zone of Proximal Development (ZPD).',
          },
          {
            term: 'Erik Erikson, Lawrence Kohlberg & John Bowlby',
            definition:
              'Erikson mapped Psychosocial Development stages; Kohlberg explained Moral Development; Bowlby established Attachment Theory.',
          },
          {
            term: 'B. F. Skinner & Albert Bandura',
            definition:
              'Skinner demonstrated Operant Conditioning through reinforcement; Bandura established Social Learning Theory via observation and imitation.',
          },
        ],
      },
      {
        conceptTitle: 'Classroom Implications for Teaching and Learning',
        explanation:
          'Translating developmental principles into inclusive daily pedagogy.',
        bulletPoints: [
          'Developmental Readiness: Teach according to students’ age and developmental level.',
          'Individual Differences: Adapt instruction to diverse abilities and learning speeds.',
          'Active Learning & Social Interaction: Combine hands-on experiments, projects, group work, and peer learning.',
          'Emotional Development & Motivation: Create a safe, respectful classroom where mistakes are normalized and constructive feedback encourages effort.',
          'Assessment & Environment: Use continuous assessment to spot difficulties early and provide rich exploratory learning materials.',
        ],
      },
    ],
    comparisonTable: {
      title: 'Conceptions of Child Development & Classroom Implications',
      headers: ['Conception / Principle', 'Core Meaning', 'Implication for Teachers'],
      rows: [
        ['Developmental Readiness', 'Skills are learned best when the child is ready', 'Match content and difficulty to age and developmental level'],
        ['Individual Differences', 'Every child develops at a distinct pace', 'Differentiate tasks for varied abilities and speeds'],
        ['Active Learning', 'Children learn through exploration and experience', 'Use activities, experiments, projects, and problem-solving'],
        ['Holistic Process', 'Physical, cognitive, social, and emotional domains connect', 'Support emotional safety, social interaction, and intellectual growth together'],
        ['Social Interaction (Vygotsky)', 'Guidance and language bridge the ZPD', 'Provide temporary scaffolding and structured peer learning'],
      ],
    },
    classroomApplication:
      'When a Grade 2 class shows fast finishers getting bored while anxious learners fear mistakes during textbook lectures, the teacher introduces tiered activities (Individual Differences), hands-on learning corners (Active Learning & Environment), and mistake-friendly praise (Emotional Development).',
    mnemonicAid:
      'Remember the 7 Conceptions: "C-S-I-H-N-A-D" -> Continuous, Sequential, Individual differences, Holistic, Nature & nurture, Active learning, Developmental readiness.',
    frequentExamQuestions: [
      {
        question: 'List and explain five major conceptions of child development.',
        answer:
          'Continuous Process (gradual growth over time), Sequential Process (orderly stage progression), Individual Differences (unique pace for every child), Holistic Process (interconnected physical, cognitive, emotional, and social domains), and Nature and Nurture (joint influence of genetics and environment).',
      },
      {
        question: 'Explain the Zone of Proximal Development (ZPD) and scaffolding, and their classroom implications.',
        answer:
          'ZPD (Vygotsky) is the gap between independent performance and supported performance. Scaffolding is temporary support (modeling, hints, prompts) faded as competence grows, implying guided practice, peer learning, and gradual release of responsibility.',
      },
      {
        question: 'Match Bowlby, Bandura, and Skinner to their theoretical contributions.',
        answer:
          'John Bowlby — Attachment Theory; Albert Bandura — Social Learning Theory (observational learning and imitation); B. F. Skinner — Operant Conditioning (reinforcement).',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-ci-1',
        question:
          'The idea that physical, mental, emotional, and social development are interconnected refers to which conception?',
        options: ['Sequential Process', 'Holistic Process', 'Operant Conditioning', 'Centration'],
        correctIndex: 1,
        explanation:
          'The Holistic Process conception emphasizes that physical, cognitive, emotional, and social domains develop together and influence one another.',
      },
      {
        id: 'quiz-ci-2',
        question: 'Which theorist formulated Attachment Theory in child development?',
        options: ['John Bowlby', 'B. F. Skinner', 'Lawrence Kohlberg', 'Jerome Bruner'],
        correctIndex: 0,
        explanation:
          'John Bowlby established Attachment Theory, highlighting early caregiver-child emotional bonds.',
      },
      {
        id: 'quiz-ci-3',
        question: 'What does the conception of "Nature and Nurture" state?',
        options: [
          'Only genetics determine development',
          'Only classroom environment matters',
          'Development is shaped by both genetic factors and environmental experiences',
          'All children develop at the exact same speed',
        ],
        correctIndex: 2,
        explanation:
          'Nature and Nurture recognizes that biological heredity and environmental experiences interact continuously to shape development.',
      },
    ],
    examDistractorTraps: [
      'Trap: Treating child development as purely cognitive or purely physical — development is holistic across physical, cognitive, emotional, social, and language domains.',
      'Trap: Defining scaffolding as permanent help — scaffolding is temporary support within the ZPD that fades as independence grows.',
    ],
  },
  {
    id: 'child-dev-major-theories',
    topicNumber: '2',
    title: 'Major Theories & Domains of Child Development',
    readTime: '10 min read',
    htmlNotesPath: 'notes/child-development/major-theories-and-domains-of-child-development.html',
    summary:
      'Child development spans five interdependent domains: physical, cognitive, social-emotional, language, and moral. Key developmental theories explain learner growth: Jean Piaget (Cognitive Constructivism, four stages, schemas, assimilation, accommodation, equilibration), Lev Vygotsky (Socio-Cultural Theory, ZPD, MKO, Scaffolding, private speech), Erik Erikson (Psychosocial Stages, eight crises), Lawrence Kohlberg (Moral Development, three levels), and Urie Bronfenbrenner (Bioecological Systems: micro, meso, exo, macro, chrono). Effective pedagogy aligns instructional tasks with developmental readiness.',
    highYieldAlert:
      'STS High-Yield: Vygotsky’s Zone of Proximal Development (ZPD) and scaffolding are among the most frequently tested concepts in STEDA pedagogy exams. Differentiate clearly: Piaget emphasizes internal stage readiness and cognitive equilibration, whereas Vygotsky emphasizes cultural tools, social mediation, and the More Knowledgeable Other (MKO).',
    concepts: [
      {
        conceptTitle: 'Five Interdependent Developmental Domains',
        explanation: 'Holistic child development requires nurturing all five domains in unison.',
        keyTerms: [
          {
            term: 'Physical Domain',
            definition: 'Gross motor (running, jumping) and fine motor (writing, cutting) coordination, physical growth, and brain development.',
          },
          {
            term: 'Cognitive Domain',
            definition: 'Intellectual processes: memory, reasoning, problem solving, concept formation, and metacognition.',
          },
          {
            term: 'Social-Emotional Domain',
            definition: 'Self-awareness, emotional self-regulation, empathy, relationship building, and interpersonal conflict resolution.',
          },
          {
            term: 'Language & Moral Domains',
            definition: 'Receptive and expressive communication paired with internalizing ethical principles, justice, and social responsibility.',
          },
        ],
      },
      {
        conceptTitle: 'Piaget vs. Vygotsky: Constructivist Paradigms',
        explanation: 'The fundamental theoretical contrast between cognitive constructivism and socio-cultural constructivism.',
        keyTerms: [
          {
            term: 'Piaget’s Equilibration',
            definition: 'Drive to resolve cognitive disequilibrium between current schemas and novel environmental stimuli via assimilation and accommodation.',
          },
          {
            term: 'Vygotsky’s ZPD & Scaffolding',
            definition: 'The fertile learning zone between unassisted mastery and guided potential; temporary support provided by an MKO and progressively withdrawn.',
          },
        ],
      },
      {
        conceptTitle: 'Erikson & Kohlberg: Psychosocial & Moral Trajectories',
        explanation: 'Personality and moral maturation throughout the school-age years.',
        keyTerms: [
          {
            term: 'Industry vs. Inferiority',
            definition: 'Erikson’s elementary stage (ages 6-12) where school children must experience competence and recognition for effort to avoid inferiority.',
          },
          {
            term: 'Conventional Morality',
            definition: 'Kohlberg’s middle childhood/adolescence level centered on social approval ("good boy/nice girl") and maintaining social order/laws.',
          },
        ],
      },
    ],
    frequentExamQuestions: [
      {
        question: 'Differentiate between assimilation and accommodation in Piaget’s cognitive theory.',
        answer:
          'Assimilation fits new experiences into existing cognitive schemas, whereas accommodation modifies existing schemas or forms new ones when new evidence does not fit.',
      },
      {
        question: 'Explain Vygotsky’s Zone of Proximal Development (ZPD) and More Knowledgeable Other (MKO).',
        answer:
          'The ZPD is the distance between independent performance and assisted potential; an MKO (teacher or capable peer) provides temporary scaffolding within that zone.',
      },
      {
        question: 'Why is Erikson’s stage of Industry vs. Inferiority vital for primary school teachers?',
        answer:
          'Between ages 6 and 12, praising effort and enabling mastery builds industry and competence, whereas chronic ridicule or unaddressed failure produces feelings of inferiority.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-cd-1',
        question: 'According to Lev Vygotsky, the distance between what a child can achieve alone and with teacher guidance is called:',
        options: ['Cognitive Schema', 'Zone of Proximal Development (ZPD)', 'Equilibration Vector', 'Autonomous Stage'],
        correctIndex: 1,
        explanation: 'Vygotsky defined the Zone of Proximal Development (ZPD) as the difference between actual developmental level and potential level under adult guidance.',
      },
      {
        id: 'quiz-cd-2',
        question: 'When a child modifies an existing schema to incorporate new conflicting information, Piaget termed this process:',
        options: ['Assimilation', 'Centration', 'Accommodation', 'Object Permanence'],
        correctIndex: 2,
        explanation: 'Accommodation occurs when existing mental structures (schemas) are altered or new schemas created to adapt to new environmental information.',
      },
      {
        id: 'quiz-cd-3',
        question: 'Erik Erikson’s psychosocial stage corresponding to the elementary school years (ages 6 to 12) is:',
        options: ['Trust vs. Mistrust', 'Autonomy vs. Shame', 'Industry vs. Inferiority', 'Identity vs. Role Confusion'],
        correctIndex: 2,
        explanation: 'Elementary school-age children navigate Industry vs. Inferiority, striving to develop academic competence, diligence, and confidence.',
      },
    ],
    examDistractorTraps: [
      'Trap: Confusing Assimilation and Accommodation — Assimilation fits new info into existing schemas without altering them; Accommodation modifies the schema.',
      'Trap: Assuming Vygotsky believed children learn only from teachers — an MKO (More Knowledgeable Other) can be a capable peer, computer software, or coach.',
    ],
  },
  {
    id: 'child-dev-developmental-stages',
    topicNumber: '3',
    title: 'Characteristics of Various Developmental Stages According to Various Theorists',
    readTime: '12 min read',
    htmlNotesPath: 'notes/child-development/characteristics-of-various-developmental-stages-according-to-various-theorists.html',
    summary:
      'Human development unfolds through sequential stages: Infancy (0-2y, sensorimotor, object permanence, trust vs. mistrust), Early Childhood (2-6y, preoperational, egocentrism, animism, centration, initiative vs. guilt), Middle Childhood (6-12y, concrete operational, conservation, reversibility, seriation, industry vs. inferiority), and Adolescence (12-18y, formal operational, hypothetical reasoning, identity vs. role confusion, imaginary audience, personal fable). Developmental principles include the Cephalocaudal trend (head to toe) and Proximodistal trend (center outward).',
    highYieldAlert:
      'STS High-Yield: Conservation (understanding that quantity remains identical despite shape transformations) emerges in Piaget’s Concrete Operational stage (ages 7-11), NEVER in the Preoperational stage. Preoperational children are constrained by centration and irreversibility.',
    concepts: [
      {
        conceptTitle: 'Piaget’s Four Cognitive Stages',
        explanation: 'Sequential, qualitative shifts in children’s mental capacities.',
        keyTerms: [
          {
            term: 'Sensorimotor (0-2y)',
            definition: 'Learning through senses and motor reflexes; hallmark achievement is Object Permanence (knowing things exist when hidden).',
          },
          {
            term: 'Preoperational (2-7y)',
            definition: 'Symbolic play and language explosion; limited by Egocentrism (cannot adopt another’s perspective) and Centration.',
          },
          {
            term: 'Concrete Operational (7-11y)',
            definition: 'Logical reasoning applied to tangible objects; masters Conservation, Reversibility, Classification, and Seriation.',
          },
          {
            term: 'Formal Operational (11y+)',
            definition: 'Abstract, hypothetical-deductive reasoning, scientific testing, and propositional logic.',
          },
        ],
      },
      {
        conceptTitle: 'Adolescent Egocentrism & Developmental Direction',
        explanation: 'Cognitive phenomena specific to puberty and teenage identity formation.',
        keyTerms: [
          {
            term: 'Imaginary Audience',
            definition: 'David Elkind’s concept that adolescents believe everyone around them is hyper-focused on their appearance and behavior.',
          },
          {
            term: 'Personal Fable',
            definition: 'An adolescent’s belief in their utter uniqueness and invulnerability ("no one understands me", "harm won’t touch me").',
          },
          {
            term: 'Cephalocaudal & Proximodistal',
            definition: 'Physical growth patterns: Cephalocaudal moves from head downwards; Proximodistal moves from core torso outwards to fingertips.',
          },
        ],
      },
    ],
    frequentExamQuestions: [
      {
        question: 'Contrast Preoperational and Concrete Operational thought on a conservation of liquid task.',
        answer:
          'A Preoperational child centers on liquid height alone and judges the taller glass has more; a Concrete Operational child decenters, recognizes reversibility, and knows volume stays equal.',
      },
      {
        question: 'Distinguish between Cephalocaudal and Proximodistal growth patterns.',
        answer:
          'Cephalocaudal development proceeds from head to toe (head control before walking), while Proximodistal development proceeds from the central trunk outward to hands and fingers.',
      },
      {
        question: 'What are David Elkind’s "Imaginary Audience" and "Personal Fable" in adolescence?',
        answer:
          'Imaginary Audience is feeling constantly watched by peers; Personal Fable is believing one’s experiences are uniquely untouchable or invulnerable.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-ds-1',
        question: 'A child who understands that pouring water into a narrower glass does not increase the amount has mastered:',
        options: ['Object permanence', 'Conservation', 'Animism', 'Centration'],
        correctIndex: 1,
        explanation: 'Conservation is the cognitive ability to recognize that quantity, volume, or mass remains constant despite perceptual transformations.',
      },
      {
        id: 'quiz-ds-2',
        question: 'According to Piaget, the inability of a preschooler to view a situation from another person’s perspective is called:',
        options: ['Centration', 'Egocentrism', 'Irreversibility', 'Personal fable'],
        correctIndex: 1,
        explanation: 'Preoperational egocentrism refers to the cognitive limitation wherein young children assume everyone sees and thinks exactly as they do.',
      },
      {
        id: 'quiz-ds-3',
        question: 'David Elkind described a teenager’s belief that all classmates are constantly scrutinizing their clothes as the:',
        options: ['Looking-glass self', 'Imaginary audience', 'Personal fable', 'Social contract'],
        correctIndex: 1,
        explanation: 'The imaginary audience is the belief that one is always on stage and center of everyone else’s attention.',
      },
    ],
    examDistractorTraps: [
      'Trap: Thinking Piaget’s "egocentrism" means selfish or arrogant; in cognitive development, it strictly means an inability to mentally take another’s perspective.',
      'Trap: Assuming Cephalocaudal development means core-to-fingers; Cephalocaudal is strictly head-to-toe (Proximodistal is center-to-periphery).',
    ],
  },
  {
    id: 'child-dev-factors-influencing-learning',
    topicNumber: '4',
    title: 'Factors Influencing the Learning Process of a Child',
    readTime: '10 min read',
    htmlNotesPath: 'notes/child-development/factors-influencing-the-learning-process-of-a-child.html',
    summary:
      'Learning is governed by multiple interconnected factor clusters: Psychological (intelligence, self-efficacy, intrinsic vs. extrinsic motivation), Biological & Physical (Arnold Gesell’s maturation theory, nutrition, sleep, sensory faculties), Environmental & School (lighting, noise, resources, classroom climate), Teacher & Pedagogical (feedback, expectations / Pygmalion effect, methods), and Family & Social (SES, language, peer influence). Abraham Maslow’s Hierarchy of Needs establishes that physiological and safety needs must be fulfilled before cognitive and aesthetic learning can occur.',
    highYieldAlert:
      'STS High-Yield: Under Maslow’s Hierarchy of Needs, a child cannot concentrate on cognitive learning (school lessons) if deficiency needs (hunger, illness, lack of safety, emotional trauma) are unaddressed. Maslow explains why school meal programs and positive classroom safety directly boost test scores.',
    concepts: [
      {
        conceptTitle: 'Psychological Factors & Motivation Dynamics',
        explanation: 'Internal drivers that determine engagement, depth of processing, and persistence.',
        keyTerms: [
          {
            term: 'Intrinsic Motivation',
            definition: 'Engaging in learning out of inherent interest, curiosity, and satisfaction; yields higher persistence and conceptual retention.',
          },
          {
            term: 'Extrinsic Motivation',
            definition: 'Engagement driven by external incentives (grades, prizes, social praise, punishment avoidance); effective for initiating behavior.',
          },
          {
            term: 'Self-Efficacy (Bandura)',
            definition: 'A learner’s personal belief in their capability to execute courses of action required to attain designated performances.',
          },
        ],
      },
      {
        conceptTitle: 'Maslow’s Hierarchy & Maturation Theory',
        explanation: 'Biological and developmental preconditions for educational achievement.',
        keyTerms: [
          {
            term: 'Deficiency Needs (Maslow)',
            definition: 'Physiological (food, rest), Safety (physical and psychological security), and Belonging/Love; must be satisfied before growth needs.',
          },
          {
            term: 'Maturation (Arnold Gesell)',
            definition: 'Internally driven biological timetable; pedagogical attempts to force complex skills prior to neurological readiness produce stress and failure.',
          },
          {
            term: 'Pygmalion Effect',
            definition: 'The phenomenon whereby higher teacher expectations lead to measurably improved student performance.',
          },
        ],
      },
    ],
    frequentExamQuestions: [
      {
        question: 'How does Maslow’s Hierarchy of Needs explain attention difficulties in hungry or fearful learners?',
        answer:
          'Lower deficiency needs (food, rest, safety, belonging) take priority over cognitive growth needs; unmet survival or safety needs divert attention away from classroom learning.',
      },
      {
        question: 'Contrast intrinsic and extrinsic motivation in classroom learning.',
        answer:
          'Intrinsic motivation comes from internal curiosity and mastery satisfaction, fostering deep retention; extrinsic motivation relies on external rewards, grades, or avoiding punishment.',
      },
      {
        question: 'Explain Arnold Gesell’s maturation theory and the Pygmalion Effect.',
        answer:
          'Gesell showed biological maturation sets readiness for skills; the Pygmalion Effect shows high, supportive teacher expectations elevate student achievement.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-fl-1',
        question: 'Under Abraham Maslow’s hierarchy of needs, which level must be satisfied before a student can engage in cognitive learning?',
        options: ['Self-actualization', 'Esteem needs', 'Physiological and safety needs', 'Aesthetic appreciation'],
        correctIndex: 2,
        explanation: 'Basic physiological needs (food, hydration, sleep) and safety needs must be met before energy can be directed toward higher cognitive tasks.',
      },
      {
        id: 'quiz-fl-2',
        question: 'The theorist most closely associated with the concept of biological maturation as the prerequisite for learning readiness is:',
        options: ['Arnold Gesell', 'B.F. Skinner', 'Ivan Pavlov', 'John Dewey'],
        correctIndex: 0,
        explanation: 'Arnold Gesell formulated the maturation theory, arguing that biological growth patterns dictate readiness for developmental milestones.',
      },
      {
        id: 'quiz-fl-3',
        question: 'Which is an environmental factor influencing classroom learning?',
        options: ['Student IQ', 'Acoustic noise and classroom ventilation', 'Intrinsic curiosity', 'Working memory span'],
        correctIndex: 1,
        explanation: 'Noise levels, ventilation, lighting, and seating arrangements are external environmental factors affecting attention and learning.',
      },
    ],
    examDistractorTraps: [
      'Trap: Assuming extrinsic rewards always improve learning; excessive tangible rewards for already intrinsically interesting tasks can cause the "overjustification effect".',
      'Trap: Treating learning as solely an intellectual process; emotional safety, nutrition, and home language interact directly with cognitive processing.',
    ],
  },
  {
    id: 'child-dev-individual-differences-special-needs',
    topicNumber: '5',
    title: 'Individual Differences Between Students & Children with Special Needs',
    readTime: '10 min read',
    htmlNotesPath: 'notes/child-development/individual-differences-between-students-and-children-with-special-needs.html',
    summary:
      'Individual differences encompass natural variations among all students in intelligence, learning style, personality, and pace. Special Educational Needs (SEN) refer to documented sensory, cognitive, or physical conditions (Visual/Hearing impairment, Physical disability, Intellectual disability, Dyslexia, ADHD, Autism Spectrum, Gifted/Talented) requiring specialized support. Teachers employ Carol Ann Tomlinson’s Differentiated Instruction (modifying Content, Process, Product, Environment) and Universal Design for Learning (UDL: Representation, Action/Expression, Engagement). The guiding principle is Equity (giving each child what they need to succeed) rather than mere uniform Equality.',
    highYieldAlert:
      'STS High-Yield: Distinguish Equality from Equity. Equality gives every student identical inputs (which maintains disadvantage for learners with disabilities); Equity tailors accommodations, assistive devices, and pacing so every learner achieves genuine equal opportunity.',
    concepts: [
      {
        conceptTitle: 'Differentiated Instruction (Carol Ann Tomlinson)',
        explanation: 'Systematic pedagogical approach to responsive teaching.',
        keyTerms: [
          {
            term: 'Differentiating Content',
            definition: 'Varying how students access information (e.g., leveled readers, audiobooks, visual charts, bilingual vocabulary banks).',
          },
          {
            term: 'Differentiating Process',
            definition: 'Varying sense-making activities (e.g., tiered tasks, graphic organizers, learning centers, flexible grouping).',
          },
          {
            term: 'Differentiating Product',
            definition: 'Offering varied assessment formats (e.g., oral presentation, written report, concept model, multimedia demonstration).',
          },
        ],
      },
      {
        conceptTitle: 'Universal Design for Learning (UDL) & Accommodations',
        explanation: 'Proactive inclusive design for classroom diversity.',
        keyTerms: [
          {
            term: 'UDL Three Pillars',
            definition: 'Multiple means of Representation (input), Multiple means of Action & Expression (output), and Multiple means of Engagement (motivation).',
          },
          {
            term: 'Individualized Education Plan (IEP)',
            definition: 'A collaborative, customized educational roadmap detailing present levels, SMART goals, accommodations, and related support services.',
          },
          {
            term: 'Equality vs. Equity',
            definition: 'Equality = identical treatment; Equity = differentiated support and accommodations tailored to each learner’s specific barriers.',
          },
        ],
      },
    ],
    frequentExamQuestions: [
      {
        question: 'Distinguish between general Individual Differences and Special Educational Needs (SEN).',
        answer:
          'Individual differences are natural variations in pace, interest, and learning style across all learners; SEN involves documented sensory, physical, intellectual, or neurodevelopmental conditions requiring accommodations or an IEP.',
      },
      {
        question: 'Name the four elements of Differentiated Instruction proposed by Carol Ann Tomlinson.',
        answer:
          'Content (what students access), Process (how they make sense of ideas), Product (how they demonstrate mastery), and Learning Environment (physical and affective climate).',
      },
      {
        question: 'What are the three core principles of Universal Design for Learning (UDL)?',
        answer:
          'Multiple means of Representation, Multiple means of Action & Expression, and Multiple means of Engagement.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-id-1',
        question: 'Which educational pioneer is known for the model of Differentiating Instruction by content, process, product, and environment?',
        options: ['Carol Ann Tomlinson', 'Maria Montessori', 'John Dewey', 'Benjamin Bloom'],
        correctIndex: 0,
        explanation: 'Carol Ann Tomlinson is the foremost authority on differentiated instruction in mixed-ability classrooms.',
      },
      {
        id: 'quiz-id-2',
        question: 'A student who struggles specifically with phonological decoding, word recognition, and spelling most likely has:',
        options: ['Dyscalculia', 'Dyslexia', 'Dyspraxia', 'ADHD'],
        correctIndex: 1,
        explanation: 'Dyslexia is a specific neurodevelopmental learning disability characterized by difficulties with accurate/fluent word reading and spelling.',
      },
      {
        id: 'quiz-id-3',
        question: 'Providing large-print exam sheets and 20 minutes extra time to a student with low vision is an example of:',
        options: ['Unfair privilege', 'Educational Equity', 'Strict Equality', 'Punitive grading'],
        correctIndex: 1,
        explanation: 'Educational equity provides targeted accommodations to overcome functional barriers, granting equal opportunity to demonstrate knowledge.',
      },
    ],
    examDistractorTraps: [
      'Trap: Conflating Individual Differences with Disabilities — every child exhibits individual differences (pace, personality, interest); only a subset have diagnostic SEN.',
      'Trap: Thinking gifted students require "more worksheets"; gifted learners require qualitative enrichment, higher-order inquiry, and depth, not repetitive quantity.',
    ],
  },
  {
    id: 'child-dev-age-appropriate-strategies',
    topicNumber: '6',
    title: 'Age-Appropriate Teaching Strategies Based on Developmental Theory',
    readTime: '10 min read',
    htmlNotesPath:
      'notes/child-development/age-appropriate-teaching-strategies-based-on-developmental-theory.html',
    summary:
      "Age-appropriate teaching strategies are instructional methods chosen according to children's age, developmental stage, abilities, interests, and learning needs. Across developmental bands, Infancy (0–2 years) calls for play, sensory activities, imitation games, and caregiver interaction; Early Childhood (2–6 years) thrives on play-based learning, storytelling, songs, pictures, and hands-on activities; Middle Childhood (7–11 years) requires demonstrations, experiments, manipulatives, practical examples, and group work; and Adolescence (12–18 years) develops higher-order reasoning through debates, problem-solving, projects, independent learning, and critical-thinking tasks. Major theorists (Piaget, Vygotsky, Erikson, Skinner, Bandura, Bruner) underpin six core classroom principles: Readiness, Learning by Doing, Individual Differences, Scaffolding, Positive Reinforcement, and Inclusive Teaching.",
    highYieldAlert:
      'STS High-Yield: Match each Piagetian stage and age group to its optimal classroom method — Preoperational / Early Childhood (2–7y) = play-based learning, storytelling, songs & pictures; Concrete Operational / Middle Childhood (7–11y) = tangible manipulatives, experiments & classification; Formal Operational / Adolescence (11+y) = abstract hypotheses, debates & independent inquiry; and Jerome Bruner = Discovery Learning.',
    concepts: [
      {
        conceptTitle: 'Teaching Strategies Across Four Developmental Age Bands',
        explanation:
          'Selecting instructional methods that match how children think, explore, and grow at each age range.',
        keyTerms: [
          {
            term: 'Infancy (0–2 years)',
            definition:
              'Sensory exploration and rapid physical growth — supported through play, sensory activities, imitation games, and warm caregiver interaction.',
          },
          {
            term: 'Early Childhood (2–6 years)',
            definition:
              'Language explosion, imagination, and symbolic thought — supported through play-based learning, storytelling, songs, pictures, and hands-on activities.',
          },
          {
            term: 'Middle Childhood (7–11 years)',
            definition:
              'Logical thinking about concrete objects and experiences — supported through demonstrations, experiments, manipulatives, practical examples, and group activities.',
          },
          {
            term: 'Adolescence (12–18 years)',
            definition:
              'Increasing abstract reasoning and identity formation — supported through debates, problem-solving, projects, independent learning, and critical-thinking tasks.',
          },
        ],
      },
      {
        conceptTitle: 'Translating Developmental Theories into Classroom Action',
        explanation:
          'Each developmental psychologist provides an actionable instructional implication.',
        keyTerms: [
          {
            term: 'Piaget & Bruner',
            definition:
              'Piaget: match activities to the learner’s stage of thinking; Jerome Bruner (Discovery Learning): encourage active exploration, questioning, and discovery.',
          },
          {
            term: 'Vygotsky & Erikson',
            definition:
              'Vygotsky (Sociocultural): guided learning, temporary scaffolding, and peer collaboration; Erikson (Psychosocial): nurture confidence, autonomy, and achievement.',
          },
          {
            term: 'Skinner & Bandura',
            definition:
              'Skinner (Operant Conditioning): positive reinforcement and constructive feedback; Bandura (Social Learning): demonstrate positive behavior and model skills.',
          },
        ],
      },
      {
        conceptTitle: 'Six Principles of Effective Age-Appropriate Teaching',
        explanation:
          'Core pedagogical rules ensuring developmental alignment without ignoring learner individuality.',
        bulletPoints: [
          '1. Readiness: Teach concepts when learners are developmentally prepared.',
          '2. Learning by Doing: Provide practical, interactive, hands-on experiences.',
          '3. Individual Differences: Adapt teaching to varied abilities and learning speeds.',
          '4. Scaffolding: Give temporary support and gradually reduce it as competence develops.',
          '5. Positive Reinforcement: Recognize effort, progress, and positive classroom behavior.',
          '6. Inclusive Teaching: Provide accessible activities and learning resources for all students.',
        ],
      },
    ],
    comparisonTable: {
      title: "Piaget's Stages & Matched Classroom Teaching Strategies",
      headers: ['Piaget Stage', 'Approximate Age', ' Learner Characteristics', 'Matched Teaching Strategy'],
      rows: [
        ['Sensorimotor', '0–2 years', 'Sensory exploration & motor action', 'Sensory exploration and physical interaction'],
        ['Preoperational', '2–7 years', 'Symbolic thought, language & imagination', 'Pictures, stories, play, and concrete examples'],
        ['Concrete Operational', '7–11 years', 'Logical thinking with tangible objects', 'Objects, experiments, classification, and logical activities'],
        ['Formal Operational', '11+ years', 'Abstract reasoning & hypothesis testing', 'Abstract concepts, hypotheses, debate, and critical thinking'],
      ],
    },
    classroomApplication:
      'In a multi-grade school program, a teacher plans story-picture play stations for 4-year-olds (Early Childhood), hands-on fraction manipulatives and science demonstrations for 9-year-olds (Middle Childhood), and civic debates with independent inquiry projects for 15-year-olds (Adolescence).',
    mnemonicAid:
      'Remember the 6 Principles: "R-L-I-S-P-I" -> Readiness, Learning by doing, Individual differences, Scaffolding, Positive reinforcement, Inclusive teaching.',
    frequentExamQuestions: [
      {
        question: 'Describe appropriate teaching strategies for Early Childhood (2–6y), Middle Childhood (7–11y), and Adolescence (12–18y).',
        answer:
          'Early Childhood: play-based learning, storytelling, songs, pictures, and hands-on activities. Middle Childhood: demonstrations, experiments, manipulatives, practical examples, and group work. Adolescence: debates, problem-solving, projects, independent learning, and critical-thinking tasks.',
      },
      {
        question: 'Which psychologist is associated with Discovery Learning and what is its teaching implication?',
        answer:
          'Jerome Bruner is associated with Discovery Learning, implying that teachers should encourage active exploration, questioning, and learner discovery.',
      },
      {
        question: 'List the six principles of effective age-appropriate teaching.',
        answer:
          'Readiness, Learning by Doing, Individual Differences, Scaffolding, Positive Reinforcement, and Inclusive Teaching.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-aas-1',
        question:
          'Play-based learning, storytelling, songs, and hands-on picture activities are most appropriate for which stage?',
        options: ['Infancy (0–2 years)', 'Early Childhood (2–6 years)', 'Adolescence (12–18 years)', 'Adulthood'],
        correctIndex: 1,
        explanation:
          'Early childhood (2–6 years) is marked by rapid language growth, imagination, and symbolic thinking, making play-based learning, stories, and songs ideal.',
      },
      {
        id: 'quiz-aas-2',
        question: 'Which psychologist is directly associated with Discovery Learning?',
        options: ['B. F. Skinner', 'Jerome Bruner', 'John Bowlby', 'Ivan Pavlov'],
        correctIndex: 1,
        explanation:
          'Jerome Bruner championed Discovery Learning, encouraging students to explore, ask questions, and discover patterns.',
      },
      {
        id: 'quiz-aas-3',
        question:
          'According to Piaget’s developmental theory, which strategies best support learners in the Concrete Operational stage (7–11 years)?',
        options: [
          'Abstract philosophical debates only',
          'Objects, experiments, classification, and logical activities',
          'Infant rattle imitation only',
          'Unassisted university dissertations',
        ],
        correctIndex: 1,
        explanation:
          'Concrete operational learners reason logically when anchored in tangible objects, experiments, manipulatives, and classification tasks.',
      },
    ],
    examDistractorTraps: [
      'Trap: Treating age ranges as rigid cutoffs — age bands are approximate, so teachers must combine stage awareness with attention to individual readiness.',
      'Trap: Using abstract lecture-only instruction in primary grades (7–11y) where learners still require concrete manipulatives, demonstrations, and practical examples.',
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
    id: 'steda-part-2-foundations-of-education',
    partNumber: 7,
    partCategory: 'Part II: Pedagogical Content Knowledge (50%)',
    subjectName: 'Foundations of Education',
    weightage: '10 MCQs · 10 Marks',
    marks: 10,
    targetLevel: 'Elementary (BPS-16) & Secondary (BPS-17)',
    iconName: 'Compass',
    themeColor: 'from-teal-600 to-cyan-700',
    badgeBg: 'bg-teal-500/10',
    badgeText: 'text-teal-600 dark:text-teal-400',
    description:
      'Ideological, philosophical, sociological, psychological, and historical foundations of education — the vision, values, and social purposes that direct curriculum and pedagogy, including Pakistan’s Islamic ideological framework (National Education Policy 1979) and the major philosophical streams (Idealism, Realism, Naturalism, Pragmatism, Islamic philosophy).',
    topics: FOUNDATIONS_OF_EDUCATION_TOPICS,
  },
  {
    id: 'steda-part-2-child-development',
    partNumber: 8,
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
    topics: CHILD_DEVELOPMENT_TOPICS,
  },
  {
    id: 'steda-part-2-classroom-management',
    partNumber: 9,
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
      'Ten interactive notes covering learning theories in management, environment design, observation and data collection, physical and social environments, curriculum, routines and time, shared values and community, physical setup, tiered strategies, and differentiated learning.',
    topics: CLASSROOM_MANAGEMENT_TOPICS,
  },
  {
    id: 'steda-part-2-classroom-assessment',
    partNumber: 10,
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
      'Eleven interactive notes covering assessment, evaluation and testing terminology; assessment versus evaluation; formative and summative types; feedback; assessment policy and practice in Pakistan; assessment-embedded lesson planning; item types; performance-based assessment; rubrics; portfolios; and the significance of teacher-made tests.',
    topics: CLASSROOM_ASSESSMENT_TOPICS,
  },
  {
    id: 'steda-part-2-school-community',
    partNumber: 11,
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
  {
    id: 'steda-part-2-educational-psychology',
    partNumber: 12,
    partCategory: 'Part II: Pedagogical Content Knowledge (50%)',
    subjectName: 'Educational Psychology',
    weightage: 'Revision · 6 Interactive Notes',
    marks: 0,
    targetLevel: 'Elementary (BPS-16) & Secondary (BPS-17)',
    iconName: 'Brain',
    themeColor: 'from-indigo-600 to-purple-700',
    badgeBg: 'bg-indigo-500/10',
    badgeText: 'text-indigo-600 dark:text-indigo-400',
    description:
      'Conceptual revision module for the psychology content embedded in Part II: major learning theories, psychology versus educational psychology, individual differences, basic needs and motivation, and home–school–community influences — each with a full interactive note, MCQs, CRQs, and an ERQ.',
    topics: EDUCATIONAL_PSYCHOLOGY_TOPICS,
  },
];
