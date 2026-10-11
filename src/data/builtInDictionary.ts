export type DictionaryMeaning = {
  word: string;
  partOfSpeech: string;
  simpleEnglish: string;
  urdu: string;
  sindhi: string;
  example?: string;
};

type DictionaryEntry = Omit<DictionaryMeaning, 'word'>;

const entry = (
  partOfSpeech: string,
  simpleEnglish: string,
  urdu: string,
  sindhi: string,
  example: string,
): DictionaryEntry => ({ partOfSpeech, simpleEnglish, urdu, sindhi, example });

/** Core exam, pedagogy, science, civics and learning vocabulary available without internet or an API key. */
export const BUILT_IN_DICTIONARY: Record<string, DictionaryEntry> = {
  ability: entry('noun', 'The skill or power to do something.', 'صلاحیت', 'صلاحيت', 'Practice improves your ability.'),
  accurate: entry('adjective', 'Correct and free from mistakes.', 'درست، صحیح', 'درست، صحيح', 'The report gives accurate information.'),
  accountability: entry('noun', 'Being responsible for your decisions and actions to the public or authorities.', 'احتساب، جوابدہی', 'احتساب، جوابدهي', 'Accountability is essential in transparent public administration.'),
  acceleration: entry('noun', 'The rate at which the velocity of an object changes over time.', 'اسراع، رفتار میں اضافہ', 'اسراع، رفتار ۾ واڌ', 'Gravity produces downward acceleration.'),
  affective: entry('adjective', 'Relating to moods, feelings, emotions, and attitudes.', 'جذباتی، احساساتی', 'جذباتي، احساساتي', 'The affective domain focuses on student values and attitudes.'),
  amendment: entry('noun', 'A formal minor change or addition made to a law or constitution.', 'ترمیم', 'ترميم', 'The parliament passed a constitutional amendment.'),
  analyse: entry('verb', 'To study something in detail and find its parts or meaning.', 'تجزیہ کرنا', 'تجزيه ڪرڻ', 'Analyse the question before choosing an answer.'),
  analysis: entry('noun', 'Detailed examination of the elements or structure of something.', 'تجزیہ', 'تجزيو', 'Perform an in-depth analysis of the test results.'),
  analogy: entry('noun', 'A comparison between two things that shows a way in which they are similar.', 'تمثیل، مشابہت', 'تشبيه، برابري', 'The question tested understanding through a verbal analogy.'),
  answer: entry('noun', 'A response to a question.', 'جواب', 'جواب', 'Choose the correct answer.'),
  antonym: entry('noun', 'A word that means the opposite of another word.', 'متضاد لفظ', 'ضد، متضاد لفظ', 'Light is the antonym of dark.'),
  approach: entry('noun / verb', 'A way of doing something or dealing with a problem.', 'طریقہ، متقدم ہونا', 'طريقو، هجو', 'A good approach saves time.'),
  aptitude: entry('noun', 'A natural ability or skill to do something or learn quickly.', 'فطری صلاحیت، میلان', 'فطري قابليت، لاڙو', 'The test measures numerical and verbal aptitude.'),
  argument: entry('noun', 'A reason or set of reasons given to support an idea.', 'دلیل، استدلال', 'دليل، استدلال', 'Support your argument with evidence.'),
  assess: entry('verb', 'To judge the value, quality, or importance of something.', 'تشخیص کرنا', 'تشخيص ڪرڻ', 'Assess each option carefully.'),
  assessment: entry('noun', 'The evaluation or estimation of the nature, quality, or ability of someone or something.', 'تشخیص، جائزہ', 'جائزو، تشخيص', 'Formative assessment helps teachers identify learning gaps.'),
  attempt: entry('noun / verb', 'An effort to do or complete something.', 'کوشش', 'ڪوشش', 'Make an attempt to solve every question.'),
  behaviorism: entry('noun', 'A learning theory stating behaviors are learned through interaction with the environment.', 'کرداریت', 'ڪرداريت', 'Behaviorism emphasizes positive reinforcement and conditioning.'),
  benefit: entry('noun', 'A helpful result or advantage.', 'فائدہ', 'فايده', 'Exercise has many health benefits.'),
  biodiversity: entry('noun', 'The variety of plant and animal life in a particular habitat or in the world.', 'حیاتیاتی تنوع', 'حياتياتي قسمين قسمين زندگي', 'Preserving wetlands protects biodiversity in Sindh.'),
  bureaucracy: entry('noun', 'A system of government or management in which most decisions are taken by state officials.', 'نوکر شاہی، سول سروس', 'نوڪر شاهي', 'Efficient bureaucracy improves delivery of public services.'),
  calculate: entry('verb', 'To find an answer by using numbers.', 'حساب کرنا', 'حساب ڪرڻ', 'Calculate the total marks.'),
  careful: entry('adjective', 'Taking steps to avoid mistakes or harm.', 'محتاط', 'محتاط', 'Be careful when reading the options.'),
  catalyst: entry('noun', 'A substance that speeds up a chemical reaction without itself being changed.', 'عمل انگیز', 'عمل تيز ڪندڙ', 'Enzymes act as biological catalysts.'),
  challenge: entry('noun', 'Something difficult that requires effort to overcome.', 'چیلنج، مشکل', 'چيلنج، مشكل', 'This challenge needs patience and practice.'),
  citizen: entry('noun', 'A person who belongs to a country or state.', 'شہری', 'شهرين', 'Every citizen has rights and duties.'),
  cognition: entry('noun', 'The mental process of acquiring knowledge and understanding through thought and experience.', 'شعور، ادراک', 'سمجهه، عقل', 'Piaget studied children’s cognitive development stages.'),
  compare: entry('verb', 'To examine things to find similarities or differences.', 'موازنہ کرنا', 'ڀيٽ ڪرڻ', 'Compare both answers.'),
  competency: entry('noun', 'The ability to do something successfully or efficiently based on acquired skills.', 'اہلیت، قابلیت', 'قابليت، صلاحيت', 'The license test assesses pedagogical competency.'),
  complete: entry('verb / adjective', 'To finish something, or having every necessary part.', 'مکمل کرنا، مکمل', 'مڪمل ٿيڻ، مکمل', 'Complete the test on time.'),
  comprehension: entry('noun', 'The ability to understand what you listen to or read.', 'فہم، سمجھ', 'سمجهه، فھم', 'Read the passage to answer comprehension questions.'),
  conclusion: entry('noun', 'The final decision or idea reached after thinking or studying.', 'نتیجہ، خلاصہ', 'نتيجو، خلاصو', 'The conclusion was supported by evidence.'),
  constitution: entry('noun', 'The basic principles and laws of a nation or state that determine government powers.', 'آئین، دستور', 'آئين، دستور', 'The 1973 Constitution guarantees fundamental rights.'),
  constructivism: entry('noun', 'A learning theory stating that learners actively construct knowledge rather than passively taking it in.', 'تعمیریت', 'تعميريت', 'In constructivism, learners build understanding through active experiences.'),
  correct: entry('adjective', 'Right and without error.', 'درست', 'درست', 'Select the correct option.'),
  criterion: entry('noun', 'A principle or standard by which something may be judged or decided.', 'معیار، کسوٹی', 'معيار، ڪسوٽي', 'Accuracy is the primary criterion for grading.'),
  curriculum: entry('noun', 'The subjects and academic content taught in a school, college, or training program.', 'نصاب', 'نصاب', 'DCAR designs the provincial curriculum for Sindh schools.'),
  deduction: entry('noun', 'The process of reaching a conclusion by applying general principles to specific cases.', 'استخراج، قیاس', 'استخراج، نتيجو ڪڍڻ', 'Deductive reasoning moves from general rules to specific conclusions.'),
  define: entry('verb', 'To explain the exact meaning of something.', 'تعریف بیان کرنا', 'وصف بيان ڪرڻ', 'Define the term in simple words.'),
  definition: entry('noun', 'A statement of the exact meaning of a word, especially in a dictionary.', 'تعریف', 'وصف، معنيٰ', 'Write a clear definition of photosynthesis.'),
  density: entry('noun', 'The degree of compactness of a substance; mass per unit volume.', 'کثافت', 'گهاٽائي، ڪثافت', 'Lead has a higher density than aluminium.'),
  diagnostic: entry('noun / adjective', 'Used to identify the causes of a problem or learner weakness.', 'تشخیصی', 'تشخيصي', 'A diagnostic test reveals specific learning weaknesses before starting a unit.'),
  didactic: entry('adjective', 'Intended to teach, particularly having moral instruction as an ulterior motive.', 'تدریسی، نصیحت آموز', 'تدريسي، هدايتي', 'Traditional lectures often use a didactic approach.'),
  difficult: entry('adjective', 'Not easy to do or understand.', 'مشکل', 'ڏکيو', 'This question is difficult.'),
  diffusion: entry('noun', 'The movement of molecules from an area of higher concentration to lower concentration.', 'نفوذ، پھیلاؤ', 'پکيڙ، ڦهلاءُ', 'Oxygen enters cells through simple diffusion.'),
  diversity: entry('noun', 'The state of having different types, cultures, backgrounds, or perspectives.', 'تنوع، رنگارنگی', 'تنوع، رنگارنگي', 'Teachers must respect cultural diversity in classroom settings.'),
  ecosystem: entry('noun', 'A biological community of interacting organisms and their physical environment.', 'ماحولیاتی نظام', 'ماحولياتي نظام', 'Mangrove forests form a vital coastal ecosystem.'),
  education: entry('noun', 'The process of learning and gaining knowledge.', 'تعلیم', 'تعليم', 'Education creates opportunities.'),
  empirical: entry('adjective', 'Based on, concerned with, or verifiable by observation or experience rather than pure theory.', 'تجرباتی، مشاہداتی', 'تجرباتي، مشاهدي تي ٻڌل', 'Scientific laws are supported by empirical evidence.'),
  epistemology: entry('noun', 'The philosophical theory of knowledge, its methods, validity, and scope.', 'علمیات، نظریۂ علم', 'نظريو علم', 'Epistemology investigates what distinguishes justified belief from opinion.'),
  equilibrium: entry('noun', 'A state in which opposing forces or influences are balanced.', 'توازن، اعتدال', 'توازن، برابري', 'The chemical reaction reached dynamic equilibrium.'),
  equity: entry('noun', 'The quality of being fair and impartial; providing students what they need to succeed.', 'انصاف، برابری', 'انصاف، عدل', 'Educational equity ensures every child receives tailored support.'),
  evaluate: entry('verb', 'To judge the quality, value, or importance of something.', 'جائزہ لینا', 'جائزو وٺڻ', 'Evaluate each option before answering.'),
  evaluation: entry('noun', 'The making of a judgment about the amount, number, or value of something.', 'تشخیص، تخمینہ', 'جائزو، قدر افزائي', 'Summative evaluation takes place at the end of a term.'),
  evidence: entry('noun', 'Facts or information that show something is true.', 'ثبوت، شواہد', 'ثبوت، شاهدي', 'Support your answer with evidence.'),
  example: entry('noun', 'Something that helps explain an idea.', 'مثال', 'مثال', 'The teacher gave an example.'),
  explain: entry('verb', 'To make an idea clear and easy to understand.', 'وضاحت کرنا', 'سمجھائڻ', 'Explain your answer briefly.'),
  explanation: entry('noun', 'A statement that makes something clear or accounts for a reason.', 'وضاحت، تشریح', 'وضاحت، سمجهاڻي', 'Read the explanation after each question.'),
  extrinsic: entry('adjective', 'Not part of the essential nature of someone or something; coming from outside.', 'خارجی', 'ٻاهريون', 'Grades and prizes are examples of extrinsic motivation.'),
  facilitator: entry('noun', 'A person who helps a group understand common objectives and guides them without imposing.', 'سہولت کار', 'سهولتڪار', 'The modern teacher acts as a facilitator of learning.'),
  fact: entry('noun', 'Something known or proven to be true.', 'حقیقت', 'حقيقت', 'Check whether the statement is a fact.'),
  fiscal: entry('adjective', 'Relating to government revenue, especially taxes and public spending.', 'مالیاتی', 'مالياتي', 'Fiscal policy regulates government taxation and expenditure.'),
  focus: entry('noun / verb', 'Special attention given to one thing.', 'توجہ، توجہ دینا', 'ڌيان، ڌيان ڏيڻ', 'Focus on the main idea.'),
  formative: entry('adjective', 'Serving to form, shape, or guide learning as it occurs.', 'تکوینی، تشکیلی', 'تشڪيلي', 'Formative quizzes provide immediate feedback during lessons.'),
  formula: entry('noun', 'A rule written with symbols or numbers.', 'فارمولا، کلیہ', 'فارمولو', 'Use the correct formula.'),
  friction: entry('noun', 'The resistance that one surface or object encounters when moving over another.', 'رگڑ', 'رگڙ', 'Friction produces heat and slows sliding objects.'),
  governance: entry('noun', 'The action or manner of governing a state, organization, or institution.', 'حکمرانی، نظام حکومت', 'حڪمراني، انتظام', 'Good governance demands transparency and rule of law.'),
  government: entry('noun', 'The group that rules a country or area.', 'حکومت', 'حكومت', 'The government announced a new policy.'),
  gravity: entry('noun', 'The force that attracts a body toward the centre of the earth or any physical body.', 'کشش ثقل', 'ڪشش ثقل', 'All objects fall with identical acceleration under gravity in vacuum.'),
  heuristic: entry('adjective / noun', 'Enabling a person to discover or learn something for themselves.', 'اکتشافی، خود آموزی', 'ڳولا تي ٻڌل، هٿي وٺائيندڙ', 'Heuristic teaching encourages learners to discover solutions independently.'),
  hypothesis: entry('noun', 'A proposed explanation made as a starting point for further investigation.', 'مفروضہ', 'مفروضو', 'The scientist tested her hypothesis with controlled experiments.'),
  idiom: entry('noun', 'A group of words whose meaning is figurative and different from the literal words.', 'محاورہ', 'محاورو، پهاڪو', '“Once in a blue moon” is an English idiom meaning rarely.'),
  improve: entry('verb', 'To make or become better.', 'بہتر بنانا', 'بهتر ڪرڻ', 'Daily reading will improve vocabulary.'),
  important: entry('adjective', 'Having great value or meaning.', 'اہم', 'اهم', 'Education is important for everyone.'),
  inclusion: entry('noun', 'The practice or policy of providing equal access to opportunities and resources for all.', 'شمولیت', 'شموليت', 'Inclusive education welcomes students with diverse learning needs.'),
  increase: entry('verb / noun', 'To make or become greater in number or size.', 'بڑھانا/بڑھنا', 'وڌائڻ/وڌ', 'The population is increasing every year.'),
  induction: entry('noun', 'The process of reaching a general rule or conclusion from specific facts or observations.', 'استقراء', 'استقراء', 'Inductive reasoning builds general principles from specific examples.'),
  inference: entry('noun', 'A conclusion reached on the basis of evidence and reasoning rather than direct statement.', 'استنباط، قیاس', 'نتيجو، اڳڪٿي', 'Good readers draw inferences from subtle clues in the text.'),
  inflation: entry('noun', 'A general increase in prices and fall in the purchasing power of money.', 'افراط زر، گرانی', 'مهانگائي، پئسن جي قدر ۾ گهٽتائي', 'High inflation decreases household purchasing capacity.'),
  information: entry('noun', 'Facts or details about a person, place, or subject.', 'معلومات', 'ڄاڻ', 'Read the information carefully.'),
  integrity: entry('noun', 'The quality of being honest and having strong moral principles.', 'دیانت داری، سالمیت', 'ايمانداري، ديانتداري', 'Civil servants must uphold public integrity without bias.'),
  intrinsic: entry('adjective', 'Belonging naturally; essential; coming from inner interest rather than external reward.', 'داخلی، ذاتی', 'اندروني، ذاتي', 'Curiosity is an intrinsic motivator for young learners.'),
  judiciary: entry('noun', 'The judicial authorities of a country; the system of courts and judges.', 'عدلیہ', 'عدليه، عدالتون', 'An independent judiciary protects constitutional freedoms.'),
  jurisdiction: entry('noun', 'The official power to make legal decisions and judgments over an area or matter.', 'دائرہ اختیار', 'اختيار، دائرو', 'The high court possesses territorial jurisdiction over the province.'),
  knowledge: entry('noun', 'Information and understanding gained through learning.', 'علم، معلومات', 'علم، ڄاڻ', 'Reading increases knowledge.'),
  law: entry('noun', 'The set of rules that a country or society follows.', 'قانون', 'قانون', 'The law must be respected.'),
  learn: entry('verb', 'To gain knowledge or a new skill.', 'سیکھنا', 'سکڻ', 'We learn something new every day.'),
  legislation: entry('noun', 'Laws, considered collectively, or the process of making statutory law.', 'قانون سازی', 'قانون سازي', 'The assembly introduced landmark legislation on teacher licensing.'),
  lesson: entry('noun', 'A period or unit of learning.', 'سبق', 'سبق', 'Read today’s lesson.'),
  literacy: entry('noun', 'The ability to read and write and use numbers in everyday life.', 'خواندگی', 'خواندگي، پڙهيل هجڻ', 'Adult literacy initiatives improve community development.'),
  maximum: entry('noun / adjective', 'The greatest amount or highest limit possible.', 'زیادہ سے زیادہ، زیادہ سے زیادہ حد', 'سزايتو، اعلي حد', 'The maximum score is 100.'),
  meaning: entry('noun', 'The idea that a word, sign, or statement expresses.', 'معنی', 'معنيٰ', 'Find the meaning of the word.'),
  mentor: entry('noun / verb', 'An experienced and trusted adviser who trains or counsels someone junior.', 'رہنما، اتالیق', 'رهنما، استاد', 'Senior teachers mentor induction trainees during their probation.'),
  metaphor: entry('noun', 'A figure of speech in which a word or phrase is applied to an object to which it is not literally applicable.', 'استعارہ', 'استعارو', '“Time is a thief” is a classic literary metaphor.'),
  method: entry('noun', 'A particular way of doing something.', 'طریقہ', 'طريقو', 'Use a simple method to solve it.'),
  minimum: entry('noun / adjective', 'The least amount or lowest limit possible.', 'کم از کم، کمترین حد', 'گهڻو گهٽجي، گھٽترو حد', 'The minimum age is 18.'),
  mistake: entry('noun', 'Something done or understood incorrectly.', 'غلطی', 'غلطي', 'Review every mistake.'),
  molecule: entry('noun', 'A group of atoms bonded together, representing the smallest fundamental unit of a compound.', 'سالمہ', 'سالمو', 'A water molecule consists of two hydrogen atoms and one oxygen atom.'),
  momentum: entry('noun', 'The quantity of motion of a moving body, measured as product of its mass and velocity.', 'معیار حرکت', 'حرڪت جو مقدار', 'Momentum is conserved in an isolated physical system.'),
  monetary: entry('noun / adjective', 'Relating to money or currency, especially central bank currency control.', 'زری، مالیاتی', 'پئسي متعلق، زري', 'Monetary policy controls bank interest rates and money supply.'),
  motivation: entry('noun', 'A reason or reasons for acting or behaving in a particular way; drive.', 'حوصلہ افزائی، تحرک', 'تحريڪ، جوش', 'Praise and meaningful goals stimulate student motivation.'),
  nepotism: entry('noun', 'The practice among those with power of favoring relatives or friends.', 'اقربا پروری', 'مٽيءَ مائٽيءَ جو لحاظ، مائٽ نوازي', 'Merit-based testing abolishes nepotism in recruitment.'),
  norm: entry('noun', 'Something that is usual, typical, or standard; benchmark in assessment.', 'معمول، معیار', 'عام معيار، روايت', 'Norm-referenced tests rank candidates against peers.'),
  objective: entry('noun / adjective', 'A goal, or based on facts rather than feelings.', 'مقصد، غیر جانب دار', 'مقصد، غير جانبدار', 'The objective is to improve accuracy.'),
  observe: entry('verb', 'To watch carefully and notice details.', 'مشاہدہ کرنا', 'ٺاهه ڪرڻ', 'Observe the pattern before answering.'),
  officer: entry('noun', 'A person with authority in the police, army, or government.', 'افسر', 'افسر', 'The officer guided the team.'),
  official: entry('adjective', 'Done by the proper authority or in a formal way.', 'باضابطہ، سرکاری', 'باهضابطه، سرڪاري', 'The official notice was posted yesterday.'),
  option: entry('noun', 'One of the choices available.', 'انتخاب، آپشن', 'چونڊ، آپشن', 'Select one option.'),
  ordinance: entry('noun', 'A temporary law promulgated by the President or Governor when assembly is not in session.', 'صدارتی فرمان، آرڈیننس', 'آرڊيننس، حڪم نامو', 'The governor promulgated an emergency ordinance.'),
  osmosis: entry('noun', 'The process by which molecules of a solvent pass through a semipermeable membrane into a concentrated solution.', 'نفوذ معکوس، اسموسس', 'اسموسس', 'Root hair cells absorb water from soil through osmosis.'),
  paradigm: entry('noun', 'A typical example, pattern, or overarching framework of ideas.', 'نمونہ، فکری ڈھانچہ', 'نمونو، فڪري خاڪو', 'Child-centered learning represents a paradigm shift in schooling.'),
  paragraph: entry('noun', 'A group of sentences about one main idea.', 'پیراگراف', 'پيراگراف', 'Read the paragraph twice.'),
  parliament: entry('noun', 'The highest legislative body of a country, consisting of elected representatives.', 'پارلیمان، مجلس شوریٰ', 'پارليامينٽ', 'The national parliament enacts federal legislation.'),
  pedagogy: entry('noun', 'The method, principles, and practice of teaching especially as an academic subject.', 'تدریسیات، علم تدریس', 'علم تدريس، پڙهائڻ جو طريقو', 'Modern pedagogy emphasizes interactive, inquiry-based learning.'),
  photosynthesis: entry('noun', 'The process by which green plants use sunlight to synthesize nutrients from carbon dioxide and water.', 'ضیائی تالیف', 'روشنيءَ ذريعي خوراڪ تيار ڪرڻ', 'Photosynthesis produces glucose and releases oxygen into the air.'),
  policy: entry('noun', 'A plan or set of rules made by a government or organization.', 'پالیسی، اصول', 'پاليسي، اصول', 'The policy protects public interest.'),
  practice: entry('noun / verb', 'Repeated work that helps improve a skill.', 'مشق، عمل کرنا', 'مشق، عمل ڪرڻ', 'Daily practice improves results.'),
  pragmatism: entry('noun', 'An approach that evaluates theories or beliefs in terms of the success of their practical application.', 'عملیت پسندی', 'عمليت پسندي', 'John Dewey advocated pragmatism and learning by doing.'),
  prepare: entry('verb', 'To get ready for something.', 'تیاری کرنا', 'تياري ڪرڻ', 'Prepare well for the exam.'),
  proficiency: entry('noun', 'A high degree of competence or skill; expertise.', 'مہارت، قابلیت', 'مهارت، قابليت', 'Language proficiency is tested in listening, reading, and writing.'),
  progress: entry('noun', 'Improvement or movement toward a goal.', 'ترقی، پیش رفت', 'ترقي، اڳڀرائي', 'Track your weekly progress.'),
  psychomotor: entry('adjective', 'Relating to the origination of movement in conscious mental activity.', 'حرکی، نفسی حرکی', 'جسماني حرڪتن سان واسطو رکندڙ', 'Laboratory experiments train the psychomotor domain.'),
  public: entry('adjective / noun', 'For everyone or relating to people in general.', 'عوامی، عوام', 'عام، عوام', 'The public was informed about the event.'),
  purpose: entry('noun', 'The reason for doing something.', 'مقصد', 'مقصد', 'The purpose of study is to learn.'),
  quality: entry('noun', 'How good or valuable something is.', 'کوالٹی، معیار', 'گورنري، معيار', 'Quality matters more than speed.'),
  question: entry('noun', 'Something asked to get information.', 'سوال', 'سوال', 'Read the question carefully.'),
  rationale: entry('noun', 'A set of reasons or a logical basis for a course of action or belief.', 'عقلی جواز، منطقی بنیاد', 'منطقي بنياد، سبب', 'Explain the rationale behind continuous classroom assessment.'),
  reason: entry('noun', 'A cause or explanation for something.', 'سبب، دلیل', 'سبب، دليل', 'Give a clear reason for your choice.'),
  reinforcement: entry('noun', 'The process of encouraging or establishing a belief or pattern of behavior.', 'تقویت، حوصلہ افزائی', 'تقويت، حوصلا افزائي', 'Positive reinforcement strengthens desired student behavior.'),
  remedial: entry('adjective', 'Intended as a remedy or to improve learning gaps.', 'اصلاحی، ازالہ جاتی', 'اصلاحي', 'Remedial coaching helps struggling students catch up with the class.'),
  respiration: entry('noun', 'The biochemical process in living organisms involving the production of energy from intake of oxygen.', 'تنفس، سانس لینے کا عمل', 'ساهه کڻڻ، تنفس جو عمل', 'Cellular respiration converts nutrients into usable cellular energy.'),
  result: entry('noun', 'The outcome produced by an action or test.', 'نتیجہ', 'نتيجو', 'Your result shows steady progress.'),
  retention: entry('noun', 'The continued possession, use, or control of something; retaining memory of learned material.', 'یادداشت، بقا', 'يادگيري، برقرار رکڻ', 'Spaced repetition enhances long-term retention of concepts.'),
  revise: entry('verb', 'To study something again in preparation for a test.', 'دہرائی کرنا', 'ورجاءُ ڪرڻ', 'Revise important topics tonight.'),
  revision: entry('noun', 'The action of revising or reviewing content previously studied.', 'دہرائی', 'ورجاءُ، نظرثاني', 'Systematic revision prevents last-minute exam anxiety.'),
  rubric: entry('noun', 'A scoring guide used to evaluate the quality of students’ constructed responses.', 'معیار نامہ، روبرک', 'معيار نامو، روبرڪ', 'The rubric specifies expectations for thesis, evidence, and coherence.'),
  scaffolding: entry('noun', 'Temporary support given to a student by a teacher to help achieve learning goals.', 'تعلیمی سہارا، اسکیفولڈنگ', 'تعليمي سهارو', 'Vygotsky emphasized instructional scaffolding within the ZPD.'),
  score: entry('noun / verb', 'The number of points earned in a test or game.', 'نمبر، اسکور', 'نمبر، اسکور', 'She scored eighty marks.'),
  scrutiny: entry('noun', 'Critical observation or examination.', 'جانچ پڑتال، باریک بینی', 'ڇنڊڇاڻ، بارڪي جاچ', 'The public accounts committee exercises financial scrutiny.'),
  select: entry('verb', 'To choose something from available options.', 'منتخب کرنا', 'چونڊڻ', 'Select the best answer.'),
  service: entry('noun', 'Work done for others, or a government department.', 'خدمت', 'خدمت', 'Public service is important.'),
  simile: entry('noun', 'A figure of speech comparing one thing with another using “like” or “as”.', 'تشبیہ', 'تشبيه', '“Brave as a lion” is a common simile.'),
  simple: entry('adjective', 'Easy to understand or do.', 'سادہ، آسان', 'سادو، آسان', 'Use simple English.'),
  society: entry('noun', 'A community of people living together.', 'معاشرہ', 'سماج', 'A strong society supports its members.'),
  solution: entry('noun', 'An answer to a problem.', 'حل', 'حل', 'Check the solution carefully.'),
  statute: entry('noun', 'A written law passed by a legislative body.', 'قانون، ضابطہ', 'قانون، ضابطو', 'The statute governs compulsory primary education.'),
  strategy: entry('noun', 'A plan for achieving a goal.', 'حکمت عملی، منصوبہ', 'حڪمت عملي، منصوبو', 'A good strategy saves time.'),
  study: entry('verb', 'To spend time learning about a subject.', 'پڑھنا، مطالعہ کرنا', 'پڙهڻ، مطالعو ڪرڻ', 'I study science every evening.'),
  subject: entry('noun', 'An area of knowledge studied at school or college.', 'مضمون', 'مضمون', 'Mathematics is my favourite subject.'),
  subjective: entry('adjective', 'Based on or influenced by personal opinions; question requiring written composition.', 'انشائیہ، تشریحی', 'انشائيه، تشريحي', 'The test contains both objective and subjective sections.'),
  summative: entry('adjective', 'Assessing the learning of students at the end of an instructional unit by comparing against a standard.', 'اختتامی، تکمیلی', 'آخري، تڪميلي', 'Annual board exams are summative assessments.'),
  summary: entry('noun', 'A short statement of the main points.', 'خلاصہ', 'خلاصو', 'Write a short summary.'),
  sustainable: entry('adjective', 'Able to be maintained at a certain rate without depleting natural resources.', 'پائیدار', 'پائيدار', 'Renewable solar energy provides sustainable development.'),
  syllabus: entry('noun', 'An outline of the subjects in a course of study or teaching.', 'نصاب کا خاکہ، سلیبس', 'سليبس، نصاب جو خاڪو', 'Review all topics in the official STS syllabus.'),
  synonym: entry('noun', 'A word that means exactly or nearly the same as another word in the same language.', 'ہم معنی لفظ', 'هم معنيٰ لفظ', '“Accurate” is a synonym for “correct”.'),
  synthesis: entry('noun', 'The combination of ideas to form a theory or system; higher-order thinking.', 'ترکیب، امتزاج', 'ترڪيب، جوڙ', 'In Bloom’s taxonomy, synthesis involves creating new patterns from elements.'),
  taxonomy: entry('noun', 'A scheme of classification, especially a hierarchical classification of learning objectives.', 'درجہ بندی', 'درجه بندي', 'Bloom’s Taxonomy organizes cognitive learning domains into six levels.'),
  test: entry('noun', 'A set of questions used to measure knowledge or ability.', 'امتحان، ٹیسٹ', 'امتحان، ٽيسٽ', 'The test has fifty questions.'),
  topic: entry('noun', 'The subject being discussed or studied.', 'موضوع', 'موضوع', 'Choose a topic to practise.'),
  transparency: entry('noun', 'Openness and clarity in process and decision making, leaving no room for corruption.', 'شفافیت', 'شفافيت', 'CBT test centers guarantee merit and transparency.'),
  understand: entry('verb', 'To know the meaning of something.', 'سمجھنا', 'سمجهڻ', 'Try to understand the main idea.'),
  validity: entry('noun', 'The extent to which an exam or instrument actually measures what it claims to measure.', 'صداقت، اعتباریت', 'درستي، اعتبار', 'Construct validity proves the test evaluates true pedagogical knowledge.'),
  variable: entry('noun / adjective', 'An element, feature, or factor that is liable to vary or change.', 'متغیر', 'مٽجندڙ، متغير', 'The experiment tested one independent variable at a time.'),
  velocity: entry('noun', 'The speed of something in a given direction.', 'رفتار، سمت دار رفتار', 'رفتار، رخ سان رفتار', 'Velocity is displacement divided by elapsed time.'),
  vocabulary: entry('noun', 'The words known or used by a person or language.', 'ذخیرۂ الفاظ', 'لفظن جو ذخيرو', 'Reading builds vocabulary.'),
  word: entry('noun', 'A unit of language that has meaning.', 'لفظ', 'لفظ', 'Click a word to see its meaning.'),
};

