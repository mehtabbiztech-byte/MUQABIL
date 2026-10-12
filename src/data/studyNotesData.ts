import { StudyNote, StudySubject } from '../types';
import { MCQS_DATA } from './mcqsData';

export const STUDY_NOTES_DATA: StudyNote[] = [
  {
    id: 'note-01',
    title: 'Constitutional History of Pakistan: 1956, 1962 & 1973',
    subject: 'Pakistan Studies',
    readTime: '6 min read',
    summary: 'A fast-track comparative analysis of Pakistan\'s three constitutions, key institutions, Islamic provisions, and major milestones.',
    keyPoints: [
      '1956 Constitution: Promulgated on March 23, 1956. Declared Pakistan an Islamic Republic with a unicameral legislature (National Assembly of 300 members with parity between East and West Pakistan). Abrogated on October 7, 1958.',
      '1962 Constitution: Promulgated on June 8, 1962 by Field Marshal Ayub Khan. Introduced a presidential system, Basic Democracies (80,000 electoral college), and unicameral parliament. Abrogated on March 25, 1969.',
      '1973 Constitution: Enacted on August 14, 1973 under Zulfikar Ali Bhutto. Introduced a bicameral parliament (National Assembly & Senate) and parliamentary executive led by Prime Minister.',
      '18th Amendment (2010): Abolished concurrent legislative list, devolved powers to provinces, repealed Article 58(2)(b), and renamed NWFP to Khyber Pakhtunkhwa.',
    ],
    frequentlyAsked: [
      'Who was the chairman of the 1973 Constitution drafting committee? (Abdul Hafeez Pirzada)',
      'Which amendment introduced the Federal Shariat Court? (8th Amendment / 1980 Presidential Order)',
      'Under which article is the National Finance Commission (NFC) Award formulated? (Article 160)',
    ],
  },
  {
    id: 'note-02',
    title: 'Indus Water Treaty (1960) & Transboundary Rivers',
    subject: 'General Knowledge & Pakistan Geography',
    readTime: '5 min read',
    summary: 'The water-sharing treaty brokered by the World Bank between Pakistan and India, signed in Karachi on September 19, 1960.',
    keyPoints: [
      'Signatories: President Field Marshal Ayub Khan (Pakistan) and Prime Minister Jawaharlal Nehru (India).',
      'Mediator: International Bank for Reconstruction and Development (World Bank).',
      'Western Rivers allocated to Pakistan: Indus, Jhelum, and Chenab (approx 80% flow).',
      'Eastern Rivers allocated to India: Ravi, Beas, and Sutlej.',
      'Pakistan built Tarbela Dam (Indus River, 1976) and Mangla Dam (Jhelum River, 1967) under the Indus Basin Development Fund to compensate water loss.',
    ],
    frequentlyAsked: [
      'Where was the Indus Water Treaty signed? (Karachi)',
      'Which World Bank president brokered the treaty? (Eugene R. Black)',
      'What is the dispute mechanism under the treaty? (Neutral Expert and Court of Arbitration at The Hague)',
    ],
  },
  {
    id: 'note-03',
    title: 'Essential Prepositions & Idioms for Competitive English',
    subject: 'English',
    readTime: '8 min read',
    summary: 'Most frequently tested prepositions, verb-preposition pairs, and Latin adjectives tested by FPSC, PPSC, and STS.',
    keyPoints: [
      'Latin Comparatives take "TO": Senior to, Junior to, Prior to, Superior to, Inferior to, Prefer... to (e.g. "I prefer tea to coffee").',
      'Die OF vs Die FROM: Die of disease/hunger (e.g. "He died of malaria"); Die from wound/overwork (e.g. "He died from snakebite / exhaustion").',
      'Abide by rules, Abstain from smoking, Accused of theft, Acquitted of murder.',
      'Congratulate ON success, Comply WITH regulations, Deprived OF rights, Eligible FOR the post.',
    ],
    frequentlyAsked: [
      'He insisted _____ going there immediately. (on)',
      'She is blind _____ one eye. (in) vs blind _____ faults (to)',
      'The criminal was convicted _____ armed robbery. (of)',
    ],
  },
  {
    id: 'note-04',
    title: 'Human Body Systems, Blood Groups & Vitamins Cheat Sheet',
    subject: 'Everyday Science',
    readTime: '7 min read',
    summary: 'High-frequency biology and everyday science facts repeatedly queried in CSS MPT, PPSC, and STS screening tests.',
    keyPoints: [
      'Universal Blood Donor: O negative (O-); Universal Blood Recipient: AB positive (AB+).',
      'Largest organ in human body: Skin (integumentary system); Largest internal gland: Liver.',
      'Normal human body temperature: 98.6°F (37°C); Blood pH: 7.35 to 7.45 (slightly basic).',
      'Fat-soluble vitamins: A, D, E, K; Water-soluble vitamins: B-complex and C.',
      'Vitamin A deficiency: Night Blindness; Vitamin B1: Beri-beri; Vitamin C: Scurvy; Vitamin D: Rickets.',
    ],
    frequentlyAsked: [
      'Which blood cells fight infections? (Leukocytes / White Blood Cells)',
      'Which hormone regulates glucose metabolism? (Insulin, secreted by Islets of Langerhans in pancreas)',
      'Which organ cleanses and filters blood? (Kidneys, containing nephrons)',
    ],
  },
  {
    id: 'note-05',
    title: 'STEDA Teaching License (BPS-16/17): 50–50 Blueprint & Passing Strategy',
    subject: 'Teaching License & Pedagogy',
    readTime: '9 min read',
    summary: 'The comprehensive syllabus breakdown, marking scheme, and preparation strategy for the STEDA Sukkur IBA Teaching License Examination.',
    keyPoints: [
      'Exam Format: 100 MCQs, 100 Marks, 120 Minutes duration. No negative marking. Strict passing threshold is 60% (60/100).',
      'Part I: Content Knowledge (50% / 50 MCQs): English (10), Mathematics (10), General Science (10), Social Studies / Pak Studies (10), Mother Tongue Urdu/Sindhi (10) based on Class 1–8 DCAR Sindh textbooks.',
      'Part II: Pedagogical Content Knowledge (50% / 50 MCQs): Methods of Teaching (10), Child Development & Educational Psychology (10), Classroom Management (10), Classroom Assessment & Evaluation (10), School, Community & Teacher (10).',
      'Eligibility Cadres: Elementary School Teaching License (BPS-16) requires ADE (Associate Degree in Education) or B.Ed (Hons) 4-Year. Secondary School Teaching License (BPS-17) requires B.Ed 1.5/2.5/4-Year or M.Ed with at least 2nd Division / 2.5 CGPA.',
      'Benefits: Direct preferential recruitment in Sindh School Education & Literacy Department (SELD), fast-track promotion to BPS-17/18, and monthly Professional Teaching Allowance.',
    ],
    frequentlyAsked: [
      'What is the passing cutoff for the Sindh Teaching License? (60% marks; 60 out of 100 MCQs)',
      'Is there negative marking in the STS Teaching License Test? (No negative marking)',
      'Which law bans physical punishment in Sindh schools? (Sindh Prohibition of Corporal Punishment Act 2016)',
      'Which article of the 1973 Constitution guarantees free and compulsory education? (Article 25-A)',
    ],
  },
  {
    id: 'note-06',
    title: 'Core Pedagogy Revision: Bloom’s Taxonomy, Piaget, Vygotsky & Test Item Analysis',
    subject: 'Pedagogy & Child Psychology',
    readTime: '10 min read',
    summary: 'High-yield educational psychology principles, instructional design, and psychometric formulas tested in teaching license and educator exams.',
    keyPoints: [
      'Bloom’s Revised Taxonomy (Cognitive Domain): Remembering -> Understanding -> Applying -> Analyzing -> Evaluating -> Creating (highest cognitive level).',
      'Piaget’s 4 Cognitive Stages: Sensorimotor (0-2y, object permanence), Preoperational (2-7y, egocentrism, symbolic play), Concrete Operational (7-11y, conservation, reversibility), Formal Operational (11+y, abstract logic & deductive reasoning).',
      'Vygotsky’s Sociocultural Theory: Zone of Proximal Development (ZPD) is the distance between unassisted ability and assisted potential; Scaffolding is temporary support provided by a More Knowledgeable Other (MKO).',
      'Assessment Types: Diagnostic (prior to teaching), Formative (during instruction to adapt learning), Summative (at conclusion to certify/grade), Criterion-Referenced (against benchmark e.g. 60%), Norm-Referenced (percentile rank against peers).',
      'Jacob Kounin’s Classroom Management: "Withitness" (awareness of all classroom corners) and "Smoothness/Momentum" (seamless pacing without jerky transitions) prevent 80% of behavioral disruptions.',
      'Item Statistics: Difficulty index p = (correct answers) / (total examinees). Discrimination index D ranges from -1.00 to +1.00 (positive values indicate high scorers answered correctly).',
    ],
    frequentlyAsked: [
      'Who proposed the Theory of Multiple Intelligences? (Howard Gardner, identifying 8 distinct modalities)',
      'In Operant Conditioning, what increases behavior by removing an aversive stimulus? (Negative Reinforcement)',
      'What are the 5 phases of the 5E Instructional Model? (Engage, Explore, Explain, Elaborate, Evaluate)',
      'How many National Professional Standards for Teachers (NPSTP) exist in Pakistan? (10 professional standards)',
    ],
  },
];

