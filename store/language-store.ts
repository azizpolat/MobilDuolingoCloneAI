import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { languages } from "@/data/languages";
import type { Language, LanguageCode } from "@/types/learning";

export const LANGUAGE_SELECTION_STORAGE_KEY = "language-selection-store";

let setLanguageStoreState:
  | ((partial: Partial<LanguageSelectionState>) => void)
  | null = null;

interface LanguageSelectionState {
  selectedLanguageCode: LanguageCode | null;
  selectedLanguage: Language | null;
  hasHydrated: boolean;
  setSelectedLanguageCode: (code: LanguageCode | null) => void;
  clearSelectedLanguage: () => void;
}

export const useLanguageStore = create<LanguageSelectionState>()(
  persist(
    (set) => {
      setLanguageStoreState = set;

      return {
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
      };
    },
    {
      name: LANGUAGE_SELECTION_STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        selectedLanguageCode: state.selectedLanguageCode,
        selectedLanguage: state.selectedLanguage,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.selectedLanguageCode && !state.selectedLanguage) {
          setLanguageStoreState?.({
            selectedLanguage:
              languages.find(
                (language) => language.code === state.selectedLanguageCode,
              ) ?? null,
            hasHydrated: true,
          });
        } else {
          setLanguageStoreState?.({
            hasHydrated: true,
          });
        }
      },
    },
  ),
);
