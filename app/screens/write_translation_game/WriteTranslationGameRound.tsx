import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import Spacer from "../../ui_elements/Spacer";
import ReadyButton from "../../ui_elements/drag_drop_game/ReadyButton";
import WordsWithTips from "../../ui_elements/drag_drop_game/WordsWithTips";
import EndRoundModal from "../EndRoundModal";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  upperText: {
    fontSize: 16,
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
});

const WriteTranslationGameRound = ({ route, navigation }) => {
  const currentRound = route.params?.currentRound;
  const amountOfRounds = route.params?.amountOfRounds;
  const exercises = route.params?.exercises;
  const currentExercise = exercises[currentRound];

  const correctAnswer = currentExercise.wordsForTranslation.slice(
    0,
    currentExercise.wordsNumberInAnswer
  );

  const [answerIsCorrect, setAnswerIsCorrect] = useState(null);

  const loadNextRound = () => {
    if (currentRound < amountOfRounds - 1) {
      navigation.push("WriteTranslationGameRound", {
        currentRound: currentRound + 1,
        amountOfRounds,
        exercises,
      });
    } else {
      navigation.push("EndOfGame");
    }
  };

  const [userInput, setUserInput] = useState("");

  const checkUserAnswer = () => {
    if (userInput === "") {
      setAnswerIsCorrect(false);
      return;
    }
    const arrayWithCommas = userInput
      .split(",")
      .flatMap((word, index, array) =>
        index < array.length - 1 ? [word, ","] : [word]
      );

    const splittedAnswer = arrayWithCommas
      .flatMap((item) => item.split(/\s+/))
      .filter((x) => x !== "");

    console.log(splittedAnswer.length);
    console.log(splittedAnswer);

    const answerWithoutCommas =
      splittedAnswer.length !== correctAnswer.length
        ? correctAnswer.filter((x: { word: string }) => x.word !== ",")
        : correctAnswer;

    const allEqual = splittedAnswer.every(
      (x, i) => x === answerWithoutCommas[i].word
    );
    setAnswerIsCorrect(allEqual);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <Text style={styles.upperText}>Перекладіть це речення</Text>
        <WordsWithTips
          words={currentExercise.sentenseToTranslate}
          style={{ paddingHorizontal: 30 }}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : "height"}
          keyboardVerticalOffset={90}
        >
          <TextInput
            style={{ backgroundColor: "lightgray", margin: 16 }}
            onChangeText={(string) => setUserInput(string)}
          ></TextInput>
        </KeyboardAvoidingView>
        <Spacer />
        <ReadyButton onPress={checkUserAnswer} />

        <EndRoundModal
          currentExercise={currentExercise}
          loadNextRound={loadNextRound}
          answerIsCorrect={answerIsCorrect}
        />
      </Pressable>
    </GestureHandlerRootView>
  );
};

export default WriteTranslationGameRound;
