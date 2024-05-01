import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GameEnd from "./GameEnd";
import DragDropGameRound from "../game_rounds/DragDropGameRound";
import WriteTranslationGameRound from "../game_rounds/WriteTranslationGameRound";
import ArticleGameRound from "../game_rounds/ArticleGameRound";
import EndingsGameRound from "../game_rounds/EndingsGameRound";
import { getDataForGame } from "../../Utils";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";

const Stack = createNativeStackNavigator();
const gameRoundsMap = {
  DragDropGameRound,
  WriteTranslationGameRound,
  ArticleGameRound,
  EndingsGameRound,
};

const GameFlow = ({ route }) => {
  const [dataForGame, setDataForGame] = useState(null);
  const gameName = route.params?.gameName;
  const gameRoundName = gameName + "Round";
  const gameRound = gameRoundsMap[gameRoundName];

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataForGame(gameName, user);
        setDataForGame(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [gameName]);

  if (!dataForGame) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <Stack.Screen
        name={gameRoundName}
        component={gameRound}
        initialParams={{
          exercises: dataForGame,
          playedExercises: [],
          gameName,
          amountOfHearts: 3,
          score: 0,
        }}
      />
      <Stack.Screen name="GameEnd" component={GameEnd} />
    </Stack.Navigator>
  );
};

export default GameFlow;
