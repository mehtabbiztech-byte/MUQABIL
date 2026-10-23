import { StbbChapterExtras } from './stbbChapterTwoMicroorganismsData';

export const STBB_CH1_EXTRAS: StbbChapterExtras = {
  activities: [
    {
      id: 'ch1-act-1',
      activityNumber: 'Activity 1',
      title: 'Grouping Living Things Around School & Home into Five Kingdoms',
      emoji: '🌿',
      aim: 'Observe everyday organisms in the school garden and classify them by visible body traits and nutrition mode.',
      materials: ['Magnifying hand lens', 'Observation notebook & pencil', 'Bread mould sample (sealed jar)', 'Mushroom picture/specimen', 'Flowering plant leaf & insect photo'],
      procedure: [
        'Walk carefully around the school courtyard or garden in small groups.',
        'Record at least six different living things (e.g., rose bush, ant, pigeon, moss, mushroom photo, pond algae).',
        'Examine leaf veins, body segments, feathers, or spore caps using a hand lens without harming any living organism.',
        'Sort every recorded organism into its Kingdom (Monera, Protista, Fungi, Plantae, Animalia) and compare tables across groups.'
      ],
      questions: [
        {
          question: 'Why are mushrooms placed in Kingdom Fungi instead of Kingdom Plantae even though both grow in soil?',
          answer: 'Mushrooms lack chlorophyll, cannot perform photosynthesis, have chitin cell walls instead of cellulose, and absorb nutrients from decaying organic matter.'
        },
        {
          question: 'Which trait immediately separates all members of Animalia from Plantae?',
          answer: 'Animals are heterotrophic multicellular organisms without cell walls that generally move actively to find food, whereas plants are autotrophic with cellulose cell walls.'
        }
      ],
      conclusion: 'Classification groups millions of organisms logically by shared structure and nutrition so scientists can study biodiversity systematically.',
      safetyOrTeacherTip: 'Never touch wild mushrooms or insects bare-handed; seal mould samples inside transparent bags or jars.'
    },
    {
      id: 'ch1-act-2',
      activityNumber: 'Activity 2',
      title: 'Comparing Monocot & Dicot Leaves, Roots, and Flowers',
      emoji: '🌺',
      aim: 'Differentiate monocotyledonous and dicotyledonous flowering plants using leaf venation, root systems, and petal counts.',
      materials: ['Grass or maize plant with roots', 'Mustard, rose, or bean plant with roots', 'Hand lens', 'Drawing sheet & ruler'],
      procedure: [
        'Wash soil gently off the roots of a grass/wheat plant and a mustard/bean plant.',
        'Compare the fibrous root cluster of grass against the single main taproot of bean/mustard.',
        'Hold one leaf of each plant up to sunlight to trace parallel veins versus net-like (reticulate) veins.',
        'Count flower petals on each specimen and record whether petals occur in multiples of 3 or 4–5.'
      ],
      questions: [
        {
          question: 'Can you identify whether a plant is a monocot or dicot without digging up its seed?',
          answer: 'Yes! Parallel veins, fibrous roots, and petals in multiples of 3 indicate a monocot; reticulate (net-like) veins, taproots, and petals in 4s or 5s indicate a dicot.'
        }
      ],
      conclusion: 'External plant organs (leaves, roots, and petals) directly reflect whether the seed inside possesses one cotyledon or two cotyledons.'
    },
    {
      id: 'ch1-act-3',
      activityNumber: 'Activity 3',
      title: 'Vertebrate & Invertebrate Poster and Biodiversity Conservation Pledge',
      emoji: '🦴',
      aim: 'Classify animals by presence/absence of a backbone and design conservation actions for endangered Pakistani wildlife.',
      materials: ['Chart paper', 'Pictures of fish, frog, lizard, sparrow, Indus blind dolphin, earthworm, butterfly, snail', 'Markers & glue'],
      procedure: [
        'Divide chart paper into Vertebrates (5 classes: Fish, Amphibians, Reptiles, Birds, Mammals) and Invertebrates (Worms, Insects, Molluscs, Echinoderms, Sponges).',
        'Sort every animal card into its exact group and list two diagnostic traits underneath.',
        'Highlight threatened Pakistani species (Indus blind dolphin, Markhor, Snow leopard, Green turtle) and list three protection steps.'
      ],
      questions: [
        {
          question: 'Why is the Indus blind dolphin classified as a mammal rather than a fish despite living exclusively in river water?',
          answer: 'It breathes air through lungs (not gills), is warm-blooded (endothermic), gives birth to live young, and feeds milk to its calf.'
        }
      ],
      conclusion: 'Internal skeletal anatomy, breathing organs, reproduction, and body temperature regulation determine true scientific classification.'
    }
  ],
  fillInBlanks: [
    {
      id: 'ch1-fib-1',
      promptWithBlank: 'Animals that possess a backbone (vertebral column) are called __________.',
      answer: 'vertebrates',
      acceptedVariants: ['vertebrate'],
      explanation: 'Fish, amphibians, reptiles, birds, and mammals all possess an internal backbone made of vertebrae.'
    },
    {
      id: 'ch1-fib-2',
      promptWithBlank: 'Flowering plants whose seeds contain two seed leaves are called __________.',
      answer: 'dicots',
      acceptedVariants: ['dicotyledons', 'dicot'],
      explanation: 'Dicotyledonous plants (pea, mango, rose, French bean) have two cotyledons, net-like leaf veins, and taproots.'
    },
    {
      id: 'ch1-fib-3',
      promptWithBlank: 'Mushrooms, yeast, and bread mould belong to Kingdom __________.',
      answer: 'Fungi',
      explanation: 'Fungi are non-green heterotrophs that absorb nutrients from organic matter and lack chlorophyll.'
    },
    {
      id: 'ch1-fib-4',
      promptWithBlank: 'Insects have three body parts (head, thorax, abdomen) and __________ pairs of jointed legs.',
      answer: 'three',
      acceptedVariants: ['3', 'six legs'],
      explanation: 'All insects possess 3 pairs (6 total) of jointed legs attached to the thorax.'
    }
  ],
  trueFalse: [
    {
      id: 'ch1-tf-1',
      statement: 'All birds and mammals are warm-blooded (endothermic) vertebrates.',
      isTrue: true,
      explanation: 'Both birds and mammals maintain a constant internal body temperature regardless of outside weather.'
    },
    {
      id: 'ch1-tf-2',
      statement: 'Algae have true roots, stems, and leaves just like flowering plants.',
      isTrue: false,
      explanation: 'False! Algae perform photosynthesis with chlorophyll, but they do NOT possess true roots, stems, leaves, or vascular tissues.'
    },
    {
      id: 'ch1-tf-3',
      statement: 'Amphibians spend their early larval stage in water breathing with gills and adult life breathing with lungs and moist skin.',
      isTrue: true,
      explanation: 'Tadpoles breathe with gills in water, whereas adult frogs develop lungs and moist skin to live on land and water.'
    },
    {
      id: 'ch1-tf-4',
      statement: 'Spider is classified as an insect because it is small and crawls.',
      isTrue: false,
      explanation: 'False! Spiders are arachnids with 4 pairs (8) legs and 2 body segments, whereas insects have 3 pairs (6) legs and 3 body parts.'
    }
  ],
  descriptiveQA: [
    {
      id: 'ch1-qa-1',
      category: 'definition-short',
      badgeLabel: 'Definition & Short Q',
      question: 'Define classification and state two reasons why scientists classify living things.',
      answer: 'Classification is the systematic grouping of organisms based on shared similarities and differences. Scientists classify living things to make studying millions of species manageable and to understand evolutionary/structural relationships.',
      examKeywords: ['shared similarities', 'systematic grouping', 'biodiversity']
    },
    {
      id: 'ch1-qa-2',
      category: 'give-reason',
      badgeLabel: 'Give Scientific Reason',
      question: 'Why is a bat placed in Class Mammalia instead of Class Aves even though it can fly?',
      answer: 'Bats have hair/fur on their skin (not feathers), external ear pinnae, teeth instead of a beak, give birth to live babies rather than laying hard-shelled eggs, and nourish young with milk from mammary glands.',
      examKeywords: ['hair/fur', 'live birth', 'mammary glands', 'no feathers']
    },
    {
      id: 'ch1-qa-3',
      category: 'structured-long',
      badgeLabel: 'Structured Question',
      question: 'Differentiate completely between Monocot plants and Dicot plants with examples.',
      answer: 'Monocots and dicots differ across four key organs:',
      bulletPoints: [
        'Cotyledons: Monocots have 1 seed leaf (maize, wheat, rice); Dicots have 2 seed leaves (pea, bean, mango, rose).',
        'Leaf Venation: Monocots have parallel veins; Dicots have net-like (reticulate) veins.',
        'Root System: Monocots have fibrous roots; Dicots have a main taproot with lateral branches.',
        'Floral Parts: Monocot petals occur in multiples of 3; Dicot petals occur in multiples of 4 or 5.'
      ],
      examKeywords: ['1 vs 2 cotyledons', 'parallel vs reticulate', 'fibrous vs taproot']
    },
    {
      id: 'ch1-qa-4',
      category: 'problem-solving',
      badgeLabel: 'Scientific Problem Solving',
      question: 'A student discovers two animals near Keenjhar Lake: Animal X has dry scaly skin and lays leathery eggs on sand; Animal Y has moist smooth skin and lays jelly-coated eggs in water. Identify both classes and justify.',
      answer: 'Animal X is a Reptile (dry waterproof scales prevent water loss on land; leathery-shelled eggs survive ashore, e.g., lizard/turtle). Animal Y is an Amphibian (moist permeable skin aids gas exchange; shell-less jelly eggs require water so they do not dry out, e.g., frog/toad).',
      examKeywords: ['Reptile vs Amphibian', 'dry scales vs moist skin', 'leathery vs jelly eggs']
    }
  ]
};

