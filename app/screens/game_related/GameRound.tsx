import {
  needToMakeChanges,
  addScoreToGameHistory,
  updateUser,
  addNewLearnedWords as addNewLearnedExercises,
  changeGameOffset,
  updateLearnedExercisesMetTimes,
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

    const nextRoundExercises = exercises.slice(1, exercises.length);
    if (answerIsCorrect) {
      currentExercise.answeredCorrectly = true;
      playedExercises.push(currentExercise);
    } else {
      currentExercise.wrongAnsweredTimes += 1;
      nextRoundExercises.push(currentExercise);
    }

    if (nextRoundExercises.length > 0 && newAmountOfHearts > 0) {
      navigation.push(gameName + "Round", {
        gameName,
        exercises: nextRoundExercises,
        playedExercises,
        amountOfHearts: newAmountOfHearts,
        score,
      });
    } else {
      user = { ...user, total_score: user.total_score + score };
      setUser(user);
      await updateUser(user);

      const maxScore =
        (nextRoundExercises.length + playedExercises.length) * 10;
      await addScoreToGameHistory(user, gameName, score / maxScore);

      const allExercises = nextRoundExercises.concat(playedExercises);

      await updateLearnedExercisesMetTimes(user, gameName, allExercises);

      const newExercises = allExercises.filter((exercise) => exercise.isNew);
      const makeChanges = await needToMakeChanges(newExercises);
      if (makeChanges) {
        await addNewLearnedExercises(user, gameName, newExercises);
        await changeGameOffset(user, setUser, gameName, newExercises);
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
