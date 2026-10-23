import { StbbTopic, StbbMcq } from './stbbClassFiveScienceData';
import {
  StbbChapterConfig,
  StbbComparisonMatrix
} from './stbbChapterTwoMicroorganismsData';

export const STBB_CH4_TOPICS: StbbTopic[] = [
  {
    id: 1,
    slug: 'introduction-to-environmental-pollution',
    title: 'Topic 1: Introduction to Environmental Pollution & Pollutants',
    shortExplanation:
      'Environmental pollution is any undesirable change in the natural characteristics of our air, water, and land that harms human life and other living organisms. Harmful human-made substances added to nature — called pollutants — threaten cities worldwide, including Karachi!',
    keyCharacteristics: {
      heading: 'Core Definitions, Types & STBB Karachi Fact Box',
      points: [
        'Definition of Pollution: An undesirable change in the characteristics of the air, water, and land environment that is harmful to humans and other living things.',
        'Definition of Pollutants: Harmful substances added to the environment (produced primarily through human activities) that bring about undesirable changes — e.g., smoke, factory chemicals, untreated sewage, and plastic bags.',
        'Three Major Kinds of Pollution: (1) Air Pollution, (2) Water Pollution, and (3) Land Pollution.',
        'STBB "Do You Know?" Exam Alert: Karachi was ranked at FIFTH (5th) place among the top six polluted cities in the world!',
        'Major Cause in Karachi: Motor vehicle exhaust emissions releasing suspended particulate matter (SPM), causing widespread respiratory and health ailments.'
      ],
      table: {
        headers: ['Type of Pollution', 'Environment Affected', 'Representative Pollutants', 'Primary Human Source'],
        rows: [
          ['Air Pollution', 'Atmosphere / breathing air', 'Smoke, poisonous gases, suspended particulate matter', 'Burning fuel/trash in vehicles, factories & homes'],
          ['Water Pollution', 'Rivers, canals, lakes, oceans & groundwater', 'Untreated sewage, toxic chemicals, pesticides & fertilizers', 'Domestic drains, industrial effluents & farm run-off'],
          ['Land Pollution', 'Soil, streets, coastal beaches & open ground', 'Plastic bags, bottles, cans, glass, garbage & faeces', 'Open solid waste dumping & non-biodegradable litter']
        ]
      }
    },
    deepDiveHeading: 'Pollutants vs. Pollution & Karachi’s Urban Air Alert',
    deepDiveSections: [
      {
        title: 'Pollution (Process) vs. Pollutants (Agents)',
        emoji: '🏭',
        points: [
          'Pollutants are the actual harmful materials (like black exhaust smoke or polythene plastic bags).',
          'Pollution is the harmful environmental damage caused once those pollutants contaminate air, water, or land!'
        ]
      },
      {
        title: 'Do You Know? — Karachi Ranked 5th Among Top 6!',
        emoji: '🚗',
        points: [
          'Highlighted directly in STBB Class 5 Science: Karachi ranked 5th among the world’s top 6 polluted cities.',
          'Heavy traffic emissions fill city air with microscopic suspended particulate matter (dust + soot) inhaled deep into lungs.'
        ]
      }
    ],
    realWorldExamples: [
      {
        name: 'Vehicle Exhaust Smoke in Karachi',
        emoji: '🚌',
        description: 'Buses, rickshaws, trucks, and cars burning diesel/petrol release thick smoke and suspended particulate matter.'
      },
      {
        name: 'Polythene Plastic Bags',
        emoji: '🛍️',
        description: 'Classic non-biodegradable solid pollutant blown across streets, beaches, and storm gutters.'
      },
      {
        name: 'Factory Smokestacks & Drains',
        emoji: '🏭',
        description: 'Simultaneously release gaseous smoke into air and untreated chemical wastewater into canals.'
      }
    ],
    mnemonic: {
      acronym: 'A-W-L',
      meaning: 'Three Environments Damaged by Pollutants — Air · Water · Land',
      items: [
        { letter: 'A', word: 'Air Pollution', note: 'Smoke & particulate matter from vehicles/industries.' },
        { letter: 'W', word: 'Water Pollution', note: 'Sewage, factory chemicals & farm pesticides.' },
        { letter: 'L', word: 'Land Pollution', note: 'Dumped plastics, cans, glass & household waste.' }
      ]
    },
    flowchartAscii: `                 HUMAN ACTIVITIES (Vehicles · Factories · Open Waste)
                                          │
                           adds HARMFUL POLLUTANTS (Smoke, Plastics, Sewage)
                                          ▼
                   UNDESIRABLE CHANGE = ENVIRONMENTAL POLLUTION
                    ┌─────────────────────┼─────────────────────┐
                    ▼                     ▼                     ▼
             💨 AIR POLLUTION      💧 WATER POLLUTION     🗑️ LAND POLLUTION`,
    vennDiagram: {
      leftTitle: 'POLLUTANTS (SUBSTANCES)',
      leftPoints: [
        'Physical or chemical materials added to nature',
        'Examples: Smoke, pesticides, sewage, plastic bags',
        'Mostly generated by human activities'
      ],
      middleTitle: 'CAUSE & EFFECT LINK',
      middlePoints: [
        'Threaten health of humans, animals & plants',
        'Disrupt natural air, water & soil balance',
        'Reduced through conservation & eco-habits'
      ],
      rightTitle: 'POLLUTION (CONDITION)',
      rightPoints: [
        'Undesirable harmful change in environment',
        'Manifests as smoggy air, poisoned water, littered land',
        'Triggers asthma, cholera, typhoid & marine loss'
      ]
    },
    riddle: {
      prompt: 'I am any harmful human-made substance — such as black exhaust smoke or a plastic bag — that ruins clean air, water, or land. What general term describes me?',
      answer: 'A Pollutant',
      explanation: 'Harmful substances added to the environment through human activities that cause undesirable changes are called pollutants.'
    },
    unscrambles: [
      { scrambled: 'NOITULLOP', solution: 'POLLUTION', hint: 'Undesirable harmful change in air, water, or land environment.' },
      { scrambled: 'STNATULLOP', solution: 'POLLUTANTS', hint: 'Harmful substances such as smoke and plastics added to nature.' }
    ],
    secretCodeActivity: {
      cipher: 'A=1, B=2, C=3 ... Z=26',
      items: [
        {
          encoded: '19 - 13 - 15 - 11 - 5',
          answer: 'SMOKE',
          sentence: 'Burning fuels and trash releases solid, liquid, and gaseous air pollutants commonly known as SMOKE.'
        }
      ]
    }
  },
  {
    id: 2,
    slug: 'air-pollution-causes-smoke-and-effects',
    title: 'Topic 2: Air Pollution — Burning Fuels, Smoke & Health Effects',
    shortExplanation:
      'Air pollution occurs when solid particles, liquid droplets, and harmful gases — collectively called smoke — pour into the atmosphere from burning fuels and trash in factories, vehicles, and homes, causing serious respiratory and neurological ailments.',
    keyCharacteristics: {
      heading: 'Causes, Smoke Composition & Human Health Impacts of Air Pollution',
      points: [
        'What Releases Air Pollutants? Burning carbon fuels (coal, petrol/diesel oil, natural gas) AND burning waste paper, plastic, or household trash.',
        'Three Main Sources: (1) Industrial factories & power plants, (2) Motor vehicles on roads, and (3) Domestic cooking/heating & open trash burning.',
        'What Is Smoke? A visible mixture of solid soot particles, tiny liquid droplets, and poisonous gases suspended in air.',
        'Immediate & Short-Term Symptoms: Headache, burning eye and nose irritation, sore throat, nausea, general ill feeling, drowsiness, and weakened judgment!',
        'Severe Long-Term Diseases: Chronic asthma, bronchitis, lung infections such as pneumonia, and deadly lung cancer.'
      ],
      table: {
        headers: ['Health System Affected', 'Textbook Symptoms & Diseases Caused by Air Pollution'],
        rows: [
          ['Eyes, Nose & Throat', 'Watery burning eye irritation, sneezing/nose irritation, painful sore throat'],
          ['Brain & General Well-Being', 'Persistent headache, nausea, general ill feeling, drowsiness & weakened judgment'],
          ['Lungs & Respiratory Tract', 'Chronic asthma attacks, pneumonia, severe breathing difficulty & lung cancer']
        ]
      }
    },
    deepDiveHeading: 'How Smoke Harms Both Lungs and Alertness',
    deepDiveSections: [
      {
        title: 'Solid + Liquid + Gas = Smoke!',
        emoji: '💨',
        points: [
          'STBB Exam Detail: Air pollutants are NOT only gases — they include solid particles, liquid droplets, AND gases released during combustion!',
          'Never burn fallen leaves, waste paper, or trash in streets — open burning floods neighbourhood air with toxic smoke.'
        ]
      },
      {
        title: 'Drowsiness & Weakened Judgment!',
        emoji: '🧠',
        points: [
          'Notice this subtle STBB textbook symptom examiners love testing: polluted air reduces oxygen delivery, causing drowsiness and weakened judgment alongside asthma, pneumonia, and lung cancer!'
        ]
      }
    ],
    realWorldExamples: [
      {
        name: 'Traffic Rush-Hour Smog',
        emoji: '🚕',
        description: 'Unmaintained engines emit dark plumes that sting commuters’ eyes, throats, and lungs.'
      },
      {
        name: 'Open Trash Burning Smoke',
        emoji: '🔥',
        description: 'Burning street garbage releases acrid smoke triggering immediate coughing, nausea, and asthma attacks nearby.'
      },
      {
        name: 'Coal & Brick Kiln Chimneys',
        emoji: '🏭',
        description: 'Release black soot and sulfur gases unless fitted with clean scrubbers and eco-friendly zigzag technology.'
      }
    ],
    mnemonic: {
      acronym: 'H-A-N-D-L',
      meaning: 'Air Pollution Effects — Headache · Asthma · Nausea · Drowsiness · Lung Disease',
      items: [
        { letter: 'H', word: 'Headache & Eyes', note: 'Headache, sore throat, eye & nose irritation.' },
        { letter: 'A', word: 'Asthma', note: 'Wheezing & narrowed airways in children/adults.' },
        { letter: 'N', word: 'Nausea', note: 'Sick stomach feeling from inhaling toxic fumes.' },
        { letter: 'D', word: 'Drowsiness', note: 'Sleepiness & weakened judgment from poor air.' },
        { letter: 'L', word: 'Lung Diseases', note: 'Severe pneumonia and lung cancer over time.' }
      ]
    },
    flowchartAscii: `  [ Burning Coal, Oil, Gas, Paper & Trash in Industries / Vehicles / Homes ]
                                       │
                                       ▼
          [ SMOKE = Solid Particles + Liquid Droplets + Poisonous Gases ]
                                       │
                                       ▼
  [ Eye/Nose Irritation · Sore Throat · Headache · Drowsiness · Asthma · Pneumonia · Lung Cancer ]`,
    vennDiagram: {
      leftTitle: 'SHORT-TERM AIR SYMPTOMS',
      leftPoints: [
        'Stinging eyes, nose irritation & sore throat',
        'Headache, nausea & general ill feeling',
        'Drowsiness and weakened mental judgment'
      ],
      middleTitle: 'CAUSED BY INHALED SMOKE',
      middlePoints: [
        'Triggered by vehicle & factory fuel emissions',
        'Worsened by open burning of trash',
        'Preventable via clean transport & clean fuels'
      ],
      rightTitle: 'CHRONIC LUNG DISEASES',
      rightPoints: [
        'Develop after prolonged exposure to polluted air',
        'Chronic recurring asthma episodes',
        'Severe lung infections (pneumonia) & lung cancer'
      ]
    },
    riddle: {
      prompt: 'I rise from burning coal, oil, gas, and trash as a mix of solid particles, liquid droplets, and gases, stinging your eyes and hurting your lungs. What am I?',
      answer: 'Smoke',
      explanation: 'Smoke is the common name for solid, liquid, and gaseous air pollutants released by burning fuels and waste.'
    },
    unscrambles: [
      { scrambled: 'AMHTSA', solution: 'ASTHMA', hint: 'Chronic breathing illness worsened by inhaling polluted smoky air.' }
    ]
  },
  {
    id: 3,
    slug: 'water-pollution-sources-and-effects',
    title: 'Topic 3: Water Pollution — Sources, Diseases & Aquatic Impact',
    shortExplanation:
      'Water pollution occurs when untreated domestic sewage, toxic industrial chemical waste, and agricultural run-off carrying fertilizers and pesticides poison rivers, lakes, canals, and seas — spreading deadly water-borne diseases and killing aquatic life.',
    keyCharacteristics: {
      heading: 'Three Major Causes & Severe Effects of Water Pollution',
      points: [
        'Cause 1 — Untreated Domestic Sewage: Wastewater from household washing, kitchens, and toilets discharged without treatment directly into rivers, canals, and sea.',
        'Cause 2 — Industrial Chemical Effluents: Factories dumping untreated water containing poisonous chemicals, dyes, and heavy metals into nearby water bodies.',
        'Cause 3 — Agricultural Run-Off: Rain and irrigation water washing harmful chemical pesticides and excess fertilizers from fields into streams and lakes.',
        'Human Health Effects (Water-Borne Diseases): Cholera, typhoid, acute diarrhoea, and severe digestive tract illnesses.',
        'Aquatic Ecosystem Effects: Mass death of fish, aquatic plants, and turtles — plus immune depression, reproductive failure, and acute poisoning in surviving aquatic animals!'
      ],
      table: {
        headers: ['Water Pollution Source', 'Harmful Pollutants Introduced', 'Impact on Humans & Aquatic Life'],
        rows: [
          ['Domestic Untreated Sewage', 'Toilets/washing waste & disease germs', 'Spreads cholera, typhoid, diarrhoea & digestive infections'],
          ['Industrial Wastewater', 'Toxic heavy metals, acids, dyes & chemicals', 'Acute poisoning, immune depression & reproductive failure in fish'],
          ['Agricultural Field Run-Off', 'Chemical pesticides & excess fertilizers', 'Algal blooms, oxygen depletion & death of aquatic plants/animals']
        ]
      }
    },
    deepDiveHeading: 'Human Digestive Diseases & Aquatic Collapse',
    deepDiveSections: [
      {
        title: 'Three Classic Water-Borne Diseases (C-T-D)',
        emoji: '🏥',
        points: [
          'Cholera, Typhoid, and Diarrhoea attack the human digestive tract when polluted water contaminates drinking supplies.',
          'Always treat water before municipal release and boil suspect drinking water cleanly!'
        ]
      },
      {
        title: 'Four Textbook Impacts on Fish & Aquatic Life',
        emoji: '🐟',
        points: [
          '1) Direct death of aquatic plants and animals.',
          '2) Immune system depression (weakened resistance to disease).',
          '3) Reproductive failure (inability to breed healthy young).',
          '4) Acute chemical poisoning from industrial toxins & pesticides!'
        ]
      }
    ],
    realWorldExamples: [
      {
        name: 'Untreated City Drains into Sea',
        emoji: '🌊',
        description: 'Raw sewage flowing into coastal harbours destroys mangrove nurseries, crabs, and fish populations.'
      },
      {
        name: 'Tannery & Textile Factory Waste',
        emoji: '🧪',
        description: 'Coloured chemical effluents poison freshwater canals used downstream by villages and livestock.'
      },
      {
        name: 'Pesticide Field Run-Off',
        emoji: '🌾',
        description: 'Rainwater washes toxic crop sprays straight into freshwater fish ponds and irrigation channels.'
      }
    ],
    mnemonic: {
      acronym: 'S-I-A → C-T-D',
      meaning: 'Sewage · Industry · Agriculture cause Cholera · Typhoid · Diarrhoea',
      items: [
        { letter: 'S', word: 'Sewage (Domestic)', note: 'Untreated toilet & washing wastewater.' },
        { letter: 'I', word: 'Industrial Waste', note: 'Untreated factory chemical effluents.' },
        { letter: 'A', word: 'Agri Run-Off', note: 'Pesticides & fertilizers washed off farms.' },
        { letter: 'C', word: 'Cholera & Typhoid', note: 'Deadly bacterial water-borne diseases.' },
        { letter: 'D', word: 'Diarrhoea & Fish Loss', note: 'Digestive illness + aquatic poisoning.' }
      ]
    },
    flowchartAscii: `  [ Domestic Sewage ]  +  [ Industrial Chemicals ]  +  [ Farm Pesticides & Fertilizers ]
                                             │
                                             ▼
                                💧 WATER POLLUTION IN RIVERS & SEA
                       ┌───────────────────────────────────────────────┐
                       ▼                                               ▼
         🏥 HUMANS: Cholera, Typhoid,                    🐟 AQUATIC LIFE: Death, Acute Poisoning,
            Diarrhoea & Digestive Illness                   Immune Depression & Reproductive Failure`,
    vennDiagram: {
      leftTitle: 'HUMAN HEALTH IMPACTS',
      leftPoints: [
        'Cholera, typhoid & acute diarrhoea',
        'Severe digestive tract infections',
        'Poisoning from contaminated fish/water'
      ],
      middleTitle: 'SHARED ROOT CAUSE',
      middlePoints: [
        'Caused by dumping untreated waste into water',
        'Harm ALL living organisms depending on water',
        'Prevented by wastewater treatment & clean farming'
      ],
      rightTitle: 'AQUATIC LIFE IMPACTS',
      rightPoints: [
        'Death of aquatic animals and water plants',
        'Immune depression & acute chemical poisoning',
        'Reproductive failure shrinking fish populations'
      ]
    },
    riddle: {
      prompt: 'When rainwater washes farm pesticides and fertilizers into rivers alongside factory chemicals and raw sewage, which three classic digestive diseases threaten humans?',
      answer: 'Cholera, Typhoid, and Diarrhoea',
      explanation: 'STBB Class 5 Science identifies cholera, typhoid, and diarrhoea (digestive tract disorders) as key human health effects of water pollution.'
    },
    unscrambles: [
      { scrambled: 'AREOLHC', solution: 'CHOLERA', hint: 'Severe water-borne digestive disease spread by polluted water.' },
      { scrambled: 'DIOHPYT', solution: 'TYPHOID', hint: 'Bacterial fever spread through sewage-contaminated water.' }
    ]
  },
  {
    id: 4,
    slug: 'land-pollution-solid-waste-and-leachate',
    title: 'Topic 4: Land Pollution — Open Solid Waste & Cross-Contamination',
    shortExplanation:
      'Land pollution occurs when solid wastes — plastic bags, bottles, waste paper, glass, tin cans, kitchen peels, and animal wastes — are dumped carelessly on open ground, releasing toxic substances that poison both underground water and surrounding air!',
    keyCharacteristics: {
      heading: 'Causes, Solid Waste Types & Environmental Domino Effect',
      points: [
        'Main Cause of Land Pollution: Dumping household, commercial, and street solid wastes directly onto open land instead of sanitary disposal/recycling.',
        'Common Dumped Materials Listed in STBB: Plastic shopping bags, plastic bottles, waste papers, glass bottles, tin cans, vegetable/fruit cuttings, animal wastes, and faeces.',
        'Two Scientific Categories of Solid Waste: Every solid waste item belongs to either BIODEGRADABLE waste or NON-BIODEGRADABLE waste.',
        'Cross-Contamination Danger #1 (Underground Water): Toxic liquid substances oozing from decaying garbage piles seep deep into soil and pollute underground drinking water!',
        'Cross-Contamination Danger #2 (Surrounding Air): Rotting heaps release foul gases, bacteria, flies, and toxic fumes that pollute surrounding air!'
      ],
      table: {
        headers: ['Dumped Solid Waste Example', 'Waste Category', 'Environmental Hazard When Dumped Openly'],
        rows: [
          ['Vegetable/fruit cuttings & animal waste', 'Biodegradable', 'Rots foully, breeds disease flies & contaminates surface/groundwater if uncomposted'],
          ['Plastic bags & plastic bottles', 'Non-biodegradable', 'Persist for centuries, choke gutters, poison soil & kill wildlife'],
          ['Glass bottles & rusted tin cans', 'Non-biodegradable', 'Cause physical cuts, trap stagnant mosquito water & clutter land forever']
        ]
      }
    },
    deepDiveHeading: 'How Land Pollution Poison Spreads to Water & Air',
    deepDiveSections: [
      {
        title: 'Underground Water Poisoning (Leaching)',
        emoji: '🕳️',
        points: [
          'When rain falls onto open garbage dumps containing batteries, chemicals, plastics, and rotting waste, toxic liquid seeps downward.',
          'This toxic seepage pollutes underground water wells and hand-pumps families rely on for drinking!'
        ]
      },
      {
        title: 'Air Foulness & Disease Vectors',
        emoji: '🦟',
        points: [
          'Open heaps of kitchen waste, animal dung, and faeces emit foul gases into surrounding neighbourhood air.',
          'Flies and mosquitoes breed rapidly in open garbage and tin cans, spreading infection into nearby homes.'
        ]
      }
    ],
    realWorldExamples: [
      {
        name: 'Roadside Open Garbage Heaps',
        emoji: '🗑️',
        description: 'Mix plastic bags, glass shards, tin cans, and rotting food scraps right beside residential streets.'
      },
      {
        name: 'Littered Coastal Beaches',
        emoji: '🏖️',
        description: 'Plastic wrappers and bottles left on Karachi beaches wash straight out with high tide into the Arabian Sea.'
      },
      {
        name: 'Contaminated Hand-Pump Water',
        emoji: '🚰',
        description: 'Toxic chemicals leaking downward from unlined waste dumps pollute shallow groundwater tables.'
      }
    ],
    mnemonic: {
      acronym: 'G-A-S',
      meaning: 'Land Pollution Domino Damage — Groundwater · Air · Soil Ruined!',
      items: [
        { letter: 'G', word: 'Groundwater Poisoned', note: 'Toxic decay liquids seep down into wells.' },
        { letter: 'A', word: 'Air Fouled', note: 'Foul gases & fumes pollute surrounding air.' },
        { letter: 'S', word: 'Soil Littered', note: 'Plastics, cans, glass & waste ruin land.' }
      ]
    },
    flowchartAscii: `  [ Open Dumping of Plastics, Cans, Glass, Paper, Peels & Animal Waste ]
                                       │
                                       ▼
                             🗑️ LAND POLLUTION ON SOIL
                       ┌───────────────┴───────────────┐
                       ▼                               ▼
     💧 Toxic Seepage Pollutes               💨 Foul Gases & Fumes Pollute
        UNDERGROUND WATER!                      SURROUNDING AIR!`,
    vennDiagram: {
      leftTitle: 'ORGANIC DUMPED WASTE',
      leftPoints: [
        'Vegetable/fruit cuttings, paper & animal waste',
        'Broken down naturally by microbes over days/weeks',
        'Can be safely composted into rich garden fertilizer'
      ],
      middleTitle: 'ALL OPEN SOLID WASTES',
      middlePoints: [
        'Cause land pollution when dumped on open ground',
        'Must be segregated into proper covered bins',
        'Affect surrounding air and groundwater quality'
      ],
      rightTitle: 'SYNTHETIC DUMPED WASTE',
      rightPoints: [
        'Plastic bags, plastic bottles, glass & tin cans',
        'Cannot be decomposed by soil microbes',
        'Should be refused, reused, or recycled!'
      ]
    },
    riddle: {
      prompt: 'When garbage piles decay on open land, which hidden drinking water source deep beneath your feet gets poisoned by seeping toxic substances?',
      answer: 'Underground water (Groundwater)',
      explanation: 'Toxic substances from decaying land pollutants leach downward through soil and contaminate underground water as well as surrounding air.'
    },
    unscrambles: [
      { scrambled: 'EGABRAG', solution: 'GARBAGE', hint: 'Solid household waste that must never be dumped openly or burned.' }
    ]
  },
  {
    id: 5,
    slug: 'biodegradable-vs-non-biodegradable-materials',
    title: 'Topic 5: Biodegradable vs. Non-Biodegradable Materials',
    shortExplanation:
      'Understanding why a banana peel disappears into rich soil in weeks while a plastic bottle survives for centuries is central to environmental science! Solid wastes split cleanly into Biodegradable (broken down by decomposers) and Non-Biodegradable (persistent forever).',
    keyCharacteristics: {
      heading: 'Scientific Distinction Between Biodegradable & Non-Biodegradable Waste',
      points: [
        'Biodegradable Waste Definition: Solid waste that IS easily decomposed (broken down) by decomposers/microorganisms (bacteria and fungi) through natural reduction processes.',
        'Biodegradable Examples: Vegetable and fruit peels/cuttings, leftover food scraps, fallen leaves, waste paper, cardboard, cotton cloth, wood, and animal wastes.',
        'Non-Biodegradable Waste Definition: Solid waste that is NOT easily decomposed by decomposers/microorganisms and remains unchanged on Earth for hundreds of years!',
        'Non-Biodegradable Examples: Plastic shopping bags, plastic bottles, polystyrene (styrofoam/thermopore), tin/metal cans, and glass bottles.',
        'Smart Waste Segregation: Separating green biodegradable kitchen waste (for composting) from dry recyclable cans/paper/bottles drastically slashes landfill pollution!'
      ],
      table: {
        headers: ['Feature', 'Biodegradable Materials 🌿', 'Non-Biodegradable Materials 🛍️'],
        rows: [
          ['Action of Microbes', '✅ Easily decomposed by bacteria & fungi', '❌ Cannot be decomposed by microorganisms'],
          ['Persistence on Earth', 'Breaks down naturally within days to months', 'Remains on Earth for decades to hundreds of years!'],
          ['Soil Fertility Impact', 'Forms nutrient-rich natural humus/compost', 'Pollutes soil & leaches toxic chemicals'],
          ['Textbook Examples', 'Vegetable/fruit peels, food scraps, paper, leaves', 'Plastics, plastic bottles, polystyrene, cans, glass']
        ]
      }
    },
    deepDiveHeading: 'How Chapter 2 Decomposers Connect to Chapter 4!',
    deepDiveSections: [
      {
        title: 'Nature’s Recycling Crew (Bacteria & Fungi)',
        emoji: '♻️',
        points: [
          'Remember Chapter 2? Soil bacteria and fungi have natural enzymes that digest natural plant/animal molecules like cellulose and starch!',
          'That’s why fruit peels, vegetable cuttings, and paper return cleanly back to soil nutrients.'
        ]
      },
      {
        title: 'Why Microbes Cannot Eat Plastic or Polystyrene',
        emoji: '🚫',
        points: [
          'Plastics and polystyrene are synthetic petroleum polymers with artificial chemical bonds.',
          'Decomposer bacteria do NOT recognize them as food — so a single tossed plastic bottle outlives multiple human generations!'
        ]
      }
    ],
    realWorldExamples: [
      {
        name: 'Banana & Potato Peels',
        emoji: '🍌',
        description: '100% biodegradable kitchen waste that turns into dark fertile garden compost within weeks.'
      },
      {
        name: 'PET Plastic Water Bottle',
        emoji: '🍼',
        description: 'Non-biodegradable synthetic polymer that lingers on land or ocean floors for ~450 years!'
      },
      {
        name: 'Polystyrene Tea Cup / Box',
        emoji: '🥤',
        description: 'Foam packaging (thermopore) that never biodegrades and crumbles into deadly white pellets eaten by fish and birds.'
      }
    ],
    mnemonic: {
      acronym: 'B-I-O = BREAKS DOWN!',
      meaning: 'Biodegradable = Broken down by Bugs (Microbes); Non-Bio = Never Rots!',
      items: [
        { letter: 'B', word: 'Bacteria Digest', note: 'Microorganisms break it down naturally.' },
        { letter: 'I', word: 'Into Humus', note: 'Returns harmlessly to fertile soil.' },
        { letter: 'O', word: 'Organic Peels', note: 'Fruit/veg peels, food scraps, paper & leaves!' }
      ]
    },
    flowchartAscii: `                           SOLID WASTE MATERIALS
                                     │
            ┌────────────────────────┴────────────────────────┐
            ▼                                                 ▼
  🌿 BIODEGRADABLE WASTE                           🛍️ NON-BIODEGRADABLE WASTE
  Decomposed easily by microbes                    NOT decomposed by microbes!
  Returns nutrients back to soil                   Persists on Earth for centuries
  (Peels, food scraps, paper, leaves)              (Plastics, polystyrene, bottles, cans)`,
    vennDiagram: {
      leftTitle: 'BIODEGRADABLE WASTE',
      leftPoints: [
        'Originates from natural living plant/animal matter',
        'Decomposed rapidly by soil bacteria & fungi',
        'Examples: Vegetable/fruit peels, food scraps, paper'
      ],
      middleTitle: 'SOLID HOUSEHOLD WASTES',
      middlePoints: [
        'Generated daily in homes, schools & markets',
        'Cause ugly litter if thrown on open streets',
        'Should be sorted into separate bins at source'
      ],
      rightTitle: 'NON-BIODEGRADABLE WASTE',
      rightPoints: [
        'Synthetic plastics, polystyrene, metals & glass',
        'Resists microbial decomposition for centuries',
        'Chokes drains, pollutes groundwater & harms wildlife'
      ]
    },
    riddle: {
      prompt: 'Microorganisms happily feast on vegetable peels and turn them into soil, yet they cannot digest me even after a hundred years! What category of waste am I?',
      answer: 'Non-biodegradable waste (e.g., Plastic or Polystyrene)',
      explanation: 'Non-biodegradable waste resists microbial decomposition and persists in the environment for generations.'
    },
    unscrambles: [
      { scrambled: 'CITSAPL', solution: 'PLASTIC', hint: 'Classic non-biodegradable material that chokes drains and harms marine life.' },
      { scrambled: 'TSOPMOC', solution: 'COMPOST', hint: 'Natural soil fertilizer made by decomposing biodegradable peels and leaves.' }
    ]
  },
  {
    id: 6,
    slug: 'impacts-of-non-biodegradable-plastics-unep',
    title: 'Topic 6: Major Impacts of Non-Biodegradable Plastics & UNEP Statistics',
    shortExplanation:
      'Non-biodegradable plastics and polystyrene create a planetary crisis: poisoning groundwater, releasing toxic gases when burned, choking city sewage drains into floods, and killing over a million seabirds and 100,000 marine mammals and turtles every single year!',
    keyCharacteristics: {
      heading: 'Six Devastating Impacts of Non-Biodegradable Waste (STBB Textbook)',
      points: [
        '1. Pollutes Groundwater: Buried plastics and chemical containers leak toxic pollutants downward into underground drinking water.',
        '2. Toxic Gases on Heating/Burning: Heating or burning plastics and polystyrene emits poisonous toxic gases directly into breathing air!',
        '3. Ocean Entanglement, Choking & Starvation: Plastics and polystyrene washed into oceans entangle flippers/wings, choke airways, and block stomachs causing starvation.',
        '4. Mistaken Ingestion as Tiny Fragments: Sunlight and waves break plastics into small colourful pieces mistakenly swallowed as food by fish and birds!',
        '5. Choked Drainage & Urban Flooding: Polythene bags clog street gutters and drainage pipes, causing filthy gutter overflow and urban flooding during rains!',
        '6. UN Environment Programme (UNEP) Official Fact: Plastic kills 1,000,000 (one million) seabirds AND 100,000 marine mammals/turtles EVERY YEAR!'
      ],
      table: {
        headers: ['Impact Zone', 'How Non-Biodegradable Plastic Causes Harm', 'Consequence'],
        rows: [
          ['Underground Water', 'Emits toxic chemical pollutants into soil', 'Contaminates well & aquifer drinking water'],
          ['Atmosphere (When Burned)', 'Releases deadly toxic gases when heated or burned', 'Severe respiratory illness, cancer risk & air pollution'],
          ['City Drains & Gutters', 'Plastic shopping bags block sewage & storm pipes', 'Sewage gutter overflow, mosquitoes & urban flooding'],
          ['Oceans & Marine Wildlife', 'Entangles animals & swallowed as small pieces', 'Kills 1,000,000 seabirds + 100,000 marine mammals/turtles yearly!']
        ]
      }
    },
    deepDiveHeading: 'Numbers & Hazards Every STS Candidate Must Memorize',
    deepDiveSections: [
      {
        title: 'UNEP Global Marine Death Toll Statistic',
        emoji: '🐢',
        points: [
          'Exact STBB Class 5 Numbers: 1,000,000 (1 million) seabirds killed every year!',
          'Plus 100,000 marine mammals and sea turtles killed every year by entanglement, choking, and plastic starvation! (Sea turtles mistake floating plastic bags for jellyfish!)'
        ]
      },
      {
        title: 'Why You Must NEVER Heat or Burn Plastic/Polystyrene!',
        emoji: '☠️',
        points: [
          'Some people try getting rid of plastic bags and thermopore cups by setting them on fire.',
          'Burning plastic does NOT make it vanish — it converts solid waste into poisonous airborne gases inhaled by children and families!'
        ]
      }
    ],
    realWorldExamples: [
      {
        name: 'Sea Turtles & Plastic Bags',
        emoji: '🐢',
        description: 'Sea turtles mistake floating translucent polythene bags for jellyfish, swallowing them and suffering fatal stomach blockage.'
      },
      {
        name: 'Monsoon Choked Gutters',
        emoji: '🌧️',
        description: 'Discarded polythene bags seal storm-water grates in Karachi & Hyderabad, backing sewage onto streets.'
      },
      {
        name: 'Microplastics Inside Fish',
        emoji: '🐟',
        description: 'Brittle sun-cracked plastic fragments look like fish eggs/plankton and enter the human seafood chain!'
      }
    ],
    mnemonic: {
      acronym: 'G-T-O-F-C',
      meaning: 'Five Plastic Hazards — Groundwater · Toxic Fumes · Oceans · Fragments · Choked Drains',
      items: [
        { letter: 'G', word: 'Groundwater', note: 'Emits toxic pollutants into underground water.' },
        { letter: 'T', word: 'Toxic Gases', note: 'Released whenever plastic/polystyrene is heated or burned.' },
        { letter: 'O', word: 'Ocean Wildlife', note: '1M seabirds + 100K marine mammals/turtles die yearly!' },
        { letter: 'F', word: 'Fragments Eaten', note: 'Tiny broken bits swallowed mistakenly by fish & birds.' },
        { letter: 'C', word: 'Choked Gutters', note: 'Blocks drains causing sewage overflow & flooding!' }
      ]
    },
    flowchartAscii: `        🛍️ NON-BIODEGRADABLE PLASTIC & POLYSTYRENE IN THE ENVIRONMENT
                                      │
   ┌──────────────────┬───────────────┼───────────────┬──────────────────┐
   ▼                  ▼               ▼               ▼                  ▼
💧 Groundwater    🔥 Burned       🌊 Oceans       🐟 Broken Bits     🚧 City Drains
Toxic seepage     Poison gases    Chokes &        Swallowed by       Gutter overflow
pollutes wells    pollute air     starves turtles fish & seabirds    & monsoon floods`,
    vennDiagram: {
      leftTitle: 'BURNING PLASTIC',
      leftPoints: [
        'Releases poisonous toxic gases into air',
        'Harms lungs of everyone in neighbourhood',
        'NEVER recommended as waste disposal!'
      ],
      middleTitle: 'WRONG PLASTIC DISPOSAL',
      middlePoints: [
        'Caused by single-use plastic habits',
        'Harms humans, cities & wildlife alike',
        'Prevented by refusing & recycling plastics'
      ],
      rightTitle: 'DUMPING IN DRAINS / SEA',
      rightPoints: [
        'Chokes street gutters causing floods',
        'Entangles & starves turtles, mammals & birds',
        'Kills 1M seabirds & 100,000 marine mammals yearly'
      ]
    },
    riddle: {
      prompt: 'According to the UN Environment Programme statistic in Class 5 Science, how many seabirds and how many marine mammals/turtles are killed by plastic waste every year?',
      answer: '1,000,000 (one million) seabirds and 100,000 marine mammals/turtles yearly',
      explanation: 'Floating plastics entangle, choke, and starve marine animals — killing a million seabirds and 100,000 marine mammals/turtles annually.'
    },
    unscrambles: [
      { scrambled: 'EGANIARD', solution: 'DRAINAGE', hint: 'City pipe system choked by plastic bags causing gutter overflow and flooding.' }
    ]
  },
  {
    id: 7,
    slug: 'measures-to-reduce-pollution',
    title: 'Topic 7: Measures to Reduce Environmental Pollution',
    shortExplanation:
      'Every citizen, student, and household can slash air, water, and land pollution daily! Refusing unnecessary non-biodegradable items, reusing and recycling containers, taking public transport, never burning trash, and recycling household greywater protect Earth for future generations.',
    keyCharacteristics: {
      heading: 'Seven Practical Textbook Measures to Reduce Pollution',
      points: [
        '1. Refuse & Reduce: Cut waste at the source by refusing unnecessary single-use bags and non-biodegradable packaging.',
        '2. Reuse & Recycle: Cleanly reuse and recycle non-toxic cans, bottles, pots, plastic (for storing non-eatables!), metal, glassware, and paper.',
        '3. Green Commuting: Use public transport (buses, trains), school vans, cycling, or carpools to cut vehicle exhaust emissions.',
        '4. Never Burn Trash: Do NOT burn household garbage, dry leaves, plastics, or polystyrene in open air.',
        '5. Protect Coasts & Water Bodies: Never throw solid waste or debris along coastal beaches, rivers, lakes, or canals.',
        '6. Eco-Friendly Household Products: Choose eco-friendly fuels, biodegradable washing liquids, and non-toxic bathroom cleaners.',
        '7. Home Water Recycling: Reuse clean household greywater (e.g. from rinsing clothes/vegetables) for mopping floors, washing courtyards, and watering plants!'
      ],
      table: {
        headers: ['Eco-Action Principle', 'Practical Everyday Example', 'Type of Pollution Reduced'],
        rows: [
          ['Refuse & Reduce', 'Carry a cloth bag to bazaar instead of taking plastic bags', 'Land & Marine Pollution'],
          ['Reuse & Recycle', 'Store dry tools/non-eatables in used plastic jars; recycle paper, metal & glass', 'Land Pollution & Resource Waste'],
          ['Public Transport & Carpool', 'Share rides or take bus instead of multiple private cars', 'Air Pollution (Vehicle Smoke)'],
          ['Zero Trash Burning', 'Compost peels & send dry waste for collection instead of burning', 'Air Pollution (Toxic Gases)'],
          ['Eco Cleaners & Water Reuse', 'Use mild eco cleaners & reuse rinse water for home cleaning', 'Water Pollution']
        ]
      }
    },
    deepDiveHeading: 'Smart Safety Nuance in STBB Class 5 Science',
    deepDiveSections: [
      {
        title: 'Store NON-EATABLES When Reusing Plastic Containers!',
        emoji: '🫙',
        points: [
          'Notice the exact smart safety tip in STBB Section 7: "Recycle/reuse used plastic materials for storing NON-EATABLES" (like pens, sewing kits, screws, or flowerpots rather than hot food/water)!',
          'That avoids chemical leaching into food while keeping plastic out of gutters and oceans!'
        ]
      },
      {
        title: 'Carpooling & Public Transport Impact',
        emoji: '🚌',
        points: [
          'One full bus replaces 30 to 40 individual cars on city roads!',
          'Fewer engines burning petrol/diesel directly slashes Karachi’s suspended particulate matter and smog.'
        ]
      }
    ],
    realWorldExamples: [
      {
        name: 'Cloth Shopping Bag',
        emoji: '👜',
        description: 'One sturdy cotton tote bag replaces hundreds of non-biodegradable polythene bags every year!'
      },
      {
        name: 'Bottle Planters & Organizers',
        emoji: '🪴',
        description: 'Cut used plastic bottles into neat pencil holders or balcony herb pots instead of tossing them in drains.'
      },
      {
        name: 'Carpooling to School/Work',
        emoji: '🚐',
        description: 'Four neighbours sharing one vehicle cut per-person fuel smoke by 75% immediately!'
      }
    ],
    mnemonic: {
      acronym: '4 R’s + P-N-E',
      meaning: 'Refuse · Reduce · Reuse · Recycle + Public Transport · No Burning · Eco Cleaners',
      items: [
        { letter: 'R', word: 'Refuse & Reduce', note: 'Say NO to single-use plastics!' },
        { letter: 'R', word: 'Reuse & Recycle', note: 'Cans, glass, metal, paper & pots.' },
        { letter: 'P', word: 'Public Transport', note: 'Carpool or bus to cut vehicle smoke.' },
        { letter: 'N', word: 'No Trash Fires', note: 'Never heat or burn trash & plastics!' },
        { letter: 'E', word: 'Eco Water & Cleaners', note: 'Eco detergents + reuse home cleaning water.' }
      ]
    },
    flowchartAscii: `             🌱 HOW CITIZENS DEFEAT ENVIRONMENTAL POLLUTION 🌱
   ┌──────────────────┬──────────────────┬──────────────────┬──────────────────┐
   ▼                  ▼                  ▼                  ▼                  ▼
🛍️ Refuse Single-  ♻️ Reuse & Recycle 🚌 Public Transit  🚫 Zero Open       💧 Eco Cleaners
   Use Plastics       Glass/Metal/Paper    & Carpooling      Trash Burning      & Water Reuse`,
    vennDiagram: {
      leftTitle: 'REDUCE & REFUSE',
      leftPoints: [
        'Prevents waste BEFORE it is even created',
        'Declining plastic bags at shops',
        'Highest priority step in waste management!'
      ],
      middleTitle: 'SUSTAINABLE ZERO-WASTE GOAL',
      middlePoints: [
        'Keep non-biodegradables out of land & sea',
        'Save raw natural resources & energy',
        'Practised daily at home and school'
      ],
      rightTitle: 'REUSE & RECYCLE',
      rightPoints: [
        'Extends life of existing cans, glass, pots & paper',
        'Repurposes used plastic for storing non-eatables',
        'Melts/reprocesses metal, glass & paper into new goods'
      ]
    },
    riddle: {
      prompt: 'Instead of 40 cars releasing 40 exhaust pipes of smoke, one shared vehicle carries all 40 commuters cleanly together. What eco-friendly habit is this?',
      answer: 'Using Public Transport (or Carpooling)',
      explanation: 'Using public buses/trains and carpooling drastically reduces fuel combustion and urban air pollution.'
    },
    unscrambles: [
      { scrambled: 'ELCYCER', solution: 'RECYCLE', hint: 'Processing used paper, glass, metal, or plastic into useful items instead of dumping.' }
    ]
  },
  {
    id: 8,
    slug: 'activity-2-pollution-awareness-campaign',
    title: 'Topic 8: Activity 2 — Planning an Environmental Awareness Campaign',
    shortExplanation:
      'Science knowledge becomes real change when shared with your school and community! STBB Activity 2 guides student teams step-by-step to survey local pollution, document three major problems visually, create cause-and-effect posters, present at assembly, and sign an action petition!',
    keyCharacteristics: {
      heading: 'Five Sequential Steps of the STBB Activity 2 Awareness Campaign',
      points: [
        'Step 1 — Team Observation & Recording: Work collaboratively in student teams to walk around school/neighbourhood and record real pollution problems.',
        'Step 2 — Visual Documentation (3 Problems): Draw sketches or bring photographs of THREE major environmental problems observed locally (e.g. open garbage heap, smoky traffic, stagnant sewage gutter).',
        'Step 3 — Cause-and-Effect Poster Creation: Investigate the root causes and harmful health effects of those problems and design a clear, bold awareness poster.',
        'Step 4 — Assembly & Community Sharing: Present and explain the poster during a school assembly AND community event to educate peers and families.',
        'Step 5 — Personal Action Petition: Sign a formal petition pledging concrete personal daily habits to reduce environmental pollution!'
      ],
      table: {
        headers: ['Campaign Phase', 'Student Team Action', 'Real Civic Impact'],
        rows: [
          ['1. Field Survey', 'Observe & record local air, water, and land pollution', 'Builds sharp scientific observation skills'],
          ['2. Visual Evidence', 'Draw or photograph 3 major local pollution issues', 'Makes invisible/ignored hazards unmistakable'],
          ['3. Poster Design', 'Map Causes → Health Effects → Practical Solutions', 'Communicates science clearly to all ages'],
          ['4. Public Outreach', 'Present at school assembly & neighbourhood event', 'Inspires hundreds of students & parents'],
          ['5. Action Petition', 'Sign personal pledge (cloth bags, zero litter, tree care)', 'Turns awareness into lasting daily behaviour!']
        ]
      }
    },
    deepDiveHeading: 'Chapter 4 Complete Mind Map Integration',
    deepDiveSections: [
      {
        title: 'What Makes an Awareness Poster High-Impact?',
        emoji: '🎨',
        points: [
          '1) Bold visual drawing/photo of the local problem.',
          '2) Clear 3-part flow: What Causes It? → How Does It Harm Health? → 3 Simple Actions YOU Can Take Today!'
        ]
      },
      {
        title: 'Why End With a Signed Action Petition?',
        emoji: '✍️',
        points: [
          'Awareness alone fades fast unless paired with personal accountability!',
          'Signing a school/community pledge (no littering, refusing plastic bags, turning off idle engines) builds collective civic pride.'
        ]
      }
    ],
    realWorldExamples: [
      {
        name: 'School Morning Assembly Talk',
        emoji: '🏫',
        description: '5-minute student poster presentation inspires an entire school to adopt plastic-free lunchboxes!'
      },
      {
        name: '3-Problem Neighbourhood Photo Board',
        emoji: '📸',
        description: 'Documents choked street gutter, trash fire smoke, and littered park corner with practical solutions.'
      },
      {
        name: 'Clean Sindh Green Petition',
        emoji: '📝',
        description: 'Students, teachers, and shopkeepers sign a pledge to use covered dustbins and cloth bags.'
      }
    ],
    mnemonic: {
      acronym: 'O-P-P-S-S',
      meaning: 'Campaign Blueprint — Observe · Picture 3 · Poster · Share Assembly · Sign Petition',
      items: [
        { letter: 'O', word: 'Observe Teams', note: 'Survey & record local pollution problems.' },
        { letter: 'P', word: 'Pictures (×3)', note: 'Draw or photograph 3 major local issues.' },
        { letter: 'P', word: 'Poster Build', note: 'Show causes, health effects & remedies.' },
        { letter: 'S', word: 'Share Publicly', note: 'Present at school assembly & community event.' },
        { letter: 'S', word: 'Sign Petition', note: 'Pledge personal daily eco-action!' }
      ]
    },
    flowchartAscii: `STBB CHAPTER 4 MASTER MIND MAP:
                      🌍 ENVIRONMENTAL POLLUTION (Undesirable Harmful Change)
                                               │
            ┌──────────────────────────────────┼──────────────────────────────────┐
            ▼                                  ▼                                  ▼
     💨 AIR POLLUTION                   💧 WATER POLLUTION                 🗑️ LAND POLLUTION
  Fuel/trash smoke (SPM)             Sewage · Factory chemicals         Solid wastes on ground:
  ─▶ Asthma, Pneumonia,              Agri pesticides/fertilizers        ├─ 🌿 Biodegradable (Peels)
     Headache, Drowsiness            ─▶ Cholera, Typhoid, Diarrhoea     └─ 🛍️ Non-Biodegradable (Plastic)
                                        & Fish Death/Poisoning!            ─▶ 1M birds & 100K mammals!`,
    vennDiagram: {
      leftTitle: 'SCHOOL AWARENESS DRIVE',
      leftPoints: [
        'Student team surveys & classroom posters',
        'Morning assembly presentations',
        'Plastic-free school canteen & clean campus bins'
      ],
      middleTitle: 'ACTIVITY 2 CAMPAIGN GOAL',
      middlePoints: [
        'Educate citizens about causes & health harms',
        'Promote 4Rs (Refuse, Reduce, Reuse, Recycle)',
        'Sealed by signing a personal action petition'
      ],
      rightTitle: 'COMMUNITY OUTREACH',
      rightPoints: [
        'Neighbourhood awareness displays & clean-ups',
        'Shopkeeper cloth-bag adoption pledges',
        'Stopping street trash fires & gutter littering'
      ]
    },
    riddle: {
      prompt: 'In STBB Activity 2’s awareness campaign, how many major environmental problems are student teams asked to draw or bring pictures of — and what document do participants sign at the end?',
      answer: 'Three (3) major environmental problems — and they sign a Petition!',
      explanation: 'Teams document three local environmental problems visually, build a cause-effect poster, present at assembly/community events, and sign a petition for personal action.'
    },
    unscrambles: [
      { scrambled: 'NGIAPMAC', solution: 'CAMPAIGN', hint: 'Organized school and community drive to spread awareness against pollution.' },
      { scrambled: 'NOITITEP', solution: 'PETITION', hint: 'Formal written pledge signed by students and citizens to take personal action.' }
    ],
    secretCodeActivity: {
      cipher: 'A=1, B=2, C=3 ... Z=26',
      items: [
        {
          encoded: '18 - 5 - 4 - 21 - 3 - 5  /  18 - 5 - 21 - 19 - 5  /  18 - 5 - 3 - 25 - 3 - 12 - 5',
          answer: 'REDUCE / REUSE / RECYCLE',
          sentence: 'Every citizen can protect Earth daily by following the golden rule: REDUCE / REUSE / RECYCLE!'
        }
      ]
    }
  }
];

