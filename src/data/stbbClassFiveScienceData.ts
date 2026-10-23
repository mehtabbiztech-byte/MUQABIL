export interface StbbTopic {
  id: number;
  slug: string;
  title: string;
  shortExplanation: string;
  keyCharacteristics: {
    heading?: string;
    points: string[];
    table?: {
      headers: string[];
      rows: string[][];
    };
  };
  deepDiveHeading?: string;
  deepDiveSections?: {
    title: string;
    emoji: string;
    points: string[];
  }[];
  realWorldExamples: {
    name: string;
    emoji: string;
    description: string;
  }[];
  mnemonic?: {
    acronym: string;
    meaning: string;
    items: { letter: string; word: string; note?: string }[];
  };
  riddle?: {
    prompt: string;
    answer: string;
    explanation: string;
  };
  unscrambles?: {
    scrambled: string;
    solution: string;
    hint: string;
  }[];
  secretCodeActivity?: {
    cipher: string;
    items: { encoded: string; answer: string; sentence: string }[];
  };
  vennDiagram?: {
    leftTitle: string;
    leftPoints: string[];
    middleTitle: string;
    middlePoints: string[];
    rightTitle: string;
    rightPoints: string[];
  };
  comparisonTable?: {
    title: string;
    headers: string[];
    rows: string[][];
  };
  flowchartAscii?: string;
}

export interface StbbMcq {
  id: string;
  number: number;
  section: string;
  sectionTitle: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topicRefId: number;
}

