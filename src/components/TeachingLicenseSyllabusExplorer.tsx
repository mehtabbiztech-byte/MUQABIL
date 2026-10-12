import React, { useState } from 'react';
import {
  BookOpen,
  GraduationCap,
  Calculator,
  Atom,
  Globe,
  Languages,
  CheckCircle2,
  AlertCircle,
  FileText,
  Trophy,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Layers,
  Award,
  Calendar,
  Check,
  Search,
  School,
  Clock,
  Printer
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TeachingLicenseSamplePaperExplorer } from './TeachingLicenseSamplePaperExplorer';

export interface SubjectSyllabusDetail {
  id: string;
  name: string;
  urduName?: string;
  sindhiName?: string;
  part: 'Part I: Content Knowledge (50%)' | 'Part II: Pedagogical Content Knowledge (50%)';
  weightage: string;
  mcqCount: number;
  source: string;
  icon: React.ElementType;
  color: string;
  badgeBg: string;
  badgeText: string;
  primaryCompetencies: string[]; // Class 1–5 Primary
  elementaryCompetencies: string[]; // Class 6–8 Middle/Elementary
  keyChaptersSTBB: string[];
  stsExamTips: string[];
  sampleQuestions: {
    q: string;
    options: string[];
    answer: number;
    explanation: string;
  }[];
}

