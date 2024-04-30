import { Ionicons } from "@expo/vector-icons";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { UserContext, UserProvider } from "./app/UserContext";
import Achievements from "./app/screens/achievements/Achievements";
import Dictionary from "./app/screens/dictionary/Dictionary";
import HomeStack from "./app/screens/home/HomeStack";
import { LoadingScreen } from "./app/screens/login_signup/LoadingScreen";
import { Login } from "./app/screens/login_signup/Login";
import { Register } from "./app/screens/login_signup/Register";
import UserProfileStack from "./app/screens/user_profile/UserProfileStack";
import { loggedInUserToUserInfo } from "./app/DatabaseQueries";
import { useContext, useEffect } from "react";
import { handleLogout } from "./app/screens/user_profile/UserProfile";

enum Screen {
  ArticleGame,
  HomePage,
  Dictionary,
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainApp() {
  enum TabNames {
    HOME = "HomeStack",
    DICTIONARY = "Dictionary",
    ACHIEVEMENTS = "Achievements",
    ACCOUNT = "Account",
  }

  return (
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
                <Ionicons name="bookmarks-outline" size={size} color={color} />
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
        component={Dictionary}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={TabNames.ACHIEVEMENTS}
        component={Achievements}
        options={{ headerTitle: "Досягнення" }}
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
        // options={{
        //   headerTitle: "Акаунт",
        //   headerRight: () => (
        //     <TouchableOpacity
        //       onPress={() =>
        //         Alert.alert("Ви дійсно хочете вийти?", "", [
        //           {
        //             text: "Так, вийти з акаунта",
        //             onPress: async () => {
        //               console.log("signing out");
        //               await auth().signOut();
        //             },
        //           },
        //           {
        //             text: "Ні, залишитиcя в акаунті",
        //             style: "cancel",
        //           },
        //         ])
        //       }
        //       style={{ backgroundColor: "#fff", padding: 10 }}
        //     >
        //       <Ionicons name="enter-outline" size={24} color="#000" />
        //     </TouchableOpacity>
        //   ),
        // }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
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