export const STBB_TOPICS: StbbTopic[] = [
  {
    id: 1,
    slug: 'what-is-classification',
    title: 'Topic 1: What is Classification and Why Do We Need It?',
    shortExplanation: 'Classification is the process of grouping living things based on shared characteristics. Scientists classify organisms to study them easily, systematically, and to understand evolutionary relationships. Without classification, the millions of species on Earth would be an overwhelming, unmanageable mess.',
    keyCharacteristics: {
      points: [
        'Definition: Putting living things into groups according to the ways they are alike is called classifying.',
        'Need: To study living things easily and systematically.',
        'Importance: Helps identify organisms, understand relationships, and communicate scientific information globally.',
        'Organisms: A scientist calls any living thing an organism.',
        'Dichotomous Key: A tool used to classify organisms through divisions into two smaller groups at each step.'
      ]
    },
    realWorldExamples: [
      { name: 'Elephant', emoji: '🐘', description: 'A mammal with a backbone, warm-blooded, feeds on plants, gives birth to live young.' },
      { name: 'Zebra', emoji: '🦓', description: 'A mammal with a backbone, warm-blooded, feeds on grass, lives in herds.' },
      { name: 'Parrot', emoji: '🦜', description: 'A bird with a backbone, warm-blooded, lays eggs, has wings, beak, and feathers.' },
      { name: 'Cheetah', emoji: '🐆', description: 'A mammal with a backbone, warm-blooded, carnivorous, fastest land animal.' },
      { name: 'Flamingo', emoji: '🦩', description: 'A bird with a backbone, warm-blooded, has wings, feathers, long legs for wading.' },
      { name: 'Blue bird', emoji: '🐦', description: 'A bird with a backbone, warm-blooded, lays eggs in nests.' }
    ],
    mnemonic: {
      acronym: 'MRS. GREN',
      meaning: 'Seven Essential Characteristics of All Living Organisms',
      items: [
        { letter: 'M', word: 'Movement', note: 'All living things can move on their own (animals walk/fly, plants bend toward light).' },
        { letter: 'R', word: 'Respiration', note: 'Releasing energy from food inside cells.' },
        { letter: 'S', word: 'Sensitivity', note: 'Detecting and responding to changes in surroundings.' },
        { letter: 'G', word: 'Growth', note: 'Permanently increasing in size and mass.' },
        { letter: 'R', word: 'Reproduction', note: 'Producing new individuals of the same kind.' },
        { letter: 'E', word: 'Excretion', note: 'Removing metabolic toxic waste substances.' },
        { letter: 'N', word: 'Nutrition', note: 'Taking in nutrients and energy for survival.' }
      ]
    },
    riddle: {
      prompt: 'I am neither classified under plants nor animals. I have a cell wall but no chlorophyll. I feed on dead plants and animals. What am I?',
      answer: 'A Fungus (such as a Mushroom or Mold)',
      explanation: 'Fungi possess eukaryotic cells with modified cell walls (chitin), lack chlorophyll, and absorb nutrients saprophytically.'
    },
    unscrambles: [
      { scrambled: 'REVETARBTE', solution: 'VERTEBRATE', hint: 'Animals that possess an internal backbone (spine).' }
    ]
  },
  {
    id: 2,
    slug: 'five-kingdom-system',
    title: 'Topic 2: The Five Kingdom System',
    shortExplanation: 'For a long time, living things were classified into just two kingdoms: Plants and Animals. With technological advancement, scientists observed more details in living things and now classify them into five different kingdoms: Bacteria, Algae, Fungi, Plants, and Animals. This system better reflects cellular structures and how organisms obtain energy.',
    keyCharacteristics: {
      heading: 'Five Kingdom Characteristics Matrix',
      points: [
        'Organisms are divided by cellularity (unicellular vs. multicellular), presence of a true nucleus, cell wall composition, and nutritional mode.'
      ],
      table: {
        headers: ['Kingdom', 'Cell Type', 'Nucleus', 'Cell Wall', 'Chlorophyll', 'Nutrition', 'Examples'],
        rows: [
          ['Bacteria', 'Unicellular', '❌ No proper nucleus', '✅ Yes', '❌ No', 'Heterotrophic (some parasitic/saprophytic)', 'E. coli, Lactobacillus (yogurt bacteria)'],
          ['Algae', 'Unicellular/Colonial', '✅ Yes', '✅ Yes', '✅ Yes', 'Photosynthetic (makes own food)', 'Ulva (sea lettuce), Volvox, Cutleria'],
          ['Fungi', 'Mostly multicellular', '✅ Yes', '✅ Modified wall', '❌ No', 'Heterotrophic (absorptive saprophyte)', 'Mushrooms, yeast, bread mold'],
          ['Plants', 'Multicellular', '✅ Yes', '✅ Yes (cellulose)', '✅ Yes', 'Photosynthetic (autotrophic)', 'Sunflower, hibiscus, moss, mango tree'],
          ['Animals', 'Multicellular', '✅ Yes', '❌ No cell wall', '❌ No', 'Heterotrophic (ingestive)', 'Fish, birds, mammals, insects, frogs']
        ]
      }
    },
    deepDiveHeading: 'Detailed Kingdom Breakdown',
    deepDiveSections: [
      {
        title: 'Kingdom Bacteria',
        emoji: '🦠',
        points: [
          'Unicellular (single-celled) microscopic organisms.',
          'Possess a protective cell wall but lack a membrane-bound proper nucleus.',
          'Found ubiquitously in air, water, soil, ice, and inside digestive tracts.',
          'While many cause infections (e.g. cholera, typhoid), helpful bacteria synthesize vitamins in human guts and produce yogurt, cheese, and life-saving antibiotics.'
        ]
      },
      {
        title: 'Kingdom Algae',
        emoji: '🌿',
        points: [
          'Contain green chlorophyll pigments and produce their own food by photosynthesis.',
          'Inhabit aquatic environments (freshwater lakes, ponds, marine oceans).',
          'Algal species like Ulva and seaweeds serve as direct food sources; Volvox forms microscopic spherical colonies.'
        ]
      },
      {
        title: 'Kingdom Fungi',
        emoji: '🍄',
        points: [
          'Mostly multicellular organisms with eukaryotic nuclei and modified cell walls.',
          'Completely lack chlorophyll and cannot perform photosynthesis.',
          'Absorb soluble nutrients from decaying organic matter, human foods, and decomposing wood.',
          'Yeast is unicellular and crucial in baking bread and brewing; Penicillium yields penicillin.'
        ]
      },
      {
        title: 'Kingdom Plants',
        emoji: '🌳',
        points: [
          'Multicellular organisms with cellulose cell walls and large central vacuoles.',
          'Contain green chlorophyll within chloroplasts to carry out photosynthesis using sunlight, water, and CO2.',
          'Possess specialized roots, stems, leaves, vascular systems, and reproductive flowers/seeds.'
        ]
      },
      {
        title: 'Kingdom Animals',
        emoji: '🐅',
        points: [
          'Multicellular organisms with eukaryotic nuclei but absolutely NO cell walls.',
          'Heterotrophic: must ingest other living things for energy.',
          'Most exhibit sensory systems, nervous coordination, and locomotive mobility.',
          'Subdivided into two grand divisions: Vertebrates and Invertebrates.'
        ]
      }
    ],
    realWorldExamples: [
      { name: 'Gut Bacteria', emoji: '🧫', description: 'Billions of beneficial bacteria live in your intestines, digesting fiber and synthesizing Vitamin K!' },
      { name: 'Volvox Algae', emoji: '🌊', description: 'Volvox forms beautiful green microscopic rolling spheres containing up to 50,000 cells.' },
      { name: 'Baker’s Yeast', emoji: '🍞', description: 'A tiny microscopic fungus that converts sugars into CO2 gas bubbles, making bread rise soft and fluffy.' },
      { name: 'Plant Kingdom Diversity', emoji: '🌻', description: 'Botanists have documented more than 380,000 known living plant species on planet Earth.' },
      { name: 'Blue Whale', emoji: '🐋', description: 'The blue whale is the largest animal ever known, weighing up to 200 metric tons and reaching 30 meters.' }
    ],
    flowchartAscii: `
                        LIVING THINGS
                             |
        +--------------------+--------------------+
        |          |         |         |          |
     Plants    Bacteria    Algae     Fungi     Animals
        |                                        |
   +----+----+                            +------+------+
   |         |                            |             |
Flowering Non-Flowering              Vertebrates   Invertebrates
   |                                          |
+--+--+                              +----+----+----+----+
|     |                              |    |    |    |    |
Monocot Dicot                     Fish Amph Reptiles Birds Mammals`,
    riddle: {
      prompt: 'You find a mysterious organism in a pond. It is single-celled, contains chlorophyll, and makes its own food in sunlight. Which kingdom does it belong to?',
      answer: 'Algae',
      explanation: 'In the STBB Class 5 science five-kingdom curriculum, aquatic unicellular organisms with chlorophyll and a nucleus are classified under Algae.'
    },
    unscrambles: [
      { scrambled: 'LOYOGO', solution: 'ZOOLOGY', hint: 'The branch of biology dedicated to the scientific study of animals.' },
      { scrambled: 'TNAOBY', solution: 'BOTANY', hint: 'The branch of biology dedicated to the scientific study of plants.' }
    ]
  },
  {
    id: 3,
    slug: 'vertebrates-vs-invertebrates',
    title: 'Topic 3: Vertebrates vs. Invertebrates',
    shortExplanation: 'The animal kingdom is divided into two major groups: Vertebrates (animals with a backbone) and Invertebrates (animals without a backbone). This is one of the most fundamental classifications in biology, affecting how animals support their bodies and move.',
    keyCharacteristics: {
      points: [
        'Vertebrates: Possess an internal articulated vertebral column (backbone) and bony or cartilaginous endoskeleton.',
        'Invertebrates: Do not possess an internal vertebral column; many have external hard exoskeletons or hydrostatic soft bodies.',
        'Diversity ratio: Over 95% of all animal species on Earth are invertebrates (over 1 million known species).'
      ],
      table: {
        headers: ['Feature', 'Vertebrates', 'Invertebrates'],
        rows: [
          ['Backbone', '✅ Present (Vertebral column)', '❌ Absent'],
          ['Internal Skeleton', '✅ Endoskeleton (bones/cartilage)', '❌ External exoskeleton or none'],
          ['Body Size', 'Generally medium to very large', 'Microscopic to medium (some giant squids)'],
          ['Species Count', 'Approx 60,000+ species', 'Over 1,000,000+ known species (95% of animals)'],
          ['Major Classes', 'Fish, Amphibians, Reptiles, Birds, Mammals', 'Insects, Worms, Spiders, Crustaceans, Mollusks']
        ]
      }
    },
    realWorldExamples: [
      { name: 'Fish Diversity', emoji: '🐟', description: 'Over 30,000 distinct species of fishes inhabit oceans, rivers, and coral reefs.' },
      { name: 'Bird Species', emoji: '🐦', description: 'More than 9,000 species of birds fly or run across Earth’s continents.' },
      { name: 'Insect Kingdom', emoji: '🐛', description: 'More than 800,000 species of insects constitute the largest animal group on the planet.' },
      { name: 'Earthworm', emoji: '🪱', description: 'Invertebrate annelid with no bones that loosens soil for agriculture.' },
      { name: 'Spider', emoji: '🕷️', description: 'Invertebrate arachnid with 8 jointed legs and no backbone.' },
      { name: 'Starfish', emoji: '⭐', description: 'Marine invertebrate echinoderm with radial symmetry and no spine.' },
      { name: 'Crab', emoji: '🦀', description: 'Invertebrate crustacean protected by an outer hard chitinous shell.' },
      { name: 'Octopus', emoji: '🐙', description: 'Soft-bodied cephalopod invertebrate with 8 arms and high intelligence.' }
    ],
    mnemonic: {
      acronym: 'FARM-B',
      meaning: 'The 5 Major Classes of Vertebrates',
      items: [
        { letter: 'F', word: 'Fish', note: 'Gills, scales, fins, lay eggs in water, cold-blooded.' },
        { letter: 'A', word: 'Amphibians', note: 'Moist skin, live on land and water, lay eggs in water.' },
        { letter: 'R', word: 'Reptiles', note: 'Dry scaly skin, cold-blooded, lay eggs on land.' },
        { letter: 'M', word: 'Mammals', note: 'Hair/fur, give live birth, nurse young with milk, warm-blooded.' },
        { letter: 'B', word: 'Birds', note: 'Feathers, beaks, lay eggs on land, wings, warm-blooded.' }
      ]
    },
    riddle: {
      prompt: 'I have a backbone, moist skin, and I lay my eggs in water. I can live both on land and in water. What am I?',
      answer: 'An Amphibian (such as a Frog or Toad)',
      explanation: 'Amphibians have moist glandular skin and depend on water bodies to deposit their jelly-coated eggs.'
    },
    vennDiagram: {
      leftTitle: 'VERTEBRATES',
      leftPoints: [
        'Articulated backbone (spine)',
        'Internal bony endoskeleton',
        'Generally larger body size',
        'Fish, amphibians, reptiles, birds, mammals'
      ],
      middleTitle: 'COMMON TRAITS',
      middlePoints: [
        'Living animal organisms',
        'Heterotrophic nutrition',
        'Capable of movement',
        'Respond to stimuli',
        'Undergo growth & reproduction'
      ],
      rightTitle: 'INVERTEBRATES',
      rightPoints: [
        'No backbone',
        'Exoskeleton or hydrostatic fluid',
        'Microscopic to moderate size',
        'Insects, worms, spiders, crabs, mollusks'
      ]
    }
  },
  {
    id: 4,
    slug: 'classification-of-vertebrates',
    title: 'Topic 4: Classification of Vertebrates — Fish, Amphibians, Reptiles, Birds, Mammals',
    shortExplanation: 'Vertebrates are classified into five major groups based on their body covering, how they breathe, how they reproduce, and whether they are cold-blooded or warm-blooded. Each group has unique adaptations for survival in its environment.',
    keyCharacteristics: {
      points: [
        'Fish: Aquatic, cold-blooded, breathe with gills, body covered in scales, swim with fins, lay eggs in water.',
        'Amphibians: Dual life (water & land), cold-blooded, moist glandular skin, breathe through lungs & skin, lay eggs in water.',
        'Reptiles: Dry scaly skin, cold-blooded, breathe via lungs, lay shelled eggs on land.',
        'Birds: Warm-blooded, body covered in feathers, beaks/bills, two wings, two legs, lay hard-shelled eggs on land.',
        'Mammals: Warm-blooded, fur or hair, mothers feed babies with milk from mammary glands, give birth to live young (viviparous).'
      ],
      table: {
        headers: ['Group', 'Body Covering', 'Breathing Organ', 'Reproduction', 'Blood Temperature', 'Limbs', 'Examples'],
        rows: [
          ['Fish', 'Slimy scales', 'Gills', 'Eggs in water', 'Cold-blooded', 'Fins', 'Rohu, Trout, Goldfish, Shark'],
          ['Amphibians', 'Moist smooth skin', 'Lungs & skin', 'Eggs in water', 'Cold-blooded', 'Four legs', 'Frog, Toad, Salamander, Newt'],
          ['Reptiles', 'Dry horny scales', 'Lungs', 'Shelled eggs on land', 'Cold-blooded', 'Four legs (or none)', 'Snake, Lizard, Crocodile, Turtle'],
          ['Birds', 'Feathers', 'Lungs', 'Shelled eggs on land', 'Warm-blooded', 'Two wings + two legs', 'Parrot, Ostrich, Penguin, Sparrow'],
          ['Mammals', 'Fur, hair or skin', 'Lungs', 'Live birth (nurse milk)', 'Warm-blooded', 'Four limbs / flippers', 'Tiger, Elephant, Cow, Dolphin, Bat, Human']
        ]
      }
    },
    realWorldExamples: [
      { name: 'Shark', emoji: '🦈', description: 'A vertebrate fish with a flexible cartilaginous skeleton (not a mammal).' },
      { name: 'Frog', emoji: '🐸', description: 'Can absorb dissolved oxygen directly through its permeable moist skin when underwater.' },
      { name: 'Cobra', emoji: '🐍', description: 'A reptile with protective dry scales that lays leathery eggs on dry land.' },
      { name: 'Penguin', emoji: '🐧', description: 'A flightless marine bird whose wings have evolved into powerful underwater swimming flippers.' },
      { name: 'Bat', emoji: '🦇', description: 'The only true flying mammal in the world; feeds its pups with milk.' },
      { name: 'Blue Whale', emoji: '🐋', description: 'A marine mammal that breathes air through blowholes and gives birth to live calves.' },
      { name: 'Newt', emoji: '🦎', description: 'An amphibian with moist skin, frequently confused with lizards (which are reptiles).' }
    ],
    mnemonic: {
      acronym: 'FARMB',
      meaning: 'Vertebrate Groups from Aquatic to Advanced',
      items: [
        { letter: 'F', word: 'Fish', note: 'Gills, scales, fins, cold-blooded.' },
        { letter: 'A', word: 'Amphibians', note: 'Moist skin, water-breeder, cold-blooded.' },
        { letter: 'R', word: 'Reptiles', note: 'Dry scales, land-egg layers, cold-blooded.' },
        { letter: 'M', word: 'Mammals', note: 'Fur, milk nursing, live birth, warm-blooded.' },
        { letter: 'B', word: 'Birds', note: 'Feathers, beaks, hard eggs, warm-blooded.' }
      ]
    },
    riddle: {
      prompt: 'A crocodile can spend time in water. A frog also spends time in water. What are 3 decisive differences between a crocodile and a frog?',
      answer: '1) Crocodile has dry scaly skin; frog has smooth moist skin. 2) Crocodile lays eggs on land; frog lays eggs in water. 3) Crocodile is a reptile; frog is an amphibian.',
      explanation: 'Skin texture, egg-laying location, and biological taxonomic class cleanly distinguish reptiles from amphibians.'
    },
    unscrambles: [
      { scrambled: 'MHAIPBNIA', solution: 'AMPHIBIAN', hint: 'Cold-blooded vertebrate that lives both on land and in water.' }
    ]
  },
  {
    id: 5,
    slug: 'invertebrates-worms-and-insects',
    title: 'Topic 5: Invertebrates — Worms and Insects',
    shortExplanation: 'Invertebrates are animals without backbones, and they make up the vast majority of animal species. Two important groups are worms (soft-bodied, no legs) and insects (three pairs of jointed legs, three body segments). Understanding their characteristics helps us distinguish them from other animals.',
    keyCharacteristics: {
      points: [
        'Worms: Soft, elongated bodies with no skeleton and NO legs. Some are segmented (earthworms, leeches); others unsegmented (roundworms, flatworms).',
        'Insects: Defined by three pairs of jointed legs (exactly 6 legs) and three distinct body segments: Head, Thorax, and Abdomen.',
        'Insects often possess one or two pairs of wings attached to the thorax and sensory antennae on their heads.',
        'Earthworms are beneficial decomposers ("nature’s plow"), whereas tapeworms and leeches are parasites.'
      ],
      table: {
        headers: ['Feature', 'Worms', 'Insects'],
        rows: [
          ['Number of Legs', 'None (0 legs)', 'Exactly 3 pairs (6 jointed legs)'],
          ['Body Segments', 'Cylindrical, sometimes ringed segments', 'Three clear tagmata: Head, Thorax, Abdomen'],
          ['Wings', 'None', 'Often 1 or 2 pairs (attached to thorax)'],
          ['Antennae', 'None', 'One pair on head'],
          ['Feeding Method', 'Soil digestion, blood sucking, nutrient absorption', 'Sucking nectar/blood, chewing leaves'],
          ['Examples', 'Earthworm, Leech, Tapeworm, Roundworm', 'Butterfly, Mosquito, Cockroach, Dragonfly, Ant']
        ]
      }
    },
    realWorldExamples: [
      { name: 'Earthworm', emoji: '🪱', description: 'Burrows tunnels through garden soil, aerating roots and enriching humus. Known as "Night Crawlers".' },
      { name: 'Tapeworm', emoji: '🦠', description: 'Parasitic flatworm with hooks and suckers that lives inside the human intestinal tract.' },
      { name: 'Medicinal Leech', emoji: '🩸', description: 'Aquatic segmented worm that attaches using oral suckers and feeds on blood.' },
      { name: 'Goliath Beetle', emoji: '🪲', description: 'The world’s heaviest insect from Africa, weighing more than 100 grams!' },
      { name: 'Dragonfly', emoji: '🦟', description: 'Agile predator with two pairs of long thin wings, huge compound eyes, and a needle-shaped abdomen.' },
      { name: 'Cockroach', emoji: '🪳', description: 'Nocturnal household pest with flat oval body that thrives in warm, damp, dark hiding spots.' }
    ],
    secretCodeActivity: {
      cipher: 'A=1, B=2, C=3 ... Z=26',
      items: [
        { encoded: '14 9 7 8 20  3 18 1 23 12 5 18 19', answer: 'NIGHT CRAWLERS', sentence: 'Earthworms are also colloquially called NIGHT CRAWLERS.' },
        { encoded: '8 21 13 1 14', answer: 'HUMAN', sentence: 'A tapeworm lives as a parasite inside the HUMAN body.' },
        { encoded: '2 21 18 18 15 23 / 1 9 18', answer: 'BURROW / AIR', sentence: 'As earthworms BURROW through soil, they give plant roots the AIR they need.' },
        { encoded: '2 12 15 15 4', answer: 'BLOOD', sentence: 'A leech sucks BLOOD through its muscular suckers.' }
      ]
    },
    riddle: {
      prompt: 'I have two pairs of long, thin wings. I eat mosquitoes and other small insects. I live near lakes, ponds, streams, and rivers. My abdomen is very long, as long as a darning needle. What am I?',
      answer: 'Dragonfly',
      explanation: 'Dragonflies are beneficial predatory insects with elongated abdomens and transparent dual wing pairs.'
    }
  },
  {
    id: 6,
    slug: 'classification-of-plants-flowering-vs-non-flowering',
    title: 'Topic 6: Classification of Plants — Flowering vs. Non-Flowering',
    shortExplanation: 'The plant kingdom is divided into two major groups: Flowering plants (which produce flowers and seeds in fruits) and Non-flowering plants (which reproduce by spores or seeds but do not produce flowers). This classification helps us understand plant diversity and reproduction.',
    keyCharacteristics: {
      points: [
        'Flowering Plants (Angiosperms): Produce blossoms/flowers; reproduce through seeds enclosed inside protective fruits; possess true roots, stems, and leaves.',
        'Non-Flowering Plants (Gymnosperms, Pteridophytes, Bryophytes): Do not bear flowers.',
        'Seedless Non-Flowering: Reproduce by microscopic spores (e.g. ferns and mosses).',
        'Seeded Non-Flowering: Reproduce by "naked" seeds borne on cones without fruits (e.g. Conifers like pine and fir trees).',
        'Except primitive mosses, all non-flowering plants possess true roots, stems, and leaves.'
      ],
      table: {
        headers: ['Feature', 'Flowering Plants', 'Non-Flowering Plants'],
        rows: [
          ['Flowers', '✅ Present (Petals, stamens, carpels)', '❌ Absent'],
          ['Reproductive Unit', 'Seeds enclosed inside fruit', 'Spores (ferns/moss) or naked cone seeds (pines)'],
          ['Vegetative Organs', 'True roots, stems, and leaves', 'True roots, stems, leaves (except mosses)'],
          ['Distribution', 'Everywhere on terrestrial Earth', 'Moist shady soil, damp rocks, mountain slopes'],
          ['Major Subgroups', 'Monocots and Dicots', 'Mosses (Bryophytes), Ferns, Conifers (Gymnosperms)'],
          ['Examples', 'Sunflower, Hibiscus, Mango, Rose, Wheat', 'Fern, Moss, Pine tree, Cedar, Fir']
        ]
      }
    },
    realWorldExamples: [
      { name: 'Sunflower', emoji: '🌻', description: 'A majestic dicot flowering plant whose central disc develops hundreds of oil-rich seeds.' },
      { name: 'Hibiscus', emoji: '🌺', description: 'Showy red flowering dicot with five distinct petals and prominent central stamen column.' },
      { name: 'Fern', emoji: '🌿', description: 'A non-flowering plant that bears brown spore capsules (sori) on the underside of its fronds.' },
      { name: 'Pine Tree', emoji: '🌲', description: 'A conifer that bears male and female wooden cones rather than petals.' }
    ],
    mnemonic: {
      acronym: 'FLOWER',
      meaning: 'Characteristics of Flowering Plants',
      items: [
        { letter: 'F', word: 'Fruit', note: 'Seeds develop enclosed inside a fruit.' },
        { letter: 'L', word: 'Leaves', note: 'Possess true leaves with veins.' },
        { letter: 'O', word: 'Organs', note: 'Possess specialized roots, stems, and reproductive blossoms.' },
        { letter: 'W', word: 'Widespread', note: 'Abundant in almost every global climate.' },
        { letter: 'E', word: 'Embryo', note: 'Seed contains one or two cotyledons.' },
        { letter: 'R', word: 'Reproduction', note: 'Pollination and seed production through flowers.' }
      ]
    },
    riddle: {
      prompt: 'I do not produce flowers. I reproduce by spores. I have true roots, stems, and leaves, and I grow on damp soil near shaded walls. What am I?',
      answer: 'A Fern',
      explanation: 'Ferns are vascular non-flowering plants that reproduce via spores rather than seeds or blossoms.'
    }
  },
  {
    id: 7,
    slug: 'monocots-vs-dicots',
    title: 'Topic 7: Monocots vs. Dicots — Classification of Flowering Plants',
    shortExplanation: 'Flowering plants are further divided into two major groups based on the number of cotyledons (seed leaves) in their seeds: Monocotyledonous plants (one cotyledon) and Dicotyledonous plants (two cotyledons). This difference extends to leaf venation, flower parts, and root structure.',
    keyCharacteristics: {
      points: [
        'Monocots: One cotyledon in seed; leaves have parallel venation; flower floral parts in 3s or multiples of 3; fibrous root systems.',
        'Dicots: Two cotyledons in seed; leaves have reticulate (netted) venation; floral parts in 4s or 5s (or multiples); taproot system with deep central root.'
      ],
      table: {
        headers: ['Feature', 'Monocotyledonous Plants (Monocots)', 'Dicotyledonous Plants (Dicots)'],
        rows: [
          ['Number of Cotyledons', 'One (1 seed leaf)', 'Two (2 seed leaves)'],
          ['Leaf Venation Pattern', 'Parallel veins running side by side', 'Netted (reticulate/web-like) veins'],
          ['Flower Floral Parts', 'Groups of 3 or multiples (3, 6, 9)', 'Groups of 4 or 5 or multiples (4, 5, 8, 10)'],
          ['Root System', 'Fibrous roots (cluster of thin roots)', 'Taproot (one thick primary root with side branches)'],
          ['Seed Splitting', 'Does not split cleanly into halves', 'Easily splits into two equal cotyledons'],
          ['Common Examples', 'Maize (corn), Wheat, Rice, Sugarcane, Lily', 'Mango, Gram (chickpea), Pea, Bean, Sunflower, Lemon']
        ]
      }
    },
    realWorldExamples: [
      { name: 'Maize (Corn)', emoji: '🌽', description: 'Classic monocot grain: long blade leaves with parallel veins and a single cotyledon.' },
      { name: 'Mango Tree', emoji: '🥭', description: 'Classic dicot tree: broad leaves with netted veins and two large fleshy seed cotyledons.' },
      { name: 'Sunflower', emoji: '🌻', description: 'Dicot plant with netted veins, taproot system, and flower parts arranged in multiples of 5.' },
      { name: 'Wheat Crop', emoji: '🌾', description: 'Monocot grass that provides staple food flour worldwide; has fibrous root clumps.' },
      { name: 'Kidney Bean', emoji: '🫘', description: 'Dicot seed that clearly splits open into two halves (cotyledons) when soaked in water.' }
    ],
    mnemonic: {
      acronym: 'MONO = 1, DI = 2',
      meaning: 'Quick Memory Check',
      items: [
        { letter: 'M', word: 'MONOcot', note: '1 Cotyledon, Parallel venation, 3 Flower petals, Fibrous roots.' },
        { letter: 'D', word: 'DIcot', note: '2 Cotyledons, Netted venation, 4-5 Flower petals, Taproot.' }
      ]
    },
    vennDiagram: {
      leftTitle: 'MONOCOTS',
      leftPoints: [
        'One cotyledon (seed leaf)',
        'Parallel leaf venation',
        'Floral parts in multiples of 3',
        'Fibrous root system',
        'Maize, wheat, rice, lilies'
      ],
      middleTitle: 'COMMON TRAITS',
      middlePoints: [
        'Flowering plants (Angiosperms)',
        'Produce true flowers & fruits',
        'Possess true roots, stems, leaves',
        'Reproduce through seeds',
        'Contain chlorophyll for photosynthesis'
      ],
      rightTitle: 'DICOTS',
      rightPoints: [
        'Two cotyledons (seed leaves)',
        'Netted (reticulate) venation',
        'Floral parts in multiples of 4 or 5',
        'Taproot system with primary root',
        'Mango, bean, gram, sunflower'
      ]
    },
    riddle: {
      prompt: 'Classify the following plants into Monocot (M) or Dicot (D): 1) Hibiscus (red 5-petal flower, netted leaves) 2) Lily (parts in 3s, parallel veins) 3) Sunflower (netted leaves, parts in 5s).',
      answer: 'Hibiscus = Dicot (D), Lily = Monocot (M), Sunflower = Dicot (D)',
      explanation: 'Floral petal counts and venation patterns reliably categorize angiosperms into monocots and dicots.'
    }
  },
  {
    id: 8,
    slug: 'dichotomous-keys',
    title: 'Topic 8: Dichotomous Keys — A Tool for Classification',
    shortExplanation: 'A dichotomous key is a tool used by scientists to identify and classify organisms by presenting a series of paired choices (usually yes/no or this/that) that lead to the correct identification. It\'s like a "choose your own adventure" for biology!',
    keyCharacteristics: {
      points: [
        'Dichotomous literally means "divided into two parts" (from Greek dicha = in two, tome = to cut).',
        'At each stage, the user is presented with exactly TWO mutually exclusive statements.',
        'Selecting the true statement directs the user to the next specific number or reveals the identity of the organism.',
        'Used by taxonomists, botanists, wildlife biologists, and students to identify unknown specimens.'
      ]
    },
    realWorldExamples: [
      { name: 'Step 1 Question', emoji: '❓', description: '"Does the animal have a backbone?" -> Yes: Proceed to Step 2. No: Organism is an Invertebrate.' },
      { name: 'Step 2 Question', emoji: '🪶', description: '"Does the animal have feathers?" -> Yes: Animal is a Bird. No: Proceed to Step 3.' },
      { name: 'Step 3 Question', emoji: '🐾', description: '"Does the animal have fur or hair and nurse with milk?" -> Yes: Animal is a Mammal. No: Proceed to Step 4.' }
    ],
    flowchartAscii: `
1. Does the animal have a backbone?
   --> Yes: Go to Step 2
   --> No: INVERTEBRATE (e.g. Spider, Earthworm, Insect)

2. Does the animal have feathers?
   --> Yes: BIRD (e.g. Parrot, Eagle)
   --> No: Go to Step 3

3. Does the animal have fur or hair?
   --> Yes: MAMMAL (e.g. Elephant, Tiger, Bat)
   --> No: Go to Step 4

4. Does the animal have moist skin and lay eggs in water?
   --> Yes: AMPHIBIAN (e.g. Frog, Toad)
   --> No: Go to Step 5

5. Does the animal have dry scaly skin and lay eggs on land?
   --> Yes: REPTILE (e.g. Snake, Lizard, Crocodile)
   --> No: FISH (Gills, fins, scales in water)`,
    riddle: {
      prompt: 'You discover an unknown animal in Thar Desert. It possesses a backbone, has dry scaly skin, and deposits eggs on land. Use the dichotomous key to identify its class.',
      answer: 'Reptile',
      explanation: 'Following the paired statements: Step 1 (Backbone -> Yes, go to 2) -> Step 2 (Feathers -> No, go to 3) -> Step 3 (Fur -> No, go to 4) -> Step 4 (Moist skin -> No, go to 5) -> Step 5 (Dry scaly skin -> REPTILE).'
    }
  }
];

