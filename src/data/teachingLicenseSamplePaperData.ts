import { MCQ } from '../types';

export interface TestDivisionSummary {
  sNo: number;
  type: string;
  numberOfQuestions: number;
  marks: number;
  weightagePercent: number;
  timeMinutes: number;
}

export interface CaseStudyRubricItem {
  criterion: string;
  maxPoints: number;
  description: string;
}

export interface CaseStudyERQ {
  id: string;
  section: string;
  title: string;
  subjectMatter: string;
  level: string;
  marks: number;
  weightagePercent: number;
  timeMinutes: number;
  scenario: string;
  prompt: string;
  rubric: CaseStudyRubricItem[];
  modelAnswer: {
    title: string;
    sections: {
      heading: string;
      rubricMapped: string;
      pointsAwarded: string;
      content: string[];
    }[];
  };
}

export interface CRQItem {
  qNo: number;
  subjectMatter: string;
  level: string;
  marks: number;
  weightagePercent: number;
  question: string;
  rubric: {
    point1: string;
    point2: string;
    point3: string;
  };
  modelAnswer: {
    summary: string;
    keyPoints: string[];
    practicalApplication: string;
  };
}

export interface SamplePaperMCQ extends MCQ {
  qNo: number;
  subjectMatter: string;
  cognitiveLevel: 'Content knowledge' | 'Comprehension' | 'Analytical' | 'Evaluative';
  weightageMarks: number;
  weightagePercent: number;
}

export const TEST_DIVISION_SUMMARY: TestDivisionSummary[] = [
  {
    sNo: 1,
    type: 'Extended Response Question (ERQ) Case Study Analysis',
    numberOfQuestions: 1,
    marks: 100,
    weightagePercent: 25,
    timeMinutes: 50,
  },
  {
    sNo: 2,
    type: 'Constructed Response Question (CRQ)',
    numberOfQuestions: 10,
    marks: 150,
    weightagePercent: 50,
    timeMinutes: 50,
  },
  {
    sNo: 3,
    type: 'Multiple Choice Questions (MCQs)',
    numberOfQuestions: 50,
    marks: 50,
    weightagePercent: 25,
    timeMinutes: 50,
  },
];

