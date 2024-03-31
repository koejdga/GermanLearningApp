import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import ArticleGameRound from "./app/screens/ArticleGameRound";
import { useEffect, useState } from "react";
import ArticleGame from "./app/screens/ArticleGame";
import HomePage from "./app/screens/HomePage";
import Navigation from "./app/ui_elements/Navigation";
import Dictionary from "./app/screens/Dictionary";
import WordTranslation from "./app/screens/WordTranslation";

enum Screen {
  ArticleGame,
  HomePage,
  Dictionary,
}

export default function App() {
  const [screen, setScreen] = useState(Screen.HomePage);
  const handleGameStart = () => {
    setScreen(Screen.ArticleGame);
  };

  const backgrounds = {
    [Screen.HomePage]: "#FEFCFF",
    [Screen.ArticleGame]: "#fff8f5",
    [Screen.Dictionary]: "lightblue",
    // [Screen.ArticleGame]: "#fdd8d6",
  };

  const handleGoToHomePage = () => {
    setScreen(Screen.HomePage);
  };

  const handleGoToDictPage = () => {
    setScreen(Screen.Dictionary);
  };

  return (
    <View style={[styles.container, { backgroundColor: backgrounds[screen] }]}>
      <SafeAreaView style={[styles.container]}>
        <View style={styles.container}>
          {screen == Screen.ArticleGame && <ArticleGame />}
          {screen == Screen.HomePage && (
            <HomePage onGameStart={handleGameStart} />
          )}
          {screen == Screen.Dictionary && <WordTranslation />}
        </View>
        <Navigation
          onGoToHomePage={handleGoToHomePage}
          onGoToDictPage={handleGoToDictPage}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
