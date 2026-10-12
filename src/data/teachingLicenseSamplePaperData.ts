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
  id: 'erq-case-study-1',
  section: 'Section 1: Case Study Analysis',
  title: 'Grade 5 Mathematics in Rural Low-Resource Classroom (Ms. Zehra Case)',
  subjectMatter: 'Dynamic Teaching',
  level: 'Analysis & Evaluation',
  marks: 100,
  weightagePercent: 25,
  timeMinutes: 50,
  scenario: `In a rural school in Pakistan, a Grade 5 teacher, Ms. Zehra, notices that several of her students are consistently underperforming in Math. Most of these students come from socio-economically disadvantaged backgrounds and have limited support at home.

Despite her best efforts, Ms. Zehra finds it challenging to engage these students, and she struggles to help them catch up with the rest of the class. She has tried different strategies such as differentiated instruction, peer tutoring, and additional practice exercises, but she has yet to see a significant improvement in their performance.

Additionally, Ms. Zehra's class has students with different learning styles and abilities, further complicating her efforts to provide individual attention.`,
  prompt: `As an aspiring teacher applying for licensure, how would you advise Ms. Zehra to address this situation effectively? Provide a detailed plan, considering classroom diversity, limited resources, and the social background of the students.`,
  rubric: [
    {
      criterion: 'Understanding of the Problem',
      maxPoints: 20,
      description: 'Does the candidate demonstrate a comprehensive understanding of the problem, including the contextual factors affecting student performance?',
    },
    {
      criterion: 'Solution and Strategies',
      maxPoints: 40,
      description: 'Does the candidate propose a feasible and effective solution to the problem? Do they suggest specific teaching strategies that are appropriate for the context and the learning needs of the students?',
    },
    {
      criterion: 'Consideration of Diversity and Equity',
      maxPoints: 20,
      description: 'Does the candidate’s plan consider the diverse learning styles and abilities in the classroom? Do they propose strategies to promote equity and inclusion, particularly for the disadvantaged students?',
    },
    {
      criterion: 'Resource Management',
      maxPoints: 10,
      description: 'Does the candidate consider the limitation of resources in their plan? Do they suggest strategies that are feasible in a low-resource setting?',
    },
    {
      criterion: 'Communication and Clarity',
      maxPoints: 10,
      description: 'Is the candidate’s response well-structured, clear, and coherent? Do they communicate their ideas effectively?',
    },
  ],
  modelAnswer: {
    title: 'Advisory Plan for Ms. Zehra: A Holistic, Contextualized Intervention for Underperforming Rural Grade 5 Math Students',
    sections: [
      {
        heading: '1. Diagnostic Problem Analysis & Contextual Understanding',
        rubricMapped: 'Understanding of the Problem (20 Points)',
        pointsAwarded: '20/20',
        content: [
          'Root-Cause Diagnostic: Ms. Zehra’s underperforming students face systemic socio-economic barriers. Disadvantaged rural households often suffer from low parental literacy, lack of learning materials, domestic responsibilities after school, and math anxiety caused by prior foundational learning gaps.',
          'Pedagogical Mismatch: Although Ms. Zehra attempted differentiated instruction and peer tutoring, these interventions likely failed because they lacked granular diagnostic baselines (e.g. students may lack Grade 2-3 number sense and place value mastery) and were disconnected from culturally relatable contexts.',
          'Affective Barrier: When struggling students are singled out for repetitive "extra practice," their self-efficacy plummets, triggering withdrawal and learned helplessness.',
        ],
      },
      {
        heading: '2. Targeted Pedagogical Framework & Actionable Solutions',
        rubricMapped: 'Solution and Strategies (40 Points)',
        pointsAwarded: '40/40',
        content: [
          'Concrete-Representational-Abstract (CRA) Sequence: Shift from abstract rote textbook exercises to Bruner’s CPA framework. Introduce math concepts using physical manipulatives before moving to pictorial drawings, and finally abstract numbers.',
          'Micro-Scaffolding & Guided Goal Setting: Break complex Grade 5 math competencies (e.g. fractions, decimals, unitary method) into 5-minute bite-sized mastery steps. Provide visual scaffolds, such as number lines and step-by-step cue cards.',
          'Culturally Relevant Mathematics: Anchor mathematical word problems into the rural community context—such as local village bazaars, crop yields, measuring land boundaries, livestock counts, and household budgeting. This renders mathematics immediately purposeful and intuitive.',
          'Reciprocal Peer Learning Circles: Restructure peer tutoring into structured, collaborative problem-solving pairs with assigned roles (e.g., Reader, Explainer, Checker), avoiding labeling one child as "weak" and the other as "advanced".',
        ],
      },
      {
        heading: '3. Fostering Equity, Diversity & Multimodal Learning',
        rubricMapped: 'Consideration of Diversity and Equity (20 Points)',
        pointsAwarded: '20/20',
        content: [
          'Multimodal Learning Integration: Incorporate visual cues (colored chalk diagrams, fraction walls), auditory learning (rhythmic math chants, math talks), and kinesthetic activities (measuring classroom steps, floor grid jumping).',
          'Growth-Mindset & Asset-Based Recognition: Reframe student identity by celebrating error analysis as a learning opportunity. Implement a "Mistake of the Day" discussion where errors are de-stigmatized and analyzed collaboratively.',
          'Equal Voice in Questioning: Use low-stakes response methods (thumbs-up/thumbs-down, individual chalk slates) so disadvantaged students are never excluded from participating.',
        ],
      },
      {
        heading: '4. Low-Cost, High-Impact Resource Management in Rural Settings',
        rubricMapped: 'Resource Management (10 Points)',
        pointsAwarded: '10/10',
        content: [
          'Zero-Cost Manipulatives (TLMs): Replace expensive commercial math kits with readily available local materials: stones, tamarind seeds, bottle caps for counting and place values; sticks and strings for geometry and perimeter; clay for 3D shapes; discarded cardboard for fraction discs.',
          'Chalk Slates & Community Storytelling: Utilize portable slate boards or sand trays for quick iterative feedback, eliminating dependency on paper or notebooks.',
          'Community Elder & Mother Engagement: Partner with local Mothers’ Support Groups or School Management Committees (SMCs) to explain math concepts orally, ensuring parents can support through daily practical chores without requiring formal literacy.',
        ],
      },
      {
        heading: '5. Structured Implementation & Progress Monitoring',
        rubricMapped: 'Communication and Clarity (10 Points)',
        pointsAwarded: '10/10',
        content: [
          'Week 1–2: Baseline diagnostic assessment using oral and concrete tasks; establish respectful math talk norms.',
          'Week 3–6: Daily 15-minute CRA foundational workshops with indigenous manipulatives and localized word problems.',
          'Week 7–8: Formative portfolio checks; celebrating incremental mastery milestones and evaluating growth.',
        ],
      },
    ],
  },
};

