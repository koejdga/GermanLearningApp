import { useEffect } from "react";
import { TextInput } from "react-native";
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedText = Animated.createAnimatedComponent(TextInput);

const NumberCounter = ({ number, style, triggerAnimation }) => {
  const animatedTextValue = useSharedValue(0);
  const animatedValue = useDerivedValue(() => {
    return withTiming(animatedTextValue.value, {
      duration: 3000,
      easing: Easing.out(Easing.circle),
      reduceMotion: ReduceMotion.System,
    });
  });

  useEffect(() => {
    if (triggerAnimation) {
      animatedTextValue.value = number;
    }
  }, [triggerAnimation, number, animatedTextValue]);

  const animatedText = useAnimatedProps(() => {
    return {
      text: `${Math.round(animatedValue.value)}`,
    };
  });

  return (
    <AnimatedText
      style={[
        {
          fontSize: 45,
          textAlign: "center",
        },
        style,
      ]}
      animatedProps={animatedText}
      editable={false}
    />
  );
};

export default NumberCounter;