export const STBB_MCQS_DATA: StbbMcq[] = [
  // SECTION A: Classification, Five Kingdoms, and Cell Structure (Q1–Q5)
  {
    id: 'stbb-c5-01',
    number: 1,
    section: 'A',
    sectionTitle: 'Classification, Five Kingdoms, and Cell Structure',
    question: 'What is the process of putting living things into groups according to the ways they are alike called?',
    options: ['Photosynthesis', 'Classification', 'Respiration', 'Evolution'],
    correctIndex: 1,
    explanation: 'Classification is defined as putting living things into groups based on shared characteristics. Photosynthesis is how plants make food, respiration is cellular energy release, and evolution is change over generations.',
    topicRefId: 1
  },
  {
    id: 'stbb-c5-02',
    number: 2,
    section: 'A',
    sectionTitle: 'Classification, Five Kingdoms, and Cell Structure',
    question: 'Which kingdom includes unicellular organisms that have a cell wall but do not have a proper nucleus?',
    options: ['Algae', 'Fungi', 'Bacteria', 'Plants'],
    correctIndex: 2,
    explanation: 'Bacteria are unicellular prokaryotes; they have a cell wall but lack a membrane-bound proper nucleus. Algae and plants have chlorophyll and true nuclei, while fungi are eukaryotic.',
    topicRefId: 2
  },
  {
    id: 'stbb-c5-03',
    number: 3,
    section: 'A',
    sectionTitle: 'Classification, Five Kingdoms, and Cell Structure',
    question: 'Which of the following is NOT a characteristic of fungi?',
    options: [
      'They have a modified cell wall and nucleus',
      'They contain chlorophyll and photosynthesize',
      'They feed on dead plants or animals',
      'They are mostly multicellular'
    ],
    correctIndex: 1,
    explanation: 'Fungi do NOT contain chlorophyll and CANNOT photosynthesize. They are heterotrophic organisms that absorb food from decomposing organic matter.',
    topicRefId: 2
  },
  {
    id: 'stbb-c5-04',
    number: 4,
    section: 'A',
    sectionTitle: 'Classification, Five Kingdoms, and Cell Structure',
    question: 'Which kingdom contains organisms that are multicellular, have a cell wall, contain chlorophyll, and make their own food?',
    options: ['Bacteria', 'Algae', 'Fungi', 'Plants'],
    correctIndex: 3,
    explanation: 'Plants are multicellular, possess cellulose cell walls, contain green chlorophyll, and produce their own food through photosynthesis.',
    topicRefId: 2
  },
  {
    id: 'stbb-c5-05',
    number: 5,
    section: 'A',
    sectionTitle: 'Classification, Five Kingdoms, and Cell Structure',
    question: 'What is the basic structural and functional unit of living things called?',
    options: ['Atom', 'Cell', 'Organ', 'Tissue'],
    correctIndex: 1,
    explanation: 'The cell is the basic building block of all living things. Tissues are formed from cells, and organs are formed from tissues.',
    topicRefId: 2
  },

  // SECTION B: Vertebrates and Invertebrates (Q6–Q9)
  {
    id: 'stbb-c5-06',
    number: 6,
    section: 'B',
    sectionTitle: 'Vertebrates and Invertebrates',
    question: 'Which of the following animals is an invertebrate?',
    options: ['Frog', 'Snake', 'Spider', 'Fish'],
    correctIndex: 2,
    explanation: 'Spiders do not possess a backbone (vertebral column); they are arachnid invertebrates. Frogs (amphibian), snakes (reptile), and fish are all vertebrates.',
    topicRefId: 3
  },
  {
    id: 'stbb-c5-07',
    number: 7,
    section: 'B',
    sectionTitle: 'Vertebrates and Invertebrates',
    question: 'How many kinds of insects are there approximately discovered by scientists?',
    options: ['9,000', '30,000', '800,000', '380,000'],
    correctIndex: 2,
    explanation: 'There are over 800,000 known kinds of insects. In contrast, there are ~9,000 bird species, ~30,000 fish species, and ~380,000 plant species.',
    topicRefId: 3
  },
  {
    id: 'stbb-c5-08',
    number: 8,
    section: 'B',
    sectionTitle: 'Vertebrates and Invertebrates',
    question: 'Which of the following animals is NOT a vertebrate?',
    options: ['Earthworm', 'Elephant', 'Parrot', 'Shark'],
    correctIndex: 0,
    explanation: 'Earthworms have soft bodies without an internal skeleton or backbone, making them invertebrates. Elephants (mammal), parrots (bird), and sharks (cartilaginous fish) are vertebrates.',
    topicRefId: 3
  },
  {
    id: 'stbb-c5-09',
    number: 9,
    section: 'B',
    sectionTitle: 'Vertebrates and Invertebrates',
    question: 'What is the primary scientific difference between vertebrates and invertebrates?',
    options: [
      'Vertebrates live on land, invertebrates live in water',
      'Vertebrates have a backbone, invertebrates do not',
      'Vertebrates are warm-blooded, invertebrates are cold-blooded',
      'Vertebrates lay eggs, invertebrates give birth'
    ],
    correctIndex: 1,
    explanation: 'The presence or absence of an internal backbone (vertebral column) is the scientific criterion dividing vertebrates from invertebrates.',
    topicRefId: 3
  },

  // SECTION C: Classification of Vertebrates (Q10–Q15)
  {
    id: 'stbb-c5-10',
    number: 10,
    section: 'C',
    sectionTitle: 'Classification of Vertebrates',
    question: 'Which of the following is an example of an amphibian?',
    options: ['Lizard', 'Salamander', 'Turtle', 'Bat'],
    correctIndex: 1,
    explanation: 'Salamanders have moist skin and lay eggs in water, classifying them as amphibians. Lizards and turtles are reptiles, while bats are mammals.',
    topicRefId: 4
  },
  {
    id: 'stbb-c5-11',
    number: 11,
    section: 'C',
    sectionTitle: 'Classification of Vertebrates',
    question: 'Which one of the following is NOT an example of a mammal?',
    options: ['Cat', 'Bear', 'Newt', 'Dolphin'],
    correctIndex: 2,
    explanation: 'Newts are amphibians with moist skin. Cats, bears, and marine dolphins are all mammals that nurse their young with milk.',
    topicRefId: 4
  },
  {
    id: 'stbb-c5-12',
    number: 12,
    section: 'C',
    sectionTitle: 'Classification of Vertebrates',
    question: 'The body of all birds is uniquely covered with:',
    options: ['Scales', 'Hair', 'Feathers', 'Fur'],
    correctIndex: 2,
    explanation: 'Feathers are unique to birds. Scales are found on fish and reptiles; hair and fur are found on mammals.',
    topicRefId: 4
  },
  {
    id: 'stbb-c5-13',
    number: 13,
    section: 'C',
    sectionTitle: 'Classification of Vertebrates',
    question: 'Which one of the following pairs INCORRECTLY matches the vertebrate group with its example?',
    options: [
      'Reptile — Snake',
      'Mammal — Shark',
      'Bird — Ostrich',
      'Amphibian — Toad'
    ],
    correctIndex: 1,
    explanation: 'Sharks are fish, NOT mammals! Snakes are reptiles, ostriches are birds, and toads are amphibians.',
    topicRefId: 4
  },
  {
    id: 'stbb-c5-14',
    number: 14,
    section: 'C',
    sectionTitle: 'Classification of Vertebrates',
    question: 'Which of the following is a cold-blooded vertebrate?',
    options: ['Eagle', 'Tiger', 'Crocodile', 'Dolphin'],
    correctIndex: 2,
    explanation: 'Crocodiles are reptiles and are cold-blooded (their body temperature fluctuates with surroundings). Eagles (birds), tigers (mammals), and dolphins (mammals) are warm-blooded.',
    topicRefId: 4
  },
  {
    id: 'stbb-c5-15',
    number: 15,
    section: 'C',
    sectionTitle: 'Classification of Vertebrates',
    question: 'How do fish breathe dissolved oxygen in water?',
    options: ['Through lungs', 'Through moist skin', 'Through gills', 'Through scales'],
    correctIndex: 2,
    explanation: 'Fish use feathery gills to extract dissolved oxygen as water passes over them. Lungs are used by terrestrial vertebrates.',
    topicRefId: 4
  },

  // SECTION D: Worms and Insects (Q16–Q20)
  {
    id: 'stbb-c5-16',
    number: 16,
    section: 'D',
    sectionTitle: 'Worms and Insects',
    question: 'Which of the following is NOT a characteristic of insects?',
    options: [
      'Three pairs of jointed legs (6 legs)',
      'Body divided into three main segments',
      'Possess an internal backbone',
      'Often have one or two pairs of wings'
    ],
    correctIndex: 2,
    explanation: 'Insects do NOT have a backbone; they are invertebrates with exoskeletons. They have exactly 6 legs and 3 body parts (head, thorax, abdomen).',
    topicRefId: 5
  },
  {
    id: 'stbb-c5-17',
    number: 17,
    section: 'D',
    sectionTitle: 'Worms and Insects',
    question: 'What is recognized as the world’s heaviest insect, weighing over 100 grams?',
    options: ['Dragonfly', 'Goliath Beetle', 'Cockroach', 'Ladybug'],
    correctIndex: 1,
    explanation: 'The Goliath Beetle of Africa is the heaviest insect in the world, tipping the scale at over 100 grams.',
    topicRefId: 5
  },
  {
    id: 'stbb-c5-18',
    number: 18,
    section: 'D',
    sectionTitle: 'Worms and Insects',
    question: 'How many pairs of jointed legs do all adult insects have?',
    options: ['One pair (2 legs)', 'Two pairs (4 legs)', 'Three pairs (6 legs)', 'Four pairs (8 legs)'],
    correctIndex: 2,
    explanation: 'All insects have three pairs of jointed legs (total 6 legs). Arachnids like spiders have 4 pairs (8 legs).',
    topicRefId: 5
  },
  {
    id: 'stbb-c5-19',
    number: 19,
    section: 'D',
    sectionTitle: 'Worms and Insects',
    question: 'Which of the following is an example of an invertebrate worm?',
    options: ['Butterfly', 'Leech', 'Spider', 'Crab'],
    correctIndex: 1,
    explanation: 'Leeches are segmented worms (annelids) with suckers. Butterflies are insects, spiders are arachnids, and crabs are crustaceans.',
    topicRefId: 5
  },
  {
    id: 'stbb-c5-20',
    number: 20,
    section: 'D',
    sectionTitle: 'Worms and Insects',
    question: 'How do earthworms benefit agricultural soil and plant roots?',
    options: [
      'By eating harmful garden insects',
      'By burrowing through soil and providing air/aeration',
      'By producing flowers and nectar',
      'By making their own food with chlorophyll'
    ],
    correctIndex: 1,
    explanation: 'As earthworms burrow through soil, they create tunnels that aerate the soil and allow air and water to reach plant roots easily.',
    topicRefId: 5
  },

  // SECTION E: Flowering and Non-Flowering Plants (Q21–Q24)
  {
    id: 'stbb-c5-21',
    number: 21,
    section: 'E',
    sectionTitle: 'Flowering and Non-Flowering Plants',
    question: 'Which of the following is an example of a non-flowering plant?',
    options: ['Sunflower', 'Hibiscus', 'Fern', 'Mango'],
    correctIndex: 2,
    explanation: 'Ferns are non-flowering vascular plants that reproduce via spores. Sunflowers, hibiscus, and mango trees produce true flowers and seeds.',
    topicRefId: 6
  },
  {
    id: 'stbb-c5-22',
    number: 22,
    section: 'E',
    sectionTitle: 'Flowering and Non-Flowering Plants',
    question: 'How do seedless non-flowering plants like ferns and mosses reproduce?',
    options: ['By seeds inside fruits', 'By spores', 'By flowers and petals', 'By underground tubers only'],
    correctIndex: 1,
    explanation: 'Seedless non-flowering plants (ferns, mosses) reproduce by producing tiny microscopic single-celled spores.',
    topicRefId: 6
  },
  {
    id: 'stbb-c5-23',
    number: 23,
    section: 'E',
    sectionTitle: 'Flowering and Non-Flowering Plants',
    question: 'What is the biological process green plants use to manufacture their food?',
    options: ['Respiration', 'Photosynthesis', 'Digestion', 'Transpiration'],
    correctIndex: 1,
    explanation: 'Photosynthesis uses carbon dioxide, water, and sunlight in the presence of green chlorophyll to make glucose food and release oxygen.',
    topicRefId: 6
  },
  {
    id: 'stbb-c5-24',
    number: 24,
    section: 'E',
    sectionTitle: 'Flowering and Non-Flowering Plants',
    question: 'Which of the following is a definitive characteristic of flowering plants (angiosperms)?',
    options: [
      'They reproduce solely by spores',
      'They lack true roots and stems',
      'They produce seeds enclosed in fruits',
      'They are all microscopic unicellular organisms'
    ],
    correctIndex: 2,
    explanation: 'Flowering plants bear blossoms that develop into fruits with enclosed seeds.',
    topicRefId: 6
  },

  // SECTION F: Monocots and Dicots (Q25–Q30)
  {
    id: 'stbb-c5-25',
    number: 25,
    section: 'F',
    sectionTitle: 'Monocots and Dicots',
    question: 'How many cotyledons (seed leaves) does a monocot seed contain?',
    options: ['One', 'Two', 'Three', 'Four'],
    correctIndex: 0,
    explanation: 'Monocot is short for monocotyledonous, meaning the seed has exactly ONE cotyledon (e.g. maize, rice, wheat).',
    topicRefId: 7
  },
  {
    id: 'stbb-c5-26',
    number: 26,
    section: 'F',
    sectionTitle: 'Monocots and Dicots',
    question: 'Which type of leaf venation pattern is characteristic of dicotyledonous plants?',
    options: ['Parallel venation', 'Netted (reticulate) venation', 'Spiral venation', 'Circular venation'],
    correctIndex: 1,
    explanation: 'Dicot leaves have a network or web of branched veins (netted/reticulate venation). Monocots have parallel veins.',
    topicRefId: 7
  },
  {
    id: 'stbb-c5-27',
    number: 27,
    section: 'F',
    sectionTitle: 'Monocots and Dicots',
    question: 'Which of the following is NOT a characteristic of monocot plants?',
    options: [
      'Leaves have parallel venation',
      'Seeds consist of one cotyledon',
      'Flowers have petals in groups of 3 or multiples of 3',
      'Flowers have petals in groups of 4 or 5 or multiples of 4 or 5'
    ],
    correctIndex: 3,
    explanation: 'Flower parts in groups of 4 or 5 are characteristic of DICOTS. Monocots feature floral parts in multiples of 3 (3, 6, 9).',
    topicRefId: 7
  },
  {
    id: 'stbb-c5-28',
    number: 28,
    section: 'F',
    sectionTitle: 'Monocots and Dicots',
    question: 'Which of the following crop plants is a monocot?',
    options: ['Mango', 'Gram (chickpea)', 'Maize (corn)', 'Kidney Bean'],
    correctIndex: 2,
    explanation: 'Maize (corn) is a monocot. Mango, gram, and beans are all dicots whose seeds split into two cotyledons.',
    topicRefId: 7
  },
  {
    id: 'stbb-c5-29',
    number: 29,
    section: 'F',
    sectionTitle: 'Monocots and Dicots',
    question: 'How many cotyledons does a dicotyledonous seed possess?',
    options: ['One', 'Two', 'Three', 'Four'],
    correctIndex: 1,
    explanation: 'Dicotyledonous seeds contain TWO cotyledons (seed leaves) that nourish the germinating embryo.',
    topicRefId: 7
  },
  {
    id: 'stbb-c5-30',
    number: 30,
    section: 'F',
    sectionTitle: 'Monocots and Dicots',
    question: 'Which of the following plants is classified as a dicot?',
    options: ['Rice', 'Wheat', 'Sunflower', 'Bamboo grass'],
    correctIndex: 2,
    explanation: 'Sunflower is a dicot with netted venation, taproot system, and flower parts in 5s. Rice, wheat, and grass are monocots.',
    topicRefId: 7
  },

  // SECTION G: Dichotomous Keys and General Classification (Q31–Q40)
  {
    id: 'stbb-c5-31',
    number: 31,
    section: 'G',
    sectionTitle: 'Dichotomous Keys and General Classification',
    question: 'What is a scientific dichotomous key used for?',
    options: [
      'Measuring plant growth rate in centimeters',
      'Identifying and classifying organisms through paired choices',
      'Testing acidity and chemical purity of water',
      'Observing internal cell organelles under a microscope'
    ],
    correctIndex: 1,
    explanation: 'A dichotomous key is a diagnostic tool that presents two contrasting choices at each step to identify unknown organisms.',
    topicRefId: 8
  },
  {
    id: 'stbb-c5-32',
    number: 32,
    section: 'G',
    sectionTitle: 'Dichotomous Keys and General Classification',
    question: 'In a dichotomous key, organisms are divided at each step into:',
    options: ['Three smaller groups', 'Two smaller groups', 'Four smaller groups', 'Five smaller groups'],
    correctIndex: 1,
    explanation: '"Dichotomous" originates from Greek words meaning "divided into two". Each decision node branches into two choices.',
    topicRefId: 8
  },
  {
    id: 'stbb-c5-33',
    number: 33,
    section: 'G',
    sectionTitle: 'Dichotomous Keys and General Classification',
    question: 'True or False: A spider is scientifically classified as an insect.',
    options: ['True', 'False'],
    correctIndex: 1,
    explanation: 'False! Spiders are arachnids with 8 legs and two body sections. Insects must have 6 legs and three body sections.',
    topicRefId: 3
  },
  {
    id: 'stbb-c5-34',
    number: 34,
    section: 'G',
    sectionTitle: 'Dichotomous Keys and General Classification',
    question: 'True or False: Mushrooms belong to the Plant Kingdom.',
    options: ['True', 'False'],
    correctIndex: 1,
    explanation: 'False! Mushrooms belong to Kingdom Fungi. They have modified cell walls, lack chlorophyll, and cannot photosynthesize.',
    topicRefId: 2
  },
  {
    id: 'stbb-c5-35',
    number: 35,
    section: 'G',
    sectionTitle: 'Dichotomous Keys and General Classification',
    question: 'True or False: A leech is an example of an invertebrate.',
    options: ['True', 'False'],
    correctIndex: 0,
    explanation: 'True! Leeches are segmented parasitic worms without any internal spine or backbone.',
    topicRefId: 5
  },
  {
    id: 'stbb-c5-36',
    number: 36,
    section: 'G',
    sectionTitle: 'Dichotomous Keys and General Classification',
    question: 'True or False: Dicot plant leaves have parallel venation.',
    options: ['True', 'False'],
    correctIndex: 1,
    explanation: 'False! Dicot leaves have netted (reticulate) venation. Parallel venation is the trademark of monocots.',
    topicRefId: 7
  },
  {
    id: 'stbb-c5-37',
    number: 37,
    section: 'G',
    sectionTitle: 'Dichotomous Keys and General Classification',
    question: 'True or False: All adult insect species possess two pairs of wings.',
    options: ['True', 'False'],
    correctIndex: 1,
    explanation: 'False! While many insects have two pairs (butterflies, bees), flies/mosquitoes have one pair, and silverfish/worker ants have no wings.',
    topicRefId: 5
  },
  {
    id: 'stbb-c5-38',
    number: 38,
    section: 'G',
    sectionTitle: 'Dichotomous Keys and General Classification',
    question: 'Which of the following is NOT one of the five kingdoms in Whittaker’s classification system?',
    options: ['Bacteria', 'Algae', 'Fungi', 'Virus'],
    correctIndex: 3,
    explanation: 'Viruses are acellular particles (not cellular organisms) and are not included in the standard five kingdoms (Bacteria, Algae, Fungi, Plants, Animals).',
    topicRefId: 2
  },
  {
    id: 'stbb-c5-39',
    number: 39,
    section: 'G',
    sectionTitle: 'Dichotomous Keys and General Classification',
    question: 'Which kingdom includes organisms that are multicellular, have a true nucleus, lack cell walls, and ingest other organisms for energy?',
    options: ['Plants', 'Fungi', 'Animals', 'Algae'],
    correctIndex: 2,
    explanation: 'Kingdom Animals is composed of multicellular organisms whose cells lack cell walls and who feed heterotrophically by ingestion.',
    topicRefId: 2
  },
  {
    id: 'stbb-c5-40',
    number: 40,
    section: 'G',
    sectionTitle: 'Dichotomous Keys and General Classification',
    question: 'What is the branch of biological science dedicated to the study of plants called?',
    options: ['Zoology', 'Botany', 'Ecology', 'Genetics'],
    correctIndex: 1,
    explanation: 'Botany is the scientific study of plants. Zoology is the study of animals, ecology studies organisms in their habitats, and genetics studies heredity.',
    topicRefId: 1
  }
];

