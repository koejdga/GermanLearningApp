import {
  needToMakeChanges,
  addScoreToHistoryArticleGame,
  updateUser,
  addNewLearnedWords,
  changeArticleGameOffset,
  updateLearnedWordsMetTimes,
} from "../../DatabaseQueries";
import { UserInfo } from "../../UserContext";

const GameRound = ({ route, navigation }) => {
  const gameName = route.params?.gameName;
  const exercises = route.params?.exercises;
  const playedExercises = route.params?.playedExercises;
  const currentExercise = exercises[0];
  const amountOfHearts = route.params?.amountOfHearts;
  const score = route.params?.score;

  const loadNextRound = async (
    answerIsCorrect: boolean,
    score: number,
    user: UserInfo,
    setUser: (user: UserInfo) => void
  ) => {
    const newAmountOfHearts = !answerIsCorrect
      ? amountOfHearts - 1
      : amountOfHearts;

    const newExercises = exercises.slice(1, exercises.length);
    if (answerIsCorrect) {
      currentExercise.answeredCorrectly = true;
      playedExercises.push(currentExercise);
    } else {
      currentExercise.wrongAnsweredTimes += 1;
      newExercises.push(currentExercise);
    }

    if (newExercises.length > 0 && newAmountOfHearts > 0) {
      navigation.push(gameName + "Round", {
        gameName,
        exercises: newExercises,
        playedExercises,
        amountOfHearts: newAmountOfHearts,
        score,
      });
    } else {
      user = { ...user, total_score: user.total_score + score };
      setUser(user);
      await updateUser(user);

      const maxScore = (newExercises.length + playedExercises.length) * 10;
      await addScoreToHistoryArticleGame(user, score / maxScore);

      const allWords = newExercises.concat(playedExercises);

      await updateLearnedWordsMetTimes(user, allWords);

      const newWords = allWords.filter((word) => word.isNew);
      const makeChanges = await needToMakeChanges(newWords);
      if (makeChanges) {
        await addNewLearnedWords(user, newWords);
        await changeArticleGameOffset(user, setUser, newWords);
      }

      navigation.push("GameEnd", {
        score,
        maxScore,
      });
    }
  };

  return {
    gameName,
    exercises,
    currentExercise,
    loadNextRound,
    amountOfHearts,
    score,
  };
};

export default GameRound;
