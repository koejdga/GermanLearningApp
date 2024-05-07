import { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { AchievementsContext } from "../../AchievementsContext";
import { UserContext, UserInfo } from "../../UserContext";
import AchievementView, {
  AchieveType,
  Achievement,
  getCurrentAmount,
} from "../../ui_elements/achievements_page/AchievementView";

const generateAchievements = (
  type: AchieveType,
  thresholds: number[]
): Achievement[] => {
  const result = thresholds.map((threshold) => ({
    type,
    amount: threshold,
  }));
  return result;
};

const isCompleted = (user: UserInfo, achievement: Achievement) => {
  const currentAmount = getCurrentAmount(user, achievement);
  return currentAmount >= achievement.amount;
};

const Achievements = () => {
  const { user } = useContext(UserContext);
  const { newAchievementsAmount, setNewAchievementsAmount } =
    useContext(AchievementsContext);

  const achievements = [
    ...generateAchievements(AchieveType.COMPLETED_GAMES, [1, 5, 10, 15, 30]),
    ...generateAchievements(AchieveType.NEW_WORDS, [1, 10, 30, 50]),
    ...generateAchievements(AchieveType.PERFECT_GAMES, [1, 3, 5, 10, 15]),
  ];

  const [completedAchievements, setCompletedAchievements] = useState(
    achievements.filter((a) => isCompleted(user, a))
  );
  const [notCompletedAchievements, setNotCompletedAchievements] = useState(
    achievements.filter((a) => !isCompleted(user, a))
  );
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    if (!user || user === null) {
      return;
    }

    let newAchievements = [];

    Object.keys(AchieveType).forEach((key) => {
      const achievementsOfType = notCompletedAchievements
        .filter((o) => o.type.toString() === key)
        .sort((a, b) => a.amount - b.amount);

      for (let i = 0; i < achievementsOfType.length; i++) {
        let value = 0;
        switch (key) {
          case AchieveType.COMPLETED_GAMES.toString():
            value = user.total_games;
            break;
          case AchieveType.PERFECT_GAMES.toString():
            value = user.perfect_games;
            break;
          case AchieveType.NEW_WORDS.toString():
            value = user.learned_words_amount;
            break;
          default:
            value = 0;
            console.log("ERROR: no achievement type with such name was found");
            break;
        }
        if (achievementsOfType[i].amount <= value) {
          newAchievements.push(achievementsOfType[i]);
        } else {
          break;
        }
      }
    });

    console.log("When user is updated");
    console.log(newAchievements.length);
    setNewAchievementsAmount(newAchievements.length);
    setNewAchievements(newAchievements);
    setNotCompletedAchievements(
      notCompletedAchievements.filter((a) => !newAchievements.includes(a))
    );
  }, [user]);

  useEffect(() => {
    console.log("newAchievementsAmount");
    console.log(newAchievementsAmount);
    if (newAchievementsAmount === 0) {
      const newCompleted = Array(...newAchievements);
      console.log(
        [...completedAchievements, ...newCompleted].sort((a, b) => {
          if (a.type !== b.type) {
            return a.type - b.type;
          }
          return a.amount - b.amount;
        })
      );
      setCompletedAchievements((prev) =>
        [...prev, ...newCompleted].sort((a, b) => {
          if (a.type !== b.type) {
            return a.type - b.type;
          }
          return a.amount - b.amount;
        })
      );
      setNewAchievements([]);
    }
  }, [newAchievementsAmount]);

  if (!user) {
    return (
      <View>
        <Text>No user</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      {newAchievements.length > 0 && (
        <>
          <View
            style={{
              padding: 20,
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: "black",
            }}
          >
            <Text
              style={{
                fontSize: 19,
                fontWeight: "500",
              }}
            >
              Нові виконані
            </Text>
          </View>
          {newAchievements.map((achievement, index) => {
            return (
              <AchievementView
                user={user}
                achievement={achievement}
                isNew
                key={"newAchievements" + index}
              />
            );
          })}

          <View
            style={{
              padding: 20,
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: "black",
            }}
          >
            <Text
              style={{
                fontSize: 19,
                fontWeight: "500",
              }}
            >
              Досягнення
            </Text>
          </View>
        </>
      )}
      {notCompletedAchievements.map((achievement, index) => {
        return (
          <AchievementView
            user={user}
            achievement={achievement}
            key={"notCompletedAchievements" + index}
          />
        );
      })}

      {completedAchievements.length > 0 && (
        <>
          <View
            style={{
              padding: 20,
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: "black",
            }}
          >
            <Text
              style={{
                fontSize: 19,
                fontWeight: "500",
              }}
            >
              Виконані
            </Text>
          </View>
          {completedAchievements.map((achievement, index) => {
            return (
              <AchievementView
                user={user}
                achievement={achievement}
                key={"completedAchievements" + index}
              />
            );
          })}
        </>
      )}
      <View style={{ marginBottom: 15 }}></View>
    </ScrollView>
  );
};

export default Achievements;
