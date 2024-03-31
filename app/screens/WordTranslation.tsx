import { RouteProp } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  route: RouteProp<{ params: { word: string } }, "params">;
}

const WordTranslation = ({ route }) => {
  const { word } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.word}>{word}</Text>
      <Text style={styles.transcription}>[eteni]</Text>
      <Text style={styles.characteristics}>ім., юр.</Text>

      <View style={styles.translations}>
        <Text style={styles.translation}>1) довірена особа</Text>
        <Text style={styles.sentence}>
          He has some bottles of beer stashed away where his wife won't dicover
          them. — У нього є кілька пляшок пива, схованих там, де дружина їх не
          знайде.
        </Text>
        <Text>- distinct attorney</Text>
        <Text>Syn:</Text>
        <Text>lawyer</Text>
        <Text style={styles.translation}>2) адвокат</Text>
      </View>
    </View>
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
    marginTop: 10,
    color: "#1860e0",
  },
  transcription: {
    marginVertical: 10,
    color: "#742122",
  },
  characteristics: {
    color: "#448a3b",
    fontStyle: "italic",
    marginBottom: 3,
  },
  translations: {
    paddingLeft: 15,
    gap: 3,
  },
  translation: {
    fontSize: 15,
  },
  sentence: {
    color: "gray",
    fontSize: 13.5,
  },
});

export default WordTranslation;
