export const LANGUAGE_CODES = ['es', 'fr', 'ja'] as const;
export type LanguageCode = (typeof LANGUAGE_CODES)[number];

export const ACTIVITY_TYPES = ['flashcards', 'sentence_translation', 'listen_and_repeat', 'fill_in_the_blank', 'match_pairs'] as const;
export type ActivityType = (typeof ACTIVITY_TYPES)[number];

export interface LearningLanguage {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  description: string;
}

export interface LearningUnit {
  id: string;
  languageCode: LanguageCode;
  title: string;
  description: string;
  order: number;
  lessonIds: string[];
}

export interface VocabularyItem {
  word: string;
  translation: string;
  partOfSpeech?: string;
  example?: string;
}

export interface PhraseItem {
  phrase: string;
  translation: string;
  context?: string;
}

export interface LearningActivity {
  id: string;
  type: ActivityType;
  title: string;
  instructions: string;
  prompts: string[];
}

export interface LearningLesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  order: number;
  skills: string[];
  goals: string[];
  vocabulary: VocabularyItem[];
  phrases: PhraseItem[];
  activities: LearningActivity[];
  aiTeacherPrompt: string;
}
