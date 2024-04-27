export const shuffle = <T>(inputArray: T[]): T[] => {
  let outputArray = [...inputArray];
  for (let i = outputArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [outputArray[i], outputArray[j]] = [outputArray[j], outputArray[i]];
  }
  return outputArray;
};

export enum Game {
  DRAP_DROP = "DragDropGame",
  WRITE_TRANSLATION = "WriteTranslationGame",
  ARTICLE = "ArticleGame",
  ENDINGS = "EndingsGame",
}

export const getDataForGame = (gameName: string) => {
  // mocking data for now
  const exercises = [
    {
      wordsForTranslation: [
        { word: "Er" },
        { word: "isst" },
        { word: "einen" },
        { word: "Apfel" },
        { word: "," },
        { word: "weil" },
        { word: "er" },
        { word: "hungrig" },
        { word: "ist" },
        { word: "Hallo" },
      ],
      wordsNumberInAnswer: 9,
      sentenseToTranslate: [
        { word: "Він", translation: 1 },
        { word: "їсть", translation: 2 },
        { word: "яблуко", translation: 3 },
        { word: ",", translation: -1 },
        { word: "тому що", translation: 4 },
        { word: "він", translation: 1 },
        { word: "голодний", translation: 5 },
      ],
    },
    {
      wordsForTranslation: [
        { word: "Ich" },
        { word: "habe" },
        { word: "etwas" },
        { word: "Apfel" },
        { word: "weil" },
        { word: "er" },
        { word: "Hallo" },
      ],
      wordsNumberInAnswer: 3,
      sentenseToTranslate: [
        { word: "У мене", translation: 1 },
        { word: "є", translation: 2 },
        { word: "щось", translation: 3 },
      ],
    },
  ];
  const initialWords = [
    {
      word: "Radio",
      article: "Das",
      plural: "die Radios",
      partOfSpeech: "ім.",
      translation: "радіо",
    },
    {
      word: "Haus",
      article: "Das",
      plural: "die Radios",
      partOfSpeech: "ім.",
      translation: "радіо",
    },
    {
      word: "Maus",
      article: "Das",
      plural: "die Radios",
      partOfSpeech: "ім.",
      translation: "радіо",
    },
  ];
  const endings = [
    {
      sentense: [
        [{ word: "Ich" }, { word: "liebe" }, { word: "mein" }],
        [{ word: "Mutter" }],
      ],
      endings: ["e"],
    },
    {
      sentense: [
        [{ word: "Ich" }, { word: "liebe" }, { word: "mein" }],
        [{ word: "Mutter" }, { word: "und" }, { word: "mein" }],
        [{ word: "Vatter" }],
      ],
      endings: ["e", "en"],
    },
  ];

  switch (gameName) {
    case Game.ARTICLE:
      return initialWords;
    case Game.DRAP_DROP:
      return exercises;
    case Game.WRITE_TRANSLATION:
      return exercises;
    case Game.ENDINGS:
      return endings;
  }
};