export const STBB_CH2_EXTRAS: StbbChapterExtras = {
  activities: [
    {
      id: 'ch2-act-1',
      activityNumber: 'Activity 1',
      title: 'Observing Bread Mould Growth Under Moist Warm vs. Dry Cold Conditions',
      emoji: '🍞',
      aim: 'Investigate the environmental conditions (moisture and warmth) needed for fungal microorganisms (Rhizopus) to grow on food.',
      materials: ['Two slices of fresh bread', 'Water dropper', 'Two transparent zip-lock bags', 'Magnifying glass', 'Labels'],
      procedure: [
        'Sprinkle a few drops of water on Bread Slice A and seal it inside Bag A in a warm dark cupboard.',
        'Keep Bread Slice B dry and seal it inside Bag B inside a cool refrigerator.',
        'Observe both sealed bags daily for 5–7 days through the plastic using a hand lens without opening the bags!'
      ],
      questions: [
        {
          question: 'Which slice grew fuzzy greenish-black mould first and why?',
          answer: 'Bread Slice A grew mould rapidly because moisture, warmth, darkness, and organic nutrients create ideal conditions for microscopic fungal spores to germinate.'
        },
        {
          question: 'Why must students NEVER open a mouldy zip-lock bag in class?',
          answer: 'Opening the bag releases millions of airborne fungal spores that can trigger allergies, asthma, or respiratory infections if inhaled.'
        }
      ],
      conclusion: 'Microorganisms require warmth and moisture to multiply; refrigeration and dryness preserve food by slowing microbial growth.',
      safetyOrTeacherTip: 'Keep all mould bags sealed tight with tape and dispose of them safely without opening.'
    },
    {
      id: 'ch2-act-2',
      activityNumber: 'Activity 2',
      title: 'Demonstrating Yeast Fermentation with Warm Sugar Water & Balloon',
      emoji: '🎈',
      aim: 'Observe how beneficial yeast microorganisms respire sugar and release carbon dioxide gas used in bread baking.',
      materials: ['Empty plastic bottle', '1 packet dry baker’s yeast', '2 spoons sugar', 'Lukewarm water', 'Balloon'],
      procedure: [
        'Pour lukewarm water and two spoons of sugar into the clean bottle and swirl to dissolve.',
        'Add yeast powder, swirl gently, and stretch a deflated balloon tightly over the bottle neck.',
        'Wait 20–30 minutes in a warm spot and observe froth formation and balloon inflation.'
      ],
      questions: [
        {
          question: 'What gas inflated the balloon and how does this make bread soft and spongy?',
          answer: 'Carbon dioxide (CO2) gas released during yeast fermentation inflates the balloon; in dough, trapped CO2 bubbles expand during baking to make bread light and fluffy.'
        }
      ],
      conclusion: 'Yeast is a helpful unicellular fungus used in bakeries and fermentation industries.'
    },
    {
      id: 'ch2-act-3',
      activityNumber: 'Activity 3',
      title: 'Handwashing Hygiene & Glitter Germ Transmission Demonstration',
      emoji: '🧼',
      aim: 'Model how invisible pathogens spread via unwashed hands and prove why soap + 20 seconds of scrubbing breaks transmission.',
      materials: [' washable glitter or turmeric powder mixed with lotion', 'Plain water bowl', 'Soap & clean running water', 'Paper towels'],
      procedure: [
        'Rub a tiny amount of glitter lotion ("germs") onto one student’s palm and shake hands with three classmates.',
        'Inspect how "germs" transferred onto hands, pencils, and doorknobs!',
        'Compare rinsing briefly with plain cold water versus scrubbing thoroughly with soap and running water for 20 seconds.'
      ],
      questions: [
        {
          question: 'Why did rinsing only with plain water leave glitter behind whereas soap removed it completely?',
          answer: 'Oils on skin trap microbes; soap molecules lift oils, dirt, and germs off skin and disrupt many lipid envelopes so water washes microbes away.'
        }
      ],
      conclusion: 'Washing hands with soap before meals and after using the toilet prevents cholera, typhoid, flu, and diarrhoea.'
    }
  ],
  fillInBlanks: [
    {
      id: 'ch2-fib-1',
      promptWithBlank: 'Organisms too small to be seen with the naked eye without a microscope are called __________.',
      answer: 'microorganisms',
      acceptedVariants: ['microbes'],
      explanation: 'Microorganisms (viruses, bacteria, microscopic fungi) require a microscope to observe.'
    },
    {
      id: 'ch2-fib-2',
      promptWithBlank: 'Milk is converted into yogurt (curd) by beneficial __________.',
      answer: 'bacteria',
      acceptedVariants: ['lactobacillus'],
      explanation: 'Beneficial bacteria (Lactobacillus) ferment milk sugar into lactic acid, thickening milk into yogurt.'
    },
    {
      id: 'ch2-fib-3',
      promptWithBlank: 'Malaria and dengue are spread through the bite of infected __________.',
      answer: 'mosquitoes',
      acceptedVariants: ['mosquito'],
      explanation: 'Female Anopheles mosquitoes transmit malaria and Aedes mosquitoes transmit dengue virus.'
    },
    {
      id: 'ch2-fib-4',
      promptWithBlank: 'The first antibiotic, penicillin, was discovered from a __________.',
      answer: 'fungus',
      acceptedVariants: ['mould', 'penicillium'],
      explanation: 'Penicillin is produced from the microscopic fungus Penicillium and kills harmful bacteria.'
    }
  ],
  trueFalse: [
    {
      id: 'ch2-tf-1',
      statement: 'All microorganisms are harmful germs that cause diseases.',
      isTrue: false,
      explanation: 'False! Many microorganisms are essential helpers that decompose waste, make yogurt/bread/cheese, fix soil nitrogen, and produce antibiotics.'
    },
    {
      id: 'ch2-tf-2',
      statement: 'Viruses can reproduce only inside the living cells of a host organism.',
      isTrue: true,
      explanation: 'True! Viruses are non-cellular borderline particles that hijack living plant, animal, or bacterial host cells to replicate.'
    },
    {
      id: 'ch2-tf-3',
      statement: 'Boiling drinking water helps kill waterborne pathogens like cholera and typhoid bacteria.',
      isTrue: true,
      explanation: 'True! Boiling water kills harmful bacteria, viruses, and parasites, making water safe to drink.'
    },
    {
      id: 'ch2-tf-4',
      statement: 'Antibiotics cure viral illnesses such as the common cold, influenza, and polio.',
      isTrue: false,
      explanation: 'False! Antibiotics work ONLY against bacteria; viral diseases are prevented by vaccines and hygiene, not antibiotics.'
    }
  ],
  descriptiveQA: [
    {
      id: 'ch2-qa-1',
      category: 'definition-short',
      badgeLabel: 'Definition & Short Q',
      question: 'What are decomposers and what would happen to Earth without them?',
      answer: 'Decomposers are bacteria and fungi that break down dead plants, animals, and organic waste into simple mineral nutrients returned to soil. Without decomposers, dead bodies and garbage would pile up endlessly and soil would run out of nutrients for plants.',
      examKeywords: ['bacteria and fungi', 'nutrient recycling', 'soil fertility']
    },
    {
      id: 'ch2-qa-2',
      category: 'give-reason',
      badgeLabel: 'Give Scientific Reason',
      question: 'Why does cooked food spoil faster in summer than in winter if left outside the refrigerator?',
      answer: 'Warm summer temperatures (25–38°C) speed up bacterial and fungal microbial activity and reproduction, causing rapid souring and rot, whereas cool temperatures slow down microbial multiplication.',
      examKeywords: ['warmth accelerates growth', 'rapid bacterial division', 'refrigeration slows enzymes']
    },
    {
      id: 'ch2-qa-3',
      category: 'structured-long',
      badgeLabel: 'Structured Question',
      question: 'Describe four major ways infectious diseases enter the human body and list one preventive measure for each.',
      answer: 'Pathogens enter the human body via four primary transmission routes:',
      bulletPoints: [
        'Through Air (Droplets): Coughing/sneezing spreads flu, COVID-19, tuberculosis -> Cover mouth/nose with tissue or elbow and wear masks.',
        'Through Contaminated Water & Food: Flies and sewage spread cholera, typhoid, hepatitis A -> Boil water, cover food, wash hands with soap.',
        'Through Insect Vectors: Mosquito bites spread dengue and malaria -> Eliminate stagnant water, use mosquito nets/repellents.',
        'Through Direct Contact / Cuts: Open wounds allow tetanus bacteria entry -> Clean wounds with antiseptic and keep vaccinations updated.'
      ],
      examKeywords: ['airborne', 'waterborne', 'vectors', 'direct contact', 'vaccination']
    },
    {
      id: 'ch2-qa-4',
      category: 'problem-solving',
      badgeLabel: 'Scientific Problem Solving',
      question: 'After monsoon rains in Sindh, stagnant water puddles collect around a village and several children develop high fever. Explain the likely hazard and design a 3-step school action plan.',
      answer: 'Stagnant rainwater pools serve as breeding grounds for Aedes and Anopheles mosquitoes (transmitting dengue and malaria) while flood run-off contaminates drinking water with cholera/typhoid bacteria. 3-Step Plan: (1) Drain/fill stagnant puddles and sleep under mosquito nets, (2) Boil all drinking water for at least 1–3 minutes, and (3) Enforce soap handwashing before eating and cover all cooked meals from flies.',
      examKeywords: ['stagnant water', 'mosquito breeding', 'boil drinking water']
    }
  ]
};