export const STBB_SUMMARY_CONCEPTS = [
  { topic: 'Classification', takeaway: 'Grouping living things based on shared characteristics' },
  { topic: 'Five Kingdoms', takeaway: 'Bacteria, Algae, Fungi, Plants, Animals' },
  { topic: 'Vertebrates', takeaway: 'Animals with backbones (Fish, Amphibians, Reptiles, Birds, Mammals)' },
  { topic: 'Invertebrates', takeaway: 'Animals without backbones (Worms, Insects, Spiders, etc.)' },
  { topic: 'Worms', takeaway: 'No legs, soft-bodied, cylindrical (earthworm, leech, tapeworm)' },
  { topic: 'Insects', takeaway: 'Exactly 6 legs (3 pairs), 3 body segments (head, thorax, abdomen), often wings' },
  { topic: 'Flowering Plants', takeaway: 'Produce true flowers, seeds develop enclosed in fruits (monocots and dicots)' },
  { topic: 'Non-Flowering Plants', takeaway: 'No flowers, reproduce by spores (ferns, mosses) or naked cone seeds (conifers)' },
  { topic: 'Monocots', takeaway: 'One cotyledon, parallel venation, floral parts in 3s, fibrous roots (maize, wheat)' },
  { topic: 'Dicots', takeaway: 'Two cotyledons, netted venation, floral parts in 4s or 5s, taproot (mango, sunflower, bean)' },
  { topic: 'Dichotomous Key', takeaway: 'Scientific diagnostic tool with paired two-way choices to identify organisms' }
];
