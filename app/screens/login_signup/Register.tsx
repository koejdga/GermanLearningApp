import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext, useState } from "react";
import {
  Alert,
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { createUser } from "../../DatabaseQueries";
import { UserContext } from "../../UserContext";
import { CTAButton } from "../../ui_elements/login_signup/CTAButton";
import DatePicker from "react-native-date-picker";
import { TextInput as PaperTextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export const Register = () => {
  const { setUser } = useContext(UserContext);
  const [name, setName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [birthdate, setBirthdate] = useState<Date | undefined>(new Date());
  const [password, setPassword] = useState<string | undefined>();

  const [openDatepicker, setOpenDatepicker] = useState(false);
  const SECONDARY_INFO_COLOR = "#575757";

  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const registerAndGoToMainFlow = async () => {
    if (email && password && name && birthdate) {
      try {
        const response = await auth().createUserWithEmailAndPassword(
          email,
          password
        );

        if (response.user) {
          const user = await createUser(
            response.user.uid,
            name,
            email,
            birthdate
          );
          setUser(user);
          nav.replace("MainApp");
        }
      } catch (e) {
        // TODO: Read firebase docs on errors
        Alert.alert("Oops", "Please check your form and try again");
      }
    }
  };

  return (
    <Pressable style={styles.contentView} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.contentView}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Register</Text>
          </View>
          <View style={styles.mainContent}>
            <TextInput
              style={styles.loginTextField}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.loginTextField}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              inputMode="email"
              autoCapitalize="none"
            />
            <PaperTextInput
              mode="outlined"
              value={birthdate.toLocaleDateString("uk-UA")}
              onPressIn={() => setOpenDatepicker(true)}
              left={
                <PaperTextInput.Icon
                  icon={() => (
                    <Ionicons
                      name="calendar-outline"
                      size={30}
                      color={SECONDARY_INFO_COLOR}
                    />
                  )}
                  onPress={() => setOpenDatepicker(true)}
                />
              }
            />
            <TextInput
              style={styles.loginTextField}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <CTAButton
            title="Sign Up"
            onPress={registerAndGoToMainFlow}
            variant="primary"
          />
          <CTAButton title="Go Back" onPress={nav.goBack} variant="secondary" />
        </View>
        <DatePicker
          modal
          open={openDatepicker}
          date={birthdate}
          mode="date"
          onConfirm={(date) => {
            setOpenDatepicker(false);
            setBirthdate(date);
          }}
          onCancel={() => {
            setOpenDatepicker(false);
          }}
        />
      </SafeAreaView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    marginHorizontal: 50,
    backgroundColor: "white",
    paddingTop: 20,
  },
  titleContainer: {
    flex: 1.2,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 45,
    textAlign: "center",
    fontWeight: "200",
  },
  loginTextField: {
    borderBottomWidth: 1,
    height: 60,
    fontSize: 30,
    marginVertical: 10,
    fontWeight: "300",
  },
  mainContent: {
    flex: 6,
  },
});
