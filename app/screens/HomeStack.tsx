import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ArticleGame from "./ArticleGame";
import DragDropGame from "./DragDropGame";
import HomePage from "./HomePage";
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="DragDropGame" component={DragDropGame} />
      <Stack.Screen name="ArticleGame" component={ArticleGame} />
    </Stack.Navigator>
  );
};

export default HomeStack;