export const SAMPLE_PAPER_ERQ: CaseStudyERQ = {
  id: 'iba-sts-2024-erq-case-study',
  section: 'Section 1: Case Study Analysis (100 Marks, 25% Weightage, 50 Minutes)',
  title: 'Literacy Crisis in Interior Sindh Primary School (Mr. Ahmed Case)',
  subjectMatter: 'Dynamic Teaching',
  level: 'Analysis & Evaluation',
  marks: 100,
  weightagePercent: 25,
  timeMinutes: 50,
  scenario: `In a Government Boys Primary School in interior Sindh, a Grade 4 teacher, Mr. Ahmed, faces a severe challenge: nearly 60% of his students cannot read Urdu or English at grade level. Most students are first-generation learners whose parents work as farm laborers.

The school lacks a library, has no electricity, and only receives textbooks late in the academic year. Mr. Ahmed has tried traditional methods—recitation, copying from the board, and rote memorization—but students remain disengaged and frequently absent, especially during harvest season.`,
  prompt: `As an aspiring teacher applying for licensure, how would you advise Mr. Ahmed to address this crisis effectively? Provide a detailed plan considering linguistic diversity, severe resource constraints, and the socio-economic realities of the community.`,
  rubric: [
    {
      criterion: 'Understanding of the Problem',
      maxPoints: 20,
      description: 'Does the candidate demonstrate comprehensive understanding of the crisis, including linguistic, economic, and institutional factors affecting literacy?',
    },
    {
      criterion: 'Solution and Strategies',
      maxPoints: 40,
      description: 'Does the candidate propose feasible, context-appropriate solutions? Are strategies specific to multilingual classrooms and low-resource settings?',
    },
    {
      criterion: 'Consideration of Diversity and Equity',
      maxPoints: 20,
      description: 'Does the plan address linguistic diversity, gender equity, and inclusion of marginalized students?',
    },
    {
      criterion: 'Resource Management',
      maxPoints: 10,
      description: 'Does the candidate propose innovative use of limited resources (e.g., community resources, peer learning, low-cost materials)?',
    },
    {
      criterion: 'Communication and Clarity',
      maxPoints: 10,
      description: 'Is the response well-structured, clear, and coherent?',
    },
  ],
  modelAnswer: {
    title: 'Advisory Strategic Plan for Mr. Ahmed: Transforming Early Grade Literacy in Interior Sindh',
    sections: [
      {
        heading: '1. Comprehensive Understanding of the Problem & Contextual Diagnostics',
        rubricMapped: 'Understanding of the Problem (20 Points)',
        pointsAwarded: '20/20',
        content: [
          'Linguistic Barriers: In interior Sindh, children enter school with Sindhi or Siraiki as their mother tongue. Being taught reading directly in Urdu and English through rote board copying without mother-tongue scaffolding induces linguistic cognitive overload and silent alienation.',
          'Socio-Economic & Seasonal Realities: As first-generation learners of agricultural wage laborers, students lack books, home literacy models, and electric lighting for study. Periodic harvest-season migration disrupts continuous schooling, causing cumulative learning loss.',
          'Institutional & Methodological Constraints: The complete absence of electricity, libraries, and timely STBB textbooks renders passive recitation futile. Rote chalkboard copying tests memory rather than decoding phonological awareness and comprehension.',
        ],
      },
      {
        heading: '2. Feasible & Context-Appropriate Literacy Solutions',
        rubricMapped: 'Solution and Strategies (40 Points)',
        pointsAwarded: '40/40',
        content: [
          'Mother-Tongue Bridging & Translanguaging: Implement the Language Experience Approach (LEA). Allow students to narrate daily village and farm experiences in Sindhi/Siraiki, write their words phonetically on the board, and bridge gradually to Urdu and English cognates.',
          'Structured Phonics & Decodable Micro-Lessons (TaRL Methodology): Shift to "Teaching at the Right Level" (Pratham/TaRL model). Group students by reading proficiency (Letter Recognition -> Word Decoding -> Sentence Reading -> Fluency) rather than rigid grade age for 1 hour each morning.',
          'Interactive Shared Reading & Story circles: Replace chalkboard copying with dialogic reading, oral storytelling, puppetry, and local folktales (e.g., characters from Shah Abdul Latif Bhittai\'s stories) to build vocabulary and auditory comprehension before print reading.',
          'Buddy Reading & Peer Learning Circles: Pair struggling Grade 4 readers with slightly advanced peers for daily 15-minute paired phonics routines, turning classroom collectivism into a learning engine.',
        ],
      },
      {
        heading: '3. Diversity, Equity & Community Realities',
        rubricMapped: 'Consideration of Diversity and Equity (20 Points)',
        pointsAwarded: '20/20',
        content: [
          'Harvest-Season Flexible Learning Contracts: Accommodate seasonal farm labor by creating portable "Pocket Reading Folders" and informal evening community revision sessions, rather than penalizing or shaming children upon their return.',
          'Inclusive & Gender-Sensitive Classroom Climate: Promote equal voice and leadership roles during story circles, ensuring marginalized children from lower socio-economic strata and introverted learners participate actively.',
          'Differentiated Pacing: Form small guided reading circles while other students engage in independent sand-writing or word-matching games, enabling Mr. Ahmed to give focused 10-minute interventions.',
        ],
      },
      {
        heading: '4. Innovative Low-Cost Resource Management',
        rubricMapped: 'Resource Management (10 Points)',
        pointsAwarded: '10/10',
        content: [
          'Print-Rich Classroom via Upcycled Materials: Transform classroom walls into a print-rich environment using recycled flour sacks, newspaper clippings, cardboard word walls, and charcoal-painted floor slates without electricity.',
          'Community "Kutubkhana" (Corner Library): Organize a grassroots book drive with local youth, mosque committees, and NGOs to assemble a 50-book community corner featuring illustrated regional readers.',
          'SMC & Parental Voice Engagement: Engage illiterate farm parents via oral WhatsApp voice notes and School Management Committee (SMC) meetings, empowering them to support children by asking about their daily stories without needing to read.',
        ],
      },
      {
        heading: '5. Phased Action Roadmap & Professional Monitoring',
        rubricMapped: 'Communication and Clarity (10 Points)',
        pointsAwarded: '10/10',
        content: [
          'Phase 1 (Week 1–2): Diagnostic reading baseline assessment; establish low-cost print-rich wall and phonetic chart.',
          'Phase 2 (Week 3–8): Daily 45-minute leveled phonics & bilingual storytelling circles; harvest-flexible homework cards.',
          'Phase 3 (Ongoing): Bi-weekly formative reading check-ins with visual progress charts celebrating growth.',
        ],
      },
    ],
  },
};

