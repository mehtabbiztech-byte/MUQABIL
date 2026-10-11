/**
 * Interview Preparation Module — core data.
 *
 * This module extends MUQABIL beyond MCQs into spoken/reasoned assessment:
 * mock interviews, an AI interviewer, a self-reflection personality instrument
 * and criterion-based answer feedback.
 *
 * Honesty rules followed here (same standard as the rest of the platform):
 *  - Interview weight, panel size and stage sequence differ from cycle to cycle
 *    and from post to post. Every track therefore stores a `marksNote`,
 *    an `officialUrl` and a `sourceNote` telling the candidate to confirm the
 *    current advertisement/notice.
 *  - Nothing in this module is presented as an official interview question
 *    paper or as official marking. Questions are practice prompts written for
 *    preparation; scoring is labelled practice guidance.
 *  - Stable constitutional/administrative facts carry a source link; volatile
 *    figures are deliberately avoided in favour of reasoning questions.
 */

export type InterviewTrackId =
  | 'css'
  | 'pms'
  | 'ppsc'
  | 'spsc-cce'
  | 'sts'
  | 'nts'
  | 'department-panel';

export type InterviewCategoryId =
  | 'intro-motivation'
  | 'personal-background'
  | 'pakistan-affairs'
  | 'current-affairs'
  | 'islamic-ideology'
  | 'provincial-awareness'
  | 'professional-subject'
  | 'situational-behavioural'
  | 'administrative-casework'
  | 'communication-language';

export interface InterviewCategory {
  id: InterviewCategoryId;
  name: string;
  short: string;
  description: string;
}

export const INTERVIEW_CATEGORIES: InterviewCategory[] = [
  {
    id: 'intro-motivation',
    name: 'Introduction & Motivation',
    short: 'Intro',
    description: 'The opening 60–90 seconds: who you are, what you have done, and why this post.',
  },
  {
    id: 'personal-background',
    name: 'Personal Background & Record',
    short: 'Background',
    description: 'Family, education, district, hobbies, books, hobbies and the record the panel already has in front of it.',
  },
  {
    id: 'pakistan-affairs',
    name: 'Pakistan Affairs & Ideology',
    short: 'Pakistan',
    description: 'Constitutional structure, federation, economy, security and the ideas behind Pakistan.',
  },
  {
    id: 'current-affairs',
    name: 'Current Affairs',
    short: 'Current',
    description: 'Domestic and international developments, with reasoning rather than headline recitation.',
  },
  {
    id: 'islamic-ideology',
    name: 'Islamic Studies & Ethics',
    short: 'Islamiat',
    description: 'Ideology, Seerah, Islamic administration principles, and ethics for public office.',
  },
  {
    id: 'provincial-awareness',
    name: 'Provincial & District Awareness',
    short: 'Province',
    description: 'Your own province and district: administration, resources, problems and local development.',
  },
  {
    id: 'professional-subject',
    name: 'Professional & Subject Knowledge',
    short: 'Subject',
    description: 'The subject or trade of the post you applied for — applied, not memorised.',
  },
  {
    id: 'situational-behavioural',
    name: 'Situational & Behavioural',
    short: 'Situational',
    description: 'Scenario questions and evidence-based questions about how you actually behaved in the past.',
  },
  {
    id: 'administrative-casework',
    name: 'Administrative Casework',
    short: 'Casework',
    description: 'File-level judgment: public complaints, discipline, budget, procurement and service delivery.',
  },
  {
    id: 'communication-language',
    name: 'Communication & Language',
    short: 'Language',
    description: 'Urdu/English expression, précis-like brevity, and answering a hostile or vague question.',
  },
];

export interface InterviewTrack {
  id: InterviewTrackId;
  name: string;
  shortName: string;
  commission: string;
  /** Who actually conducts the interview stage. */
  conductedBy: string;
  /** Which stage of the process the interview sits in. */
  stageNote: string;
  panelSize: string;
  durationNote: string;
  /** Weight of the interview stage, with the uncertainty stated plainly. */
  marksNote: string;
  qualifyingNote: string;
  psychologicalStage: string;
  hotTopics: string[];
  panelFocus: string[];
  documentsChecklist: string[];
  etiquetteTips: string[];
  officialUrl: string;
  sourceNote: string;
  lastReviewed: string;
  /** Relative weight of each question area for this track's mock blueprint. */
  blueprint: Partial<Record<InterviewCategoryId, number>>;
}

