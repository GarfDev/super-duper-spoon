import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ThemeStoreState {
  theme: string;
}

export const store = create<ThemeStoreState>()(
  persist(
    () => ({
      theme: "light",
    }),
    {
      name: "theme-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const toggle = () => {
  store.setState((state) => ({
    theme: state.theme.includes("dark") ? "light" : "dark",
  }));
};
