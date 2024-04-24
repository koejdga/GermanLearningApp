import React, { useEffect, useState } from "react";
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

interface Props {
  words: { word: string }[];
  wordsNumberInAnswer: number;
  sentenseToTranslate: { word: string; translation: number }[];
}

const DragDropGameRound: React.FC<Props> = () => {
  // test data
  const words = [
    { word: "Er" },
    { word: "isst" },
    { word: "einen" },
    { word: "Apfel" },
    { word: "," },
    { word: "weil" },
    { word: "er" },
    { word: "hungrig" },
    { word: "ist" },
    { word: "Hallo" },
  ];
  const wordsNumberInAnswer = 9;
  const sentenseToTranslate = [
    { word: "Він", translation: 1 },
    { word: "їсть", translation: 2 },
    { word: "яблуко", translation: 3 },
    { word: ",", translation: -1 },
    { word: "тому що", translation: 4 },
    { word: "він", translation: 1 },
    { word: "голодний", translation: 5 },
  ];
  // end of test data

  const [shuffledWords, setShuffledWords] = useState(shuffle(words));
  const [answerIsCorrect, setAnswerIsCorrect] = useState(null);

  const checkUserAnswer = (answer: number[]) => {
    if (answer.filter((x) => x != -1).length != wordsNumberInAnswer) {
      setAnswerIsCorrect(false);
      return;
    }

    for (let i = 0; i < answer.length; i++) {
      if (answer[i] != -1 && words[answer[i]] !== shuffledWords[i]) {
        setAnswerIsCorrect(false);
        return;
      }
    }
    setAnswerIsCorrect(true);
  };

  useEffect(() => {
    if (answerIsCorrect != null) {
      startAnimation();
    }
  }, [answerIsCorrect]);

  const onPress = () => {
    // here will go some navigation to next round
    console.log("next round or end of game");
  };

  const translateY = useSharedValue(300);
  const style = useAnimatedStyle(() => {
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
      <SentenseFromArray words={sentenseToTranslate} />
      <View style={styles.spacer}></View>
      <DragDropWords checkUserAnswer={checkUserAnswer}>
        {shuffledWords.map((word, index) => (
          <Word key={index} {...word} />
        ))}
      </DragDropWords>

      <Animated.View id="modal" style={[styles.modal, style]}>
        <Text style={styles.subheader}>Richtig!</Text>
        <View style={{ borderWidth: 1 }}></View>
        <SentenseFromArray
          style={{ padding: 35 }}
          words={words.slice(0, wordsNumberInAnswer)}
        />
        <RectButton style={styles.button} onPress={onPress}>
          <Text style={styles.label}>ДАЛІ</Text>
        </RectButton>
      </Animated.View>
    </GestureHandlerRootView>
  );
};

export default DragDropGameRound;