export const TEACHING_LICENSE_SUBJECTS: SubjectSyllabusDetail[] = [
  {
    id: 'pedagogy',
    name: 'Pedagogy & Teaching Methodology',
    urduName: 'طریقہ تدریس و تعلیمی نفسیات',
    sindhiName: 'تدريسي طريقا ۽ تعليمي نفسيات',
    part: 'Part II: Pedagogical Content Knowledge (50%)',
    weightage: '50% (50 MCQs)',
    mcqCount: 50,
    source: 'HEC B.Ed (Hons) / ADE Curriculum & National Professional Standards for Teachers in Pakistan (NPSTP)',
    icon: GraduationCap,
    color: 'purple',
    badgeBg: 'bg-purple-100 dark:bg-purple-950/80',
    badgeText: 'text-purple-700 dark:text-pink-300',
    primaryCompetencies: [
      'Foundations of Education: Idealism, Realism, Naturalism, Pragmatism, and Islamic philosophy of education.',
      'Child Development (Ages 5–11): Physical, cognitive, emotional, and social development in early and primary school.',
      'Active Learning Pedagogies: 5E Model (Engage, Explore, Explain, Elaborate, Evaluate), Inquiry-Based Learning, Play-based instruction, and Activity-Based Learning (ABL).',
      'Positive Classroom Management: Establishing classroom rules, routines, transition management, and Jacob Kounin’s principles (Withitness, Smoothness, Overlapping).',
      'Classroom Assessment: Formative vs Summative assessment, Diagnostic testing, rubrics, and feedback strategies.'
    ],
    elementaryCompetencies: [
      'Learning Theories & Cognitive Psychology: Piaget (Stages of Cognitive Development), Vygotsky (Zone of Proximal Development & Scaffolding), Kohlberg (Moral Development), Bruner (Discovery Learning), and Bandura (Social Learning).',
      'Howard Gardner’s Multiple Intelligences and Individual Differences in classroom learners.',
      'Assessment & Measurement Metrics: Norm-Referenced (NRT) vs Criterion-Referenced (CRT), Validity (Content, Construct, Criterion), Reliability (Test-retest, Split-half), Item Difficulty Index (p-value) & Discrimination Index (D-value).',
      'Curriculum Development Process: Tyler’s Model, Taba’s Inverted Model, Bloom’s Revised Taxonomy (Remembering, Understanding, Applying, Analyzing, Evaluating, Creating) across Cognitive, Affective, and Psychomotor domains.',
      'Inclusive Education, IEP (Individualized Education Program), Special Needs (ADHD, Dyslexia), and School Management Committees (SMCs).'
    ],
    keyChaptersSTBB: [
      'NPSTP 10 Professional Standards for Teachers in Pakistan',
      'Instructional Planning & Daily Lesson Planning (Gagne’s 9 Events of Instruction)',
      'Jacob Kounin Classroom Management & Assertive Discipline',
      'Bloom’s Revised Taxonomy (Anderson & Krathwohl 2001)',
      'Assessment of Learning vs Assessment for Learning vs Assessment as Learning'
    ],
    stsExamTips: [
      'STS frequently asks scenario-based pedagogy questions: e.g. "If students are talking during transition, what should the teacher apply first?" -> Kounin’s Withitness & Smoothness.',
      'Memorize Bloom’s Action Verbs: "Compare & Contrast" belongs to Analyzing; "Judge or Justify" belongs to Evaluating.',
      'For item analysis: A question with p = 0.50 has optimal difficulty. Positive D-value means high scorers got it right.'
    ],
    sampleQuestions: [
      {
        q: 'A teacher maintains awareness of everything happening in the classroom simultaneously, preventing minor misbehavior from escalating. According to Jacob Kounin, this trait is known as:',
        options: ['Smoothness', 'Withitness', 'Overlapping', 'Momentum'],
        answer: 1,
        explanation: 'Jacob Kounin identified "Withitness" as the teacher’s acute awareness of classroom happenings and communicating to students that nothing escapes the teacher’s notice.'
      },
      {
        q: 'In Vygotsky’s Sociocultural Theory, the gap between what a child can do independently and what they can achieve with skilled teacher guidance is termed the:',
        options: ['Cognitive Schema', 'Zone of Proximal Development (ZPD)', 'Operant Chamber', 'Equilibration Point'],
        answer: 1,
        explanation: 'The Zone of Proximal Development (ZPD) is the range between independent problem solving and potential development under adult guidance.'
      }
    ]
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    urduName: 'ریاضی (جماعت اوّل تا ہشتم)',
    sindhiName: 'رياضي (پهرين کان اٺين درجي تائين)',
    part: 'Part I: Content Knowledge (50%)',
    weightage: '10% (10 MCQs)',
    mcqCount: 10,
    source: 'School Curriculum of Class one to eight (available at DCAR) Sindh Textbook Board (STBB)',
    icon: Calculator,
    color: 'emerald',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/80',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    primaryCompetencies: [
      'Class 1–3: Numbers up to 1,000, place values (units, tens, hundreds), addition, subtraction, basic multiplication & division tables, simple money word problems.',
      'Class 4–5: Numbers up to 1,000,000, factors and multiples, Prime vs Composite numbers, HCF (Highest Common Factor) & LCM (Least Common Multiple) via prime factorization.',
      'Fractions: Proper, improper, mixed fractions, addition/subtraction with unlike denominators, multiplication & division of fractions.',
      'Decimals: Place value of decimals (tenths, hundredths, thousandths), conversion between vulgar fractions and decimals, rounding off decimals.',
      'Unitary Method, direct proportion in daily life, percentages calculation.'
    ],
    elementaryCompetencies: [
      'Class 6: Sets (tabular form, descriptive form, union, intersection, universal set), integers and number line, ratio and proportion, algebraic expressions, linear equations in one variable.',
      'Class 7: Rational numbers, operations on rational numbers, squares and square roots (division & prime factorization method), algebraic formulas ((a+b)², (a-b)², a²-b²), geometry of parallel lines and transversals.',
      'Class 8: Real numbers, simultaneous linear equations (elimination and substitution), polynomials (addition, multiplication, division), factorization of algebraic expressions.',
      'Geometry & Mensuration (Class 6–8): Angles (complementary, supplementary, alternate, corresponding), triangle properties (sum of angles = 180°, Pythagoras theorem), quadrilaterals, circles (radius, diameter, circumference = 2πr, area = πr²).',
      'Information Handling: Frequency distribution, arithmetic mean, median, mode, bar graphs and pie charts.'
    ],
    keyChaptersSTBB: [
      'STBB Math Class 5: Chapter 2 (HCF & LCM), Chapter 3 (Fractions), Chapter 4 (Decimals & Percentages)',
      'STBB Math Class 6: Chapter 1 (Sets), Chapter 4 (Integers), Chapter 8 (Algebra)',
      'STBB Math Class 7: Chapter 2 (Rational Numbers), Chapter 5 (Exponents), Chapter 9 (Linear Equations)',
      'STBB Math Class 8: Chapter 2 (Real Numbers), Chapter 6 (Simultaneous Equations), Chapter 9 (Area & Volume), Chapter 10 (Demonstrative Geometry)'
    ],
    stsExamTips: [
      'STS loves word problems involving Unitary Method, LCM/HCF (e.g., bells ringing together at intervals), and profit/loss percentages.',
      'Remember Pythagoras theorem: c² = a² + b² (famous Pythagorean triplets: 3-4-5, 5-12-13, 8-15-17).',
      'Watch out for circle formulas: Circumference = 2πr = πd; Area = πr². If radius is doubled, area becomes 4 times.'
    ],
    sampleQuestions: [
      {
        q: 'Three bells toll at intervals of 12, 15, and 18 minutes respectively. If they toll together now, after how many minutes will they next toll together?',
        options: ['60 minutes', '120 minutes', '180 minutes', '360 minutes'],
        answer: 2,
        explanation: 'We calculate the LCM of 12, 15, and 18. LCM(12, 15, 18) = 2² × 3² × 5 = 4 × 9 × 5 = 180 minutes (3 hours).'
      },
      {
        q: 'If the radius of a circular playground is 7 metres, what is its perimeter (circumference)? (Take π = 22/7)',
        options: ['22 metres', '44 metres', '88 metres', '154 metres'],
        answer: 1,
        explanation: 'Circumference = 2 × π × r = 2 × (22/7) × 7 = 44 metres.'
      }
    ]
  },
  {
    id: 'science',
    name: 'General Science',
    urduName: 'جنرل سائنس (جماعت اوّل تا ہشتم)',
    sindhiName: 'جنرل سائنس (پهرين کان اٺين درجي تائين)',
    part: 'Part I: Content Knowledge (50%)',
    weightage: '10% (10 MCQs)',
    mcqCount: 10,
    source: 'School Curriculum of Class one to eight (available at DCAR) Sindh Textbook Board (STBB)',
    icon: Atom,
    color: 'sky',
    badgeBg: 'bg-sky-100 dark:bg-sky-950/80',
    badgeText: 'text-sky-700 dark:text-sky-300',
    primaryCompetencies: [
      'Class 1–3: Living and non-living things, plants and animals, sensory organs (eyes, ears, nose, tongue, skin), basic personal hygiene and dental care.',
      'Class 4–5: Characteristics of living things, major human body systems (digestive, respiratory, circulatory, nervous), plant parts and functions (roots, stems, leaves, flowers).',
      'Classification of Animals: Vertebrates (mammals, birds, reptiles, amphibians, fish) vs Invertebrates (insects, worms).',
      'States of Matter: Solid, liquid, gas, melting, boiling, condensation, evaporation.',
      'Simple Machines: Lever, pulley, wheel and axle, inclined plane, wedge, screw.'
    ],
    elementaryCompetencies: [
      'Class 6: Cellular organization (Plant cell vs Animal cell, organelles: nucleus, cytoplasm, cell membrane, cell wall, chloroplast, vacuole), sense organs (eye anatomy, ear anatomy), photosynthesis and respiration equations in plants, elements and compounds, energy transformations.',
      'Class 7: Human organ systems: Digestive system (enzymes: amylase, pepsin), circulatory system (heart chambers, arteries, veins, capillaries), transport in plants (xylem, phloem, transpiration), structure of atom (protons, neutrons, electrons, atomic number & mass number), physical and chemical changes.',
      'Class 8: Human nervous system (Central Nervous System: Brain - cerebrum, cerebellum, medulla oblongata; Peripheral Nervous System), reflex actions, heredity and DNA/chromosomes, cell division (Mitosis vs Meiosis), biotechnology, chemical reactions (acids, bases, pH scale, neutralization), force and pressure, measurement of physical quantities.'
    ],
    keyChaptersSTBB: [
      'STBB Science Class 6: Chapter 1 (Cellular Organization), Chapter 4 (Photosynthesis & Respiration), Chapter 5 (Atoms, Molecules, Mixtures & Compounds)',
      'STBB Science Class 7: Chapter 1 (Human Organ Systems), Chapter 2 (Transport in Humans & Plants), Chapter 5 (Structure of Atom)',
      'STBB Science Class 8: Chapter 1 (Human Nervous System), Chapter 2 (Cell Division), Chapter 5 (Chemical Reactions), Chapter 6 (Acids, Bases & Salts)'
    ],
    stsExamTips: [
      'Photosynthesis Equation: 6CO₂ + 6H₂O + Sunlight -> C₆H₁₂O₆ + 6O₂. Note that Oxygen is released from water, not carbon dioxide.',
      'Plant cell vs Animal cell: Plant cells possess Cell Wall, Chloroplasts, and large central vacuole; animal cells lack cell walls and chloroplasts.',
      'In the human brain: Cerebrum controls thinking and memory; Cerebellum controls body balance and coordination; Medulla Oblongata controls involuntary functions like heartbeat and breathing.'
    ],
    sampleQuestions: [
      {
        q: 'Which part of the human brain controls involuntary life-sustaining activities such as heartbeat, breathing, and blood pressure?',
        options: ['Cerebrum', 'Cerebellum', 'Medulla Oblongata', 'Hypothalamus'],
        answer: 2,
        explanation: 'The Medulla Oblongata is the brainstem structure that regulates automatic autonomic vital functions including heartbeat, breathing, and digestion.'
      },
      {
        q: 'In plant cells, which organelle is responsible for synthesizing food through the process of photosynthesis?',
        options: ['Mitochondria', 'Chloroplast', 'Ribosome', 'Endoplasmic Reticulum'],
        answer: 1,
        explanation: 'Chloroplasts contain chlorophyll pigments that absorb sunlight to carry out photosynthesis, converting CO2 and water into glucose.'
      }
    ]
  },
  {
    id: 'social-studies',
    name: 'Social Studies & Pakistan Studies',
    urduName: 'معاشرتی علوم و مطالعہ پاکستان (جماعت اوّل تا ہشتم)',
    sindhiName: 'سماجي اڀياس ۽ پاڪستان اسٽڊيز (پهرين کان اٺين درجي تائين)',
    part: 'Part I: Content Knowledge (50%)',
    weightage: '10% (10 MCQs)',
    mcqCount: 10,
    source: 'School Curriculum of Class one to eight (available at DCAR) Sindh Textbook Board (STBB)',
    icon: Globe,
    color: 'amber',
    badgeBg: 'bg-amber-100 dark:bg-amber-950/80',
    badgeText: 'text-amber-800 dark:text-amber-300',
    primaryCompetencies: [
      'Class 1–3: Family, home, community rules, village and city life, directions (North, South, East, West), maps and globes.',
      'Class 4–5: Geography of Pakistan: 4 provinces (Sindh, Punjab, KP, Balochistan), capital Islamabad, Gilgit-Baltistan, Azad Kashmir, neighbouring countries (India, China, Afghanistan, Iran, Arabian Sea).',
      'Major rivers of Pakistan (Indus River, Jhelum, Chenab, Ravi, Sutlej) and barrages of Sindh (Guddu, Sukkur, Kotri).',
      'National symbols of Pakistan: Flag, anthem, Quaid-e-Azam Muhammad Ali Jinnah, Allama Muhammad Iqbal, Fatima Jinnah.'
    ],
    elementaryCompetencies: [
      'Class 6: Geography of the World and South Asia (continents, oceans, landforms: mountains, plateaus, plains, deserts), climate zones, environmental conservation.',
      'History of Ancient Sindh: Indus Valley Civilization (Mohenjo-Daro discovered by Rakhaldas Banerjee in 1922 near Larkana), Great Bath, Priest-King, drainage system, Seals, pottery, Kot Diji, Amri.',
      'Class 7: Medieval Sindh & Islamic era: Muhammad bin Qasim (712 AD, Debal/Bambhore), Soomra dynasty, Samma dynasty (Makli Necropolis Thatta), Kalhora dynasty, Talpur dynasty.',
      'Class 8: Freedom Movement of Pakistan (1857–1947): War of Independence 1857, Sir Syed Ahmed Khan & Aligarh Movement, creation of All-India Muslim League (1906, Dhaka), Quaid-e-Azam’s 14 Points (1929), Allahabad Address (1930), Lahore Resolution (23 March 1940), Independence on 14 August 1947.',
      'Constitution & Civics: Basic structure of the 1973 Constitution of Pakistan, Fundamental Rights, Parliament (National Assembly & Senate), Local Government system in Sindh.'
    ],
    keyChaptersSTBB: [
      'STBB Social Studies Class 5: Chapter 2 (Geography of Pakistan), Chapter 4 (History & Freedom)',
      'STBB Social Studies Class 6: Chapter 1 (Indus Valley Civilization & Mohenjo-Daro), Chapter 3 (Landforms of Sindh)',
      'STBB Social Studies Class 7: Chapter 2 (Muslim Rule in Sindh), Chapter 5 (Makli & Thatta Architectural Heritage)',
      'STBB Social Studies Class 8: Chapter 1 (Pakistan Movement 1857–1947), Chapter 3 (Constitution of Pakistan & Democratic Governance)'
    ],
    stsExamTips: [
      'Mohenjo-Daro means "Mound of the Dead" in Sindhi, located on the right bank of the Indus River in Larkana district, discovered in 1922.',
      'Three barrages on River Indus in Sindh: Guddu Barrage (Kashmore), Sukkur Barrage / Lloyd Barrage (1932, Sukkur), Kotri Barrage / Ghulam Muhammad Barrage (Jamshoro/Hyderabad).',
      'Lahore Resolution was moved on 23 March 1940 by A.K. Fazlul Huq (Sher-e-Bengal).'
    ],
    sampleQuestions: [
      {
        q: 'The ancient civilization site of Mohenjo-Daro, a major center of the Indus Valley Civilization, is located in which district of Sindh?',
        options: ['Sukkur', 'Larkana', 'Thatta', 'Khairpur'],
        answer: 1,
        explanation: 'Mohenjo-Daro is situated in Larkana District, Sindh, discovered in 1922. It is a UNESCO World Heritage site renowned for its advanced urban planning and drainage system.'
      },
      {
        q: 'The historic Lahore Resolution (Pakistan Resolution) on 23 March 1940 was formally presented by which prominent leader?',
        options: ['Liaquat Ali Khan', 'A.K. Fazlul Huq', 'Chaudhry Khaliquzzaman', 'Allama Muhammad Iqbal'],
        answer: 1,
        explanation: 'The Lahore Resolution was moved by A.K. Fazlul Huq (the Premier of Bengal, known as Sher-e-Bengal) at Minto Park (now Iqbal Park), Lahore.'
      }
    ]
  },
  {
    id: 'english',
    name: 'English Language',
    urduName: 'انگریزی زبان (جماعت اوّل تا ہشتم)',
    sindhiName: 'انگريزي ٻولي (پهرين کان اٺين درجي تائين)',
    part: 'Part I: Content Knowledge (50%)',
    weightage: '10% (10 MCQs)',
    mcqCount: 10,
    source: 'School Curriculum of Class one to eight (available at DCAR) Sindh Textbook Board (STBB)',
    icon: BookOpen,
    color: 'rose',
    badgeBg: 'bg-rose-100 dark:bg-rose-950/80',
    badgeText: 'text-rose-700 dark:text-rose-300',
    primaryCompetencies: [
      'Class 1–3: Phonics, letter sounds, basic nouns (naming words), verbs (action words), adjectives (describing words), pronouns (he, she, it, they), simple questions with what/where/who.',
      'Class 4–5: Complete sentences (Subject + Predicate), singular and plural nouns (regular & irregular), masculine/feminine, simple present, simple past, and simple future tenses, capital letters, full stops, commas, and question marks.',
      'Basic prepositions (in, on, under, at, behind, between), conjunctions (and, but, because, so).'
    ],
    elementaryCompetencies: [
      'Class 6: 8 Parts of Speech in full functional usage: Noun types (Abstract, Collective, Material, Countable/Uncountable), Pronoun types (Reflexive, Emphatic, Demonstrative, Relative, Interrogative), Adjective degrees of comparison (positive, comparative, superlative), Adverb types (manner, place, time, frequency, degree).',
      'Class 7: Verb forms (Transitive vs Intransitive, Gerund vs Present Participle, Infinitives), Subject-Verb Agreement rules (e.g. neither/nor, either/or, each, every, along with, as well as).',
      'Class 8: Tenses mastery (all 12 active tenses), Active and Passive Voice conversion across tenses and interrogative sentences, Direct and Indirect Narration (reporting verbs, pronoun shifts, tense shifts, time/place word shifts).',
      'Vocabulary & Reading: Contextual vocabulary, synonyms and antonyms, common idioms and phrasal verbs, prefixes and suffixes, reading comprehension inference questions.'
    ],
    keyChaptersSTBB: [
      'STBB English Class 5: Units on grammar fundamentals, paragraph writing, vocabulary building',
      'STBB English Class 6: Unit 2 (Parts of Speech), Unit 4 (Punctuation & Capitalization), Unit 7 (Subject-Verb Concord)',
      'STBB English Class 7: Unit 3 (Tenses & Aspects), Unit 6 (Voice Change), Unit 8 (Vocabulary in Context)',
      'STBB English Class 8: Unit 1 (Reading Comprehension & Critical Thinking), Unit 5 (Direct & Indirect Speech), Unit 9 (Formal & Informal Writing)'
    ],
    stsExamTips: [
      'Subject-verb agreement trap: Phrases like "together with", "as well as", or "in addition to" do NOT change the number of the subject. E.g. "The teacher, along with the students, IS (not are) attending the seminar."',
      'Uncountable nouns in STS: Advice, furniture, luggage, information, scenery do not take an "s" and take singular verbs.',
      'Conditionals: Zero (present fact), First (If + Present, Will + Verb), Second (If + Past, Would + Verb), Third (If + Past Perfect, Would have + V3).'
    ],
    sampleQuestions: [
      {
        q: 'Choose the grammatically correct sentence adhering to standard subject-verb agreement rules:',
        options: [
          'The headmaster, along with all senior teachers, were present at the assembly.',
          'The headmaster, along with all senior teachers, was present at the assembly.',
          'The headmaster, along with all senior teachers, have been present at the assembly.',
          'The headmaster, along with all senior teachers, are present at the assembly.'
        ],
        answer: 1,
        explanation: 'When a subject is joined with parenthetical phrases such as "along with", "as well as", or "together with", the verb agrees with the primary subject ("The headmaster" -> singular -> "was present").'
      },
      {
        q: 'Convert to passive voice: "The students are preparing model science projects for the exhibition."',
        options: [
          'Model science projects were prepared by the students for the exhibition.',
          'Model science projects are prepared by the students for the exhibition.',
          'Model science projects are being prepared by the students for the exhibition.',
          'Model science projects have been prepared by the students for the exhibition.'
        ],
        answer: 2,
        explanation: 'Present continuous tense ("are preparing") transforms into "is/are being + past participle" ("are being prepared").'
      }
    ]
  },
  {
    id: 'urdu-sindhi',
    name: 'Urdu or Sindhi (Mother Tongue)',
    urduName: 'اردو یا سندھی مادری زبان (جماعت اوّل تا ہشتم)',
    sindhiName: 'اردو يا سنڌي مادري ٻولي (پهرين کان اٺين درجي تائين)',
    part: 'Part I: Content Knowledge (50%)',
    weightage: '10% (10 MCQs)',
    mcqCount: 10,
    source: 'School Curriculum of Class one to eight (available at DCAR) Sindh Textbook Board (STBB)',
    icon: Languages,
    color: 'teal',
    badgeBg: 'bg-teal-100 dark:bg-teal-950/80',
    badgeText: 'text-teal-700 dark:text-teal-300',
    primaryCompetencies: [
      'Urdu (Class 1–5): Huroof-e-Tahajji, Haroof-e-Illa (ا، و، ی), Wahid aur Jama, Muzakkar aur Muanas, Mutazad alfaz (Antonyms), Mutaradif alfaz (Synonyms), Ism (Noun) aur Fail (Verb) ki bunyadi pehchan.',
      'Sindhi (Class 1–5): 52 Sindhi akhar (الف ب), specialized Sindhi phonemes (ٻ، ڄ، ڃ، ڳ، ڱ، ڻ، ڊ، ڌ، ڦ، ٺ، ٽ، ڇ، ڄ), Wahid/Jama, Nar/Madi (Gender), bunyadi lafz, jumla sazi.',
      'Ramooz-e-Auqaf: Khatma (Full stop ۔), Sakta (Comma ،), Sawaliya nishan (؟), Rabta (:).'
    ],
    elementaryCompetencies: [
      'Urdu (Class 6–8): Qawaid (Grammar): Aqsam-e-Ism (Ism-e-Marfa vs Ism-e-Nakra), Ism-e-Sifat, Ism-e-Zameer aur is ki iqsam, Fail ki iqsam (Fail-e-Maroof, Fail-e-Majhool, Fail-e-Lazim, Fail-e-Muta’adi), Murakab alfaz, Muhawrat aur Zarb-ul-Amsal.',
      'Urdu Literature (Class 6–8 STBB): Allama Iqbal ki nazmain, Mirza Ghalib, Altaf Hussain Hali, Asnaf-e-Adab (Ghazal, Nazm, Afsana, Mazmoon, Khaka).',
      'Sindhi (Class 6–8): Sindhi Vyakaran: Ism (Khas & Aam), Sifat, Zameer (Shakhsi, Ishari, Mosool, Tankeeri), Fail (Lazmi, Muta’adi, Maroof, Majhool), Harf (Jarr, Itaf, Nida, Tashbeeh).',
      'Sindhi Literature & Culture (Class 6–8 STBB): Shah Abdul Latif Bhittai (Sur Kalyan, Sur Yaman, Sur Sasui, Sur Sarang), Sachal Sarmast, Sami, Mirza Qalich Beg, Sindhi Pahaka (پهاڪا) and Chawniyan (چوڻيون).'
    ],
    keyChaptersSTBB: [
      'STBB Urdu Class 6, 7 & 8: Qawaid-o-Insha (Grammar sections at end of each unit), Asnaf-e-Sukhan',
      'STBB Sindhi Class 6, 7 & 8: Sindhi Vyakaran, Shah Jo Risalo selections, Pahaka and Imla rules',
      'DCAR Language Learning Standards for Sindhi & Urdu Class 1–8'
    ],
    stsExamTips: [
      'Candidates can attempt either Urdu OR Sindhi sections in the STS paper (both are provided on the paper, 10 marks total).',
      'In Urdu: Frequently tested idioms include "آسمان سر پر اٹھانا", "آب آب ہونا", "باغ باغ ہونا", "ٹھیس پہنچانا".',
      'In Sindhi: Frequently tested Pahaka include "پنهنجي گهوڙي سڀڪو ڊوڙائي", "جهڙي پوک تهڙو لڻڻ", "صبر جو ڦل مٺو آهي". Know which Sur in Shah Jo Risalo focuses on patience (Sur Sasui).'
    ],
    sampleQuestions: [
      {
        q: 'اردو قواعد کی رو سے وہ اسم جو کسی شخص، جگہ یا چیز کا خاص نام ہو، کیا کہلاتا ہے؟',
        options: ['اسم نکرہ', 'اسم معرفہ', 'اسم صفت', 'اسم ضمیر'],
        answer: 1,
        explanation: 'اسم معرفہ (Proper Noun) وہ اسم ہے جو کسی خاص شخص، خاص جگہ یا خاص چیز کے نام کے لیے بولا جائے جیسے محمد علی جناح، کراچی، سندھ وغیرہ۔'
      },
      {
        q: 'سنڌي شاعريءَ ۾ ”سُر سسئي“ ۽ ”سُر ڪلياڻ“ ڪهڙي عظيم صوفي بزرگ شاعر جي ڪلام جا اهم سُر آهن؟',
        options: ['سچل سرمست', 'شاهه عبداللطيف ڀٽائي', 'سامي', 'مرزا قليچ بيگ'],
        answer: 1,
        explanation: 'شاهه عبداللطيف ڀٽائي رحه جي ”شاهه جو رسالو“ ۾ 30 سُر آهن جن مان سُر ڪلياڻ، سُر يمن، سُر سسئي ۽ سُر سارنگ نهايت مشهور آهن.'
      }
    ]
  }
];

