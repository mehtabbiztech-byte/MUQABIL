import { StbbTopic, StbbMcq } from './stbbClassFiveScienceData';

export interface StbbDecisionSpecimen {
  id: string;
  name: string;
  emoji: string;
  targetGroup: string;
  clue: string;
  expectedPath: string;
}

export interface StbbDecisionResultDetail {
  group: string;
  emoji: string;
  sizeRank: string;
  keyTrait: string;
  examples: string;
}

export type StbbDecisionBranch =
  | { type: 'next'; nextNodeId: number; shortCode: string }
  | { type: 'result'; result: StbbDecisionResultDetail; shortCode: string }
  | { type: 'recheck'; message: string; shortCode: string };

export interface StbbDecisionNode {
  id: number;
  question: string;
  helperText?: string;
  onYes: StbbDecisionBranch;
  onNo: StbbDecisionBranch;
}

export interface StbbComparisonMatrix {
  title: string;
  subtitle?: string;
  headers: string[];
  rows: {
    cells: string[];
    cellStyles?: Record<
      number,
      'emerald' | 'teal' | 'amber' | 'rose' | 'indigo' | 'cyan' | 'bold'
    >;
  }[];
}

export interface StbbActivityLab {
  id: string;
  activityNumber: string;
  title: string;
  emoji: string;
  aim: string;
  materials: string[];
  procedure: string[];
  observationTable?: {
    headers: string[];
    rows: string[][];
  };
  questions: {
    question: string;
    answer: string;
  }[];
  conclusion: string;
  safetyOrTeacherTip?: string;
}

export interface StbbFillBlankItem {
  id: string;
  promptWithBlank: string;
  answer: string;
  acceptedVariants?: string[];
  hint?: string;
  explanation: string;
}