export const SAMPLE_PAPER_CRQS: CRQItem[] = [
  {
    qNo: 1,
    subjectMatter: 'Differentiation for Gifted Learners',
    level: 'Comprehension and Analysis',
    marks: 15,
    weightagePercent: 5,
    question: `Explain how you would address the needs of a gifted student who is bored and disengaged in a mixed-ability classroom. Provide two specific enrichment strategies that maintain inclusion while challenging the student.`,
    rubric: {
      point1: "Understanding of gifted learners' needs (5 points)",
      point2: 'Practical enrichment strategies (5 points)',
      point3: 'Maintaining inclusion (5 points)',
    },
    modelAnswer: {
      summary: 'Gifted learners in mixed-ability classrooms require intellectual depth, complexity, and autonomy rather than mere volume of extra work.',
      keyPoints: [
        'Understanding Needs: When gifted students master core competencies rapidly, repetitive drill tasks induce chronic boredom and behavioral disengagement. They need higher-order thinking (Bloom’s Analyzing, Evaluating, Creating) and self-paced exploration.',
        'Enrichment Strategy 1: Curriculum Compacting & Tiered Extension (Depth over Volume) — Pre-assess the student before a unit. If mastery is proven, excuse them from routine drills and assign an open-ended independent inquiry project (e.g., investigating water filtration systems rather than repeatedly labeling the water cycle).',
        'Enrichment Strategy 2: Peer Inquiry Facilitation (Anchor Activity / RAFT Choice Boards) — In group tasks, assign the gifted learner reciprocal roles such as "Research Analyst" or "Peer Discussion Facilitator", keeping them socially bonded within the peer group while exercising complex analytical reasoning.',
      ],
      practicalApplication: 'Preserves classroom social cohesion without isolating the student, channeling high aptitude into collaborative and creative productivity.',
    },
  },
  {
    qNo: 2,
    subjectMatter: 'Learning Theory Application',
    level: 'Comprehension and Analysis',
    marks: 15,
    weightagePercent: 5,
    question: `Describe Vygotsky's Zone of Proximal Development (ZPD). How would you apply this concept in a classroom where students have varying levels of prior knowledge and limited parental support?`,
    rubric: {
      point1: 'Explanation of ZPD (5 points)',
      point2: 'Application to diverse classroom (5 points)',
      point3: 'Addressing limited support (5 points)',
    },
    modelAnswer: {
      summary: 'Lev Vygotsky defined the Zone of Proximal Development (ZPD) as the sweet spot between what a learner can achieve independently and what they can achieve with the guidance of a More Knowledgeable Other (MKO).',
      keyPoints: [
        'ZPD Concept: Learning happens just beyond the student’s current independent comfort zone through dynamic social interaction and temporary instructional scaffolding (Bruner).',
        'Application with Divergent Prior Knowledge: Conduct quick pre-assessments and map students into dynamic flexible skill bands. Provide tiered scaffolding—sentence starters, graphic organizers, and visual worked examples for learners with lower baselines, and gradually remove scaffolds as mastery emerges.',
        'Overcoming Limited Parental Support: Design school-contained scaffolding loops. Implement structured peer reciprocal teaching, teacher guided-reading groups, and in-class practice stations so homework is never a bottleneck for progress.',
      ],
      practicalApplication: 'Ensures equitable cognitive growth in low-income schools where students cannot rely on educated parents or private home tutors.',
    },
  },
  {
    qNo: 3,
    subjectMatter: 'Instructional Planning & Resourcefulness',
    level: 'Comprehension and Analysis',
    marks: 15,
    weightagePercent: 5,
    question: `Design a 40-minute lesson to teach the water cycle to a Grade 3 class using only locally available materials (e.g., plastic bottles, soil, leaves). Include objectives, activities, and assessment.`,
    rubric: {
      point1: 'Clear objectives (5 points)',
      point2: 'Creative low-cost activities (5 points)',
      point3: 'Appropriate assessment (5 points)',
    },
    modelAnswer: {
      summary: 'A 40-minute experiential science lesson plan aligned with STBB Class 3 General Science using zero-cost recycled materials.',
      keyPoints: [
        'SMART Learning Objectives (5 mins): By the end of 40 minutes, students will: 1) Identify and name the 3 stages of the water cycle (Evaporation, Condensation, Precipitation) with 90% accuracy; 2) Explain how water recycles in nature using a classroom mini-terrarium.',
        'Hands-On Low-Cost Activity (25 mins): "Water Cycle in a Bottle". Divide class into small groups. Give each group an empty transparent plastic bottle cut in half. Add damp soil and fresh green leaves at the bottom, add a few drops of water, invert the bottle top, seal with clay/mud, and place on a sunny classroom windowsill. Within 15 minutes, students observe water evaporating, condensing on the bottle ceiling, and raining down like precipitation.',
        'Formative Assessment (10 mins): "Show and Act". Students sketch the 3 stages on small slate boards and perform an interactive physical movement: standing up (Evaporation), hugging peers (Condensation), and fluttering fingers down (Precipitation).',
      ],
      practicalApplication: 'Transforms abstract atmospheric physics into a tangible sensory reality without relying on science lab equipment.',
    },
  },
  {
    qNo: 4,
    subjectMatter: 'Classroom Management & Student Well-being',
    level: 'Comprehension and Analysis',
    marks: 15,
    weightagePercent: 5,
    question: `Present a scenario involving a student who frequently bullies classmates. Propose a comprehensive intervention plan aligned with restorative justice practices and positive behavior support.`,
    rubric: {
      point1: 'Scenario realism (5 points)',
      point2: 'Intervention effectiveness (5 points)',
      point3: 'Alignment with restorative practices (5 points)',
    },
    modelAnswer: {
      summary: 'Scenario: Grade 5 student Bilal frequently snatches stationery, uses derogatory nicknames, and intimidates smaller peers during break time to assert social dominance.',
      keyPoints: [
        'Restorative Conference (Instead of Punitive Expulsion): Facilitate a safe, structured mediation circle involving Bilal, the affected peers, and the teacher. Focus not on blaming, but on accountability: "What happened? Who was affected? How can we make things right?"',
        'Root-Cause & Positive Behavior Support (PBS): Identify Bilal’s underlying triggers (e.g., academic frustration, domestic harshness, seeking peer attention). Teach replacement behaviors and self-regulation techniques.',
        'Restorative Repair & Responsibility Assignment: Bilal agrees to a restorative repair contract: returning snatched items, offering sincere verbal repair, and taking up a prosocial responsibility (e.g., playground sports equipment monitor).',
      ],
      practicalApplication: 'Restores peer empathy and trust while transforming a disruptive bully into a responsible community member.',
    },
  },
  {
    qNo: 5,
    subjectMatter: 'Policy Critique & Proposal',
    level: 'Comprehension and Analysis',
    marks: 15,
    weightagePercent: 5,
    question: `Critically examine Pakistan's National Education Policy 2017 regarding early childhood education. Identify one gap and propose a realistic modification for implementation in rural contexts.`,
    rubric: {
      point1: 'Valid gap identification (5 points)',
      point2: 'Justification (5 points)',
      point3: 'Feasible modification (5 points)',
    },
    modelAnswer: {
      summary: 'Critical examination of Early Childhood Care and Education (ECCE / Katchi) within the National Education Policy 2017.',
      keyPoints: [
        'Identified Policy Gap: NEP 2017 formally recognizes ECCE but lacks dedicated fiscal allocations, specialized trained early-years teacher cadres, and developmentally appropriate learning spaces in rural primary schools, where multi-grade primary teachers are forced to babysit Katchi children while teaching Grades 1–5 simultaneously.',
        'Justification: Without specialized play-based teachers, rural children experience high dropout rates in Grade 1, rote trauma, and an absence of foundational literacy and numeracy (FLN).',
        'Realistic Rural Modification: Institutionalize the "Community ECCE Co-Teacher & Mother Assistant" model. Train literate local female village assistants through STEDA/PITE modules to run low-cost play and language centers attached to government primary schools using indigenous play materials.',
      ],
      practicalApplication: 'Relieves single-teacher primary schools and establishes foundational cognitive school readiness in rural communities.',
    },
  },
  {
    qNo: 6,
    subjectMatter: 'Educational Ethics',
    level: 'Comprehension and Analysis',
    marks: 15,
    weightagePercent: 5,
    question: `Discuss the ethical responsibilities of a teacher regarding maintaining confidentiality of student records. Illustrate with a hypothetical situation where a parent demands access to another student's information.`,
    rubric: {
      point1: 'Understanding of confidentiality (5 points)',
      point2: 'Relevant hypothetical case (5 points)',
      point3: 'Appropriate ethical response (5 points)',
    },
    modelAnswer: {
      summary: 'Confidentiality is a bedrock ethical responsibility under the National Professional Standards for Teachers in Pakistan (Standard 8: Professional Ethics and Code of Conduct).',
      keyPoints: [
        'Hypothetical Scenario: During a parent-teacher meeting, an influential local parent, Mr. Tariq, demands to see the exam papers and disciplinary records of his son’s academic rival, Zaid, arguing that the grading was biased.',
        'Ethical Violation Risk: Disclosing Zaid’s marks, behavior logs, or personal background violates student privacy, creates inter-family animosity, and breaches teacher fiduciary duty.',
        'Professional Ethical Response: 1) Firmly and respectfully decline the request: "Under school policy and professional ethics, I am only authorized to discuss your own child’s performance." 2) Transparently show Mr. Tariq the objective marking rubrics used for his son’s paper. 3) Reassure him of standardized, impartial evaluation standards without ever disclosing other students’ confidential files.',
      ],
      practicalApplication: 'Protects student vulnerability, preserves institutional integrity, and models professional impartiality.',
    },
  },
  {
    qNo: 7,
    subjectMatter: 'Cultural Inclusion',
    level: 'Comprehension and Analysis',
    marks: 15,
    weightagePercent: 5,
    question: `Explain the importance of culturally responsive teaching in multilingual Pakistani classrooms. Describe two strategies to integrate students' home languages and cultural backgrounds into daily lessons.`,
    rubric: {
      point1: 'Importance of culturally responsive teaching (5 points)',
      point2: 'Two effective strategies (5 points)',
      point3: 'Promotion of inclusion (5 points)',
    },
    modelAnswer: {
      summary: 'Culturally responsive teaching treats students’ home languages and socio-cultural identities as assets rather than deficits.',
      keyPoints: [
        'Importance: When children see their indigenous heritage respected, affective anxiety drops, cognitive schema connections strengthen, and students from marginalized linguistic backgrounds thrive academically.',
        'Strategy 1: "Multilingual Word Walls & Translanguaging Bridges" — Display core academic concepts with equivalent words in Sindhi, Urdu, Siraiki, and English (e.g., Water / پاڻي / پانی / Water). Allow students to discuss in their mother tongue during think-pair-share before formulating answers in the target language.',
        'Strategy 2: "Cultural Storytelling & Indigenous Knowledge Units" — Integrate local farming seasons, regional architecture (e.g., Thatta tilework in geometry), and regional folklore into science and social studies examples.',
      ],
      practicalApplication: 'Dismantles linguistic hierarchies and fosters national harmony, mutual empathy, and academic belonging.',
    },
  },
  {
    qNo: 8,
    subjectMatter: 'Teaching Philosophy Statement',
    level: 'Comprehension and Analysis',
    marks: 15,
    weightagePercent: 5,
    question: `Write a concise teaching philosophy statement that reflects your beliefs about how children learn best, the role of a teacher, and the purpose of education in Pakistan.`,
    rubric: {
      point1: 'Key elements of philosophy (5 points)',
      point2: 'Clear articulation (5 points)',
      point3: 'Alignment with best practices (5 points)',
    },
    modelAnswer: {
      summary: 'A concise teaching philosophy statement embodying progressive constructivism and democratic transformation.',
      keyPoints: [
        'How Children Learn Best: Children learn best when they are emotionally safe, intellectually challenged, and actively constructing knowledge through hands-on inquiry, play, and collaborative peer discourse.',
        'The Role of the Teacher: The teacher is a reflective facilitator, empathetic mentor, and scaffold builder who awakens curiosity, embraces mistakes as learning steps, and values every learner’s unique genius.',
        'The Purpose of Education in Pakistan: Education in Pakistan must transcend mechanical rote testing; its true mission is to nurture critical thinkers, ethical problem-solvers, and compassionate citizens who champion social justice, constitutional values, and community progress.',
      ],
      practicalApplication: 'Anchors every instructional lesson, disciplinary choice, and pedagogical interaction in student dignity and holistic empowerment.',
    },
  },
  {
    qNo: 9,
    subjectMatter: 'Digital Education Implementation',
    level: 'Comprehension and Analysis',
    marks: 15,
    weightagePercent: 5,
    question: `Analyze the benefits and challenges of using mobile phones as teaching tools in low-income urban schools. Suggest two practical ways to integrate mobile technology to enhance learning without increasing inequality.`,
    rubric: {
      point1: 'Understanding of benefits/challenges (5 points)',
      point2: 'Context-specific analysis (5 points)',
      point3: 'Two practical integration examples (5 points)',
    },
    modelAnswer: {
      summary: 'Mobile devices are widespread even in low-income urban settlements, offering pedagogical utility alongside severe digital divide risks.',
      keyPoints: [
        'Benefits vs. Challenges: Mobiles provide instant access to simulations, audio readers, and visual videos; however, screen distraction, unequal device access among siblings, and data package costs risk exacerbating inequalities.',
        'Integration Way 1: "Station-Rotation In-Class Group Digital Stations" — Instead of requiring personal phones, set up two teacher/school-provided offline smartphones loaded with educational apps (e.g., Khan Academy Urdu / Taleemabad). Groups rotate through the station for 10-minute targeted drills, ensuring zero out-of-pocket cost.',
        'Integration Way 2: "Asynchronous WhatsApp Micro-Audio Quizzes" — Share brief 30-second audio questions or photo prompts for home evening discussions, allowing shared family devices to participate without demanding high data consumption or synchronous attendance.',
      ],
      practicalApplication: 'Harnesses mobile learning affordances equitably without marginalizing device-poor households.',
    },
  },
  {
    qNo: 10,
    subjectMatter: 'Parental Involvement Strategy',
    level: 'Comprehension and Analysis',
    marks: 15,
    weightagePercent: 5,
    question: `Develop a plan to increase parental involvement in a school serving a low-income, multilingual community. Identify two barriers to involvement and propose solutions to overcome them.`,
    rubric: {
      point1: 'Importance of parental engagement (5 points)',
      point2: 'Consideration of barriers (5 points)',
      point3: 'Viable solutions (5 points)',
    },
    modelAnswer: {
      summary: 'Parental engagement is vital for student attendance, psychological well-being, and academic persistence in low-income communities.',
      keyPoints: [
        'Barrier 1: Illiteracy & Intimidation by School Authority — Parents feel self-conscious and believe they cannot help because they cannot read.',
        'Solution 1: Non-Written Portfolios & Oral Celebrations — Replace formal text report cards with pictorial student work portfolios. Host informal "Chai & Taleem" gatherings where children present their projects orally in their mother tongue.',
        'Barrier 2: Daily Wage Labor & Rigid Working Hours — Parents cannot attend meetings held during morning school hours.',
        'Solution 2: Flexible Timings & Community Ambassadors — Schedule short evening or weekend dialogues. Designate local parent liaisons and send 1-minute voice notes on mobile messaging apps to celebrate attendance milestones.',
      ],
      practicalApplication: 'Builds a dignified, culturally affirming bridge that turns marginalized parents into active learning partners.',
    },
  },
];

