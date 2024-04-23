import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import WordList from "./WordList";
import Word from "./Word";
import Header from "./components/Header";
import Footer from "./components/Footer";

const words = [
  { id: 1, word: "Er" },
  { id: 8, word: "hungrig" },
  { id: 2, word: "isst" },
  { id: 7, word: "er" },
  { id: 6, word: "weil" },
  { id: 9, word: "ist" },
  { id: 5, word: "," },
  { id: 3, word: "einen" },
  { id: 4, word: "Apfel" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

const Duolingo = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <Header />
        <WordList>
          {words.map((word) => (
            <Word key={word.id} {...word} />
          ))}
        </WordList>
        <Footer />
      </View>
    </GestureHandlerRootView>
  );
};

export default Duolingo;
