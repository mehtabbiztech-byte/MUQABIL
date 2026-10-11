import { CRQ_SEEDS, QuestionSeed } from './crqSeeds';
import { ERQ_SEEDS } from './erqSeeds';

export type SubjectiveQuestionType = 'CRQ' | 'ERQ';

export interface TeachingLicenseSubjectiveQuestion {
  id: string;
  type: SubjectiveQuestionType;
  area: 'Content Knowledge' | 'Pedagogy';
  subject: string;
  marks: number;
  suggestedMinutes: number;
  wordRange: string;
  prompt: string;
  commandWords: string[];
  answerPlan: string[];
  modelAnswer: string;
  rubric: { criterion: string; marks: number }[];
}

export const TEACHING_LICENSE_SUBJECTIVE_QUESTIONS: TeachingLicenseSubjectiveQuestion[] = [
  {
    id: 'tl-crq-1', type: 'CRQ', area: 'Pedagogy', subject: 'Child Development', marks: 5, suggestedMinutes: 8, wordRange: '100–150 words',
    prompt: 'A Grade 5 learner can solve a mathematics problem with the teacher’s hints but cannot solve it independently. Explain this situation using Vygotsky’s Zone of Proximal Development and suggest two suitable teacher actions.',
    commandWords: ['Explain', 'Apply', 'Suggest'],
    answerPlan: ['Define ZPD', 'Connect the case to assisted performance', 'Give two practical scaffolding actions'],
    modelAnswer: 'The learner is working within the Zone of Proximal Development: the gap between what a learner can do independently and what can be achieved with guidance from a more knowledgeable person. The hints act as scaffolding and temporarily support the learner’s thinking. The teacher should first model one worked example and use guiding questions instead of directly giving the answer. The teacher can then provide a partially completed problem or pair the learner with a capable peer. Support should be reduced gradually as competence increases until the learner solves similar problems independently.',
    rubric: [{ criterion: 'Accurate definition of ZPD', marks: 2 }, { criterion: 'Application to the classroom case', marks: 1 }, { criterion: 'Two relevant scaffolding actions', marks: 2 }],
  },
  {
    id: 'tl-crq-2', type: 'CRQ', area: 'Pedagogy', subject: 'Assessment', marks: 5, suggestedMinutes: 8, wordRange: '100–150 words',
    prompt: 'Differentiate formative assessment from summative assessment and give one classroom example of each.',
    commandWords: ['Differentiate', 'Illustrate'],
    answerPlan: ['Purpose and timing of formative assessment', 'Purpose and timing of summative assessment', 'One accurate example of each'],
    modelAnswer: 'Formative assessment is conducted during teaching to identify learning gaps and improve the next steps in instruction. It is usually low-stakes and provides immediate feedback; for example, an exit ticket at the end of a lesson can show which pupils need reteaching. Summative assessment is conducted after a unit, term, or course to judge overall achievement against defined outcomes. It is generally used for grading or reporting; for example, an end-of-term examination measures what learners achieved across the completed syllabus. Formative assessment improves learning while it is happening, whereas summative assessment records learning after instruction.',
    rubric: [{ criterion: 'Formative assessment explained', marks: 1 }, { criterion: 'Summative assessment explained', marks: 1 }, { criterion: 'Clear distinction', marks: 1 }, { criterion: 'Two suitable examples', marks: 2 }],
  },
  {
    id: 'tl-crq-3', type: 'CRQ', area: 'Content Knowledge', subject: 'Mathematics', marks: 5, suggestedMinutes: 8, wordRange: 'Show complete working',
    prompt: 'A school has 240 students. Three-fifths are present on a rainy day. Of those present, 25% participate in a reading activity. Calculate the number of students in the activity and explain each step.',
    commandWords: ['Calculate', 'Show working', 'Explain'],
    answerPlan: ['Find present students', 'Find 25% of the present group', 'State the final answer with units'],
    modelAnswer: 'Present students = 3/5 × 240 = 144. Students in the reading activity = 25% of 144 = 25/100 × 144 = 36. Therefore, 36 students participate in the reading activity.',
    rubric: [{ criterion: 'Correct present-student calculation', marks: 2 }, { criterion: 'Correct percentage calculation', marks: 2 }, { criterion: 'Final answer clearly stated', marks: 1 }],
  },
  {
    id: 'tl-crq-4', type: 'CRQ', area: 'Content Knowledge', subject: 'General Science', marks: 5, suggestedMinutes: 8, wordRange: '100–150 words',
    prompt: 'Explain how photosynthesis and respiration are connected in maintaining the balance of oxygen and carbon dioxide in nature.',
    commandWords: ['Explain', 'Connect'],
    answerPlan: ['State inputs and outputs of photosynthesis', 'State inputs and outputs of respiration', 'Explain the gas-cycle relationship'],
    modelAnswer: 'During photosynthesis, green plants use carbon dioxide and water in the presence of sunlight and chlorophyll to make glucose, releasing oxygen. During respiration, plants, animals, and other organisms use oxygen to break down glucose and release energy, producing carbon dioxide and water. The products of one process become inputs for the other. Photosynthesis removes carbon dioxide and adds oxygen to the atmosphere, while respiration uses oxygen and returns carbon dioxide. Together, these processes help maintain the natural balance of atmospheric gases and support food chains.',
    rubric: [{ criterion: 'Photosynthesis accurately explained', marks: 2 }, { criterion: 'Respiration accurately explained', marks: 2 }, { criterion: 'Relationship clearly established', marks: 1 }],
  },
  {
    id: 'tl-erq-1', type: 'ERQ', area: 'Pedagogy', subject: 'Inclusive Education', marks: 10, suggestedMinutes: 20, wordRange: '300–400 words',
    prompt: 'Design an inclusive lesson strategy for a mixed-ability Grade 6 classroom containing a learner with dyslexia, a high-achieving learner, and pupils learning in a second language. Justify your choices using differentiated instruction.',
    commandWords: ['Design', 'Justify', 'Apply'],
    answerPlan: ['Set one shared learning outcome', 'Differentiate content, process, product, and environment', 'Describe support for all three learner profiles', 'Explain assessment and feedback'],
    modelAnswer: 'An inclusive lesson should begin with one clear learning outcome that every learner can access at an appropriate level. I would present the key concept through a short explanation, labeled visuals, an audio version, and a simple vocabulary bank. This differentiates content without lowering the central expectation. During guided practice, pupils could choose between paired reading, a teacher-supported group, or an independent challenge task. The learner with dyslexia would receive readable spacing, reduced copying, audio support, and additional processing time. Second-language learners would use visuals, sentence frames, peer discussion, and bilingual keywords. The high-achieving learner would complete an extension that requires analysis, application, or creation rather than more routine work. Product differentiation would allow pupils to demonstrate learning through a paragraph, diagram, oral explanation, or short presentation using the same success criteria. Flexible grouping and a respectful classroom climate would prevent permanent ability labels. The teacher would use questioning, observation, and an exit ticket to check understanding, then provide specific feedback and adjust the next lesson. These choices reflect differentiation because they vary access, learning process, and response format while maintaining equity and a common learning goal.',
    rubric: [{ criterion: 'Coherent inclusive lesson design', marks: 2 }, { criterion: 'Differentiation of content, process, product, or environment', marks: 3 }, { criterion: 'Appropriate support for three learner profiles', marks: 3 }, { criterion: 'Assessment, justification, and clarity', marks: 2 }],
  },
  {
    id: 'tl-erq-2', type: 'ERQ', area: 'Pedagogy', subject: 'Classroom Management', marks: 10, suggestedMinutes: 20, wordRange: '300–400 words',
    prompt: 'A teacher faces frequent off-task behavior, interruptions, and conflict during group work. Develop a positive classroom-management plan using routines, reinforcement, and Kounin’s principles.',
    commandWords: ['Develop', 'Apply', 'Evaluate'],
    answerPlan: ['Diagnose likely causes', 'Establish routines and expectations', 'Apply withitness, overlapping, smoothness, and momentum', 'Use positive reinforcement and restorative responses', 'Monitor impact'],
    modelAnswer: 'The teacher should first collect brief observations to identify when, where, and why disruption occurs. Expectations for listening, movement, materials, group roles, voice level, and conflict resolution should then be taught explicitly, modeled, rehearsed, and displayed. Predictable entry, transition, and closing routines reduce idle time. During group work, each pupil should have a meaningful role and a visible time target. Kounin’s withitness requires the teacher to scan the room and respond early; overlapping means helping one group while monitoring others; smoothness and momentum require clear transitions, prepared resources, and appropriately paced tasks. Specific praise and group recognition should reinforce desired behavior, while corrections should be calm, brief, private where possible, and proportionate. Conflict should be addressed through restorative questions that identify harm and agree on repair. The teacher should avoid public humiliation and collective punishment. Weekly behavior records, student reflection, and completion data can show whether the plan is working. If difficulties continue, tasks, seating, support needs, and family collaboration should be reviewed. This plan is preventive, instructional, and respectful rather than merely punitive.',
    rubric: [{ criterion: 'Diagnosis and preventive routines', marks: 2 }, { criterion: 'Accurate use of Kounin’s principles', marks: 3 }, { criterion: 'Positive and restorative behavior strategies', marks: 2 }, { criterion: 'Monitoring, inclusion, and evaluation', marks: 2 }, { criterion: 'Organization and clarity', marks: 1 }],
  },
  {
    id: 'tl-erq-3', type: 'ERQ', area: 'Pedagogy', subject: 'Assessment & Evaluation', marks: 10, suggestedMinutes: 20, wordRange: '300–400 words',
    prompt: 'Explain how a teacher can construct a fair classroom assessment that is valid, reliable, inclusive, and useful for improving learning.',
    commandWords: ['Explain', 'Evaluate', 'Recommend'],
    answerPlan: ['Align outcomes and assessment blueprint', 'Use appropriate item types and clear language', 'Explain validity and reliability controls', 'Include accessibility and fair administration', 'Use results formatively'],
    modelAnswer: 'A fair assessment begins with clearly stated learning outcomes and a table of specifications that balances content areas and cognitive levels. Each item must measure the intended outcome: selected-response items can sample broad knowledge, while short and extended responses can assess reasoning and application. Instructions should be unambiguous, language should not be unnecessarily difficult, and items should avoid cultural, gender, regional, or disability bias. Validity improves when tasks represent the taught curriculum and the intended construct. Reliability improves through adequate sampling, consistent administration, clear marking schemes, analytic rubrics, and moderation between markers. Reasonable accommodations—such as additional time, readable formatting, assistive technology, or an accessible response mode—should remove irrelevant barriers without changing the learning outcome. Before use, the teacher should review items and, where possible, pilot them. After marking, item difficulty, common errors, and score patterns should be examined. Results should lead to descriptive feedback, learner reflection, targeted reteaching, and enrichment. Assessment becomes educationally useful when it not only reports achievement but also guides what the teacher and learners do next.',
    rubric: [{ criterion: 'Outcome alignment and assessment design', marks: 2 }, { criterion: 'Validity and reliability', marks: 3 }, { criterion: 'Fairness, inclusion, and administration', marks: 2 }, { criterion: 'Feedback and instructional use of results', marks: 2 }, { criterion: 'Organization and clarity', marks: 1 }],
  },
  {
    id: 'tl-erq-4', type: 'ERQ', area: 'Content Knowledge', subject: 'English Language', marks: 10, suggestedMinutes: 20, wordRange: '300–400 words',
    prompt: 'Discuss the importance of reading comprehension in middle school and propose a before–during–after reading strategy that develops inference, vocabulary, and critical thinking.',
    commandWords: ['Discuss', 'Propose', 'Justify'],
    answerPlan: ['Explain the value of comprehension', 'Before-reading activation and prediction', 'During-reading annotation, questioning, and vocabulary', 'After-reading inference and evaluation', 'Assessment of learning'],
    modelAnswer: 'Reading comprehension enables learners to construct meaning, connect information with prior knowledge, and evaluate ideas rather than simply pronounce words. It supports achievement in every subject because textbooks, instructions, and examination questions all require purposeful reading. Before reading, the teacher can display the title and one relevant image, activate prior knowledge, preteach a few essential words, and ask learners to predict the text’s purpose. During reading, pupils can annotate key ideas, use context clues for unfamiliar vocabulary, pause to ask and answer questions, and record evidence that supports an inference. Think-aloud modeling shows how an expert reader notices clues and revises predictions. After reading, learners can summarize the central idea, compare their predictions with the text, explain an inference using quoted evidence, and evaluate the author’s viewpoint or reliability. Pair discussion supports language development before independent writing. An exit response requiring one inference, its evidence, and one newly learned word provides quick assessment information. The teacher can use these responses to identify misconceptions and plan follow-up support. This structured cycle builds vocabulary, evidence-based reasoning, and increasingly independent comprehension.',
    rubric: [{ criterion: 'Importance of reading comprehension', marks: 2 }, { criterion: 'Effective before-reading strategy', marks: 2 }, { criterion: 'Effective during-reading strategy', marks: 2 }, { criterion: 'Effective after-reading strategy', marks: 2 }, { criterion: 'Assessment, justification, and clarity', marks: 2 }],
  },
];

