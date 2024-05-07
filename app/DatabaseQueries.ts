import firestore from "@react-native-firebase/firestore";
import { GameInDb } from "./Game";
import { UserInfo } from "./UserContext";

export const createUser = async (
  uid: string,
  username: string,
  email: string,
  birthdate: Date
): Promise<UserInfo> => {
  try {
    await firestore().collection("users").doc(uid).set({
      username,
      email,
      birthdate,
      total_score: 0,
    });
  } catch (e) {
    console.log("ERROR: unable to add new user to database");
    console.log(e);
    return;
  }

  console.log("INFO: user successfully added");
  const newUser = await firestore().collection("users").doc(uid).get();
  return dbUserToUserInfo(newUser);
};

export const getUser = async (uid: string) => {
  const res = (await firestore().collection("users").doc(uid).get()).data();
  return res;
};

export const updateUser = async (user: UserInfo) => {
  try {
    const { uid, ...userWithoutUid } = user;
    await firestore().collection("users").doc(user.uid).update(userWithoutUid);
    console.log("INFO: user updated");
  } catch (e) {
    console.log("ERROR: unable to update user info in firestore");
    console.log(e);
  }
};

export const dbUserToUserInfo = (dbUser) => {
  return {
    uid: dbUser.id,
    username: dbUser.data().username,
    email: dbUser.data().email,
    birthdate: new Date(dbUser.data().birthdate.seconds * 1000),
    total_score: dbUser.data().total_score || 0,
    avatar: dbUser.data().avatar,
  };
};

export const loggedInUserToUserInfo = async (loggedInUser: {
  email: string;
}) => {
  const res = await firestore()
    .collection("users")
    .where("email", "==", loggedInUser.email)
    .get();

  if (res.docs.length > 1) {
    return null;
  }
  if (res.docs.length < 1) {
    return null;
  }
  return dbUserToUserInfo(res.docs[0]);
};

export const addScoreToGameHistory = async (
  user: UserInfo,
  gameName: GameInDb,
  relative_score: number
) => {
  try {
    await firestore()
      .collection("users")
      .doc(user.uid)
      .collection("score_histories")
      .doc(gameName)
      .collection("score_history")
      .add({ relative_score, datetime: new Date() });
    console.log("INFO: score added to game score history");
  } catch (e) {
    console.log("ERROR");
    console.log(e);
  }
};

// timesMet is 1, 2 or 3
// limit is positive number
export const getDoneExercises = async (
  uid: string,
  gameName: GameInDb,
  timesMet: number,
  limit: number
) => {
  try {
    const queryRespose = await firestore()
      .collection("users")
      .doc(uid)
      .collection("done_exercises")
      .doc(gameName)
      .collection("done_exercises")
      .where("times_met", "==", timesMet)
      .limit(limit)
      .get();

    return queryRespose.docs;
  } catch (e) {
    console.log("ERROR in getLearnedWords");
    console.log(e);
  }
};

export const formDoneExercisesSet = async (
  user: UserInfo,
  gameName: GameInDb,
  desiredAmount: number
) => {
  try {
    const oneTimeMet = await getDoneExercises(
      user.uid,
      gameName,
      1,
      desiredAmount - 1
    );
    const twoTimesMet = await getDoneExercises(
      user.uid,
      gameName,
      2,
      desiredAmount - oneTimeMet.length
    );
    const moreTimesMet =
      desiredAmount > oneTimeMet.length + twoTimesMet.length
        ? await getDoneExercises(
            user.uid,
            gameName,
            3,
            desiredAmount - oneTimeMet.length - twoTimesMet.length
          )
        : [];

    const doneExersices = oneTimeMet
      .concat(twoTimesMet, moreTimesMet)
      .map((obj) => obj.data());

    if (doneExersices.length === 0) {
      return doneExersices;
    }

    const ids = doneExersices.map((obj) => obj.id);
    const wordsSnapshot = await firestore()
      .collection("exercises")
      .doc(gameName)
      .collection("exercises")
      .where("id", "in", ids)
      .get();

    const idToDocumentMap = {};
    wordsSnapshot.docs.forEach((doc) => {
      idToDocumentMap[doc.data().id] = doc.data();
    });

    switch (gameName) {
      case GameInDb.ARTICLE:
        return doneExersices.map((obj) => ({
          ...obj,
          word: idToDocumentMap[obj.id].word,
        }));
      case GameInDb.ENDINGS:
        return doneExersices.map((obj) => ({
          ...obj,
          endings: idToDocumentMap[obj.id].endings,
          sentense: idToDocumentMap[obj.id].sentense,
        }));

      case GameInDb.DRAP_DROP:
        return doneExersices.map((obj) => ({
          ...obj,
          sentenceToTranslate: idToDocumentMap[obj.id].sentenceToTranslate,
          wordsForTranslation: idToDocumentMap[obj.id].wordsForTranslation,
          wordsNumberInAnswer: idToDocumentMap[obj.id].wordsNumberInAnswer,
        }));

      case GameInDb.WRITE_TRANSLATION:
        return doneExersices.map((obj) => ({
          ...obj,
          sentenceToTranslate: idToDocumentMap[obj.id].sentenceToTranslate,
          correctAnswer: idToDocumentMap[obj.id].correctAnswer,
        }));

      default:
        console.log(
          "ERROR: no game with such name was found in formDoneExercisesSet"
        );
        return;
    }
  } catch (e) {
    console.log("ERROR in formLearnedWordsSet");
    console.log(e);
  }
};

