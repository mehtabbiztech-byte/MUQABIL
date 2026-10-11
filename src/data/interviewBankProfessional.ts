/**
 * Interview question bank — provincial, professional, behavioural and
 * administrative areas.
 *
 * Same rules as the core bank: these are practice prompts, not an official
 * question paper, and scoring guidance is practice guidance.
 */

import type { InterviewQuestion } from './interviewPrepData';

export const INTERVIEW_BANK_PROFESSIONAL: InterviewQuestion[] = [
  /* ---------------------- Provincial & district awareness ---------------------- */
  {
    id: 'iv-pv-1',
    category: 'provincial-awareness',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'Describe your district: its tehsils, its main sources of income, and the two biggest problems it faces.',
    followUps: [
      'Which of those problems can be solved locally, and which needs the province?',
      'Name one district officer who deals with each problem.',
    ],
    expectedPoints: [
      'Correct tehsil/taluka names and basic geography',
      'Economic base: agriculture, trade, industry, remittances or public employment',
      'Two problems with causes, not just symptoms — unemployment, water, health access, quality of schooling',
    ],
    structureHint: [
      'Geography and administrative units in two lines',
      'Economic base with one indicator',
      'Two problems, each with a cause and who is responsible',
    ],
    commonMistakes: [
      'Getting the names of tehsils wrong — panels notice immediately',
      'Listing national problems instead of district ones',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-pv-2',
    category: 'provincial-awareness',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'Who administers your district, and which officer is accountable for what?',
    followUps: [
      'How does the district administration coordinate with the police?',
      'Where does a citizen go if the district office does not respond?',
    ],
    expectedPoints: [
      'The deputy commissioner/DC and district officers of the provincial departments',
      'Division of work: revenue and general administration, police, health, education, works, agriculture',
      'Escalation channel through the division, the provincial secretariat or the relevant ombudsman',
    ],
    structureHint: [
      'Name the key offices and their functions',
      'Explain one coordination mechanism you would use',
      'Name the escalation route for a citizen complaint',
    ],
    commonMistakes: [
      'Mixing up the deputy commissioner’s role with the police or the judiciary',
      'Describing the structure differently from the province you applied in',
    ],
    targetSeconds: 90,
  },
  {
    id: 'iv-pv-3',
    category: 'provincial-awareness',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc'],
    difficulty: 'Standard',
    prompt: 'How does the local government system work in your province today, and what does it do for a citizen?',
    followUps: [
      'Where does the local body get its money?',
      'Which service would you fix first if you were in a local office?',
    ],
    expectedPoints: [
      'The current legal framework in your province and the tiers that exist',
      'Functions commonly assigned: sanitation, water supply, roads, markets, local regulation',
      'Finances: provincial grants, own receipts, and the capacity constraint',
    ],
    structureHint: [
      'Explain the tiers and the law briefly',
      'Name two citizen-facing functions',
      'Identify the funding or capacity bottleneck honestly',
    ],
    commonMistakes: [
      'Describing an older local government setup that is no longer in force without flagging it',
      'Treating local government as only municipal sanitation work',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-pv-4',
    category: 'provincial-awareness',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'Which crops or industries dominate your district, and what constrains them?',
    followUps: [
      'How much of the produce is processed locally?',
      'What would raise farmers’ or producers’ income fastest?',
    ],
    expectedPoints: [
      'Accurate crops/industry with a sense of scale',
      'Constraints: water availability, input prices, post-harvest losses, credit, marketing, transport',
      'One realistic improvement — storage, grading, access roads, cooperative marketing',
    ],
    structureHint: [
      'State the main crops/industry and their scale',
      'Give two constraints with mechanisms',
      'Propose one improvement and its expected effect',
    ],
    commonMistakes: [
      'Answering the question for the province rather than the district',
      'Naming crops that do not grow in the district',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-pv-5',
    category: 'provincial-awareness',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'A district-wide water shortage is expected this summer. What would you do in the first thirty days?',
    followUps: [
      'How would you allocate water between drinking, agriculture and industry?',
      'What would you publish to the public, and how often?',
    ],
    expectedPoints: [
      'Assessment: reservoir/canal position, demand mapping, vulnerable settlements',
      'Immediate measures: equitable rotation, leak repair, tanker arrangements, price control on tankers',
      'Communication: public timetable, complaint number, weekly status update',
    ],
    structureHint: [
      'First 72 hours: assessment and immediate supply protection',
      'First month: allocation plan with an equity rule',
      'Communication and enforcement plan',
    ],
    commonMistakes: [
      'Proposing only enforcement against water theft',
      'Ignoring drinking water priority in the allocation',
    ],
    targetSeconds: 150,
  },
  {
    id: 'iv-pv-6',
    category: 'provincial-awareness',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc'],
    difficulty: 'Standard',
    prompt: 'How does your province receive and use its share of the divisible pool?',
    followUps: [
      'What is the province’s biggest spending head?',
      'What would you inspect to know whether the money reached the district?',
    ],
    expectedPoints: [
      'Provincial share from the NFC Award plus provincial receipts',
      'Major expenditure: salaries and pensions, development programme, subsidies and transfers',
      'Verification: budget documents, releases, utilisation and district-level expenditure records',
    ],
    structureHint: [
      'Explain where the money comes from',
      'Explain where most of it goes',
      'Name one document you would read to verify delivery',
    ],
    commonMistakes: [
      'Claiming the province keeps everything it collects',
      'Using an outdated percentage as fact',
    ],
    targetSeconds: 120,
    sourceRef: { label: 'Provincial finance department budget documents (published annually)', url: 'https://www.finance.gov.pk/' },
  },
  {
    id: 'iv-pv-7',
    category: 'provincial-awareness',
    tracks: ['css', 'pms', 'spsc-cce', 'sts'],
    difficulty: 'Standard',
    prompt: 'Name the districts that border your district and one problem that is shared with them.',
    followUps: [
      'How is that problem currently handled between the districts?',
      'What would make the coordination work better?',
    ],
    expectedPoints: [
      'Correct bordering districts',
      'A genuinely shared issue — river/flood water, inter-district roads, cattle movement, smuggling routes, transport',
      'A coordination instrument — joint meetings, shared data, written protocols',
    ],
    structureHint: [
      'Name the districts',
      'Describe the shared problem with one consequence',
      'Propose a coordination mechanism',
    ],
    commonMistakes: [
      'Answering ‘law and order’ without specifics',
      'Not knowing the neighbouring districts at all',
    ],
    targetSeconds: 90,
  },
  {
    id: 'iv-pv-8',
    category: 'provincial-awareness',
    tracks: ['css', 'pms', 'spsc-cce'],
    difficulty: 'Standard',
    prompt: 'What is the role of the deputy commissioner in your province’s administrative system?',
    followUps: [
      'How has the role changed over the last two decades?',
      'What is the difference between the DC’s and the police chief’s responsibility in a crisis?',
    ],
    expectedPoints: [
      'Coordinating the provincial government’s field administration, revenue and general administration, development monitoring',
      'In a crisis: coordination, resource mobilisation, and the magistrate’s functions as provided by law',
      'Role changes: devolution altered responsibilities, then re-centralisation in several provinces',
    ],
    structureHint: [
      'Core functions of the office',
      'One function in a crisis with the legal basis',
      'How the role has changed and the effect on citizens',
    ],
    commonMistakes: [
      'Describing the DC as the head of police',
      'Assuming the DC personally performs every department’s work',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-pv-9',
    category: 'provincial-awareness',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'Describe one public service in your district that is failing, and identify the exact process failure.',
    followUps: [
      'Which step in the process fails most often?',
      'What would you change in the first month, and what would that break?',
    ],
    expectedPoints: [
      'A specific service — school, dispensary/BHU, registry office, sanitation, water supply, police counter',
      'Process analysis: staffing, supply, record, supervision, citizen interface',
      'One intervention with an honest cost or side-effect',
    ],
    structureHint: [
      'Name the service and the visible failure',
      'Trace the process and locate the break',
      'Propose the change and name its trade-off',
    ],
    commonMistakes: [
      'Blaming corruption of individuals without analysing the process',
      'Proposing a change the department cannot fund or staff',
    ],
    targetSeconds: 150,
  },
  {
    id: 'iv-pv-10',
    category: 'provincial-awareness',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc'],
    difficulty: 'Standard',
    prompt: 'How are health or education facilities in your district financed and staffed?',
    followUps: [
      'What is the most common facility-level failure you have observed?',
      'How would you verify absenteeism without destroying morale?',
    ],
    expectedPoints: [
      'Provincial departments with district-level budgets, non-development and development components',
      'Staffing through provincial recruitment and postings; supplies through district offices',
      'Verification: attendance records plus surprise visits, service data and patient/enrolment outcomes',
    ],
    structureHint: [
      'Explain the financing line',
      'Explain staffing and supply',
      'Propose a verification method with a fairness safeguard',
    ],
    commonMistakes: [
      'Confusing district health facilities with tertiary hospitals',
      'Ignoring the staffing shortage when discussing attendance',
    ],
    targetSeconds: 120,
  },

  /* --------------------------- Professional & subject --------------------------- */
  {
    id: 'iv-ps-1',
    category: 'professional-subject',
    tracks: ['ppsc', 'nts', 'css', 'pms', 'spsc-cce'],
    difficulty: 'Standard',
    prompt: 'Explain the central concept of your subject as you would to a first-year student.',
    followUps: [
      'Now give me the formal definition, precisely.',
      'Where do students typically misunderstand it?',
    ],
    expectedPoints: [
      'One plain-language explanation with an example from ordinary life',
      'The formal definition delivered accurately afterwards',
      'Awareness of the common misconception',
    ],
    structureHint: [
      'Plain-language explanation with an analogy',
      'Formal definition',
      'The misconception and how you correct it',
    ],
    commonMistakes: [
      'Starting with the textbook definition the panel already knows',
      'Using jargon you cannot then unpack',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-ps-2',
    category: 'professional-subject',
    tracks: ['ppsc', 'css', 'pms', 'spsc-cce', 'nts', 'department-panel'],
    difficulty: 'Standard',
    prompt: 'What is the difference between a rule and a discretion in administrative decision-making?',
    followUps: [
      'Give an example where discretion must be exercised, and one where it must not.',
      'What happens if discretion is exercised arbitrarily?',
    ],
    expectedPoints: [
      'A rule prescribes the outcome; discretion allows an officer to choose within the law and the facts',
      'Discretion must be exercised reasonably, on recorded reasons and without favouritism',
      'Judicial review and departmental appeals exist precisely to check arbitrary discretion',
    ],
    structureHint: [
      'Define both terms in one line each',
      'Two examples — one rulish, one discretionary',
      'The safeguard that keeps discretion lawful',
    ],
    commonMistakes: [
      'Treating discretion as the freedom to do as one likes',
      'Ignoring the duty to record reasons',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-ps-3',
    category: 'professional-subject',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'In your field, what is the most common mistake junior staff make, and how would you prevent it?',
    followUps: [
      'Was the mistake ever yours? What changed afterwards?',
      'What would a checklist or training session look like?',
    ],
    expectedPoints: [
      'One specific, recurring error with a cause — training, workload, unclear SOPs, supervision',
      'Prevention: standard operating procedure, induction, verification step, second check',
      'Ownership — an acknowledgement of your own early error if honest here',
    ],
    structureHint: [
      'Name the error and why it recurs',
      'Propose one prevention measure with a mechanism',
      'Say how you would verify the improvement',
    ],
    commonMistakes: [
      'Complaining about juniors instead of diagnosing the cause',
      'Proposing training alone without any process change',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-ps-4',
    category: 'professional-subject',
    tracks: ['ppsc', 'nts', 'department-panel'],
    difficulty: 'Standard',
    prompt: 'Which standard, code, syllabus or manual governs your subject, and how current is your knowledge of it?',
    followUps: [
      'When did you last read it, and what changed?',
      'What would you do when a manual is silent on a case before you?',
    ],
    expectedPoints: [
      'The correct governing document(s) for the discipline or trade',
      'A current example of your engagement with it — reading, course, practice, teaching',
      'For silence in the manual: precedent, consultation, written proposal and approval',
    ],
    structureHint: [
      'Name the governing documents',
      'Give evidence of current knowledge',
      'Explain your approach when the text is silent',
    ],
    commonMistakes: [
      'Naming a document that has been superseded',
      'Claiming the subject never changes',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-ps-5',
    category: 'professional-subject',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'Describe one technical or professional decision you made and the evidence you used.',
    followUps: [
      'What would have happened if your reading of the evidence had been wrong?',
      'How did you document the decision?',
    ],
    expectedPoints: [
      'A real decision within your competence with dates and facts',
      'The evidence: standards, measurements, rules, consultation or site data',
      'Documentation and outcome — how it was recorded and what followed',
    ],
    structureHint: [
      'Situation and the decision required',
      'Evidence and the criterion you applied',
      'Result and how you recorded it',
    ],
    commonMistakes: [
      'Choosing an example where the decision was actually someone else’s',
      'Skipping the documentation, which is what panels here care about',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-ps-6',
    category: 'professional-subject',
    tracks: ['ppsc', 'nts', 'department-panel', 'sts'],
    difficulty: 'Standard',
    prompt: 'A citizen or contractor claims something you suspect is untrue. How would you verify it without holding up the file indefinitely?',
    followUps: [
      'What time limit would you set yourself, and why?',
      'How do you record the verification so it survives an audit?',
    ],
    expectedPoints: [
      'Identification of the specific claim and the cheapest reliable verification — document, site visit, third-party record',
      'A written timeline and interim response to the claimant',
      'Documentation that shows what was checked, by whom, on what date',
    ],
    structureHint: [
      'Define the verifiable fact, not the general suspicion',
      'Choose a verification method proportionate to the file',
      'Record it and give the claimant a date',
    ],
    commonMistakes: [
      'Relying on verbal assurances from the same source',
      'Parking the file without informing anyone',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-ps-7',
    category: 'professional-subject',
    tracks: ['ppsc', 'sts', 'department-panel', 'nts'],
    difficulty: 'Standard',
    prompt: 'What are the three most important records you must maintain in your post, and why would they matter in an audit?',
    followUps: [
      'Which of them is most often incomplete?',
      'What happens to a citizen when a record is missing?',
    ],
    expectedPoints: [
      'Correct records for the post — register, receipt book, stock register, service book, attendance, daily diary',
      'Audit purpose: traceability, custody, and proof that rules were followed',
      'Consequence for citizens: delay, repeated visits and possible loss of entitlement',
    ],
    structureHint: [
      'Name the records and their purpose',
      'Explain how each is used in an audit',
      'Explain the citizen consequence of a gap',
    ],
    commonMistakes: [
      'Naming records that do not exist in the relevant office',
      'Referring to “computerisation” as the answer without saying what is recorded',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-ps-8',
    category: 'professional-subject',
    tracks: ['ppsc', 'pms', 'spsc-cce', 'nts', 'department-panel'],
    difficulty: 'Standard',
    prompt: 'How would you teach or train a colleague who is weak in your area of work?',
    followUps: [
      'What if the colleague is senior to you and unwilling?',
      'How would you know the training worked?',
    ],
    expectedPoints: [
      'Diagnose the gap first — knowledge, skill, tools or motivation',
      'Practical method: show, do together, observe, then leave a written checklist',
      'Verification through the colleague’s own output, not through attendance',
    ],
    structureHint: [
      'Diagnosis of the gap',
      'The training method step by step',
      'How you would measure the change',
    ],
    commonMistakes: [
      'Suggesting that the person be reported or removed',
      'Proposing a formal course when the problem is a missing checklist',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-ps-9',
    category: 'professional-subject',
    tracks: 'all',
    difficulty: 'Stress',
    prompt: 'What would you improve in the standard operating procedure of the post you have applied for, and what could go wrong with your change?',
    followUps: [
      'Have you ever implemented a process change? Describe it.',
      'Who would you have to convince?',
    ],
    expectedPoints: [
      'One concrete procedural gap — duplication, unclear responsibility, missing time limit, no acknowledgment',
      'A minimal change that fits existing authority and budget',
      'Honest risk: resistance, misuse, workload shift or unintended exclusion',
    ],
    structureHint: [
      'Identify the gap and its cost',
      'State your change in one sentence',
      'Name the risk and how you would monitor it',
    ],
    commonMistakes: [
      'Proposing a wholesale departmental reform',
      'Pretending there is no downside to the change',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-ps-10',
    category: 'professional-subject',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'How do you keep your subject knowledge current?',
    followUps: [
      'Name something you learned in the last three months.',
      'How would you handle a case where your knowledge is out of date?',
    ],
    expectedPoints: [
      'Concrete habits — journals, notifications, professional groups, teaching, online courses',
      'One recent, specific item learned',
      'A safety behaviour: consult the current circular/standard before acting',
    ],
    structureHint: [
      'Describe the routine',
      'Give one recent example',
      'State what you do when unsure',
    ],
    commonMistakes: [
      'Saying “I read newspapers” without a subject example',
      'Claiming certainty in a field where rules change frequently',
    ],
    targetSeconds: 90,
  },
  {
    id: 'iv-ps-11',
    category: 'professional-subject',
    tracks: ['ppsc', 'sts', 'department-panel', 'nts'],
    difficulty: 'Standard',
    prompt: 'Explain one concept from your field using an example from everyday life in Pakistan.',
    followUps: [
      'Where does the analogy break down?',
      'How would you test whether the concept was understood?',
    ],
    expectedPoints: [
      'A correct concept explained accurately',
      'A local, recognisable example that genuinely fits',
      'Awareness of the analogy’s limit — the mark of a real teacher',
    ],
    structureHint: [
      'State the concept in one line',
      'Give the local example and map it to the concept',
      'State where the analogy fails',
    ],
    commonMistakes: [
      'Choosing an analogy that teaches the wrong idea',
      'Over-explaining and running out of time on a simple point',
    ],
    targetSeconds: 90,
  },
  {
    id: 'iv-ps-12',
    category: 'professional-subject',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'What does professionalism mean in a government office, concretely?',
    followUps: [
      'Which of those behaviours is most often missing?',
      'Which one would you enforce first in your section?',
    ],
    expectedPoints: [
      'Punctuality, competence, documented decisions, courteous public dealing, confidentiality',
      'Separation of personal and official dealings; avoiding conflicts of interest',
      'Enforcement through personal example plus supervision of the specific behaviour',
    ],
    structureHint: [
      'Define professionalism behaviourally',
      'Name two examples and two counter-examples',
      'State what you would enforce first and how',
    ],
    commonMistakes: [
      'Answering with abstract values only',
      'Listing faults of others without any enforceable behaviour',
    ],
    targetSeconds: 90,
  },

  /* ------------------------- Situational & behavioural ------------------------- */
  {
    id: 'iv-sb-1',
    category: 'situational-behavioural',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'Tell us about a time you were under extreme pressure. What exactly did you do and how did you perform?',
    followUps: [
      'What sign told you that the pressure was affecting you?',
      'What did you change afterwards in how you work?',
    ],
    expectedPoints: [
      'A real situation with a time boundary and stakes',
      'Sequence of actions — prioritising, communicating, delivering',
      'The result and one personal habit changed afterwards',
    ],
    structureHint: [
      'Situation in two lines',
      'Action steps in order, including what you said to whom',
      'Result and lesson',
    ],
    commonMistakes: [
      'Describing a situation the whole team faced with no personal detail',
      'Ending without a result or an outcome',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-sb-2',
    category: 'situational-behavioural',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'Tell us about a failure of yours and what you learned from it.',
    followUps: [
      'Whose responsibility was it — in your own assessment?',
      'If the same situation arose today, what would you do differently?',
    ],
    expectedPoints: [
      'A genuine failure the candidate owns — examination, project, job or personal challenge',
      'Accurate diagnosis of the cause rather than bad luck',
      'A changed behaviour, not a stated intention',
    ],
    structureHint: [
      'State the failure plainly',
      'Explain the cause without excuses',
      'Name the behavioural change and where it has already worked',
    ],
    commonMistakes: [
      'Offering a disguised strength (“I work too hard”)',
      'Blowing the failure out of proportion to look candid',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-sb-3',
    category: 'situational-behavioural',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'Tell us about a time you disagreed with a senior. How did you handle it?',
    followUps: [
      'Did the decision change after your objection?',
      'What would you do differently now?',
    ],
    expectedPoints: [
      'A specific instance with the substantive disagreement',
      'Manner: private, documented, respectful, with reasons and alternatives',
      'Acceptance of the final decision once taken through lawful means',
    ],
    structureHint: [
      'The issue and why you disagreed',
      'How you raised it — channel, timing, evidence',
      'What happened and what you accepted',
    ],
    commonMistakes: [
      'Claiming never to have disagreed with anyone',
      'Describing public confrontation as an achievement',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-sb-4',
    category: 'situational-behavioural',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'Describe a time you had to lead a group that did not want to follow you.',
    followUps: [
      'Who resisted the most, and why?',
      'Would those people work with you again?',
    ],
    expectedPoints: [
      'A real group with identifiable resistance and its reason',
      'Approach: listening first, addressing the underlying interest, sharing credit, setting a fair standard',
      'An outcome and a relationship that survived',
    ],
    structureHint: [
      'Describe the group and the resistance',
      'Explain your approach in steps',
      'Give the outcome, including what you conceded',
    ],
    commonMistakes: [
      'Framing the group as simply lazy or wrong',
      'Resolving the story by authority alone',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-sb-5',
    category: 'situational-behavioural',
    tracks: 'all',
    difficulty: 'Stress',
    prompt: 'Tell us about a time you found an error in someone’s work — either a senior’s or your own.',
    followUps: [
      'What did you do first, and what did you do in writing?',
      'What if the person had denied it?',
    ],
    expectedPoints: [
      'Specific error with its consequence if unnoticed',
      'Action sequence: verify, inform the right person privately, correct the record, document',
      'Correct handling of a possible denial — evidence and process, not accusation',
    ],
    structureHint: [
      'The error and how you found it',
      'What you did, in order',
      'The outcome and the record',
    ],
    commonMistakes: [
      'Choosing an error with trivial consequences',
      'Celebrating exposing a colleague rather than correcting the record',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-sb-6',
    category: 'situational-behavioural',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'Give an example of a time you helped someone who could not help you in return.',
    followUps: [
      'What did it cost you?',
      'Did anyone ask you why you did it?',
    ],
    expectedPoints: [
      'A concrete act of service with a named or describable beneficiary',
      'An honest cost in time, money or opportunity',
      'Restraint in narration — the act should speak without self-praise',
    ],
    structureHint: [
      'Who needed help and with what',
      'What you did and what it cost you',
      'The outcome, told briefly',
    ],
    commonMistakes: [
      'Describing a donation with no personal involvement',
      'Exaggerating the scale to impress the panel',
    ],
    targetSeconds: 90,
  },
  {
    id: 'iv-sb-7',
    category: 'situational-behavioural',
    tracks: 'all',
    difficulty: 'Stress',
    prompt: 'You are asked by a superior to do something you consider unethical. What exactly would you say, and to whom?',
    followUps: [
      'What if the instruction was ambiguous rather than clearly wrong?',
      'What if refusing costs you your promotion?',
    ],
    expectedPoints: [
      'Clarify the instruction first — a great deal of “unethical instruction” is a vague order',
      'If genuinely improper: refuse in a lawful manner, record it, and use the appeal/representation channel',
      'Consequences acknowledged honestly without dramatising martyrdom',
    ],
    structureHint: [
      'Ask for the instruction in writing or clarify its scope',
      'State your refusal factually, in private, with reasons',
      'Escalate through the prescribed channel and keep a record',
    ],
    commonMistakes: [
      'Immediate confrontation in front of others',
      'Vague promises to “do the right thing” with no procedure named',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-sb-8',
    category: 'situational-behavioural',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'Tell us about a time you had to deliver bad news.',
    followUps: [
      'What words did you actually use?',
      'How did the person react, and how did you respond?',
    ],
    expectedPoints: [
      'Honesty with clarity — the recipient knew the position, not a softened version',
      'Respect and privacy, with the reason explained',
      'An alternative path or next step offered where one existed',
    ],
    structureHint: [
      'Context and to whom',
      'How you delivered it — place, timing, words',
      'The follow-up you arranged',
    ],
    commonMistakes: [
      'Describing news delivered indirectly through someone else',
      'Reporting the reaction dismissively',
    ],
    targetSeconds: 90,
  },
  {
    id: 'iv-sb-9',
    category: 'situational-behavioural',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'Describe a situation where you had to work with someone you disliked.',
    followUps: [
      'What was the source of the dislike?',
      'How did you keep it from affecting the work?',
    ],
    expectedPoints: [
      'A real working relationship with a stated difficulty',
      'Professional discipline: separate the person from the task, agree standards, keep communication in writing',
      'Result delivered despite the friction',
    ],
    structureHint: [
      'The relationship and why it was difficult',
      'What you did to keep the work moving',
      'The outcome and the working arrangement you settled on',
    ],
    commonMistakes: [
      'Detailing personal grievances at length',
      'Claiming to like everyone, which sounds evasive',
    ],
    targetSeconds: 90,
  },
  {
    id: 'iv-sb-10',
    category: 'situational-behavioural',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'Tell us about a decision you took that was correct but costly for you.',
    followUps: [
      'Who knew why you did it?',
      'Would you make the same decision today?',
    ],
    expectedPoints: [
      'A decision with a genuine personal cost — time, money, selection, relationship',
      'The reasoning, clearly stated',
      'Willingness to repeat it, with an honest note on what you would refine',
    ],
    structureHint: [
      'The decision and the cost',
      'The reasoning and the alternatives rejected',
      'The outcome and your present position on it',
    ],
    commonMistakes: [
      'Choosing a cost-free example',
      'Retelling the story with bitterness towards those who benefited',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-sb-11',
    category: 'situational-behavioural',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'How did you manage the last time two important deadlines collided?',
    followUps: [
      'What did you communicate, to whom, and when?',
      'How would you handle it if both were genuinely mandatory?',
    ],
    expectedPoints: [
      'Triage by consequence and legal obligation, not by personal preference',
      'Early communication to both stakeholders with a proposed plan',
      'Escalation and recorded reasons when both deadlines could not be met',
    ],
    structureHint: [
      'The two obligations and the time available',
      'How you triaged and what you communicated',
      'Result and what you would improve',
    ],
    commonMistakes: [
      'Choosing to do both and inventing an unrealistic success',
      'Hiding the conflict until after the deadline',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-sb-12',
    category: 'situational-behavioural',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'What feedback changed your behaviour, and how?',
    followUps: [
      'Who gave it, and was it welcome at the time?',
      'What evidence shows the change is permanent?',
    ],
    expectedPoints: [
      'A specific piece of criticism, quoted or paraphrased accurately',
      'The behaviour altered and the mechanism used to alter it',
      'Observable evidence of the change from later situations',
    ],
    structureHint: [
      'The feedback and how it was given',
      'What you did in the following weeks',
      'How you know it stuck',
    ],
    commonMistakes: [
      'Choosing praise and calling it feedback',
      'Claiming instant transformation without any evidence',
    ],
    targetSeconds: 90,
  },

  /* ---------------------------- Administrative casework ---------------------------- */
  {
    id: 'iv-ad-1',
    category: 'administrative-casework',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc'],
    difficulty: 'Stress',
    prompt: 'A file you must move is legally correct but politically inconvenient for a powerful person. What do you do?',
    followUps: [
      'What if you are called and asked to delay it verbally?',
      'What record would protect you later?',
    ],
    expectedPoints: [
      'Decide on the law and the record; inconvenience is not a legal ground for delay',
      'Handle the pressure professionally: no written instruction, no delay; ask for the instruction in writing',
      'Document the file’s progression and reasons so the decision survives scrutiny',
    ],
    structureHint: [
      'Decide on merits and record the reasons',
      'Respond to pressure without confrontation and without delay',
      'Protect the file with a complete written trail',
    ],
    commonMistakes: [
      'Choosing to delay while pretending to obey the law',
      'Dramatising the confrontation or resigning in the answer',
    ],
    targetSeconds: 150,
  },
  {
    id: 'iv-ad-2',
    category: 'administrative-casework',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'Citizens complain that your office demands documents that are not on the official list. How would you fix it?',
    followUps: [
      'Who is responsible for the extra demand?',
      'How would you handle the staff member who insists the extra document is needed?',
    ],
    expectedPoints: [
      'Publish the official checklist at the counter and online, with the legal source of each item',
      'Investigate why extras are demanded — risk aversion, rent-seeking, unclear instructions',
      'Fix through written instructions, supervision and a complaint channel with time limits',
    ],
    structureHint: [
      'Publish and display the official list',
      'Diagnose and correct the internal cause',
      'Measure repeat visits and complaints',
    ],
    commonMistakes: [
      'Announcing a citizen charter without changing internal practice',
      'Blaming officials without checking whether the list itself is unclear',
    ],
    targetSeconds: 150,
  },
  {
    id: 'iv-ad-3',
    category: 'administrative-casework',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc', 'department-panel'],
    difficulty: 'Standard',
    prompt: 'How would you handle a subordinate who is protected by a strong reference or union influence and is persistently absent?',
    followUps: [
      'What if the absence is genuine, because of illness?',
      'What is the first document you would create?',
    ],
    expectedPoints: [
      'Verify the facts first — attendance record, leave applications, work impact',
      'Apply the rules uniformly: written notice, fair process, opportunity to explain',
      'Proportional handling — medical support where illness is genuine; formal proceedings where it is not',
    ],
    structureHint: [
      'Build the factual record before any confrontation',
      'Follow the prescribed leave/discipline procedure without exception',
      'Report upward on the same facts, keeping the process clean',
    ],
    commonMistakes: [
      'Either avoiding the issue or launching straight into punishment',
      'Acting on verbal reports about the absence',
    ],
    targetSeconds: 150,
  },
  {
    id: 'iv-ad-4',
    category: 'administrative-casework',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc'],
    difficulty: 'Standard',
    prompt: 'Your office faces a thirty per cent budget cut. What do you protect, and what do you defer?',
    followUps: [
      'Who suffers most from your choice?',
      'How would you explain the decision to those affected?',
    ],
    expectedPoints: [
      'Protect statutory obligations, salaries and the services with the highest citizen impact',
      'Defer non-essential procurement, travel, new furniture/vehicles and discretionary schemes',
      'Transparent, written rationale communicated to staff and, where relevant, to the public',
    ],
    structureHint: [
      'Set your protection rule explicitly',
      'List two items to defer and why',
      'Explain how you would communicate and monitor the impact',
    ],
    commonMistakes: [
      'Cutting front-line service delivery first because it is easiest',
      'Refusing to choose and promising to manage with everything',
    ],
    targetSeconds: 150,
  },
  {
    id: 'iv-ad-5',
    category: 'administrative-casework',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc', 'department-panel'],
    difficulty: 'Standard',
    prompt: 'A colleague leaks office information. What is the correct procedure, and in what order?',
    followUps: [
      'Would you confront the colleague first?',
      'How do you protect yourself from reprisal?',
    ],
    expectedPoints: [
      'Verify first and avoid acting on suspicion without evidence',
      'Report through the chain of command or the prescribed channel, keeping it factual and written',
      'Do not conduct a private investigation; leave the enquiry to the authorised officer',
    ],
    structureHint: [
      'Document what you observed, with dates',
      'Report confidentially to the authorised officer',
      'Cooperate with the enquiry and keep the matter confidential',
    ],
    commonMistakes: [
      'Publishing the accusation in the office',
      'Confronting the colleague with an accusation and no evidence',
    ],
    targetSeconds: 120,
  },
  {
    id: 'iv-ad-6',
    category: 'administrative-casework',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'How would you design a complaint register so that complaints actually fall?',
    followUps: [
      'Which fields would you put on the first page?',
      'What would you do with the monthly data?',
    ],
    expectedPoints: [
      'Unique serial number, receipt to complainant, responsible person, promised date, stage status',
      'Review of repeat categories to fix the underlying process, not just close individual complaints',
      'Publication of resolution time and periodic supervision by senior officers',
    ],
    structureHint: [
      'Design the fields and the receipt rule',
      'Show it to citizens (board/website) so the record is public',
      'Analyse monthly and fix the top repeated cause',
    ],
    commonMistakes: [
      'Focusing only on tracking without owning any category of complaint',
      'Adding several fields that no one will maintain',
    ],
    targetSeconds: 150,
  },
  {
    id: 'iv-ad-7',
    category: 'administrative-casework',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc'],
    difficulty: 'Stress',
    prompt: 'You discover that your predecessor approved an irregular procurement. What do you do, in order?',
    followUps: [
      'Do you inform the supplier? Why or why not?',
      'What if the new approval delays a service the public needs?',
    ],
    expectedPoints: [
      'Secure the record first — the file, the approvals and the payment status',
      'Report to the authorised officer and, if required, the audit function; do not proceed with irregular payments',
      'Protect service delivery where lawful — a compliant parallel route rather than continuation of the irregular one',
    ],
    structureHint: [
      'Stop the irregular action from progressing',
      'Report in writing with facts, not opinions about the predecessor',
      'Propose the compliant alternative and a timeline',
    ],
    commonMistakes: [
      'Personalising the case against the predecessor',
      'Letting the irregular contract run while an inquiry proceeds',
    ],
    targetSeconds: 150,
  },
  {
    id: 'iv-ad-8',
    category: 'administrative-casework',
    tracks: ['css', 'pms', 'spsc-cce', 'ppsc', 'department-panel'],
    difficulty: 'Stress',
    prompt: 'How do you brief a superior honestly when you know the truth is unwelcome?',
    followUps: [
      'What if you are asked to soften the wording?',
      'How do you keep your own record of the briefing?',
    ],
    expectedPoints: [
      'State the facts first, without adjectives, with the evidence attached',
      'Separate facts, your assessment and the options — leave the decision with the superior',
      'If asked to alter the substance, decline to misstate facts and put your advice on record',
    ],
    structureHint: [
      'Prepare a one-page written brief with facts and evidence',
      'Present the options and your recommendation in order',
      'Record the brief and the decision taken',
    ],
    commonMistakes: [
      'Softening facts until the briefing becomes misleading',
      'Refusing to present options, which turns advice into confrontation',
    ],
    targetSeconds: 150,
  },

  /* ---------------------------- Communication & language ---------------------------- */
  {
    id: 'iv-cm-1',
    category: 'communication-language',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'Explain one government service in Urdu in ninety seconds, as if you were speaking to a citizen with no official background.',
    followUps: [
      'Now say the same thing in English in three sentences.',
      'What would you write on a notice board for the same process?',
    ],
    expectedPoints: [
      'Plain Urdu with no English officialese; correct key terms',
      'Sequence in the order the citizen will experience it: documents, counter, fee, timeline, complaint',
      'A written version that could actually be displayed at the counter',
    ],
    structureHint: [
      'Name the service and who can apply',
      'Documents and steps in order, with time limits',
      'What to do if it is delayed',
    ],
    commonMistakes: [
      'Mixing heavy English official vocabulary into an Urdu answer',
      'Describing the internal process rather than the citizen’s steps',
    ],
    targetSeconds: 90,
  },
  {
    id: 'iv-cm-2',
    category: 'communication-language',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'Summarise your district’s biggest problem in one sentence, including its consequence.',
    followUps: [
      'Now give me the one-line version of the solution and its cost.',
      'Which word in your sentence is doing the most work?',
    ],
    expectedPoints: [
      'A single grammatical sentence — cause, consequence, magnitude',
      'No vague adjectives; a measurable consequence if possible',
      'Recognition of the sentence’s key word and why it matters',
    ],
    structureHint: [
      'Problem + cause + consequence in one sentence',
      'One-line solution',
      'The cost or trade-off in a third sentence',
    ],
    commonMistakes: [
      'Delivering three sentences and calling it one',
      'Using “very serious problem” without any consequence',
    ],
    targetSeconds: 45,
  },
  {
    id: 'iv-cm-3',
    category: 'communication-language',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'Answer in Urdu: why do you want this post?',
    followUps: [
      'Now give a thirty-second English version.',
      'Was anything lost in the second version? What?',
    ],
    expectedPoints: [
      'A fluent, structured Urdu answer at a formal register',
      'Consistency of content between the two languages',
      'Reflective awareness of what translation changed',
    ],
    structureHint: [
      'Reason in one sentence',
      'One duty you want to perform',
      'What you accept as part of the job',
    ],
    commonMistakes: [
      'Starting in Urdu and drifting into English mid-sentence',
      'Giving a memorised speech that ignores the question’s brevity',
    ],
    targetSeconds: 90,
  },
  {
    id: 'iv-cm-4',
    category: 'communication-language',
    tracks: 'all',
    difficulty: 'Warm-up',
    prompt: 'You have thirty seconds at a counter to introduce yourself to a citizen. Do it now.',
    followUps: [
      'What would you leave out if you had only ten seconds?',
      'Why did you include what you kept?',
    ],
    expectedPoints: [
      'Name, designation, and the specific help you can give',
      'A clear statement of what the citizen should do next',
      'Willingness to prioritise ruthlessly when time is short',
    ],
    structureHint: [
      'Identity and role in one line',
      'What you will do for the citizen today',
      'What the citizen must bring or do next',
    ],
    commonMistakes: [
      'Using the full interview introduction in thirty seconds',
      'Speaking in officialese the citizen cannot follow',
    ],
    targetSeconds: 30,
  },
  {
    id: 'iv-cm-5',
    category: 'communication-language',
    tracks: 'all',
    difficulty: 'Stress',
    prompt: 'Before answering my next question, restate it in your own words and confirm you have understood it.',
    followUps: [
      'You changed one word of my question. Why?',
      'What would you have done if I had refused to clarify it?',
    ],
    expectedPoints: [
      'Accurate paraphrase without distortion of the question’s scope',
      'Reasoned confirmation — explaining what the panel is asking and how you will answer',
      'Constructive handling of a refusal: state your interpretation and proceed transparently',
    ],
    structureHint: [
      'Paraphrase in one sentence',
      'Ask for confirmation',
      'Answer the question you have confirmed',
    ],
    commonMistakes: [
      'Repeating the question word-for-word instead of paraphrasing',
      'Restating it in a narrower form that drops one part of the question',
    ],
    targetSeconds: 60,
  },
  {
    id: 'iv-cm-6',
    category: 'communication-language',
    tracks: 'all',
    difficulty: 'Standard',
    prompt: 'Describe an idea from your field without using any technical jargon.',
    followUps: [
      'Which term would you use instead of the technical one?',
      'How would you check that a layperson understood you?',
    ],
    expectedPoints: [
      'A correct explanation using everyday words',
      'A deliberate substitution for the jargon term',
      'A check for understanding — ask the listener to restate, or use a familiar example',
    ],
    structureHint: [
      'The idea in plain language',
      'A local analogy',
      'A verification question you would ask the listener',
    ],
    commonMistakes: [
      'Substituting jargon with a longer piece of jargon',
      'Assuming the explanation landed because the listener nodded',
    ],
    targetSeconds: 90,
  },
];
