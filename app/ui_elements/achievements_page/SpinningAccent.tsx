import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View, ViewStyle } from "react-native";

interface SpinningAccentProps {
  style?: ViewStyle;
}

const SpinningAccent: React.FC<SpinningAccentProps> = ({ style }) => {
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

  return (
    <View>
      <Animated.View
        style={[styles.spinner, { transform: [{ rotate: spin }] }, style]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  spinner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "transparent",
    borderStyle: "solid",
    borderTopColor: "red",
    borderBottomColor: "blue",
  },
});

export default SpinningAccent;
