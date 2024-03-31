import { Text, View, StyleSheet } from "react-native";

interface Props {
  word: string;
  translations: string;
}

const WordCellInList: React.FC<Props> = ({ word, translations }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.word}>{word}</Text>
      <Text style={styles.translations}>{translations}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingLeft: 13,
  },
  word: { fontSize: 16 },
  translations: { fontSize: 14, color: "gray" },
});

export default WordCellInList;
