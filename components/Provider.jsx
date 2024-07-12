"use client";

import { createContext, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      <NextUIProvider>{children}</NextUIProvider>
    </UserContext.Provider>
  );
}
