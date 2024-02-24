import React, { useEffect } from "react";
import { View, Text, Pressable } from "react-native";

const ArticleGameTest = ({ word, onRoundEnd }) => {
  useEffect(() => {
    console.log("Current word in ARTICLEGAME:", word);
  }, [word]);

  return (
    <Pressable
      onPress={() => onRoundEnd()}
      style={{ backgroundColor: "lightblue", height: "100%" }}
    >
      <Text>Word: {word.word}</Text>
      <Text>Article: {word.article}</Text>
    </Pressable>
  );
};

export default ArticleGameTest;
