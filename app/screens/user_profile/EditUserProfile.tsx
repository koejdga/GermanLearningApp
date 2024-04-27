import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Fire from "../../ui_elements/account_page/Fire";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import DatePicker from "react-native-date-picker";
import {
  GestureHandlerRootView,
  RectButton,
} from "react-native-gesture-handler";
import { validateBirthdate, validateEmail } from "../../Utils";

// TODO: add this link to literature materials
// https://www.abstractapi.com/guides/react-native-email-validation

const USER_IMAGE_SIZE = 158;
const ICON_SIZE = 35;
const SECONDARY_INFO_COLOR = "#575757";
const EDIT_COLOR = "#7C7BBC";

const styles = StyleSheet.create({
  container: {
    gap: 22,
    flex: 1,
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
  button: {
    backgroundColor: "#15AB76",
    width: "45%",
    height: 45,
    borderRadius: 20,
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

// TODO: move it somewhere maybe, don't know where exactly

const EditUserProfile = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date());
  const [openDatepicker, setOpenDatepicker] = useState(false);

  const [emailMessage, setEmailMessage] = useState({ message: "" });
  const [dateMessage, setDateMessage] = useState({ message: "" });

  const [emailModalWasShown, setEmailModalWasShown] = useState(false);
  const [dateModalWasShown, setDateModalWasShown] = useState(false);

  const saveChanges = async () => {
    setEmailMessage({ message: "" });
    setDateMessage({ message: "" });

    let allValidationsPassed = true;

    const emailValidation = await validateEmail(email);
    if (
      emailValidation.isValid &&
      emailValidation.autocorrect &&
      !emailModalWasShown
    ) {
      Alert.alert(
        `Можливо, ви мали на увазі ${emailValidation.autocorrect}?`,
        "",
        [
          {
            text: `Так, змінити на ${emailValidation.autocorrect}`,
            onPress: () => setEmail(emailValidation.autocorrect),
          },
          {
            text: `Ні, залишити ${email}`,
            style: "cancel",
          },
        ]
      );
      setEmailModalWasShown(true);
      allValidationsPassed = false;
    }
    if (!emailValidation.isValid && !emailValidation.autocorrect) {
      if (!emailValidation.autocorrect) {
        setEmailMessage({
          message: "Введіть правильну поштову адресу",
        });
      } else {
        setEmailMessage({
          message: `Не правильна поштова адреса. Можливо, ви мали на увазі ${emailValidation.autocorrect}?`,
        });
      }
      allValidationsPassed = false;
    }

    const birthdateValidation = validateBirthdate(date);
    if (birthdateValidation.isInFuture) {
      setDateMessage({
        message: "Дата народження не може бути в майбутньому",
      });
      allValidationsPassed = false;
    }
    if (birthdateValidation.isStrangeAge && !dateModalWasShown) {
      const yearWord =
        birthdateValidation.isStrangeAge % 10 === 1
          ? "рік"
          : [2, 3, 4].includes(birthdateValidation.isStrangeAge % 10)
          ? "роки"
          : "років";
      Alert.alert(
        `Вам дійсно ${birthdateValidation.isStrangeAge} ${yearWord}?`,
        "",
        [
          {
            text: `Так, мені ${birthdateValidation.isStrangeAge}`,
          },
          {
            text: "Ні, я хочу змінити свій вік",
            onPress: () => (allValidationsPassed = false),
            style: "cancel",
          },
        ]
      );
      setDateModalWasShown(true);
    }

    if (allValidationsPassed) {
      // TODO: edit entry in database (firebase)
      console.log("edit entry in database (firebase)");
      navigation.navigate("UserProfile");
    }
  };

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
      <View style={{ paddingHorizontal: 24, gap: 20, flex: 1 }}>
        <View>
          <TextInput
            placeholder="test@gmail.com"
            label="Пошта"
            value={email}
            onChangeText={(text) => setEmail(text)}
            mode="outlined"
            error={emailMessage.message !== ""}
            left={
              <TextInput.Icon
                icon={() => (
                  <Ionicons
                    name="mail-outline"
                    size={ICON_SIZE - 5}
                    color={SECONDARY_INFO_COLOR}
                  />
                )}
              />
            }
          />
          {emailMessage.message && (
            <View style={[styles.iconAndText, { marginTop: 8, gap: 5 }]}>
              <Ionicons name="warning-outline" size={24} color={"#b3271e"} />
              <Text>{emailMessage.message}</Text>
            </View>
          )}
        </View>
        <View>
          <TextInput
            mode="outlined"
            value={date.toLocaleDateString("uk-UA")}
            error={dateMessage.message !== ""}
            onPressIn={() => setOpenDatepicker(true)}
            left={
              <TextInput.Icon
                icon={() => (
                  <Ionicons
                    name="calendar-outline"
                    size={ICON_SIZE - 5}
                    color={SECONDARY_INFO_COLOR}
                  />
                )}
                onPress={() => setOpenDatepicker(true)}
              />
            }
          />
          {dateMessage.message && (
            <View style={[styles.iconAndText, { marginTop: 8, gap: 5 }]}>
              <Ionicons name="warning-outline" size={24} color={"#b3271e"} />
              <Text>{dateMessage.message}</Text>
            </View>
          )}
        </View>

        <DatePicker
          modal
          open={openDatepicker}
          date={date}
          mode="date"
          onConfirm={(date) => {
            setOpenDatepicker(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpenDatepicker(false);
          }}
        />

        <View style={{ flex: 1 }}></View>
        <GestureHandlerRootView style={{ alignItems: "center" }}>
          <RectButton
            style={[
              styles.button,
              { backgroundColor: EDIT_COLOR, width: "65%" },
            ]}
            onPress={saveChanges}
          >
            <Text style={styles.label}>ЗБЕРЕГТИ</Text>
          </RectButton>
          <RectButton
            style={[
              styles.button,
              { backgroundColor: "#B7B6D9", width: "65%" },
            ]}
            onPress={() => navigation.navigate("UserProfile")}
          >
            <Text style={styles.label}>СКАСУВАТИ</Text>
          </RectButton>
        </GestureHandlerRootView>
      </View>
    </View>
  );
};

export default EditUserProfile;