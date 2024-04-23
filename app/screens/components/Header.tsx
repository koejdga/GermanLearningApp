import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import Cross from "./Cross";
import Heart from "./Heart";
import Progress from "./Progress";
import Character from "./Character";

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
        {/* <Heart /> */}
      </View>
      <Text style={styles.title}>Translate this sentence</Text>
      <Character />
    </View>
  );
};

export default Header;
