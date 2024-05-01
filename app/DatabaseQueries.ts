import firestore from "@react-native-firebase/firestore";
import { UserInfo } from "./UserContext";

export const createUser = async (
  uid: string,
  username: string,
  email: string,
  birthdate: Date
): Promise<UserInfo> => {
  try {
    await firestore()
      .collection("users")
      .doc(uid)
      .set({ username, email, birthdate, article_games_played: 0 });
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
  const { uid, ...userWithoutUid } = user;
  firestore()
    .collection("users")
    .doc(user.uid)
    .update(userWithoutUid)
    .then(() => {
      console.log("INFO: user updated");
    })
    .catch((e) => {
      console.log("ERROR: unable to update user info in database");
      console.log(e);
    });
};

export const dbUserToUserInfo = (dbUser) => {
  return {
    uid: dbUser.id,
    username: dbUser.data().username,
    email: dbUser.data().email,
    birthdate: new Date(dbUser.data().birthdate.seconds * 1000),
    article_games_played: dbUser.data().article_games_played,
    article_game_offset: dbUser.data().article_game_offset,
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
