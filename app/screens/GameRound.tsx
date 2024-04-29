const GameRound = ({ route, navigation }) => {
  const gameName = route.params?.gameName;
  const currentRound = route.params?.currentRound;
  const amountOfRounds = route.params?.amountOfRounds;
  const exercises = route.params?.exercises;
  const currentExercise = exercises[currentRound];
  const amountOfHearts = route.params?.amountOfHearts;

  const loadNextRound = (answerIsCorrect: boolean) => {
    console.log("amount of hearts: ", amountOfHearts);
    const newAmountOfHearts = !answerIsCorrect
      ? amountOfHearts - 1
      : amountOfHearts;

    console.log("newAmountOfHearts: ", newAmountOfHearts);

    if (currentRound < amountOfRounds - 1 && newAmountOfHearts > 0) {
      navigation.push(gameName + "Round", {
        gameName,
        currentRound: currentRound + 1,
        amountOfRounds,
        exercises,
        amountOfHearts: newAmountOfHearts,
      });
    } else {
      navigation.push("GameEnd");
    }
  };

  return {
    gameName,
    currentRound,
    amountOfRounds,
    exercises,
    currentExercise,
    loadNextRound,
  };
};

export default GameRound;
