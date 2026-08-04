import type { LearningLesson } from '@/types/learning';

export const lessons: LearningLesson[] = [
  {
    id: 'spanish-1-1',
    unitId: 'spanish-basics',
    title: 'Greetings and Introductions',
    description: 'Learn the first Spanish greetings and how to introduce yourself with confidence.',
    order: 1,
    skills: ['Greetings', 'Basic vocabulary', 'Pronunciation'],
    goals: [
      'Say hello and introduce yourself in Spanish.',
      'Recognize simple Spanish greeting words.',
    ],
    vocabulary: [
      { word: 'hola', translation: 'hello', partOfSpeech: 'interjection', example: 'Hola, ¿cómo estás?' },
      { word: 'gracias', translation: 'thank you', partOfSpeech: 'noun', example: 'Gracias por tu ayuda.' },
      { word: 'por favor', translation: 'please', partOfSpeech: 'phrase', example: 'Una mesa para dos, por favor.' },
      { word: 'amigo', translation: 'friend', partOfSpeech: 'noun', example: 'Mi amigo vive cerca.' },
      { word: 'mucho', translation: 'a lot', partOfSpeech: 'adverb', example: 'Te quiero mucho.' },
    ],
    phrases: [
      { phrase: 'Hola, soy Ana.', translation: 'Hello, I am Ana.', context: 'A simple self-introduction' },
      { phrase: '¿Cómo estás?', translation: 'How are you?', context: 'A friendly greeting question' },
      { phrase: 'Encantado de conocerte.', translation: 'Nice to meet you.', context: 'A polite first meeting phrase' },
    ],
    activities: [
      {
        id: 'spanish-1-1-activity-1',
        type: 'flashcards',
        title: 'Greeting Flashcards',
        instructions: 'Review the Spanish words and their English meanings.',
        prompts: ['Match hola with hello', 'Match gracias with thank you', 'Match por favor with please'],
      },
      {
        id: 'spanish-1-1-activity-2',
        type: 'sentence_translation',
        title: 'Introduce Yourself',
        instructions: 'Translate the Spanish phrases into English and practice speaking them aloud.',
        prompts: ['Translate Hola, soy Ana.', 'Translate ¿Cómo estás?', 'Translate Encantado de conocerte.'],
      },
      {
        id: 'spanish-1-1-activity-3',
        type: 'listen_and_repeat',
        title: 'Repeat the Greeting Phrases',
        instructions: 'Listen to each phrase and say it back at a comfortable pace.',
        prompts: ['Listen and repeat Hola', 'Listen and repeat Gracias', 'Listen and repeat ¿Cómo estás?'],
      },
    ],
    aiTeacherPrompt:
      'You are a friendly Spanish language teacher guiding a beginner. Use clear, slow pronunciation. Start with greetings like hola, gracias, and por favor. Encourage the learner to repeat each phrase and explain simple introductions in Spanish.',
  },
  {
    id: 'spanish-1-2',
    unitId: 'spanish-basics',
    title: 'Numbers and Classroom Words',
    description: 'Practice counting and describing school items in Spanish.',
    order: 2,
    skills: ['Numbers', 'Classroom vocabulary', 'Sentence building'],
    goals: [
      'Count from one to five in Spanish.',
      'Name common classroom items in Spanish.',
    ],
    vocabulary: [
      { word: 'uno', translation: 'one', partOfSpeech: 'number', example: 'Tengo uno libro.' },
      { word: 'dos', translation: 'two', partOfSpeech: 'number', example: 'Hay dos estudiantes.' },
      { word: 'libro', translation: 'book', partOfSpeech: 'noun', example: 'El libro es azul.' },
      { word: 'escuela', translation: 'school', partOfSpeech: 'noun', example: 'Voy a la escuela.' },
      { word: 'lápiz', translation: 'pencil', partOfSpeech: 'noun', example: 'Necesito un lápiz.' },
    ],
    phrases: [
      { phrase: 'Hay tres libros.', translation: 'There are three books.', context: 'Counting objects in the classroom' },
      { phrase: 'Tengo un lápiz.', translation: 'I have a pencil.', context: 'Talking about school supplies' },
      { phrase: '¿Cuántos estudiantes hay?', translation: 'How many students are there?', context: 'Asking a simple question in class' },
    ],
    activities: [
      {
        id: 'spanish-1-2-activity-1',
        type: 'match_pairs',
        title: 'Number Match',
        instructions: 'Match the Spanish numbers with their English words.',
        prompts: ['Match uno with one', 'Match dos with two', 'Match tres with three'],
      },
      {
        id: 'spanish-1-2-activity-2',
        type: 'fill_in_the_blank',
        title: 'Classroom Sentences',
        instructions: 'Complete the Spanish sentence using the right vocabulary word.',
        prompts: ['Hay ___ libros.', 'Tengo un ___.', 'Voy a la ___.'],
      },
      {
        id: 'spanish-1-2-activity-3',
        type: 'flashcards',
        title: 'School Word Flashcards',
        instructions: 'Review the classroom vocabulary and speak each word aloud.',
        prompts: ['Libro = book', 'Escuela = school', 'Lápiz = pencil'],
      },
    ],
    aiTeacherPrompt:
      'You are a warm Spanish AI teacher helping a beginner practice numbers and classroom words. Speak slowly and clearly. Explain how to count from uno to cinco and use vocabulary like libro, escuela, and lápiz in short example sentences.',
  },
  {
    id: 'french-1-1',
    unitId: 'french-basics',
    title: 'Bonjour and Polite Phrases',
    description: 'Learn basic French greetings and polite expressions for everyday conversation.',
    order: 1,
    skills: ['Greetings', 'Polite expressions', 'Listening practice'],
    goals: [
      'Use French greetings like bonjour and merci.',
      'Understand simple polite expressions in French.',
    ],
    vocabulary: [
      { word: 'bonjour', translation: 'hello', partOfSpeech: 'interjection', example: 'Bonjour, comment ça va?' },
      { word: 'merci', translation: 'thank you', partOfSpeech: 'interjection', example: 'Merci beaucoup.' },
      { word: 's’il vous plaît', translation: 'please', partOfSpeech: 'phrase', example: 'Un café, s’il vous plaît.' },
      { word: 'ami', translation: 'friend', partOfSpeech: 'noun', example: 'Mon ami est gentille.' },
      { word: 'livre', translation: 'book', partOfSpeech: 'noun', example: 'Le livre est intéressant.' },
    ],
    phrases: [
      { phrase: 'Bonjour, je m’appelle Claire.', translation: 'Hello, my name is Claire.', context: 'Introducing yourself politely' },
      { phrase: 'Comment ça va?', translation: 'How are you?', context: 'Asking a friend how they are' },
      { phrase: 'Merci beaucoup.', translation: 'Thank you very much.', context: 'Showing gratitude' },
    ],
    activities: [
      {
        id: 'french-1-1-activity-1',
        type: 'flashcards',
        title: 'French Greeting Flashcards',
        instructions: 'Review the French greeting vocabulary and practice saying each word.',
        prompts: ['bonjour = hello', 'merci = thank you', 's’il vous plaît = please'],
      },
      {
        id: 'french-1-1-activity-2',
        type: 'sentence_translation',
        title: 'Translate Polite Phrases',
        instructions: 'Convert short French sentences into English and repeat them out loud.',
        prompts: ['Translate Bonjour, je m’appelle Claire.', 'Translate Comment ça va?', 'Translate Merci beaucoup.'],
      },
      {
        id: 'french-1-1-activity-3',
        type: 'listen_and_repeat',
        title: 'Repeat French Greetings',
        instructions: 'Listen to each phrase and speak it back clearly.',
        prompts: ['Repeat Bonjour', 'Repeat Merci', 'Repeat Comment ça va?'],
      },
    ],
    aiTeacherPrompt:
      'You are a gentle French AI teacher for absolute beginners. Use clear pronunciation and teach simple greetings like bonjour, merci, and s’il vous plaît. Help the learner repeat each phrase and introduce themselves in French.',
  },
  {
    id: 'japanese-1-1',
    unitId: 'japanese-basics',
    title: 'Japanese Greetings and Simple Words',
    description: 'Start learning Japanese greetings and short phrases with easy pronunciation tips.',
    order: 1,
    skills: ['Greetings', 'Basic vocabulary', 'Pronunciation'],
    goals: [
      'Say simple Japanese greetings with confidence.',
      'Recognize common beginner Japanese words.',
    ],
    vocabulary: [
      { word: 'こんにちは', translation: 'hello', partOfSpeech: 'greeting', example: 'こんにちは、元気ですか？' },
      { word: 'ありがとう', translation: 'thank you', partOfSpeech: 'phrase', example: 'ありがとう！' },
      { word: 'さようなら', translation: 'goodbye', partOfSpeech: 'phrase', example: 'さようなら、またね。' },
      { word: 'です', translation: 'is/am/are', partOfSpeech: 'particle', example: '私は学生です。' },
      { word: 'いいえ', translation: 'no', partOfSpeech: 'adverb', example: 'いいえ、けっこうです。' },
    ],
    phrases: [
      { phrase: 'こんにちは、私はケンです。', translation: 'Hello, I am Ken.', context: 'A simple Japanese introduction' },
      { phrase: 'ありがとうございます。', translation: 'Thank you very much.', context: 'A polite expression of thanks' },
      { phrase: 'はじめまして。', translation: 'Nice to meet you.', context: 'Used when meeting someone for the first time' },
    ],
    activities: [
      {
        id: 'japanese-1-1-activity-1',
        type: 'flashcards',
        title: 'Japanese Greeting Flashcards',
        instructions: 'Review the Japanese words and their English translations.',
        prompts: ['こんにちは = hello', 'ありがとう = thank you', 'さようなら = goodbye'],
      },
      {
        id: 'japanese-1-1-activity-2',
        type: 'sentence_translation',
        title: 'Translate Simple Japanese',
        instructions: 'Translate the phrases into English and listen for the sound of each sentence.',
        prompts: ['Translate こんにちは、私はケンです。', 'Translate ありがとうございます。', 'Translate はじめまして。'],
      },
      {
        id: 'japanese-1-1-activity-3',
        type: 'listen_and_repeat',
        title: 'Speak the Greetings',
        instructions: 'Listen to the phrases and repeat them with the correct rhythm.',
        prompts: ['Repeat こんにちは', 'Repeat ありがとう', 'Repeat はじめまして'],
      },
    ],
    aiTeacherPrompt:
      'You are a calm Japanese AI teacher helping a beginner practice greetings and very simple phrases. Use slow, clear pronunciation and focus on こんにちは, ありがとう, and はじめまして. Encourage the learner to repeat each phrase after you.',
  },
];
