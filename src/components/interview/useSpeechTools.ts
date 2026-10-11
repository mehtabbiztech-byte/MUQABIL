import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Dictation + read-aloud helpers for the interview room.
 *
 * Interviews are spoken, so the practice room supports dictating an answer and
 * hearing the panel's question read aloud. Both features degrade quietly when
 * the browser does not support them, and neither sends audio anywhere: the Web
 * Speech API runs in the browser.
 */
export interface SpeechTools {
  dictationSupported: boolean;
  isListening: boolean;
  dictationLang: string;
  setDictationLang: (lang: string) => void;
  toggleDictation: (onTranscript: (text: string) => void) => void;
  stopDictation: () => void;
  speakingId: string | null;
  speak: (id: string, text: string, lang?: string) => void;
  stopSpeaking: () => void;
}

export function useSpeechTools(): SpeechTools {
  const [dictationSupported, setDictationSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [dictationLang, setDictationLang] = useState('en-US');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const transcriptHandlerRef = useRef<((text: string) => void) | null>(null);

  useEffect(() => {
    const Recognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!Recognition) return;
    setDictationSupported(true);
    const recognition = new Recognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.onresult = (event: any) => {
      const results = event.results;
      const transcript = results[results.length - 1][0].transcript;
      if (transcript && transcriptHandlerRef.current) transcriptHandlerRef.current(transcript.trim());
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    return () => {
      try {
        recognition.stop();
      } catch {
        /* recognition was never started */
      }
      recognitionRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (recognitionRef.current) recognitionRef.current.lang = dictationLang;
  }, [dictationLang]);

  const stopDictation = useCallback(() => {
    try {
      recognitionRef.current?.stop();
    } catch {
      /* already stopped */
    }
    setIsListening(false);
  }, []);

  const toggleDictation = useCallback(
    (onTranscript: (text: string) => void) => {
      const recognition = recognitionRef.current;
      if (!recognition) return;
      transcriptHandlerRef.current = onTranscript;
      if (isListening) {
        stopDictation();
        return;
      }
      try {
        recognition.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    },
    [isListening, stopDictation]
  );

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setSpeakingId(null);
  }, []);

  const speak = useCallback(
    (id: string, text: string, lang = 'en-US') => {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      if (speakingId === id) {
        setSpeakingId(null);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.lang = lang;
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);
      setSpeakingId(id);
      window.speechSynthesis.speak(utterance);
    },
    [speakingId]
  );

  useEffect(
    () => () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    },
    []
  );

  return {
    dictationSupported,
    isListening,
    dictationLang,
    setDictationLang,
    toggleDictation,
    stopDictation,
    speakingId,
    speak,
    stopSpeaking,
  };
}
