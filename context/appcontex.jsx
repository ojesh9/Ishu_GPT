"use client";
import { useUser } from "@clerk/nextjs";
import { createContext, useContext } from "react";

export const AppContex = createContext();

export const useAppContex = () => {
  return useContext(AppContex);
};

export const AppContexProvider = ({ children }) => {
  const { user } = useUser();

  const value = {
    user,
  };

  return <AppContex.Provider value={value}>{children}</AppContex.Provider>;
};
