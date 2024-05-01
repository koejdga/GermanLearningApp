const GameRound = ({ route, navigation }) => {
  const gameName = route.params?.gameName;
  const exercises = route.params?.exercises;
  const playedExercises = route.params?.playedExercises;
  const currentExercise = exercises[0];
  const amountOfHearts = route.params?.amountOfHearts;
  const score = route.params?.score;

  const loadNextRound = (answerIsCorrect: boolean, score: number) => {
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
      navigation.push("GameEnd", {
        score,
        maxScore: (newExercises.length + playedExercises.length) * 10,
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
