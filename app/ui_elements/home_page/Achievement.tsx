import { View, StyleSheet, Text } from "react-native";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  description: string;
}

const Achievement: React.FC<Props> = ({ description }) => {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.trophyContainer}>
        <Ionicons name="trophy" size={24} color={"black"} />
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#666666",
    borderWidth: 1,
    padding: 14,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 26,
    backgroundColor: "white",
  },
  trophyContainer: {
    backgroundColor: "rgba(205, 127, 50, 0.7)",
    borderRadius: 13,
    padding: 1,
  },
  description: {
    fontFamily: "Roboto_400Regular",
    fontSize: 23,
  },
});

export default Achievement;
