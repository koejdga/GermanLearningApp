// tsrnfs

import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import ReadyButton from "../ui_elements/drag_drop_game/ReadyButton";
import {
  GestureHandlerRootView,
  RectButton,
} from "react-native-gesture-handler";
import WordsWithTips from "../ui_elements/drag_drop_game/WordsWithTips";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import SentenseFromArray from "../ui_elements/drag_drop_game/SentenseFromArray";
// import {
//   GestureDetector,
//   Gesture,
//   GestureHandlerRootView,
// } from "react-native-gesture-handler";

type Props = {};

const EndingsGameRound = ({ route, navigation }) => {
  // TODO: make this part with route params reading a separate function
  // or maybe make game round an interface because loadNextRound also is
  // the same between games (or just make it separate function as well)
  const currentRound = route.params?.currentRound;
  const amountOfRounds = route.params?.amountOfRounds;
  const exercises = route.params?.exercises;
  const currentExercise = exercises[currentRound];

  const emptyInputColor = "lightgrey";
  const disabledInputColor = "red";
  const filledInputColor = "";
  const correctInputColor = "";
  const wrongInputColor = "";

  const [number, setNumber] = useState("");
  const [number2, setNumber2] = useState("");
  const [editable, setEditable] = useState(true);
  const [inputColor, setInputColor] = useState(emptyInputColor);

  // const tap = Gesture.Tap()
  // .numberOfTaps(1)
  // .onStart(() => {
  //   console.log("hello");
  // setEditable(!editable);
  // setInputColor(
  //   inputColor === disabledInputColor ? emptyInputColor : disabledInputColor
  // );
  // });

  const checkUserInput = () => {
    const allEqual = userInputs.every(
      (input, index) => input.toLowerCase() === currentExercise.endings[index]
    );
    setAnswerIsCorrect(allEqual);
  };

  const [answerIsCorrect, setAnswerIsCorrect] = useState(null);

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

  const loadNextRound = () => {
    if (currentRound < amountOfRounds - 1) {
      navigation.push("EndingsGameRound", {
        currentRound: currentRound + 1,
        amountOfRounds,
        exercises,
      });
    } else {
      navigation.push("EndOfGame");
    }
  };

  const [userInputs, setUserInputs] = useState(
    Array(currentExercise.endings.length).fill("")
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.upperText}>Вставте закінчення до слів</Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginHorizontal: 30,
              width: "70%",
              rowGap: 10,
            }}
          >
            {currentExercise.sentense.map((part: string[], index: number) => {
              const lastPart = index === currentExercise.sentense.length - 1;
              return (
                <View
                  style={{ flexDirection: "row" }}
                  key={"endingGameRound" + index}
                >
                  <WordsWithTips words={part} style={{}} />
                  {!lastPart && (
                    <TextInput
                      style={{
                        backgroundColor: "lightgrey",
                        marginRight: 10,
                        marginLeft: 5,
                        width: 50,
                      }}
                      onChangeText={(input) => {
                        const updatedInputs = [...userInputs];
                        updatedInputs[index] = input;
                        setUserInputs(updatedInputs);
                      }}
                    />
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* TODO: try to move this gesture handler to ready button component */}
        <GestureHandlerRootView>
          <ReadyButton onPress={checkUserInput} />
        </GestureHandlerRootView>

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
            words={currentExercise.sentense[0]}
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
        {/* <View style={styles.textBox}>
        <Text style={{ fontSize: 18 }}>Ich habe ein</Text>
        <TextInput
          style={[styles.textInput, { backgroundColor: inputColor }]}
          onChangeText={setNumber}
          value={number}
          maxLength={3}
        />
        <Text style={{ fontSize: 18 }}> Hund. Er ist nett</Text>

        <GestureHandlerRootView>
          <GestureDetector gesture={tap}>
            <TextInput
              style={[styles.textInput, { backgroundColor: inputColor }]}
              onChangeText={setNumber2}
              value={number2}
              maxLength={3}
              editable={editable}
            />
          </GestureDetector>
        </GestureHandlerRootView>

        <Text style={{ fontSize: 18 }}>.</Text>
      </View>
      <View style={styles.spacer}></View>
      <Button title="Готово"></Button> */}
      </View>
    </GestureHandlerRootView>
  );
};

export default EndingsGameRound;

const styles = StyleSheet.create({
  container: { flex: 1 },
  textBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginHorizontal: 20,
  },
  textInput: {
    width: 40,
    fontSize: 18,
    borderRadius: 2,
  },
  spacer: {
    marginTop: "90%",
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
  upperText: {
    fontSize: 16,
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 30,
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
});
