import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { sentenseFromArray } from "../../Utils";

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#B3F9E2",
    bottom: 0,
    height: "40%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  subheader: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    fontSize: 22,
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

interface Props {
  correctAnswer: { word: string }[];
  loadNextRound: () => void;
  answerIsCorrect: boolean | null;
}

const EndRoundModal: React.FC<Props> = ({
  correctAnswer,
  loadNextRound,
  answerIsCorrect,
}) => {
  const translateY = useSharedValue(300);
  const transformStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const popUpModal = () => {
    translateY.value = withTiming(0, { duration: 200 });
  };

  useEffect(() => {
    if (answerIsCorrect != null) {
      popUpModal();
    }
  }, [answerIsCorrect]);

  return (
    <Animated.View
      id="modal"
      style={[
        styles.modal,
        transformStyle,
        { backgroundColor: answerIsCorrect ? "#B3F9E2" : "#F9C8D1" },
      ]}
    >
      <Text style={styles.subheader}>
        {answerIsCorrect ? "Richtig!" : "Falsch!"}
      </Text>
      <View style={{ borderWidth: 1 }}></View>
      <Text style={{ padding: 35, fontSize: 19 }}>
        {sentenseFromArray(correctAnswer.map((obj) => obj.word))}
      </Text>
      <RectButton
        style={[
          styles.button,
          { backgroundColor: answerIsCorrect ? "#15AB76" : "#E9526E" },
        ]}
        onPress={loadNextRound}
      >
        <Text style={styles.label}>ДАЛІ</Text>
      </RectButton>
    </Animated.View>
  );
};

export default EndRoundModal;
