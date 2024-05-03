import { createContext, useState } from "react";

export interface UserInfo {
  uid: string;
  username: string;
  email: string;
  birthdate: Date;
  total_score: number;
}

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<UserInfo>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
