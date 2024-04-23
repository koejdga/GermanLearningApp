import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet } from "react-native";
import Dictionary from "./app/screens/Dictionary";
import HomePage from "./app/screens/HomePage";
import { LoadingScreen } from "./app/screens/LoadingScreen";
import { Login } from "./app/screens/Login";
import { Register } from "./app/screens/Register";
import EndingsGame from "./app/screens/EndingsGame";
import ArticleGame from "./app/screens/ArticleGame";

enum Screen {
  ArticleGame,
  HomePage,
  Dictionary,
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "Home":
              return focused ? (
                <Ionicons name="home" size={size} color={color} />
              ) : (
                <Ionicons name="home-outline" size={size} color={color} />
              );
            case "Dictionary":
              return focused ? (
                <Ionicons name="bookmarks" size={size} color={color} />
              ) : (
                <Ionicons name="bookmarks-outline" size={size} color={color} />
              );
            case "Achievements":
              return focused ? (
                <Ionicons name="trophy" size={size} color={color} />
              ) : (
                <Ionicons name="trophy-outline" size={size} color={color} />
              );
            case "Account":
              return focused ? (
                <Ionicons name="person" size={size} color={color} />
              ) : (
                <Ionicons name="person-outline" size={size} color={color} />
              );
          }
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "black",
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Home" component={EndingsGame} />
      {/* <Tab.Screen name="Home" component={HomePage} /> */}
      <Tab.Screen
        name="Dictionary"
        component={Dictionary}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Achievements" component={Dictionary} />
      <Tab.Screen name="Account" component={Dictionary} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [screen, setScreen] = useState(Screen.HomePage);

  const backgrounds = {
    [Screen.HomePage]: "#FEFCFF",
    [Screen.ArticleGame]: "#fff8f5",
    [Screen.Dictionary]: "lightblue",
    // [Screen.ArticleGame]: "#fdd8d6",
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoadingScreen"
          component={LoadingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Main"
          component={MainApp}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
