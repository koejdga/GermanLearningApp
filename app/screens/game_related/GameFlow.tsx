import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GameEnd from "./GameEnd";
import DragDropGameRound from "../game_rounds/DragDropGameRound";
import WriteTranslationGameRound from "../game_rounds/WriteTranslationGameRound";
import ArticleGameRound from "../game_rounds/ArticleGameRound";
import EndingsGameRound from "../game_rounds/EndingsGameRound";
import { getDataForGame } from "../../Utils";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataForGame(gameName);
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
          currentRound: 0,
          amountOfRounds: dataForGame.length,
          exercises: dataForGame,
          gameName,
          amountOfHearts: 3,
        }}
      />
      <Stack.Screen name="GameEnd" component={GameEnd} />
    </Stack.Navigator>
  );
};

export default GameFlow;
