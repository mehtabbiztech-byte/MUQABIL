import React, { useState } from 'react';
import { 
  Check, 
  Copy, 
  ExternalLink, 
  ChevronRight, 
  Sparkles, 
  BookOpen, 
  HelpCircle, 
  FileText,
  Globe,
  Award
} from 'lucide-react';

interface ChatMarkdownRendererProps {
  content: string;
  onNavigateTab?: (tab: string, paperId?: string) => void;
}

// Regex to detect Arabic, Urdu, and Sindhi Unicode scripts
const RTL_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

/**
 * Checks if a string is predominantly RTL (Urdu, Sindhi, Arabic)
 */
function isPredominantlyRtl(text: string): boolean {
  let rtlCount = 0;
  let ltrCount = 0;
  for (const char of text) {
    if (RTL_REGEX.test(char)) {
      rtlCount++;
    } else if (/[a-zA-Z]/.test(char)) {
      ltrCount++;
    }
  }
  return rtlCount > ltrCount && rtlCount > 3;
}

/**
 * Renders inline markdown tokens:
 * - Bold: **text** or __text__
 * - Italic: *text* or _text_
 * - Bold-Italic: ***text***
 * - Inline Code: `code`
 * - Links: [label](url)
 * - Bidirectional isolation for embedded Urdu/Sindhi words
 */
