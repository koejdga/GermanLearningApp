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
import Icon from "react-native-vector-icons/AntDesign";
import { darkColor, whiteColor } from "../../config/Colors";
import { generalStyles } from "../../config/General";
import MyButton from "../../ui_elements/article_game/MyButton";

const bgImage = require("../../assets/article-game-bg.jpg");

let correctGreenForBox = "rgba(229, 247, 237, 0.7)";
let defaultColor = "rgba(242, 245, 246, 0.5)";
let wrongRedForBox = "rgba(237, 67, 55, 0.1)";
let correctGreenColor = "#60D394";
let wrongRedColor = "rgba(237, 67, 55, 0.9)";

enum GameState {
  Neutral,
  Correct,
  Wrong,
}

interface WordObject {
  word: string;
  article: string;
  plural: string;
  partOfSpeech: string;
  translation: string;
}

interface Props {
  word: WordObject;
  onRoundEnd: () => void;
  onGameEnd: (score: number) => void;
}

// : React.FC<Props>
const ArticleGameRound = ({ route, navigation }) => {
  const currentRound = route.params?.currentRound;
  const amountOfRounds = route.params?.amountOfRounds;
  const exercises = route.params?.exercises;
  const currentExercise = exercises[currentRound];

  const [state, setState] = useState(GameState.Neutral);
  const [showTranslation, setShowTranslation] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [boxText, setBoxText] = useState(currentExercise.word);
  const [boxColor, setBoxColor] = useState(defaultColor);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setState(GameState.Neutral);
    setShowTranslation(false);
    setButtonsDisabled(false);
    setBoxText(currentExercise.word);
    setBoxColor(defaultColor);
  }, [currentExercise]);

  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
    RobotoCondensed_300Light_Italic,
  });
  if (!fontsLoaded) {
    return null;
  }

  const pressButton = (article: string) => {
    if (article == currentExercise.article) {
      setState(GameState.Correct);
      setBoxColor(correctGreenForBox);
      setScore(score + 100);
    } else {
      setState(GameState.Wrong);
      setBoxColor(wrongRedForBox);
      if (hearts > 0) {
        setHearts(hearts - 1);
      }
    }
    setButtonsDisabled(true);
    setBoxText(currentExercise.article + " " + currentExercise.word);
  };

  const loadNextRound = () => {
    if (currentRound < amountOfRounds - 1 && hearts !== 0) {
      navigation.push("ArticleGameRound", {
        currentRound: currentRound + 1,
        amountOfRounds,
        exercises,
      });
    } else {
      navigation.push("EndOfGame");
    }
    // if (hearts == 0) {
    //   onGameEnd(score);
    // } else {
    //   onRoundEnd();
    // }
  };

  const styles = StyleSheet.create({
    parentContainer: {
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
    // score: {
    //   marginRight: 20,
    //   fontSize: 24,
    //   fontFamily: "Roboto_500Medium",
    // },
    mainArea: {
      flex: 1,
      alignItems: "center",
    },
    boxWithWord: {
      backgroundColor: boxColor,
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

  return (
    <ImageBackground source={bgImage} style={styles.parentContainer}>
      <SafeAreaView style={styles.parentContainer}>
        <View style={styles.row}>
          <View style={styles.hearts}>
            {[...Array(hearts)].map((_, index) => (
              <Icon key={index} name="heart" size={24} color="#CD2424" />
            ))}
          </View>
          <Text style={generalStyles.score}>{score}</Text>
        </View>
        <Pressable
          style={styles.mainArea}
          onPress={() => {
            if (state != GameState.Neutral) loadNextRound();
          }}
        >
          <View style={{ marginTop: "30%", height: 260 }}>
            <FlipCard
              style={styles.boxWithWord}
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
                    {currentExercise.plural}
                  </Text>
                </View>
                <Text style={styles.partOfSpeech}>
                  {currentExercise.partOfSpeech}
                </Text>
                <Text style={[styles.robotoRegular, styles.translation]}>
                  • {currentExercise.translation}
                </Text>
              </>
            </FlipCard>
          </View>
          <View style={styles.placeForBanner}>
            {state == GameState.Correct && (
              <View style={[styles.banner, styles.correct]}>
                <Text style={styles.bannerText}>Correct!</Text>
              </View>
            )}

            {state == GameState.Wrong && (
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
