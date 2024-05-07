import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import Svg, {
  Defs,
  Rect,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg";

const FROM_COLOR = "red";
const TO_COLOR = "yellow";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface Props {
  style?: ViewStyle;
}

const Background: React.FC<Props> = ({ style }) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View
      style={[StyleSheet.absoluteFillObject, { overflow: "hidden" }, style]}
    >
      <Animated.View
        style={[styles.container, { transform: [{ rotate: spin }] }]}
      >
        <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT}>
          <Defs>
            <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0" stopColor={FROM_COLOR} />
              <Stop offset="1" stopColor={TO_COLOR} />
            </LinearGradient>
            <ClipPath id="clip">
              <Rect x={0} y={0} width={SCREEN_WIDTH} height={SCREEN_HEIGHT} />
            </ClipPath>
          </Defs>
          <Rect
            width={SCREEN_WIDTH}
            height={SCREEN_HEIGHT}
            fill="url(#grad)"
            clipPath="url(#clip)"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Background;