export const INTERVIEW_TRACKS: InterviewTrack[] = [
  {
    id: 'css',
    name: 'CSS Competitive Examination (FPSC)',
    shortName: 'CSS / FPSC',
    commission: 'Federal Public Service Commission',
    conductedBy: 'FPSC interview board chaired by a senior FPSC member, with subject specialists on the panel',
    stageNote: 'Stage 4 of 5 — document verification and the two-day psychological assessment come first; the medical examination follows the viva',
    panelSize: 'Commonly five to six members around a U-shaped table; the candidate sits at the open end',
    durationNote: 'Roughly 20–40 minutes; the panel stays longer when it decides to probe detailed areas',
    marksNote: 'The viva voce carries 300 marks, and the psychological assessment is reflected inside that score rather than carrying separate marks',
    qualifyingNote: 'A candidate must clear the viva qualifying threshold to remain eligible for appointment — confirm the exact threshold in the FPSC notice for your cycle',
    psychologicalStage: 'Day 1: written psychological and personality tests. Day 2: group discussion, command task, public speaking and an individual psychological interview.',
    hotTopics: [
      'Current affairs — domestic politics, economy and security',
      'International relations and Pakistan’s foreign policy',
      'Both optional subjects you offered, especially the highest-scoring paper',
      'Pakistan’s economy: debt, taxation, energy and exports',
      'Ideology of Pakistan, Islamic Studies and constitutional evolution',
      'Your own district, division and province',
      'Hobbies, books read, sports and extra-curricular record',
      'Service group preference and suitability for it',
    ],
    panelFocus: [
      'Composure and mental alertness under sustained questioning',
      'Integrity, honesty and consistency between your record and your answers',
      'Clarity of reasoning and the ability to defend a position with evidence',
      'Awareness of the socio-economic realities of Pakistan',
      'Leadership potential and fitness for a BPS-17 cadre officer’s duties',
    ],
    documentsChecklist: [
      'Original CNIC and domicile, plus attested photocopies',
      'All original academic certificates, transcripts, degrees and equivalence letters',
      'Optional-subject and paper-wise mark sheets available for reference',
      'Two to four passport-size photographs as specified in the call letter',
      'Any certificate for extra-curricular activity, sports or published work you plan to mention',
      'Printed call letter and a printed copy of your application form',
    ],
    etiquetteTips: [
      'Walk in, greet the chairperson, and wait to be offered the seat',
      'Answer the member who asked, then return your attention to the chairperson',
      'If you do not know, say so plainly and offer the reasoning you do have',
      'Do not argue with the panel; disagree politely with reasons and evidence',
      'Keep hands still, avoid fidgeting, and do not place your file on the table',
      'If a question is repeated, treat it as a probe for depth and add new material',
    ],
    officialUrl: 'https://www.fpsc.gov.pk/',
    sourceNote: 'Weight, stage sequence and panel composition are described on the FPSC portal for the CSS cycle covered here. Interview rules and qualifying marks are re-notified every cycle — always confirm in the FPSC notice and your call letter.',
    lastReviewed: '2026-10',
    blueprint: {
      'intro-motivation': 2,
      'personal-background': 3,
      'pakistan-affairs': 4,
      'current-affairs': 4,
      'islamic-ideology': 2,
      'provincial-awareness': 2,
      'professional-subject': 3,
      'situational-behavioural': 3,
      'administrative-casework': 3,
      'communication-language': 1,
    },
  },
  {
    id: 'pms',
    name: 'Provincial Management Service (PMS, PPSC)',
    shortName: 'PMS',
    commission: 'Punjab Public Service Commission',
    conductedBy: 'PPSC interview panel, preceded by the commission’s psychological assessment',
    stageNote: 'Final stage after the written examination and the psychological assessment',
    panelSize: 'Typically a multi-member PPSC panel with a chairperson and subject specialists',
    durationNote: 'Commonly 20–35 minutes',
    marksNote: 'The psychological assessment and interview/viva voce form one combined stage. Published totals have been quoted differently across cycles (200 and 300 marks have both appeared) — the weight that matters is the one in your own PPSC syllabus notice or manual',
    qualifyingNote: 'PPSC rules have applied a qualifying percentage in the interview (commonly cited as 50%). Confirm the current requirement in your notice before you rely on it',
    psychologicalStage: 'Written psychological tests, group tasks/discussion, role-plays and an interview with psychologists; findings are used by the interview panel.',
    hotTopics: [
      'Punjab’s administration, districts and local government',
      'Provincial finances, taxation and the NFC Award',
      'Health, education and policing in the province',
      'Current national politics and the economy',
      'Your optional subjects and graduation discipline',
      'Your district’s problems and development potential',
    ],
    panelFocus: [
      'Provincial awareness and knowledge of your own division and district',
      'Whether your answers survive a second or third cross-question',
      'Administrative judgment in everyday service-delivery situations',
      'Respectful disagreement and language control',
      'Consistency between your application record and your interview claims',
    ],
    documentsChecklist: [
      'Original CNIC and Punjab domicile with attested copies',
      'All degrees, transcripts and, where applicable, equivalence certificates',
      'Experience letters if you claimed experience in the application',
      'Employer NOC if you are already in government service',
      'Printed call letter and application form',
    ],
    etiquetteTips: [
      'Lead with the specific, then generalise — Punjab panels dislike vague policy speeches',
      'Know your own district’s tehsils, main crops, industry and current issues',
      'If your optional subject is asked, answer at degree standard, not from a guide book',
      'Keep answers to the point; the panel will invite depth if it wants it',
      'Say “I do not know” without padding, then offer a related fact you are sure of',
    ],
    officialUrl: 'https://www.ppsc.gop.pk/',
    sourceNote: 'PMS structure is published by PPSC. Interview weight and qualifying rules have been reported inconsistently between years and secondary sources, so this module deliberately hedges the number and asks you to verify it in the commission’s own syllabus notice for your cycle.',
    lastReviewed: '2026-10',
    blueprint: {
      'intro-motivation': 2,
      'personal-background': 3,
      'pakistan-affairs': 3,
      'current-affairs': 4,
      'islamic-ideology': 2,
      'provincial-awareness': 5,
      'professional-subject': 3,
      'situational-behavioural': 3,
      'administrative-casework': 3,
      'communication-language': 1,
    },
  },
  {
    id: 'ppsc',
    name: 'PPSC Post-Specific Recruitment Interviews',
    shortName: 'PPSC Posts',
    commission: 'Punjab Public Service Commission',
    conductedBy: 'PPSC interview panel for the advertised post (lecturer, officer, technical or administrative cadres)',
    stageNote: 'Usually a written MCQ test followed by an interview; some technical posts add a practical or subject viva',
    panelSize: 'Usually three to five members, including a subject specialist for the discipline',
    durationNote: 'Commonly 10–25 minutes; subject-focused posts can run longer',
    marksNote: 'Interview marks are post-specific and are printed in each advertisement. PPSC commonly awards interview marks on a scale shown in the ad — always read that ad rather than relying on a general figure',
    qualifyingNote: 'Qualifying criteria (including any minimum in the interview) are stated in the advertisement for that post',
    psychologicalStage: 'Not applied to every PPSC post. Where it applies, the advertisement says so and it usually precedes or accompanies the interview.',
    hotTopics: [
      'The core subject of the post, at the level required by the qualification',
      'Practical application of the subject — classroom, office or field scenarios',
      'Current affairs at a general level',
      'Why this particular post rather than another',
      'Your degree, specialisation and any teaching or field experience',
    ],
    panelFocus: [
      'Whether you actually know the subject of the post',
      'Ability to explain a technical point in simple language',
      'Suitability for the specific station or duty the post involves',
      'Reliability and willingness to work where posted',
    ],
    documentsChecklist: [
      'Original degree/transcript of the exact qualification required by the ad',
      'Registration/licence for regulated professions',
      'Experience certificates matching the dates used for experience marks',
      'Domicile, CNIC and any quota certificate you claimed',
      'Printed online application and call letter',
    ],
    etiquetteTips: [
      'Answer subject questions with definitions, an example and an application',
      'If the panel asks “where would you like to be posted”, answer honestly and sensibly',
      'Do not inflate experience — panels read the file in front of them',
      'Bring the original documents for the qualification you are being marked on',
    ],
    officialUrl: 'https://www.ppsc.gop.pk/',
    sourceNote: 'Interview weight differs post to post, so this module does not publish a single figure. Verify marks, qualifying rules and the document list in the advertisement for your own post — that advertisement is the only reliable source.',
    lastReviewed: '2026-10',
    blueprint: {
      'intro-motivation': 2,
      'personal-background': 2,
      'professional-subject': 6,
      'pakistan-affairs': 2,
      'current-affairs': 2,
      'provincial-awareness': 3,
      'situational-behavioural': 3,
      'administrative-casework': 2,
      'communication-language': 2,
    },
  },
  {
    id: 'spsc-cce',
    name: 'SPSC Combined Competitive Examination (Sindh)',
    shortName: 'SPSC CCE',
    commission: 'Sindh Public Service Commission',
    conductedBy: 'SPSC interview board, usually with subject specialists',
    stageNote: 'Final stage after the screening test, written papers and document scrutiny',
    panelSize: 'Multi-member SPSC board',
    durationNote: 'Commonly 20–35 minutes',
    marksNote: 'SPSC has published a viva-voce component of 200 marks for the competitive examination in its recruitment rules and previous notices — confirm the current figure in your own SPSC notice',
    qualifyingNote: 'SPSC recruitment rules have shown a pass percentage in the viva voce (30% has appeared in published rules). Confirm the requirement that applies to your cycle',
    psychologicalStage: 'Not a separately published marked stage for CCE in the rules reviewed here.',
    hotTopics: [
      'Sindh’s districts, irrigation, agriculture and urban services',
      'Karachi and Hyderabad administration, water and transport',
      'Federal–provincial relations and the 18th Amendment',
      'Current affairs at national and international level',
      'Your optional subjects',
      'Local government and the problems of your district',
    ],
    panelFocus: [
      'Depth of provincial knowledge, not only federal headlines',
      'Balanced and non-partisan expression on sensitive local issues',
      'Awareness of Sindh’s rural–urban resource questions',
      'Composure when a member tests you with a deliberately sharp question',
    ],
    documentsChecklist: [
      'CNIC and Sindh domicile with attested copies',
      'Original degrees/transcripts for all claimed qualifications',
      'NOC for in-service candidates',
      'Any experience or quota certificates claimed in the application',
      'Printed application and call letter',
    ],
    etiquetteTips: [
      'Avoid partisan politics; describe issues and possible administrative responses',
      'Know Sindh’s districts, divisions and major irrigation commands',
      'Answer subject questions at degree standard',
      'Do not let a pointed question make you defensive — restate the fact calmly',
    ],
    officialUrl: 'https://spsc.gov.pk/',
    sourceNote: 'SPSC publishes its recruitment rules, syllabus and interview schedules on its portal. Viva marks and pass percentages have changed between rule revisions; verify against the notice for your cycle.',
    lastReviewed: '2026-10',
    blueprint: {
      'intro-motivation': 2,
      'personal-background': 3,
      'pakistan-affairs': 3,
      'current-affairs': 3,
      'islamic-ideology': 2,
      'provincial-awareness': 5,
      'professional-subject': 3,
      'situational-behavioural': 3,
      'administrative-casework': 2,
      'communication-language': 2,
    },
  },
  {
    id: 'sts',
    name: 'Sukkur IBA STS Screening (BPS-05 to 15)',
    shortName: 'STS IBA',
    commission: 'Sukkur IBA Testing Service (STS) with the concerned department/commission',
    conductedBy: 'STS administers the written screening test. Where the recruitment rules require an interview or viva, the concerned department, district selection committee or commission conducts it — not the testing service',
    stageNote: 'Written screening test first; document scrutiny and any departmental interview come afterwards',
    panelSize: 'Departmental/district selection committee; composition and size are set by the recruiting department',
    durationNote: 'Usually a short panel interview of about 5–20 minutes where one is held',
    marksNote: 'STS test scoring is published in the result. Interview marks, where an interview exists, are set by the recruiting department or commission, not by STS — read the advertisement for your post',
    qualifyingNote: 'Written-test qualifying criteria are published with the STS result/key. Interview qualifying rules belong to the recruiting department.',
    psychologicalStage: 'Not part of the standard STS screening test.',
    hotTopics: [
      'The subject matter of the screening test: English, Mathematics, General Knowledge',
      'Basic computer and office skills for clerical posts',
      'Sindh/Sukkur region general knowledge for locally posted jobs',
      'Your qualification, experience and documents',
      'Willingness to serve at the posted station',
    ],
    panelFocus: [
      'Whether your documents and qualifications match the post exactly',
      'Basic communication and clarity in Urdu/English',
      'Reliability, discipline and availability for field postings',
      'Honest answers about shifts, field duty and travel where relevant',
    ],
    documentsChecklist: [
      'Original CNIC, domicile and all educational certificates with attested copies',
      'The exact certificate the post requires (e.g. typing/computer course, licence, DAE diploma)',
      'Experience certificates where experience is claimed',
      'Two sets of photocopies in the order they appear in the advertisement',
      'Printed roll-number slip / call letter',
    ],
    etiquetteTips: [
      'Keep the document file complete and in the advertisement’s order',
      'Answer simply and honestly about your district and willingness to relocate',
      'For clerical/technical posts, expect a basic skill check — do not bluff',
      'Ask a single, focused question if instructions are unclear',
    ],
    officialUrl: 'https://www.iba-suk.edu.pk/sts/announcements',
    sourceNote: 'STS tests, sample papers, specifications and results are published by Sukkur IBA. Interview authority, marks and document lists for a given post belong to the recruiting department — verify them in that advertisement, not in secondary sources.',
    lastReviewed: '2026-10',
    blueprint: {
      'intro-motivation': 3,
      'personal-background': 3,
      'communication-language': 3,
      'professional-subject': 3,
      'provincial-awareness': 3,
      'situational-behavioural': 3,
    },
  },
  {
    id: 'nts',
    name: 'NTS-Tested Recruitment (Federal, Provincial & Institutional)',
    shortName: 'NTS',
    commission: 'National Testing Service (NTS) with the hiring organisation',
    conductedBy: 'NTS conducts the written test only. The interview, where the recruitment process includes one, is conducted by the hiring department, university, project or authority',
    stageNote: 'Test → merit list → document verification → interview (if the hiring organisation’s process includes it)',
    panelSize: 'Set by the hiring organisation — commonly three to five members',
    durationNote: 'Commonly 5–20 minutes',
    marksNote: 'NTS publishes test scores and merit lists. Interview marks and any weight given to the interview are decided by the hiring organisation and stated in its advertisement/process document',
    qualifyingNote: 'Qualifying criteria are set by the hiring organisation, not by NTS',
    psychologicalStage: 'Only where the hiring organisation’s process includes it.',
    hotTopics: [
      'Your qualification and the subject required by the project/post',
      'The hiring organisation: mandate, projects and current activities',
      'The specific project and station you would be posted to',
      'Contract terms, probation and willingness to travel',
      'General knowledge and current affairs at a basic level',
    ],
    panelFocus: [
      'Fit with a specific project, donor-funded programme or campus',
      'Technical competence for the assigned role',
      'Communication and reporting discipline',
      'Commitment for the duration of the contract',
    ],
    documentsChecklist: [
      'NTS result card/merit position and original CNIC',
      'Original degrees/transcripts and HEC/equivalence documents where required',
      'Experience letters matching the claimed years',
      'Any professional registration, licence or portfolio the role requires',
      'Printed CV copies for the panel where the advertisement invites them',
    ],
    etiquetteTips: [
      'Read the project/role description before the interview and refer to it naturally',
      'Answer with project language: deliverables, reporting, timelines',
      'Be clear and honest about notice period and contract availability',
      'Do not criticise a previous employer — describe the work, not the personalities',
    ],
    officialUrl: 'https://www.nts.org.pk/',
    sourceNote: 'NTS publishes test schedules, roll-number slips, keys and results. Interview authority and marks rest with the hiring organisation — verify them in the advertisement or process document before assuming an interview weight.',
    lastReviewed: '2026-10',
    blueprint: {
      'intro-motivation': 3,
      'personal-background': 3,
      'professional-subject': 5,
      'situational-behavioural': 3,
      'communication-language': 2,
      'current-affairs': 1,
    },
  },
  {
    id: 'department-panel',
    name: 'Departmental, Committee & DPSC Panels',
    shortName: 'Dept Panel',
    commission: 'Recruiting department / District Selection Committee / DPSC-style boards',
    conductedBy: 'Departmental selection committee, district-level board or commission panel, usually chaired by an officer senior to the post advertised',
    stageNote: 'Usually the last stage after written/skill tests and document verification',
    panelSize: 'Commonly three to five officers, sometimes including a subject or trade expert',
    durationNote: 'Usually 5–20 minutes per candidate',
    marksNote: 'Marks, where they exist, are published in the department’s recruitment rules or advertisement. Many departmental interviews are simply pass/fail or merit-ordering exercises',
    qualifyingNote: 'Set by the department’s recruitment rules for the post',
    psychologicalStage: 'Rarely a formal psychological stage at departmental level; panels may still test judgment with scenario questions.',
    hotTopics: [
      'Your documents, qualification and any trade or skill test',
      'Why you applied to this department and post',
      'Willingness to serve at any station in the district/province',
      'Basic rules and duties of the post (service rules, conduct rules)',
      'Field scenarios: public dealing, complaints, record keeping',
      'Local area knowledge relevant to the department',
    ],
    panelFocus: [
      'Verification of documents and claims',
      'Straightforward reliability rather than policy brilliance',
      'Public dealing manner and patience',
      'Understanding of the specific duties of the post',
    ],
    documentsChecklist: [
      'All originals, arranged exactly in the order printed in the advertisement',
      'Attested photocopies in a duplicate set',
      'Domicile, CNIC, and quota/disability certificates you claimed',
      'Skill certificates (typing, computer, technical trade, driving) if required',
      'Two to four photographs and the printed application/call letter',
    ],
    etiquetteTips: [
      'Dress in formal, plain clothing suitable for a government office',
      'Answer in the language the panel uses; do not switch for effect',
      'Confirm your posting willingness honestly — false flexibility shows later',
      'Carry your file neatly; hand over documents only if asked',
    ],
    officialUrl: 'https://www.ppsc.gop.pk/',
    sourceNote: 'Departmental and committee interviews follow each department’s recruitment rules and the specific advertisement. This track is a generic preparation frame for that format — confirm the marks and stages in your own advertisement before relying on any figure.',
    lastReviewed: '2026-10',
    blueprint: {
      'intro-motivation': 3,
      'personal-background': 3,
      'communication-language': 3,
      'professional-subject': 3,
      'situational-behavioural': 3,
      'provincial-awareness': 2,
      'administrative-casework': 2,
    },
  },
];

