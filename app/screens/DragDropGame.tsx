import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import DragDropWords from "../ui_elements/drag_drop_game/DragDropWords";
import Word from "../ui_elements/drag_drop_game/Word";
import Header from "../ui_elements/drag_drop_game/Header";
import ReadyButton from "../ui_elements/drag_drop_game/ReadyButton";

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
  { id: 10, word: "Hallo" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

const DragDropGame = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      {/* <Header /> */}
      <DragDropWords>
        {words.map((word) => (
          <Word key={word.id} {...word} />
        ))}
      </DragDropWords>
      {/* <ReadyButton /> */}
    </GestureHandlerRootView>
  );
};

export default DragDropGame;
