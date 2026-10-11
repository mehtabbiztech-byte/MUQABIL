import React, { useEffect, useMemo, useRef, useState } from 'react';
import { 
  BookOpen, 
  Check, 
  Copy, 
  Database, 
  Globe2, 
  LoaderCircle, 
  Search, 
  Sparkles, 
  Volume2, 
  Wifi, 
  X 
} from 'lucide-react';
import { 
  BUILT_IN_DICTIONARY, 
  getBuiltInMeaning, 
  normalizeDictionaryWord, 
  type DictionaryMeaning 
} from '../data/builtInDictionary';
import { readSavedMeaning, saveMeaning } from '../lib/wordMeaningStore';

type MeaningSource = 'built-in' | 'saved' | 'online' | 'fallback';
type MeaningRequest = { word: string; x?: number; y?: number };

const FEATURED_EXAM_WORDS = [
  'pedagogy',
  'rubric',
  'assessment',
  'curriculum',
  'scaffolding',
  'constructivism',
  'accountability',
  'integrity',
  'equity',
  'formative',
  'photosynthesis',
  'friction',
  'density',
  'ordinance',
  'jurisdiction',
];

function preferredEnglishVoice(voices: SpeechSynthesisVoice[]) {
  const englishVoices = voices.filter(voice => voice.lang.toLowerCase().startsWith('en'));
  const preferredNames = ['natural', 'neural', 'google', 'samantha', 'aria', 'jenny', 'guy', 'serena', 'daniel'];
  return englishVoices
    .map(voice => ({
      voice,
      score: preferredNames.reduce(
        (total, name, index) => total + (voice.name.toLowerCase().includes(name) ? preferredNames.length - index : 0),
        voice.localService ? 1 : 0,
      ),
    }))
    .sort((a, b) => b.score - a.score)[0]?.voice;
}

function speakSlowly(word: string, onEnd: () => void) {
  if (!('speechSynthesis' in window)) {
    onEnd();
    return;
  }
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-GB';
    utterance.rate = 0.72;
    utterance.pitch = 1;
    utterance.volume = 1;
    const voices = window.speechSynthesis.getVoices();
    if (voices.length) {
      utterance.voice = preferredEnglishVoice(voices) ?? null;
    }
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
    window.speechSynthesis.speak(utterance);
  } catch {
    onEnd();
  }
}

