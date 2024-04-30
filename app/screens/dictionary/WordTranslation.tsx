import { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { DictContext } from "../../DictContext";

const WordTranslation = ({ route }) => {
  const { wholeDict } = useContext(DictContext);
  const { word } = route.params;
  const translations = wholeDict[word];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.word}>{word}</Text>
      <Text style={styles.characteristics}>іменник</Text>

      <View style={styles.translations}>
        {translations.map((translation, index) => {
          return (
            <View style={{ marginBottom: 10 }} key={"wordInDict" + index}>
              <Text style={styles.translation}>
                {index + 1}) {translation.translation}
              </Text>
              <Text>Syn:</Text>
              <Text>{translation.synonyms}</Text>
            </View>
          );
        })}
      </View>
      <View style={{ height: 15 }}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: "white",
    flex: 1,
  },
  word: {
    fontSize: 18,
    marginVertical: 10,
    color: "#1860e0",
  },
  transcription: {
    marginBottom: 10,
    color: "#742122",
  },
  characteristics: {
    color: "#448a3b",
    fontStyle: "italic",
    marginBottom: 8,
  },
  translations: {
    paddingLeft: 15,
    gap: 3,
  },
  translation: {
    fontSize: 15,
    marginBottom: 5,
  },
  sentence: {
    color: "gray",
    fontSize: 13.5,
  },
});

export default WordTranslation;
