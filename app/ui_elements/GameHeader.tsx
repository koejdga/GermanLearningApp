import { Text, View, StyleSheet } from "react-native";
import Heart from "./Heart";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 28,
    justifyContent: "space-between",
    alignItems: "center",
  },
  hearts: {
    height: "auto",
    flexDirection: "row",
    gap: 10,
    marginLeft: 20,
  },
  score: {
    marginRight: 20,
    fontSize: 24,
    fontFamily: "Roboto_500Medium",
  },
});

const GameHeader = ({ amountOfHearts, score }) => {
  return (
    <View style={styles.row}>
      <View style={styles.hearts}>
        {[...Array(amountOfHearts)].map((_, index) => (
          <Heart key={"heart" + index} />
        ))}
      </View>
      <Text style={styles.score}>{score}</Text>
    </View>
  );
};

export default GameHeader;
