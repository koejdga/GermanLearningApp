import {
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useFonts, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { Schoolbell_400Regular } from "@expo-google-fonts/schoolbell";
import { amountOfExercises, maxPointsPerRound } from "../../config/GamesConfig";
import { Game, gameToNameMapping } from "../../Game";

const PADDING = 6;

const styles = StyleSheet.create({
  task: {
    flex: 1,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 7,
    backgroundColor: "lightcoral",
    height: 121,
    position: "relative",
  },
  taskImageStyle: {
    borderRadius: 15,
  },
  rewardContainer: {
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    position: "absolute",
    top: PADDING,
    left: PADDING,
    borderColor: "#A4A4A4",
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  rewardText: {
    fontFamily: "Roboto_500Medium",
    fontSize: 20,
  },
  info: {
    position: "absolute",
    right: PADDING,
    top: PADDING,
  },
  titleContainer: {
    marginTop: 52,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 10,
    paddingHorizontal: 3,
    paddingVertical: 1,
  },
  titleText: {
    textTransform: "uppercase",
    fontFamily: "Schoolbell_400Regular",
    fontSize: 23,
  },
});

interface Props {
  background: ImageSourcePropType;
  contrastForTitle?: boolean;
  gameName: Game;
  onPress?: () => void;
}

const Task: React.FC<Props> = ({
  background,
  contrastForTitle = false,
  gameName,
  onPress,
}) => {
  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Schoolbell_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Pressable onPress={onPress} style={[styles.task, styles.taskImageStyle]}>
      <ImageBackground
        style={[styles.task, styles.taskImageStyle]}
        imageStyle={styles.taskImageStyle}
        source={background}
      >
        <View style={styles.rewardContainer}>
          <Text style={styles.rewardText}>
            +{amountOfExercises[gameName] * maxPointsPerRound}
          </Text>
        </View>
        <Icon
          name="info-outline"
          size={26}
          color="#00000080"
          style={styles.info}
        ></Icon>
        <View
          style={[
            styles.titleContainer,
            {
              backgroundColor: contrastForTitle
                ? "rgba(255, 255, 255, 0.5)"
                : "transparent",
            },
          ]}
        >
          <Text style={styles.titleText}>{gameToNameMapping[gameName]}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default Task;
