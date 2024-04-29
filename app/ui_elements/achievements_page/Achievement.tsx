import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View } from "react-native";
import Progress from "./Progress";

const ICON_SIZE = 29;

interface Props {
  title: string;
  totalAmount?: number;
  currentAmount?: number;
  completed?: boolean;
}

const Achievement: React.FC<Props> = ({
  title,
  totalAmount,
  currentAmount,
  completed,
}) => {
  const [iconCoords, setIconCoords] = useState({ x: 0, y: 0 });

  const defaultValue = 10;

  const validateCurrentAmount = () => {
    if (!currentAmount) {
      return defaultValue;
    }

    if (currentAmount > (totalAmount || defaultValue)) {
      console.log(
        "ERROR: current amount is greater than total amount in Achievement component"
      );
      return totalAmount;
    }

    return completed ? defaultValue : currentAmount || 0;
  };

  const validateTotalAmount = () => {
    if (!totalAmount) {
      return defaultValue;
    }

    return completed ? defaultValue : totalAmount || defaultValue;
  };

  return (
    <View
      style={{
        backgroundColor: completed ? "#D8FFF2" : "white",
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
        <Progress
          currentAmount={validateCurrentAmount()}
          totalAmount={validateTotalAmount()}
        />
      </View>
    </View>
  );
};

export default Achievement;