export const SAMPLE_PAPER_CRQS: CRQItem[] = [
  {
    qNo: 1,
    subjectMatter: 'Instruction Differentiation',
    level: 'Comprehension and analysis',
    marks: 15,
    weightagePercent: 5,
    question: `Elaborate on your approach to handle the diversity of learning abilities in a classroom. Illustrate your response with two distinct strategies that would cater to such variability`,
    rubric: {
      point1: 'Assess understanding of differentiated instruction (5 points)',
      point2: 'Practical application through strategies (5 points)',
      point3: 'How they support diverse learners (5 points)',
    },
    modelAnswer: {
      summary: 'Differentiated instruction is a proactive pedagogical approach where the teacher modifies content, process, product, and the learning environment according to students’ readiness, interests, and learning profiles.',
      keyPoints: [
        'Strategy 1: Tiered Assignment Tasks (Differentiation by Readiness) — Design a single core objective with three tiered levels of challenge. Tier 1 (Foundational) provides guided graphic organizers and sentence starters for struggling learners; Tier 2 (Standard) requires independent synthesis; Tier 3 (Advanced) challenges high-flyers with open-ended creative extensions.',
        'Strategy 2: Choice Boards / RAFT Menus (Differentiation by Learning Profile & Interest) — Provide a grid of task options catering to different modalities (e.g., write a poem, construct a diagram, deliver a speech, or solve a puzzle to demonstrate understanding).',
      ],
      practicalApplication: 'In a Pakistani elementary classroom, tiered tasks ensure no student feels overwhelmed or stagnant, maintaining equitable academic rigour while honoring individual pacing.',
    },
  },
  {
    qNo: 2,
    subjectMatter: 'Active Learning Principle',
    level: 'Comprehension and analysis',
    marks: 15,
    weightagePercent: 5,
    question: `Clarify John Dewey's 'learning by doing' principle. How can you operationalize this in a practical teaching situation where resources may be limited?`,
    rubric: {
      point1: 'Explanation of Dewey’s principle (5 points)',
      point2: 'Application to real-world scenario (5 points)',
      point3: 'Resource constraint considerations (5 points)',
    },
    modelAnswer: {
      summary: 'John Dewey posited that true education is an experiential, reflective process wherein learners acquire enduring knowledge by actively engaging with real-world problems and reflecting upon the outcomes of their actions.',
      keyPoints: [
        'Deweyan Philosophy: Passive lecture transmission leads to inert knowledge. In contrast, "learning by doing" combines physical action with critical inquiry, scientific thinking, and democratic community participation.',
        'Operationalization in Low-Resource Schools: In an environmental science lesson on soil erosion, students conduct outdoor observations in the school courtyard using empty plastic bottles, soil, and rainwater runoff rather than reading textbook definitions.',
      ],
      practicalApplication: 'By utilizing free natural materials (leaves, soil, shadows) and guided inquiry, students transform everyday surroundings into active living laboratories without spending financial resources.',
    },
  },
  {
    qNo: 3,
    subjectMatter: 'Instructional Planning',
    level: 'Comprehension and analysis',
    marks: 15,
    weightagePercent: 5,
    question: `Imagine you have to impart the concept of photosynthesis to a class of fifth graders. Draft a detailed lesson plan, including objectives, instructional methods, and evaluation techniques`,
    rubric: {
      point1: 'Clear learning objectives (5 points)',
      point2: 'Appropriate teaching strategies (5 points)',
      point3: 'Valid assessment methods (5 points)',
    },
    modelAnswer: {
      summary: 'A 45-minute lesson plan aligned with Class 5 General Science (DCAR/STBB curriculum) utilizing the 5E Instructional Model.',
      keyPoints: [
        'Learning Objectives (SMART): 1) Identify the 3 key raw materials needed for photosynthesis (Sunlight, Water, Carbon Dioxide) with 100% accuracy. 2) Explain how plants produce glucose and release oxygen using a simple diagram.',
        'Instructional Methodology (5E): Engage with a potted plant kept in a dark box vs sunlight; Explore by observing leaf veins and stomata using a magnifying glass; Explain through interactive role-play where students act as roots, leaves, and sunbeams; Elaborate by discussing why forests are the "lungs of Earth".',
      ],
      practicalApplication: 'Formative Assessment: Quick "Exit Ticket" where each student sketches the photosynthesis recipe; Summative Check: 3-question visual multiple choice quiz.',
    },
  },
  {
    qNo: 4,
    subjectMatter: 'Classroom Challenges',
    level: 'Comprehension and analysis',
    marks: 15,
    weightagePercent: 5,
    question: `Portray a possible scenario involving a difficult classroom situation, like disruptive behavior. Propose a comprehensive solution, aligning with best classroom management practices`,
    rubric: {
      point1: 'Scenario’s realism and relevance (5 points)',
      point2: 'Solution’s effectiveness (5 points)',
      point3: 'Alignment with best practices (5 points)',
    },
    modelAnswer: {
      summary: 'Realistic Scenario: During independent seatwork, an energetic student named Ahmed continuously interrupts peers, talks loudly, and throws paper balls across the room to seek attention.',
      keyPoints: [
        'Immediate De-escalation (Jacob Kounin & Curwin-Mendler): Avoid public confrontation or yelling. Use non-verbal proximity control—walk quietly near Ahmed while maintaining instruction. Issue a low-voice, private reminder of classroom norms.',
        'Root-Cause Investigation: Hold a private two-minute check-in after class. Discover whether the disruption is driven by academic frustration (task is too hard) or boredom (task already finished).',
        'Long-term Preventive Structure: Give Ahmed an active classroom responsibility (e.g., distributing worksheets, timing activities). Institute positive reinforcement for sustained on-task focus.',
      ],
      practicalApplication: 'Maintains classroom dignity, protects instructional flow, and redirects disruptive energy into constructive leadership.',
    },
  },
  {
    qNo: 5,
    subjectMatter: 'Policy Critique and Proposal',
    level: 'Comprehension and analysis',
    marks: 15,
    weightagePercent: 5,
    question: `Reflect on Pakistan's existing education policies and pinpoint one that could be enhanced. Justify your selection and propose necessary modifications to optimally support student learning`,
    rubric: {
      point1: 'Valid choice of policy (5 points)',
      point2: 'Justification (5 points)',
      point3: 'Proposed modifications’ efficacy (5 points)',
    },
    modelAnswer: {
      summary: 'Policy Focus: The Examination Assessment & Licensing Framework under National Education Policy / Provincial Assessment Policies, specifically the over-reliance on high-stakes rote memorization terminal examinations.',
      keyPoints: [
        'Justification: Traditional terminal examinations prioritize rote memorization (Rattta culture) over critical thinking, conceptual mastery, and pedagogical problem-solving. This discourages student creativity and leads to high anxiety and dropouts.',
        'Proposed Modifications: 1) Institutionalize continuous formative assessment (30% weightage allocated to portfolio, projects, and oral assessments). 2) Introduce standardized Constructed Response Questions (CRQs) and Bloom-aligned conceptual testing at elementary school levels.',
      ],
      practicalApplication: 'Shifts classrooms from memorization cramming to inquiry, genuine competency, and lifelong learning.',
    },
  },
  {
    qNo: 6,
    subjectMatter: 'Educational Ethics',
    level: 'Comprehension and analysis',
    marks: 15,
    weightagePercent: 5,
    question: `Delve into the ethical aspects a teacher should consider when handling students' private information. Use a hypothetical case to elucidate your perspective`,
    rubric: {
      point1: 'Understanding of ethical considerations (5 points)',
      point2: 'Hypothetical case’s relevance (5 points)',
      point3: 'Appropriate handling in the case (5 points)',
    },
    modelAnswer: {
      summary: 'Teachers hold a fiduciary and legal responsibility to safeguard students’ privacy, medical records, domestic vulnerabilities, and academic assessments under professional codes of conduct.',
      keyPoints: [
        'Hypothetical Case: A Grade 6 student, Sana, confides in her teacher that her family is undergoing severe domestic distress and poverty, which explains her recent uncompleted homework.',
        'Ethical Dilemma: Sharing this sensitive detail in the staff room gossip violates student trust, causes humiliation, and stigmatizes the child.',
        'Professional Response: Maintain strict confidentiality. Document necessary factual accommodations privately; collaborate only with designated school counselors, administration, or welfare support on a strict need-to-know basis.',
      ],
      practicalApplication: 'Preserves the psychological safety of the child, upholding NPSTP Standard 8 (Professional Ethics).',
    },
  },
  {
    qNo: 7,
    subjectMatter: 'Cultural Inclusion',
    level: 'Comprehension and analysis',
    marks: 15,
    weightagePercent: 5,
    question: `Recognizing the cultural diversity in Pakistani classrooms, discuss the significance of cultural competency for a teacher. Outline at least two techniques you'd employ to foster an inclusive classroom environment`,
    rubric: {
      point1: 'Understanding of cultural competency’s importance (5 points)',
      point2: 'Techniques for inclusion (5 points)',
      point3: 'Techniques’ effectiveness in promoting inclusion (5 points)',
    },
    modelAnswer: {
      summary: 'Pakistani classrooms are rich tapestries of ethnolinguistic diversity (Sindhi, Urdu, Punjabi, Pashto, Balochi, Seraiki, Hindko, and minority communities). Cultural competency is essential to eradicate bias and ensure equity.',
      keyPoints: [
        'Significance: When a teacher validates learners’ mother tongues and cultural heritages, students develop self-worth, mutual tolerance, and high cognitive engagement.',
        'Technique 1: Multilingual Bridges & Cultural Showcases — Incorporate regional folk proverbs, stories, and welcoming words in various native languages during morning meetings.',
        'Technique 2: Culturally Responsive Learning Materials — Select literature and examples representing diverse Pakistani communities and backgrounds rather than a monocultural lens.',
      ],
      practicalApplication: 'Prevents linguistic alienation, builds national harmony, and nurtures mutual empathy among students.',
    },
  },
  {
    qNo: 8,
    subjectMatter: 'Teaching Philosophy Statement',
    level: 'Comprehension and analysis',
    marks: 15,
    weightagePercent: 5,
    question: `Craft a declaration that encapsulates your philosophy of teaching. Your statement should reflect your perceptions about learners, the teacher's role, the learning process, and education's purpose`,
    rubric: {
      point1: 'Understanding of key elements of teaching philosophy (5 points)',
      point2: 'Clear articulation (5 points)',
      point3: 'Alignment with best practices in education (5 points)',
    },
    modelAnswer: {
      summary: 'A personal teaching philosophy rooted in humanistic constructivism, active inquiry, and democratic empowerment.',
      keyPoints: [
        'The Learner: Every child enters the classroom with inherent potential, unique cultural intelligence, and curiosity waiting to be ignited.',
        'The Teacher’s Role: The educator is not an authoritarian fountain of knowledge, but a compassionate facilitator, reflective mentor, and scaffold builder.',
        'The Learning Process: Learning is an interactive, experiential dialogue where critical questions, trial-and-error, and collaborative discovery take precedence over passive memorization.',
        'The Purpose of Education: To empower ethical, empathetic citizens capable of critical thought, social justice, and contributing constructively to their communities.',
      ],
      practicalApplication: 'Guides every daily instructional decision, assessment design, and relational interaction within the classroom.',
    },
  },
  {
    qNo: 9,
    subjectMatter: 'Digital Education Implementation',
    level: 'Comprehension and analysis',
    marks: 15,
    weightagePercent: 5,
    question: `Consider the influence of digital tools in the contemporary educational setting. Discuss the advantages and limitations that this presents, specifically within the context of rural Pakistani schools. Suggest at least two instances where you would incorporate technology in your teaching to augment learning outcomes.`,
    rubric: {
      point1: 'Understanding of digital technology’s impact (5 points)',
      point2: 'Consideration of specific challenges in rural Pakistani schools (5 points)',
      point3: 'Concrete examples of technology integration in teaching (5 points)',
    },
    modelAnswer: {
      summary: 'Digital technology can democratize learning, but in rural Pakistan it encounters severe infrastructural constraints (load shedding, internet scarcity, lack of hardware).',
      keyPoints: [
        'Advantages & Rural Limitations: Digital media makes abstract concepts visible (solar system, human heart), but high hardware costs and electricity cuts pose constant challenges.',
        'Integration Instance 1: Offline Digital Audio/Visual Kits on Solar Tablets / Smart Phones — Pre-download high-definition educational video animations (e.g., Taleemabad or STBB multimedia modules) on a solar-charged smartphone or offline projector to illustrate scientific phenomena.',
        'Integration Instance 2: WhatsApp Community Micro-Learning — Share 60-second voice notes and photo challenges with parents and older siblings to reinforce daily math and reading exercises at home.',
      ],
      practicalApplication: 'Overcomes connectivity deficits through resilient, low-bandwidth, offline-first digital pedagogy.',
    },
  },
  {
    qNo: 10,
    subjectMatter: 'Parental Involvement Strategy',
    level: 'Comprehension and analysis',
    marks: 15,
    weightagePercent: 5,
    question: `Outline a thorough plan to involve parents more deeply in their children's educational journey. How can you foster parental involvement in a culturally diverse and economically disadvantaged community? Be sure to identify potential obstacles and suggest ways to tackle them`,
    rubric: {
      point1: 'Understanding of parental engagement’s importance (5 points)',
      point2: 'Consideration of cultural diversity and economic challenges (5 points)',
      point3: 'Identification of potential barriers and viable solutions (5 points)',
    },
    modelAnswer: {
      summary: 'Parental engagement is one of the strongest predictors of student retention and achievement, especially in vulnerable rural and low-income communities.',
      keyPoints: [
        'Key Barriers in Disadvantaged Communities: Parental illiteracy, long working hours (daily wage earners), intimidation by formal school settings, and language differences.',
        'Inclusive Engagement Strategies: 1) Flexible "Open Door" Coffee/Tea Mornings scheduled on non-working days or evenings. 2) Non-Written Communication: Utilize voice notes, phone calls, and visual student portfolios rather than written progress notes.',
        'Valuing Home Knowledge: Invite parents to share local crafts, agricultural wisdom, and oral history in class, honoring their cultural contributions.',
      ],
      practicalApplication: 'Builds a trusting home-school partnership that transforms parents from passive spectators into enthusiastic educational allies.',
    },
  },
];

