import { createContext, useState } from "react";

export interface UserInfo {
  uid: string;
  username: string;
  email: string;
  birthdate: Date;
  total_score: number;
  avatar: string | null;
  perfect_games: number;
  total_games: number;
  learned_words_amount: number;
}

export const UserContext = createContext<{
  user: UserInfo;
  setUser: (obj: UserInfo) => void;
}>(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<UserInfo>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