export const getInterviewTrack = (id: string | null | undefined): InterviewTrack =>
  INTERVIEW_TRACKS.find((track) => track.id === id) || INTERVIEW_TRACKS[0];

export const getInterviewCategory = (id: InterviewCategoryId): InterviewCategory =>
  INTERVIEW_CATEGORIES.find((category) => category.id === id) || INTERVIEW_CATEGORIES[0];

export type InterviewDifficulty = 'Warm-up' | 'Standard' | 'Stress';

export interface InterviewQuestion {
  id: string;
  category: InterviewCategoryId;
  /** Tracks this prompt suits. 'all' means it is asked across every format. */
  tracks: InterviewTrackId[] | 'all';
  difficulty: InterviewDifficulty;
  prompt: string;
  /** Cross-questions the panel uses to test whether the first answer was real. */
  followUps: string[];
  /** What a panel listens for. Not "the right answer" — these are conversation anchors. */
  expectedPoints: string[];
  structureHint: string[];
  commonMistakes: string[];
  targetSeconds: number;
  /** Optional reference for questions that rest on a verifiable public fact. */
  sourceRef?: { label: string; url: string };
}

/* ------------------------------------------------------------------ *
 * The AI interviewer is built from named panel seats. Each seat has a
 * system-style brief so the model behaves like a member of that panel.
 * ------------------------------------------------------------------ */

