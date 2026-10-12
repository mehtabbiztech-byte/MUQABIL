import { QuickQuizItem, ConceptBlock, ComparisonTable, LicenseTopicNote } from './teachingLicenseNotesData';

export interface SubjectDidacticStrategy {
  frameworkName: string;
  creatorOrOrigin: string;
  coreStages: string[];
  classroomImplementation: string;
  commonStudentMisconception: string;
  diagnosticIntervention: string;
}

export interface PedagogicalSubjectTopic extends LicenseTopicNote {
  subjectId: string;
  subjectName: string;
  dcarClassRange: string;
  didacticStrategy: SubjectDidacticStrategy;
  keyFormulasOrRules?: string[];
}

export interface PedagogicalSubject {
  id: string;
  name: string;
  shortName: string;
  category: 'Pedagogical Content Knowledge' | 'General Pedagogy';
  weightagePercent: number;
  marks: number;
  mcqCount: number;
  targetLevel: string;
  iconName: string;
  gradient: string;
  badgeBg: string;
  badgeText: string;
  curriculumBenchmark: string;
  description: string;
  topics: PedagogicalSubjectTopic[];
}

export const PEDAGOGICAL_SUBJECTS: PedagogicalSubject[] = [
  {
    id: 'mathematics',
    name: 'Mathematics (Pedagogical Content Knowledge)',
    shortName: 'Mathematics',
    category: 'Pedagogical Content Knowledge',
    weightagePercent: 10,
    marks: 10,
    mcqCount: 10,
    targetLevel: 'Class 1 to 8 DCAR & STBB Aligned · BPS-16 & BPS-17',
    iconName: 'Calculator',
    gradient: 'from-blue-600 via-indigo-600 to-cyan-600',
    badgeBg: 'bg-blue-500/10 dark:bg-blue-500/20',
    badgeText: 'text-blue-600 dark:text-blue-400',
    curriculumBenchmark: 'DCAR Sindh School Curriculum Class 1–8: Numbers, Algebra, Geometry, Mensuration & Didactics',
    description: 'Comprehensive pedagogical and content knowledge in Mathematics: Concrete-Representational-Abstract (CRA) model, Bruner’s enactive-iconic-symbolic progression, place value, fractions, geometry didactics, Polya’s 4-step problem-solving model, and diagnostic error analysis for common student misconceptions.',
    topics: [
      {
        id: 'math-topic-1',
        subjectId: 'mathematics',
        subjectName: 'Mathematics',
        topicNumber: '01',
        title: 'Numbers, Operations & Math Didactics (CRA Model & Place Value)',
        readTime: '14 min read · High Yield',
        dcarClassRange: 'Class 1 to 5 STBB / DCAR Competencies',
        summary: 'Foundational arithmetic didactics covering number sense, base-10 place value, the four operations, and Jerome Bruner’s Concrete-Representational-Abstract (CRA) instructional framework. Details common systematic student errors in multi-digit subtraction with regrouping and long division.',
        highYieldAlert: '🚨 STEDA EXAM TRAP: The CRA Model (Jerome Bruner) strictly requires moving from Concrete (physical manipulatives like Dienes blocks) -> Representational (pictorial drawings, tally marks, number lines) -> Abstract (symbolic numerals and operational algorithms). Skipping the representational stage causes math anxiety and rote algorithmic failure.',
        didacticStrategy: {
          frameworkName: 'Concrete-Representational-Abstract (CRA) Instructional Progression',
          creatorOrOrigin: 'Jerome Bruner & Educational Research in Mathematics Didactics',
          coreStages: [
            '1. Concrete (Enactive): Physical manipulatives (Base-10 blocks, counters, bundling sticks).',
            '2. Representational (Iconic): Pictorial diagrams, area models, ten-frames, number lines.',
            '3. Abstract (Symbolic): Standard arithmetic algorithms, mathematical symbols (+, -, ×, ÷), and variables.'
          ],
          classroomImplementation: 'When introducing 2-digit addition with regrouping (e.g. 27 + 15), students first bundle 12 loose unit cubes into 1 ten-rod and 2 units (Concrete). Next, they draw ten-rods and dots on grid paper (Representational). Finally, they write the standard column addition algorithm with carrying (Abstract).',
          commonStudentMisconception: 'Subtraction Reversal Error: When solving 52 - 27, students subtract the smaller digit from the larger digit regardless of position (e.g., 7 - 2 = 5 and 5 - 2 = 3, writing 35 instead of 25).',
          diagnosticIntervention: 'Use place-value mats with unifix cubes. Require students to show that you cannot physically take 7 units from 2 units without unbundling one ten-rod into 10 unit cubes.'
        },
        keyFormulasOrRules: [
          'Commutative Property: a + b = b + a  and  a × b = b × a (Holds for Addition & Multiplication ONLY)',
          'Associative Property: (a + b) + c = a + (b + c)  and  (a × b) × c = a × (b × c)',
          'Distributive Property: a × (b + c) = (a × b) + (a × c)',
          'Identity Elements: Additive Identity = 0; Multiplicative Identity = 1'
        ],
        concepts: [
          {
            conceptTitle: '1. Number Sense, Cardinality & Place Value Didactics',
            explanation: 'Number sense is the intuitive feel for numbers and relationships. In DCAR Class 1–3, students progress from subitizing (recognizing small quantities instantly) to one-to-one correspondence, cardinality, and positional base-10 value.',
            keyTerms: [
              { term: 'Subitizing', definition: 'The immediate cognitive recognition of the quantity of a small group of objects without counting (e.g. dice patterns).' },
              { term: 'Base-10 Positional Value', definition: 'A number system where the value of each digit depends on its position, multiplying by 10 with each move to the left.' },
              { term: 'Expanded Notation', definition: 'Expressing a number as the sum of the values of its digits (e.g. 4,352 = 4,000 + 300 + 50 + 2).' },
              { term: 'Decomposition (Regrouping)', definition: 'Breaking down a higher place value into 10 units of the adjacent lower place value to facilitate subtraction.' }
            ],
            bulletPoints: [
              'Zero serves two critical mathematical functions: as an empty set value and as a positional placeholder in multi-digit numerals.',
              'Students who lack place-value conceptualization treat digits as isolated numerals rather than values.',
              'Use bundlings of 10 ice-cream sticks or local beads to teach tens and units in Sindh primary classrooms.'
            ]
          },
          {
            conceptTitle: '2. The Four Fundamental Operations & Algorithmic Didactics',
            explanation: 'Teaching addition, subtraction, multiplication, and division must connect conceptual meaning to procedural efficiency.',
            keyTerms: [
              { term: 'Multiplication as Repeated Addition', definition: 'Conceptually introducing 4 × 3 as 4 groups of 3 (3 + 3 + 3 + 3).' },
              { term: 'Array Model (Area Model)', definition: 'Arranging objects in rows and columns to visually prove the commutative property of multiplication (e.g. 3 × 5 = 5 × 3).' },
              { term: 'Partitive vs. Quotitive Division', definition: 'Partitive: Sharing equally into known number of groups. Quotitive (Measurement): Determining how many groups of a known size can be made.' }
            ],
            bulletPoints: [
              'Division by zero is mathematically undefined because no number multiplied by zero produces a non-zero dividend.',
              'Fact families (e.g. 6 + 7 = 13, 7 + 6 = 13, 13 - 6 = 7, 13 - 7 = 6) strengthen bidirectional mental retrieval.'
            ]
          }
        ],
        comparisonTable: {
          title: 'Bruner’s CRA Stages in Elementary Mathematics (DCAR STBB)',
          headers: ['Stage', 'Bruner Mode', 'Classroom Tools', 'Student Activity', 'Teacher Role'],
          rows: [
            ['Concrete', 'Enactive Mode', 'Base-10 blocks, bundling sticks, abacus, coins', 'Physically manipulating objects and grouping', 'Facilitator & materials organizer'],
            ['Representational', 'Iconic Mode', 'Number lines, ten-frames, bar models, drawings', 'Translating actions into visual diagrams', 'Guiding visual abstraction & questioning'],
            ['Abstract', 'Symbolic Mode', 'Numerals, mathematical operators (+, -, ×, ÷)', 'Solving standard column algorithms efficiently', 'Ensuring accuracy and metacognitive explanation']
          ]
        },
        classroomApplication: 'Classroom Case Study: A Class 4 teacher in Govt. Elementary School Sukkur observes that 70% of students fail question 604 - 238 because of zeros in the minuend. Instead of repeating the drill, the teacher distributes Base-10 flats (100s) and rods (10s), guiding students through physical trade: 1 hundred flat becomes 10 ten-rods, and 1 ten-rod becomes 10 unit cubes. The conceptual regrouping eliminates the error in subsequent tests.',
        mnemonicAid: '🧠 "CRA Solves Math": Concrete (Counters in hand) -> Representational (Pictures on paper) -> Abstract (Algorithms in head).',
        frequentExamQuestions: [
          {
            question: 'Which instructional sequence is advocated by Jerome Bruner for teaching mathematical operations?',
            answer: 'Concrete (Enactive) -> Representational (Iconic) -> Abstract (Symbolic).'
          },
          {
            question: 'A student writes 405 - 187 = 382 by subtracting the smaller from larger numbers in each column. What is the diagnosis?',
            answer: 'Systematic subtraction reversal error due to lack of place value understanding and failure to comprehend regrouping/decomposition.'
          }
        ],
        quickQuiz: [
          {
            id: 'm-q1',
            question: 'According to Jerome Bruner’s instructional framework, which sequence should a teacher follow when introducing fractions to elementary students?',
            options: [
              'Abstract symbols -> Word problems -> Physical cutting',
              'Concrete manipulation (fraction strips) -> Representational diagrams (pie charts) -> Abstract symbols (1/4)',
              'Memorizing definitions -> Solving textbook exercises -> Lab activity',
              'Rote drill -> Flashcards -> Peer test'
            ],
            correctIndex: 1,
            explanation: 'The CRA sequence (Concrete -> Representational -> Abstract) ensures learners build intuitive sensory models before working with abstract algebraic notations.'
          },
          {
            id: 'm-q2',
            question: 'Which property of operations justifies that 15 × (20 + 4) = (15 × 20) + (15 × 4)?',
            options: ['Commutative property of addition', 'Distributive property of multiplication over addition', 'Associative property of multiplication', 'Identity property of multiplication'],
            correctIndex: 1,
            explanation: 'The Distributive property distributes multiplication across the terms inside the parentheses: a × (b + c) = (a × b) + (a × c).'
          }
        ]
      },
      {
        id: 'math-topic-2',
        subjectId: 'mathematics',
        subjectName: 'Mathematics',
        topicNumber: '02',
        title: 'Fractions, Decimals, Percentages & Misconceptions',
        readTime: '13 min read · High Yield',
        dcarClassRange: 'Class 4 to 7 STBB / DCAR Competencies',
        summary: 'Pedagogical didactics for rational numbers: proper, improper, mixed fractions, equivalent fractions, decimals, and percentage relationships. Tackles the dominant misconception of "whole number bias" (e.g., believing 1/8 is larger than 1/4 because 8 > 4).',
        highYieldAlert: '🚨 EXAM ALERT: "Whole Number Bias" is the most tested error in elementary math. Students transfer whole number rules to fractions. Remediation requires fraction bars and benchmark numbers (0, 1/2, 1) rather than rote cross-multiplication rules.',
        didacticStrategy: {
          frameworkName: 'Visual Fraction Models & Benchmark Fraction Strategy',
          creatorOrOrigin: 'Rational Number Project & DCAR Curriculum',
          coreStages: [
            '1. Area Model: Equal sharing of circular pizzas and rectangular brownies.',
            '2. Linear / Measurement Model: Placing fractions on continuous number lines between 0 and 1.',
            '3. Set Model: Identifying fractional parts of discrete collections (e.g. 3 red marbles out of 10).'
          ],
          classroomImplementation: 'Fold paper strips into halves, fourths, and eighths. Students compare physical lengths of 1/4 vs 1/8 to establish that increasing the denominator splits the whole into smaller pieces.',
          commonStudentMisconception: 'Adding across denominators: 1/3 + 2/5 = 3/8 (adding numerators and denominators directly).',
          diagnosticIntervention: 'Use visual grid models to prove that fractions cannot be added unless their partitioned unit sizes (common denominators) are identical.'
        },
        keyFormulasOrRules: [
          'Equivalent Fractions: a/b = (a × k) / (b × k) where k ≠ 0',
          'Fraction Addition: a/c + b/c = (a + b) / c (only when denominators are identical)',
          'Fraction Division (Reciprocal): (a/b) ÷ (c/d) = (a/b) × (d/c)',
          'Decimal-Percent Conversion: 0.75 = 75/100 = 75%'
        ],
        concepts: [
          {
            conceptTitle: '1. Rational Number Conceptual Models',
            explanation: 'Fractions represent multiple meanings: part-whole, measure on a scale, quotient (division), operator (scaling), and ratio. Limiting teaching to only pizza slices weakens students’ comprehension of rational numbers.',
            keyTerms: [
              { term: 'Numerator', definition: 'Specifies the number of equal parts being considered.' },
              { term: 'Denominator', definition: 'Specifies the total number of equal parts into which the whole unit is divided.' },
              { term: 'Reciprocal (Multiplicative Inverse)', definition: 'The fraction inverted so their product equals 1 (e.g. reciprocal of 3/4 is 4/3).' }
            ],
            bulletPoints: [
              'Fraction division is conceptually asking: "How many copies of fraction B fit inside fraction A?"',
              'Decimals are an extension of base-10 place value to the right of the decimal point (tenths, hundredths, thousandths).'
            ]
          }
        ],
        comparisonTable: {
          title: 'Comparing Fraction Representations',
          headers: ['Model Type', 'Visual Tool', 'Best For Teaching', 'Common Pitfall'],
          rows: [
            ['Area Model', 'Circular pies, rectangular grids', 'Part-whole concepts & proper fractions', 'Difficult for students to draw equal circular slices'],
            ['Linear Model', 'Number lines, fraction bars', 'Fraction magnitude, ordering & decimals', 'Students confuse point markers with lengths'],
            ['Set Model', 'Counters, colored beads', 'Fraction of a group (e.g. 1/3 of 12)', 'Students treat individual items as wholes']
          ]
        },
        classroomApplication: 'Sindh Class 5 lesson on ordering 2/3, 3/4, and 5/6: Teacher guides students to use benchmark comparisons (how close is each fraction to 1 whole?) rather than tedious cross-multiplication, developing true number sense.',
        mnemonicAid: '🧠 "Keep, Change, Flip (KCF)" for fraction division: Keep first fraction, Change division to multiplication, Flip second fraction into its reciprocal.',
        frequentExamQuestions: [
          {
            question: 'Why do elementary students frequently believe that 1/8 is greater than 1/4?',
            answer: 'Due to "Whole Number Bias", because 8 is larger than 4 in whole number systems.'
          }
        ],
        quickQuiz: [
          {
            id: 'm-q3',
            question: 'When solving 1/2 ÷ 1/4, the conceptual meaning of the operation is:',
            options: [
              'Half of one-fourth of a circle',
              'How many groups of 1/4 fit inside 1/2?',
              'Adding 1/2 four times',
              'Subtracting 1/4 from 1/2'
            ],
            correctIndex: 1,
            explanation: 'Quotitive division asks how many divisor units are contained within the dividend. There are two one-fourths inside one-half (Answer: 2).'
          }
        ]
      },
      {
        id: 'math-topic-3',
        subjectId: 'mathematics',
        subjectName: 'Mathematics',
        topicNumber: '03',
        title: 'Geometry, Van Hiele Levels & Spatial Didactics',
        readTime: '13 min read · High Yield',
        dcarClassRange: 'Class 3 to 8 STBB / DCAR Competencies',
        summary: 'Spatial reasoning and geometric pedagogy based on Pierre & Dina Van Hiele’s geometric thinking levels (Visualization, Analysis, Abstraction/Informal Deduction, Deduction, Rigor). Covers shapes, angles, triangles, polygons, geoboards, and measurement.',
        highYieldAlert: '🚨 EXAM ALERT: Van Hiele Levels are strictly sequential. A student at Level 0 (Visualization: "It’s a rectangle because it looks like a door") cannot understand hierarchical definitions at Level 2 (Abstraction: "A square is a special type of rectangle"). Instruction must match the student’s current Van Hiele level.',
        didacticStrategy: {
          frameworkName: 'Van Hiele Model of Geometric Thought',
          creatorOrOrigin: 'Pierre van Hiele and Dina van Hiele-Geldof',
          coreStages: [
            'Level 0 (Visualization / Pre-recognition): Shapes recognized only by overall physical appearance.',
            'Level 1 (Analysis / Descriptive): Shapes analyzed by properties (e.g. rectangles have 4 right angles and equal opposite sides).',
            'Level 2 (Abstraction / Informal Deduction): Logical relationships between properties and shape hierarchies understood (all squares are rectangles).',
            'Level 3 (Formal Deduction): Axiomatic proofs and theorems (high school level).',
            'Level 4 (Rigor): Non-Euclidean geometries (university level).'
          ],
          classroomImplementation: 'Use geoboards with rubber bands and tangram puzzles in Class 4–6 to construct shapes and explore rotations, symmetry, and diagonals.',
          commonStudentMisconception: 'Orientation Bias: Believing that a square rotated 45 degrees is "no longer a square, but a diamond".',
          diagnosticIntervention: 'Have students measure side lengths and angles with rulers and protractors after rotating cardboard shapes.'
        },
        keyFormulasOrRules: [
          'Sum of interior angles of a triangle = 180°',
          'Sum of interior angles of an n-sided polygon = (n - 2) × 180°',
          'Perimeter of Rectangle = 2 × (Length + Width); Area = Length × Width',
          'Area of Triangle = 1/2 × Base × Height; Area of Circle = πr² (Circumference = 2πr)'
        ],
        concepts: [
          {
            conceptTitle: '1. Van Hiele Hierarchy & Geometry Didactics',
            explanation: 'Geometric development depends on instruction and experience rather than biological age. Students must progress through exploratory hands-on activities to ascend the Van Hiele levels.',
            keyTerms: [
              { term: 'Van Hiele Level 0 (Visualization)', definition: 'Judging shapes holistically based on appearance without analyzing geometric components.' },
              { term: 'Van Hiele Level 1 (Analysis)', definition: 'Identifying individual geometric properties (sides, vertices, angles) of shapes.' },
              { term: 'Van Hiele Level 2 (Informal Deduction)', definition: 'Understanding property hierarchies and minimal sufficient conditions for shapes.' }
            ],
            bulletPoints: [
              'Do not present formal deductive proofs to students who have not mastered property analysis.',
              'Tangrams foster spatial visualization and conservation of area across composite shapes.'
            ]
          }
        ],
        comparisonTable: {
          title: 'Van Hiele Levels Applied to Class 1–8 DCAR Geometry',
          headers: ['Level', 'Name', 'Student Thinking', 'DCAR Target Class'],
          rows: [
            ['Level 0', 'Visualization', '"It is a rectangle because it looks like a door."', 'Classes 1–3'],
            ['Level 1', 'Analysis', '"It has 4 sides, opposite sides are parallel and all angles are 90°."', 'Classes 4–5'],
            ['Level 2', 'Informal Deduction', '"Because a square has all properties of a rectangle, all squares are rectangles."', 'Classes 6–8']
          ]
        },
        classroomApplication: 'Teaching triangle angle sum (180°): Teacher has Class 6 students cut out cardboard triangles, tear off the 3 corner angles, and arrange them side by side along a straight ruler edge to visually prove they form a 180° straight line.',
        mnemonicAid: '🧠 "V-A-I-D-R" (Van Hiele): Visualization, Analysis, Informal deduction, Deduction, Rigor.',
        frequentExamQuestions: [
          {
            question: 'At which Van Hiele level does a student recognize that a square is a special type of rectangle?',
            answer: 'Level 2: Abstraction / Informal Deduction.'
          }
        ],
        quickQuiz: [
          {
            id: 'm-q4',
            question: 'A Class 3 student says a shape is a triangle "because it looks like an ice-cream cone". According to Van Hiele, this student is operating at:',
            options: ['Level 0: Visualization', 'Level 1: Analysis', 'Level 2: Informal Deduction', 'Level 3: Formal Deduction'],
            correctIndex: 0,
            explanation: 'At Level 0 (Visualization), learners identify shapes solely by holistic visual resemblance to everyday objects.'
          }
        ]
      },
      {
        id: 'math-topic-4',
        subjectId: 'mathematics',
        subjectName: 'Mathematics',
        topicNumber: '04',
        title: 'Pre-Algebra, Ratio, Proportion & Polya’s Problem Solving',
        readTime: '13 min read · High Yield',
        dcarClassRange: 'Class 5 to 8 STBB / DCAR Competencies',
        summary: 'Algebraic thinking as generalized arithmetic: variables, algebraic expressions, linear equations, ratios, unitary method, and George Polya’s classic 4-step problem-solving heuristic.',
        highYieldAlert: '🚨 EXAM ALERT: George Polya’s 4 Steps of Problem Solving: 1) Understand the Problem, 2) Devise a Plan, 3) Carry out the Plan, 4) Look Back (Reflect/Verify). Step 4 is most frequently skipped by students and most tested by examiners.',
        didacticStrategy: {
          frameworkName: 'George Polya’s 4-Step Problem-Solving Heuristic',
          creatorOrOrigin: 'George Pólya (How to Solve It, 1945)',
          coreStages: [
            '1. Understand the problem: What is known? What is unknown? Restate in own words.',
            '2. Devise a plan: Draw a picture, find a pattern, work backward, write an equation, guess and check.',
            '3. Carry out the plan: Execute the chosen mathematical strategy step by step.',
            '4. Look back (Check & Reflect): Is the answer reasonable? Can you solve it differently?'
          ],
          classroomImplementation: 'In a Class 7 algebra lesson on 3x + 5 = 26, the teacher models Polya’s steps by first using a balance scale metaphor where equal operations are applied to both pans to maintain equilibrium.',
          commonStudentMisconception: 'Equal sign viewed strictly as "an operational command to calculate" (e.g. 5 + 3 = ?) rather than an equivalence relation.',
          diagnosticIntervention: 'Use balance scales and open equations like 7 + 5 = ___ + 4 to reinforce relational thinking.'
        },
        keyFormulasOrRules: [
          'Direct Proportion: y = kx  or  x1/y1 = x2/y2',
          'Inverse Proportion: x × y = k  or  x1 × y1 = x2 × y2',
          'Linear Equation balancing: What is done to one side must be done to the other side.'
        ],
        concepts: [
          {
            conceptTitle: '1. Relational Equality & Algebraic Thinking',
            explanation: 'Algebraic thinking transitions students from arithmetic calculation to spotting structures, patterns, and functional covariation.',
            keyTerms: [
              { term: 'Relational Equal Sign', definition: 'Viewing "=" as a balance scale indicating both expressions have the same quantitative value.' },
              { term: 'Variable as Unknown vs. Covarying Quantity', definition: 'In 2x + 4 = 10, x is a single unknown; in y = 2x, x and y vary together.' }
            ],
            bulletPoints: [
              'Use the Unitary Method (finding the value of 1 unit first) to solve real-world Sindh rate and ratio problems.',
              'Polya’s "Look Back" step builds metacognition and error detection.'
            ]
          }
        ],
        comparisonTable: {
          title: 'Direct vs. Inverse Proportion (DCAR Class 7–8)',
          headers: ['Type', 'Relationship', 'Equation', 'Sindh Real-World Example'],
          rows: [
            ['Direct Proportion', 'As one variable increases, the other increases proportionally', 'y / x = k', 'Cost of wheat per kilogram; distance traveled at constant speed'],
            ['Inverse Proportion', 'As one variable increases, the other decreases proportionally', 'x × y = k', 'Number of canal excavation workers vs. days to finish work']
          ]
        },
        classroomApplication: 'Solving multi-step unitary problems: "If 12 laborers can build a school wall in 6 days, how many days will 8 laborers take?" Guide students to recognize inverse proportion (Worker-days = 12 × 6 = 72; Days for 8 workers = 72 ÷ 8 = 9 days).',
        mnemonicAid: '🧠 "UDCL" (Polya): Understand, Devise plan, Carry out, Look back.',
        frequentExamQuestions: [
          {
            question: 'What are the four steps in George Polya’s mathematical problem-solving model?',
            answer: '1. Understand the problem, 2. Devise a plan, 3. Carry out the plan, 4. Look back (Check & Reflect).'
          }
        ],
        quickQuiz: [
          {
            id: 'm-q5',
            question: 'In George Polya’s 4-step problem-solving heuristic, during which phase does a student check whether the calculated solution is reasonable and can be derived by another method?',
            options: ['Devise a Plan', 'Carry out the Plan', 'Understand the Problem', 'Look Back (Reflect)'],
            correctIndex: 3,
            explanation: 'The "Look Back" phase focuses on verifying the solution, checking reasonableness, and reflecting on alternative pathways.'
          }
        ]
      },
      {
        id: 'math-topic-5',
        subjectId: 'mathematics',
        subjectName: 'Mathematics',
        topicNumber: '05',
        title: 'Mathematics Assessment, Error Analysis & Math Anxiety',
        readTime: '12 min read · High Yield',
        dcarClassRange: 'Class 1 to 8 STBB / DCAR Competencies',
        summary: 'Formative assessment in math: diagnostic interviews, open-ended tasks, error analysis (slips vs bugs vs conceptual errors), and mitigating math anxiety through growth mindset.',
        highYieldAlert: '🚨 EXAM ALERT: Differentiate between a "Slip" (careless calculation error despite knowing concept) and a "Bug" (systematic faulty algorithm applied consistently). Remediation for a bug requires unlearning and conceptual retraining, not more drill worksheets.',
        didacticStrategy: {
          frameworkName: 'Diagnostic Error Analysis & Number Talks',
          creatorOrOrigin: 'Robert Ashlock & Jo Boaler',
          coreStages: [
            '1. Error Identification: Collecting student work to identify pattern of mistakes.',
            '2. Classification: Categorizing as slip (careless), procedural bug, or conceptual deficit.',
            '3. Student Interview: Asking student to think aloud during problem-solving.',
            '4. Targeted Conceptual Remediation: Using CRA manipulatives to re-anchor understanding.'
          ],
          classroomImplementation: 'Conducting 10-minute daily "Number Talks" where students solve mental arithmetic problems and articulate different calculation pathways on the board.',
          commonStudentMisconception: 'Math Anxiety belief: "I do not have a math brain; fast recall is the only indicator of math intelligence."',
          diagnosticIntervention: 'Emphasize growth mindset, celebrate productive struggle, and value creative alternative solutions over speed.'
        },
        keyFormulasOrRules: [
          'Formative Assessment in Math: Ongoing diagnostic checks to guide teaching.',
          'Error Hierarchy: Slips (Careless) < Procedural Bugs (Faulty algorithm) < Conceptual Deficits (Missing schema).'
        ],
        concepts: [
          {
            conceptTitle: '1. Error Analysis & Affective Factors in Mathematics',
            explanation: 'Effective math educators analyze errors as windows into student thinking rather than mere wrong answers.',
            keyTerms: [
              { term: 'Math Anxiety', definition: 'A feeling of tension and fear that interferes with math performance and taxes working memory.' },
              { term: 'Systematic Bug', definition: 'A persistent, rule-governed faulty procedure consistently applied by the student.' }
            ],
            bulletPoints: [
              'Timed tests frequently trigger acute math anxiety in elementary learners.',
              'Rubrics for math should score conceptual understanding, procedural fluency, and problem-solving reasoning separately.'
            ]
          }
        ],
        comparisonTable: {
          title: 'Classifying Math Errors',
          headers: ['Error Type', 'Cause', 'Example', 'Remediation Approach'],
          rows: [
            ['Slip', 'Fatigue, carelessness, rushed work', '7 × 8 = 54 (knows fact but wrote wrong)', 'Encourage checking / proofreading'],
            ['Procedural Bug', 'Flawed learned algorithm', 'Always subtracting smaller from larger', 'Reteach step-by-step with place value'],
            ['Conceptual Deficit', 'Missing underlying mental model', '1/2 + 1/3 = 2/5 (adding across)', 'CRA concrete fraction manipulatives']
          ]
        },
        classroomApplication: 'A teacher replaces weekly speed tests with open-ended diagnostic tasks (e.g. "Find 3 different numbers whose mean is 12"), lowering anxiety and fostering divergent reasoning.',
        mnemonicAid: '🧠 "S-B-C Errors": Slips (Careless), Bugs (Procedural), Conceptual (Core understanding).',
        frequentExamQuestions: [
          {
            question: 'What is the primary pedagogical difference between a mathematical "Slip" and a "Systematic Error (Bug)"?',
            answer: 'A slip is an occasional careless lapse that the student can self-correct; a bug is a persistent, flawed procedure applied consistently that requires instructional re-teaching.'
          }
        ],
        quickQuiz: [
          {
            id: 'm-q6',
            question: 'When a student consistently solves 34 + 28 = 512 by writing the sum of 4+8 (12) directly without regrouping, this represents:',
            options: ['A careless slip', 'A systematic procedural bug rooted in place value deficit', 'Random guessing', 'Visual dyslexia'],
            correctIndex: 1,
            explanation: 'This is a systematic procedural error (bug) showing that the student has not internalized place value regrouping.'
          }
        ]
      }
    ]
  },
  {
    id: 'science',
    name: 'Science (Pedagogical Content Knowledge)',
    shortName: 'General Science',
    category: 'Pedagogical Content Knowledge',
    weightagePercent: 10,
    marks: 10,
    mcqCount: 10,
    targetLevel: 'Class 1 to 8 DCAR & STBB Aligned · BPS-16 & BPS-17',
    iconName: 'Atom',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-700',
    badgeBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    badgeText: 'text-emerald-600 dark:text-emerald-400',
    curriculumBenchmark: 'DCAR Sindh School Curriculum Class 1–8: Life Sciences, Physical Sciences, Earth & Space & Inquiry Didactics',
    description: 'Pedagogical content knowledge in General Science: 5E Inquiry Model, POE (Predict-Observe-Explain) technique, science discrepant events, addressing teleological and intuitive misconceptions, hands-on inquiry, and laboratory safety in Sindh elementary schools.',
    topics: [
      {
        id: 'sci-topic-1',
        subjectId: 'science',
        subjectName: 'General Science',
        topicNumber: '01',
        title: 'Living Things, Human Systems & Inquiry Didactics',
        readTime: '14 min read · High Yield',
        dcarClassRange: 'Class 1 to 8 STBB / DCAR Competencies',
        summary: 'Life sciences curriculum from Class 1–8: Five Kingdoms of living things, vertebrates vs invertebrates, plant vs animal cells, human organ systems (digestive, respiratory, circulatory), photosynthesis, and inquiry-based biology didactics.',
        highYieldAlert: '🚨 STEDA EXAM TRAP: Teleological misconceptions (e.g. "Giraffes stretched their necks to reach high leaves because they wanted to") are common among students. Science teachers must explicitly teach natural selection and structural adaptation rather than purposeful intent.',
        didacticStrategy: {
          frameworkName: 'Inquiry-Based Biological Observation & Comparative Dissection',
          creatorOrOrigin: 'DCAR Science Curriculum & BSCS Biology',
          coreStages: [
            '1. Concrete specimen observation with hand lenses / microscopes.',
            '2. Interactive Dichotomous Key classification.',
            '3. Comparative anatomical modeling (modeling organ systems).',
            '4. Ecological impact investigation in Sindh environments.'
          ],
          classroomImplementation: 'In Class 5 Classification unit, students examine local leaves and flowers, using dichotomous keys to categorize monocots vs dicots based on leaf venation (parallel vs net-like) and seed cotyledons.',
          commonStudentMisconception: 'Believing that plants carry out photosynthesis during the day and respiration ONLY at night, or that plants do not respire at all.',
          diagnosticIntervention: 'Teach that plant respiration (aerobic cellular respiration) occurs continuously 24 hours a day to sustain cellular metabolism, while photosynthesis occurs only in the presence of light.'
        },
        keyFormulasOrRules: [
          'Photosynthesis: 6CO2 + 6H2O + Light Energy -> C6H12O6 + 6O2',
          'Cellular Respiration: C6H12O6 + 6O2 -> 6CO2 + 6H2O + ATP (Energy)',
          '5 Kingdoms: Monera, Protista, Fungi, Plantae, Animalia (Whittaker System)'
        ],
        concepts: [
          {
            conceptTitle: '1. Cellular Foundations & Five Kingdoms',
            explanation: 'The Whittaker 5-kingdom classification organizes living organisms based on cellular structure (prokaryotic vs eukaryotic), body organization (unicellular vs multicellular), and mode of nutrition.',
            keyTerms: [
              { term: 'Prokaryote vs. Eukaryote', definition: 'Prokaryotes lack a membrane-bound nucleus (Bacteria); Eukaryotes possess a true membrane-bound nucleus.' },
              { term: 'Monocotyledon vs. Dicotyledon', definition: 'Monocots: 1 cotyledon, parallel venation, fibrous roots (Wheat, Maize). Dicots: 2 cotyledons, net venation, taproot (Gram, Mango).' },
              { term: 'Vertebrates vs. Invertebrates', definition: 'Vertebrates possess a vertebral column/backbone (Fish, Amphibians, Reptiles, Birds, Mammals); Invertebrates do not.' }
            ],
            bulletPoints: [
              'Plant cells possess a rigid cellulose cell wall, large central vacuole, and chloroplasts; animal cells lack cell walls and chloroplasts.',
              'Human digestive system progression: Mouth -> Esophagus -> Stomach -> Small Intestine (nutrient absorption via villi) -> Large Intestine -> Rectum.'
            ]
          }
        ],
        comparisonTable: {
          title: 'Monocots vs. Dicots (DCAR Class 5 STBB Science)',
          headers: ['Feature', 'Monocotyledons (Monocots)', 'Dicotyledons (Dicots)'],
          rows: [
            ['Seed Cotyledons', 'Single cotyledon (e.g. Wheat, Maize, Rice)', 'Two cotyledons (e.g. Gram, Pea, Bean)'],
            ['Leaf Venation', 'Parallel venation', 'Reticulate / Net-like venation'],
            ['Root System', 'Fibrous root system', 'Taproot system'],
            ['Floral Parts', 'Multiples of 3 (trimerous)', 'Multiples of 4 or 5 (tetramerous/pentamerous)']
          ]
        },
        classroomApplication: 'Class 6 Human Respiration model: Teacher guides students to build a lung model using a plastic bottle, drinking straw, and two rubber balloons to demonstrate how downward diaphragm contraction creates negative pressure that inflates lungs.',
        mnemonicAid: '🧠 5 Vertebrate Classes: "FARM-B" -> Fish, Amphibians, Reptiles, Mammals, Birds.',
        frequentExamQuestions: [
          {
            question: 'Do plants respire during daylight hours when photosynthesis is actively occurring?',
            answer: 'Yes. Cellular respiration occurs continuously day and night in all living plant cells.'
          }
        ],
        quickQuiz: [
          {
            id: 's-q1',
            question: 'Which of the following characteristics distinguishes a Monocotyledonous plant from a Dicotyledonous plant?',
            options: ['Presence of flower petals', 'Parallel leaf venation and fibrous roots', 'Presence of chlorophyll', 'Ability to produce seeds'],
            correctIndex: 1,
            explanation: 'Monocots are characterized by parallel leaf venation, single cotyledon, and fibrous roots (e.g. wheat, rice, corn).'
          }
        ]
      },
      {
        id: 'sci-topic-2',
        subjectId: 'science',
        subjectName: 'General Science',
        topicNumber: '02',
        title: 'Matter, States, Energy & The 5E Inquiry Model',
        readTime: '14 min read · High Yield',
        dcarClassRange: 'Class 4 to 8 STBB / DCAR Competencies',
        summary: 'Particle kinetic theory of matter (solids, liquids, gases), phase changes, heat transfer (conduction, convection, radiation), mixtures vs compounds, and applying the POE (Predict-Observe-Explain) didactic strategy.',
        highYieldAlert: '🚨 EXAM ALERT: Predict-Observe-Explain (POE) is designed to surface and challenge scientific misconceptions. Students must record their written PREDICTION and rationale BEFORE observing the discrepant demonstration.',
        didacticStrategy: {
          frameworkName: 'Predict-Observe-Explain (POE) & Discrepant Events',
          creatorOrOrigin: 'Richard White and Richard Gunstone (1992)',
          coreStages: [
            '1. Predict: Students predict the outcome of a demonstration and write their scientific reasoning.',
            '2. Observe: Students observe the phenomenon (often a discrepant event that contradicts naive intuition).',
            '3. Explain: Students reconcile cognitive conflict between prediction and observation.'
          ],
          classroomImplementation: 'Submerging a tissue paper wad inside an upside-down drinking glass into a water tub: Students predict the tissue will get soaked. Observing it stays dry generates cognitive dissonance, leading to explanation of air taking up space and exerting pressure.',
          commonStudentMisconception: 'Believing that cold is a physical entity that flows into an object (e.g., "The refrigerator puts coldness into the water").',
          diagnosticIntervention: 'Teach that heat is thermal kinetic energy that flows from higher temperature to lower temperature; "cooling" is the removal of heat energy.'
        },
        keyFormulasOrRules: [
          'Kinetic Energy of Particles: Increases directly with temperature.',
          'Conduction: Heat transfer in solids through particle collisions.',
          'Convection: Heat transfer in fluids (liquids & gases) via mass density currents.',
          'Radiation: Heat transfer via electromagnetic waves (requires no medium).'
        ],
        concepts: [
          {
            conceptTitle: '1. Particle Theory & Phase Transformations',
            explanation: 'All matter is composed of tiny particles in continuous motion. Temperature is a measure of the average kinetic energy of these particles.',
            keyTerms: [
              { term: 'Sublimation', definition: 'Direct phase transition from solid to gas without passing through the liquid phase (e.g. Dry ice, Camphor/Naphthalene).' },
              { term: 'Physical vs. Chemical Change', definition: 'Physical change does not alter chemical identity and is usually reversible (ice melting); Chemical change produces new substances (rusting of iron).' }
            ],
            bulletPoints: [
              'Mass is conserved during both physical and chemical changes (Law of Conservation of Mass).',
              'Evaporation is a cooling process that occurs only at the surface at any temperature; boiling occurs throughout the liquid at a fixed boiling point.'
            ]
          }
        ],
        comparisonTable: {
          title: 'Three States of Matter (Particle Theory)',
          headers: ['Property', 'Solid', 'Liquid', 'Gas'],
          rows: [
            ['Particle Arrangement', 'Tightly packed in fixed regular lattice', 'Closely packed but irregular, can slide', 'Very far apart, random arrangement'],
            ['Particle Movement', 'Vibrate in fixed positions', 'Slide past one another', 'Move rapidly in all directions'],
            ['Shape & Volume', 'Definite shape and definite volume', 'Indefinite shape, definite volume', 'Indefinite shape, indefinite volume'],
            ['Compressibility', 'Incompressible', 'Virtually incompressible', 'Highly compressible']
          ]
        },
        classroomApplication: 'Teaching Convection Currents: Teacher places potassium permanganate crystal at the bottom of a water beaker over a candle. Students observe purple currents rising and cooler water descending, demonstrating convection in Sindh weather phenomena.',
        mnemonicAid: '🧠 Heat Transfer: "CCR" -> Conduction (Contact), Convection (Currents), Radiation (Rays).',
        frequentExamQuestions: [
          {
            question: 'During evaporation, why does the temperature of the remaining liquid decrease?',
            answer: 'Because the most energetic particles with the highest kinetic energy escape from the surface, lowering the average kinetic energy of the remaining liquid.'
          }
        ],
        quickQuiz: [
          {
            id: 's-q2',
            question: 'A science teacher introduces a demonstration by asking students to write down what will happen before conducting it. Which didactic strategy is being used?',
            options: ['Rote Memorization', 'Predict-Observe-Explain (POE)', 'Direct Verification Drill', 'Passive Audio-Visual Lecture'],
            correctIndex: 1,
            explanation: 'The POE (Predict-Observe-Explain) strategy requires students to commit to a prediction before witnessing the scientific event to challenge prior misconceptions.'
          }
        ]
      },
      {
        id: 'sci-topic-3',
        subjectId: 'science',
        subjectName: 'General Science',
        topicNumber: '03',
        title: 'Force, Motion & Simple Machines Didactics',
        readTime: '13 min read · High Yield',
        dcarClassRange: 'Class 5 to 8 STBB / DCAR Competencies',
        summary: 'Newton’s three laws of motion, friction, gravity, speed and velocity, mechanical advantage of simple machines (levers, pulleys, inclined planes, wheel and axle), and practical classroom demonstrations.',
        highYieldAlert: '🚨 EXAM ALERT: Aristotelian Misconception: Students intuitively believe that "constant motion requires a continuous force". Newton’s 1st Law (Inertia) proves that an object maintains constant velocity UNLESS acted on by an unbalanced net external force. Friction is that external force!',
        didacticStrategy: {
          frameworkName: 'Hands-on Mechanical Advantage Investigations',
          creatorOrOrigin: 'DCAR Middle School Science Curriculum',
          coreStages: [
            '1. Qualitative experience of effort reduction using everyday levers (scissors, wheelbarrow, tongs).',
            '2. Identifying Fulcrum, Load (Resistance), and Effort positions.',
            '3. Quantitative testing: Work Input = Work Output (ignoring friction).',
            '4. Real-world machine audits in local community.'
          ],
          classroomImplementation: 'Using a wooden plank and spring balance, students pull a toy cart vertically vs. along an inclined plane to observe that inclined planes reduce the required effort force over a longer distance.',
          commonStudentMisconception: 'Believing that simple machines multiply both force and work simultaneously (violating conservation of energy).',
          diagnosticIntervention: 'Demonstrate that while a machine can multiply force, it increases the distance required; total work (Force × Distance) remains constant or increases due to friction.'
        },
        keyFormulasOrRules: [
          'Speed = Distance / Time; Velocity = Displacement / Time',
          'Newton’s 2nd Law: Force = Mass × Acceleration (F = ma)',
          'Mechanical Advantage (MA) = Load / Effort = Output Force / Input Force',
          'Work Done = Force × Distance moved in direction of force (W = F × d)'
        ],
        concepts: [
          {
            conceptTitle: '1. Newton’s Laws & Simple Machine Classes',
            explanation: 'Forces cause changes in velocity (acceleration), not motion itself. Simple machines make work easier by trading force for distance.',
            keyTerms: [
              { term: 'Inertia (Newton 1st Law)', definition: 'The resistance of any physical object to any change in its velocity or state of rest.' },
              { term: 'Class 1 Lever', definition: 'Fulcrum is positioned between Effort and Load (e.g. Crowbar, Scissors, Seesaw).' },
              { term: 'Class 2 Lever', definition: 'Load is positioned between Fulcrum and Effort (e.g. Wheelbarrow, Nutcracker, Bottle opener).' },
              { term: 'Class 3 Lever', definition: 'Effort is positioned between Fulcrum and Load (e.g. Tweezers, Human forearm, Tongs).' }
            ],
            bulletPoints: [
              'Class 2 levers always provide a Mechanical Advantage greater than 1.',
              'Class 3 levers provide Mechanical Advantage less than 1, but increase distance and speed.'
            ]
          }
        ],
        comparisonTable: {
          title: 'Three Classes of Levers (DCAR Class 6 STBB)',
          headers: ['Class', 'Middle Component', 'Mechanical Advantage', 'Everyday Sindh Examples'],
          rows: [
            ['Class 1', 'Fulcrum in middle (E-F-L)', 'Can be < 1, = 1, or > 1', 'Scissors, pliers, seesaw, pump handle'],
            ['Class 2', 'Load in middle (F-L-E)', 'Always > 1 (Force multiplier)', 'Wheelbarrow, nutcracker, paper guillotine'],
            ['Class 3', 'Effort in middle (F-E-L)', 'Always < 1 (Speed/Distance multiplier)', 'Tweezers, broom, fishing rod, tongs']
          ]
        },
        classroomApplication: 'Classroom demonstration: Placing an index card over a glass with a coin on top; flicking the card horizontally causes the coin to drop straight into the glass due to inertia (Newton’s 1st Law).',
        mnemonicAid: '🧠 "FLE 1-2-3": 1 = Fulcrum in middle, 2 = Load in middle, 3 = Effort in middle.',
        frequentExamQuestions: [
          {
            question: 'In a wheelbarrow, which component is situated between the fulcrum (wheel axle) and the effort (handles)?',
            answer: 'The Load (Class 2 lever).'
          }
        ],
        quickQuiz: [
          {
            id: 's-q3',
            question: 'A pair of scissors is an example of which class of lever?',
            options: ['Class 1 lever (Fulcrum in middle)', 'Class 2 lever (Load in middle)', 'Class 3 lever (Effort in middle)', 'Compound pulley'],
            correctIndex: 0,
            explanation: 'Scissors have the central pivot pin (fulcrum) between the handle loops (effort) and the blades (load), making it a Class 1 lever.'
          }
        ]
      },
      {
        id: 'sci-topic-4',
        subjectId: 'science',
        subjectName: 'General Science',
        topicNumber: '04',
        title: 'Earth, Environment, Water Cycle & Sindh Ecosystems',
        readTime: '13 min read · High Yield',
        dcarClassRange: 'Class 4 to 8 STBB / DCAR Competencies',
        summary: 'Earth structure (Crust, Mantle, Core), tectonic plates, water cycle stages, Indus River ecosystem, wetlands, deforestation, climate change in Sindh, and environmental stewardship.',
        highYieldAlert: '🚨 EXAM ALERT: The Water Cycle is powered primarily by Solar Radiation and Gravity. Transpiration is water loss from plant stomata, contributing up to 10% of atmospheric moisture.',
        didacticStrategy: {
          frameworkName: 'Local Environmental Case Studies & Field Inquiry',
          creatorOrOrigin: 'DCAR Environmental Education Guidelines',
          coreStages: [
            '1. Local environmental mapping (Canals, Indus River basin, Thar desert ecosystems).',
            '2. Field water sampling and turbidity/pH testing.',
            '3. Cause-and-effect analysis of human anthropogenic impacts.',
            '4. Community environmental action projects.'
          ],
          classroomImplementation: 'Creating a mini-terrarium in a sealed clear plastic container to observe condensation, precipitation, and the water cycle in closed equilibrium.',
          commonStudentMisconception: 'Believing that water vapor in the air comes only from boiling water and is visible as steam.',
          diagnosticIntervention: 'Clarify that water vapor is an invisible gas; "clouds" and "steam" are condensed liquid droplets suspended in air.'
        },
        keyFormulasOrRules: [
          'Water Cycle: Evaporation + Transpiration -> Condensation -> Precipitation -> Infiltration / Runoff',
          'Atmospheric composition: 78% Nitrogen, 21% Oxygen, 0.9% Argon, 0.04% Carbon Dioxide'
        ],
        concepts: [
          {
            conceptTitle: '1. Earth Spheres & Ecological Equilibrium',
            explanation: 'The Earth operates as a unified system of interacting spheres: Atmosphere, Hydrosphere, Lithosphere, and Biosphere.',
            keyTerms: [
              { term: 'Hydrological Cycle', definition: 'The continuous movement of water on, above, and below the surface of the Earth.' },
              { term: 'Sindh Ramsar Wetland Sites', definition: 'Internationally protected wetlands in Sindh (e.g. Keenjhar Lake, Haleji Lake, Indus Dolphin Reserve).' }
            ],
            bulletPoints: [
              'Groundwater depletion in urban Sindh is driven by over-extraction and reduced recharge.',
              'Mangrove forests in the Indus Delta protect coastlines from storm surges and serve as fish nurseries.'
            ]
          }
        ],
        comparisonTable: {
          title: 'Processes of the Water Cycle',
          headers: ['Process', 'Phase Change', 'Energy Transfer', 'Environmental Role'],
          rows: [
            ['Evaporation', 'Liquid -> Gas', 'Absorbs heat energy', 'Moves water from oceans/rivers to atmosphere'],
            ['Transpiration', 'Liquid -> Gas (from plants)', 'Absorbs heat energy', 'Pulls minerals through xylem & cools plant'],
            ['Condensation', 'Gas -> Liquid', 'Releases latent heat', 'Forms clouds, fog, and dew'],
            ['Precipitation', 'Liquid / Solid falls', 'Gravity driven', 'Replenishes freshwater aquifers, rivers & soil']
          ]
        },
        classroomApplication: 'Investigating water contamination in Sindh: Class 7 students test water samples from tap, canal, and boiling water, testing filtration methods using sand, gravel, and charcoal filters.',
        mnemonicAid: '🧠 "ETCP-R": Evaporation, Transpiration, Condensation, Precipitation, Runoff.',
        frequentExamQuestions: [
          {
            question: 'What is the biological process through which plants release water vapor into the atmosphere?',
            answer: 'Transpiration (through microscopic leaf pores called stomata).'
          }
        ],
        quickQuiz: [
          {
            id: 's-q4',
            question: 'Which of the following wetland lakes in Sindh is recognized as a Ramsar Wetland of International Importance?',
            options: ['Rawal Lake', 'Keenjhar Lake', 'Saif-ul-Malook Lake', 'Attabad Lake'],
            correctIndex: 1,
            explanation: 'Keenjhar Lake (Thatta, Sindh) and Haleji Lake are globally designated Ramsar wetland sites critical for migratory bird conservation.'
          }
        ]
      },
      {
        id: 'sci-topic-5',
        subjectId: 'science',
        subjectName: 'General Science',
        topicNumber: '05',
        title: 'Scientific Method & Laboratory Safety Didactics',
        readTime: '12 min read · High Yield',
        dcarClassRange: 'Class 1 to 8 STBB / DCAR Competencies',
        summary: 'Scientific methodology (Observation, Hypothesis, Controlled Experiment, Variables, Conclusion), science safety symbols, eyewash/fire blanket protocols, and designing low-cost science experiments.',
        highYieldAlert: '🚨 EXAM ALERT: Experimental Variables: Independent Variable (the 1 factor the scientist deliberately changes), Dependent Variable (the factor measured), Controlled Variables (all factors kept strictly constant to ensure a fair test). Tests frequently ask to identify the independent vs dependent variable.',
        didacticStrategy: {
          frameworkName: 'Fair Test Experimental Design & Science Notebooks',
          creatorOrOrigin: 'DCAR Science Process Skills Standard',
          coreStages: [
            '1. Formulating testable, falsifiable questions.',
            '2. Identifying Independent, Dependent, and Controlled variables.',
            '3. Tabulating quantitative data with SI units.',
            '4. Drawing evidence-based conclusions.'
          ],
          classroomImplementation: 'Testing plant growth under different colored cellophane filters: Students identify Filter Color as Independent Variable, Stem Height Growth as Dependent Variable, and Water/Soil as Controlled Variables.',
          commonStudentMisconception: 'Believing that a hypothesis is just "an educated guess" that becomes a theory, and then becomes a law.',
          diagnosticIntervention: 'Clarify that scientific laws describe natural phenomena (what happens), while scientific theories explain natural phenomena (why it happens); theories never "grow up" to become laws.'
        },
        keyFormulasOrRules: [
          'SI Units: Mass (kg), Length (m), Time (s), Temperature (Kelvin), Volume (m³ / Liter)',
          'Safety Rule: Always add Acid to Water (A&W), NEVER Water to Acid.'
        ],
        concepts: [
          {
            conceptTitle: '1. Variables & Safety Protocols',
            explanation: 'Scientific literacy requires rigorous experimental control and non-negotiable laboratory safety practices.',
            keyTerms: [
              { term: 'Independent Variable', definition: 'The variable manipulated or changed by the experimenter.' },
              { term: 'Dependent Variable', definition: 'The variable measured to observe the effect of the independent variable.' },
              { term: 'Controlled Variable', definition: 'Variables maintained identical across all experimental groups to ensure a fair test.' }
            ],
            bulletPoints: [
              'A valid experiment changes only ONE independent variable at a time.',
              'Low-cost materials (plastic bottles, straws, food coloring) can deliver high-impact DCAR science experiments.'
            ]
          }
        ],
        comparisonTable: {
          title: 'Experimental Variables Matrix',
          headers: ['Variable Type', 'Role in Experiment', 'Example in Plant Study', 'Key Rule'],
          rows: [
            ['Independent Variable', 'What the researcher changes', 'Amount of fertilizer added (0g, 5g, 10g)', 'Only ONE per experiment'],
            ['Dependent Variable', 'What is measured for results', 'Height of plant after 14 days in cm', 'Must be quantifiable and objective'],
            ['Controlled Variables', 'What is kept identical', 'Sunlight, pot size, soil type, water volume', 'Must remain constant for all plants']
          ]
        },
        classroomApplication: 'Setting up elementary lab safety contracts: Students in Class 6 sign safety contracts outlining goggles use, reporting spills, and proper disposal before starting chemistry experiments.',
        mnemonicAid: '🧠 "I-Change, D-Measure": Independent (I change), Dependent (Data measured).',
        frequentExamQuestions: [
          {
            question: 'When investigating the effect of temperature on the rate of sugar dissolving in water, what is the dependent variable?',
            answer: 'The time taken for the sugar to completely dissolve (or dissolving rate).'
          }
        ],
        quickQuiz: [
          {
            id: 's-q5',
            question: 'In an experiment investigating how parachute size affects its falling time, the parachute surface area represents which variable?',
            options: ['Dependent variable', 'Independent variable', 'Controlled variable', 'Extraneous variable'],
            correctIndex: 1,
            explanation: 'The surface area is the parameter intentionally altered by the experimenter to observe its effect, making it the Independent Variable.'
          }
        ]
      }
    ]
  },
  {
    id: 'social-studies',
    name: 'Social Studies (Pedagogical Content Knowledge)',
    shortName: 'Social Studies',
    category: 'Pedagogical Content Knowledge',
    weightagePercent: 10,
    marks: 10,
    mcqCount: 10,
    targetLevel: 'Class 1 to 8 DCAR & STBB Aligned · BPS-16 & BPS-17',
    iconName: 'Globe',
    gradient: 'from-amber-600 via-orange-600 to-rose-700',
    badgeBg: 'bg-amber-500/10 dark:bg-amber-500/20',
    badgeText: 'text-amber-600 dark:text-amber-400',
    curriculumBenchmark: 'DCAR Sindh School Curriculum Class 1–8: Geography, History, Civics & Citizenship & Socratic Didactics',
    description: 'Pedagogical content knowledge in Social Studies: Geography of Sindh and Pakistan, Indus Valley Civilization (Mohenjo-daro), 1973 Constitution & Article 25-A, culture & heritage, Socratic dialogue, primary source analysis, and peace education.',
    topics: [
      {
        id: 'sst-topic-1',
        subjectId: 'social-studies',
        subjectName: 'Social Studies',
        topicNumber: '01',
        title: 'Geography, Cartography & Climatic Regions of Sindh & Pakistan',
        readTime: '13 min read · High Yield',
        dcarClassRange: 'Class 4 to 8 STBB / DCAR Competencies',
        summary: 'Cartographic literacy (map scales, legends, latitude, longitude, coordinates), physical relief of Sindh (Indus Plain, Thar Desert, Kirthar Range), riverine systems, climate zones, and GIS teaching aids.',
        highYieldAlert: '🚨 EXAM ALERT: Map Essentials: "TODALS" (Title, Orientation, Date, Author, Legend, Scale). When teaching latitude and longitude, Latitude lines run East-West but measure distance North-South of Equator; Longitude lines run North-South but measure distance East-West of Prime Meridian.',
        didacticStrategy: {
          frameworkName: 'Inquiry-Based Cartographic & Geographic Spatial Analysis',
          creatorOrOrigin: 'National Council for the Social Studies (NCSS) & DCAR',
          coreStages: [
            '1. Physical tactile globe examination (Equator, Hemispheres, Tropics).',
            '2. Grid coordinate decoding using classroom desk coordinates.',
            '3. Topographic and thematic map interpretation (Rainfall, Population, Crops).',
            '4. Environmental issue spatial mapping in Sindh.'
          ],
          classroomImplementation: 'Creating a relief map of Sindh using homemade salt-dough or clay: Class 6 students mold the Kirthar Mountains on the western border, the central Indus plain, and the eastern Thar desert.',
          commonStudentMisconception: 'Believing that "North" on a map means "Up in the sky" or that rivers always flow from North to South.',
          diagnosticIntervention: 'Clarify that rivers flow from high elevation to low elevation due to gravity, not based on compass directions (e.g. Nile flows North).'
        },
        keyFormulasOrRules: [
          'Latitude: Equator (0°), Tropic of Cancer (23.5° N - passes through southern Pakistan/India)',
          'Longitude: Prime Meridian (0° Greenwich), International Date Line (180°)',
          'Pakistan Coordinates: Approx. 24° N to 37° N Latitude, and 61° E to 77° E Longitude'
        ],
        concepts: [
          {
            conceptTitle: '1. Cartographic Literacy & Relief Zones of Sindh',
            explanation: 'Geography combines physical environments with human settlement patterns. Understanding Sindh’s unique geography is a core STEDA assessment competency.',
            keyTerms: [
              { term: 'Kirthar Mountain Range', definition: 'The mountain range forming the natural western physical boundary between Sindh and Balochistan (highest peak: Gorakh Hill, approx. 5,688 ft).' },
              { term: 'Indus River (Sindhu Darya)', definition: 'The lifeline of Pakistan and Sindh, feeding three major irrigation barrages in Sindh: Guddu (1962), Sukkur (1932), and Kotri/Ghulam Muhammad (1955).' },
              { term: 'Thar Desert (Registan)', definition: 'The arid desert region occupying the southeastern belt of Sindh (Tharparkar, Umerkot).' }
            ],
            bulletPoints: [
              'Map scale expresses the ratio between distance on the map and actual distance on the ground (Verbal, Graphic bar, Representative Fraction 1:50,000).',
              'Sindh’s climate is largely arid to semi-arid, experiencing extreme summer heat and scanty rainfall.'
            ]
          }
        ],
        comparisonTable: {
          title: 'Three Major Barrages of Sindh on the Indus River',
          headers: ['Barrage Name', 'Location', 'Year of Completion', 'Key Agricultural Function'],
          rows: [
            ['Sukkur Barrage (Lloyd Barrage)', 'Sukkur', '1932 (Pre-independence)', 'Irrigates over 7.6 million acres via 7 major canals'],
            ['Kotri Barrage (Ghulam Muhammad)', 'Jamshoro / Hyderabad', '1955', 'Irrigates Lower Sindh & provides drinking water to Karachi'],
            ['Guddu Barrage', 'Kashmore', '1962', 'Irrigates Upper Sindh (Jacobabad, Larkana, Sukkur) and Balochistan']
          ]
        },
        classroomApplication: 'Teaching Map Coordinates: Teacher labels classroom floor tiles with latitude (A-G) and longitude (1-8). Students locate their desks using coordinate pairs (e.g., C-4), cementing geographic coordinate fluency.',
        mnemonicAid: '🧠 "TODALS" Map Key: Title, Orientation, Date, Author, Legend, Scale.',
        frequentExamQuestions: [
          {
            question: 'What is the highest hill station peak situated in the Kirthar mountain range of Sindh?',
            answer: 'Gorakh Hill (often called the "Murree of Sindh", elevation approx. 5,688 feet).'
          }
        ],
        quickQuiz: [
          {
            id: 'sst-q1',
            question: 'Which of the following irrigation barrages on the River Indus in Sindh was inaugurated earliest in 1932?',
            options: ['Guddu Barrage', 'Kotri Barrage', 'Sukkur Barrage', 'Taunsa Barrage'],
            correctIndex: 2,
            explanation: 'Sukkur Barrage (originally named Lloyd Barrage) was completed in 1932, serving as the monumental foundation of modern Sindh canal irrigation.'
          }
        ]
      },
      {
        id: 'sst-topic-2',
        subjectId: 'social-studies',
        subjectName: 'Social Studies',
        topicNumber: '02',
        title: 'Ancient History, Indus Valley (Mohenjo-daro) & Source Analysis',
        readTime: '13 min read · High Yield',
        dcarClassRange: 'Class 4 to 8 STBB / DCAR Competencies',
        summary: 'The Bronze Age Indus Valley Civilization (Mohenjo-daro & Harappa), urban town planning, drainage systems, the Great Bath, undeciphered script, and pedagogical source analysis (Primary vs Secondary sources).',
        highYieldAlert: '🚨 EXAM ALERT: Teaching history requires distinguishing Primary Sources (artifacts, seals, pottery, eyewitness inscriptions from the period) from Secondary Sources (modern textbooks, encyclopedias, documentaries written afterward). Examiners test source classification.',
        didacticStrategy: {
          frameworkName: 'Historical Inquiry & Primary Artifact Analysis',
          creatorOrOrigin: 'Historical Thinking Project & DCAR Curriculum',
          coreStages: [
            '1. Artifact Sourcing: Who created this, when, and for what purpose?',
            '2. Contextualization: What was happening in the Indus Valley at that time?',
            '3. Corroboration: Comparing multiple artifacts and seals.',
            '4. Historical Empathy: Imagining daily life of an artisan in ancient Mohenjo-daro.'
          ],
          classroomImplementation: 'Setting up an "Archaeological Dig" box in the classroom: Students unearth terracotta potsherds, clay seals, and toy carts, recording archaeological field notes like Sir John Marshall.',
          commonStudentMisconception: 'Presentism: Judging ancient Indus Valley inhabitants by modern 21st-century values and technology.',
          diagnosticIntervention: 'Guide students to evaluate Bronze Age engineering (covered drainage, baked brick standards) relative to contemporary Mesopotamia and Egypt.'
        },
        keyFormulasOrRules: [
          'Indus Valley Civilization Era: Approx. 2600 BCE – 1900 BCE (Mature Harappan Phase)',
          'Key Discoverers: Mohenjo-daro excavated under Sir John Marshall & R.D. Banerji (1922) in Larkana, Sindh.'
        ],
        concepts: [
          {
            conceptTitle: '1. Urban Planning & Material Culture of Mohenjo-daro',
            explanation: 'Mohenjo-daro ("Mound of the Dead") represents peak ancient urban civil engineering, characterized by grid layouts, standardized burnt bricks, and advanced civic hygiene.',
            keyTerms: [
              { term: 'Citadel vs. Lower City', definition: 'Citadel: Elevated western mound containing public monumental structures (Great Bath, Granary/Pillared Hall). Lower City: Grid-planned residential quarter.' },
              { term: 'The Great Bath', definition: 'Watertight public bath sealed with bitumen/natural tar, likely used for ritual purification ceremonies.' },
              { term: 'Priest-King & Dancing Girl', definition: 'Iconic sculptures unearthed at Mohenjo-daro showing sophisticated metallurgy and stone carving.' }
            ],
            bulletPoints: [
              'No evidence of royal palaces, standing armies, or massive military monuments found in Indus cities, indicating peaceful municipal governance.',
              'Standardized weights and measures (binary and decimal systems) were used across the entire civilization.'
            ]
          }
        ],
        comparisonTable: {
          title: 'Primary vs. Secondary Historical Sources (DCAR STBB)',
          headers: ['Source Type', 'Definition', 'Examples from Indus Valley Study', 'Classroom Utility'],
          rows: [
            ['Primary Source', 'Firsthand evidence created during the actual time period', 'Clay seals, Priest-King statue, terracotta beads, brick drains', 'Builds direct historical inquiry and analytical thinking'],
            ['Secondary Source', 'Accounts created after the event by someone who was not present', 'Class 6 STBB Social Studies textbook, scholarly biography, article', 'Provides synthesis, broader context, and background facts']
          ]
        },
        classroomApplication: 'Class 6 History Mock Excavation: Teacher provides photographs of the "Pashupati Seal" and "Dancing Girl". Students write historical deduction reports analyzing religious symbolism, clothing, and bronze casting technology.',
        mnemonicAid: '🧠 Sourcing History: "PAST" -> Person (who made it?), Age (when?), Subject (what is it?), Target audience.',
        frequentExamQuestions: [
          {
            question: 'In which district of Sindh is the ancient archaeological site of Mohenjo-daro situated, and when was it excavated?',
            answer: 'Larkana District, Sindh; excavated in 1922 under the direction of Sir John Marshall and R.D. Banerji.'
          }
        ],
        quickQuiz: [
          {
            id: 'sst-q2',
            question: 'A terracotta seal depicting an animal and Indus script discovered at Mohenjo-daro is classified by historians as:',
            options: ['A secondary historical source', 'A primary historical source', 'An anecdotal myth', 'A tertiary bibliography'],
            correctIndex: 1,
            explanation: 'Original artifacts and inscriptions produced during the historical period under study are classified as Primary Sources.'
          }
        ]
      },
      {
        id: 'sst-topic-3',
        subjectId: 'social-studies',
        subjectName: 'Social Studies',
        topicNumber: '03',
        title: 'Civics, Constitution 1973, Article 25-A & Citizen Rights',
        readTime: '13 min read · High Yield',
        dcarClassRange: 'Class 5 to 8 STBB / DCAR Competencies',
        summary: 'Structure of the State of Pakistan, 1973 Constitution, fundamental human rights, Article 25-A (free and compulsory education), 18th Constitutional Amendment (devolution), and teaching democratic citizenship.',
        highYieldAlert: '🚨 EXAM ALERT: Article 25-A guarantees free and compulsory education for ALL children aged 5 to 16 years. It was made a Fundamental Right via the landmark 18th Constitutional Amendment in April 2010.',
        didacticStrategy: {
          frameworkName: 'Participatory Civic Simulation & Mock Parliamentary Debates',
          creatorOrOrigin: 'Civic Education Framework & DCAR Curriculum',
          coreStages: [
            '1. Classroom Constitution formulation (Rights and Responsibilities).',
            '2. Mock election and democratic decision-making simulation.',
            '3. Legislative bill debate (Passing classroom policies).',
            '4. Community rights advocacy and public service audits.'
          ],
          classroomImplementation: 'Students draft a "Classroom Charter of Rights & Responsibilities" modeled on the Fundamental Rights of the 1973 Constitution, electing a Class Speaker and Student Ministers.',
          commonStudentMisconception: 'Conflating the 3 branches of government (Legislature, Executive, Judiciary) or assuming the Prime Minister makes judicial rulings.',
          diagnosticIntervention: 'Use the Separation of Powers triad: Legislature creates laws, Executive enforces laws, Judiciary interprets laws.'
        },
        keyFormulasOrRules: [
          'Article 25-A: State shall provide free and compulsory education to all children aged 5-16.',
          'Three Branches: Legislature (Parliament: NA & Senate), Executive (PM & Cabinet), Judiciary (Supreme Court & High Courts)',
          '18th Amendment: Abolished Concurrent List; devolved Education & Health to Provinces (2010).'
        ],
        concepts: [
          {
            conceptTitle: '1. Constitutional Governance & Citizen Rights',
            explanation: 'The Constitution of the Islamic Republic of Pakistan (1973) is the supreme law of the land, establishing a federal parliamentary republic.',
            keyTerms: [
              { term: 'Article 25-A', definition: 'Constitutional provision guaranteeing free, compulsory education for children aged 5 to 16 as a fundamental right.' },
              { term: '18th Constitutional Amendment (2010)', definition: 'Devolved education, health, and curriculum development to provincial governments; removed concurrent legislative list.' },
              { term: 'Bicameral Parliament (Majlis-e-Shoora)', definition: 'National Assembly (representing population) and Senate (equal provincial representation).' }
            ],
            bulletPoints: [
              'Fundamental Rights (Articles 8–28) include equality before law, freedom of speech, assembly, religion, and right to fair trial.',
              'Citizenship entails both legal rights and civic duties (paying taxes, respecting laws, civic participation).'
            ]
          }
        ],
        comparisonTable: {
          title: 'Three Organs of State (1973 Constitution)',
          headers: ['Organ', 'Primary Function', 'Key Institutions', 'Head of Institution'],
          rows: [
            ['Legislature', 'Makes, amends, and repeals laws', 'National Assembly & Senate (Parliament)', 'Speaker (NA) & Chairman (Senate)'],
            ['Executive', 'Implements and administers laws', 'Prime Minister, Federal Cabinet & Bureaucracy', 'Prime Minister (Chief Executive)'],
            ['Judiciary', 'Interprets laws and dispenses justice', 'Supreme Court of Pakistan & High Courts', 'Chief Justice of Pakistan']
          ]
        },
        classroomApplication: 'Classroom Mock Assembly: Students debate a hypothetical bill on "School Playground Upgrades", learning parliamentary procedures: 1st reading, committee debate, 2nd reading, voting by majority.',
        mnemonicAid: '🧠 "L-E-J State": Legislature (Laws made), Executive (Enforced), Judiciary (Judged).',
        frequentExamQuestions: [
          {
            question: 'Which amendment to the Constitution of Pakistan inserted Article 25-A regarding free education?',
            answer: 'The 18th Constitutional Amendment, passed in April 2010.'
          }
        ],
        quickQuiz: [
          {
            id: 'sst-q3',
            question: 'Under Article 25-A of the Constitution of Pakistan 1973, the state is mandated to provide free and compulsory education to children of which age group?',
            options: ['3 to 10 years', '5 to 16 years', '6 to 18 years', '7 to 15 years'],
            correctIndex: 1,
            explanation: 'Article 25-A guarantees free and compulsory education to all children aged 5 to 16 years.'
          }
        ]
      },
      {
        id: 'sst-topic-4',
        subjectId: 'social-studies',
        subjectName: 'Social Studies',
        topicNumber: '04',
        title: 'Sindh Cultural Heritage, Sufi Traditions & Peace Education',
        readTime: '12 min read · High Yield',
        dcarClassRange: 'Class 4 to 8 STBB / DCAR Competencies',
        summary: 'Tangible and intangible cultural heritage of Sindh: Ajrak, Sindhi Topi, Ralli, crafts of Hala and Nasarpur, Sufi poet-philosophers (Shah Abdul Latif Bhittai, Sachal Sarmast), and fostering religious tolerance and peace education.',
        highYieldAlert: '🚨 EXAM ALERT: Shah Jo Risalo is the monumental poetic compendium of Shah Abdul Latif Bhittai, organized into 30 Sur (musical melodies) celebrating seven virtuous heroines (Satt Soormiyun: Marui, Sasui, Sohni, Noori, Moomal, Sorath, Lila).',
        didacticStrategy: {
          frameworkName: 'Cultural Empathy & Intercultural Peace Dialogue',
          creatorOrOrigin: 'UNESCO & Sindh Cultural Preservation Standards',
          coreStages: [
            '1. Tangible heritage artifact appreciation (Ajrak, blue tiles of Hala).',
            '2. Poetic analysis of universal humanitarian values in Sufi poetry.',
            '3. Oral history interviews with family elders.',
            '4. Community harmony and diversity exhibitions.'
          ],
          classroomImplementation: 'Organizing an annual "Sindh Cultural & Unity Day" exhibition where students present traditional crafts, explain the natural block-printing chemistry of Ajrak, and recite peace couplets.',
          commonStudentMisconception: 'Viewing heritage solely as ancient relics rather than living cultural traditions and values.',
          diagnosticIntervention: 'Connect centuries-old crafts to modern sustainable economic livelihoods and global artisan appreciation.'
        },
        keyFormulasOrRules: [
          'Ajrak: Traditional block-printed shawl with geometric star and cross patterns, dyed with natural indigo and madder red.',
          'Sufi Message: Universal brotherhood, tolerance, love for humanity, and peace regardless of creed.'
        ],
        concepts: [
          {
            conceptTitle: '1. Material & Literary Heritage of Sindh',
            explanation: 'Sindh’s cultural tapestry reflects millennia of continuous civilizational synthesis.',
            keyTerms: [
              { term: 'Shah Abdul Latif Bhittai (1689–1752)', definition: 'The revered Sufi saint-poet of Bhit Shah, author of Shah Jo Risalo.' },
              { term: 'Sachal Sarmast (1739–1827)', definition: 'Sufi poet of Daraza Sharif, known as "Haft Zaban Shair" (Poet of Seven Languages).' },
              { term: 'Makli Necropolis (Thatta)', definition: 'One of the world’s largest funerary sites, designated a UNESCO World Heritage Site with monumental stone carvings.' }
            ],
            bulletPoints: [
              'Peace education teaches non-violent conflict resolution, intercultural empathy, and civic harmony.',
              'Traditional crafts of Hala (glazed pottery & Kashi work) date back to Indus glazed tile traditions.'
            ]
          }
        ],
        comparisonTable: {
          title: 'Prominent Sufi Poets of Sindh',
          headers: ['Sufi Saint / Poet', 'Resting Shrine', 'Key Literary Contribution', 'Central Core Theme'],
          rows: [
            ['Shah Abdul Latif Bhittai', 'Bhit Shah (Matiari)', 'Shah Jo Risalo (30 Surs)', 'Universal love, endurance, Satt Soormiyun (heroines)'],
            ['Sachal Sarmast', 'Daraza Sharif (Khairpur)', 'Divan-e-Ashkar, Kafis', 'Truth, fearless devotion, non-dualism (Wahdat al-Wujud)'],
            ['Lal Shahbaz Qalandar', 'Sehwan Sharif (Jamshoro)', 'Persian poetry & teachings', 'Spiritual ecstasy, humanitarian service & equality']
          ]
        },
        classroomApplication: 'Poetry Analysis: Students analyze Sur Sarang from Shah Jo Risalo, connecting the poet’s prayers for rain and blessing upon Sindh and the entire world to contemporary climate resilience.',
        mnemonicAid: '🧠 "7 Heroines" (Satt Soormiyun): Marui, Sasui, Sohni, Noori, Moomal, Sorath, Lila.',
        frequentExamQuestions: [
          {
            question: 'Which monumental historic burial site in Thatta, Sindh, is inscribed as a UNESCO World Heritage Site?',
            answer: 'Makli Necropolis (inscribed in 1981).'
          }
        ],
        quickQuiz: [
          {
            id: 'sst-q4',
            question: 'Which prominent Sufi poet of Sindh was famously bestowed the title "Haft Zaban Shair" (Poet of Seven Languages)?',
            options: ['Shah Abdul Latif Bhittai', 'Sachal Sarmast', 'Shaikh Ayaz', 'Makhdoom Bilawal'],
            correctIndex: 1,
            explanation: 'Sachal Sarmast of Daraza Sharif composed poetry in Sindhi, Siraiki, Persian, Urdu, Balochi, Arabic, and Punjabi, earning the title "Haft Zaban Shair".'
          }
        ]
      },
      {
        id: 'sst-topic-5',
        subjectId: 'social-studies',
        subjectName: 'Social Studies',
        topicNumber: '05',
        title: 'Social Studies Didactics: Socratic Seminars & Jigsaw',
        readTime: '12 min read · High Yield',
        dcarClassRange: 'Class 4 to 8 STBB / DCAR Competencies',
        summary: 'Subject-specific didactics for social studies: Socratic Seminars, Jigsaw cooperative reading of historical texts, structured controversy debates, community field inquiries, and rubric-based assessment.',
        highYieldAlert: '🚨 EXAM ALERT: Socratic Seminar vs. Debate: A debate is oppositional (two sides argue to win and prove the other wrong); a Socratic Seminar is collaborative (participants work together to construct deeper shared textual meaning without declaring a winner).',
        didacticStrategy: {
          frameworkName: 'Socratic Dialogue & Structured Academic Controversy',
          creatorOrOrigin: 'Mortimer Adler (Paideia Program) & David Johnson',
          coreStages: [
            '1. Textual Study: Students independently read and annotate a core primary or civic text.',
            '2. Question Posing: Teacher asks an open-ended interpretive question with no single right answer.',
            '3. Student-Led Dialogue: Students build on peers’ comments, citing textual evidence.',
            '4. Debrief & Synthesis: Reflecting on dialogue dynamics and insights gained.'
          ],
          classroomImplementation: 'Conducting a Socratic Seminar on "Why did ancient Mohenjo-daro decline? Environmental disaster vs. trade collapse": Students sit in a circle and quote archaeological hypotheses.',
          commonStudentMisconception: 'Believing that social studies is strictly memorizing dates, kings, and battle names.',
          diagnosticIntervention: 'Shift assessment from rote recall of dates to historical causation, perspective-taking, and critical civic reasoning.'
        },
        keyFormulasOrRules: [
          'Socratic Rule: Students listen actively, speak to one another directly (not through teacher), and back claims with text.',
          'Jigsaw Rule: Home Group -> Expert Group -> Home Group (Peer Instruction).'
        ],
        concepts: [
          {
            conceptTitle: '1. Active Dialogic Strategies in Social Studies',
            explanation: 'Social studies prepares active, informed citizens through structured discourse and inquiry.',
            keyTerms: [
              { term: 'Socratic Seminar', definition: 'A collaborative, intellectual dialogue about a text facilitated with open-ended questions.' },
              { term: 'Structured Academic Controversy', definition: 'A cooperative activity where pairs research opposing viewpoints, argue each side, and synthesize a consensus.' }
            ],
            bulletPoints: [
              'Role-playing historical decisions develops empathy and appreciation for multifaceted perspectives.',
              'Field trips to local historical sites (e.g. Kot Diji, Hyderabad Fort) transform abstract text into lived memory.'
            ]
          }
        ],
        comparisonTable: {
          title: 'Debate vs. Socratic Seminar in Social Studies Didactics',
          headers: ['Dimension', 'Traditional Debate', 'Socratic Seminar'],
          rows: [
            ['Purpose', 'To defeat opponent and convince audience', 'To collaborate and explore deep textual meaning'],
            ['Tone', 'Oppositional, competitive, rhetorical', 'Collaborative, reflective, respectful, open-minded'],
            ['Listening Goal', 'To find flaws in opponent’s argument', 'To understand different viewpoints and build on them'],
            ['Outcome', 'One side declared winner', 'Enriched shared understanding and critical insight']
          ]
        },
        classroomApplication: 'Teaching the Indus Water Treaty: Teacher organizes a Structured Academic Controversy where students represent different riparian user groups before synthesizing shared water conservation resolutions.',
        mnemonicAid: '🧠 "DIALOGUE" in Socratic: Discussion, Insight, Active listening, Open-ended, Grounded in text, Universal participation, Empathy.',
        frequentExamQuestions: [
          {
            question: 'What is the primary pedagogical difference between a classroom debate and a Socratic seminar?',
            answer: 'A debate is competitive and seeks to win an argument; a Socratic seminar is collaborative and seeks to expand mutual understanding through inquiry.'
          }
        ],
        quickQuiz: [
          {
            id: 'sst-q5',
            question: 'In social studies instruction, a teacher organizes students into a circle to discuss a historical text through open-ended questions without taking sides or naming a winner. This technique is:',
            options: ['A Parliamentary Debate', 'A Socratic Seminar', 'A Rote Lecture Recitation', 'A Competitive Quiz Show'],
            correctIndex: 1,
            explanation: 'A Socratic Seminar is a collaborative, question-driven dialogue centered on textual analysis aimed at deepening conceptual understanding.'
          }
        ]
      }
    ]
  },
  {
    id: 'english',
    name: 'English (Pedagogical Content Knowledge)',
    shortName: 'English Language',
    category: 'Pedagogical Content Knowledge',
    weightagePercent: 10,
    marks: 10,
    mcqCount: 10,
    targetLevel: 'Class 1 to 8 DCAR & STBB Aligned · BPS-16 & BPS-17',
    iconName: 'Languages',
    gradient: 'from-purple-600 via-fuchsia-600 to-pink-600',
    badgeBg: 'bg-purple-500/10 dark:bg-purple-500/20',
    badgeText: 'text-purple-600 dark:text-purple-400',
    curriculumBenchmark: 'DCAR Sindh School Curriculum Class 1–8: Four Skills (LSRW), Communicative Grammar & Reading Didactics',
    description: 'Pedagogical content knowledge in English: Four Language Skills (Listening, Speaking, Reading, Writing - LSRW), Communicative Language Teaching (CLT) vs Grammar Translation Method (GTM), phonic awareness, skimming/scanning, and error correction strategies.',
    topics: [
      {
        id: 'eng-topic-1',
        subjectId: 'english',
        subjectName: 'English',
        topicNumber: '01',
        title: 'Grammar, Parts of Speech & Syntax in Communicative Contexts',
        readTime: '13 min read · High Yield',
        dcarClassRange: 'Class 1 to 8 STBB / DCAR Competencies',
        summary: 'Traditional 8 parts of speech (Nouns, Pronouns, Verbs, Adjectives, Adverbs, Prepositions, Conjunctions, Interjections), form vs function, grammatical concord, and teaching grammar in context rather than isolation.',
        highYieldAlert: '🚨 EXAM ALERT: Teaching Grammar: Explicit deductive rule memorization (GTM method) fails to build communicative competence. DCAR guidelines mandate Inductive Grammar in Context (students encounter grammar in meaningful stories and deduce patterns).',
        didacticStrategy: {
          frameworkName: 'Grammar in Context & Task-Based Language Teaching (TBLT)',
          creatorOrOrigin: 'Rod Ellis & David Nunan',
          coreStages: [
            '1. Noticing: Students encounter target grammatical structures in authentic reading texts.',
            '2. Structuring: Guided questions help students analyze the rule and function.',
            '3. Communicative Output: Using the grammar to accomplish meaningful communication tasks.'
          ],
          classroomImplementation: 'Teaching Prepositions of Place (in, on, under, behind, between): Teacher gives students a Sindh village map and instructions to describe treasure locations to a partner.',
          commonStudentMisconception: 'Subject-Verb Agreement with collective nouns or indefinite pronouns (e.g. saying "Everyone are here" instead of "Everyone is here").',
          diagnosticIntervention: 'Clarify that singular indefinite pronouns (everyone, someone, nobody, each) grammatically take singular verbs.'
        },
        keyFormulasOrRules: [
          'Subject-Verb Concord: Singular subject takes singular verb; plural subject takes plural verb.',
          'Collective Nouns: Usually take singular verb when acting as a unified unit (e.g. The committee has decided).',
          'Pronoun-Antecedent Agreement: Pronouns must match their antecedents in person, number, and gender.'
        ],
        concepts: [
          {
            conceptTitle: '1. Form vs. Function in English Grammar',
            explanation: 'The same word form can serve different grammatical functions depending on its syntactic position in the sentence.',
            keyTerms: [
              { term: 'Syntactic Function', definition: 'The grammatical role a word plays in a sentence (e.g. Subject, Direct Object, Predicate).' },
              { term: 'Gerund vs. Present Participle', definition: 'Gerund: Verb ending in -ing functioning as a Noun (e.g. "Swimming is fun"). Participle: Functioning as an Adjective or in continuous tenses (e.g. "The swimming boy").' }
            ],
            bulletPoints: [
              'Prepositions indicate relationships of time, place, and direction (in, on, at, into, onto).',
              'Conjunctions link clauses: Coordinating (FANBOYS: For, And, Nor, But, Or, Yet, So), Subordinating (Because, Although, Since).'
            ]
          }
        ],
        comparisonTable: {
          title: 'Grammar Translation (GTM) vs. Communicative Language Teaching (CLT)',
          headers: ['Dimension', 'Grammar Translation Method (GTM)', 'Communicative Language Teaching (CLT)'],
          rows: [
            ['Language Focus', 'Rote grammar rules & isolated bilingual translation', 'Functional communication in real-life contexts'],
            ['Primary Medium', 'Mother tongue (Urdu/Sindhi) used by teacher', 'Target language (English) used communicatively'],
            ['View of Errors', 'Strictly penalized, immediate correction', 'Natural part of language acquisition; communication prioritized'],
            ['Student Activity', 'Passive reading and writing drills', 'Active speaking, pair dialogues, information-gap tasks']
          ]
        },
        classroomApplication: 'Information-Gap Activity: Student A has a picture of a room with missing objects; Student B has the complete picture. Student A asks questions using prepositions ("Is the book on the table?") to complete the drawing.',
        mnemonicAid: '🧠 Coordinating Conjunctions: "FANBOYS" -> For, And, Nor, But, Or, Yet, So.',
        frequentExamQuestions: [
          {
            question: 'In the sentence "Reading is her favorite hobby", what grammatical part of speech is the word "Reading"?',
            answer: 'A Gerund (a verbal noun functioning as the subject of the sentence).'
          }
        ],
        quickQuiz: [
          {
            id: 'eng-q1',
            question: 'In the sentence: "Neither of the two candidates _____ qualified for the teaching post", which verb form is grammatically correct?',
            options: ['are', 'is', 'were', 'have been'],
            correctIndex: 1,
            explanation: '"Neither" is a singular indefinite pronoun when referring to two items, requiring the singular verb "is".'
          }
        ]
      },
      {
        id: 'eng-topic-2',
        subjectId: 'english',
        subjectName: 'English',
        topicNumber: '02',
        title: 'Tenses, Active/Passive Voice & Direct/Indirect Speech',
        readTime: '13 min read · High Yield',
        dcarClassRange: 'Class 5 to 8 STBB / DCAR Competencies',
        summary: '12 English tenses (Aspects: Simple, Continuous, Perfect, Perfect Continuous), transformation rules for Active and Passive voice, and rules for Direct to Indirect speech (reported speech).',
        highYieldAlert: '🚨 EXAM ALERT: When transforming Direct to Indirect Speech, if the reporting verb is in the Past Tense (e.g. He said), tenses shift one step backward into the past (Present Simple -> Past Simple; Present Perfect -> Past Perfect). BUT if reporting a universal truth/scientific fact, the tense remains unchanged!',
        didacticStrategy: {
          frameworkName: 'Timeline Visuals & Contextual Transformation Drills',
          creatorOrOrigin: 'TESOL International & DCAR English Guidelines',
          coreStages: [
            '1. Timeline diagramming of past, present, and future events.',
            '2. Identifying agent vs recipient of action for Passive voice.',
            '3. Role-play scenarios for Reported Speech (relaying telephone messages).',
            '4. Error correction workshops.'
          ],
          classroomImplementation: 'Students write newspaper headlines in Passive Voice (e.g. "Three New Schools Built in Hyderabad") to understand that passive voice is used when the action or object is more important than the agent.',
          commonStudentMisconception: 'Assuming that Present Perfect (e.g. "I have visited Mohenjo-daro") can be used with specific finished past time adverbs like "yesterday" or "in 2020".',
          diagnosticIntervention: 'Clarify that Past Simple is mandatory with definite past time markers ("I visited Mohenjo-daro yesterday").'
        },
        keyFormulasOrRules: [
          'Active to Passive: Object of active becomes subject of passive + Appropriate form of \'Be\' + Past Participle (V3) + by + Agent.',
          'Direct to Indirect Pronoun Changes: 1st person pronouns change according to Subject of reporting verb; 2nd person according to Object.'
        ],
        concepts: [
          {
            conceptTitle: '1. Tense Aspects & Voice Transformations',
            explanation: 'Tenses locate events in time and express aspect (habitual, continuous, completed).',
            keyTerms: [
              { term: 'Active Voice', definition: 'The subject performs the action denoted by the verb (e.g. "The cat chased the mouse").' },
              { term: 'Passive Voice', definition: 'The subject receives the action (e.g. "The mouse was chased by the cat").' },
              { term: 'Backshifting (Reported Speech)', definition: 'Shifting verb tenses back one step in time when reporting past speech.' }
            ],
            bulletPoints: [
              'Intransitive verbs (verbs without an object, like sleep, arrive, sneeze) cannot be transformed into the passive voice.',
              'Modal verbs shift in reported speech: can -> could, will -> would, may -> might, must -> had to.'
            ]
          }
        ],
        comparisonTable: {
          title: 'Direct to Indirect Speech Tense Shift Matrix',
          headers: ['Direct Speech Tense', 'Indirect Speech Tense (Backshift)', 'Example Direct', 'Example Indirect'],
          rows: [
            ['Simple Present (V1)', 'Simple Past (V2)', '"I work in Sukkur"', 'He said that he worked in Sukkur.'],
            ['Present Continuous', 'Past Continuous', '"She is reading"', 'He said that she was reading.'],
            ['Simple Past (V2)', 'Past Perfect (had + V3)', '"They arrived early"', 'He said that they had arrived early.'],
            ['Present Perfect (has/have + V3)', 'Past Perfect (had + V3)', '"I have finished"', 'He said that he had finished.'],
            ['Universal Scientific Truth', 'NO CHANGE (Stays Present)', '"The Earth orbits Sun"', 'Teacher said that the Earth orbits the Sun.']
          ]
        },
        classroomApplication: 'Broken Telephone / Journalist Relay: Student A whispers a quote to Student B. Student B acts as a journalist and reports it to the class in Indirect Speech: "She said that she was excited about the science fair."',
        mnemonicAid: '🧠 Direct Speech Pronoun Rule: "SON 1-2-3" -> 1st Person changes per Subject, 2nd Person per Object, 3rd Person No change.',
        frequentExamQuestions: [
          {
            question: 'Transform into Indirect Speech: The teacher said, "Water boils at 100 degrees Celsius."',
            answer: 'The teacher said that water boils at 100 degrees Celsius (Tense does NOT backshift because it is a scientific fact).'
          }
        ],
        quickQuiz: [
          {
            id: 'eng-q2',
            question: 'Which of the following sentences is correctly structured in the Passive Voice?',
            options: [
              'The letter was wrote by the student.',
              'The letter was written by the student.',
              'The letter had written by the student.',
              'The student was written the letter.'
            ],
            correctIndex: 1,
            explanation: 'The passive construction requires the past tense auxiliary "was" followed by the Past Participle (V3) "written".'
          }
        ]
      },
      {
        id: 'eng-topic-3',
        subjectId: 'english',
        subjectName: 'English',
        topicNumber: '03',
        title: 'Vocabulary Acquisition, Morphology & Context Clues',
        readTime: '12 min read · High Yield',
        dcarClassRange: 'Class 3 to 8 STBB / DCAR Competencies',
        summary: 'Morphological awareness (roots, prefixes, suffixes), compounding, contextual vocabulary strategies (5 types of context clues), synonyms, antonyms, and idioms tested in STS screening.',
        highYieldAlert: '🚨 EXAM ALERT: Teaching isolated word lists for memorization leads to rapid forgetting. Research shows that teaching morphological roots (e.g. "bene" = good, "mal" = bad, "tele" = distance, "graph" = write) allows learners to decode hundreds of unfamiliar words independently.',
        didacticStrategy: {
          frameworkName: 'Morphological Word Analysis & Context Clue Deduction',
          creatorOrOrigin: 'Beck, McKeown & Kucan (Bringing Words to Life)',
          coreStages: [
            '1. Tier 2 Vocabulary Selection: High-utility academic words found across school subjects.',
            '2. Morpheme Breakdown: Dissecting Root + Prefix + Suffix.',
            '3. Context Clue Hunting: Definition, Synonym, Antonym, Example, or Inference clues.',
            '4. Dual Coding: Pairing word with image and personal sentence.'
          ],
          classroomImplementation: 'Creating a "Word Root Tree" on classroom walls: Roots like "PORT" (carry) branch out into transport, import, export, portable, and deport.',
          commonStudentMisconception: 'Assuming that every unfamiliar word requires stopping reading to look up in a dictionary.',
          diagnosticIntervention: 'Train students to read the preceding and succeeding sentences to infer meaning from semantic context clues.'
        },
        keyFormulasOrRules: [
          'Prefix: Added to beginning to alter meaning (un-happy, re-write, dis-agree).',
          'Suffix: Added to end to alter grammatical part of speech (teach -> teacher = Noun; quick -> quickly = Adverb).',
          'Context Clues: Definition, Synonym, Antonym, Example, Inference (General sense).'
        ],
        concepts: [
          {
            conceptTitle: '1. Three Tiers of Vocabulary & Morphological Strategies',
            explanation: 'Effective vocabulary pedagogy focuses heavily on Tier 2 academic words that cross multiple school disciplines.',
            keyTerms: [
              { term: 'Tier 1 Words', definition: 'Basic everyday conversational words (clock, baby, happy, walk).' },
              { term: 'Tier 2 Words', definition: 'High-utility academic words appearing across texts (evaluate, analyze, contrast, formulate).' },
              { term: 'Tier 3 Words', definition: 'Domain-specific technical terminology (photosynthesis, isosceles, stanza, cytoplasm).' }
            ],
            bulletPoints: [
              'Antonym clues often use contrast transition words like: however, but, unlike, whereas, on the contrary.',
              'Compound words combine two base words (sun + flower = sunflower).'
            ]
          }
        ],
        comparisonTable: {
          title: '5 Types of Context Clues in Reading Comprehension',
          headers: ['Clue Type', 'How It Works', 'Signal Words', 'Example Sentence'],
          rows: [
            ['Definition Clue', 'Word is explicitly defined in sentence', 'is, means, refers to, defined as', 'Arboreal animals, or creatures that live in trees, include monkeys.'],
            ['Synonym Clue', 'A word of similar meaning is used nearby', 'also known as, similarly, that is', 'The child was lethargic; he was completely sluggish and tired.'],
            ['Antonym Clue', 'An opposite word provides contrast', 'unlike, but, however, on the contrary', 'Unlike his gregarious brother, Tariq was quiet and reserved.'],
            ['Example Clue', 'Specific illustrations clarify the word', 'such as, for instance, including', 'Piscivorous animals, such as kingfishers and otters, feed on fish.'],
            ['Inference Clue', 'General context clues reveal meaning', 'implied from overall scenario', 'After hiking in the Thar desert for 10 hours, he was parched.']
          ]
        },
        classroomApplication: 'Word Detective Activity: Teacher gives students sentences with made-up nonsense words (e.g. "The blonking child refused to smile despite all attempts"). Students use context clues to deduce the emotional meaning of "blonking".',
        mnemonicAid: '🧠 "IDEAS" Context Clues: Inference, Definition, Example, Antonym, Synonym.',
        frequentExamQuestions: [
          {
            question: 'What is the prefix and suffix in the word "UNCOMFORTABLE"?',
            answer: 'Prefix: "un-" (not); Root: "comfort"; Suffix: "-able" (capable of being).'
          }
        ],
        quickQuiz: [
          {
            id: 'eng-q3',
            question: 'In the sentence: "Unlike her brother who was frugal and saved every rupee, Aisha was extravagant", the meaning of "extravagant" can be deduced using which context clue?',
            options: ['Definition clue', 'Antonym contrast clue', 'Punctuation clue', 'Etymological Latin clue'],
            correctIndex: 1,
            explanation: 'The transition "Unlike" introduces an antonym contrast against "frugal", showing that Aisha spent money freely.'
          }
        ]
      },
      {
        id: 'eng-topic-4',
        subjectId: 'english',
        subjectName: 'English',
        topicNumber: '04',
        title: 'Reading Comprehension, Skimming/Scanning & Bloom Questions',
        readTime: '13 min read · High Yield',
        dcarClassRange: 'Class 3 to 8 STBB / DCAR Competencies',
        summary: 'Reading pedagogy: Skimming for gist, Scanning for specific details, Intensive vs Extensive reading, and designing Bloom-aligned comprehension questions (Literal, Inferential, Evaluative).',
        highYieldAlert: '🚨 EXAM ALERT: Skimming vs. Scanning: Skimming is reading rapidly to get the main idea or gist of a text. Scanning is rapid reading to search for a specific fact, date, name, or number without reading the surrounding text.',
        didacticStrategy: {
          frameworkName: 'Before-During-After (BDA) Reading Comprehension Strategy',
          creatorOrOrigin: 'Donna Ogle (K-W-L) & Reading Research',
          coreStages: [
            '1. Pre-Reading (Before): Activate prior knowledge, predict from title and headings, preview vocabulary.',
            '2. Guided Reading (During): Annotating text, summarizing paragraphs, monitoring comprehension.',
            '3. Post-Reading (After): Answering tiered Bloom questions, summarizing, graphic organizers.'
          ],
          classroomImplementation: 'Using the K-W-L Chart (What I Know, What I Want to know, What I Learned) in Class 6 reading units on environmental protection.',
          commonStudentMisconception: 'Believing that reading faster means reading every single word word-for-word in linear order.',
          diagnosticIntervention: 'Explicitly teach and time scanning drills (e.g. "Find the year when the barrage was built in under 10 seconds").'
        },
        keyFormulasOrRules: [
          'Literal Questions: Answer is explicitly stated in text ("Right there" questions).',
          'Inferential Questions: Answer requires reading between the lines ("Author and Me" questions).',
          'Evaluative Questions: Answer requires making judgments based on external criteria.'
        ],
        concepts: [
          {
            conceptTitle: '1. Reading Sub-skills & Cognitive Question Hierarchy',
            explanation: 'Effective reading comprehension moves beyond literal recall to critical evaluation and textual synthesis.',
            keyTerms: [
              { term: 'Skimming', definition: 'Fast reading technique used to identify the central theme or overall gist of a passage.' },
              { term: 'Scanning', definition: 'Rapid search technique used to pinpoint a specific piece of information (e.g. phone number, date, name).' },
              { term: 'Intensive Reading', definition: 'In-depth, detailed reading of short texts to extract detailed meaning, syntax, and vocabulary.' },
              { term: 'Extensive Reading', definition: 'Reading longer texts (novels, magazines) for pleasure and general fluency.' }
            ],
            bulletPoints: [
              'SQ3R Study Reading Method: Survey, Question, Read, Recite, Review (Francis Robinson).',
              'Inferential questions measure higher cognitive depth than literal recall.'
            ]
          }
        ],
        comparisonTable: {
          title: 'Comparing Reading Sub-skills in English Language Teaching',
          headers: ['Reading Strategy', 'Speed', 'Goal / Objective', 'Classroom Example Activity'],
          rows: [
            ['Skimming', 'Very Fast', 'Grasp the general idea / gist', 'Reading news headlines and first sentences of paragraphs'],
            ['Scanning', 'Fast & Targeted', 'Locate one specific fact or date', 'Finding a train departure time in a timetable'],
            ['Intensive Reading', 'Slow & Analytical', 'Detailed linguistic and conceptual mastery', 'Dissecting a 200-word paragraph for grammar and nuance'],
            ['Extensive Reading', 'Moderate & Fluid', 'Reading for pleasure and overall fluency', 'Reading an English storybook from the school library']
          ]
        },
        classroomApplication: 'SQ3R Implementation: Teacher guides Class 7 students through textbook chapter reading: 1) Survey headings and pictures, 2) Turn headings into questions, 3) Read to answer questions, 4) Recite answers aloud, 5) Review key takeaways.',
        mnemonicAid: '🧠 "SQ3R": Survey, Question, Read, Recite, Review.',
        frequentExamQuestions: [
          {
            question: 'When a candidate glances rapidly through a telephone directory to locate a doctor’s phone number, which reading technique is used?',
            answer: 'Scanning (searching for a specific targeted item).'
          }
        ],
        quickQuiz: [
          {
            id: 'eng-q4',
            question: 'Which reading strategy is primarily employed when a student rapidly glances over the title, sub-headings, and opening sentences of a passage to determine its general topic?',
            options: ['Scanning', 'Skimming', 'Critical Editing', 'Proofreading'],
            correctIndex: 1,
            explanation: 'Skimming is the rapid reading technique used to extract the main idea or general gist of a passage.'
          }
        ]
      },
      {
        id: 'eng-topic-5',
        subjectId: 'english',
        subjectName: 'English',
        topicNumber: '05',
        title: 'ELT Didactics: Four Skills (LSRW) & Communicative Methodology',
        readTime: '13 min read · High Yield',
        dcarClassRange: 'Class 1 to 8 STBB / DCAR Competencies',
        summary: 'English Language Teaching (ELT) methodology: Receptive skills (Listening, Reading) vs Productive skills (Speaking, Writing), Natural Order of Acquisition (LSRW), Phonics, and CLT classroom management.',
        highYieldAlert: '🚨 EXAM ALERT: Natural Order of Language Acquisition is STRICTLY: 1. Listening -> 2. Speaking -> 3. Reading -> 4. Writing (L-S-R-W). Receptive skills (L & R) always precede and provide the linguistic input for Productive skills (S & W). Teaching writing before listening violates natural SLA principles.',
        didacticStrategy: {
          frameworkName: 'Communicative Language Teaching (CLT) & Natural SLA Progression',
          creatorOrOrigin: 'Stephen Krashen (Input Hypothesis) & Dell Hymes',
          coreStages: [
            '1. Comprehensible Input (i+1): Listening and reading input slightly beyond current proficiency.',
            '2. Interactive Negotiation of Meaning: Pair and group communicative tasks.',
            '3. Meaningful Output: Producing spoken dialogues and written messages.',
            '4. Form-Focused Feedback: Selective corrective feedback on communicative bottlenecks.'
          ],
          classroomImplementation: 'Role-play in a grocery shop: Students practice asking prices, polite requests ("Could I please have..."), and counting change in English pairs.',
          commonStudentMisconception: 'Believing that learning English requires translating every English word into Urdu or Sindhi in one’s head before speaking.',
          diagnosticIntervention: 'Use visual flashcards, realia (real objects), gestures, and total physical response (TPR) to link English words directly to concepts without intermediate translation.'
        },
        keyFormulasOrRules: [
          'Receptive Skills (Input): Listening & Reading',
          'Productive Skills (Output): Speaking & Writing',
          'Stephen Krashen\'s Affective Filter Hypothesis: Low anxiety and high motivation maximize language acquisition.'
        ],
        concepts: [
          {
            conceptTitle: '1. Receptive vs. Productive Language Dimensions',
            explanation: 'Language proficiency requires integrated instruction across all four communicative modalities.',
            keyTerms: [
              { term: 'LSRW Progression', definition: 'The developmental sequence: Listening -> Speaking -> Reading -> Writing.' },
              { term: 'Receptive Skills', definition: 'Skills where learners receive and process language input (Listening and Reading).' },
              { term: 'Productive Skills', definition: 'Skills where learners actively produce language output (Speaking and Writing).' },
              { term: 'Total Physical Response (TPR)', definition: 'Language teaching method coordinating speech with physical body movement (James Asher).' }
            ],
            bulletPoints: [
              'Phonics instruction teaches the direct correlation between phonemes (sounds) and graphemes (letters).',
              'Fluency should be nurtured alongside accuracy; over-correcting minor speech errors causes inhibition.'
            ]
          }
        ],
        comparisonTable: {
          title: 'Classification of the Four Language Skills (LSRW)',
          headers: ['Language Skill', 'Modality Type', 'Cognitive Direction', 'Typical Classroom Practice'],
          rows: [
            ['Listening', 'Receptive Skill', 'Input (Oral/Aural)', 'Audio stories, teacher dictation, following oral directions'],
            ['Speaking', 'Productive Skill', 'Output (Oral)', 'Pair role-plays, show-and-tell, debates, picture descriptions'],
            ['Reading', 'Receptive Skill', 'Input (Visual/Written)', 'Storybooks, comprehension texts, skimming and scanning'],
            ['Writing', 'Productive Skill', 'Output (Written)', 'Sentence construction, paragraph composition, creative stories']
          ]
        },
        classroomApplication: 'TPR (Total Physical Response) in Class 1: Teacher says "Stand up!", "Touch your nose!", "Open your book!" while demonstrating the actions. Students mirror the actions, acquiring English imperatives naturally without translation.',
        mnemonicAid: '🧠 "LSRW": Listening -> Speaking -> Reading -> Writing (Listen First, Write Last).',
        frequentExamQuestions: [
          {
            question: 'Which two language skills among the four (LSRW) are classified as "Productive" or "Expressive" skills?',
            answer: 'Speaking and Writing.'
          }
        ],
        quickQuiz: [
          {
            id: 'eng-q5',
            question: 'In language acquisition theory, which of the following pairs of language skills are classified as "Receptive Skills"?',
            options: ['Listening and Speaking', 'Reading and Writing', 'Listening and Reading', 'Speaking and Writing'],
            correctIndex: 2,
            explanation: 'Listening and Reading are Receptive skills because learners receive and decode external linguistic input.'
          }
        ]
      }
    ]
  },
  {
    id: 'urdu-sindhi',
    name: 'Urdu or Sindhi (Pedagogical Content Knowledge)',
    shortName: 'Urdu & Sindhi (Language)',
    category: 'Pedagogical Content Knowledge',
    weightagePercent: 10,
    marks: 10,
    mcqCount: 10,
    targetLevel: 'Class 1 to 8 DCAR & STBB Aligned · BPS-16 & BPS-17',
    iconName: 'BookOpen',
    gradient: 'from-rose-600 via-pink-600 to-amber-700',
    badgeBg: 'bg-rose-500/10 dark:bg-rose-500/20',
    badgeText: 'text-rose-600 dark:text-rose-400',
    curriculumBenchmark: 'DCAR Sindh School Curriculum Class 1–8: Mother Tongue & First Language Didactics, Qawaid & Vyakaran',
    description: 'Pedagogical content knowledge in Urdu or Sindhi language: Urdu Qawaid (Zuban Dani, Imla, Asnaf-e-Adab) and Sindhi Vyakaran (Haroof-e-Tahajji, Imla, Akhaniyun, Sufi Shairi), Mother Tongue Didactics (Tadrees-e-Urdu & Sindhi Boli ji Tadrees), and bilingual education transitions.',
    topics: [
      {
        id: 'lang-topic-1',
        subjectId: 'urdu-sindhi',
        subjectName: 'Urdu or Sindhi',
        topicNumber: '01',
        title: 'Urdu Qawaid, Zuban Dani & Imlah ki Durustagi',
        readTime: '13 min read · High Yield',
        dcarClassRange: 'Class 1 to 8 STBB / DCAR Competencies',
        summary: 'Urdu grammar fundamentals: Kalma and Mahmal, Ism (Zat, Sifat), Fael (Mazi, Haal, Mustaqbil), Harf, Wahid/Jama, Muzakkar/Muanas, Mutaradif/Mutazad, Muhawarat, and Imla rules.',
        highYieldAlert: '🚨 EXAM ALERT: Kalma vs Mahmal: Kalma is meaningful speech (e.g. Pani); Mahmal is meaningless rhyming appendage used in colloquial speech (e.g. Wani). In Urdu Qawaid, Ism-e-Marfa (Proper Noun) has 4 kinds: Alam, Zameer, Ism-e-Ishara, Ism-e-Mousool.',
        didacticStrategy: {
          frameworkName: 'Inductive Urdu Grammar Discovery (Tadrees-e-Qawaid)',
          creatorOrOrigin: 'DCAR Urdu Curriculum & Maulvi Abdul Haq Tradition',
          coreStages: [
            '1. Tamheed: Presenting sentences from classical and modern Urdu literature.',
            '2. Muqabla o Mushahida: Comparing singular vs plural, masculine vs feminine forms.',
            '3. Istikhraj-e-Qanoon: Students derive the grammatical rule.',
            '4. Itlaq (Application): Constructing original paragraphs applying the grammar.'
          ],
          classroomImplementation: 'Sorting cards with Muhawarat (e.g. "Aasman par dimagh hona", "Bheegi billi banna") where students match idioms with their figurative meanings rather than literal translations.',
          commonStudentMisconception: 'Imla errors with homophonous letters like ص vs س, ض vs ز vs ذ vs ظ, and ت vs ط.',
          diagnosticIntervention: 'Conduct root-word derivations and visual word-wall drills to anchor standard orthographic conventions.'
        },
        keyFormulasOrRules: [
          'Kalma (Meaningful word): Has 3 parts in classic grammar: Ism (Noun), Fael (Verb), Harf (Particle).',
          'Wahid to Jama rules: Adding \'aan\' (یاں), \'aat\' (ات), or \'on\' (وں) according to noun endings.',
          'Muzakkar/Muanas: Living beings (Haqeeqi) vs inanimate objects (Ghair Haqeeqi by usage).'
        ],
        concepts: [
          {
            conceptTitle: '1. Asas-e-Qawaid: Kalma, Ism aur Fael',
            explanation: 'Urdu grammar structures reflect Indo-Aryan and Arabic/Persian linguistic syntheses.',
            keyTerms: [
              { term: 'Ism-e-Marfa (Proper Noun)', definition: 'Specific name of a person, place, or thing (Alam, Zameer, Ishara, Mousool).' },
              { term: 'Ism-e-Nakra (Common Noun)', definition: 'General common noun for classes of things (Zat, Sifat, Aala, Zarf, Saut).' },
              { term: 'Muhawara (Idiom)', definition: 'A phrase used in figurative, non-literal meaning with fixed wording that cannot be altered.' }
            ],
            bulletPoints: [
              'Zarb-ul-Misl (Proverb) represents folk wisdom passed down through generations (e.g. "Naach na jaane aangan terha").',
              'Imlah mastery requires distinguishing between Chhoti Ye (ی) and Badi Ye (ے).'
            ]
          }
        ],
        comparisonTable: {
          title: 'Classification of Nouns in Urdu Qawaid (DCAR STBB)',
          headers: ['Category', 'Definition', 'Sub-types', 'Examples'],
          rows: [
            ['Ism-e-Marfa (Proper)', 'Denotes specific identifiable entity', 'Alam, Zameer, Ism-e-Ishara, Ism-e-Mousool', 'Karachi, Quaid-e-Azam, Woh, Jo kuch'],
            ['Ism-e-Nakra (Common)', 'Denotes general class of objects/persons', 'Ism-e-Zat, Sifat, Aala, Zarf (Zaman/Makan), Saut', 'Kitab, Shehr, Qalam, Masjid, Chamach']
          ]
        },
        classroomApplication: 'Classroom Imlah Workshop: Teacher dictates a short paragraph highlighting common confusions (طوطا vs توتا, ضرور vs زرور). Students peer-review and correct errors using colored pens.',
        mnemonicAid: '🧠 "Kalma kay 3 Ajza": Ism (Noun), Fael (Verb), Harf (Joining particle).',
        frequentExamQuestions: [
          {
            question: 'Urdu qawaid mein "Pani Wani" mein lafz "Wani" ko qawaid ki roo se kya kaha jata hai?',
            answer: 'Mahmal (a meaningless word used alongside a meaningful word).'
          }
        ],
        quickQuiz: [
          {
            id: 'u-q1',
            question: 'Urdu Qawaid ki roo se "Ism-e-Zarf-e-Zaman" kis cheez ko zahir karta hai?',
            options: ['Kisi jagah ya muqam ko', 'Kisi waqt ya zamane ko', 'Kisi aala ya hathiyar ko', 'Kisi aawaz ko'],
            correctIndex: 1,
            explanation: 'Ism-e-Zarf-e-Zaman designates time, duration, or era (e.g. Subah, Sham, Aaj, Saal).'
          }
        ]
      },
      {
        id: 'lang-topic-2',
        subjectId: 'urdu-sindhi',
        subjectName: 'Urdu or Sindhi',
        topicNumber: '02',
        title: 'Tadrees-e-Urdu (Nazm, Nasr o Zuban Dani Didactics)',
        readTime: '13 min read · High Yield',
        dcarClassRange: 'Class 1 to 8 STBB / DCAR Competencies',
        summary: 'Didactic methodologies for teaching Urdu: Tadrees-e-Nazm (Poetry didactics: Tarannum, Wazan, Tashreeh), Tadrees-e-Nasr (Prose didactics: Buland-khwani, Khamosh-khwani), Tadrees-e-Insha, and language skills evaluation.',
        highYieldAlert: '🚨 EXAM ALERT: Tadrees-e-Nazm vs Tadrees-e-Nasr: The primary goal of teaching poetry (Nazm) is aesthetic appreciation, emotional resonance (Zauq-e-Jamal), and rhythmic recitation (Tarannum/Ahang). The primary goal of teaching prose (Nasr) is factual comprehension, vocabulary acquisition, and logical expression.',
        didacticStrategy: {
          frameworkName: 'Herbartian Urdu Language Lesson Delivery',
          creatorOrOrigin: 'Classical Language Didactics & DCAR Standards',
          coreStages: [
            '1. Tamheed o Istehzaar (Motivation & Prior Knowledge).',
            '2. Namoona ki Buland-Khwani (Model Reading by Teacher).',
            '3. Talba ki Buland-Khwani (Student Reading with Pronunciation Correction).',
            '4. Wazahat o Mushkil Alfaaz ki Tadrees (Vocabulary & Clarification).',
            '5. Khamosh-Khwani (Silent Reading for Deep Comprehension).',
            '6. Iada o Jaiza (Review and Formative Evaluation).'
          ],
          classroomImplementation: 'When teaching an Urdu poem by Allama Iqbal (e.g. "Hamd" or "Parinday ki Faryad"), the teacher recites with expressive intonation (Tarannum) before asking students to identify rhythmic rhyming words (Radif and Qafia).',
          commonStudentMisconception: 'Treating poetry lessons like prose lessons by dissecting each couplet purely for grammatical rules rather than poetic sentiment.',
          diagnosticIntervention: 'Preserve the poetic musicality (Ahang) and guide students to visualize imagery before literary analysis.'
        },
        keyFormulasOrRules: [
          'Radif: Identical word or phrase repeated at the end of every couplet.',
          'Qafia: Rhyming words appearing immediately before the Radif.',
          'Buland-khwani: Oral reading for pronunciation and fluency.',
          'Khamosh-khwani: Silent reading for comprehension and speed.'
        ],
        concepts: [
          {
            conceptTitle: '1. Tadrees-e-Zuban kay Usool o Asnaf-e-Adab',
            explanation: 'Teaching Urdu language requires distinct instructional approaches for poetry, fiction, essay, and drama.',
            keyTerms: [
              { term: 'Buland-Khwani (Aloud Reading)', definition: 'Cultivates correct phonetic articulation (Makharij), inflection, and confidence.' },
              { term: 'Khamosh-Khwani (Silent Reading)', definition: 'Fosters rapid cognitive comprehension, concentration, and analytical reflection.' },
              { term: 'Radif o Qafia', definition: 'Structural rhythmic pillars of classical Urdu Ghazal and Nazm.' }
            ],
            bulletPoints: [
              'Khamosh-khwani should be introduced from Class 3 onwards to boost independent reading speed.',
              'Tadrees-e-Insha (Composition) develops expressive writing, essay structure, and letter writing.'
            ]
          }
        ],
        comparisonTable: {
          title: 'Tadrees-e-Nazm (Poetry) vs. Tadrees-e-Nasr (Prose)',
          headers: ['Didactic Aspect', 'Tadrees-e-Nazm (Poetry)', 'Tadrees-e-Nasr (Prose)'],
          rows: [
            ['Primary Objective', 'Zauq-e-Jamal (Aesthetic joy), emotional resonance, rhythm', 'Factual understanding, logical reasoning, vocabulary growth'],
            ['Teaching Method', 'Tarannum (Rhythmic recitation), poetic imagery, feeling', 'Tafheem (Comprehension), silent reading, structured discussion'],
            ['Reading Style', 'Buland-khwani with rhythmic cadence & emotional tone', 'Alternating between oral reading and silent analytical reading'],
            ['Assessment', 'Recitation fluency, interpretation of themes, Radif/Qafia', 'Answering comprehension questions, summaries, grammar use']
          ]
        },
        classroomApplication: 'Class 7 Ghazal Recitation Studio: Teacher guides students to identify the Radif ("hota hai") and Qafias ("kya", "dawa", "dua") in a couplet by Mirza Ghalib, connecting rhythm to emotional tone.',
        mnemonicAid: '🧠 "Nazm vs Nasr": Nazm = Naghma o Jazba (Melody & Emotion); Nasr = Maloomat o Mantiq (Information & Logic).',
        frequentExamQuestions: [
          {
            question: 'Tadrees-e-Urdu mein Talba ki samajh aur raftaar-e-mutalia barhanay kay liye konsi khwani sab se mufeed hai?',
            answer: 'Khamosh-Khwani (Silent Reading).'
          }
        ],
        quickQuiz: [
          {
            id: 'u-q2',
            question: 'Tadrees-e-Urdu mein shairi (Nazm) parhanay ka bunyadi maqsad kya hota hai?',
            options: [
              'Rote grammar ke qawaid ratwana',
              'Zauq-e-Jamal (Aesthetic sense) aur ehsaas-e-ahang bedar karna',
              'Sirf mushkil tareen lafzon ke imla ka imtihan lena',
              'Talba ko hisab ki mashq karwana'
            ],
            correctIndex: 1,
            explanation: 'The primary purpose of poetry instruction is to cultivate aesthetic appreciation (Zauq-e-Jamal), rhythmic sensibility, and emotional expression.'
          }
        ]
      },
      {
        id: 'lang-topic-3',
        subjectId: 'urdu-sindhi',
        subjectName: 'Urdu or Sindhi',
        topicNumber: '03',
        title: 'Sindhi Vyakaran, Haroof-e-Tahajji & Imlah ji Durustagi',
        readTime: '13 min read · High Yield',
        dcarClassRange: 'Class 1 to 8 STBB / DCAR Competencies',
        summary: 'Sindhi language orthography: 52 Haroof-e-Tahajji (alphabet), unique Sindhi implosives (ٻ, ڄ, ڳ, ڱ, ڃ, ڻ, ڊ, ڌ, ڦ, ڇ), Vyakaran fundamentals (Lafz, Ism, Zamir, Fail, Sifat, Harf), and Imla rules.',
        highYieldAlert: '🚨 EXAM ALERT: Sindhi Alphabet has 52 letters. Crucially, it contains four unique implosive consonants (ٻ [ɓ], ڄ [ʄ], ڳ [ɠ], ڊ [ɗ]) not found in Urdu, Arabic, or English. Examiners frequently test the identification and pronunciation of these unique letters!',
        didacticStrategy: {
          frameworkName: 'Sindhi Orthographic & Phonetic Mastery Framework',
          creatorOrOrigin: 'Sir Bartle Frere Commission (1852) & Sindhi Language Authority',
          coreStages: [
            '1. Phonetic discrimination of unique Sindhi implosive consonants.',
            '2. Dot placement (Nukta) conventions (above, below, inside).',
            '3. Vyakaran word construction (Ism, Fail, Zamir).',
            '4. Contextual application in Sindhi prose and folklore.'
          ],
          classroomImplementation: 'Using tactile sandpaper letters and mirror articulation drills in Class 1–3 to distinguish between ٻ (two vertical dots below) vs ب (one dot below).',
          commonStudentMisconception: 'Confusing dots on unique Sindhi letters: ٻ (two vertical dots below) vs ڀ (four dots) vs پ (three dots below).',
          diagnosticIntervention: 'Create comparative visual anchor charts grouped by letter families sharing common base shapes.'
        },
        keyFormulasOrRules: [
          '52 Letters in Sindhi Alphabet (established 1852 by Sir Bartle Frere).',
          '4 Implosives: ٻ, ڄ, ڊ, ڳ',
          'Nasal consonants unique to Sindhi: ڱ [ŋ], ڃ [ɲ], ڻ [ɳ]'
        ],
        concepts: [
          {
            conceptTitle: '1. Sindhi Haroof-e-Tahajji & Vyakaran Foundations',
            explanation: 'Sindhi is an ancient Indo-Aryan language with a rich phonetic repertoire requiring dedicated pedagogical care in letter formation.',
            keyTerms: [
              { term: 'Sindhi Implosives (ٻ, ڄ, ڊ, ڳ)', definition: 'Consonants produced by pulling air inward during articulation.' },
              { term: 'Ism-e-Khas (Proper Noun)', definition: 'Specific name of a person, place, or thing (e.g. Sindh, Mehran, Sachal).' },
              { term: 'Ism-e-Aam (Common Noun)', definition: 'General class noun (e.g. Chhokro, Kitab, Shehr).' }
            ],
            bulletPoints: [
              'Sindhi grammar requires gender agreement for inanimate objects and adjectives.',
              'Prereading phonemic awareness of all 52 letters prevents persistent reading bottlenecks.'
            ]
          }
        ],
        comparisonTable: {
          title: 'Unique Sindhi Consonants Not Found in Urdu Alphabet',
          headers: ['Sindhi Letter', 'Dot Configuration', 'Phonetic Category', 'Sindhi Example Word'],
          rows: [
            ['ٻ', 'Two vertical dots below (ـٻـ)', 'Implosive Bilabial [ɓ]', 'ٻڪري (Bakri - Goat)'],
            ['ڄ', 'Two vertical dots below center', 'Implosive Palatal [ʄ]', 'ڄام (Jaam - Ruler/Title)'],
            ['ڊ', 'One dot below loop', 'Implosive Retroflex [ɗ]', 'ڊيل (Deel - Peahen)'],
            ['ڳ', 'Two vertical dots above line', 'Implosive Velar [ɠ]', 'ڳئون (Gaoon - Cow)'],
            ['ڱ', 'Two dots above in upper corner', 'Velar Nasal [ŋ]', 'ڱڻ (Ngan - Count)']
          ]
        },
        classroomApplication: 'Letter Sorting Workshop: Primary students sort word cards into categories based on whether they contain implosive consonants (ٻ, ڄ, ڊ, ڳ), practicing native articulation.',
        mnemonicAid: '🧠 4 Implosives: "ٻ-ڄ-ڊ-ڳ" (Bba, Jja, Dda, Gga).',
        frequentExamQuestions: [
          {
            question: 'Sindhi zaban ji Haroof-e-Tahajji (alphabet) mein kul ketra akhar (letters) aahin?',
            answer: '52 akhar (52 letters).'
          }
        ],
        quickQuiz: [
          {
            id: 'sindhi-q1',
            question: 'Sindhi zaban je 52 haroof-e-tahajji mein "ٻ" akhar ji banawat mein ketra nukta aahin?',
            options: ['Hek nukto heth', 'Ba nukta heth (Ubhari/Vertical)', 'Te nukta mathi', 'Char nukta heth'],
            correctIndex: 1,
            explanation: 'Sindhi letter "ٻ" features two vertical dots positioned below the base shape.'
          }
        ]
      },
      {
        id: 'lang-topic-4',
        subjectId: 'urdu-sindhi',
        subjectName: 'Urdu or Sindhi',
        topicNumber: '04',
        title: 'Sindhi Boli ji Tadrees (Parrhan, Likhan, Budhan, Galhaein)',
        readTime: '13 min read · High Yield',
        dcarClassRange: 'Class 1 to 8 STBB / DCAR Competencies',
        summary: 'First language pedagogy for Sindhi: Four skills (Budhan, Galhaein, Parrhan, Likhan), teaching Sindhi folklore (Akhaniyun, Pahaka), Sufi poetry recitation, and creative composition.',
        highYieldAlert: '🚨 EXAM ALERT: Teaching Sindhi Folklore: "Pahaka" (Proverbs) and "Wadhandar Akhaniyun" (Folk tales) provide moral guidance and contextual idioms. Examiners test comprehension of famous Sindhi proverbs (e.g. "Hath hik hath saan taali na wajandi aa").',
        didacticStrategy: {
          frameworkName: 'Sindhi Boli ji Chaar Hunar (Four Language Skills) Didactics',
          creatorOrOrigin: 'Sindh Textbook Board & DCAR Guidelines',
          coreStages: [
            '1. Budhan (Listening): Listening to native folklore and expressive storytelling.',
            '2. Galhaein (Speaking): Reciting Sufi bait, role-play, dialogues.',
            '3. Parrhan (Reading): Fluency in Sindhi script, silent reading, comprehension.',
            '4. Likhan (Writing): Expressive Sindhi composition, orthographic mastery.'
          ],
          classroomImplementation: 'Conducting an oral storytelling circle where students listen to folk tales of Dodo Chanesar or Umar Marui before writing character descriptions in Sindhi.',
          commonStudentMisconception: 'Treating Sindhi reading purely as rote recitation without teaching paragraph structuring and expressive written essay drafting.',
          diagnosticIntervention: 'Incorporate creative writing prompts and peer review circles in Sindhi composition classes.'
        },
        keyFormulasOrRules: [
          'Chaar Hunar: Budhan (Listening) -> Galhaein (Speaking) -> Parrhan (Reading) -> Likhan (Writing).',
          'Pahaka: Traditional folk proverbs carrying moral and cultural wisdom.'
        ],
        concepts: [
          {
            conceptTitle: '1. Asnaf-e-Adab ji Tadrees (Sindhi Literature Didactics)',
            explanation: 'Sindhi literary instruction bridges traditional folk culture with modern analytical discourse.',
            keyTerms: [
              { term: 'Pahaka (Proverbs)', definition: 'Traditional proverbs reflecting cultural wisdom and idiomatic values.' },
              { term: 'Bait o Kafi', definition: 'Traditional poetic forms utilized by Shah Abdul Latif Bhittai and Sachal Sarmast.' }
            ],
            bulletPoints: [
              'Oral tradition forms the rich foundation of early childhood language development in Sindh.',
              'Bilingual children in Sindh benefit when their mother tongue is validated as a vehicle for academic thinking.'
            ]
          }
        ],
        comparisonTable: {
          title: 'The Four Skills in Sindhi Language Instruction (Chaar Hunar)',
          headers: ['Skill (Hunar)', 'Nature', 'Classroom Activity', 'Assessment Goal'],
          rows: [
            ['ٻڌڻ (Budhan - Listening)', 'Receptive (Oral)', 'Listening to folk tales and poetry', 'Auditory comprehension and focus'],
            ['ڳالهائڻ (Galhaein - Speaking)', 'Productive (Oral)', 'Storytelling, debates, dialogues', 'Oral fluency, confidence, pronunciation'],
            ['پڙهڻ (Parrhan - Reading)', 'Receptive (Written)', 'STBB text reading, silent reading', 'Fluency, vocabulary, textual comprehension'],
            ['لکڻ (Likhan - Writing)', 'Productive (Written)', 'Creative essays, letters, dictation', 'Orthographic accuracy and expressive prose']
          ]
        },
        classroomApplication: 'Sindhi Bait Recitation Workshop: Students recite selected stanzas from Sur Kalyan, analyzing themes of peace and patience while practicing native Sindhi pronunciation.',
        mnemonicAid: '🧠 "ب-ڳ-پ-ل" (Budhan, Galhaein, Parrhan, Likhan).',
        frequentExamQuestions: [
          {
            question: 'Sindhi boli ji tadrees mein bhol (language) sikhna jo qudrati silsilo (natural sequence) kehero aahe?',
            answer: 'Budhan (Listening) -> Galhaein (Speaking) -> Parrhan (Reading) -> Likhan (Writing).'
          }
        ],
        quickQuiz: [
          {
            id: 'sindhi-q2',
            question: 'Sindhi boli je hunaran (language skills) mein "ڳالهائڻ" (Speaking) kehro hunar aahay?',
            options: ['Receptive hunar', 'Productive / Izhari hunar', 'Ghair-zaroori hunar', 'Sirf tehreeri hunar'],
            correctIndex: 1,
            explanation: 'Speaking (ڳالهائڻ) is an active Productive (Izhari) skill through which thoughts and language are expressed.'
          }
        ]
      },
      {
        id: 'lang-topic-5',
        subjectId: 'urdu-sindhi',
        subjectName: 'Urdu or Sindhi',
        topicNumber: '05',
        title: 'Mother Tongue Pedagogy: BICS, CALP & Bilingual Transition',
        readTime: '13 min read · High Yield',
        dcarClassRange: 'Class 1 to 8 STBB / DCAR Competencies',
        summary: 'Jim Cummins’ framework of language proficiency: Basic Interpersonal Communicative Skills (BICS) vs Cognitive Academic Language Proficiency (CALP), Common Underlying Proficiency (CUP), and mother tongue scaffolding in multilingual Sindh.',
        highYieldAlert: '🚨 EXAM ALERT: Jim Cummins’ Theory: BICS (conversational playground language) takes 1–2 years to develop. CALP (formal academic language required for school tests and conceptual thinking) takes 5–7 years to develop. Abruptly abandoning the mother tongue before CALP develops damages academic achievement.',
        didacticStrategy: {
          frameworkName: 'Mother-Tongue-Based Multilingual Education (MTB-MLE)',
          creatorOrOrigin: 'Jim Cummins & UNESCO Language Guidelines',
          coreStages: [
            '1. L1 Foundation (Mother Tongue): Building deep conceptual understanding, vocabulary, and CALP.',
            '2. Language Bridging: Introducing L2 (Urdu/English) oral communication while maintaining L1 concept base.',
            '3. Transfer of Cognitive Skills: Reading and analytical skills acquired in L1 transfer effortlessly to L2.',
            '4. Biliteracy: Full academic competence in both languages.'
          ],
          classroomImplementation: 'In an early primary school in rural Sindh, science and math concepts are first explained in the mother tongue (Sindhi) before introducing technical terms in English and Urdu, building confidence.',
          commonStudentMisconception: 'Assuming that code-switching (mixing languages) is a sign of cognitive deficiency.',
          diagnosticIntervention: 'Recognize that translanguaging is a natural communicative strategy used by multilingual speakers to bridge cognitive meaning.'
        },
        keyFormulasOrRules: [
          'BICS: Basic Interpersonal Communicative Skills (1–2 years).',
          'CALP: Cognitive Academic Language Proficiency (5–7 years).',
          'Dual Iceberg Hypothesis (Cummins): While surface languages appear separate, underlying cognitive proficiency is unified and shared.'
        ],
        concepts: [
          {
            conceptTitle: '1. Jim Cummins’ Linguistic Interdependence Principle',
            explanation: 'Literacy skills learned in one language transfer to other languages through a common underlying cognitive engine.',
            keyTerms: [
              { term: 'BICS (Playground Language)', definition: 'Context-embedded everyday conversational fluency.' },
              { term: 'CALP (Academic Language)', definition: 'Context-reduced, cognitively demanding academic language needed for school success.' },
              { term: 'Common Underlying Proficiency (CUP)', definition: 'The shared cognitive foundation supporting bilingual learners.' }
            ],
            bulletPoints: [
              'Strong literacy in mother tongue provides the scaffolding for learning English and Urdu.',
              'Premature immersion in an unfamiliar language without scaffolding increases dropout rates.'
            ]
          }
        ],
        comparisonTable: {
          title: 'Jim Cummins: BICS vs. CALP in Language Education',
          headers: ['Dimension', 'BICS (Conversational Language)', 'CALP (Academic Language)'],
          rows: [
            ['Full Name', 'Basic Interpersonal Communicative Skills', 'Cognitive Academic Language Proficiency'],
            ['Acquisition Time', '1 to 2 years of immersion', '5 to 7 years of formal schooling'],
            ['Context Level', 'Context-embedded (gestures, face-to-face cues)', 'Context-reduced (textbooks, exams, abstract essays)'],
            ['Cognitive Demand', 'Low cognitive demand (greetings, playground talk)', 'High cognitive demand (analysis, synthesizing theories)'],
            ['Classroom Indicator', 'Student speaks English/Urdu well in corridor', 'Student struggles with complex science reading comprehension']
          ]
        },
        classroomApplication: 'Classroom Bridging: A teacher allows students in early grades to brainstorm ideas in their mother tongue in small groups before drafting final compositions in Urdu or English, enhancing creative depth.',
        mnemonicAid: '🧠 "BICS = Playground (2 yrs); CALP = Classroom (7 yrs)".',
        frequentExamQuestions: [
          {
            question: 'According to Jim Cummins, how long does it typically take a child to acquire CALP (Cognitive Academic Language Proficiency)?',
            answer: '5 to 7 years of formal education.'
          }
        ],
        quickQuiz: [
          {
            id: 'lang-q5',
            question: 'In educational linguistics, what does the acronym CALP formulated by Jim Cummins stand for?',
            options: [
              'Creative Art and Language Practice',
              'Cognitive Academic Language Proficiency',
              'Classroom Assessment for Literacy Proficiency',
              'Contextual Adaptive Language Paradigm'
            ],
            correctIndex: 1,
            explanation: 'CALP stands for Cognitive Academic Language Proficiency, representing the formal academic register necessary for school success.'
          }
        ]
      }
    ]
  }
];
