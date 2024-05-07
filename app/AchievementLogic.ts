import { UserInfo } from "./UserContext";

export enum AchieveType {
  NEW_WORDS,
  COMPLETED_GAMES,
  PERFECT_GAMES,
}

export interface Achievement {
  type: AchieveType;
  amount: number;
}

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

export const achievements = [
  ...generateAchievements(AchieveType.COMPLETED_GAMES, [1, 5, 10, 15, 30]),
  ...generateAchievements(AchieveType.NEW_WORDS, [1, 10, 30, 50]),
  ...generateAchievements(AchieveType.PERFECT_GAMES, [1, 3, 5, 10, 15]),
];

export const getCompletedAchievements = (
  user: UserInfo,
  achievements: Achievement[]
) => {
  return achievements.filter((a) => isCompleted(user, a));
};

export const getNotCompletedAchievements = (
  user: UserInfo,
  achievements: Achievement[]
) => {
  return achievements.filter((a) => !isCompleted(user, a));
};
