import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type PreferenceStoreState = {
  theme: string;
  microphone: boolean;
};

export const store = create<PreferenceStoreState>()(
  persist(
    () => ({
      theme: "light",
      microphone: false as boolean,
    }),
    {
      name: "preference-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

/** Actions */

export const toggleTheme = () => {
  store.setState((state) => ({
    ...state,
    theme: state.theme === "light" ? "dark" : "light",
  }));
};

export const setMicrophoneState = (microphoneState: boolean) => {
  store.setState((state) => ({
    ...state,
    microphone: microphoneState,
  }));
};
