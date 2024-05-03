import firestore from "@react-native-firebase/firestore";
import { UserInfo } from "./UserContext";
import { Game } from "./Utils";

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
      article_game_offset: 0,
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
  const res = await firestore().collection("users").doc(uid).get();
  return res;
};

export const updateUser = async (user: UserInfo) => {
  try {
    const { uid, ...userWithoutUid } = user;
    await firestore().collection("users").doc(user.uid).update(userWithoutUid);
    console.log("INFO: user updated");
  } catch (e) {
    console.log("ERROR: unable to update user info in database");
    console.log(e);
  }
};

export const dbUserToUserInfo = (dbUser) => {
  return {
    uid: dbUser.id,
    username: dbUser.data().username,
    email: dbUser.data().email,
    birthdate: new Date(dbUser.data().birthdate.seconds * 1000),
    article_game_offset: dbUser.data().article_game_offset || 0,
    drag_drop_game_offset: dbUser.data().drag_drop_game_offset || 0,
    write_tr_game_offset: dbUser.data().write_tr_game_offset || 0,
    endings_game_offset: dbUser.data().endings_game_offset || 0,
    total_score: dbUser.data().total_score || 0,
  };
};

export const loggedInUserToUserInfo = async (loggedInUser: {
  email: string;
}) => {
  const res = await firestore()
    .collection("users")
    .where("email", "==", loggedInUser.email)
    .get();

  console.log(res.docs);

  if (res.docs.length > 1) {
    return null;
  }
  if (res.docs.length < 1) {
    return null;
  }
  return dbUserToUserInfo(res.docs[0]);
};

export const getWordsForArticleGame = async (offset: number) => {
  const amountOfNewWords = 5;
  try {
    const nounsForGame = await firestore()
      .collection("article_game_nouns")
      .orderBy("id")
      .startAt(offset * amountOfNewWords)
      .limit(amountOfNewWords)
      .get();

    console.log(nounsForGame);

    const reformatted = nounsForGame.docs.map((noun) => noun.data());
    console.log(reformatted);
    return reformatted;
  } catch (e) {
    console.log("ERROR: error in getWordsForArticleGame");
    console.log(e);
  }

  return null;
};

export const addScoreToGameHistory = async (
  user: UserInfo,
  gameName: Game,
  relative_score: number
) => {
  const collectionName = (() => {
    switch (gameName) {
      case Game.ARTICLE:
        return "article_game_score_history";
      case Game.DRAP_DROP:
        return "drag_drop_game_score_history";
      case Game.ENDINGS:
        return "endings_game_score_history";
      case Game.WRITE_TRANSLATION:
        return "write_tr_game_score_history";
      default:
        return null;
    }
  })();

  if (collectionName === null) {
    console.log(
      "ERROR: no game with such game name was found in addScoreToGameHistory"
    );
    return;
  }

  try {
    await firestore()
      .collection("users")
      .doc(user.uid)
      .collection(collectionName)
      .add({ relative_score, datetime: new Date() });
    console.log("INFO: score added to game score history");
  } catch (e) {
    console.log("ERROR");
    console.log(e);
  }
};

// timesMet is 1, 2 or 3
// limit is positive number
export const getLearnedWords = async (
  uid: string,
  learnedExercisesCollectionName: string,
  timesMet: number,
  limit: number
) => {
  try {
    const queryRespose = await firestore()
      .collection("users")
      .doc(uid)
      .collection(learnedExercisesCollectionName)
      .where("times_met", "==", timesMet)
      .limit(limit)
      .get();

    return queryRespose.docs;
  } catch (e) {
    console.log("ERROR in getLearnedWords");
    console.log(e);
  }
};

export const formLearnedWordsSet = async (uid: string, gameName: Game) => {
  try {
    const collectionName = getLearnedExercisesCollectionName(gameName);
    const oneTimeMet = await getLearnedWords(uid, collectionName, 1, 4);
    const twoTimesMet = await getLearnedWords(
      uid,
      collectionName,
      2,
      5 - oneTimeMet.length
    );
    const moreTimesMet =
      5 > oneTimeMet.length + twoTimesMet.length
        ? await getLearnedWords(
            uid,
            collectionName,
            3,
            5 - oneTimeMet.length - twoTimesMet.length
          )
        : [];

    const learnedExersices = oneTimeMet
      .concat(twoTimesMet, moreTimesMet)
      .map((obj) => obj.data());

    if (learnedExersices.length === 0) {
      return learnedExersices;
    }

    // get actual data instead of just ids

    const ids = learnedExersices.map((obj) => obj.id);
    const wordsSnapshot = await firestore()
      .collection("article_game_nouns")
      .where("id", "in", ids)
      .get();

    const idToDocumentMap = {};
    wordsSnapshot.docs.forEach((doc) => {
      idToDocumentMap[doc.data().id] = doc.data().word;
    });

    return learnedExersices.map((obj) => ({
      ...obj,
      word: idToDocumentMap[obj.id],
    }));
  } catch (e) {
    console.log("ERROR in formLearnedWordsSet");
    console.log(e);
  }
};

