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
      />
      <Stack.Screen
        name={Game.DRAP_DROP}
        component={GameFlow}
        initialParams={{
          gameName: Game.DRAP_DROP,
        }}
      />
      <Stack.Screen
        name={Game.WRITE_TRANSLATION}
        component={GameFlow}
        initialParams={{
          gameName: Game.WRITE_TRANSLATION,
        }}
      />
      <Stack.Screen
        name={Game.ENDINGS}
        component={GameFlow}
        initialParams={{
          gameName: Game.ENDINGS,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
