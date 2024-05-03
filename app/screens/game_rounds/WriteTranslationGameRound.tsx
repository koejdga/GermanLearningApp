import { useContext, useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import Spacer from "../../ui_elements/Spacer";
import ReadyButton from "../../ui_elements/game/ReadyButton";
import WordsWithTips from "../../ui_elements/game/WordsWithTips";
import EndRoundModal from "../../ui_elements/game/EndRoundModal";
import GameRound from "../game_related/GameRound";
import { sharedGameStyles } from "../../SharedGameStyles";
import GameHeader from "../../ui_elements/game/GameHeader";
import { UserContext } from "../../UserContext";
import NoExercisesScreen from "../game_related/NoExercisesScreen";

const WriteTranslationGameRound = ({ route, navigation }) => {
  const round = GameRound({ route, navigation });
  const [answerIsCorrect, setAnswerIsCorrect] = useState(null);

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (answerIsCorrect === false) {
      setAmountOfHearts(amountOfHearts - 1);
    } else if (answerIsCorrect === true) {
      setScore(score + 10);
    }
  }, [answerIsCorrect]);

  // TODO: move this to component
  if (!round.currentExercise) {
    return <NoExercisesScreen />;
  }
  const correctAnswer = round.currentExercise.wordsForTranslation.slice(
    0,
    round.currentExercise.wordsNumberInAnswer
  );
  const [userInput, setUserInput] = useState("");

  const [amountOfHearts, setAmountOfHearts] = useState(round.amountOfHearts);
  const [score, setScore] = useState(0);

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

    const answerWithoutCommas =
      splittedAnswer.length !== correctAnswer.length
        ? correctAnswer.filter((word: string) => word !== ",")
        : correctAnswer;

    const allEqual = splittedAnswer.every(
      (x, i) => x === answerWithoutCommas[i]
    );
    setAnswerIsCorrect(allEqual);
  };

  return (
    <GestureHandlerRootView style={sharedGameStyles.container}>
      <GameHeader amountOfHearts={amountOfHearts} score={score} />
      <Pressable style={sharedGameStyles.container} onPress={Keyboard.dismiss}>
        <Text style={sharedGameStyles.upperText}>Перекладіть це речення</Text>
        <WordsWithTips
          words={round.currentExercise.sentenseToTranslate}
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
          correctAnswer={correctAnswer.map((word) => ({ word }))}
          loadNextRound={async () =>
            await round.loadNextRound(answerIsCorrect, score, user, setUser)
          }
          answerIsCorrect={answerIsCorrect}
        />
      </Pressable>
    </GestureHandlerRootView>
  );
};

export default WriteTranslationGameRound;
