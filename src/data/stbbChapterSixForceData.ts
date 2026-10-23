import type { StbbChapterConfig } from './stbbChapterTwoMicroorganismsData';

export const STBB_CHAPTER_6_CONFIG: StbbChapterConfig = {
  "id": "ch6-force-machines",
  "chapterNumber": 6,
  "shortNavLabel": "Ch 6: Force & Machines",
  "navEmoji": "⚙️",
  "isFeaturedNew": true,
  "boardBadge": "STBB Sindh Textbook Board · Class 5 Science",
  "syllabusBadge": "Sukkur IBA STS PST & JEST Syllabus Aligned",
  "heroTitle": "Chapter 6: Force and Machines",
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
      "label": "6 Activity Guides"
    },
    {
      "icon": "sparkles",
      "label": "All-Type Questions & Answers"
    }
  ],
  "tabs": {
    "topicsLabel": "Interactive Topics",
    "toolLabel": "Force & Machine Detective",
    "mcqsLabel": "40 Solved MCQs",
    "summaryLabel": "Key Concepts & Tables",
    "activitiesLabel": "Activities",
    "qaLabel": "Questions & Answers"
  },
  "sidebarHeading": "Chapter Topics",
  "decisionTool": {
    "badge": "Interactive Decision Lab",
    "title": "Force & Simple Machine Detective",
    "subtitle": "Choose a sample, read its clue, then answer yes/no using the evidence.",
    "totalSteps": 6,
    "samplePromptLabel": "Try a scenario",
    "enableRandomMystery": true,
    "specimens": [
      {
        "id": "sample-1",
        "name": "LEVER",
        "emoji": "🔬",
        "targetGroup": "LEVER",
        "clue": "Identify F, E and L; the middle element tells the class.",
        "expectedPath": "Yes"
      },
      {
        "id": "sample-2",
        "name": "INCLINED PLANE",
        "emoji": "🔬",
        "targetGroup": "INCLINED PLANE",
        "clue": "A ramp trades force for distance.",
        "expectedPath": "No → Yes"
      },
      {
        "id": "sample-3",
        "name": "WEDGE",
        "emoji": "🔬",
        "targetGroup": "WEDGE",
        "clue": "A knife or axe is a moving wedge.",
        "expectedPath": "No → No → Yes"
      },
      {
        "id": "sample-4",
        "name": "AIR RESISTANCE",
        "emoji": "🔬",
        "targetGroup": "AIR RESISTANCE",
        "clue": "Streamlining reduces drag; parachutes increase it.",
        "expectedPath": "No → No → No → Yes"
      },
      {
        "id": "sample-5",
        "name": "FRICTION",
        "emoji": "🔬",
        "targetGroup": "FRICTION",
        "clue": "Grip, brakes and wear involve friction.",
        "expectedPath": "No → No → No → No → Yes"
      },
      {
        "id": "sample-6",
        "name": "GRAVITY / WEIGHT",
        "emoji": "🔬",
        "targetGroup": "GRAVITY / WEIGHT",
        "clue": "Weight is measured in newtons.",
        "expectedPath": "No → No → No → No → No → Yes"
      }
    ],
    "nodes": [
      {
        "id": 1,
        "question": "Does a rigid bar turn around a pivot?",
        "onYes": {
          "type": "result",
          "shortCode": "1: Yes",
          "result": {
            "group": "LEVER",
            "emoji": "🔬",
            "sizeRank": "Evidence-based identification",
            "keyTrait": "Identify F, E and L; the middle element tells the class.",
            "examples": "Identify F, E and L; the middle element tells the class."
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
        "question": "Does a load move along a slope to change height?",
        "onYes": {
          "type": "result",
          "shortCode": "2: Yes",
          "result": {
            "group": "INCLINED PLANE",
            "emoji": "🔬",
            "sizeRank": "Evidence-based identification",
            "keyTrait": "A ramp trades force for distance.",
            "examples": "A ramp trades force for distance."
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
        "question": "Does a sharp edge force material apart?",
        "onYes": {
          "type": "result",
          "shortCode": "3: Yes",
          "result": {
            "group": "WEDGE",
            "emoji": "🔬",
            "sizeRank": "Evidence-based identification",
            "keyTrait": "A knife or axe is a moving wedge.",
            "examples": "A knife or axe is a moving wedge."
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
        "question": "Is air opposing a moving object?",
        "onYes": {
          "type": "result",
          "shortCode": "4: Yes",
          "result": {
            "group": "AIR RESISTANCE",
            "emoji": "🔬",
            "sizeRank": "Evidence-based identification",
            "keyTrait": "Streamlining reduces drag; parachutes increase it.",
            "examples": "Streamlining reduces drag; parachutes increase it."
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
        "question": "Are touching surfaces resisting sliding?",
        "onYes": {
          "type": "result",
          "shortCode": "5: Yes",
          "result": {
            "group": "FRICTION",
            "emoji": "🔬",
            "sizeRank": "Evidence-based identification",
            "keyTrait": "Grip, brakes and wear involve friction.",
            "examples": "Grip, brakes and wear involve friction."
          }
        },
        "onNo": {
          "type": "next",
          "nextNodeId": 6,
          "shortCode": "5: No"
        }
      },
      {
        "id": 6,
        "question": "Is Earth attracting a mass downward?",
        "onYes": {
          "type": "result",
          "shortCode": "6: Yes",
          "result": {
            "group": "GRAVITY / WEIGHT",
            "emoji": "🔬",
            "sizeRank": "Evidence-based identification",
            "keyTrait": "Weight is measured in newtons.",
            "examples": "Weight is measured in newtons."
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
      "slug": "force,-friction-and-learning-objectives",
      "title": "Topic 1: Force, Friction & Learning Objectives",
      "shortExplanation": "A force is a push or pull that can change motion or shape. Friction opposes relative motion between surfaces.",
      "keyCharacteristics": {
        "points": [
          "A force is a push or pull that can change motion or shape. Friction opposes relative motion between surfaces.",
          "Even apparently smooth surfaces contain tiny ridges and grooves; contact interactions resist sliding.",
          "Rough surfaces generally provide more grip than smooth or oily ones. Wet floors and banana peels reduce useful grip and can cause slipping.",
          "Learning goals: investigate friction, air resistance, gravity, mass and weight, balanced forces, inertia and simple machines.",
          "Compare levers, inclined planes and wedges and identify their uses at school and home."
        ]
      },
      "deepDiveSections": [
        {
          "title": "Particle / force explanation",
          "emoji": "🔬",
          "points": [
            "Even apparently smooth surfaces contain tiny ridges and grooves; contact interactions resist sliding.",
            "Rough surfaces generally provide more grip than smooth or oily ones. Wet floors and banana peels reduce useful grip and can cause slipping."
          ]
        },
        {
          "title": "Apply your understanding",
          "emoji": "💡",
          "points": [
            "Learning goals: investigate friction, air resistance, gravity, mass and weight, balanced forces, inertia and simple machines.",
            "Compare levers, inclined planes and wedges and identify their uses at school and home."
          ]
        }
      ],
      "realWorldExamples": [
        {
          "name": "Everyday connection",
          "emoji": "🏠",
          "description": "Sports shoes grip a running track; oily roads can let tyres skid."
        },
        {
          "name": "Classroom investigation",
          "emoji": "🧪",
          "description": "Predict, observe, record evidence, and explain using the scientific ideas above."
        },
        {
          "name": "Check your model",
          "emoji": "🧠",
          "description": "Compare levers, inclined planes and wedges and identify their uses at school and home."
        }
      ],
      "mnemonic": {
        "acronym": "PP",
        "meaning": "Push, Pull",
        "items": [
          {
            "letter": "P",
            "word": "Push"
          },
          {
            "letter": "P",
            "word": "Pull"
          }
        ]
      },
      "riddle": {
        "prompt": "Which key term fits this clue? Sports shoes grip a running track; oily roads can let tyres skid.",
        "answer": "FORCE",
        "explanation": "A force is a push or pull that can change motion or shape. Friction opposes relative motion between surfaces."
      },
      "unscrambles": [
        {
          "scrambled": "ECROF",
          "solution": "FORCE",
          "hint": "Force, Friction & Learning Objectives"
        }
      ],
      "secretCodeActivity": {
        "cipher": "A=1..Z=26",
        "items": [
          {
            "encoded": "6-15-18-3-5",
            "answer": "FORCE",
            "sentence": "A force is a push or pull that can change motion or shape. Friction opposes relative motion between surfaces."
          }
        ]
      },
      "flowchartAscii": "Observe → Predict → Investigate → Explain\nA force is a push or pull that can change motion or shape. Friction opposes relative motion between surfaces.\n  ↓ Even apparently smooth surfaces contain tiny ridges and grooves; contact interactions resist sliding.\n  ↓ Rough surfaces generally provide more grip than smooth or oily ones. Wet floors and banana peels reduce useful grip and can cause slipping.",
      "vennDiagram": {
        "leftTitle": "Useful friction",
        "leftPoints": [
          "Shoes grip; brakes slow a bicycle."
        ],
        "middleTitle": "Contact interactions",
        "middlePoints": [
          "Friction resists relative motion."
        ],
        "rightTitle": "Unwanted friction",
        "rightPoints": [
          "Moving parts wear and heat up."
        ]
      }
    },
    {
      "id": 2,
      "slug": "investigating-and-using-friction",
      "title": "Topic 2: Investigating & Using Friction",
      "shortExplanation": "Friction is useful for walking, braking, gripping, keeping knots tied and holding nails, nuts and bolts.",
      "keyCharacteristics": {
        "points": [
          "Friction is useful for walking, braking, gripping, keeping knots tied and holding nails, nuts and bolts.",
          "Rubbing hands warms them; friction can light a match. Never test matches without an adult.",
          "Friction also causes wear and tear, heats moving parts and transfers useful mechanical energy to the surroundings.",
          "Compare a shoe dragged over doormat, sandpaper, plastic and oiled plastic; greater rubber-band extension indicates greater pulling force under matched conditions.",
          "Keep shoe load, band, speed and direction consistent; do not assume every rough material gives exactly the same friction."
        ]
      },
      "deepDiveSections": [
        {
          "title": "Particle / force explanation",
          "emoji": "🔬",
          "points": [
            "Rubbing hands warms them; friction can light a match. Never test matches without an adult.",
            "Friction also causes wear and tear, heats moving parts and transfers useful mechanical energy to the surroundings."
          ]
        },
        {
          "title": "Apply your understanding",
          "emoji": "💡",
          "points": [
            "Compare a shoe dragged over doormat, sandpaper, plastic and oiled plastic; greater rubber-band extension indicates greater pulling force under matched conditions.",
            "Keep shoe load, band, speed and direction consistent; do not assume every rough material gives exactly the same friction."
          ]
        }
      ],
      "realWorldExamples": [
        {
          "name": "Everyday connection",
          "emoji": "🏠",
          "description": "Brakes rely on friction to slow a bicycle safely."
        },
        {
          "name": "Classroom investigation",
          "emoji": "🧪",
          "description": "Predict, observe, record evidence, and explain using the scientific ideas above."
        },
        {
          "name": "Check your model",
          "emoji": "🧠",
          "description": "Keep shoe load, band, speed and direction consistent; do not assume every rough material gives exactly the same friction."
        }
      ],
      "mnemonic": {
        "acronym": "GWH",
        "meaning": "Grip, Wear, Heat",
        "items": [
          {
            "letter": "G",
            "word": "Grip is useful"
          },
          {
            "letter": "W",
            "word": "Wear is unwanted"
          },
          {
            "letter": "H",
            "word": "Heat can help or waste energy"
          }
        ]
      },
      "riddle": {
        "prompt": "Which key term fits this clue? Brakes rely on friction to slow a bicycle safely.",
        "answer": "FRICTION",
        "explanation": "Friction is useful for walking, braking, gripping, keeping knots tied and holding nails, nuts and bolts."
      },
      "unscrambles": [
        {
          "scrambled": "NOITCIRF",
          "solution": "FRICTION",
          "hint": "Investigating & Using Friction"
        }
      ],
      "secretCodeActivity": {
        "cipher": "A=1..Z=26",
        "items": [
          {
            "encoded": "6-18-9-3-20-9-15-14",
            "answer": "FRICTION",
            "sentence": "Friction is useful for walking, braking, gripping, keeping knots tied and holding nails, nuts and bolts."
          }
        ]
      },
      "flowchartAscii": "Observe → Predict → Investigate → Explain\nFriction is useful for walking, braking, gripping, keeping knots tied and holding nails, nuts and bolts.\n  ↓ Rubbing hands warms them; friction can light a match. Never test matches without an adult.\n  ↓ Friction also causes wear and tear, heats moving parts and transfers useful mechanical energy to the surroundings.",
      "vennDiagram": {
        "leftTitle": "Rough contact",
        "leftPoints": [
          "Usually more grip for the same materials and load."
        ],
        "middleTitle": "Test fairly",
        "middlePoints": [
          "Same shoe load, band and pulling conditions."
        ],
        "rightTitle": "Lubricated contact",
        "rightPoints": [
          "Often less sliding resistance."
        ]
      }
    },
    {
      "id": 3,
      "slug": "reducing-friction-and-air-resistance",
      "title": "Topic 3: Reducing Friction & Air Resistance",
      "shortExplanation": "Lubricants, suitable smoothing/polishing and ball bearings reduce unwanted friction in machines.",
      "keyCharacteristics": {
        "points": [
          "Lubricants, suitable smoothing/polishing and ball bearings reduce unwanted friction in machines.",
          "Rolling often resists movement less than sliding; bearings allow parts to roll rather than scrape.",
          "For ordinary dry sliding, friction depends mainly on surface pair and pressing force, not simply the apparent contact area. Smaller area is not a universal friction-reduction rule.",
          "Air resistance is frictional drag between air and a moving object; faster motion generally increases drag.",
          "Streamlined aircraft, cars, swimmers and smooth clothing reduce drag; a spread parachute deliberately increases drag to slow descent."
        ]
      },
      "deepDiveSections": [
        {
          "title": "Particle / force explanation",
          "emoji": "🔬",
          "points": [
            "Rolling often resists movement less than sliding; bearings allow parts to roll rather than scrape.",
            "For ordinary dry sliding, friction depends mainly on surface pair and pressing force, not simply the apparent contact area. Smaller area is not a universal friction-reduction rule."
          ]
        },
        {
          "title": "Apply your understanding",
          "emoji": "💡",
          "points": [
            "Air resistance is frictional drag between air and a moving object; faster motion generally increases drag.",
            "Streamlined aircraft, cars, swimmers and smooth clothing reduce drag; a spread parachute deliberately increases drag to slow descent."
          ]
        }
      ],
      "realWorldExamples": [
        {
          "name": "Everyday connection",
          "emoji": "🏠",
          "description": "A cyclist bends low to reduce air resistance; a parachute opens wide to increase it."
        },
        {
          "name": "Classroom investigation",
          "emoji": "🧪",
          "description": "Predict, observe, record evidence, and explain using the scientific ideas above."
        },
        {
          "name": "Check your model",
          "emoji": "🧠",
          "description": "Streamlined aircraft, cars, swimmers and smooth clothing reduce drag; a spread parachute deliberately increases drag to slow descent."
        }
      ],
      "mnemonic": {
        "acronym": "LRS",
        "meaning": "Lubricate, Roll, Streamline",
        "items": [
          {
            "letter": "L",
            "word": "Lubricate moving contacts"
          },
          {
            "letter": "R",
            "word": "Roll using bearings"
          },
          {
            "letter": "S",
            "word": "Streamline through air"
          }
        ]
      },
      "riddle": {
        "prompt": "Which key term fits this clue? A cyclist bends low to reduce air resistance; a parachute opens wide to increase it.",
        "answer": "DRAG",
        "explanation": "Lubricants, suitable smoothing/polishing and ball bearings reduce unwanted friction in machines."
      },
      "unscrambles": [
        {
          "scrambled": "GARD",
          "solution": "DRAG",
          "hint": "Reducing Friction & Air Resistance"
        }
      ],
      "secretCodeActivity": {
        "cipher": "A=1..Z=26",
        "items": [
          {
            "encoded": "4-18-1-7",
            "answer": "DRAG",
            "sentence": "Lubricants, suitable smoothing/polishing and ball bearings reduce unwanted friction in machines."
          }
        ]
      },
      "flowchartAscii": "Observe → Predict → Investigate → Explain\nLubricants, suitable smoothing/polishing and ball bearings reduce unwanted friction in machines.\n  ↓ Rolling often resists movement less than sliding; bearings allow parts to roll rather than scrape.\n  ↓ For ordinary dry sliding, friction depends mainly on surface pair and pressing force, not simply the apparent contact area. Smaller area is not a universal friction-reduction rule.",
      "vennDiagram": {
        "leftTitle": "Streamlined shape",
        "leftPoints": [
          "Reduces drag for efficient travel."
        ],
        "middleTitle": "Air resistance",
        "middlePoints": [
          "Air exerts force on moving objects."
        ],
        "rightTitle": "Open parachute",
        "rightPoints": [
          "Increases drag to slow descent."
        ]
      }
    },
    {
      "id": 4,
      "slug": "gravity,-mass-and-weight",
      "title": "Topic 4: Gravity, Mass & Weight",
      "shortExplanation": "Gravity is an attractive force between masses; Earth pulls objects toward its centre.",
      "keyCharacteristics": {
        "points": [
          "Gravity is an attractive force between masses; Earth pulls objects toward its centre.",
          "Mass is the quantity of matter, measured in kilograms (kg); it stays the same on Earth and the Moon.",
          "Weight is the gravitational force on an object, measured in newtons (N): weight = mass × gravitational field strength.",
          "Using Earth g ≈ 10 N/kg for simple calculations, a 2 kg bag weighs about 20 N. On the Moon its weight is about one sixth as much, but its mass remains 2 kg.",
          "Adding books increases both mass and Earth weight. Support the bag safely with a hand, not strained fingertips."
        ]
      },
      "deepDiveSections": [
        {
          "title": "Particle / force explanation",
          "emoji": "🔬",
          "points": [
            "Mass is the quantity of matter, measured in kilograms (kg); it stays the same on Earth and the Moon.",
            "Weight is the gravitational force on an object, measured in newtons (N): weight = mass × gravitational field strength."
          ]
        },
        {
          "title": "Apply your understanding",
          "emoji": "💡",
          "points": [
            "Using Earth g ≈ 10 N/kg for simple calculations, a 2 kg bag weighs about 20 N. On the Moon its weight is about one sixth as much, but its mass remains 2 kg.",
            "Adding books increases both mass and Earth weight. Support the bag safely with a hand, not strained fingertips."
          ]
        }
      ],
      "realWorldExamples": [
        {
          "name": "Everyday connection",
          "emoji": "🏠",
          "description": "A school bag is harder to lift after adding books because Earth pulls more strongly on its greater mass."
        },
        {
          "name": "Classroom investigation",
          "emoji": "🧪",
          "description": "Predict, observe, record evidence, and explain using the scientific ideas above."
        },
        {
          "name": "Check your model",
          "emoji": "🧠",
          "description": "Adding books increases both mass and Earth weight. Support the bag safely with a hand, not strained fingertips."
        }
      ],
      "mnemonic": {
        "acronym": "MKWN",
        "meaning": "Mass: Kilograms; Weight: Newtons",
        "items": [
          {
            "letter": "M",
            "word": "Mass"
          },
          {
            "letter": "K",
            "word": "Kilograms"
          },
          {
            "letter": "W",
            "word": "Weight"
          },
          {
            "letter": "N",
            "word": "Newtons"
          }
        ]
      },
      "riddle": {
        "prompt": "Which key term fits this clue? A school bag is harder to lift after adding books because Earth pulls more strongly on its greater mass.",
        "answer": "GRAVITY",
        "explanation": "Gravity is an attractive force between masses; Earth pulls objects toward its centre."
      },
      "unscrambles": [
        {
          "scrambled": "YTIVARG",
          "solution": "GRAVITY",
          "hint": "Gravity, Mass & Weight"
        }
      ],
      "secretCodeActivity": {
        "cipher": "A=1..Z=26",
        "items": [
          {
            "encoded": "7-18-1-22-9-20-25",
            "answer": "GRAVITY",
            "sentence": "Gravity is an attractive force between masses; Earth pulls objects toward its centre."
          }
        ]
      },
      "flowchartAscii": "Observe → Predict → Investigate → Explain\nGravity is an attractive force between masses; Earth pulls objects toward its centre.\n  ↓ Mass is the quantity of matter, measured in kilograms (kg); it stays the same on Earth and the Moon.\n  ↓ Weight is the gravitational force on an object, measured in newtons (N): weight = mass × gravitational field strength.",
      "vennDiagram": {
        "leftTitle": "Mass",
        "leftPoints": [
          "Quantity of matter, in kg; unchanged on Moon."
        ],
        "middleTitle": "Related quantities",
        "middlePoints": [
          "Weight equals mass times gravitational field strength."
        ],
        "rightTitle": "Weight",
        "rightPoints": [
          "Gravitational force, in N; changes with location."
        ]
      }
    },
    {
      "id": 5,
      "slug": "balanced-forces,-unbalanced-forces-and-inertia",
      "title": "Topic 5: Balanced Forces, Unbalanced Forces & Inertia",
      "shortExplanation": "Balanced forces have zero resultant force: motion does not change. Unbalanced forces change speed or direction.",
      "keyCharacteristics": {
        "points": [
          "Balanced forces have zero resultant force: motion does not change. Unbalanced forces change speed or direction.",
          "Equal opposite pulls in tug-of-war can balance; a resting block has downward weight balanced by upward support.",
          "Balanced forces do not always mean rest: an object may continue at constant speed in a straight line.",
          "Inertia is the tendency to resist a change in motion. A bus starting makes the upper body lag; stopping makes it continue forward.",
          "Flick a card quickly from under a coin over a cup: the coin initially resists horizontal motion, then gravity pulls it into the cup."
        ]
      },
      "deepDiveSections": [
        {
          "title": "Particle / force explanation",
          "emoji": "🔬",
          "points": [
            "Equal opposite pulls in tug-of-war can balance; a resting block has downward weight balanced by upward support.",
            "Balanced forces do not always mean rest: an object may continue at constant speed in a straight line."
          ]
        },
        {
          "title": "Apply your understanding",
          "emoji": "💡",
          "points": [
            "Inertia is the tendency to resist a change in motion. A bus starting makes the upper body lag; stopping makes it continue forward.",
            "Flick a card quickly from under a coin over a cup: the coin initially resists horizontal motion, then gravity pulls it into the cup."
          ]
        }
      ],
      "realWorldExamples": [
        {
          "name": "Everyday connection",
          "emoji": "🏠",
          "description": "Passengers tend to lean forward when a moving bus brakes suddenly."
        },
        {
          "name": "Classroom investigation",
          "emoji": "🧪",
          "description": "Predict, observe, record evidence, and explain using the scientific ideas above."
        },
        {
          "name": "Check your model",
          "emoji": "🧠",
          "description": "Flick a card quickly from under a coin over a cup: the coin initially resists horizontal motion, then gravity pulls it into the cup."
        }
      ],
      "mnemonic": {
        "acronym": "ZNC",
        "meaning": "Zero Net, No Change",
        "items": [
          {
            "letter": "Z",
            "word": "Zero resultant"
          },
          {
            "letter": "N",
            "word": "No change in velocity"
          },
          {
            "letter": "C",
            "word": "Constant motion or rest"
          }
        ]
      },
      "riddle": {
        "prompt": "Which key term fits this clue? Passengers tend to lean forward when a moving bus brakes suddenly.",
        "answer": "INERTIA",
        "explanation": "Balanced forces have zero resultant force: motion does not change. Unbalanced forces change speed or direction."
      },
      "unscrambles": [
        {
          "scrambled": "AITRENI",
          "solution": "INERTIA",
          "hint": "Balanced Forces, Unbalanced Forces & Inertia"
        }
      ],
      "secretCodeActivity": {
        "cipher": "A=1..Z=26",
        "items": [
          {
            "encoded": "9-14-5-18-20-9-1",
            "answer": "INERTIA",
            "sentence": "Balanced forces have zero resultant force: motion does not change. Unbalanced forces change speed or direction."
          }
        ]
      },
      "flowchartAscii": "Forces on an object\n  ├─ Equal and opposite → zero resultant → no change in velocity\n  └─ Not balanced → non-zero resultant → speed / direction changes\nInertia: resistance to that change (not a separate forward force)",
      "vennDiagram": {
        "leftTitle": "Balanced forces",
        "leftPoints": [
          "Zero resultant; constant velocity or rest."
        ],
        "middleTitle": "Forces combine",
        "middlePoints": [
          "Compare size and direction to find resultant."
        ],
        "rightTitle": "Unbalanced forces",
        "rightPoints": [
          "Non-zero resultant; motion changes."
        ]
      }
    },
    {
      "id": 6,
      "slug": "levers:-three-kinds",
      "title": "Topic 6: Levers: Three Kinds",
      "shortExplanation": "A lever is a rigid bar that turns about a fixed point, the fulcrum. Effort is the applied force; load is the object or resistance moved.",
      "keyCharacteristics": {
        "points": [
          "A lever is a rigid bar that turns about a fixed point, the fulcrum. Effort is the applied force; load is the object or resistance moved.",
          "First kind: fulcrum between effort and load (E–F–L); seesaw, scissors, pliers, claw hammer pulling a nail.",
          "Second kind: load between fulcrum and effort (F–L–E); wheelbarrow, nutcracker, simple bottle opener.",
          "Third kind: effort between fulcrum and load (F–E–L); tweezers, fishing rod, broom held with one hand at its top.",
          "“FLE” names the middle part for kinds 1, 2, 3. Third-kind levers often trade greater effort for speed or distance; not every machine reduces force. Nail cutters and staplers may be compound or depend on design."
        ]
      },
      "deepDiveSections": [
        {
          "title": "Particle / force explanation",
          "emoji": "🔬",
          "points": [
            "First kind: fulcrum between effort and load (E–F–L); seesaw, scissors, pliers, claw hammer pulling a nail.",
            "Second kind: load between fulcrum and effort (F–L–E); wheelbarrow, nutcracker, simple bottle opener."
          ]
        },
        {
          "title": "Apply your understanding",
          "emoji": "💡",
          "points": [
            "Third kind: effort between fulcrum and load (F–E–L); tweezers, fishing rod, broom held with one hand at its top.",
            "“FLE” names the middle part for kinds 1, 2, 3. Third-kind levers often trade greater effort for speed or distance; not every machine reduces force. Nail cutters and staplers may be compound or depend on design."
          ]
        }
      ],
      "realWorldExamples": [
        {
          "name": "Everyday connection",
          "emoji": "🏠",
          "description": "In a wheelbarrow, the wheel is the fulcrum, the contents are the load and hands provide effort."
        },
        {
          "name": "Classroom investigation",
          "emoji": "🧪",
          "description": "Predict, observe, record evidence, and explain using the scientific ideas above."
        },
        {
          "name": "Check your model",
          "emoji": "🧠",
          "description": "“FLE” names the middle part for kinds 1, 2, 3. Third-kind levers often trade greater effort for speed or distance; not every machine reduces force. Nail cutters and staplers may be compound or depend on design."
        }
      ],
      "mnemonic": {
        "acronym": "FLE",
        "meaning": "The middle part gives lever kinds 1, 2, 3",
        "items": [
          {
            "letter": "F",
            "word": "Fulcrum: first"
          },
          {
            "letter": "L",
            "word": "Load: second"
          },
          {
            "letter": "E",
            "word": "Effort: third"
          }
        ]
      },
      "riddle": {
        "prompt": "Which key term fits this clue? In a wheelbarrow, the wheel is the fulcrum, the contents are the load and hands provide effort.",
        "answer": "LEVER",
        "explanation": "A lever is a rigid bar that turns about a fixed point, the fulcrum. Effort is the applied force; load is the object or resistance moved."
      },
      "unscrambles": [
        {
          "scrambled": "REVEL",
          "solution": "LEVER",
          "hint": "Levers: Three Kinds"
        }
      ],
      "secretCodeActivity": {
        "cipher": "A=1..Z=26",
        "items": [
          {
            "encoded": "12-5-22-5-18",
            "answer": "LEVER",
            "sentence": "A lever is a rigid bar that turns about a fixed point, the fulcrum. Effort is the applied force; load is the object or resistance moved."
          }
        ]
      },
      "flowchartAscii": "Key: F = fulcrum, E = effort, L = load\n1st: E ─── F ─── L  (fulcrum middle)\n2nd: F ─── L ─── E  (load middle)\n3rd: F ─── E ─── L  (effort middle)",
      "vennDiagram": {
        "leftTitle": "First kind",
        "leftPoints": [
          "Fulcrum in middle; E–F–L."
        ],
        "middleTitle": "All levers",
        "middlePoints": [
          "Have fulcrum, effort and load."
        ],
        "rightTitle": "Second / third kinds",
        "rightPoints": [
          "Load in middle / effort in middle."
        ]
      }
    },
    {
      "id": 7,
      "slug": "inclined-planes-and-wedges",
      "title": "Topic 7: Inclined Planes & Wedges",
      "shortExplanation": "An inclined plane is a sloping flat surface used to raise or lower a load with less force over a longer distance.",
      "keyCharacteristics": {
        "points": [
          "An inclined plane is a sloping flat surface used to raise or lower a load with less force over a longer distance.",
          "Wheelchair ramps, loading ramps and sloping emergency routes are daily examples; a gentler ramp generally needs less effort for the same height.",
          "Compare spring-scale force for lifting a stone vertically and pulling it along a ramp to the same height; friction affects the measured values.",
          "A wedge consists of two inclined surfaces meeting at a sharp edge; pushing it drives material apart.",
          "Axes, knives, nails and push pins act as wedges. Machines do not create energy: reduced force is traded for greater distance, with friction causing extra energy transfer."
        ]
      },
      "deepDiveSections": [
        {
          "title": "Particle / force explanation",
          "emoji": "🔬",
          "points": [
            "Wheelchair ramps, loading ramps and sloping emergency routes are daily examples; a gentler ramp generally needs less effort for the same height.",
            "Compare spring-scale force for lifting a stone vertically and pulling it along a ramp to the same height; friction affects the measured values."
          ]
        },
        {
          "title": "Apply your understanding",
          "emoji": "💡",
          "points": [
            "A wedge consists of two inclined surfaces meeting at a sharp edge; pushing it drives material apart.",
            "Axes, knives, nails and push pins act as wedges. Machines do not create energy: reduced force is traded for greater distance, with friction causing extra energy transfer."
          ]
        }
      ],
      "realWorldExamples": [
        {
          "name": "Everyday connection",
          "emoji": "🏠",
          "description": "A knife separates food with a wedge; a ramp lets a heavy trolley rise gradually."
        },
        {
          "name": "Classroom investigation",
          "emoji": "🧪",
          "description": "Predict, observe, record evidence, and explain using the scientific ideas above."
        },
        {
          "name": "Check your model",
          "emoji": "🧠",
          "description": "Axes, knives, nails and push pins act as wedges. Machines do not create energy: reduced force is traded for greater distance, with friction causing extra energy transfer."
        }
      ],
      "mnemonic": {
        "acronym": "RWE",
        "meaning": "Ramp, Wedge, Energy",
        "items": [
          {
            "letter": "R",
            "word": "Ramp raises loads"
          },
          {
            "letter": "W",
            "word": "Wedge splits"
          },
          {
            "letter": "E",
            "word": "Energy is not created"
          }
        ]
      },
      "riddle": {
        "prompt": "Which key term fits this clue? A knife separates food with a wedge; a ramp lets a heavy trolley rise gradually.",
        "answer": "WEDGE",
        "explanation": "An inclined plane is a sloping flat surface used to raise or lower a load with less force over a longer distance."
      },
      "unscrambles": [
        {
          "scrambled": "EGDEW",
          "solution": "WEDGE",
          "hint": "Inclined Planes & Wedges"
        }
      ],
      "secretCodeActivity": {
        "cipher": "A=1..Z=26",
        "items": [
          {
            "encoded": "23-5-4-7-5",
            "answer": "WEDGE",
            "sentence": "An inclined plane is a sloping flat surface used to raise or lower a load with less force over a longer distance."
          }
        ]
      },
      "flowchartAscii": "Observe → Predict → Investigate → Explain\nAn inclined plane is a sloping flat surface used to raise or lower a load with less force over a longer distance.\n  ↓ Wheelchair ramps, loading ramps and sloping emergency routes are daily examples; a gentler ramp generally needs less effort for the same height.\n  ↓ Compare spring-scale force for lifting a stone vertically and pulling it along a ramp to the same height; friction affects the measured values.",
      "vennDiagram": {
        "leftTitle": "Inclined plane",
        "leftPoints": [
          "Load travels along a ramp to rise or descend."
        ],
        "middleTitle": "Simple machines",
        "middlePoints": [
          "Trade force and distance, not create energy."
        ],
        "rightTitle": "Wedge",
        "rightPoints": [
          "Tool moves into material to split it."
        ]
      }
    },
    {
      "id": 8,
      "slug": "review,-lever-identification-and-inquiry-project",
      "title": "Topic 8: Review, Lever Identification & Inquiry Project",
      "shortExplanation": "Identify a machine by its actual pivot, input force and load, not only by its name or appearance.",
      "keyCharacteristics": {
        "points": [
          "Identify a machine by its actual pivot, input force and load, not only by its name or appearance.",
          "Draw and label F, E and L: scissors have F at the screw, E at handles, L at cutting edges; wheelbarrow has F at wheel, L in tray, E at handles.",
          "For a broom, top hand is F, lower hand is E, brush contact is L; different grips can change the arrangement.",
          "Survey home and school: draw or photograph a safe machine, mark moving parts, classify it and explain its function.",
          "Tyre treads channel water away and improve wet-road grip; aircraft streamline to reduce drag. Never add oil to tyres, brakes or a walking surface."
        ]
      },
      "deepDiveSections": [
        {
          "title": "Particle / force explanation",
          "emoji": "🔬",
          "points": [
            "Draw and label F, E and L: scissors have F at the screw, E at handles, L at cutting edges; wheelbarrow has F at wheel, L in tray, E at handles.",
            "For a broom, top hand is F, lower hand is E, brush contact is L; different grips can change the arrangement."
          ]
        },
        {
          "title": "Apply your understanding",
          "emoji": "💡",
          "points": [
            "Survey home and school: draw or photograph a safe machine, mark moving parts, classify it and explain its function.",
            "Tyre treads channel water away and improve wet-road grip; aircraft streamline to reduce drag. Never add oil to tyres, brakes or a walking surface."
          ]
        }
      ],
      "realWorldExamples": [
        {
          "name": "Everyday connection",
          "emoji": "🏠",
          "description": "A home survey can compare scissors, a bottle opener, a broom, a ramp and a kitchen knife."
        },
        {
          "name": "Classroom investigation",
          "emoji": "🧪",
          "description": "Predict, observe, record evidence, and explain using the scientific ideas above."
        },
        {
          "name": "Check your model",
          "emoji": "🧠",
          "description": "Tyre treads channel water away and improve wet-road grip; aircraft streamline to reduce drag. Never add oil to tyres, brakes or a walking surface."
        }
      ],
      "mnemonic": {
        "acronym": "FEL",
        "meaning": "Find Effort, fulcrum and Load before classifying",
        "items": [
          {
            "letter": "F",
            "word": "Find pivot"
          },
          {
            "letter": "E",
            "word": "Effort input"
          },
          {
            "letter": "L",
            "word": "Load output"
          }
        ]
      },
      "riddle": {
        "prompt": "Which key term fits this clue? A home survey can compare scissors, a bottle opener, a broom, a ramp and a kitchen knife.",
        "answer": "MACHINES",
        "explanation": "Identify a machine by its actual pivot, input force and load, not only by its name or appearance."
      },
      "unscrambles": [
        {
          "scrambled": "SENIHCAM",
          "solution": "MACHINES",
          "hint": "Review, Lever Identification & Inquiry Project"
        }
      ],
      "secretCodeActivity": {
        "cipher": "A=1..Z=26",
        "items": [
          {
            "encoded": "13-1-3-8-9-14-5-19",
            "answer": "MACHINES",
            "sentence": "Identify a machine by its actual pivot, input force and load, not only by its name or appearance."
          }
        ]
      },
      "flowchartAscii": "Observe → Predict → Investigate → Explain\nIdentify a machine by its actual pivot, input force and load, not only by its name or appearance.\n  ↓ Draw and label F, E and L: scissors have F at the screw, E at handles, L at cutting edges; wheelbarrow has F at wheel, L in tray, E at handles.\n  ↓ For a broom, top hand is F, lower hand is E, brush contact is L; different grips can change the arrangement.",
      "vennDiagram": {
        "leftTitle": "Identify structure",
        "leftPoints": [
          "Locate pivot and applied force."
        ],
        "middleTitle": "Evidence-based classification",
        "middlePoints": [
          "Inspect the actual design and label parts."
        ],
        "rightTitle": "Explain function",
        "rightPoints": [
          "State what load moves and what the machine changes."
        ]
      }
    }
  ],
  "mcqs": [
    {
      "id": "stbb-ch6-mcq-1",
      "number": 1,
      "section": "A",
      "sectionTitle": "Core concepts",
      "question": "A force is what?",
      "options": [
        "A push or pull",
        "A unit of mass",
        "Only heat",
        "Only light"
      ],
      "correctIndex": 0,
      "explanation": "A push or pull. A force is a push or pull that can change motion or shape. Friction opposes relative motion between surfaces.",
      "topicRefId": 1
    },
    {
      "id": "stbb-ch6-mcq-2",
      "number": 2,
      "section": "A",
      "sectionTitle": "Core concepts",
      "question": "Friction generally acts in which direction?",
      "options": [
        "Always upward",
        "Opposite relative sliding motion",
        "Always east",
        "Only toward Earth"
      ],
      "correctIndex": 1,
      "explanation": "Opposite relative sliding motion. A force is a push or pull that can change motion or shape. Friction opposes relative motion between surfaces.",
      "topicRefId": 1
    },
    {
      "id": "stbb-ch6-mcq-3",
      "number": 3,
      "section": "A",
      "sectionTitle": "Core concepts",
      "question": "What contributes to sliding friction?",
      "options": [
        "Absence of particles",
        "Only colour",
        "Surface interactions and tiny irregularities",
        "Only brightness"
      ],
      "correctIndex": 2,
      "explanation": "Surface interactions and tiny irregularities. A force is a push or pull that can change motion or shape. Friction opposes relative motion between surfaces.",
      "topicRefId": 1
    },
    {
      "id": "stbb-ch6-mcq-4",
      "number": 4,
      "section": "A",
      "sectionTitle": "Core concepts",
      "question": "Which usually gives a runner better grip?",
      "options": [
        "Banana peel",
        "Oil under shoes",
        "Smooth ice",
        "Suitable rubber sports shoes"
      ],
      "correctIndex": 3,
      "explanation": "Suitable rubber sports shoes. A force is a push or pull that can change motion or shape. Friction opposes relative motion between surfaces.",
      "topicRefId": 1
    },
    {
      "id": "stbb-ch6-mcq-5",
      "number": 5,
      "section": "A",
      "sectionTitle": "Core concepts",
      "question": "Why can oily roads cause skidding?",
      "options": [
        "Reduced tyre-road grip",
        "Increased tyre mass only",
        "No gravity",
        "More daylight"
      ],
      "correctIndex": 0,
      "explanation": "Reduced tyre-road grip. A force is a push or pull that can change motion or shape. Friction opposes relative motion between surfaces.",
      "topicRefId": 1
    },
    {
      "id": "stbb-ch6-mcq-6",
      "number": 6,
      "section": "A",
      "sectionTitle": "Core concepts",
      "question": "Which is a benefit of friction?",
      "options": [
        "Machine wear",
        "Braking a bicycle",
        "Wasted heating in bearings",
        "Tyre damage"
      ],
      "correctIndex": 1,
      "explanation": "Braking a bicycle. Friction is useful for walking, braking, gripping, keeping knots tied and holding nails, nuts and bolts.",
      "topicRefId": 2
    },
    {
      "id": "stbb-ch6-mcq-7",
      "number": 7,
      "section": "A",
      "sectionTitle": "Core concepts",
      "question": "Which is a disadvantage of friction?",
      "options": [
        "Ability to walk",
        "Grip of knots",
        "Wear of moving parts",
        "Brake action"
      ],
      "correctIndex": 2,
      "explanation": "Wear of moving parts. Friction is useful for walking, braking, gripping, keeping knots tied and holding nails, nuts and bolts.",
      "topicRefId": 2
    },
    {
      "id": "stbb-ch6-mcq-8",
      "number": 8,
      "section": "A",
      "sectionTitle": "Core concepts",
      "question": "Rubbing hands makes them warm because of what?",
      "options": [
        "Mass disappears",
        "Gravity stops",
        "Air vanishes",
        "Friction transfers energy to heat"
      ],
      "correctIndex": 3,
      "explanation": "Friction transfers energy to heat. Friction is useful for walking, braking, gripping, keeping knots tied and holding nails, nuts and bolts.",
      "topicRefId": 2
    },
    {
      "id": "stbb-ch6-mcq-9",
      "number": 9,
      "section": "A",
      "sectionTitle": "Core concepts",
      "question": "In a shoe test, larger band extension indicates what?",
      "options": [
        "Greater pulling force",
        "Less matter",
        "Lower gravity",
        "Smaller shoe size"
      ],
      "correctIndex": 0,
      "explanation": "Greater pulling force. Friction is useful for walking, braking, gripping, keeping knots tied and holding nails, nuts and bolts.",
      "topicRefId": 2
    },
    {
      "id": "stbb-ch6-mcq-10",
      "number": 10,
      "section": "A",
      "sectionTitle": "Core concepts",
      "question": "What should stay constant in a fair shoe test?",
      "options": [
        "Only surface colour",
        "Shoe load and pulling conditions",
        "All surface types",
        "Every result"
      ],
      "correctIndex": 1,
      "explanation": "Shoe load and pulling conditions. Friction is useful for walking, braking, gripping, keeping knots tied and holding nails, nuts and bolts.",
      "topicRefId": 2
    },
    {
      "id": "stbb-ch6-mcq-11",
      "number": 11,
      "section": "B",
      "sectionTitle": "Models and causes",
      "question": "Which reduces friction in a bearing?",
      "options": [
        "Sand",
        "Dust",
        "Grease",
        "Rust"
      ],
      "correctIndex": 2,
      "explanation": "Grease. Lubricants, suitable smoothing/polishing and ball bearings reduce unwanted friction in machines.",
      "topicRefId": 3
    },
    {
      "id": "stbb-ch6-mcq-12",
      "number": 12,
      "section": "B",
      "sectionTitle": "Models and causes",
      "question": "Why use ball bearings?",
      "options": [
        "They remove gravity",
        "They create energy",
        "They stop all motion",
        "Rolling replaces much sliding"
      ],
      "correctIndex": 3,
      "explanation": "Rolling replaces much sliding. Lubricants, suitable smoothing/polishing and ball bearings reduce unwanted friction in machines.",
      "topicRefId": 3
    },
    {
      "id": "stbb-ch6-mcq-13",
      "number": 13,
      "section": "B",
      "sectionTitle": "Models and causes",
      "question": "Does smaller apparent area always reduce dry sliding friction?",
      "options": [
        "No, that is not a universal rule",
        "Yes, in all cases",
        "Only colour matters",
        "Friction has no causes"
      ],
      "correctIndex": 0,
      "explanation": "No, that is not a universal rule. Lubricants, suitable smoothing/polishing and ball bearings reduce unwanted friction in machines.",
      "topicRefId": 3
    },
    {
      "id": "stbb-ch6-mcq-14",
      "number": 14,
      "section": "B",
      "sectionTitle": "Models and causes",
      "question": "What is air resistance?",
      "options": [
        "Weight of a stone only",
        "Drag from air on a moving object",
        "A magnetic force",
        "Mass in kilograms"
      ],
      "correctIndex": 1,
      "explanation": "Drag from air on a moving object. Lubricants, suitable smoothing/polishing and ball bearings reduce unwanted friction in machines.",
      "topicRefId": 3
    },
    {
      "id": "stbb-ch6-mcq-15",
      "number": 15,
      "section": "B",
      "sectionTitle": "Models and causes",
      "question": "When speed rises, air drag generally does what?",
      "options": [
        "Always vanishes",
        "Becomes mass",
        "Increases",
        "Turns into gravity"
      ],
      "correctIndex": 2,
      "explanation": "Increases. Lubricants, suitable smoothing/polishing and ball bearings reduce unwanted friction in machines.",
      "topicRefId": 3
    },
    {
      "id": "stbb-ch6-mcq-16",
      "number": 16,
      "section": "B",
      "sectionTitle": "Models and causes",
      "question": "Why streamline aircraft?",
      "options": [
        "Increase surface roughness",
        "Remove all weight",
        "Create fuel",
        "Reduce air resistance"
      ],
      "correctIndex": 3,
      "explanation": "Reduce air resistance. Lubricants, suitable smoothing/polishing and ball bearings reduce unwanted friction in machines.",
      "topicRefId": 3
    },
    {
      "id": "stbb-ch6-mcq-17",
      "number": 17,
      "section": "B",
      "sectionTitle": "Models and causes",
      "question": "Why does an open parachute slow descent?",
      "options": [
        "It increases air resistance",
        "It removes gravity",
        "It makes mass zero",
        "It pulls upward by magnetism"
      ],
      "correctIndex": 0,
      "explanation": "It increases air resistance. Lubricants, suitable smoothing/polishing and ball bearings reduce unwanted friction in machines.",
      "topicRefId": 3
    },
    {
      "id": "stbb-ch6-mcq-18",
      "number": 18,
      "section": "B",
      "sectionTitle": "Models and causes",
      "question": "What is gravity?",
      "options": [
        "Only friction in air",
        "Attraction between masses",
        "Only a push upward",
        "A unit of speed"
      ],
      "correctIndex": 1,
      "explanation": "Attraction between masses. Gravity is an attractive force between masses; Earth pulls objects toward its centre.",
      "topicRefId": 4
    },
    {
      "id": "stbb-ch6-mcq-19",
      "number": 19,
      "section": "B",
      "sectionTitle": "Models and causes",
      "question": "Earth pulls objects toward where?",
      "options": [
        "The nearest cloud",
        "The Sun only",
        "Its centre",
        "The east"
      ],
      "correctIndex": 2,
      "explanation": "Its centre. Gravity is an attractive force between masses; Earth pulls objects toward its centre.",
      "topicRefId": 4
    },
    {
      "id": "stbb-ch6-mcq-20",
      "number": 20,
      "section": "B",
      "sectionTitle": "Models and causes",
      "question": "What is mass measured in?",
      "options": [
        "Newtons",
        "Joules",
        "Centimetres",
        "Kilograms"
      ],
      "correctIndex": 3,
      "explanation": "Kilograms. Gravity is an attractive force between masses; Earth pulls objects toward its centre.",
      "topicRefId": 4
    },
    {
      "id": "stbb-ch6-mcq-21",
      "number": 21,
      "section": "C",
      "sectionTitle": "Processes and applications",
      "question": "What is weight measured in?",
      "options": [
        "Newtons",
        "Kilograms",
        "Litres",
        "Seconds"
      ],
      "correctIndex": 0,
      "explanation": "Newtons. Gravity is an attractive force between masses; Earth pulls objects toward its centre.",
      "topicRefId": 4
    },
    {
      "id": "stbb-ch6-mcq-22",
      "number": 22,
      "section": "C",
      "sectionTitle": "Processes and applications",
      "question": "Which formula gives weight?",
      "options": [
        "Mass ÷ volume",
        "Mass × gravitational field strength",
        "Distance × time",
        "Mass + colour"
      ],
      "correctIndex": 1,
      "explanation": "Mass × gravitational field strength. Gravity is an attractive force between masses; Earth pulls objects toward its centre.",
      "topicRefId": 4
    },
    {
      "id": "stbb-ch6-mcq-23",
      "number": 23,
      "section": "C",
      "sectionTitle": "Processes and applications",
      "question": "A 3 kg bag at 10 N/kg weighs how much?",
      "options": [
        "3 N",
        "300 kg",
        "30 N",
        "10 kg"
      ],
      "correctIndex": 2,
      "explanation": "30 N. Gravity is an attractive force between masses; Earth pulls objects toward its centre.",
      "topicRefId": 4
    },
    {
      "id": "stbb-ch6-mcq-24",
      "number": 24,
      "section": "C",
      "sectionTitle": "Processes and applications",
      "question": "On the Moon an object’s mass does what?",
      "options": [
        "Falls to one sixth",
        "Becomes zero",
        "Doubles",
        "Stays the same"
      ],
      "correctIndex": 3,
      "explanation": "Stays the same. Gravity is an attractive force between masses; Earth pulls objects toward its centre.",
      "topicRefId": 4
    },
    {
      "id": "stbb-ch6-mcq-25",
      "number": 25,
      "section": "C",
      "sectionTitle": "Processes and applications",
      "question": "On the Moon its weight is approximately what fraction of Earth weight?",
      "options": [
        "One sixth",
        "Six times",
        "The same always",
        "Zero"
      ],
      "correctIndex": 0,
      "explanation": "One sixth. Gravity is an attractive force between masses; Earth pulls objects toward its centre.",
      "topicRefId": 4
    },
    {
      "id": "stbb-ch6-mcq-26",
      "number": 26,
      "section": "C",
      "sectionTitle": "Processes and applications",
      "question": "Adding books to a bag on Earth increases what?",
      "options": [
        "Only colour",
        "Both mass and weight",
        "Only volume of air",
        "Neither"
      ],
      "correctIndex": 1,
      "explanation": "Both mass and weight. Gravity is an attractive force between masses; Earth pulls objects toward its centre.",
      "topicRefId": 4
    },
    {
      "id": "stbb-ch6-mcq-27",
      "number": 27,
      "section": "C",
      "sectionTitle": "Processes and applications",
      "question": "Balanced forces have what resultant?",
      "options": [
        "Always 10 N",
        "Always downward",
        "Zero",
        "Infinite"
      ],
      "correctIndex": 2,
      "explanation": "Zero. Balanced forces have zero resultant force: motion does not change. Unbalanced forces change speed or direction.",
      "topicRefId": 5
    },
    {
      "id": "stbb-ch6-mcq-28",
      "number": 28,
      "section": "C",
      "sectionTitle": "Processes and applications",
      "question": "Can balanced forces act on a moving object?",
      "options": [
        "No, only at rest",
        "Only when speeding up",
        "Only during a turn",
        "Yes, at constant velocity"
      ],
      "correctIndex": 3,
      "explanation": "Yes, at constant velocity. Balanced forces have zero resultant force: motion does not change. Unbalanced forces change speed or direction.",
      "topicRefId": 5
    },
    {
      "id": "stbb-ch6-mcq-29",
      "number": 29,
      "section": "C",
      "sectionTitle": "Processes and applications",
      "question": "What do unbalanced forces cause?",
      "options": [
        "A change in motion",
        "No possible change",
        "Disappearance of mass",
        "Only a colour change"
      ],
      "correctIndex": 0,
      "explanation": "A change in motion. Balanced forces have zero resultant force: motion does not change. Unbalanced forces change speed or direction.",
      "topicRefId": 5
    },
    {
      "id": "stbb-ch6-mcq-30",
      "number": 30,
      "section": "C",
      "sectionTitle": "Processes and applications",
      "question": "What is inertia?",
      "options": [
        "A kind of fuel",
        "Resistance to change in motion",
        "Weight divided by time",
        "A source of energy"
      ],
      "correctIndex": 1,
      "explanation": "Resistance to change in motion. Balanced forces have zero resultant force: motion does not change. Unbalanced forces change speed or direction.",
      "topicRefId": 5
    },
    {
      "id": "stbb-ch6-mcq-31",
      "number": 31,
      "section": "D",
      "sectionTitle": "Review and inquiry",
      "question": "Why does a coin drop after a card is flicked away?",
      "options": [
        "The coin becomes weightless",
        "The card attracts it magnetically",
        "Inertia limits sideways motion, then gravity pulls it down",
        "Air creates mass"
      ],
      "correctIndex": 2,
      "explanation": "Inertia limits sideways motion, then gravity pulls it down. Balanced forces have zero resultant force: motion does not change. Unbalanced forces change speed or direction.",
      "topicRefId": 5
    },
    {
      "id": "stbb-ch6-mcq-32",
      "number": 32,
      "section": "D",
      "sectionTitle": "Review and inquiry",
      "question": "What is the fulcrum?",
      "options": [
        "The load",
        "Only the handle",
        "A type of lubricant",
        "The pivot of a lever"
      ],
      "correctIndex": 3,
      "explanation": "The pivot of a lever. A lever is a rigid bar that turns about a fixed point, the fulcrum. Effort is the applied force; load is the object or resistance moved.",
      "topicRefId": 6
    },
    {
      "id": "stbb-ch6-mcq-33",
      "number": 33,
      "section": "D",
      "sectionTitle": "Review and inquiry",
      "question": "What lies in the middle of a first-kind lever?",
      "options": [
        "Fulcrum",
        "Load",
        "Effort",
        "Grease"
      ],
      "correctIndex": 0,
      "explanation": "Fulcrum. A lever is a rigid bar that turns about a fixed point, the fulcrum. Effort is the applied force; load is the object or resistance moved.",
      "topicRefId": 6
    },
    {
      "id": "stbb-ch6-mcq-34",
      "number": 34,
      "section": "D",
      "sectionTitle": "Review and inquiry",
      "question": "What lies in the middle of a second-kind lever?",
      "options": [
        "Fulcrum",
        "Load",
        "Effort",
        "Air"
      ],
      "correctIndex": 1,
      "explanation": "Load. A lever is a rigid bar that turns about a fixed point, the fulcrum. Effort is the applied force; load is the object or resistance moved.",
      "topicRefId": 6
    },
    {
      "id": "stbb-ch6-mcq-35",
      "number": 35,
      "section": "D",
      "sectionTitle": "Review and inquiry",
      "question": "What lies in the middle of a third-kind lever?",
      "options": [
        "Load",
        "Fulcrum",
        "Effort",
        "Water"
      ],
      "correctIndex": 2,
      "explanation": "Effort. A lever is a rigid bar that turns about a fixed point, the fulcrum. Effort is the applied force; load is the object or resistance moved.",
      "topicRefId": 6
    },
    {
      "id": "stbb-ch6-mcq-36",
      "number": 36,
      "section": "D",
      "sectionTitle": "Review and inquiry",
      "question": "Which is a second-kind lever?",
      "options": [
        "Scissors",
        "Fishing rod",
        "Claw hammer pulling a nail",
        "Wheelbarrow"
      ],
      "correctIndex": 3,
      "explanation": "Wheelbarrow. A lever is a rigid bar that turns about a fixed point, the fulcrum. Effort is the applied force; load is the object or resistance moved.",
      "topicRefId": 6
    },
    {
      "id": "stbb-ch6-mcq-37",
      "number": 37,
      "section": "D",
      "sectionTitle": "Review and inquiry",
      "question": "Which is usually a third-kind lever?",
      "options": [
        "Tweezers",
        "Seesaw",
        "Nutcracker",
        "Pliers"
      ],
      "correctIndex": 0,
      "explanation": "Tweezers. A lever is a rigid bar that turns about a fixed point, the fulcrum. Effort is the applied force; load is the object or resistance moved.",
      "topicRefId": 6
    },
    {
      "id": "stbb-ch6-mcq-38",
      "number": 38,
      "section": "D",
      "sectionTitle": "Review and inquiry",
      "question": "Why use a gentle ramp?",
      "options": [
        "It creates energy",
        "Less force over a longer distance",
        "It removes all friction",
        "It reduces travel distance always"
      ],
      "correctIndex": 1,
      "explanation": "Less force over a longer distance. An inclined plane is a sloping flat surface used to raise or lower a load with less force over a longer distance.",
      "topicRefId": 7
    },
    {
      "id": "stbb-ch6-mcq-39",
      "number": 39,
      "section": "D",
      "sectionTitle": "Review and inquiry",
      "question": "A wedge is best described as what?",
      "options": [
        "A round wheel only",
        "A flat horizontal floor",
        "Two inclined surfaces meeting at a sharp edge",
        "A spring scale"
      ],
      "correctIndex": 2,
      "explanation": "Two inclined surfaces meeting at a sharp edge. An inclined plane is a sloping flat surface used to raise or lower a load with less force over a longer distance.",
      "topicRefId": 7
    },
    {
      "id": "stbb-ch6-mcq-40",
      "number": 40,
      "section": "D",
      "sectionTitle": "Review and inquiry",
      "question": "Why do car tyres have treads?",
      "options": [
        "Remove all friction",
        "Reduce mass to zero",
        "Make air heavier",
        "Channel water away and improve wet-road grip"
      ],
      "correctIndex": 3,
      "explanation": "Channel water away and improve wet-road grip. An inclined plane is a sloping flat surface used to raise or lower a load with less force over a longer distance.",
      "topicRefId": 8
    }
  ],
  "summaryConcepts": [
    {
      "icon": "💡",
      "topic": "Force, Friction & Learning Objectives",
      "takeaway": "A force is a push or pull that can change motion or shape. Friction opposes relative motion between surfaces."
    },
    {
      "icon": "💡",
      "topic": "Investigating & Using Friction",
      "takeaway": "Friction is useful for walking, braking, gripping, keeping knots tied and holding nails, nuts and bolts."
    },
    {
      "icon": "💡",
      "topic": "Reducing Friction & Air Resistance",
      "takeaway": "Lubricants, suitable smoothing/polishing and ball bearings reduce unwanted friction in machines."
    },
    {
      "icon": "💡",
      "topic": "Gravity, Mass & Weight",
      "takeaway": "Gravity is an attractive force between masses; Earth pulls objects toward its centre."
    },
    {
      "icon": "💡",
      "topic": "Balanced Forces, Unbalanced Forces & Inertia",
      "takeaway": "Balanced forces have zero resultant force: motion does not change. Unbalanced forces change speed or direction."
    },
    {
      "icon": "💡",
      "topic": "Levers: Three Kinds",
      "takeaway": "A lever is a rigid bar that turns about a fixed point, the fulcrum. Effort is the applied force; load is the object or resistance moved."
    },
    {
      "icon": "💡",
      "topic": "Inclined Planes & Wedges",
      "takeaway": "An inclined plane is a sloping flat surface used to raise or lower a load with less force over a longer distance."
    },
    {
      "icon": "💡",
      "topic": "Review, Lever Identification & Inquiry Project",
      "takeaway": "Identify a machine by its actual pivot, input force and load, not only by its name or appearance."
    }
  ],
  "summaryMatrices": [
    {
      "title": "Forces and measurements",
      "headers": [
        "Idea",
        "Meaning",
        "Example / unit"
      ],
      "rows": [
        {
          "cells": [
            "Mass",
            "Amount of matter",
            "kg; same on Moon"
          ]
        },
        {
          "cells": [
            "Weight",
            "Gravity acting on mass",
            "N; W = m × g"
          ]
        },
        {
          "cells": [
            "Balanced forces",
            "Zero resultant",
            "Rest or constant velocity"
          ]
        },
        {
          "cells": [
            "Unbalanced forces",
            "Non-zero resultant",
            "Change speed or direction"
          ]
        },
        {
          "cells": [
            "Friction",
            "Opposes relative sliding",
            "Grip or wear"
          ]
        },
        {
          "cells": [
            "Air resistance",
            "Drag in air",
            "Streamlining reduces it"
          ]
        }
      ]
    },
    {
      "title": "Simple-machine reference",
      "headers": [
        "Machine",
        "Key position / form",
        "Examples / trade-off"
      ],
      "rows": [
        {
          "cells": [
            "First-kind lever",
            "E–F–L",
            "Scissors, seesaw, pliers"
          ]
        },
        {
          "cells": [
            "Second-kind lever",
            "F–L–E",
            "Wheelbarrow, nutcracker"
          ]
        },
        {
          "cells": [
            "Third-kind lever",
            "F–E–L",
            "Tweezers, fishing rod, broom"
          ]
        },
        {
          "cells": [
            "Inclined plane",
            "Sloping flat surface",
            "Less force, longer distance"
          ]
        },
        {
          "cells": [
            "Wedge",
            "Two slopes, sharp edge",
            "Knife, axe, nail"
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
        "title": "Compare friction across surfaces",
        "emoji": "🧪",
        "aim": "Compare friction across surfaces",
        "materials": [
          "Shoe",
          "Rubber band",
          "Tape",
          "Ruler",
          "Sandpaper",
          "Doormat",
          "Plastic",
          "Small amount of oil on a tray"
        ],
        "procedure": [
          "Attach a band securely to the shoe; mark its unstretched length.",
          "Pull steadily over each surface at similar speed with the same shoe load.",
          "Measure extension and repeat trials.",
          "Compare which surface needs most force; clean oil immediately."
        ],
        "questions": [
          {
            "question": "What does greater extension mean?",
            "answer": "Greater pulling force and usually greater sliding friction under matched conditions."
          },
          {
            "question": "Which gives least / most friction?",
            "answer": "Oiled plastic will often give least and doormat or sandpaper most; use your measured evidence rather than assuming an exact ranking."
          }
        ],
        "conclusion": "Friction depends on the surfaces and pressing force.",
        "safetyOrTeacherTip": "Keep oil on a tray away from floors; never stretch the band toward faces.",
        "observationTable": {
          "headers": [
            "Surface",
            "Trial 1 extension (cm)",
            "Trial 2 extension (cm)",
            "Mean (cm)"
          ],
          "rows": [
            [
              "Doormat",
              "",
              "",
              ""
            ],
            [
              "Sandpaper",
              "",
              "",
              ""
            ],
            [
              "Plastic",
              "",
              "",
              ""
            ],
            [
              "Oiled plastic",
              "",
              "",
              ""
            ]
          ]
        }
      },
      {
        "id": "act-2",
        "activityNumber": "Activity 2",
        "title": "Compare school-bag mass and weight",
        "emoji": "🧪",
        "aim": "Compare school-bag mass and weight",
        "materials": [
          "School bag",
          "Books"
        ],
        "procedure": [
          "Lift an empty bag gently and note how it feels.",
          "Add books one at a time and compare the effort.",
          "Use a supported hand grip; stop before the load is uncomfortable."
        ],
        "questions": [
          {
            "question": "Was the full bag harder to lift? Why?",
            "answer": "Yes. Added books increase mass, so Earth exerts greater gravitational force."
          },
          {
            "question": "Would its mass change on the Moon?",
            "answer": "No. Its weight would be about one sixth of its Earth weight."
          }
        ],
        "conclusion": "Adding matter increases mass and, at the same location, weight.",
        "safetyOrTeacherTip": "Do not strain two fingers or overload a child. Teacher demonstrates heavier loads."
      },
      {
        "id": "act-3",
        "activityNumber": "Activity 3",
        "title": "Coin-and-card inertia demonstration",
        "emoji": "🧪",
        "aim": "Coin-and-card inertia demonstration",
        "materials": [
          "Card",
          "Plastic cup",
          "Large coin"
        ],
        "procedure": [
          "Put a card over the cup and place the coin centrally above the opening.",
          "Flick the card sharply sideways.",
          "Observe the coin and repeat safely."
        ],
        "questions": [
          {
            "question": "What happens?",
            "answer": "The card moves away; the coin drops into the cup."
          },
          {
            "question": "Why a sharp flick?",
            "answer": "It limits the time friction can push the coin sideways; inertia resists its change in motion, then gravity pulls it down."
          }
        ],
        "conclusion": "Inertia resists changes in motion.",
        "safetyOrTeacherTip": "Use a plastic cup and large coin. Keep coins away from mouths and eyes."
      },
      {
        "id": "act-4",
        "activityNumber": "Activity 4",
        "title": "Identify F, E and L in levers",
        "emoji": "🧪",
        "aim": "Identify F, E and L in levers",
        "materials": [
          "Pictures or safe examples of nail cutter, stapler, opener, pliers, scissors, tongs, broom and wheelbarrow"
        ],
        "procedure": [
          "Locate the actual pivot (F), applied force (E), and resistance moved (L).",
          "Draw a labelled side view.",
          "Classify by the middle element: F → first; L → second; E → third.",
          "Inspect compound devices separately; explain your chosen part and grip."
        ],
        "questions": [
          {
            "question": "Which is easiest to classify?",
            "answer": "A seesaw: its central fulcrum clearly lies between effort and load."
          },
          {
            "question": "Are all tongs or staplers identical?",
            "answer": "No. Pivoted tongs may be first kind; spring tweezers are third. A conventional stapler can act as a third-kind lever; nail cutters often use compound levers. Inspect the design."
          }
        ],
        "conclusion": "Lever class depends on position, not just an object name.",
        "safetyOrTeacherTip": "Work with teacher supervision. Record actual results rather than copying expected results."
      },
      {
        "id": "act-5",
        "activityNumber": "Activity 5",
        "title": "Compare vertical lift and ramp pull",
        "emoji": "🧪",
        "aim": "Compare vertical lift and ramp pull",
        "materials": [
          "Books",
          "Stone or potato",
          "String",
          "Cardboard",
          "Spring scale"
        ],
        "procedure": [
          "Secure a low cardboard ramp on books.",
          "Measure the force to lift the load vertically at steady speed to a chosen height.",
          "Pull it steadily up the ramp to the same height and record force.",
          "Compare gentle and steep inclines; keep load constant."
        ],
        "questions": [
          {
            "question": "Why does the ramp usually need less force?",
            "answer": "It spreads the rise over a longer travel distance; friction may reduce the advantage."
          },
          {
            "question": "Which slope generally requires more force?",
            "answer": "A steeper incline for the same load, with otherwise comparable conditions."
          }
        ],
        "conclusion": "A ramp trades longer distance for reduced force; it does not create energy.",
        "safetyOrTeacherTip": "Secure books and ramp; keep feet clear of falling loads.",
        "observationTable": {
          "headers": [
            "Method",
            "Height (cm)",
            "Distance travelled (cm)",
            "Force (N)"
          ],
          "rows": [
            [
              "Vertical lift",
              "",
              "",
              ""
            ],
            [
              "Gentle ramp",
              "",
              "",
              ""
            ],
            [
              "Steep ramp",
              "",
              "",
              ""
            ]
          ]
        }
      },
      {
        "id": "act-Project",
        "activityNumber": "Activity Project",
        "title": "Simple machines at home and school",
        "emoji": "🧪",
        "aim": "Simple machines at home and school",
        "materials": [
          "Sketchbook",
          "Pencil",
          "Camera (optional)"
        ],
        "procedure": [
          "Find five safe machine examples with an adult.",
          "Draw or photograph each and describe its function.",
          "Label F/E/L on levers and slopes or edges on ramps and wedges."
        ],
        "questions": [
          {
            "question": "What should each entry include?",
            "answer": "Name, drawing, machine type, function and labelled parts or force directions."
          }
        ],
        "conclusion": "Machines change force, direction, speed or distance without creating energy.",
        "safetyOrTeacherTip": "Observe sharp tools only with an adult; do not operate knives, axes or machinery."
      }
    ],
    "fillInBlanks": [
      {
        "id": "ch6-blank-0",
        "promptWithBlank": "The force applied to a simple machine is __________.",
        "answer": "effort",
        "explanation": "Effort is the input force."
      },
      {
        "id": "ch6-blank-1",
        "promptWithBlank": "The fixed pivot of a lever is its __________.",
        "answer": "fulcrum",
        "explanation": "The lever turns about this point."
      },
      {
        "id": "ch6-blank-2",
        "promptWithBlank": "Forces that change motion are __________ forces.",
        "answer": "unbalanced",
        "explanation": "Their resultant is not zero."
      },
      {
        "id": "ch6-blank-3",
        "promptWithBlank": "A knife is an example of a __________.",
        "answer": "wedge",
        "explanation": "Its sloping faces meet at a cutting edge."
      },
      {
        "id": "ch6-blank-4",
        "promptWithBlank": "The unit of mass is the __________.",
        "answer": "kilogram",
        "explanation": "The SI unit is kg, not newton."
      },
      {
        "id": "ch6-blank-5",
        "promptWithBlank": "A wheelbarrow is a __________-kind lever.",
        "answer": "second",
        "explanation": "Its load is between wheel fulcrum and hand effort."
      },
      {
        "id": "ch6-blank-6",
        "promptWithBlank": "Moving machine parts can be lubricated with __________.",
        "answer": "grease",
        "explanation": "A lubricant reduces direct surface contact."
      },
      {
        "id": "ch6-blank-7",
        "promptWithBlank": "For the usual rear-hinged stapler with effort between hinge and staple, the lever is __________ kind.",
        "answer": "third",
        "explanation": "Identify the actual force positions; compound designs can differ."
      }
    ],
    "trueFalse": [
      {
        "id": "ch6-tf-0",
        "statement": "Balanced forces always mean an object is at rest.",
        "isTrue": false,
        "explanation": "They mean no change in velocity; constant straight-line motion is also possible."
      },
      {
        "id": "ch6-tf-1",
        "statement": "Mass is measured in kilograms.",
        "isTrue": true,
        "explanation": "Weight is measured in newtons."
      },
      {
        "id": "ch6-tf-2",
        "statement": "Weight is the same on Earth and the Moon.",
        "isTrue": false,
        "explanation": "The Moon exerts about one sixth as much gravitational force on the same mass."
      },
      {
        "id": "ch6-tf-3",
        "statement": "A parachute increases air resistance.",
        "isTrue": true,
        "explanation": "Its large open canopy increases drag."
      },
      {
        "id": "ch6-tf-4",
        "statement": "Third-kind levers have effort in the middle.",
        "isTrue": true,
        "explanation": "Their arrangement is F–E–L."
      },
      {
        "id": "ch6-tf-5",
        "statement": "Simple machines create energy.",
        "isTrue": false,
        "explanation": "They trade force, distance, speed or direction; friction transfers some energy to heat."
      }
    ],
    "descriptiveQA": [
      {
        "id": "ch6-qa-0",
        "category": "definition-short",
        "badgeLabel": "Definition / Short Answer",
        "question": "What is force? Give an example.",
        "answer": "A force is a push or pull that can change an object’s speed, direction or shape. Pushing a trolley is a force."
      },
      {
        "id": "ch6-qa-1",
        "category": "definition-short",
        "badgeLabel": "Definition / Short Answer",
        "question": "Define inertia.",
        "answer": "Inertia is the tendency to remain at rest or continue moving with constant speed in a straight line unless acted on by a resultant force."
      },
      {
        "id": "ch6-qa-2",
        "category": "give-reason",
        "badgeLabel": "Give Reasons",
        "question": "Why do car tyres have treads?",
        "answer": "Treads channel water away and help tyres maintain contact and grip on wet roads, reducing skidding. They do not eliminate the need for cautious driving."
      },
      {
        "id": "ch6-qa-3",
        "category": "give-reason",
        "badgeLabel": "Give Reasons",
        "question": "Why are aircraft streamlined?",
        "answer": "A streamlined shape reduces air resistance so less energy is needed to overcome drag at a given speed."
      },
      {
        "id": "ch6-qa-4",
        "category": "give-reason",
        "badgeLabel": "Give Reasons",
        "question": "Why does the body fall forward when a bus stops?",
        "answer": "The feet slow with the bus while inertia tends to keep the upper body moving forward. A seat belt supplies a restraining force."
      },
      {
        "id": "ch6-qa-5",
        "category": "structured-long",
        "badgeLabel": "Long / Structured Answer",
        "question": "Explain how friction depends on surfaces and object weight.",
        "answer": "Different contacting materials and surface conditions change friction: rubber grips better than oily plastic. For ordinary dry sliding, pressing the same materials together more strongly generally increases friction. A heavier loaded box usually presses harder on a level floor and needs more pulling force. Apparent contact area alone is not a universal predictor."
      },
      {
        "id": "ch6-qa-6",
        "category": "structured-long",
        "badgeLabel": "Long / Structured Answer",
        "question": "Differentiate mass and weight, with a calculation.",
        "answer": "Mass measures matter in kg and stays the same on the Moon. Weight is gravity’s force in N and depends on gravitational field strength. W = m × g. A 6 kg mass at 10 N/kg weighs 60 N on Earth and approximately 10 N on the Moon, but remains 6 kg."
      },
      {
        "id": "ch6-qa-7",
        "category": "structured-long",
        "badgeLabel": "Long / Structured Answer",
        "question": "Locate F, E and L and classify three levers.",
        "answer": "Scissors: F at screw, E at handles, L at cutting material: first kind. Wheelbarrow: F at wheel, L in tray, E at hands: second kind. Broom held at top: F at upper hand, E at lower hand, L at bristles: third kind. Draw each arrangement and label all three letters."
      },
      {
        "id": "ch6-qa-8",
        "category": "structured-long",
        "badgeLabel": "Long / Structured Answer",
        "question": "Compare inclined plane and wedge.",
        "answer": "A ramp is a sloping surface along which a load moves to gain height with less force over more distance. A wedge moves into material and separates it using two inclined surfaces meeting at an edge. Examples: loading ramp and axe."
      },
      {
        "id": "ch6-qa-9",
        "category": "problem-solving",
        "badgeLabel": "Scientific Problem Solving",
        "question": "A textbook MCQ lists nail cutter, fishing rod, pliers and claw hammer. Which is second kind?",
        "answer": "The expected school answer is often nail cutter, referring to the cutting arm where the load lies between pivot and applied force. Nail cutters are compound devices: inspect the particular linkage. Fishing rod is usually third kind; pliers and claw hammer pulling a nail are first kind."
      },
      {
        "id": "ch6-qa-10",
        "category": "problem-solving",
        "badgeLabel": "Scientific Problem Solving",
        "question": "Choose a ramp for a heavy school trolley and explain the trade-off.",
        "answer": "Choose a securely supported, gentle, sufficiently wide ramp. It generally reduces required force but lengthens travel. Measure at the same height and load, allow for friction and never release an uncontrolled trolley."
      },
      {
        "id": "ch6-qa-11",
        "category": "problem-solving",
        "badgeLabel": "Scientific Problem Solving",
        "question": "Plan a simple-machine inquiry project.",
        "answer": "Find safe examples at school or home; draw or photograph each, state its use, identify lever / ramp / wedge and mark F, E and L where relevant. Inspect compound devices instead of forcing one label onto every part."
      }
    ]
  }
};
