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
