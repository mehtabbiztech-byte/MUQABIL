import {
  STBB_TOPICS,
  STBB_MCQS_DATA,
  STBB_SUMMARY_CONCEPTS
} from './stbbClassFiveScienceData';
import {
  StbbChapterConfig,
  STBB_CHAPTER_2_CONFIG,
  STBB_CH2_MCQS_DATA
} from './stbbChapterTwoMicroorganismsData';
import {
  STBB_CHAPTER_3_CONFIG,
  STBB_CH3_MCQS_DATA
} from './stbbChapterThreeSeedsData';
import {
  STBB_CHAPTER_4_CONFIG,
  STBB_CH4_MCQS_DATA
} from './stbbChapterFourPollutionData';

export const STBB_CHAPTER_1_CONFIG: StbbChapterConfig = {
  id: 'ch1-classification',
  chapterNumber: 1,
  shortNavLabel: 'Ch 1: Classification of Living Things',
  navEmoji: '🧬',
  boardBadge: 'STBB Sindh Textbook Board · Class 5 Science',
  syllabusBadge: 'Sukkur IBA STS PST & JEST Syllabus Aligned',
  heroTitle: 'Chapter 1: Classification of Living Things',
  heroDescription:
    'The complete interactive learning curriculum: 8 comprehensive topic breakdowns, 5 Kingdoms, Vertebrates vs Invertebrates, Monocots vs Dicots, interactive Dichotomous Key simulation, and 40 verified MCQs with explanations.',
  quickMetrics: [
    { icon: 'book', label: '8 Topic Deep-Dives' },
    { icon: 'check', label: '40 Topic-Covering MCQs' },
    { icon: 'compass', label: 'Interactive Dichotomous Key' },
    { icon: 'sparkles', label: 'Mnemonics & Riddles' }
  ],
  tabs: {
    topicsLabel: '8 Interactive Topics',
    toolLabel: 'Dichotomous Key Tool',
    mcqsLabel: '40 MCQs Practice Bank',
    summaryLabel: 'Key Concepts & Tables'
  },
  sidebarHeading: 'Chapter 1 Curriculum Topics (1–8)',
  decisionTool: {
    badge: 'Diagnostic Taxonomic Simulator',
    title: 'Interactive Dichotomous Key for Animal Classification',
    subtitle:
      'Choose between the two scientific questions at each decision node to classify an unknown organism into its exact taxonomic group!',
    totalSteps: 5,
    samplePromptLabel: 'Try Classifying Real Animals:',
    enableRandomMystery: true,
    specimens: [
      {
        id: 'ch1-elephant',
        name: 'Elephant',
        emoji: '🐘',
        targetGroup: 'MAMMAL',
        clue: 'Lab Observation: Large warm-blooded animal with an internal spine, sparse body hair, breathes with lungs, and nurses calves with milk.',
        expectedPath: 'Q1: Yes → Q2: No → Q3: Yes → MAMMAL'
      },
      {
        id: 'ch1-parrot',
        name: 'Parrot',
        emoji: '🦜',
        targetGroup: 'BIRD',
        clue: 'Lab Observation: Warm-blooded animal with a backbone, green plumage feathers, curved hard beak, two wings, and hard-shelled eggs.',
        expectedPath: 'Q1: Yes → Q2: Yes → BIRD'
      },
      {
        id: 'ch1-cobra',
        name: 'Cobra',
        emoji: '🐍',
        targetGroup: 'REPTILE',
        clue: 'Lab Observation: Cold-blooded animal with a long flexible spine, dry overlapping scales, breathes air with lungs, and lays leathery eggs on land.',
        expectedPath: 'Q1: Yes → Q2: No → Q3: No → Q4: No → Q5: Yes → REPTILE'
      },
      {
        id: 'ch1-frog',
        name: 'Frog',
        emoji: '🐸',
        targetGroup: 'AMPHIBIAN',
        clue: 'Lab Observation: Cold-blooded animal with a spine, smooth moist glandular skin, lives near ponds, and deposits jelly-coated eggs in water.',
        expectedPath: 'Q1: Yes → Q2: No → Q3: No → Q4: Yes → AMPHIBIAN'
      },
      {
        id: 'ch1-shark',
        name: 'Shark',
        emoji: '🦈',
        targetGroup: 'FISH',
        clue: 'Lab Observation: Aquatic animal with a cartilaginous vertebral column, fins, scales, and extracts oxygen underwater through gills.',
        expectedPath: 'Q1: Yes → Q2: No → Q3: No → Q4: No → Q5: No → FISH'
      },
      {
        id: 'ch1-earthworm',
        name: 'Earthworm',
        emoji: '🪱',
        targetGroup: 'INVERTEBRATE',
        clue: 'Lab Observation: Soft segmented soil-burrowing animal with zero bones, no spine, and no jointed legs.',
        expectedPath: 'Q1: No → INVERTEBRATE'
      },
      {
        id: 'ch1-butterfly',
        name: 'Butterfly',
        emoji: '🦋',
        targetGroup: 'INVERTEBRATE',
        clue: 'Lab Observation: Six-legged insect with head, thorax, abdomen, two pairs of colorful wings, and no internal backbone.',
        expectedPath: 'Q1: No → INVERTEBRATE'
      }
    ],
    nodes: [
      {
        id: 1,
        question: '1. Does the animal have an internal backbone (vertebral column)?',
        helperText: 'Carefully observe the internal skeleton and select Yes or No:',
        onYes: { type: 'next', shortCode: 'Q1: Yes', nextNodeId: 2 },
        onNo: {
          type: 'result',
          shortCode: 'Q1: No',
          result: {
            group: 'INVERTEBRATE',
            emoji: '🦋',
            sizeRank: '95%+ of All Animal Species (Over 1,000,000 species)',
            keyTrait: 'No internal backbone; soft hydrostatic body or outer exoskeleton.',
            examples: 'Earthworm, Spider, Butterfly, Leech, Crab, Octopus'
          }
        }
      },
      {
        id: 2,
        question: '2. Does the animal have feathers and a beak/bill?',
        helperText: 'Inspect outer body covering and mouthparts:',
        onYes: {
          type: 'result',
          shortCode: 'Q2: Yes',
          result: {
            group: 'BIRD',
            emoji: '🦜',
            sizeRank: 'Warm-Blooded Feathered Vertebrate (~9,000+ species)',
            keyTrait: 'Covered in feathers, possesses beak/bill, two wings, lays hard-shelled eggs on land.',
            examples: 'Parrot, Ostrich, Penguin, Eagle, Sparrow'
          }
        },
        onNo: { type: 'next', shortCode: 'Q2: No', nextNodeId: 3 }
      },
      {
        id: 3,
        question: '3. Does the animal have fur or hair, and does the mother feed babies with milk?',
        helperText: 'Check thermoregulation, body hair, and mammary nursing:',
        onYes: {
          type: 'result',
          shortCode: 'Q3: Yes',
          result: {
            group: 'MAMMAL',
            emoji: '🐘',
            sizeRank: 'Warm-Blooded Viviparous Vertebrate',
            keyTrait: 'Fur or hair on body, breathes via lungs, gives live birth & nurses young with milk.',
            examples: 'Elephant, Tiger, Cow, Blue Whale, Bat, Human'
          }
        },
        onNo: { type: 'next', shortCode: 'Q3: No', nextNodeId: 4 }
      },
      {
        id: 4,
        question: '4. Does the animal have smooth moist skin and lay its eggs in water?',
        helperText: 'Observe skin moisture and aquatic spawning habits:',
        onYes: {
          type: 'result',
          shortCode: 'Q4: Yes',
          result: {
            group: 'AMPHIBIAN',
            emoji: '🐸',
            sizeRank: 'Cold-Blooded Dual-Life (Water + Land) Vertebrate',
            keyTrait: 'Smooth moist glandular skin, breathes through lungs & skin, lays eggs in water.',
            examples: 'Frog, Toad, Salamander, Newt'
          }
        },
        onNo: { type: 'next', shortCode: 'Q4: No', nextNodeId: 5 }
      },
      {
        id: 5,
        question: '5. Does the animal have dry scaly skin and lay leathery eggs on land?',
        helperText: 'Distinguish terrestrial scaly vertebrates from gill-breathing aquatic vertebrates:',
        onYes: {
          type: 'result',
          shortCode: 'Q5: Yes',
          result: {
            group: 'REPTILE',
            emoji: '🐍',
            sizeRank: 'Cold-Blooded Terrestrial Vertebrate',
            keyTrait: 'Dry horny scales, breathes via lungs, lays shelled/leathery eggs on land.',
            examples: 'Snake, Lizard, Crocodile, Turtle'
          }
        },
        onNo: {
          type: 'result',
          shortCode: 'Q5: No',
          result: {
            group: 'FISH',
            emoji: '🐟',
            sizeRank: 'Cold-Blooded Aquatic Vertebrate (~30,000+ species)',
            keyTrait: 'Slimy scales, breathes dissolved oxygen through gills, swims using fins.',
            examples: 'Rohu, Shark, Goldfish, Trout'
          }
        }
      }
    ]
  },
  mcqSections: [
    { id: 'All', label: 'All 40 MCQs' },
    { id: 'A', label: 'Sec A: Classification & 5 Kingdoms' },
    { id: 'B', label: 'Sec B: Vertebrates / Invertebrates' },
    { id: 'C', label: 'Sec C: 5 Vertebrates' },
    { id: 'D', label: 'Sec D: Worms & Insects' },
    { id: 'E', label: 'Sec E: Plants' },
    { id: 'F', label: 'Sec F: Monocots & Dicots' },
    { id: 'G', label: 'Sec G: Dichotomous Keys & T/F' }
  ],
  topics: STBB_TOPICS,
  mcqs: STBB_MCQS_DATA,
  summaryConcepts: STBB_SUMMARY_CONCEPTS.map((c) => ({ ...c })),
  summaryMatrices: [
    {
      title: 'The Five Kingdoms Comparison Matrix',
      headers: [
        'Kingdom',
        'Cell Structure',
        'True Nucleus',
        'Cell Wall',
        'Chlorophyll',
        'Mode of Nutrition',
        'Representative Examples'
      ],
      rows: [
        {
          cells: ['Bacteria', 'Unicellular', '❌ No proper nucleus', '✅ Yes', '❌ No', 'Heterotrophic', 'E. coli, Lactobacillus'],
          cellStyles: { 0: 'emerald', 2: 'rose', 3: 'emerald', 4: 'rose' }
        },
        {
          cells: ['Algae', 'Unicellular / Colonial', '✅ Yes', '✅ Yes', '✅ Yes', 'Photosynthetic', 'Ulva, Volvox, Cutleria'],
          cellStyles: { 0: 'teal', 2: 'emerald', 3: 'emerald', 4: 'emerald' }
        },
        {
          cells: ['Fungi', 'Mostly multicellular', '✅ Yes', '✅ Modified', '❌ No', 'Absorptive saprophyte', 'Mushrooms, yeast, bread mold'],
          cellStyles: { 0: 'amber', 2: 'emerald', 3: 'emerald', 4: 'rose' }
        },
        {
          cells: ['Plants', 'Multicellular', '✅ Yes', '✅ Yes (cellulose)', '✅ Yes', 'Photosynthetic', 'Sunflower, mango, moss'],
          cellStyles: { 0: 'emerald', 2: 'emerald', 3: 'emerald', 4: 'emerald' }
        },
        {
          cells: ['Animals', 'Multicellular', '✅ Yes', '❌ No cell wall', '❌ No', 'Ingestive heterotroph', 'Fish, frog, bird, tiger, spider'],
          cellStyles: { 0: 'rose', 2: 'emerald', 3: 'rose', 4: 'rose' }
        }
      ]
    },
    {
      title: 'Monocots vs. Dicots Comparison Matrix',
      headers: ['Feature', 'Monocotyledonous Plants (Monocots)', 'Dicotyledonous Plants (Dicots)'],
      rows: [
        {
          cells: ['Number of Cotyledons', 'One (1 seed leaf)', 'Two (2 seed leaves)'],
          cellStyles: { 0: 'bold', 1: 'emerald', 2: 'indigo' }
        },
        {
          cells: ['Leaf Venation', 'Parallel venation (side-by-side veins)', 'Netted (reticulate/web-like) venation'],
          cellStyles: { 0: 'bold' }
        },
        {
          cells: ['Flower Petal Multiples', 'Groups of 3 or multiples (3, 6, 9)', 'Groups of 4 or 5 or multiples (4, 5, 8, 10)'],
          cellStyles: { 0: 'bold' }
        },
        {
          cells: ['Root System', 'Fibrous roots', 'Taproot system with main primary root'],
          cellStyles: { 0: 'bold' }
        },
        {
          cells: ['Examples', 'Maize, Wheat, Rice, Grass, Lily', 'Mango, Gram, Bean, Sunflower, Lemon'],
          cellStyles: { 0: 'bold' }
        }
      ]
    }
  ]
};

export const STBB_CLASS_5_CHAPTERS: StbbChapterConfig[] = [
  STBB_CHAPTER_1_CONFIG,
  { ...STBB_CHAPTER_2_CONFIG, isFeaturedNew: false },
  STBB_CHAPTER_3_CONFIG,
  STBB_CHAPTER_4_CONFIG
];

export const ALL_STBB_MCQS = [
  ...STBB_MCQS_DATA,
  ...STBB_CH2_MCQS_DATA,
  ...STBB_CH3_MCQS_DATA,
  ...STBB_CH4_MCQS_DATA
];
