import { createContext, useState } from "react";

export const AchievementsContext = createContext<{
  newAchievementsAmount: number;
  setNewAchievementsAmount: (obj: number) => void;
}>(null);

export const AchievementsProvider = ({ children }) => {
  const [newAchievementsAmount, setNewAchievementsAmount] = useState(0);

  return (
    <AchievementsContext.Provider
      value={{ newAchievementsAmount, setNewAchievementsAmount }}
    >
      {children}
    </AchievementsContext.Provider>
  );
};
