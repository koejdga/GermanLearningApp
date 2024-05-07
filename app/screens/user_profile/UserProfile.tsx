import { Ionicons } from "@expo/vector-icons";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useContext, useEffect } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { UserContext } from "../../UserContext";
import Fire from "../../ui_elements/account_page/Fire";
import ProgressBar from "../../ui_elements/account_page/ProgressBar";

const USER_IMAGE_SIZE = 158;
const ICON_SIZE = 35;
const SECONDARY_INFO_COLOR = "#575757";
const EDIT_COLOR = "#7C7BBC";

const styles = StyleSheet.create({
  container: {
    gap: 22,
  },
  userNameAndScore: { gap: 16 },
  userName: {
    fontSize: 32,
    marginTop: 15,
  },
  iconAndText: {
    flexDirection: "row",
    alignItems: "center",
  },
  score: {
    fontSize: 20,
  },
});

export const handleLogout = async () => {
  Alert.alert("Ви дійсно хочете вийти?", "", [
    {
      text: "Так, вийти з акаунта",
      onPress: async () => {
        console.log("signing out");
        await auth().signOut();
      },
    },
    {
      text: "Ні, залишитиcя в акаунті",
      style: "cancel",
    },
  ]);
};

const UserProfile = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    if (!user) {
      setUser(null);
      navigation.replace("Login");
    }
  }

  console.log(user);

  useEffect(() => {
    const sub = auth().onAuthStateChanged(onAuthStateChanged);
    return sub;
  }, []);

  return (
    <>
      {!user && <Text>no user :(</Text>}
      {user && (
        <SafeAreaView style={styles.container}>
          <View style={{ flexDirection: "row", width: "100%" }}>
            {user.avatar && (
              <Image
                style={{
                  width: USER_IMAGE_SIZE - 20,
                  aspectRatio: 1,
                  borderRadius: (USER_IMAGE_SIZE - 20) / 2,
                  margin: 10,
                }}
                source={{
                  uri: user.avatar,
                }}
              />
            )}
            {!user.avatar && (
              <Ionicons
                name="person-circle-outline"
                size={USER_IMAGE_SIZE}
                color={"#C7C7C7"}
              />
            )}

            <View style={styles.userNameAndScore}>
              <Text style={styles.userName}>{user.username}</Text>
              <View style={[styles.iconAndText, { gap: 3 }]}>
                <Fire />
                <Text style={styles.score}>{user.total_score}</Text>
              </View>
            </View>
          </View>
          <View style={{ paddingHorizontal: 24, marginBottom: 40 }}>
            <View
              style={[
                styles.iconAndText,
                {
                  gap: 18,
                },
              ]}
            >
              <Ionicons
                name="mail-outline"
                size={ICON_SIZE}
                color={SECONDARY_INFO_COLOR}
              />
              <Text style={{ color: SECONDARY_INFO_COLOR }}>{user.email}</Text>
            </View>

            <View
              style={[
                styles.iconAndText,
                {
                  gap: 18,
                  marginTop: 12,
                },
              ]}
            >
              <Ionicons
                name="calendar-outline"
                size={ICON_SIZE}
                color={SECONDARY_INFO_COLOR}
              />
              <Text style={{ color: SECONDARY_INFO_COLOR }}>
                {user.birthdate.toLocaleDateString("uk-UA")}
              </Text>
            </View>

            <Pressable onPress={() => navigation.navigate("EditUserProfile")}>
              <View
                style={[
                  styles.iconAndText,
                  {
                    gap: 5,
                    marginTop: 42,
                  },
                ]}
              >
                <Ionicons
                  name="create-outline"
                  size={ICON_SIZE}
                  color={EDIT_COLOR}
                />
                <Text
                  style={{ color: EDIT_COLOR, textDecorationLine: "underline" }}
                >
                  редагувати профіль
                </Text>
              </View>
            </Pressable>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default UserProfile;
