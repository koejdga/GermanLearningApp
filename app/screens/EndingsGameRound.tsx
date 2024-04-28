import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReadyButton from "../ui_elements/drag_drop_game/ReadyButton";
import WordsWithTips from "../ui_elements/drag_drop_game/WordsWithTips";
import EndRoundModal from "./EndRoundModal";
import GameRound from "./GameRound";
import { sharedGameStyles } from "./SharedGameStyles";

const EndingsGameRound = ({ route, navigation }) => {
  const round = GameRound({ route, navigation });

  const emptyInputColor = "lightgrey";
  const disabledInputColor = "red";
  const filledInputColor = "";
  const correctInputColor = "";
  const wrongInputColor = "";

  const checkUserInput = () => {
    const allEqual = userInputs.every(
      (input, index) =>
        input.toLowerCase() === round.currentExercise.endings[index]
    );
    setAnswerIsCorrect(allEqual);
  };

  const [answerIsCorrect, setAnswerIsCorrect] = useState(null);

  const [userInputs, setUserInputs] = useState(
    Array(round.currentExercise.endings.length).fill("")
  );

  return (
    <GestureHandlerRootView style={sharedGameStyles.container}>
      <View style={sharedGameStyles.container}>
        <View style={sharedGameStyles.container}>
          <Text style={sharedGameStyles.upperText}>
            Вставте закінчення до слів
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginHorizontal: 30,
              width: "70%",
              rowGap: 10,
            }}
          >
            {round.currentExercise.sentense.map(
              (part: string[], index: number) => {
                const lastPart =
                  index === round.currentExercise.sentense.length - 1;
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
              }
            )}
          </View>
        </View>

        {/* TODO: try to move this gesture handler to ready button component */}
        <GestureHandlerRootView>
          <ReadyButton onPress={checkUserInput} />
        </GestureHandlerRootView>

        <EndRoundModal
          correctAnswer={round.currentExercise.sentense.flatMap(
            (words: { word: string }[], index: number) => {
              let newWords = words.map((obj) => Object.assign({}, obj));
              if (index != round.currentExercise.sentense.length - 1) {
                newWords[newWords.length - 1].word +=
                  round.currentExercise.endings[index];
              }
              console.log("we are here");
              console.log(newWords);
              console.log(words);
              return newWords;
            }
          )}
          loadNextRound={round.loadNextRound}
          answerIsCorrect={answerIsCorrect}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default EndingsGameRound;
