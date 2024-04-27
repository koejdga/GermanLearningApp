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

export const validateEmail = async (
  email: string
): Promise<{ isValid: boolean; autocorrect?: string | null }> => {
  try {
    const apiKey = "0f98b1b14e7e40e98759edb776e805b0";
    const apiURL =
      "https://emailvalidation.abstractapi.com/v1/?api_key=" + apiKey;
    const url = apiURL + "&email=" + email;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return {
      isValid: data.is_valid_format.value,
      autocorrect: data.autocorrect !== "" ? data.autocorrect : null,
    };
  } catch (error) {
    return { isValid: false };
  }
};

export const validateBirthdate = (
  date: Date
): {
  isInFuture: boolean;
  isStrangeAge?: null | number;
} => {
  // TODO: write documentation
  if (date > new Date()) {
    return { isInFuture: true };
  }

  const age = calculateAge(date);
  return {
    isInFuture: false,
    isStrangeAge: age > 100 || age <= 10 ? age : null,
  };
};

export const calculateAge = (birthdate: Date): number => {
  const today = new Date();
  const diffInMs = today.getTime() - birthdate.getTime();
  const age = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(age);
};

// LINK TO ANIMATIONS: https://app.lottiefiles.com/?utm_medium=web&utm_source=register-main-nav
