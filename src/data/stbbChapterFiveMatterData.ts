import type { StbbChapterConfig } from './stbbChapterTwoMicroorganismsData';

export const STBB_CHAPTER_5_CONFIG: StbbChapterConfig = {
  "id": "ch5-matter-states",
  "chapterNumber": 5,
  "shortNavLabel": "Ch 5: Matter & States",
  "navEmoji": "🧊",
  "isFeaturedNew": true,
  "boardBadge": "STBB Sindh Textbook Board · Class 5 Science",
  "syllabusBadge": "Sukkur IBA STS PST & JEST Syllabus Aligned",
  "heroTitle": "Chapter 5: Matter and Changes in Its States",
  "heroDescription": "Explore explanations, particle / force models, classroom investigations and all-type solved review questions. Practise with 40 MCQs and a timed mock exam.",
  "quickMetrics": [
    {
      "icon": "book",
      "label": "8 Topic Deep-Dives"
    },
    {
      "icon": "check",
      "label": "40 Solved MCQs"
    },
    {
      "icon": "compass",
      "label": "7 Activity Guides"
    },
    {
      "icon": "sparkles",
      "label": "All-Type Questions & Answers"
    }
  ],
  "tabs": {
    "topicsLabel": "Interactive Topics",
    "toolLabel": "State Detective",
    "mcqsLabel": "40 Solved MCQs",
    "summaryLabel": "Key Concepts & Tables",
    "activitiesLabel": "Activities",
    "qaLabel": "Questions & Answers"
  },
  "sidebarHeading": "Chapter Topics",
  "decisionTool": {
    "badge": "Interactive Decision Lab",
    "title": "State & Moisture Detective",
    "subtitle": "Choose a sample, read its clue, then answer yes/no using the evidence.",
    "totalSteps": 5,
    "samplePromptLabel": "Try a scenario",
    "enableRandomMystery": true,
    "specimens": [
      {
        "id": "sample-1",
        "name": "SOLID",
        "emoji": "🔬",
        "targetGroup": "SOLID",
        "clue": "A stone keeps its shape; close particles vibrate.",
        "expectedPath": "Yes"
      },
      {
        "id": "sample-2",
        "name": "LIQUID",
        "emoji": "🔬",
        "targetGroup": "LIQUID",
        "clue": "Water flows and retains volume.",
        "expectedPath": "No → Yes"
      },
      {
        "id": "sample-3",
        "name": "GAS",
        "emoji": "🔬",
        "targetGroup": "GAS",
        "clue": "Air particles move freely with large spaces.",
        "expectedPath": "No → No → Yes"
      },
      {
        "id": "sample-4",
        "name": "DEW / CONDENSATION",
        "emoji": "🔬",
        "targetGroup": "DEW / CONDENSATION",
        "clue": "Vapour cools and forms liquid drops.",
        "expectedPath": "No → No → No → Yes"
      },
      {
        "id": "sample-5",
        "name": "FROST / DEPOSITION",
        "emoji": "🔬",
        "targetGroup": "FROST / DEPOSITION",
        "clue": "Vapour becomes surface ice without a liquid stage.",
        "expectedPath": "No → No → No → No → Yes"
      }
    ],
    "nodes": [
      {
        "id": 1,
        "question": "Does it keep its own shape and volume?",
        "onYes": {
          "type": "result",
          "shortCode": "1: Yes",
          "result": {
            "group": "SOLID",
            "emoji": "🔬",
            "sizeRank": "Evidence-based identification",
            "keyTrait": "A stone keeps its shape; close particles vibrate.",
            "examples": "A stone keeps its shape; close particles vibrate."
          }
        },
        "onNo": {
          "type": "next",
          "nextNodeId": 2,
          "shortCode": "1: No"
        }
      },
      {
        "id": 2,
        "question": "Does it keep volume but take the container shape?",
        "onYes": {
          "type": "result",
          "shortCode": "2: Yes",
          "result": {
            "group": "LIQUID",
            "emoji": "🔬",
            "sizeRank": "Evidence-based identification",
            "keyTrait": "Water flows and retains volume.",
            "examples": "Water flows and retains volume."
          }
        },
        "onNo": {
          "type": "next",
          "nextNodeId": 3,
          "shortCode": "2: No"
        }
      },
      {
        "id": 3,
        "question": "Does it spread to fill its whole container?",
        "onYes": {
          "type": "result",
          "shortCode": "3: Yes",
          "result": {
            "group": "GAS",
            "emoji": "🔬",
            "sizeRank": "Evidence-based identification",
            "keyTrait": "Air particles move freely with large spaces.",
            "examples": "Air particles move freely with large spaces."
          }
        },
        "onNo": {
          "type": "next",
          "nextNodeId": 4,
          "shortCode": "3: No"
        }
      },
      {
        "id": 4,
        "question": "Is it liquid water forming on a cool surface?",
        "onYes": {
          "type": "result",
          "shortCode": "4: Yes",
          "result": {
            "group": "DEW / CONDENSATION",
            "emoji": "🔬",
            "sizeRank": "Evidence-based identification",
            "keyTrait": "Vapour cools and forms liquid drops.",
            "examples": "Vapour cools and forms liquid drops."
          }
        },
        "onNo": {
          "type": "next",
          "nextNodeId": 5,
          "shortCode": "4: No"
        }
      },
      {
        "id": 5,
        "question": "Is it ice growing directly on a freezing surface?",
        "onYes": {
          "type": "result",
          "shortCode": "5: Yes",
          "result": {
            "group": "FROST / DEPOSITION",
            "emoji": "🔬",
            "sizeRank": "Evidence-based identification",
            "keyTrait": "Vapour becomes surface ice without a liquid stage.",
            "examples": "Vapour becomes surface ice without a liquid stage."
          }
        },
        "onNo": {
          "type": "recheck",
          "shortCode": "Recheck",
          "message": "Your observations do not yet match these cases. Reset and inspect the sample or scenario again."
        }
      }
    ]
  },
  "mcqSections": [
    {
      "id": "All",
      "label": "All (40)"
    },
    {
      "id": "A",
      "label": "Section A"
    },
    {
      "id": "B",
      "label": "Section B"
    },
    {
      "id": "C",
      "label": "Section C"
    },
    {
      "id": "D",
      "label": "Section D"
    }
  ],
  "topics": [
    {
      "id": 1,
      "slug": "matter-and-learning-objectives",
      "title": "Topic 1: Matter & Learning Objectives",
      "shortExplanation": "Matter is anything that has mass and occupies space. Solids, liquids, and gases are matter.",
      "keyCharacteristics": {
        "points": [
          "Matter is anything that has mass and occupies space. Solids, liquids, and gases are matter.",
          "Matter consists of tiny particles: atoms and molecules. Their arrangement and movement explain material properties.",
          "Air is matter even though it is usually invisible; an inflated balloon occupies space.",
          "Learning goals: describe and model particle arrangements; investigate heat and particle motion; explain melting, freezing, evaporation and condensation.",
          "Explain the water cycle and identify dew, snow, fog, frost and rain."
        ]
      },
      "deepDiveSections": [
        {
          "title": "Particle / force explanation",
          "emoji": "🔬",
          "points": [
            "Matter consists of tiny particles: atoms and molecules. Their arrangement and movement explain material properties.",
            "Air is matter even though it is usually invisible; an inflated balloon occupies space."
          ]
        },
        {
          "title": "Apply your understanding",
          "emoji": "💡",
          "points": [
            "Learning goals: describe and model particle arrangements; investigate heat and particle motion; explain melting, freezing, evaporation and condensation.",
            "Explain the water cycle and identify dew, snow, fog, frost and rain."
          ]
        }
      ],
      "realWorldExamples": [
        {
          "name": "Everyday connection",
          "emoji": "🏠",
          "description": "A balloon expands when filled with air: air takes up space."
        },
        {
          "name": "Classroom investigation",
          "emoji": "🧪",
          "description": "Predict, observe, record evidence, and explain using the scientific ideas above."
        },
        {
          "name": "Check your model",
          "emoji": "🧠",
          "description": "Explain the water cycle and identify dew, snow, fog, frost and rain."
        }
      ],
      "mnemonic": {
        "acronym": "MS",
        "meaning": "Mass, Space",
        "items": [
          {
            "letter": "M",
            "word": "Mass"
          },
          {
            "letter": "S",
            "word": "Space"
          }
        ]
      },
      "riddle": {
        "prompt": "Which key term fits this clue? A balloon expands when filled with air: air takes up space.",
        "answer": "MATTER",
        "explanation": "Matter is anything that has mass and occupies space. Solids, liquids, and gases are matter."
      },
      "unscrambles": [
        {
          "scrambled": "RETTAM",
          "solution": "MATTER",
          "hint": "Matter & Learning Objectives"
        }
      ],
      "secretCodeActivity": {
        "cipher": "A=1..Z=26",
        "items": [
          {
            "encoded": "13-1-20-20-5-18",
            "answer": "MATTER",
            "sentence": "Matter is anything that has mass and occupies space. Solids, liquids, and gases are matter."
          }
        ]
      },
      "flowchartAscii": "Observe → Predict → Investigate → Explain\nMatter is anything that has mass and occupies space. Solids, liquids, and gases are matter.\n  ↓ Matter consists of tiny particles: atoms and molecules. Their arrangement and movement explain material properties.\n  ↓ Air is matter even though it is usually invisible; an inflated balloon occupies space.",
      "vennDiagram": {
        "leftTitle": "Solid matter",
        "leftPoints": [
          "Stone keeps shape and volume."
        ],
        "middleTitle": "All matter",
        "middlePoints": [
          "Has mass, occupies space, consists of particles."
        ],
        "rightTitle": "Gas matter",
        "rightPoints": [
          "Air spreads to fill its container."
        ]
      }
    },
    {
      "id": 2,
      "slug": "solids,-liquids-and-gases",
      "title": "Topic 2: Solids, Liquids & Gases",
      "shortExplanation": "Three familiar states of matter differ in shape, volume, particle spacing and motion.",
      "keyCharacteristics": {
        "points": [
          "Three familiar states of matter differ in shape, volume, particle spacing and motion.",
          "Solid: close, usually regularly arranged particles vibrate about fixed positions; definite shape and volume; usually high density.",
          "Liquid: close but irregular particles move short distances, rotate and slide past one another; fixed volume, no fixed shape.",
          "Gas: widely separated particles move rapidly in all directions; no fixed shape or volume; expands to fill a container.",
          "Gases have low density and are easily compressed because large spaces exist between particles; liquids and solids are difficult to compress."
        ]
      },
      "deepDiveSections": [
        {
          "title": "Particle / force explanation",
          "emoji": "🔬",
          "points": [
            "Solid: close, usually regularly arranged particles vibrate about fixed positions; definite shape and volume; usually high density.",
            "Liquid: close but irregular particles move short distances, rotate and slide past one another; fixed volume, no fixed shape."
          ]
        },
        {
          "title": "Apply your understanding",
          "emoji": "💡",
          "points": [
            "Gas: widely separated particles move rapidly in all directions; no fixed shape or volume; expands to fill a container.",
            "Gases have low density and are easily compressed because large spaces exist between particles; liquids and solids are difficult to compress."
          ]
        }
      ],
      "realWorldExamples": [
        {
          "name": "Everyday connection",
          "emoji": "🏠",
          "description": "Water takes the shape of a glass, while a stone keeps its shape."
        },
        {
          "name": "Classroom investigation",
          "emoji": "🧪",
          "description": "Predict, observe, record evidence, and explain using the scientific ideas above."
        },
        {
          "name": "Check your model",
          "emoji": "🧠",
          "description": "Gases have low density and are easily compressed because large spaces exist between particles; liquids and solids are difficult to compress."
        }
      ],
      "mnemonic": {
        "acronym": "VSG",
        "meaning": "Vibrate, Slide, Go",
        "items": [
          {
            "letter": "V",
            "word": "Vibrate: solid"
          },
          {
            "letter": "S",
            "word": "Slide: liquid"
          },
          {
            "letter": "G",
            "word": "Go freely: gas"
          }
        ]
      },
      "riddle": {
        "prompt": "Which key term fits this clue? Water takes the shape of a glass, while a stone keeps its shape.",
        "answer": "PARTICLES",
        "explanation": "Three familiar states of matter differ in shape, volume, particle spacing and motion."
      },
      "unscrambles": [
        {
          "scrambled": "SELCITRAP",
          "solution": "PARTICLES",
          "hint": "Solids, Liquids & Gases"
        }
      ],
      "secretCodeActivity": {
        "cipher": "A=1..Z=26",
        "items": [
          {
            "encoded": "16-1-18-20-9-3-12-5-19",
            "answer": "PARTICLES",
            "sentence": "Three familiar states of matter differ in shape, volume, particle spacing and motion."
          }
        ]
      },
      "flowchartAscii": "SOLID           LIQUID           GAS\n● ● ●           ● ●               ●\n● ● ●            ● ● ●                    ●\n● ● ●           ● ●                  ●\nVibrate          Slide            Move freely\nClose, regular   Close, irregular  Large spaces",
      "vennDiagram": {
        "leftTitle": "Solid",
        "leftPoints": [
          "Close, orderly; fixed-position vibration."
        ],
        "middleTitle": "Both have particles",
        "middlePoints": [
          "Particles have mass and are moving."
        ],
        "rightTitle": "Gas",
        "rightPoints": [
          "Far apart, random; free movement."
        ]
      }
    },
    {
      "id": 3,
      "slug": "diffusion-and-particle-models",
      "title": "Topic 3: Diffusion & Particle Models",
      "shortExplanation": "Ink spreads through still water because particles are continually moving and mixing: diffusion.",
      "keyCharacteristics": {
        "points": [
          "Ink spreads through still water because particles are continually moving and mixing: diffusion.",
          "A drop of ink gradually colours the water without stirring; moving water molecules collide with ink particles.",
          "Particles move randomly in all directions, not deliberately toward empty spaces; the net spread is from higher to lower concentration.",
          "Draw solid particles close in orderly rows, liquid particles close in irregular clusters, gas particles far apart.",
          "Beads and role-play are models: real particles are much smaller and do not have intentions or strings."
        ]
      },
      "deepDiveSections": [
        {
          "title": "Particle / force explanation",
          "emoji": "🔬",
          "points": [
            "A drop of ink gradually colours the water without stirring; moving water molecules collide with ink particles.",
            "Particles move randomly in all directions, not deliberately toward empty spaces; the net spread is from higher to lower concentration."
          ]
        },
        {
          "title": "Apply your understanding",
          "emoji": "💡",
          "points": [
            "Draw solid particles close in orderly rows, liquid particles close in irregular clusters, gas particles far apart.",
            "Beads and role-play are models: real particles are much smaller and do not have intentions or strings."
          ]
        }
      ],
      "realWorldExamples": [
        {
          "name": "Everyday connection",
          "emoji": "🏠",
          "description": "A drop of ink slowly colours a glass of water even without a spoon."
        },
        {
          "name": "Classroom investigation",
          "emoji": "🧪",
          "description": "Predict, observe, record evidence, and explain using the scientific ideas above."
        },
        {
          "name": "Check your model",
          "emoji": "🧠",
          "description": "Beads and role-play are models: real particles are much smaller and do not have intentions or strings."
        }
      ],
      "mnemonic": {
        "acronym": "MIX",
        "meaning": "Motion In eXperiments",
        "items": [
          {
            "letter": "M",
            "word": "Moving particles"
          },
          {
            "letter": "I",
            "word": "Ink spreads"
          },
          {
            "letter": "X",
            "word": "eXplain diffusion"
          }
        ]
      },
      "riddle": {
        "prompt": "Which key term fits this clue? A drop of ink slowly colours a glass of water even without a spoon.",
        "answer": "DIFFUSION",
        "explanation": "Ink spreads through still water because particles are continually moving and mixing: diffusion."
      },
      "unscrambles": [
        {
          "scrambled": "NOISUFFID",
          "solution": "DIFFUSION",
          "hint": "Diffusion & Particle Models"
        }
      ],
      "secretCodeActivity": {
        "cipher": "A=1..Z=26",
        "items": [
          {
            "encoded": "4-9-6-6-21-19-9-15-14",
            "answer": "DIFFUSION",
            "sentence": "Ink spreads through still water because particles are continually moving and mixing: diffusion."
          }
        ]
      },
      "flowchartAscii": "Observe → Predict → Investigate → Explain\nInk spreads through still water because particles are continually moving and mixing: diffusion.\n  ↓ A drop of ink gradually colours the water without stirring; moving water molecules collide with ink particles.\n  ↓ Particles move randomly in all directions, not deliberately toward empty spaces; the net spread is from higher to lower concentration.",
      "vennDiagram": {
        "leftTitle": "Solid model",
        "leftPoints": [
          "Dots close in regular rows."
        ],
        "middleTitle": "Models are simplified",
        "middlePoints": [
          "Spacing and arrows show arrangement and motion."
        ],
        "rightTitle": "Liquid model",
        "rightPoints": [
          "Dots close but irregular; arrows show sliding."
        ]
      }
    },
    {
      "id": 4,
      "slug": "heating,-cooling-and-energy",
      "title": "Topic 4: Heating, Cooling & Energy",
      "shortExplanation": "Heating transfers energy into matter; cooling transfers energy out of it.",
      "keyCharacteristics": {
        "points": [
          "Heating transfers energy into matter; cooling transfers energy out of it.",
          "In a solid, added energy increases vibration; during melting, energy helps overcome attractions between particles.",
          "Liquid particles move past one another; gas particles are much farther apart and move freely.",
          "Expansion usually lowers density because the same mass occupies a larger volume. Matter does not lose mass or become lighter simply by changing state in a closed system.",
          "Water is an important exception: ice is less dense than liquid water, so ice floats. During a state change, heating need not raise temperature."
        ]
      },
      "deepDiveSections": [
        {
          "title": "Particle / force explanation",
          "emoji": "🔬",
          "points": [
            "In a solid, added energy increases vibration; during melting, energy helps overcome attractions between particles.",
            "Liquid particles move past one another; gas particles are much farther apart and move freely."
          ]
        },
        {
          "title": "Apply your understanding",
          "emoji": "💡",
          "points": [
            "Expansion usually lowers density because the same mass occupies a larger volume. Matter does not lose mass or become lighter simply by changing state in a closed system.",
            "Water is an important exception: ice is less dense than liquid water, so ice floats. During a state change, heating need not raise temperature."
          ]
        }
      ],
      "realWorldExamples": [
        {
          "name": "Everyday connection",
          "emoji": "🏠",
          "description": "The same sealed quantity of water has the same mass as ice or vapour."
        },
        {
          "name": "Classroom investigation",
          "emoji": "🧪",
          "description": "Predict, observe, record evidence, and explain using the scientific ideas above."
        },
        {
          "name": "Check your model",
          "emoji": "🧠",
          "description": "Water is an important exception: ice is less dense than liquid water, so ice floats. During a state change, heating need not raise temperature."
        }
      ],
      "mnemonic": {
        "acronym": "EMS",
        "meaning": "Energy, Motion, Spacing",
        "items": [
          {
            "letter": "E",
            "word": "Energy transfer"
          },
          {
            "letter": "M",
            "word": "Motion changes"
          },
          {
            "letter": "S",
            "word": "Spacing usually increases"
          }
        ]
      },
      "riddle": {
        "prompt": "Which key term fits this clue? The same sealed quantity of water has the same mass as ice or vapour.",
        "answer": "ENERGY",
        "explanation": "Heating transfers energy into matter; cooling transfers energy out of it."
      },
      "unscrambles": [
        {
          "scrambled": "YGRENE",
          "solution": "ENERGY",
          "hint": "Heating, Cooling & Energy"
        }
      ],
      "secretCodeActivity": {
        "cipher": "A=1..Z=26",
        "items": [
          {
            "encoded": "5-14-5-18-7-25",
            "answer": "ENERGY",
            "sentence": "Heating transfers energy into matter; cooling transfers energy out of it."
          }
        ]
      },
      "flowchartAscii": "Observe → Predict → Investigate → Explain\nHeating transfers energy into matter; cooling transfers energy out of it.\n  ↓ In a solid, added energy increases vibration; during melting, energy helps overcome attractions between particles.\n  ↓ Liquid particles move past one another; gas particles are much farther apart and move freely.",
      "vennDiagram": {
        "leftTitle": "Heating",
        "leftPoints": [
          "Energy enters; motion generally increases."
        ],
        "middleTitle": "State changes conserve mass",
        "middlePoints": [
          "In a closed system, particles are not lost."
        ],
        "rightTitle": "Cooling",
        "rightPoints": [
          "Energy leaves; motion generally decreases."
        ]
      }
    },
    {
      "id": 5,
      "slug": "melting,-freezing,-evaporation-and-condensation",
      "title": "Topic 5: Melting, Freezing, Evaporation & Condensation",
      "shortExplanation": "State changes are physical changes caused by energy transfer; water remains water.",
      "keyCharacteristics": {
        "points": [
          "State changes are physical changes caused by energy transfer; water remains water.",
          "Melting: solid → liquid, absorbs heat. Freezing: liquid → solid, releases heat.",
          "Evaporation: liquid → gas at the surface, possible below boiling point; absorbs energy.",
          "Boiling occurs throughout a liquid at its boiling point (about 100°C for water at ordinary sea-level pressure).",
          "Condensation: gas → liquid, releases heat. Water vapour is invisible; the visible mist near a kettle consists of tiny liquid droplets."
        ]
      },
      "deepDiveSections": [
        {
          "title": "Particle / force explanation",
          "emoji": "🔬",
          "points": [
            "Melting: solid → liquid, absorbs heat. Freezing: liquid → solid, releases heat.",
            "Evaporation: liquid → gas at the surface, possible below boiling point; absorbs energy."
          ]
        },
        {
          "title": "Apply your understanding",
          "emoji": "💡",
          "points": [
            "Boiling occurs throughout a liquid at its boiling point (about 100°C for water at ordinary sea-level pressure).",
            "Condensation: gas → liquid, releases heat. Water vapour is invisible; the visible mist near a kettle consists of tiny liquid droplets."
          ]
        }
      ],
      "realWorldExamples": [
        {
          "name": "Everyday connection",
          "emoji": "🏠",
          "description": "An ice cube melts on a warm plate; droplets form outside a cold glass."
        },
        {
          "name": "Classroom investigation",
          "emoji": "🧪",
          "description": "Predict, observe, record evidence, and explain using the scientific ideas above."
        },
        {
          "name": "Check your model",
          "emoji": "🧠",
          "description": "Condensation: gas → liquid, releases heat. Water vapour is invisible; the visible mist near a kettle consists of tiny liquid droplets."
        }
      ],
      "mnemonic": {
        "acronym": "MEFC",
        "meaning": "Melt and Evaporate Feel heat; Freeze and Condense release it",
        "items": [
          {
            "letter": "M",
            "word": "Melting absorbs"
          },
          {
            "letter": "E",
            "word": "Evaporation absorbs"
          },
          {
            "letter": "F",
            "word": "Freezing releases"
          },
          {
            "letter": "C",
            "word": "Condensation releases"
          }
        ]
      },
      "riddle": {
        "prompt": "Which key term fits this clue? An ice cube melts on a warm plate; droplets form outside a cold glass.",
        "answer": "MELTING",
        "explanation": "State changes are physical changes caused by energy transfer; water remains water."
      },
      "unscrambles": [
        {
          "scrambled": "GNITLEM",
          "solution": "MELTING",
          "hint": "Melting, Freezing, Evaporation & Condensation"
        }
      ],
      "secretCodeActivity": {
        "cipher": "A=1..Z=26",
        "items": [
          {
            "encoded": "13-5-12-20-9-14-7",
            "answer": "MELTING",
            "sentence": "State changes are physical changes caused by energy transfer; water remains water."
          }
        ]
      },
      "flowchartAscii": "SOLID --melting / absorbs heat--> LIQUID\nSOLID <--freezing / releases heat-- LIQUID\nLIQUID --evaporation / absorbs heat--> GAS\nLIQUID <--condensation / releases heat-- GAS",
      "vennDiagram": {
        "leftTitle": "Melting / evaporation",
        "leftPoints": [
          "Absorb energy; solid → liquid or liquid → gas."
        ],
        "middleTitle": "Physical changes",
        "middlePoints": [
          "Water molecules remain water molecules."
        ],
        "rightTitle": "Freezing / condensation",
        "rightPoints": [
          "Release energy; liquid → solid or gas → liquid."
        ]
      }
    },
    {
      "id": 6,
      "slug": "water-cycle:-a-molecule’s-journey",
      "title": "Topic 6: Water Cycle: A Molecule’s Journey",
      "shortExplanation": "The Sun powers evaporation; cooling causes condensation; precipitation returns water to Earth.",
      "keyCharacteristics": {
        "points": [
          "The Sun powers evaporation; cooling causes condensation; precipitation returns water to Earth.",
          "Water molecule: “Sunlight gave me energy at the sea; I evaporated into invisible vapour and rose with air.”",
          "Student: “How did you become a cloud?” Molecule: “Cooling condensed us into tiny droplets or ice crystals.”",
          "Molecule: “I fell as rain or snow, flowed as runoff or soaked into soil as groundwater, and eventually returned to rivers and sea.”",
          "The cycle transports water and energy. Evaporation leaves many dissolved impurities behind, but rainwater can become contaminated and is not automatically safe to drink."
        ]
      },
      "deepDiveSections": [
        {
          "title": "Particle / force explanation",
          "emoji": "🔬",
          "points": [
            "Water molecule: “Sunlight gave me energy at the sea; I evaporated into invisible vapour and rose with air.”",
            "Student: “How did you become a cloud?” Molecule: “Cooling condensed us into tiny droplets or ice crystals.”"
          ]
        },
        {
          "title": "Apply your understanding",
          "emoji": "💡",
          "points": [
            "Molecule: “I fell as rain or snow, flowed as runoff or soaked into soil as groundwater, and eventually returned to rivers and sea.”",
            "The cycle transports water and energy. Evaporation leaves many dissolved impurities behind, but rainwater can become contaminated and is not automatically safe to drink."
          ]
        }
      ],
      "realWorldExamples": [
        {
          "name": "Everyday connection",
          "emoji": "🏠",
          "description": "A puddle disappears into the air and later water returns as rain."
        },
        {
          "name": "Classroom investigation",
          "emoji": "🧪",
          "description": "Predict, observe, record evidence, and explain using the scientific ideas above."
        },
        {
          "name": "Check your model",
          "emoji": "🧠",
          "description": "The cycle transports water and energy. Evaporation leaves many dissolved impurities behind, but rainwater can become contaminated and is not automatically safe to drink."
        }
      ],
      "mnemonic": {
        "acronym": "ECPI",
        "meaning": "Evaporation, Condensation, Precipitation, Infiltration",
        "items": [
          {
            "letter": "E",
            "word": "Evaporation"
          },
          {
            "letter": "C",
            "word": "Condensation"
          },
          {
            "letter": "P",
            "word": "Precipitation"
          },
          {
            "letter": "I",
            "word": "Infiltration"
          }
        ]
      },
      "riddle": {
        "prompt": "Which key term fits this clue? A puddle disappears into the air and later water returns as rain.",
        "answer": "CYCLE",
        "explanation": "The Sun powers evaporation; cooling causes condensation; precipitation returns water to Earth."
      },
      "unscrambles": [
        {
          "scrambled": "ELCYC",
          "solution": "CYCLE",
          "hint": "Water Cycle: A Molecule’s Journey"
        }
      ],
      "secretCodeActivity": {
        "cipher": "A=1..Z=26",
        "items": [
          {
            "encoded": "3-25-3-12-5",
            "answer": "CYCLE",
            "sentence": "The Sun powers evaporation; cooling causes condensation; precipitation returns water to Earth."
          }
        ]
      },
      "flowchartAscii": "Sunlight → evaporation → water vapour\n                             ↓ cooling\nSea ← rivers / runoff ← rain ← clouds (condensation)\n  ↑                         ↓\n  └──── groundwater ← infiltration",
      "vennDiagram": {
        "leftTitle": "Evaporation",
        "leftPoints": [
          "Liquid becomes atmospheric vapour; energy absorbed."
        ],
        "middleTitle": "Water cycle",
        "middlePoints": [
          "Moves water and energy through the environment."
        ],
        "rightTitle": "Condensation",
        "rightPoints": [
          "Vapour becomes droplets; energy released."
        ]
      }
    },
    {
      "id": 7,
      "slug": "moisture:-dew,-fog,-frost,-rain-and-snow",
      "title": "Topic 7: Moisture: Dew, Fog, Frost, Rain & Snow",
      "shortExplanation": "Moisture appears as liquid droplets or solid ice depending on temperature and conditions.",
      "keyCharacteristics": {
        "points": [
          "Moisture appears as liquid droplets or solid ice depending on temperature and conditions.",
          "Dew: water vapour condenses as liquid drops on cool surfaces, often overnight. Fog: tiny suspended droplets form a cloud near the ground.",
          "Rain: cloud droplets grow large enough to fall. Snow: ice crystals grow in cold clouds and fall as flakes.",
          "Frost: water vapour deposits directly as ice crystals on a surface below freezing; it is not simply another name for dew.",
          "Condensation is gas → liquid; deposition is gas → solid. Frozen dew can also occur, but is distinct from directly deposited frost."
        ]
      },
      "deepDiveSections": [
        {
          "title": "Particle / force explanation",
          "emoji": "🔬",
          "points": [
            "Dew: water vapour condenses as liquid drops on cool surfaces, often overnight. Fog: tiny suspended droplets form a cloud near the ground.",
            "Rain: cloud droplets grow large enough to fall. Snow: ice crystals grow in cold clouds and fall as flakes."
          ]
        },
        {
          "title": "Apply your understanding",
          "emoji": "💡",
          "points": [
            "Frost: water vapour deposits directly as ice crystals on a surface below freezing; it is not simply another name for dew.",
            "Condensation is gas → liquid; deposition is gas → solid. Frozen dew can also occur, but is distinct from directly deposited frost."
          ]
        }
      ],
      "realWorldExamples": [
        {
          "name": "Everyday connection",
          "emoji": "🏠",
          "description": "Cool grass may hold dew; a freezing surface may grow frost crystals."
        },
        {
          "name": "Classroom investigation",
          "emoji": "🧪",
          "description": "Predict, observe, record evidence, and explain using the scientific ideas above."
        },
        {
          "name": "Check your model",
          "emoji": "🧠",
          "description": "Condensation is gas → liquid; deposition is gas → solid. Frozen dew can also occur, but is distinct from directly deposited frost."
        }
      ],
      "mnemonic": {
        "acronym": "DFFRS",
        "meaning": "Dew, Fog, Frost, Rain, Snow",
        "items": [
          {
            "letter": "D",
            "word": "Dew on surfaces"
          },
          {
            "letter": "F",
            "word": "Fog near ground"
          },
          {
            "letter": "F",
            "word": "Frost is ice"
          },
          {
            "letter": "R",
            "word": "Rain drops"
          },
          {
            "letter": "S",
            "word": "Snow crystals"
          }
        ]
      },
      "riddle": {
        "prompt": "Which key term fits this clue? Cool grass may hold dew; a freezing surface may grow frost crystals.",
        "answer": "MOISTURE",
        "explanation": "Moisture appears as liquid droplets or solid ice depending on temperature and conditions."
      },
      "unscrambles": [
        {
          "scrambled": "ERUTSIOM",
          "solution": "MOISTURE",
          "hint": "Moisture: Dew, Fog, Frost, Rain & Snow"
        }
      ],
      "secretCodeActivity": {
        "cipher": "A=1..Z=26",
        "items": [
          {
            "encoded": "13-15-9-19-20-21-18-5",
            "answer": "MOISTURE",
            "sentence": "Moisture appears as liquid droplets or solid ice depending on temperature and conditions."
          }
        ]
      },
      "flowchartAscii": "Observe → Predict → Investigate → Explain\nMoisture appears as liquid droplets or solid ice depending on temperature and conditions.\n  ↓ Dew: water vapour condenses as liquid drops on cool surfaces, often overnight. Fog: tiny suspended droplets form a cloud near the ground.\n  ↓ Rain: cloud droplets grow large enough to fall. Snow: ice crystals grow in cold clouds and fall as flakes.",
      "vennDiagram": {
        "leftTitle": "Dew",
        "leftPoints": [
          "Liquid droplets on a cool surface."
        ],
        "middleTitle": "Surface moisture",
        "middlePoints": [
          "Both involve atmospheric water vapour meeting a cool surface."
        ],
        "rightTitle": "Frost",
        "rightPoints": [
          "Solid ice on a freezing surface, often by deposition."
        ]
      }
    },
    {
      "id": 8,
      "slug": "evaporation-investigation-and-problem-solving",
      "title": "Topic 8: Evaporation Investigation & Problem Solving",
      "shortExplanation": "Evaporation speeds up with warmth, moving air and a larger exposed wet surface.",
      "keyCharacteristics": {
        "points": [
          "Evaporation speeds up with warmth, moving air and a larger exposed wet surface.",
          "Use identical saucers, equal spoonfuls and the same start time to compare a cold dark place, an open room and sunny open air.",
          "Observe at 30, 60, 90 and 120 minutes; sunny moving air will usually dry the water fastest, but actual weather matters.",
          "For Rubina and Ali: wring uniforms, spread them out rather than bunching, and hang in a sunny, breezy safe place before dark.",
          "To isolate temperature alone, keep airflow and humidity similar; the three-place comparison changes several factors, so explain its limits."
        ]
      },
      "deepDiveSections": [
        {
          "title": "Particle / force explanation",
          "emoji": "🔬",
          "points": [
            "Use identical saucers, equal spoonfuls and the same start time to compare a cold dark place, an open room and sunny open air.",
            "Observe at 30, 60, 90 and 120 minutes; sunny moving air will usually dry the water fastest, but actual weather matters."
          ]
        },
        {
          "title": "Apply your understanding",
          "emoji": "💡",
          "points": [
            "For Rubina and Ali: wring uniforms, spread them out rather than bunching, and hang in a sunny, breezy safe place before dark.",
            "To isolate temperature alone, keep airflow and humidity similar; the three-place comparison changes several factors, so explain its limits."
          ]
        }
      ],
      "realWorldExamples": [
        {
          "name": "Everyday connection",
          "emoji": "🏠",
          "description": "Uniforms spread on a sunny, breezy line dry faster than clothes folded indoors."
        },
        {
          "name": "Classroom investigation",
          "emoji": "🧪",
          "description": "Predict, observe, record evidence, and explain using the scientific ideas above."
        },
        {
          "name": "Check your model",
          "emoji": "🧠",
          "description": "To isolate temperature alone, keep airflow and humidity similar; the three-place comparison changes several factors, so explain its limits."
        }
      ],
      "mnemonic": {
        "acronym": "WAS",
        "meaning": "Warmth, Airflow, Surface",
        "items": [
          {
            "letter": "W",
            "word": "Warmth"
          },
          {
            "letter": "A",
            "word": "Air movement"
          },
          {
            "letter": "S",
            "word": "Surface exposed"
          }
        ]
      },
      "riddle": {
        "prompt": "Which key term fits this clue? Uniforms spread on a sunny, breezy line dry faster than clothes folded indoors.",
        "answer": "EVAPORATION",
        "explanation": "Evaporation speeds up with warmth, moving air and a larger exposed wet surface."
      },
      "unscrambles": [
        {
          "scrambled": "NOITAROPAVE",
          "solution": "EVAPORATION",
          "hint": "Evaporation Investigation & Problem Solving"
        }
      ],
      "secretCodeActivity": {
        "cipher": "A=1..Z=26",
        "items": [
          {
            "encoded": "5-22-1-16-15-18-1-20-9-15-14",
            "answer": "EVAPORATION",
            "sentence": "Evaporation speeds up with warmth, moving air and a larger exposed wet surface."
          }
        ]
      },
      "flowchartAscii": "Observe → Predict → Investigate → Explain\nEvaporation speeds up with warmth, moving air and a larger exposed wet surface.\n  ↓ Use identical saucers, equal spoonfuls and the same start time to compare a cold dark place, an open room and sunny open air.\n  ↓ Observe at 30, 60, 90 and 120 minutes; sunny moving air will usually dry the water fastest, but actual weather matters.",
      "vennDiagram": {
        "leftTitle": "Cold, still place",
        "leftPoints": [
          "Usually slower evaporation."
        ],
        "middleTitle": "Fair comparison",
        "middlePoints": [
          "Use equal water and identical saucers; record actual conditions."
        ],
        "rightTitle": "Warm, breezy place",
        "rightPoints": [
          "Usually faster evaporation."
        ]
      }
    }
  ],
  "mcqs": [
    {
      "id": "stbb-ch5-mcq-1",
      "number": 1,
      "section": "A",
      "sectionTitle": "Core concepts",
      "question": "What defines matter?",
      "options": [
        "Has mass and occupies space",
        "Only visible things",
        "Only hard things",
        "Anything that gives light"
      ],
      "correctIndex": 0,
      "explanation": "Has mass and occupies space. Matter is anything that has mass and occupies space. Solids, liquids, and gases are matter.",
      "topicRefId": 1
    },
    {
      "id": "stbb-ch5-mcq-2",
      "number": 2,
      "section": "A",
      "sectionTitle": "Core concepts",
      "question": "What are atoms and molecules?",
      "options": [
        "Forms of heat",
        "Tiny particles of matter",
        "Types of force",
        "Only living cells"
      ],
      "correctIndex": 1,
      "explanation": "Tiny particles of matter. Matter is anything that has mass and occupies space. Solids, liquids, and gases are matter.",
      "topicRefId": 1
    },
    {
      "id": "stbb-ch5-mcq-3",
      "number": 3,
      "section": "A",
      "sectionTitle": "Core concepts",
      "question": "Which is matter?",
      "options": [
        "A shadow",
        "An idea",
        "Air",
        "A reflection"
      ],
      "correctIndex": 2,
      "explanation": "Air. Matter is anything that has mass and occupies space. Solids, liquids, and gases are matter.",
      "topicRefId": 1
    },
    {
      "id": "stbb-ch5-mcq-4",
      "number": 4,
      "section": "A",
      "sectionTitle": "Core concepts",
      "question": "A liquid has which properties?",
      "options": [
        "Fixed shape only",
        "No volume",
        "Fixed shape and no mass",
        "Fixed volume but no fixed shape"
      ],
      "correctIndex": 3,
      "explanation": "Fixed volume but no fixed shape. Three familiar states of matter differ in shape, volume, particle spacing and motion.",
      "topicRefId": 2
    },
    {
      "id": "stbb-ch5-mcq-5",
      "number": 5,
      "section": "A",
      "sectionTitle": "Core concepts",
      "question": "Which state is easily compressed?",
      "options": [
        "Gas",
        "Solid",
        "Liquid",
        "All equally"
      ],
      "correctIndex": 0,
      "explanation": "Gas. Three familiar states of matter differ in shape, volume, particle spacing and motion.",
      "topicRefId": 2
    },
    {
      "id": "stbb-ch5-mcq-6",
      "number": 6,
      "section": "A",
      "sectionTitle": "Core concepts",
      "question": "What is the motion of solid particles?",
      "options": [
        "Free travel everywhere",
        "Vibration about fixed positions",
        "No motion at all",
        "Only upward motion"
      ],
      "correctIndex": 1,
      "explanation": "Vibration about fixed positions. Three familiar states of matter differ in shape, volume, particle spacing and motion.",
      "topicRefId": 2
    },
    {
      "id": "stbb-ch5-mcq-7",
      "number": 7,
      "section": "A",
      "sectionTitle": "Core concepts",
      "question": "What arrangement describes a liquid?",
      "options": [
        "Widely spaced regular rows",
        "Rigid fixed rows",
        "Close but irregular",
        "No particles"
      ],
      "correctIndex": 2,
      "explanation": "Close but irregular. Three familiar states of matter differ in shape, volume, particle spacing and motion.",
      "topicRefId": 2
    },
    {
      "id": "stbb-ch5-mcq-8",
      "number": 8,
      "section": "A",
      "sectionTitle": "Core concepts",
      "question": "What arrangement describes a gas?",
      "options": [
        "Close fixed rows",
        "Only two layers",
        "Tightly packed clusters",
        "Large spaces and no regular pattern"
      ],
      "correctIndex": 3,
      "explanation": "Large spaces and no regular pattern. Three familiar states of matter differ in shape, volume, particle spacing and motion.",
      "topicRefId": 2
    },
    {
      "id": "stbb-ch5-mcq-9",
      "number": 9,
      "section": "A",
      "sectionTitle": "Core concepts",
      "question": "Why does gas fill a container?",
      "options": [
        "Its particles move freely in all directions",
        "It has no mass",
        "Its particles never move",
        "It is always hot"
      ],
      "correctIndex": 0,
      "explanation": "Its particles move freely in all directions. Three familiar states of matter differ in shape, volume, particle spacing and motion.",
      "topicRefId": 2
    },
    {
      "id": "stbb-ch5-mcq-10",
      "number": 10,
      "section": "A",
      "sectionTitle": "Core concepts",
      "question": "Why is a solid hard to compress?",
      "options": [
        "It has no particles",
        "Its particles have little space between them",
        "It contains large empty spaces",
        "Its mass vanishes"
      ],
      "correctIndex": 1,
      "explanation": "Its particles have little space between them. Three familiar states of matter differ in shape, volume, particle spacing and motion.",
      "topicRefId": 2
    },
    {
      "id": "stbb-ch5-mcq-11",
      "number": 11,
      "section": "B",
      "sectionTitle": "Models and causes",
      "question": "Ink spreads in water without stirring mainly through what?",
      "options": [
        "Freezing",
        "Magnetism",
        "Diffusion",
        "Deposition"
      ],
      "correctIndex": 2,
      "explanation": "Diffusion. Ink spreads through still water because particles are continually moving and mixing: diffusion.",
      "topicRefId": 3
    },
    {
      "id": "stbb-ch5-mcq-12",
      "number": 12,
      "section": "B",
      "sectionTitle": "Models and causes",
      "question": "What pushes ink particles randomly?",
      "options": [
        "Their desire to spread",
        "Only sunlight",
        "Only gravity",
        "Collisions with moving particles"
      ],
      "correctIndex": 3,
      "explanation": "Collisions with moving particles. Ink spreads through still water because particles are continually moving and mixing: diffusion.",
      "topicRefId": 3
    },
    {
      "id": "stbb-ch5-mcq-13",
      "number": 13,
      "section": "B",
      "sectionTitle": "Models and causes",
      "question": "Which model represents solid particles?",
      "options": [
        "Close orderly dots",
        "Far apart dots",
        "No dots",
        "One giant empty circle"
      ],
      "correctIndex": 0,
      "explanation": "Close orderly dots. Ink spreads through still water because particles are continually moving and mixing: diffusion.",
      "topicRefId": 3
    },
    {
      "id": "stbb-ch5-mcq-14",
      "number": 14,
      "section": "B",
      "sectionTitle": "Models and causes",
      "question": "Which model represents gas motion?",
      "options": [
        "All particles fixed",
        "Arrows in many directions",
        "Only vibration in rows",
        "No arrows ever"
      ],
      "correctIndex": 1,
      "explanation": "Arrows in many directions. Ink spreads through still water because particles are continually moving and mixing: diffusion.",
      "topicRefId": 3
    },
    {
      "id": "stbb-ch5-mcq-15",
      "number": 15,
      "section": "B",
      "sectionTitle": "Models and causes",
      "question": "What is a limitation of bead models?",
      "options": [
        "Beads have no mass",
        "Real particles are larger than jars",
        "Real particles do not need strings",
        "Beads prove matter is alive"
      ],
      "correctIndex": 2,
      "explanation": "Real particles do not need strings. Ink spreads through still water because particles are continually moving and mixing: diffusion.",
      "topicRefId": 3
    },
    {
      "id": "stbb-ch5-mcq-16",
      "number": 16,
      "section": "B",
      "sectionTitle": "Models and causes",
      "question": "Heating usually gives particles what?",
      "options": [
        "Less mass",
        "No motion",
        "A new identity",
        "More energy"
      ],
      "correctIndex": 3,
      "explanation": "More energy. Heating transfers energy into matter; cooling transfers energy out of it.",
      "topicRefId": 4
    },
    {
      "id": "stbb-ch5-mcq-17",
      "number": 17,
      "section": "B",
      "sectionTitle": "Models and causes",
      "question": "When ice melts in a sealed container, what happens to mass?",
      "options": [
        "It stays the same",
        "It becomes zero",
        "It doubles",
        "It necessarily decreases"
      ],
      "correctIndex": 0,
      "explanation": "It stays the same. Heating transfers energy into matter; cooling transfers energy out of it.",
      "topicRefId": 4
    },
    {
      "id": "stbb-ch5-mcq-18",
      "number": 18,
      "section": "B",
      "sectionTitle": "Models and causes",
      "question": "Expansion with constant mass usually does what to density?",
      "options": [
        "Doubles it always",
        "Decreases it",
        "Leaves zero volume",
        "Creates matter"
      ],
      "correctIndex": 1,
      "explanation": "Decreases it. Heating transfers energy into matter; cooling transfers energy out of it.",
      "topicRefId": 4
    },
    {
      "id": "stbb-ch5-mcq-19",
      "number": 19,
      "section": "B",
      "sectionTitle": "Models and causes",
      "question": "Why does ice float?",
      "options": [
        "Ice has no mass",
        "Ice is a gas",
        "Ice is less dense than liquid water",
        "Ice is denser than water"
      ],
      "correctIndex": 2,
      "explanation": "Ice is less dense than liquid water. Heating transfers energy into matter; cooling transfers energy out of it.",
      "topicRefId": 4
    },
    {
      "id": "stbb-ch5-mcq-20",
      "number": 20,
      "section": "B",
      "sectionTitle": "Models and causes",
      "question": "During melting, supplied energy mainly helps do what?",
      "options": [
        "Destroy atoms",
        "Remove all mass",
        "Stop vibration",
        "Overcome particle attractions"
      ],
      "correctIndex": 3,
      "explanation": "Overcome particle attractions. Heating transfers energy into matter; cooling transfers energy out of it.",
      "topicRefId": 4
    },
    {
      "id": "stbb-ch5-mcq-21",
      "number": 21,
      "section": "C",
      "sectionTitle": "Processes and applications",
      "question": "Solid to liquid is called what?",
      "options": [
        "Melting",
        "Freezing",
        "Condensation",
        "Deposition"
      ],
      "correctIndex": 0,
      "explanation": "Melting. State changes are physical changes caused by energy transfer; water remains water.",
      "topicRefId": 5
    },
    {
      "id": "stbb-ch5-mcq-22",
      "number": 22,
      "section": "C",
      "sectionTitle": "Processes and applications",
      "question": "Liquid to solid is called what?",
      "options": [
        "Melting",
        "Freezing",
        "Evaporation",
        "Boiling"
      ],
      "correctIndex": 1,
      "explanation": "Freezing. State changes are physical changes caused by energy transfer; water remains water.",
      "topicRefId": 5
    },
    {
      "id": "stbb-ch5-mcq-23",
      "number": 23,
      "section": "C",
      "sectionTitle": "Processes and applications",
      "question": "Liquid to gas at its surface is what?",
      "options": [
        "Condensation",
        "Freezing",
        "Evaporation",
        "Deposition"
      ],
      "correctIndex": 2,
      "explanation": "Evaporation. State changes are physical changes caused by energy transfer; water remains water.",
      "topicRefId": 5
    },
    {
      "id": "stbb-ch5-mcq-24",
      "number": 24,
      "section": "C",
      "sectionTitle": "Processes and applications",
      "question": "Gas to liquid is called what?",
      "options": [
        "Melting",
        "Boiling",
        "Freezing",
        "Condensation"
      ],
      "correctIndex": 3,
      "explanation": "Condensation. State changes are physical changes caused by energy transfer; water remains water.",
      "topicRefId": 5
    },
    {
      "id": "stbb-ch5-mcq-25",
      "number": 25,
      "section": "C",
      "sectionTitle": "Processes and applications",
      "question": "Which process absorbs heat?",
      "options": [
        "Melting",
        "Freezing",
        "Condensation",
        "Gas cooling to liquid"
      ],
      "correctIndex": 0,
      "explanation": "Melting. State changes are physical changes caused by energy transfer; water remains water.",
      "topicRefId": 5
    },
    {
      "id": "stbb-ch5-mcq-26",
      "number": 26,
      "section": "C",
      "sectionTitle": "Processes and applications",
      "question": "Which process releases heat?",
      "options": [
        "Evaporation",
        "Freezing",
        "Melting",
        "Liquid warming"
      ],
      "correctIndex": 1,
      "explanation": "Freezing. State changes are physical changes caused by energy transfer; water remains water.",
      "topicRefId": 5
    },
    {
      "id": "stbb-ch5-mcq-27",
      "number": 27,
      "section": "C",
      "sectionTitle": "Processes and applications",
      "question": "Where does boiling occur?",
      "options": [
        "Only at the surface",
        "Only in ice",
        "Throughout the liquid",
        "Only in clouds"
      ],
      "correctIndex": 2,
      "explanation": "Throughout the liquid. State changes are physical changes caused by energy transfer; water remains water.",
      "topicRefId": 5
    },
    {
      "id": "stbb-ch5-mcq-28",
      "number": 28,
      "section": "C",
      "sectionTitle": "Processes and applications",
      "question": "Can evaporation occur below boiling point?",
      "options": [
        "No, never",
        "Only in a freezer",
        "Only above 100°C",
        "Yes, at the liquid surface"
      ],
      "correctIndex": 3,
      "explanation": "Yes, at the liquid surface. State changes are physical changes caused by energy transfer; water remains water.",
      "topicRefId": 5
    },
    {
      "id": "stbb-ch5-mcq-29",
      "number": 29,
      "section": "C",
      "sectionTitle": "Processes and applications",
      "question": "What is visible white mist near a kettle?",
      "options": [
        "Tiny liquid droplets",
        "Invisible water vapour itself",
        "Solid metal",
        "Smoke from water"
      ],
      "correctIndex": 0,
      "explanation": "Tiny liquid droplets. State changes are physical changes caused by energy transfer; water remains water.",
      "topicRefId": 5
    },
    {
      "id": "stbb-ch5-mcq-30",
      "number": 30,
      "section": "C",
      "sectionTitle": "Processes and applications",
      "question": "What happens to water vapour when cooled sufficiently?",
      "options": [
        "It loses all mass",
        "It condenses into droplets",
        "It becomes air permanently",
        "It creates sunlight"
      ],
      "correctIndex": 1,
      "explanation": "It condenses into droplets. State changes are physical changes caused by energy transfer; water remains water.",
      "topicRefId": 5
    },
    {
      "id": "stbb-ch5-mcq-31",
      "number": 31,
      "section": "D",
      "sectionTitle": "Review and inquiry",
      "question": "What drives evaporation in the water cycle?",
      "options": [
        "Moonlight only",
        "Magnets",
        "Solar energy",
        "Soil colour"
      ],
      "correctIndex": 2,
      "explanation": "Solar energy. The Sun powers evaporation; cooling causes condensation; precipitation returns water to Earth.",
      "topicRefId": 6
    },
    {
      "id": "stbb-ch5-mcq-32",
      "number": 32,
      "section": "D",
      "sectionTitle": "Review and inquiry",
      "question": "How do clouds form?",
      "options": [
        "Water disappears",
        "Air becomes stone",
        "Rain turns to sand",
        "Vapour cools into droplets or ice crystals"
      ],
      "correctIndex": 3,
      "explanation": "Vapour cools into droplets or ice crystals. The Sun powers evaporation; cooling causes condensation; precipitation returns water to Earth.",
      "topicRefId": 6
    },
    {
      "id": "stbb-ch5-mcq-33",
      "number": 33,
      "section": "D",
      "sectionTitle": "Review and inquiry",
      "question": "Water soaking into the ground is called what?",
      "options": [
        "Infiltration",
        "Combustion",
        "Boiling",
        "Melting"
      ],
      "correctIndex": 0,
      "explanation": "Infiltration. The Sun powers evaporation; cooling causes condensation; precipitation returns water to Earth.",
      "topicRefId": 6
    },
    {
      "id": "stbb-ch5-mcq-34",
      "number": 34,
      "section": "D",
      "sectionTitle": "Review and inquiry",
      "question": "What is dew?",
      "options": [
        "Ice flakes in clouds",
        "Liquid drops condensed on cool surfaces",
        "A hot gas",
        "Rain inside rocks"
      ],
      "correctIndex": 1,
      "explanation": "Liquid drops condensed on cool surfaces. Moisture appears as liquid droplets or solid ice depending on temperature and conditions.",
      "topicRefId": 7
    },
    {
      "id": "stbb-ch5-mcq-35",
      "number": 35,
      "section": "D",
      "sectionTitle": "Review and inquiry",
      "question": "What is fog?",
      "options": [
        "Dry dust only",
        "Ice beneath soil",
        "Suspended droplets near the ground",
        "An underground stream"
      ],
      "correctIndex": 2,
      "explanation": "Suspended droplets near the ground. Moisture appears as liquid droplets or solid ice depending on temperature and conditions.",
      "topicRefId": 7
    },
    {
      "id": "stbb-ch5-mcq-36",
      "number": 36,
      "section": "D",
      "sectionTitle": "Review and inquiry",
      "question": "What is snow?",
      "options": [
        "Warm liquid droplets",
        "Only frozen dew",
        "Invisible vapour",
        "Ice crystals falling from clouds"
      ],
      "correctIndex": 3,
      "explanation": "Ice crystals falling from clouds. Moisture appears as liquid droplets or solid ice depending on temperature and conditions.",
      "topicRefId": 7
    },
    {
      "id": "stbb-ch5-mcq-37",
      "number": 37,
      "section": "D",
      "sectionTitle": "Review and inquiry",
      "question": "Frost commonly forms by which change?",
      "options": [
        "Vapour directly to ice",
        "Solid directly to liquid",
        "Liquid to hot gas",
        "Liquid to warm droplets"
      ],
      "correctIndex": 0,
      "explanation": "Vapour directly to ice. Moisture appears as liquid droplets or solid ice depending on temperature and conditions.",
      "topicRefId": 7
    },
    {
      "id": "stbb-ch5-mcq-38",
      "number": 38,
      "section": "D",
      "sectionTitle": "Review and inquiry",
      "question": "Which plate usually dries fastest?",
      "options": [
        "Cold dark covered plate",
        "Sunny plate in moving air",
        "All must tie",
        "Plate with no exposed water"
      ],
      "correctIndex": 1,
      "explanation": "Sunny plate in moving air. Evaporation speeds up with warmth, moving air and a larger exposed wet surface.",
      "topicRefId": 8
    },
    {
      "id": "stbb-ch5-mcq-39",
      "number": 39,
      "section": "D",
      "sectionTitle": "Review and inquiry",
      "question": "Best way to dry uniforms quickly?",
      "options": [
        "Fold wet clothes tightly",
        "Put them in a cold sealed box",
        "Spread them in a sunny breezy place",
        "Stack wet layers"
      ],
      "correctIndex": 2,
      "explanation": "Spread them in a sunny breezy place. Evaporation speeds up with warmth, moving air and a larger exposed wet surface.",
      "topicRefId": 8
    },
    {
      "id": "stbb-ch5-mcq-40",
      "number": 40,
      "section": "D",
      "sectionTitle": "Review and inquiry",
      "question": "Is naturally cycled water always safe to drink?",
      "options": [
        "Yes, always",
        "Only if it looks clear",
        "Only if it fell at night",
        "No, it can become contaminated"
      ],
      "correctIndex": 3,
      "explanation": "No, it can become contaminated. Evaporation speeds up with warmth, moving air and a larger exposed wet surface.",
      "topicRefId": 6
    }
  ],
  "summaryConcepts": [
    {
      "icon": "💡",
      "topic": "Matter & Learning Objectives",
      "takeaway": "Matter is anything that has mass and occupies space. Solids, liquids, and gases are matter."
    },
    {
      "icon": "💡",
      "topic": "Solids, Liquids & Gases",
      "takeaway": "Three familiar states of matter differ in shape, volume, particle spacing and motion."
    },
    {
      "icon": "💡",
      "topic": "Diffusion & Particle Models",
      "takeaway": "Ink spreads through still water because particles are continually moving and mixing: diffusion."
    },
    {
      "icon": "💡",
      "topic": "Heating, Cooling & Energy",
      "takeaway": "Heating transfers energy into matter; cooling transfers energy out of it."
    },
    {
      "icon": "💡",
      "topic": "Melting, Freezing, Evaporation & Condensation",
      "takeaway": "State changes are physical changes caused by energy transfer; water remains water."
    },
    {
      "icon": "💡",
      "topic": "Water Cycle: A Molecule’s Journey",
      "takeaway": "The Sun powers evaporation; cooling causes condensation; precipitation returns water to Earth."
    },
    {
      "icon": "💡",
      "topic": "Moisture: Dew, Fog, Frost, Rain & Snow",
      "takeaway": "Moisture appears as liquid droplets or solid ice depending on temperature and conditions."
    },
    {
      "icon": "💡",
      "topic": "Evaporation Investigation & Problem Solving",
      "takeaway": "Evaporation speeds up with warmth, moving air and a larger exposed wet surface."
    }
  ],
  "summaryMatrices": [
    {
      "title": "Three states of matter",
      "headers": [
        "State",
        "Arrangement",
        "Motion",
        "Shape / volume"
      ],
      "rows": [
        {
          "cells": [
            "Solid",
            "Close, usually regular",
            "Vibrate",
            "Fixed / fixed"
          ]
        },
        {
          "cells": [
            "Liquid",
            "Close, irregular",
            "Slide and rotate",
            "Variable / fixed"
          ]
        },
        {
          "cells": [
            "Gas",
            "Far apart, random",
            "Free, rapid",
            "Variable / variable"
          ]
        }
      ]
    },
    {
      "title": "Changes and moisture",
      "headers": [
        "Process / form",
        "Direction / description",
        "Energy or condition"
      ],
      "rows": [
        {
          "cells": [
            "Melting",
            "Solid → liquid",
            "Absorbs heat"
          ]
        },
        {
          "cells": [
            "Freezing",
            "Liquid → solid",
            "Releases heat"
          ]
        },
        {
          "cells": [
            "Evaporation",
            "Liquid → gas",
            "Absorbs heat"
          ]
        },
        {
          "cells": [
            "Condensation",
            "Gas → liquid",
            "Releases heat"
          ]
        },
        {
          "cells": [
            "Dew / fog",
            "Liquid on surface / in air",
            "Condensation"
          ]
        },
        {
          "cells": [
            "Frost",
            "Vapour → surface ice",
            "Below freezing; deposition"
          ]
        },
        {
          "cells": [
            "Rain / snow",
            "Falling drops / ice crystals",
            "Cloud precipitation"
          ]
        }
      ]
    }
  ],
  "activitiesAndQA": {
    "activities": [
      {
        "id": "act-1",
        "activityNumber": "Activity 1",
        "title": "Observe and draw the three states",
        "emoji": "🧪",
        "aim": "Observe and draw the three states",
        "materials": [
          "Notebook",
          "Pencil",
          "Safe solid and liquid examples",
          "Inflated balloon"
        ],
        "procedure": [
          "Draw one hard material with fixed shape and volume.",
          "Draw a flowing material with fixed volume but container-dependent shape.",
          "Draw a gas which fills available space. Label each state."
        ],
        "questions": [
          {
            "question": "Which state flows with a fixed volume?",
            "answer": "Liquid."
          },
          {
            "question": "Does air occupy space?",
            "answer": "Yes: it fills and expands a balloon."
          }
        ],
        "conclusion": "Shape and volume help distinguish states.",
        "safetyOrTeacherTip": "Work with teacher supervision. Record actual results rather than copying expected results."
      },
      {
        "id": "act-2",
        "activityNumber": "Activity 2",
        "title": "Ink spreading in water",
        "emoji": "🧪",
        "aim": "Ink spreading in water",
        "materials": [
          "Transparent glass",
          "Water",
          "Ink",
          "Dropper"
        ],
        "procedure": [
          "Fill the glass with still water and observe.",
          "Add one drop of ink without stirring.",
          "Watch and sketch its spread over time."
        ],
        "questions": [
          {
            "question": "What did you observe?",
            "answer": "The colour gradually spread through the water."
          },
          {
            "question": "Why and how does colour move? What pushes it?",
            "answer": "Water and ink particles move randomly and collide; net diffusion spreads ink from concentrated regions to less concentrated regions."
          }
        ],
        "conclusion": "Particle motion occurs even when water looks still.",
        "safetyOrTeacherTip": "Do not drink ink water. Protect clothing and eyes."
      },
      {
        "id": "act-3",
        "activityNumber": "Activity 3",
        "title": "Draw particle arrangements",
        "emoji": "🧪",
        "aim": "Draw particle arrangements",
        "materials": [
          "Paper",
          "Pencil",
          "Particle-model pictures"
        ],
        "procedure": [
          "Identify models a, b and c by spacing and arrangement.",
          "Draw dots for a solid, liquid and gas; add movement arrows."
        ],
        "questions": [
          {
            "question": "How do you identify gas?",
            "answer": "Widely separated dots with motion arrows in all directions."
          }
        ],
        "conclusion": "Particle diagrams link microscopic arrangement to observable properties.",
        "safetyOrTeacherTip": "Work with teacher supervision. Record actual results rather than copying expected results.",
        "observationTable": {
          "headers": [
            "State",
            "Spacing / arrangement",
            "Motion"
          ],
          "rows": [
            [
              "Solid",
              "Close, orderly",
              "Vibrate about fixed points"
            ],
            [
              "Liquid",
              "Close, irregular",
              "Slide, rotate, short distances"
            ],
            [
              "Gas",
              "Far apart, random",
              "Freely in all directions"
            ]
          ]
        }
      },
      {
        "id": "act-4",
        "activityNumber": "Activity 4",
        "title": "Build a bead particle model",
        "emoji": "🧪",
        "aim": "Build a bead particle model",
        "materials": [
          "Plastic jar",
          "Beads or seeds",
          "Balloon",
          "Elastic band",
          "String",
          "Cardboard"
        ],
        "procedure": [
          "With the teacher, secure a balloon membrane over a plastic jar containing beads; attach string securely to the membrane.",
          "Support or invert the closed model above a tray as directed by the teacher.",
          "Gently pull and release the string to vibrate the membrane; watch the beads move.",
          "Compare gentle movement with stronger movement; explain which features model particle motion."
        ],
        "questions": [
          {
            "question": "What happens when the string is pulled and released?",
            "answer": "The vibrating membrane transfers energy to beads and makes them move."
          },
          {
            "question": "Is the model exact?",
            "answer": "No. Real particles do not need strings or a membrane and are far smaller."
          }
        ],
        "conclusion": "More input energy can model greater movement.",
        "safetyOrTeacherTip": "Teacher assembles and holds the model. Use a plastic jar, keep beads away from mouths, and account for latex allergies; never overstretch the balloon."
      },
      {
        "id": "act-5",
        "activityNumber": "Activity 5",
        "title": "Role-play heating matter",
        "emoji": "🧪",
        "aim": "Role-play heating matter",
        "materials": [
          "Chalk or tape",
          "Measuring tape",
          "Open floor"
        ],
        "procedure": [
          "Mark a 90 cm circle as a diagram reference. Do not crowd students into it.",
          "In a larger safe area, stand close without touching and jiggle for solid vibration.",
          "Space out and slide short distances for a liquid.",
          "Walk freely farther apart to model a gas."
        ],
        "questions": [
          {
            "question": "What changes with heating?",
            "answer": "Particle energy and freedom of motion increase; spacing usually increases."
          },
          {
            "question": "Does the group lose mass?",
            "answer": "No. The same students represent the same amount of matter; “lighter” means less dense here, not less mass."
          }
        ],
        "conclusion": "Heating changes motion and arrangement, not the identity or mass of particles.",
        "safetyOrTeacherTip": "No running, pushing or enforced crowding. Scale the floor model to class size."
      },
      {
        "id": "act-6",
        "activityNumber": "Activity 6",
        "title": "The Story of Water: follow a molecule",
        "emoji": "🧪",
        "aim": "The Story of Water: follow a molecule",
        "materials": [
          "Water-cycle diagram",
          "Notebook"
        ],
        "procedure": [
          "Read the molecule–student dialogue in the water-cycle topic.",
          "Draw sea → evaporation → cloud condensation → precipitation → runoff / groundwater → sea.",
          "Use arrows to label where heat is absorbed and released."
        ],
        "questions": [
          {
            "question": "What is the role of evaporation?",
            "answer": "It transfers liquid water to atmospheric vapour and absorbs energy."
          },
          {
            "question": "What is condensation?",
            "answer": "Cooling vapour forms liquid droplets and releases energy."
          }
        ],
        "conclusion": "Water and energy circulate through linked processes.",
        "safetyOrTeacherTip": "Work with teacher supervision. Record actual results rather than copying expected results."
      },
      {
        "id": "act-7",
        "activityNumber": "Activity 7",
        "title": "Evaporation at three places",
        "emoji": "🧪",
        "aim": "Evaporation at three places",
        "materials": [
          "Three identical small saucers",
          "Water",
          "Spoon",
          "Clock"
        ],
        "procedure": [
          "Put one equal spoonful of water into each saucer at the same time.",
          "Place A in a cold dark covered location, B in an open room, C in sunny open air.",
          "Record water remaining at 30, 60, 90 and 120 minutes.",
          "Compare results and note differences in temperature, airflow and humidity."
        ],
        "questions": [
          {
            "question": "Which plate usually dries fastest?",
            "answer": "C in sunny moving air; actual conditions determine the result."
          },
          {
            "question": "How can Rubina and Ali dry uniforms?",
            "answer": "Wring them, spread them separately on a sunny breezy line and avoid overlapping."
          }
        ],
        "conclusion": "Warmth and airflow usually increase evaporation.",
        "safetyOrTeacherTip": "Work with teacher supervision. Record actual results rather than copying expected results.",
        "observationTable": {
          "headers": [
            "Time (min)",
            "A: cold/dark",
            "B: open room",
            "C: sunny air"
          ],
          "rows": [
            [
              "30",
              "",
              "",
              ""
            ],
            [
              "60",
              "",
              "",
              ""
            ],
            [
              "90",
              "",
              "",
              ""
            ],
            [
              "120",
              "",
              "",
              ""
            ]
          ]
        }
      }
    ],
    "fillInBlanks": [
      {
        "id": "ch5-blank-0",
        "promptWithBlank": "Anything that has mass and occupies space is __________.",
        "answer": "matter",
        "explanation": "All three familiar states are matter."
      },
      {
        "id": "ch5-blank-1",
        "promptWithBlank": "Solid changing to liquid is __________.",
        "answer": "melting",
        "explanation": "Melting absorbs energy."
      },
      {
        "id": "ch5-blank-2",
        "promptWithBlank": "Gas changing to liquid is __________.",
        "answer": "condensation",
        "explanation": "Condensation releases energy."
      },
      {
        "id": "ch5-blank-3",
        "promptWithBlank": "Liquid changing to solid is __________.",
        "answer": "freezing",
        "explanation": "Freezing releases heat."
      },
      {
        "id": "ch5-blank-4",
        "promptWithBlank": "Spreading ink illustrates __________.",
        "answer": "diffusion",
        "explanation": "Moving particles mix without stirring."
      },
      {
        "id": "ch5-blank-5",
        "promptWithBlank": "A near-ground cloud of droplets is __________.",
        "answer": "fog",
        "explanation": "Fog consists of liquid droplets suspended near the ground."
      },
      {
        "id": "ch5-blank-6",
        "promptWithBlank": "Water vapour changing directly to ice forms __________.",
        "answer": "frost",
        "explanation": "This is deposition on a freezing surface."
      },
      {
        "id": "ch5-blank-7",
        "promptWithBlank": "Liquid to gas at the surface is __________.",
        "answer": "evaporation",
        "explanation": "It can happen below the boiling point."
      }
    ],
    "trueFalse": [
      {
        "id": "ch5-tf-0",
        "statement": "Particles in solids freely move around.",
        "isTrue": false,
        "explanation": "They vibrate about fixed positions."
      },
      {
        "id": "ch5-tf-1",
        "statement": "Particles in gases move around a fixed point.",
        "isTrue": false,
        "explanation": "Gas particles move freely in all directions."
      },
      {
        "id": "ch5-tf-2",
        "statement": "Particles in liquids move short distances, rotate and slide.",
        "isTrue": true,
        "explanation": "They remain close but can move past one another."
      },
      {
        "id": "ch5-tf-3",
        "statement": "Particles in liquids are regularly arranged and fixed.",
        "isTrue": false,
        "explanation": "Liquid particles have an irregular arrangement."
      },
      {
        "id": "ch5-tf-4",
        "statement": "Gas particles have an irregular arrangement and large spaces.",
        "isTrue": true,
        "explanation": "This explains expansion and compression."
      }
    ],
    "descriptiveQA": [
      {
        "id": "ch5-qa-0",
        "category": "definition-short",
        "badgeLabel": "Definition / Short Answer",
        "question": "Define matter and give examples of each state.",
        "answer": "Matter has mass and occupies space. Stone is solid, water liquid and air gas."
      },
      {
        "id": "ch5-qa-1",
        "category": "definition-short",
        "badgeLabel": "Definition / Short Answer",
        "question": "What are dew, fog, frost, rain and snow?",
        "answer": "Dew is condensed liquid on cool surfaces; fog is suspended droplets near the ground; frost is deposited ice on freezing surfaces; rain is falling liquid drops; snow is falling ice crystals."
      },
      {
        "id": "ch5-qa-2",
        "category": "give-reason",
        "badgeLabel": "Give Reasons",
        "question": "Why does ice change into water on heating?",
        "answer": "Ice absorbs energy. Its particles gain freedom from their fixed arrangement as attractions are partly overcome, so the solid becomes liquid. The particles remain water molecules."
      },
      {
        "id": "ch5-qa-3",
        "category": "give-reason",
        "badgeLabel": "Give Reasons",
        "question": "Why does vapour condense into liquid?",
        "answer": "Cooling transfers energy from vapour to the surroundings. Particles come closer together and form liquid droplets, releasing heat."
      },
      {
        "id": "ch5-qa-4",
        "category": "give-reason",
        "badgeLabel": "Give Reasons",
        "question": "Why does moisture exist in different forms?",
        "answer": "Temperature and energy transfers determine whether water is vapour, liquid droplets or solid ice, and whether it forms on surfaces or in clouds."
      },
      {
        "id": "ch5-qa-5",
        "category": "structured-long",
        "badgeLabel": "Long / Structured Answer",
        "question": "Compare particle arrangement and motion in solids, liquids and gases.",
        "answer": "Solid particles are close and usually orderly, vibrating about fixed positions. Liquid particles are close but irregular and can rotate and slide. Gas particles have large spaces and move freely in all directions; solids keep shape and volume, liquids keep volume, gases keep neither."
      },
      {
        "id": "ch5-qa-6",
        "category": "structured-long",
        "badgeLabel": "Long / Structured Answer",
        "question": "Explain the water cycle with a labelled diagram.",
        "answer": "Draw sea → evaporation (energy absorbed) → vapour → condensation (energy released) → clouds → precipitation → runoff / infiltration → rivers / groundwater → sea. The Sun supplies energy. Add snow where clouds are cold enough. Natural cycling is not a guarantee of drinking-water safety."
      },
      {
        "id": "ch5-qa-7",
        "category": "structured-long",
        "badgeLabel": "Long / Structured Answer",
        "question": "Compare evaporation and boiling.",
        "answer": "Evaporation occurs at a liquid surface over a range of temperatures. Boiling occurs throughout the liquid at its boiling temperature for the prevailing pressure. Both transfer liquid to gas and need energy."
      },
      {
        "id": "ch5-qa-8",
        "category": "problem-solving",
        "badgeLabel": "Scientific Problem Solving",
        "question": "How can Rubina and Ali dry uniforms before dark?",
        "answer": "Wring out excess water, spread each uniform fully on a safe sunny, breezy line, leave gaps and turn thick sections if needed. Warmth, air movement and exposed wet surface increase evaporation."
      },
      {
        "id": "ch5-qa-9",
        "category": "problem-solving",
        "badgeLabel": "Scientific Problem Solving",
        "question": "Design a fairer test of temperature alone in Activity 7.",
        "answer": "Use equal water, identical saucers, equal exposed areas and matched airflow and humidity, varying only temperature. Measure remaining water at equal times and repeat. The original three locations vary several conditions at once."
      }
    ]
  }
};
