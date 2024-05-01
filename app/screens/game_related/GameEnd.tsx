import { Aclonica_400Regular } from "@expo-google-fonts/aclonica";
import { useFonts } from "@expo-google-fonts/roboto-condensed";
import LottieView from "lottie-react-native";
import { useEffect, useRef, useState } from "react";
import { Button, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReadyButton from "../../ui_elements/game/ReadyButton";
import NumberCounter from "../../ui_elements/game/NumberCounter";

const GameEnd = ({ navigation, route }) => {
  const score = route.params?.score;
  const maxScore = route.params?.maxScore;
  const amountOfHearts = route.params?.amountOfHearts;

  const textForGameEnd =
    score === maxScore
      ? "Бездоганно!"
      : score / maxScore >= 0.8
      ? "Чудово!"
      : score / maxScore >= 0.5
      ? "Добре!"
      : amountOfHearts > 0
      ? "Ви впоралися!"
      : "Не хвилюйтеся,\nви все ще вчитеся!";
  // Не хвилюйтеся, згодом ви все освоїте!

  const [triggerAnimation, setTriggerAnimation] = useState(false);

  useEffect(() => {
    setTriggerAnimation(true);
  }, []);

  let [fontsLoaded] = useFonts({
    Aclonica_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ backgroundColor: "lightblue", flex: 1 }}>
      <View
        style={{
          height: 350,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LottieView
          source={require("../../assets/animations/spinning-shine.json")}
          style={{ width: "100%", height: "100%", position: "absolute" }}
          autoPlay
          loop
        />
        <LottieView
          source={require("../../assets/animations/celebration.json")}
          style={{ width: "100%", height: "100%", position: "absolute" }}
          autoPlay
          loop={false}
        />
        <Text
          style={{
            fontSize: 30,
            fontFamily: "Aclonica_400Regular",
            color: "blue",
            textAlign: "center",
            paddingHorizontal: 20,
          }}
        >
          {textForGameEnd}
        </Text>
      </View>

      <NumberCounter
        number={score}
        style={{ transform: [{ translateY: -70 }] }}
        triggerAnimation={triggerAnimation}
      />

      <View style={{ flex: 1 }}></View>

      <GestureHandlerRootView style={{ marginBottom: 30 }}>
        <ReadyButton
          onPress={() => {
            // use replace if want to go to the right, not to the left
            navigation.navigate("HomePage");
          }}
        ></ReadyButton>
      </GestureHandlerRootView>
    </GestureHandlerRootView>
  );
};

export default GameEnd;

// TODO: put https://lordicon.com/icons/wired/lineal?group=free&categoryId=9 somewhere if I used icon from there
// TODO: maybe there will be problems with lottie animation
// because I didn't followed steps from here https://airbnb.io/lottie/#/react-native
// which are related to Android development

// https://app.lottiefiles.com/animation/137a2ce5-3b9c-4001-8132-db0b01110f4d?channel=web&source=public-animation&panel=download
