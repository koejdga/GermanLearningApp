import { SharedValue } from "react-native-reanimated";
import {
  formDoneExercisesSet as formDoneExercisesSet,
  getNewExercisesForGame as getNewExercisesForGame,
} from "./DatabaseQueries";
import { UserInfo } from "./UserContext";
import { Game, gameToDbMapping } from "./Game";

export const shuffle = <T>(inputArray: T[]): T[] => {
  let outputArray = [...inputArray];
  for (let i = outputArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [outputArray[i], outputArray[j]] = [outputArray[j], outputArray[i]];
  }
  return outputArray;
};

// TODO: add this as resource for endings game exercises
// https://mein-deutschbuch.de/grammatikuebungen-adjektivdeklination-1.html
// https://deutschlernerblog.de/uebungen-zur-adjektivdeklination-deutsch-a1-a2/

export const getDataForGame = async (gameName: Game, user: UserInfo) => {
  const totalWordsInGame = gameName === Game.ARTICLE ? 10 : 5;
  const doneExercises = await formDoneExercisesSet(
    user,
    gameToDbMapping[gameName],
    Math.floor(totalWordsInGame / 2)
  );
  const newExercises = await getNewExercisesForGame(
    user,
    gameToDbMapping[gameName],
    totalWordsInGame,
    doneExercises.length
  );

  const full = [
    ...doneExercises.map((exercise) => ({ ...exercise, isNew: false })),
    ...newExercises.map((exercise) => ({ ...exercise, isNew: true })),
  ];

  const gameData = full.map((obj) => ({
    ...obj,
    wrongAnsweredTimes: 0,
    answeredCorrectly: false,
  }));

  return shuffle(gameData);
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
