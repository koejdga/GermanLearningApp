import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import ArticleGameRound from "./app/screens/ArticleGameRound";
import { useEffect, useState } from "react";
import ArticleGame from "./app/screens/ArticleGame";
import HomePage from "./app/screens/HomePage";
import Navigation from "./app/ui_elements/Navigation";
import Dictionary from "./app/screens/Dictionary";
import WordTranslation from "./app/screens/WordTranslation";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

enum Screen {
  ArticleGame,
  HomePage,
  Dictionary,
}

const Tab = createBottomTabNavigator();

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
                  <Ionicons
                    name="bookmarks-outline"
                    size={size}
                    color={color}
                  />
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
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen
          name="Dictionary"
          component={Dictionary}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Achievements" component={Dictionary} />
        <Tab.Screen name="Account" component={Dictionary} />
      </Tab.Navigator>
    </NavigationContainer>
    // <View style={[styles.container, { backgroundColor: backgrounds[screen] }]}>
    //   <SafeAreaView style={[styles.container]}>
    //     <View style={styles.container}>
    //       {screen == Screen.ArticleGame && <ArticleGame />}
    //       {screen == Screen.HomePage && (
    //         <HomePage onGameStart={handleGameStart} />
    //       )}
    //       {screen == Screen.Dictionary && <WordTranslation />}
    //     </View>
    //     <Navigation
    //       onGoToHomePage={handleGoToHomePage}
    //       onGoToDictPage={handleGoToDictPage}
    //     />
    //   </SafeAreaView>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
