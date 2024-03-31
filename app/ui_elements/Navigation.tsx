import { View, StyleSheet, Pressable } from "react-native";
import Account from "../ui_elements/icons/Account";
import FontBook from "../ui_elements/icons/FontBook";
import HomePage from "../ui_elements/icons/HomePage";
import Trophy from "../ui_elements/icons/Trophy";
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
      <View style={styles.bottomView}>
        <Pressable onPress={() => onGoToHomePage()}>
          <HomePage />
        </Pressable>

        <Pressable>
          <FontBook onPress={() => onGoToDictPage()} />
        </Pressable>

        <Pressable>
          <Trophy />
        </Pressable>

        <Pressable>
          <Account />
        </Pressable>
      </View>
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
