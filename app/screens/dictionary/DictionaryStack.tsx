// TODO: uninstall react native elements and react native paper
// TODO: make different font sizes in settings or look up in internet how it works
// maybe if I change phone settings this text will also increase
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";
import DictionaryWords from "./DictionaryWords";
import WordTranslation from "./WordTranslation";
import { DictProvider } from "../../DictContext";

const Stack = createNativeStackNavigator();

const DictionaryStack = () => {
  return (
    <DictProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="DictionaryWords"
          component={DictionaryWords}
          options={{
            headerStyle: {
              backgroundColor: "lightblue",
            },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="WordTranslation"
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
    </DictProvider>
  );
};

export default DictionaryStack;
