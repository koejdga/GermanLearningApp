import { View, StyleSheet, Pressable } from "react-native";
import { darkColor } from "../config/Colors";

interface Props {
  style?: object;
  onGoToHomePage: () => void;
  onGoToDictPage: () => void;
}

const Navigation: React.FC<Props> = ({
  style,
  onGoToHomePage,
  onGoToDictPage,
}) => {
  return (
    <View style={[{ width: "100%" }, style]}>
      <View style={styles.line}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomView: {
    height: "auto",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  line: {
    height: 1,
    width: "83%",
    backgroundColor: darkColor,
    alignSelf: "center",
    marginBottom: 15,
  },
});

export default Navigation;
