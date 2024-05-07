import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View } from "react-native";
import Progress from "./Progress";
import Background from "./Background";
import { UserInfo } from "../../UserContext";

const ICON_SIZE = 29;

export enum AchieveType {
  NEW_WORDS,
  COMPLETED_GAMES,
  PERFECT_GAMES,
}

export interface Achievement {
  type: AchieveType;
  amount: number;
}

interface Props {
  user: UserInfo;
  achievement: Achievement;
  isNew?: boolean;
}

const getAchieveText = (achievement: Achievement) => {
  if (achievement.type === AchieveType.COMPLETED_GAMES) {
    if (achievement.amount === 1) {
      return "Перша виконана вправа";
    } else if ([2, 3, 4].includes(achievement.amount % 10)) {
      return `${achievement.amount} виконані вправи`;
    } else {
      return `${achievement.amount} виконаних вправ`;
    }
  } else if (achievement.type === AchieveType.NEW_WORDS) {
    if (achievement.amount === 1) {
      return "Перше вивчене слово";
    } else if ([2, 3, 4].includes(achievement.amount % 10)) {
      return `${achievement.amount} вивчені слова`;
    } else {
      return `${achievement.amount} вивчених слів`;
    }
  } else if (achievement.type === AchieveType.PERFECT_GAMES) {
    if (achievement.amount === 1) {
      return "Перша ідеально виконана вправа";
    } else if ([2, 3, 4].includes(achievement.amount % 10)) {
      return `${achievement.amount} ідеально виконані вправи`;
    } else {
      return `${achievement.amount} ідеально виконаних вправ`;
    }
  }
  return "Чудова робота";
};

export const getCurrentAmount = (user: UserInfo, achievement: Achievement) => {
  const currentAmount =
    achievement.type === AchieveType.COMPLETED_GAMES
      ? user.total_games
      : achievement.type === AchieveType.PERFECT_GAMES
      ? user.perfect_games
      : achievement.type === AchieveType.NEW_WORDS
      ? user.learned_words_amount
      : 0;
  return currentAmount;
};

const AchievementView: React.FC<Props> = ({
  user,
  achievement,
  isNew = false,
}) => {
  const [iconCoords, setIconCoords] = useState({ x: 0, y: 0 });
  const currentAmount = getCurrentAmount(user, achievement);
  const completed = currentAmount >= achievement.amount;

  const validateCurrentAmount = () => {
    if (currentAmount > achievement.amount) {
      console.log(
        "INFO: current amount is greater than total amount in AchievementView component"
      );
      return achievement.amount;
    }

    return completed ? achievement.amount : currentAmount;
  };

  return (
    <View
      style={{
        marginTop: 16,
        marginHorizontal: 16,
        padding: 4,
        borderRadius: 15,
        overflow: "hidden",
      }}
    >
      {isNew && (
        <Background
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: -10,
          }}
        ></Background>
      )}
      <View
        style={{
          backgroundColor: completed ? "#D8FFF2" : "white",
          borderRadius: 10,
          padding: 10,
          flexDirection: "row",
          gap: 10,
          borderWidth: 0.5,
          borderColor: "lightgray",
        }}
      >
        <Ionicons
          name="happy-outline"
          size={ICON_SIZE}
          onLayout={({
            nativeEvent: {
              layout: { x, y },
            },
          }) => {
            setIconCoords({ x, y });
          }}
        ></Ionicons>
        <View
          style={{
            width: ICON_SIZE - 2,
            aspectRatio: 1,
            backgroundColor: "gold",
            position: "absolute",
            top: iconCoords.x,
            left: iconCoords.y,
            zIndex: -1,
            borderRadius: ICON_SIZE / 2,
          }}
        ></View>
        <View style={{ gap: 10, flex: 1, overflow: "hidden" }}>
          <Text style={{ fontSize: 18 }}>{getAchieveText(achievement)}</Text>
          <Progress
            currentAmount={validateCurrentAmount()}
            totalAmount={achievement.amount}
          />
        </View>
      </View>
    </View>
  );
};

export default AchievementView;
