import { useContext, useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReadyButton from "../../ui_elements/game/ReadyButton";
import WordsWithTips from "../../ui_elements/game/WordsWithTips";
import EndRoundModal from "../../ui_elements/game/EndRoundModal";
import GameRound from "../game_related/GameRound";
import { sharedGameStyles } from "../../SharedGameStyles";
import GameHeader from "../../ui_elements/game/GameHeader";
import { UserContext } from "../../UserContext";

const EndingsGameRound = ({ route, navigation }) => {
  const round = GameRound({ route, navigation });
  const { user, setUser } = useContext(UserContext);

  const emptyInputColor = "lightgrey";
  const filledInputColor = "gold";
  const correctInputColor = "lightgreen";
  const wrongInputColor = "lightcoral";

  const [answerIsCorrect, setAnswerIsCorrect] = useState(null);

  useEffect(() => {
    if (answerIsCorrect === false) {
      setAmountOfHearts(amountOfHearts - 1);
    } else if (answerIsCorrect === true) {
      setScore(score + 10);
    }
  }, [answerIsCorrect]);

  if (!round.currentExercise) {
    return <Text>Sorry, no exercises were found</Text>;
  }

  const [inputColors, setInputColors] = useState(
    Object.keys(round.currentExercise.endings).reduce((acc, key) => {
      acc[key] = emptyInputColor;
      return acc;
    }, {})
  );

  const [userInputs, setUserInputs] = useState(
    Object.keys(round.currentExercise.endings).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {})
  );

  const [amountOfHearts, setAmountOfHearts] = useState(round.amountOfHearts);
  const [score, setScore] = useState(round.score);

  const checkUserInput = () => {
    let allEqual = true;

    for (const [key, value] of Object.entries(round.currentExercise.endings)) {
      const i = parseInt(key);
      if (userInputs[i].toLowerCase() !== value) {
        allEqual = false;
        inputColors[i] = wrongInputColor;
      } else {
        inputColors[i] = correctInputColor;
      }
    }

    setInputColors(inputColors);
    setAnswerIsCorrect(allEqual);
  };

  return (
    <GestureHandlerRootView style={sharedGameStyles.container}>
      <GameHeader amountOfHearts={amountOfHearts} score={score} />
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
              (word: string, index: number) => {
                const addTextInput = Object.keys(userInputs).includes(
                  index.toString()
                );

                const isLastWord =
                  index === round.currentExercise.sentense.length - 1;
                const addBlankspace = !addTextInput && !isLastWord;
                return (
                  <View
                    style={{ flexDirection: "row" }}
                    key={"endingGameRound" + index}
                  >
                    <WordsWithTips words={[{ word }]} style={{}} />
                    {addBlankspace && <Text> </Text>}
                    {addTextInput && (
                      <TextInput
                        style={{
                          backgroundColor: inputColors[index],
                          marginRight: 10,
                          marginLeft: 4,
                          width: 50,
                        }}
                        onChangeText={(input) => {
                          if (input != "") {
                            inputColors[index] = filledInputColor;
                          } else {
                            inputColors[index] = emptyInputColor;
                          }
                          setInputColors(inputColors);
                          const updatedInputs = { ...userInputs };
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
          correctAnswer={round.currentExercise.sentense.map(
            (word: string, index: number) => {
              if (Object.keys(userInputs).includes(index.toString())) {
                return { word: word + round.currentExercise.endings[index] };
              } else {
                return { word };
              }
            }
          )}
          loadNextRound={async () =>
            await round.loadNextRound(answerIsCorrect, score, user, setUser)
          }
          answerIsCorrect={answerIsCorrect}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default EndingsGameRound;
