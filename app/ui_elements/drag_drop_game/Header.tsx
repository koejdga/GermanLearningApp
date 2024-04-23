import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import Cross from "./Cross";
import Progress from "./Progress";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    fontFamily: "Nunito-Bold",
    fontSize: 24,
    paddingLeft: 16,
  },
});

const Header = () => {
  return (
    <View>
      <View style={styles.row}>
        <Cross />
        <Progress />
        <Icon name="heart" size={24} color="#CD2424" />
      </View>
      <Text style={styles.title}>Translate this sentence</Text>
    </View>
  );
};

export default Header;
