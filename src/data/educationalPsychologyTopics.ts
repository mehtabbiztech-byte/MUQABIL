import type { LicenseTopicNote } from './teachingLicenseNotesData';

/**
 * Educational Psychology reference module for the Teaching License Master Notes
 * Hub. Each topic renders one of the supplied standalone HTML notes through
 * htmlNotesPath, so the original design, search, MCQ, CRQ and ERQ panels are
 * preserved; the structured fields below power the hub's syllabus index,
 * revision aids and generated study aids.
 */
export const EDUCATIONAL_PSYCHOLOGY_TOPICS: LicenseTopicNote[] = [
  {
    id: 'edu-psych-basics-learning-theories',
    topicNumber: '1',
    title: 'Basics of Educational Psychology: Major Learning Theories',
    readTime: '12 min read',
    htmlNotesPath:
      'notes/educational-psychology/basics-of-educational-psychology-major-learning-theories.html',
    summary:
      'Educational psychology studies how learning occurs and how instruction can be designed to support it. Five schools of thought frame the field: Behaviorism (Pavlov, Watson, Thorndike, Skinner), Cognitivism (Piaget, Ausubel, Bruner, Chomsky), Constructivism (Piaget, Vygotsky, Bruner), Humanism (Maslow, Rogers), and Social Cognitive Theory (Bandura), which bridges behavioral and cognitive perspectives. Each theory defines learning, the learner’s role, the teacher’s role, and classroom applications differently, so effective teaching integrates principles from several traditions.',
    highYieldAlert:
      'STS High-Yield: match theorists to theories instantly — Pavlov/Watson/Thorndike/Skinner = Behaviorism; Piaget/Ausubel/Bruner/Chomsky = Cognitivism; Piaget/Vygotsky/Bruner = Constructivism; Maslow/Rogers = Humanism; Bandura = Social Cognitive Theory (observational learning, self-efficacy, reciprocal determinism).',
    concepts: [
      {
        conceptTitle: 'The Five Major Schools of Thought',
        explanation: 'Each school answers “what is learning?” differently and implies a different classroom role for the teacher.',
        keyTerms: [
          {
            term: 'Behaviorism',
            definition:
              'Learning is a relatively permanent change in observable behavior caused by environmental stimuli; stimulus–response associations, classical and operant conditioning, reinforcement, punishment, shaping, and extinction. Teacher = director and reinforcer.',
          },
          {
            term: 'Cognitivism',
            definition:
              'Learning is a change in mental associations and cognitive structures; encoding, storage, retrieval, schema theory, meaningful learning, advance organizers, and metacognition. Teacher = guide and organizer.',
          },
          {
            term: 'Constructivism',
            definition:
              'Learners actively construct knowledge through experience, reflection, and social interaction; assimilation, accommodation, ZPD, scaffolding, and contextual learning. Teacher = facilitator and scaffolder.',
          },
          {
            term: 'Humanism',
            definition:
              'Learning is a holistic, personal process aimed at self-actualization; hierarchy of needs, self-concept, self-direction, unconditional positive regard, and empathy. Teacher = facilitator and empathizer.',
          },
          {
            term: 'Social Cognitive Theory',
            definition:
              'Bandura’s bridge theory: learning occurs through observation, imitation, and modeling, with observational learning, self-efficacy, triadic reciprocal determinism, self-regulation, and vicarious reinforcement.',
          },
        ],
      },
      {
        conceptTitle: 'Learner and Teacher Roles Across Theories',
        explanation: 'Exam items frequently test who is active and who directs in each tradition.',
        bulletPoints: [
          'Behaviorism — learner: passive responder; teacher: director, controller, reinforcer.',
          'Cognitivism — learner: active information processor; teacher: guide, organizer, explainer.',
          'Constructivism — learner: active constructor; teacher: facilitator, scaffolder, co-learner.',
          'Humanism — learner: self-directed and responsible for growth; teacher: facilitator, empathizer, supporter.',
          'Social Cognitive Theory — learner: active observer and agent; teacher: model and efficacy-builder.',
        ],
      },
      {
        conceptTitle: 'Cognitive vs. Social Constructivism',
        explanation: 'A high-frequency contrast item in pedagogy papers.',
        bulletPoints: [
          'Cognitive constructivism (Piaget): the individual learner builds meaning by assimilating and accommodating experiences into schemas.',
          'Social constructivism (Vygotsky): knowledge is constructed through culture, language, collaboration, and guided interaction with a More Knowledgeable Other inside the ZPD.',
          'Both are constructivist in rejecting passive transmission, but they disagree on whether meaning-making is primarily individual or social.',
        ],
      },
    ],
    comparisonTable: {
      title: 'Quick Comparison of the Five Learning Theories',
      headers: ['Theory', 'View of Learning', 'Teacher Role', 'Key Strategy'],
      rows: [
        ['Behaviorism', 'Change in observable behavior', 'Director, reinforcer', 'Direct instruction, drills, token systems'],
        ['Cognitivism', 'Change in mental associations', 'Guide, organizer', 'Advance organizers, concept maps, metacognition'],
        ['Constructivism', 'Active construction of knowledge', 'Facilitator, scaffolder', 'Inquiry, problem-based and cooperative learning'],
        ['Humanism', 'Holistic personal growth', 'Facilitator, empathizer', 'Student-centred choice, empathy, safe climate'],
        ['Social Cognitive', 'Learning through observation and interaction', 'Model, efficacy-builder', 'Modeling, think-alouds, self-regulation'],
      ],
    },
    classroomApplication:
      'A Grade 7 science teacher opens with a concept map linking the new topic to prior knowledge (cognitivism), uses a quick token-and-praise routine to settle lab groups (behaviorism), lets groups investigate a local water problem with scaffolded prompts (constructivism), offers a choice of poster or report and listens without judgment (humanism), and models a think-aloud while a successful peer demonstrates the method (social cognitive theory).',
    mnemonicAid:
      'Remember the five schools as “B-C-C-H-S”: Behaviorism, Cognitivism, Constructivism, Humanism, Social Cognitive — “Big Classrooms Create Happy Students.”',
    frequentExamQuestions: [
      {
        question: 'Compare Behaviorism and Cognitivism in terms of their view of learning, key theorists, and classroom applications.',
        answer:
          'Behaviorism defines learning as a change in observable behavior produced by environmental stimuli (Pavlov, Watson, Thorndike, Skinner) and applies direct instruction, drills, programmed instruction, feedback, token systems, and behavior contracts. Cognitivism defines learning as a change in mental processes and associations (Piaget, Ausubel, Bruner, Chomsky) and applies advance organizers, concept maps, chunking, metacognitive strategies, and meaningful learning.',
      },
      {
        question: 'Explain the difference between cognitive constructivism and social constructivism.',
        answer:
          'Cognitive constructivism (Piaget) focuses on how an individual builds knowledge by assimilating and accommodating experiences into existing schemas. Social constructivism (Vygotsky) holds that knowledge is built through social and cultural interaction, language, collaboration, and scaffolding from a More Knowledgeable Other within the Zone of Proximal Development.',
      },
      {
        question: 'Describe the key principles of Humanism and their classroom application.',
        answer:
          'Humanism sees learning as holistic and aimed at self-actualization; key principles are Maslow’s hierarchy of needs, self-concept, self-direction, unconditional positive regard, empathy, and student-centredness. Teachers apply them by meeting basic needs, building trust, offering meaningful choice, using cooperative learning, and focusing on personal growth alongside academic outcomes.',
      },
      {
        question: 'Explain Social Cognitive Theory and how it bridges behaviorism and cognitivism.',
        answer:
          'Bandura’s Social Cognitive Theory states that learning occurs through observation, imitation, and modeling in a social context, through triadic reciprocal determinism among personal factors, behavior, and environment. It accepts external reinforcement (behaviorist) while recognizing internal processes such as expectations, self-efficacy, and self-regulation (cognitive).',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-edupsy-basics-1',
        question: 'Which theorist is associated with Social Cognitive Theory and observational learning?',
        options: ['B. F. Skinner', 'Albert Bandura', 'Jerome Bruner', 'Carl Rogers'],
        correctIndex: 1,
        explanation:
          'Albert Bandura developed Social Cognitive Theory, explaining learning through observation, imitation, modeling, and self-efficacy.',
      },
      {
        id: 'quiz-edupsy-basics-2',
        question: 'In Cognitivism, the learner is best described as:',
        options: ['A passive responder', 'An active information processor', 'A self-actualizing person', 'An empty vessel'],
        correctIndex: 1,
        explanation:
          'Cognitivism treats the learner as an active processor who encodes, stores, retrieves, and organizes information.',
      },
      {
        id: 'quiz-edupsy-basics-3',
        question: 'Which school of thought emphasizes unconditional positive regard and self-actualization?',
        options: ['Behaviorism', 'Humanism', 'Constructivism', 'Social Cognitive Theory'],
        correctIndex: 1,
        explanation:
          'Humanism, associated with Maslow and Rogers, emphasizes the whole person, self-concept, self-direction, unconditional positive regard, and self-actualization.',
      },
    ],
    examDistractorTraps: [
      'Trap: Calling Bandura a pure behaviorist — Social Cognitive Theory accepts reinforcement but adds observational learning, self-efficacy, and reciprocal determinism.',
      'Trap: Crediting Bruner only to cognitivism — Bruner appears in both cognitivism (discovery learning) and constructivism.',
      'Trap: Equating constructivism with unstructured teaching — constructivist classrooms use deliberate scaffolding and guided inquiry.',
    ],
  },
  {
    id: 'edu-psych-vs-educational-psychology',
    topicNumber: '2',
    title: 'Psychology vs. Educational Psychology',
    readTime: '9 min read',
    htmlNotesPath:
      'notes/educational-psychology/differences-between-psychology-and-educational-psychology.html',
    summary:
      'Psychology is the scientific study of the mind, behavior, and mental processes across all settings and populations. Educational psychology is a specialized branch and applied field of psychology that studies how people learn and teach, translating psychological principles into improved instruction, assessment, and learner support. They share a scientific base and overlapping topics such as learning, motivation, development, cognition, and individual differences, but differ in scope, focus, goal, research setting, and relation to practice.',
    highYieldAlert:
      'STS High-Yield: educational psychology is not a separate discipline — it is an applied branch of psychology. The most-tested distinction is scope and focus: psychology studies general behavior and mind, while educational psychology studies learning and teaching in educational settings.',
    concepts: [
      {
        conceptTitle: 'Core Definitions',
        explanation: 'Precise definitions earn full marks in CRQs.',
        keyTerms: [
          {
            term: 'Psychology',
            definition:
              'The scientific study of the mind, behavior, and mental processes — perception, cognition, emotion, motivation, personality, and social interaction — across all settings and populations.',
          },
          {
            term: 'Educational Psychology',
            definition:
              'A branch and applied field of psychology that studies how people learn and teach in educational settings, applying psychological principles to improve learning outcomes and instructional practice.',
          },
        ],
      },
      {
        conceptTitle: 'Key Dimensions of Difference',
        explanation: 'Compare along scope, focus, goal, methods, and context rather than only by definition.',
        bulletPoints: [
          'Nature: psychology is a broad foundational discipline; educational psychology is a specialized applied subfield.',
          'Scope: psychology covers the entire range of behavior and mental processes; educational psychology focuses on learning, teaching, motivation, assessment, and learner development.',
          'Main goal: psychology describes, explains, predicts, and influences behavior; educational psychology applies psychology to enhance learning, teaching, and educational outcomes.',
          'Research methods: psychology uses experiments, correlational and clinical studies, and neuropsychology; educational psychology uses classroom experiments, longitudinal studies, action research, psychometrics, and programme evaluation.',
          'Work roles: psychologists, researchers, clinicians, counsellors versus educational psychologists, teachers, instructional designers, school consultants, assessment specialists.',
        ],
      },
      {
        conceptTitle: 'Similarities and Dependence',
        explanation: 'The relationship is complementary, not oppositional.',
        bulletPoints: [
          'Shared scientific base: both rely on scientific methods and psychological theory.',
          'Overlapping topics: learning, motivation, development, cognition, and individual differences.',
          'Dependence: educational psychology draws on cognitive, developmental, social, and behavioral psychology.',
          'Translation role: general psychology supplies theories; educational psychology converts them into classroom practice.',
          'Educational psychology is both a subfield of psychology and an interdisciplinary field linked to education.',
        ],
      },
    ],
    comparisonTable: {
      title: 'Psychology vs. Educational Psychology',
      headers: ['Dimension', 'Psychology', 'Educational Psychology'],
      rows: [
        ['Nature', 'Broad foundational discipline', 'Specialized applied branch'],
        ['Scope', 'All behavior and mental processes', 'Learning and teaching in educational settings'],
        ['Main goal', 'Describe, explain, predict, influence behavior', 'Improve learning, teaching, and outcomes'],
        ['Typical methods', 'Experimental, clinical, neuropsychological', 'Classroom experiments, action research, psychometrics'],
        ['Target population', 'All humans (and animals)', 'Learners, teachers, trainers'],
      ],
    },
    classroomApplication:
      'A teacher facing low participation does not simply label students as “unmotivated”. Using educational psychology, the teacher applies motivation theory (autonomy, competence, relatedness), checks prior knowledge and cognitive load, and redesigns tasks with choice and scaffolding — translating general psychological findings into practical classroom decisions.',
    mnemonicAid:
      'Think of the analogy: “Psychology is the ocean; educational psychology is the classroom aquarium” — same water, narrower purpose.',
    frequentExamQuestions: [
      {
        question: 'Define psychology and educational psychology and explain their relationship.',
        answer:
          'Psychology is the scientific study of mind, behavior, and mental processes across all settings. Educational psychology is a branch and applied field of psychology studying how people learn and teach in educational settings. Educational psychology depends on general psychology for theory and method while adapting both to learners, teachers, classrooms, curriculum, and assessment.',
      },
      {
        question: 'Compare psychology and educational psychology in scope, focus, and main goal.',
        answer:
          'Scope: broad (all behavior and mental processes) versus educational contexts (learning and teaching). Focus: general principles of behavior and mind versus instructional strategies, classroom climate, assessment, and learner differences. Goal: describe, explain, predict, and influence behavior versus apply psychology to improve learning, teaching, and educational outcomes.',
      },
      {
        question: 'State five similarities between psychology and educational psychology.',
        answer:
          'Both use scientific methods and psychological theory; both study learning, motivation, development, cognition, and individual differences; educational psychology draws on cognitive, developmental, social, and behavioral psychology; general psychology informs education while educational psychology translates theory into practice; and they are not mutually exclusive — educational psychology is a subfield of psychology linked to education.',
      },
      {
        question: 'Correct three common misconceptions about educational psychology.',
        answer:
          '“It is completely different from psychology” — it is an applied branch of psychology. “It only studies students” — it also studies teachers, classrooms, assessment, curriculum, and environments. “It is only theory” — it is highly applied and directly informs instructional practice. A fourth misconception is that psychology is only clinical, when clinical work is one subfield among many.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-edupsy-vs-1',
        question: 'Educational psychology is best described as:',
        options: [
          'A completely separate discipline from psychology',
          'An applied branch of psychology focused on learning and teaching',
          'A branch of philosophy of education',
          'A clinical speciality treating mental disorders',
        ],
        correctIndex: 1,
        explanation:
          'Educational psychology is an applied branch of psychology that studies learning and teaching and applies psychological principles to education.',
      },
      {
        id: 'quiz-edupsy-vs-2',
        question: 'Which of the following is a primary focus of educational psychology rather than general psychology?',
        options: ['Neurochemical bases of memory', 'Instructional strategies and classroom assessment', 'Personality disorders', 'Animal learning in laboratories'],
        correctIndex: 1,
        explanation:
          'Educational psychology focuses on instructional strategies, classroom environment, assessment, and learner differences.',
      },
      {
        id: 'quiz-edupsy-vs-3',
        question: 'The relationship between general psychology and educational psychology is best described as:',
        options: ['Mutually exclusive', 'Theory versus practice/translation', 'Identical in scope', 'Unrelated fields'],
        correctIndex: 1,
        explanation:
          'General psychology supplies theories and research; educational psychology translates and applies them to teaching and learning.',
      },
    ],
    examDistractorTraps: [
      'Trap: Claiming educational psychology is “not psychology” — it is a branch of psychology.',
      'Trap: Limiting educational psychology to students — it also covers teachers, classrooms, assessment, curriculum, and learning environments.',
    ],
  },
  {
    id: 'edu-psych-learning-theories',
    topicNumber: '3',
    title: 'Learning Theories: Behaviorism, Cognitivism, Constructivism & Humanism',
    readTime: '11 min read',
    htmlNotesPath:
      'notes/educational-psychology/learning-theories-behaviorism-cognitivism-constructivism-humanism.html',
    summary:
      'Four lenses explain how learning happens: Behaviorism (change in observable behavior through reinforcement), Cognitivism (change in mental processes and associations), Constructivism (active construction of knowledge through experience and social interaction), and Humanism (holistic personal growth toward self-actualization). Each defines the learner and teacher roles, offers distinct classroom strategies, and has clear strengths and limitations. No single theory is sufficient, so good teaching draws on multiple perspectives according to the learner, content, and context.',
    highYieldAlert:
      'STS High-Yield: learn the four “learning is…” statements — Behaviorism: change in observable behavior; Cognitivism: change in mental processes; Constructivism: active construction of knowledge; Humanism: holistic personal growth. Strengths and limitations are frequently asked in CRQs.',
    concepts: [
      {
        conceptTitle: 'Core Premises and Key Theorists',
        explanation: 'One-sentence premises anchor every comparison question.',
        keyTerms: [
          {
            term: 'Behaviorism',
            definition:
              'Learning is a change in observable behavior produced by experience and environmental stimuli; theorists: Pavlov, Watson, Thorndike, Skinner. Ignores unobservable mental processes.',
          },
          {
            term: 'Cognitivism',
            definition:
              'Learning is a change in mental associations and cognitive structures; theorists: Piaget, Ausubel, Bruner, Chomsky. Emphasizes encoding, storage, retrieval, schema, and meaningful learning.',
          },
          {
            term: 'Constructivism',
            definition:
              'Learners actively construct knowledge through experience, reflection, and interaction; theorists: Piaget, Vygotsky, Bruner. Emphasizes assimilation, accommodation, ZPD, and scaffolding.',
          },
          {
            term: 'Humanism',
            definition:
              'Learning is a holistic, personal process aimed at self-actualization; theorists: Maslow, Rogers. Emphasizes needs, self-concept, self-direction, and unconditional positive regard.',
          },
        ],
      },
      {
        conceptTitle: 'Strengths and Limitations',
        explanation: 'Balanced evaluation earns higher marks than description alone.',
        bulletPoints: [
          'Behaviorism — strength: clear, measurable, effective for basic skills and behavior management; limitation: neglects mental processes, creativity, and deep understanding.',
          'Cognitivism — strength: explains memory, complex learning, and problem solving; limitation: can underestimate social and emotional factors and mental processes are hard to observe.',
          'Constructivism — strength: promotes deep understanding, critical thinking, autonomy, and collaboration; limitation: time-consuming, can disadvantage learners with limited prior knowledge, and assessment is complex.',
          'Humanism — strength: supports motivation, well-being, self-esteem, and teacher–student relationships; limitation: less structured, harder to measure, and challenging in large exam-focused classes.',
        ],
      },
      {
        conceptTitle: 'How the Theories Relate',
        explanation: 'The theories are progressive and complementary rather than mutually exclusive.',
        bulletPoints: [
          'Behaviorism → Cognitivism: cognitivism emerged as a reaction to behaviorism’s neglect of mental processes.',
          'Cognitivism → Constructivism: constructivism extends cognitivism by emphasizing active meaning-making and social context.',
          'Humanism overlaps constructivism: both are student-centred, but humanism stresses emotional growth and self-actualization more strongly.',
          'They are complementary: reinforcement for routines, cognitive strategies for understanding, constructivist tasks for deep learning, humanistic approaches for a supportive climate.',
        ],
      },
    ],
    comparisonTable: {
      title: 'Learning Theories at a Glance',
      headers: ['Dimension', 'Behaviorism', 'Cognitivism', 'Constructivism', 'Humanism'],
      rows: [
        ['Learning is…', 'Change in observable behavior', 'Change in mental processes', 'Active construction of knowledge', 'Holistic personal growth'],
        ['Learner role', 'Passive responder', 'Active processor', 'Active constructor', 'Self-directed person'],
        ['Teacher role', 'Director/reinforcer', 'Guide/organizer', 'Facilitator/scaffolder', 'Facilitator/empathizer'],
        ['Key strategy', 'Reinforcement, drills', 'Organizers, metacognition', 'Inquiry, PBL, collaboration', 'Choice, empathy, student-centredness'],
        ['Main limitation', 'Ignores mental processes', 'Underplays social/emotional factors', 'Time-consuming, complex assessment', 'Less structured, hard to measure'],
      ],
    },
    classroomApplication:
      'In a Grade 5 mathematics lesson, the teacher reinforces a clean transition routine with specific praise (behaviorism), begins with an advance organizer connecting fractions to sharing food (cognitivism), has pairs model fractions with paper strips and explain their reasoning (constructivism), and offers students a choice of practice task while acknowledging effort warmly (humanism).',
    mnemonicAid:
      'Use “B-C-C-H” with the tagline “Behavior to Brain to Building to Belonging” — the historical and conceptual progression of the four theories.',
    frequentExamQuestions: [
      {
        question: 'Compare Behaviorism and Cognitivism in view of learning, key theorists, and learner role.',
        answer:
          'Behaviorism sees learning as observable behavior change from environmental stimuli (Pavlov, Watson, Thorndike, Skinner) with the learner as a passive responder. Cognitivism sees learning as a change in mental processes and associations (Piaget, Ausubel, Bruner, Chomsky) with the learner as an active information processor. Behaviorism focuses on external conditions and measurable behavior; cognitivism focuses on internal understanding, schema, and meaningful learning.',
      },
      {
        question: 'Explain the difference between cognitive and social constructivism.',
        answer:
          'Cognitive constructivism (Piaget) explains how an individual constructs knowledge by assimilating and accommodating experiences into schemas. Social constructivism (Vygotsky) explains knowledge construction through culture, language, collaboration, and guided interaction with a More Knowledgeable Other in the Zone of Proximal Development.',
      },
      {
        question: 'Describe the key principles and classroom applications of Humanism.',
        answer:
          'Humanism views learning as holistic and aimed at self-actualization; principles include Maslow’s hierarchy of needs, self-concept, self-direction, unconditional positive regard, empathy, and student-centredness. Applications include meeting basic needs, building trust, offering choice and autonomy, cooperative learning, reflection, and a safe supportive climate.',
      },
      {
        question: 'How do the four theories relate, and why is no single theory sufficient?',
        answer:
          'Cognitivism reacted to behaviorism’s neglect of mental processes; constructivism extended cognitivism through active meaning-making and social context; humanism overlaps constructivism while emphasizing emotional growth. No single theory covers all learning: behaviorism suits routines and basic skills, cognitivism explains understanding, constructivism builds deep learning, and humanism sustains motivation and well-being. Effective teaching integrates them.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-edupsy-lt-1',
        question: '“Learning is a relatively permanent change in observable behavior” is the core premise of:',
        options: ['Cognitivism', 'Behaviorism', 'Constructivism', 'Humanism'],
        correctIndex: 1,
        explanation:
          'Behaviorism defines learning as an observable behavior change caused by environmental stimuli and reinforcement.',
      },
      {
        id: 'quiz-edupsy-lt-2',
        question: 'Which theory is most closely associated with Maslow’s hierarchy of needs and unconditional positive regard?',
        options: ['Behaviorism', 'Cognitivism', 'Humanism', 'Constructivism'],
        correctIndex: 2,
        explanation:
          'Humanism, through Maslow’s hierarchy and Rogers’ unconditional positive regard, focuses on the whole person and self-actualization.',
      },
      {
        id: 'quiz-edupsy-lt-3',
        question: 'A teacher uses advance organizers, concept maps, and metacognitive strategies. This reflects:',
        options: ['Behaviorism', 'Cognitivism', 'Humanism', 'Social learning'],
        correctIndex: 1,
        explanation:
          'Advance organizers, concept maps, chunking, and metacognitive strategies are cognitivist instructional techniques.',
      },
    ],
    examDistractorTraps: [
      'Trap: Treating the theories as mutually exclusive — effective teaching integrates several of them.',
      'Trap: Describing humanism as “no rules” — humanism is student-centred but still requires structure and high expectations.',
    ],
  },
  {
    id: 'edu-psych-individual-differences',
    topicNumber: '4',
    title: 'Individual Differences in Educational Psychology',
    readTime: '11 min read',
    htmlNotesPath:
      'notes/educational-psychology/individual-differences-in-educational-psychology.html',
    summary:
      'Individual differences are the variations among learners in ability, prior knowledge, personality, motivation, background, culture, language, pace, and styles of thinking. Educational psychology studies how these variations affect learning and how instruction can respond. Key dimensions include cognitive ability, prior knowledge, personality, motivation, self-efficacy, gender, socioeconomic status, culture and language, exceptionalities, interest, and learning pace. Effective responses are differentiated instruction, Universal Design for Learning, formative assessment, flexible grouping, scaffolding, and supportive relationships — without lowering expectations or applying rigid labels.',
    highYieldAlert:
      'STS High-Yield: the evidence for matching instruction to “visual/auditory/kinesthetic learning styles” is weak. The recommended practice is multiple representations for all learners. Also remember Gardner’s eight intelligences and Sternberg’s triarchic theory (analytical, creative, practical).',
    concepts: [
      {
        conceptTitle: 'Major Dimensions of Individual Differences',
        explanation: 'Name the dimension, then state one classroom implication.',
        bulletPoints: [
          'Cognitive ability/intelligence — use varied tasks; avoid over-reliance on a single IQ score.',
          'Prior knowledge — pre-assess and connect new content to existing schemas.',
          'Personality (Big Five: openness, conscientiousness, extraversion, agreeableness, neuroticism) — support self-regulation and vary grouping and task structure.',
          'Motivation and self-efficacy — build relevance, choice, achievable challenge, and specific encouragement.',
          'Socioeconomic status and culture/language — provide resources, structure, culturally responsive teaching, and language supports.',
          'Exceptionalities — giftedness, learning disabilities, ADHD, and sensory or physical disabilities require differentiation and accommodation.',
        ],
      },
      {
        conceptTitle: 'Intelligence Models',
        explanation: 'Match model to theorist; this is a frequent matching item.',
        keyTerms: [
          {
            term: 'Spearman — general intelligence (g)',
            definition: 'One general factor underlies performance; supports broad aptitude testing but offers a limited view of learners.',
          },
          {
            term: 'Gardner — multiple intelligences',
            definition: 'Linguistic, logical-mathematical, spatial, musical, bodily-kinesthetic, interpersonal, intrapersonal, and naturalistic intelligences; encourages varied activities but is not a validated learning-style prescription.',
          },
          {
            term: 'Sternberg — triarchic theory',
            definition: 'Analytical, creative, and practical intelligence; teach for analysis, creativity, and real-world application.',
          },
          {
            term: 'Cattell–Horn–Cattell (CHC)',
            definition: 'Fluid and crystallized intelligence plus broad abilities; informs cognitive assessment and instructional planning.',
          },
        ],
      },
      {
        conceptTitle: 'Differentiated Instruction and UDL',
        explanation: 'The practical answer to individual differences in a large classroom.',
        bulletPoints: [
          'Pre-assessment before teaching; flexible grouping by need rather than fixed ability.',
          'Tiered tasks at different complexity levels toward the same learning goal.',
          'Choice in topic, product, or process; multiple representations (text, visuals, discussion, models, hands-on).',
          'Scaffolding that is gradually removed; frequent formative assessment to adjust instruction.',
          'Universal Design for Learning: multiple means of engagement, representation, and expression from the start.',
          'Aptitude–Treatment Interaction (ATI): instruction is most effective when it matches learner characteristics — there is no single best method for everyone.',
        ],
      },
    ],
    comparisonTable: {
      title: 'Differentiation Strategies and Their Purpose',
      headers: ['Strategy', 'What It Adjusts', 'Classroom Example'],
      rows: [
        ['Pre-assessment', 'Starting point', 'Short diagnostic quiz before a fractions unit'],
        ['Flexible grouping', 'Grouping', 'Regrouping students weekly by current need'],
        ['Tiered tasks', 'Complexity', 'Same topic: manipulatives versus multi-step word problems'],
        ['Multiple representations', 'Input mode', 'Diagram, demonstration, text, and discussion for one concept'],
        ['Scaffolding', 'Support level', 'Sentence starters and models gradually withdrawn'],
        ['UDL', 'Design up front', 'Choice of text, audio, or visual explanation for all'],
      ],
    },
    classroomApplication:
      'Before a measurement unit, a teacher pre-assesses prior knowledge, groups students flexibly, and prepares three tiers of the same task: measuring classroom objects with rulers, converting units in word problems, and designing a small scale plan. All students work toward the same learning goal, receive scaffolded support that is gradually withdrawn, and demonstrate learning through a choice of poster, written explanation, or oral presentation.',
    mnemonicAid:
      'For the Big Five personality traits use “OCEAN”: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism.',
    frequentExamQuestions: [
      {
        question: 'Define individual differences and explain why they matter in education.',
        answer:
          'Individual differences are variations among learners in ability, prior knowledge, interests, personality, motivation, background, culture, language, pace, and thinking styles. They matter because a one-size-fits-all approach leaves some learners behind or unchallenged; recognizing them enables differentiation, appropriate support and challenge, equity and inclusion, and high standards for all.',
      },
      {
        question: 'Describe five major dimensions of individual differences with one implication each.',
        answer:
          'Cognitive ability — use varied tasks and avoid relying on one IQ measure; prior knowledge — pre-assess and connect to schemas; motivation — build relevance, choice, and mastery experiences; socioeconomic status — provide resources, structure, and supportive relationships; exceptionalities — differentiate and accommodate. Personality, culture, language, self-efficacy, and pace are also key dimensions.',
      },
      {
        question: 'Explain the caution around learning styles and the recommended best practice.',
        answer:
          'Evidence that matching visual, auditory, or kinesthetic instruction to a learner’s supposed style improves learning is weak, and rigid labels can limit learners. Best practice is to avoid labeling, use multiple representations and varied modalities for all learners, encourage deep processing rather than surface memorisation, and differentiate by readiness, prior knowledge, and specific needs.',
      },
      {
        question: 'List five strategies for differentiated instruction.',
        answer:
          'Pre-assessment of readiness and prior knowledge; flexible grouping; tiered tasks at different complexity levels; choice in topic, product, or process; scaffolding with gradual removal. Multiple representations, formative assessment, UDL, and a positive classroom climate are further differentiation strategies.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-edupsy-id-1',
        question: 'Which theorist proposed the triarchic theory of intelligence?',
        options: ['Howard Gardner', 'Robert Sternberg', 'Charles Spearman', 'Raymond Cattell'],
        correctIndex: 1,
        explanation:
          'Sternberg’s triarchic theory identifies analytical, creative, and practical intelligence.',
      },
      {
        id: 'quiz-edupsy-id-2',
        question: 'According to current evidence, the best response to “learning styles” is to:',
        options: [
          'Group students permanently by their preferred sense',
          'Match every lesson strictly to each learner’s style',
          'Use multiple representations and varied modalities for all learners',
          'Test learners’ styles and lower standards for some groups',
        ],
        correctIndex: 2,
        explanation:
          'Evidence for style-matching is weak; educationally sound practice is to present content in multiple ways for all learners.',
      },
      {
        id: 'quiz-edupsy-id-3',
        question: 'Which of the following is a core component of Universal Design for Learning (UDL)?',
        options: ['Single fixed assessment format', 'Multiple means of engagement, representation, and expression', 'Labelling learners by ability', 'Teaching only to the average student'],
        correctIndex: 1,
        explanation:
          'UDL designs instruction from the outset with multiple means of engagement, representation, and expression.',
      },
    ],
    examDistractorTraps: [
      'Trap: Treating learning-style matching as settled science — evidence is weak and mixed.',
      'Trap: Equating differentiation with lowering standards — differentiation maintains high expectations with adjusted support.',
      'Trap: Confusing Gardner’s multiple intelligences with a validated learning-style prescription.',
    ],
  },
  {
    id: 'edu-psych-basic-needs-motivation',
    topicNumber: '5',
    title: 'Basic Needs & Motivation',
    readTime: '11 min read',
    htmlNotesPath: 'notes/educational-psychology/basic-needs-and-motivation.html',
    summary:
      'Motivation is not simply a trait learners have or lack; it is strongly shaped by whether their basic needs are satisfied in the learning environment. Maslow’s hierarchy orders physiological, safety, belonging, esteem, and self-actualization needs, while Self-Determination Theory identifies autonomy, competence, and relatedness as essential for intrinsic motivation. Glasser’s Choice Theory adds survival, love and belonging, power, freedom, and fun, and frameworks such as drive reduction, achievement motivation, expectancy-value, and flow further explain motivated learning.',
    highYieldAlert:
      'STS High-Yield: Self-Determination Theory (Deci & Ryan) = Autonomy + Competence + Relatedness. Glasser’s Choice Theory = Survival + Love/Belonging + Power + Freedom + Fun. Maslow’s hierarchy is a flexible guide, not a strict sequence — needs can operate simultaneously.',
    concepts: [
      {
        conceptTitle: 'Maslow’s Hierarchy of Needs',
        explanation: 'Know the five levels and one classroom action for each.',
        bulletPoints: [
          'Physiological (food, water, sleep, warmth) — ensure students are fed, rested, and comfortable.',
          'Safety (physical and emotional security, order, predictability) — clear routines, anti-bullying norms, safe classrooms.',
          'Belonging and love (acceptance, friendship, connection) — inclusive, caring classroom community.',
          'Esteem (competence, recognition, respect) — meaningful feedback, recognition, mastery experiences.',
          'Self-actualization (fulfilling potential, growth, creativity) — challenge, choice, and self-direction.',
        ],
      },
      {
        conceptTitle: 'Self-Determination Theory (Deci & Ryan)',
        explanation: 'Three psychological needs explain intrinsic motivation.',
        keyTerms: [
          {
            term: 'Autonomy',
            definition: 'Feeling volitional, self-directed, and responsible for one’s actions — offer choice, explain relevance, minimise controlling language.',
          },
          {
            term: 'Competence',
            definition: 'Feeling effective and capable of success — provide optimal challenge, scaffolding, mastery experiences, and informative feedback.',
          },
          {
            term: 'Relatedness',
            definition: 'Feeling connected, accepted, and cared for — build warm teacher–student relationships, cooperative learning, and an inclusive climate.',
          },
        ],
      },
      {
        conceptTitle: 'Glasser’s Choice Theory and Other Frameworks',
        explanation: 'Choose Theory is frequently confused with Maslow; compare all five needs.',
        bulletPoints: [
          'Glasser: survival, love and belonging, power, freedom, and fun — behavior is driven by attempts to meet these needs.',
          'Drive Reduction Theory (Hull): biological needs create drives that motivate behavior to restore homeostasis.',
          'Achievement Motivation: need for achievement, affiliation, and power shape motivational profiles.',
          'Expectancy-Value Theory: motivation depends on expectation of success and the value of the task.',
          'Flow Theory: optimal motivation occurs when challenge matches skill.',
        ],
      },
    ],
    comparisonTable: {
      title: 'Needs Frameworks Compared',
      headers: ['Theory', 'Needs Identified', 'Educational Relevance'],
      rows: [
        ['Maslow', 'Physiological, safety, belonging, esteem, self-actualization', 'Ensure safety and belonging before higher-level learning'],
        ['Self-Determination Theory', 'Autonomy, competence, relatedness', 'Design for choice, mastery, and connection'],
        ['Choice Theory (Glasser)', 'Survival, love/belonging, power, freedom, fun', 'Build classrooms that meet all five needs'],
        ['Achievement Motivation', 'Achievement, affiliation, power', 'Recognise varied motivational profiles'],
      ],
    },
    classroomApplication:
      'A teacher notices a Grade 6 class disengaging before lunch. The school provides a breakfast programme (physiological), the teacher uses predictable routines and addresses name-calling (safety), builds cooperative pairs (belonging), gives specific effort-focused feedback (esteem), and offers a choice of task format (autonomy). Tasks are pitched slightly above current ability with scaffolds so students experience competence, not trivial success.',
    mnemonicAid:
      'SDT = “A-C-R” (Autonomy, Competence, Relatedness) — “All Classrooms Rise”. Glasser = “S-L-P-F-F” — “Students Learn Power, Freedom, Fun”.',
    frequentExamQuestions: [
      {
        question: 'Explain Maslow’s hierarchy and its educational implications, including a key caution.',
        answer:
          'Maslow’s five levels are physiological, safety, belonging and love, esteem, and self-actualization. Educationally, teachers ensure students are fed, rested, and safe, build a caring and inclusive community, provide recognition and mastery experiences, and offer opportunities for growth and creativity. Caution: the strict sequence is not fully supported by research — needs can operate simultaneously and vary by culture and individual.',
      },
      {
        question: 'Describe Self-Determination Theory and its three needs with applications.',
        answer:
          'SDT (Deci & Ryan) holds that intrinsic motivation depends on autonomy, competence, and relatedness. Autonomy: offer meaningful choice, explain relevance, avoid controlling language. Competence: provide optimal challenge, scaffolding, mastery experiences, and informative feedback. Relatedness: build warm relationships, cooperative learning, and an inclusive climate.',
      },
      {
        question: 'List Glasser’s five basic needs and their educational implications.',
        answer:
          'Survival — safety and basic comfort; love and belonging — inclusion and caring relationships; power — voice, responsibility, and mastery opportunities; freedom — choice and self-direction; fun — engaging, relevant, enjoyable learning. Classrooms should be designed to meet all five because behavior is driven by attempts to meet these needs.',
      },
      {
        question: 'How do unmet needs affect learning and motivation?',
        answer:
          'Unmet needs consume attention and energy. Hunger and fatigue reduce attention and memory; fear and unsafe environments create anxiety and hypervigilance; isolation causes disengagement; repeated failure produces avoidance and low self-efficacy; excessive control produces compliance, disengagement, or rebellion.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-edupsy-needs-1',
        question: 'Which three needs are central to Self-Determination Theory?',
        options: ['Safety, esteem, self-actualization', 'Autonomy, competence, relatedness', 'Survival, power, fun', 'Achievement, affiliation, power'],
        correctIndex: 1,
        explanation:
          'Deci and Ryan’s SDT identifies autonomy, competence, and relatedness as the basic psychological needs for intrinsic motivation.',
      },
      {
        id: 'quiz-edupsy-needs-2',
        question: 'Glasser’s Choice Theory includes which set of needs?',
        options: [
          'Physiological, safety, belonging, esteem, self-actualization',
          'Autonomy, competence, relatedness',
          'Survival, love/belonging, power, freedom, fun',
          'Analytical, creative, practical',
        ],
        correctIndex: 2,
        explanation:
          'Glasser identified survival, love and belonging, power, freedom, and fun as the five basic needs driving behavior.',
      },
      {
        id: 'quiz-edupsy-needs-3',
        question: 'Offering students a choice between two project formats primarily supports:',
        options: ['Physiological needs', 'Autonomy', 'Safety', 'Vicarious reinforcement'],
        correctIndex: 1,
        explanation:
          'Meaningful choice within structure supports autonomy, a core SDT need.',
      },
    ],
    examDistractorTraps: [
      'Trap: Presenting Maslow’s hierarchy as a rigid sequence — research shows needs can operate simultaneously and vary by culture.',
      'Trap: Defining autonomy as “students do whatever they want” — autonomy means meaningful choice within structure.',
      'Trap: Assuming rewards always raise motivation — external rewards can undermine intrinsic motivation by reducing autonomy.',
    ],
  },
  {
    id: 'edu-psych-home-school-community',
    topicNumber: '6',
    title: 'Learning & Motivation in the Context of Home, School, and Community',
    readTime: '12 min read',
    htmlNotesPath:
      'notes/educational-psychology/learning-and-motivation-in-home-school-and-community.html',
    summary:
      'Learning and motivation are shaped by the multiple environments in which learners live. Home, school, and community interact to influence engagement, persistence, and achievement. Bronfenbrenner’s ecological systems theory explains nested influences from microsystem to chronosystem, with the mesosystem — the links between home, school, and community — especially powerful. Epstein’s overlapping spheres model identifies six types of involvement: parenting, communicating, volunteering, learning at home, decision-making, and collaborating with the community. Alignment amplifies motivation; misalignment creates mixed messages.',
    highYieldAlert:
      'STS High-Yield: Bronfenbrenner’s five systems (micro, meso, exo, macro, chrono) and Epstein’s six types of involvement are the most frequently examined concepts. The mesosystem — parent–teacher communication and home–school partnership — is the strongest lever for learning.',
    concepts: [
      {
        conceptTitle: 'Bronfenbrenner’s Ecological Systems',
        explanation: 'Learn each system with one concrete example.',
        keyTerms: [
          {
            term: 'Microsystem',
            definition: 'Immediate environments the learner directly interacts with — home, classroom, peer group, neighbourhood.',
          },
          {
            term: 'Mesosystem',
            definition: 'Interactions between microsystems — parent–teacher communication, home–school partnership. Especially powerful for learning and motivation.',
          },
          {
            term: 'Exosystem',
            definition: 'Indirect environments affecting the learner — a parent’s workplace, school board policy, community services.',
          },
          {
            term: 'Macrosystem',
            definition: 'Broader cultural and societal values — cultural norms about education, national education policy.',
          },
          {
            term: 'Chronosystem',
            definition: 'Changes over time — family transitions, economic shifts, developmental stages.',
          },
        ],
      },
      {
        conceptTitle: 'Context Factors That Shape Motivation',
        explanation: 'Compare the three contexts item by item.',
        bulletPoints: [
          'Home: parental involvement, high but realistic expectations, home learning environment, authoritative parenting (warm plus structured), SES, language and culture, early literacy, emotional climate, appropriate homework support.',
          'School: teacher quality and expectations, classroom climate, teaching strategies, peer influence, assessment practices, school culture, autonomy support, teacher–student relationships, curriculum relevance.',
          'Community: resources (libraries, museums, after-school programmes), role models and mentors, social capital, cultural values, neighbourhood safety, extracurricular activities, service learning, economic opportunities, partnerships.',
        ],
      },
      {
        conceptTitle: 'Motivation Theories in Context',
        explanation: 'Apply each theory to home, school, and community.',
        bulletPoints: [
          'Self-Determination Theory: autonomy (home choices), competence (school mastery experiences), relatedness (community belonging).',
          'Expectancy-Value Theory: parents and teachers shape both expectation of success and task value.',
          'Achievement Goal Theory: home and school messages shape mastery versus performance orientation.',
          'Social Cognitive Theory: role models in family and community build self-efficacy.',
          'Attribution Theory: supportive adults help learners reframe failure as learning.',
        ],
      },
    ],
    comparisonTable: {
      title: 'Epstein’s Six Types of Involvement',
      headers: ['Type', 'Focus', 'Example'],
      rows: [
        ['Parenting', 'Supporting family conditions for learning', 'Workshops on routines and reading at home'],
        ['Communicating', 'Two-way school–family information', 'Regular updates and parent–teacher meetings'],
        ['Volunteering', 'Family support for school activities', 'Parents assisting on trips or reading sessions'],
        ['Learning at home', 'Curriculum-linked home activities', 'Shared reading and maths games'],
        ['Decision-making', 'Participation in school governance', 'Serving on the School Management Committee'],
        ['Collaborating with community', 'Community resources and partnerships', 'Local library and mentor programmes'],
      ],
    },
    classroomApplication:
      'A school aligns the three contexts for a Grade 8 literacy unit: families receive a short guide on reading together and high but realistic expectations (home), teachers run weekly reading conferences with growth-oriented feedback (school), and a local library hosts a reading club with volunteer mentors (community). Communication is two-way, so messages about effort and progress stay consistent across contexts.',
    mnemonicAid:
      'Bronfenbrenner’s systems: “My Mother Eats Mango Chutney” — Micro, Meso, Exo, Macro, Chrono.',
    frequentExamQuestions: [
      {
        question: 'Explain Bronfenbrenner’s ecological systems theory with an example of each system.',
        answer:
          'Microsystem: immediate settings such as home, classroom, and peer group. Mesosystem: interactions between microsystems, such as parent–teacher communication. Exosystem: indirect settings such as a parent’s workplace or school board policy. Macrosystem: broader cultural values and national education policy. Chronosystem: changes over time such as family transitions and economic shifts.',
      },
      {
        question: 'Describe key home factors that influence learning and motivation.',
        answer:
          'Parental involvement, high but realistic expectations, a home learning environment with books and routines, authoritative parenting (warm plus structured), socioeconomic status, language and culture, early literacy and numeracy, a safe emotional climate, and homework support that protects autonomy rather than over-controlling.',
      },
      {
        question: 'Explain Self-Determination Theory across home, school, and community.',
        answer:
          'Autonomy: choices in home routines, choice in school tasks, independent community participation. Competence: encouragement and early success at home, mastery experiences and feedback at school, skill-building programmes in the community. Relatedness: family warmth at home, teacher–peer relationships at school, mentors and community groups.',
      },
      {
        question: 'Why is alignment across home, school, and community important, and what happens when contexts are misaligned?',
        answer:
          'Alignment creates consistent expectations and support, amplifying motivation, belonging, self-efficacy, and achievement. Misalignment — conflicting expectations, poor communication, or a school disconnected from learners’ lives — produces confusion, lower engagement, mixed messages, and fragmented support, especially for learners facing socioeconomic or cultural barriers.',
      },
    ],
    quickQuiz: [
      {
        id: 'quiz-edupsy-ctx-1',
        question: 'In Bronfenbrenner’s theory, parent–teacher communication belongs to the:',
        options: ['Microsystem', 'Mesosystem', 'Exosystem', 'Macrosystem'],
        correctIndex: 1,
        explanation:
          'The mesosystem consists of interactions between microsystems, such as home–school communication.',
      },
      {
        id: 'quiz-edupsy-ctx-2',
        question: 'How many types of involvement does Epstein’s overlapping spheres model identify?',
        options: ['Four', 'Five', 'Six', 'Eight'],
        correctIndex: 2,
        explanation:
          'Epstein identifies six types: parenting, communicating, volunteering, learning at home, decision-making, and collaborating with the community.',
      },
      {
        id: 'quiz-edupsy-ctx-3',
        question: 'Which parenting style is most consistently linked to positive motivation outcomes?',
        options: ['Authoritarian', 'Permissive', 'Authoritative (warm plus structured)', 'Neglectful'],
        correctIndex: 2,
        explanation:
          'An authoritative style combines warmth with clear structure and expectations, supporting motivation and self-regulation.',
      },
    ],
    examDistractorTraps: [
      'Trap: Placing national education policy in the exosystem — it belongs to the macrosystem.',
      'Trap: Defining parental involvement as only helping with homework — it also includes expectations, communication, encouragement, and participation in school life.',
      'Trap: Assuming low SES inevitably means low motivation — supportive relationships and involvement can buffer socioeconomic risk.',
    ],
  },
];
