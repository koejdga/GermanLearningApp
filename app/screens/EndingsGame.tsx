// tsrnfs

import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
// import {
//   GestureDetector,
//   Gesture,
//   GestureHandlerRootView,
// } from "react-native-gesture-handler";

type Props = {};

const EndingsGame = (props: Props) => {
  const emptyInputColor = "lightgrey";
  const disabledInputColor = "red";
  const filledInputColor = "";
  const correctInputColor = "";
  const wrongInputColor = "";

  const [number, setNumber] = useState("");
  const [number2, setNumber2] = useState("");
  const [editable, setEditable] = useState(true);
  const [inputColor, setInputColor] = useState(emptyInputColor);

  // const tap = Gesture.Tap()
  // .numberOfTaps(1)
  // .onStart(() => {
  //   console.log("hello");
  // setEditable(!editable);
  // setInputColor(
  //   inputColor === disabledInputColor ? emptyInputColor : disabledInputColor
  // );
  // });

  return (
    <View style={styles.container}>
      <Text>fffofo</Text>
      <TextInput />
      {/* <View style={styles.textBox}>
        <Text style={{ fontSize: 18 }}>Ich habe ein</Text>
        <TextInput
          style={[styles.textInput, { backgroundColor: inputColor }]}
          onChangeText={setNumber}
          value={number}
          maxLength={3}
        />
        <Text style={{ fontSize: 18 }}> Hund. Er ist nett</Text>

        <GestureHandlerRootView>
          <GestureDetector gesture={tap}>
            <TextInput
              style={[styles.textInput, { backgroundColor: inputColor }]}
              onChangeText={setNumber2}
              value={number2}
              maxLength={3}
              editable={editable}
            />
          </GestureDetector>
        </GestureHandlerRootView>

        <Text style={{ fontSize: 18 }}>.</Text>
      </View>
      <View style={styles.spacer}></View>
      <Button title="Готово"></Button> */}
    </View>
  );
};

export default EndingsGame;

const styles = StyleSheet.create({
  container: { flex: 1 },
  textBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginHorizontal: 20,
  },
  textInput: {
    width: 40,
    fontSize: 18,
    borderRadius: 2,
  },
  spacer: {
    marginTop: "90%",
  },
  button: {},
});