export const WordMeaningPopup: React.FC = () => {
  const [selectedWord, setSelectedWord] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [meaning, setMeaning] = useState<DictionaryMeaning | null>(null);
  const [source, setSource] = useState<MeaningSource>('built-in');
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const requestId = useRef(0);
  const popupRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Suggestions for autocomplete when typing in search bar
  const suggestions = useMemo(() => {
    const q = searchInput.trim().toLowerCase();
    if (!q || q.length < 2) return [];
    return Object.keys(BUILT_IN_DICTIONARY)
      .filter(w => w.startsWith(q) && w !== q)
      .slice(0, 5);
  }, [searchInput]);

  const openMeaning = ({ word, x, y }: MeaningRequest) => {
    const clean = word.trim().replace(/^[^\p{L}]+|[^\p{L}]+$/gu, '');
    if (!clean || clean.length < 2 || clean.length > 45) return;

    setSelectedWord(clean);
    setSearchInput(clean);

    if (typeof x === 'number' && typeof y === 'number' && window.innerWidth >= 640) {
      const popupWidth = Math.min(440, window.innerWidth - 24);
      const popupHeight = Math.min(620, window.innerHeight - 24);
      setPosition({
        x: Math.max(12, Math.min(x + 12, window.innerWidth - popupWidth - 16)),
        y: Math.max(12, Math.min(y + 16, window.innerHeight - popupHeight - 16)),
      });
    } else {
      // Mobile or centered
      setPosition(null);
    }
  };

  useEffect(() => {
    const onMeaningRequest = (event: Event) => {
      const customEvent = event as CustomEvent<MeaningRequest>;
      if (customEvent.detail?.word) {
        openMeaning(customEvent.detail);
      }
    };

    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      // Inside popup card: keep open
      if (popupRef.current && popupRef.current.contains(target)) {
        return;
      }

      // Explicitly clicked word tag
      const underlinedWordEl = target.closest('[data-word-meaning-word]');
      if (underlinedWordEl) {
        const word = underlinedWordEl.getAttribute('data-word-meaning-word');
        if (word) {
          openMeaning({ word, x: event.clientX, y: event.clientY });
          return;
        }
      }

      // Explicit dictionary launcher button
      const launcherEl = target.closest('[data-open-dictionary]');
      if (launcherEl) {
        const word = launcherEl.getAttribute('data-open-dictionary') || 'pedagogy';
        openMeaning({ word, x: event.clientX, y: event.clientY });
        return;
      }

      // Outside click closes active popup
      setSelectedWord('');
    };

    // Double-click on ANY word across the entire document
    const onDoubleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      // Don't trigger if double-clicking inside input, textarea, or button
      if (target.closest('input, textarea, [data-disable-word-meaning]')) return;

      const selection = window.getSelection()?.toString().trim();
      if (!selection) return;

      const cleanWord = selection.replace(/^[^\p{L}]+|[^\p{L}]+$/gu, '');
      if (cleanWord && cleanWord.length >= 2 && cleanWord.length <= 45 && !cleanWord.includes(' ') && !cleanWord.includes('\n')) {
        openMeaning({ word: cleanWord, x: event.clientX, y: event.clientY });
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedWord('');
      }
    };

    window.addEventListener('meqsa:word-meaning', onMeaningRequest);
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('dblclick', onDoubleClick);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('meqsa:word-meaning', onMeaningRequest);
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('dblclick', onDoubleClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  // Fetch / lookup meaning
  useEffect(() => {
    if (!selectedWord) return;
    const currentRequest = ++requestId.current;
    const key = normalizeDictionaryWord(selectedWord);

    // 1. Check instant built-in dictionary
    const local = getBuiltInMeaning(selectedWord);
    if (local) {
      setMeaning(local);
      setSource('built-in');
      setLoading(false);
      return;
    }

    // 2. Check session storage cache
    const cached = sessionStorage.getItem(`meqsa-word-meaning:${key}`);
    if (cached) {
      try {
        setMeaning(JSON.parse(cached) as DictionaryMeaning);
        setSource('saved');
        setLoading(false);
        return;
      } catch {
        sessionStorage.removeItem(`meqsa-word-meaning:${key}`);
      }
    }

    // 3. Check persistent IndexedDB or fetch online
    const findMeaning = async () => {
      setMeaning(null);
      setLoading(true);

      const saved = await readSavedMeaning(key);
      if (currentRequest !== requestId.current) return;
      if (saved) {
        setMeaning({ ...saved, word: selectedWord });
        setSource('saved');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/word-meaning', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ word: selectedWord }),
        });
        if (!response.ok) throw new Error('Meaning service unavailable');
        const data = await response.json() as DictionaryMeaning;
        if (currentRequest !== requestId.current) return;
        setMeaning(data);
        setSource('online');
        sessionStorage.setItem(`meqsa-word-meaning:${key}`, JSON.stringify(data));
        await saveMeaning(key, data);
      } catch {
        if (currentRequest !== requestId.current) return;
        setMeaning({
          word: selectedWord,
          partOfSpeech: 'academic term',
          simpleEnglish: `“${selectedWord}” is an exam vocabulary term. Full internet AI definition is ready when connected, and will be saved offline.`,
          urdu: `“${selectedWord}” امتحانی اصطلاح ہے۔ آن لائن منسلک ہونے پر مکمل معنی خودکار طور پر مستقل محفوظ ہو جائے گا۔`,
          sindhi: `“${selectedWord}” امتحان جي اصطلاح آهي۔ آن لائن ٿيڻ تي مڪمل معنيٰ خودڪار نموني هميشه لاءِ محفوظ ٿي ويندي۔`,
        });
        setSource('fallback');
      } finally {
        if (currentRequest === requestId.current) setLoading(false);
      }
    };

    void findMeaning();
  }, [selectedWord]);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    openMeaning({ word: searchInput.trim() });
  };

  const handleCopyMeaning = () => {
    if (!meaning) return;
    const textToCopy = `📖 ${meaning.word} (${meaning.partOfSpeech})
• Simple English: ${meaning.simpleEnglish}
• اردو: ${meaning.urdu}
• سنڌي: ${meaning.sindhi}
${meaning.example ? `• Example: ${meaning.example}` : ''}`;
    
    void navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!selectedWord) return null;

  const isDesktopPositioned = position !== null && window.innerWidth >= 640;

  return (
    <div 
      className={isDesktopPositioned ? '' : 'fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-200'}
      data-disable-word-meaning
    >
      <aside
        ref={popupRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Meaning of ${selectedWord}`}
        className={`fixed z-[101] flex flex-col overflow-hidden rounded-3xl border border-emerald-300/80 bg-white/95 text-slate-900 shadow-[0_24px_70px_-20px_rgba(6,78,59,0.45)] ring-1 ring-white/80 backdrop-blur-xl dark:border-emerald-700/80 dark:bg-slate-950/95 dark:text-slate-100 dark:ring-slate-700/60 transition-all ${
          isDesktopPositioned 
            ? 'w-[min(440px,calc(100vw-24px))] max-h-[min(620px,calc(100vh-24px))]' 
            : 'relative inset-auto w-full max-w-lg max-h-[min(85vh,640px)]'
        }`}
        style={
          isDesktopPositioned
            ? { left: position.x, top: position.y }
            : {}
        }
      >
        {/* Accent top gradient banner */}
        <div className="h-1.5 shrink-0 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400" />

        {/* Header Bar */}
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-200/80 px-5 pb-3.5 pt-4 dark:border-slate-800">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                <Globe2 size={13} />
              </span>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                Trilingual Dictionary · اردو / سنڌي / English
              </p>
            </div>

            {/* Word Title & Pronunciation */}
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
              <h2 className="font-display break-words text-[clamp(1.75rem,6vw,2.25rem)] font-extrabold leading-none tracking-tight text-slate-950 dark:text-white">
                {selectedWord}
              </h2>
              <button
                onClick={() => {
                  setSpeaking(true);
                  speakSlowly(selectedWord, () => setSpeaking(false));
                }}
                className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800 shadow-xs transition hover:border-emerald-300 hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                aria-label={`Hear ${selectedWord} pronounced slowly`}
              >
                <Volume2 size={16} className={speaking ? 'animate-pulse text-emerald-600' : ''} />
                {speaking ? 'Speaking…' : 'Pronounce'}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {meaning && (
              <button 
                onClick={handleCopyMeaning} 
                className="grid size-9 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-2xs transition hover:bg-slate-100 hover:text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                title="Copy trilingual meaning"
                aria-label="Copy meaning"
              >
                {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
              </button>
            )}
            <button 
              onClick={() => setSelectedWord('')} 
              className="grid size-9 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-2xs transition hover:rotate-90 hover:bg-slate-100 hover:text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800" 
              aria-label="Close word meaning"
            >
              <X size={19} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Quick Search Input */}
        <div className="shrink-0 border-b border-slate-100 bg-slate-50/70 px-5 py-2.5 dark:border-slate-800/80 dark:bg-slate-900/40">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="pointer-events-none absolute left-3 w-4 h-4 text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search any English / exam word..."
              className="w-full rounded-xl border border-slate-200 bg-white py-1.5 pl-9 pr-8 text-xs font-medium text-slate-900 placeholder-slate-400 shadow-2xs transition focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput('');
                  inputRef.current?.focus();
                }}
                className="absolute right-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={14} />
              </button>
            )}
          </form>

          {/* Autocomplete Suggestions */}
          {suggestions.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              <span className="text-[10px] text-slate-400 font-bold self-center mr-1">Suggestions:</span>
              {suggestions.map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => openMeaning({ word: sug })}
                  className="rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 dark:bg-slate-800 dark:border-slate-700 dark:text-emerald-300"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Body Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 px-5 py-14 text-center">
            <LoaderCircle className="animate-spin text-emerald-600" size={26} />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Looking up multilingual meanings…</p>
            <p className="text-xs text-slate-400">Verifying English, Urdu and Sindhi definitions</p>
          </div>
        ) : meaning ? (
          <div className="space-y-3.5 overflow-y-auto overscroll-contain px-5 py-4 text-[15px] leading-7 [scrollbar-color:rgb(16_185_129)_transparent] [scrollbar-width:thin]">
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold leading-4 text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/60 dark:text-emerald-200">
                {meaning.partOfSpeech}
              </span>

              <span className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:bg-slate-800/80 dark:text-slate-300">
                {source === 'online' ? <Wifi size={12} className="text-teal-600" /> : <Database size={12} className="text-emerald-600" />}
                {source === 'online' && 'Online AI · Saved offline'}
                {source === 'saved' && 'Saved in offline store'}
                {source === 'built-in' && 'Built-in offline dictionary'}
                {source === 'fallback' && 'Offline summary'}
              </span>
            </div>

            {/* Simple English */}
            <section className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs dark:border-slate-800 dark:bg-slate-900/80">
              <p className="mb-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                Simple English Definition
              </p>
              <p className="text-[15px] font-medium leading-relaxed text-slate-800 dark:text-slate-100">
                {meaning.simpleEnglish}
              </p>
            </section>

            {/* Urdu Meaning */}
            <section dir="rtl" lang="ur" className="font-urdu rounded-2xl border border-blue-200/70 bg-blue-50/70 p-3.5 text-right shadow-2xs dark:border-blue-900/50 dark:bg-blue-950/30">
              <div className="flex items-center justify-between pb-1 border-b border-blue-200/50 dark:border-blue-900/30 mb-2">
                <span className="text-[11px] font-sans font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">Urdu Translation</span>
                <p className="text-sm font-bold text-blue-900 dark:text-blue-200">اردو معنی و تشریح</p>
              </div>
              <p className="text-lg leading-[2.1] text-slate-900 dark:text-slate-100 font-medium">
                {meaning.urdu}
              </p>
            </section>

            {/* Sindhi Meaning */}
            <section dir="rtl" lang="sd" className="font-urdu rounded-2xl border border-emerald-200/70 bg-emerald-50/70 p-3.5 text-right shadow-2xs dark:border-emerald-900/50 dark:bg-emerald-950/30">
              <div className="flex items-center justify-between pb-1 border-b border-emerald-200/50 dark:border-emerald-900/30 mb-2">
                <span className="text-[11px] font-sans font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Sindhi Translation</span>
                <p className="text-sm font-bold text-emerald-900 dark:text-emerald-200">سنڌي معنيٰ ۽ سمجهاڻي</p>
              </div>
              <p className="text-lg leading-[2.1] text-slate-900 dark:text-slate-100 font-medium">
                {meaning.sindhi}
              </p>
            </section>

            {/* Example sentence */}
            {meaning.example && (
              <section className="rounded-2xl border border-amber-200/70 bg-amber-50/70 p-3.5 dark:border-amber-900/50 dark:bg-amber-950/30 shadow-2xs">
                <p className="mb-1 text-[11px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                  Exam & Contextual Example
                </p>
                <p className="text-[14px] font-medium leading-relaxed text-slate-800 dark:text-slate-100 italic">
                  “{meaning.example.replace(/^["“”']+|["“”']+$/g, '')}”
                </p>
              </section>
            )}

            {/* Featured exam terms chips */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles size={13} className="text-purple-600" />
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Popular Exam Terms:
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {FEATURED_EXAM_WORDS.slice(0, 8).map((word) => (
                  <button
                    key={word}
                    onClick={() => openMeaning({ word })}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-emerald-600 dark:hover:bg-slate-800/80"
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>

            <p className="flex items-center gap-2 pt-2 text-xs font-medium text-slate-400 dark:text-slate-500">
              <BookOpen size={13} className="text-emerald-600 shrink-0" />
              Tip: Double-click any word anywhere on screen to see its instant meaning.
            </p>
          </div>
        ) : null}
      </aside>
    </div>
  );
};
