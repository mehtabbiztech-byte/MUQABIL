import React from 'react';
import { getBuiltInMeaning } from '../data/builtInDictionary';

const BASIC_STOP_WORDS = new Set([
  'because', 'between', 'during', 'following', 'something', 'through',
  'another', 'without', 'against', 'already', 'however', 'whether',
]);

export function isDifficultWord(value: string): boolean {
  const word = value.toLocaleLowerCase('en').replace(/[^\p{L}'’\-]/gu, '');
  if (!word || BASIC_STOP_WORDS.has(word)) return false;
  // If explicitly recognized in the dictionary (including stemming), always highlight
  if (getBuiltInMeaning(word) !== null) return true;
  // Or if it is an advanced/longer academic word
  return word.length >= 6;
}

type MeaningTextProps = {
  text?: string | null;
  className?: string;
  allWords?: boolean;
};

/**
 * Highlights key exam vocabulary without changing the surrounding layout. Clicking a
 * highlighted word opens the trilingual dictionary popup without triggering its parent
 * option or button.
 */
export const MeaningText: React.FC<MeaningTextProps> = ({ text, className, allWords = false }) => {
  if (!text) return null;

  const parts = text.split(/([\p{L}][\p{L}'’\-]*)/gu);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        const isWord = /^[\p{L}][\p{L}'’\-]*$/u.test(part);
        const clickable = isWord && (allWords || isDifficultWord(part));
        if (!clickable) return <React.Fragment key={index}>{part}</React.Fragment>;

        return (
          <span
            key={index}
            data-word-meaning-word={part}
            className="cursor-help rounded px-0.5 font-medium underline decoration-dotted decoration-emerald-600/80 underline-offset-4 hover:bg-emerald-100/90 hover:text-emerald-950 dark:decoration-emerald-400/80 dark:hover:bg-emerald-950/90 dark:hover:text-emerald-100 transition-colors inline-block"
            title={`Click for trilingual meaning of “${part}”`}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              window.dispatchEvent(new CustomEvent('meqsa:word-meaning', {
                detail: { word: part, x: event.clientX, y: event.clientY },
              }));
            }}
          >
            {part}
          </span>
        );
      })}
    </span>
  );
};
