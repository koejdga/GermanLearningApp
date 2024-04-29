import { StyleSheet, View } from "react-native";
import { NUMBER_OF_LINES, WORD_HEIGHT } from "./Layout";

const Lines = () => {
  return (
    <View>
      {new Array(NUMBER_OF_LINES).fill(0).map((_, index) => (
        <View
          key={index * WORD_HEIGHT}
          style={{
            top: index * WORD_HEIGHT - 2,
            width: "100%",
            height: 2,
            backgroundColor: "#E6E5E6",
          }}
        />
      ))}
    </View>
  );
};

export default Lines;
