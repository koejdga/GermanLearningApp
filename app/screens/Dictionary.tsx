// TODO: uninstall react native elements and react native paper
// TODO: make different font sizes in settings or look up in internet how it works
// maybe if I change phone settings this text will also increase
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WordTranslation from "./WordTranslation";
import DictionaryWords from "./DictionaryWords";
import { Button } from "react-native";

const Stack = createNativeStackNavigator();

const Dictionary = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Словник"
        component={DictionaryWords}
        options={{
          headerStyle: {
            backgroundColor: "lightblue",
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Word"
        component={WordTranslation}
        options={{
          headerTitle: "",
          headerRight: () => (
            <Button
              onPress={() => alert("This is a button!")}
              title="Форми слова"
            />
          ),
          headerStyle: {
            backgroundColor: "lightblue",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default Dictionary;
