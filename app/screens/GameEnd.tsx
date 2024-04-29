import { Aclonica_400Regular } from "@expo-google-fonts/aclonica";
import { useFonts } from "@expo-google-fonts/roboto-condensed";
import LottieView from "lottie-react-native";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReadyButton from "../ui_elements/drag_drop_game/ReadyButton";

const GameEnd = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Aclonica_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ backgroundColor: "lightblue", flex: 1 }}>
      <View
        style={{
          height: 350,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LottieView
          source={require("../assets/animations/spinning-shine.json")}
          style={{ width: "100%", height: "100%", position: "absolute" }}
          autoPlay
          loop
        />
        <Text
          style={{
            fontSize: 30,
            fontFamily: "Aclonica_400Regular",
            color: "blue",
          }}
        >
          Чудово!
        </Text>
      </View>

      <View style={{ flex: 1 }}></View>

      <GestureHandlerRootView style={{ marginBottom: 30 }}>
        <ReadyButton
          onPress={() => {
            // use replace if want to go to the right, not to the left
            navigation.navigate("HomePage");
          }}
        ></ReadyButton>
      </GestureHandlerRootView>
    </View>
  );
};

export default GameEnd;

// TODO: put https://lordicon.com/icons/wired/lineal?group=free&categoryId=9 somewhere if I used icon from there
// TODO: maybe there will be problems with lottie animation
// because I didn't followed steps from here https://airbnb.io/lottie/#/react-native
// which are related to Android development
