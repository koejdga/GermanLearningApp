import React from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Button,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Account from "../ui_elements/icons/Account";
import FontBook from "../ui_elements/icons/FontBook";
import HomePage from "../ui_elements/icons/HomePage";
import Trophy from "../ui_elements/icons/Trophy";
import Icon from "react-native-vector-icons/AntDesign";
import MyButton from "../ui_elements/article_game/MyButton";

import {
  useFonts,
  RobotoCondensed_400Regular,
} from "@expo-google-fonts/roboto-condensed";
import { Roboto_500Medium } from "@expo-google-fonts/roboto";

const bgImage = require("../assets/article-game-bg.jpg");

const darkColor = "#0E1428";
const whiteColor = "#F5F5F5";

const ArticleGame = () => {
  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

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
        <View style={styles.mainArea}>
          <View style={styles.boxWithWord}>
            <Text style={styles.word}>Radio</Text>
          </View>
          <View style={styles.buttons}>
            <MyButton color={whiteColor} text="Der" backgroundColor="#7D7ABC" />
            <MyButton color={whiteColor} text="Die" backgroundColor="#EA526F" />
            <MyButton color={darkColor} text="Das" backgroundColor="#F7D002" />
          </View>
        </View>
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
    height: 260,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(242, 245, 246, 0.5)",
    marginTop: "30%",
    width: 350,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#0E1428",
  },
  word: {
    fontSize: 34,
    fontFamily: "Roboto_500Medium",
  },
  buttons: {
    marginTop: 145,
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
});

export default ArticleGame;
