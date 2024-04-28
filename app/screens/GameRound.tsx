const GameRound = ({ route, navigation }) => {
  const gameName = route.params?.gameName;
  const currentRound = route.params?.currentRound;
  const amountOfRounds = route.params?.amountOfRounds;
  const exercises = route.params?.exercises;
  const currentExercise = exercises[currentRound];

  const loadNextRound = () => {
    if (currentRound < amountOfRounds - 1) {
      navigation.push(gameName + "Round", {
        currentRound: currentRound + 1,
        amountOfRounds,
        exercises,
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
