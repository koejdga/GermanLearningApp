import { Ionicons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DatePicker from "react-native-date-picker";
import {
  GestureHandlerRootView,
  RectButton,
} from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import { updateUser } from "../../DatabaseQueries";
import { UserContext } from "../../UserContext";
import { validateBirthdate, validateEmail } from "../../Utils";
import Spacer from "../../ui_elements/Spacer";
import storage from "@react-native-firebase/storage";
import ProgressBar from "../../ui_elements/account_page/ProgressBar";

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

// TODO: put this in resouces
// https://github.com/betomoedano/React-Native-Firebase-Storage/blob/main/screens/Home.js

const EditUserProfile = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const [userToEdit, setUserToEdit] = useState(user);
  const [openDatepicker, setOpenDatepicker] = useState(false);
  const [progress, setProgress] = useState(0);

  const [usernameMessage, setUsernameMessage] = useState({ message: "" });
  const [emailMessage, setEmailMessage] = useState({ message: "" });
  const [dateMessage, setDateMessage] = useState({ message: "" });

  const [emailModalWasShown, setEmailModalWasShown] = useState(false);
  const [dateModalWasShown, setDateModalWasShown] = useState(false);

  const [uploadingImage, setUploadingImage] = useState(false);

  const saveChanges = async () => {
    setUsernameMessage({ message: "" });
    setEmailMessage({ message: "" });
    setDateMessage({ message: "" });

    let allValidationsPassed = true;

    if (user.username != userToEdit.username) {
      if (userToEdit.username === "") {
        setUsernameMessage({ message: "Імʼя не може бути пустим" });
        allValidationsPassed = false;
      }
    }

    if (user.email != userToEdit.email) {
      const emailValidation = await validateEmail(userToEdit.email);
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
              onPress: () =>
                setUserToEdit({
                  ...userToEdit,
                  email: emailValidation.autocorrect,
                }),
            },
            {
              text: `Ні, залишити ${userToEdit.email}`,
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
    }

    if (user.birthdate != userToEdit.birthdate) {
      const birthdateValidation = validateBirthdate(userToEdit.birthdate);

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
    }

    if (allValidationsPassed) {
      await updateUser(userToEdit);
      setUser(userToEdit);
      navigation.navigate("UserProfile");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const reference = storage().ref(`avatars/${new Date().getTime()}`);
      const task = reference.putFile(result.assets[0].uri);
      setUploadingImage(true);

      const oldPhotoUrl = userToEdit.avatar;

      task.on(
        "state_changed",
        (taskSnapshot) => {
          const progress = Math.round(
            (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
          );
          console.log(`Transferred ${progress}%`);
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          const url = await reference.getDownloadURL();
          setUserToEdit({ ...userToEdit, avatar: url });
          setUploadingImage(false);
          await deleteOldAvatar(oldPhotoUrl);
        }
      );
    }
  };

  const removeAvatar = async () => {
    Alert.alert("Ви впевнені, що хочете видалити фото?", "", [
      {
        text: "Так, видалити",
        onPress: async () => {
          await deleteOldAvatar(user.avatar);
          setUserToEdit({ ...userToEdit, avatar: undefined });
        },
      },
      {
        text: "Ні, залишити",
        style: "cancel",
      },
    ]);
  };

  const deleteOldAvatar = async (oldPhotoUrl: string) => {
    if (oldPhotoUrl) {
      const oldPhotoRef = storage().refFromURL(oldPhotoUrl);

      try {
        await oldPhotoRef.delete();
        console.log("Old photo deleted successfully");
      } catch (error) {
        console.log("Error deleting old photo:", error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        {!uploadingImage && userToEdit.avatar && (
          <Pressable onPress={pickImage}>
            <Image
              style={{
                width: USER_IMAGE_SIZE - 20,
                aspectRatio: 1,
                borderRadius: (USER_IMAGE_SIZE - 20) / 2,
                marginTop: 10,
              }}
              source={{
                uri: userToEdit.avatar,
              }}
            />
            <Pressable
              style={{
                position: "absolute",
                width: 40,
                aspectRatio: 1,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                backgroundColor: "white",
              }}
              onPress={removeAvatar}
            >
              <Ionicons name="trash-outline" size={32} color="#007aff" />
            </Pressable>
          </Pressable>
        )}
        {!uploadingImage && !userToEdit.avatar && (
          <Ionicons
            name="person-circle-outline"
            size={USER_IMAGE_SIZE}
            color={"#C7C7C7"}
            onPress={pickImage}
          />
        )}

        {uploadingImage && (
          <View
            style={{
              height: USER_IMAGE_SIZE,
              justifyContent: "center",
              alignItems: "center",
              gap: 15,
            }}
          >
            <ActivityIndicator size="large" />
            <ProgressBar progress={progress} width={USER_IMAGE_SIZE * 0.6} />
          </View>
        )}
        <Button title="Вибрати нове фото" onPress={pickImage} />
      </View>
      <View style={{ paddingHorizontal: 24, gap: 20, flex: 1 }}>
        <View>
          <TextInput
            placeholder="Ваш юзернейм"
            label="Імʼя"
            value={userToEdit.username}
            onChangeText={(text) =>
              setUserToEdit({ ...userToEdit, username: text })
            }
            mode="outlined"
            error={usernameMessage.message !== ""}
            left={
              <TextInput.Icon
                icon={() => (
                  <Ionicons
                    name="person-outline"
                    size={ICON_SIZE - 5}
                    color={SECONDARY_INFO_COLOR}
                  />
                )}
              />
            }
          />
          {usernameMessage.message && (
            <View style={[styles.iconAndText, { marginTop: 8, gap: 5 }]}>
              <Ionicons name="warning-outline" size={24} color={"#b3271e"} />
              <Text>{usernameMessage.message}</Text>
            </View>
          )}
        </View>
        <View>
          <TextInput
            placeholder="test@gmail.com"
            label="Пошта"
            value={userToEdit.email}
            onChangeText={(text) =>
              setUserToEdit({ ...userToEdit, email: text })
            }
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
            value={userToEdit.birthdate.toLocaleDateString("uk-UA")}
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
          date={userToEdit.birthdate}
          mode="date"
          onConfirm={(date) => {
            setOpenDatepicker(false);
            setUserToEdit({ ...userToEdit, birthdate: date });
          }}
          onCancel={() => {
            setOpenDatepicker(false);
          }}
        />

        <Spacer />
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
    </SafeAreaView>
  );
};

export default EditUserProfile;