export const SAMPLE_PAPER_MCQS: SamplePaperMCQ[] = [
  {
    id: 'tl-sample-mcq-1',
    qNo: 1,
    question: 'How do living organisms obtain energy?',
    options: ['Photosynthesis', 'Cellular respiration', 'Both a and b', 'None of the above'],
    difficulty: "Medium",
    correctIndex: 2, // c
    subjectMatter: 'Content knowledge',
    cognitiveLevel: 'Content knowledge',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Living organisms obtain energy either directly through photosynthesis (autotrophs like plants) or through cellular respiration (both plants and animals breaking down glucose to release ATP). Therefore, both a and b are correct.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-2',
    qNo: 2,
    question: 'What are the building blocks of proteins?',
    options: ['Nucleotides', 'Amino acids', 'Monosaccharides', 'Fatty acids'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Content knowledge',
    cognitiveLevel: 'Content knowledge',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Proteins are polymers composed of amino acids joined together by peptide bonds. Nucleotides make up nucleic acids, monosaccharides form carbohydrates, and fatty acids form lipids.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-3',
    qNo: 3,
    question: 'Which of the following numbers is a prime number?',
    options: ['21', '22', '23', '24'],
    difficulty: "Medium",
    correctIndex: 2, // c
    subjectMatter: 'Content knowledge',
    cognitiveLevel: 'Content knowledge',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'A prime number is only divisible by 1 and itself. 21 is divisible by 3 and 7; 22 by 2 and 11; 24 by 2, 3, 4, 6, 8, 12. Only 23 has exactly two factors (1 and 23).',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-4',
    qNo: 4,
    question: 'What happens to the density of a material when its volume increases and mass remains constant?',
    options: ['Increases', 'Decreases', 'Remains the same', 'Doubles'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Content knowledge',
    cognitiveLevel: 'Content knowledge',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Density is defined as Mass divided by Volume (D = M / V). When volume increases while mass remains constant, the denominator increases, which causes density to decrease.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-5',
    qNo: 5,
    question: 'How would you express the number 0.007 in scientific notation?',
    options: ['7x10^-2', '7x10^-3', '7x10^-4', '7x10^-5'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Content knowledge',
    cognitiveLevel: 'Content knowledge',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Moving the decimal point 3 places to the right gives 7.0 × 10^-3.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-6',
    qNo: 6,
    question: "The moon's gravitation pull is responsible for which Earth phenomenon?",
    options: ['Earthquakes', 'Wind', 'Tides', 'Seasons'],
    difficulty: "Medium",
    correctIndex: 2, // c
    subjectMatter: 'Content knowledge',
    cognitiveLevel: 'Content knowledge',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: "The gravitational pull of the moon (and sun) on Earth's oceans creates high and low ocean tides.",
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-7',
    qNo: 7,
    question: 'What is the probability of rolling an odd number on a standard six-sided die?',
    options: ['1/2', '1/3', '2/3', '1/6'],
    difficulty: "Medium",
    correctIndex: 0, // a
    subjectMatter: 'Content knowledge',
    cognitiveLevel: 'Content knowledge',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'A standard die has 6 faces: 1, 2, 3, 4, 5, 6. The odd numbers are {1, 3, 5} (3 outcomes). Probability = 3/6 = 1/2.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-8',
    qNo: 8,
    question: 'Which substance is a good conductor of electricity?',
    options: ['Rubber', 'Wood', 'Copper', 'Plastic'],
    difficulty: "Medium",
    correctIndex: 2, // c
    subjectMatter: 'Content knowledge',
    cognitiveLevel: 'Content knowledge',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Copper is a metal with free delocalized valence electrons, making it an excellent electrical conductor. Rubber, wood, and plastic are insulators.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-9',
    qNo: 9,
    question: 'What is the value of √49?',
    options: ['5', '6', '7', '8'],
    difficulty: "Medium",
    correctIndex: 2, // c
    subjectMatter: 'Content knowledge',
    cognitiveLevel: 'Content knowledge',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'The principal square root of 49 is 7, since 7 × 7 = 49.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-10',
    qNo: 10,
    question: 'The process by which plants lose water is called?',
    options: ['Photosynthesis', 'Respiration', 'Transpiration', 'Perspiration'],
    difficulty: "Medium",
    correctIndex: 2, // c
    subjectMatter: 'Content knowledge',
    cognitiveLevel: 'Content knowledge',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Transpiration is the evaporative loss of water vapor from the aerial parts of plants, predominantly through stomata on leaves.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-11',
    qNo: 11,
    question: 'What is the primary purpose of assessment in education?',
    options: ['To rank students', "To understand students' progress", 'To punish students', 'None of the above'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Comprehension',
    cognitiveLevel: 'Comprehension',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: "Modern educational assessment is primarily designed to understand students' progress, diagnose learning gaps, and guide instructional improvement.",
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-12',
    qNo: 12,
    question: 'Which teaching style promotes active learning?',
    options: ['Lecture', 'Drill', 'Discussion', 'Demonstration'],
    difficulty: "Medium",
    correctIndex: 2, // c
    subjectMatter: 'Comprehension',
    cognitiveLevel: 'Comprehension',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Discussion fosters two-way dialogue, peer inquiry, and collaborative meaning-making, directly engaging students in active learning.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-13',
    qNo: 13,
    question: 'What is a characteristic of the visual learning style?',
    options: ['Prefers spoken instructions', 'Prefers written instructions', 'Prefers hands-on instructions', 'None of the above'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Comprehension',
    cognitiveLevel: 'Comprehension',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Visual learners absorb information best through seeing—such as written text, charts, diagrams, and graphic organizers.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-14',
    qNo: 14,
    question: 'The process of adapting learning to meet the unique needs of students is called what?',
    options: ['Differentiated Instruction', 'Flipped Classroom', 'Inquiry-based Learning', 'Problem-based Learning'],
    difficulty: "Medium",
    correctIndex: 0, // a
    subjectMatter: 'Comprehension',
    cognitiveLevel: 'Comprehension',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Differentiated instruction systematically modifies content, process, product, and environment according to student variance.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-15',
    qNo: 15,
    question: 'Which classroom management style focuses on maintaining order and obedience?',
    options: ['Authoritative', 'Democratic', 'Laissez-faire', 'Autocratic'],
    difficulty: "Medium",
    correctIndex: 3, // d
    subjectMatter: 'Comprehension',
    cognitiveLevel: 'Comprehension',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'An autocratic (authoritarian) management style enforces rigid discipline, unquestioned obedience, and teacher-centric control.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-16',
    qNo: 16,
    question: 'Summative assessments are typically given...',
    options: ['at the beginning of the learning process', 'during the learning process', 'at the end of the learning process', 'none of the above'],
    difficulty: "Medium",
    correctIndex: 2, // c
    subjectMatter: 'Comprehension',
    cognitiveLevel: 'Comprehension',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Summative assessments occur at the culmination of an instructional unit or term to evaluate cumulative learning outcomes against standards.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-17',
    qNo: 17,
    question: "What is the function of Bloom's taxonomy in education?",
    options: ['To rank students', 'To guide educators in planning and assessment', 'To discipline students', 'None of the above'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Comprehension',
    cognitiveLevel: 'Comprehension',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: "Bloom's taxonomy classifies cognitive levels from lower-order (remembering) to higher-order (creating) to guide curriculum objectives, lesson design, and balanced assessment.",
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-18',
    qNo: 18,
    question: 'How does formative assessment support student learning?',
    options: ['By ranking students', 'By identifying areas of difficulty', 'By punishing underperformers', 'None of the above'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Comprehension',
    cognitiveLevel: 'Comprehension',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Formative assessment provides ongoing diagnostic feedback during instruction, identifying specific misconceptions so teachers and students can adapt.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-19',
    qNo: 19,
    question: 'What is the major factor that differentiates a lecture from a discussion teaching style?',
    options: ['Student involvement', "The teacher's involvement", 'Use of technology', 'The size of the class'],
    difficulty: "Medium",
    correctIndex: 0, // a
    subjectMatter: 'Comprehension',
    cognitiveLevel: 'Comprehension',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Lectures are predominantly one-way teacher dissemination, whereas discussions center on active student participation and peer exchange.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-20',
    qNo: 20,
    question: 'Auditory learners typically benefit from...',
    options: ['Listening to lectures', 'Reading books', 'Manipulating objects', 'Visual demonstrations'],
    difficulty: "Medium",
    correctIndex: 0, // a
    subjectMatter: 'Comprehension',
    cognitiveLevel: 'Comprehension',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Auditory learners retain concepts best through listening to spoken explanations, oral discussions, and verbal repetition.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-21',
    qNo: 21,
    question: 'Analyze the implications of a high-stakes testing policy on student learning outcomes.',
    options: ['Increases intrinsic motivation', 'May encourage narrow focus on tested subjects', 'Encourages a variety of teaching methods', 'Reduces stress levels'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Analytical',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'High-stakes tests often lead to curriculum narrowing ("teaching to the test"), neglecting untested subjects and deeper critical thinking.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-22',
    qNo: 22,
    question: 'Considering various teaching styles, how might a predominantly lecture-based approach impact student engagement?',
    options: ['Increases student participation', 'Decreases student participation', 'No effect on student participation', 'Only affects participation in older students'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Analytical',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Predominantly passive listening without interaction significantly diminishes attention spans and decreases active student participation.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-23',
    qNo: 23,
    question: 'Analyze the potential disadvantage of teaching a class where multiple learning styles are present.',
    options: ['Easier classroom management', 'Less diversity of thought', "Challenges in meeting each student's needs", 'No potential disadvantages'],
    difficulty: "Medium",
    correctIndex: 2, // c
    subjectMatter: 'Analytical',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Wide learner variance places complex demands on instructional planning, making it challenging for teachers to personalize learning simultaneously.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-24',
    qNo: 24,
    question: 'What could be the potential drawback of a rigid curriculum that does not allow for flexibility?',
    options: ['It facilitates student comprehension', 'It does not accommodate individual learning needs', 'It discourages teachers from introducing new material', 'It discourages students from participating'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Analytical',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'A lockstep, rigid curriculum ignores differences in student pacing, prior knowledge, and unique learning requirements.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-25',
    qNo: 25,
    question: 'Analyze the effect of an autocratic management style on student behavior.',
    options: ['Increases student autonomy', 'Decreases student autonomy', 'Promotes creativity', 'No effect on student behavior'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Analytical',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Autocratic teaching suppresses student choice, critical questioning, and independent self-regulation, thereby decreasing autonomy.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-26',
    qNo: 26,
    question: 'How might frequent formative assessments influence the learning process?',
    options: ['They provide regular feedback to improve learning', 'They increase student stress', 'They decrease student engagement', 'They have no influence on the learning process'],
    difficulty: "Medium",
    correctIndex: 0, // a
    subjectMatter: 'Analytical',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Frequent low-stakes checks provide immediate, constructive feedback that helps learners recognize and correct gaps before summative exams.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-27',
    qNo: 27,
    question: 'Analyze the impact of an education policy that emphasizes rote learning over critical thinking.',
    options: ['Enhances creative thinking skills', 'Fosters understanding of complex topics', 'May lead to lack of problem-solving skills', 'Encourages self-directed learning'],
    difficulty: "Medium",
    correctIndex: 2, // c
    subjectMatter: 'Analytical',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Rote memorization trains mechanical recall of facts without deep conceptual comprehension, producing graduates who struggle to solve real-world problems.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-28',
    qNo: 28,
    question: 'How can assessment be used as a tool for improving instruction?',
    options: ['By measuring teacher performance', 'By providing insights into areas of instruction that need improvement', 'By ranking students', 'It cannot be used to improve instruction'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Analytical',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Analyzing assessment data highlights which concepts students misunderstood, enabling teachers to reteach and adjust instructional methods.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-29',
    qNo: 29,
    question: 'What might be the impact on student learning if a teacher adopts a demonstrative teaching style in a theory-intensive course?',
    options: ['It may enhance understanding of practical applications', 'It may confuse students', 'It may make students bored', 'It may enhance memorization of theory'],
    difficulty: "Medium",
    correctIndex: 0, // a
    subjectMatter: 'Analytical',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Demonstrations anchor abstract theoretical principles to tangible physical models and real-life applications.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-30',
    qNo: 30,
    question: 'Given a student with a kinesthetic learning style, how might a classroom focused primarily on lectures affect their learning experience?',
    options: ['Enhances understanding', 'Reduces understanding', 'No effect on understanding', 'Encourages more class participation'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Analytical',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Kinesthetic learners thrive on physical movement and tactile manipulation; stationary passive listening reduces their comprehension.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-31',
    qNo: 31,
    question: 'What could be the impact of high teacher-student ratios in a classroom?',
    options: ['Improved personalized attention', 'Increased classroom discipline', 'Diminished personalized attention', 'Enhanced group activities'],
    difficulty: "Medium",
    correctIndex: 2, // c
    subjectMatter: 'Analytical',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Overcrowded classrooms limit a teacher’s time and ability to diagnose and support individual student needs.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-32',
    qNo: 32,
    question: 'What are the potential consequences of not differentiating instruction for diverse learners?',
    options: ['Increased student motivation', 'Lower student motivation', 'Better standardized test scores', 'Improved teacher-student relationships'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Analytical',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'When lessons are either too hard or too easy, students experience frustration or disengagement, sharply lowering motivation.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-33',
    qNo: 33,
    question: "How might a teacher's low expectation affect student performance?",
    options: ['It could lead to a self-fulfilling prophecy', 'It has no effect on performance', 'It increases the student’s motivation to prove the teacher wrong', 'It increases overall classroom performance'],
    difficulty: "Medium",
    correctIndex: 0, // a
    subjectMatter: 'Analytical',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'The Pygmalion / Golem effect shows that low teacher expectations subtly decrease instructional support, leading students to internalize low standards.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-34',
    qNo: 34,
    question: 'Analyze the potential impact of a policy of "teaching to the test".',
    options: ['Improves depth of understanding', 'May lead to narrow subject knowledge', 'Improves creativity', 'Encourages independent thinking'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Analytical',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Teaching solely to the test restricts education to predictable item formats and shallow memorization of tested facts.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-35',
    qNo: 35,
    question: 'How might the implementation of a flipped classroom model affect student engagement?',
    options: ['May increase engagement through active learning', 'May decrease engagement due to lack of direction', 'Has no effect on student engagement', 'Increases the need for homework'],
    difficulty: "Medium",
    correctIndex: 0, // a
    subjectMatter: 'Analytical',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'In a flipped classroom, lecture content is covered before class, freeing face-to-face class time for high-engagement discussions, simulations, and group problem-solving.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-36',
    qNo: 36,
    question: "What is the potential impact on learning when a student's preferred learning style aligns with the teaching style employed?",
    options: ['May enhance understanding and retention', 'Decreases student interest', 'No effect on learning', 'Increases teacher workload'],
    difficulty: "Medium",
    correctIndex: 0, // a
    subjectMatter: 'Analytical',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Alignment between presentation modality and learner preferences reduces cognitive load, enhancing comprehension and retention.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-37',
    qNo: 37,
    question: 'How could frequent changes in educational policy affect teaching and learning?',
    options: ['Increases stability in the curriculum', 'Can cause confusion and instability', 'Has no effect on teaching and learning', 'Improves teacher morale'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Analytical',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Constant shifting of curriculum standards, assessment policies, and pedagogical mandates disrupts teacher planning and causes systemic instability.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-38',
    qNo: 38,
    question: 'How might teacher burnout impact classroom learning?',
    options: ['Improved teaching quality', 'Decreased teaching quality', 'Increased student participation', 'Increased student-teacher rapport'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Analytical',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Burnout leads to emotional exhaustion, reduced lesson preparation, detached teacher-student relationships, and decreased instructional quality.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-39',
    qNo: 39,
    question: "How could an assessment that doesn't cater to diverse learning styles affect student performance?",
    options: ['Leads to improved scores for all students', "May disadvantage students whose learning styles aren't catered to", 'Increases overall class performance', 'Encourages a variety of learning styles'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Analytical',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Monolithic testing formats (e.g., purely written text) unfairly penalize visual, oral, or kinesthetic learners who understand the concept but struggle with that specific testing modality.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-40',
    qNo: 40,
    question: 'What is the potential impact of curriculum overload on student learning outcome?',
    options: ['Enhances comprehensive learning', 'May lead to superficial understanding of topics', 'Encourages independent learning', 'Has no impact on learning outcomes'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Analytical',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Packing too much content into the school year forces teachers to rush through topics quickly, leaving students with shallow, superficial understanding.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-41',
    qNo: 41,
    question: 'How might technology-integrated lessons impact student engagement in a low-resource classroom?',
    options: ['May increase engagement through novelty', 'May decrease engagement due to accessibility issues', 'Has no effect on engagement', 'Reduces the need for textbooks'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Analytical',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'If hardware or connectivity fails, or only a few students can access the devices, technology integration frustrates students and decreases overall engagement.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-42',
    qNo: 42,
    question: 'How might a "no zero" policy in grading impact student learning?',
    options: ['Encourages higher effort', 'May incentivize lack of effort', 'Has no impact on learning', 'Increases focus on non-academic activities'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Analytical',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Guaranteeing a baseline floor grade regardless of submission can inadvertently signal that incomplete work carries minimal consequence, disincentivizing effort.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-43',
    qNo: 43,
    question: 'What might be the impact on student learning if a teacher predominantly uses a laissez-faire classroom management style?',
    options: ['Promotes self-discipline', 'May lead to a chaotic learning environment', 'Enhances student-teacher relationships', 'Leads to high academic performance'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Analytical',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Laissez-faire management provides insufficient boundaries, structure, or accountability, frequently deteriorating into a chaotic, unfocused classroom.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-44',
    qNo: 44,
    question: 'Analyze the impact of a competency-based education system on student learning.',
    options: ['Promotes rote memorization', 'Allows students to learn at their own pace', 'Promotes competition among students', 'Leads to poor understanding of fundamental concepts'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Analytical',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Competency-based education advances learners upon verified demonstration of mastery rather than seated time, allowing self-paced learning.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-45',
    qNo: 45,
    question: 'How might early introduction of high-stakes assessments affect student attitudes towards learning?',
    options: ['Encourages a love for learning?', 'May foster test anxiety and negative attitudes', 'Leads to improved academic performance', 'Decreases focus on extracurricular activities'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Analytical',
    cognitiveLevel: 'Analytical',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Exposing young learners to punitive, high-stakes testing generates acute testing anxiety, dampening curiosity and fostering a fear of failure.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-46',
    qNo: 46,
    question: 'Assess the suitability of employing a lecture-centric teaching approach within a kindergarten environment.',
    options: ['Suitable because it establishes discipline', 'Unsuitable due to developmental considerations', 'Suitable as it enhances information retention', 'Unsuitable because it encourages peer interaction'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Evaluative',
    cognitiveLevel: 'Evaluative',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Young kindergarten children operate at the preoperational stage, requiring concrete, sensory-motor, play-based experiences rather than abstract verbal lecturing.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-47',
    qNo: 47,
    question: "Contemplate on the effectiveness of utilizing a single standardized test as the definitive measure of a student's intelligence.",
    options: ['Effective as it provides a universal standard', 'Ineffective as it does not account for diverse intelligences', 'Effective as it accounts for all learning styles', 'Ineffective as it encourages rote learning'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Evaluative',
    cognitiveLevel: 'Evaluative',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Howard Gardner’s theory of multiple intelligences highlights that single psychometric tests overlook creative, interpersonal, spatial, and practical abilities.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-48',
    qNo: 48,
    question: 'Weigh the suitability of a teacher modifying her teaching style to accommodate a range of learning styles within the classroom.',
    options: ['Suitable as it caters to all students', 'Unsuitable as it makes teaching too complicated', 'Suitable as it encourages rote learning', 'Unsuitable as it may not be feasible for large classes'],
    difficulty: "Medium",
    correctIndex: 0, // a
    subjectMatter: 'Evaluative',
    cognitiveLevel: 'Evaluative',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Adapting instruction ensures inclusive access, engaging diverse strengths and elevating comprehension for all learners.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-49',
    qNo: 49,
    question: "Reflect on the potential influence of a 'no homework' policy on the educational outcomes of students.",
    options: ['Positive as it reduces student stress', 'Negative as it reduces practice opportunities', 'Positive as it encourages independent learning', 'Negative as it enhances understanding of classroom lessons'],
    difficulty: "Medium",
    correctIndex: 1, // b
    subjectMatter: 'Evaluative',
    cognitiveLevel: 'Evaluative',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Eliminating independent consolidation reduces opportunities to practice and reinforce newly acquired competencies.',
    category: 'STS IBA Teaching License Test',
  },
  {
    id: 'tl-sample-mcq-50',
    qNo: 50,
    question: 'Determine the fittingness of implementing a differentiated curriculum in an extremely diverse classroom.',
    options: ['Fitting as it caters to individual learning needs', 'Unfitting as it is too difficult to implement', 'Fitting as it encourages competition', 'Unfitting as it causes confusion among students'],
    difficulty: "Medium",
    correctIndex: 0, // a
    subjectMatter: 'Evaluative',
    cognitiveLevel: 'Evaluative',
    weightageMarks: 1,
    weightagePercent: 0.5,
    explanation: 'Differentiating curriculum aligns learning with individual readiness and styles, making it the most equitable fit for diverse classrooms.',
    category: 'STS IBA Teaching License Test',
  },
];
