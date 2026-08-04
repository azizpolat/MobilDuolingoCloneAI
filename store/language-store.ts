import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { languages } from "@/data/languages";
import type { Language, LanguageCode } from "@/types/learning";

export const LANGUAGE_SELECTION_STORAGE_KEY = "language-selection-store";

interface LanguageSelectionState {
  selectedLanguageCode: LanguageCode | null;
  selectedLanguage: Language | null;
  hasHydrated: boolean;
  setSelectedLanguageCode: (code: LanguageCode | null) => void;
  clearSelectedLanguage: () => void;
}

export const useLanguageStore = create<LanguageSelectionState>()(
  persist(
    (set) => ({
      selectedLanguageCode: null,
      selectedLanguage: null,
      hasHydrated: false,
      setSelectedLanguageCode: (code) =>
        set({
          selectedLanguageCode: code,
          selectedLanguage:
            languages.find((language) => language.code === code) ?? null,
        }),
      clearSelectedLanguage: () =>
        set({
          selectedLanguageCode: null,
          selectedLanguage: null,
        }),
    }),
    {
      name: LANGUAGE_SELECTION_STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        selectedLanguageCode: state.selectedLanguageCode,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) {
          return;
        }

        state.selectedLanguage =
          languages.find((language) => language.code === state.selectedLanguageCode) ?? null;
        state.hasHydrated = true;
      },
    },
  ),
);