export type PanelPersonaId =
  | 'chairperson'
  | 'current-affairs'
  | 'subject-specialist'
  | 'psychologist'
  | 'communication';

export interface PanelPersona {
  id: PanelPersonaId;
  name: string;
  role: string;
  focus: string;
  /** Brief handed to the AI interviewer for this seat. */
  brief: string;
  sampleProbe: string;
  accent: string;
  ring: string;
  categories: InterviewCategoryId[];
}

export const PANEL_PERSONAS: PanelPersona[] = [
  {
    id: 'chairperson',
    name: 'Chairperson',
    role: 'Panel lead',
    focus: 'Sets the tone, opens with your background and closes with motivation and service suitability',
    brief:
      'You chair the board. You open the interview with a warm but measured greeting, ask about background, education, district and motivation, and you interject with short clarifying probes. You are courteous, unhurried and alert to inconsistencies between claims.',
    sampleProbe: 'You have written that you led a team. Tell me exactly what you did, not what the team did.',
    accent: 'from-slate-700 to-slate-900',
    ring: 'ring-slate-400/40',
    categories: ['intro-motivation', 'personal-background', 'situational-behavioural'],
  },
  {
    id: 'current-affairs',
    name: 'Current Affairs Member',
    role: 'National & international affairs',
    focus: 'Tests whether you can reason about today’s issues instead of reciting headlines',
    brief:
      'You probe current affairs. You ask for causes, consequences and Pakistan-specific implications, then counter the candidate politely to see whether the reasoning holds. You never ask for statistics the candidate cannot reasonably know; you ask for structure.',
    sampleProbe: 'You have described the problem. What exactly would you do in the first six months if you had the authority?',
    accent: 'from-indigo-600 to-blue-800',
    ring: 'ring-indigo-400/40',
    categories: ['current-affairs', 'pakistan-affairs'],
  },
  {
    id: 'subject-specialist',
    name: 'Subject Specialist',
    role: 'Optional subject / post discipline',
    focus: 'Degree-level questions on your own optional subject or the technical field of the post',
    brief:
      'You are a subject specialist. You ask definition → mechanism → application questions from the candidate’s declared subject or the technical field of the advertised post, and you expect the candidate to defend an example.',
    sampleProbe: 'Define it in one line, then give me an example from your own district.',
    accent: 'from-emerald-600 to-teal-800',
    ring: 'ring-emerald-400/40',
    categories: ['professional-subject', 'pakistan-affairs'],
  },
  {
    id: 'psychologist',
    name: 'Psychologist / Behavioural Assessor',
    role: 'Situational & behavioural',
    focus: 'Scenario judgment, integrity dilemmas and evidence from your past behaviour',
    brief:
      'You assess behaviour and judgment. You ask situational and behavioural questions — pressure, conflict, failure, ethics, dissent, and what the candidate actually did in a real past situation. You listen for accountability, not blame.',
    sampleProbe: 'Tell me about a time you disagreed with a senior. What did you do, and what would you do differently now?',
    accent: 'from-purple-600 to-fuchsia-800',
    ring: 'ring-purple-400/40',
    categories: ['situational-behavioural', 'administrative-casework'],
  },
  {
    id: 'communication',
    name: 'Language & Communication Evaluator',
    role: 'Expression & clarity',
    focus: 'Structure, brevity, diction and control when a question is vague or hostile',
    brief:
      'You evaluate communication. You ask the candidate to explain something in simple language, to summarise in thirty seconds, and you deliberately ask one slightly hostile or vague question to see whether composure survives.',
    sampleProbe: 'Explain that again in thirty seconds, in simple Urdu or English, as if I were a citizen at a counter.',
    accent: 'from-amber-500 to-orange-700',
    ring: 'ring-amber-400/40',
    categories: ['communication-language', 'intro-motivation'],
  },
];

