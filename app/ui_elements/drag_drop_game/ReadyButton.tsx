import React from "react";
import { StyleSheet, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#59CB01",
    height: 45,
    borderRadius: 16,
    justifyContent: "center",
    marginHorizontal: 16,
    marginBottom: 20,
  },
  label: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Nunito-Bold",
    textTransform: "uppercase",
  },
});

interface ReadyButtonProps {
  onPress?: () => void;
}

const ReadyButton: React.FC<ReadyButtonProps> = ({ onPress }) => {
  return (
    <RectButton style={styles.button} onPress={onPress}>
      <Text style={styles.label}>ГОТОВО</Text>
    </RectButton>
  );
};

export default ReadyButton;