export const STBB_CH4_MCQS_DATA: StbbMcq[] = [
  // SECTION A: Definitions, Types & Karachi Fact (Q1–Q8)
  {
    id: 'stbb-c5-ch4-01',
    number: 1,
    section: 'A',
    sectionTitle: 'Definitions & Karachi Fact',
    question: 'An undesirable change in the characteristics of air, water, and land that harms humans and other living things is called:',
    options: ['Germination', 'Environmental pollution', 'Photosynthesis', 'Classification'],
    correctIndex: 1,
    explanation: 'Pollution is defined as any undesirable change in the physical, chemical, or biological features of air, water, and land harmful to life.',
    topicRefId: 1
  },
  {
    id: 'stbb-c5-ch4-02',
    number: 2,
    section: 'A',
    sectionTitle: 'Definitions & Karachi Fact',
    question: 'Harmful substances added to the environment through human activities that cause undesirable changes are called:',
    options: ['Nutrients', 'Vitamins', 'Pollutants', 'Cotyledons'],
    correctIndex: 2,
    explanation: 'Substances like exhaust smoke, chemical waste, sewage, and plastic bags that pollute the environment are called pollutants.',
    topicRefId: 1
  },
  {
    id: 'stbb-c5-ch4-03',
    number: 3,
    section: 'A',
    sectionTitle: 'Definitions & Karachi Fact',
    question: 'What are the three major kinds of environmental pollution covered in STBB Class 5 Science?',
    options: [
      'Air, Water, and Land pollution',
      'Solar, Lunar, and Star pollution',
      'Leaf, Root, and Stem pollution',
      'Cotton, Wool, and Silk pollution'
    ],
    correctIndex: 0,
    explanation: 'Chapter 4 classifies environmental pollution into Air pollution, Water pollution, and Land pollution.',
    topicRefId: 1
  },
  {
    id: 'stbb-c5-ch4-04',
    number: 4,
    section: 'A',
    sectionTitle: 'Definitions & Karachi Fact',
    question: 'According to the STBB "Do You Know?" box, at which position was Karachi ranked among the top six polluted cities in the world?',
    options: ['First (1st) place', 'Third (3rd) place', 'Fifth (5th) place', 'Twentieth (20th) place'],
    correctIndex: 2,
    explanation: 'The STBB Class 5 textbook notes that Karachi ranked at fifth (5th) place among the top six polluted cities in the world.',
    topicRefId: 1
  },
  {
    id: 'stbb-c5-ch4-05',
    number: 5,
    section: 'A',
    sectionTitle: 'Definitions & Karachi Fact',
    question: 'What is identified as the major cause of Karachi’s severe air pollution and suspended particulate matter?',
    options: ['Ocean waves on Clifton beach', 'Vehicle exhaust emissions', 'Planting neem trees', 'Rainwater harvesting'],
    correctIndex: 1,
    explanation: 'Heavy motor vehicle emissions release suspended particulate matter into Karachi’s air, leading to widespread respiratory ailments.',
    topicRefId: 1
  },
  {
    id: 'stbb-c5-ch4-06',
    number: 6,
    section: 'A',
    sectionTitle: 'Definitions & Karachi Fact',
    question: 'Which of the following is an example of BOTH a human-made solid pollutant AND a non-biodegradable waste?',
    options: ['Fresh rainwater', 'Polythene plastic bag', 'Green mango leaf', 'Oxygen gas'],
    correctIndex: 1,
    explanation: 'Polythene plastic bags are human-produced pollutants that do not decompose naturally in soil or water.',
    topicRefId: 1
  },
  {
    id: 'stbb-c5-ch4-07',
    number: 7,
    section: 'A',
    sectionTitle: 'Definitions & Karachi Fact',
    question: 'Solid, liquid, and gaseous air pollutants released by burning coal, oil, gas, paper, and trash are commonly known as:',
    options: ['Dew', 'Smoke', 'Humus', 'Nectar'],
    correctIndex: 1,
    explanation: 'Burning fuels and waste releases solid particles, liquid droplets, and harmful gases collectively known as smoke.',
    topicRefId: 2
  },
  {
    id: 'stbb-c5-ch4-08',
    number: 8,
    section: 'A',
    sectionTitle: 'Definitions & Karachi Fact',
    question: 'Which human activities are the primary producers of pollutants on Earth?',
    options: [
      'Burning fuels in vehicles/factories, dumping untreated sewage, and littering solid waste',
      'Breathing fresh morning park air',
      'Composting kitchen peels in garden soil',
      'Using cloth shopping bags'
    ],
    correctIndex: 0,
    explanation: 'Industrial combustion, vehicle exhaust, untreated wastewater, agricultural chemicals, and open waste dumping are the main sources.',
    topicRefId: 1
  },

  // SECTION B: Sources & Causes of Air, Water & Land Pollution (Q9–Q16)
  {
    id: 'stbb-c5-ch4-09',
    number: 9,
    section: 'B',
    sectionTitle: 'Sources of Air, Water & Land Pollution',
    question: 'Burning which of the following fuels in factories, homes, and vehicles is a major cause of air pollution?',
    options: [
      'Coal, petrol/oil, natural gas, waste paper, and trash',
      'Pure solar panels and wind turbines',
      'Clean river water',
      'Wet cotton wool'
    ],
    correctIndex: 0,
    explanation: 'Combustion of fossil fuels (coal, oil, gas) and open burning of paper/trash release dense smoke into the atmosphere.',
    topicRefId: 2
  },
  {
    id: 'stbb-c5-ch4-10',
    number: 10,
    section: 'B',
    sectionTitle: 'Sources of Air, Water & Land Pollution',
    question: 'Which THREE main sources cause water pollution according to STBB Class 5 Science?',
    options: [
      'Untreated domestic sewage, untreated industrial chemical water, and agricultural pesticide/fertilizer run-off',
      'Pebbles, sand grains, and fish scales',
      'Sunlight, clouds, and mountain snow',
      'Paper boats, wooden oars, and fishing nets'
    ],
    correctIndex: 0,
    explanation: 'Domestic sewage (washing/toilets), industrial chemical wastewater, and farm run-off carrying fertilizers & pesticides are the three main causes.',
    topicRefId: 3
  },
  {
    id: 'stbb-c5-ch4-11',
    number: 11,
    section: 'B',
    sectionTitle: 'Sources of Air, Water & Land Pollution',
    question: 'Agricultural run-off pollutes rivers, canals, and lakes primarily because it carries harmful:',
    options: ['Vitamins and pure oxygen', 'Pesticides and chemical fertilizers', 'Seed coats and cotyledons', 'Clean drinking water'],
    correctIndex: 1,
    explanation: 'Excess fertilizers and toxic crop pesticides wash off farmland with irrigation/rainwater straight into nearby water bodies.',
    topicRefId: 3
  },
  {
    id: 'stbb-c5-ch4-12',
    number: 12,
    section: 'B',
    sectionTitle: 'Sources of Air, Water & Land Pollution',
    question: 'Domestic wastewater added to rivers and coastal waters originates mainly from:',
    options: [
      'Household washing, kitchens, and untreated toilet sewage',
      'Solar street lamps',
      'Library bookshelves',
      'Windmills'
    ],
    correctIndex: 0,
    explanation: 'Untreated sewage water from domestic washing and toilets introduces disease microbes and detergents into water bodies.',
    topicRefId: 3
  },
  {
    id: 'stbb-c5-ch4-13',
    number: 13,
    section: 'B',
    sectionTitle: 'Sources of Air, Water & Land Pollution',
    question: 'Dumping plastic bags, bottles, waste paper, glass, tin cans, kitchen peels, and animal waste on open ground directly causes:',
    options: ['Seed germination', 'Land pollution', 'Water purification', 'Ozone healing'],
    correctIndex: 1,
    explanation: 'Discarding solid wastes openly across soil and streets is the primary cause of land pollution.',
    topicRefId: 4
  },
  {
    id: 'stbb-c5-ch4-14',
    number: 14,
    section: 'B',
    sectionTitle: 'Sources of Air, Water & Land Pollution',
    question: 'All solid wastes dumped on land are scientifically categorized into which two main groups?',
    options: [
      'Monocot and Dicot',
      'Epigeal and Hypogeal',
      'Biodegradable and Non-biodegradable',
      'Vertebrate and Invertebrate'
    ],
    correctIndex: 2,
    explanation: 'Solid waste is divided into biodegradable materials (decomposed by microbes) and non-biodegradable materials (not easily decomposed).',
    topicRefId: 4
  },
  {
    id: 'stbb-c5-ch4-15',
    number: 15,
    section: 'B',
    sectionTitle: 'Sources of Air, Water & Land Pollution',
    question: 'How does severe land pollution secondarily damage hidden water resources?',
    options: [
      'Toxic substances from decaying land pollutants seep down and pollute underground water',
      'Plastic bags turn underground rocks into pure ice',
      'Tin cans boil groundwater automatically for 5 minutes',
      'Land pollution never affects water or air'
    ],
    correctIndex: 0,
    explanation: 'Toxic leachate oozing from decaying waste dumps seeps into soil, polluting underground drinking water as well as surrounding air.',
    topicRefId: 4
  },
  {
    id: 'stbb-c5-ch4-16',
    number: 16,
    section: 'B',
    sectionTitle: 'Sources of Air, Water & Land Pollution',
    question: 'Why does burning plastic and polystyrene in open garbage piles worsen air pollution dangerously?',
    options: [
      'It releases pure oxygen into the air',
      'It emits poisonous toxic gases into breathing air',
      'It creates harmless water vapour only',
      'It cools city temperatures'
    ],
    correctIndex: 1,
    explanation: 'Heating or burning plastics and polystyrene emits hazardous toxic gases that severely pollute air and damage lungs.',
    topicRefId: 6
  },

  // SECTION C: Health & Ecosystem Effects of Pollution (Q17–Q24)
  {
    id: 'stbb-c5-ch4-17',
    number: 17,
    section: 'C',
    sectionTitle: 'Health & Ecosystem Effects',
    question: 'Prolonged exposure to polluted air causes all of the following human health ailments EXCEPT:',
    options: [
      'Asthma, pneumonia, and lung cancer',
      'Headache, eye/nose irritation, and sore throat',
      'Drowsiness, nausea, and weakened judgment',
      'Improved lung capacity and sharper eyesight'
    ],
    correctIndex: 3,
    explanation: 'Polluted air causes headache, eye/nose/throat irritation, nausea, drowsiness, weakened judgment, asthma, pneumonia, and lung cancer.',
    topicRefId: 2
  },
  {
    id: 'stbb-c5-ch4-18',
    number: 18,
    section: 'C',
    sectionTitle: 'Health & Ecosystem Effects',
    question: 'Which group of human diseases is directly caused by drinking or contact with polluted water?',
    options: [
      'Cholera, typhoid, and diarrhoea (digestive tract diseases)',
      'Broken wrists and sprained ankles',
      'Near-sightedness and colour blindness',
      'Sunburn and frostbite'
    ],
    correctIndex: 0,
    explanation: 'Water-borne germs in sewage-polluted water cause cholera, typhoid, diarrhoea, and serious digestive tract disorders.',
    topicRefId: 3
  },
  {
    id: 'stbb-c5-ch4-19',
    number: 19,
    section: 'C',
    sectionTitle: 'Health & Ecosystem Effects',
    question: 'What harmful effects does chemical and sewage water pollution inflict upon fish and aquatic animals?',
    options: [
      'Faster growth and stronger immunity',
      'Death, immune depression, reproductive failure, and acute poisoning',
      'Conversion of fish into amphibians',
      'Increased oxygen production in gills'
    ],
    correctIndex: 1,
    explanation: 'STBB Class 5 Science explicitly notes death of aquatic life, immune depression, reproductive failure, and acute poisoning.',
    topicRefId: 3
  },
  {
    id: 'stbb-c5-ch4-20',
    number: 20,
    section: 'C',
    sectionTitle: 'Health & Ecosystem Effects',
    question: 'Which two serious lung diseases are highlighted in STBB Class 5 Science as long-term consequences of severe air pollution?',
    options: ['Typhoid and cholera', 'Pneumonia and lung cancer', 'Athlete’s foot and ringworm', 'Rickets and scurvy'],
    correctIndex: 1,
    explanation: 'Alongside chronic asthma, prolonged inhalation of polluted air causes severe lung diseases including pneumonia and lung cancer.',
    topicRefId: 2
  },
  {
    id: 'stbb-c5-ch4-21',
    number: 21,
    section: 'C',
    sectionTitle: 'Health & Ecosystem Effects',
    question: 'How does prolonged exposure to polluted air subtly affect human mental alertness according to the textbook?',
    options: [
      'Causes drowsiness and weakened judgment',
      'Doubles memory speed overnight',
      'Eliminates the need for sleep',
      'Improves mathematical calculation speed'
    ],
    correctIndex: 0,
    explanation: 'Headache, nausea, drowsiness, and weakened judgment are key textbook symptoms of prolonged exposure to air pollutants.',
    topicRefId: 2
  },
  {
    id: 'stbb-c5-ch4-22',
    number: 22,
    section: 'C',
    sectionTitle: 'Health & Ecosystem Effects',
    question: 'Which part of the human body is primarily attacked by water-borne diseases such as cholera, typhoid, and diarrhoea?',
    options: ['Digestive tract (stomach & intestines)', 'Earlobes', 'Fingernails', 'Kneecaps'],
    correctIndex: 0,
    explanation: 'Water-borne pathogens swallowed in contaminated water attack the digestive tract causing severe dehydration and fever.',
    topicRefId: 3
  },
  {
    id: 'stbb-c5-ch4-23',
    number: 23,
    section: 'C',
    sectionTitle: 'Health & Ecosystem Effects',
    question: 'What happens when non-biodegradable plastic bags enter urban sewage pipes and street storm gutters?',
    options: [
      'They dissolve smoothly in rainwater',
      'They choke drainage systems, causing gutter overflow and urban flooding',
      'They filter water into pure mineral water',
      'They speed up water flow cleanly'
    ],
    correctIndex: 1,
    explanation: 'Plastic bags do not rot or tear easily; they clog underground drains and cause filthy sewage overflow and flooding.',
    topicRefId: 6
  },
  {
    id: 'stbb-c5-ch4-24',
    number: 24,
    section: 'C',
    sectionTitle: 'Health & Ecosystem Effects',
    question: 'Why do marine animals often die of starvation after swallowing plastic bags or small polystyrene pieces?',
    options: [
      'Indigestible plastic blocks their stomachs and throats so they cannot eat or digest real food',
      'Plastic makes them swim too fast',
      'Plastic turns ocean water sweet',
      'Plastic gives them excess vitamins'
    ],
    correctIndex: 0,
    explanation: 'Plastics cause entanglement, choking, and stomach blockage — starving sea turtles, fish, and seabirds to death.',
    topicRefId: 6
  },

  // SECTION D: Biodegradable vs. Non-Biodegradable & UN Stat (Q25–Q32)
  {
    id: 'stbb-c5-ch4-25',
    number: 25,
    section: 'D',
    sectionTitle: 'Biodegradable, Non-Biodegradable & UNEP',
    question: 'Solid waste that is easily decomposed by microorganisms (bacteria and fungi) through natural processes is called:',
    options: ['Non-biodegradable waste', 'Biodegradable waste', 'Radioactive metal', 'Synthetic polymer'],
    correctIndex: 1,
    explanation: 'Biodegradable materials (such as vegetable/fruit peels and food scraps) are broken down naturally by decomposers.',
    topicRefId: 5
  },
  {
    id: 'stbb-c5-ch4-26',
    number: 26,
    section: 'D',
    sectionTitle: 'Biodegradable, Non-Biodegradable & UNEP',
    question: 'Solid waste that is NOT easily decomposed by decomposers and remains on Earth for many years is called:',
    options: ['Compost humus', 'Non-biodegradable waste', 'Organic manure', 'Edible cotyledon'],
    correctIndex: 1,
    explanation: 'Non-biodegradable materials (like plastics, bottles, cans, and polystyrene) resist microbial decay for centuries.',
    topicRefId: 5
  },
  {
    id: 'stbb-c5-ch4-27',
    number: 27,
    section: 'D',
    sectionTitle: 'Biodegradable, Non-Biodegradable & UNEP',
    question: 'Which of the following is a BIODEGRADABLE material?',
    options: ['Polythene shopping bag', 'Plastic mineral water bottle', 'Vegetable and fruit peels', 'Polystyrene foam cup'],
    correctIndex: 2,
    explanation: 'Vegetable and fruit peels are natural plant matter easily decomposed into rich humus by soil bacteria and fungi.',
    topicRefId: 5
  },
  {
    id: 'stbb-c5-ch4-28',
    number: 28,
    section: 'D',
    sectionTitle: 'Biodegradable, Non-Biodegradable & UNEP',
    question: 'Which of the following items is NON-BIODEGRADABLE?',
    options: ['Banana peel', 'Fallen mango leaf', 'Plastic bottle / polystyrene box', 'Leftover chapati crumb'],
    correctIndex: 2,
    explanation: 'Plastics and polystyrene cannot be digested by natural decomposers and remain in the environment for hundreds of years.',
    topicRefId: 5
  },
  {
    id: 'stbb-c5-ch4-29',
    number: 29,
    section: 'D',
    sectionTitle: 'Biodegradable, Non-Biodegradable & UNEP',
    question: 'According to the UN Environment Programme (UNEP) statistic cited in STBB Class 5 Science, plastic waste kills how many seabirds every year?',
    options: ['About 100 seabirds', 'About 1,000 seabirds', 'A million (1,000,000) seabirds', 'Zero seabirds'],
    correctIndex: 2,
    explanation: 'UNEP reports that plastic pollution kills one million (1,000,000) seabirds every single year.',
    topicRefId: 6
  },
  {
    id: 'stbb-c5-ch4-30',
    number: 30,
    section: 'D',
    sectionTitle: 'Biodegradable, Non-Biodegradable & UNEP',
    question: 'Alongside a million seabirds, how many marine mammals and sea turtles are killed yearly by plastic pollution according to UNEP?',
    options: ['100,000 marine mammals/turtles', 'Only 5 turtles', '500 mammals', 'None'],
    correctIndex: 0,
    explanation: 'UNEP statistics highlight 100,000 marine mammals and turtles killed annually by plastic entanglement, choking, and starvation.',
    topicRefId: 6
  },
  {
    id: 'stbb-c5-ch4-31',
    number: 31,
    section: 'D',
    sectionTitle: 'Biodegradable, Non-Biodegradable & UNEP',
    question: 'What happens to plastics in oceans when waves and sunlight break them down over time?',
    options: [
      'They turn into nutritious fish vitamins',
      'They break into small pieces that are mistakenly swallowed as food by fish and birds',
      'They evaporate into clean clouds',
      'They turn into coral reefs'
    ],
    correctIndex: 1,
    explanation: 'Plastics fragment into small micro-pieces eaten mistakenly by fish and seabirds, poisoning food chains.',
    topicRefId: 6
  },
  {
    id: 'stbb-c5-ch4-32',
    number: 32,
    section: 'D',
    sectionTitle: 'Biodegradable, Non-Biodegradable & UNEP',
    question: 'When reusing clean used plastic containers at home, STBB Class 5 Science recommends using them carefully for:',
    options: [
      'Boiling soup on a hot gas stove',
      'Storing non-eatables (dry items, organizers, planters)',
      'Burning inside closed rooms',
      'Throwing into coastal waves'
    ],
    correctIndex: 1,
    explanation: 'Repurposing used plastic jars/bottles for storing non-eatables keeps plastic out of dumps while avoiding chemical leaching into food.',
    topicRefId: 7
  },

  // SECTION E: Reduction Measures & Awareness Campaign (Q33–Q40)
  {
    id: 'stbb-c5-ch4-33',
    number: 33,
    section: 'E',
    sectionTitle: 'Reduction Measures & Campaign',
    question: 'Which daily transportation habit most effectively reduces city vehicle smoke and air pollution?',
    options: [
      'Using public transport or carpooling with neighbours/colleagues',
      'Leaving car engines idling all day',
      'Driving solo in smoke-emitting trucks',
      'Burning old tyres on roadsides'
    ],
    correctIndex: 0,
    explanation: 'Using public buses/trains and carpooling reduces fuel consumption and exhaust emissions per passenger dramatically.',
    topicRefId: 7
  },
  {
    id: 'stbb-c5-ch4-34',
    number: 34,
    section: 'E',
    sectionTitle: 'Reduction Measures & Campaign',
    question: 'Which household items can be cleanly reused and recycled instead of thrown into open dumps?',
    options: [
      'Non-toxic cans, bottles, pots, metal, glassware, and paper',
      'Hospital needles only',
      'Factory smoke clouds',
      'Untreated sewage'
    ],
    correctIndex: 0,
    explanation: 'Reusing and recycling non-toxic cans, bottles, pots, plastic, metal, glassware, and paper conserves resources and reduces land pollution.',
    topicRefId: 7
  },
  {
    id: 'stbb-c5-ch4-35',
    number: 35,
    section: 'E',
    sectionTitle: 'Reduction Measures & Campaign',
    question: 'How can families conserve water and reduce wastewater volume inside the home?',
    options: [
      'Leave all taps running day and night',
      'Recycle/reuse clean household greywater for cleaning floors and courtyards',
      'Pour motor oil down kitchen sinks',
      'Dump garbage bags into water tanks'
    ],
    correctIndex: 1,
    explanation: 'Recycling lightly used home rinse water for mopping, outdoor cleaning, and gardening saves fresh water and cuts sewage load.',
    topicRefId: 7
  },
  {
    id: 'stbb-c5-ch4-36',
    number: 36,
    section: 'E',
    sectionTitle: 'Reduction Measures & Campaign',
    question: 'Which type of household cleaning and fuel products should citizens prefer to minimize chemical pollution?',
    options: [
      'Eco-friendly fuels, washing liquids, and bathroom cleaners',
      'Leaded petrol and raw coal smoke',
      'Toxic industrial acids',
      'Banned agricultural poisons'
    ],
    correctIndex: 0,
    explanation: 'Using eco-friendly fuels, biodegradable washing liquids, and gentle bathroom cleaners keeps air and waterways cleaner.',
    topicRefId: 7
  },
  {
    id: 'stbb-c5-ch4-37',
    number: 37,
    section: 'E',
    sectionTitle: 'Reduction Measures & Campaign',
    question: 'What is the FIRST step of cutting waste under the STBB measures to reduce pollution?',
    options: [
      'Refusing unnecessary and non-biodegradable single-use materials',
      'Dumping waste into coastal beaches at night',
      'Burning plastics in backyards',
      'Throwing bottles out car windows'
    ],
    correctIndex: 0,
    explanation: 'Reducing waste begins by refusing unnecessary non-biodegradable materials (such as declining single-use plastic bags).',
    topicRefId: 7
  },
  {
    id: 'stbb-c5-ch4-38',
    number: 38,
    section: 'E',
    sectionTitle: 'Reduction Measures & Campaign',
    question: 'In STBB Activity 2 (Awareness Campaign), how many major local environmental problems should teams draw or photograph?',
    options: ['Zero', 'Three (3) major environmental problems', 'Fifty unrelated math puzzles', 'Only lunar eclipses'],
    correctIndex: 1,
    explanation: 'Teams observe local pollution, draw or bring pictures of three major environmental problems, explore causes/effects, and create a poster.',
    topicRefId: 8
  },
  {
    id: 'stbb-c5-ch4-39',
    number: 39,
    section: 'E',
    sectionTitle: 'Reduction Measures & Campaign',
    question: 'Where does Activity 2 recommend students share their awareness posters to maximize impact?',
    options: [
      'Lock them inside a dark cupboard forever',
      'At a school assembly and a community event',
      'Throw them into a river canal',
      'Bury them under plastic bags'
    ],
    correctIndex: 1,
    explanation: 'Sharing cause-and-effect awareness posters at school assemblies and community events educates fellow students and neighbours.',
    topicRefId: 8
  },
  {
    id: 'stbb-c5-ch4-40',
    number: 40,
    section: 'E',
    sectionTitle: 'Reduction Measures & Campaign',
    question: 'What final collective commitment step concludes the Activity 2 pollution awareness campaign?',
    options: [
      'Signing a petition to take personal action toward reducing pollution',
      'Burning all awareness posters in a bonfire',
      'Ordering free plastic bags for everyone',
      'Closing school windows permanently'
    ],
    correctIndex: 0,
    explanation: 'Participants sign a petition pledging personal responsibility and daily eco-actions to reduce pollution.',
    topicRefId: 8
  }
];

