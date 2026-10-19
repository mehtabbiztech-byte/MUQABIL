import type { StudyLesson, StudySubject } from '../types';

/**
 * Source-aligned Methods of Teaching notes supplied for the MUQABIL study-notes
 * section. The six lessons retain the source topics, explanations, examples,
 * key points, practice questions, and extended-response prompts.
 */
const lesson = (
  id: string,
  title: string,
  readTime: string,
  explanation: string,
  importantPoints: string[],
  examples: string[],
  practice: { prompt: string; answer: string }[],
  htmlNotesPath?: string,
): StudyLesson => ({
  id,
  title,
  audience: 'advanced',
  readTime,
  ...(htmlNotesPath ? { htmlNotesPath } : {}),
  explanation,
  importantPoints,
  examples,
  mcqs: [],
  practice,
  relatedQuestionIds: [],
});

export const METHODS_OF_TEACHING_LESSONS: StudyLesson[] = [
  lesson(
    'methods-blooms-taxonomy',
    "Bloom's Taxonomy of Educational Objectives",
    '10 min read',
    "Bloom's Taxonomy is a classification system that arranges learning objectives from simple to complex. It helps teachers decide what students should learn and how deeply they should learn it. It was developed by Benjamin Bloom and colleagues in 1956 and revised by Anderson and Krathwohl in 2001. The three domains are Cognitive (mental skills), Affective (feelings and attitudes), and Psychomotor (physical and practical skills). The revised cognitive levels are Remember, Understand, Apply, Analyse, Evaluate, and Create. Teaching should move beyond recall toward higher-order thinking, while objectives, classroom activities, and assessment remain aligned.",
    [
      'Revised cognitive sequence: Remember → Understand → Apply → Analyse → Evaluate → Create.',
      'LOTS commonly includes Remember, Understand, and sometimes Apply; HOTS includes Analyse, Evaluate, and Create.',
      'Knowledge dimensions are factual, conceptual, procedural, and metacognitive.',
      'Affective levels are Receiving, Responding, Valuing, Organising, and Characterising.',
      'Teachers use Bloom’s Taxonomy to write measurable objectives, plan lessons, design assessment, question students, and differentiate instruction.',
      'The taxonomy is a guide rather than a rigid staircase: levels can overlap and learning is not always strictly step-by-step.',
    ],
    [
      'Remember: List the stages of the water cycle.',
      'Understand: Explain how clouds are formed.',
      'Apply: Use a diagram to show how rain forms in your area.',
      'Analyse: What would happen if evaporation stopped?',
      'Evaluate: Which is a bigger threat to water supply—pollution or wastage? Why?',
      'Create: Design a model or poster that shows the water cycle.',
    ],
    [
      { prompt: 'Explain the main changes made in the 2001 revision of Bloom’s Taxonomy.', answer: 'The revision changed nouns into active verbs, changed Knowledge to Remember, changed Synthesis to Create, and placed Create above Evaluate.' },
      { prompt: 'Differentiate between LOTS and HOTS.', answer: 'LOTS focuses on recalling, understanding, and applying information; HOTS develops analysis, evaluation, and creation. Effective teaching begins with foundations and progresses toward deeper thinking.' },
      { prompt: 'A Grade 6 assessment asks only for the stages of the water cycle. What is missing?', answer: 'The question tests only Remember. Add Understand, Apply, Analyse, Evaluate, and Create questions so the assessment measures deeper learning.' },
    ],
    'notes/methods-of-teaching/blooms-taxonomy-of-educational-objectives.html',
  ),
  lesson(
    'methods-cooperative-learning',
    'Cooperative Learning Strategies',
    '9 min read',
    'Cooperative learning breaks students into small groups to learn together. It is more than ordinary group work: every member has an individual task or concept to explain, and individual accountability contributes to group success. Students lead much of the learning while the teacher acts as a facilitator who helps them connect the pieces. Cooperative learning improves comprehension, confidence, communication, leadership, time management, critical thinking, motivation, and inclusion.',
    [
      'Small-group learning must include meaningful roles and individual accountability.',
      'The teacher facilitates rather than delivering every part of the lesson.',
      'The eight strategies are Speed Quizzes, Puzzle Pieces, One-Minute Papers, Sentence Completion, Classmate Interviews, Student Expertise, Freeride Elimination, and Teamwork 101.',
      'Freeride Elimination uses task lists and visible contributions so no learner can hide from responsibility.',
      'Teamwork 101 teaches active listening, fair idea-sharing, and respectful disagreement before major group work.',
      'Cooperative learning works best when positive interdependence and individual responsibility operate together.',
    ],
    [
      'Speed Quizzes: Students use question-and-answer flashcards in quick rounds.',
      'Puzzle Pieces: Each learner researches one part of a larger project and communicates with the group to assemble the whole.',
      'One-Minute Papers: Students quickly record what they remember, then compare notes with a partner.',
      'Classmate Interviews: Groups of three rotate interviewer, interviewee, and note-taker roles.',
      'Student Expertise: A learner who understands a concept helps classmates and reinforces their own mastery.',
    ],
    [
      { prompt: 'Explain how cooperative learning differs from simple group work.', answer: 'Cooperative learning uses structured interdependence: each member has a meaningful role, an individual task or concept, and accountability for contributing to group mastery.' },
      { prompt: 'How can a teacher stop two students from doing all the group work?', answer: 'Use individual roles, task checklists, coloured markers or signatures, visible accountability, and activities such as Puzzle Pieces, Classmate Interviews, and Freeride Elimination.' },
      { prompt: 'Describe four benefits of cooperative learning.', answer: 'It improves comprehension, confidence, social skills, critical thinking, motivation, inclusion, classroom participation, and understanding of different perspectives.' },
    ],
    'notes/methods-of-teaching/cooperative-learning-strategies.html',
  ),
  lesson(
    'methods-effective-questioning',
    'Effective Questioning Strategies in Teaching',
    '7 min read',
    'Questioning is a powerful pedagogical tool that engages students, stimulates critical thinking, assesses understanding, and makes thinking visible. Lower-order or convergent questions focus on facts and one correct answer. Higher-order or divergent questions encourage analysis, evaluation, and creative thinking. Probing questions ask learners to clarify, justify, or expand an answer. Effective questioning includes wait time, equitable participation, structured peer discussion, and redirection of responses to classmates.',
    [
      'Wait 3–5 seconds after asking a question before selecting a student.',
      'Cold call after asking and pausing, rather than relying only on volunteers.',
      'Think-Pair-Share follows Think → Pair → Share and supports reserved learners.',
      'Bounce or Pass-the-Mic redirects an answer to another learner for agreement, disagreement, or evidence.',
      'Plan key questions, praise process and effort, distribute questions across the room, and avoid rapid-fire questioning.',
      'Do not reject incorrect answers outright or answer your own questions immediately; use errors as learning opportunities.',
    ],
    [
      'Lower-order: What is the capital of France?',
      'Higher-order: How might history be different if a particular event had not occurred?',
      'Probing: What evidence supports your answer?',
      'Think-Pair-Share: Students think alone, discuss with a partner, then share a combined view.',
      'Bounce: “Sarah, do you agree with Alex’s explanation? Why or why not?”',
    ],
    [
      { prompt: 'What is wait time and why is it important?', answer: 'Wait time is a 3–5 second pause after a question. It gives students time to process, increases participation, and produces longer and deeper responses.' },
      { prompt: 'Differentiate convergent and divergent questions.', answer: 'Convergent questions usually seek facts or one correct answer; divergent questions invite analysis, evaluation, creativity, and multiple defensible responses.' },
      { prompt: 'How can a teacher deepen one-word answers?', answer: 'Use probing questions, wait time, Think-Pair-Share, and Bounce / Pass-the-Mic to ask for evidence, reasoning, clarification, or another student’s response.' },
    ],
    'notes/methods-of-teaching/effective-questioning-strategies.html',
  ),
  lesson(
    'methods-instructional-approaches',
    'Instructional Approaches and Strategies',
    '12 min read',
    'Instructional approaches and strategies are methods and techniques educators use to facilitate effective teaching and learning. They vary according to subject, age, prior knowledge, learning goals, and learner needs. The major approaches covered here are Lecture-Based Instruction, Active Learning, Project-Based Learning, Flipped Learning, Collaborative Learning, Differentiated Instruction, Technology-Enhanced Learning, Scaffolded Instruction, Gamification and Game-Based Learning, Formative Assessment, Inquiry-Based Learning, Experiential Learning, Modeling, and Chunking. Effective educators combine and adapt approaches rather than relying on one method for every lesson.',
    [
      'Lecture-Based Instruction delivers content through spoken explanation and presentation.',
      'Active, project-based, collaborative, inquiry-based, and experiential learning make students active participants.',
      'Flipped Learning places content access outside class and uses class time for interaction and application.',
      'Differentiated Instruction responds to different readiness levels, abilities, learning styles, and needs.',
      'Scaffolding breaks complex learning into manageable steps and gradually increases difficulty.',
      'Formative assessment uses ongoing evidence and feedback to adjust teaching.',
      'Modeling demonstrates the desired skill; Chunking divides information into smaller, memorable units.',
    ],
    [
      'Students watch a grammar video at home and write and edit essays in class: Flipped Learning.',
      'Students design a plan to reduce plastic waste in school: Project-Based Learning.',
      'Students use Google Earth to tour the Amazon rainforest: Technology-Enhanced Learning.',
      'A teacher divides a long poem into four-line stanzas: Chunking.',
      'A PE teacher demonstrates a basketball free throw before student practice: Modeling.',
      'Exit tickets reveal who needs additional support: Assessment for Learning.',
    ],
    [
      { prompt: 'Explain the difference between Flipped Learning and traditional Lecture-Based Instruction.', answer: 'Flipped Learning moves content access outside class and reserves class time for discussion, practice, and application. Traditional lecture delivers most content during class while students listen and take notes.' },
      { prompt: 'What is Scaffolded Instruction?', answer: 'It breaks complex learning into smaller manageable parts, provides support, and gradually increases difficulty as learners gain mastery.' },
      { prompt: 'Choose three methods and explain why they are effective.', answer: 'Valid choices include Flipped Learning, Gamification, Collaborative Learning, Inquiry-Based Learning, Differentiated Instruction, and others when each is supported with a description and classroom example.' },
    ],
    'notes/methods-of-teaching/instructional-approaches-and-strategies.html',
  ),
  lesson(
    'methods-npstp-pakistan',
    'National Professional Standards for Teachers in Pakistan',
    '10 min read',
    'The National Professional Standards for Teachers in Pakistan (NPSTP) are a national benchmark describing what a good teacher should know, believe, and be able to do. They were developed by the Policy and Planning Wing of the Ministry of Education with USAID support in 2009, in the context of the National Education Policy 2009. They guide teacher education, recruitment, training, performance appraisal, promotion, accountability, and professional development. Each standard is described through Knowledge, Dispositions, and Performances.',
    [
      'There are ten standards: Subject Matter Knowledge; Human Growth and Development; Islamic Ethical Values / Social Life Skills; Instructional Planning and Strategies; Assessment; Learning Environment; Effective Communication and Language Proficiency; Collaboration and Partnerships; Continuous Professional Development and Code of Conduct; Teaching of the Holy Quran where it is part of the curriculum.',
      'Standards connect teacher knowledge, professional attitudes, and classroom performance.',
      'Teachers should use clear objectives, varied strategies, formative and summative assessment, feedback, inclusive environments, communication, collaboration, and reflection.',
      'Implementation challenges include limited awareness, resources, monitoring, large classes, workload, and provincial variation.',
      'Improvement requires CPD, linking recruitment and appraisal to standards, better monitoring, resources, and periodic updates.',
    ],
    [
      'A teacher who understands child development and adapts tasks to age and ability meets Human Growth and Development.',
      'A teacher who uses quizzes, projects, observation, feedback, and records meets Assessment expectations.',
      'A teacher who uses respectful discipline, inclusive participation, and no physical punishment supports a positive Learning Environment.',
    ],
    [
      { prompt: 'What is the purpose of NPSTP?', answer: 'NPSTP provides a common national benchmark for teacher quality and guides education, recruitment, training, evaluation, professional conduct, and improved student learning.' },
      { prompt: 'Describe the three-part structure of each standard.', answer: 'Knowledge is what the teacher should know; Dispositions are the values and attitudes the teacher should hold; Performances are what the teacher should do in practice.' },
      { prompt: 'Identify four standards a teacher violates by only lecturing, planning poorly, assessing only at term-end, and avoiding colleagues and parents.', answer: 'Instructional Planning and Strategies, Assessment, Collaboration and Partnerships, and Continuous Professional Development / Code of Conduct are directly implicated; Learning Environment and Communication may also be relevant depending on the evidence.' },
    ],
  ),
  lesson(
    'methods-teacher-student-centred',
    'Teacher-Centred and Student-Centred Approaches',
    '8 min read',
    'Teacher-centred and student-centred approaches are two ends of a spectrum, and effective classrooms commonly blend them. In a teacher-centred approach, the teacher is the expert and transmitter who controls pace, content, and activities, while students mainly receive information. Common methods include lecture, direct instruction, demonstration, drill, recitation, and textbook work. In a student-centred approach, the teacher is a facilitator and guide, while learners construct knowledge through inquiry, discussion, collaboration, projects, problem-solving, peer teaching, and doing. Effective teachers choose the balance according to the objective, learners, and context.',
    [
      'Teacher-centred strengths include efficiency, structure, predictability, suitability for large classes, and foundational skills.',
      'Teacher-centred limitations include passivity, memorisation, limited individualisation, and weaker critical thinking and collaboration.',
      'Student-centred strengths include ownership, motivation, communication, critical thinking, problem-solving, and deeper understanding.',
      'Student-centred limitations include greater planning and resource needs, management challenges, and possible coverage gaps without structure.',
      'Teacher-centred approaches are linked with behaviourism, including Skinner and Pavlov.',
      'Student-centred approaches draw on constructivism and humanism, including Piaget, Vygotsky, Bruner, Rogers, and Dewey.',
      'A short direct explanation can set up a group task, and a student-led project can end with teacher-led consolidation.',
    ],
    [
      'A teacher demonstrates a procedure, guides practice, and then checks independent performance: teacher-centred direct instruction.',
      'Students investigate a problem, discuss evidence, and present a solution: student-centred learning.',
      'In a large class with limited resources, a teacher can gradually add Think-Pair-Share and small-group tasks to lectures.',
    ],
    [
      { prompt: 'Compare teacher-centred and student-centred approaches.', answer: 'Teacher-centred teaching places the teacher as expert and students as receivers, focusing on content and recall. Student-centred teaching makes the teacher a facilitator and students active participants, focusing on learner needs, process, and deeper understanding.' },
      { prompt: 'Why is a balanced approach often most effective?', answer: 'Different objectives and contexts need different levels of explanation, modelling, practice, inquiry, and collaboration. Blending methods preserves clarity while building active thinking.' },
      { prompt: 'Suggest four practical strategies for a large lecture-based mathematics class.', answer: 'Use short explanations followed by Think-Pair-Share, peer problem-solving, worked-example modelling followed by guided and independent practice, and exit tickets or quick formative checks.' },
    ],
    'notes/methods-of-teaching/teacher-centred-and-student-centred-approaches.html',
  ),
];

export const METHODS_OF_TEACHING_SUBJECT: StudySubject = {
  id: 'methods-of-teaching-notes',
  title: 'Methods of Teaching',
  chapters: [
    {
      id: 'methods-of-teaching-chapter',
      title: 'Methods of Teaching',
      topics: METHODS_OF_TEACHING_LESSONS.map((item) => ({
        id: item.id,
        title: item.title,
        lessons: [item],
      })),
    },
  ],
};
