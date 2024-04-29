import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GameFlow from "../GameFlow";
import HomePage from "./HomePage";
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
        name="ArticleGame"
        component={GameFlow}
        initialParams={{
          gameName: "ArticleGame",
        }}
      />
      <Stack.Screen
        name="DragDropGame"
        component={GameFlow}
        initialParams={{
          gameName: "DragDropGame",
        }}
      />
      <Stack.Screen
        name="WriteTranslationGame"
        component={GameFlow}
        initialParams={{
          gameName: "WriteTranslationGame",
        }}
      />
      <Stack.Screen
        name="EndingsGame"
        component={GameFlow}
        initialParams={{
          gameName: "EndingsGame",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
