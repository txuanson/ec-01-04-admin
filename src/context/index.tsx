import React, { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";

export interface IContext {
  isAuthenticated: boolean;
  token: string;
}

export type ContextType = {
  context: IContext;
  login: (token: string) => void;
  logout: () => void;
};

export const AppContext = createContext<ContextType>({
  context: {
    isAuthenticated: false,
    token: "",
  },
  login: (token: string) => { },
  logout: () => { },
});

export const AppProvider = (props: { children: ReactNode }) => {
  const [context, setContext] = useState<IContext>({
    isAuthenticated: false,
    token: ""
  });

  useEffect(() => {
    const token = Cookies.get("token") || "";
    if (token) {
      setContext({
        isAuthenticated: true,
        token
      })
    }
  }, []);

  useEffect(() => {
    if (context.token) {
      Cookies.set("token", context.token, { expires: 1 });
    }
    else {
      Cookies.remove("token")
    }
  }, [context]);

  const login = (token: string) => setContext({
    isAuthenticated: true,
    token
  });

  const logout = () => {
    setContext({
      isAuthenticated: false,
      token: ""
    });
  }

  return <AppContext.Provider value={{ context, login, logout }}>{props.children}</AppContext.Provider>;
}
