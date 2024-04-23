import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./HomePage";
import DragDropGame from "./DragDropGame";
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="DragDropGame" component={DragDropGame} />
    </Stack.Navigator>
  );
};

export default HomeStack;