export const STBB_CH3_EXTRAS: StbbChapterExtras = {
  activities: [
    {
      id: 'ch3-act-1',
      activityNumber: 'Activity 1',
      title: 'Dissecting Bean & Maize Seeds + 20-Day Glass Jar Germination Study',
      emoji: '🌱',
      aim: 'Examine internal structures of dicot (French bean) and monocot (maize) seeds and track root/shoot emergence over 20 days.',
      materials: ['Dry & overnight pre-soaked French bean seeds', 'Dry & pre-soaked maize grains', 'Hand lens', 'Safety blade (teacher-supervised)', 'Transparent glasses', 'Tissue paper & water'],
      procedure: [
        'Inspect dry bean and maize seeds with a hand lens to locate the seed coat and tiny micropyle pore.',
        'Peel the soaked bean seed coat and gently split its two fleshy cotyledons open to observe the baby embryo.',
        'Slice a soaked maize grain longitudinally (lengthwise) with a blade to distinguish its single cotyledon, embryo, and starchy endosperm.',
        'Line transparent glasses with wet tissue paper, place bean and maize seeds in different orientations (upright, sideways, inverted) between glass and tissue, and log daily measurements/sketches for 20 days.'
      ],
      questions: [
        {
          question: 'Which structure emerged FIRST from every germinating seed regardless of seed orientation?',
          answer: 'The embryonic root (radicle) always emerged first and curved downward toward gravity to anchor the seedling and absorb water!'
        },
        {
          question: 'How did the French bean cotyledons behave differently from the maize cotyledon over the 20 days?',
          answer: 'French bean hypocotyl arched above the tissue/soil pulling BOTH cotyledons up into light (epigeal), whereas maize sent up a straight coleoptile sheath while its single cotyledon remained below (hypogeal).'
        }
      ],
      conclusion: 'Dicot French beans undergo epigeal germination with 2 food-storing cotyledons, while monocot maize undergoes hypogeal germination with 1 nutrient-transferring cotyledon and an endosperm.',
      safetyOrTeacherTip: 'Only the teacher should perform longitudinal blade cuts on maize grains.'
    },
    {
      id: 'ch3-act-2',
      activityNumber: 'Activity 2',
      title: 'Four-Jar Controlled Investigation of Germination Conditions (Jars 1A–4D)',
      emoji: '🫙',
      aim: 'Prove experimentally that water, oxygen (air), and suitable temperature are all essential simultaneously for seed germination.',
      materials: ['4 identical labelled glass jars (1A, 2B, 3C, 4D)', 'Healthy bean/gram seeds', 'Cotton wool', 'Tap water', 'Boiled cooled water + cooking oil', 'Refrigerator'],
      procedure: [
        'Jar 1A (Control): Place seeds on moist cotton in a room with fresh air and normal warmth (16–24°C).',
        'Jar 2B (No Water): Place seeds on completely dry cotton at room temperature with air.',
        'Jar 3C (Low Temperature): Place seeds on moist cotton with air inside a cold refrigerator.',
        'Jar 4D (No Oxygen): Submerge seeds in boiled cooled water (dissolved air removed) and pour a layer of oil on top to block atmospheric oxygen.',
        'Compare all four jars daily for 5–7 days.'
      ],
      observationTable: {
        headers: ['Jar Label', 'Water', 'Oxygen (Air)', 'Warmth (16–24°C)', 'Observed Outcome'],
        rows: [
          ['Jar 1A (Control)', 'Present', 'Present', 'Present', 'Seeds swell & GERMINATE normally!'],
          ['Jar 2B', 'Absent (Dry)', 'Present', 'Present', 'NO germination (seeds stay dormant)'],
          ['Jar 3C', 'Present', 'Present', 'Absent (Fridge)', 'NO germination (too cold for enzymes)'],
          ['Jar 4D', 'Present', 'Absent (Boiled + Oil)', 'Present', 'NO germination (no oxygen for respiration)']
        ]
      },
      questions: [
        {
          question: 'Why was boiled cooled water covered with a layer of oil in Jar 4D?',
          answer: 'Boiling drives dissolved oxygen out of water, Cooling prevents cooking the embryo, and the floating oil layer seals the surface so no fresh air can dissolve back into the water!'
        }
      ],
      conclusion: 'A viable seed germinates ONLY when water, oxygen, and suitable temperature are all present together (Jar 1A).'
    }
  ],
  fillInBlanks: [
    {
      id: 'ch3-fib-1',
      promptWithBlank: 'The tiny pore in a seed coat through which water enters the seed is called the __________.',
      answer: 'micropyle',
      explanation: 'Water enters through the micropyle causing internal tissues to swell and rupture the seed coat.'
    },
    {
      id: 'ch3-fib-2',
      promptWithBlank: 'In a maize seed, food is stored inside a tissue called the __________.',
      answer: 'endosperm',
      explanation: 'Unlike French bean (which stores food in 2 cotyledons), maize stores food in the endosperm and uses its single cotyledon to transfer nutrients to the embryo.'
    },
    {
      id: 'ch3-fib-3',
      promptWithBlank: 'French bean shows __________ germination in which cotyledons rise above the soil.',
      answer: 'epigeal',
      acceptedVariants: ['epigeal germination'],
      hint: 'Think of cotyledons emerging above the soil. Pea and chickpea usually show hypogeal germination, unlike French bean.',
      explanation: 'STBB Class 5 Chapter 3 explicitly notes that French beans bring cotyledons above ground via the hook-like hypocotyl.'
    },
    {
      id: 'ch3-fib-4',
      promptWithBlank: 'Most seeds germinate best within a temperature range of __________ °C.',
      answer: '16–24',
      acceptedVariants: ['16-24', '16 to 24'],
      explanation: 'Most seeds require 16–24°C, whereas cool-season seeds like radish and spinach can germinate at 2–4°C.'
    }
  ],
  trueFalse: [
    {
      id: 'ch3-tf-1',
      statement: 'During germination, the embryonic stem emerges out of the seed before the root.',
      isTrue: false,
      explanation: 'False! The embryonic root (radicle) ALWAYS emerges downward first so the baby seedling is anchored and supplied with water.'
    },
    {
      id: 'ch3-tf-2',
      statement: 'A germinating seed depends on food stored in its cotyledons or endosperm until its first green leaves begin photosynthesis.',
      isTrue: true,
      explanation: 'True! Underground seeds cannot photosynthesize initially and rely on stored food reserves broken down via respiration.'
    },
    {
      id: 'ch3-tf-3',
      statement: 'Seeds submerged under boiled cooled water sealed with oil fail to germinate because they lack water.',
      isTrue: false,
      explanation: 'False! Jar 4D has plenty of water — it fails because boiling removes dissolved oxygen and oil blocks air entry.'
    },
    {
      id: 'ch3-tf-4',
      statement: 'Radish and spinach seeds can germinate at much colder temperatures (2–4°C) than most warm-season seeds.',
      isTrue: true,
      explanation: 'True! STBB specifies 2–4°C for cool-crop seeds like radish and spinach compared with 16–24°C for most seeds.'
    }
  ],
  descriptiveQA: [
    {
      id: 'ch3-qa-1',
      category: 'definition-short',
      badgeLabel: 'Definition & Short Q',
      question: 'State four important functions of cotyledons in seeds.',
      answer: 'Cotyledons store food (as in beans) or transfer food from the endosperm to the growing embryo (as in maize), supply respiratory energy during germination, turn green above soil to carry out early photosynthesis in epigeal seedlings before shrivelling, and serve as nutritious protein-rich food for humans (beans, lentils, chickpeas).',
      examKeywords: ['store/transfer food', 'energy supply', 'early photosynthesis', 'human food']
    },
    {
      id: 'ch3-qa-2',
      category: 'give-reason',
      badgeLabel: 'Give Scientific Reason',
      question: 'Why do dry pulses (gram, beans, lentils) stored in kitchen containers for months NOT germinate?',
      answer: 'Kitchen jars contain oxygen and suitable room warmth, and the seeds are alive, but DRY containers lack water! Without water absorption through the micropyle, the hard seed coat stays intact and digestive enzymes remain inactive.',
      examKeywords: ['absence of water', 'inactive enzymes', 'unbroken seed coat']
    },
    {
      id: 'ch3-qa-3',
      category: 'structured-long',
      badgeLabel: 'Structured Question',
      question: 'Compare the germination of a French bean seed with that of a maize seed.',
      answer: 'French bean (dicot) and maize (monocot) follow two contrasting germination patterns:',
      bulletPoints: [
        'Number of Cotyledons: French bean has TWO cotyledons that store food; Maize has ONE cotyledon that transfers food from its endosperm.',
        'Shoot Emergence Mechanism: French bean develops a curved hook-like hypocotyl that pulls cotyledons UP above soil; Maize pushes up a straight pointed sheath called the coleoptile.',
        'Position of Cotyledons: Bean cotyledons emerge above ground (epigeal), turn green briefly, then shrivel and fall off; Maize cotyledon and seed coat stay permanently underground (hypogeal).',
        'Start of Photosynthesis: Bean begins photosynthesis as foliage leaves expand above cotyledons; Maize starts photosynthesis only after true leaves split out of the coleoptile.'
      ],
      examKeywords: ['hypocotyl vs coleoptile', 'above soil vs underground', 'endosperm']
    },
    {
      id: 'ch3-qa-4',
      category: 'problem-solving',
      badgeLabel: 'Scientific Problem Solving',
      question: 'A farmer floods a newly sown wheat field so deeply after heavy rain that water stands stagnant over the soil for a week, and almost no seedlings emerge. Explain scientifically why the seeds died.',
      answer: 'Waterlogged stagnant water fills every air space between soil particles, cutting off atmospheric OXYGEN to the buried seeds (just like Jar 4D with oil over boiled water!). Deprived of oxygen, embryos cannot sustain normal aerobic respiration and growth; prolonged waterlogging can kill them and encourage rotting.',
      examKeywords: ['waterlogging', 'lack of oxygen', 'cellular respiration blocked']
    }
  ]
};

