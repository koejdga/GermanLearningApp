import firestore from "@react-native-firebase/firestore";
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

export const addScoreToHistoryArticleGame = async (
  user: UserInfo,
  relative_score: number
) => {
  try {
    await firestore()
      .collection("users")
      .doc(user.uid)
      .collection("article_game_score_history")
      .add({ relative_score, datetime: new Date() });
    console.log("INFO: score added to article game score history");
  } catch (e) {
    console.log("ERROR");
    console.log(e);
  }
};

// timesMet is 1, 2 or 3
// limit is positive number
export const getLearnedWords = async (
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
    console.log("ERROR in getLearnedWords");
    console.log(e);
  }
};

export const formLearnedWordsSet = async (uid: string) => {
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

    if (totalWordset.length === 0) {
      return totalWordset;
    }

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
    console.log("ERROR in formLearnedWordsSet");
    console.log(e);
  }
};

export const getNewWordsForArticleGame = async (
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

export const updateLearnedWordsMetTimes = async (user: UserInfo, words) => {
  if (words.length === 0) {
    console.log("ERROR: words length is 0 in updateLearnedWordsMetTimes");
    return;
  }

  try {
    const allIds = words.map((word: { id: number }) => word.id);
    const learnedWordsSnapshot = await firestore()
      .collection("users")
      .doc(user.uid)
      .collection("learnt_words_article_game")
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
        .collection("learnt_words_article_game")
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

export const addNewLearnedWords = async (user: UserInfo, newWords) => {
  const reformattedWords = newWords.map((wordObj) => ({
    id: wordObj.id,
    times_met: wordObj.times_met,
  }));

  try {
    reformattedWords.forEach(async (newWord) => {
      await firestore()
        .collection("users")
        .doc(user.uid)
        .collection("learnt_words_article_game")
        .add({ ...newWord, times_met: increaseTimesMet(newWord.times_met) });
    });
  } catch (e) {
    console.log("ERROR in addNewLearnedWords");
    console.log(e);
  }
};

export const changeArticleGameOffset = async (user, setUser, newWords) => {
  user = {
    ...user,
    article_game_offset: user.article_game_offset + newWords.length,
  };
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
