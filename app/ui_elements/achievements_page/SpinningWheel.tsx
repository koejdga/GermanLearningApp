import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Stop,
  Path,
  G,
} from "react-native-svg";

const SpinningWheel = ({ size = 200, strokeWidth = 20, gradients = [] }) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const sections = gradients.map((gradient, index) => {
    const startAngle = (index * 360) / gradients.length;
    const endAngle = ((index + 1) * 360) / gradients.length;
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

    return (
      <Path
        key={index}
        d={`M${size / 2},${size / 2} L${size / 2},${strokeWidth / 2} A${
          size / 2 - strokeWidth / 2
        },${size / 2 - strokeWidth / 2} 0 ${largeArcFlag},0 ${
          Math.cos((startAngle * Math.PI) / 180) *
            (size / 2 - strokeWidth / 2) +
          size / 2
        },${
          Math.sin((startAngle * Math.PI) / 180) *
            (size / 2 - strokeWidth / 2) +
          size / 2
        } L${size / 2},${size / 2} Z`}
        fill={`url(#gradient-${index})`}
      />
    );
  });

  const gradientDefs = gradients.map((gradient, index) => {
    return (
      <LinearGradient
        key={index}
        id={`gradient-${index}`}
        x1="0%"
        y1="0%"
        x2="0%"
        y2="100%"
      >
        {gradient.stops.map((stop, stopIndex) => (
          <Stop
            key={stopIndex}
            offset={stop.offset}
            stopColor={stop.color}
            stopOpacity={stop.opacity}
          />
        ))}
      </LinearGradient>
    );
  });

  return (
    <Animated.View
      style={[styles.container, { transform: [{ rotate: spin }] }]}
    >
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>{gradientDefs}</Defs>
        <G>
          {sections}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - strokeWidth / 2}
            fill="transparent"
            stroke="black"
            strokeWidth={strokeWidth}
          />
        </G>
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SpinningWheel;