export const getPanelPersona = (id: string | null | undefined): PanelPersona =>
  PANEL_PERSONAS.find((persona) => persona.id === id) || PANEL_PERSONAS[0];

/* ------------------------------------------------------------------ *
 * Answer feedback rubric — the same criterion set is used by the local
 * structural analyser and by the AI feedback mode, so the two never
 * disagree about what "good" means.
 * ------------------------------------------------------------------ */

export type CriterionId =
  | 'directness'
  | 'structure'
  | 'substance'
  | 'relevance'
  | 'clarity'
  | 'composure'
  | 'concision';

export interface AnswerCriterion {
  id: CriterionId;
  label: string;
  /** Share of the overall practice score. Weights sum to 1. */
  weight: number;
  description: string;
  whatGoodLooksLike: string;
  drills: string[];
}

export const ANSWER_CRITERIA: AnswerCriterion[] = [
  {
    id: 'directness',
    label: 'Directness of opening',
    weight: 0.15,
    description: 'Do you answer the question in the first sentence, or circle around it?',
    whatGoodLooksLike: 'One clear sentence that states your position, then the reasons.',
    drills: [
      'Practise the 10-second rule: answer first, justify after.',
      'Rewrite each of your last five answers so the first sentence is a complete claim.',
    ],
  },
  {
    id: 'structure',
    label: 'Structure & signposting',
    weight: 0.2,
    description: 'Does the answer have visible scaffolding the panel can follow?',
    whatGoodLooksLike: 'Two to four signposted blocks (context → analysis → action) with a closing line.',
    drills: [
      'Use the four-part drill: point, reason, example, close.',
      'Record yourself and write down the skeleton you actually used.',
    ],
  },
  {
    id: 'substance',
    label: 'Substance & evidence',
    weight: 0.2,
    description: 'Concrete facts, examples, names, numbers and personal actions rather than generalities.',
    whatGoodLooksLike: 'At least one specific example, one accountability statement (“I did…”) and one verifiable fact.',
    drills: [
      'For every claim in your notes, attach one example and one action you personally took.',
      'Prepare five district-level examples you can reuse across topics.',
    ],
  },
  {
    id: 'relevance',
    label: 'Relevance to the question',
    weight: 0.15,
    description: 'Does the answer stay on the question asked, including after a cross-question?',
    whatGoodLooksLike: 'Answers the exact question asked and covers the terms it contains.',
    drills: [
      'Highlight the key words in the question before you start speaking.',
      'Finish with one sentence that returns to the question’s exact wording.',
    ],
  },
  {
    id: 'clarity',
    label: 'Clarity & language',
    weight: 0.1,
    description: 'Sentence length, jargon, repetition and filler words.',
    whatGoodLooksLike: 'Short sentences, plain words, minimal filler, one idea per sentence.',
    drills: [
      'Trim sentences over 30 words into two.',
      'Replace “basically/actually/you know” with a short pause.',
    ],
  },
  {
    id: 'composure',
    label: 'Composure & ownership',
    weight: 0.1,
    description: 'Confidence, accountability and calm under probing.',
    whatGoodLooksLike: 'Assertive statements, ownership of the candidate’s own actions, no over-apologising.',
    drills: [
      'Say “I do not know, but here is how I would find out” instead of guessing.',
      'Rehearse one hostile question daily and answer it without changing your tone.',
    ],
  },
  {
    id: 'concision',
    label: 'Time & concision',
    weight: 0.1,
    description: 'Length of the answer measured against the time an interviewer allows.',
    whatGoodLooksLike: 'Roughly 60–120 seconds of speech; the panel asks for more if it wants more.',
    drills: [
      'Time yourself at 90 seconds and stop mid-sentence if you must.',
      'Practise a 30-second version of every prepared answer.',
    ],
  },
];

