import { StbbTopic, StbbMcq } from './stbbClassFiveScienceData';
import {
  StbbChapterConfig,
  StbbComparisonMatrix
} from './stbbChapterTwoMicroorganismsData';

export const STBB_CH3_TOPICS: StbbTopic[] = [
  {
    id: 1,
    slug: 'introduction-to-seeds',
    title: 'Topic 1: Introduction to Seeds & Core Inquiries',
    shortExplanation:
      'Seeds are nature’s tiny life-capsules found inside fruits and vegetables. Varying enormously in size from tiny mustard grains to large mango stones, each viable seed holds a miniature baby plant (embryo) and stored food capable of growing into a seedling and eventually a towering tree!',
    keyCharacteristics: {
      heading: 'Key Scientific Facts About Seeds',
      points: [
        'Where Seeds Are Found: Seeds develop inside fruits and vegetables (such as bean pods, mangoes, tomatoes, apples, peas, and pumpkins).',
        'Wide Variation in Size & Appearance: Seeds vary dramatically in size, shape, and colour — some are tiny (mustard, sesame, poppy) while others are large (mango kernel, avocado, coconut).',
        'Life Journey: Under suitable conditions, a dormant seed germinates into a tender baby plant (seedling) and grows into a mature plant or tall tree.',
        'Where Do Seeds Get Energy? Seeds do NOT eat outside food; instead, they break down rich food stored inside their cotyledons or endosperm to release energy for early growth!',
        'Edible vs. Non-Edible Seeds: Many seeds are nutritious human foods (beans, peas, chickpeas, maize, wheat, almonds), whereas others are inedible or bitter/toxic (apple pips, peach pits, castor seeds).',
        'Seedless Fruits Inquiry: Not every fruit contains seeds! Bananas, seedless grapes, and seedless watermelons develop fruits without mature seeds.'
      ],
      table: {
        headers: ['Seed Category', 'Examples', 'Edible for Humans?', 'Key Characteristic'],
        rows: [
          ['Legume / Pulse Seeds', 'French bean, Pea, Chickpea (Gram)', '✅ Yes — rich in protein', 'Two cotyledons (dicots) storing food'],
          ['Cereal Grain Seeds', 'Maize (corn), Wheat, Rice', '✅ Yes — staple energy food', 'Single cotyledon (monocot) + starchy endosperm'],
          ['Hard Fruit Kernels / Pips', 'Apple seeds, Mango stone, Peach pit', '❌ Generally not eaten', 'Tough outer coat protecting internal embryo'],
          ['Seedless Fruits (Special Case)', 'Banana, Seedless grapes, Pineapple', '✅ Fruit pulp eaten directly', 'Develop without hard mature seeds inside']
        ]
      }
    },
    deepDiveHeading: 'Answering Chapter 3’s Big Scientific Questions',
    deepDiveSections: [
      {
        title: 'Do Seeds Eat? Where Does Energy Come From?',
        emoji: '⚡',
        points: [
          'Before green leaves appear above ground, a buried seed cannot perform photosynthesis.',
          'Instead, oxygen enables cellular respiration to unlock stored starch, protein, and oils packed inside cotyledons or endosperm!'
        ]
      },
      {
        title: 'Are All Seeds Similar Inside?',
        emoji: '🔍',
        points: [
          'All true seeds share three essentials: a protective seed coat, a tiny micropyle pore, and a baby embryo.',
          'However, dicot seeds (French bean) split into TWO cotyledons, while monocot seeds (maize) possess ONE cotyledon plus an endosperm!'
        ]
      }
    ],
    realWorldExamples: [
      {
        name: 'French Bean & Chickpea',
        emoji: '🫘',
        description: 'Nutritious edible dicot seeds packed with plant protein stored directly inside their two plump cotyledons.'
      },
      {
        name: 'Maize Cob Kernels',
        emoji: '🌽',
        description: 'Each yellow corn kernel on a cob is a monocot seed storing energy inside its starchy endosperm.'
      },
      {
        name: 'Banana (Seedless Fruit)',
        emoji: '🍌',
        description: 'Classic classroom example of a popular fruit containing tiny dark specks instead of hard germinating seeds.'
      }
    ],
    mnemonic: {
      acronym: 'S-E-E-D',
      meaning: 'Stored Food · Embryo Inside · Emerges as Seedling · Develops in Fruit',
      items: [
        { letter: 'S', word: 'Stored Food', note: 'Packed inside cotyledons or endosperm for energy.' },
        { letter: 'E', word: 'Embryo', note: 'Tiny baby plant waiting inside the protective coat.' },
        { letter: 'E', word: 'Emerges', note: 'Sprouts into a baby plant and grows into a tall tree.' },
        { letter: 'D', word: 'Develops', note: 'Found inside fruits and vegetables of varying sizes.' }
      ]
    },
    flowchartAscii: `  [ Fruit / Vegetable ] ──contains──▶ [ Dormant Seed (Embryo + Stored Food) ]
                                                        │
                              + Water + Oxygen + Proper Temperature
                                                        ▼
             [ Tall Mature Tree / Plant ] ◀──grows── [ Baby Plant (Seedling) ]`,
    vennDiagram: {
      leftTitle: 'EDIBLE SEEDS',
      leftPoints: [
        'Safe, digestible & rich in nutrients',
        'Provide proteins, carbohydrates & healthy fats',
        'Examples: French bean, chickpea, pea, maize, wheat'
      ],
      middleTitle: 'ALL PLANT SEEDS SHARE',
      middlePoints: [
        'Formed inside fruits/pods of plants',
        'Contain an embryo and protective seed coat',
        'Grow into a new plant under right conditions'
      ],
      rightTitle: 'NON-EDIBLE SEEDS',
      rightPoints: [
        'Hard, woody, bitter, or contain harmful compounds',
        'Discarded rather than eaten by humans',
        'Examples: Apple pips, peach/plum stones, castor seed'
      ]
    },
    riddle: {
      prompt: 'I sleep quietly inside fruits and pods carrying my own packed lunch; give me water, air, and warmth and I wake up to become a tall tree! What am I?',
      answer: 'A Seed',
      explanation: 'Every viable seed contains a dormant embryo and stored food that germinates into a baby seedling when water, oxygen, and warmth are provided.'
    },
    unscrambles: [
      { scrambled: 'GNILDEES', solution: 'SEEDLING', hint: 'A young baby plant newly sprouted from a seed.' },
      { scrambled: 'OYRBME', solution: 'EMBRYO', hint: 'The miniature baby plant tucked inside a seed.' }
    ],
    secretCodeActivity: {
      cipher: 'A=1, B=2, C=3 ... Z=26',
      items: [
        {
          encoded: '19 - 5 - 5 - 4',
          answer: 'SEED',
          sentence: 'Every fruit-bearing plant begins its new life cycle from a tiny protective SEED.'
        },
        {
          encoded: '5 - 13 - 2 - 18 - 25 - 15',
          answer: 'EMBRYO',
          sentence: 'Inside every viable seed sleeps a miniature baby plant called the EMBRYO.'
        }
      ]
    }
  },
  {
    id: 2,
    slug: 'structure-of-french-bean-seed',
    title: 'Topic 2: Structure of a French Bean Seed (Dicot)',
    shortExplanation:
      'A French bean seed is a classic dicotyledonous (dicot) seed because it neatly splits into two seed halves called cotyledons. Its four key parts — seed coat (testa), micropyle, cotyledons, and embryo — work together to protect and nourish the future plant.',
    keyCharacteristics: {
      heading: 'Four Essential Parts of a French Bean Seed',
      points: [
        '1. Seed Coat (Testa): Tough outer protective covering wrapped around the bean seed to shield inner tissues from physical injury, drying, and germs.',
        '2. Micropyle: A tiny pinpoint opening (pore) visible near the scar on the seed coat through which water enters when the seed is soaked.',
        '3. Cotyledons (Two Halves): Two thick, fleshy halves of the bean seed that store food for germination — making French bean a dicotyledonous (dicot) plant.',
        '4. Embryo: The delicate miniature baby plant nestled safely between the two cotyledons, containing tiny structures that form the root, stem, and first leaves.'
      ],
      table: {
        headers: ['Part of Bean Seed', 'Scientific Term / Count', 'Location', 'Primary Biological Function'],
        rows: [
          ['Outer Covering', 'Seed coat (Testa)', 'Outermost surface layer', 'Protects internal embryo & cotyledons from damage'],
          ['Tiny Pore', 'Micropyle', 'Small opening on seed coat', 'Allows water (and air) to enter and swell the seed'],
          ['Seed Halves', 'Cotyledons (2 halves)', 'Fill bulk of bean interior', 'Store food reserves & later become first green leaves'],
          ['Mini Baby Plant', 'Embryo (1 per seed)', 'Attached between cotyledons', 'Develops downward into root and upward into stem & leaves']
        ]
      }
    },
    deepDiveHeading: 'Inside the Dicot French Bean Seed',
    deepDiveSections: [
      {
        title: 'Seed Coat (Testa) & Micropyle Pore',
        emoji: '🛡️',
        points: [
          'Dry bean testa feels hard and smooth; soaking in water softens it until it wrinkles and splits open.',
          'Gently squeezing a soaked bean seed reveals a tiny droplet of water oozing right out of the micropyle!'
        ]
      },
      {
        title: 'Two Cotyledons & Miniature Embryo',
        emoji: '🫘',
        points: [
          'Peeling off the soaked seed coat lets the French bean open cleanly like a book into TWO equal cotyledons.',
          'Tucked along the hinge between the two halves lies the white embryo ready to sprout root and shoot!'
        ]
      }
    ],
    realWorldExamples: [
      {
        name: 'Red Kidney / French Bean',
        emoji: '🫘',
        description: 'Large kidney-shaped dicot seed ideal for classroom dissection with a hand lens because its embryo and two cotyledons are big and clear.'
      },
      {
        name: 'Chickpea (Chana)',
        emoji: '🧆',
        description: 'Pointed beak shows a prominent micropyle pore; splits into chana dal (two yellow dicot cotyledons)!'
      },
      {
        name: 'Garden Green Pea',
        emoji: '🫛',
        description: 'Smooth spherical dicot seed inside green pods with a protective testa and two food-packed seed halves.'
      }
    ],
    mnemonic: {
      acronym: 'T-M-C-E',
      meaning: 'Four Parts of a French Bean Seed — Testa · Micropyle · Cotyledons · Embryo',
      items: [
        { letter: 'T', word: 'Testa (Seed Coat)', note: 'Tough outer armor protecting the seed.' },
        { letter: 'M', word: 'Micropyle', note: 'Tiny doorway pore letting water soak inside.' },
        { letter: 'C', word: 'Cotyledons (×2)', note: 'Two fleshy halves storing food (Dicot!).' },
        { letter: 'E', word: 'Embryo', note: 'Mini plant inside developing into root, stem & leaves.' }
      ]
    },
    flowchartAscii: `            ANATOMY OF A FRENCH BEAN SEED (DICOT)
    ┌──────────────────────────────────────────────────┐
    │  Outer Layer:  Seed Coat (Testa) ──▶ Protects    │
    │  Tiny Pore:    Micropyle         ──▶ Water Entry │
    │  Inner Halves: 2 Cotyledons      ──▶ Food Store  │
    │  Core Axis:    Embryo            ──▶ Baby Plant  │
    └──────────────────────────────────────────────────┘`,
    vennDiagram: {
      leftTitle: 'SEED COAT (TESTA)',
      leftPoints: [
        'Forms the tough outer protective skin',
        'Contains the tiny micropyle opening',
        'Ruptures and falls to soil during sprouting'
      ],
      middleTitle: 'PROTECT & GROW TEAMWORK',
      middlePoints: [
        'Essential parts of every French bean seed',
        'Respond to water absorption at germination',
        'Ensure safe survival of the baby plant'
      ],
      rightTitle: 'COTYLEDONS & EMBRYO',
      rightPoints: [
        'Located safely inside the seed coat',
        'Cotyledons supply food energy for growth',
        'Embryo grows into new root, stem & leaves'
      ]
    },
    riddle: {
      prompt: 'I am a tiny pinhole doorway on the outer coat of a bean seed that drinks in water to wake the sleeping embryo. What am I?',
      answer: 'Micropyle',
      explanation: 'The micropyle is the small opening in the seed coat (testa) through which water enters the seed to trigger swelling and germination.'
    },
    unscrambles: [
      { scrambled: 'ATSET', solution: 'TESTA', hint: 'Scientific name for the outer protective seed coat.' },
      { scrambled: 'ELYPORCIM', solution: 'MICROPYLE', hint: 'Tiny pore in the seed coat that lets water enter.' }
    ],
    secretCodeActivity: {
      cipher: 'A=1, B=2, C=3 ... Z=26',
      items: [
        {
          encoded: '20 - 5 - 19 - 20 - 1',
          answer: 'TESTA',
          sentence: 'The protective outer seed coat of a French bean seed is scientifically called the TESTA.'
        }
      ]
    }
  },
  {
    id: 3,
    slug: 'epigeal-germination-french-bean',
    title: 'Topic 3: Epigeal Germination of a French Bean Seed',
    shortExplanation:
      'When a French bean seed germinates, its curved hook-like hypocotyl pulls the two cotyledons up ABOVE the soil surface! Germination in which cotyledons emerge above ground is called Epigeal Germination.',
    keyCharacteristics: {
      heading: 'Step-by-Step Sequence of Epigeal Germination (STBB Textbook)',
      points: [
        'Step 1 — Root Emerges First: After absorbing water, the young root breaks out first and grows straight downwards into the soil to anchor and absorb water.',
        'Step 2 — Hook-Like Hypocotyl: A curved hook-like stem structure called the hypocotyl pushes upward through the soil.',
        'Step 3 — Cotyledons Pulled Above Ground: Straightening up, the hypocotyl pulls the two cotyledons (carrying the plumule/embryo) right above the soil surface!',
        'Step 4 — Seed Coat Drops Off: Cotyledons form the tip of the young plant above soil while the empty ruptured seed coat falls off onto the soil.',
        'Step 5 — Photosynthesis & Cotyledon Shriveling: True green leaves unfold and start photosynthesis; once stored food is used up, the cotyledons shrivel and fall off.',
        'STBB Syllabus Examples: In the STBB Class 5 Science textbook, French bean, Pea, and Chickpea are cited as seeds that germinate in this manner!'
      ],
      table: {
        headers: ['Stage #', 'Key Structure Involved', 'Observable Action During Bean Germination'],
        rows: [
          ['Stage 1', 'Young Root (Radicle)', 'Emerges first from swollen seed and grows downwards into soil'],
          ['Stage 2', 'Hypocotyl (Curved Hook)', 'Arches upward out of the soil protecting delicate shoot tip'],
          ['Stage 3', 'Two Cotyledons + Embryo', 'Pulled above soil surface by hypocotyl; seed coat falls off'],
          ['Stage 4', 'First True Green Leaves', 'Unfold in sunlight and take over food making via photosynthesis'],
          ['Stage 5', 'Exhausted Cotyledons', 'Shrivel up and drop off once stored food is depleted']
        ]
      }
    },
    deepDiveHeading: 'Why Epigeal Means "Above Earth"',
    deepDiveSections: [
      {
        title: 'Role of the Curved Hypocotyl Hook',
        emoji: '🪝',
        points: [
          'Pushing tender embryonic leaves straight through rough soil grains would tear them.',
          'The arched hypocotyl hook breaks crusted soil safely first, then straightens in sunlight to lift cotyledons skyward!'
        ]
      },
      {
        title: 'Epi = Above + Geal = Earth',
        emoji: '🌱',
        points: [
          'Easy memory rule: EPI-geal = cotyledons EXIT UP above ground (French bean).',
          'Once exposed to sunlight above soil, bean cotyledons turn green and photosynthesize briefly like temporary first leaves!'
        ]
      }
    ],
    realWorldExamples: [
      {
        name: 'French Bean Sprouting',
        emoji: '🌱',
        description: 'Classic textbook model where two pale halves rise above garden soil, turn green in sunlight, and later wither away.'
      },
      {
        name: 'Pea & Chickpea (STBB Note)',
        emoji: '🫛',
        description: 'Highlighted alongside French bean in the STBB Class 5 chapter section on bean germination.'
      },
      {
        name: 'Sunflower Seedling',
        emoji: '🌻',
        description: 'Often lifts its striped black-and-white seed coat right up on top of its twin cotyledons before shedding it!'
      }
    ],
    mnemonic: {
      acronym: 'R-H-C-L-S',
      meaning: 'Five Stages of Bean Sprouting — Root · Hypocotyl · Cotyledons Up · Leaves · Shrivel',
      items: [
        { letter: 'R', word: 'Root Down', note: 'Root emerges first and grows downwards.' },
        { letter: 'H', word: 'Hypocotyl Hook', note: 'Hook-like stem arches out of the soil.' },
        { letter: 'C', word: 'Cotyledons Up', note: 'Pulled ABOVE ground (= Epigeal!); coat drops.' },
        { letter: 'L', word: 'Leaves Open', note: 'True green leaves start photosynthesis.' },
        { letter: 'S', word: 'Shrivel & Fall', note: 'Spent cotyledons shrivel and drop off.' }
      ]
    },
    flowchartAscii: `EPIGEAL GERMINATION (COTYLEDONS EMERGE ABOVE SOIL):

  [Soaked Bean] ─▶ [1. Root Down ↓] ─▶ [2. Hypocotyl Hook ↑] ─▶ [3. Cotyledons Pulled ABOVE Soil]
                                                                               │
                         [5. Cotyledons Shrivel & Fall Off] ◀─ [4. True Leaves Start Photosynthesis]`,
    vennDiagram: {
      leftTitle: 'EARLY STAGE (UNDERGROUND)',
      leftPoints: [
        'Seed coat ruptures after absorbing water',
        'Young root emerges first downward',
        'Energy comes solely from stored cotyledon food'
      ],
      middleTitle: 'CONTINUOUS GROWTH PROCESS',
      middlePoints: [
        'Driven by water, oxygen & warmth',
        'Guided by hypocotyl elongation',
        'Builds independent leafy bean plant'
      ],
      rightTitle: 'LATE STAGE (ABOVE GROUND)',
      rightPoints: [
        'Cotyledons lifted above soil & turn green',
        'True leaves unfold to perform photosynthesis',
        'Empty cotyledons shrivel and drop off'
      ]
    },
    riddle: {
      prompt: 'I am a curved hook-like structure in a germinating French bean that pulls the cotyledons up above the soil. What is my name?',
      answer: 'Hypocotyl',
      explanation: 'In epigeal germination of a French bean, the hook-shaped hypocotyl emerges from soil and pulls the cotyledons and embryo above ground.'
    },
    unscrambles: [
      { scrambled: 'LAEGPIE', solution: 'EPIGEAL', hint: 'Type of germination in which cotyledons emerge above the soil surface.' },
      { scrambled: 'LYTOCOPYH', solution: 'HYPOCOTYL', hint: 'Hook-like structure that pulls French bean cotyledons above ground.' }
    ]
  },
  {
    id: 4,
    slug: 'maize-seed-hypogeal-germination',
    title: 'Topic 4: Structure & Hypogeal Germination of a Maize Seed',
    shortExplanation:
      'A maize (corn) seed is a monocot having a single cotyledon plus a food-rich endosperm. When maize germinates, a straight stalk called the coleoptile pierces upward out of the soil while the cotyledon and seed coat stay buried UNDERGROUND — called Hypogeal Germination!',
    keyCharacteristics: {
      heading: 'Maize Seed Parts & Hypogeal Germination Steps',
      points: [
        '1. Seed Coat & Micropyle: Protective outer layer covering the maize grain with a tiny micropyle opening.',
        '2. Endosperm (Food Warehouse): Large food-storing region inside the maize seed that nourishes the embryo during germination.',
        '3. Single Cotyledon (Monocot): Maize has ONE cotyledon whose key job is transferring food from the endosperm to the growing embryo.',
        '4. Embryo: Miniature plant axis that grows downward into the root (radicle) and upward into stem and leaves.',
        '5. Hypogeal Germination Sequence: Root (radicle) grows down first → straight stalk called COLEOPTILE grows up out of soil → coleoptile splits so green stem & leaves emerge → cotyledon & seed coat STAY BELOW SOIL!',
        '6. Delayed Photosynthesis: Nourished by the endosperm underground, photosynthesis does NOT occur until the first green leaves emerge into light.'
      ],
      table: {
        headers: ['Structure in Maize', 'Present in French Bean?', 'Specific Role in Maize Germination'],
        rows: [
          ['Seed Coat & Micropyle', '✅ Yes (both have it)', 'Protects grain & admits water for swelling'],
          ['Endosperm', '❌ Absent in mature bean', 'Stores starch/food energy used during germination'],
          ['Single Cotyledon', 'Bean has TWO instead', 'Transfers food from endosperm to growing embryo'],
          ['Radicle (Primary Root)', '✅ Yes (root first)', 'Emerges first and anchors downward in soil'],
          ['Coleoptile', '❌ Bean has hypocotyl hook', 'Straight protective stalk growing up out of soil, then splits for leaves']
        ]
      }
    },
    deepDiveHeading: 'Monocot Endosperm & Coleoptile Mechanics',
    deepDiveSections: [
      {
        title: 'Straight Coleoptile vs. Curved Hypocotyl',
        emoji: '🌾',
        points: [
          'Maize does NOT form a bent hook; instead, a pointed straight sheath called the coleoptile spears straight upward through soil.',
          'Once above soil, the coleoptile splits open at its tip and rolled green leaves unfurl upward!'
        ]
      },
      {
        title: 'Hypo = Below + Geal = Earth',
        emoji: '⏬',
        points: [
          'Easy memory trick: HYPO-geal = cotyledon hides UNDERGROUND below the soil!',
          'Throughout sprouting, both the seed coat and single cotyledon remain buried inside the soil drawing food from the endosperm.'
        ]
      }
    ],
    realWorldExamples: [
      {
        name: 'Sweet Corn / Maize Seedling',
        emoji: '🌽',
        description: 'Sharp pale green spear (coleoptile) pokes straight out of soil while the yellow kernel stays buried underneath.'
      },
      {
        name: 'Wheat & Rice Grains',
        emoji: '🌾',
        description: 'Fellow monocot cereal grains with a single cotyledon, starchy endosperm, and underground hypogeal sprouting.'
      },
      {
        name: 'Popcorn Kernel Secret',
        emoji: '🍿',
        description: 'When heated, moisture trapped inside maize’s hard starchy endosperm turns to steam and pops into fluffy white foam!'
      }
    ],
    mnemonic: {
      acronym: 'E-C-R-C-H',
      meaning: 'Maize Mastery — Endosperm · Cotyledon (1) · Radicle · Coleoptile · Hypogeal',
      items: [
        { letter: 'E', word: 'Endosperm', note: 'Stores food energy inside the maize grain.' },
        { letter: 'C', word: 'Cotyledon (×1)', note: 'Single monocot cotyledon passes food to embryo.' },
        { letter: 'R', word: 'Radicle First', note: 'Young root grows downwards into soil first.' },
        { letter: 'C', word: 'Coleoptile Up', note: 'Straight stalk emerges out of soil & splits.' },
        { letter: 'H', word: 'Hypogeal', note: 'Cotyledon & coat stay BELOW ground in soil!' }
      ]
    },
    flowchartAscii: `HYPOGEAL GERMINATION OF MAIZE (COTYLEDON REMAINS BELOW SOIL):

  [Maize Grain in Soil] ─▶ [1. Radicle (Root) Grows Down ↓]
           │
     Endosperm feeds embryo via single Cotyledon (stays UNDERGROUND!)
           ▼
  [2. Straight Stalk (Coleoptile) Grows Up ↑] ─▶ [3. Coleoptile Splits ─▶ Green Leaves Start Photosynthesis!]`,
    vennDiagram: {
      leftTitle: 'HYPOCOTYL (FRENCH BEAN)',
      leftPoints: [
        'Shaped like a bent arch / hook',
        'Pulls two cotyledons up ABOVE soil',
        'Characteristic of Epigeal germination'
      ],
      middleTitle: 'EMERGING SHOOT STRUCTURES',
      middlePoints: [
        'Appear right after primary root grows down',
        'Push upward against gravity toward light',
        'Deliver first leaves safely into sunlight'
      ],
      rightTitle: 'COLEOPTILE (MAIZE)',
      rightPoints: [
        'Shaped like a pointed straight stalk',
        'Splits open above soil so leaves emerge',
        'Leaves single cotyledon buried BELOW soil (Hypogeal)'
      ]
    },
    riddle: {
      prompt: 'In a germinating maize grain, I am the straight pointed stalk that pushes out of the soil and splits open while the cotyledon stays buried underground. What am I?',
      answer: 'Coleoptile',
      explanation: 'During hypogeal germination of maize, the straight coleoptile emerges above soil and splits so stem and leaves grow out.'
    },
    unscrambles: [
      { scrambled: 'LAEGOPYH', solution: 'HYPOGEAL', hint: 'Germination type in which cotyledons remain below the soil.' },
      { scrambled: 'MREPSODNE', solution: 'ENDOSPERM', hint: 'Food-storing tissue inside a maize seed.' }
    ]
  },
  {
    id: 5,
    slug: 'activity-1-seed-dissection-and-20-day-jar-study',
    title: 'Topic 5: Activity 1 — Studying Seed Structure & 20-Day Germination',
    shortExplanation:
      'STBB Activity 1 turns students into hands-on botanists! Using dry and pre-soaked French bean and maize seeds, a hand lens, a blade, and transparent glass jars lined with wet tissue paper, students dissect internal seed organs and track live germination day-by-day for 20 days.',
    keyCharacteristics: {
      heading: 'Complete Laboratory Protocol for STBB Activity 1',
      points: [
        'Required Materials: Dry & pre-soaked French bean and maize seeds, magnifying hand lens, sharp blade (used carefully under supervision), transparent glasses/jars, tissue paper, and clean water.',
        'Part A — External Observation: Examine dry seeds with a hand lens to locate the outer seed coat and tiny micropyle opening.',
        'Part B — Bean Split Dissection: Gently split a pre-soaked French bean seed into two halves to expose the two cotyledons and miniature embryo; sketch and label!',
        'Part C — Maize Longitudinal Section: Cut a pre-soaked maize seed longitudinally (lengthwise) with a blade to clearly see the embryo, starchy endosperm, and single cotyledon; sketch and label!',
        'Part D — Transparent Glass Jar Setup: Line transparent glasses with wet tissue paper and slip seeds between the glass wall and damp tissue pointing in VARIOUS directions.',
        'Part E — 20-Day Scientific Log: Observe daily for 20 days, record root/shoot measurements in a table, and capture photographs — proving roots always bend downward (geotropism) and shoots upward regardless of seed orientation!'
      ],
      table: {
        headers: ['Lab Step', 'Specimen & Tool Used', 'What Students Observe & Record'],
        rows: [
          ['Step 1', 'Dry bean & maize + Hand lens', 'Hard seed coat surface and tiny pinhole micropyle'],
          ['Step 2', 'Pre-soaked French bean (split)', 'Two fleshy cotyledons separating cleanly + white embryo axis'],
          ['Step 3', 'Pre-soaked maize + Blade (longitudinal cut)', 'Distinct endosperm zone, single cotyledon shield & embryo'],
          ['Step 4', 'Seeds placed in varied directions in glass jar', 'Even upside-down seeds curve roots DOWN and shoots UP!'],
          ['Step 5', 'Daily 20-day observation log + photos', 'Day-by-day emergence of radicle, hypocotyl vs coleoptile & green leaves']
        ]
      }
    },
    deepDiveHeading: 'Why Lab Technique Matters in Activity 1',
    deepDiveSections: [
      {
        title: 'Why Pre-Soak & Cut Maize Longitudinally?',
        emoji: '🔬',
        points: [
          'Dry seeds are brittle and shatter if cut; soaking softens the seed coat and swells internal tissues.',
          'Unlike beans (which split cleanly in two), maize has only one fused seed coat + endosperm, so a lengthwise blade cut reveals all internal zones!'
        ]
      },
      {
        title: 'Placing Seeds in Various Directions!',
        emoji: '🧭',
        points: [
          'Why place seeds sideways, upright, and upside down between glass and wet tissue?',
          'Students witness firsthand that roots ALWAYS curve downward toward gravity while stems curve upward toward light!'
        ]
      }
    ],
    realWorldExamples: [
      {
        name: 'Glass-Wall Tissue Jar',
        emoji: '🫙',
        description: 'Transparent glass lets students watch underground root hairs and hypocotyl/coleoptile action normally hidden beneath dark soil!'
      },
      {
        name: '20-Day Observation Table',
        emoji: '📊',
        description: 'Builds real scientific inquiry skills: daily dates, drawings, root length in mm, leaf count, and photo evidence.'
      },
      {
        name: 'Farmer Seed Viability Check',
        emoji: '🚜',
        description: 'Sindh farmers test seed batches on wet cloth/paper before sowing acres of wheat, cotton, or maize to check germination percentage!'
      }
    ],
    mnemonic: {
      acronym: 'D-S-C-J-O',
      meaning: 'Activity 1 Lab Steps — Dry Lens · Split Bean · Cut Maize · Jar Setup · Observe 20 Days',
      items: [
        { letter: 'D', word: 'Dry Inspect', note: 'Use hand lens to spot seed coat & micropyle.' },
        { letter: 'S', word: 'Split Bean', note: 'Open soaked bean to draw 2 cotyledons & embryo.' },
        { letter: 'C', word: 'Cut Maize', note: 'Slice longitudinally to see endosperm & 1 cotyledon.' },
        { letter: 'J', word: 'Jar & Tissue', note: 'Place seeds in varied directions against glass.' },
        { letter: 'O', word: 'Observe 20d', note: 'Record daily table notes & photos for 20 days!' }
      ]
    },
    flowchartAscii: `STBB ACTIVITY 1 WORKFLOW (20-DAY INVESTIGATION):
  [Dry Seeds + Hand Lens] ─▶ [Soaked Bean Split] + [Soaked Maize Longitudinal Cut]
                                             │
                                             ▼
  [Glass Jar + Wet Tissue + Varied Seed Angles] ─▶ [Daily Log & Photos for 20 Days!]`,
    vennDiagram: {
      leftTitle: 'BEAN DISSECTION VIEW',
      leftPoints: [
        'Splits easily by hand without cutting',
        'Shows TWO symmetric fleshy cotyledons',
        'No separate endosperm layer visible'
      ],
      middleTitle: 'SEEN IN BOTH DISSECTIONS',
      middlePoints: [
        'Outer protective seed coat & micropyle',
        'Clear white baby embryo structure',
        'Swollen tissues softened by pre-soaking'
      ],
      rightTitle: 'MAIZE LONGITUDINAL CUT',
      rightPoints: [
        'Requires longitudinal slice with a blade',
        'Shows ONE cotyledon + large endosperm zone',
        'Seed coat fused tightly to grain wall'
      ]
    },
    riddle: {
      prompt: 'In STBB Activity 1, for how many consecutive days do students observe and record bean and maize germination in transparent glass jars?',
      answer: '20 days',
      explanation: 'Activity 1 instructs learners to observe seeds between glass wall and moist tissue daily for 20 days, recording observations in a table.'
    },
    unscrambles: [
      { scrambled: 'ELCIDAR', solution: 'RADICLE', hint: 'Embryonic root that emerges first downward during germination.' }
    ]
  },
  {
    id: 6,
    slug: 'french-bean-vs-maize-and-cotyledon-functions',
    title: 'Topic 6: French Bean vs. Maize Comparison & Functions of Cotyledons',
    shortExplanation:
      'Comparing French bean (dicot) and maize (monocot) highlights how seeds solve the same challenge in two clever ways — and spotlights the remarkable multi-tasking role of cotyledons in storing/transferring energy, acting as first photosynthetic leaves, and feeding humanity!',
    keyCharacteristics: {
      heading: 'Key Functions of Cotyledons & Seed Comparison',
      points: [
        '1. Essential Germination Organ: Cotyledons are vital parts of the embryo inside seeds that drive early seedling survival.',
        '2. Dual Food Supply Role: Cotyledons either store food directly themselves (as in French bean) OR absorb and transfer food from the endosperm to the seedling (as in maize).',
        '3. Energy for Growth: Stored carbohydrates, proteins, and oils supply all metabolic energy needed before true leaves form.',
        '4. First Photosynthetic Leaves (Epigeal): In epigeal seeds like French bean, cotyledons rise above soil, turn green, absorb sunlight and water, and perform photosynthesis!',
        '5. Temporary Support: On many seedlings, cotyledons remain attached even after the first true leaves appear, shriveling only when depleted.',
        '6. Human Food Powerhouse: Humans eat nutrient-rich cotyledons daily in beans, chickpeas, peas, lentils (daal), peanuts, and almonds!'
      ],
      table: {
        headers: ['Feature', 'French Bean Seed 🫘', 'Maize Seed 🌽'],
        rows: [
          ['Plant Group', 'Dicotyledonous (Dicot)', 'Monocotyledonous (Monocot)'],
          ['Number of Cotyledons', 'Two (2 halves)', 'One (1 single cotyledon)'],
          ['Endosperm Present?', '❌ Absent (food stored in cotyledons)', '✅ Present (stores food for embryo)'],
          ['Emerging Shoot Structure', 'Curved hook-like Hypocotyl', 'Straight stalk Coleoptile'],
          ['Position of Cotyledons', 'Pulled ABOVE ground', 'Remain BELOW ground inside soil'],
          ['Type of Germination', 'Epigeal Germination', 'Hypogeal Germination'],
          ['Shared Essentials', 'Seed coat, micropyle, embryo + Water, Oxygen, Proper Temp', 'Seed coat, micropyle, embryo + Water, Oxygen, Proper Temp']
        ]
      }
    },
    deepDiveHeading: 'How Cotyledons Serve Seedlings AND Humans',
    deepDiveSections: [
      {
        title: 'Solar-Powered First Leaves Above Soil',
        emoji: '☀️',
        points: [
          'When bean cotyledons emerge into sunlight above ground, they develop green chlorophyll.',
          'They absorb water and sunlight to manufacture food — acting as emergency solar panels until true leaves expand!'
        ]
      },
      {
        title: 'Daily Protein on Pakistani Dining Tables',
        emoji: '🍲',
        points: [
          'Every bowl of chana dal, moong, lobia (beans), or roasted peanuts is packed with energy originally stored inside plant cotyledons!',
          'Meanwhile chapati/cornbread flour comes largely from the starchy endosperm of monocot wheat and maize grains.'
        ]
      }
    ],
    realWorldExamples: [
      {
        name: 'Chickpea & Bean Dal',
        emoji: '🍲',
        description: 'Humans consume protein-rich food stored inside dicot cotyledons of chickpeas, beans, and peas.'
      },
      {
        name: 'Green Bean Cotyledons',
        emoji: '🌿',
        description: 'Turn visibly green above garden soil to photosynthesize alongside the emerging plumule leaves.'
      },
      {
        name: 'Maize Scutellum Cotyledon',
        emoji: '🌽',
        description: 'Acts like an underground bridge ferrying digested starch from endosperm directly into the growing corn embryo.'
      }
    ],
    mnemonic: {
      acronym: 'F-E-P-H',
      meaning: 'Four Superstar Jobs of Cotyledons — Food · Energy · Photosynthesis · Human Nutrition',
      items: [
        { letter: 'F', word: 'Food Store/ Relay', note: 'Hold food (bean) or pass food from endosperm (maize).' },
        { letter: 'E', word: 'Energy Supply', note: 'Fuel root and shoot emergence before leaves form.' },
        { letter: 'P', word: 'Photosynthesis', note: 'Turn green above soil in epigeal seeds as first leaves!' },
        { letter: 'H', word: 'Human Food', note: 'Eaten by people in beans, chickpeas, peas & nuts.' }
      ]
    },
    flowchartAscii: `                 FUNCTIONS OF COTYLEDONS IN GERMINATION
                                   │
     ┌─────────────────────────────┼─────────────────────────────┐
     ▼                             ▼                             ▼
[ Bean (Dicot) ]             [ Maize (Monocot) ]          [ Human Nutrition ]
Stores food directly +       Transfers food from          Eaten as protein-rich
rises above soil to          underground endosperm        beans, peas & chickpeas!
photosynthesize!             to growing embryo!`,
    vennDiagram: {
      leftTitle: 'FRENCH BEAN SEED',
      leftPoints: [
        'Dicot plant — TWO cotyledons',
        'Food stored directly inside cotyledons',
        'Hook-like hypocotyl lifts cotyledons ABOVE soil',
        'Undergoes Epigeal germination'
      ],
      middleTitle: 'SHARED BY BOTH SEEDS',
      middlePoints: [
        'Have seed coat, micropyle & embryo',
        'Root always emerges downward first',
        'Need water, oxygen & proper temperature'
      ],
      rightTitle: 'MAIZE SEED',
      rightPoints: [
        'Monocot plant — ONE single cotyledon',
        'Has distinct food-storing endosperm',
        'Straight coleoptile emerges; cotyledon stays BELOW soil',
        'Undergoes Hypogeal germination'
      ]
    },
    riddle: {
      prompt: 'We are the two halves of a bean seed: first we feed the buried baby plant, then we rise into sunlight and turn green like first leaves! What are we?',
      answer: 'Cotyledons (Seed Leaves)',
      explanation: 'In epigeal germination (e.g. French bean), cotyledons supply stored food energy and then emerge above soil to photosynthesize.'
    },
    unscrambles: [
      { scrambled: 'SNODELYTCO', solution: 'COTYLEDONS', hint: 'Seed leaves that store or supply food for the developing seedling.' }
    ]
  },
  {
    id: 7,
    slug: 'conditions-necessary-for-germination',
    title: 'Topic 7: Conditions Necessary for Germination',
    shortExplanation:
      'Why don’t dry beans inside a kitchen jar sprout on their own? Because every viable seed requires three mandatory external environmental conditions simultaneously — Water, Oxygen (Air), and Proper Temperature — to wake from dormancy and germinate!',
    keyCharacteristics: {
      heading: 'The Three Essential Conditions for Seed Germination',
      points: [
        '1. Water (Moisture): Seeds absorb water through the micropyle to swell up, soften, and burst open the hard seed coat — without water, the seed coat CANNOT break open and enzymes stay inactive!',
        '2. Oxygen (Air): Needed for cellular respiration, which breaks down stored food in cotyledons/endosperm to release vital energy for cell division and growth.',
        '3. Proper Temperature (Warmth): Each plant species requires an optimal temperature range — MOST seeds germinate best between 16°C and 24°C!',
        '4. Cool-Season Exception (High-Yield Exam Fact!): Certain cold-loving seeds such as RADISH and SPINACH germinate at much colder temperatures of 2°C – 4°C!',
        '5. Light Factor (Species-Specific): Most seeds germinate equally well in light or dark, though a few tiny seeds require light exposure while certain others require complete darkness.'
      ],
      table: {
        headers: ['Condition Required', 'Exact Biological Role in Germination', 'What Happens If Absent?'],
        rows: [
          ['Water (Moisture)', 'Swells seed, ruptures tough seed coat & dissolves stored food', 'Seed stays dry, hard & dormant; coat cannot break open'],
          ['Oxygen (from Air)', 'Drives respiration to break down food and release growth energy', 'Embryo suffocates with zero energy; seed rots anaerobically'],
          ['Proper Temperature', 'Activates growth enzymes (16–24°C for most; 2–4°C for radish/spinach)', 'Enzymes freeze/stall in cold or denature in extreme heat']
        ]
      }
    },
    deepDiveHeading: 'Temperature Ranges & Respiration Chemistry',
    deepDiveSections: [
      {
        title: '16–24°C Standard vs. 2–4°C Radish & Spinach!',
        emoji: '🌡️',
        points: [
          'Sukkur IBA STS Favourite Numbers: Most seeds = 16°C to 24°C.',
          'Winter vegetable exception = Radish (mooli) and Spinach (palak) can germinate in chilly soil at 2°C to 4°C!'
        ]
      },
      {
        title: 'Why Waterlogged Flooded Soil Kills Seeds!',
        emoji: '💧',
        points: [
          'Too much standing water pushes all air pockets out of soil!',
          'Without dissolved oxygen, buried seeds cannot respire stored food to get energy — so they fail to germinate!'
        ]
      }
    ],
    realWorldExamples: [
      {
        name: 'Dry Kitchen Pulses Jar',
        emoji: '🫙',
        description: 'Has air and room temperature (20°C), yet beans stay ungerminated for months because WATER is absent!'
      },
      {
        name: 'Radish & Spinach Winter Sowing',
        emoji: '🥬',
        description: 'Germinate briskly in cool winter beds down to 2–4°C when summer crops cannot sprout.'
      },
      {
        name: 'Pre-Soaking Seeds Overnight',
        emoji: '🥣',
        description: 'Gardeners soak beans and gram in water overnight so water rushes in via the micropyle to split the seed coat fast.'
      }
    ],
    mnemonic: {
      acronym: 'W-O-W',
      meaning: 'Three Germination Essentials — Water · Oxygen · Warmth (Proper Temp)',
      items: [
        { letter: 'W', word: 'Water', note: 'Swells seed & breaks open tough seed coat.' },
        { letter: 'O', word: 'Oxygen (Air)', note: 'Powers respiration to release food energy.' },
        { letter: 'W', word: 'Warmth (Temp)', note: '16–24°C for most seeds; 2–4°C for radish/spinach!' }
      ]
    },
    flowchartAscii: `            THREE MANDATORY KEYS TO UNLOCK GERMINATION:
   ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────────────┐
   │ 💧 WATER         │ +  │ 🌬️ OXYGEN (AIR)  │ +  │ 🌡️ PROPER TEMPERATURE   │
   │ Swells & breaks  │    │ Respiration for  │    │ 16–24°C (Most seeds)     │
   │ seed coat open   │    │ growth energy    │    │ 2–4°C (Radish & Spinach) │
   └────────┬─────────┘    └────────┬─────────┘    └────────────┬─────────────┘
            └───────────────────────┼───────────────────────────┘
                                    ▼
                        🌱 SUCCESSFUL GERMINATION!`,
    vennDiagram: {
      leftTitle: 'MOST COMMON SEEDS',
      leftPoints: [
        'Optimal temperature: 16°C – 24°C',
        'Include French bean, maize, pea & sunflower',
        'Stall if placed inside a cold refrigerator'
      ],
      middleTitle: 'UNIVERSAL GERMINATION NEEDS',
      middlePoints: [
        'Require water to swell & rupture seed coat',
        'Require oxygen for cellular respiration',
        'Require healthy live internal embryo'
      ],
      rightTitle: 'RADISH & SPINACH SEEDS',
      rightPoints: [
        'Cold-adapted winter vegetable seeds',
        'Can germinate at low temperatures of 2°C – 4°C',
        'Sown during cool winter season'
      ]
    },
    riddle: {
      prompt: 'Most seeds need 16–24°C to sprout, yet we two winter vegetables happily germinate even in chilly temperatures of 2–4°C! Name us.',
      answer: 'Radish and Spinach',
      explanation: 'While most seeds germinate at 16–24°C, STBB Class 5 Science highlights radish and spinach as cold-tolerant seeds germinating at 2–4°C.'
    },
    unscrambles: [
      { scrambled: 'NEGYXO', solution: 'OXYGEN', hint: 'Gas needed by seeds for respiration to release energy during germination.' }
    ]
  },
  {
    id: 8,
    slug: 'activity-2-investigating-germination-conditions',
    title: 'Topic 8: Activity 2 — Investigating Germination Conditions (4-Jar Experiment)',
    shortExplanation:
      'STBB Activity 2 proves scientifically that missing EVEN ONE of water, air (oxygen), or proper temperature stops germination dead in its tracks! By comparing four carefully controlled jars (A, B, C, D), only Control Jar 1 (A) sprouts!',
    keyCharacteristics: {
      heading: 'Experimental Design, Setup & Results of Activity 2',
      points: [
        'Scientific Question: Will a French bean seed germinate in the absence of water, air (oxygen), or proper temperature?',
        'Materials Used: Healthy French bean seeds, 4 glass jars / test tubes (1A, 2B, 3C, 4D), cotton wool, boiled and cooled water, cooking oil, and a refrigerator.',
        'Jar 1 (A) — Control Setup: Moist cotton wool at room temperature in open air → Water ✅, Air ✅, Proper Temp ✅ → SEEDS GERMINATE! 🌱',
        'Jar 2 (B) — Missing Water: Dry cotton wool at room temperature in open air → Water ❌, Air ✅, Proper Temp ✅ → DO NOT GERMINATE!',
        'Jar 3 (C) — Missing Proper Temperature: Moist cotton wool placed inside a cold refrigerator → Water ✅, Air ✅, Proper Temp ❌ → DO NOT GERMINATE!',
        'Jar 4 (D) — Missing Oxygen/Air: Seeds submerged in boiled & cooled water sealed with an oil layer on top → Water ✅, Air ❌, Proper Temp ✅ → DO NOT GERMINATE!'
      ],
      table: {
        headers: ['Jar ID', 'Experimental Setup', 'Water', 'Air (Oxygen)', 'Proper Temp', 'Final Outcome'],
        rows: [
          ['Jar 1 (A)', 'Moist cotton wool on lab table (Control)', '✅ Present', '✅ Present', '✅ Present', '✅ WILL GERMINATE! 🌱'],
          ['Jar 2 (B)', 'Dry cotton wool on lab table', '❌ Absent', '✅ Present', '✅ Present', '❌ Will NOT germinate'],
          ['Jar 3 (C)', 'Moist cotton wool inside refrigerator', '✅ Present', '✅ Present', '❌ Too cold', '❌ Will NOT germinate'],
          ['Jar 4 (D)', 'Boiled cooled water + floating oil layer', '✅ Present', '❌ Blocked!', '✅ Present', '❌ Will NOT germinate']
        ]
      }
    },
    deepDiveHeading: 'Clever Lab Tricks Examiners Love to Ask!',
    deepDiveSections: [
      {
        title: 'Why Boil Water, Cool It, AND Add Oil in Jar 4?',
        emoji: '🧪',
        points: [
          '1) Boiling water drives out all dissolved oxygen gas bubbles.',
          '2) Cooling prevents hot water from cooking/killing the live bean embryo!',
          '3) Floating oil forms an airtight seal stopping air oxygen from re-dissolving into the water!'
        ]
      },
      {
        title: 'Why Include Jar 1 (A) as a Fair-Test Control?',
        emoji: '⚖️',
        points: [
          'Jar 1 proves the batch of French bean seeds is alive and viable when all 3 conditions are met.',
          'Changing ONLY ONE variable per test jar (Jar 2 = water, Jar 3 = temperature, Jar 4 = air) makes the experiment scientifically valid!'
        ]
      }
    ],
    realWorldExamples: [
      {
        name: 'Jar 1 (A) — Lush Sprouts',
        emoji: '🌱',
        description: 'Roots pierce moist cotton within days and hypocotyl hooks lift bean cotyledons upward!'
      },
      {
        name: 'Jar 3 (C) — Fridge Dormancy',
        emoji: '❄️',
        description: 'Seeds swell slightly with water in the fridge, yet cold stalls growth enzymes completely.'
      },
      {
        name: 'Jar 4 (D) — Oil-Sealed Suffocation',
        emoji: '🫗',
        description: 'Without dissolved oxygen beneath the oil film, seeds cannot respire food and never sprout.'
      }
    ],
    mnemonic: {
      acronym: 'A-B-C-D',
      meaning: 'Four Jars Memory Map — All Good · Bone Dry · Cold Fridge · De-oxygenated Oil',
      items: [
        { letter: 'A', word: 'All 3 Present (Jar 1)', note: 'Water + Air + Warmth = GERMINATES!' },
        { letter: 'B', word: 'Bone Dry (Jar 2)', note: 'Dry cotton = No water = Fails.' },
        { letter: 'C', word: 'Cold Fridge (Jar 3)', note: 'Refrigerator = No proper temp = Fails.' },
        { letter: 'D', word: 'De-aired Oil (Jar 4)', note: 'Boiled cooled water + oil = No oxygen = Fails.' }
      ]
    },
    flowchartAscii: `ACTIVITY 2 — FOUR-JAR FAIR TEST RESULTS:

  Jar 1 (A): Moist Cotton + Room Temp + Open Air         ──▶ ✅ GERMINATES! 🌱
  Jar 2 (B): Dry Cotton   + Room Temp + Open Air         ──▶ ❌ NO (Missing Water)
  Jar 3 (C): Moist Cotton + Fridge    + Open Air         ──▶ ❌ NO (Missing Proper Temp)
  Jar 4 (D): Boiled Cooled Water + Oil Layer + Room Temp ──▶ ❌ NO (Missing Oxygen/Air)`,
    vennDiagram: {
      leftTitle: 'JAR 1 (A) — CONTROL',
      leftPoints: [
        'Has moisture, air & room warmth together',
        'Seed swells, respires & activates enzymes',
        'ONLY jar in which seeds germinate!'
      ],
      middleTitle: 'IDENTICAL FAIR-TEST CONSTANTS',
      middlePoints: [
        'Same healthy French bean seed batch',
        'Clean glass test tubes / jars',
        'Observed over identical time period'
      ],
      rightTitle: 'JARS 2, 3 & 4 — TEST JARS',
      rightPoints: [
        'Jar 2 lacks water; Jar 3 lacks warmth',
        'Jar 4 lacks air (boiled water + oil layer)',
        'Zero germination in all three jars!'
      ]
    },
    riddle: {
      prompt: 'In Activity 2, why is a thin layer of oil poured on top of boiled cooled water in Jar 4?',
      answer: 'To prevent air (oxygen) from entering and dissolving back into the water',
      explanation: 'Boiling removes dissolved oxygen, cooling protects the live seed from heat, and the oil layer blocks atmospheric oxygen from entering.'
    },
    unscrambles: [
      { scrambled: 'NOITANIMREG', solution: 'GERMINATION', hint: 'Process by which a seed sprouts and develops into a young seedling.' }
    ],
    secretCodeActivity: {
      cipher: 'A=1, B=2, C=3 ... Z=26',
      items: [
        {
          encoded: '23 - 1 - 20 - 5 - 18  /  15 - 24 - 25 - 7 - 5 - 14',
          answer: 'WATER / OXYGEN',
          sentence: 'Along with proper temperature, seeds must have WATER / OXYGEN to germinate.'
        }
      ]
    }
  }
];

