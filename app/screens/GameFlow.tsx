import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GameEnd from "./GameEnd";
import DragDropGameRound from "./drag_drop_game/DragDropGameRound";
import WriteTranslationGameRound from "./write_translation_game/WriteTranslationGameRound";
import ArticleGameRound from "./article_game/ArticleGameRound";
import EndingsGameRound from "./EndingsGameRound";
import { getDataForGame } from "../Utils";

const Stack = createNativeStackNavigator();
const gameRoundsMap = {
  DragDropGameRound,
  WriteTranslationGameRound,
  ArticleGameRound,
  EndingsGameRound,
};

const GameFlow = ({ route }) => {
  const gameName = route.params?.gameName;
  const gameRoundName = gameName + "Round";
  const gameRound = gameRoundsMap[gameRoundName];

  const dataForGame = getDataForGame(gameName);

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
        }}
      />
      <Stack.Screen name="EndOfGame" component={GameEnd} />
    </Stack.Navigator>
  );
};

export default GameFlow;