const makeQuestion = (seed: QuestionSeed, type: SubjectiveQuestionType, index: number): TeachingLicenseSubjectiveQuestion => ({
  id: `tl-${type.toLowerCase()}-${index + 5}`,
  type,
  area: seed.area,
  subject: seed.subject,
  marks: type === 'CRQ' ? 5 : 10,
  suggestedMinutes: type === 'CRQ' ? 8 : 20,
  wordRange: type === 'CRQ' ? '100–150 words' : '300–400 words',
  prompt: seed.prompt,
  commandWords: type === 'CRQ' ? ['Explain', 'Apply', 'Support'] : ['Analyze', 'Develop', 'Justify'],
  answerPlan: type === 'CRQ'
    ? ['Identify the central concept', 'Apply it directly to the question', 'Support the response with an accurate example or calculation']
    : ['Introduce the issue and position', 'Develop organized evidence-based points', 'Apply ideas to the Sindh school context', 'Conclude with justified recommendations'],
  modelAnswer: `${seed.guidance} A complete response should remain focused on the command words, use accurate terminology, connect claims with relevant classroom or subject evidence, and end with a clear conclusion rather than unrelated general information.`,
  rubric: type === 'CRQ'
    ? [{ criterion: 'Accurate knowledge and terminology', marks: 2 }, { criterion: 'Direct application or supporting evidence', marks: 2 }, { criterion: 'Clarity and focus', marks: 1 }]
    : [{ criterion: 'Accurate conceptual knowledge', marks: 3 }, { criterion: 'Analysis and relevant application', marks: 3 }, { criterion: 'Justified strategy or recommendations', marks: 2 }, { criterion: 'Organization and clarity', marks: 2 }],
});

TEACHING_LICENSE_SUBJECTIVE_QUESTIONS.push(
  ...CRQ_SEEDS.map((seed, index) => makeQuestion(seed, 'CRQ', index)),
  ...ERQ_SEEDS.map((seed, index) => makeQuestion(seed, 'ERQ', index)),
);

