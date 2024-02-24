import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ArticleGame from "./app/screens/ArticleGame";
import { useEffect, useState } from "react";
import ArticleGameTest from "./app/screens/ArticleGameTest";

export default function App() {
  const initialWords = [
    {
      word: "Radio",
      article: "Das",
      plural: "die Radios",
      partOfSpeech: "ім.",
      translation: "радіо",
    },
    {
      word: "Haus",
      article: "Das",
      plural: "die Radios",
      partOfSpeech: "ім.",
      translation: "радіо",
    },
    {
      word: "Maus",
      article: "Das",
      plural: "die Radios",
      partOfSpeech: "ім.",
      translation: "радіо",
    },
  ];

  const [words, setWords] = useState(initialWords);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const handleRoundEnd = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setCurrentWordIndex(0);
    }
  };

  return (
    <ArticleGame word={words[currentWordIndex]} onRoundEnd={handleRoundEnd} />
  );
}