function renderInlineContent(text: string): React.ReactNode[] {
  // Tokenize using regex capturing inline patterns
  const tokens: React.ReactNode[] = [];
  
  // Combined pattern for code, bold-italic, bold, italic, links, and RTL clusters
  const pattern = /(`[^`]+`|\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|_[^_]+_|\*[^*]+\*|\[[^\]]+\]\([^)]+\)|[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s،؛؟۔]{4,})/g;
  
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  let keyCounter = 0;

  while ((match = pattern.exec(text)) !== null) {
    // Push preceding plain text
    if (match.index > lastIndex) {
      const plain = text.substring(lastIndex, match.index);
      tokens.push(<span key={`plain-${keyCounter++}`}>{plain}</span>);
    }

    const token = match[0];

    if (token.startsWith('`') && token.endsWith('`')) {
      // Inline Code
      tokens.push(
        <code 
          key={`code-${keyCounter++}`} 
          className="px-1.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-mono text-[11px] sm:text-xs border border-purple-200/60 dark:border-purple-800/60 font-medium"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('***') && token.endsWith('***')) {
      // Bold Italic
      tokens.push(
        <strong key={`bi-${keyCounter++}`} className="font-extrabold italic text-slate-950 dark:text-white">
          {renderInlineContent(token.slice(3, -3))}
        </strong>
      );
    } else if (token.startsWith('**') && token.endsWith('**')) {
      // Bold
      const inner = token.slice(2, -2);
      tokens.push(
        <strong key={`b-${keyCounter++}`} className="font-extrabold text-slate-950 dark:text-white">
          {renderInlineContent(inner)}
        </strong>
      );
    } else if ((token.startsWith('*') && token.endsWith('*')) || (token.startsWith('_') && token.endsWith('_'))) {
      // Italic
      const inner = token.slice(1, -1);
      tokens.push(
        <em key={`i-${keyCounter++}`} className="italic text-slate-800 dark:text-slate-200">
          {renderInlineContent(inner)}
        </em>
      );
    } else if (token.startsWith('[') && token.includes('](') && token.endsWith(')')) {
      // Link [text](url)
      const linkMatch = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        tokens.push(
          <a
            key={`a-${keyCounter++}`}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 dark:text-emerald-400 font-bold underline hover:text-emerald-700 dark:hover:text-emerald-300 inline-flex items-center gap-0.5"
          >
            <span>{linkMatch[1]}</span>
            <ExternalLink className="w-3 h-3 inline-block" />
          </a>
        );
      } else {
        tokens.push(<span key={`text-${keyCounter++}`}>{token}</span>);
      }
    } else if (RTL_REGEX.test(token)) {
      // Urdu / Sindhi RTL text chunk embedded in English
      tokens.push(
        <bdi 
          key={`rtl-${keyCounter++}`} 
          dir="rtl" 
          className="font-['Noto_Nastaliq_Urdu',sans-serif] px-1 text-slate-900 dark:text-slate-100 font-normal inline-block text-[13px] leading-relaxed"
        >
          {token}
        </bdi>
      );
    } else {
      tokens.push(<span key={`other-${keyCounter++}`}>{token}</span>);
    }

    lastIndex = match.index + token.length;
  }

  // Push remaining text
  if (lastIndex < text.length) {
    tokens.push(<span key={`rem-${keyCounter++}`}>{text.substring(lastIndex)}</span>);
  }

  return tokens.length > 0 ? tokens : [<span key="empty">{text}</span>];
}

interface CodeBlockProps {
  language?: string;
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 text-slate-200 text-xs shadow-md">
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400">
        <span className="font-bold uppercase tracking-wider text-purple-400">
          {language || 'text'}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-white transition cursor-pointer"
          title="Copy code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-3.5 overflow-x-auto font-mono text-xs text-slate-200 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
};

interface QuizMcqData {
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
  topic?: string;
}

const InteractiveQuizCard: React.FC<{ data: QuizMcqData; index: number }> = ({ data, index }) => {
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Normalize answer letter (A, B, C, D)
  const correctLetter = (data.answer || '').trim().toUpperCase().charAt(0);

  const handleSelect = (letter: string) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(letter);
    setShowExplanation(true);
  };

  const isCorrect = selectedOpt === correctLetter;

  return (
    <div className="my-3 p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/40 dark:from-slate-900/90 dark:to-indigo-950/40 border border-purple-200/80 dark:border-purple-800/70 shadow-sm space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] font-black flex items-center justify-center">
            {index + 1}
          </span>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-700 dark:text-purple-300">
            Interactive Exam MCQ
          </span>
        </div>
        {selectedOpt && (
          <span className={`text-xs font-bold flex items-center gap-1 ${isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
            {isCorrect ? '✓ Correct Choice!' : `✗ Incorrect (Correct: Option ${correctLetter})`}
          </span>
        )}
      </div>

      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
        {data.question}
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {Array.isArray(data.options) && data.options.map((opt, optIdx) => {
          const letterMatch = opt.match(/^([A-D])[\).\s]+(.*)$/i);
          const letter = letterMatch ? letterMatch[1].toUpperCase() : String.fromCharCode(65 + optIdx);
          const text = letterMatch ? letterMatch[2] : opt;

          let btnClass = "border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800 hover:border-purple-300 text-slate-800 dark:text-slate-200";
          if (selectedOpt !== null) {
            if (letter === correctLetter) {
              btnClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-100 font-bold ring-2 ring-emerald-500/30";
            } else if (selectedOpt === letter) {
              btnClass = "border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-100 font-bold ring-2 ring-rose-500/30";
            } else {
              btnClass = "opacity-50 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-400";
            }
          }

          return (
            <button
              key={letter}
              type="button"
              onClick={() => handleSelect(letter)}
              disabled={selectedOpt !== null}
              className={`p-2.5 rounded-xl border text-left text-xs transition cursor-pointer flex items-center gap-2.5 ${btnClass}`}
            >
              <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0 ${
                selectedOpt !== null && letter === correctLetter
                  ? 'bg-emerald-600 text-white'
                  : selectedOpt === letter
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}>
                {letter}
              </span>
              <span className="flex-1 text-[12px]">{text}</span>
            </button>
          );
        })}
      </div>

      {showExplanation && data.explanation && (
        <div className="p-3 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/70 text-xs text-slate-700 dark:text-slate-300 space-y-1 animate-in fade-in duration-200">
          <div className="font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5 text-[11px]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Explanation & Key Takeaway</span>
          </div>
          <p className="leading-relaxed text-[11px] sm:text-xs">
            {data.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

const GroundingSourcesCard: React.FC<{ sources: Array<{ title: string; url: string }> }> = ({ sources }) => {
  const [expanded, setExpanded] = useState(false);
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-3 p-3.5 rounded-2xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200/80 dark:border-sky-800/80 text-xs space-y-2">
      <button 
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between text-left text-sky-900 dark:text-sky-200 font-bold cursor-pointer"
      >
        <span className="flex items-center gap-1.5 text-[11px]">
          <Globe className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>Verified Real-Time Sources (Google Search Grounding · {sources.length})</span>
        </span>
        <span className="text-[11px] text-sky-600 dark:text-sky-400 font-semibold underline">
          {expanded ? 'Hide Sources' : 'View Citations'}
        </span>
      </button>

      {expanded && (
        <ul className="space-y-1.5 pt-2 border-t border-sky-200/70 dark:border-sky-800/70">
          {sources.map((src, sIdx) => (
            <li key={sIdx} className="flex items-center gap-2 text-[11px]">
              <ExternalLink className="w-3 h-3 text-sky-500 shrink-0" />
              <a 
                href={src.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sky-700 dark:text-sky-300 hover:underline truncate"
              >
                {src.title || src.url}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const ChatMarkdownRenderer: React.FC<ChatMarkdownRendererProps> = ({
  content,
  onNavigateTab
}) => {
  // 1. Extract Navigation Directives (<<<NAVIGATE: {...}>>>)
  const navMatches = [...content.matchAll(/<<<NAVIGATE:\s*({[\s\S]*?})\s*>>>/g)];
  
  // 2. Extract Interactive Quiz MCQs (<<<QUIZ_MCQ: {...}>>>)
  const quizMatches = [...content.matchAll(/<<<QUIZ_MCQ:\s*({[\s\S]*?})\s*>>>/g)];

  // 3. Extract Grounding Sources (<<<GROUNDING_SOURCES: [...]>>>)
  const sourceMatches = [...content.matchAll(/<<<GROUNDING_SOURCES:\s*(\[[\s\S]*?\])\s*>>>/g)];

  // Clean raw content by removing embedded metadata directives
  const cleanContent = content
    .replace(/<<<NAVIGATE:\s*({[\s\S]*?})\s*>>>/g, '')
    .replace(/<<<QUIZ_MCQ:\s*({[\s\S]*?})\s*>>>/g, '')
    .replace(/<<<GROUNDING_SOURCES:\s*(\[[\s\S]*?\])\s*>>>/g, '')
    .trim();

  // 4. Parse Lines into Blocks
  const lines = cleanContent.split('\n');
  const elements: React.ReactNode[] = [];
  
  let i = 0;
  let keyIndex = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const trimmedLine = rawLine.trim();

    // Empty line
    if (!trimmedLine) {
      i++;
      continue;
    }

    // Code block opening: ```lang
    if (trimmedLine.startsWith('```')) {
      const lang = trimmedLine.replace(/^```/, '').trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length && lines[i].trim().startsWith('```')) {
        i++; // skip closing ```
      }
      elements.push(
        <CodeBlock 
          key={`code-block-${keyIndex++}`} 
          language={lang} 
          code={codeLines.join('\n')} 
        />
      );
      continue;
    }

    // Horizontal Rule: ---, ***, ___
    if (/^(\*{3,}|-{3,}|_{3,})$/.test(trimmedLine)) {
      elements.push(
        <hr key={`hr-${keyIndex++}`} className="my-4 border-slate-200 dark:border-slate-700/80" />
      );
      i++;
      continue;
    }

    // Headings
    if (trimmedLine.startsWith('#')) {
      const match = trimmedLine.match(/^(#{1,6})\s+(.*)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2];
        const isRtl = isPredominantlyRtl(text);

        if (level === 1) {
          elements.push(
            <h1 
              key={`h1-${keyIndex++}`} 
              dir={isRtl ? 'rtl' : 'ltr'} 
              className={`text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-4 mb-2 pb-1 border-b border-slate-200 dark:border-slate-800 ${isRtl ? 'font-[\'Noto_Nastaliq_Urdu\',sans-serif]' : 'font-display'}`}
            >
              {renderInlineContent(text)}
            </h1>
          );
        } else if (level === 2) {
          elements.push(
            <h2 
              key={`h2-${keyIndex++}`} 
              dir={isRtl ? 'rtl' : 'ltr'} 
              className={`text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-3.5 mb-2 pb-1 ${isRtl ? 'font-[\'Noto_Nastaliq_Urdu\',sans-serif]' : 'font-display'}`}
            >
              {renderInlineContent(text)}
            </h2>
          );
        } else if (level === 3) {
          elements.push(
            <h3 
              key={`h3-${keyIndex++}`} 
              dir={isRtl ? 'rtl' : 'ltr'} 
              className="text-base sm:text-lg font-bold text-emerald-700 dark:text-emerald-400 mt-3 mb-1.5 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{renderInlineContent(text)}</span>
            </h3>
          );
        } else {
          elements.push(
            <h4 
              key={`h4-${keyIndex++}`} 
              dir={isRtl ? 'rtl' : 'ltr'} 
              className="text-sm font-bold text-purple-700 dark:text-purple-300 mt-2.5 mb-1"
            >
              {renderInlineContent(text)}
            </h4>
          );
        }
        i++;
        continue;
      }
    }

    // Blockquote: > quote
    if (trimmedLine.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      const quoteText = quoteLines.join(' ');
      const isRtl = isPredominantlyRtl(quoteText);
      elements.push(
        <blockquote 
          key={`quote-${keyIndex++}`} 
          dir={isRtl ? 'rtl' : 'ltr'}
          className="border-l-4 border-emerald-500 pl-3.5 py-1.5 my-2.5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-r-xl text-slate-700 dark:text-slate-300 text-xs sm:text-sm italic"
        >
          {renderInlineContent(quoteText)}
        </blockquote>
      );
      continue;
    }

    // Markdown Table: | Header 1 | Header 2 |
    if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|') && i + 1 < lines.length && lines[i + 1].trim().startsWith('|') && lines[i + 1].includes('---')) {
      const tableRows: string[][] = [];
      
      // Header row
      const headers = trimmedLine.split('|').filter((c, idx, arr) => idx > 0 && idx < arr.length - 1).map(c => c.trim());
      i += 2; // skip header and divider row

      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        const row = lines[i].trim().split('|').filter((c, idx, arr) => idx > 0 && idx < arr.length - 1).map(c => c.trim());
        tableRows.push(row);
        i++;
      }

      elements.push(
        <div key={`table-${keyIndex++}`} className="my-3 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                {headers.map((h, hIdx) => (
                  <th key={hIdx} className="px-3 py-2 border-r border-slate-200 dark:border-slate-700 last:border-none">
                    {renderInlineContent(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
              {tableRows.map((r, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                  {r.map((cell, cIdx) => (
                    <td key={cIdx} className="px-3 py-2 text-slate-700 dark:text-slate-300 border-r border-slate-100 dark:border-slate-800 last:border-none">
                      {renderInlineContent(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // List Items (Bullet * or - or Numbered 1.)
    const isBullet = /^(\s*)([*+-])\s+(.*)$/.test(rawLine);
    const isNumbered = /^(\s*)(\d+)\.\s+(.*)$/.test(rawLine);

    if (isBullet || isNumbered) {
      const listItems: { indent: number; text: string; isNumber: boolean; num?: string }[] = [];

      while (i < lines.length) {
        const curLine = lines[i];
        const bMatch = curLine.match(/^(\s*)([*+-])\s+(.*)$/);
        const nMatch = curLine.match(/^(\s*)(\d+)\.\s+(.*)$/);

        if (bMatch) {
          listItems.push({
            indent: bMatch[1].length,
            text: bMatch[3],
            isNumber: false,
          });
          i++;
        } else if (nMatch) {
          listItems.push({
            indent: nMatch[1].length,
            text: nMatch[3],
            isNumber: true,
            num: nMatch[2],
          });
          i++;
        } else if (curLine.startsWith('   ') || curLine.startsWith('\t')) {
          // Continuation of previous item
          if (listItems.length > 0) {
            listItems[listItems.length - 1].text += ' ' + curLine.trim();
          }
          i++;
        } else {
          break;
        }
      }

      elements.push(
        <ul key={`list-${keyIndex++}`} className="space-y-1.5 my-2.5 text-xs sm:text-sm">
          {listItems.map((item, lIdx) => {
            const isRtl = isPredominantlyRtl(item.text);
            const isNested = item.indent >= 2;

            return (
              <li 
                key={lIdx} 
                dir={isRtl ? 'rtl' : 'ltr'} 
                className={`flex items-start gap-2 ${isNested ? 'ml-5 sm:ml-6' : ''} text-slate-800 dark:text-slate-200 leading-relaxed`}
              >
                {item.isNumber ? (
                  <span className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-purple-300/60 dark:border-purple-800/60">
                    {item.num}
                  </span>
                ) : (
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-2 ${
                    isNested ? 'bg-amber-400 dark:bg-amber-500' : 'bg-emerald-600 dark:text-emerald-400'
                  }`} />
                )}
                
                <div className={`flex-1 ${isRtl ? 'font-[\'Noto_Nastaliq_Urdu\',sans-serif]' : ''}`}>
                  {renderInlineContent(item.text)}
                </div>
              </li>
            );
          })}
        </ul>
      );
      continue;
    }

    // Standard Paragraph
    const paragraphLines: string[] = [];
    while (
      i < lines.length && 
      lines[i].trim() && 
      !lines[i].trim().startsWith('#') && 
      !lines[i].trim().startsWith('```') && 
      !lines[i].trim().startsWith('>') && 
      !lines[i].trim().startsWith('|') && 
      !/^(\*{3,}|-{3,}|_{3,})$/.test(lines[i].trim()) && 
      !/^(\s*)([*+-]|\d+\.)\s+/.test(lines[i])
    ) {
      paragraphLines.push(lines[i].trim());
      i++;
    }

    const paraText = paragraphLines.join(' ');
    const isRtl = isPredominantlyRtl(paraText);

    elements.push(
      <p 
        key={`p-${keyIndex++}`} 
        dir={isRtl ? 'rtl' : 'ltr'} 
        className={`text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-relaxed my-2 ${
          isRtl ? 'font-[\'Noto_Nastaliq_Urdu\',sans-serif] text-sm' : ''
        }`}
      >
        {renderInlineContent(paraText)}
      </p>
    );
  }

  // 5. Render Interactive Quiz MCQs
  const quizDirectives = quizMatches.map((match, qIdx) => {
    try {
      const data = JSON.parse(match[1]) as QuizMcqData;
      return <InteractiveQuizCard key={`quiz-card-${qIdx}`} data={data} index={qIdx} />;
    } catch {
      return null;
    }
  });

  // 6. Render Grounding Citations
  const groundingDirectives = sourceMatches.map((match, sIdx) => {
    try {
      const sources = JSON.parse(match[1]) as Array<{ title: string; url: string }>;
      return <GroundingSourcesCard key={`grounding-card-${sIdx}`} sources={sources} />;
    } catch {
      return null;
    }
  });

  // 7. Render Interactive Navigation Cards
  const navDirectives = navMatches.map((match, mIdx) => {
    try {
      const data = JSON.parse(match[1]);
      return (
        <div 
          key={`nav-card-${mIdx}`} 
          className="mt-3 p-3.5 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50/50 to-emerald-50/40 dark:from-purple-950/40 dark:via-indigo-950/30 dark:to-emerald-950/30 border border-purple-200/80 dark:border-purple-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">
                {data.label || 'Recommended Action'}
              </h5>
              {data.description && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                  {data.description}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={() => onNavigateTab && onNavigateTab(data.tab, data.paperId)}
            className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
          >
            <span>Launch Now</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      );
    } catch {
      return null;
    }
  });

  return (
    <div className="chat-markdown-body space-y-1">
      {elements}
      {quizDirectives}
      {groundingDirectives}
      {navDirectives}
    </div>
  );
};