export function normalizeDictionaryWord(word: string): string {
  return word
    .toLocaleLowerCase('en')
    .replace(/[^\p{L}'’\-]/gu, '')
    .replace(/’/g, "'")
    .replace(/^['-]+|['-]+$/g, '');
}

/**
 * Searches built-in dictionary with intelligent morphological stemming
 * (handles -s, -es, -ies, -ed, -ing, -ly, -tion, etc.)
 */
export function getBuiltInMeaning(word: string): DictionaryMeaning | null {
  const key = normalizeDictionaryWord(word);
  if (!key) return null;

  // Direct match
  if (BUILT_IN_DICTIONARY[key]) {
    return { word, ...BUILT_IN_DICTIONARY[key] };
  }

  // 1. Possessive ending ('s)
  if (key.endsWith("'s")) {
    const base = key.slice(0, -2);
    if (BUILT_IN_DICTIONARY[base]) return { word, ...BUILT_IN_DICTIONARY[base] };
  }

  // 2. Plural -ies -> -y (e.g. strategies -> strategy, taxonomies -> taxonomy, abilities -> ability)
  if (key.endsWith('ies') && key.length > 4) {
    const base = key.slice(0, -3) + 'y';
    if (BUILT_IN_DICTIONARY[base]) return { word, ...BUILT_IN_DICTIONARY[base] };
  }

  // 3. Plural -es (e.g. hypotheses -> hypothesis, practices -> practice)
  if (key.endsWith('es') && key.length > 4) {
    const baseWithoutS = key.slice(0, -1); // e.g. practice
    if (BUILT_IN_DICTIONARY[baseWithoutS]) return { word, ...BUILT_IN_DICTIONARY[baseWithoutS] };

    const baseWithoutEs = key.slice(0, -2);
    if (BUILT_IN_DICTIONARY[baseWithoutEs]) return { word, ...BUILT_IN_DICTIONARY[baseWithoutEs] };

    if (key.endsWith('ses')) {
      const baseIs = key.slice(0, -2) + 'is'; // hypotheses -> hypothesis
      if (BUILT_IN_DICTIONARY[baseIs]) return { word, ...BUILT_IN_DICTIONARY[baseIs] };
    }
  }

  // 4. Plural -s (e.g. questions -> question, options -> option, results -> result)
  if (key.endsWith('s') && !key.endsWith('ss') && key.length > 3) {
    const base = key.slice(0, -1);
    if (BUILT_IN_DICTIONARY[base]) return { word, ...BUILT_IN_DICTIONARY[base] };
  }

  // 5. Present participle / gerund -ing (e.g. teaching, learning, preparing, analyzing)
  if (key.endsWith('ing') && key.length > 5) {
    const baseDirect = key.slice(0, -3); // learn -> learning
    if (BUILT_IN_DICTIONARY[baseDirect]) return { word, ...BUILT_IN_DICTIONARY[baseDirect] };

    const baseWithE = key.slice(0, -3) + 'e'; // prepare -> preparing, evaluate -> evaluating
    if (BUILT_IN_DICTIONARY[baseWithE]) return { word, ...BUILT_IN_DICTIONARY[baseWithE] };

    // Dropped double consonant e.g. stopping -> stop
    if (baseDirect.length > 3 && baseDirect[baseDirect.length - 1] === baseDirect[baseDirect.length - 2]) {
      const baseSingle = baseDirect.slice(0, -1);
      if (BUILT_IN_DICTIONARY[baseSingle]) return { word, ...BUILT_IN_DICTIONARY[baseSingle] };
    }
  }

  // 6. Past tense -ed (e.g. observed, completed, tested)
  if (key.endsWith('ed') && key.length > 4) {
    const baseDirect = key.slice(0, -2);
    if (BUILT_IN_DICTIONARY[baseDirect]) return { word, ...BUILT_IN_DICTIONARY[baseDirect] };

    const baseWithE = key.slice(0, -1); // observed -> observe
    if (BUILT_IN_DICTIONARY[baseWithE]) return { word, ...BUILT_IN_DICTIONARY[baseWithE] };

    // ied -> y (e.g. studied -> study)
    if (key.endsWith('ied')) {
      const baseY = key.slice(0, -3) + 'y';
      if (BUILT_IN_DICTIONARY[baseY]) return { word, ...BUILT_IN_DICTIONARY[baseY] };
    }
  }

  // 7. Adverb -ly (e.g. accurately -> accurate, carefully -> careful)
  if (key.endsWith('ly') && key.length > 4) {
    const baseDirect = key.slice(0, -2);
    if (BUILT_IN_DICTIONARY[baseDirect]) return { word, ...BUILT_IN_DICTIONARY[baseDirect] };

    // ily -> y (e.g. easily -> easy)
    if (key.endsWith('ily')) {
      const baseY = key.slice(0, -3) + 'y';
      if (BUILT_IN_DICTIONARY[baseY]) return { word, ...BUILT_IN_DICTIONARY[baseY] };
    }
  }

  // 8. Nominalizations -ment, -tion (e.g. assessment -> assess, evaluation -> evaluate)
  if (key.endsWith('ment') && key.length > 6) {
    const base = key.slice(0, -4);
    if (BUILT_IN_DICTIONARY[base]) return { word, ...BUILT_IN_DICTIONARY[base] };
  }

  return null;
}