export const CRITERION_TOTAL_WEIGHT = ANSWER_CRITERIA.reduce((sum, item) => sum + item.weight, 0);

/* ------------------------------------------------------------------ *
 * Personality & suitability self-assessment.
 *
 * This is a transparent self-reflection instrument built for interview
 * preparation. It is not a standardised psychometric test, it does not
 * reproduce any commission's psychological assessment, and no result is
 * shared with any authority.
 * ------------------------------------------------------------------ */

export type PersonalityDimensionId =
  | 'composure'
  | 'integrity'
  | 'leadership'
  | 'teamwork'
  | 'communication'
  | 'service-motivation';

export interface PersonalityDimension {
  id: PersonalityDimensionId;
  name: string;
  short: string;
  description: string;
  highNote: string;
  lowNote: string;
  panelQuestion: string;
  developmentAction: string;
}

export const PERSONALITY_DIMENSIONS: PersonalityDimension[] = [
  {
    id: 'composure',
    name: 'Composure under pressure',
    short: 'Composure',
    description: 'Staying calm, accurate and polite when questioned, interrupted or challenged.',
    highNote: 'You recover quickly from pressure and rarely let a hostile question change your tone.',
    lowNote: 'Pressure tends to shorten your answers or push you into defensiveness.',
    panelQuestion: 'Describe a situation when you were blamed for something that was not your fault. How did you respond?',
    developmentAction: 'Rehearse one deliberately hostile question every day and answer it in the same measured tone.',
  },
  {
    id: 'integrity',
    name: 'Integrity & accountability',
    short: 'Integrity',
    description: 'Honesty about your own mistakes, clarity about right and wrong, and accepting responsibility.',
    highNote: 'You name your own mistakes without shifting blame and you know where your limits are.',
    lowNote: 'You may avoid owning an error or rationalise a shortcut.',
    panelQuestion: 'Tell us about a decision you made that was correct but unpopular. Why did you stand by it?',
    developmentAction: 'Prepare two honest stories: one failure with the lesson, and one integrity decision you defended.',
  },
  {
    id: 'leadership',
    name: 'Leadership & initiative',
    short: 'Leadership',
    description: 'Taking charge of a task without being told, organising people and accepting the outcome.',
    highNote: 'You initiate, organise and stay accountable for the result.',
    lowNote: 'You tend to wait for instructions before acting.',
    panelQuestion: 'Give an example of a task you started on your own initiative. What was the result?',
    developmentAction: 'Write three initiative stories using point → action → result, each with a measurable outcome.',
  },
  {
    id: 'teamwork',
    name: 'Teamwork & public dealing',
    short: 'Teamwork',
    description: 'Working with people of different backgrounds, including those you disagree with.',
    highNote: 'You accommodate difference, share credit and stay respectful in conflict.',
    lowNote: 'Conflict tends to become personal or you withdraw from the group.',
    panelQuestion: 'Tell us about a team member who was not performing. How did you handle it?',
    developmentAction: 'Practise describing a conflict from the other person’s point of view before your own.',
  },
  {
    id: 'communication',
    name: 'Communication confidence',
    short: 'Communication',
    description: 'Expressing a clear position in Urdu or English without over-hedging or over-talking.',
    highNote: 'You express a position plainly and adjust length to your listener.',
    lowNote: 'You hedge, over-explain or lose the main point in detail.',
    panelQuestion: 'Explain one government policy to a citizen in ninety seconds.',
    developmentAction: 'Record a 90-second explainer daily and cut the first and last sentence of what you say.',
  },
  {
    id: 'service-motivation',
    name: 'Service motivation & realism',
    short: 'Motivation',
    description: 'Whether your reasons for applying are specific, honest and grounded in the actual duties of the post.',
    highNote: 'Your motivation is specific to the post and matches realistic service conditions.',
    lowNote: 'Motivation sounds generic, or rests only on job security and prestige.',
    panelQuestion: 'If you were posted to a difficult station away from your city for five years, what would you do?',
    developmentAction: 'Write a five-sentence motivation statement naming the post, one duty and one personal reason.',
  },
];

export const LIKERT_LABELS = [
  'Strongly disagree',
  'Disagree',
  'Neutral',
  'Agree',
  'Strongly agree',
] as const;

export interface LikertItem {
  id: string;
  dimension: PersonalityDimensionId;
  text: string;
  /** 'reverse' items are scored from the opposite end to catch straight-lining. */
  direction: 'positive' | 'reverse';
}

export const LIKERT_ITEMS: LikertItem[] = [
  { id: 'comp-1', dimension: 'composure', text: 'When someone challenges my answer, I stay calm and restate my reasoning.', direction: 'positive' },
  { id: 'comp-2', dimension: 'composure', text: 'A rude question makes me defensive or flustered for the rest of the interview.', direction: 'reverse' },
  { id: 'comp-3', dimension: 'composure', text: 'I can say "I do not know" without losing confidence.', direction: 'positive' },
  { id: 'comp-4', dimension: 'composure', text: 'I lose my train of thought when the panel interrupts me.', direction: 'reverse' },
  { id: 'intg-1', dimension: 'integrity', text: 'I clearly own my mistakes instead of explaining how others caused them.', direction: 'positive' },
  { id: 'intg-2', dimension: 'integrity', text: 'Shortcuts are acceptable in an office if the outcome is good.', direction: 'reverse' },
  { id: 'intg-3', dimension: 'integrity', text: 'I would report a serious irregularity even if a senior colleague was involved.', direction: 'positive' },
  { id: 'intg-4', dimension: 'integrity', text: 'I avoid mentioning my failures in an interview.', direction: 'reverse' },
  { id: 'lead-1', dimension: 'leadership', text: 'When a task has no owner, I take it up rather than wait for instructions.', direction: 'positive' },
  { id: 'lead-2', dimension: 'leadership', text: 'I prefer that someone else decides so I am not answerable for the result.', direction: 'reverse' },
  { id: 'lead-3', dimension: 'leadership', text: 'I can organise a small team and follow through to the deadline.', direction: 'positive' },
  { id: 'lead-4', dimension: 'leadership', text: 'I do my own part well but avoid leading group work.', direction: 'reverse' },
  { id: 'team-1', dimension: 'teamwork', text: 'I work comfortably with people whose views and background differ from mine.', direction: 'positive' },
  { id: 'team-2', dimension: 'teamwork', text: 'When a team member underperforms, I would rather complain upward than talk to them.', direction: 'reverse' },
  { id: 'team-3', dimension: 'teamwork', text: 'I stay respectful with an angry member of the public even when the anger is directed at me.', direction: 'positive' },
  { id: 'team-4', dimension: 'teamwork', text: 'Conflict in a team usually leaves me unwilling to cooperate further.', direction: 'reverse' },
  { id: 'comm-1', dimension: 'communication', text: 'I can state my position in one or two sentences before explaining it.', direction: 'positive' },
  { id: 'comm-2', dimension: 'communication', text: 'I use "maybe", "kind of" and "I think" so often that my position becomes unclear.', direction: 'reverse' },
  { id: 'comm-3', dimension: 'communication', text: 'I adjust how long I speak to match what the listener actually wants.', direction: 'positive' },
  { id: 'comm-4', dimension: 'communication', text: 'I keep talking because silence in an interview feels unsafe.', direction: 'reverse' },
  { id: 'motv-1', dimension: 'service-motivation', text: 'I can name specific duties of this post that I want to perform.', direction: 'positive' },
  { id: 'motv-2', dimension: 'service-motivation', text: 'My main reason for applying is job security and prestige.', direction: 'reverse' },
  { id: 'motv-3', dimension: 'service-motivation', text: 'I am prepared to serve at a difficult station if the post requires it.', direction: 'positive' },
  { id: 'motv-4', dimension: 'service-motivation', text: 'I would leave this post early if something better appeared elsewhere.', direction: 'reverse' },
];