const addGameOffset = async (uid: string, gameName: GameInDb) => {
  try {
    await firestore()
      .collection("users")
      .doc(uid)
      .collection("game_offsets")
      .doc(gameName)
      .set({ offset: 0 });

    console.log("INFO: added new game offset");
  } catch (e) {
    console.log("ERROR in addGameOffset");
    console.log(e);
  }
};

const getGameOffset = async (user: UserInfo, gameName: GameInDb) => {
  try {
    const queryResponse = await firestore()
      .collection("users")
      .doc(user.uid)
      .collection("game_offsets")
      .doc(gameName)
      .get();

    if (queryResponse.data() === undefined) {
      await addGameOffset(user.uid, gameName);
      return 0;
    } else {
      return queryResponse.data().offset;
    }
  } catch (e) {
    console.log("ERROR in getGameOffset");
    console.log(e);
  }
};

export const getNewExercisesForGame = async (
  user: UserInfo,
  gameName: GameInDb,
  totalWordsInGame: number,
  learnedWordsLength: number
) => {
  try {
    const gameOffset = await getGameOffset(user, gameName);
    const queryResponse = await firestore()
      .collection("exercises")
      .doc(gameName)
      .collection("exercises")
      .orderBy("id")
      .startAt(gameOffset)
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

export const updateLearnedExercisesMetTimes = async (
  user: UserInfo,
  gameName: GameInDb,
  exercises
) => {
  if (exercises.length === 0) {
    console.log("ERROR: words length is 0 in updateLearnedWordsMetTimes");
    return;
  }

  try {
    const allIds = exercises.map((word: { id: number }) => word.id);
    const learnedWordsSnapshot = await firestore()
      .collection("users")
      .doc(user.uid)
      .collection("done_exercises")
      .doc(gameName)
      .collection("done_exercises")
      .where("id", "in", allIds)
      .get();

    learnedWordsSnapshot.docs.forEach(async (doc) => {
      const updatedObj = {
        ...doc.data(),
        times_met: increaseTimesMet(doc.data().times_met),
      };

      await firestore()
        .collection("users")
        .doc(user.uid)
        .collection("done_exercises")
        .doc(gameName)
        .collection("done_exercises")
        .doc(doc.id)
        .set(updatedObj);
    });
  } catch (e) {
    console.log("ERROR in updateLearnedWordsMetTimes");
    console.log(e);
  }
};

export const needToMakeChanges = async (newWords) => {
  try {
    const needToMakeChanges = !newWords.some((word) => !word.answeredCorrectly);
    return needToMakeChanges;
  } catch (e) {
    console.log("ERROR in needToMakeChanges");
    console.log(e);
  }
};

export const addNewDoneExercises = async (
  user: UserInfo,
  gameName: GameInDb,
  newExercises
) => {
  const reformattedExercises = newExercises.map((exercise) => ({
    id: exercise.id,
    times_met: exercise.times_met,
  }));

  try {
    reformattedExercises.forEach(async (newExercise) => {
      await firestore()
        .collection("users")
        .doc(user.uid)
        .collection("done_exercises")
        .doc(gameName)
        .collection("done_exercises")
        .add({
          ...newExercise,
          times_met: increaseTimesMet(newExercise.times_met),
        });
    });
  } catch (e) {
    console.log("ERROR in addNewDoneExercises");
    console.log(e);
  }
};

export const changeGameOffset = async (
  user: UserInfo,
  gameName: GameInDb,
  newExercises
) => {
  try {
    const oldOffset = await getGameOffset(user, gameName);
    await firestore()
      .collection("users")
      .doc(user.uid)
      .collection("game_offsets")
      .doc(gameName)
      .update({ offset: oldOffset + newExercises.length });
    console.log("INFO: game offset updated");
  } catch (e) {
    console.log("ERROR in changeGameOffset");
    console.log(e);
  }
};

export const increaseTimesMet = (currentValue: number) => {
  if (currentValue >= 0 && currentValue < 3) {
    return currentValue + 1;
  } else if (currentValue >= 3) {
    return 3;
  } else {
    console.log(
      "ERROR: times met value cannot be less than 0 (increaseTimesMet)"
    );
    return 1;
  }
};
