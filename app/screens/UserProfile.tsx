import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Fire from "../ui_elements/account_page/Fire";

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

const UserProfile = () => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <Ionicons
          name="person-circle-outline"
          size={USER_IMAGE_SIZE}
          color={"#C7C7C7"}
        />
        <View style={styles.userNameAndScore}>
          <Text style={styles.userName}>Mariia</Text>
          <View style={[styles.iconAndText, { gap: 3 }]}>
            <Fire />
            <Text style={styles.score}>100</Text>
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
          <Text style={{ color: SECONDARY_INFO_COLOR }}>test4@gmail.com</Text>
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
          <Text style={{ color: SECONDARY_INFO_COLOR }}>27.04.2024</Text>
        </View>

        <View
          style={[
            styles.iconAndText,
            {
              gap: 5,
              marginTop: 42,
            },
          ]}
        >
          <Ionicons name="create-outline" size={ICON_SIZE} color={EDIT_COLOR} />
          <Text style={{ color: EDIT_COLOR, textDecorationLine: "underline" }}>
            редагувати профіль
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UserProfile;
