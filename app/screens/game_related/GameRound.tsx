import {
  addNewDoneExercises,
  addScoreToGameHistory,
  changeGameOffset,
  updateLearnedExercisesMetTimes,
  updateUser,
} from "../../DatabaseQueries";
import { Game, gameToDbMapping } from "../../Game";
import { UserInfo } from "../../UserContext";

const GameRound = ({ route, navigation }) => {
  const gameName = route.params?.gameName as Game;
  const exercises = route.params?.exercises;
  const playedExercises = route.params?.playedExercises;
  const currentExercise = exercises[0];
  const amountOfHearts = route.params?.amountOfHearts as number;
  const score = route.params?.score as number;

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
      const maxScore =
        (nextRoundExercises.length + playedExercises.length) * 10;
      await addScoreToGameHistory(
        user,
        gameToDbMapping[gameName],
        score / maxScore
      );

      const allExercises = nextRoundExercises.concat(playedExercises);

      await updateLearnedExercisesMetTimes(
        user,
        gameToDbMapping[gameName],
        allExercises
      );

      const newExercises = allExercises.filter((exercise) => exercise.isNew);
      const allNewWordsAnsweredCorrectly = !newExercises.some(
        (exercise) => !exercise.answeredCorrectly
      );

      if (allNewWordsAnsweredCorrectly) {
        await addNewDoneExercises(
          user,
          gameToDbMapping[gameName],
          newExercises
        );
        await changeGameOffset(user, gameToDbMapping[gameName], newExercises);
      }

      const isPerfectlyPlayedGame = allExercises.every(
        (exercise) => exercise.wrongAnsweredTimes === 0
      );

      const gameWon = allExercises.every(
        (exercise) => exercise.answeredCorrectly
      );

      user = {
        ...user,
        total_score: user.total_score + score,
        perfect_games: user.perfect_games + (isPerfectlyPlayedGame ? 1 : 0),
        total_games: user.total_games + (gameWon ? 1 : 0),
        learned_words_amount:
          user.learned_words_amount +
          (allNewWordsAnsweredCorrectly && gameName === Game.ARTICLE
            ? newExercises.length
            : 0),
      };
      setUser(user);
      await updateUser(user);

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
