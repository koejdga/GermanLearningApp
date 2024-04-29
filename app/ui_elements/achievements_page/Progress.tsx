import { useState } from "react";
import { View } from "react-native";

const HEIGHT = 15;
const BORDER_RADIUS = 10;

const Progress = ({ currentAmount, totalAmount }) => {
  const [progressWidth, setProgressWidth] = useState(0);

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#E4E4E4",
        height: HEIGHT,
        borderRadius: BORDER_RADIUS,
      }}
      onLayout={({
        nativeEvent: {
          layout: { width },
        },
      }) => {
        setProgressWidth(width);
      }}
    >
      <View
        style={{
          backgroundColor: "#58CC00",
          width: (progressWidth * currentAmount) / totalAmount,
          height: HEIGHT,
          borderRadius: BORDER_RADIUS,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#7AD633",
            height: HEIGHT / 2.5,
            borderRadius: BORDER_RADIUS,
            width: (progressWidth * currentAmount) / totalAmount - 20,
          }}
        ></View>
      </View>
    </View>
  );
};

export default Progress;
