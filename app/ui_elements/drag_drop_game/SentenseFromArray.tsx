import { View, Text, StyleSheet, ViewStyle } from "react-native";
import React from "react";

const styles = StyleSheet.create({
  sentense: {
    flexDirection: "row",
  },
  word: {
    fontSize: 19,
    textDecorationStyle: "solid",
  },
});

interface Props {
  words: { word: string }[];
  style?: ViewStyle;
}

const SentenseFromArray: React.FC<Props> = ({ words, style }) => {
  return (
    <View style={[styles.sentense, style]}>
      {words.map((word, index) => {
        let wordToDisplay = word.word;
        if (index < words.length - 1 && words[index + 1].word != ",") {
          wordToDisplay += " ";
        }
        return (
          <Text style={styles.word} key={index}>
            {wordToDisplay}
          </Text>
        );
      })}
    </View>
  );
};

export default SentenseFromArray;
