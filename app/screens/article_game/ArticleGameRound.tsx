import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import {
  RobotoCondensed_300Light_Italic,
  useFonts,
} from "@expo-google-fonts/roboto-condensed";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FlipCard from "react-native-flip-card";
import { darkColor, whiteColor } from "../../config/Colors";
import GameHeader from "../../ui_elements/GameHeader";
import MyButton from "../../ui_elements/article_game/MyButton";
import GameRound from "../GameRound";

const bgImage = require("../../assets/article-game-bg.jpg");

let correctGreenForBox = "rgba(229, 247, 237, 0.7)";
let defaultColor = "rgba(242, 245, 246, 0.5)";
let wrongRedForBox = "rgba(237, 67, 55, 0.1)";
let correctGreenColor = "#60D394";
let wrongRedColor = "rgba(237, 67, 55, 0.9)";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    marginTop: 28,
    justifyContent: "space-between",
    alignItems: "center",
  },
  hearts: {
    height: "auto",
    flexDirection: "row",
    gap: 10,
    marginLeft: 20,
  },
  mainArea: {
    flex: 1,
    alignItems: "center",
  },
  boxWithWord: {
    width: 350,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#0E1428",
    paddingHorizontal: 15,
  },
  word: {
    fontSize: 34,
    fontFamily: "Roboto_500Medium",
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
  wordToTranslate: {
    alignSelf: "flex-start",
  },
  buttons: {
    marginBottom: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginHorizontal: 19,
  },
  placeForBanner: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  banner: {
    width: "56%",
    height: 55,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  correct: {
    backgroundColor: correctGreenColor,
  },
  wrong: {
    backgroundColor: wrongRedColor,
  },
  bannerText: {
    fontFamily: "Roboto_500Medium",
    fontSize: 24,
    color: "#FFFFFF",
  },
  robotoRegular: {
    fontFamily: "Roboto_400Regular",
    fontSize: 28,
  },
  partOfSpeech: {
    fontFamily: "RobotoCondensed_300Light_Italic",
    fontSize: 26,
  },
  translation: {
    marginTop: 30,
  },
  wordAndPluralRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 17,
  },
});

const ArticleGameRound = ({ route, navigation }) => {
  const round = GameRound({ route, navigation });

  const [amountOfHearts, setAmountOfHearts] = useState(round.amountOfHearts);

  const [showTranslation, setShowTranslation] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [boxText, setBoxText] = useState(round.currentExercise.word);
  const [boxColor, setBoxColor] = useState(defaultColor);
  const [score, setScore] = useState(0);

  const [answerIsCorrect, setAnswerIsCorrect] = useState(null);

  useEffect(() => {
    setShowTranslation(false);
    setButtonsDisabled(false);
    setBoxText(round.currentExercise.word);
    setBoxColor(defaultColor);
  }, [round.currentExercise]);

  useEffect(() => {
    if (answerIsCorrect === false) {
      setAmountOfHearts(amountOfHearts - 1);
    }
  }, [answerIsCorrect]);

  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
    RobotoCondensed_300Light_Italic,
  });
  if (!fontsLoaded) {
    return null;
  }

  const pressButton = (article: string) => {
    if (article == round.currentExercise.article) {
      setAnswerIsCorrect(true);
      setBoxColor(correctGreenForBox);
      setScore(score + 100);
    } else {
      setAnswerIsCorrect(false);
      setBoxColor(wrongRedForBox);
    }
    setButtonsDisabled(true);
    setBoxText(
      round.currentExercise.article + " " + round.currentExercise.word
    );
  };

  return (
    <ImageBackground source={bgImage} style={styles.container}>
      <SafeAreaView style={styles.container}>
        <GameHeader amountOfHearts={amountOfHearts} score={score} />
        <Pressable
          style={styles.mainArea}
          onPress={() => {
            if (answerIsCorrect != null) round.loadNextRound(answerIsCorrect);
          }}
        >
          <View style={{ marginTop: "30%", height: 260 }}>
            <FlipCard
              style={[styles.boxWithWord, { backgroundColor: boxColor }]}
              flipHorizontal={true}
              flipVertical={false}
              onFlipEnd={() => {
                if (showTranslation == false) {
                  setShowTranslation(true);
                } else {
                  setShowTranslation(false);
                }
              }}
            >
              {/* Face Side */}
              <Text style={styles.word}>{boxText}</Text>
              {/* Back Side */}
              <>
                <View style={styles.wordAndPluralRow}>
                  <Text style={[styles.word, styles.wordToTranslate]}>
                    {boxText}
                  </Text>
                  <Text style={styles.robotoRegular}>
                    {round.currentExercise.plural}
                  </Text>
                </View>
                <Text style={styles.partOfSpeech}>
                  {round.currentExercise.partOfSpeech}
                </Text>
                <Text style={[styles.robotoRegular, styles.translation]}>
                  • {round.currentExercise.translation}
                </Text>
              </>
            </FlipCard>
          </View>
          <View style={styles.placeForBanner}>
            {answerIsCorrect && (
              <View style={[styles.banner, styles.correct]}>
                <Text style={styles.bannerText}>Correct!</Text>
              </View>
            )}

            {answerIsCorrect === false && (
              <View style={[styles.banner, styles.wrong]}>
                <Text style={styles.bannerText}>Wrong!</Text>
              </View>
            )}
          </View>
          <View style={styles.buttons}>
            <MyButton
              color={whiteColor}
              text="Der"
              backgroundColor="#7D7ABC"
              onPress={() => pressButton("Der")}
              disabled={buttonsDisabled}
              disabledBgColor="#ADACC7"
            />
            <MyButton
              color={whiteColor}
              text="Die"
              backgroundColor="#EA526F"
              onPress={() => pressButton("Die")}
              disabled={buttonsDisabled}
              disabledBgColor="#E792A2"
            />
            <MyButton
              color={darkColor}
              text="Das"
              backgroundColor="#F7D002"
              onPress={() => pressButton("Das")}
              disabled={buttonsDisabled}
              disabledBgColor="#F3E38F"
            />
          </View>
        </Pressable>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ArticleGameRound;
