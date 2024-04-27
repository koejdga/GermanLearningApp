import { View, Text } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Progress from "../ui_elements/drag_drop_game/Progress";

const ICON_SIZE = 29;

const Achievement = ({ title, totalAmount, currentAmount }) => {
  const [iconCoords, setIconCoords] = useState({ x: 0, y: 0 });
  return (
    <View
      style={{
        backgroundColor: "white",
        marginHorizontal: 16,
        marginTop: 16,
        padding: 10,
        borderRadius: 10,
        flexDirection: "row",
        gap: 10,
        borderWidth: 0.5,
        borderColor: "lightgray",
      }}
    >
      <Ionicons
        name="happy-outline"
        size={ICON_SIZE}
        onLayout={({
          nativeEvent: {
            layout: { x, y },
          },
        }) => {
          setIconCoords({ x, y });
        }}
      ></Ionicons>
      <View
        style={{
          width: ICON_SIZE - 2,
          aspectRatio: 1,
          backgroundColor: "gold",
          position: "absolute",
          top: iconCoords.x,
          left: iconCoords.y,
          zIndex: -1,
          borderRadius: ICON_SIZE / 2,
        }}
      ></View>
      <View style={{ gap: 10, flex: 1 }}>
        <Text style={{ fontSize: 18 }}>{title}</Text>
        <Progress currentAmount={currentAmount} totalAmount={totalAmount} />
      </View>
    </View>
  );
};

export default Achievement;