export const STBB_CH3_MCQS_DATA: StbbMcq[] = [
  // SECTION A: Introduction & Bean Seed Structure (Q1–Q8)
  {
    id: 'stbb-c5-ch3-01',
    number: 1,
    section: 'A',
    sectionTitle: 'Intro & Bean Seed Structure',
    question: 'In flowering plants, where are seeds naturally formed and found?',
    options: ['Inside roots underground only', 'Inside fruits and vegetables', 'On dry rock surfaces', 'Inside animal bones'],
    correctIndex: 1,
    explanation: 'Seeds develop inside fruits and vegetables (such as bean pods, mangoes, apples, peas, and tomatoes).',
    topicRefId: 1
  },
  {
    id: 'stbb-c5-ch3-02',
    number: 2,
    section: 'A',
    sectionTitle: 'Intro & Bean Seed Structure',
    question: 'What is the scientific name for the tough outer protective covering of a French bean seed?',
    options: ['Endosperm', 'Testa (seed coat)', 'Coleoptile', 'Stomata'],
    correctIndex: 1,
    explanation: 'The outer protective covering of a seed is called the seed coat or testa.',
    topicRefId: 2
  },
  {
    id: 'stbb-c5-ch3-03',
    number: 3,
    section: 'A',
    sectionTitle: 'Intro & Bean Seed Structure',
    question: 'What is the small opening (tiny pore) in the seed coat of a bean seed called?',
    options: ['Micropyle', 'Hypocotyl', 'Chloroplast', 'Nosepiece'],
    correctIndex: 0,
    explanation: 'The micropyle is a tiny pore in the seed coat through which water enters the seed to start germination.',
    topicRefId: 2
  },
  {
    id: 'stbb-c5-ch3-04',
    number: 4,
    section: 'A',
    sectionTitle: 'Intro & Bean Seed Structure',
    question: 'A French bean seed splits into two halves (cotyledons), classifying it as a:',
    options: ['Monocotyledonous plant', 'Non-flowering moss', 'Dicotyledonous (dicot) plant', 'Fungus'],
    correctIndex: 2,
    explanation: 'French bean seeds possess two cotyledons (di = two), making French bean a dicotyledonous plant.',
    topicRefId: 2
  },
  {
    id: 'stbb-c5-ch3-05',
    number: 5,
    section: 'A',
    sectionTitle: 'Intro & Bean Seed Structure',
    question: 'Which tiny structure inside a seed is a miniature baby plant that develops into root, stem, and leaves?',
    options: ['Testa', 'Embryo', 'Micropyle', 'Shell'],
    correctIndex: 1,
    explanation: 'The embryo is the mini baby plant tucked inside the seed containing structures for the future root, stem, and leaves.',
    topicRefId: 2
  },
  {
    id: 'stbb-c5-ch3-06',
    number: 6,
    section: 'A',
    sectionTitle: 'Intro & Bean Seed Structure',
    question: 'Where does a germinating seed get its energy before green leaves develop?',
    options: [
      'From stored food packed inside its cotyledons or endosperm',
      'By hunting small insects in soil',
      'From photosynthesis in dark underground soil',
      'Seeds require zero energy to grow'
    ],
    correctIndex: 0,
    explanation: 'Seeds break down stored food reserves in their cotyledons (bean) or endosperm (maize) through respiration to get energy.',
    topicRefId: 1
  },
  {
    id: 'stbb-c5-ch3-07',
    number: 7,
    section: 'A',
    sectionTitle: 'Intro & Bean Seed Structure',
    question: 'Which of the following is a familiar example of a fruit that typically has NO mature seeds?',
    options: ['Mango', 'French bean pod', 'Banana', 'Peach'],
    correctIndex: 2,
    explanation: 'Bananas (and seedless grapes) are classic examples of fruits without mature hard seeds.',
    topicRefId: 1
  },
  {
    id: 'stbb-c5-ch3-08',
    number: 8,
    section: 'A',
    sectionTitle: 'Intro & Bean Seed Structure',
    question: 'Which of the following pairs consists of EDIBLE seeds eaten by humans for nutrition?',
    options: [
      'French bean and chickpea',
      'Apple pips and plastic beads',
      'Peach stones and pebbles',
      'Glass marbles and thorns'
    ],
    correctIndex: 0,
    explanation: 'French beans, peas, chickpeas, maize, and wheat are nutritious edible seeds consumed widely by humans.',
    topicRefId: 1
  },

  // SECTION B: Epigeal vs. Hypogeal & Maize Seed (Q9–Q18)
  {
    id: 'stbb-c5-ch3-09',
    number: 9,
    section: 'B',
    sectionTitle: 'Epigeal, Hypogeal & Maize Seed',
    question: 'During germination of both French bean and maize seeds, which structure ALWAYS emerges first?',
    options: ['Flower petals', 'The root (growing downwards)', 'Fruit pulp', 'Pollen grains'],
    correctIndex: 1,
    explanation: 'In seed germination, the embryonic root (radicle) always emerges first and grows downwards into soil to anchor and absorb water.',
    topicRefId: 3
  },
  {
    id: 'stbb-c5-ch3-10',
    number: 10,
    section: 'B',
    sectionTitle: 'Epigeal, Hypogeal & Maize Seed',
    question: 'In a French bean seed, which hook-like structure emerges from soil and pulls the cotyledons above ground?',
    options: ['Coleoptile', 'Hypocotyl', 'Endosperm', 'Micropyle'],
    correctIndex: 1,
    explanation: 'The curved hook-shaped hypocotyl arches out of soil and pulls the French bean’s cotyledons (with embryo) above the ground.',
    topicRefId: 3
  },
  {
    id: 'stbb-c5-ch3-11',
    number: 11,
    section: 'B',
    sectionTitle: 'Epigeal, Hypogeal & Maize Seed',
    question: 'Germination in which the cotyledons emerge ABOVE the soil surface (as in French bean) is called:',
    options: ['Hypogeal germination', 'Epigeal germination', 'Pasteurization', 'Transpiration'],
    correctIndex: 1,
    explanation: 'Epigeal germination (epi = above, geal = earth) occurs when cotyledons are lifted above ground, as in French bean.',
    topicRefId: 3
  },
  {
    id: 'stbb-c5-ch3-12',
    number: 12,
    section: 'B',
    sectionTitle: 'Epigeal, Hypogeal & Maize Seed',
    question: 'How many cotyledons are present inside a maize (corn) seed?',
    options: ['Zero', 'One single cotyledon (monocot)', 'Two cotyledons (dicot)', 'Five cotyledons'],
    correctIndex: 1,
    explanation: 'Maize is a monocotyledonous (monocot) plant containing a single cotyledon.',
    topicRefId: 4
  },
  {
    id: 'stbb-c5-ch3-13',
    number: 13,
    section: 'B',
    sectionTitle: 'Epigeal, Hypogeal & Maize Seed',
    question: 'Which specialized tissue inside a maize seed stores food used by the embryo during germination?',
    options: ['Testa', 'Micropyle', 'Endosperm', 'Cuticle'],
    correctIndex: 2,
    explanation: 'In maize seeds, food is stored inside the endosperm and supplied to the developing embryo via the single cotyledon.',
    topicRefId: 4
  },
  {
    id: 'stbb-c5-ch3-14',
    number: 14,
    section: 'B',
    sectionTitle: 'Epigeal, Hypogeal & Maize Seed',
    question: 'In maize germination, what is the straight stalk that grows out of the soil and splits so leaves grow upward?',
    options: ['Hypocotyl hook', 'Coleoptile', 'Taproot', 'Spore capsule'],
    correctIndex: 1,
    explanation: 'A straight stalk/sheath called the coleoptile grows upward out of the soil in maize and splits open for the stem and leaves.',
    topicRefId: 4
  },
  {
    id: 'stbb-c5-ch3-15',
    number: 15,
    section: 'B',
    sectionTitle: 'Epigeal, Hypogeal & Maize Seed',
    question: 'Germination in which the cotyledon and seed coat remain BELOW the soil (as in maize) is called:',
    options: ['Epigeal germination', 'Hypogeal germination', 'Decomposition', 'Pollination'],
    correctIndex: 1,
    explanation: 'Hypogeal germination (hypo = below, geal = earth) means the cotyledon remains inside/below the soil.',
    topicRefId: 4
  },
  {
    id: 'stbb-c5-ch3-16',
    number: 16,
    section: 'B',
    sectionTitle: 'Epigeal, Hypogeal & Maize Seed',
    question: 'What happens to the cotyledons of a French bean seedling after true green leaves appear and start photosynthesis?',
    options: [
      'They turn into woody tree bark',
      'They shrivel up and fall off',
      'They become underground tubers',
      'They produce new flowers immediately'
    ],
    correctIndex: 1,
    explanation: 'Once stored nutrients are used up and true green leaves start photosynthesis, the bean cotyledons shrivel and drop off.',
    topicRefId: 3
  },
  {
    id: 'stbb-c5-ch3-17',
    number: 17,
    section: 'B',
    sectionTitle: 'Epigeal, Hypogeal & Maize Seed',
    question: 'In a germinating maize seed, what is the specific role of its single cotyledon?',
    options: [
      'It supplies food from the endosperm to the developing embryo',
      'It emerges high above soil to form petals',
      'It hardens into a stone shell',
      'It blocks water from entering the micropyle'
    ],
    correctIndex: 0,
    explanation: 'Maize’s single cotyledon absorbs and transfers food from the endosperm directly to the growing embryo.',
    topicRefId: 4
  },
  {
    id: 'stbb-c5-ch3-18',
    number: 18,
    section: 'B',
    sectionTitle: 'Epigeal, Hypogeal & Maize Seed',
    question: 'When does photosynthesis begin in a newly germinating maize seedling?',
    options: [
      'Inside the dry packet before sowing',
      'Deep underground before the root forms',
      'Only after the coleoptile splits and the first green leaves develop above soil',
      'Maize plants never perform photosynthesis'
    ],
    correctIndex: 2,
    explanation: 'Until first green leaves emerge into sunlight above ground, photosynthesis cannot take place; the seedling relies on endosperm food.',
    topicRefId: 4
  },

  // SECTION C: Activity 1 & Functions of Cotyledons (Q19–Q26)
  {
    id: 'stbb-c5-ch3-19',
    number: 19,
    section: 'C',
    sectionTitle: 'Activity 1 & Cotyledon Functions',
    question: 'In STBB Activity 1, how is a pre-soaked maize seed cut with a blade to examine its embryo, endosperm, and cotyledon?',
    options: ['Longitudinally (lengthwise)', 'Crushed with a hammer', 'Burned over a candle', 'Frozen in ice blocks'],
    correctIndex: 0,
    explanation: 'Cutting a pre-soaked maize seed longitudinally (lengthwise) clearly exposes its embryo, endosperm, and single cotyledon side by side.',
    topicRefId: 5
  },
  {
    id: 'stbb-c5-ch3-20',
    number: 20,
    section: 'C',
    sectionTitle: 'Activity 1 & Cotyledon Functions',
    question: 'In Activity 1, why are bean and maize seeds placed between a transparent glass wall and wet tissue paper in various directions?',
    options: [
      'To observe live daily germination clearly for 20 days regardless of seed orientation',
      'To hide the roots completely from view',
      'To stop oxygen from reaching the seeds',
      'To boil the seeds faster'
    ],
    correctIndex: 0,
    explanation: 'Transparent glass + moist tissue allows clear daily observation over 20 days and proves roots always grow down and shoots up.',
    topicRefId: 5
  },
  {
    id: 'stbb-c5-ch3-21',
    number: 21,
    section: 'C',
    sectionTitle: 'Activity 1 & Cotyledon Functions',
    question: 'Which tool is used in Activity 1 to inspect the tiny micropyle and internal embryo of dissected seeds closely?',
    options: ['Thermometer', 'Magnifying hand lens', 'Magnet bar', 'Tuning fork'],
    correctIndex: 1,
    explanation: 'A hand lens magnifies small seed structures like the micropyle pore and embryonic axis clearly.',
    topicRefId: 5
  },
  {
    id: 'stbb-c5-ch3-22',
    number: 22,
    section: 'C',
    sectionTitle: 'Activity 1 & Cotyledon Functions',
    question: 'Which feature is SHARED in common by BOTH French bean seeds and maize seeds?',
    options: [
      'Both have two cotyledons',
      'Both possess a seed coat, micropyle, and embryo',
      'Both undergo hypogeal germination',
      'Both have a large separate endosperm'
    ],
    correctIndex: 1,
    explanation: 'Both French bean and maize seeds have a protective seed coat, micropyle, and embryo, and require water, oxygen, and proper temperature.',
    topicRefId: 6
  },
  {
    id: 'stbb-c5-ch3-23',
    number: 23,
    section: 'C',
    sectionTitle: 'Activity 1 & Cotyledon Functions',
    question: 'How do cotyledons behave differently in epigeal germination (e.g., French bean) once pushed above soil?',
    options: [
      'They become photosynthetic — absorbing sunlight and water to make food as first leaves',
      'They turn into underground roots',
      'They dissolve instantly into rainwater',
      'They block sunlight from reaching the stem'
    ],
    correctIndex: 0,
    explanation: 'Above ground in sunlight, bean cotyledons turn green and perform photosynthesis like temporary first leaves for the young plant.',
    topicRefId: 6
  },
  {
    id: 'stbb-c5-ch3-24',
    number: 24,
    section: 'C',
    sectionTitle: 'Activity 1 & Cotyledon Functions',
    question: 'When humans cook and eat French beans, peas, or chickpeas (chana), which nutrient-rich seed structure provides most of the food?',
    options: ['Only the empty micropyle hole', 'Food stored inside the cotyledons', 'Soil stuck on roots', 'Root hairs'],
    correctIndex: 1,
    explanation: 'Legume seeds such as beans and chickpeas pack rich proteins and carbohydrates inside their fleshy cotyledons.',
    topicRefId: 6
  },
  {
    id: 'stbb-c5-ch3-25',
    number: 25,
    section: 'C',
    sectionTitle: 'Activity 1 & Cotyledon Functions',
    question: 'Which statement accurately contrasts French bean and maize seeds?',
    options: [
      'French bean is monocot (hypogeal); maize is dicot (epigeal)',
      'French bean is dicot (2 cotyledons, epigeal); maize is monocot (1 cotyledon, endosperm, hypogeal)',
      'Neither seed contains an embryo',
      'Maize has two cotyledons and zero endosperm'
    ],
    correctIndex: 1,
    explanation: 'French bean = dicot, 2 cotyledons, epigeal; Maize = monocot, 1 cotyledon, endosperm present, hypogeal.',
    topicRefId: 6
  },
  {
    id: 'stbb-c5-ch3-26',
    number: 26,
    section: 'C',
    sectionTitle: 'Activity 1 & Cotyledon Functions',
    question: 'According to the STBB Class 5 chapter section on bean germination, which seeds are noted as germinating like French beans?',
    options: ['Maize and wheat', 'Pea and chickpea', 'Pine cones and moss spores', 'Ferns and algae'],
    correctIndex: 1,
    explanation: 'In STBB Class 5 Science Chapter 3 (Section 3), the text specifically notes that pea and chickpea germinate like French beans.',
    topicRefId: 3
  },

  // SECTION D: Conditions Necessary for Germination (Q27–Q33)
  {
    id: 'stbb-c5-ch3-27',
    number: 27,
    section: 'D',
    sectionTitle: 'Conditions for Germination',
    question: 'What are the THREE essential external conditions necessary for seed germination?',
    options: [
      'Fertilizer, plastic wrap, and loud sound',
      'Water, oxygen (air), and proper temperature',
      'Ice, cooking oil, and darkness only',
      'Salt water, smoke, and wind'
    ],
    correctIndex: 1,
    explanation: 'Every seed requires water, oxygen (air), and proper temperature to germinate successfully.',
    topicRefId: 7
  },
  {
    id: 'stbb-c5-ch3-28',
    number: 28,
    section: 'D',
    sectionTitle: 'Conditions for Germination',
    question: 'Why do seeds specifically need WATER to begin germination?',
    options: [
      'To swell up and break open the tough seed coat',
      'To freeze the embryo solid',
      'To keep air away from cotyledons',
      'To turn seed coats into stone'
    ],
    correctIndex: 0,
    explanation: 'Seeds absorb water to swell up and burst/break the seed coat — without water, the tough seed coat cannot open.',
    topicRefId: 7
  },
  {
    id: 'stbb-c5-ch3-29',
    number: 29,
    section: 'D',
    sectionTitle: 'Conditions for Germination',
    question: 'Why do germinating seeds require OXYGEN?',
    options: [
      'For cellular respiration, which breaks down stored food to release energy for growth',
      'To make the seed coat harder and thicker',
      'To cool the soil down to freezing point',
      'To turn roots purple'
    ],
    correctIndex: 0,
    explanation: 'Oxygen drives cellular respiration inside seed cells, breaking down stored food to release energy required for growth.',
    topicRefId: 7
  },
  {
    id: 'stbb-c5-ch3-30',
    number: 30,
    section: 'D',
    sectionTitle: 'Conditions for Germination',
    question: 'Within which optimal temperature range do MOST plant seeds germinate best?',
    options: ['Below -10°C', 'Between 16°C and 24°C', 'Between 75°C and 100°C', 'Exactly 0°C'],
    correctIndex: 1,
    explanation: 'STBB Class 5 Science states that most seeds germinate best between 16°C and 24°C.',
    topicRefId: 7
  },
  {
    id: 'stbb-c5-ch3-31',
    number: 31,
    section: 'D',
    sectionTitle: 'Conditions for Germination',
    question: 'Which seeds require colder temperatures of 2°C – 4°C to germinate?',
    options: ['Mango and coconut', 'Radish and spinach', 'Date palm and cactus', 'Maize and cotton'],
    correctIndex: 1,
    explanation: 'Cool-season vegetables like radish and spinach germinate at low temperatures between 2°C and 4°C.',
    topicRefId: 7
  },
  {
    id: 'stbb-c5-ch3-32',
    number: 32,
    section: 'D',
    sectionTitle: 'Conditions for Germination',
    question: 'What happens if seeds are sown in completely dry desert sand with plenty of air and warm temperature?',
    options: [
      'They sprout twice as fast',
      'They will NOT germinate because water is absent so the seed coat cannot swell and break',
      'They turn into mushrooms overnight',
      'They produce fruits without roots'
    ],
    correctIndex: 1,
    explanation: 'If even one required condition (such as water) is missing, germination cannot occur.',
    topicRefId: 7
  },
  {
    id: 'stbb-c5-ch3-33',
    number: 33,
    section: 'D',
    sectionTitle: 'Conditions for Germination',
    question: 'Regarding light during seed germination, which statement is TRUE according to STBB Class 5 Science?',
    options: [
      'No seed on Earth can ever germinate in light',
      'Some seeds require light exposure while certain others require complete darkness',
      'Sunlight replaces the need for water completely',
      'Light provides oxygen directly inside oil'
    ],
    correctIndex: 1,
    explanation: 'While water, oxygen, and proper temperature are universal, some seeds additionally need light whereas others require darkness.',
    topicRefId: 7
  },

  // SECTION E: Activity 2 Four-Jar Investigation (Q34–Q40)
  {
    id: 'stbb-c5-ch3-34',
    number: 34,
    section: 'E',
    sectionTitle: 'Activity 2 Four-Jar Experiment',
    question: 'In STBB Activity 2 (4-Jar Experiment), in WHICH jar will the French bean seeds successfully germinate?',
    options: [
      'Jar 1 (A): Moist cotton wool kept at room temperature with air',
      'Jar 2 (B): Dry cotton wool at room temperature',
      'Jar 3 (C): Moist cotton wool kept inside a refrigerator',
      'Jar 4 (D): Boiled cooled water covered with an oil layer'
    ],
    correctIndex: 0,
    explanation: 'Only Jar 1 (A) has all three required conditions present simultaneously: water, air (oxygen), and proper room temperature!',
    topicRefId: 8
  },
  {
    id: 'stbb-c5-ch3-35',
    number: 35,
    section: 'E',
    sectionTitle: 'Activity 2 Four-Jar Experiment',
    question: 'Why do French bean seeds FAIL to germinate in Jar 2 (B) containing dry cotton wool at room temperature?',
    options: ['Lack of light', 'Absence of water', 'Excess cooking oil', 'Freezing cold'],
    correctIndex: 1,
    explanation: 'Jar 2 has air and proper room temperature, but zero water on the dry cotton wool.',
    topicRefId: 8
  },
  {
    id: 'stbb-c5-ch3-36',
    number: 36,
    section: 'E',
    sectionTitle: 'Activity 2 Four-Jar Experiment',
    question: 'Why do French bean seeds FAIL to germinate in Jar 3 (C) placed inside a refrigerator on moist cotton?',
    options: ['Absence of water', 'Absence of air', 'Lack of proper warm temperature', 'Presence of soil'],
    correctIndex: 2,
    explanation: 'Jar 3 has moist cotton (water) and air, but the refrigerator temperature is too cold for French bean germination.',
    topicRefId: 8
  },
  {
    id: 'stbb-c5-ch3-37',
    number: 37,
    section: 'E',
    sectionTitle: 'Activity 2 Four-Jar Experiment',
    question: 'In Jar 4 (D) of Activity 2, why is water BOILED first and then COOLED before submerging bean seeds?',
    options: [
      'Boiling removes dissolved air/oxygen, and cooling prevents hot water from killing the live embryo',
      'To add extra sugar to the seeds',
      'To turn water into cooking oil',
      'To freeze the seeds faster'
    ],
    correctIndex: 0,
    explanation: 'Boiling expels dissolved oxygen from water; cooling ensures heat doesn’t cook the delicate seed embryo.',
    topicRefId: 8
  },
  {
    id: 'stbb-c5-ch3-38',
    number: 38,
    section: 'E',
    sectionTitle: 'Activity 2 Four-Jar Experiment',
    question: 'What is the purpose of pouring a layer of OIL on top of the boiled cooled water in Jar 4 (D)?',
    options: [
      'To feed vitamins to the cotyledons',
      'To block air/oxygen from dissolving back into the water',
      'To warm the water to 24°C',
      'To attract insects for pollination'
    ],
    correctIndex: 1,
    explanation: 'Oil floats as an airtight barrier on water, preventing atmospheric oxygen from entering and reaching the submerged seeds.',
    topicRefId: 8
  },
  {
    id: 'stbb-c5-ch3-39',
    number: 39,
    section: 'E',
    sectionTitle: 'Activity 2 Four-Jar Experiment',
    question: 'In scientific investigation terminology, what role does Jar 1 (A) play in Activity 2?',
    options: [
      'Control setup (baseline comparison with all required conditions present)',
      'Waste disposal jar',
      'Oil storage container',
      'Microscope lens holder'
    ],
    correctIndex: 0,
    explanation: 'Jar 1 (A) serves as the experimental control showing normal germination when water, air, and proper temperature are all supplied.',
    topicRefId: 8
  },
  {
    id: 'stbb-c5-ch3-40',
    number: 40,
    section: 'E',
    sectionTitle: 'Activity 2 Four-Jar Experiment',
    question: 'What overarching scientific conclusion is proven by comparing Jars 1, 2, 3, and 4 in Activity 2?',
    options: [
      'Seeds germinate best in boiling oil',
      'Seeds require water, oxygen, and proper temperature together in order to germinate',
      'Seeds only need refrigerators to sprout',
      'Cotyledons are unnecessary for germination'
    ],
    correctIndex: 1,
    explanation: 'Because Jars 2, 3, and 4 each lacked one essential factor and failed while Jar 1 succeeded, seeds need water, oxygen, and proper temperature.',
    topicRefId: 8
  }
];

