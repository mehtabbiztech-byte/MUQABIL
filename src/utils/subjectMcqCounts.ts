import type { MCQ } from '../types';

const SUBJECT_CATEGORY_ALIASES: Record<string, readonly string[]> = {
  'management-sciences': ['management-sciences', 'accounting', 'auditing', 'finance', 'hrm', 'marketing'],
  'pakistan-affairs': ['pakistan-affairs', 'pakistan-studies'],
  'pakistan-studies': ['pakistan-studies', 'pakistan-affairs'],
  'computer-science': ['computer-science', 'computer'],
  computer: ['computer', 'computer-science'],
};

export function countSubjectMcqs(mcqs: readonly Pick<MCQ, 'category'>[], subjectSlug: string): number {
  const categories = SUBJECT_CATEGORY_ALIASES[subjectSlug] || [subjectSlug];
  return mcqs.reduce((count, item) => count + (categories.includes(item.category) ? 1 : 0), 0);
}
