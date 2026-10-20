import type { StudyLesson, StudySubject } from '../types';

/**
 * Source-aligned Child Development & Educational Psychology notes supplied
 * for the MUQABIL study-notes section. The six lessons retain the source
 * topics, explanations, examples, key points, and practice questions, and
 * render the supplied HTML documents unchanged through htmlNotesPath.
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

export const CHILD_DEVELOPMENT_LESSONS: StudyLesson[] = [
  lesson(
    'child-dev-conceptions-implications',
    'Conceptions of Child Development & Their Implications for Teaching and Learning',
    '10 min read',
    'Child development is the continuous process of physical, cognitive, emotional, social, and language changes that occur from birth through childhood and adolescence, shaped by both heredity (nature) and environment (nurture). Seven major conceptions frame how educators understand development: Continuous Process, Sequential Process, Individual Differences, Holistic Process, Nature and Nurture, Active Learning, and Developmental Readiness. Key psychologists — Jean Piaget, Lev Vygotsky, Erik Erikson, Lawrence Kohlberg, John Bowlby, B. F. Skinner, and Albert Bandura — explain complementary dimensions of growth, directly guiding classroom readiness, differentiation, active inquiry, social interaction, emotional safety, continuous assessment, and inclusive learning environments.',
    [
      'Seven major conceptions: Continuous Process (gradual over time), Sequential Process (orderly stage progression), Individual Differences (unique developmental pace), Holistic Process (interconnected physical, mental, emotional, and social domains), Nature and Nurture (genetics + environment), Active Learning (exploration, interaction, and experience), and Developmental Readiness (learning skills effectively when ready).',
      'Core psychologists & theories: Jean Piaget (Cognitive Development), Lev Vygotsky (Sociocultural Theory & ZPD), Erik Erikson (Psychosocial Development), Lawrence Kohlberg (Moral Development), John Bowlby (Attachment Theory), B. F. Skinner (Operant Conditioning), and Albert Bandura (Social Learning Theory).',
      'Scaffolding provides temporary support within the Zone of Proximal Development (ZPD) — the gap between independent performance and supported performance — and fades as learner competence grows.',
      'Classroom implications span nine areas: Developmental Readiness, Individual Differences, Active Learning, Social Interaction, Motivation, Emotional Development, Holistic Development, Continuous Assessment, and Rich Learning Environments.',
      'Emotional security normalizes mistakes and reduces fear of failure, enabling learners to explore, participate actively, and persist through challenges.',
      'Understanding child development equips teachers to choose age-appropriate methods, respect learner diversity, identify difficulties early, and build inclusive classrooms.',
    ],
    [
      'Providing extra guided practice for slower learners alongside enrichment tasks for fast finishers honors Individual Differences.',
      'Using hands-on experiments, projects, and problem-solving instead of lecture-only instruction applies the Active Learning conception.',
      'Normalizing mistakes in a warm, respectful classroom supports Emotional Development for anxious learners.',
      'Setting up charts, manipulatives, and learning corners transforms a dull room into an exploratory Learning Environment.',
    ],
    [
      {
        prompt: 'List and explain any five major conceptions of child development.',
        answer: 'Five major conceptions are: (1) Continuous Process — development takes place gradually over time; (2) Sequential Process — children pass through developmental stages in an orderly sequence; (3) Individual Differences — every child develops at a different rate; (4) Holistic Process — physical, mental, emotional, and social development are interconnected; and (5) Nature and Nurture — development is shaped by both genetic factors and environmental experiences (Active Learning and Developmental Readiness are also core conceptions).',
      },
      {
        prompt: 'Explain the Zone of Proximal Development (ZPD) and scaffolding, and their implications for teaching.',
        answer: "The Zone of Proximal Development (ZPD), from Vygotsky's sociocultural theory, is the gap between what a learner can do independently and what they can do with guidance. Scaffolding is the temporary support provided within the ZPD — such as hints, modeling, or prompts — that is gradually removed as competence improves. For teaching, this implies using guided practice, peer learning, group work, and gradually releasing responsibility to students.",
      },
      {
        prompt: 'Describe three implications of child development for teaching and learning, explaining what each means for the teacher.',
        answer: 'Three key implications: (1) Developmental Readiness — teach according to students’ age and developmental level rather than forcing premature skills; (2) Individual Differences — adapt teaching to varied abilities and learning speeds using differentiated instruction; (3) Active Learning — use activities, experiments, projects, and problem-solving so students learn by doing rather than passively listening.',
      },
      {
        prompt: 'Match each theorist to their contribution: Piaget, Vygotsky, Erikson, Kohlberg, Bowlby, Skinner, Bandura.',
        answer: 'Jean Piaget — Cognitive Development Theory; Lev Vygotsky — Sociocultural Theory and Zone of Proximal Development (ZPD); Erik Erikson — Psychosocial Development Theory; Lawrence Kohlberg — Moral Development Theory; John Bowlby — Attachment Theory; B. F. Skinner — Operant Conditioning; Albert Bandura — Social Learning Theory.',
      },
    ],
    'notes/child-development/conceptions-of-child-development-and-their-implications-for-teaching-and-learning.html',
  ),
  lesson(
    'child-dev-major-theories',
    'Major Theories & Domains of Child Development',
    '10 min read',
    'Child development encompasses five interrelated domains: physical, cognitive, social-emotional, language, and moral. Classical and modern psychological theories explain how children grow and learn: Jean Piaget articulated four stages of cognitive constructivism driven by schema formation, assimilation, accommodation, and equilibration; Lev Vygotsky presented the socio-cultural theory highlighting the Zone of Proximal Development (ZPD), the More Knowledgeable Other (MKO), and instructional scaffolding; Erik Erikson formulated eight stages of psychosocial crises from infancy through adulthood; Lawrence Kohlberg detailed three levels of moral reasoning; and Urie Bronfenbrenner conceptualized the bioecological systems theory (microsystem, mesosystem, exosystem, macrosystem, and chronosystem). Effective teaching aligns instructional strategy with developmental readiness.',
    [
      'Five developmental domains: Physical (fine & gross motor), Cognitive (reasoning & problem solving), Social-Emotional (self-regulation & relationships), Language (receptive & expressive), and Moral (ethical reasoning).',
      'Piaget’s Cognitive Theory: Sensorimotor (0-2y, object permanence), Preoperational (2-7y, egocentrism & symbolic thought), Concrete Operational (7-11y, conservation & reversibility), Formal Operational (11y+, hypothetical-deductive reasoning).',
      'Vygotsky’s Socio-Cultural Theory: Knowledge is co-constructed through social interaction; Zone of Proximal Development (ZPD) represents the gap between unassisted performance and potential achieved with scaffolding from an MKO.',
      'Erikson’s Psychosocial Stages: Trust vs. Mistrust (infancy), Autonomy vs. Shame (toddlerhood), Initiative vs. Guilt (early childhood), Industry vs. Inferiority (school age 6-12), Identity vs. Role Confusion (adolescence).',
      'Kohlberg’s Moral Development: Pre-conventional (obedience & self-interest), Conventional (conformity & law-and-order), Post-conventional (social contract & universal ethical principles).',
      'Bronfenbrenner’s Bioecological Systems: Direct environments (microsystem), interactions between microsystems (mesosystem), indirect community settings (exosystem), overarching cultural values/laws (macrosystem), and historical time transitions (chronosystem).',
    ],
    [
      'Using concrete counters and fraction bars for 8-year-olds aligns with Piaget’s Concrete Operational stage.',
      'A teacher providing sentence starters and gradual release of responsibility models Vygotskian scaffolding within the student’s ZPD.',
      'Encouraging elementary students to complete projects and praise work ethic supports Erikson’s stage of Industry vs. Inferiority.',
      'Facilitating classroom discussions around moral dilemmas helps students transition from obedience-driven reasoning to conventional fairness.',
    ],
    [
      {
        prompt: 'Explain Piaget’s concepts of assimilation, accommodation, and equilibration with a classroom example.',
        answer: 'Assimilation occurs when a child incorporates new information into existing cognitive schemas (e.g., calling a zebra a "horse"). Accommodation happens when existing schemas are altered or new ones created because new information conflicts with old schemas (recognizing zebras have stripes and live in the wild). Equilibration is the self-regulatory cognitive drive to resolve disequilibrium and restore mental balance between existing schemas and new environmental experiences.',
      },
      {
        prompt: 'What is Vygotsky’s Zone of Proximal Development (ZPD) and how does scaffolding function within it?',
        answer: 'The ZPD is the distance between what a learner can accomplish independently and what they can achieve with guidance from a More Knowledgeable Other (teacher, peer). Scaffolding provides temporary structural assistance (cues, modeling, chunking) that is gradually faded as the learner gains mastery and independence.',
      },
      {
        prompt: 'Describe Erikson’s fourth psychosocial stage (Industry vs. Inferiority) and its relevance for elementary teachers.',
        answer: 'Occurring between ages 6 and 12 (elementary school), children strive to master academic and social skills. If encouraged and praised for effort, they develop a sense of industry (competence). If they experience chronic failure, excessive criticism, or ridicule, they risk developing feelings of inferiority and low self-worth.',
      },
      {
        prompt: 'How does Bronfenbrenner’s ecological systems theory explain student learning beyond individual traits?',
        answer: 'Bronfenbrenner shows that a child develops within nested environmental systems: immediate relationships in family and school (microsystem), home-school linkages (mesosystem), indirect community policies like parental workplace stress (exosystem), and overarching cultural/economic beliefs (macrosystem). Understanding these interactions prevents teachers from blaming the child for systemic barriers.',
      },
    ],
    'notes/child-development/major-theories-and-domains-of-child-development.html',
  ),
  lesson(
    'child-dev-developmental-stages',
    'Characteristics of Various Developmental Stages According to Various Theorists',
    '12 min read',
    'Human growth progresses through distinct developmental stages, each characterized by specific physical, cognitive, socio-emotional, and linguistic milestones. In Infancy and Toddlerhood (0-2 years), infants develop object permanence, gross motor locomotion, and foundational attachment (Bowlby). In Early Childhood (2-6 years), children exhibit rapid language acquisition, symbolic imaginative play, but display cognitive centration, animism, and egocentrism (Piaget’s preoperational stage). In Middle Childhood (6-12 years), children achieve conservation, logical classification, seriation, and an expanding peer orientation while navigating school expectations. In Adolescence (12-18 years), youth develop formal abstract thinking, navigate identity formation versus role confusion (Erikson), and grapple with the imaginary audience and personal fable (Elkind).',
    [
      'Infancy (0-2y): Sensorimotor exploration; development of Object Permanence (around 8-9 months); primary trust versus mistrust; secure attachment foundation (Bowlby & Ainsworth).',
      'Early Childhood (2-6y): Preoperational thought; high creativity and pretend play; marked by Egocentrism (inability to see another’s perspective), Centration (focusing on one perceptual feature), and Animism (attributing life to inanimate objects); Initiative vs. Guilt.',
      'Middle Childhood (6-12y): Concrete Operational thought; mastering Conservation (volume, mass, number invariant under appearance change), Reversibility, Decentration, and Seriation; Industry vs. Inferiority; peer approval becomes vital.',
      'Adolescence (12-18y): Formal Operational abstract and hypothetical-deductive reasoning; Identity vs. Role Confusion; egocentric phenomena including the "Imaginary Audience" (feeling constantly observed) and "Personal Fable" (belief in one’s invulnerability/uniqueness).',
      'Robert Havighurst’s Developmental Tasks: Teachable moments occur when biological readiness, societal expectations, and personal values converge.',
      'Physical growth sequences: Cephalocaudal trend (head-to-tail development) and Proximodistal trend (center-to-periphery development).',
    ],
    [
      'A 4-year-old believing the moon follows them home exemplifies preoperational egocentrism and animism.',
      'A 9-year-old understanding that water poured from a wide bowl into a tall beaker maintains the exact same volume proves conservation and reversibility.',
      'A teenager refusing to attend class due to a minor stain on their collar illustrates Elkind’s "imaginary audience".',
      'Providing hands-on manipulatives in grade 1-5 bridges the gap from perceptual appearance to operational logic.',
    ],
    [
      {
        prompt: 'Contrast the thinking of a child in Piaget’s Preoperational stage with one in the Concrete Operational stage using conservation of liquid.',
        answer: 'A preoperational child (ages 2-7) centers on a single visual dimension (height of liquid) and judges that a taller glass has more water, lacking conservation and reversibility. A concrete operational child (ages 7-11) decenters, considers both height and width, recognizes reversibility (water can be poured back without change), and correctly determines volume remains identical.',
      },
      {
        prompt: 'What are David Elkind’s concepts of the "Imaginary Audience" and "Personal Fable" during adolescent development?',
        answer: 'The Imaginary Audience is the adolescent’s belief that everyone around them is constantly watching, scrutinizing, and evaluating their appearance and actions. The Personal Fable is the inflated belief in their own uniqueness and invulnerability ("nobody understands what I feel" or "bad things happen to others, not me"), which can lead to risk-taking behaviors.',
      },
      {
        prompt: 'Explain the principles of Cephalocaudal and Proximodistal development with physical milestones.',
        answer: 'Cephalocaudal development proceeds from head to foot (infants gain head and neck control before sitting, crawling, or walking). Proximodistal development proceeds from the trunk/center outward to the extremities (control of torso and arms develops before fine motor coordination of fingers and pencils).',
      },
      {
        prompt: 'Why are Havighurst’s "Developmental Tasks" significant for curriculum planners and school teachers?',
        answer: 'Havighurst emphasized that at specific life periods, children must master particular physical, social, and academic tasks (e.g., learning to read, playing group games, developing conscience). If mastered on time, the child experiences success and happiness; failure leads to societal disapproval and difficulty with subsequent developmental stages.',
      },
    ],
    'notes/child-development/characteristics-of-various-developmental-stages-according-to-various-theorists.html',
  ),
  lesson(
    'child-dev-factors-influencing-learning',
    'Factors Influencing the Learning Process of a Child',
    '10 min read',
    'Learning is a complex cognitive, affective, and behavioral transformation influenced by multiple interrelated factors. Psychological factors include intelligence, cognitive readiness, aptitude, curiosity, self-efficacy (Bandura), and motivation (intrinsic interest vs. extrinsic rewards/consequences). Biological and developmental factors include neurological maturation (Arnold Gesell), physical health, adequate sleep, and nutrition. Environmental and institutional factors encompass classroom lighting, ventilation, acoustics, seating ergonomics, and pedagogical resources. Social and family factors include parental socioeconomic status, home language, family stability, and peer dynamics. Abraham Maslow’s hierarchy of needs highlights that basic physiological and psychological safety needs must be fulfilled before a learner can engage higher-order cognitive faculties.',
    [
      'Five core factor clusters: Psychological, Physical/Biological, Family/Social, Teacher/Pedagogical, and Environmental/Institutional.',
      'Motivation dynamics: Intrinsic motivation (learning driven by curiosity and autonomy) yields deeper retention; Extrinsic motivation (rewards, grades, praise) is effective for initiating tasks but must be handled carefully.',
      'Maslow’s Hierarchy of Needs: Physiological needs (food, hydration, rest) and Safety needs (emotional security, free from bullying) are prerequisite foundations for Cognitive and Self-Actualization learning.',
      'Maturation & Readiness: Arnold Gesell demonstrated that internal biological maturation sets the pace for readiness; forcing skills before neurological readiness creates frustration and learned helplessness.',
      'Social Learning & Modeling (Bandura): Children acquire behaviors, attitudes, and emotional responses through observational learning, vicarious reinforcement, and perceived self-efficacy.',
      'Teacher Expectations & Classroom Climate: The Pygmalion Effect (Rosenthal & Jacobson) proves high, supportive teacher expectations correlate with measurable student achievement gains.',
    ],
    [
      'Providing a free morning porridge or fruit program in underprivileged schools directly satisfies physiological needs, immediately improving attention span.',
      'Minimizing glare on chalkboards and maintaining good cross-ventilation reduces student fatigue and headaches.',
      'Replacing fear of punishment with a growth-mindset feedback loop fosters intrinsic motivation and self-efficacy.',
      'Connecting science concepts to local Sindhi farming contexts bridges the home-school cultural gap for rural learners.',
    ],
    [
      {
        prompt: 'Explain how Maslow’s Hierarchy of Needs directly impacts classroom learning and student focus.',
        answer: 'Maslow demonstrated that human needs are hierarchical: lower deficiency needs (food, sleep, physical safety, emotional belonging) take neurobiological precedence over cognitive growth. A child who arrives at school malnourished, sleep-deprived, or fearful of violence cannot allocate working memory to mathematical reasoning until those survival needs are addressed.',
      },
      {
        prompt: 'Differentiate between intrinsic and extrinsic motivation, explaining their respective roles in classroom pedagogy.',
        answer: 'Intrinsic motivation originates internally from curiosity, interest, and personal satisfaction in mastering a challenge; it fosters deep learning and persistence. Extrinsic motivation is driven by external incentives such as grades, prizes, or avoiding punishment; while useful for establishing initial engagement or procedural routines, over-reliance on extrinsic rewards can diminish intrinsic curiosity (overjustification effect).',
      },
      {
        prompt: 'What role does biological maturation play in determining educational readiness according to Arnold Gesell?',
        answer: 'Gesell posited that child development unfolds in predetermined biological sequences governed by internal genetic clocks. Educational readiness requires physiological and neurological maturity. Attempting to teach abstract formal operations or fine pencil grip before corresponding muscles and neural pathways have matured produces stress and avoidance rather than accelerated mastery.',
      },
      {
        prompt: 'How does the Pygmalion Effect (teacher expectations) influence student learning outcomes?',
        answer: 'The Pygmalion effect demonstrates that teacher expectations act as self-fulfilling prophecies: when teachers hold high, encouraging expectations, they provide richer feedback, more wait time, and warmer non-verbal support, which in turn elevates student self-efficacy and objective academic performance.',
      },
    ],
    'notes/child-development/factors-influencing-the-learning-process-of-a-child.html',
  ),
  lesson(
    'child-dev-individual-differences-special-needs',
    'Individual Differences Between Students & Children with Special Needs',
    '10 min read',
    'No two learners are identical. Individual differences represent the natural psychological, cognitive, socio-cultural, and physical variations found in every classroom. In contrast, Special Educational Needs (SEN) designate specific sensory, physical, cognitive, or neurodivergent conditions that require specialized pedagogical accommodations, assistive technologies, or Individualized Education Plans (IEPs). To address diverse learner profiles, effective educators employ Carol Ann Tomlinson’s Differentiated Instruction (DI) across content, process, product, and learning environment, alongside Universal Design for Learning (UDL) principles. Inclusive education shifts the paradigm from requiring the child to fit a rigid curriculum to adapting the instructional environment to ensure equity, dignity, and high expectations for all children.',
    [
      'Individual Differences: Ubiquitous natural variations in cognitive style, pacing, interests, multiple intelligences (Gardner), and cultural backgrounds.',
      'Special Educational Needs (SEN): Categories include Visual Impairment, Hearing Impairment, Physical Disabilities, Intellectual Disabilities, Specific Learning Disabilities (Dyslexia, Dyscalculia, Dysgraphia), Autism Spectrum Disorder (ASD), ADHD, and Gifted/Talented.',
      'Differentiated Instruction (Carol Ann Tomlinson): Tailoring four elements — Content (what is taught), Process (how it is learned), Product (how mastery is demonstrated), and Environment (affective and physical setup).',
      'Universal Design for Learning (UDL): Proactive architectural framework providing multiple means of Representation (perception & comprehension), Action & Expression (physical action & communication), and Engagement (interest & self-regulation).',
      'Individualized Education Plan (IEP): A collaborative legal and pedagogical roadmap establishing present performance levels, measurable annual goals, specialized accommodations, and assessment adaptations.',
      'Equality vs. Equity: Equality distributes identical resources regardless of starting points; Equity provides tailored accommodations and support so every student has an authentic opportunity to achieve success.',
    ],
    [
      'Offering audiobooks, text with pictorial glossaries, and tactile 3D models alongside printed text exemplifies UDL multiple means of representation.',
      'Allowing a student with dysgraphia to deliver an oral presentation or digital concept map differentiates the product dimension.',
      'Providing preferential front-row seating and high-contrast large-print worksheets accommodates a learner with low vision.',
      'Offering open-ended tiered inquiry projects satisfies both gifted learners needing conceptual depth and learners needing structured scaffolding.',
    ],
    [
      {
        prompt: 'Clearly distinguish between "Individual Differences" and "Special Educational Needs (SEN)" in an educational context.',
        answer: 'Individual differences refer to the natural, ubiquitous variations in learning style, personality, cognitive speed, and interests present among all normal students in any classroom. Special Educational Needs (SEN) refer to documented physical, sensory, intellectual, or neurodivergent conditions that create significant barriers to standard curriculum access and require specialized accommodations, assistive devices, or an Individualized Education Plan (IEP).',
      },
      {
        prompt: 'Explain the four classroom elements that teachers can differentiate according to Carol Ann Tomlinson.',
        answer: '1. Content: What students learn and how access to information is structured (e.g., leveled texts, audiobooks). 2. Process: The activities and sense-making pathways through which students assimilate ideas (e.g., graphic organizers, tiered tasks). 3. Product: How students demonstrate mastery (e.g., essays, presentations, dioramas, portfolios). 4. Learning Environment: The physical and emotional classroom climate (e.g., quiet study nooks, collaborative zones, flexible seating).',
      },
      {
        prompt: 'What are the three core principles of Universal Design for Learning (UDL) and how do they benefit inclusive classrooms?',
        answer: 'The three UDL principles are: (1) Multiple means of Representation (giving learners diverse ways of acquiring information); (2) Multiple means of Action & Expression (providing alternatives for demonstrating knowledge); and (3) Multiple means of Engagement (tapping into learner interests, challenging appropriately, and increasing motivation). UDL builds accessibility into the curriculum design from the start, minimizing the need for retrofitted individual adjustments.',
      },
      {
        prompt: 'Explain the difference between Equality and Equity in inclusive education with a practical school example.',
        answer: 'Equality provides identical treatment and resources to everyone (e.g., giving every student the exact same standard-print test paper and 45 minutes). Equity recognizes varying starting points and provides differentiated accommodations to achieve fairness (e.g., providing a large-print exam and 15 extra minutes to a student with low vision, so they have an equal opportunity to demonstrate knowledge). Equality assumes uniform needs; Equity ensures social justice.',
      },
    ],
    'notes/child-development/individual-differences-between-students-and-children-with-special-needs.html',
  ),
  lesson(
    'child-dev-age-appropriate-strategies',
    'Age-Appropriate Teaching Strategies Based on Developmental Theory',
    '10 min read',
    "Age-appropriate teaching strategies are teaching methods selected according to children's age, developmental stage, abilities, interests, and learning needs. Selecting the right strategy at the right developmental moment makes learning meaningful and engaging, whereas mismatched strategies cause frustration or boredom. Across developmental bands, Infancy (0–2 years) calls for play, sensory activities, imitation games, and caregiver interaction; Early Childhood (2–6 years) thrives on play-based learning, storytelling, songs, pictures, and hands-on activities; Middle Childhood (7–11 years) benefits from demonstrations, experiments, manipulatives, practical examples, and group activities; and Adolescence (12–18 years) engages abstract thinking through debates, problem-solving, projects, independent learning, and critical-thinking tasks. Major theorists — Piaget, Vygotsky, Erikson, Skinner, Bandura, and Bruner — anchor six guiding classroom principles: Readiness, Learning by Doing, Individual Differences, Scaffolding, Positive Reinforcement, and Inclusive Teaching.",
    [
      'Age bands & matched strategies: Infancy (0–2y: sensory activities, imitation, caregiver interaction); Early Childhood (2–6y: play-based learning, storytelling, songs, pictures, hands-on tasks); Middle Childhood (7–11y: demonstrations, experiments, manipulatives, group activities); Adolescence (12–18y: debates, problem-solving, projects, independent learning, critical thinking).',
      "Piaget's stage alignment: Sensorimotor (0–2y: sensory exploration & physical interaction), Preoperational (2–7y: pictures, stories, play & concrete examples), Concrete Operational (7–11y: objects, experiments, classification & logical activities), Formal Operational (11+y: abstract concepts, hypotheses, debate & critical thinking).",
      'Theorist-to-strategy translation: Piaget (stage-matched activities), Vygotsky (guided learning, scaffolding & peer collaboration), Erikson (building confidence, independence & achievement), Skinner (reinforcement & constructive feedback), Bandura (modeling positive behavior & skills), and Bruner (discovery learning, questioning & exploration).',
      'Six principles of effective age-appropriate teaching: Readiness, Learning by Doing, Individual Differences, Scaffolding, Positive Reinforcement, and Inclusive Teaching.',
      'Age ranges are approximate benchmarks — effective educators match strategies to developmental stages while adapting to each learner’s prior knowledge, pace, and individual needs.',
    ],
    [
      'Using play-based learning, storytelling, songs, and picture cards with 4-year-olds matches symbolic thinking and rapid language growth.',
      'Using hands-on manipulatives, experiments, and classification tasks with 9-year-olds matches concrete operational logic.',
      'Organizing structured debates, research projects, and independent problem-solving for 15-year-olds supports formal abstract reasoning and identity formation.',
      'Giving temporary prompts during a new skill and gradually fading support models scaffolding in practice.',
    ],
    [
      {
        prompt: 'Explain age-appropriate teaching strategies and describe appropriate strategies for two age groups.',
        answer: "Age-appropriate teaching strategies are teaching methods selected according to children's age, developmental stage, abilities, interests, and learning needs. For Early Childhood (2–6 years), play-based learning, storytelling, songs, pictures, and hands-on activities match symbolic thinking and language growth. For Adolescence (12–18 years), debates, problem-solving, projects, independent learning, and critical-thinking tasks match abstract reasoning and identity development.",
      },
      {
        prompt: "Describe Piaget's four stages of cognitive development and the teaching strategy appropriate for each stage.",
        answer: "Piaget's four stages and matched strategies are: (1) Sensorimotor (0–2 years) — sensory exploration and physical interaction; (2) Preoperational (2–7 years) — pictures, stories, play, and concrete examples; (3) Concrete Operational (7–11 years) — objects, experiments, classification, and logical activities; and (4) Formal Operational (11+ years) — abstract concepts, hypotheses, debate, and critical thinking.",
      },
      {
        prompt: "Explain how three developmental theorists' ideas translate into classroom teaching strategies.",
        answer: "Piaget's cognitive theory translates into matching activities to the learner's stage of thinking (concrete materials before abstraction). Vygotsky's sociocultural theory translates into guided learning, scaffolding, and peer collaboration within the ZPD. Skinner's operant conditioning translates into positive reinforcement and constructive feedback, alongside Bandura's modeling and Bruner's discovery learning.",
      },
      {
        prompt: 'List and explain the six principles of effective age-appropriate teaching.',
        answer: 'The six principles are: (1) Readiness — teach concepts when learners are developmentally prepared; (2) Learning by Doing — provide practical, interactive experiences; (3) Individual Differences — adapt teaching to varied abilities and learning speeds; (4) Scaffolding — provide temporary support and gradually reduce it as competence develops; (5) Positive Reinforcement — recognize effort, progress, and positive behavior; and (6) Inclusive Teaching — provide accessible activities and resources for all learners.',
      },
    ],
    'notes/child-development/age-appropriate-teaching-strategies-based-on-developmental-theory.html',
  ),
];

export const CHILD_DEVELOPMENT_SUBJECT: StudySubject = {
  id: 'child-development-notes',
  title: 'Child Development & Educational Psychology',
  chapters: [
    {
      id: 'child-development-chapter',
      title: 'Child Development & Educational Psychology',
      topics: CHILD_DEVELOPMENT_LESSONS.map((item) => ({
        id: item.id,
        title: item.title,
        lessons: [item],
      })),
    },
  ],
};
