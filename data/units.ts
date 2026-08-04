import type { LearningUnit } from '@/types/learning';

export const units: LearningUnit[] = [
  {
    id: 'spanish-basics',
    languageCode: 'es',
    title: 'Spanish Basics',
    description: 'Start with greetings, classroom words, and easy Spanish phrases.',
    order: 1,
    lessonIds: ['spanish-1-1', 'spanish-1-2'],
  },
  {
    id: 'french-basics',
    languageCode: 'fr',
    title: 'French Basics',
    description: 'Build beginner French confidence with polite greetings and simple expressions.',
    order: 1,
    lessonIds: ['french-1-1'],
  },
  {
    id: 'japanese-basics',
    languageCode: 'ja',
    title: 'Japanese Basics',
    description: 'Learn beginner Japanese greetings, simple words, and everyday phrases.',
    order: 1,
    lessonIds: ['japanese-1-1'],
  },
];