export const STBB_CH4_EXTRAS: StbbChapterExtras = {
  activities: [
    {
      id: 'ch4-act-1',
      activityNumber: 'Activity 1',
      title: 'Sorting Biodegradable vs. Non-Biodegradable School Waste Investigation',
      emoji: '♻️',
      aim: 'Classify everyday school and kitchen waste materials and test which materials decompose naturally in moist soil.',
      materials: ['Two flowerpots filled with moist garden soil', 'Banana/vegetable peels & waste paper scraps', 'Polythene bag strip & polystyrene cup piece', 'Gloves & wooden sticks', 'Labels'],
      procedure: [
        'Bury fruit/vegetable peels and torn paper pieces inside Pot A ("Organic / Biodegradable") and moisten gently.',
        'Bury a plastic polythene strip and polystyrene foam piece inside Pot B ("Synthetic / Non-Biodegradable") at the same depth.',
        'Stir gently and inspect both pots after 2–3 weeks wearing protective gloves.'
      ],
      questions: [
        {
          question: 'What difference might you observe between Pot A and Pot B after three weeks?',
          answer: 'Pot A should show more decay, depending on moisture, temperature and material; paper and peels need not fully decompose in three weeks. Pot B should show little visible change. Record actual results.'
        }
      ],
      conclusion: 'Biodegradable materials are recycled naturally by microorganisms, whereas non-biodegradable plastics persist for centuries and clog soil and drains.'
    },
    {
      id: 'ch4-act-2',
      activityNumber: 'Activity 2',
      title: 'School & Community Environmental Pollution Awareness Campaign',
      emoji: '📢',
      aim: 'Survey local neighborhood pollution hazards, document 3 major problems, present cause-effect posters, and sign a community action petition.',
      materials: ['Survey clipboard & camera/sketchbook', 'Large chart paper & markers', 'Petition pledge sheet'],
      procedure: [
        'Step 1 (Team Survey): Walk around your street/school perimeter with your teacher/team and observe air, water, and land pollution sources.',
        'Step 2 (Document 3 Major Problems): Draw or photograph the THREE biggest local environmental problems (e.g., open garbage burning, choked plastic gutters, smoky rickshaws/vehicles).',
        'Step 3 (Cause & Effect Poster): Create a bold visual chart linking each local source -> pollutant -> human/animal health harm -> practical solution.',
        'Step 4 (Share Publicly): Present your poster at morning school assembly and a neighborhood community gathering.',
        'Step 5 (Action Petition): Collect student, teacher, and parent signatures pledging cloth bags, zero littering, and zero trash burning.'
      ],
      questions: [
        {
          question: 'Why does burning plastic trash in street corners worsen pollution instead of solving solid waste?',
          answer: 'Burning plastics and polystyrene releases poisonous dioxins, carbon monoxide, and soot directly into breathing air, converting land waste into severe toxic air pollution!'
        }
      ],
      conclusion: 'Collective civic action — Refusing single-use plastics, Reusing, Recycling, and community education — protects air, water, and soil health.'
    }
  ],
  fillInBlanks: [
    {
      id: 'ch4-fib-1',
      promptWithBlank: 'Harmful substances produced mainly by human activities that contaminate the environment are called __________.',
      answer: 'pollutants',
      acceptedVariants: ['pollutant'],
      explanation: 'Pollution is the harmful undesirable change; pollutants are the actual substances causing it (smoke, sewage, plastic bags).'
    },
    {
      id: 'ch4-fib-2',
      promptWithBlank: 'According to the STBB textbook fact box, __________ ranked 5th among the top 6 most polluted cities in the world.',
      answer: 'Karachi',
      explanation: 'Karachi was highlighted at 5th among the top 6 most polluted cities due to heavy traffic emissions and particulate matter.'
    },
    {
      id: 'ch4-fib-3',
      promptWithBlank: 'Materials that can easily be broken down by natural microorganisms are called __________ materials.',
      answer: 'biodegradable',
      explanation: 'Vegetable peels, fruit scraps, paper, and animal waste decompose naturally into harmless soil humus.'
    },
    {
      id: 'ch4-fib-4',
      promptWithBlank: 'The STBB chapter quotes an estimate of __________ seabirds killed by plastic each year.',
      answer: '1,000,000',
      acceptedVariants: ['1000000', 'one million', '1 million'],
      explanation: 'The supplied STBB material attributes these annual estimates to UNEP: 1,000,000 seabirds and 100,000 marine mammals/turtles. These are textbook estimates, not a current census.'
    }
  ],
  trueFalse: [
    {
      id: 'ch4-tf-1',
      statement: 'Cholera, typhoid, and diarrhoea are caused mainly by breathing polluted air.',
      isTrue: false,
      explanation: 'False! Cholera, typhoid, and diarrhoea are WATERBORNE digestive tract diseases caused by drinking sewage-contaminated water.'
    },
    {
      id: 'ch4-tf-2',
      statement: 'Clean plastic bottles and jars should only be reused at home for storing non-eatable items.',
      isTrue: true,
      explanation: 'True! STBB advises reusing plastic containers strictly for non-eatables and never heating food in plastic/polystyrene because toxic chemicals leach out.'
    },
    {
      id: 'ch4-tf-3',
      statement: 'Polythene bags thrown into streets choke underground drains and cause dirty gutter water overflow and flooding.',
      isTrue: true,
      explanation: 'True! Non-biodegradable plastic bags block sewer pipes and storm drains across cities.'
    },
    {
      id: 'ch4-tf-4',
      statement: 'Burning waste paper, trash, and plastic bags in the backyard is an eco-friendly way to clean land.',
      isTrue: false,
      explanation: 'False! Burning trash releases poisonous gases, particulate soot, and smog that cause asthma, sore throat, and lung diseases.'
    }
  ],
  descriptiveQA: [
    {
      id: 'ch4-qa-1',
      category: 'definition-short',
      badgeLabel: 'Definition & Short Q',
      question: 'Differentiate clearly between Pollution and Pollutants with two examples of each.',
      answer: 'Pollution is any undesirable and harmful change in the physical, chemical, or biological state of air, water, or land that harms human health and living organisms (e.g., urban smog, sewage contamination of rivers). Pollutants are the specific harmful substances released largely by human activities that cause pollution (e.g., vehicle exhaust smoke, polythene plastic bags, chemical pesticides).',
      examKeywords: ['undesirable harmful change', 'harmful substances', 'smoke & plastic bags']
    },
    {
      id: 'ch4-qa-2',
      category: 'give-reason',
      badgeLabel: 'Give Scientific Reason',
      question: 'Why must food and hot tea NEVER be heated or served in thin polythene bags or polystyrene foam cups?',
      answer: 'Heat causes non-biodegradable plastics and polystyrene to leach toxic chemical compounds directly into hot food/drinks and release poisonous fumes, increasing long-term poisoning and disease risks.',
      examKeywords: ['toxic chemical leaching', 'heat releases poisons', 'non-biodegradable']
    },
    {
      id: 'ch4-qa-3',
      category: 'structured-long',
      badgeLabel: 'Structured Question',
      question: 'State the main sources and harmful health effects of Air Pollution, Water Pollution, and Land Pollution.',
      answer: 'All three forms of environmental pollution originate from distinct human sources and cause serious harm:',
      bulletPoints: [
        'Air Pollution — Sources: Smoke (solid, liquid & gaseous particles) from burning coal, oil, natural gas, waste paper & trash in factories, vehicles, and homes. Effects: Headache, eye/nose irritation, sore throat, nausea, asthma, drowsiness, weakened judgment, pneumonia, and lung cancer.',
        'Water Pollution — Sources: Untreated domestic washing/toilet sewage, untreated industrial chemical effluents, agricultural pesticides & fertilizers. Effects: Cholera, typhoid, diarrhoea in humans; death of fish/aquatic plants, immune suppression, reproductive failure, acute poisoning.',
        'Land Pollution — Sources: Open dumping of plastic bags, bottles, glass, tin cans, food scraps, and animal wastes. Effects: Breeding pests/germs and toxic chemicals seeping underground to pollute groundwater and surrounding air.'
      ],
      examKeywords: ['smoke', 'untreated sewage', 'cholera & typhoid', 'asthma & lung cancer', 'groundwater seepage']
    },
    {
      id: 'ch4-qa-4',
      category: 'problem-solving',
      badgeLabel: 'Scientific Problem Solving',
      question: 'Your neighborhood market hands out hundreds of thin plastic shopping bags daily, choking the street drain every monsoon. Propose four practical STBB-aligned solutions.',
      answer: 'Four immediate solutions: (1) Carry reusable stitched cloth or jute shopping bags from home ("Refuse single-use plastic"), (2) Separate kitchen peels for composting from dry recyclable paper/metal/glass, (3) Reuse existing clean plastic containers strictly for non-eatables instead of throwing them into streets, and (4) Organize a school/shopkeeper awareness petition banning open dumping into storm drains.',
      examKeywords: ['cloth/jute bags', 'segregate biodegradable waste', 'protect storm drains']
    }
  ]
};