export const TeachingLicenseSyllabusExplorer: React.FC = () => {
  const { setTab, setSelectedPastPaperId, launchSimulator } = useApp();
  const [viewMode, setViewMode] = useState<'syllabus' | 'sample-paper'>('syllabus');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('pedagogy');
  const [activeLevelFilter, setActiveLevelFilter] = useState<'all' | 'primary' | 'elementary'>('all');
  const [activeTab, setActiveTab] = useState<'syllabus' | 'dcar-info' | 'quiz'>('syllabus');

  const selectedSubject = TEACHING_LICENSE_SUBJECTS.find((s) => s.id === selectedSubjectId) || TEACHING_LICENSE_SUBJECTS[0];

  if (viewMode === 'sample-paper') {
    return <TeachingLicenseSamplePaperExplorer onBackToSyllabus={() => setViewMode('syllabus')} />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Official DCAR / STBB Mandate Spotlight Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white border border-purple-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-[11px] uppercase tracking-wider shadow-xs">
            Official Assessment Mandate
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white font-bold text-xs">
            STEDA & Sukkur IBA Testing Services (STS)
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-bold text-xs">
            BPS-16 & BPS-17 Licensing
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-white leading-tight">
          STS IBA Teaching License Test — Complete Syllabus & Basic Information
        </h2>

        {/* The Exact User-Specified Official Notification Block */}
        <div className="mt-4 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md">
          <div className="flex items-start gap-3">
            <School className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs uppercase font-extrabold tracking-wider text-amber-300">
                Official Curriculum Mandate (DCAR & STBB)
              </p>
              <p className="text-sm sm:text-base font-semibold text-slate-100 mt-1 leading-relaxed">
                “All Basic Information and Syllabus of <strong className="text-white underline decoration-amber-400 underline-offset-4">Pedagogy, Mathematics, Science, Social Studies, English and Urdu or Sindhi</strong> subjects will be assessed from the <strong className="text-amber-300">‘School Curriculum of Class one to eight (available at DCAR) STBB’</strong>.”
              </p>
              <p className="text-xs text-slate-300 mt-2">
                — Directorate of Curriculum, Assessment & Research (DCAR), Sindh & Sindh Textbook Board (STBB), Jamshoro
              </p>
            </div>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-[11px] text-slate-400 uppercase font-bold">Total Marks & Questions</div>
            <div className="text-lg font-black text-amber-300 mt-0.5">100 MCQs</div>
            <div className="text-[10px] text-slate-300">100 Marks (1 Mark each)</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-[11px] text-slate-400 uppercase font-bold">Time Allowed</div>
            <div className="text-lg font-black text-sky-300 mt-0.5">120 Minutes</div>
            <div className="text-[10px] text-slate-300">2 Hours total duration</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-[11px] text-slate-400 uppercase font-bold">Passing Criteria</div>
            <div className="text-lg font-black text-emerald-300 mt-0.5">60% (60 Marks)</div>
            <div className="text-[10px] text-slate-300">No negative marking</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-[11px] text-slate-400 uppercase font-bold">Syllabus Division</div>
            <div className="text-lg font-black text-purple-300 mt-0.5">50% + 50%</div>
            <div className="text-[10px] text-slate-300">50 Content + 50 Pedagogy</div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setViewMode('sample-paper')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:from-purple-400 hover:to-rose-400 text-white font-black text-xs sm:text-sm shadow-md transition transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-white" />
            <span>IBA STS 2024 Past Paper with Specification (300 Marks)</span>
          </button>

          <button
            onClick={() => {
              launchSimulator({
                simulatorId: 'sts',
                title: 'STS IBA Teaching License Test (STEDA)',
                category: 'STS IBA Teaching License Test',
                durationMinutes: 120,
                questionCount: 100,
                negativeMarking: false,
              });
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
          >
            <Trophy className="w-4 h-4 text-slate-950" />
            <span>Start 100-Mark Official Mock Test</span>
          </button>

          <button
            onClick={() => {
              setSelectedPastPaperId('sts-teaching-license-paper-1');
              setTab('past-papers');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm transition cursor-pointer flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-amber-300" />
            <span>Paper 1 (100 Qs)</span>
          </button>

          <button
            onClick={() => {
              setSelectedPastPaperId('sts-teaching-license-paper-2');
              setTab('past-papers');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm transition cursor-pointer flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-rose-300" />
            <span>Paper 2 (100 Qs)</span>
          </button>

          <button
            onClick={() => {
              setSelectedPastPaperId('sts-teaching-license-paper-3');
              setTab('past-papers');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm transition cursor-pointer flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-emerald-300" />
            <span>Paper 3 (100 Qs)</span>
          </button>

          <button
            onClick={() => {
              setTab('study-planner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2.5 rounded-xl bg-purple-500/30 hover:bg-purple-500/50 border border-purple-400/40 text-purple-200 font-bold text-xs sm:text-sm transition cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span>Open 60-Day Study Plan</span>
          </button>
        </div>
      </div>

      {/* Basic Information & Examination Policy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Eligibility & Cadres */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-purple-600 dark:text-pink-400 font-bold text-xs uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Eligibility & Cadres</span>
          </div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
            Elementary (BPS-16) & Secondary (BPS-17)
          </h3>
          <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Elementary License:</strong> B.Ed (Hons) 4-Year or ADE (Associate Degree in Education) or B.Ed (2.5 Year).</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Secondary License:</strong> B.Ed (1.5 / 2.5 Year) or M.Ed following Master’s/BS in relevant academic discipline.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Minimum Marks:</strong> 2nd Division or 2.5 CGPA from HEC recognized institution.</span>
            </li>
          </ul>
        </div>

        {/* Card 2: 50-50 Weightage Blueprint */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>50–50 Blueprint Breakdown</span>
          </div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
            Two Distinct Parts of the Test
          </h3>
          <div className="space-y-2.5 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                <span>Part I: Content Knowledge</span>
                <span className="text-emerald-600 dark:text-emerald-400">50 MCQs (50%)</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Class 1–8 DCAR & STBB School Curriculum: Math (10), Science (10), Social Studies (10), English (10), Urdu/Sindhi (10).
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                <span>Part II: Pedagogical Knowledge</span>
                <span className="text-purple-600 dark:text-pink-400">50 MCQs (50%)</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Methods of Teaching (10), Child Development (10), Classroom Management (10), Assessment (10), School & Community (10).
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Licensing Benefits */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Professional Career Impact</span>
          </div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
            Sindh Government Teaching License
          </h3>
          <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>Direct appointment eligibility to BPS-16 (Elementary) and BPS-17 (Secondary) positions.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>Monthly professional teaching allowance as approved by the Sindh Cabinet.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>Valid lifetime professional teaching credentials recognized across public & private schools.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Interactive Subject Tabs */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        
        {/* Navigation Selector for Subjects */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-pink-400">
                Official Syllabus Explorer
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display mt-0.5">
                Explore All Assessed Subjects (Class 1 to 8 DCAR & Pedagogy)
              </h3>
            </div>

            {/* Level Filter: All, Class 1–5, Class 6–8 */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl self-start sm:self-auto">
              {[
                { id: 'all', label: 'All Levels (1–8)' },
                { id: 'primary', label: 'Class 1–5 Primary' },
                { id: 'elementary', label: 'Class 6–8 Middle' },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => setActiveLevelFilter(lvl.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    activeLevelFilter === lvl.id
                      ? 'bg-purple-600 text-white shadow-xs font-extrabold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-pink-400'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Pills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {TEACHING_LICENSE_SUBJECTS.map((sub) => {
              const isSelected = selectedSubjectId === sub.id;
              const IconComp = sub.icon;
              return (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubjectId(sub.id)}
                  className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-purple-600 dark:border-pink-500 bg-purple-50 dark:bg-purple-950/40 text-purple-950 dark:text-white shadow-md ring-2 ring-purple-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${sub.badgeBg} ${sub.badgeText}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {sub.mcqCount} Qs
                    </span>
                  </div>
                  <div className="mt-2.5">
                    <div className="text-xs font-extrabold leading-tight">{sub.name}</div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">{sub.weightage}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Subject Detailed Body */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-6">
          
          {/* Active Subject Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-50 via-purple-50/20 to-slate-50 dark:from-slate-800/60 dark:via-purple-950/20 dark:to-slate-800/60 border border-slate-200 dark:border-slate-700/80">
            <div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-extrabold ${selectedSubject.badgeBg} ${selectedSubject.badgeText}`}>
                  {selectedSubject.part}
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Weightage: {selectedSubject.weightage}
                </span>
              </div>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white font-display mt-1">
                {selectedSubject.name}
              </h4>
              {selectedSubject.urduName && (
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  <span className="font-arabic font-semibold">{selectedSubject.urduName}</span>
                  {selectedSubject.sindhiName && (
                    <span className="ml-3 font-arabic font-semibold text-emerald-600 dark:text-emerald-400">
                      {selectedSubject.sindhiName}
                    </span>
                  )}
                </div>
              )}
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-purple-600 dark:text-pink-400 shrink-0" />
                <span><strong>Assessment Authority:</strong> {selectedSubject.source}</span>
              </p>
            </div>

            {/* Sub-tab selection */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveTab('syllabus')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeTab === 'syllabus'
                    ? 'bg-purple-600 text-white shadow-xs font-extrabold'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Syllabus & Competencies
              </button>
              <button
                onClick={() => setActiveTab('dcar-info')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeTab === 'dcar-info'
                    ? 'bg-purple-600 text-white shadow-xs font-extrabold'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                STBB Chapters & Exam Tips
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeTab === 'quiz'
                    ? 'bg-purple-600 text-white shadow-xs font-extrabold'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Sample MCQs ({selectedSubject.sampleQuestions.length})
              </button>
            </div>
          </div>

          {/* TAB 1: SYLLABUS & COMPETENCIES */}
          {activeTab === 'syllabus' && (
            <div className="space-y-6">
              
              {/* Primary Class 1–5 Section */}
              {(activeLevelFilter === 'all' || activeLevelFilter === 'primary') && (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <h5 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                        Primary School Competencies (Class 1 to 5 Curriculum)
                      </h5>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                      Foundational Stage
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                    {selectedSubject.primaryCompetencies.map((comp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Elementary / Middle Class 6–8 Section */}
              {(activeLevelFilter === 'all' || activeLevelFilter === 'elementary') && (
                <div className="p-5 rounded-2xl bg-purple-50/40 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                      <h5 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                        Middle / Elementary Competencies (Class 6 to 8 Curriculum)
                      </h5>
                    </div>
                    <span className="text-[11px] font-bold text-purple-700 dark:text-pink-300 bg-purple-100 dark:bg-purple-950/60 px-2 py-0.5 rounded-md">
                      Advanced Mastery Stage
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                    {selectedSubject.elementaryCompetencies.map((comp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-pink-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: STBB CHAPTERS & STS EXAM TIPS */}
          {activeTab === 'dcar-info' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* STBB Key Textbook Chapters */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                  <BookOpen className="w-4 h-4 text-purple-600 dark:text-pink-400" />
                  <span>Key STBB Textbook Chapters (DCAR Aligned)</span>
                </div>
                <div className="space-y-2">
                  {selectedSubject.keyChaptersSTBB.map((chap, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200"
                    >
                      {chap}
                    </div>
                  ))}
                </div>
              </div>

              {/* High-Yield STS Exam Traps & Tips */}
              <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 space-y-3">
                <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>STS Exam Traps & High-Yield Strategy</span>
                </div>
                <div className="space-y-2">
                  {selectedSubject.stsExamTips.map((tip, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200/60 dark:border-amber-800/40 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed"
                    >
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SAMPLE MCQS */}
          {activeTab === 'quiz' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official pattern practice items mirroring Sukkur IBA STS Teaching License test standards:
              </p>
              {selectedSubject.sampleQuestions.map((item, qIdx) => (
                <div
                  key={qIdx}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-3"
                >
                  <div className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-black flex items-center justify-center shrink-0">
                      {qIdx + 1}
                    </span>
                    <h5 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                      {item.q}
                    </h5>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-8">
                    {item.options.map((opt, optIdx) => {
                      const isCorrect = optIdx === item.answer;
                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-xl text-xs sm:text-sm border transition flex items-center justify-between ${
                            isCorrect
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-bold'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span>{String.fromCharCode(65 + optIdx)}) {opt}</span>
                          {isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-3 pl-8">
                    <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/50 text-xs text-purple-950 dark:text-pink-200">
                      <strong className="font-bold">Official Explanation:</strong> {item.explanation}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Official Guidelines & Preparation Roadmap Notice */}
      <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
            Ready to test your preparation on full 100-mark mock papers?
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Access 3 full-length solved past papers with 100 questions each, timed examination simulator, and STEDA marking rubrics.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              launchSimulator({
                simulatorId: 'sts',
                title: 'STS IBA Teaching License Test (STEDA)',
                category: 'STS IBA Teaching License Test',
                durationMinutes: 120,
                questionCount: 100,
                negativeMarking: false,
              });
            }}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer flex items-center gap-1.5"
          >
            <Trophy className="w-4 h-4 text-amber-300" />
            <span>Open STS Exam Simulator</span>
          </button>
        </div>
      </div>

    </div>
  );
};
