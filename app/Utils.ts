import { SharedValue } from "react-native-reanimated";
import { getWordsForArticleGame } from "./DatabaseQueries";
import firestore from "@react-native-firebase/firestore";
import { UserInfo } from "./UserContext";

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

// try {
//   await firestore()
//     .collection("users")
//     .doc(user.uid)
//     .collection("learnt_words_article_game")
//     .add({ id: 0, times_met: 1 });
// } catch (e) {
//   console.log("ERROR: unable to add new user to database");
//   console.log(e);
//   return;
// }

// timesMet is 1, 2 or 3
// limit is positive number
const getLearnedWords = async (
  uid: string,
  timesMet: number,
  limit: number
) => {
  try {
    const queryRespose = await firestore()
      .collection("users")
      .doc(uid)
      .collection("learnt_words_article_game")
      .where("times_met", "==", timesMet)
      .limit(limit)
      .get();

    return queryRespose.docs;
  } catch (e) {
    console.log("ERROR");
    console.log(e);
  }
};

const formLearnedWordsSet = async (uid: string) => {
  try {
    const oneTimeMet = await getLearnedWords(uid, 1, 4);
    const twoTimesMet = await getLearnedWords(uid, 2, 5 - oneTimeMet.length);
    const moreTimesMet =
      5 > oneTimeMet.length + twoTimesMet.length
        ? await getLearnedWords(
            uid,
            3,
            5 - oneTimeMet.length - twoTimesMet.length
          )
        : [];

    const totalWordset = oneTimeMet
      .concat(twoTimesMet, moreTimesMet)
      .map((obj) => obj.data());

    const ids = totalWordset.map((obj) => obj.id);
    const wordsSnapshot = await firestore()
      .collection("article_game_nouns")
      .where("id", "in", ids)
      .get();

    const idToDocumentMap = {};
    wordsSnapshot.docs.forEach((doc) => {
      idToDocumentMap[doc.data().id] = doc.data().word;
    });

    return totalWordset.map((obj) => ({
      ...obj,
      word: idToDocumentMap[obj.id],
    }));
  } catch (e) {
    console.log("ERROR");
    console.log(e);
  }
};

const getNewWordForArticleGame = async (
  article_game_offset: number,
  totalWordsInGame: number,
  learnedWordsLength: number
) => {
  try {
    const queryResponse = await firestore()
      .collection("article_game_nouns")
      .orderBy("id")
      .startAt(article_game_offset)
      .limit(totalWordsInGame - learnedWordsLength)
      .get();

    return queryResponse.docs.map((x) => {
      const data = x.data();
      return { times_met: 0, ...data };
    });
  } catch (e) {
    console.log("ERROR");
    console.log(e);
  }
};

export const formWordsetForArticleGame = async (user: UserInfo) => {
  const totalWordsInGame = 10;
  const learnedWords = await formLearnedWordsSet(user.uid);
  const newWords = await getNewWordForArticleGame(
    user.article_game_offset,
    totalWordsInGame,
    learnedWords.length
  );
  const full = [...learnedWords, ...newWords].map((obj) => ({
    ...obj,
    wrongAnsweredTimes: 0,
    answeredCorrectly: false,
  }));
  // for (let i = 0; i < shuffled.length; i++) {
  //   console.log(shuffled[i]);
  // }
  return shuffle(full);
};

export const getDataForGame = async (gameName: string, user: UserInfo) => {
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
      return await formWordsetForArticleGame(user);
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

export type SharedValues<T extends Record<string, string | number | boolean>> =
  {
    [K in keyof T]: SharedValue<T[K]>;
  };

export const sentenseFromArray = (words: string[]) => {
  return words.reduce((previousValue, currentValue, currentIndex) => {
    if (currentIndex < words.length - 1 && words[currentIndex + 1] != ",") {
      currentValue += " ";
    }
    return previousValue + currentValue;
  }, "");
};
