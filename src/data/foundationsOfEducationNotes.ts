import type { StudyLesson, StudySubject } from '../types';

/**
 * Source-aligned Foundations of Education notes supplied for the MUQABIL
 * study-notes section. Each lesson retains the source topic, explanation,
 * examples, key points, and practice questions of its note, and renders the
 * supplied HTML document unchanged through htmlNotesPath.
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

export const FOUNDATIONS_OF_EDUCATION_LESSONS: StudyLesson[] = [
  lesson(
    'foundations-ideological',
    'Ideological Foundations of Education',
    '9 min read',
    "The ideological foundation determines the vision, ethos, values, and ultimate purpose of education in a society, aligning educational practice with the community's core beliefs and philosophy. Without it, an educational system lacks direction, purpose, and cultural relevance. Its core components are the core belief system, national identity, moral and ethical character, and social cohesion, and its main functions are goal setting, curriculum design, teaching methodology, and policy formulation. Major philosophical and ideological streams include Idealism, Realism, Pragmatism/Progressivism, and religious or cultural ideologies. In Pakistan, the ideological foundation of education is explicitly rooted in Islamic ideology and the ideology of Pakistan, as emphasised in the National Education Policy of 1979.",
    [
      'Core components: Core Belief System, National Identity, Moral & Ethical Character, and Social Cohesion.',
      'Main functions: Goal Setting, Curriculum Design, Teaching Methodology, and Policy Formulation.',
      'Idealism seeks truth, beauty, and goodness; Realism emphasizes objective truth, empirical knowledge, and scientific inquiry.',
      'Pragmatism/Progressivism focuses on learning by doing, adaptability, and problem-solving; religious/cultural ideologies pursue holistic development guided by sacred texts and spiritual values.',
      "Pakistan's education is rooted in Islamic ideology and the ideology of Pakistan; the National Education Policy of 1979 stressed loyalty to Islam, character in accordance with the Quran and Sunnah, awareness of the universal Muslim Ummah, and knowledge of the Pakistan Movement's ideological foundations.",
      'Without a strong ideological foundation, an educational system lacks direction, purpose, and cultural relevance — it acts as the compass that directs individual growth and national progress.',
    ],
    [
      'An Islamic society prioritizes Tawhid (Oneness of God) and moral accountability in its curriculum.',
      'Teaching the Pakistan Movement and the ideology of Pakistan in history classes.',
      'Character education programs that emphasize honesty, responsibility, and respect for others.',
      'Inclusive curricula that represent different ethnic and religious communities within the nation.',
    ],
    [
      {
        prompt: 'Explain the four core components of ideological foundations of education and why each one matters.',
        answer: 'The four components are the Core Belief System (religious, ethical, and cultural values that guide life), National Identity (patriotism, unity, and respect for heritage), Moral & Ethical Character (personality, integrity, and self-discipline), and Social Cohesion (justice, tolerance, and mutual respect among diverse groups). Each matters because together they give the education system its direction, identity, and social purpose.',
      },
      {
        prompt: 'Describe the four main functions of ideological foundations in education.',
        answer: 'Goal Setting defines overarching aims such as character building and civic duty; Curriculum Design determines which subjects, historical narratives, and values are prioritized; Teaching Methodology guides pedagogical approaches that instill discipline, critical thinking, or moral reflection; Policy Formulation serves as the benchmark for educational reforms, standards, and national goals.',
      },
      {
        prompt: 'Compare Idealism and Realism as philosophical streams of educational ideology.',
        answer: 'Idealism emphasizes spiritual, moral, and intellectual development through truth, beauty, and goodness, treating reality as mental or spiritual. Realism focuses on objective truth, empirical knowledge, scientific inquiry, and the practical understanding of the physical world. Idealism shapes education around values and ideals, while Realism shapes it around observation and evidence.',
      },
      {
        prompt: 'How has the ideological foundation of education in Pakistan been shaped by Islamic ideology and the Pakistan Movement?',
        answer: 'Pakistan has consistently rooted education in Islamic ideology and the ideology of Pakistan. The National Education Policy of 1979 emphasized fostering loyalty to Islam, developing character in accordance with the Quran and Sunnah, creating awareness of the universal Muslim Ummah, producing citizens conversant with the Pakistan Movement, and reviewing curricula and textbooks to promote national cohesiveness and Islamic ideology.',
      },
    ],
    'notes/foundations-of-education/ideological-foundations-of-education.html',
  ),
  lesson(
    'foundations-philosophical',
    'Philosophical Foundations of Education',
    '9 min read',
    'Philosophy forms the foundational logic and intellectual structure of education. While ideological foundations supply the values and vision of a specific society, philosophical foundations examine the nature of reality, knowledge, and value — addressing what should be taught, how we know what is true, and what is worth knowing. Its three core branches are Metaphysics (what is real — it determines curriculum content), Epistemology (how we know what is true — it guides teaching and learning methods), and Axiology (what is good, right, or beautiful — it shapes character education and school culture). The four major schools are Idealism (Plato, Kant, Hegel), Realism (Aristotle, Bacon, Locke), Pragmatism/Experimentalism (Dewey, Peirce, James), and Existentialism (Sartre, Kierkegaard, Nietzsche). The philosophical foundation serves as the framework for every decision in an educational system — shaping curriculum, instruction, assessment, and the school’s role in human development.',
    [
      'Metaphysics asks "What is real?" and decides whether a curriculum includes physical science only, or also spiritual/metaphysical concepts.',
      'Epistemology asks "How do we know what is true?" and guides whether teachers use lecture, inquiry, observation, or deduction.',
      'Axiology asks "What is good, right, or beautiful?" and shapes character education, moral reasoning, aesthetics, and school culture.',
      'Idealism (Plato, Kant, Hegel): reality is grounded in ideas, mind, and spirit; character development, wisdom, and eternal truths via classics, philosophy, humanities, and history taught through the Socratic method and lecture.',
      'Realism (Aristotle, Francis Bacon, John Locke): reality exists independently of human minds; understanding the physical world through systematic observation and logic, with demonstration, experiment, and direct instruction.',
      'Pragmatism/Experimentalism (Dewey, Peirce, James): truth is dynamic and practical; education is life itself, with project-based learning, hands-on tasks, integrated subjects, and collaborative problem-solving.',
      'Existentialism (Sartre, Kierkegaard, Nietzsche): reality is defined by individual existence, free will, and personal responsibility; students discover their unique identity through arts, literature, humanities, and self-directed study.',
      'Teacher roles span moral authority/model (Idealism), subject-matter expert (Realism), facilitator/guide (Pragmatism), and provocative mentor (Existentialism); learner roles move from passive absorber of universal principles to active, self-directed inquirer.',
    ],
    [
      'A curriculum that includes both physical science and spiritual concepts reflects a metaphysical decision about what is real.',
      'Choosing inquiry and observation over pure lecture reflects an epistemological decision about how knowledge is gained.',
      'Character education programs and inclusive school culture grow out of axiological commitments about what is good and beautiful.',
      'Project-based, hands-on tasks with integrated subjects exemplify Pragmatist education in action.',
    ],
    [
      {
        prompt: 'Explain the three core branches of philosophy and how each applies to education.',
        answer: 'Metaphysics asks "What is real?" and determines curriculum content (physical science, spiritual concepts, or both). Epistemology asks "How do we know what is true?" and guides teaching and learning methods (lecture, inquiry, observation, deduction). Axiology asks "What is good, right, or beautiful?" and shapes character education, moral reasoning, aesthetics, and school culture.',
      },
      {
        prompt: 'Compare Idealism and Pragmatism as educational philosophies, including their key thinkers and methods.',
        answer: 'Idealism (Plato, Kant, Hegel) holds that reality is grounded in ideas and spirit; it aims at character development and eternal truths and uses classics, philosophy, and history taught via the Socratic method and lecture. Pragmatism (Dewey, Peirce, James) holds that truth is dynamic and practical; education is life itself and democratic and student-centered, using project-based learning, hands-on tasks, integrated subjects, and collaborative problem-solving.',
      },
      {
        prompt: 'How does philosophical foundation shape the purpose of education, the teacher’s role, and the learner’s role?',
        answer: 'Purpose ranges from transmitting timeless truths (Idealism) and mastering real-world facts (Realism) to solving practical problems (Pragmatism) and fostering self-actualization (Existentialism). The teacher is a moral authority/model, subject-matter expert, facilitator/guide, or provocative mentor respectively. The learner moves from a passive absorber of universal principles to an active, self-directed inquirer shaping their own learning path.',
      },
      {
        prompt: 'Describe Existentialism as an educational philosophy — its core view, key thinkers, and how it shapes curriculum and method.',
        answer: 'Existentialism’s core view is that reality is defined by individual existence, free will, and personal responsibility. Key thinkers are Jean-Paul Sartre, Søren Kierkegaard, and Friedrich Nietzsche. It helps students discover their unique identity, choices, and personal values; its curriculum includes arts, literature, humanities, and self-directed study, taught through open discussion, creative expression, and self-reflection.',
      },
    ],
    'notes/foundations-of-education/philosophical-foundations-of-education.html',
  ),
];

export const FOUNDATIONS_OF_EDUCATION_SUBJECT: StudySubject = {
  id: 'foundations-of-education-notes',
  title: 'Foundations of Education',
  chapters: [
    {
      id: 'foundations-of-education-chapter',
      title: 'Foundations of Education',
      topics: FOUNDATIONS_OF_EDUCATION_LESSONS.map((item) => ({
        id: item.id,
        title: item.title,
        lessons: [item],
      })),
    },
  ],
};
