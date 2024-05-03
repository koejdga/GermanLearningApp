import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GameFlow from "../game_related/GameFlow";
import HomePage from "./HomePage";
import { Game } from "../../Game";
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Game.ARTICLE}
        component={GameFlow}
        initialParams={{
          gameName: Game.ARTICLE,
        }}
        options={{
          headerBackTitle: "Назад",
          headerTitle: "Артиклі",
        }}
      />
      <Stack.Screen
        name={Game.DRAP_DROP}
        component={GameFlow}
        initialParams={{
          gameName: Game.DRAP_DROP,
        }}
        options={{
          headerBackTitle: "Назад",
          headerTitle: "Нові слова",
        }}
      />
      <Stack.Screen
        name={Game.WRITE_TRANSLATION}
        component={GameFlow}
        initialParams={{
          gameName: Game.WRITE_TRANSLATION,
        }}
        options={{
          headerBackTitle: "Назад",
          headerTitle: "Письмо",
        }}
      />
      <Stack.Screen
        name={Game.ENDINGS}
        component={GameFlow}
        initialParams={{
          gameName: Game.ENDINGS,
        }}
        options={{
          headerBackTitle: "Назад",
          headerTitle: "Закінчення",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
