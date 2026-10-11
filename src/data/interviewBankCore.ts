/**
 * Interview question bank — core areas.
 *
 * These are practice prompts written for MUQABIL's interview module. They are
 * deliberately NOT presented as an official question paper: panels ask their
 * own questions, and interview content changes every cycle. Each item lists
 * what an interviewer commonly listens for, a structure skeleton and the two
 * mistakes that sink otherwise good answers.
 *
 * Questions that rest on a verifiable public fact carry a source link. Volatile
 * numbers (exchange rates, index values, current office-holders) are avoided on
 * purpose so nothing here goes stale.
 */

import type { InterviewQuestion } from './interviewPrepData';

export const INTERVIEW_BANK_CORE: InterviewQuestion[] = [
  /* ---------------------- Introduction & motivation ---------------------- */
  {
    id: 'iv-intro-1',
    category: 'intro-motivation',
    tracks: 'all',
    difficulty: 'Warm-up',
    prompt: 'Please introduce yourself — who you are, what you have studied, and what brings you into this room.',
    followUps: [
      'You mentioned your district. What is the single biggest problem there?',
      'Which part of your own introduction do you think was weakest?',
    ],
    expectedPoints: [
      'A 60–90 second arc: home and education, then two concrete achievements, then the post you are applying for',
      'One distinctive detail the panel can pick up later (a prize, a project, a job, a language)',
      'A closing sentence linking your record to the duties of this post',
    ],
    structureHint: [
      'Identity in one line — name, district, degree',
      'Evidence line — one achievement with a measurable outcome',
      'Fit line — what you understand this post to require and why it suits you',
    ],
    commonMistakes: [
      'Narrating the whole family tree and every school you attended',
      'Ending without ever naming the post or the reason for applying',
    ],
    targetSeconds: 75,
  },
  {
    id: 'iv-intro-2',
    category: 'intro-motivation',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'Why do you want to join this service or department rather than take a private-sector job?',
    followUps: [
      'Give us one duty of this post that you are looking forward to, and one you are not.',
      'What would you say if a private firm offered you twice the salary next month?',
    ],
    expectedPoints: [
      'A reason that is specific to this post, not a generic speech about serving the nation',
      'Evidence you know what the job actually involves, including postings, counters and files',
      'An honest mention of security or prestige, placed second to the work itself',
    ],
    structureHint: [
      'Your reason in one sentence',
      'One duty you have researched and want to perform',
      'What you accept as the price of it (station, workload, slow progression)',
    ],
    commonMistakes: [
      'Reciting “I want to serve my country” with no specific reason attached',
      'Denying that job security matters when the panel knows it does',
    ],
    targetSeconds: 90,
  },
  {
    id: 'iv-intro-3',
    category: 'intro-motivation',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'What do you understand to be the duties of the post you have applied for?',
    followUps: [
      'Which of those duties would you find hardest, and why?',
      'Who would you report to on your first day?',
    ],
    expectedPoints: [
      'Two or three concrete duties described in operational language, not the advertisement text',
      'Awareness of the reporting line and of public dealing at this level',
      'Recognition that the post serves citizens, not only the department',
    ],
    structureHint: [
      'Headline duty of the post',
      'Two operational duties with examples',
      'The service standard you would hold yourself to',
    ],
    commonMistakes: [
      'Reproducing the advertisement’s wording without explaining any duty',
      'Confusing the post with a much senior administrative role',
    ],
    targetSeconds: 90,
  },
  {
    id: 'iv-intro-4',
    category: 'intro-motivation',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'Where do you see yourself ten years from now within this service?',
    followUps: [
      'What is the first promotion you expect, and on what does it depend?',
      'What would you do if you were still at the same level after ten years?',
    ],
    expectedPoints: [
      'A realistic progression tied to departmental promotion rules and seniority',
      'Competence you intend to build (subject specialisation, financial rules, IT, language)',
      'A willingness to keep performing if promotions are slow',
    ],
    structureHint: [
      'Immediate role and what you must master in it',
      'Mid-term specialisation or examination you intend to take',
      'Long-term contribution to the department’s core work',
    ],
    commonMistakes: [
      'Answering with a political or “I will be the Secretary” ambition',
      'Showing that the only thing you value is promotion',
    ],
    targetSeconds: 75,
  },
  {
    id: 'iv-intro-5',
    category: 'intro-motivation',
    tracks: 'all',
    difficulty: 'Stress',
    prompt: 'You may be posted anywhere in the province, at a station far from your family. Are you prepared, and why should we believe you?',
    followUps: [
      'Give one concrete arrangement you have already made, or will make, for that situation.',
      'What if the posting is in a district where the local language is not your first language?',
    ],
    expectedPoints: [
      'An unambiguous yes or no, followed by reasoning rather than hedging',
      'One practical arrangement (housing, family, study plan) that makes the claim believable',
      'Willingness to learn the local language or adapt culturally',
    ],
    structureHint: [
      'Clear statement of willingness',
      'Practical arrangement that supports it',
      'What you expect to gain professionally from a field station',
    ],
    commonMistakes: [
      'Saying yes while visibly hesitating, which reads as insincerity',
      'Claiming total disregard for family in a way no panel believes',
    ],
    targetSeconds: 75,
  },
  {
    id: 'iv-intro-6',
    category: 'intro-motivation',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'What is the difference between a job and public service?',
    followUps: [
      'Which of the two will you actually be doing in this post?',
      'Give an example of a public servant acting as more than an employee.',
    ],
    expectedPoints: [
      'A job exchanges work for salary; public service adds accountability to citizens and to law',
      'Concrete example of the difference in behaviour at a counter or in the field',
      'Recognition that the state’s money and authority are held in trust',
    ],
    structureHint: [
      'Definition in one line',
      'One example from ordinary office life',
      'What it means for your own conduct',
    ],
    commonMistakes: [
      'Idealising public service to the point of sounding detached from reality',
      'Lecturing the panel on morality instead of answering the question',
    ],
    targetSeconds: 75,
  },
  {
    id: 'iv-intro-7',
    category: 'intro-motivation',
    tracks: 'all',
    difficulty: 'Stress',
    prompt: 'Candidates with better marks than you may be in this room today. Why should the commission select you?',
    followUps: [
      'What can you do that a higher-scoring candidate possibly cannot?',
      'Marks aside, where is your record weaker than the others here?',
    ],
    expectedPoints: [
      'Two differentiators supported by evidence, not adjectives',
      'A candid acknowledgement of one weakness and how you compensate for it',
      'Suitability for the specific post — work habits, field readiness, subject command',
    ],
    structureHint: [
      'Accept the premise calmly',
      'Two differentiators with proof',
      'One honest limitation and your mitigation',
    ],
    commonMistakes: [
      'Disparaging other candidates or the examination system',
      'Listing adjectives (“hardworking, honest, dedicated”) with nothing behind them',
    ],
    targetSeconds: 90,
  },
  {
    id: 'iv-intro-8',
    category: 'intro-motivation',
    tracks: 'all',
    difficulty: 'Stress',
    prompt: 'If you are not selected this time, what will you do?',
    followUps: [
      'How many attempts do you have left, and what will you change in the next one?',
      'Would you take a lower-grade post in the same department to stay in the system?',
    ],
    expectedPoints: [
      'A plan that shows continuity — analysis of the gap, a specific improvement, a date to re-attempt',
      'Acceptance of the result without blaming the commission',
      'Alternative productive path (study, teaching, current job) rather than despair',
    ],
    structureHint: [
      'Accept the possibility plainly',
      'Name the weakest area you would fix and how',
      'State your next concrete step and its timeline',
    ],
    commonMistakes: [
      'Becoming emotional or issuing a complaint about merit and quotas',
      'Claiming you have not considered the possibility at all',
    ],
    targetSeconds: 75,
  },
  {
    id: 'iv-intro-9',
    category: 'intro-motivation',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'State your greatest strength and prove it with something you have actually done.',
    followUps: [
      'How has that strength ever created a problem for you?',
      'Who else noticed that strength, and what did they say?',
    ],
    expectedPoints: [
      'One strength, described behaviourally rather than as an adjective',
      'A specific episode with a measurable result',
      'Second-order effect or how you keep the strength in balance',
    ],
    structureHint: [
      'Name the strength in a sentence',
      'The episode: situation, what you did, the result',
      'The limit of it or what you watch for',
    ],
    commonMistakes: [
      'Choosing a strength unrelated to the post',
      'Telling the story without a result or any consequence',
    ],
    targetSeconds: 90,
  },
  {
    id: 'iv-intro-10',
    category: 'intro-motivation',
    tracks: 'all',
    difficulty: 'Stress',
    prompt: 'Which posting in this service would you refuse, and why?',
    followUps: [
      'Is that refusal consistent with what you said about serving anywhere?',
      'If the department insisted, what would you do?',
    ],
    expectedPoints: [
      'A candid answer that names a genuine constraint (health, family, safety, competence)',
      'Acknowledgment that refusal is exceptional and needs to be justified in writing under the rules',
      'Consistency with earlier answers about mobility',
    ],
    structureHint: [
      'State the type of posting you would find difficult',
      'Give the real reason honestly',
      'Explain how you would seek a lawful accommodation rather than simply refuse',
    ],
    commonMistakes: [
      'Claiming you would refuse nothing, which contradicts human reality',
      'Refusing a whole department or district out of preference rather than a real constraint',
    ],
    targetSeconds: 90,
  },

  /* ------------------------- Personal background ------------------------- */
  {
    id: 'iv-bg-1',
    category: 'personal-background',
    tracks: 'all',
    difficulty: 'Warm-up',
    prompt: 'Tell us about your family background and how it shaped your study habits.',
    followUps: [
      'Was anyone in your family in government service? What did you learn from them?',
      'Who financed your education, and what did that cost them?',
    ],
    expectedPoints: [
      'A brief, dignified description without over-sharing',
      'One habit or value traceable to your upbringing',
      'Recognition of the sacrifices that made your education possible',
    ],
    structureHint: [
      'Who is in the family and what they do, in two lines',
      'One habit it produced in you',
      'How that habit helped you pass the written stage',
    ],
    commonMistakes: [
      'Turning the answer into a hardship narrative unrelated to the post',
      'Criticising family members or their choices',
    ],
    targetSeconds: 75,
  },
  {
    id: 'iv-bg-2',
    category: 'personal-background',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'Walk us through your education and tell us which subject you were strongest and weakest in.',
    followUps: [
      'Why was the weak subject weak — was it teaching, interest or effort?',
      'Which subject from your degree will help you in this post?',
    ],
    expectedPoints: [
      'A clean, chronological account with institutions and years',
      'Honest identification of a weak area with a stated reason',
      'A link between one subject and the work of the post',
    ],
    structureHint: [
      'The academic line without gaps in the narrative',
      'Strongest subject with one proof',
      'Weakest subject with the reason and what you did about it',
    ],
    commonMistakes: [
      'Hiding the weak subject and being caught by a question on it',
      'Blaming teachers or the examination board for the result',
    ],
    targetSeconds: 90,
  },
  {
    id: 'iv-bg-3',
    category: 'personal-background',
    tracks: 'all',
    difficulty: 'Stress',
    prompt: 'There is a gap or an unusual pattern in your record. Explain it.',
    followUps: [
      'What did you do during that period that is verifiable?',
      'If you could redo that time, what specifically would you change?',
    ],
    expectedPoints: [
      'A factual, non-defensive account of the gap with dates',
      'Evidence of productive activity — study, work, health recovery, family duty',
      'One lesson that improved how you plan now',
    ],
    structureHint: [
      'State the reason in one sentence',
      'What you did in that period',
      'What you changed afterwards, with an example',
    ],
    commonMistakes: [
      'Over-explaining with a long excuse that raises new doubts',
      'Providing dates that contradict the application form',
    ],
    targetSeconds: 75,
  },
  {
    id: 'iv-bg-4',
    category: 'personal-background',
    tracks: 'all',
    difficulty: 'Warm-up',
    prompt: 'Which books have you read recently, and what did you take from them?',
    followUps: [
      'What did the author argue that you disagreed with?',
      'Which book changed how you study or work?',
    ],
    expectedPoints: [
      'Two or three concrete titles with authors or subjects',
      'A genuine insight, not a summary of a synopsis',
      'One point of disagreement — evidence that you read actively',
    ],
    structureHint: [
      'Name the books briefly',
      'Take one and explain its main argument',
      'Add what you accepted, doubted or applied',
    ],
    commonMistakes: [
      'Naming textbooks or guidebooks only',
      'Recommending a book you cannot discuss for thirty seconds',
    ],
    targetSeconds: 90,
  },
  {
    id: 'iv-bg-5',
    category: 'personal-background',
    tracks: 'all',
    difficulty: 'Warm-up',
    prompt: 'What are your hobbies, and what have they taught you?',
    followUps: [
      'How much time do you actually give to it in a normal week?',
      'How would that hobby survive a field posting?',
    ],
    expectedPoints: [
      'Real, specific hobbies described with some detail',
      'A transferable trait — discipline, patience, teamwork, health, creativity',
      'A realistic account of how it fits into a busy posting',
    ],
    structureHint: [
      'Name the hobby and how long you have pursued it',
      'One concrete achievement or routine within it',
      'The trait it has built in you',
    ],
    commonMistakes: [
      'Answering with vague “reading and cricket” and then going blank',
      'Choosing a hobby only to mirror the department’s work',
    ],
    targetSeconds: 60,
  },
  {
    id: 'iv-bg-6',
    category: 'personal-background',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'Tell us about an extra-curricular activity you led, including what went wrong in it.',
    followUps: [
      'What would you do differently if you led it again?',
      'Who disagreed with your decisions, and how did you handle it?',
    ],
    expectedPoints: [
      'A real activity where you held responsibility',
      'An honest failure or difficulty within it',
      'A corrective lesson stated as a future behaviour',
    ],
    structureHint: [
      'What the activity was and your exact role',
      'The problem that arose, without assigning blame',
      'The change you would make now',
    ],
    commonMistakes: [
      'Describing a role you did not really hold',
      'Claiming the activity was flawless, which sounds unexamined',
    ],
    targetSeconds: 90,
  },
  {
    id: 'iv-bg-7',
    category: 'personal-background',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'Who has influenced you most, and where would you disagree with that person?',
    followUps: [
      'What did you copy from them in your own behaviour?',
      'Has your view of them changed with time?',
    ],
    expectedPoints: [
      'A named influence with a specific behaviour or lesson',
      'Independence of mind — one genuine point of disagreement',
      'Evidence of self-reflection rather than hero-worship',
    ],
    structureHint: [
      'Name the influence and the lesson',
      'One example of copying that lesson',
      'One respectful disagreement',
    ],
    commonMistakes: [
      'Choosing a political figure and drifting into politics',
      'Claiming total agreement, which shows no independent judgment',
    ],
    targetSeconds: 75,
  },
  {
    id: 'iv-bg-8',
    category: 'personal-background',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'What have you done for your local community, without being asked?',
    followUps: [
      'What did it cost you in time or money?',
      'Who benefited, and how did you verify the benefit?',
    ],
    expectedPoints: [
      'A concrete act — tuition, blood donation drives, flooding relief, mosque/school work, awareness campaigns',
      'Personal initiative rather than a family or party obligation',
      'A result you actually observed',
    ],
    structureHint: [
      'The problem you saw in the community',
      'What you personally organised',
      'The outcome and what you learned about mobilising people',
    ],
    commonMistakes: [
      'Describing a project someone else ran',
      'Inflating a small act into a district-level programme',
    ],
    targetSeconds: 75,
  },

  /* ------------------------- Pakistan affairs ------------------------- */
  {
    id: 'iv-pk-1',
    category: 'pakistan-affairs',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'Explain how the 18th Amendment changed the distribution of powers between the federation and the provinces.',
    followUps: [
      'Which subjects became provincial, and where has implementation been slow?',
      'What did the amendment do to the concurrent list?',
    ],
    expectedPoints: [
      'The concurrent legislative list was abolished and most subjects devolved',
      'Provincial autonomy increased, including in education, health and local government',
      'New federal-provincial coordination requirements (CCI, NFC) gained importance',
    ],
    structureHint: [
      'What the amendment did in principle',
      'The mechanics: subjects, institutions, fiscal implications',
      'One practical consequence for service delivery',
    ],
    commonMistakes: [
      'Listing subjects without explaining the constitutional change',
      'Turning the answer into a political debate about federalism',
    ],
    targetSeconds: 120,
    sourceRef: { label: 'Constitution of Pakistan — 18th Amendment text', url: 'https://www.pakistani.org/pakistan/constitution/amendments/18amendment.html' },
  },
  {
    id: 'iv-pk-2',
    category: 'pakistan-affairs',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc', 'department-panel'],
    difficulty: 'Standard',
    prompt: 'What is the National Finance Commission Award, and why do provinces disagree about it?',
    followUps: [
      'Which, in your view, should weigh more — population or poverty/revenue generation?',
      'How does the Award affect a small province or a district like yours?',
    ],
    expectedPoints: [
      'The NFC distributes federal divisible pool resources between the federation and provinces under Article 160',
      'Disagreements centre on the weight given to population versus need, revenue generation and inverse population density',
      'Consequences reach provincial budgets and therefore to schools, health and district services',
    ],
    structureHint: [
      'The constitutional basis and purpose',
      'The formula debate in plain terms',
      'What it means for service delivery in one province',
    ],
    commonMistakes: [
      'Quoting exact percentages a decade old as if current',
      'Declaring a favourite province rather than explaining the trade-offs',
    ],
    targetSeconds: 120,
    sourceRef: { label: 'Ministry of Finance — NFC Award documents and notices', url: 'https://www.finance.gov.pk/' },
  },
  {
    id: 'iv-pk-3',
    category: 'pakistan-affairs',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc'],
    difficulty: 'Standard',
    prompt: 'Is Pakistan’s current economic difficulty mainly a debt problem, a tax problem, or a productivity problem? Defend your choice.',
    followUps: [
      'What is the strongest argument against your position?',
      'Name one administrative measure that would improve the problem at your level of the system.',
    ],
    expectedPoints: [
      'A clear position with a mechanism, not a list of complaints',
      'Reference to at least one structural fact — tax base, energy costs, import dependence',
      'An administrative action within the candidate’s own future authority',
    ],
    structureHint: [
      'Your position in one sentence',
      'Two supporting mechanisms with evidence',
      'The counter-argument, answered briefly, then your action',
    ],
    commonMistakes: [
      'Reciting headlines about default and inflation with no mechanism',
      'Attaching the whole problem to one political party',
    ],
    targetSeconds: 120,
    sourceRef: { label: 'State Bank of Pakistan — statistical and policy publications', url: 'https://www.sbp.org.pk/' },
  },
  {
    id: 'iv-pk-4',
    category: 'pakistan-affairs',
    tracks: ['css', 'pms', 'spsc-cce'],
    difficulty: 'Standard',
    prompt: 'What causes the power-sector circular debt, and what could an officer in a distribution company or department realistically do about it?',
    followUps: [
      'Which part of the problem is technical loss and which is governance?',
      'How would you measure whether your measure worked?',
    ],
    expectedPoints: [
      'Gap between cost of service and recovery — tariffs, losses, non-payment and capacity payments',
      'Operational levers: metering, theft control, bill recovery, load management, efficiency',
      'A measurement approach — recovery rate, loss percentage, complaint resolution time',
    ],
    structureHint: [
      'Mechanism of the debt in three sentences',
      'The levers available at operational level',
      'How you would verify improvement',
    ],
    commonMistakes: [
      'Discussing only tariff politics without operational causes',
      'Proposing a policy change far above the post’s authority',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-pk-5',
    category: 'pakistan-affairs',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc'],
    difficulty: 'Standard',
    prompt: 'Why has a growing population not produced a demographic dividend in Pakistan?',
    followUps: [
      'What would a realistic district-level intervention look like?',
      'Which ministries are involved in the response, and how do they coordinate?',
    ],
    expectedPoints: [
      'Dividend requires education, health, skills and jobs — not numbers alone',
      'Low female labour participation, learning outcomes and job creation are the binding constraints',
      'Coordination between population, education, health and labour functions',
    ],
    structureHint: [
      'Define the dividend condition briefly',
      'Explain the constraining factors with evidence',
      'One district-level intervention and its measure',
    ],
    commonMistakes: [
      'Treating population size itself as the dividend',
      'Moralising about family planning instead of analysing the economics',
    ],
    targetSeconds: 120,
    sourceRef: { label: 'Pakistan Bureau of Statistics — population and labour data', url: 'https://www.pbs.gov.pk/' },
  },
  {
    id: 'iv-pk-6',
    category: 'pakistan-affairs',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc'],
    difficulty: 'Standard',
    prompt: 'What is the Council of Common Interests, and why does it matter in federal-provincial disputes?',
    followUps: [
      'Give an example of a subject that has come before it.',
      'How is its decision enforced?',
    ],
    expectedPoints: [
      'A constitutional body (Article 153) with federal and provincial representation chaired by the Prime Minister',
      'It formulates and regulates policies on subjects in the Part-II federal legislative list',
      'It is the formal forum for resolving federal-provincial friction',
    ],
    structureHint: [
      'What it is and who sits on it',
      'What it decides',
      'Why a provincial officer should understand its outcomes',
    ],
    commonMistakes: [
      'Confusing it with the NFC or the National Economic Council',
      'Describing it as a court or an appellate authority',
    ],
    targetSeconds: 90,
    sourceRef: { label: 'Constitution of Pakistan — Articles 153–155', url: 'https://www.pakistani.org/pakistan/constitution/part5.html' },
  },
  {
    id: 'iv-pk-7',
    category: 'pakistan-affairs',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc', 'department-panel', 'sts', 'nts'],
    difficulty: 'Standard',
    prompt: 'What is the significance of the Objectives Resolution in Pakistan’s constitutional history?',
    followUps: [
      'How is it reflected in the present Constitution?',
      'Which parts of it took the longest to implement?',
    ],
    expectedPoints: [
      'Passed in 1949, it set the ideological direction: sovereignty of Allah, democracy, equality and minority rights',
      'It became a substantive part of the Constitution as a preamble/Article 2-A after the Eighth Amendment',
      'It shaped later debates on the Islamic provisions of the Constitution',
    ],
    structureHint: [
      'What it declared and when',
      'Its constitutional journey into the present text',
      'One modern implication, e.g. rights of minorities',
    ],
    commonMistakes: [
      'Treating it as the Constitution itself rather than a foundational resolution',
      'Giving a religious lecture instead of a constitutional answer',
    ],
    targetSeconds: 90,
    sourceRef: { label: 'Constitution of Pakistan — preamble and Article 2-A', url: 'https://www.pakistani.org/pakistan/constitution/' },
  },
  {
    id: 'iv-pk-8',
    category: 'pakistan-affairs',
    tracks: ['css', 'pms', 'spsc-cce'],
    difficulty: 'Standard',
    prompt: 'How does water infrastructure in your province affect both agriculture and urban supply?',
    followUps: [
      'Where are the biggest losses, and who bears them?',
      'What administrative decision would you take first?',
    ],
    expectedPoints: [
      'Barrages, canals, distributaries and the irrigation department’s role in distribution',
      'Losses: seepage, unauthorised outlets, tail-end deprivation, urban encroachment on channels',
      'A concrete first decision — measurement, watercourse lining priority, or equitable rotation',
    ],
    structureHint: [
      'Explain the system in your province briefly',
      'Identify two losses with their consequences',
      'State your first administrative intervention and how you would measure it',
    ],
    commonMistakes: [
      'Turning the answer into a dam debate',
      'Ignoring the urban side of the question entirely',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-pk-9',
    category: 'pakistan-affairs',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc', 'nts'],
    difficulty: 'Standard',
    prompt: 'How do you judge the value of CPEC’s second phase to Pakistan so far?',
    followUps: [
      'Which sector has benefited most, and which has lagged?',
      'What risk does Pakistan carry in this relationship?',
    ],
    expectedPoints: [
      'Shift from infrastructure/energy towards industrial cooperation, agriculture, IT and special economic zones',
      'Benefits: power supply relief, road connectivity and logistics; lagging: industrial relocation and job creation',
      'Risks: debt servicing, security costs, and export capacity to repay',
    ],
    structureHint: [
      'What phase two actually consists of',
      'Evidence of progress and of slippage',
      'A balanced verdict with one condition for success',
    ],
    commonMistakes: [
      'Either uncritical praise or blanket rejection without evidence',
      'Confusing CPEC with general Chinese investment',
    ],
    targetSeconds: 120,
    sourceRef: { label: 'Planning Commission / Ministry of Planning, Development & Special Initiatives', url: 'https://www.pc.gov.pk/' },
  },
  {
    id: 'iv-pk-10',
    category: 'pakistan-affairs',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc'],
    difficulty: 'Standard',
    prompt: 'What does Article 25-A require of the state, and how would you judge whether it is being delivered in your district?',
    followUps: [
      'What data would you look at before making a claim about it?',
      'Which department is accountable for it in your province?',
    ],
    expectedPoints: [
      'Free and compulsory education for ages five to sixteen as a fundamental right after the 18th Amendment',
      'Provincial responsibility with district-level implementation',
      'Measurement: enrolment, retention, learning outcomes, teacher presence, facilities',
    ],
    structureHint: [
      'The constitutional guarantee',
      'Who implements it and at what level',
      'How you would verify delivery with specific indicators',
    ],
    commonMistakes: [
      'Discussing only gross enrolment and ignoring learning outcomes',
      'Treating it as a purely federal subject',
    ],
    targetSeconds: 120,
    sourceRef: { label: 'Constitution of Pakistan — Article 25-A', url: 'https://www.pakistani.org/pakistan/constitution/part2.ch1.html' },
  },
  {
    id: 'iv-pk-11',
    category: 'pakistan-affairs',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc', 'department-panel', 'sts'],
    difficulty: 'Standard',
    prompt: 'Policing is a provincial subject. What would you change about service delivery at the police-station level?',
    followUps: [
      'What would that change cost, and who would resist it?',
      'How would a citizen’s experience be different within one month?',
    ],
    expectedPoints: [
      'Complaint receipt and tracking — FIR registration, written acknowledgment, time limits',
      'Investigation quality, record digitisation and supervision rather than new slogans',
      'Accountability through published service standards and oversight of the district administration',
    ],
    structureHint: [
      'The specific failure in service delivery',
      'One administrative intervention with a mechanism',
      'The resistance you expect and how you would handle it',
    ],
    commonMistakes: [
      'Blaming individual policemen instead of processes',
      'Proposing structural policing reform beyond the post’s competence',
    ],
    targetSeconds: 120,
    sourceRef: { label: 'Constitution of Pakistan — Fourth Schedule (division of legislative powers)', url: 'https://www.pakistani.org/pakistan/constitution/' },
  },
  {
    id: 'iv-pk-12',
    category: 'pakistan-affairs',
    tracks: ['css', 'pms', 'spsc-cce'],
    difficulty: 'Standard',
    prompt: 'What does provincial autonomy mean in practice, and where should the balance sit between federation and provinces?',
    followUps: [
      'Give an example where coordination matters more than autonomy.',
      'What mechanism handles the disputes?',
    ],
    expectedPoints: [
      'Autonomy means legislative and administrative space for provinces within the constitutional division of powers',
      'Limits: indivisible national functions — currency, defence, foreign affairs, inter-provincial coordination',
      'Coordination instruments: CCI, NFC, inter-provincial ministerial meetings',
    ],
    structureHint: [
      'Define autonomy precisely',
      'Explain where it hits federal limits and why',
      'One example showing coordination delivers better than either extreme',
    ],
    commonMistakes: [
      'Treating autonomy as a matter of provincial grievance only',
      'Advocating separatism or centralisation as slogans',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-pk-13',
    category: 'pakistan-affairs',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc'],
    difficulty: 'Standard',
    prompt: 'Why is Pakistan’s tax-to-GDP ratio low, and what would it take to raise it?',
    followUps: [
      'Which is the harder problem — policy or administration?',
      'What could an officer in the field do about it?',
    ],
    expectedPoints: [
      'Narrow base: agriculture, real estate, retail and informal sectors outside the net',
      'Compliance: documentation, enforcement, evasion, and the cost of collection',
      'Trust factor: how collected revenue is visibly used affects willingness to pay',
    ],
    structureHint: [
      'Explain the base problem with an example',
      'Explain the administration problem',
      'Give one measure and its expected effect',
    ],
    commonMistakes: [
      'Proposing only new taxes without enforcement capacity',
      'Using the answer to make a political speech',
    ],
    targetSeconds: 120,
    sourceRef: { label: 'Federal Board of Revenue — revenue statistics and policy documents', url: 'https://www.fbr.gov.pk/' },
  },
  {
    id: 'iv-pk-14',
    category: 'pakistan-affairs',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc', 'department-panel'],
    difficulty: 'Standard',
    prompt: 'How should the state organise disaster response so that it is administratively sustainable rather than heroic every time?',
    followUps: [
      'Who has the legal mandate at district and provincial level?',
      'What is the first thing that fails in a large flood?',
    ],
    expectedPoints: [
      'District-level preparedness planning, mapping of vulnerable areas, pre-positioned stocks',
      'Coordination between NDMA/PDMA/district administration and clear triggers for escalation',
      'Data discipline: damage assessment, beneficiary lists, verification to prevent leakage',
    ],
    structureHint: [
      'Prevention and preparedness layer',
      'Response layer with roles and triggers',
      'Recovery and accountability layer with measurement',
    ],
    commonMistakes: [
      'Discussing only rescue heroics',
      'Ignoring post-disaster verification and audit',
    ],
    targetSeconds: 120,
    sourceRef: { label: 'National Disaster Management Authority — policy and plans', url: 'https://www.ndma.gov.pk/' },
  },

  /* --------------------------- Current affairs --------------------------- */
  {
    id: 'iv-ca-1',
    category: 'current-affairs',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'Choose one major international development from the last six months and explain its effect on Pakistan.',
    followUps: [
      'What is the strongest argument that you are wrong about that effect?',
      'Which Pakistani institution would have to respond first?',
    ],
    expectedPoints: [
      'A specific, dated development in two sentences — no vague “global situation”',
      'A transmission channel: trade, energy prices, security, diplomacy or finance',
      'A consequence that is concrete for Pakistan rather than a general observation',
    ],
    structureHint: [
      'State the development with its date',
      'Explain the channel of its effect',
      'Give your judgment and the assumption it rests on',
    ],
    commonMistakes: [
      'Narrating the news without analysing the effect',
      'Choosing a topic you cannot discuss beyond two lines',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-ca-2',
    category: 'current-affairs',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc'],
    difficulty: 'Standard',
    prompt: 'How do you assess Pakistan’s engagement with the IMF, and what does it mean for an ordinary citizen?',
    followUps: [
      'Which conditions are hardest to implement, and why?',
      'How would you communicate the necessary measures honestly to the public?',
    ],
    expectedPoints: [
      'The programme addresses balance-of-payments and fiscal sustainability, with conditions on tariffs, taxes and reform',
      'Transmission to the citizen: prices, subsidies, tax compliance, exchange rate and salaries',
      'The governance challenge of implementing and explaining conditional reforms',
    ],
    structureHint: [
      'What the programme is for, in one line',
      'Two effects on the citizen with mechanisms',
      'Your view of the main implementation risk',
    ],
    commonMistakes: [
      'Treating the IMF as a moral issue rather than an economic constraint',
      'Quoting a figure you cannot defend under cross-questioning',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-ca-3',
    category: 'current-affairs',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc', 'department-panel', 'sts', 'nts'],
    difficulty: 'Standard',
    prompt: 'What is the most serious governance challenge in Pakistan today, and what would you do about it if you held a mid-level post?',
    followUps: [
      'How would you measure progress within a year?',
      'Who would oppose the measure, and how would you handle it?',
    ],
    expectedPoints: [
      'One clearly named challenge with a mechanism — capacity, accountability, coordination or documentation',
      'A realistic intervention that fits a mid-level officer’s authority',
      'A measurable indicator and a named source of resistance',
    ],
    structureHint: [
      'Name the challenge and why it is the most serious',
      'Your intervention with its mechanism',
      'Measurement and expected resistance',
    ],
    commonMistakes: [
      'Listing ten problems instead of choosing one',
      'Proposing reforms that require amending laws or changing governments',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-ca-4',
    category: 'current-affairs',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc'],
    difficulty: 'Standard',
    prompt: 'Explain how a sustained rise in global oil prices travels through the Pakistani economy.',
    followUps: [
      'Which group is hit hardest, and which benefits?',
      'What could the government do that is administratively feasible?',
    ],
    expectedPoints: [
      'Import bill and current account, then exchange rate pressure',
      'Production and transport costs feeding into inflation, especially food and freight',
      'Fiscal effects: subsidies/petroleum levy, circular debt, remittances partly offsetting',
    ],
    structureHint: [
      'Start from the import bill',
      'Follow the channel through costs and prices',
      'End with the policy trade-off',
    ],
    commonMistakes: [
      'Jumping straight to “inflation increases” without the transmission path',
      'Forgetting the fiscal and exchange-rate channels entirely',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-ca-5',
    category: 'current-affairs',
    tracks: ['css', 'pms', 'spsc-cce'],
    difficulty: 'Standard',
    prompt: 'What does “climate finance” mean for a country like Pakistan?',
    followUps: [
      'Which instruments exist, and which has Pakistan found hardest to access?',
      'What must a federal or provincial department do to qualify for funding?',
    ],
    expectedPoints: [
      'Categories: mitigation, adaptation, loss and damage, and concessional versus market finance',
      'Pakistan’s position: low emitter, high vulnerability, so emphasis on adaptation and loss-and-damage',
      'Readiness requirements: project documentation, fiduciary systems and reporting capacity',
    ],
    structureHint: [
      'Define climate finance in plain terms',
      'Explain what Pakistan needs most and why',
      'Name the bureaucratic readiness gap',
    ],
    commonMistakes: [
      'Treating climate finance as charity rather than a documented financial claim',
      'Discussing emission reduction targets for a low-emission country',
    ],
    targetSeconds: 120,
    sourceRef: { label: 'UNFCCC — climate finance, adaptation and loss-and-damage documents', url: 'https://unfccc.int/' },
  },
  {
    id: 'iv-ca-6',
    category: 'current-affairs',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc'],
    difficulty: 'Standard',
    prompt: 'How does the situation in Afghanistan affect Pakistan’s security and its trade ambitions?',
    followUps: [
      'What is the institutional response at the border level?',
      'How would you balance security and trade if they conflict?',
    ],
    expectedPoints: [
      'Security: cross-border militancy, border management, refugees and policing load',
      'Trade: transit potential to Central Asia against regulatory and security costs',
      'Institutional tools: border management, customs, FIA/police coordination, diplomatic engagement',
    ],
    structureHint: [
      'Security dimension with two concrete mechanisms',
      'Trade dimension with the opportunity and the obstruction',
      'The balance you would strike as an administrator',
    ],
    commonMistakes: [
      'Giving a security-only answer',
      'Making claims about intelligence or military matters beyond a civil candidate’s remit',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-ca-7',
    category: 'current-affairs',
    tracks: ['css', 'pms', 'spsc-cce'],
    difficulty: 'Standard',
    prompt: 'What opportunities does Pakistan have in the Gulf and Central Asian regions, and what stands in the way?',
    followUps: [
      'Which of the two is closer to being realised?',
      'How do remittances fit into your answer?',
    ],
    expectedPoints: [
      'Manpower export and remittances; energy and food security links with the Gulf',
      'Central Asia: transit trade and connectivity through Afghanistan, energy imports (CASA-type projects)',
      'Obstacles: connectivity, security, payment/banking channels and regulatory harmonisation',
    ],
    structureHint: [
      'Name the two regions and the core opportunity in each',
      'Give evidence or an example of progress',
      'State the binding constraint deliberately',
    ],
    commonMistakes: [
      'Confusing diplomacy with economic opportunity',
      'Listing memorandums of understanding as if they were completed projects',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-ca-8',
    category: 'current-affairs',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc', 'department-panel'],
    difficulty: 'Standard',
    prompt: 'Is social media making public debate better or worse? Answer as an administrator, not as a user.',
    followUps: [
      'How should a department handle misinformation about its own work?',
      'What is the legal and ethical limit on official responses?',
    ],
    expectedPoints: [
      'Better: access, speed, whistle-blowing and citizen feedback; worse: misinformation, polarisation and process pressure',
      'Administrative response: verified official communication, complaint channels and record-keeping',
      'Legal/ethical limits: no personal attacks, no selective leaks, respect for privacy and procedure',
    ],
    structureHint: [
      'Both sides in two sentences each',
      'The administrator’s position and one rule you would follow',
      'One practical step for handling misinformation',
    ],
    commonMistakes: [
      'Answering as an angry user rather than an officer',
      'Proposing censorship as the primary answer',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-ca-9',
    category: 'current-affairs',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc', 'sts', 'department-panel'],
    difficulty: 'Standard',
    prompt: 'What are the real causes of public anger with service delivery, and how would you measure that anger?',
    followUps: [
      'Which of those causes is within your control in this post?',
      'What indicator would you watch weekly?',
    ],
    expectedPoints: [
      'Unpredictability and repeated visits; information asymmetry; informal payments; unclear timelines',
      'Behaviour at the counter matters as much as the substantive decision',
      'Measurement: complaint volume by cause, repeat visits, resolution time, independent spot checks',
    ],
    structureHint: [
      'Name three causes with examples from ordinary citizen experience',
      'Explain which you can influence',
      'State your measurement indicators',
    ],
    commonMistakes: [
      'Blaming the public or “the system” in general terms',
      'Proposing an elaborate survey instead of front-line indicators',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-ca-10',
    category: 'current-affairs',
    tracks: ['css', 'pms', 'spsc-cce'],
    difficulty: 'Stress',
    prompt: 'If you had to explain Pakistan’s position on Kashmir to a foreign student in four sentences, what would you say?',
    followUps: [
      'Which of those sentences would be the most difficult to substantiate?',
      'How would you keep the answer factual rather than emotional?',
    ],
    expectedPoints: [
      'The dispute is a long-standing international issue with UN Security Council resolutions on self-determination',
      'Pakistan’s position rests on those resolutions and on the human-rights situation in the territory',
      'Composure and precision — no rhetoric, no unverifiable incidents',
    ],
    structureHint: [
      'One sentence of historical and legal context',
      'One sentence on Pakistan’s stated position',
      'One sentence on the humanitarian dimension, and a closing line inviting dialogue',
    ],
    commonMistakes: [
      'Emotional rhetoric that a panel reads as a lack of control',
      'Citing casualty figures that the candidate cannot source',
    ],
    targetSeconds: 90,
    sourceRef: { label: 'Ministry of Foreign Affairs — official statements and position papers', url: 'https://mofa.gov.pk/' },
  },

  /* ------------------------ Islamic studies & ethics ------------------------ */
  {
    id: 'iv-is-1',
    category: 'islamic-ideology',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'What is the ideology of Pakistan, and how is it reflected in the Objectives Resolution?',
    followUps: [
      'How would you explain it to someone who says Pakistan has no ideology?',
      'Which principle in it do you consider most actionable for an officer?',
    ],
    expectedPoints: [
      'The two-nation premise: a separate homeland where Muslims could order life per Islamic values with safeguards for minorities',
      'Objectives Resolution: sovereignty of Allah through the people’s chosen representatives, equality, and protection of minority rights',
      'Actionable principles: accountability, justice and public trust',
    ],
    structureHint: [
      'Define the ideology briefly',
      'Connect it to the Resolution’s four principles',
      'Take one principle and show what it means for an officer',
    ],
    commonMistakes: [
      'Turning a constitutional question into a religious lecture',
      'Denying the minority-rights component',
    ],
    targetSeconds: 120,
    sourceRef: { label: 'Constitution of Pakistan — preamble and Article 2-A', url: 'https://www.pakistani.org/pakistan/constitution/' },
  },
  {
    id: 'iv-is-2',
    category: 'islamic-ideology',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc', 'sts', 'department-panel'],
    difficulty: 'Standard',
    prompt: 'What administrative principles governed the state in Madinah, and which one would you apply in your office?',
    followUps: [
      'How would you apply it in a situation where the law is silent?',
      'Give an example of the principle being violated in modern administration.',
    ],
    expectedPoints: [
      'Governance by consultation (shura), written agreements/covenants, impartial justice and accountability of officials',
      'Welfare orientation: responsibility of the state towards the weak and the vulnerable',
      'A modern application: open consultation, documented decisions, complaint redress',
    ],
    structureHint: [
      'Name two or three principles with a factual reference',
      'Choose one and explain how it works in a modern office',
      'State a measurable practice you would adopt',
    ],
    commonMistakes: [
      'General moral statements with no historical reference',
      'Promising reform beyond the post’s authority',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-is-3',
    category: 'islamic-ideology',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc'],
    difficulty: 'Standard',
    prompt: 'How would you apply the principle of consultation in an office where the final decision is yours?',
    followUps: [
      'What if the majority view is clearly wrong?',
      'How do you consult without losing accountability?',
    ],
    expectedPoints: [
      'Consultation improves information and legitimacy, but the officer remains accountable for the decision',
      'Practical mechanisms: agenda ahead of meetings, written opinions, dissent recorded',
      'Consultation has limits — no delaying of statutory duties and no abdication of responsibility',
    ],
    structureHint: [
      'What consultation should achieve',
      'How you would structure it in one office',
      'Where you would decide alone, with reasons recorded',
    ],
    commonMistakes: [
      'Treating consultation as a vote that binds the officer',
      'Using consultation as a way to avoid responsibility',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-is-4',
    category: 'islamic-ideology',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc', 'department-panel'],
    difficulty: 'Standard',
    prompt: 'What does Islamic teaching say about the accountability of a public official? Give one example from the Seerah.',
    followUps: [
      'How do those standards translate into modern conduct rules?',
      'What would you do upon discovering a colleague’s dishonesty?',
    ],
    expectedPoints: [
      'Public office is a trust (amanat); accountability applies to the official, not just to the public',
      'The Prophet’s (PBUH) instruction about the collection of zakat and about officials being answerable for what they take',
      'Modern counterpart: conduct and anti-corruption rules, audits and disciplinary procedure',
    ],
    structureHint: [
      'State the principle of trust and accountability',
      'Give the historical example precisely',
      'Connect it to the conduct rules of your service',
    ],
    commonMistakes: [
      'Using a narration loosely or inaccurately',
      'Making the answer purely devotional with no administrative application',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-is-5',
    category: 'islamic-ideology',
    tracks: ['css', 'pms', 'spsc-cce'],
    difficulty: 'Standard',
    prompt: 'Explain the difference between zakat and ushr and why the distinction matters administratively.',
    followUps: [
      'How is zakat collected and distributed in Pakistan today?',
      'What is the difference between zakat and an ordinary tax?',
    ],
    expectedPoints: [
      'Zakat: obligatory annual levy on qualifying wealth above nisab; ushr: on agricultural produce',
      'Administration in Pakistan is largely institutionalised through the zakat system for specified categories',
      'Administratively, both are collected/distributed under rules and benefit specific categories of recipients',
    ],
    structureHint: [
      'Define both levies briefly',
      'Explain how each is handled institutionally',
      'Note the principle governing distribution',
    ],
    commonMistakes: [
      'Mixing zakat with general taxation without explaining the difference in principle',
      'Quoting contemporary proportions as fixed doctrine',
    ],
    targetSeconds: 90,
  },
  {
    id: 'iv-is-6',
    category: 'islamic-ideology',
    tracks: ['css', 'pms', 'spsc-cce'],
    difficulty: 'Standard',
    prompt: 'What is the constitutional role of the Federal Shariat Court?',
    followUps: [
      'What is its relationship to the Supreme Court in such matters?',
      'Can a citizen approach it directly?',
    ],
    expectedPoints: [
      'It examines whether laws repugnant to the injunctions of Islam and holds a defined constitutional jurisdiction',
      'Its decisions are subject to appeal before the Shariat Appellate Bench of the Supreme Court',
      'It also has jurisdiction in specific matters including hudood cases as provided by law',
    ],
    structureHint: [
      'Constitutional basis and composition',
      'Core jurisdiction',
      'Where appeals go and why that matters',
    ],
    commonMistakes: [
      'Describing it as a parallel Supreme Court',
      'Confusing religious scholarship with constitutional jurisdiction',
    ],
    targetSeconds: 90,
    sourceRef: { label: 'Constitution of Pakistan — Articles 203A–203J', url: 'https://www.pakistani.org/pakistan/constitution/part7.ch3a.html' },
  },
  {
    id: 'iv-is-7',
    category: 'islamic-ideology',
    tracks: 'all',
    difficulty: 'Stress',
    prompt: 'How should an officer treat a citizen of a different faith at a public counter?',
    followUps: [
      'How does that answer relate to the minority-rights promise of the Objectives Resolution?',
      'What if a colleague behaves otherwise?',
    ],
    expectedPoints: [
      'Equal treatment as guaranteed by the Constitution and by service conduct rules',
      'Minority rights were part of the founding promise, not a concession',
      'Practical behaviour: no differential procedure, no remarks, written record when something goes wrong',
    ],
    structureHint: [
      'State the principle of equal treatment',
      'Tie it to the constitutional and founding commitment',
      'Say what you would do if a colleague acted otherwise',
    ],
    commonMistakes: [
      'Answering vaguely “I would treat everyone well” without the legal principle',
      'Avoiding the accountability question about a colleague',
    ],
    targetSeconds: 90,
    sourceRef: { label: 'Constitution of Pakistan — Articles 20 and 22', url: 'https://www.pakistani.org/pakistan/constitution/part2.ch1.html' },
  },
  {
    id: 'iv-is-8',
    category: 'islamic-ideology',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc'],
    difficulty: 'Standard',
    prompt: 'Which incident from the Seerah best guides you in handling criticism, and what is the lesson for you?',
    followUps: [
      'How would you apply that lesson to a hostile question in this room?',
      'What is the difference between patience and passivity?',
    ],
    expectedPoints: [
      'A specific, accurately described incident of patient response to hostility or misunderstanding',
      'The distinction between self-control and surrender — patience with firmness on principle',
      'A concrete behavioural commitment for the candidate',
    ],
    structureHint: [
      'Name the incident in two sentences',
      'Draw the principle from it',
      'Apply it to a working situation',
    ],
    commonMistakes: [
      'Narrating a long story without the lesson',
      'Misquoting or mixing narrations',
    ],
    targetSeconds: 90,
  },
];