export interface SituationalOption {
  id: string;
  text: string;
  /** 4 = best practice for a public office; 1 = poor practice. */
  score: 1 | 2 | 3 | 4;
  rationale: string;
}

export interface SituationalItem {
  id: string;
  dimension: PersonalityDimensionId;
  scenario: string;
  options: SituationalOption[];
}

/** Scored options are written for practice discussion — they are not official answers. */
export const SITUATIONAL_ITEMS: SituationalItem[] = [
  {
    id: 'sit-1',
    dimension: 'integrity',
    scenario: 'A supplier payment file reaches you without the required inspection report, and the officer who sent it is your senior.',
    options: [
      { id: 'a', text: 'Return the file with a written note that the inspection report is missing.', score: 4, rationale: 'Correcting the record in writing protects both the public money and yourself.' },
      { id: 'b', text: 'Process it now and ask for the report later.', score: 2, rationale: 'The irregularity is created at once; recovery afterwards is difficult.' },
      { id: 'c', text: 'Return the file without explaining why.', score: 2, rationale: 'Refusing without a reason invites delay instead of compliance.' },
      { id: 'd', text: 'Process it because a senior officer has already signed.', score: 1, rationale: 'Seniority does not substitute for a required document.' },
    ],
  },
  {
    id: 'sit-2',
    dimension: 'composure',
    scenario: 'In the middle of your interview the chairperson says your qualifications are weak and asks whether you wasted the panel’s time.',
    options: [
      { id: 'a', text: 'Answer calmly, state what you have achieved with your qualifications, and ask if they wish you to clarify further.', score: 4, rationale: 'Keeps the floor, corrects the record factually and does not concede the point emotionally.' },
      { id: 'b', text: 'Apologise at length and offer to withdraw.', score: 1, rationale: 'Surrendering under an intentional stress probe reads as an absence of composure.' },
      { id: 'c', text: 'Argue that the panel has misunderstood your record.', score: 2, rationale: 'Contesting the panel’s framing is unnecessary; correcting facts is enough.' },
      { id: 'd', text: 'Go silent and wait for the next question.', score: 2, rationale: 'Silence leaves the challenge unanswered when a short reply would settle it.' },
    ],
  },
  {
    id: 'sit-3',
    dimension: 'teamwork',
    scenario: 'You are posted to a counter where a citizen is shouting about a delay that was caused by another office.',
    options: [
      { id: 'a', text: 'Acknowledge the delay, explain the exact stage where the file is, and give a specific next step and time.', score: 4, rationale: 'Turns emotion into information and commits to an actionable next step.' },
      { id: 'b', text: 'Tell the citizen the delay is not your office’s fault.', score: 1, rationale: 'Factually true, but it transfers the problem back to the citizen and escalates the scene.' },
      { id: 'c', text: 'Ask security to remove the citizen.', score: 1, rationale: 'Escalating force before attempting service is disproportionate.' },
      { id: 'd', text: 'Take his documents and promise to look into it later.', score: 2, rationale: 'Accepting papers without a recorded commitment creates a fresh failure.' },
    ],
  },
  {
    id: 'sit-4',
    dimension: 'leadership',
    scenario: 'Three days before a district event, you discover that a key task assigned to you has not been started and your supervisor is unavailable.',
    options: [
      { id: 'a', text: 'Assess what is achievable, redistribute the work with clear owners, and inform the supervisor in writing.', score: 4, rationale: 'Takes initiative while keeping the chain informed — the essence of administrative leadership.' },
      { id: 'b', text: 'Do only your own share and let the event handle itself.', score: 1, rationale: 'Abandons the shared outcome the office is judged on, and leaves colleagues to absorb the failure.' },
      { id: 'c', text: 'Wait for the supervisor to return before deciding anything.', score: 2, rationale: 'Safe but passive; the deadline is lost in the meantime.' },
      { id: 'd', text: 'Complain to a colleague about the incompetent assignment.', score: 1, rationale: 'Displacement of responsibility without action.' },
    ],
  },
  {
    id: 'sit-5',
    dimension: 'service-motivation',
    scenario: 'You are offered a comfortable city posting and a field posting in a remote district with the same pay.',
    options: [
      { id: 'a', text: 'Ask about the duties of both and choose the one where your skills are needed, accepting the field posting if it fits.', score: 4, rationale: 'Service orientation with realistic self-assessment.' },
      { id: 'b', text: 'Take the city posting because family convenience is decisive.', score: 3, rationale: 'A legitimate personal consideration — panels accept it if stated honestly.' },
      { id: 'c', text: 'Say you will go anywhere, then seek transfer at the first opportunity.', score: 1, rationale: 'Insincere flexibility is worse than an honest preference.' },
      { id: 'd', text: 'Refuse the field posting without discussion.', score: 1, rationale: 'Refusing a lawful duty without reasons is a poor fit signal for public service.' },
    ],
  },
  {
    id: 'sit-6',
    dimension: 'communication',
    scenario: 'A panel member asks a vague question and you are not certain what is being asked.',
    options: [
      { id: 'a', text: 'Ask a short clarifying question, then answer the clarified point.', score: 4, rationale: 'Precision beats guessing, and a brief clarification request reads as confidence.' },
      { id: 'b', text: 'Answer whatever related topic you know well.', score: 1, rationale: 'Answering a different question is the most common interview failure.' },
      { id: 'c', text: 'Stay silent until the member repeats the question.', score: 2, rationale: 'Passive and wastes the panel’s time.' },
      { id: 'd', text: 'Apologise for not knowing and change the subject.', score: 1, rationale: 'Confuses a communication problem with a knowledge problem.' },
    ],
  },
  {
    id: 'sit-7',
    dimension: 'integrity',
    scenario: 'A relative asks you to speed up their application after you join the department.',
    options: [
      { id: 'a', text: 'Explain the standard process and tell them you will not intervene, then let them use the normal channel.', score: 4, rationale: 'Maintains the principle in words and behaviour without a confrontation.' },
      { id: 'b', text: 'Push the file quietly because it is only a small favour.', score: 1, rationale: 'Discretionary favouritism is exactly what conduct rules prohibit.' },
      { id: 'c', text: 'Promise to try and never act on it.', score: 2, rationale: 'Avoids the conflict but creates a false expectation.' },
      { id: 'd', text: 'Report the relative to the department.', score: 2, rationale: 'Disproportionate; a private refusal resolves the situation.' },
    ],
  },
  {
    id: 'sit-8',
    dimension: 'composure',
    scenario: 'You realise mid-answer that you have quoted a figure incorrectly.',
    options: [
      { id: 'a', text: 'Correct yourself immediately and continue with the right figure or the order of magnitude.', score: 4, rationale: 'Self-correction is a strength signal; panels respect accuracy over ego.' },
      { id: 'b', text: 'Continue and hope nobody noticed.', score: 1, rationale: 'The panel almost always notices, and the error is now also an honesty issue.' },
      { id: 'c', text: 'Stop answering and apologise repeatedly.', score: 2, rationale: 'Over-correction costs the rest of the answer.' },
      { id: 'd', text: 'Blame the source you read it from.', score: 1, rationale: 'Deflection instead of accountability.' },
    ],
  },
];