export const getNewWordsForGame = async (
  user: UserInfo,
  gameName: string,
  totalWordsInGame: number,
  learnedWordsLength: number
) => {
  const { gameOffset, exercisesCollectionName } = (() => {
    switch (gameName) {
      case Game.ARTICLE:
        return {
          gameOffset: user.article_game_offset,
          exercisesCollectionName: "article_game_nouns",
        };
      case Game.DRAP_DROP:
        return {
          gameOffset: user.drag_drop_game_offset,
          exercisesCollectionName: "drag_drop_game_exercises",
        };
      case Game.ENDINGS:
        return {
          gameOffset: user.endings_game_offset,
          exercisesCollectionName: "endings_game_exercises",
        };
      case Game.WRITE_TRANSLATION:
        return {
          gameOffset: user.write_tr_game_offset,
          exercisesCollectionName: "write_tr_game_exercises",
        };
      default:
        return { gameOffset: null, exercisesCollectionName: null };
    }
  })();

  if (gameOffset === null || exercisesCollectionName === null) {
    return;
  }

  try {
    const queryResponse = await firestore()
      .collection(exercisesCollectionName)
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

const getLearnedExercisesCollectionName = (gameName: Game) => {
  const collectionName = (() => {
    switch (gameName) {
      case Game.ARTICLE:
        return "learnt_words_article_game";
      case Game.DRAP_DROP:
        return "learnt_words_drag_drop_game";
      case Game.ENDINGS:
        return "learnt_words_endings_game";
      case Game.WRITE_TRANSLATION:
        return "learnt_words_write_tr_game";
      default:
        return null;
    }
  })();
  return collectionName;
};

export const updateLearnedExercisesMetTimes = async (
  user: UserInfo,
  gameName: Game,
  exercises
) => {
  if (exercises.length === 0) {
    console.log("ERROR: words length is 0 in updateLearnedWordsMetTimes");
    return;
  }

  const collectionName = getLearnedExercisesCollectionName(gameName);

  if (collectionName === null) {
    console.log(
      "ERROR: no game with such game name was found in updateLearnedWordsMetTimes"
    );
    return;
  }

  try {
    const allIds = exercises.map((word: { id: number }) => word.id);
    const learnedWordsSnapshot = await firestore()
      .collection("users")
      .doc(user.uid)
      .collection(collectionName)
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
        .collection(collectionName)
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

export const addNewLearnedWords = async (
  user: UserInfo,
  gameName: Game,
  newExercises
) => {
  const reformattedExercises = newExercises.map((exercise) => ({
    id: exercise.id,
    times_met: exercise.times_met,
  }));

  const collectionName = getLearnedExercisesCollectionName(gameName);

  if (collectionName === null) {
    console.log(
      "ERROR: no game with such game name was found in updateLearnedWordsMetTimes"
    );
    return;
  }

  try {
    reformattedExercises.forEach(async (newExercise) => {
      await firestore()
        .collection("users")
        .doc(user.uid)
        .collection(collectionName)
        .add({
          ...newExercise,
          times_met: increaseTimesMet(newExercise.times_met),
        });
    });
  } catch (e) {
    console.log("ERROR in addNewLearnedWords");
    console.log(e);
  }
};

export const changeGameOffset = async (
  user: UserInfo,
  setUser,
  gameName: Game,
  newWords
) => {
  switch (gameName) {
    case Game.ARTICLE:
      user = {
        ...user,
        article_game_offset: user.article_game_offset + newWords.length,
      };
      break;

    case Game.DRAP_DROP:
      user = {
        ...user,
        drag_drop_game_offset: user.drag_drop_game_offset + newWords.length,
      };
      break;
    case Game.WRITE_TRANSLATION:
      user = {
        ...user,
        write_tr_game_offset: user.write_tr_game_offset + newWords.length,
      };
      break;
    case Game.ENDINGS:
      user = {
        ...user,
        endings_game_offset: user.endings_game_offset + newWords.length,
      };
      break;
    default:
      console.log(
        "ERROR: no game with such name was found in changeGameOffset, game offset is not updated"
      );
      return;
  }

  setUser(user);
  await updateUser(user);
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