export const STBB_CH3_SUMMARY_CONCEPTS = [
  {
    icon: '🫘',
    topic: 'French Bean (Dicot)',
    takeaway: 'Seed coat (testa), micropyle, TWO cotyledons, and one embryo; undergoes Epigeal germination.'
  },
  {
    icon: '🌽',
    topic: 'Maize Seed (Monocot)',
    takeaway: 'Seed coat, micropyle, ONE cotyledon, embryo, and food-storing Endosperm; undergoes Hypogeal germination.'
  },
  {
    icon: '🌱',
    topic: 'Epigeal Germination',
    takeaway: 'Hook-like hypocotyl pulls cotyledons ABOVE ground (French bean); cotyledons turn green & shrivel later.'
  },
  {
    icon: '🌾',
    topic: 'Hypogeal Germination',
    takeaway: 'Straight stalk coleoptile grows up & splits; cotyledon and seed coat stay BELOW soil (Maize).'
  },
  {
    icon: '⚡',
    topic: 'Cotyledon Functions',
    takeaway: 'Store/transfer food energy for seedling, photosynthesize as first leaves above soil, and nourish humans (beans, chana).'
  },
  {
    icon: '💧',
    topic: 'Water & Oxygen',
    takeaway: 'Water swells seed & breaks seed coat; Oxygen drives respiration to release stored energy for growth.'
  },
  {
    icon: '🌡️',
    topic: 'Temperature Ranges',
    takeaway: 'Most seeds germinate at 16–24°C; cold-loving radish & spinach germinate at 2–4°C.'
  },
  {
    icon: '🧪',
    topic: 'Activity 2 (4 Jars)',
    takeaway: 'Only Jar 1 (moist + air + room temp) sprouts! Jar 2 (dry), Jar 3 (fridge), Jar 4 (boiled water + oil) all FAIL.'
  }
];