export interface StbbTrueFalseItem {
  id: string;
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export type StbbDescriptiveQaCategory =
  | 'definition-short'
  | 'give-reason'
  | 'structured-long'
  | 'problem-solving';

export interface StbbDescriptiveQaItem {
  id: string;
  category: StbbDescriptiveQaCategory;
  badgeLabel: string;
  question: string;
  answer: string;
  bulletPoints?: string[];
  examKeywords?: string[];
}

export interface StbbChapterExtras {
  activities: StbbActivityLab[];
  fillInBlanks: StbbFillBlankItem[];
  trueFalse: StbbTrueFalseItem[];
  descriptiveQA: StbbDescriptiveQaItem[];
}

export interface StbbChapterConfig {
  id: string;
  chapterNumber: number;
  shortNavLabel: string;
  navEmoji: string;
  isFeaturedNew?: boolean;
  boardBadge: string;
  syllabusBadge: string;
  heroTitle: string;
  heroDescription: string;
  quickMetrics: {
    icon: 'book' | 'check' | 'compass' | 'sparkles';
    label: string;
  }[];
  tabs: {
    topicsLabel: string;
    activitiesLabel?: string;
    qaLabel?: string;
    toolLabel: string;
    mcqsLabel: string;
    summaryLabel: string;
  };
  activitiesAndQA?: StbbChapterExtras;
  sidebarHeading: string;
  decisionTool: {
    badge: string;
    title: string;
    subtitle: string;
    totalSteps: number;
    samplePromptLabel: string;
    enableRandomMystery?: boolean;
    specimens: StbbDecisionSpecimen[];
    nodes: StbbDecisionNode[];
  };
  mcqSections: {
    id: string;
    label: string;
  }[];
  topics: StbbTopic[];
  mcqs: StbbMcq[];
  summaryConcepts: {
    icon?: string;
    topic: string;
    takeaway: string;
  }[];
  summaryMatrices: StbbComparisonMatrix[];
}

export const STBB_CH2_TOPICS: StbbTopic[] = [
  {
    id: 1,
    slug: 'what-are-microorganisms',
    title: 'Topic 1: What Are Microorganisms?',
    shortExplanation:
      'Micro = extremely small, and organism = living being. Microorganisms (also called microbes) are tiny living things invisible to the naked eye that can only be observed with a microscope. Millions of them fit on the eye of a needle, and just like larger organisms, life at this invisible scale reveals the cell as the basic unit of life.',
    keyCharacteristics: {
      heading: 'Key Characteristics & Scientific Rules',
      points: [
        'Word Origin: "Micro" means extremely small and "organism" means living thing — together forming Microorganisms (commonly called Microbes).',
        'Seen Only by Microscope: Microorganisms cannot be seen with the naked human eye; a magnifying optical instrument called a microscope is essential to view them.',
        'Astonishing Scale: They are so tiny that millions of microorganisms can easily fit inside the tiny eye of a sewing needle.',
        'Present Everywhere: Microbes inhabit air, soil, freshwater, oceans, dust, food surfaces, and live both on and inside plants, animals, and human bodies.',
        'Cell — Basic Unit of Life: All living organisms are built from cells, the smallest structural and functional basic unit of life (individual cells are microscopic too!).',
        'Major Groups Studied in Class 5: Viruses (smallest, non-cellular), Bacteria (single-celled, simple), and Microscopic Fungi (unicellular/complex, largest microbes).'
      ],
      table: {
        headers: ['Microbe Group', 'Cellular Structure', 'Size Rank', 'Independent Growth?', 'Key Examples'],
        rows: [
          ['Viruses', '❌ Non-cellular (not a cell)', 'Smallest microbe', '❌ Only inside living host cells', 'Influenza virus, Polio virus'],
          ['Bacteria', '✅ Unicellular (simple single cell)', 'Medium microbe', '✅ Feeds, grows & divides alone', 'Escherichia coli (E. coli), Yogurt bacteria'],
          ['Fungi', '✅ Unicellular / Multicellular (complex cell)', 'Largest microbe', '✅ Absorbs nutrients & grows alone', 'Yeast, Penicillium, Bread mold']
        ]
      }
    },
    deepDiveHeading: 'Core Pillars of the Microscopic World',
    deepDiveSections: [
      {
        title: 'Microscope Needed to Observe',
        emoji: '🔬',
        points: [
          'Human eyes cannot resolve individual cells or microbes without magnification lenses.',
          'Light microscopes reveal onion cells, yeast, and bacteria; electron microscopes reveal tiny viruses.'
        ]
      },
      {
        title: 'Cell = Basic Unit of Life',
        emoji: '🧬',
        points: [
          'Every plant, animal, and human body is constructed from millions or trillions of microscopic cells.',
          'Unicellular microbes (like bacteria and yeast) carry out all life activities inside just a single cell!'
        ]
      },
      {
        title: 'Ubiquitous — Present Everywhere',
        emoji: '🌍',
        points: [
          'Microbes thrive in garden soil, floating dust, drinking water droplets, hot springs, and icy polar waters.',
          'Billions of harmless or helpful microbes live naturally on human skin and inside the digestive tract.'
        ]
      },
      {
        title: 'Needle-Eye Scale Perspective',
        emoji: '🪡',
        points: [
          'If microbes lined up side by side, millions could sit comfortably inside the eye of an ordinary sewing needle.',
          'Most bacteria measure only 1 to 5 micrometers (thousandths of a millimeter) in length.'
        ]
      }
    ],
    realWorldExamples: [
      {
        name: 'Onion Skin Cells',
        emoji: '🧅',
        description: 'Thin transparent peel of an onion bulb under a microscope displays neat brick-like plant cells with cell walls and nuclei.'
      },
      {
        name: 'Airborne Dust Microbes',
        emoji: '💨',
        description: 'Invisible bacterial cells and fungal mold spores ride microscopic dust particles floating silently in indoor air.'
      },
      {
        name: 'Pond Water Droplets',
        emoji: '💧',
        description: 'A single drop of pond or canal water under magnification reveals thousands of swimming, dividing microscopic organisms.'
      }
    ],
    mnemonic: {
      acronym: 'M-A-T-S',
      meaning: 'Microbes Are Tiny Secrets — Four Foundational Facts',
      items: [
        { letter: 'M', word: 'Microbes', note: 'Micro = extremely small + Organism = living being.' },
        { letter: 'A', word: 'All Around', note: 'Found in air, water, soil, plants, animals & humans.' },
        { letter: 'T', word: 'Tiny Cells', note: 'Millions fit in a needle eye; cell is basic unit of life.' },
        { letter: 'S', word: 'Seen by Lens', note: 'Invisible to naked eye; seen only through a microscope.' }
      ]
    },
    flowchartAscii: `Naked Eye ──▶ (Too small to resolve!) ──▶ Microscope ──▶ Visible Microbes & Cells!
                                                                 │
                     ┌───────────────────────────────────────────┼───────────────────────────────────────────┐
                     ▼                                           ▼                                           ▼
               🧫 VIRUSES                                   🦠 BACTERIA                                  🍄 FUNGI
        (Smallest · Non-cellular)                    (Medium · Simple 1 cell)                   (Largest · Complex cell)`,
    vennDiagram: {
      leftTitle: 'UNICELLULAR MICROBES',
      leftPoints: [
        'Composed of only ONE microscopic cell',
        'Invisible to the naked human eye',
        'Single cell performs nutrition, respiration & division',
        'Examples: Bacteria (E. coli), Yeast'
      ],
      middleTitle: 'COMMON LIVING TRAITS',
      middlePoints: [
        'Made of basic cellular units of life',
        'Need nutrients and energy',
        'Grow and reproduce new offspring',
        'Respond to surrounding environment'
      ],
      rightTitle: 'MULTICELLULAR ORGANISMS',
      rightPoints: [
        'Built from thousands to trillions of cells',
        'Visible directly to the naked eye',
        'Specialized tissues & organs divide tasks',
        'Examples: Onion plant, Mango tree, Human'
      ]
    },
    riddle: {
      prompt: "I am a living thing so astonishingly small that millions of me can fit inside a sewing needle's eye. What am I?",
      answer: 'Microorganism (Microbe)',
      explanation: 'Microorganisms (microbes) are microscopic living beings invisible to the naked eye that require a microscope to be seen.'
    },
    unscrambles: [
      { scrambled: 'SBRECIMO', solution: 'MICROBES', hint: 'Short everyday scientific word for microorganisms.' },
      { scrambled: 'LECL', solution: 'CELL', hint: 'The smallest basic structural and functional unit of all living things.' }
    ],
    secretCodeActivity: {
      cipher: 'A=1, B=2, C=3 ... Z=26',
      items: [
        {
          encoded: '13 - 9 - 3 - 18 - 15 - 2 - 5',
          answer: 'MICROBE',
          sentence: 'Every tiny invisible living organism seen under a microscope is called a MICROBE.'
        },
        {
          encoded: '3 - 5 - 12 - 12',
          answer: 'CELL',
          sentence: 'All living plants, animals, and humans are built from the microscopic basic unit of life called a CELL.'
        }
      ]
    }
  },
  {
    id: 2,
    slug: 'the-microscope',
    title: 'Topic 2: The Microscope',
    shortExplanation:
      'A microscope is an optical scientific instrument that magnifies tiny objects, making them appear many times larger and clearer than they appear to the unaided eye. Mastering its five core parts lets scientists focus sharply on cells and microorganisms.',
    keyCharacteristics: {
      heading: 'Key Parts & Optical Rules of the Compound Microscope',
      points: [
        'Core Purpose: A microscope magnifies (enlarges the apparent image of) tiny specimens such as onion cells, blood cells, bacteria, and fungi.',
        'Eyepiece (Ocular Lens): Positioned at the very top of the body tube where the observer places their eye to view the magnified image.',
        'Nosepiece (Revolving Turret): Rotating holder beneath the body tube that carries the objective lenses and lets you switch magnification powers.',
        'Objective Lenses: Glass magnifying lenses positioned closest to the specimen slide (typically low, medium, and high power).',
        'Coarse Adjustment Knob: Larger focusing knob rotated first to move the tube/stage noticeably for initial rough focus.',
        'Fine Adjustment Knob: Smaller precision knob rotated gently afterward to sharpen tiny details into crystal-clear focus.'
      ],
      table: {
        headers: ['Microscope Part', 'Position on Instrument', 'Primary Function in Observation'],
        rows: [
          ['Eyepiece', 'Top upper end of body tube', 'Magnifies the image formed by the objective lens for the viewer’s eye'],
          ['Nosepiece', 'Rotating disc below body tube', 'Holds objective lenses and rotates smoothly to switch magnification power'],
          ['Objective Lenses', 'Directly above specimen stage', 'Gather light from specimen to produce primary magnification (e.g. 10x, 40x)'],
          ['Coarse Adjustment Knob', 'Large knob on side of arm', 'Moves body tube/stage up and down rapidly for rough initial focus'],
          ['Fine Adjustment Knob', 'Smaller knob on side of arm', 'Makes delicate micro-adjustments for sharp, detailed final focus']
        ]
      }
    },
    deepDiveHeading: 'Optical Magnification & Focusing Mechanics',
    deepDiveSections: [
      {
        title: 'How Dual-Lens Magnification Works',
        emoji: '🔭',
        points: [
          'Total magnification equals Eyepiece power × Objective lens power (e.g. 10× eyepiece × 40× objective = 400× larger!).',
          'Light passes upward from the mirror/light source through the thin specimen on a glass slide into the objective lens.'
        ]
      },
      {
        title: 'Coarse vs. Fine Adjustment Sequence',
        emoji: '⚙️',
        points: [
          'Step 1: Always start with low-power objective and turn the Coarse Adjustment Knob until the specimen appears.',
          'Step 2: Turn the Fine Adjustment Knob slowly to bring cell walls and nuclei into razor-sharp clarity without cracking the slide.'
        ]
      }
    ],
    realWorldExamples: [
      {
        name: 'Water-Filled Glass Lens (STBB Activity 1)',
        emoji: '🥛',
        description: 'Looking at textbook letters through a clear cylindrical glass filled with clean water bends light and makes letters appear noticeably bigger!'
      },
      {
        name: 'School Compound Microscope',
        emoji: '🔬',
        description: 'Standard laboratory instrument combining objective and eyepiece lenses to inspect onion peel cells, pond algae, and yeast.'
      },
      {
        name: 'Electron Microscope',
        emoji: '⚡',
        description: 'Advanced hospital/research microscope using electron beams instead of light to magnify ultra-tiny viruses over 100,000 times.'
      }
    ],
    mnemonic: {
      acronym: 'E-N-O-C-F',
      meaning: 'Five Essential Parts of a Microscope (Top-to-Focus Order)',
      items: [
        { letter: 'E', word: 'Eyepiece', note: 'Top lens you look through with your eye.' },
        { letter: 'N', word: 'Nosepiece', note: 'Rotating turret holding the objective lenses.' },
        { letter: 'O', word: 'Objectives', note: 'Primary magnifying lenses near the slide.' },
        { letter: 'C', word: 'Coarse Knob', note: 'Large knob for fast rough focusing.' },
        { letter: 'F', word: 'Fine Knob', note: 'Small knob for sharp crystal-clear detail.' }
      ]
    },
    flowchartAscii: `Light Source ──▶ Specimen on Glass Slide ──▶ Objective Lens ──▶ Nosepiece & Tube ──▶ Eyepiece ──▶ Magnified Image!

FOCUSING WORKFLOW:
  [1. Place Slide on Stage] ──▶ [2. Coarse Adjustment (Rough Focus)] ──▶ [3. Fine Adjustment (Sharp Detail)]`,
    vennDiagram: {
      leftTitle: 'COARSE ADJUSTMENT',
      leftPoints: [
        'Larger outer focusing knob',
        'Moves stage/tube over a noticeable distance',
        'Used FIRST under low-power objective',
        'Finds the specimen quickly on the slide'
      ],
      middleTitle: 'SHARED FOCUS ROLE',
      middlePoints: [
        'Mounted on the side arm of the microscope',
        'Adjust distance between lens and slide',
        'Essential for clear optical observation'
      ],
      rightTitle: 'FINE ADJUSTMENT',
      rightPoints: [
        'Smaller precision focusing knob',
        'Moves lens by tiny fractions of a millimeter',
        'Used SECOND for high-power sharp detail',
        'Prevents lens from smashing glass slide'
      ]
    },
    riddle: {
      prompt: 'I have an eyepiece, objectives, and focusing knobs, and I make invisible small things appear big. What am I?',
      answer: 'Microscope',
      explanation: 'A microscope magnifies microscopic objects such as cells, bacteria, and fungi so humans can study them clearly.'
    },
    unscrambles: [
      { scrambled: 'EPOCSORCIM', solution: 'MICROSCOPE', hint: 'Scientific instrument used to magnify tiny objects and microbes.' },
      { scrambled: 'ECEIPEYE', solution: 'EYEPIECE', hint: 'Top lens of a microscope through which the viewer looks.' }
    ]
  },
  {
    id: 3,
    slug: 'bacteria',
    title: 'Topic 3: Bacteria',
    shortExplanation:
      'Bacteria (singular: bacterium) are simple, single-celled microorganisms that can feed, breathe, move, grow, and divide on their own. Classified by shape into rod, round, and spiral forms, bacteria live almost everywhere — including inside your own intestines!',
    keyCharacteristics: {
      heading: 'Key Scientific Features of Bacteria',
      points: [
        'Single-Celled Simplicity: Every bacterium consists of a single simple cell possessing a cell wall and cytoplasm, without a proper membrane-bound nucleus.',
        'Independent Life Activities: Unlike viruses, bacteria actively absorb food, respire, move, grow, and divide independently when warmth and moisture exist.',
        'Three Distinct Shapes: Scientists group bacteria visually into Rod-shaped (bacilli), Round/Spherical (cocci), and Spiral-shaped (spirilla).',
        'Rapid Binary Division: Under favourable conditions, 1 bacterium splits into 2, then 4, then 8 — forming millions in a colony within hours!',
        'Textbook Benchmark Example: Escherichia coli (E. coli) is a rod-shaped bacterium living naturally inside human and mammal intestines.'
      ],
      table: {
        headers: ['Bacterial Shape', 'Visual Geometry', 'Scientific Group', 'Representative Example & Habitat'],
        rows: [
          ['Rod-shaped', 'Cylindrical stick / capsule shape', 'Bacilli', 'Escherichia coli (intestines), Lactobacillus (yogurt)'],
          ['Round (Spherical)', 'Tiny ball / berry-like spheres', 'Cocci', 'Streptococcus (throat flora / dairy fermentation)'],
          ['Spiral-shaped', 'Twisted corkscrew / wave coil', 'Spirilla', 'Spirillum (freshwater ponds), Vibrio / Spirochetes']
        ]
      }
    },
    deepDiveHeading: 'Cellular Anatomy & Exponential Multiplication',
    deepDiveSections: [
      {
        title: 'Simple Single Cell Architecture',
        emoji: '🦠',
        points: [
          'Medium size among microbes — far larger than non-cellular viruses, smaller than fungal cells.',
          'Some bacteria wave tiny hair-like whip tails (flagella) to swim actively through water or mucus.'
        ]
      },
      {
        title: 'Divide to Multiply (1 → 2 → 4 → Colony)',
        emoji: '🔁',
        points: [
          'Reproduce by simple binary cell division: one parent cell elongates and splits into two identical cells.',
          'In warm milk or uncovered food, a few bacteria multiply into millions within just a few hours!'
        ]
      }
    ],
    realWorldExamples: [
      {
        name: 'Escherichia coli (E. coli)',
        emoji: '🧬',
        description: 'Classic rod-shaped bacterium residing inside healthy human intestines where it helps digest food and manufacture Vitamin K.'
      },
      {
        name: 'Yogurt Bacteria (Lactobacillus)',
        emoji: '🥣',
        description: 'Beneficial bacteria that convert lactose sugar in warm milk into lactic acid, thickening milk into delicious yogurt (dahi).'
      },
      {
        name: 'Soil Decomposer Bacteria',
        emoji: '🌱',
        description: 'Billions of bacteria in one handful of soil break down fallen leaves and animal waste into rich mineral nutrients for crops.'
      }
    ],
    mnemonic: {
      acronym: 'B-A-R-R-S',
      meaning: 'Bacteria Are Rod-Round-Spiral — Shapes & Single-Cell Rule',
      items: [
        { letter: 'B', word: 'Bacteria', note: 'Single-celled medium-sized microbes.' },
        { letter: 'A', word: 'Autonomous', note: 'Grow, breathe, move & divide on their own.' },
        { letter: 'R', word: 'Rod-shaped', note: 'Cylindrical rods like E. coli & Lactobacillus.' },
        { letter: 'R', word: 'Round', note: 'Spherical ball-shaped cocci bacteria.' },
        { letter: 'S', word: 'Spiral', note: 'Twisted corkscrew spirilla bacteria.' }
      ]
    },
    flowchartAscii: `BINARY DIVISION OF BACTERIA:
  [ 1 Bacterium ] ──divides──▶ [ 2 ] ──divides──▶ [ 4 ] ──divides──▶ [ 8 ] ──▶ [ Millions = Colony! ]

THREE BACTERIAL SHAPES:
   ▭▭▭  Rod-shaped (E. coli)       ●●●  Round / Spherical       〰️〰️  Spiral-shaped`,
    vennDiagram: {
      leftTitle: 'HELPFUL BACTERIA',
      leftPoints: [
        'Turn milk into yogurt, cheese & sour cream',
        'Aid food digestion in human & cattle guts',
        'Decompose dead matter into fertile humus',
        'Used in leather tanning & detergent enzymes'
      ],
      middleTitle: 'ALL BACTERIA SHARE',
      middlePoints: [
        'Unicellular simple cell structure',
        'Rod, round, or spiral body shapes',
        'Multiply by dividing into two cells',
        'Seen clearly under a microscope'
      ],
      rightTitle: 'HARMFUL BACTERIA',
      rightPoints: [
        'Release toxic chemicals that spoil food',
        'Contaminate unsafe unboiled water',
        'Cause acute diarrhoea, cholera & typhoid',
        'Trigger throat, wound & foodborne infections'
      ]
    },
    riddle: {
      prompt: 'I am a single-celled rod-shaped bacterium living naturally inside your intestine. Who am I?',
      answer: 'Escherichia coli (E. coli)',
      explanation: 'Escherichia coli (abbreviated E. coli) is the textbook rod-shaped bacterium found inside human intestines.'
    },
    unscrambles: [
      { scrambled: 'AIRETCAB', solution: 'BACTERIA', hint: 'Single-celled microorganisms shaped like rods, spheres, or spirals.' }
    ]
  },
  {
    id: 4,
    slug: 'viruses',
    title: 'Topic 4: Viruses',
    shortExplanation:
      'Viruses are the smallest and simplest of all microorganisms. Crucially, viruses are non-cellular (not even a cell!) — outside a living body they remain completely inactive, and they can grow and multiply ONLY inside living host cells.',
    keyCharacteristics: {
      heading: 'Key Scientific Properties of Viruses',
      points: [
        'Smallest Microbes Known: Viruses are far tinier than bacteria and fungi — hundreds of viruses can fit inside a single bacterial cell!',
        'Non-Cellular Nature: A virus is NOT a cell; it has no cell wall, no cytoplasm, and no nucleus — only genetic material inside a protein coat.',
        'Inactive Outside Host: Outside a living organism, viruses cannot feed, respire, grow, or divide on their own.',
        'Obligate Host Multiplication: Once a virus enters a living plant, animal, or human cell, it hijacks the cell to produce thousands of new viruses.',
        'Diseases & Vaccine Paradox: Viruses cause common cold, influenza (flu), polio, and measles — yet weakened poliovirus is used in polio vaccine drops to protect children!'
      ],
      table: {
        headers: ['Condition', 'Metabolic Activity', 'Ability to Divide?', 'Real-World Consequence'],
        rows: [
          ['Outside a Living Host (air, surface, doorknob)', 'Completely inactive / dormant particle', '❌ Cannot divide at all', 'Behaves like non-living chemical crystal until washed away or inhaled'],
          ['Inside a Living Host Cell (nose, throat, nerve)', 'Active — hijacks host cellular machinery', '✅ Multiplies into thousands rapidly', 'Damages host cells causing flu, cold, or triggers protective vaccine immunity']
        ]
      }
    },
    deepDiveHeading: 'Borderline of Life — Non-Cellular Behaviour',
    deepDiveSections: [
      {
        title: 'Not Even a Cell (Non-Cellular)',
        emoji: '🧫',
        points: [
          'Simplest possible microscopic structure: a tiny protein shell surrounding genetic instructions.',
          'Because viruses lack cellular machinery, antibiotics (which target bacteria) do NOT cure viral colds or flu!'
        ]
      },
      {
        title: 'Cannot Feed or Multiply Alone',
        emoji: '🚫',
        points: [
          'Must enter a specific living host cell (human airway cell, nerve cell, or plant leaf cell) to replicate.',
          'Oral polio drops contain safe weakened virus particles that teach white blood cells to block real polio forever.'
        ]
      }
    ],
    realWorldExamples: [
      {
        name: 'Influenza & Common Cold Virus',
        emoji: '🤧',
        description: 'Spreads through tiny sneeze/cough droplets via nose and mouth, causing fever, sore throat, and sneezing.'
      },
      {
        name: 'Polio Virus & Oral Polio Vaccine',
        emoji: '💉',
        description: 'Wild poliovirus causes childhood paralysis, while two drops of oral polio vaccine safely immunize millions of children across Pakistan.'
      },
      {
        name: 'Plant Leaf Mosaic Virus',
        emoji: '🍃',
        description: 'Infects crop leaves (like tomato, tobacco, and papaya), creating yellow-green blotches and stunted growth.'
      }
    ],
    mnemonic: {
      acronym: 'V-I-R-U-S',
      meaning: 'Virus Is Really Uncellular & Simple',
      items: [
        { letter: 'V', word: 'Very Tiny', note: 'Smallest of all known microbes.' },
        { letter: 'I', word: 'Inside Host Only', note: 'Multiplies only inside living host cells.' },
        { letter: 'R', word: 'Respiratory Flu', note: 'Causes common cold, flu & polio.' },
        { letter: 'U', word: 'Uncellular', note: 'Non-cellular — not even a single cell!' },
        { letter: 'S', word: 'Simple Coat', note: 'Simplest microbe; used in weakened form for vaccines.' }
      ]
    },
    flowchartAscii: `[ Virus Outside Host ]  ──▶  Inactive particle (cannot feed, breathe, or divide alone)
          │
     enters host via nose / mouth / skin
          ▼
[ Virus Inside Living Cell ]  ──▶  Hijacks host cell  ──▶  Multiplies into 1,000s of new viruses!`,
    vennDiagram: {
      leftTitle: 'VIRUSES',
      leftPoints: [
        'Non-cellular (not a cell at all)',
        'Smallest of all microbes',
        'Inactive outside host; multiply ONLY in host',
        'Cause cold, flu, polio, measles'
      ],
      middleTitle: 'SHARED MICROBE TRAITS',
      middlePoints: [
        'Invisible to the naked human eye',
        'Carry genetic material to reproduce',
        'Can cause infectious diseases',
        'Used in biotechnology & medicine'
      ],
      rightTitle: 'BACTERIA',
      rightPoints: [
        'Unicellular (complete simple cell)',
        'Medium size (much larger than viruses)',
        'Feed, grow & divide independently',
        'Cause typhoid/diarrhoea; make yogurt'
      ]
    },
    riddle: {
      prompt: 'I am the smallest microbe and not even a cell, yet when I enter your nose I multiply and make you sneeze! What am I?',
      answer: 'Virus',
      explanation: 'Viruses are non-cellular microbes that remain dormant outside bodies and multiply inside respiratory cells to cause colds and flu.'
    },
    unscrambles: [
      { scrambled: 'USRIV', solution: 'VIRUS', hint: 'Smallest non-cellular microbe that multiplies only inside living host cells.' }
    ]
  },
  {
    id: 5,
    slug: 'fungi',
    title: 'Topic 5: Fungi',
    shortExplanation:
      'Fungi range from microscopic single-celled organisms to visible mushrooms. Unicellular fungi have larger, more complex cells than bacteria — making microscopic fungi the LARGEST among all microorganisms!',
    keyCharacteristics: {
      heading: 'Key Scientific Features of Microscopic & Macroscopic Fungi',
      points: [
        'Largest Microbes: Microscopic fungi possess larger, more complex eukaryotic cells (with a true nucleus) than bacteria, ranking them as the largest microbes.',
        'Microscopic Unicellular Example: Yeast is a single-celled microscopic fungus famous for fermenting dough in bakeries.',
        'Macroscopic Relatives: Not all fungi are microscopic — mushrooms, toadstools, and puffballs grow large enough to see directly with the naked eye.',
        'No Chlorophyll (Absorptive Nutrition): Fungi lack green chlorophyll so they cannot photosynthesize; they absorb dissolved nutrients from sugar, bread, fruit, or damp soil.',
        'Warmth & Moisture Preference: Fungal molds flourish rapidly in warm, dark, humid places (such as damp bread or sweaty skin).'
      ],
      table: {
        headers: ['Microbe Group', 'Size Rank (1 = Smallest)', 'Cell Structure', 'Classic Textbook Examples'],
        rows: [
          ['1. Viruses', 'Smallest (#1 tiniest)', 'Non-cellular particle', 'Influenza virus, Polio virus'],
          ['2. Bacteria', 'Medium (#2 middle size)', 'Simple single cell (no nucleus)', 'Escherichia coli (E. coli), Yogurt bacteria'],
          ['3. Microscopic Fungi', 'Largest (#3 biggest microbe)', 'Complex cell with true nucleus & wall', 'Yeast (unicellular), Penicillium, Bread mold']
        ]
      }
    },
    deepDiveHeading: 'Microscopic Yeast vs. Visible Molds & Mushrooms',
    deepDiveSections: [
      {
        title: 'Yeast Raises Fluffy Bread',
        emoji: '🍞',
        points: [
          'Yeast is a single-celled microscopic fungus mixed with flour, warm water, and sugar.',
          'As yeast feeds on sugar, it releases tiny bubbles of carbon dioxide (CO2) gas trapped in dough, making bread rise light, soft, and spongy!'
        ]
      },
      {
        title: 'Some Fungi Are Non-Microscopic',
        emoji: '🍄',
        points: [
          'While yeast and early mold spores require a microscope, mature bread mold patches and umbrella-shaped mushrooms are visible without lenses.',
          'Penicillium mold produces the world-famous antibiotic penicillin that saves millions of lives from bacterial infections.'
        ]
      }
    ],
    realWorldExamples: [
      {
        name: 'Baker’s Yeast (Unicellular)',
        emoji: '🍞',
        description: 'Microscopic oval single-celled fungus used daily in bakeries to leaven naan, buns, pizza dough, and bread loaves.'
      },
      {
        name: 'Penicillium Fungus',
        emoji: '💊',
        description: 'Microscopic blue-green mold species cultivated in pharmaceutical labs to manufacture penicillin antibiotic.'
      },
      {
        name: 'Mushrooms & Bread Mold',
        emoji: '🍄',
        description: 'Mushrooms are large visible fungi in damp gardens, while fuzzy dark mold forms colonies on moist stale bread.'
      }
    ],
    mnemonic: {
      acronym: 'F-U-N-G-I-S',
      meaning: 'Fungi: Unicellular Not Giant In Size (Yet Largest Microbes!)',
      items: [
        { letter: 'F', word: 'Fluffy Bread', note: 'Yeast makes dough rise soft and airy.' },
        { letter: 'U', word: 'Unicellular Yeast', note: 'Single-celled microscopic fungus example.' },
        { letter: 'N', word: 'No Chlorophyll', note: 'Cannot make food by sunlight; absorbs nutrients.' },
        { letter: 'G', word: 'Greater Cell Complexity', note: 'Larger, more complex cells than bacteria.' },
        { letter: 'I', word: 'Includes Penicillium', note: 'Source of life-saving penicillin antibiotic.' },
        { letter: 'S', word: 'Size Rank = Largest', note: 'Virus (smallest) < Bacteria < Fungi (largest microbe)!' }
      ]
    },
    flowchartAscii: `MICROBIAL SIZE SPECTRUM (SMALLEST ──▶ LARGEST):

  [ 🧫 VIRUS ]          <          [ 🦠 BACTERIA ]          <          [ 🍄 MICROSCOPIC FUNGI ]
   Non-cellular                     Simple single cell                  Larger complex cell
   (Influenza, Polio)               (E. coli, Lactobacillus)            (Yeast, Penicillium)`,
    vennDiagram: {
      leftTitle: 'MICROSCOPIC YEAST',
      leftPoints: [
        'Single-celled (unicellular) fungus',
        'Individual cells visible only by microscope',
        'Used in baking bread, buns & naan',
        'Releases CO2 gas bubbles in warm dough'
      ],
      middleTitle: 'ALL FUNGI SHARE',
      middlePoints: [
        'Complex eukaryotic cells with cell walls',
        'Completely lack green chlorophyll',
        'Absorb nutrients from organic matter',
        'Thrive in warm, moist conditions'
      ],
      rightTitle: 'VISIBLE MUSHROOMS',
      rightPoints: [
        'Multicellular umbrella-like fruiting body',
        'Easily seen with the naked eye',
        'Grow on damp soil, humus & rotting logs',
        'Reproduce through millions of tiny spores'
      ]
    },
    riddle: {
      prompt: 'I am a microscopic single-celled fungus that eats sugar in dough and makes your bread warm, light, and fluffy. What am I?',
      answer: 'Yeast',
      explanation: 'Yeast is a unicellular microscopic fungus that ferments sugar and releases CO2 bubbles to make bread dough rise.'
    },
    unscrambles: [
      { scrambled: 'TSAEY', solution: 'YEAST', hint: 'Unicellular microscopic fungus used in bread making.' }
    ],
    secretCodeActivity: {
      cipher: 'A=1, B=2, C=3 ... Z=26',
      items: [
        {
          encoded: '25 - 5 - 1 - 19 - 20',
          answer: 'YEAST',
          sentence: 'Bakers add microscopic unicellular YEAST to flour dough so bread rises fluffy and soft.'
        }
      ]
    }
  },
  {
    id: 6,
    slug: 'usefulness-of-microorganisms',
    title: 'Topic 6: Usefulness of Microorganisms',
    shortExplanation:
      'Microorganisms are indispensable allies that sustain ecosystems and human civilization! They recycle dead waste into fertile soil, bake bread, ferment milk into yogurt and cheese, help grazing animals digest grass, and give us life-saving antibiotics and vaccines.',
    keyCharacteristics: {
      heading: 'Six Essential Beneficial Roles of Microorganisms',
      points: [
        '1. Decomposition (Nature’s Cleaners): Soil bacteria and fungi break down dead plants, animal bodies, and biodegradable garbage into mineral nutrients, enriching soil fertility.',
        '2. Food Preparation: Yeast leavens bread; friendly bacteria ferment milk into yogurt (dahi), cheese, butter, and sour cream.',
        '3. Herbivore & Human Digestion: Special symbiotic bacteria live in the digestive tracts of cattle, goats, sheep, and rabbits to digest tough plant cellulose, and in human guts to aid digestion.',
        '4. Antibiotics (Treating Infections): The fungus Penicillium produces penicillin — an antibiotic medicine that kills or halts harmful disease-causing bacteria.',
        '5. Vaccines (Preventing Diseases): Weakened or inactivated microbes stimulate immunity before illness strikes — e.g., oral polio drops protect children against polio.',
        '6. Industry & Daily Products: Beneficial microbes process raw hides in the leather industry and supply stain-removing enzymes in detergent washing powders.'
      ],
      table: {
        headers: ['Beneficial Role', 'Specific Microorganism', 'How It Works', 'Everyday Benefit / Product'],
        rows: [
          ['Decomposition', 'Soil bacteria & fungi', 'Break down dead plants, animals & organic waste', 'Clean environment + fertile agricultural soil'],
          ['Bakery fermentation', 'Yeast (unicellular fungus)', 'Releases carbon dioxide bubbles in warm dough', 'Soft, fluffy bread, buns & bakery items'],
          ['Dairy fermentation', 'Lactic acid bacteria', 'Convert milk lactose sugar into tangy lactic acid', 'Yogurt (dahi), cheese & sour cream'],
          ['Animal digestion', 'Symbiotic gut bacteria', 'Digest tough grass cellulose inside stomachs', 'Healthy nutrition in cattle, goats, sheep & rabbits'],
          ['Antibiotic medicine', 'Penicillium fungus', 'Secretes natural antibacterial compound', 'Penicillin medicine curing bacterial infections'],
          ['Vaccination & Industry', 'Polio virus (weakened) / Industrial bacteria', 'Trains immune system / cleans hides & stains', 'Polio drops vaccine, leather & detergent powders']
        ]
      }
    },
    deepDiveHeading: 'Four High-Yield Exam Pillars of Beneficial Microbes',
    deepDiveSections: [
      {
        title: 'Decomposers — Recycling Earth’s Nutrients',
        emoji: '♻️',
        points: [
          'Without decomposer bacteria and fungi, dead leaves, carcasses, and garbage would pile up across Earth forever.',
          'Decomposition returns vital nitrogen, carbon, and minerals back into soil so new crops grow lush and green.'
        ]
      },
      {
        title: 'Food Makers — Bread, Yogurt & Cheese',
        emoji: '🍞',
        points: [
          'Yeast = fungus used for bread raising; Lactobacillus = bacterium used for yogurt, cheese, and sour cream.',
          'STS Exam Favourite Trap: Yeast is a FUNGUS (not a bacterium!), while yogurt is made by BACTERIA (not yeast!).'
        ]
      },
      {
        title: 'Antibiotics — Penicillium to Penicillin',
        emoji: '💊',
        points: [
          'Antibiotics are medicines derived from fungi or bacteria that destroy or stop harmful bacteria inside the body.',
          'Penicillin — the world’s first antibiotic — is extracted from the microscopic fungus Penicillium.'
        ]
      },
      {
        title: 'Vaccines — Polio Drops Immunity Shield',
        emoji: '💉',
        points: [
          'Vaccines prepare white blood cells ahead of time using harmless/weakened germs (like oral polio drops).',
          'Also remember industrial uses: tanning leather hides and enzyme-rich biological detergent powders!'
        ]
      }
    ],
    realWorldExamples: [
      {
        name: 'Herbivore Gut Bacteria',
        emoji: '🐄',
        description: 'Cattle, goats, sheep, and rabbits house billions of specialized gut bacteria that break down grass fiber they could never digest alone.'
      },
      {
        name: 'Penicillin Antibiotic',
        emoji: '💊',
        description: 'Produced by Penicillium mold; saved millions of patients from pneumonia, wound infections, and bacterial fevers.'
      },
      {
        name: 'Oral Polio Drops Vaccine',
        emoji: '💧',
        description: 'Two oral vaccine drops made using weakened poliovirus build lifelong protective antibodies in young children.'
      }
    ],
    mnemonic: {
      acronym: 'D-F-D-A-V',
      meaning: 'Five Star Benefits — Decompose · Food · Digest · Antibiotics · Vaccines',
      items: [
        { letter: 'D', word: 'Decompose', note: 'Soil bacteria turn garbage & dead matter into fertile soil.' },
        { letter: 'F', word: 'Food Making', note: 'Yeast makes bread; bacteria make yogurt, cheese & sour cream.' },
        { letter: 'D', word: 'Digestion', note: 'Gut bacteria digest plant fiber in cattle, goats, sheep & rabbits.' },
        { letter: 'A', word: 'Antibiotics', note: 'Penicillium fungus produces penicillin medicine.' },
        { letter: 'V', word: 'Vaccines', note: 'Polio drops protect children; plus leather & detergent industry!' }
      ]
    },
    flowchartAscii: `                     🌟 USEFUL MICROORGANISMS SUSTAIN LIFE 🌟
                                        │
   ┌────────────────┬───────────────────┼───────────────────┬───────────────────┐
   ▼                ▼                   ▼                   ▼                   ▼
♻️ SOIL          🍞 FOOD             🐄 DIGESTION        💊 MEDICINE         🏭 INDUSTRY
Decompose dead   Yeast → Bread       Cattle, goats,      Penicillium →       Leather tanning
matter → humus   Bacteria → Yogurt   sheep & rabbits     Penicillin +        & bio-detergent
                 cheese, sour cream                      Polio vaccine       washing powders`,
    vennDiagram: {
      leftTitle: 'ANTIBIOTICS (e.g. Penicillin)',
      leftPoints: [
        'Given AFTER a bacterial infection starts',
        'Directly kill or stop growth of bacteria',
        'Produced from fungi/bacteria (Penicillium)',
        'Do NOT cure viral illnesses like cold/flu'
      ],
      middleTitle: 'MEDICAL HEALTH ALLIES',
      middlePoints: [
        'Developed through microbiology science',
        'Save millions of human lives globally',
        'Must be taken properly as prescribed'
      ],
      rightTitle: 'VACCINES (e.g. Polio Drops)',
      rightPoints: [
        'Given BEFORE illness to prevent infection',
        'Train the body’s own immune system',
        'Made from weakened/killed microbes',
        'Protect against viral & bacterial diseases'
      ]
    },
    riddle: {
      prompt: 'I am a helpful microscopic fungus whose name starts with P, and doctors thank me for making a famous antibiotic medicine. Who am I?',
      answer: 'Penicillium',
      explanation: 'Penicillium is the microscopic mold fungus that produces penicillin, the landmark antibiotic medicine.'
    },
    unscrambles: [
      { scrambled: 'NTIAOIBITC', solution: 'ANTIBIOTIC', hint: 'Medicine like penicillin used to treat bacterial infections.' },
      { scrambled: 'ENICCAV', solution: 'VACCINE', hint: 'Protective dose (such as polio drops) that builds immunity against disease.' }
    ]
  },
  {
    id: 7,
    slug: 'harmful-effects-and-food-spoilage',
    title: 'Topic 7: Harmful Effects & Food Spoilage',
    shortExplanation:
      'While many microbes help us, harmful microorganisms spoil uncovered food, rot fresh fruits and vegetables, grow mold colonies on damp bread, and contaminate drinking water — requiring smart preservation and boiling water for at least 5 minutes.',
    keyCharacteristics: {
      heading: 'Food Spoilage, Water Contamination & STBB Activity 3',
      points: [
        'Chemical Food Rot: Harmful bacteria landing on warm, uncovered food multiply quickly and release harmful toxic chemicals, producing foul smell, sour taste, bubbles, and rot.',
        'Fungal Mold Spoilage (STBB Activity 3): Keeping a moist slice of bread in a warm, dark place causes greenish-black fuzzy fungal colonies (bread mold) to spread across its surface.',
        'Water Contamination Hazard: Untreated canal, pond, or leaking pipe water can harbour invisible germs that cause severe stomach infections if drunk raw.',
        '5-Minute Boiling Rule: Boiling drinking water rolling-hot for at least 5 minutes destroys harmful bacteria, viruses, and parasites!',
        'Safe Kitchen Habits: Cover cooked dishes immediately, store milk/meat/vegetables inside a clean refrigerator, and never eat foul-smelling or moldy food.'
      ],
      table: {
        headers: ['Target Item', 'Culprit Microbe', 'Visible / Smell Warning Sign', 'Proven Safe Protection'],
        rows: [
          ['Cooked Curry / Milk', 'Harmful spoilage bacteria', 'Sour foul odour, curdling, gas bubbles', 'Cover food tightly & refrigerate promptly'],
          ['Moist Bread Slice (Activity 3)', 'Bread mold (microscopic fungus)', 'Fuzzy white, green, or black powdery patches', 'Keep bread dry, sealed, and away from damp heat'],
          ['Fresh Orange & Cucumber', 'Bacteria & mold spores', 'Soft mushy spots, slimy skin, powdery mold', 'Wash & dry produce; store cool; discard rotten pieces'],
          ['Drinking Water', 'Waterborne bacteria & viruses', 'Often looks clear even when contaminated!', 'Boil water continuously for AT LEAST 5 MINUTES']
        ]
      }
    },
    deepDiveHeading: 'Lab Observation & Safe Purification Rules',
    deepDiveSections: [
      {
        title: 'Rotten Fruit & Moist Bread Lab (Activity 3)',
        emoji: '🍊',
        points: [
          'Microbes need three things to spoil food rapidly: Food nutrients + Moisture (water) + Warm temperature.',
          'In Activity 3, dry toasted bread stays clean much longer, whereas moistened bread kept in a warm corner grows a dense fungal colony!'
        ]
      },
      {
        title: 'Boil Water ≥ 5 Minutes to Purify',
        emoji: '💧',
        points: [
          'Clear-looking water is NOT automatically germ-free — millions of transparent microbes can swim in clear glass water!',
          'Bringing water to a full boil for at least 5 minutes kills disease-causing microbes and makes drinking water safe after cooling in a clean covered vessel.'
        ]
      }
    ],
    realWorldExamples: [
      {
        name: 'Rotten Orange',
        emoji: '🍊',
        description: 'Blue-green powdery mold colony digests orange peel pectin, turning firm citrus fruit mushy and inedible.'
      },
      {
        name: 'Rotten Cucumber',
        emoji: '🥒',
        description: 'Warm kitchen bacteria break down crisp vegetable tissues into slimy, foul-smelling rot.'
      },
      {
        name: 'Moist Bread Mold (Activity 3)',
        emoji: '🍞',
        description: 'Classic Class 5 experiment proving airborne fungal spores germinate rapidly whenever moisture and warmth meet.'
      }
    ],
    mnemonic: {
      acronym: 'S-C-I',
      meaning: 'Three Dangers of Harmful Germs — Spoil · Contaminate · Infect',
      items: [
        { letter: 'S', word: 'Spoil Food', note: 'Release toxic chemicals causing foul smell, mold & rot.' },
        { letter: 'C', word: 'Contaminate Water', note: 'Pollute unsafe water — boil ≥ 5 minutes to purify!' },
        { letter: 'I', word: 'Infect Hosts', note: 'Cause food poisoning, typhoid, cholera & diarrhoea.' }
      ]
    },
    flowchartAscii: `FOOD SPOILAGE CHAIN:
  Uncovered Warm Moist Food  +  Harmful Bacteria/Fungi  ──▶  Harmful Chemicals  ──▶  Foul Smell & Rot!

SAFE DRINKING WATER RULE:
  Raw / Suspect Water  ──▶  🔥 Boil Continuously ≥ 5 Minutes  ──▶  Germ-Free Safe Drinking Water!`,
    vennDiagram: {
      leftTitle: 'SPOILED / UNSAFE FOOD',
      leftPoints: [
        'Left uncovered in warm, humid air',
        'Foul sour odour or slimy texture',
        'Visible green/black mold colonies',
        'Contains toxic chemicals causing illness'
      ],
      middleTitle: 'MICROBIAL TEMPERATURE RULE',
      middlePoints: [
        'Microbes multiply fastest in warm, damp places',
        'High boiling heat kills harmful microbes',
        'Cold refrigeration slows microbial growth'
      ],
      rightTitle: 'SAFE PRESERVED FOOD & WATER',
      rightPoints: [
        'Kept covered from dust, flies & hands',
        'Chilled cleanly inside a refrigerator',
        'Bread stored dry; fresh meals eaten hot',
        'Water boiled for at least 5 minutes'
      ]
    },
    riddle: {
      prompt: 'Even when I look crystal clear in your glass, invisible microbes may hide in me — boil me for at least five minutes to make me safe! What am I?',
      answer: 'Drinking water',
      explanation: 'Boiling water for at least 5 minutes kills invisible waterborne bacteria and viruses that cause diarrhoea and typhoid.'
    },
    unscrambles: [
      { scrambled: 'EGALIOPS', solution: 'SPOILAGE', hint: 'Rotting and foul decay of food caused by harmful bacteria and fungi.' }
    ]
  },
  {
    id: 8,
    slug: 'infections-routes-and-prevention',
    title: 'Topic 8: Infections, Routes & Prevention',
    shortExplanation:
      'An infection is a disease caused when harmful microbes enter the body through the nose, mouth, or skin and multiply rapidly. Practising both personal hygiene and environmental hygiene builds an unbeatable everyday shield against germs!',
    keyCharacteristics: {
      heading: 'Infections, Entry Routes & Complete Hygiene Shield',
      points: [
        'What Is an Infection? When disease-causing microorganisms enter a living body and multiply inside tissues, the resulting illness is called an infection.',
        'Diseases by Microbe Type: Viral = common cold, influenza (flu), polio; Bacterial = acute diarrhoea, typhoid, cholera; Fungal = itchy skin rashes, ringworm, athlete’s foot.',
        'Three Entry Routes into Human Body: (1) Nose — inhaling sneeze/cough droplets; (2) Mouth — contaminated water, spoiled food, unwashed hands; (3) Skin — open cuts, scratches, bare damp feet.',
        'Personal Hygiene (Clean Body Habits): Wash hands thoroughly with soap after using the toilet and before meals, bathe regularly, brush teeth twice daily, trim nails neatly, keep feet clean & dry.',
        'Environmental Hygiene (Clean Surroundings): Keep homes, classrooms, streets, roads, playgrounds, and water sources clean; throw garbage in covered bins; eliminate stagnant water puddles.'
      ],
      table: {
        headers: ['Infection Type', 'Textbook Disease Examples', 'Main Entry Route', 'Targeted Prevention Strategy'],
        rows: [
          ['Viral Infections', 'Common cold, Influenza (flu), Polio', 'Nose & Mouth (droplets / oral)', 'Cover sneezes, wash hands with soap, take vaccines (polio drops)'],
          ['Bacterial Infections', 'Some acute diarrhoea, Typhoid, Cholera', 'Mouth & Skin (water, food, cuts)', 'Boil water ≥ 5 min, eat covered food, soap wash after toilet'],
          ['Fungal Infections', 'Skin rashes, Ringworm, Athlete’s foot', 'Skin contact (damp toes/clothes)', 'Bathe daily, dry feet thoroughly, wear clean dry socks & shoes']
        ]
      }
    },
    deepDiveHeading: 'Disease Categories & Dual Hygiene Defence',
    deepDiveSections: [
      {
        title: 'Viral Infections — Cold, Flu & Polio',
        emoji: '🤧',
        points: [
          'Travel on microscopic droplets released when an infected person coughs or sneezes without covering their nose/mouth.',
          'Prevented by tissues/masks, handwashing, avoiding shared handkerchiefs, and childhood vaccination.'
        ]
      },
      {
        title: 'Bacterial Infections — Diarrhoea & Foodborne Illness',
        emoji: '🦠',
        points: [
          'Enter through the mouth via unwashed hands, fly-exposed food, or unboiled contaminated water.',
          'Washing hands with soap after using the toilet cuts diarrhoeal infection dramatically!'
        ]
      },
      {
        title: 'Fungal Infections — Rashes & Athlete’s Foot',
        emoji: '🦶',
        points: [
          'Athlete’s foot is an itchy, peeling fungal skin infection between damp, sweaty toes.',
          'Stopped easily by washing feet daily, drying between toes completely, and wearing clean dry socks.'
        ]
      },
      {
        title: 'Hygiene = Personal + Environmental Cleanliness',
        emoji: '🧼',
        points: [
          'Personal Hygiene: Soap handwashing, bathing, brushing teeth twice a day, trimming fingernails (where dirt & germs hide!).',
          'Environmental Hygiene: Clean streets, roads, drains, playgrounds, and clean protected water supplies.'
        ]
      }
    ],
    realWorldExamples: [
      {
        name: 'Soap Handwashing After Toilet',
        emoji: '🧼',
        description: 'Scrubbing palms, backs of hands, between fingers, and nails with soap breaks germ coats and blocks mouth-route infections.'
      },
      {
        name: 'Brushing Teeth Twice Daily',
        emoji: '🪥',
        description: 'Morning and bedtime brushing removes sugar-loving mouth bacteria that cause tooth decay, cavities, and gum infection.'
      },
      {
        name: 'Clean Streets & Covered Bins',
        emoji: '🏘️',
        description: 'Community sanitation stops flies and rainwater from carrying garbage microbes into neighbourhood homes and drinking water.'
      }
    ],
    mnemonic: {
      acronym: 'H-E-G',
      meaning: 'Hygiene Eliminates Germs — Personal & Environmental Shield',
      items: [
        { letter: 'H', word: 'Hygiene Habits', note: 'Soap handwash, trim nails, bathe & brush twice daily.' },
        { letter: 'E', word: 'Environment Clean', note: 'Clean streets, roads, water sources & covered bins.' },
        { letter: 'G', word: 'Germs Blocked!', note: 'Stops entry via Nose, Mouth & Skin routes.' }
      ]
    },
    flowchartAscii: `Harmful Microbe (Virus / Bacterium / Fungus)
        │
        ▼   Tries to enter through 3 body routes:
  [ 👃 NOSE ]          [ 👄 MOUTH ]          [ 🖐️ SKIN ]
        │                    │                     │
        └────────────────────┼─────────────────────┘
                             ▼
                (Multiplies ──▶ INFECTION)
                             ✖
        BLOCKED BY DUAL HYGIENE DEFENCE SHIELD!
     ┌───────────────────────────────────────────┐
     │ 🧼 Personal Hygiene + 🏘️ Environmental   │
     │    (Soap, nails, teeth, bath, clean roads)│
     └───────────────────────────────────────────┘`,
    vennDiagram: {
      leftTitle: 'PERSONAL HYGIENE',
      leftPoints: [
        'Wash hands with soap after toilet & before food',
        'Trim fingernails short & neat regularly',
        'Brush teeth twice daily & bathe cleanly',
        'Cover nose & mouth when sneezing/coughing'
      ],
      middleTitle: 'TOTAL DISEASE PREVENTION',
      middlePoints: [
        'Eliminates breeding places of germs',
        'Blocks nose, mouth & skin entry routes',
        'Protects children, families & schools'
      ],
      rightTitle: 'ENVIRONMENTAL HYGIENE',
      rightPoints: [
        'Keep streets, roads & school grounds clean',
        'Dispose waste inside covered dustbins',
        'Protect rivers, wells & water pipes from sewage',
        'Drain stagnant puddles that breed disease vectors'
      ]
    },
    riddle: {
      prompt: 'I mean keeping both your own body and your surrounding streets and water clean so germs cannot cause infection. What am I?',
      answer: 'Hygiene',
      explanation: 'Hygiene (personal and environmental cleanliness) prevents harmful microorganisms from entering and infecting the body.'
    },
    unscrambles: [
      { scrambled: 'CTIONFEIN', solution: 'INFECTION', hint: 'Disease caused when harmful microbes enter and multiply inside the body.' },
      { scrambled: 'ENEIGYH', solution: 'HYGIENE', hint: 'Cleanliness practices that prevent germs and disease.' }
    ],
    secretCodeActivity: {
      cipher: 'A=1, B=2, C=3 ... Z=26',
      items: [
        {
          encoded: '8 - 25 - 7 - 9 - 5 - 14 - 5',
          answer: 'HYGIENE',
          sentence: 'Practising daily personal and environmental HYGIENE stops harmful germs from spreading infection.'
        },
        {
          encoded: '14 - 15 - 19 - 5  /  13 - 15 - 21 - 20 - 8  /  19 - 11 - 9 - 14',
          answer: 'NOSE / MOUTH / SKIN',
          sentence: 'Disease-causing microbes enter the human body mainly through the NOSE, MOUTH, and SKIN.'
        }
      ]
    }
  }
];

export const STBB_CH2_MCQS_DATA: StbbMcq[] = [
  // SECTION A: Introduction & Microscope (Q1–Q8)
  {
    id: 'stbb-c5-ch2-01',
    number: 1,
    section: 'A',
    sectionTitle: 'Introduction & Microscope',
    question: 'Microorganisms are tiny living things that are also commonly called:',
    options: ['Microbes', 'Minerals', 'Crystals', 'Fossils'],
    correctIndex: 0,
    explanation: 'Microorganisms are commonly referred to as microbes. The word comes from "micro" (extremely small) and "organism" (living thing).',
    topicRefId: 1
  },
  {
    id: 'stbb-c5-ch2-02',
    number: 2,
    section: 'A',
    sectionTitle: 'Introduction & Microscope',
    question: 'Why can microorganisms NOT be seen with the naked human eye?',
    options: [
      'Because they only come out in complete darkness',
      'Because they are extremely small (microscopic)',
      'Because they live only on other planets',
      'Because they move faster than light'
    ],
    correctIndex: 1,
    explanation: 'Microorganisms are microscopic — millions of them can fit in the eye of a needle — so a microscope is needed to observe them.',
    topicRefId: 1
  },
  {
    id: 'stbb-c5-ch2-03',
    number: 3,
    section: 'A',
    sectionTitle: 'Introduction & Microscope',
    question: 'What is the basic structural and functional unit of all living things?',
    options: ['Atom', 'Cell', 'Organ', 'Drop'],
    correctIndex: 1,
    explanation: 'All living organisms (plants, animals, humans, and cellular microbes) are made up of microscopic units called cells.',
    topicRefId: 1
  },
  {
    id: 'stbb-c5-ch2-04',
    number: 4,
    section: 'A',
    sectionTitle: 'Introduction & Microscope',
    question: 'How many microorganisms can approximately fit on the eye of a sewing needle?',
    options: ['Only two or three', 'Exactly ten', 'Millions', 'None, they are larger than a needle'],
    correctIndex: 2,
    explanation: 'Microorganisms are so small that millions of them can fit effortlessly into the eye of an ordinary needle.',
    topicRefId: 1
  },
  {
    id: 'stbb-c5-ch2-05',
    number: 5,
    section: 'A',
    sectionTitle: 'Introduction & Microscope',
    question: 'Which scientific instrument magnifies tiny objects so that cells and microbes appear much bigger?',
    options: ['Thermometer', 'Microscope', 'Barometer', 'Stethoscope'],
    correctIndex: 1,
    explanation: 'A microscope uses curved glass lenses (eyepiece and objective lenses) to magnify tiny specimens.',
    topicRefId: 2
  },
  {
    id: 'stbb-c5-ch2-06',
    number: 6,
    section: 'A',
    sectionTitle: 'Introduction & Microscope',
    question: 'Through which top lens of a compound microscope does a student look with their eye?',
    options: ['Nosepiece', 'Stage clip', 'Eyepiece', 'Coarse knob'],
    correctIndex: 2,
    explanation: 'The eyepiece (ocular lens) sits at the upper end of the body tube where the viewer places their eye to see the magnified specimen.',
    topicRefId: 2
  },
  {
    id: 'stbb-c5-ch2-07',
    number: 7,
    section: 'A',
    sectionTitle: 'Introduction & Microscope',
    question: 'Which part of a microscope holds the objective lenses and rotates to change magnification?',
    options: ['Revolving nosepiece', 'Base', 'Mirror', 'Fine adjustment knob'],
    correctIndex: 0,
    explanation: 'The revolving nosepiece holds multiple objective lenses right above the specimen slide and rotates smoothly.',
    topicRefId: 2
  },
  {
    id: 'stbb-c5-ch2-08',
    number: 8,
    section: 'A',
    sectionTitle: 'Introduction & Microscope',
    question: 'In STBB Activity 1, what happens when printed textbook letters are viewed through a clear glass filled with water?',
    options: [
      'The letters disappear completely',
      'The letters appear bigger (magnified)',
      'The letters turn bright green',
      'The paper catches fire'
    ],
    correctIndex: 1,
    explanation: 'A curved cylindrical glass filled with water acts like a convex magnifying lens, bending light rays so letters appear bigger.',
    topicRefId: 2
  },

  // SECTION B: Bacteria, Virus & Fungi (Q9–Q18)
  {
    id: 'stbb-c5-ch2-09',
    number: 9,
    section: 'B',
    sectionTitle: 'Bacteria, Virus & Fungi',
    question: 'Which of the following is the SMALLEST among all microorganisms?',
    options: ['Fungi', 'Bacteria', 'Virus', 'Algae'],
    correctIndex: 2,
    explanation: 'Viruses are the smallest of all microbes (Virus < Bacteria < Fungi) and can only be viewed with an electron microscope.',
    topicRefId: 4
  },
  {
    id: 'stbb-c5-ch2-10',
    number: 10,
    section: 'B',
    sectionTitle: 'Bacteria, Virus & Fungi',
    question: 'Which group represents the LARGEST microorganisms, possessing larger and more complex cells than bacteria?',
    options: ['Viruses', 'Microscopic Fungi', 'Prions', 'Atoms'],
    correctIndex: 1,
    explanation: 'Microscopic fungi (such as unicellular yeast) have larger, more complex eukaryotic cells than bacteria, making them the largest microbes.',
    topicRefId: 5
  },
  {
    id: 'stbb-c5-ch2-11',
    number: 11,
    section: 'B',
    sectionTitle: 'Bacteria, Virus & Fungi',
    question: 'Escherichia coli (E. coli), commonly found inside human intestines, is an example of:',
    options: ['Virus', 'Bacteria', 'Fungus', 'Flowering plant'],
    correctIndex: 1,
    explanation: 'E. coli (Escherichia coli) is a single-celled rod-shaped bacterium living inside the intestines of humans and warm-blooded animals.',
    topicRefId: 3
  },
  {
    id: 'stbb-c5-ch2-12',
    number: 12,
    section: 'B',
    sectionTitle: 'Bacteria, Virus & Fungi',
    question: 'What are the three main shapes in which bacteria are commonly found?',
    options: [
      'Square, triangle, and star',
      'Rod, round (spherical), and spiral',
      'Cube, pyramid, and flat sheet',
      'Hexagon, octagon, and cone'
    ],
    correctIndex: 1,
    explanation: 'Bacteria are classified by cell shape into three primary forms: rod-shaped, round (spherical), and spiral-shaped.',
    topicRefId: 3
  },
  {
    id: 'stbb-c5-ch2-13',
    number: 13,
    section: 'B',
    sectionTitle: 'Bacteria, Virus & Fungi',
    question: 'Which microorganism is non-cellular (not even a cell) and multiplies ONLY inside living host cells?',
    options: ['Yeast', 'E. coli', 'Virus', 'Penicillium'],
    correctIndex: 2,
    explanation: 'Viruses are non-cellular particles. Outside a host body they cannot feed, grow, or divide; inside a living host cell they multiply rapidly.',
    topicRefId: 4
  },
  {
    id: 'stbb-c5-ch2-14',
    number: 14,
    section: 'B',
    sectionTitle: 'Bacteria, Virus & Fungi',
    question: 'How do single-celled bacteria reproduce and increase their population rapidly?',
    options: [
      'By producing flowers and fruits',
      'By dividing into two cells on their own',
      'By laying hard-shelled eggs on land',
      'Only by entering a rock crystal'
    ],
    correctIndex: 1,
    explanation: 'Under warm, moist, nutrient-rich conditions, 1 bacterial cell grows and divides into 2, then 4, then 8, rapidly forming a colony.',
    topicRefId: 3
  },
  {
    id: 'stbb-c5-ch2-15',
    number: 15,
    section: 'B',
    sectionTitle: 'Bacteria, Virus & Fungi',
    question: 'Yeast is a famous microscopic unicellular organism belonging to which group?',
    options: ['Bacteria', 'Viruses', 'Fungi', 'Vertebrates'],
    correctIndex: 2,
    explanation: 'Yeast is a single-celled (unicellular) microscopic fungus — an essential STS exam distinction!',
    topicRefId: 5
  },
  {
    id: 'stbb-c5-ch2-16',
    number: 16,
    section: 'B',
    sectionTitle: 'Bacteria, Virus & Fungi',
    question: 'What is the correct order of microbe groups arranged from SMALLEST to LARGEST?',
    options: [
      'Fungi → Bacteria → Virus',
      'Bacteria → Virus → Fungi',
      'Virus → Bacteria → Fungi',
      'Virus → Fungi → Bacteria'
    ],
    correctIndex: 2,
    explanation: 'Non-cellular Viruses are smallest, simple single-celled Bacteria are medium, and complex-celled Fungi are largest.',
    topicRefId: 5
  },
  {
    id: 'stbb-c5-ch2-17',
    number: 17,
    section: 'B',
    sectionTitle: 'Bacteria, Virus & Fungi',
    question: 'Which statement about fungi is TRUE according to the STBB Class 5 Science curriculum?',
    options: [
      'All fungi are smaller than viruses',
      'Some fungi are microscopic (like yeast), while others are visible to the naked eye (like mushrooms)',
      'Fungi make their own food using green chlorophyll',
      'Fungi can never grow on moist bread'
    ],
    correctIndex: 1,
    explanation: 'Fungi include both microscopic unicellular species (yeast) and larger visible species (mushrooms), and none have chlorophyll.',
    topicRefId: 5
  },
  {
    id: 'stbb-c5-ch2-18',
    number: 18,
    section: 'B',
    sectionTitle: 'Bacteria, Virus & Fungi',
    question: 'Outside a living host organism, a virus particle is:',
    options: [
      'Actively eating soil and dividing every minute',
      'Performing photosynthesis in sunlight',
      'Inactive and unable to feed, grow, or divide alone',
      'Turning milk into yogurt'
    ],
    correctIndex: 2,
    explanation: 'Because viruses lack cellular machinery, they are completely inactive outside living host cells.',
    topicRefId: 4
  },

  // SECTION C: Usefulness of Microorganisms (Q19–Q26)
  {
    id: 'stbb-c5-ch2-19',
    number: 19,
    section: 'C',
    sectionTitle: 'Usefulness of Microorganisms',
    question: 'Yeast is widely used in bakeries primarily for:',
    options: ['Bread making (raising dough)', 'Boiling drinking water', 'Tanning iron rods', 'Polishing glass lenses'],
    correctIndex: 0,
    explanation: 'Yeast ferments sugar in warm flour dough and releases carbon dioxide gas bubbles, making bread rise fluffy and soft.',
    topicRefId: 6
  },
  {
    id: 'stbb-c5-ch2-20',
    number: 20,
    section: 'C',
    sectionTitle: 'Usefulness of Microorganisms',
    question: 'Oral polio drops given to children across Pakistan are a form of:',
    options: ['Painkiller syrup', 'Vaccine', 'Food preservative', 'Detergent enzyme'],
    correctIndex: 1,
    explanation: 'Polio drops are an oral vaccine prepared using weakened poliovirus to build lifelong immunity against poliomyelitis.',
    topicRefId: 6
  },
  {
    id: 'stbb-c5-ch2-21',
    number: 21,
    section: 'C',
    sectionTitle: 'Usefulness of Microorganisms',
    question: 'The microscopic fungus Penicillium produces which life-saving antibiotic medicine?',
    options: ['Insulin', 'Aspirin', 'Penicillin', 'Polio drops'],
    correctIndex: 2,
    explanation: 'Penicillium mold naturally produces penicillin — the historic antibiotic used worldwide to treat bacterial infections.',
    topicRefId: 6
  },
  {
    id: 'stbb-c5-ch2-22',
    number: 22,
    section: 'C',
    sectionTitle: 'Usefulness of Microorganisms',
    question: 'Which microorganisms convert warm milk into yogurt (dahi), cheese, and sour cream?',
    options: ['Influenza viruses', 'Helpful lactic acid bacteria', 'Polio viruses', 'Mosquito larvae'],
    correctIndex: 1,
    explanation: 'Beneficial bacteria ferment milk sugar (lactose) into lactic acid, coagulating milk proteins into yogurt, cheese, and sour cream.',
    topicRefId: 6
  },
  {
    id: 'stbb-c5-ch2-23',
    number: 23,
    section: 'C',
    sectionTitle: 'Usefulness of Microorganisms',
    question: 'How do decomposer soil bacteria benefit agriculture and the environment?',
    options: [
      'They turn fertile soil into plastic',
      'They break down dead plants, animals, and garbage into rich soil nutrients',
      'They block plant roots from absorbing water',
      'They eat sunlight before it reaches leaves'
    ],
    correctIndex: 1,
    explanation: 'Decomposer bacteria break down dead organic waste into nutrient-rich humus, keeping Earth clean and farmland fertile.',
    topicRefId: 6
  },
  {
    id: 'stbb-c5-ch2-24',
    number: 24,
    section: 'C',
    sectionTitle: 'Usefulness of Microorganisms',
    question: 'Special helpful bacteria live inside the digestive systems of cattle, goats, sheep, and rabbits to help them:',
    options: [
      'Breathe underwater',
      'Digest tough plant grass and cellulose food',
      'Fly over tall mountains',
      'Glow in the dark at night'
    ],
    correctIndex: 1,
    explanation: 'Grazing herbivores rely on symbiotic gut bacteria to break down tough plant fiber into absorbable nutrients.',
    topicRefId: 6
  },
  {
    id: 'stbb-c5-ch2-25',
    number: 25,
    section: 'C',
    sectionTitle: 'Usefulness of Microorganisms',
    question: 'In which everyday industries are microorganisms and their enzymes widely used?',
    options: [
      'Leather processing and detergent washing powders',
      'Cutting diamonds and melting gold',
      'Building brick walls and steel bridges',
      'Making glass mirrors and copper wires'
    ],
    correctIndex: 0,
    explanation: 'STBB Class 5 Science highlights industrial microbial roles in tanning leather hides and manufacturing bio-detergent powders.',
    topicRefId: 6
  },
  {
    id: 'stbb-c5-ch2-26',
    number: 26,
    section: 'C',
    sectionTitle: 'Usefulness of Microorganisms',
    question: 'What is the key medical difference between an antibiotic and a vaccine?',
    options: [
      'Antibiotics treat bacterial infections, while vaccines prevent diseases by training immunity beforehand',
      'Antibiotics spoil milk, while vaccines bake bread',
      'Antibiotics are only for plants, while vaccines are only for soil',
      'There is no difference; both are types of microscopes'
    ],
    correctIndex: 0,
    explanation: 'Antibiotics (like penicillin) kill harmful bacteria causing infection, whereas vaccines (like polio drops) build protective immunity before disease strikes.',
    topicRefId: 6
  },

  // SECTION D: Harm & Infections (Q27–Q34)
  {
    id: 'stbb-c5-ch2-27',
    number: 27,
    section: 'D',
    sectionTitle: 'Harm & Infections',
    question: 'Contaminated water is purified and made safe for drinking by boiling continuously for at least:',
    options: ['5 seconds', '30 seconds', '5 minutes', '5 days'],
    correctIndex: 2,
    explanation: 'Boiling water continuously for at least 5 minutes kills harmful bacteria, viruses, and parasites present in contaminated water.',
    topicRefId: 7
  },
  {
    id: 'stbb-c5-ch2-28',
    number: 28,
    section: 'D',
    sectionTitle: 'Harm & Infections',
    question: 'Major entry routes through which harmful microorganisms enter the human body include:',
    options: [
      'Hair strands and fingernails only',
      'Nose, mouth, and skin',
      'Shoes and belt buckles only',
      'Shadows and echoes'
    ],
    correctIndex: 1,
    explanation: 'Pathogenic germs enter the body primarily via the nose (inhaled air/droplets), mouth (contaminated food/water), and skin (cuts/rashes).',
    topicRefId: 8
  },
  {
    id: 'stbb-c5-ch2-29',
    number: 29,
    section: 'D',
    sectionTitle: 'Harm & Infections',
    question: 'Athlete’s foot (an itchy rash between damp toes) is caused by which type of infection?',
    options: ['Viral infection', 'Bacterial infection', 'Fungal infection', 'Vitamin excess'],
    correctIndex: 2,
    explanation: 'Athlete’s foot and ringworm rashes are classic fungal skin infections that thrive on warm, sweaty skin.',
    topicRefId: 8
  },
  {
    id: 'stbb-c5-ch2-30',
    number: 30,
    section: 'D',
    sectionTitle: 'Harm & Infections',
    question: 'Why does spoiled food smell foul and become dangerous to eat?',
    options: [
      'Harmful bacteria grow on the food and produce toxic harmful chemicals',
      'Sunlight turns salt into sugar',
      'Clean plates absorb all nutrients from food',
      'Cold air inside refrigerators adds perfume'
    ],
    correctIndex: 0,
    explanation: 'Multiplying spoilage bacteria break down food nutrients and release foul-smelling, harmful chemicals that cause food poisoning.',
    topicRefId: 7
  },
  {
    id: 'stbb-c5-ch2-31',
    number: 31,
    section: 'D',
    sectionTitle: 'Harm & Infections',
    question: 'In STBB Activity 3, what grows on a slice of moist bread kept in a warm, dark place for several days?',
    options: [
      'Green leafy grass shoots',
      'Fuzzy fungal colonies (bread mold)',
      'Crystal salt cubes',
      'Tiny earthworms'
    ],
    correctIndex: 1,
    explanation: 'Microscopic mold spores settle on damp bread and multiply rapidly in warm dark conditions to form visible fuzzy fungal colonies.',
    topicRefId: 7
  },
  {
    id: 'stbb-c5-ch2-32',
    number: 32,
    section: 'D',
    sectionTitle: 'Harm & Infections',
    question: 'Common cold and influenza (flu) are caused by which category of microorganisms?',
    options: ['Fungi', 'Viruses', 'Helpful soil bacteria', 'Yeast'],
    correctIndex: 1,
    explanation: 'Both the common cold and seasonal influenza (flu) are viral respiratory infections transmitted via droplets.',
    topicRefId: 8
  },
  {
    id: 'stbb-c5-ch2-33',
    number: 33,
    section: 'D',
    sectionTitle: 'Harm & Infections',
    question: 'What is the medical term for a disease caused when harmful microbes enter the body and multiply?',
    options: ['Magnification', 'Decomposition', 'Infection', 'Pasteurization'],
    correctIndex: 2,
    explanation: 'An infection occurs whenever disease-causing microorganisms invade host tissues and multiply to cause symptoms.',
    topicRefId: 8
  },
  {
    id: 'stbb-c5-ch2-34',
    number: 34,
    section: 'D',
    sectionTitle: 'Harm & Infections',
    question: 'Drinking unboiled contaminated water containing harmful bacteria commonly leads to:',
    options: [
      'Acute diarrhoea, cholera, and typhoid',
      'Stronger bones and sharper eyesight',
      'Athlete’s foot between toes',
      'Instant immunity to cold weather'
    ],
    correctIndex: 0,
    explanation: 'Waterborne pathogenic bacteria attack the digestive tract when swallowed, causing acute diarrhoea, typhoid fever, and cholera.',
    topicRefId: 8
  },

  // SECTION E: Prevention & Hygiene (Q35–Q40)
  {
    id: 'stbb-c5-ch2-35',
    number: 35,
    section: 'E',
    sectionTitle: 'Prevention & Hygiene',
    question: 'What is the best overall everyday practice to prevent infections before germs enter the body?',
    options: [
      'Practising personal and environmental hygiene',
      'Skipping meals and sleeping outdoors',
      'Keeping food uncovered on warm tables',
      'Sharing unwashed towels and handkerchiefs'
    ],
    correctIndex: 0,
    explanation: 'Personal cleanliness combined with clean streets, clean water, and covered waste forms the strongest barrier against infection.',
    topicRefId: 8
  },
  {
    id: 'stbb-c5-ch2-36',
    number: 36,
    section: 'E',
    sectionTitle: 'Prevention & Hygiene',
    question: 'According to personal hygiene rules in Class 5 Science, how many times a day should you brush your teeth?',
    options: ['Once a week', 'Twice a day', 'Once a month', 'Only after eating sweets'],
    correctIndex: 1,
    explanation: 'Brushing teeth twice daily (morning and night before sleep) removes harmful bacteria that rot teeth and inflame gums.',
    topicRefId: 8
  },
  {
    id: 'stbb-c5-ch2-37',
    number: 37,
    section: 'E',
    sectionTitle: 'Prevention & Hygiene',
    question: 'When is washing hands thoroughly with soap and clean water MOST critical to break germ transmission?',
    options: [
      'Only on rainy winter days',
      'After using the toilet and before eating or handling food',
      'Only before watching television',
      'Once every Sunday afternoon'
    ],
    correctIndex: 1,
    explanation: 'Washing hands with soap after toilet use and before eating directly blocks oral fecal-bacterial transmission of diarrhoea and typhoid.',
    topicRefId: 8
  },
  {
    id: 'stbb-c5-ch2-38',
    number: 38,
    section: 'E',
    sectionTitle: 'Prevention & Hygiene',
    question: 'Why is trimming fingernails short and clean an essential personal hygiene habit?',
    options: [
      'Dirt and millions of microbes hide underneath long nails and enter the mouth with food',
      'Short nails help you see bacteria without a microscope',
      'Long nails turn bacteria into fungi',
      'Trimmed nails replace the need for drinking water'
    ],
    correctIndex: 0,
    explanation: 'Long fingernails trap soil, fecal germs, and parasite eggs that easily transfer into food while eating.',
    topicRefId: 8
  },
  {
    id: 'stbb-c5-ch2-39',
    number: 39,
    section: 'E',
    sectionTitle: 'Prevention & Hygiene',
    question: 'Which of the following is an example of ENVIRONMENTAL hygiene rather than personal hygiene?',
    options: [
      'Trimming your own fingernails',
      'Brushing your teeth before bed',
      'Keeping neighbourhood streets, roads, school grounds, and water sources clean',
      'Combing your hair neatly'
    ],
    correctIndex: 2,
    explanation: 'Environmental hygiene focuses on community surroundings: clean streets, covered garbage bins, clean drains, and safe water.',
    topicRefId: 8
  },
  {
    id: 'stbb-c5-ch2-40',
    number: 40,
    section: 'E',
    sectionTitle: 'Prevention & Hygiene',
    question: 'Why does storing cooked food inside a refrigerator prevent rapid food spoilage?',
    options: [
      'Cold temperature slows down the growth and division of spoilage microbes',
      'Refrigerator light turns bacteria into vitamins',
      'Cold air boils water inside the food',
      'Microbes only exist in outer space'
    ],
    correctIndex: 0,
    explanation: 'Harmful bacteria and molds multiply fastest in warm conditions; cold refrigerator temperatures sharply slow down microbial division.',
    topicRefId: 7
  }
];

export const STBB_CH2_SUMMARY_CONCEPTS = [
  {
    icon: '🔬',
    topic: 'Definition',
    takeaway: 'Microbes = tiny living things invisible to the naked eye, seen only through a microscope (millions fit in a needle’s eye).'
  },
  {
    icon: '🧬',
    topic: 'Cell & Microscope',
    takeaway: 'Cell = basic unit of life; Microscope magnifies via Eyepiece, Nosepiece, Objectives, Coarse & Fine knobs (E-N-O-C-F).'
  },
  {
    icon: '🦠',
    topic: 'Bacteria',
    takeaway: 'Single-celled (unicellular), simple; rod, round, or spiral shapes; feeds, grows & divides on its own (e.g., E. coli).'
  },
  {
    icon: '🧫',
    topic: 'Virus',
    takeaway: 'Non-cellular (not a cell); SMALLEST microbe; inactive outside host; multiplies ONLY inside living host cells.'
  },
  {
    icon: '🍄',
    topic: 'Fungi',
    takeaway: 'LARGEST microbes with larger, complex cells; Yeast = unicellular microscopic fungus; Penicillium = antibiotic mold.'
  },
  {
    icon: '♻️',
    topic: 'Useful Microbes',
    takeaway: 'Decomposition (fertile soil), bread making (yeast), yogurt/cheese, cattle digestion, antibiotics (penicillin) & vaccines (polio drops).'
  },
  {
    icon: '⚠️',
    topic: 'Harmful Effects',
    takeaway: 'Food spoilage & foul smell (toxic chemicals), bread mold on moist bread (Activity 3), water contamination & infections.'
  },
  {
    icon: '🧼',
    topic: 'Prevention & Hygiene',
    takeaway: 'Block Nose, Mouth & Skin routes: boil water ≥ 5 min, soap handwash after toilet, brush twice daily, trim nails & keep streets clean.'
  }
];

export const STBB_CH2_MATRICES: StbbComparisonMatrix[] = [
  {
    title: 'Master Comparison Matrix — Bacteria vs. Virus vs. Fungi',
    subtitle: 'High-yield side-by-side structural & functional comparison directly aligned with STBB Class 5 Science',
    headers: ['Feature', 'Bacteria 🦠', 'Virus 🧫', 'Fungi 🍄'],
    rows: [
      {
        cells: ['Cell type', 'Unicellular, simple cell', 'Non-cellular (not a cell)', 'Unicellular or multicellular, complex cell'],
        cellStyles: { 0: 'bold', 2: 'rose' }
      },
      {
        cells: ['Size rank', 'Medium microbe', 'Smallest microbe', 'Largest microbe'],
        cellStyles: { 0: 'bold', 2: 'amber', 3: 'emerald' }
      },
      {
        cells: ['Feed / grow alone?', '✅ Yes (independently)', '❌ No (only inside living host)', '✅ Yes (absorbs nutrients)'],
        cellStyles: { 0: 'bold', 1: 'emerald', 2: 'rose', 3: 'emerald' }
      },
      {
        cells: ['Divide alone?', '✅ Yes (binary division)', '❌ No (only inside living host)', '✅ Yes (budding / spores)'],
        cellStyles: { 0: 'bold', 1: 'emerald', 2: 'rose', 3: 'emerald' }
      },
      {
        cells: ['Key Examples', 'Escherichia coli (E. coli), Yogurt bacteria', 'Influenza virus, Polio virus', 'Yeast, Penicillium, Bread mold'],
        cellStyles: { 0: 'bold' }
      },
      {
        cells: ['Common Diseases', 'Some acute diarrhoea, typhoid, cholera', 'Common cold, flu (influenza), polio', 'Athlete’s foot, itchy skin rashes'],
        cellStyles: { 0: 'bold' }
      }
    ]
  },
  {
    title: 'Master Matrix — Useful vs. Harmful Microorganisms',
    subtitle: 'Complete exam reference pairing beneficial roles with harmful microbial hazards',
    headers: ['Useful Role 🌟', 'Beneficial Microbe', 'Harmful Effect ⚠️', 'Culprit Microbe'],
    rows: [
      {
        cells: ['Decomposition into fertile humus', 'Soil decomposer bacteria', 'Food spoilage & foul smell rot', 'Harmful spoilage bacteria'],
        cellStyles: { 0: 'emerald', 2: 'rose' }
      },
      {
        cells: ['Bread raising (fluffy dough)', 'Yeast (unicellular fungus)', 'Water contamination hazard', 'Waterborne microbes (boil ≥ 5 min!)'],
        cellStyles: { 0: 'emerald', 2: 'rose' }
      },
      {
        cells: ['Yogurt (dahi), cheese & sour cream', 'Lactic acid bacteria', 'Common cold & influenza sneeze', 'Influenza / respiratory viruses'],
        cellStyles: { 0: 'emerald', 2: 'rose' }
      },
      {
        cells: ['Antibiotic medicine (Penicillin)', 'Penicillium fungus', 'Athlete’s foot & skin rashes', 'Pathogenic skin fungi'],
        cellStyles: { 0: 'emerald', 2: 'rose' }
      },
      {
        cells: ['Oral vaccine immunity shield', 'Weakened Polio virus (polio drops)', 'Acute infectious diarrhoea', 'Harmful gut bacteria'],
        cellStyles: { 0: 'emerald', 2: 'rose' }
      },
      {
        cells: ['Grass digestion (cattle, sheep, goats, rabbits) + Leather/Detergent', 'Symbiotic & industrial bacteria', 'Fuzzy mold colonies on damp bread', 'Bread mold fungi (Activity 3)'],
        cellStyles: { 0: 'emerald', 2: 'rose' }
      }
    ]
  }
];

export const STBB_CHAPTER_2_CONFIG: StbbChapterConfig = {
  id: 'ch2-microorganisms',
  chapterNumber: 2,
  shortNavLabel: 'Ch 2: Microorganisms — The Invisible World',
  navEmoji: '🦠',
  isFeaturedNew: true,
  boardBadge: 'STBB Sindh Textbook Board · Class 5 · General Science',
  syllabusBadge: 'Sukkur IBA STS PST & JEST Syllabus Aligned',
  heroTitle: 'Microorganisms — The Invisible World',
  heroDescription:
    'Microorganisms are tiny living things seen only through a microscope. This chapter covers their types (virus, bacteria, fungi), their usefulness and harmfulness, infections, and prevention through hygiene.',
  quickMetrics: [
    { icon: 'book', label: '8 Topic Deep-Dives' },
    { icon: 'check', label: '40 Topic-Covering MCQs' },
    { icon: 'compass', label: 'Microbe Classification Decision Tree' },
    { icon: 'sparkles', label: '8 Mnemonics & Riddles' }
  ],
  tabs: {
    topicsLabel: '8 Interactive Topics',
    toolLabel: 'Microbe Decision Tree',
    mcqsLabel: '40 MCQs & Mock Exam',
    summaryLabel: 'Key Concepts & Tables'
  },
  sidebarHeading: 'Chapter 2 Curriculum Topics (1–8)',
  decisionTool: {
    badge: 'Diagnostic Microbe Simulator',
    title: 'Microbe Classification Decision Tree (Dichotomous Key)',
    subtitle:
      'Pick a sample specimen (or generate a Random Mystery Microbe!) and answer Yes/No at each scientific node to identify its group, size rank, key trait, and examples.',
    totalSteps: 3,
    samplePromptLabel: 'Sample Quick-Buttons (Select a Specimen or Roll Random):',
    enableRandomMystery: true,
    specimens: [
      {
        id: 'spec-virus',
        name: 'Virus',
        emoji: '🧫',
        targetGroup: 'VIRUS',
        clue: 'Lab Observation: Ultra-tiny non-cellular particle (no cell wall, no nucleus). Completely inactive on a glass slide; multiplies rapidly only inside host airway cells!',
        expectedPath: 'Q1: Yes → VIRUS'
      },
      {
        id: 'spec-bacteria',
        name: 'Bacteria',
        emoji: '🦠',
        targetGroup: 'BACTERIA',
        clue: 'Lab Observation: Rod-shaped simple single cell seen under high power. Actively feeds, moves, and divides on its own every 20 minutes — much smaller & simpler than yeast!',
        expectedPath: 'Q1: No → Q2: Yes → Q3: No → BACTERIA'
      },
      {
        id: 'spec-fungi',
        name: 'Fungi',
        emoji: '🍄',
        targetGroup: 'FUNGI',
        clue: 'Lab Observation: Oval unicellular organism found in warm bread dough. Has a true nucleus, larger & more complex cell structure than bacteria, and releases CO2 bubbles!',
        expectedPath: 'Q1: No → Q2: Yes → Q3: Yes → FUNGI'
      }
    ],
    nodes: [
      {
        id: 1,
        question: '1. Is it non-cellular (not even a cell)?',
        helperText: 'Check whether the specimen lacks a cell wall, cytoplasm, and cellular structure altogether:',
        onYes: {
          type: 'result',
          shortCode: 'Q1: Yes',
          result: {
            group: 'VIRUS',
            emoji: '🧫',
            sizeRank: 'Smallest Microbe (Virus < Bacteria < Fungi)',
            keyTrait: 'Non-cellular particle; inactive outside a host; grows & multiplies ONLY inside living host cells.',
            examples: 'Influenza virus (cold/flu), Polio virus (used in polio vaccine drops)'
          }
        },
        onNo: {
          type: 'next',
          shortCode: 'Q1: No',
          nextNodeId: 2
        }
      },
      {
        id: 2,
        question: '2. Does it have a cell structure that feeds, grows, and divides on its own?',
        helperText: 'Check whether this cellular microorganism carries out independent nutrition, growth, and reproduction:',
        onYes: {
          type: 'next',
          shortCode: 'Q2: Yes',
          nextNodeId: 3
        },
        onNo: {
          type: 'recheck',
          shortCode: 'Q2: No (Re-check)',
          message:
            'Re-check microscope observation! If a microorganism is NOT non-cellular (Q1 = No), it is cellular and feeds, grows, and divides on its own. Re-inspect with the Fine Adjustment Knob or re-check Q1 if it is dormant outside a host!'
        }
      },
      {
        id: 3,
        question: '3. Are its cells larger and more complex, and does this group include yeast?',
        helperText: 'Compare cellular size & complexity under the high-power objective lens:',
        onYes: {
          type: 'result',
          shortCode: 'Q3: Yes',
          result: {
            group: 'FUNGI',
            emoji: '🍄',
            sizeRank: 'Largest Microbe (Virus < Bacteria < Fungi)',
            keyTrait: 'Larger, more complex eukaryotic cells than bacteria; absorbs nutrients; includes unicellular yeast.',
            examples: 'Yeast (bread making), Penicillium (penicillin antibiotic), Bread mold'
          }
        },
        onNo: {
          type: 'result',
          shortCode: 'Q3: No',
          result: {
            group: 'BACTERIA',
            emoji: '🦠',
            sizeRank: 'Medium Microbe (larger than viruses, smaller than fungi)',
            keyTrait: 'Simple single cell without a proper nucleus; rod, round, or spiral shapes; divides into two on its own.',
            examples: 'Escherichia coli (E. coli), Yogurt bacteria (Lactobacillus), Soil decomposers'
          }
        }
      }
    ]
  },
  mcqSections: [
    { id: 'All', label: 'All (40)' },
    { id: 'A', label: 'Sec A: Introduction & Microscope' },
    { id: 'B', label: 'Sec B: Bacteria/Virus/Fungi' },
    { id: 'C', label: 'Sec C: Usefulness' },
    { id: 'D', label: 'Sec D: Harm & Infections' },
    { id: 'E', label: 'Sec E: Prevention' }
  ],
  topics: STBB_CH2_TOPICS,
  mcqs: STBB_CH2_MCQS_DATA,
  summaryConcepts: STBB_CH2_SUMMARY_CONCEPTS,
  summaryMatrices: STBB_CH2_MATRICES
};
