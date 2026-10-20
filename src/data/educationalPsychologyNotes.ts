import type { StudyLesson, StudySubject } from '../types';

/**
 * Source-aligned Educational Psychology notes supplied for the MUQABIL
 * study-notes section. The six lessons retain the source topics,
 * explanations, examples and practice prompts, and render the supplied HTML
 * documents unchanged through htmlNotesPath.
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

export const EDUCATIONAL_PSYCHOLOGY_LESSONS: StudyLesson[] = [
  lesson(
    'edu-psych-basics-learning-theories',
    'Basics of Educational Psychology: Major Learning Theories',
    '12 min read',
    'Educational psychology provides the foundation for understanding how learning occurs and for designing effective instruction. The field is built on five major schools of thought: Behaviorism (Pavlov, Watson, Thorndike, Skinner), Cognitivism (Piaget, Ausubel, Bruner, Chomsky), Constructivism (Piaget, Vygotsky, Bruner), Humanism (Maslow, Rogers), and Social Cognitive Theory (Bandura), which bridges behavioral and cognitive perspectives. Each theory offers a different view of learning, a different role for the learner and teacher, and different classroom applications; no single theory explains every learning situation, so effective teachers integrate principles from several traditions.',
    [
      'Behaviorism: learning is a relatively permanent change in observable behavior caused by environmental stimuli; key principles are stimulus–response associations, classical and operant conditioning, reinforcement, punishment, shaping, and extinction. The teacher is a director and reinforcer using direct instruction, drills, programmed instruction, token systems, and behavior contracts.',
      'Cognitivism: learning is a relatively permanent change in mental associations and cognitive structures; learners encode, store, and retrieve information. Key principles are information processing, schema theory, meaningful learning, advance organizers, metacognition, and Piaget’s stages. The teacher is a guide and organizer.',
      'Constructivism: learners actively construct knowledge through experience, interaction, and reflection. Key principles are active construction, assimilation and accommodation, the Zone of Proximal Development (ZPD), scaffolding, social interaction, and contextual learning. The teacher is a facilitator and scaffolder.',
      'Humanism: learning is a holistic, personal process aimed at self-actualization. Key principles are Maslow’s hierarchy of needs, self-concept, self-direction, unconditional positive regard, empathy, and student-centredness. The teacher is a facilitator and empathizer.',
      'Social Cognitive Theory (Bandura) bridges behaviorism and cognitivism through observational learning and modeling, self-efficacy, triadic reciprocal determinism (personal factors, behavior, environment), self-regulation, and vicarious reinforcement.',
      'Cognitive constructivism (Piaget) focuses on individual meaning-making, while social constructivism (Vygotsky) emphasizes culture, language, collaboration, and guided interaction within the ZPD.',
      'Effective teaching integrates the theories: behavioral reinforcement for routines and foundational skills, cognitive strategies for understanding, constructivist tasks for deep inquiry, humanistic approaches for a supportive climate, and social-cognitive modeling to build confidence.',
    ],
    [
      'A teacher uses a token board and specific praise to encourage on-task behavior — behaviorism.',
      'A teacher begins a lesson with a concept map linking new content to prior knowledge — cognitivism.',
      'Small groups investigate a local water problem and present solutions with teacher scaffolding — constructivism.',
      'A teacher offers project choices and listens to students without judgment — humanism.',
      'A teacher models a think-aloud problem-solving strategy while a successful peer demonstrates the same method — social cognitive theory.',
    ],
    [
      {
        prompt: 'Compare Behaviorism and Cognitivism in terms of their view of learning, key theorists, and classroom applications.',
        answer: 'Behaviorism defines learning as a relatively permanent change in observable behavior produced by environmental stimuli, and is associated with Pavlov, Watson, Thorndike, and Skinner. Classroom applications include direct instruction, repetition and drills, programmed instruction, immediate feedback, token systems, and behavior contracts. Cognitivism defines learning as a change in mental associations and cognitive structures and is associated with Piaget, Ausubel, Bruner, and Chomsky. Classroom applications include advance organizers, concept maps, chunking, metacognitive strategies, structured problem-solving, and connecting new content to prior knowledge.',
      },
      {
        prompt: 'Explain the difference between cognitive constructivism (Piaget) and social constructivism (Vygotsky).',
        answer: 'Cognitive constructivism focuses on the individual learner actively building knowledge by assimilating and accommodating new experiences into existing schemas. Social constructivism holds that knowledge is constructed through social and cultural interaction, language, collaboration, and guided support from a More Knowledgeable Other within the Zone of Proximal Development. Piaget emphasizes individual meaning-making; Vygotsky emphasizes the social context and scaffolding.',
      },
      {
        prompt: 'Describe the key principles of Humanism and explain how a teacher can apply them in the classroom.',
        answer: 'Humanism views learning as a holistic process involving the whole person — intellectual, emotional, social, and personal growth — aimed at self-actualization. Key principles are Maslow’s hierarchy of needs, self-concept, self-direction, unconditional positive regard, empathy, and student-centredness. A teacher applies them by meeting basic needs, building trust and empathy, offering meaningful choice and autonomy, using cooperative learning, focusing on personal growth rather than only academic outcomes, and creating a safe, supportive classroom climate.',
      },
      {
        prompt: 'Explain Social Cognitive Theory and its key principles. How does it bridge behaviorism and cognitivism?',
        answer: 'Bandura’s Social Cognitive Theory holds that learning occurs through observation, imitation, and modeling in a social context, with a reciprocal interaction among personal factors, behavior, and environment (triadic reciprocal determinism). Its key principles are observational learning, self-efficacy, reciprocal determinism, self-regulation, and vicarious reinforcement. It bridges behaviorism and cognitivism because it accepts external reinforcement and environmental influences while also recognizing internal cognitive processes such as beliefs, expectations, and self-efficacy.',
      },
    ],
    'notes/educational-psychology/basics-of-educational-psychology-major-learning-theories.html',
  ),
  lesson(
    'edu-psych-vs-educational-psychology',
    'Differences Between Psychology and Educational Psychology',
    '9 min read',
    'Psychology is the scientific study of the mind, behavior, and mental processes across all settings and populations. Educational psychology is a specialized branch and applied field of psychology that studies how people learn and teach in educational settings, translating psychological principles into improved learning and instruction. They share a scientific base and overlapping topics such as learning, motivation, development, cognition, and individual differences; psychology supplies broad theories and methods, while educational psychology adapts them to classrooms, learners, teachers, assessment, and curriculum.',
    [
      'Psychology is broad and foundational: it studies the entire range of human (and sometimes animal) behavior and mental processes, including perception, cognition, emotion, motivation, personality, and social interaction.',
      'Educational psychology is a specialized, applied subfield: it concentrates on learning, teaching, motivation, assessment, learner development, classroom management, and instructional design in educational contexts.',
      'Main goal: psychology seeks to describe, explain, predict, and influence behavior generally; educational psychology applies psychological knowledge to enhance learning, teaching, and educational outcomes.',
      'Research settings differ: psychology uses experimental, correlational, observational, clinical, and neuropsychological methods; educational psychology uses classroom experiments, longitudinal studies, action research, psychometrics, and program evaluation.',
      'Psychology provides the theories and research base; educational psychology translates them into classroom practice through learning theories, instructional design, assessment, motivation, and special education.',
      'Educational psychology is not separate from psychology — it is a branch of psychology and also an interdisciplinary field linked to education, drawing on cognitive, developmental, social, and behavioral psychology.',
    ],
    [
      'A clinical psychologist treats an anxiety disorder, while an educational psychologist designs classroom supports that reduce test anxiety and build self-efficacy.',
      'A cognitive psychologist studies memory in a laboratory, while an educational psychologist applies spaced practice and retrieval practice in a lesson plan.',
      'A developmental psychologist maps stages of reasoning, while an educational psychologist uses those stages to select concrete materials for Grade 3 mathematics.',
      'A social psychologist examines group dynamics, while an educational psychologist structures cooperative learning roles to improve participation.',
    ],
    [
      {
        prompt: 'Define psychology and educational psychology, and explain the relationship between them.',
        answer: 'Psychology is the scientific study of the mind, behavior, and mental processes, covering perception, cognition, emotion, motivation, personality, and social interaction across all settings. Educational psychology is a branch and applied field of psychology that studies how people learn and teach in educational settings and applies psychological principles to improve learning and instruction. Educational psychology depends on general psychology for theories and methods but adapts them to classrooms, learners, teachers, assessment, and curriculum.',
      },
      {
        prompt: 'Compare psychology and educational psychology in terms of scope, primary focus, and main goal.',
        answer: 'Scope: psychology is broad, covering the full range of human and animal behavior and mental processes; educational psychology is narrower, focusing on learning and teaching in educational contexts. Primary focus: psychology seeks general principles of behavior and mind; educational psychology focuses on instructional strategies, classroom environment, assessment, and learner differences. Main goal: psychology describes, explains, predicts, and influences behavior; educational psychology applies that knowledge to improve learning, teaching, and educational outcomes.',
      },
      {
        prompt: 'List FIVE similarities between psychology and educational psychology.',
        answer: 'Five similarities are: (1) both use scientific methods and psychological theory; (2) both study overlapping topics such as learning, motivation, development, cognition, and individual differences; (3) educational psychology depends on cognitive, developmental, social, and behavioral psychology; (4) general psychology informs education by supplying theories that educational psychology translates into practice; and (5) they are not mutually exclusive — educational psychology is a subfield of psychology and an interdisciplinary field linked to education.',
      },
      {
        prompt: 'Identify and correct THREE common misconceptions about psychology and educational psychology.',
        answer: 'Misconception 1: “Educational psychology is completely different from psychology.” Correction: it is a branch of psychology applied to education. Misconception 2: “Educational psychology only studies students.” Correction: it also studies teachers, classrooms, assessment, curriculum, and learning environments. Misconception 3: “Psychology is only clinical.” Correction: clinical psychology is only one subfield; psychology also includes cognitive, developmental, social, educational, and other areas. A further misconception is that educational psychology is only theory — it is highly applied and informs real instructional practice.',
      },
    ],
    'notes/educational-psychology/differences-between-psychology-and-educational-psychology.html',
  ),
  lesson(
    'edu-psych-learning-theories',
    'Learning Theories: Behaviorism, Cognitivism, Constructivism & Humanism',
    '11 min read',
    'Four major lenses explain how learning happens: Behaviorism sees learning as a change in observable behavior produced by environmental stimuli and reinforcement; Cognitivism sees learning as a change in mental processes and associations; Constructivism sees learners actively building knowledge by connecting new information to prior experience and through social interaction; and Humanism sees learning as a holistic, personal process aimed at self-actualization. Each theory defines the learner’s and teacher’s roles differently and has distinct strengths and limitations. No single theory is sufficient — good teaching draws on multiple perspectives depending on the learner, content, and context.',
    [
      'Behaviorism (Pavlov, Watson, Thorndike, Skinner): learner is a passive responder, teacher is a director/controller/reinforcer; strategies include direct instruction, drills, repetition, programmed instruction, behavior contracts, and token systems. Strength: clear, measurable, effective for basic skills and behavior management. Limitation: ignores mental processes and deeper understanding.',
      'Cognitivism (Piaget, Ausubel, Bruner, Chomsky): learner is an active information processor, teacher is a guide/organizer/explainer; strategies include advance organizers, concept maps, chunking, metacognitive strategies, and structured problem-solving. Strength: explains memory, understanding, and problem-solving. Limitation: can underestimate social and emotional factors.',
      'Constructivism (Piaget, Vygotsky, Bruner): learner is an active constructor, teacher is a facilitator/scaffolder/co-learner; strategies include inquiry-based and problem-based learning, cooperative learning, discovery, hands-on activities, projects, and reflection. Strength: promotes deep understanding, critical thinking, autonomy, and collaboration. Limitation: time-consuming and can disadvantage learners with limited prior knowledge.',
      'Humanism (Maslow, Rogers): learner is self-directed and responsible for growth, teacher is a facilitator/empathizer/supporter; strategies include student-centred teaching, choice and autonomy, cooperative learning, reflective activities, and a supportive climate. Strength: supports motivation, well-being, self-esteem, and relationships. Limitation: less structured, harder to measure, and challenging in large exam-focused classes.',
      'The theories relate progressively: cognitivism emerged as a reaction to behaviorism’s neglect of mental processes, constructivism extends cognitivism through active meaning-making and social context, and humanism overlaps constructivism while emphasizing emotional growth and self-actualization.',
      'The theories are complementary: effective teaching integrates reinforcement for routines, cognitive strategies for understanding, constructivist tasks for deep learning, and humanistic approaches for a supportive classroom culture.',
    ],
    [
      'Behaviorism in class: praise and rewards for desired behavior, clear rules, immediate feedback, step-by-step tasks, and behavior management systems.',
      'Cognitivism in class: connecting new content to prior knowledge, teaching study strategies, reducing cognitive overload, and using outlines and graphic organizers.',
      'Constructivism in class: group discussions, real-world problems, collaborative projects, teacher scaffolding, and reflection activities.',
      'Humanism in class: meeting basic needs, building trust and empathy, offering choices, focusing on personal growth, and creating safe learning environments.',
    ],
    [
      {
        prompt: 'Compare Behaviorism and Cognitivism in terms of their view of learning, key theorists, and the role of the learner.',
        answer: 'Behaviorism treats learning as a change in observable behavior produced by environmental stimuli, with Pavlov, Watson, Thorndike, and Skinner as key theorists; the learner is a passive responder to reinforcement and punishment. Cognitivism treats learning as a change in mental processes and associations — how information is received, organized, stored, and retrieved — with Piaget, Ausubel, Bruner, and Chomsky as key theorists; the learner is an active information processor. Behaviorism emphasizes external conditions and measurable behavior, while cognitivism emphasizes internal understanding, schema, and meaningful learning.',
      },
      {
        prompt: 'Explain the difference between cognitive constructivism (Piaget) and social constructivism (Vygotsky).',
        answer: 'Cognitive constructivism focuses on how an individual learner constructs knowledge by assimilating and accommodating new experiences into existing schemas. Social constructivism holds that knowledge is constructed through social interaction, language, culture, and guided support from a More Knowledgeable Other within the Zone of Proximal Development. Piaget emphasizes individual meaning-making; Vygotsky emphasizes social and cultural dimensions and scaffolding.',
      },
      {
        prompt: 'Describe the key principles and classroom applications of Humanism.',
        answer: 'Humanism views learning as a holistic process involving the whole person and aimed at self-actualization. Key principles are Maslow’s hierarchy of needs, self-concept, self-direction, unconditional positive regard, empathy, and student-centred learning. Classroom applications include meeting students’ basic needs, building trust and empathy, offering choice and autonomy, using cooperative learning and reflection, focusing on personal growth rather than only academic outcomes, and creating a safe and supportive environment.',
      },
      {
        prompt: 'How do the four learning theories relate to each other? Why is no single theory sufficient?',
        answer: 'Cognitivism emerged as a reaction to behaviorism’s neglect of mental processes; constructivism extends cognitivism by emphasizing active meaning-making and social context; and humanism overlaps constructivism while emphasizing emotional growth and self-actualization. No single theory explains all learning: behaviorism is strong for routines and basic skills but ignores thinking; cognitivism explains understanding but can underplay social and emotional factors; constructivism builds deep understanding but is time-consuming; humanism supports motivation and well-being but is less structured. Effective teaching combines them according to the learner, content, and context.',
      },
    ],
    'notes/educational-psychology/learning-theories-behaviorism-cognitivism-constructivism-humanism.html',
  ),
  lesson(
    'edu-psych-individual-differences',
    'Individual Differences in Educational Psychology',
    '11 min read',
    'Individual differences are the variations among learners in abilities, prior knowledge, interests, personality, motivation, background, culture, language, learning pace, and styles of thinking. Educational psychology studies how these variations affect learning and how instruction can be adapted to meet diverse learner needs. Key dimensions include cognitive ability, prior knowledge, personality, motivation, self-efficacy, gender, socioeconomic status, culture and language, exceptionalities, interest and aptitude, and learning pace. Effective teaching responds through differentiated instruction, Universal Design for Learning (UDL), formative assessment, flexible grouping, scaffolding, and supportive relationships — while maintaining high expectations and avoiding rigid labels.',
    [
      'Major dimensions of individual differences: cognitive ability/intelligence, prior knowledge, cognitive and learning styles, personality (Big Five), motivation, self-efficacy, gender, socioeconomic status (SES), culture and language, exceptionalities, interest and aptitude, and learning pace.',
      'Intelligence models: Spearman’s general intelligence (g); Gardner’s multiple intelligences (linguistic, logical-mathematical, spatial, musical, bodily-kinesthetic, interpersonal, intrapersonal, naturalistic); Sternberg’s triarchic theory (analytical, creative, practical); and Cattell–Horn–Cattell fluid and crystallized intelligence. Intelligence is influenced by heredity and environment and is not fixed.',
      'Learning-style caution: evidence that matching visual/auditory/kinesthetic instruction to a learner’s supposed style improves learning is weak. Best practice is to use multiple representations and varied modalities for all learners and avoid rigid labeling; deep versus surface processing is a more useful distinction.',
      'Differentiated instruction strategies: pre-assessment, flexible grouping, tiered tasks, choice in topic/product/process, multiple representations, scaffolding, formative assessment, Universal Design for Learning, a positive climate, and avoiding labels.',
      'Aptitude–Treatment Interaction (ATI) holds that instruction is most effective when it matches learner characteristics such as aptitude, prior knowledge, and motivation — there is no single best method for all learners.',
      'Differences are not deficits: differentiation maintains high expectations while providing appropriate support, and learners’ differences are dynamic and context-dependent.',
    ],
    [
      'A teacher pre-assesses prior knowledge before a fractions unit and groups students flexibly for targeted support and extension.',
      'Tiered tasks on the same topic let one group use concrete manipulatives while another applies the concept to multi-step word problems.',
      'A teacher presents a science concept through text, a diagram, a demonstration, and discussion so all learners access multiple representations.',
      'A student with ADHD receives chunked instructions, movement breaks, and a structured checklist as an accommodation rather than a lowered standard.',
    ],
    [
      {
        prompt: 'Define individual differences and explain why they matter in education.',
        answer: 'Individual differences are the variations among learners in abilities, prior knowledge, interests, personality, motivation, background, culture, language, learning pace, and ways of thinking. They matter because learners do not all learn in the same way or at the same rate; a one-size-fits-all approach leaves some students behind or unchallenged. Recognizing differences allows teachers to differentiate instruction, provide appropriate support and challenge, promote equity and inclusion, and help every learner reach high standards.',
      },
      {
        prompt: 'Describe any FIVE major dimensions of individual differences and give one educational implication for each.',
        answer: 'Examples: (1) Cognitive ability — use varied tasks and avoid over-reliance on one IQ measure; (2) Prior knowledge — pre-assess and connect new content to existing schemas; (3) Motivation — build relevance, choice, mastery experiences, and positive feedback; (4) Socioeconomic status — provide resources, structure, and supportive relationships; (5) Culture and language — use culturally responsive teaching and language supports; (6) Exceptionalities — differentiate, accommodate, and provide individualized support. Personality, self-efficacy, gender, interest, and learning pace are also major dimensions.',
      },
      {
        prompt: 'Explain the caution around learning styles and describe the best practice recommended by educational psychology.',
        answer: 'The claim that matching instruction to a learner’s visual, auditory, or kinesthetic “style” improves learning has weak scientific evidence, and rigid style labels can limit learners. Best practice is to avoid labeling and instead use multiple representations and varied modalities for all learners, teach deep processing strategies rather than surface memorization, and differentiate based on readiness, prior knowledge, interests, and specific learning needs.',
      },
      {
        prompt: 'List and explain any FIVE strategies for differentiated instruction.',
        answer: 'Five strategies are: (1) Pre-assessment — determine readiness, interests, and prior knowledge before teaching; (2) Flexible grouping — use whole-class, small-group, pair, and individual work as needed; (3) Tiered tasks — offer tasks at different levels of complexity toward the same learning goal; (4) Choice — allow choice in topic, product, or process to increase motivation; and (5) Scaffolding — provide temporary supports and gradually remove them. Multiple representations, formative assessment, UDL, and a positive climate are further differentiation strategies.',
      },
    ],
    'notes/educational-psychology/individual-differences-in-educational-psychology.html',
  ),
  lesson(
    'edu-psych-basic-needs-motivation',
    'Basic Needs & Motivation',
    '11 min read',
    'Motivation is not simply a trait learners have or lack; it is strongly influenced by whether their basic needs are satisfied in the learning environment. When physiological, psychological, and social needs are met, learners are more engaged, persistent, and able to learn; when they are unmet, motivation and learning suffer. Maslow’s hierarchy arranges needs from physiological and safety needs through belonging and esteem to self-actualization, while Self-Determination Theory identifies autonomy, competence, and relatedness as essential psychological needs for intrinsic motivation. Glasser’s Choice Theory adds survival, love/belonging, power, freedom, and fun, and other frameworks such as drive reduction, achievement motivation, expectancy-value, and flow further explain motivated behavior.',
    [
      'Maslow’s five levels: physiological (food, water, sleep, warmth), safety (physical and emotional security, order), belonging and love (acceptance, friendship, connection), esteem (competence, recognition, respect), and self-actualization (fulfilling potential, growth, creativity). Lower-level needs generally must be reasonably satisfied before higher-level needs strongly motivate learning.',
      'Caution: the strict hierarchy is not fully supported by research; needs can operate simultaneously and vary by culture and individual.',
      'Self-Determination Theory (Deci & Ryan) identifies three basic psychological needs: autonomy (feeling volitional and self-directed), competence (feeling effective and capable), and relatedness (feeling connected, accepted, and cared for). Meeting them supports intrinsic motivation, engagement, persistence, and well-being; thwarting them shifts motivation toward extrinsic control or amotivation.',
      'Glasser’s Choice Theory identifies five basic needs — survival, love and belonging, power, freedom, and fun — and holds that behavior is driven by attempts to meet them. Classrooms should therefore ensure safety and comfort, inclusion, voice and mastery, choice, and engaging learning.',
      'Other frameworks: Drive Reduction Theory (Hull) — biological needs create drives to restore homeostasis; Achievement Motivation — need for achievement, affiliation, and power; Expectancy-Value Theory — motivation depends on expectation of success and task value; Flow Theory — optimal motivation occurs when challenge matches skill.',
      'When needs are met learners are alert, secure, engaged, confident, and self-regulating; when unmet they show fatigue, anxiety, isolation, avoidance, helplessness, compliance, disengagement, or rebellion.',
      'Practical implications: ensure physical and emotional safety, build a caring and inclusive community, offer choice and optimal challenge with scaffolding, use cooperative learning, connect content to interests and real life, give specific growth-oriented feedback, use autonomy-supportive language, and address needs through family and community partnerships.',
    ],
    [
      'A teacher greets students at the door, uses clear routines, and enforces anti-bullying norms to meet safety and belonging needs.',
      'Students choose between a poster, a presentation, or an essay to demonstrate the same learning objective — autonomy support.',
      'A teacher assigns a task slightly beyond current ability and provides hints and models that are gradually removed — competence through optimal challenge and scaffolding.',
      'A teacher replaces “You must finish this now” with “You might consider starting with the diagram” — autonomy-supportive language.',
      'A school provides a breakfast programme and a quiet homework space so physiological and safety needs do not block learning.',
    ],
    [
      {
        prompt: 'Explain Maslow’s hierarchy of needs and its educational implications. What is a key caution about this theory?',
        answer: 'Maslow’s hierarchy has five levels: physiological needs (food, water, sleep, warmth), safety (physical and emotional security), belonging and love (acceptance, connection), esteem (competence, recognition, respect), and self-actualization (fulfilling potential). Educationally, teachers should ensure students are fed, rested, and physically and emotionally safe, build a caring and inclusive community, provide recognition and mastery experiences, and offer opportunities for growth and creativity. The key caution is that the strict sequence is not fully supported by research: needs can operate simultaneously and vary by culture and individual.',
      },
      {
        prompt: 'Describe Self-Determination Theory (SDT) and explain each of its three basic psychological needs with an educational application.',
        answer: 'Self-Determination Theory (Deci & Ryan) holds that intrinsic motivation and well-being depend on three basic psychological needs. Autonomy is feeling volitional and self-directed; teachers can offer meaningful choice, explain relevance, and minimize controlling language. Competence is feeling effective and capable; teachers can provide optimal challenge, scaffolding, mastery experiences, and informative feedback. Relatedness is feeling connected, accepted, and cared for; teachers can build warm teacher–student relationships, use cooperative learning, and create an inclusive climate.',
      },
      {
        prompt: 'List and explain Glasser’s five basic needs and their educational implications.',
        answer: 'Glasser’s Choice Theory identifies survival (safety and basic comfort — ensure a safe, comfortable classroom), love and belonging (inclusion and caring relationships — build community and cooperative learning), power (voice, responsibility, and mastery — give students responsibility and opportunities to succeed), freedom (choice and self-direction — offer choices in tasks and processes), and fun (engagement, relevance, and enjoyment — make learning active and interesting). Behavior is driven by attempts to meet these needs, so classrooms should be designed to meet all five.',
      },
      {
        prompt: 'How do unmet basic needs affect learning and motivation? Give examples for at least three need areas.',
        answer: 'Unmet needs consume attention and energy and undermine engagement and persistence. Physiological needs: hunger, fatigue, or poor sleep reduce attention, memory, and readiness to learn. Safety needs: fear, bullying, or unpredictable environments produce anxiety and hypervigilance that block risk-taking and learning. Belonging needs: isolation, rejection, or exclusion lead to disengagement and withdrawal. Esteem/competence needs: repeated failure or public comparison produces avoidance, helplessness, and low self-efficacy. Autonomy needs: excessive control leads to compliance, disengagement, or rebellion.',
      },
    ],
    'notes/educational-psychology/basic-needs-and-motivation.html',
  ),
  lesson(
    'edu-psych-home-school-community',
    'Learning & Motivation in the Context of Home, School, and Community',
    '12 min read',
    'Learning and motivation do not occur in isolation; they are shaped by the multiple environments in which learners live. Home, school, and community are the three primary contexts that interact to influence engagement, persistence, and achievement. Bronfenbrenner’s ecological systems theory explains nested influences from the microsystem through the chronosystem, with the mesosystem — links between home, school, and community — especially powerful for learning. Epstein’s model of overlapping spheres identifies six types of family and community involvement: parenting, communicating, volunteering, learning at home, decision-making, and collaborating with the community. When contexts are aligned, motivation is amplified; when they conflict, learners receive mixed messages and support becomes fragmented.',
    [
      'Bronfenbrenner’s ecological systems: microsystem (immediate settings such as home, classroom, peer group, neighbourhood), mesosystem (interactions between microsystems, e.g. parent–teacher communication), exosystem (indirect settings such as a parent’s workplace or school board policy), macrosystem (cultural norms and national education policy), and chronosystem (changes over time such as family transitions and economic shifts).',
      'Epstein’s overlapping spheres of influence: family, school, and community overlap, with six types of involvement — parenting, communicating, volunteering, learning at home, decision-making, and collaborating with the community.',
      'Home context factors: parental involvement, high but realistic expectations, home learning environment, authoritative parenting (warm plus structured), socioeconomic status, language and culture, early literacy and numeracy, emotional climate, and an appropriate homework environment that supports autonomy.',
      'School context factors: teacher quality and expectations, classroom climate, teaching strategies, peer influence, assessment practices, school culture, autonomy support, teacher–student relationships, and curriculum relevance.',
      'Community context factors: community resources (libraries, museums, after-school programmes), role models and mentors, social capital, cultural values, neighbourhood safety, extracurricular activities, service learning, economic opportunities, and community partnerships.',
      'Motivation theories in context: Self-Determination Theory (autonomy, competence, relatedness), Expectancy-Value Theory (expectation of success and task value), Achievement Goal Theory (mastery versus performance goals), Social Cognitive Theory (self-efficacy and modeling), and Attribution Theory (how learners explain success and failure).',
      'Alignment across home, school, and community strengthens motivation, belonging, and achievement; misalignment produces confusion, lower engagement, and fragmented support. Partnerships among families, schools, communities, and policy makers are therefore essential.',
    ],
    [
      'A parent attends a parent–teacher meeting and agrees with the teacher on a consistent homework routine — a strong home–school mesosystem link.',
      'A teacher connects a mathematics unit to a local market pricing project, and community shopkeepers provide real data — school–community alignment.',
      'A community library and after-school mentoring programme give students resources and role models that build competence and future aspirations.',
      'A school’s parent engagement programme explains high expectations and offers workshops on reading with children at home — Epstein’s parenting and learning-at-home involvement types.',
      'When a family’s expectations emphasize effort and mastery while the classroom also uses mastery goals, students receive a consistent motivational message.',
    ],
    [
      {
        prompt: 'Explain Bronfenbrenner’s ecological systems theory and identify the five systems with an example of each.',
        answer: 'Bronfenbrenner holds that development and learning are influenced by nested, interacting systems. Microsystem: immediate environments the learner directly experiences, such as home, classroom, and peer group. Mesosystem: interactions between microsystems, such as parent–teacher communication and home–school partnership. Exosystem: indirect environments that affect the learner, such as a parent’s workplace, school board policy, or community services. Macrosystem: broader cultural and societal values, such as cultural norms about education and national education policy. Chronosystem: changes over time, such as family transitions, economic shifts, and developmental stages.',
      },
      {
        prompt: 'Describe the key factors in the home context that influence learning and motivation.',
        answer: 'Key home factors are parental involvement (homework support, reading together, attending school events); high but realistic parental expectations; a home learning environment with books, materials, a quiet study space, routines, and conversations about learning; an authoritative parenting style that combines warmth and structure; socioeconomic status, which affects resources and stress but can be buffered by involvement; language and culture; early literacy and numeracy experiences; a safe, supportive emotional climate; and a homework environment that supports autonomy rather than over-control.',
      },
      {
        prompt: 'Explain Self-Determination Theory and how it applies across home, school, and community contexts.',
        answer: 'Self-Determination Theory states that motivation thrives when three basic psychological needs are met: autonomy, competence, and relatedness. At home, autonomy can be supported through choices in activities and routines, competence through encouragement and early success, and relatedness through family warmth and belonging. At school, autonomy is supported by choice in tasks and self-direction, competence by mastery experiences and feedback, and relatedness by positive teacher–peer relationships. In the community, autonomy appears in independent participation and volunteering, competence in skill-building programmes, sports, and arts, and relatedness in mentors and community groups.',
      },
      {
        prompt: 'Why is alignment across home, school, and community important for motivation? What happens when contexts are misaligned?',
        answer: 'Alignment creates consistent expectations, reinforcement, and support, which amplifies motivation, belonging, self-efficacy, and achievement. When home and school share expectations and communicate regularly, students receive coherent messages about effort and learning; when school connects to community resources and real-world applications, learning becomes relevant and aspirational. Misalignment — conflicting expectations, poor communication, or a school disconnected from students’ lives — produces confusion, lower engagement, mixed messages, and fragmented support, and can undermine trust and motivation, especially for students facing socioeconomic or cultural barriers.',
      },
    ],
    'notes/educational-psychology/learning-and-motivation-in-home-school-and-community.html',
  ),
];

export const EDUCATIONAL_PSYCHOLOGY_SUBJECT: StudySubject = {
  id: 'educational-psychology-notes',
  title: 'Educational Psychology',
  chapters: [
    {
      id: 'educational-psychology-chapter',
      title: 'Educational Psychology',
      topics: EDUCATIONAL_PSYCHOLOGY_LESSONS.map((item) => ({
        id: item.id,
        title: item.title,
        lessons: [item],
      })),
    },
  ],
};