export const STBB_CH4_SUMMARY_CONCEPTS = [
  {
    icon: '🌍',
    topic: 'Pollution & Pollutants',
    takeaway: 'Pollution = undesirable harmful change in air, water & land; Pollutants = human-made harmful substances (smoke, plastics).'
  },
  {
    icon: '🏙️',
    topic: 'Karachi Air Rank',
    takeaway: 'Karachi ranked 5th among world’s top 6 polluted cities — caused mainly by vehicle emissions & suspended particulate matter.'
  },
  {
    icon: '💨',
    topic: 'Air Pollution',
    takeaway: 'Fuel/trash smoke causes eye/nose/throat irritation, headache, nausea, drowsiness, weakened judgment, asthma, pneumonia & lung cancer.'
  },
  {
    icon: '💧',
    topic: 'Water Pollution',
    takeaway: 'Domestic sewage, factory chemicals & farm pesticides cause cholera, typhoid, diarrhoea + fish death, poisoning & reproductive failure.'
  },
  {
    icon: '🗑️',
    topic: 'Land Pollution',
    takeaway: 'Open dumping of plastics, bottles, cans, glass, peels & animal waste poisons underground water and surrounding air.'
  },
  {
    icon: '🌿',
    topic: 'Biodegradable Waste',
    takeaway: 'Easily decomposed by microorganisms through natural processes (e.g., vegetable/fruit peels, food scraps, paper).'
  },
  {
    icon: '🛍️',
    topic: 'Non-Biodegradable',
    takeaway: 'Not decomposed by microbes (plastics, polystyrene); chokes drains & kills 1M seabirds + 100,000 marine mammals/turtles yearly!'
  },
  {
    icon: '♻️',
    topic: '4Rs & Campaign',
    takeaway: 'Refuse, Reduce, Reuse, Recycle + public transport, zero burning, eco cleaners, home water reuse & school/community petition!'
  }
];

