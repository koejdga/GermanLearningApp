import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Progress from "../ui_elements/drag_drop_game/Progress";
import Achievement from "./Achievement";

const Achievements = () => {
  return (
    <ScrollView>
      <Achievement title="30 нових слів" totalAmount={30} currentAmount={10} />
      <Achievement
        title="5 виконаних вправ"
        totalAmount={5}
        currentAmount={1}
      />
      <Achievement
        title="5 ідеально виконаних вправ"
        totalAmount={30}
        currentAmount={10}
      />
    </ScrollView>
  );
};

export default Achievements;
