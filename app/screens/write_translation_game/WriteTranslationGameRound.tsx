import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Keyboard,
  Pressable,
} from "react-native";
import {
  GestureHandlerRootView,
  RectButton,
} from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import ReadyButton from "../../ui_elements/drag_drop_game/ReadyButton";
import SentenseFromArray from "../../ui_elements/drag_drop_game/SentenseFromArray";
import WordsWithTips from "../../ui_elements/drag_drop_game/WordsWithTips";

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
  spacer: {
    flex: 1,
  },
  modal: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#B3F9E2",
    bottom: 0,
    height: "35%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  subheader: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    fontSize: 22,
  },
  label: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Nunito-Bold",
    textTransform: "uppercase",
  },
  button: {
    backgroundColor: "#15AB76",
    width: "45%",
    height: 45,
    borderRadius: 20,
    justifyContent: "center",
    marginHorizontal: 16,
    marginBottom: 20,
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

  useEffect(() => {
    if (answerIsCorrect != null) {
      startAnimation();
    }
  }, [answerIsCorrect]);

  const translateY = useSharedValue(300);
  const transformStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });
  const startAnimation = () => {
    translateY.value = withTiming(0, { duration: 200 });
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
        <ReadyButton onPress={checkUserAnswer} />

        <Animated.View
          id="modal"
          style={[
            styles.modal,
            transformStyle,
            { backgroundColor: answerIsCorrect ? "#B3F9E2" : "#F9C8D1" },
          ]}
        >
          <Text style={styles.subheader}>
            {answerIsCorrect ? "Richtig!" : "Falsch!"}
          </Text>
          <View style={{ borderWidth: 1 }}></View>
          <SentenseFromArray
            style={{ padding: 35 }}
            words={currentExercise.wordsForTranslation.slice(
              0,
              currentExercise.wordsNumberInAnswer
            )}
          />
          <RectButton
            style={[
              styles.button,
              { backgroundColor: answerIsCorrect ? "#15AB76" : "#E9526E" },
            ]}
            onPress={loadNextRound}
          >
            <Text style={styles.label}>ДАЛІ</Text>
          </RectButton>
        </Animated.View>
      </Pressable>
    </GestureHandlerRootView>
  );
};

export default WriteTranslationGameRound;
