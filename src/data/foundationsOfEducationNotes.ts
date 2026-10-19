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
  lesson(
    'foundations-sociological',
    'Sociological Foundations of Education',
    '9 min read',
    'The sociological foundation views education as a vital social institution that shapes, and is shaped by, society. It examines how schools socialize individuals, influence social mobility, reproduce or challenge social stratification, and transmit cultural capital. Core functions include manifest functions (cultural transmission, secondary socialization, economic and workforce sorting, social cohesion) and latent functions (peer networking, custodial supervision, creation of generation gaps). Major sociological perspectives include Functionalism (Durkheim, Parsons — education maintains social stability and consensus), Conflict Theory (Marx, Bourdieu — education reproduces class inequality and preserves elite privilege through cultural capital and hidden curricula), and Symbolic Interactionism (Mead, Cooley — face-to-face classroom interactions, labeling, and self-fulfilling prophecies). Crucially, educational equity focuses on distributing resources based on learner need to overcome historical and socio-economic disparities, rather than merely treating unequal starting points with identical resources (equality).',
    [
      'Manifest functions: Cultural transmission, secondary socialization, workforce sorting, and social integration/cohesion.',
      'Latent functions: Peer network formation, custodial childcare, generation gap creation, and status maintenance.',
      'Functionalism (Durkheim, Parsons): Education maintains social stability, social consensus, and workforce allocation through meritocracy.',
      'Conflict Theory (Marx, Bourdieu): Education reproduces social inequalities and class hierarchies; cultural capital advantages higher-status families.',
      'Symbolic Interactionism (Mead, Cooley): Examines micro-level classroom dynamics, teacher labeling, expectations, and self-fulfilling prophecies.',
      'Hidden Curriculum: Implicit, unwritten social norms transmitted in schools (punctuality, respect for hierarchy, conformity, competition).',
      'Equality vs. Equity: Equality provides identical resources; equity distributes differentiated resources based on learner need to achieve fair outcomes.',
      'Social Mobility: Education is a primary vehicle for vertical upward social mobility through skills and recognized credentials.',
    ],
    [
      'A school teaching democratic values and national identity serves manifest cultural transmission.',
      'A teacher holding high expectations for all students counteracts negative labeling and self-fulfilling prophecies.',
      'Providing targeted remedial tutoring and free textbooks to low-income students is an equity intervention.',
      'Unwritten classroom expectations about punctuality and raising hands represent the hidden curriculum.',
    ],
    [
      {
        prompt: 'Explain the difference between manifest and latent functions of education with two examples of each.',
        answer: 'Manifest functions are explicit, intended outcomes such as cultural transmission (passing down national values and knowledge) and skill sorting (preparing students for careers). Latent functions are unintended, implicit outcomes such as peer network formation and custodial youth supervision while parents work.',
      },
      {
        prompt: 'Compare Functionalism and Conflict Theory regarding the role of education in society.',
        answer: 'Functionalism (Durkheim, Parsons) sees education as maintaining social stability, consensus, and meritocratic sorting for the collective good. Conflict Theory (Marx, Bourdieu) argues that education reproduces social inequality, legitimizes privilege, and transmits elite cultural capital through biased curricula and resources.',
      },
      {
        prompt: 'What is the "hidden curriculum" and what implicit lessons does it teach?',
        answer: 'The hidden curriculum refers to the informal, unwritten social lessons taught in schools beyond official textbooks, including punctuality, deference to authority, competition, and adherence to institutional routines.',
      },
      {
        prompt: 'Distinguish between educational equality and educational equity with a classroom example.',
        answer: 'Equality provides every student with identical resources regardless of background. Equity distributes resources based on individual student needs so all learners can achieve success — for example, providing extra bilingual support and tailored learning aids to disadvantaged learners.',
      },
    ],
    'notes/foundations-of-education/sociological-foundations-of-education.html',
  ),
  lesson(
    'foundations-psychological',
    'Psychological Foundations of Education',
    '9 min read',
    'Educational psychology provides the scientific understanding of how learning takes place, how human beings develop across cognitive, physical, and socio-emotional domains, and how motivation influences achievement. The four major learning theories each provide indispensable pedagogical tools: Behaviorism (Pavlov, Watson, Skinner) focuses on observable behavior shaped by stimuli, conditioning, drills, and reinforcement; Cognitivism (Piaget, Bruner, Gagné) examines internal information processing, sensory/working/long-term memory structures, chunking, and schemas; Constructivism (Piaget, Vygotsky) posits that learners actively construct knowledge through experiential inquiry, scaffolding, and interaction within the Zone of Proximal Development (ZPD); and Humanism (Maslow, Rogers) addresses holistic personal growth, affective needs, emotional safety, and self-actualization. Developmental stages (Piaget\'s preoperational, concrete operational, and formal operational) guide age-appropriate curriculum design, while Gardner\'s Multiple Intelligences and motivation theory (intrinsic vs extrinsic) drive differentiated, inclusive instruction.',
    [
      'Four core learning theories: Behaviorism (reinforcement/habits), Cognitivism (mental schemas/information processing), Constructivism (active discovery/ZPD), Humanism (emotional needs/self-actualization).',
      'Information Processing Model: Sensory memory → working memory (limited capacity) → long-term memory (schemas).',
      'Vygotsky\'s Zone of Proximal Development (ZPD) & Scaffolding: Learning occurs in the zone between independent performance and guided assistance.',
      'Piaget\'s Developmental Stages: Preoperational (2–7 yrs, symbolic/egocentric), Concrete Operational (7–11 yrs, logical concrete reasoning), Formal Operational (12+ yrs, abstract hypothetical thinking).',
      'Maslow\'s Hierarchy of Needs: Physiological and emotional safety needs must be satisfied before higher-order cognitive learning flourishes.',
      'Motivation: Intrinsic motivation (curiosity, autonomy, mastery) promotes lifelong retention; extrinsic motivation (grades, rewards) shapes immediate behavior.',
      'Multiple Intelligences (Gardner): 8 distinct modalities requiring multi-sensory, differentiated instructional strategies.',
    ],
    [
      'Using immediate positive praise and behavior charts draws upon Skinner\'s operant conditioning.',
      'Using mind maps, graphic organizers, and concept chunking leverages cognitive information processing.',
      'Pairing a struggling reader with a stronger peer for scaffolded reading applies Vygotsky\'s ZPD.',
      'Ensuring a child has had a meal and feels safe in class before demanding complex math honors Maslow\'s hierarchy.',
    ],
    [
      {
        prompt: 'Compare Behaviorism and Constructivism in their view of the learner and classroom instruction.',
        answer: 'Behaviorism views the learner as responding to external stimuli and reinforcement, emphasizing direct instruction, drills, and measurable behavior changes. Constructivism views the learner as an active constructor of knowledge, emphasizing inquiry, hands-on discovery, collaborative dialogue, and scaffolding.',
      },
      {
        prompt: 'Explain Vygotsky’s Zone of Proximal Development (ZPD) and the role of scaffolding.',
        answer: 'ZPD is the difference between what a student can do independently and what they can achieve with guidance from a teacher or more capable peer. Scaffolding is the temporary support structure (prompts, modeling, hints) provided in the ZPD that is gradually faded as competence grows.',
      },
      {
        prompt: 'How does Piaget’s distinction between Concrete and Formal Operational stages guide secondary teaching?',
        answer: 'Concrete operational learners (ages 7–11) require tangible objects, manipulatives, and real-world examples to think logically. Formal operational learners (ages 12+) can handle abstract hypotheses, algebraic symbols, deductive proofs, and metacognitive reflection without needing concrete physical props.',
      },
      {
        prompt: 'Why must teachers address Maslow’s deficiency needs before expecting deep academic achievement?',
        answer: 'According to Maslow, lower-level physiological (food, rest) and psychological needs (safety, belonging, self-esteem) take precedence. If a student feels anxious, threatened, or hungry, cognitive resources are hijacked by survival instincts, inhibiting higher-level problem solving and retention.',
      },
    ],
    'notes/foundations-of-education/psychological-foundations-of-education.html',
  ),
  lesson(
    'foundations-historical',
    'Historical Foundations of Education',
    '9 min read',
    'The historical foundation traces the evolution of educational systems, philosophical currents, institutions, and policies over time. It reveals that contemporary school practices — such as age-grading, compulsory attendance, standardized testing, and liberal arts curricula — are not accidental, but the outcomes of historical struggles and social transformations. Ancient Civilizations (India, China, Egypt, Mesopotamia) focused on religious preservation, scribal record-keeping, and moral ethics. Classical Antiquity (Athens and Rome) birthed liberal education for democratic citizenship, the Socratic method of dialogue, rhetoric, and civic duty, contrasted with Spartan military training. The Medieval Era and Islamic Golden Age synthesized classical scholarship with religious ethics, establishing early universities (Bologna, Paris, Oxford) and renowned research academies/libraries (House of Wisdom in Baghdad, Ibn Sina, Al-Farabi, Ibn Khaldun). The Renaissance, Reformation, and Scientific Revolution brought humanism, universal vernacular literacy (Martin Luther), and empirical science (Bacon, Descartes). The Industrial Era established the Prussian factory model of compulsory age-graded schooling and Horace Mann\'s Common School Movement. Three overarching historical lessons emerge: the evolution of educational purpose from religious preservation to global innovation; the shift in access from elite privilege to universal human right; and the pedagogical shift from rote memorization and corporal punishment to student-centered, psychologically informed learning.',
    [
      'Ancient Civilizations: Preserving religious texts, moral order, Gurukul guru-disciple tradition in India, Confucian civil service exams in China, scribal training in Egypt/Mesopotamia.',
      'Classical Greece & Rome: Athenian liberal education of the whole person, Socratic questioning, Plato’s Academy, Aristotle’s empirical logic, and Roman rhetoric/civic training (Quintilian).',
      'Medieval & Islamic Golden Age: Trivium (Grammar, Rhetoric, Logic) and Quadrivium (Arithmetic, Geometry, Music, Astronomy); madrasahs, House of Wisdom, translation centers, Ibn Sina, Ibn Khaldun.',
      'Renaissance & Reformation: Humanism, individual potential, Martin Luther’s universal literacy in the vernacular language, and the scientific revolution’s empiricism (Bacon, Descartes).',
      'Industrial Era: John Locke’s Tabula Rasa, Rousseau’s naturalism, Froebel’s Kindergarten, the Prussian age-graded factory schooling model, and Horace Mann’s Common School Movement.',
      'Modern & Digital Era: Universal inclusion, digital learning technologies, global citizenship, and lifelong learning.',
      'Three Core Lessons: Purpose evolved from dogma to self-actualization; access transformed from elite privilege to human right; pedagogy transitioned from rote coercion to student-centered inquiry.',
    ],
    [
      'Using the Socratic method in modern literature or ethics discussions links directly to Classical Athens.',
      'Organizing schools by age cohorts and fixed bell periods is a direct legacy of the 19th-century Prussian industrial schooling model.',
      'Taxpayer-funded free primary education in Pakistan and worldwide traces directly to Horace Mann’s Common School Movement and the Reformation.',
      'Integrating science with character and ethical values builds upon the scholastic traditions of the Islamic Golden Age.',
    ],
    [
      {
        prompt: 'How did ancient Athenian education differ from Spartan training, and which influenced modern liberal education?',
        answer: 'Athens emphasized liberal education — cultivating the whole person (intellect, aesthetic appreciation, physical fitness, and civic virtues) for active democratic participation. Sparta focused narrowly on military discipline and state obedience (Agoge). Athenian ideals laid the groundwork for modern liberal arts and democratic education.',
      },
      {
        prompt: 'Describe the educational significance of the Trivium and Quadrivium in medieval schooling.',
        answer: 'The Trivium (Grammar, Rhetoric, Logic) formed the foundation of communication and reasoning, while the Quadrivium (Arithmetic, Geometry, Music, Astronomy) taught mathematical and cosmic principles. Together they comprised the seven liberal arts that structured higher learning and university faculties.',
      },
      {
        prompt: 'What was the Prussian model of education and what features persist in modern schools?',
        answer: 'The Prussian model introduced state-controlled, compulsory, tax-funded schooling characterized by age-graded classes, standardized curricula, strict timetables, and teacher-led direct instruction. Features persisting today include age cohorts, standardized periods/bells, national syllabi, and uniform graduation metrics.',
      },
      {
        prompt: 'Explain the three core overarching lessons that history teaches modern educators.',
        answer: '1. Evolution of Purpose: Education transitioned from religious preservation and elite governance toward civic empowerment, economic productivity, and holistic personal actualization. 2. Access and Inclusion: Education transformed from an elite patriarchal privilege into a universal human right. 3. Pedagogical Shift: Teaching advanced from punitive rote memorization toward empathetic, student-centered, evidence-based pedagogy.',
      },
    ],
    'notes/foundations-of-education/historical-foundations-of-education.html',
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
