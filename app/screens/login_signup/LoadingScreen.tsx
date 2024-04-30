import { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserContext } from "../../UserContext";
import { loggedInUserToUserInfo } from "../../DatabaseQueries";

export const LoadingScreen = () => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const { setUser } = useContext(UserContext);

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setTimeout(async () => {
      if (user) {
        const userInfo = await loggedInUserToUserInfo(user);
        setUser(userInfo);
        nav.replace("MainApp");
      } else {
        setUser(null);
        nav.replace("Login");
      }
    }, 100);
  }

  useEffect(() => {
    const sub = auth().onAuthStateChanged(onAuthStateChanged);
    return sub;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Loading</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  loadingText: {
    fontSize: 70,
    fontWeight: "200",
    textAlign: "center",
  },
});