/** Practice probes that the psychologist seat tends to follow up with. */
export const PSYCHOLOGICAL_FOLLOW_UPS: Record<PersonalityDimensionId, string[]> = {
  composure: [
    'You said you stay calm — give me an example with names and dates.',
    'What is the harshest criticism you have received, and what did you do with it?',
  ],
  integrity: [
    'Tell us about a time you were tempted to take a shortcut.',
    'Has a senior ever asked you to do something improper? What happened?',
  ],
  leadership: [
    'How do you handle a team member who refuses your instructions?',
    'Describe a decision you made that others opposed.',
  ],
  teamwork: [
    'You will work with people from other provinces and districts. How will you manage that?',
    'Tell us about a group task that failed — what was your contribution to the failure?',
  ],
  communication: [
    'Explain your last job or study project to a citizen in ninety seconds.',
    'Summarise your answer to the previous question in one sentence.',
  ],
  'service-motivation': [
    'Why this department and not another?',
    'What will you do if you are posted far from your family for years?',
  ],
};

/* ------------------------------------------------------------------ *
 * Practical preparation checklists and interview-day rules.
 * ------------------------------------------------------------------ */

export interface ChecklistGroup {
  id: string;
  title: string;
  note: string;
  items: string[];
}

export const INTERVIEW_DAY_CHECKLIST: ChecklistGroup[] = [
  {
    id: 'documents',
    title: 'Documents to carry',
    note: 'Order your file exactly as the advertisement or call letter lists the documents.',
    items: [
      'Printed call letter / admit slip and a copy of the application form',
      'Original CNIC plus two attested photocopies',
      'Domicile certificate (original and attested copy)',
      'All degree/transcript originals with attested sets, plus equivalence where required',
      'Experience letters, NOC and quota/disability certificates you claimed',
      'Roll-number slip or result card for the written test stage',
      'Passport-size photographs as specified in the call letter',
      'A blue/black pen and a thin plain folder — not a decorative file',
    ],
  },
  {
    id: 'rehearsal',
    title: 'Rehearsal routine (last 14 days)',
    note: 'Preparation for the spoken stage is physical as much as academic.',
    items: [
      'Two timed mock interviews per week in this module, with cross-questioning on',
      'One recorded 90-second answer per day, replayed once for wording and filler words',
      'One hostile question per day answered without changing tone',
      'Read one newspaper editorial aloud daily and summarise it in four sentences',
      'Rehearse the document file arrangement once, under time pressure',
      'Prepare five district examples and five personal-accountability examples you can reuse',
      'Write and memorise a five-sentence motivation statement for the exact post',
    ],
  },
  {
    id: 'day',
    title: 'Interview day',
    note: 'The panel forms its view in the first two minutes — most of that is presentation, not knowledge.',
    items: [
      'Arrive at least 45 minutes early; locate the room and the verification desk first',
      'Carry water, use the washroom, switch the phone off — not silent, off',
      'Formal, plain, well-fitted clothing; neat hair; no strong fragrance',
      'Greet the chairperson, wait to be seated, sit upright with hands on your lap or on your file',
      'Answer in the language of the question; keep each answer 60–120 seconds unless invited to continue',
      'Never invent a fact; say what you know, state the limit of your knowledge, and move on',
      'Thank the panel briefly and do not ask for feedback while leaving the room',
    ],
  },
];

export const INTERVIEW_DO_DONT: { do: string[]; dont: string[] } = {
  do: [
    'Answer the question asked, then add depth if invited',
    'Use one specific example for every claim about yourself',
    'State your reasoning even when you are unsure of the facts',
    'Disagree politely, with evidence, and stay on the question',
    'Own your record — marks, gaps, failures and transfers',
  ],
  dont: [
    'Do not recite a memorised paragraph that does not fit the question',
    'Do not blame teachers, examiners, politicians or your previous employer',
    'Do not switch languages mid-answer to impress the panel',
    'Do not argue about marks, quotas or merit in the interview room',
    'Do not guess at statistics — an admitted gap is safer than an invented figure',
  ],
};