export const SAMPLE_PAPER_MCQS: SamplePaperMCQ[] = [
  {
    id: 'tl-past-2024-mcq-1',
    qNo: 1,
    question: 'Which organelle is known as the powerhouse of the cell?',
    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Chloroplast'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Content Knowledge',
    cognitiveLevel: 'Content knowledge',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Mitochondria are known as the powerhouse of the cell because they generate most of the chemical energy needed by the cell through ATP production.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-2',
    qNo: 2,
    question: 'What is the chemical symbol for water?',
    options: ['CO₂', 'H₂O', 'O₂', 'NaCl'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Content Knowledge',
    cognitiveLevel: 'Content knowledge',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Water consists of two hydrogen atoms bonded to one oxygen atom, represented by the chemical formula H₂O.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-3',
    qNo: 3,
    question: 'Which of the following is a composite number?',
    options: ['17', '19', '21', '23'],
    difficulty: 'Medium',
    correctIndex: 2, // c
    subjectMatter: 'Content Knowledge',
    cognitiveLevel: 'Content knowledge',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'A composite number has more than two factors. 21 has factors 1, 3, 7, and 21, making it composite, whereas 17, 19, and 23 are prime numbers.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-4',
    qNo: 4,
    question: 'If a car travels 60 km in 1.5 hours, what is its average speed?',
    options: ['30 km/h', '40 km/h', '45 km/h', '50 km/h'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Content Knowledge',
    cognitiveLevel: 'Content knowledge',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Average speed = Distance / Time = 60 km / 1.5 hours = 40 km/h.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-5',
    qNo: 5,
    question: 'What is 0.00045 expressed in scientific notation?',
    options: ['4.5 × 10⁻³', '4.5 × 10⁻⁴', '4.5 × 10⁻⁵', '45 × 10⁻⁵'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Content Knowledge',
    cognitiveLevel: 'Content knowledge',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Moving the decimal point 4 places to the right gives 4.5 × 10⁻⁴.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-6',
    qNo: 6,
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Jupiter', 'Mars', 'Saturn'],
    difficulty: 'Medium',
    correctIndex: 2, // c
    subjectMatter: 'Content Knowledge',
    cognitiveLevel: 'Content knowledge',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Mars is called the Red Planet due to the prevalence of iron oxide (rust) on its surface.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-7',
    qNo: 7,
    question: 'What is the probability of drawing a red card from a standard deck of 52 cards?',
    options: ['1/4', '1/2', '1/3', '2/3'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Content Knowledge',
    cognitiveLevel: 'Content knowledge',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'A standard 52-card deck has 26 red cards (hearts and diamonds). Probability = 26/52 = 1/2.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-8',
    qNo: 8,
    question: 'Which material is a poor conductor of electricity?',
    options: ['Silver', 'Copper', 'Rubber', 'Aluminum'],
    difficulty: 'Medium',
    correctIndex: 2, // c
    subjectMatter: 'Content Knowledge',
    cognitiveLevel: 'Content knowledge',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Rubber is an electrical insulator with tightly bound electrons, making it a poor conductor of electricity.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-9',
    qNo: 9,
    question: 'What is the value of 5³?',
    options: ['15', '25', '125', '225'],
    difficulty: 'Medium',
    correctIndex: 2, // c
    subjectMatter: 'Content Knowledge',
    cognitiveLevel: 'Content knowledge',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: '5³ = 5 × 5 × 5 = 125.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-10',
    qNo: 10,
    question: 'The process by which plants make their own food is called:',
    options: ['Respiration', 'Transpiration', 'Photosynthesis', 'Digestion'],
    difficulty: 'Medium',
    correctIndex: 2, // c
    subjectMatter: 'Content Knowledge',
    cognitiveLevel: 'Content knowledge',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Photosynthesis is the process by which green plants synthesize glucose using sunlight, water, and carbon dioxide.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-11',
    qNo: 11,
    question: 'What is the primary purpose of formative assessment?',
    options: ['To assign final grades', 'To monitor student learning and provide feedback', 'To rank students', 'To evaluate teacher performance'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Assessment',
    cognitiveLevel: 'Comprehension',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Formative assessment is an ongoing diagnostic tool used during the instructional process to monitor understanding and provide actionable feedback.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-12',
    qNo: 12,
    question: 'Which teaching strategy is most likely to promote critical thinking?',
    options: ['Rote memorization', 'Lecture-only', 'Socratic questioning', 'Copying notes'],
    difficulty: 'Medium',
    correctIndex: 2, // c
    subjectMatter: 'Teaching Style',
    cognitiveLevel: 'Comprehension',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Socratic questioning probes assumptions, challenges thinking, and stimulates deeper cognitive reflection and critical inquiry.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-13',
    qNo: 13,
    question: 'A student who learns best by moving and touching objects is a:',
    options: ['Visual learner', 'Auditory learner', 'Kinesthetic learner', 'Read/write learner'],
    difficulty: 'Medium',
    correctIndex: 2, // c
    subjectMatter: 'Learning Styles',
    cognitiveLevel: 'Comprehension',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Kinesthetic (tactile) learners process and retain information most effectively through physical movement, touch, and handling concrete objects.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-14',
    qNo: 14,
    question: 'Adapting instruction to meet diverse learner needs is known as:',
    options: ['Standardization', 'Differentiated Instruction', 'Direct Instruction', 'Rote Learning'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Curriculum',
    cognitiveLevel: 'Comprehension',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Differentiated instruction systematically alters content, process, products, or environment to accommodate student variance.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-15',
    qNo: 15,
    question: 'Which classroom management style involves students in decision-making?',
    options: ['Autocratic', 'Laissez-faire', 'Democratic', 'Authoritarian'],
    difficulty: 'Medium',
    correctIndex: 2, // c
    subjectMatter: 'Classroom Management',
    cognitiveLevel: 'Comprehension',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Democratic classroom management fosters student ownership, mutual respect, and student participation in co-creating classroom norms.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-16',
    qNo: 16,
    question: 'Summative assessments are typically administered:',
    options: ['At the start of a unit', 'During instruction', 'At the end of a unit or course', 'Only for homework'],
    difficulty: 'Medium',
    correctIndex: 2, // c
    subjectMatter: 'Classroom Assessment',
    cognitiveLevel: 'Comprehension',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Summative assessments evaluate cumulative student learning against benchmark standards at the conclusion of an instructional period.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-17',
    qNo: 17,
    question: "Bloom's Taxonomy is primarily used to:",
    options: ['Rank students', 'Design learning objectives and assessments', 'Manage classroom behavior', 'Assign homework'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Education Policy',
    cognitiveLevel: 'Comprehension',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: "Bloom's Taxonomy organizes cognitive processes into hierarchical levels to guide educators in designing objectives and aligned assessments.",
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-18',
    qNo: 18,
    question: 'Formative assessment helps students by:',
    options: ['Ranking them', 'Identifying learning gaps', 'Punishing low performers', 'Reducing feedback'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Assessment',
    cognitiveLevel: 'Comprehension',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Formative assessment pinpoints specific misunderstandings and learning gaps so both teacher and student can adjust learning pathways.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-19',
    qNo: 19,
    question: 'The key difference between lecture and discussion is:',
    options: ['Student involvement', "Teacher's knowledge", 'Use of textbooks', 'Class size'],
    difficulty: 'Medium',
    correctIndex: 0, // a
    subjectMatter: 'Teaching Style',
    cognitiveLevel: 'Comprehension',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'While lectures are predominantly one-way transmission, discussion demands reciprocal, active student involvement and dialogue.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-20',
    qNo: 20,
    question: 'Auditory learners prefer:',
    options: ['Reading silently', 'Listening and speaking', 'Drawing diagrams', 'Hands-on activities'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Learning Styles',
    cognitiveLevel: 'Comprehension',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Auditory learners process verbal explanations and spoken language best, benefiting from listening, speaking, and group discussions.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-21',
    qNo: 21,
    question: 'What is a potential negative effect of high-stakes testing?',
    options: ['Increased creativity', 'Narrowing of curriculum', 'Reduced student stress', 'Enhanced critical thinking'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Assessment',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'High-stakes testing often causes teachers to narrow the curriculum exclusively to tested subjects and test formats ("teaching to the test").',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-22',
    qNo: 22,
    question: 'How does a lecture-based approach typically affect student engagement?',
    options: ['Increases active participation', 'Decreases active participation', 'Has no effect', 'Increases only for older students'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Teaching Style',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'A predominantly lecture-based approach places students into a passive listening mode, which generally decreases active participation and attention.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-23',
    qNo: 23,
    question: 'What is a challenge of teaching a class with diverse learning styles?',
    options: ['Easier classroom management', "Difficulty meeting all students' needs", 'Less diversity of thought', 'No challenges'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Learning Styles',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Handling varied student profiles makes it challenging for a single teacher to cater to every individual learning modality simultaneously.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-24',
    qNo: 24,
    question: 'A rigid curriculum that ignores individual differences may:',
    options: ['Enhance learning for all', 'Fail to accommodate diverse learners', 'Increase student motivation', 'Reduce teacher workload'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Curriculum',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'A standardized, inflexible curriculum fails to accommodate students with diverse learning paces, backgrounds, and readiness levels.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-25',
    qNo: 25,
    question: 'An autocratic classroom management style tends to:',
    options: ['Increase student autonomy', 'Decrease student autonomy', 'Promote creativity', 'Encourage self-discipline'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Classroom Management',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Strict autocratic discipline imposes top-down control without student consultation, which suppresses student autonomy.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-26',
    qNo: 26,
    question: 'Frequent formative assessments can:',
    options: ['Provide ongoing feedback to improve learning', 'Increase student anxiety only', 'Replace summative assessments', 'Reduce teacher preparation'],
    difficulty: 'Medium',
    correctIndex: 0, // a
    subjectMatter: 'Classroom Assessment',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Continuous low-stakes checks give timely, descriptive feedback that empowers students to rectify errors and master competencies.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-27',
    qNo: 27,
    question: 'A policy emphasizing rote learning over critical thinking may:',
    options: ['Improve problem-solving skills', 'Hinder development of analytical skills', 'Enhance creativity', 'Encourage inquiry'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Education Policy',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Rewarding verbatim recall over deeper inquiry stifles students’ capacity to analyze, synthesize, and solve novel problems.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-28',
    qNo: 28,
    question: 'Assessment can improve instruction by:',
    options: ['Ranking teachers', 'Identifying areas needing instructional improvement', 'Punishing students', 'Reducing feedback'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Assessment',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Diagnostic assessment data informs teachers where lesson explanations fell short, allowing them to reteach and refine pedagogical strategies.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-29',
    qNo: 29,
    question: 'Using a demonstrative teaching style in a theory-heavy course may:',
    options: ['Clarify practical applications', 'Confuse students', 'Reduce understanding', 'Increase boredom'],
    difficulty: 'Medium',
    correctIndex: 0, // a
    subjectMatter: 'Teaching Style',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Showing concrete visual demonstrations bridges abstract theory with tangible physical reality, clarifying practical applications.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-30',
    qNo: 30,
    question: 'A kinesthetic learner in a lecture-only classroom may:',
    options: ['Thrive', 'Struggle to understand', 'Participate more', 'Retain more information'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Learning Styles',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Because kinesthetic learners process concepts through hands-on activity, prolonged stationary listening impedes their comprehension.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-31',
    qNo: 31,
    question: 'High teacher-student ratios often lead to:',
    options: ['More personalized attention', 'Less personalized attention', 'Better discipline', 'Increased group work'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Classroom Management',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Large class sizes dilute teacher bandwidth, resulting in significantly less individual and personalized attention per child.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-32',
    qNo: 32,
    question: 'Not differentiating instruction for diverse learners may result in:',
    options: ['Higher motivation', 'Lower motivation', 'Better test scores', 'Improved relationships'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Curriculum',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'One-size-fits-all instruction alienates struggling students and bores advanced ones, precipitating lower overall student motivation.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-33',
    qNo: 33,
    question: "A teacher's low expectations can:",
    options: ['Lead to a self-fulfilling prophecy', 'Have no effect', 'Motivate students to prove them wrong', 'Improve performance'],
    difficulty: 'Medium',
    correctIndex: 0, // a
    subjectMatter: 'Classroom Assessment',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Under the Pygmalion/Golem effect, low teacher expectations depress student self-esteem and effort, producing poor achievement in a self-fulfilling cycle.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-34',
    qNo: 34,
    question: '"Teaching to the test" may:',
    options: ['Deepen understanding', 'Narrow subject knowledge', 'Improve creativity', 'Encourage independent thinking'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Education Policy',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Drilling only tested items restricts learning breadth, narrowing subject knowledge and neglecting broader life competencies.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-35',
    qNo: 35,
    question: 'A flipped classroom model may:',
    options: ['Increase engagement through active learning', 'Decrease engagement', 'Have no effect', 'Increase homework only'],
    difficulty: 'Medium',
    correctIndex: 0, // a
    subjectMatter: 'Teaching Style',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'By moving initial content ingestion outside class, flipped classrooms dedicate precious in-person time to collaborative, active problem-solving.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-36',
    qNo: 36,
    question: "When teaching style matches a student's learning preference:",
    options: ['Understanding and retention may improve', 'Interest decreases', 'No effect on learning', 'Teacher workload increases'],
    difficulty: 'Medium',
    correctIndex: 0, // a
    subjectMatter: 'Learning Styles',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Harmonizing instructional presentation with learner modalities minimizes cognitive friction, bolstering conceptual retention.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-37',
    qNo: 37,
    question: 'Frequent changes in education policy can:',
    options: ['Stabilize curriculum', 'Cause confusion and instability', 'Have no effect', 'Improve teacher morale'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Education Policy',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Incessant policy shifts disorient school administrators, disrupt curriculum pacing, and breed confusion and instability among educators.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-38',
    qNo: 38,
    question: 'Teacher burnout may lead to:',
    options: ['Improved teaching quality', 'Decreased teaching quality', 'Increased student participation', 'Better rapport'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Classroom Management',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Chronic physical and emotional exhaustion impairs pedagogical creativity, lesson responsiveness, and overall teaching quality.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-39',
    qNo: 39,
    question: 'An assessment that ignores diverse learning styles may:',
    options: ['Improve all scores', 'Disadvantage some students', 'Increase overall performance', 'Encourage variety'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Assessment',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Assessing students through a single narrow format penalizes those whose expressive strengths lie in visual, oral, or practical modalities.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-40',
    qNo: 40,
    question: 'Curriculum overload may result in:',
    options: ['Comprehensive learning', 'Superficial understanding', 'Independent learning', 'No impact'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Curriculum',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Rushing through bloated textbooks forces superficial coverage, leaving little time for deep conceptual grounding.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-41',
    qNo: 41,
    question: 'Technology-integrated lessons in low-resource settings may:',
    options: ['Increase engagement through novelty', 'Decrease engagement due to access issues', 'Have no effect', 'Reduce need for textbooks'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Teaching Style',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'When electrical load-shedding, broken equipment, or device scarcity occur, technology can frustrate learners and diminish engagement.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-42',
    qNo: 42,
    question: 'A "no zero" grading policy may:',
    options: ['Encourage effort', 'Incentivize lack of effort', 'Have no impact', 'Increase focus on non-academics'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Classroom Assessment',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Guaranteeing an artificial minimum grade regardless of missed work can unintentionally incentivize lack of academic effort.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-43',
    qNo: 43,
    question: 'A laissez-faire classroom management style may:',
    options: ['Promote self-discipline', 'Lead to a chaotic environment', 'Enhance relationships', 'Improve academic performance'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Classroom Management',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Laissez-faire leadership lacks clear structure and expectations, which frequently results in a chaotic and unfocused learning space.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-44',
    qNo: 44,
    question: 'Competency-based education allows students to:',
    options: ['Memorize facts', 'Learn at their own pace', 'Compete with peers', 'Avoid fundamental concepts'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Education Policy',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Competency-based education decouples progress from seated time, permitting learners to master skills and advance at their individual pace.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-45',
    qNo: 45,
    question: 'Early high-stakes assessments may:',
    options: ['Foster love for learning', 'Create test anxiety', 'Improve academic performance', 'Reduce extracurricular focus'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Assessment',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Subjecting young children to high-stakes testing induces severe test anxiety and generates aversion toward schooling.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-46',
    qNo: 46,
    question: 'A lecture-centric approach in kindergarten is:',
    options: ['Suitable for discipline', 'Unsuitable due to developmental needs', 'Suitable for retention', 'Unsuitable due to peer interaction'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Teaching Style',
    cognitiveLevel: 'Evaluative',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Kindergarten children require concrete, sensory, play-based experiences; prolonged lecture instruction is developmentally inappropriate.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-47',
    qNo: 47,
    question: 'Using a single standardized test as the sole measure of intelligence is:',
    options: ['Effective for all', 'Ineffective as it ignores diverse intelligences', 'Effective for learning styles', 'Ineffective as it encourages rote learning'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Assessment',
    cognitiveLevel: 'Evaluative',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Human intelligence encompasses diverse modalities (spatial, musical, interpersonal, kinesthetic); single tests ignore these dimensions.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-48',
    qNo: 48,
    question: 'Modifying teaching style to accommodate various learning styles is:',
    options: ['Suitable as it caters to all students', 'Unsuitable as it complicates teaching', 'Suitable for rote learning', 'Unsuitable for large classes'],
    difficulty: 'Medium',
    correctIndex: 0, // a
    subjectMatter: 'Learning Styles',
    cognitiveLevel: 'Evaluative',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Differentiating teaching modalities ensures multimodal equity, allowing all learners opportunities to engage and succeed.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-49',
    qNo: 49,
    question: 'A "no homework" policy may have:',
    options: ['Positive effect by reducing stress', 'Negative effect by reducing practice', 'Positive effect by encouraging independence', 'Negative effect by enhancing understanding'],
    difficulty: 'Medium',
    correctIndex: 1, // b
    subjectMatter: 'Education Policy',
    cognitiveLevel: 'Evaluative',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Completely eliminating homework can reduce independent consolidation and deliberate practice opportunities needed for skill mastery.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-past-2024-mcq-50',
    qNo: 50,
    question: 'Implementing a differentiated curriculum in a diverse classroom is:',
    options: ['Fitting as it meets individual needs', 'Unfitting as it is too difficult', 'Fitting as it encourages competition', 'Unfitting as it causes confusion'],
    difficulty: 'Medium',
    correctIndex: 0, // a
    subjectMatter: 'Curriculum',
    cognitiveLevel: 'Evaluative',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Differentiated curricula honor diversity by aligning challenges with individual learner readiness and learning styles.',
    category: 'STS IBA Teaching License Test',
  },
];