export const STBB_CH3_MATRICES: StbbComparisonMatrix[] = [
  {
    title: 'Master Comparison Matrix — French Bean Seed vs. Maize Seed',
    subtitle: 'Complete anatomical and germination comparison for Sukkur IBA STS PST & JEST exams',
    headers: ['Feature', 'French Bean Seed 🫘', 'Maize Seed 🌽'],
    rows: [
      {
        cells: ['Botanical Class', 'Dicotyledonous (Dicot)', 'Monocotyledonous (Monocot)'],
        cellStyles: { 0: 'bold', 1: 'emerald', 2: 'amber' }
      },
      {
        cells: ['Cotyledon Count', 'Two halves (2 cotyledons)', 'Single cotyledon (1 cotyledon)'],
        cellStyles: { 0: 'bold', 1: 'emerald', 2: 'amber' }
      },
      {
        cells: ['Endosperm Tissue', '❌ Absent (food stored in cotyledons)', '✅ Present (stores food for embryo)'],
        cellStyles: { 0: 'bold', 1: 'rose', 2: 'emerald' }
      },
      {
        cells: ['Emerging Shoot Structure', 'Curved hook-like Hypocotyl', 'Straight stalk Coleoptile'],
        cellStyles: { 0: 'bold' }
      },
      {
        cells: ['Fate of Cotyledons', 'Pulled ABOVE ground; turn green; later shrivel & drop', 'Remain BELOW ground inside soil throughout'],
        cellStyles: { 0: 'bold' }
      },
      {
        cells: ['Germination Type', 'Epigeal Germination', 'Hypogeal Germination'],
        cellStyles: { 0: 'bold', 1: 'emerald', 2: 'cyan' }
      }
    ]
  },
  {
    title: 'Master Matrix — Activity 2 Four-Jar Germination Investigation',
    subtitle: 'Controlled experimental proof that Water, Oxygen, and Proper Temperature are all essential',
    headers: ['Jar', 'Experimental Setup', 'Missing Factor', 'Prediction & Result'],
    rows: [
      {
        cells: ['Jar 1 (A)', 'Moist cotton wool · Open air · Room temp (Control)', 'None — all 3 present!', '✅ Seeds WILL germinate'],
        cellStyles: { 0: 'emerald', 3: 'emerald' }
      },
      {
        cells: ['Jar 2 (B)', 'Dry cotton wool · Open air · Room temp', '❌ No Water', '❌ Seeds will NOT germinate'],
        cellStyles: { 0: 'bold', 2: 'rose', 3: 'rose' }
      },
      {
        cells: ['Jar 3 (C)', 'Moist cotton wool · Open air · Inside refrigerator', '❌ No Proper Temperature', '❌ Seeds will NOT germinate'],
        cellStyles: { 0: 'bold', 2: 'rose', 3: 'rose' }
      },
      {
        cells: ['Jar 4 (D)', 'Boiled cooled water covered with floating oil layer', '❌ No Air / Oxygen', '❌ Seeds will NOT germinate'],
        cellStyles: { 0: 'bold', 2: 'rose', 3: 'rose' }
      }
    ]
  }
];

