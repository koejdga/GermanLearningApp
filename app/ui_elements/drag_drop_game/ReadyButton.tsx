import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#59CB01",
    // width: "100%",
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
  // const insets = useSafeAreaInsets();
  return (
    <RectButton style={styles.button} onPress={onPress}>
      <Text style={styles.label}>ГОТОВО</Text>
    </RectButton>
    // <View
    //   style={{
    //     // paddingBottom: insets.bottom,
    //     alignItems: "center",
    //     margin: 16,
    //   }}
    // >
    // {/* <View
    //   style={{
    //     backgroundColor: "#1B9A00",
    //     borderRadius: 16,
    //     height: 50,
    //     // ...StyleSheet.absoluteFillObject,
    //   }}
    // /> */}
    // <RectButton style={styles.button} onPress={onPress}>
    //   <Text style={styles.label}>ГОТОВО</Text>
    // </RectButton>
    // {/* </View> */}
  );
};

export default ReadyButton;
