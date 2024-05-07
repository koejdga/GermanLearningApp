import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  AchievementsContext,
  AchievementsProvider,
} from "./app/AchievementsContext";
import { DictProvider } from "./app/DictContext";
import { UserProvider } from "./app/UserContext";
import Achievements from "./app/screens/achievements/Achievements";
import DictionaryStack from "./app/screens/dictionary/DictionaryStack";
import HomeStack from "./app/screens/home/HomeStack";
import { LoadingScreen } from "./app/screens/login_signup/LoadingScreen";
import { Login } from "./app/screens/login_signup/Login";
import { Register } from "./app/screens/login_signup/Register";
import { handleLogout } from "./app/screens/user_profile/UserProfile";
import UserProfileStack from "./app/screens/user_profile/UserProfileStack";

enum Screen {
  ArticleGame,
  HomePage,
  Dictionary,
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainApp() {
  const { newAchievementsAmount, setNewAchievementsAmount } =
    useContext(AchievementsContext);

  enum TabNames {
    HOME = "HomeStack",
    DICTIONARY = "Dictionary",
    ACHIEVEMENTS = "Achievements",
    ACCOUNT = "Account",
  }

  const [nextTapAsBadgeRemover, setNextTapAsBadgeRemover] = useState(false);
  const removeBadge = () => {
    if (nextTapAsBadgeRemover) {
      setNewAchievementsAmount(0);
      setNextTapAsBadgeRemover(false);
    }
  };

  return (
    <DictProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            switch (route.name) {
              case TabNames.HOME:
                return focused ? (
                  <Ionicons name="home" size={size} color={color} />
                ) : (
                  <Ionicons name="home-outline" size={size} color={color} />
                );
              case TabNames.DICTIONARY:
                return focused ? (
                  <Ionicons name="bookmarks" size={size} color={color} />
                ) : (
                  <Ionicons
                    name="bookmarks-outline"
                    size={size}
                    color={color}
                  />
                );
              case TabNames.ACHIEVEMENTS:
                return focused ? (
                  <Ionicons name="trophy" size={size} color={color} />
                ) : (
                  <Ionicons name="trophy-outline" size={size} color={color} />
                );
              case TabNames.ACCOUNT:
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
        screenListeners={{ tabPress: () => removeBadge() }}
      >
        <Tab.Screen
          name={TabNames.HOME}
          component={HomeStack}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name={TabNames.DICTIONARY}
          component={DictionaryStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={TabNames.ACHIEVEMENTS}
          component={Achievements}
          options={
            newAchievementsAmount > 0
              ? {
                  headerTitle: "Досягнення",
                  tabBarBadge: newAchievementsAmount,
                }
              : { headerTitle: "Досягнення" }
          }
          listeners={{
            tabPress: () => setNextTapAsBadgeRemover(newAchievementsAmount > 0),
          }}
        />
        <Tab.Screen
          name={TabNames.ACCOUNT}
          component={UserProfileStack}
          options={{
            headerTitle: "Акаунт",
            headerRight: () => (
              <TouchableOpacity
                onPress={handleLogout}
                style={{ backgroundColor: "#fff", padding: 10 }}
              >
                <Ionicons name="enter-outline" size={24} color="#000" />
              </TouchableOpacity>
            ),
          }}
        />
      </Tab.Navigator>
    </DictProvider>
  );
}

export default function App() {
  return (
    <AchievementsProvider>
      <UserProvider>
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
              name="MainApp"
              component={MainApp}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </AchievementsProvider>
  );
}

const backgrounds = {
  [Screen.HomePage]: "#FEFCFF",
  [Screen.ArticleGame]: "#fff8f5",
  [Screen.Dictionary]: "lightblue",
  // [Screen.ArticleGame]: "#fdd8d6",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