export const STBB_CHAPTER_3_CONFIG: StbbChapterConfig = {
  id: 'ch3-seeds-germination',
  chapterNumber: 3,
  shortNavLabel: 'Ch 3: Seeds, Structure & Germination',
  navEmoji: '🌱',
  isFeaturedNew: true,
  boardBadge: 'STBB Sindh Textbook Board · Class 5 · General Science',
  syllabusBadge: 'Sukkur IBA STS PST & JEST Syllabus Aligned',
  heroTitle: 'Chapter 3: Seeds, Their Structure and Germination',
  heroDescription:
    'Explore how tiny seeds grow into towering trees: dissect French bean (dicot) vs. maize (monocot) seeds, compare Epigeal vs. Hypogeal germination, master the functions of cotyledons, and investigate the 4-Jar Germination Experiment!',
  quickMetrics: [
    { icon: 'book', label: '8 Topic Deep-Dives' },
    { icon: 'check', label: '40 Topic-Covering MCQs' },
    { icon: 'compass', label: 'Seed & Germination Decision Lab' },
    { icon: 'sparkles', label: '8 Mnemonics & Riddles' }
  ],
  tabs: {
    topicsLabel: '8 Interactive Topics',
    toolLabel: 'Seed & Jar Simulator',
    mcqsLabel: '40 MCQs & Mock Exam',
    summaryLabel: 'Key Concepts & Tables'
  },
  sidebarHeading: 'Chapter 3 Curriculum Topics (1–8)',
  decisionTool: {
    badge: 'Botanical Lab Simulator',
    title: 'Seed Germination & Fair-Test Diagnostic Tree',
    subtitle:
      'Test a real seed or experimental jar setup step-by-step to determine whether it germinates — and whether it follows Epigeal (Bean) or Hypogeal (Maize) germination!',
    totalSteps: 3,
    samplePromptLabel: 'Sample Quick-Buttons (Select a Seed / Jar Setup or Roll Random):',
    enableRandomMystery: true,
    specimens: [
      {
        id: 'ch3-bean-jar1',
        name: 'French Bean (Jar 1 Control)',
        emoji: '🫘',
        targetGroup: 'EPIGEAL GERMINATION (DICOT — FRENCH BEAN)',
        clue: 'Lab Observation: Kidney-shaped seed with 2 cotyledons placed on moist cotton wool in open air at 22°C. Arched hypocotyl pulls cotyledons ABOVE soil!',
        expectedPath: 'Q1: Yes → Q2: Yes → EPIGEAL GERMINATION (DICOT — FRENCH BEAN)'
      },
      {
        id: 'ch3-maize-sprout',
        name: 'Maize Grain (Moist Soil)',
        emoji: '🌽',
        targetGroup: 'HYPOGEAL GERMINATION (MONOCOT — MAIZE)',
        clue: 'Lab Observation: Single-cotyledon grain with starchy endosperm placed in warm, airy moist soil. Straight coleoptile emerges upward while grain stays BURIED!',
        expectedPath: 'Q1: Yes → Q2: No → HYPOGEAL GERMINATION (MONOCOT — MAIZE)'
      },
      {
        id: 'ch3-jar4-oil',
        name: 'Bean in Boiled Water + Oil (Jar 4)',
        emoji: '🧪',
        targetGroup: 'NO GERMINATION — MISSING CONDITION!',
        clue: 'Lab Observation: Healthy bean seed submerged inside boiled cooled water sealed with cooking oil at room temperature (oxygen completely blocked!).',
        expectedPath: 'Q1: No → NO GERMINATION — MISSING CONDITION!'
      }
    ],
    nodes: [
      {
        id: 1,
        question: '1. Are ALL THREE essential conditions present (Water + Oxygen/Air + Proper Temperature)?',
        helperText: 'Check Jar 1 vs Jar 2 (dry), Jar 3 (cold fridge), and Jar 4 (boiled water + oil layer):',
        onYes: {
          type: 'next',
          shortCode: 'Q1: Yes (All 3 Met)',
          nextNodeId: 2
        },
        onNo: {
          type: 'result',
          shortCode: 'Q1: No',
          result: {
            group: 'NO GERMINATION — MISSING CONDITION!',
            emoji: '❌',
            sizeRank: 'Dormant / Failed Germination (Jars 2, 3, or 4)',
            keyTrait: 'Without water (coat cannot swell/break), oxygen (no respiration energy), or proper temperature (enzymes inactive), germination fails!',
            examples: 'Jar 2 (Dry cotton), Jar 3 (Cold fridge), Jar 4 (Boiled cooled water + oil layer)'
          }
        }
      },
      {
        id: 2,
        question: '2. Does the seed have TWO cotyledons pulled ABOVE the soil by a curved hypocotyl hook?',
        helperText: 'Compare above-ground cotyledon emergence (Epigeal) vs underground endosperm nourishment (Hypogeal):',
        onYes: {
          type: 'result',
          shortCode: 'Q2: Yes',
          result: {
            group: 'EPIGEAL GERMINATION (DICOT — FRENCH BEAN)',
            emoji: '🌱',
            sizeRank: 'Dicot Seed · 2 Cotyledons · Hypocotyl Hook',
            keyTrait: 'Root grows down first; arched hypocotyl pulls cotyledons ABOVE soil where they act as first leaves before shriveling.',
            examples: 'French Bean (plus Pea & Chickpea per STBB Class 5 Chapter 3 text)'
          }
        },
        onNo: {
          type: 'result',
          shortCode: 'Q2: No',
          result: {
            group: 'HYPOGEAL GERMINATION (MONOCOT — MAIZE)',
            emoji: '🌾',
            sizeRank: 'Monocot Seed · 1 Cotyledon + Endosperm · Straight Coleoptile',
            keyTrait: 'Radicle grows down first; straight stalk coleoptile splits above soil while cotyledon & seed coat stay BELOW ground.',
            examples: 'Maize (Corn), Wheat, Rice'
          }
        }
      }
    ]
  },
  mcqSections: [
    { id: 'All', label: 'All (40)' },
    { id: 'A', label: 'Sec A: Intro & Bean Seed' },
    { id: 'B', label: 'Sec B: Epigeal, Hypogeal & Maize' },
    { id: 'C', label: 'Sec C: Activity 1 & Cotyledons' },
    { id: 'D', label: 'Sec D: Germination Conditions' },
    { id: 'E', label: 'Sec E: Activity 2 (4 Jars)' }
  ],
  topics: STBB_CH3_TOPICS,
  mcqs: STBB_CH3_MCQS_DATA,
  summaryConcepts: STBB_CH3_SUMMARY_CONCEPTS,
  summaryMatrices: STBB_CH3_MATRICES
};
