const GameRound = ({ route, navigation }) => {
  const gameName = route.params?.gameName;
  const currentRound = route.params?.currentRound;
  const amountOfRounds = route.params?.amountOfRounds;
  const exercises = route.params?.exercises;
  const currentExercise = exercises[currentRound];
  const amountOfHearts = route.params?.amountOfHearts;
  const score = route.params?.score;

  const loadNextRound = (answerIsCorrect: boolean, score: number) => {
    const newAmountOfHearts = !answerIsCorrect
      ? amountOfHearts - 1
      : amountOfHearts;

    if (currentRound < amountOfRounds - 1 && newAmountOfHearts > 0) {
      navigation.push(gameName + "Round", {
        gameName,
        currentRound: currentRound + 1,
        amountOfRounds,
        exercises,
        amountOfHearts: newAmountOfHearts,
        score,
      });
    } else {
      navigation.push("GameEnd", { score, maxScore: exercises.length * 10 });
    }
  };

  return {
    gameName,
    currentRound,
    amountOfRounds,
    exercises,
    currentExercise,
    loadNextRound,
    amountOfHearts,
    score,
  };
};

export default GameRound;
