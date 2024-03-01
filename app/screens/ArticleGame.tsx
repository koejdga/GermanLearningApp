import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import ArticleGameRound from "./ArticleGameRound";
import { useEffect, useState } from "react";

const ArticleGame = () => {
  // this will be in database
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

  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const handleRoundEnd = () => {
    if (currentWordIndex < initialWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setCurrentWordIndex(0);
    }
  };

  const [playing, setPlaying] = useState(true);
  const [score, setScore] = useState(0);

  const handleGameEnd = (score: number) => {
    setPlaying(false);
    setScore(score);
  };

  const testing = () => {
    setPlaying(true);
    setScore(0);
    setCurrentWordIndex(0);
  };

  return (
    <>
      {playing && (
        <ArticleGameRound
          word={initialWords[currentWordIndex]}
          onRoundEnd={handleRoundEnd}
          onGameEnd={handleGameEnd}
        />
      )}
      {!playing && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 34 }}>Game over :(</Text>
          <Text style={{ fontSize: 34 }}>Your score = {score}</Text>
          <Button title="Okay" onPress={() => testing()}></Button>
        </View>
      )}
    </>
  );
};

export default ArticleGame;
