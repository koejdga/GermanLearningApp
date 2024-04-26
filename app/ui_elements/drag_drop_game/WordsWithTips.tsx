import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const styles = StyleSheet.create({
  sentense: {
    flexDirection: "row",
  },
  word: {
    fontSize: 19,
    textDecorationStyle: "solid",
  },
  tip: {
    minWidth: 100,
    position: "absolute",
    top: 10,
    transformOrigin: "top left",
    transform: [{ scale: 0 }],
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: "grey",
    zIndex: 10,
  },
});

const WordsWithTips = ({ words, style }) => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const tipScales = words.map(() => useSharedValue(0));

  const handlePress = (index: number) => {
    console.log(words[index]);
    if (activeIndex !== null) {
      tipScales[activeIndex].value = 0;
    }
    if (activeIndex !== index) {
      tipScales[index].value = 1;
      setActiveIndex(index);
    } else {
      setActiveIndex(null);
    }
  };

  const [positionStyles, setPositionStyles] = useState(words.map(() => {}));

  const animatedStyles = tipScales.map((tipScale) =>
    useAnimatedStyle(() => ({
      transform: [{ scale: withSpring(tipScale.value) }],
    }))
  );

  return (
    <>
      <View style={[styles.sentense, style]}>
        {words.map((word: { word: string }, index: number) => {
          const addBlankspace =
            index < words.length - 1 && words[index + 1].word != ",";

          const wordToDisplay = addBlankspace ? word.word + " " : word.word;
          return (
            <Text
              key={index}
              style={styles.word}
              onPress={() => handlePress(index)}
              onLayout={({
                nativeEvent: {
                  layout: { x },
                },
              }) => {
                console.log(x);
                setPositionStyles(
                  positionStyles.map((s: { left: number }, i: number) =>
                    i == index ? { left: x } : s
                  )
                );
              }}
            >
              {wordToDisplay}
            </Text>
          );
        })}
      </View>

      <View style={{ flex: 1 }}>
        {words.map((word: { word: string }, index: number) => {
          console.log(positionStyles[index]);
          return (
            <Animated.View
              style={[styles.tip, positionStyles[index], animatedStyles[index]]}
              key={index}
            >
              <Text style={{ textAlign: "center" }}>він</Text>
              <Text>• er</Text>
              <Text
                style={{ color: "#354B9A", textAlign: "right" }}
                onPress={() => {
                  nav.navigate("WordTranslation", { word: "vend 1" });
                }}
              >
                словник {">"}
              </Text>
            </Animated.View>
          );
        })}
      </View>
    </>
  );
};

export default WordsWithTips;
