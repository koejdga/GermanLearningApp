import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { shuffle } from "../../Utils";
import Spacer from "../../ui_elements/Spacer";
import DragDropWords from "../../ui_elements/drag_drop_game/DragDropWords";
import Word from "../../ui_elements/drag_drop_game/Word";
import WordsWithTips from "../../ui_elements/drag_drop_game/WordsWithTips";
import EndRoundModal from "../EndRoundModal";
import GameRound from "../GameRound";

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

const DragDropGameRound = ({ route, navigation }) => {
  const round = GameRound({ route, navigation });
  const correctAnswer = round.currentExercise.wordsForTranslation.slice(
    0,
    round.currentExercise.wordsNumberInAnswer
  );
  const [shuffledWords, _] = useState(
    shuffle(round.currentExercise.wordsForTranslation)
  );
  const [answerIsCorrect, setAnswerIsCorrect] = useState(null);

  const checkUserAnswer = (answer: number[]) => {
    if (
      answer.filter((x) => x != -1).length !=
      round.currentExercise.wordsNumberInAnswer
    ) {
      setAnswerIsCorrect(false);
      return;
    }

    for (let i = 0; i < answer.length; i++) {
      if (answer[i] != -1 && correctAnswer[answer[i]] !== shuffledWords[i]) {
        setAnswerIsCorrect(false);
        return;
      }
    }
    setAnswerIsCorrect(true);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.upperText}>Перекладіть це речення</Text>
      <WordsWithTips
        words={round.currentExercise.sentenseToTranslate}
        style={{ paddingHorizontal: 30 }}
      />
      <Spacer />
      <DragDropWords checkUserAnswer={checkUserAnswer}>
        {shuffledWords.map((word: { word: string }, index) => (
          <Word key={index} {...word} />
        ))}
      </DragDropWords>

      <EndRoundModal
        correctAnswer={correctAnswer}
        loadNextRound={round.loadNextRound}
        answerIsCorrect={answerIsCorrect}
      />
    </GestureHandlerRootView>
  );
};

export default DragDropGameRound;
