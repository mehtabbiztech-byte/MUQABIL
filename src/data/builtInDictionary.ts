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

/** Core exam and learning vocabulary available without internet or an API key. */
export const BUILT_IN_DICTIONARY: Record<string, DictionaryEntry> = {
  ability: entry('noun', 'The skill or power to do something.', 'صلاحیت', 'صلاحيت', 'Practice improves your ability.'),
  accurate: entry('adjective', 'Correct and free from mistakes.', 'درست، صحیح', 'درست، صحيح', 'The report gives accurate information.'),
  analyse: entry('verb', 'To study something in detail and find its parts or meaning.', 'تجزیہ کرنا', 'تجزيه ڪرڻ', 'Analyse the question before choosing an answer.'),
  answer: entry('noun', 'A response to a question.', 'جواب', 'جواب', 'Choose the correct answer.'),
  approach: entry('noun / verb', 'A way of doing something or dealing with a problem.', 'طریقہ، متقدم ہونا', 'طريقو، هجو', 'A good approach saves time.'),
  argument: entry('noun', 'A reason or set of reasons given to support an idea.', 'دلیل، استدلال', 'دليل، استدلال', 'Support your argument with evidence.'),
  assess: entry('verb', 'To judge the value, quality, or importance of something.', 'تشخیص کرنا', 'تشخيص ڪرڻ', 'Assess each option carefully.'),
  attempt: entry('noun / verb', 'An effort to do or complete something.', 'کوشش', 'ڪوشش', 'Make an attempt to solve every question.'),
  benefit: entry('noun', 'A helpful result or advantage.', 'فائدہ', 'فايده', 'Exercise has many health benefits.'),
  calculate: entry('verb', 'To find an answer by using numbers.', 'حساب کرنا', 'حساب ڪرڻ', 'Calculate the total marks.'),
  careful: entry('adjective', 'Taking steps to avoid mistakes or harm.', 'محتاط', 'محتاط', 'Be careful when reading the options.'),
  challenge: entry('noun', 'Something difficult that requires effort to overcome.', 'چیلنج، مشکل', 'چيلنج، مشكل', 'This challenge needs patience and practice.'),
  citizen: entry('noun', 'A person who belongs to a country or state.', 'شہری', 'شهرين', 'Every citizen has rights and duties.'),
  compare: entry('verb', 'To examine things to find similarities or differences.', 'موازنہ کرنا', 'ڀيٽ ڪرڻ', 'Compare both answers.'),
  complete: entry('verb / adjective', 'To finish something, or having every necessary part.', 'مکمل کرنا، مکمل', 'مڪمل ٿيڻ، مکمل', 'Complete the test on time.'),
  conclusion: entry('noun', 'The final decision or idea reached after thinking or studying.', 'نتیجہ، خلاصہ', 'نتيجو، خلاصو', 'The conclusion was supported by evidence.'),
  correct: entry('adjective', 'Right and without error.', 'درست', 'درست', 'Select the correct option.'),
  define: entry('verb', 'To explain the exact meaning of something.', 'تعریف بیان کرنا', 'وصف بيان ڪرڻ', 'Define the term in simple words.'),
  difficult: entry('adjective', 'Not easy to do or understand.', 'مشکل', 'ڏکيو', 'This question is difficult.'),
  education: entry('noun', 'The process of learning and gaining knowledge.', 'تعلیم', 'تعليم', 'Education creates opportunities.'),
  evaluate: entry('verb', 'To judge the quality, value, or importance of something.', 'جائزہ لینا', 'جائزو وٺڻ', 'Evaluate each option before answering.'),
  evidence: entry('noun', 'Facts or information that show something is true.', 'ثبوت، شواہد', 'ثبوت، شاهدي', 'Support your answer with evidence.'),
  example: entry('noun', 'Something that helps explain an idea.', 'مثال', 'مثال', 'The teacher gave an example.'),
  explain: entry('verb', 'To make an idea clear and easy to understand.', 'وضاحت کرنا', 'سمجھائڻ', 'Explain your answer briefly.'),
  fact: entry('noun', 'Something known or proven to be true.', 'حقیقت', 'حقيقت', 'Check whether the statement is a fact.'),
  focus: entry('noun / verb', 'Special attention given to one thing.', 'توجہ، توجہ دینا', 'ڌيان، ڌيانдання', 'Focus on the main idea.'),
  formula: entry('noun', 'A rule written with symbols or numbers.', 'فارمولا، کلیہ', 'فارمولو', 'Use the correct formula.'),
  government: entry('noun', 'The group that rules a country or area.', 'حکومت', 'حكومت', 'The government announced a new policy.'),
  improve: entry('verb', 'To make or become better.', 'بہتر بنانا', 'بهتر ڪرڻ', 'Daily reading will improve vocabulary.'),
  important: entry('adjective', 'Having great value or meaning.', 'اہم', 'اهم', 'Education is important for everyone.'),
  increase: entry('verb / noun', 'To make or become greater in number or size.', 'بڑھانا/بڑھنا', 'وڌائڻ/وڌ', 'The population is increasing every year.'),
  information: entry('noun', 'Facts or details about a person, place, or subject.', 'معلومات', 'ڄاڻ', 'Read the information carefully.'),
  knowledge: entry('noun', 'Information and understanding gained through learning.', 'علم، معلومات', 'علم، ڄاڻ', 'Reading increases knowledge.'),
  law: entry('noun', 'The set of rules that a country or society follows.', 'قانون', 'قانون', 'The law must be respected.'),
  learn: entry('verb', 'To gain knowledge or a new skill.', 'سیکھنا', 'سکڻ', 'We learn something new every day.'),
  lesson: entry('noun', 'A period or unit of learning.', 'سبق', 'سبق', 'Read today’s lesson.'),
  maximum: entry('noun / adjective', 'The greatest amount or highest limit possible.', 'زیادہ سے زیادہ، زیادہ سے زیادہ حد', 'سزايتو، اعلي حد', 'The maximum score is 100.'),
  meaning: entry('noun', 'The idea that a word, sign, or statement expresses.', 'معنی', 'معنيٰ', 'Find the meaning of the word.'),
  method: entry('noun', 'A particular way of doing something.', 'طریقہ', 'طريقو', 'Use a simple method to solve it.'),
  minimum: entry('noun / adjective', 'The least amount or lowest limit possible.', 'کم از کم، کمترین حد', 'گهڻو گهٽجي، گھٽترو حد', 'The minimum age is 18.'),
  mistake: entry('noun', 'Something done or understood incorrectly.', 'غلطی', 'غلطي', 'Review every mistake.'),
  objective: entry('noun / adjective', 'A goal, or based on facts rather than feelings.', 'مقصد، غیر جانب دار', 'مقصد، غير جانبدار', 'The objective is to improve accuracy.'),
  observe: entry('verb', 'To watch carefully and notice details.', 'مشاہدہ کرنا', 'ٺاهه ڪرڻ', 'Observe the pattern before answering.'),
  officer: entry('noun', 'A person with authority in the police, army, or government.', 'افسر', 'افسر', 'The officer guided the team.'),
  official: entry('adjective', 'Done by the proper authority or in a formal way.', 'باضابطہ، سرکاری', 'باهضابطه، سرڪاري', 'The official notice was posted yesterday.'),
  option: entry('noun', 'One of the choices available.', 'انتخاب، آپشن', 'چونڊ، آپشن', 'Select one option.'),
  paragraph: entry('noun', 'A group of sentences about one main idea.', 'پیراگراف', 'پيراگراف', 'Read the paragraph twice.'),
  policy: entry('noun', 'A plan or set of rules made by a government or organization.', 'پالیسی، اصول', 'پاليسي، اصول', 'The policy protects public interest.'),
  practice: entry('noun / verb', 'Repeated work that helps improve a skill.', 'مشق، عمل کرنا', 'مشق، عمل ڪرڻ', 'Daily practice improves results.'),
  prepare: entry('verb', 'To get ready for something.', 'تیاری کرنا', 'تياري ڪرڻ', 'Prepare well for the exam.'),
  progress: entry('noun', 'Improvement or movement toward a goal.', 'ترقی، پیش رفت', 'ترقي، اڳڀرائي', 'Track your weekly progress.'),
  public: entry('adjective / noun', 'For everyone or relating to people in general.', 'عوامی، عوام', 'عام، عوام', 'The public was informed about the event.'),
  purpose: entry('noun', 'The reason for doing something.', 'مقصد', 'مقصد', 'The purpose of study is to learn.'),
  quality: entry('noun', 'How good or valuable something is.', 'کوالٹی، معیار', 'گورنري، معيار', 'Quality matters more than speed.'),
  question: entry('noun', 'Something asked to get information.', 'سوال', 'سوال', 'Read the question carefully.'),
  reason: entry('noun', 'A cause or explanation for something.', 'سبب، دلیل', 'سبب، دليل', 'Give a clear reason for your choice.'),
  result: entry('noun', 'The outcome produced by an action or test.', 'نتیجہ', 'نتيجو', 'Your result shows steady progress.'),
  revise: entry('verb', 'To study something again in preparation for a test.', 'دہرائی کرنا', 'ورجاءُ ڪرڻ', 'Revise important topics tonight.'),
  score: entry('noun / verb', 'The number of points earned in a test or game.', 'نمبر، اسکور', 'نمبر، اسکور', 'She scored eighty marks.'),
  select: entry('verb', 'To choose something from available options.', 'منتخب کرنا', 'چونڊڻ', 'Select the best answer.'),
  service: entry('noun', 'Work done for others, or a government department.', 'خدمت', 'خدمت', 'Public service is important.'),
  simple: entry('adjective', 'Easy to understand or do.', 'سادہ، آسان', 'سادو، آسان', 'Use simple English.'),
  society: entry('noun', 'A community of people living together.', 'معاشرہ', 'سماج', 'A strong society supports its members.'),
  solution: entry('noun', 'An answer to a problem.', 'حل', 'حل', 'Check the solution carefully.'),
  strategy: entry('noun', 'A plan for achieving a goal.', 'حکمت عملی، منصوبہ', 'حڪمت عملي، منصوبو', 'A good strategy saves time.'),
  study: entry('verb', 'To spend time learning about a subject.', 'پڑھنا، مطالعہ کرنا', 'پڙهڻ، مطالعو ڪرڻ', 'I study science every evening.'),
  subject: entry('noun', 'An area of knowledge studied at school or college.', 'مضمون', 'مضمون', 'Mathematics is my favourite subject.'),
  summary: entry('noun', 'A short statement of the main points.', 'خلاصہ', 'خلاصو', 'Write a short summary.'),
  test: entry('noun', 'A set of questions used to measure knowledge or ability.', 'امتحان، ٹیسٹ', 'امتحان، ٽيسٽ', 'The test has fifty questions.'),
  topic: entry('noun', 'The subject being discussed or studied.', 'موضوع', 'موضوع', 'Choose a topic to practise.'),
  understand: entry('verb', 'To know the meaning of something.', 'سمجھنا', 'سمجهڻ', 'Try to understand the main idea.'),
  vocabulary: entry('noun', 'The words known or used by a person or language.', 'ذخیرۂ الفاظ', 'لفظن جو ذخيرو', 'Reading builds vocabulary.'),
  word: entry('noun', 'A unit of language that has meaning.', 'لفظ', 'لفظ', 'Click a word to see its meaning.'),
};

export function normalizeDictionaryWord(word: string): string {
  return word.toLocaleLowerCase('en').replace(/[^\p{L}'’\-]/gu, '').replace(/’/g, "'");
}

export function getBuiltInMeaning(word: string): DictionaryMeaning | null {
  const key = normalizeDictionaryWord(word);
  const value = BUILT_IN_DICTIONARY[key];
  return value ? { word, ...value } : null;
}