export const STBB_CH4_MATRICES: StbbComparisonMatrix[] = [
  {
    title: 'Master Comparison Matrix — Air, Water & Land Pollution',
    subtitle: 'Complete STBB Class 5 Chapter 4 reference of sources, key pollutants, and harmful effects',
    headers: ['Pollution Type', 'Main Human Sources', 'Major Pollutants', 'Health & Environmental Effects'],
    rows: [
      {
        cells: [
          'Air Pollution 💨',
          'Burning fuel/trash in vehicles, factories & homes',
          'Smoke (solids, liquids, gases) & suspended particulate matter',
          'Headache, eye/throat irritation, nausea, drowsiness, weakened judgment, asthma, pneumonia, lung cancer'
        ],
        cellStyles: { 0: 'amber' }
      },
      {
        cells: [
          'Water Pollution 💧',
          'Untreated domestic sewage, factory waste & agricultural run-off',
          'Sewage germs, industrial chemicals, pesticides & fertilizers',
          'Cholera, typhoid, diarrhoea; fish death, immune depression, reproductive failure & acute poisoning'
        ],
        cellStyles: { 0: 'cyan' }
      },
      {
        cells: [
          'Land Pollution 🗑️',
          'Open dumping of household & municipal solid wastes',
          'Plastic bags, bottles, cans, glass, peels, animal waste & faeces',
          'Choked gutters & flooding; toxic seepage into underground water & foul air pollution'
        ],
        cellStyles: { 0: 'rose' }
      }
    ]
  },
  {
    title: 'Master Matrix — Biodegradable vs. Non-Biodegradable Materials',
    subtitle: 'Decomposition science, environmental hazards, and safe disposal protocol',
    headers: ['Feature', 'Biodegradable Materials 🌿', 'Non-Biodegradable Materials 🛍️'],
    rows: [
      {
        cells: ['Microbial Decomposition', '✅ Easily broken down by decomposers (bacteria & fungi)', '❌ Resists decomposition; stays on Earth for centuries'],
        cellStyles: { 0: 'bold', 1: 'emerald', 2: 'rose' }
      },
      {
        cells: ['Common Examples', 'Vegetable/fruit peels, food scraps, leaves, paper', 'Plastic bags, plastic bottles, polystyrene, cans, glass'],
        cellStyles: { 0: 'bold' }
      },
      {
        cells: ['Environmental Impact', 'Enriches soil as harmless natural humus when composted', 'Chokes gutters, leaches toxins, emits toxic gas if burned; kills 1M birds & 100K marine animals/yr'],
        cellStyles: { 0: 'bold', 1: 'emerald', 2: 'rose' }
      },
      {
        cells: ['Recommended Action', 'Segregate into green bin & compost into natural fertilizer', 'Refuse single-use items; reuse for storing non-eatables; recycle glass/metal/paper — NEVER burn!'],
        cellStyles: { 0: 'bold', 1: 'emerald', 2: 'amber' }
      }
    ]
  }
];

