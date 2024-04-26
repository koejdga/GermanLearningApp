import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ArticleGame from "./ArticleGame";
import DragDropGame from "./DragDropGame";
import HomePage from "./HomePage";
import WriteTranslationGame from "./WriteTranslationGame";
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const exercises = [
    {
      wordsForTranslation: [
        { word: "Er" },
        { word: "," },
        { word: "isst" },
        { word: "einen" },
        { word: "Apfel" },
        { word: "," },
        { word: "weil" },
        { word: "er" },
        { word: "hungrig" },
        { word: "ist" },
        { word: "Hallo" },
      ],
      wordsNumberInAnswer: 3,
      sentenseToTranslate: [
        { word: "Він", translation: 1 },
        { word: "їсть", translation: 2 },
        { word: "яблуко", translation: 3 },
        { word: ",", translation: -1 },
        { word: "тому що", translation: 4 },
        { word: "він", translation: 1 },
        { word: "голодний", translation: 5 },
      ],
    },
    {
      wordsForTranslation: [
        { word: "Ich" },
        { word: "habe" },
        { word: "etwas" },
        { word: "Apfel" },
        { word: "weil" },
        { word: "er" },
        { word: "Hallo" },
      ],
      wordsNumberInAnswer: 3,
      sentenseToTranslate: [
        { word: "У мене", translation: 1 },
        { word: "є", translation: 2 },
        { word: "щось", translation: 3 },
      ],
    },
  ];

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
      <Stack.Screen
        name="WriteTranslationGame"
        component={WriteTranslationGame}
        initialParams={{
          currentRound: 0,
          amountOfRounds: exercises.length,
          exercises,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
