import { View } from "react-native";
import Svg, { Rect } from "react-native-svg";

export default function ProgressBar({ progress, width }) {
  const progressWidth = (progress / 100) * width;

  return (
    <View>
      <Svg width={width} height="7">
        <Rect width={width} height={"100%"} fill={"#ccc"} rx={3.5} ry={3.5} />
        <Rect
          width={progressWidth}
          height={"100%"}
          fill={"#3478F6"}
          rx={3.5}
          ry={3.5}
        />
      </Svg>
    </View>
  );
}