export const STBB_CHAPTER_4_CONFIG: StbbChapterConfig = {
  id: 'ch4-environmental-pollution',
  chapterNumber: 4,
  shortNavLabel: 'Ch 4: Environmental Pollution',
  navEmoji: '🌍',
  isFeaturedNew: true,
  boardBadge: 'STBB Sindh Textbook Board · Class 5 · General Science',
  syllabusBadge: 'Sukkur IBA STS PST & JEST Syllabus Aligned',
  heroTitle: 'Chapter 4: Environmental Pollution',
  heroDescription:
    'Master Air, Water, and Land pollution: causes, smoke & vehicle particulate matter (Karachi global rank #5), health impacts, Biodegradable vs. Non-Biodegradable plastics (UNEP wildlife statistics), the 4Rs eco-action guide, and the School Awareness Campaign!',
  quickMetrics: [
    { icon: 'book', label: '8 Topic Deep-Dives' },
    { icon: 'check', label: '40 Topic-Covering MCQs' },
    { icon: 'compass', label: 'Pollution & Waste Classifier' },
    { icon: 'sparkles', label: '8 Mnemonics & Riddles' }
  ],
  tabs: {
    topicsLabel: '8 Interactive Topics',
    toolLabel: 'Waste & Pollutant Tool',
    mcqsLabel: '40 MCQs & Mock Exam',
    summaryLabel: 'Key Concepts & Tables'
  },
  sidebarHeading: 'Chapter 4 Curriculum Topics (1–8)',
  decisionTool: {
    badge: 'Eco-Diagnostic Simulator',
    title: 'Environmental Pollutant & Solid Waste Decision Tree',
    subtitle:
      'Pick a real-world waste item or emission source (or roll Random!) and follow the Yes/No environmental key to classify it and find its safe eco-remedy!',
    totalSteps: 3,
    samplePromptLabel: 'Sample Quick-Buttons (Select a Sample or Roll Random):',
    enableRandomMystery: true,
    specimens: [
      {
        id: 'ch4-smoke',
        name: 'Vehicle / Trash Smoke',
        emoji: '💨',
        targetGroup: 'AIR POLLUTANT (SMOKE & SPM)',
        clue: 'Field Observation: Dark plume of solid soot, tiny droplets, and gases released from burning fuel or trash into breathing air.',
        expectedPath: 'Q1: Yes → AIR POLLUTANT (SMOKE & SPM)'
      },
      {
        id: 'ch4-sewage',
        name: 'Factory / Sewage Effluent',
        emoji: '💧',
        targetGroup: 'WATER POLLUTANT (LIQUID RUN-OFF / SEWAGE)',
        clue: 'Field Observation: Untreated liquid discharge from household drains, industrial pipes, or pesticide-treated farm fields entering rivers.',
        expectedPath: 'Q1: No → Q2: Yes → WATER POLLUTANT (LIQUID RUN-OFF / SEWAGE)'
      },
      {
        id: 'ch4-peels',
        name: 'Vegetable & Fruit Peels',
        emoji: '🍌',
        targetGroup: 'BIODEGRADABLE SOLID WASTE 🌿',
        clue: 'Field Observation: Organic kitchen peels and leaf cuttings discarded on ground; soil bacteria and fungi break them down naturally into humus!',
        expectedPath: 'Q1: No → Q2: No → Q3: Yes → BIODEGRADABLE SOLID WASTE 🌿'
      },
      {
        id: 'ch4-plastic',
        name: 'Plastic Bag / Polystyrene',
        emoji: '🛍️',
        targetGroup: 'NON-BIODEGRADABLE SOLID WASTE ⚠️',
        clue: 'Field Observation: Synthetic shopping bag / foam cup that never rots for centuries, chokes storm gutters, and emits toxic gas if burned!',
        expectedPath: 'Q1: No → Q2: No → Q3: No → NON-BIODEGRADABLE SOLID WASTE ⚠️'
      }
    ],
    nodes: [
      {
        id: 1,
        question: '1. Is it released into the atmosphere as smoke, gases, or suspended particles from burning fuels/trash?',
        helperText: 'Check whether the pollutant directly contaminates breathing air:',
        onYes: {
          type: 'result',
          shortCode: 'Q1: Yes',
          result: {
            group: 'AIR POLLUTANT (SMOKE & SPM)',
            emoji: '💨',
            sizeRank: 'Air Pollution · Major Cause of Karachi Rank #5',
            keyTrait: 'Solid, liquid & gaseous smoke causes eye/throat irritation, headache, drowsiness, asthma, pneumonia & lung cancer.',
            examples: 'Vehicle exhaust, factory chimneys, coal/oil/gas fumes, open trash burning (Remedy: Public transport & zero burning!)'
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
        question: '2. Is it untreated liquid sewage, industrial chemical water, or agricultural pesticide/fertilizer run-off entering water bodies?',
        helperText: 'Check whether liquid waste is flowing into canals, rivers, lakes, or sea:',
        onYes: {
          type: 'result',
          shortCode: 'Q2: Yes',
          result: {
            group: 'WATER POLLUTANT (LIQUID RUN-OFF / SEWAGE)',
            emoji: '💧',
            sizeRank: 'Water Pollution · Human & Aquatic Hazard',
            keyTrait: 'Spreads cholera, typhoid & diarrhoea in humans; causes death, poisoning, immune depression & reproductive failure in fish.',
            examples: 'Domestic toilet/washing sewage, factory chemical effluents, farm pesticide & fertilizer run-off'
          }
        },
        onNo: {
          type: 'next',
          shortCode: 'Q2: No',
          nextNodeId: 3
        }
      },
      {
        id: 3,
        question: '3. Can natural decomposers (bacteria & fungi) easily break this solid waste down into fertile soil?',
        helperText: 'Distinguish organic compostable waste from persistent synthetic plastics/metals:',
        onYes: {
          type: 'result',
          shortCode: 'Q3: Yes',
          result: {
            group: 'BIODEGRADABLE SOLID WASTE 🌿',
            emoji: '🌿',
            sizeRank: 'Eco-Safe Organic Waste (Compostable)',
            keyTrait: 'Easily decomposed by microorganisms through natural reduction processes back into fertile soil nutrients!',
            examples: 'Vegetable & fruit peels/cuttings, food scraps, fallen leaves, paper (Action: Segregate & compost!)'
          }
        },
        onNo: {
          type: 'result',
          shortCode: 'Q3: No',
          result: {
            group: 'NON-BIODEGRADABLE SOLID WASTE ⚠️',
            emoji: '🛍️',
            sizeRank: 'Persistent Land & Marine Hazard (1M Seabirds + 100K Marine Mammals/Yr)',
            keyTrait: 'NOT decomposed by microbes; chokes drains, poisons groundwater, emits toxic gases when burned!',
            examples: 'Plastic bags, plastic bottles, polystyrene, cans, glass (Action: Refuse, Reuse for non-eatables & Recycle — NEVER burn!)'
          }
        }
      }
    ]
  },
  mcqSections: [
    { id: 'All', label: 'All (40)' },
    { id: 'A', label: 'Sec A: Definitions & Karachi Fact' },
    { id: 'B', label: 'Sec B: Air, Water & Land Causes' },
    { id: 'C', label: 'Sec C: Health & Ecosystem Effects' },
    { id: 'D', label: 'Sec D: Bio vs Non-Bio & UNEP' },
    { id: 'E', label: 'Sec E: 4Rs & Campaign' }
  ],
  topics: STBB_CH4_TOPICS,
  mcqs: STBB_CH4_MCQS_DATA,
  summaryConcepts: STBB_CH4_SUMMARY_CONCEPTS,
  summaryMatrices: STBB_CH4_MATRICES
};
