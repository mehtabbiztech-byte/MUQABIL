/** Each published specification belongs to a particular STS project and year.
 * Other STS recruitment and admissions tests must be checked against their own notice. */
export interface STSSyllabus {
  id: string;
  family: 'SGA&CD screening' | 'Courts & clerical' | 'Police recruitment' | 'Teaching recruitment';
  name: string;
  paperLevel: string;
  published: string;
  sourceUrl: string;
  sections: { name: string; percent: number; topics: string[] }[];
}

const screeningSections = [
  { name: 'English', percent: 40, topics: ['Reading comprehension', 'Synonyms and antonyms', 'Spelling', 'Error detection', 'Prepositions', 'Sentence structure'] },
  { name: 'Mathematics', percent: 20, topics: ['Basic arithmetic', 'Word problems'] },
  { name: 'General Knowledge', percent: 40, topics: ['Current affairs and world knowledge', 'Everyday science', 'Islamiat and Pakistan Studies', 'Computer'] },
];
const documents = 'https://apps.iba-suk.edu.pk/dashboard-admission-sts-hr/down/sts_documents/';

export const STS_SYLLABI: STSSyllabus[] = [
  { id: 'screen-matric-2025', family: 'SGA&CD screening', name: 'Matriculation category (BPS 05–15)', paperLevel: 'Matric', published: '2025-06-12', sourceUrl: `${documents}20250612060115997.pdf`, sections: screeningSections },
  { id: 'screen-inter-2026', family: 'SGA&CD screening', name: 'Intermediate category (BPS 05–15)', paperLevel: 'Intermediate', published: '2026-01-07', sourceUrl: `${documents}20260107085257229.pdf`, sections: screeningSections },
  { id: 'screen-grad-2025', family: 'SGA&CD screening', name: 'Graduation category (BPS 05–15)', paperLevel: 'Graduation', published: '2025-07-30', sourceUrl: `${documents}20250730060856779.pdf`, sections: screeningSections },
  { id: 'khairpur-clerk-2025', family: 'Courts & clerical', name: 'District & Sessions Judge Khairpur — Junior Clerk (BPS 11)', paperLevel: 'Post-specific', published: '2025-03-11', sourceUrl: `${documents}20250311041954710.pdf`, sections: [
    { name: 'English', percent: 30, topics: ['English language'] },
    { name: 'General Knowledge', percent: 20, topics: ['Pakistan affairs', 'Current affairs'] },
    { name: 'Computer', percent: 50, topics: ['MS Office', 'Basic computer knowledge'] },
  ] },
  { id: 'khairpur-steno-2025', family: 'Courts & clerical', name: 'District & Sessions Judge Khairpur — Stenographer (BPS 16)', paperLevel: 'Post-specific', published: '2025-03-11', sourceUrl: `${documents}20250311041954710.pdf`, sections: [
    { name: 'English', percent: 50, topics: ['English language'] },
    { name: 'General Knowledge', percent: 10, topics: ['Pakistan affairs', 'Current affairs'] },
    { name: 'Computer', percent: 40, topics: ['MS Office', 'Basic computer knowledge'] },
  ] },
  { id: 'khairpur-bailiff-2025', family: 'Courts & clerical', name: 'District & Sessions Judge Khairpur — Bailiff (BPS 05)', paperLevel: 'Post-specific', published: '2025-03-11', sourceUrl: `${documents}20250311041954710.pdf`, sections: [
    { name: 'English', percent: 30, topics: ['English language'] },
    { name: 'General Knowledge', percent: 40, topics: ['Pakistan affairs', 'Current affairs'] },
    { name: 'Computer', percent: 30, topics: ['MS Office', 'Basic computer knowledge'] },
  ] },
  { id: 'sindh-police-asi-2025', family: 'Police recruitment', name: 'Sindh Police ASI (BPS 11) — specified quota', paperLevel: 'Bachelor’s', published: '2025-01-27', sourceUrl: `${documents}20250127113633670.pdf`, sections: [
    { name: 'English', percent: 10, topics: ['English language'] },
    { name: 'Mother tongue', percent: 20, topics: ['Sindhi or Urdu'] },
    { name: 'Mathematics', percent: 20, topics: ['Mathematics'] },
    { name: 'General awareness / IQ', percent: 20, topics: ['General awareness', 'IQ'] },
    { name: 'Reasoning / aptitude', percent: 30, topics: ['Reasoning', 'Aptitude'] },
  ] },
  { id: 'larkana-clerk-2026', family: 'Courts & clerical', name: 'District & Sessions Judge Larkana — Junior Clerk (BPS 11)', paperLevel: 'Intermediate', published: '2026', sourceUrl: 'https://districtcourtslarkana.gos.pk/jobs/jr%20clerk%20sylabus.PDF', sections: [
    { name: 'English', percent: 40, topics: ['English language'] },
    { name: 'Computer', percent: 40, topics: ['MS Office'] },
    { name: 'Mathematics', percent: 10, topics: ['Basic arithmetic'] },
    { name: 'General Knowledge', percent: 10, topics: ['Pakistan affairs', 'Current affairs'] },
  ] },
  { id: 'seld-ece-2025', family: 'Teaching recruitment', name: 'Early Childhood Teacher (BPS 15)', paperLevel: 'B.Ed / ADE and ECE qualification specified in notice', published: '2025-04-23', sourceUrl: `${documents}20250423073434769.pdf`, sections: [
    { name: 'Key learning areas & assessment', percent: 10, topics: ['Social and emotional development', 'Language and literacy', 'Basic mathematics', 'Creative arts'] },
    { name: 'Child wellbeing', percent: 10, topics: ['Health and nutrition', 'Physical development', 'Child rights'] },
    { name: 'Learning & development theories', percent: 30, topics: ['Child development', 'Piaget', 'Vygotsky', 'Erikson', 'Gardner'] },
    { name: 'Instructional strategies', percent: 25, topics: ['Play-based learning', 'Classroom management', 'Bloom’s taxonomy'] },
    { name: 'General Knowledge', percent: 15, topics: ['World around us', 'Current affairs'] },
    { name: 'IT skills', percent: 10, topics: ['MS Office', 'Web search and AI tools'] },
  ] },
  { id: 'steda-teaching-license-2024', family: 'Teaching recruitment', name: 'Sindh Teaching License Examination (Elementary BPS-16 & Secondary BPS-17)', paperLevel: 'B.Ed (Hons) / ADE / M.Ed', published: '2024-01-15', sourceUrl: `${documents}20240115082415123.pdf`, sections: [
    { name: 'Part I: Content Knowledge — English Language (Class 1–8 DCAR/STBB)', percent: 10, topics: ['Reading comprehension & inferencing', 'Grammar and parts of speech', 'Prepositions, tenses and vocabulary from STBB textbooks'] },
    { name: 'Part I: Content Knowledge — Mathematics (Class 1–8 DCAR/STBB)', percent: 10, topics: ['Basic arithmetic, fractions & percentages', 'Ratio, proportion & pre-algebra', 'Geometry, mensuration & data handling from STBB Class 1–8'] },
    { name: 'Part I: Content Knowledge — General Science (Class 1–8 DCAR/STBB)', percent: 10, topics: ['Living things, human organ systems & cell biology', 'Plant processes & photosynthesis', 'Matter, atoms, energy & forces from STBB Class 1–8'] },
    { name: 'Part I: Content Knowledge — Social Studies & Pak Studies (Class 1–8 DCAR/STBB)', percent: 10, topics: ['Pakistan history (1857–1947)', 'Indus Valley civilization (Mohenjo-Daro) & Sindh heritage', '1973 Constitution & geography of Pakistan'] },
    { name: 'Part I: Content Knowledge — Mother Tongue Urdu or Sindhi (Class 1–8 DCAR/STBB)', percent: 10, topics: ['Urdu Qawaid, muhawrat & literature', 'Sindhi Vyakaran, 52 alphabets, Pahaka & Shah Jo Risalo from STBB books'] },
    { name: 'Part II: Pedagogy — Methods of Teaching & Foundations', percent: 10, topics: ['5E Model', 'Inquiry & problem-based learning', 'Bloom’s taxonomy', 'Socratic method'] },
    { name: 'Part II: Pedagogy — Child Development & Psychology', percent: 10, topics: ['Piaget cognitive development', 'Vygotsky ZPD & scaffolding', 'Erikson & Kohlberg theories', 'Gardner multiple intelligences'] },
    { name: 'Part II: Pedagogy — Classroom Management', percent: 10, topics: ['Jacob Kounin withitness & momentum', 'Assertive discipline', 'Positive behavior support', 'Arranging classroom space'] },
    { name: 'Part II: Pedagogy — Classroom Assessment & Evaluation', percent: 10, topics: ['Formative, summative & diagnostic assessment', 'NRT vs CRT', 'Validity & reliability', 'Rubrics & item analysis'] },
    { name: 'Part II: Pedagogy — School, Community & Professional Ethics', percent: 10, topics: ['School Management Committees (SMCs)', 'NPSTP 10 standards', 'Inclusive education & IEP', 'STEDA licensing policy'] },
  ] },
];

export const STS_OTHER_FAMILIES = [
  'Teaching: PST, JEST, Junior Science Teacher and other school posts',
  'Healthcare: nursing, medical and allied health recruitment; MDCAT admission projects',
  'University and college admissions, foundation programmes and scholarships',
  'Justice and courts: clerk, stenographer, bailiff and judicial posts',
  'Public utilities and departments: engineering, IT, police, local government and administrative posts',
];
export const STS_ANNOUNCEMENTS_URL = 'https://www.iba-suk.edu.pk/sts/announcements';
