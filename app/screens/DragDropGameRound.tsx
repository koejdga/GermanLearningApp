import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  GestureHandlerRootView,
  RectButton,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { shuffle } from "../Utils";
import DragDropWords from "../ui_elements/drag_drop_game/DragDropWords";
import SentenseFromArray from "../ui_elements/drag_drop_game/SentenseFromArray";
import Word from "../ui_elements/drag_drop_game/Word";

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

const DragDropGameRound = ({ route, navigation }) => {
  const currentRound = route.params?.currentRound;
  const amountOfRounds = route.params?.amountOfRounds;
  const exercises = route.params?.exercises;
  const currentExercise = exercises[currentRound];

  const [shuffledWords, _] = useState(
    shuffle(currentExercise.wordsForTranslation)
  );
  const [answerIsCorrect, setAnswerIsCorrect] = useState(null);

  const checkUserAnswer = (answer: number[]) => {
    if (
      answer.filter((x) => x != -1).length !=
      currentExercise.wordsNumberInAnswer
    ) {
      setAnswerIsCorrect(false);
      return;
    }

    for (let i = 0; i < answer.length; i++) {
      if (
        answer[i] != -1 &&
        currentExercise.wordsForTranslation[answer[i]] !== shuffledWords[i]
      ) {
        setAnswerIsCorrect(false);
        return;
      }
    }
    setAnswerIsCorrect(true);
  };

  const loadNextRound = () => {
    if (currentRound < amountOfRounds - 1) {
      navigation.push("DragDropGameRound", {
        currentRound: currentRound + 1,
        amountOfRounds,
        exercises,
      });
    } else {
      navigation.push("EndOfDragDropGame");
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

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.upperText}>Перекладіть це речення</Text>
      <SentenseFromArray
        words={currentExercise.sentenseToTranslate}
        style={{ paddingHorizontal: 30 }}
      />
      <View style={styles.spacer}></View>
      <DragDropWords checkUserAnswer={checkUserAnswer}>
        {shuffledWords.map((word: { word: string }, index) => (
          <Word key={index} {...word} />
        ))}
      </DragDropWords>

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
    </GestureHandlerRootView>
  );
};

export default DragDropGameRound;
