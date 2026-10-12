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
    description: 'Foundational instructional approaches & strategies, direct instruction (Hunter model), constructivist 5E cycle, inductive vs deductive reasoning, cooperative learning (Jigsaw, TPS, STAD), Socratic dialogue, and differentiated instruction for STEDA licensing.',
    topics: [
      {
        id: 'methods-instructional-approaches-strategies',
        topicNumber: '01',
        title: 'Instructional approaches & strategies',
        readTime: '15 min read · High Yield',
        summary: 'Core pedagogical module for STS IBA Teaching License (Elementary BPS-16 & Secondary BPS-17). Systematically analyzes teacher-centered paradigms (Direct Instruction, Madeline Hunter\'s 7 Steps) versus student-centered paradigms (Constructivism, Roger Bybee\'s 5E Instructional Cycle, Inquiry-Based Learning, Problem-Based Learning, Project-Based Learning), inductive and deductive methodologies, cooperative frameworks (Jigsaw, Think-Pair-Share, STAD, Numbered Heads Together), Socratic dialogue, Mary Budd Rowe\'s wait-time paradigm, and differentiated instruction (Content, Process, Product, Environment) aligned with the DCAR Sindh School Curriculum Class 1–8 and the National Professional Standards for Teachers in Pakistan (NPSTP Standard 2).',
        highYieldAlert: '🚨 STS IBA & STEDA EXAM TRAPS — CRITICAL MEMORIZATION POINTS:\n• 5E Model (Roger Bybee): The teacher introduces formal concepts, scientific terminology, and textbook labels ONLY in the EXPLAIN phase, NEVER in Engage or Explore! Explore is strictly for students\' hands-on investigation without adult terminology.\n• Jigsaw Technique (Elliot Aronson): Students originate in heterogeneous Home Groups -> disperse to Expert Groups to master assigned segments -> return to Home Groups to teach peers.\n• Inductive vs. Deductive: Inductive moves from Specific Observations/Examples to General Rules/Principles (Bottom-Up / Discovery). Deductive moves from General Rules/Theorems to Specific Applications/Practice (Top-Down).\n• Wait-Time (Mary Budd Rowe): Increasing teacher wait-time to 3–5 seconds after asking a question (Wait Time 1) and after a student answers (Wait Time 2) significantly improves the length, logic, and complexity of student responses.\n• Differentiated Instruction (Carol Ann Tomlinson): Modifications must address student readiness, interest, and profile across 4 dimensions: Content, Process, Product, and Learning Environment without lowering curriculum expectations.',
        concepts: [
          {
            conceptTitle: '1. Foundational Paradigms: Teacher-Centered vs. Learner-Centered Instruction',
            explanation: 'Instructional paradigms determine who holds active control of learning, who speaks, and how knowledge is constructed in the classroom. Understanding the continuum between direct transmission and active social constructivism is foundational to the STEDA licensing examination.',
            keyTerms: [
              { term: 'Teacher-Centered (Sage on the Stage)', definition: 'Instructional orientation where the educator is the primary source of knowledge, directing information transmission, pacing, and classroom structure primarily via lecture and demonstration.' },
              { term: 'Learner-Centered (Guide on the Side)', definition: 'Instructional orientation where the student is an active constructor of knowledge, participating in inquiry, peer dialogue, and hands-on investigation while the teacher facilitates and scaffolds.' },
              { term: 'Locus of Instructional Control', definition: 'The degree of agency students exercise over their learning trajectory, pacing, and inquiry questions during a lesson.' },
              { term: 'Constructivism (Piaget & Vygotsky)', definition: 'Epistemological theory stating that learners actively construct conceptual meaning through experiential engagement and social interaction rather than passively receiving data.' }
            ],
            bulletPoints: [
              'Behaviorist transmission views knowledge as external and fixed; constructivism views learning as an active personal and social reorganization of schema.',
              'Teacher-centered methods excel in teaching procedural skills, laboratory safety rules, and initial mathematical conventions.',
              'Learner-centered methods foster higher-order Bloom levels (Analyzing, Evaluating, Creating) and enhance long-term memory retention.',
              'DCAR Sindh Class 1–8 curriculum reform explicitly mandates transitioning from rote memorization (Ratta system) to active student-centered inquiry.'
            ]
          },
          {
            conceptTitle: '2. Direct Instruction & Explicit Teaching (Madeline Hunter’s 7-Step Model)',
            explanation: 'Direct instruction is a structured, systematic pedagogical strategy designed to teach specific skills, facts, and algorithms. Madeline Hunter formalized this into a rigorous 7-step lesson planning framework widely tested in educator licensing tests.',
            keyTerms: [
              { term: 'Anticipatory Set (Hook)', definition: 'A brief activity or prompt at the start of a lesson that stimulates interest, activates relevant prior knowledge, and focuses student attention on the upcoming learning outcome.' },
              { term: 'Instructional Input', definition: 'The phase where the teacher presents new content, vocabulary, and concepts clearly using multi-modal explanations and demonstrations.' },
              { term: 'Modeling ("I Do")', definition: 'The teacher works through an exemplar problem step-by-step while vocalizing the metacognitive thinking process behind each decision.' },
              { term: 'Checking for Understanding', definition: 'Formative assessment techniques (cold calling, thumbs up/down, whiteboards) used during the lesson to verify comprehension before advancing.' },
              { term: 'Guided Practice ("We Do")', definition: 'Students attempt initial exercises in pairs or with immediate teacher feedback and scaffolding while misconceptions are immediately corrected.' },
              { term: 'Independent Practice ("You Do")', definition: 'Students work individually on tasks to consolidate automaticity and skill mastery without teacher prompting.' }
            ],
            bulletPoints: [
              'The Gradual Release of Responsibility Framework: I Do (Teacher Focus) -> We Do (Collaborative Guided Focus) -> You Do Together (Peer Focus) -> You Do Alone (Independent Mastery).',
              'Direct instruction is NOT passive lecture: it demands continuous active response from students at 30- to 60-second intervals.',
              'Critical STEDA Exam Alert: Direct instruction is most effective for foundational literacy, phonics, grammar rules, and computational arithmetic in DCAR primary grades.'
            ]
          },
          {
            conceptTitle: '3. Constructivist Learning & The 5E Instructional Model (Roger Bybee)',
            explanation: 'The 5E model, developed by Roger Bybee and the Biological Sciences Curriculum Study (BSCS), is the most frequently tested constructivist framework in STS IBA science and general pedagogy tests.',
            keyTerms: [
              { term: '1. Engage', definition: 'Elicits prior knowledge, exposes misconceptions, and hooks students without defining terms or revealing answers.' },
              { term: '2. Explore', definition: 'Hands-on, minds-on cooperative investigation where students manipulate materials, collect data, and observe phenomena WITHOUT formal teacher lecture.' },
              { term: '3. Explain', definition: 'THE PIVOTAL EXAM STAGE: Learners first articulate their conceptual findings; subsequently, the teacher introduces formal scientific vocabulary, definitions, and official explanations.' },
              { term: '4. Elaborate', definition: 'Extends conceptual understanding by applying it to novel scenarios, real-world problems, and interdisciplinary connections.' },
              { term: '5. Evaluate', definition: 'Continuous formative and summative assessment of student progress against learning objectives throughout all phases, with self-assessment rubrics.' }
            ],
            bulletPoints: [
              'EXAM WARNING: If an exam question asks: "In which 5E phase does the teacher provide formal scientific terms and definitions?", the ONLY correct answer is EXPLAIN.',
              'In the "Explore" phase, the teacher acts strictly as a facilitator, observing, asking open-ended questions, and redirecting safety hazards.',
              'The 5E cycle aligns directly with DCAR Class 1–8 Science textbooks published by the Sindh Textbook Board (STBB).'
            ]
          },
          {
            conceptTitle: '4. Inductive vs. Deductive Pedagogical Approaches',
            explanation: 'Logical reasoning pathways determine whether learning moves from concrete observations toward abstract rules, or from overarching principles down into concrete instances.',
            keyTerms: [
              { term: 'Inductive Approach (Bottom-Up / Discovery)', definition: 'Instruction begins with concrete examples and specific observations, guiding students to detect patterns, formulate hypotheses, and derive general rules or formulas.' },
              { term: 'Deductive Approach (Top-Down / Rule-First)', definition: 'Instruction begins with the explicit statement of a rule, formula, or law, followed by explanation and application to specific illustrative examples.' },
              { term: 'Francis Bacon vs. Aristotle', definition: 'Inductive logic traces back to Baconian empirical science; deductive logic is grounded in Aristotelian syllogisms.' }
            ],
            bulletPoints: [
              'Inductive sequence: Concrete Examples -> Student Observation & Comparison -> Pattern Recognition -> Derivation of Rule (High retention, time-intensive).',
              'Deductive sequence: Rule / Formula Given -> Explanation of Variables -> Teacher Exemplar -> Student Practice Application (Fast, efficient, lower self-discovery).',
              'For Class 1–5 mathematics (e.g. properties of triangles, commutativity of addition), DCAR guidelines prioritize the Inductive approach.',
              'For complex secondary physics/chemistry formulas (e.g. Newton’s Laws, Ideal Gas Equation), the Deductive approach is often employed when time is constrained.'
            ]
          },
          {
            conceptTitle: '5. Inquiry-Based, Problem-Based (PBL) & Project-Based Learning (PjBL)',
            explanation: 'Inquiry strategies position students as researchers. Knowing the four tiers of inquiry and distinguishing PBL from PjBL are guaranteed test items on the STS IBA exam.',
            keyTerms: [
              { term: 'Confirmation Inquiry', definition: 'Students are given the question, procedure, and expected outcome to confirm a known principle (lowest level of inquiry).' },
              { term: 'Structured Inquiry', definition: 'The teacher provides the research question and procedure, but students discover and analyze the outcome themselves.' },
              { term: 'Guided Inquiry', definition: 'The teacher provides the question; students design the procedure, test their hypothesis, and analyze findings.' },
              { term: 'Open Inquiry', definition: 'Students formulate their own question, design the experimental methodology, and communicate conclusions (highest autonomy).' },
              { term: 'Problem-Based Learning (PBL)', definition: 'An ill-structured, realistic problem serves as the starting catalyst for learners to identify learning needs and acquire new knowledge collaboratively.' },
              { term: 'Project-Based Learning (PjBL)', definition: 'An extended investigative process (often weeks) resulting in a tangible public product, presentation, or community solution.' }
            ],
            bulletPoints: [
              'Ill-structured problems have no single right answer, mirroring real-life social, environmental, and scientific dilemmas in Sindh.',
              'Inquiry builds the critical scientific attitudes mandated by DCAR Curriculum Class 1–8: curiosity, skepticism, objectivity, and perseverance.'
            ]
          },
          {
            conceptTitle: '6. Cooperative & Collaborative Learning Strategies',
            explanation: 'Cooperative learning is not simply group work; it requires structured interpersonal accountability. Developed by David & Roger Johnson, Robert Slavin, and Elliot Aronson.',
            keyTerms: [
              { term: 'Positive Interdependence', definition: 'The perception that individual success is impossible without the success of the entire team ("sink or swim together").' },
              { term: 'Individual Accountability', definition: 'Each team member is held responsible for mastering the material through individual testing or random cold-calling.' },
              { term: 'Jigsaw Technique (Elliot Aronson)', definition: 'Students meet in Home Groups -> divide into Expert Groups to master distinct sections -> return to Home Groups to teach teammates.' },
              { term: 'Think-Pair-Share (Frank Lyman)', definition: '1) Individual reflection (Think), 2) Dyadic discussion with neighbor (Pair), 3) Contribution to whole-class synthesis (Share).' },
              { term: 'STAD (Slavin)', definition: 'Student Teams-Achievement Divisions: Direct teacher presentation -> mixed-ability team prep -> individual quiz -> scoring based on improvement points.' },
              { term: 'Numbered Heads Together (Spencer Kagan)', definition: 'Students in teams number off 1 to 4; they put heads together to ensure all know the answer; teacher randomly calls "Number 2s stand and answer".' }
            ],
            bulletPoints: [
              '5 Essential Cooperative Elements: Positive Interdependence, Individual Accountability, Face-to-Face Interaction, Interpersonal Skills, and Group Processing.',
              'Jigsaw eliminates social loafing because every member is the sole purveyor of their assigned section.'
            ]
          },
          {
            conceptTitle: '7. Effective Questioning Techniques & The Socratic Method',
            explanation: 'Teacher questioning drives cognitive depth. Understanding Bloom-aligned questioning and Mary Budd Rowe’s research on wait-time is a high-yield exam domain.',
            keyTerms: [
              { term: 'Socratic Method', definition: 'Disciplined, open-ended questioning technique that probes assumptions, exposes contradictions, and guides students to self-correct and construct truth.' },
              { term: 'Wait Time 1 (Mary Budd Rowe)', definition: 'The silent pause of 3 to 5 seconds between asking a question and calling upon a student to respond.' },
              { term: 'Wait Time 2', definition: 'The pause of 3 to 5 seconds after a student finishes speaking before the teacher responds or calls on another student.' },
              { term: 'Convergent Questions', definition: 'Questions that prompt a single, correct, predetermined answer (Lower-order Bloom: Remember/Understand).' },
              { term: 'Divergent Questions', definition: 'Open-ended questions with multiple justifiable answers that stimulate creative and evaluative thinking.' }
            ],
            bulletPoints: [
              'Research shows baseline teacher wait time is under 1 second. Increasing to 3–5 seconds increases student response length by 300% and draws in quiet learners.',
              'Avoid "Cold-Calling" without think time; instead, use: Question -> Wait Time -> Name the student.'
            ]
          },
          {
            conceptTitle: '8. Differentiated Instruction (Carol Ann Tomlinson)',
            explanation: 'Differentiated instruction is a proactive pedagogical framework where teachers modify curriculum delivery to address variance in student readiness, interests, and learning profiles.',
            keyTerms: [
              { term: 'Content Differentiation', definition: 'What students learn or how they access concepts (e.g. tiered texts, leveled reading, audiobooks, visual diagrams).' },
              { term: 'Process Differentiation', definition: 'How students make sense of content (e.g. graphic organizers, tiered problem sets, flexible grouping, manipulative stations).' },
              { term: 'Product Differentiation', definition: 'How students demonstrate learning (e.g. choice boards, written reports, oral presentations, 3D models, dramatic role-play).' },
              { term: 'Learning Environment', definition: 'The physical and emotional classroom climate (e.g. quiet study nooks, collaboration areas, inclusive psychological safety).' },
              { term: 'Universal Design for Learning (UDL)', definition: 'Curricular design providing Multiple Means of Representation, Multiple Means of Action & Expression, and Multiple Means of Engagement.' }
            ],
            bulletPoints: [
              'Differentiation does NOT mean writing 40 individual lesson plans; it means designing flexible entry points for diverse learners.',
              'Never lower the cognitive standard for struggling learners; scaffold the process so all reach the required DCAR Student Learning Outcome (SLO).'
            ]
          }
        ],
        comparisonTable: {
          title: 'Comparative Matrix of Core Pedagogical Models (STEDA & STS IBA Exam Focus)',
          headers: ['Instructional Model', 'Primary Paradigm', 'Teacher Role', 'Student Role', 'Assessment Method', 'Optimal Classroom Use'],
          rows: [
            ['Direct Instruction (Hunter Model)', 'Teacher-Centered (Behaviorist)', 'Expert director, modeler & demonstrator', 'Active listener, follower & guided practitioner', 'Immediate checking for understanding & independent drills', 'Phonics, grammar rules, arithmetic algorithms, lab safety'],
            ['5E Instructional Cycle (Bybee)', 'Learner-Centered (Constructivist)', 'Facilitator, inquiry prober & concept clarifier', 'Active investigator, hypothesis tester & collaborator', 'Continuous formative checks across all 5 phases', 'DCAR Class 1–8 Science, discovery learning, natural phenomena'],
            ['Inquiry-Based Learning (IBL)', 'Learner-Centered (Inquiry/Discovery)', 'Scaffolder, resource curator & question guide', 'Investigator, question framer & data analyst', 'Rubric-based evaluation of research process and conclusions', 'Social studies projects, historical investigations, environmental audits'],
            ['Problem-Based Learning (PBL)', 'Learner-Centered (Experiential)', 'Coach, cognitive mentor & real-world scenario designer', 'Self-directed researcher & collaborative problem solver', 'Authentic performance tasks, artifacts & peer evaluation', 'Interdisciplinary community challenges, clean water, civic issues'],
            ['Jigsaw Cooperative Learning', 'Student-Centered (Social Constructivist)', 'Group facilitator, timer & accountability monitor', 'Segment specialist (Expert) & peer educator', 'Individual accountability testing & group reflection', 'Complex informational texts, history chapters, multi-topic units']
          ]
        },
        classroomApplication: 'Classroom Implementation Scenario: Teaching "Photosynthesis & Plant Adaptations" (DCAR Class 6 Science) in a Sindh Government Elementary School:\n\n1. Engage (5 mins): The teacher brings two identical potted plants to the classroom—one kept in sunlight, the other covered in a dark cardboard box for 4 days. Without lecturing, the teacher asks: "Observe these two plants carefully. What do you notice about the leaf color and stem texture, and why did this change occur?" Students record observations in science notebooks.\n\n2. Explore (15 mins): Students work in pairs with magnifying hand lenses and iodine solution to test starch presence in green vs. pale leaves following a visual step-by-step worksheet. The teacher circulates, asking guiding questions: "What happens when iodine touches the green leaf compared to the pale leaf? What might that dark purple color represent?" No formal definitions are given yet.\n\n3. Explain (12 mins): Pairs share their findings. Once students observe that the sunlit leaf turned dark purple (starch positive) while the shaded leaf stayed brown, the teacher explicitly introduces the scientific terminology: "Photosynthesis", "Chlorophyll", "Stomata", and the chemical word equation: Carbon Dioxide + Water + Sunlight -> Glucose + Oxygen. The teacher connects the students\' concrete observations to the formal DCAR curriculum definitions.\n\n4. Elaborate (10 mins): The teacher poses a local Sindh environmental scenario: "In many canal-side villages of Sindh, heavy dust covers tree leaves during dry seasons. Based on our experiment, what will happen to crop yield and oxygen levels if leaf stomata are blocked by dust?" Students apply their understanding to solve the problem in small teams.\n\n5. Evaluate (8 mins): The teacher conducts an exit-ticket check with 3 targeted multiple-choice and short-response items to measure student mastery against the official DCAR Student Learning Outcome (SLO) benchmarks.',
        mnemonicAid: '🧠 HIGH-YIELD MEMORY AIDS FOR STS IBA:\n• 5E Model: "Every Explorer Explains Earth\'s Ecosystem" -> Engage, Explore, Explain, Elaborate, Evaluate.\n• Madeline Hunter 7 Steps: "All Old Iguanas Make Cool Green Ice" -> Anticipatory set, Objective/Input, Modeling, Checking understanding, Guided practice, Independent practice.\n• Inductive vs. Deductive: "IPOD vs. DG" -> Inductive = Particular to Overall Derivation; Deductive = General rule down to Details.\n• 5 Cooperative Pillars: "PIGS-F" -> Positive interdependence, Individual accountability, Group processing, Social skills, Face-to-face interaction.\n• Tomlinson\'s 4 Dimensions: "CPPE" -> Content, Process, Product, Environment.',
        examDistractorTraps: [
          'Trap 1: Believing that teacher lecture belongs in the "Explore" phase. (Fact: Lecture/Direct explanation occurs ONLY in the "Explain" phase).',
          'Trap 2: Confusing Inductive with Deductive reasoning. Remember: Inductive moves from Specific Examples to General Rules (Baconian Discovery).',
          'Trap 3: Thinking Jigsaw means students just work together. Jigsaw strictly requires Home Groups -> Expert Groups -> Home Groups.',
          'Trap 4: Assuming Mary Budd Rowe wait-time is 10 seconds. Research-validated wait time is 3 to 5 seconds.'
        ],
        frequentExamQuestions: [
          {
            question: 'In the 5E Instructional Model developed by Roger Bybee, in which phase does the teacher introduce formal scientific vocabulary and conceptual definitions?',
            answer: 'Explain phase. In the Engage and Explore phases, students investigate phenomena without teacher lecture. Formal terms and scientific nomenclature are introduced only during the Explain phase after students verbalize their own observations.'
          },
          {
            question: 'Which instructional strategy proceeds from specific observations and concrete examples to the formulation of general rules and principles?',
            answer: 'Inductive Method (Bottom-Up approach). The Deductive method starts with a general rule and applies it to specific instances.'
          },
          {
            question: 'Who developed the Jigsaw Cooperative Learning technique, and what are its two constituent group types?',
            answer: 'Elliot Aronson (1971). Its two group types are "Home Groups" (base mixed-ability teams) and "Expert Groups" (temporary focus groups where students master one specific sub-topic before teaching their Home Group).'
          },
          {
            question: 'What is the scientifically validated duration of "Wait Time" proposed by Mary Budd Rowe, and what is its primary classroom benefit?',
            answer: '3 to 5 seconds. Increasing wait time from the typical 1-second baseline to 3–5 seconds dramatically increases student response length, encourages higher-order cognitive reasoning, and invites participation from slower or hesitant learners.'
          },
          {
            question: 'According to Carol Ann Tomlinson, what are the four classroom elements that a teacher can differentiate?',
            answer: '1) Content (what is learned), 2) Process (activities and sense-making), 3) Product (how learning is demonstrated), and 4) Learning Environment (classroom climate and physical layout).'
          },
          {
            question: 'What are the two essential structural pillars that prevent "social loafing" or free-riding in cooperative learning?',
            answer: 'Positive Interdependence (group members sink or swim together) and Individual Accountability (every student is tested individually and must contribute).'
          },
          {
            question: 'Which level of inquiry provides students with the research question and procedure, but requires students to analyze the data and discover the result?',
            answer: 'Structured Inquiry. If the outcome is also predetermined and known, it is Confirmation Inquiry. If students invent the procedure, it is Guided Inquiry.'
          },
          {
            question: 'In Madeline Hunter’s Explicit Instruction model, what is the purpose of the "Anticipatory Set"?',
            answer: 'To hook student interest, activate prior relevant knowledge, and focus learner attention on the day\'s objective at the start of the lesson.'
          },
          {
            question: 'What is the key difference between Problem-Based Learning (PBL) and Project-Based Learning (PjBL)?',
            answer: 'PBL centers on solving an authentic, ill-structured problem to drive acquisition of knowledge; PjBL focuses on an extended multi-step creation of a tangible final artifact or public presentation.'
          },
          {
            question: 'What type of questioning technique is designed to challenge assumptions, reveal underlying logic, and lead students through philosophical inquiry?',
            answer: 'Socratic Method (Socratic Questioning), named after the classical Greek philosopher Socrates.'
          }
        ],
        quickQuiz: [
          {
            id: 'quiz-methods-01',
            question: 'A science teacher at a Govt. Elementary School allows students to manipulate magnets and various metal objects in small groups without giving any prior definitions. According to Roger Bybee\'s 5E Instructional Model, which phase is being conducted?',
            options: ['Engage', 'Explore', 'Explain', 'Elaborate'],
            correctIndex: 1,
            explanation: 'The Explore phase provides students with a common base of hands-on experiences wherein they manipulate materials, make observations, and test ideas without the teacher lecturing or introducing formal terminology.'
          },
          {
            id: 'quiz-methods-02',
            question: 'An English teacher writes five sentences on the blackboard showing singular subjects with singular verbs and plural subjects with plural verbs. After discussing the pattern with the class, the students formulate the rule for Subject-Verb Agreement. Which pedagogical method was utilized?',
            options: ['Deductive Method', 'Inductive Method', 'Rote Drill Method', 'Socratic Dialectic'],
            correctIndex: 1,
            explanation: 'The Inductive Method begins with specific concrete examples and observations, guiding learners to discover patterns and derive the general grammatical rule (Bottom-Up logic).'
          },
          {
            id: 'quiz-methods-03',
            question: 'In which stage of the 5E Instructional Model does the educator systematically introduce formal terminology, scientific definitions, and official textbook explanations?',
            options: ['Explore phase', 'Elaborate phase', 'Explain phase', 'Evaluate phase'],
            correctIndex: 2,
            explanation: 'In the Explain phase, students first present their own findings, and then the teacher introduces formal scientific vocabulary, definitions, and official concept explanations.'
          },
          {
            id: 'quiz-methods-04',
            question: 'In the Jigsaw cooperative learning technique developed by Elliot Aronson, what happens immediately after students complete their study in "Expert Groups"?',
            options: [
              'The teacher administers a final summative test.',
              'Students return to their Home Groups to teach their assigned segment to their teammates.',
              'The entire class votes on the best student presentation.',
              'Students disperse into independent homework assignments.'
            ],
            correctIndex: 1,
            explanation: 'After mastering their subtopic in Expert Groups, students return to their original heterogeneous Home Groups to teach their specialized knowledge to their peers.'
          },
          {
            id: 'quiz-methods-05',
            question: 'Mary Budd Rowe’s seminal educational research demonstrated that increasing teacher "Wait Time" to 3–5 seconds results in which of the following outcomes?',
            options: [
              'Classroom noise increases and student discipline deteriorates.',
              'Length and cognitive complexity of student responses increase significantly.',
              'Teachers complete fewer curriculum chapters across the academic term.',
              'Students rely more heavily on guessing short one-word answers.'
            ],
            correctIndex: 1,
            explanation: 'Extending wait time from the normal 1-second interval to 3–5 seconds increases response length, enhances higher-order thinking, decreases failure to respond, and increases student-to-student interactions.'
          },
          {
            id: 'quiz-methods-06',
            question: 'According to Carol Ann Tomlinson’s model of Differentiated Instruction, providing a student with a graphic organizer or tiered worksheet during a lesson represents differentiation of:',
            options: ['Content', 'Process', 'Product', 'Learning Environment'],
            correctIndex: 1,
            explanation: 'Process differentiation modifies the activities, scaffolding, and sense-making pathways through which learners interact with and internalize the ideas.'
          },
          {
            id: 'quiz-methods-07',
            question: 'A teacher poses a question, has students write their thoughts individually for 60 seconds, discuss their reasoning with an adjacent peer for 2 minutes, and then opens the discussion to the class. Which cooperative strategy was implemented?',
            options: ['Think-Pair-Share (Frank Lyman)', 'Jigsaw (Elliot Aronson)', 'STAD (Robert Slavin)', 'Fishbowl Debate'],
            correctIndex: 0,
            explanation: 'Think-Pair-Share, developed by Frank Lyman, structures silent individual thinking (Wait Time), partner exchange, and whole-class contribution.'
          },
          {
            id: 'quiz-methods-08',
            question: 'In Madeline Hunter’s Explicit Direct Instruction model, the phase where the teacher demonstrates a math problem on the board while verbalizing the metacognitive thinking process step-by-step is called:',
            options: ['Anticipatory Set', 'Modeling ("I Do")', 'Independent Practice', 'Guided Practice'],
            correctIndex: 1,
            explanation: 'Modeling (the "I Do" stage) occurs when the teacher clearly demonstrates the target skill, problem-solving algorithm, or strategy with think-aloud explanation.'
          },
          {
            id: 'quiz-methods-09',
            question: 'Which of the following levels of inquiry provides learners with the research question, but requires students to design their own experimental procedure and analyze their own results?',
            options: ['Confirmation Inquiry', 'Structured Inquiry', 'Guided Inquiry', 'Open Inquiry'],
            correctIndex: 2,
            explanation: 'In Guided Inquiry, the teacher provides the investigation question, while students have the autonomy to design the procedural method, collect data, and derive conclusions.'
          },
          {
            id: 'quiz-methods-10',
            question: 'Which of the following represents the primary distinction between Problem-Based Learning (PBL) and Project-Based Learning (PjBL)?',
            options: [
              'PBL is teacher-centered, whereas PjBL is student-centered.',
              'PBL focuses on solving an authentic ill-structured problem to acquire knowledge, while PjBL culminates in creating a tangible product or artifact.',
              'PBL only applies to secondary mathematics, while PjBL only applies to primary language arts.',
              'PBL forbids group cooperation, while PjBL requires competitive grading.'
            ],
            correctIndex: 1,
            explanation: 'PBL is inquiry-driven by a real-world, ill-structured problem aimed at learning conceptual knowledge, whereas PjBL involves an extended project that produces a tangible, public end-product.'
          }
        ]
      },
      {
        id: 'methods-lesson-planning-models',
        topicNumber: '02',
        title: 'Lesson planning & instructional models',
        readTime: '12 min read',
        summary: 'Structural frameworks for instructional planning: Herbartian 5-Step Model (Preparation, Presentation, Association, Generalization, Application), Hunter\'s Direct Instruction, Gagne\'s 9 Events of Instruction, and alignment with DCAR Sindh Student Learning Outcomes (SLOs).',
        highYieldAlert: 'Herbartian 5 steps: Preparation -> Presentation -> Comparison/Association -> Generalization -> Application. Widely asked in past STS SST/ECT exams.',
        concepts: [
          {
            conceptTitle: 'Johann Friedrich Herbart\'s 5-Step Lesson Plan',
            explanation: 'The classic foundation of modern pedagogy consisting of Preparation, Presentation, Association, Generalization, and Application.',
            bulletPoints: [
              'Preparation (Intro/Motivation): Evoking relevant previous knowledge.',
              'Presentation: Delivering the new core subject matter.',
              'Association/Comparison: Connecting new knowledge with previously assimilated concepts.',
              'Generalization: Deriving the universal rule or principle.',
              'Application: Applying the principle to solve fresh exercises.'
            ]
          },
          {
            conceptTitle: 'Robert Gagné’s 9 Events of Instruction',
            explanation: 'Systematic conditions of learning: 1) Gain attention, 2) Inform objectives, 3) Stimulate recall, 4) Present content, 5) Provide guidance, 6) Elicit performance, 7) Provide feedback, 8) Assess performance, 9) Enhance retention/transfer.',
            bulletPoints: [
              'Event 1 (Gain Attention) corresponds to Madeline Hunter\'s Anticipatory Set.',
              'Event 6 & 7 correspond to Guided Practice and Immediate Feedback.'
            ]
          }
        ],
        comparisonTable: {
          title: 'Lesson Planning Frameworks Comparison',
          headers: ['Model', 'Creator', 'Primary Focus', 'Key Strength'],
          rows: [
            ['Herbartian Steps', 'Johann Friedrich Herbart', 'Association and Generalization', 'Systematic concept assimilation in school subjects'],
            ['7-Step Model', 'Madeline Hunter', 'Direct instruction & gradual release', 'Behavioral skill mastery and algorithm practice'],
            ['9 Events of Instruction', 'Robert Gagné', 'Cognitive information processing', 'Sequential psychomotor and cognitive lesson pacing'],
            ['Understanding by Design (UbD)', 'Wiggins & McTighe', 'Backward Design (Outcome -> Assessment -> Plan)', 'Aligns teaching with deep understanding, not just activities']
          ]
        },
        classroomApplication: 'Developing a 40-minute lesson plan for DCAR Class 7 Mathematics (Linear Equations) using Herbartian steps and SLO alignment.',
        mnemonicAid: 'Herbartian: PP-AGA -> Preparation, Presentation, Association, Generalization, Application.',
        frequentExamQuestions: [
          {
            question: 'What are the five steps of lesson planning according to Johann Friedrich Herbart?',
            answer: '1. Preparation, 2. Presentation, 3. Association (Comparison), 4. Generalization, 5. Application.'
          }
        ],
        quickQuiz: [
          {
            id: 'quiz-lp-01',
            question: 'Which of the following represents the correct sequence in the Herbartian five-step lesson plan model?',
            options: [
              'Preparation -> Presentation -> Association -> Generalization -> Application',
              'Presentation -> Preparation -> Generalization -> Association -> Application',
              'Application -> Generalization -> Association -> Presentation -> Preparation',
              'Preparation -> Association -> Presentation -> Application -> Generalization'
            ],
            correctIndex: 0,
            explanation: 'The classic Herbartian sequence begins with Preparation (mental readiness), followed by Presentation, Association/Comparison, Generalization of rules, and Application to new problems.'
          }
        ]
      }
    ]
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
    themeColor: 'from-purple-500 to-indigo-600',
    badgeBg: 'bg-purple-500/10',
    badgeText: 'text-purple-600 dark:text-purple-400',
    description: 'Cognitive, physical, and socio-emotional development stages (Piaget, Vygotsky, Erikson, Kohlberg), learning theories (Behaviorism, Constructivism, Social Learning), and individual differences.',
    topics: [
      {
        id: 'psych-piaget-vygotsky-cognition',
        topicNumber: '01',
        title: 'Cognitive Development: Piaget & Vygotsky',
        readTime: '14 min read',
        summary: 'In-depth comparative analysis of Jean Piaget\'s 4 stages of cognitive development (Sensorimotor, Preoperational, Concrete Operational, Formal Operational) versus Lev Vygotsky\'s Sociocultural Theory (Zone of Proximal Development, Scaffolding, More Knowledgeable Other).',
        highYieldAlert: 'Piaget: Object permanence (Sensorimotor), Conservation & Reversibility (Concrete Operational, 7-11y). Vygotsky: ZPD is the difference between actual unassisted and potential assisted developmental levels.',
        concepts: [
          {
            conceptTitle: 'Jean Piaget’s 4 Cognitive Stages',
            explanation: 'Development precedes learning; children pass through invariant stages via assimilation, accommodation, and equilibration.',
            bulletPoints: [
              'Sensorimotor (0–2 years): Object permanence developed around 8–9 months.',
              'Preoperational (2–7 years): Egocentrism, animism, centration, lack of conservation.',
              'Concrete Operational (7–11 years): Conservation, reversibility, seriation, decentration.',
              'Formal Operational (11+ years): Abstract reasoning, hypothetical-deductive logic.'
            ]
          },
          {
            conceptTitle: 'Lev Vygotsky’s Sociocultural Theory',
            explanation: 'Social interaction precedes development; cognitive tools are transmitted socially.',
            bulletPoints: [
              'ZPD (Zone of Proximal Development): Area between independent problem solving and assisted performance.',
              'Scaffolding: Temporary supportive framework provided by an adult or peer (Jerome Bruner).',
              'MKO (More Knowledgeable Other): Any individual possessing higher skill in a specific domain.'
            ]
          }
        ],
        frequentExamQuestions: [
          {
            question: 'At which Piagetian stage does a child acquire the concept of "Conservation"?',
            answer: 'Concrete Operational Stage (7 to 11 years).'
          }
        ],
        quickQuiz: [
          {
            id: 'quiz-psych-01',
            question: 'According to Lev Vygotsky, the distance between what a learner can do independently and what they can achieve with guidance is known as:',
            options: ['Scaffolding', 'Schema', 'Zone of Proximal Development (ZPD)', 'Equilibration'],
            correctIndex: 2,
            explanation: 'The Zone of Proximal Development (ZPD) defines the developmental zone where instructional scaffolding yields maximum cognitive growth.'
          }
        ]
      }
    ]
  },
  {
    id: 'steda-part-2-classroom-management',
    partNumber: 8,
    partCategory: 'Part II: Pedagogical Content Knowledge (50%)',
    subjectName: 'Classroom Management',
    weightage: '10 MCQs · 10 Marks',
    marks: 10,
    targetLevel: 'Elementary (BPS-16) & Secondary (BPS-17)',
    iconName: 'School',
    themeColor: 'from-blue-500 to-cyan-600',
    badgeBg: 'bg-blue-500/10',
    badgeText: 'text-blue-600 dark:text-blue-400',
    description: 'Routines, positive discipline, Jacob Kounin\'s group management techniques (withitness, overlapping, momentum, smoothness), conflict resolution, and the Sindh Prohibition of Corporal Punishment Act 2016.',
    topics: [
      {
        id: 'mgmt-kounin-discipline-law',
        topicNumber: '01',
        title: 'Classroom Dynamics, Kounin\'s Principles & Sindh Policy',
        readTime: '12 min read',
        summary: 'Proactive classroom orchestration, Jacob Kounin’s preventive management concepts (Withitness, Overlapping, Momentum, Smoothness, Group Alerting), and legal compliance with the Sindh Prohibition of Corporal Punishment Act 2016.',
        highYieldAlert: 'Jacob Kounin: "Withitness" is the teacher\'s awareness of what is going on in all corners of the classroom at all times. Corporal punishment is strictly banned in Sindh under the 2016 Act.',
        concepts: [
          {
            conceptTitle: 'Jacob Kounin’s Key Management Constructs',
            explanation: 'Effective managers prevent misbehavior before it begins through proactive awareness.',
            bulletPoints: [
              'Withitness: Eyes in the back of the head; prompt, accurate handling of minor misbehavior.',
              'Overlapping: Handling two or more classroom events simultaneously without halting lesson flow.',
              'Momentum: Maintaining forward instructional movement without unnecessary slowdowns.',
              'Smoothness: Seamless transitions between activities without abrupt interruptions (dangle, flip-flop).'
            ]
          },
          {
            conceptTitle: 'Sindh Prohibition of Corporal Punishment Act 2016',
            explanation: 'Strict statutory ban on physical and degrading punishment in all educational institutions across Sindh.',
            bulletPoints: [
              'Prohibits any physical striking, slapping, kneeling, or humiliating penalties.',
              'Mandates positive discipline, counseling, restorative practices, and emotional safety.'
            ]
          }
        ],
        frequentExamQuestions: [
          {
            question: 'What term did Jacob Kounin use to describe a teacher who demonstrates total awareness of all activities occurring in the classroom?',
            answer: 'Withitness ("eyes in the back of the head").'
          }
        ],
        quickQuiz: [
          {
            id: 'quiz-mgmt-01',
            question: 'When a teacher assists a struggling student at their desk while simultaneously gesturing to quiet two disruptive students in the back row, which Kounin skill is demonstrated?',
            options: ['Momentum', 'Overlapping', 'Withitness alone', 'Stimulus Satiation'],
            correctIndex: 1,
            explanation: 'Overlapping is the teacher’s ability to attend to two or more separate classroom events or student needs simultaneously without losing instructional control.'
          }
        ]
      }
    ]
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
    themeColor: 'from-emerald-500 to-teal-600',
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-600 dark:text-emerald-400',
    description: 'Diagnostic, formative, and summative assessments, Bloom\'s revised cognitive taxonomy (Anderson & Krathwohl), rubrics, item psychometrics (difficulty index p, discrimination index D), and authentic testing.',
    topics: [
      {
        id: 'assess-types-bloom-psychometrics',
        topicNumber: '01',
        title: 'Assessment Types, Bloom’s Taxonomy & Psychometrics',
        readTime: '14 min read',
        summary: 'Types of assessment (Diagnostic, Formative Assessment FOR Learning, Summative Assessment OF Learning, Assessment AS Learning), Bloom’s Revised Taxonomy levels (Remember, Understand, Apply, Analyze, Evaluate, Create), and item analysis formulas.',
        highYieldAlert: 'Assessment FOR learning = Formative; Assessment OF learning = Summative; Assessment AS learning = Self/Metacognitive. Item difficulty p = correct/total (ideal: 0.30 - 0.70). Discrimination index D ranges from -1.0 to +1.0 (ideal: >= +0.30).',
        concepts: [
          {
            conceptTitle: 'Assessment Typologies & Purposes',
            explanation: 'Diagnostic identifies baseline weaknesses; Formative monitors progress to adjust teaching; Summative evaluates cumulative achievement.',
            bulletPoints: [
              'Formative: Ungraded or low-stakes quizzes, exit tickets, observation rubrics during instruction.',
              'Summative: End-of-term board exams, STEDA licensing test, standardized tests.',
              'Criterion-Referenced: Evaluates performance against an absolute standard (e.g. 60% passing mark).',
              'Norm-Referenced: Compares student scores relative to peers (percentiles, bell curve).'
            ]
          },
          {
            conceptTitle: 'Bloom’s Revised Taxonomy (Cognitive Domain)',
            explanation: '6 cognitive levels arranged hierarchically from lower-order to higher-order thinking.',
            bulletPoints: [
              '1. Remembering (Recall facts, dates, terms).',
              '2. Understanding (Explain ideas, translate, summarize).',
              '3. Applying (Use information in novel practical situations).',
              '4. Analyzing (Deconstruct into parts, contrast, find causes).',
              '5. Evaluating (Justify a stance, judge value, critique).',
              '6. Creating (Synthesize, design, formulate new solutions).'
            ]
          }
        ],
        frequentExamQuestions: [
          {
            question: 'What is the highest cognitive domain level in Anderson and Krathwohl’s 2001 revision of Bloom’s Taxonomy?',
            answer: 'Creating (replacing Evaluation, which moved to level 5).'
          }
        ],
        quickQuiz: [
          {
            id: 'quiz-assess-01',
            question: 'A teacher uses an Exit Ticket at the end of a lesson to decide whether to re-teach the topic tomorrow or advance to new material. This represents:',
            options: ['Summative Assessment', 'Formative Assessment (Assessment FOR Learning)', 'Norm-Referenced Assessment', 'Diagnostic Aptitude Assessment'],
            correctIndex: 1,
            explanation: 'Formative assessment is conducted during the learning process to adapt instructional pacing and provide immediate feedback before summative evaluation.'
          }
        ]
      }
    ]
  },
  {
    id: 'steda-part-2-school-community',
    partNumber: 10,
    partCategory: 'Part II: Pedagogical Content Knowledge (50%)',
    subjectName: 'School, Community & Teacher',
    weightage: '10 MCQs · 10 Marks',
    marks: 10,
    targetLevel: 'Elementary (BPS-16) & Secondary (BPS-17)',
    iconName: 'Globe',
    themeColor: 'from-rose-500 to-pink-600',
    badgeBg: 'bg-rose-500/10',
    badgeText: 'text-rose-600 dark:text-rose-400',
    description: 'School Management Committees (SMCs), community mobilization, parent-teacher collaboration, Article 25-A of the Constitution of Pakistan, and the National Professional Standards for Teachers in Pakistan (NPSTP).',
    topics: [
      {
        id: 'comm-npstp-article25a-smc',
        topicNumber: '01',
        title: 'NPSTP Standards, Article 25-A & SMC Governance',
        readTime: '11 min read',
        summary: 'The 10 National Professional Standards for Teachers in Pakistan (NPSTP 2009), constitutional mandates under Article 25-A (Right to Free and Compulsory Education), and the operational role of School Management Committees (SMCs) in Sindh.',
        highYieldAlert: 'Article 25-A was inserted via the 18th Constitutional Amendment (2010), guaranteeing free education for children aged 5 to 16. There are 10 NPSTP standards.',
        concepts: [
          {
            conceptTitle: 'National Professional Standards for Teachers in Pakistan (NPSTP)',
            explanation: '10 national benchmarks established by the Ministry of Education in 2009 for teacher preparation and licensing.',
            bulletPoints: [
              'Standard 1: Subject matter knowledge.',
              'Standard 2: Human growth and development.',
              'Standard 3: Knowledge of Islamic ethical values and national heritage.',
              'Standard 4: Instructional planning and strategies.',
              'Standard 5: Assessment.',
              'Standard 6: Learning environment.',
              'Standard 7: Communication and advocacy.',
              'Standard 8: Collaboration and partnerships.',
              'Standard 9: Continuous professional development (CPD).',
              'Standard 10: ICT integration in teaching.'
            ]
          },
          {
            conceptTitle: 'Article 25-A & Sindh School Governance',
            explanation: 'Constitutional guarantee of education and decentralized grassroots governance through SMCs.',
            bulletPoints: [
              'Article 25-A: "The State shall provide free and compulsory education to all children of the age of five to sixteen years in such manner as may be determined by law."',
              'School Management Committees (SMCs): Composed of headteachers, parents, and community notables overseeing school improvement funds and enrollment.'
            ]
          }
        ],
        frequentExamQuestions: [
          {
            question: 'Which constitutional article guarantees free and compulsory education to children aged 5–16 in Pakistan?',
            answer: 'Article 25-A (inserted via the 18th Constitutional Amendment in 2010).'
          }
        ],
        quickQuiz: [
          {
            id: 'quiz-comm-01',
            question: 'How many National Professional Standards for Teachers in Pakistan (NPSTP) were officially formulated in 2009?',
            options: ['5 standards', '7 standards', '10 standards', '12 standards'],
            correctIndex: 2,
            explanation: 'There are exactly 10 National Professional Standards for Teachers in Pakistan (NPSTP) governing knowledge, dispositions, and performance.'
          }
        ]
      }
    ]
  }
];
