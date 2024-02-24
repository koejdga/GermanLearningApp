import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface MyButtonProps {
  text: string;
  backgroundColor: string;
  color: string;
  onPress: () => void;
  disabled: boolean;
  disabledBgColor: string;
}

const MyButton: React.FC<MyButtonProps> = ({
  text,
  backgroundColor,
  color,
  onPress,
  disabled,
  disabledBgColor,
}) => (
  <TouchableOpacity
    style={[
      styles.button,
      { backgroundColor: disabled ? disabledBgColor : backgroundColor },
    ]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={[styles.text, { color }]}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 6,
  },
  text: {
    fontSize: 24,
    fontFamily: "Roboto_500Medium",
  },
});

export default MyButton;
