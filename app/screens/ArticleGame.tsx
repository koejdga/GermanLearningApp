import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Account from "../ui_elements/icons/Account";
import FontBook from "../ui_elements/icons/FontBook";
import HomePage from "../ui_elements/icons/HomePage";
import Trophy from "../ui_elements/icons/Trophy";
import Icon from "react-native-vector-icons/AntDesign";
import MyButton from "../ui_elements/article_game/MyButton";
import FlipCard from "react-native-flip-card";

import {
  useFonts,
  RobotoCondensed_300Light_Italic,
} from "@expo-google-fonts/roboto-condensed";
import { Roboto_500Medium, Roboto_400Regular } from "@expo-google-fonts/roboto";

const bgImage = require("../assets/article-game-bg.jpg");

const darkColor = "#0E1428";
const whiteColor = "#F5F5F5";
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
}

const ArticleGame: React.FC<Props> = ({ word, onRoundEnd }) => {
  const [state, setState] = useState(GameState.Neutral);
  const [showTranslation, setShowTranslation] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [boxText, setBoxText] = useState(word.word);
  const [boxColor, setBoxColor] = useState(defaultColor);

  useEffect(() => {
    setState(GameState.Neutral);
    setShowTranslation(false);
    setButtonsDisabled(false);
    setBoxText(word.word);
    setBoxColor(defaultColor);
  }, [word]);

  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
    RobotoCondensed_300Light_Italic,
  });
  if (!fontsLoaded) {
    return null;
  }

  const pressButton = (article: string) => {
    if (article == word.article) {
      setState(GameState.Correct);
      setBoxColor(correctGreenForBox);
    } else {
      setState(GameState.Wrong);
      setBoxColor(wrongRedForBox);
    }
    setButtonsDisabled(true);
    setBoxText(word.article + " " + word.word);
  };

  const newRound = () => {
    onRoundEnd();
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
    score: {
      marginRight: 20,
      fontSize: 24,
      fontFamily: "Roboto_500Medium",
    },
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
    bottomView: {
      height: "auto",
      justifyContent: "space-evenly",
      alignItems: "center",
      flexDirection: "row",
    },
    line: {
      height: 1,
      width: "83%",
      backgroundColor: darkColor,
      alignSelf: "center",
      marginBottom: 15,
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
            <Icon name="heart" size={24} color="#CD2424"></Icon>
            <Icon name="heart" size={24} color="#CD2424"></Icon>
            <Icon name="heart" size={24} color="#CD2424"></Icon>
          </View>
          <Text style={styles.score}>1000</Text>
        </View>
        <Pressable
          style={styles.mainArea}
          onPress={() => {
            if (state != GameState.Neutral) newRound();
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
                  <Text style={styles.robotoRegular}>{word.plural}</Text>
                </View>
                <Text style={styles.partOfSpeech}>{word.partOfSpeech}</Text>
                <Text style={[styles.robotoRegular, styles.translation]}>
                  • {word.translation}
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
        <View style={styles.line}></View>
        <View style={styles.bottomView}>
          <Account />
          <FontBook />
          <HomePage />
          <Trophy />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ArticleGame;