// Preserve the original revision sheets while giving each lesson a stable place
// in the curriculum. Related IDs refer to the existing question bank, not an
// assertion that a question appeared in a particular official paper.
const locations: Record<string, { chapter: string; topic: string; questionIds: string[] }> = {
  'note-01': { chapter: 'Constitutional history', topic: 'Constitutions and amendments', questionIds: ['ps-01', 'ps-04'] },
  'note-02': { chapter: 'Physical geography', topic: 'Water and rivers', questionIds: [] },
  'note-03': { chapter: 'Grammar', topic: 'Prepositions and idioms', questionIds: [] },
  'note-04': { chapter: 'Biology', topic: 'Human body', questionIds: [] },
  'note-05': { chapter: 'Teaching License & Policies', topic: 'STEDA Framework & Passing Strategy', questionIds: ['tlt3-ped-91', 'tlt3-ped-97', 'tlt3-ped-100'] },
  'note-06': { chapter: 'Educational Psychology & Assessment', topic: 'Bloom, Piaget, Vygotsky & Evaluation', questionIds: ['tlt3-ped-51', 'tlt3-ped-61', 'tlt3-ped-82'] },
};

export const STUDY_CURRICULUM: StudySubject[] = [
  {
    id: 'mathematics', title: 'Mathematics', chapters: [{ id: 'numbers', title: 'Numbers and operations', topics: [{
      id: 'addition', title: 'Addition', lessons: [{
        id: 'adding-small-numbers', title: 'Let’s add together', audience: 'kids', readTime: '4 min read',
        explanation: 'Adding means putting groups together. Count the first group, then count on for the second group to find how many there are altogether.',
        examples: ['You have 2 pencils. A friend gives you 3 more. Now you have 5 pencils.', 'Start at 4 and count two more: 5, 6. So 4 + 2 = 6.'],
        importantPoints: ['The + sign means add.', 'The = sign means both sides have the same value.', 'Adding zero does not change a number.'],
        images: [{ src: '/lessons/addition.svg', alt: 'Two green counters plus three blue counters equals five counters.', caption: 'Count the counters: 2 + 3 = 5.' }],
        tables: [{ title: 'Try counting on', headers: ['Start with', 'Add', 'Total'], rows: [['1', '2', '3'], ['2', '3', '5'], ['4', '2', '6']] }],
        formulas: ['2 + 3 = 5'],
        mcqs: [{ id: 'lesson-add-1', question: 'You have 3 books and get 2 more. How many now?', options: ['4', '5', '6'], correctIndex: 1, explanation: 'Count on from 3: 4, 5. There are 5 books.', category: 'mathematics', difficulty: 'Easy' }],
        practice: [{ prompt: 'Draw 4 circles and then 3 more. How many circles?', answer: '7 circles: 4 + 3 = 7.' }], relatedQuestionIds: [],
      }],
    }, {
      id: 'percentages', title: 'Percentages', lessons: [{
        id: 'percentage-foundations', title: 'Percentages for aptitude tests', audience: 'advanced', readTime: '6 min read',
        explanation: 'A percentage expresses a ratio out of 100. Identify the base quantity before calculating: percentage change uses the original value as its denominator.',
        examples: ['A score of 36 out of 45 is (36 ÷ 45) × 100 = 80%.', 'A price rises from 800 to 1,000. The increase is 200 ÷ 800 × 100 = 25%.'],
        importantPoints: ['Convert p% to p/100 before multiplying.', 'Successive percentage changes multiply; they do not simply add.', 'A 20% increase followed by a 20% decrease leaves 96% of the original amount.'],
        formulas: ['Percentage = (part ÷ whole) × 100', 'Percentage change = ((new − original) ÷ original) × 100'],
        tables: [{ title: 'Useful equivalents', headers: ['Fraction', 'Decimal', 'Percentage'], rows: [['1/2', '0.5', '50%'], ['1/4', '0.25', '25%'], ['1/5', '0.2', '20%']] }],
        mcqs: [{ id: 'lesson-percent-1', question: 'A value increases by 20% and then decreases by 20%. What is the net change?', options: ['No change', '4% decrease', '4% increase', '40% decrease'], correctIndex: 1, explanation: 'Start at 100: 100 × 1.2 × 0.8 = 96, a 4% decrease.', category: 'mathematics', difficulty: 'Hard' }],
        practice: [{ prompt: 'A candidate answers 42 of 60 questions correctly. Calculate the score percentage.', answer: '42 ÷ 60 × 100 = 70%.' }], relatedQuestionIds: [],
      }],
    }] }],
  },
  {
    id: 'pedagogy-teaching-license',
    title: 'Pedagogy (STS IBA Teaching License)',
    chapters: [
      {
        id: 'methods-of-teaching',
        title: 'Methods of Teaching',
        topics: [
          {
            id: 'instructional-approaches-and-strategies',
            title: 'Instructional approaches & strategies',
            lessons: [
              {
                id: 'lesson-instructional-approaches-strategies',
                title: 'Instructional Approaches, Models & Pedagogical Strategies',
                audience: 'advanced',
                readTime: '15 min read',
                explanation: `Comprehensive pedagogical study note for candidates appearing in the Sindh Teaching License Examination conducted by Sukkur IBA Testing Services (STS) in collaboration with STEDA.

Instructional approaches and pedagogical strategies govern how educators organize the learning environment, engage students, and scaffold conceptual mastery. The official syllabus assesses two overarching orientations:

1. Teacher-Centered Direct Instruction (Madeline Hunter’s 7-Step Model): A systematic, explicit framework where the educator models the skill ("I Do"), guides initial practice with immediate corrective feedback ("We Do"), and monitors independent student execution ("You Do"). It is particularly potent for foundational literacy, phonics, computational algorithms, and lab safety rules.

2. Student-Centered Constructivist Approaches:
- The 5E Instructional Model (Roger Bybee): Spanning Engage, Explore, Explain, Elaborate, and Evaluate. CRITICAL EXAM FOCUS: Scientific terminology, formal definitions, and textbook nomenclature are introduced ONLY in the "Explain" phase after learners verbalize their findings!
- Inductive vs. Deductive Strategies: Inductive reasoning proceeds Bottom-Up from Specific Examples to General Rules (Baconian discovery). Deductive reasoning proceeds Top-Down from General Rules/Formulas to Specific Practice (Aristotelian verification).
- Inquiry-Based Learning: Structured across four tiers: Confirmation -> Structured -> Guided -> Open Inquiry.
- Cooperative Learning (Johnson & Johnson / Kagan / Slavin): Requires Positive Interdependence ("sink or swim together") and Individual Accountability to prevent social loafing. Key structures include Jigsaw (Elliot Aronson: Home Groups -> Expert Groups -> Home Groups), Think-Pair-Share (Frank Lyman), and STAD (Robert Slavin).
- Mary Budd Rowe's Wait Time: Increasing pauses to 3–5 seconds after asking a question (Wait Time 1) and after student response (Wait Time 2) significantly elevates cognitive complexity and voluntary participation.
- Differentiated Instruction (Carol Ann Tomlinson): Proactively tailoring Content, Process, Product, and Learning Environment to student readiness, interest, and profile.`,
                examples: [
                  'Example 1 (5E Explore vs Explain): In a Class 6 Science lesson on magnetism, students test which objects cling to a bar magnet (Explore). Afterward, the teacher introduces the terms "Ferromagnetic", "Magnetic Poles", and "Magnetic Field" (Explain).',
                  'Example 2 (Inductive Grammar): An educator presents 5 sentences showing singular subjects with singular verbs and plural subjects with plural verbs. Students deduce the rule for Subject-Verb Agreement on their own.',
                  'Example 3 (Jigsaw in Social Studies): A Class 8 history class on the 18th Constitutional Amendment divides into 4 Expert Groups: 1) Devolution of Ministries, 2) Article 25-A, 3) Renaming of NWFP to KPK, 4) NFC Award. Each expert masters their section and returns to teach their Home Group teammates.'
                ],
                importantPoints: [
                  '5E Model: Teacher lecture and formal terminology occur STRICTLY in the Explain phase, never in Explore or Engage.',
                  'Inductive reasoning = Specific Observations -> General Rule (Bottom-Up). Deductive reasoning = General Rule -> Specific Examples (Top-Down).',
                  'Jigsaw Cooperative Strategy (Elliot Aronson): Originates in Home Groups -> Moves to Expert Groups -> Returns to Home Groups to teach.',
                  'Mary Budd Rowe Wait-Time: Pausing for 3 to 5 seconds increases student response length by over 300% and fosters higher-order Bloom reasoning.',
                  'Differentiated Instruction (Tomlinson): Modifies Content, Process, Product, or Environment—without dumbing down or lowering curriculum standards.',
                  'Madeline Hunter Direct Instruction: Anticipatory Set -> Objective & Input -> Modeling ("I Do") -> Checking for Understanding -> Guided Practice ("We Do") -> Independent Practice ("You Do").',
                  'Levels of Inquiry (Banchi & Bell): Confirmation (lowest) -> Structured -> Guided -> Open Inquiry (highest student autonomy).'
                ],
                tables: [
                  {
                    title: 'Pedagogical Models at a Glance (STEDA Licensing Blueprint)',
                    headers: ['Approach', 'Cognitive Focus', 'Teacher Role', 'Student Role', 'Best Used For'],
                    rows: [
                      ['Direct Instruction', 'Behavioral Skill Mastery', 'Demonstrator & Modeler', 'Guided Practitioner', 'Phonics, math algorithms, lab safety'],
                      ['5E Model', 'Constructivist Conceptual Discovery', 'Facilitator & Clarifier', 'Active Investigator', 'Science concepts, DCAR Class 1–8 inquiry'],
                      ['Inductive Method', 'Pattern Recognition & Rule Derivation', 'Question Guide', 'Rule Discoverer', 'Concept formation, grammar, math patterns'],
                      ['Deductive Method', 'Rule Application & Verification', 'Rule Explainer', 'Formula Applier', 'Advanced secondary formulas, abstract theorems'],
                      ['Jigsaw Technique', 'Social Constructivist Collaboration', 'Accountability Monitor', 'Peer Expert & Instructor', 'Information-dense texts, history, multi-topic units']
                    ]
                  }
                ],
                formulas: [
                  '5E Phases: Engage -> Explore -> Explain -> Elaborate -> Evaluate',
                  'Hunter 7-Steps: Anticipatory Set -> Input/Objective -> Modeling -> Check Understanding -> Guided Practice -> Independent Practice',
                  'Wait-Time Metric: Wait Time 1 (3–5s pause after question) + Wait Time 2 (3–5s pause after student response)'
                ],
                mcqs: [
                  {
                    id: 'study-ped-mcq-1',
                    question: 'In Roger Bybee\'s 5E Instructional Model, during which phase should the teacher formally introduce scientific vocabulary and concept definitions?',
                    options: ['Explore phase', 'Engage phase', 'Explain phase', 'Elaborate phase'],
                    correctIndex: 2,
                    explanation: 'Formal scientific vocabulary, conceptual definitions, and textbook explanations are introduced exclusively during the Explain phase, after students have explored and verbalized their observations.',
                    category: 'pedagogy',
                    difficulty: 'Medium'
                  },
                  {
                    id: 'study-ped-mcq-2',
                    question: 'A teacher presents specific examples of triangles on the board, guides students to measure the interior angles, and prompts them to discover that the sum is always 180°. This instructional approach is:',
                    options: ['Deductive approach', 'Inductive approach', 'Rote drill approach', 'Direct transmission'],
                    correctIndex: 1,
                    explanation: 'The Inductive approach starts with specific concrete instances and observations, leading learners to discover the general geometric rule/principle.',
                    category: 'pedagogy',
                    difficulty: 'Medium'
                  },
                  {
                    id: 'study-ped-mcq-3',
                    question: 'In the Jigsaw cooperative learning technique, what is the role of "Expert Groups"?',
                    options: [
                      'To take a final competitive exam against other teams.',
                      'To master a designated segment of the curriculum and prepare how to teach it back to their Home Group.',
                      'To evaluate the teacher\'s performance and grade their classmates.',
                      'To complete administrative attendance duties for the school.'
                    ],
                    correctIndex: 1,
                    explanation: 'In Jigsaw, members from different Home Groups assemble into Expert Groups to master one specific subtopic before returning to teach their Home Group peers.',
                    category: 'pedagogy',
                    difficulty: 'Medium'
                  },
                  {
                    id: 'study-ped-mcq-4',
                    question: 'According to educational researcher Mary Budd Rowe, increasing teacher wait time to 3–5 seconds produces which major classroom effect?',
                    options: [
                      'Reduces student interest and increases disciplinary infractions.',
                      'Increases the length, quality, and cognitive complexity of student answers.',
                      'Decreases student voluntary participation.',
                      'Encourages rote single-word guessing.'
                    ],
                    correctIndex: 1,
                    explanation: 'Increasing wait-time from the typical 1-second baseline to 3–5 seconds allows deeper cognitive processing, resulting in longer, more sophisticated, and evidence-based student responses.',
                    category: 'pedagogy',
                    difficulty: 'Medium'
                  }
                ],
                practice: [
                  {
                    prompt: 'Explain how you would apply the 5E Instructional Model to teach a Class 6 General Science lesson on "States of Matter" (Solid, Liquid, Gas) aligned with DCAR Sindh textbooks.',
                    answer: '1. Engage: Show students an ice cube melting in a beaker over hot water, asking them to observe the steam without naming the states.\n2. Explore: Have students in small groups observe water in three states (ice, room-temperature water, steam from a kettle) and record shape and volume properties on worksheets.\n3. Explain: Ask students to describe what they observed; introduce the terms "Solid", "Liquid", "Gas", and explain molecular arrangement and kinetic energy.\n4. Elaborate: Challenge students to explain why wet laundry dries on clotheslines under the hot Sindh sun (Evaporation).\n5. Evaluate: Use a 3-question formative exit ticket assessing shape, volume, and phase change terminology.'
                  }
                ],
                relatedQuestionIds: ['tlt1-ped-51', 'tlt2-ped-52', 'tlt3-ped-51']
              }
            ]
          }
        ]
      }
    ]
  },
  ...STUDY_NOTES_DATA.map(note => {
    const location = locations[note.id];
    return {
      id: `subject-${note.id}`, title: note.subject,
      chapters: [{ id: `chapter-${note.id}`, title: location.chapter, topics: [{
        id: `topic-${note.id}`, title: location.topic, lessons: [{
          id: note.id, title: note.title, audience: 'advanced' as const, readTime: note.readTime,
          explanation: note.summary, examples: note.frequentlyAsked, importantPoints: note.keyPoints,
          mcqs: MCQS_DATA.filter(q => location.questionIds.includes(q.id)),
          practice: [{ prompt: 'Without looking, recall three important points from this lesson.', answer: note.keyPoints.slice(0, 3).join('\n\n') }],
          relatedQuestionIds: location.questionIds,
        }],
      }] }],
    };
  }),
];
