import { Language } from '@/types';

// Speech Synthesis (Text to Speech) Controller
class SpeechController {
  private synth: SpeechSynthesis | null = null;
  private isSpeakingState: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public speak(
    text: string,
    lang: Language,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: any) => void
  ) {
    if (!this.synth) {
      if (onError) onError('Speech synthesis not supported in this browser.');
      return;
    }

    // Cancel ongoing speech
    this.stop();

    // Clean text from markdown formatting (*, #, _, `, etc.)
    const cleanText = text
      .replace(/[*#_`~>[\]()]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    this.currentUtterance = utterance;

    // Set locale
    if (lang === 'ur') {
      utterance.lang = 'ur-PK';
    } else if (lang === 'ro') {
      utterance.lang = 'ur-PK'; // Urdu phonetics fit Roman Urdu well
    } else {
      utterance.lang = 'en-US';
    }

    utterance.rate = lang === 'ur' ? 0.88 : 0.95; // Slightly slower for Urdu clarity
    utterance.pitch = 1.0;

    // Try finding best voice
    const voices = this.synth.getVoices();
    if (voices.length > 0) {
      let targetVoice = null;
      if (lang === 'ur') {
        targetVoice = voices.find(v => v.lang.includes('ur') || v.name.toLowerCase().includes('urdu'));
      }
      if (!targetVoice) {
        targetVoice = voices.find(v => v.lang.startsWith(utterance.lang.slice(0, 2)));
      }
      if (targetVoice) {
        utterance.voice = targetVoice;
      }
    }

    utterance.onstart = () => {
      this.isSpeakingState = true;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isSpeakingState = false;
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      this.isSpeakingState = false;
      this.currentUtterance = null;
      if (onError) onError(e);
    };

    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeakingState = false;
      this.currentUtterance = null;
    }
  }

  public isSpeaking(): boolean {
    return this.isSpeakingState;
  }
}

export const ttsController = new SpeechController();

// Speech Recognition (Voice Input) Controller
export function createSpeechRecognizer(
  lang: Language,
  onResult: (text: string) => void,
  onError: (err: string) => void,
  onEnd: () => void
) {
  if (typeof window === 'undefined') return null;

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    onError('Browser does not support Web Speech API. Please type your query.');
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  if (lang === 'ur') {
    recognition.lang = 'ur-PK';
  } else if (lang === 'ro') {
    recognition.lang = 'ur-PK';
  } else {
    recognition.lang = 'en-US';
  }

  recognition.onresult = (event: any) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    if (transcript) {
      onResult(transcript);
    }
  };

  recognition.onerror = (event: any) => {
    console.warn('Speech recognition error:', event.error);
    onError(event.error === 'no-speech' ? 'No voice heard. Please try again.' : `Voice error: ${event.error}`);
  };

  recognition.onend = () => {
    onEnd();
  };

  return recognition;
}
