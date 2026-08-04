import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth, useClerk } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { LANGUAGE_SELECTION_STORAGE_KEY, useLanguageStore } from "@/store/language-store";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const router = useRouter();
  const { hasHydrated, selectedLanguageCode, clearSelectedLanguage } = useLanguageStore(
    (state) => ({
      hasHydrated: state.hasHydrated,
      selectedLanguageCode: state.selectedLanguageCode,
      clearSelectedLanguage: state.clearSelectedLanguage,
    }),
  );

  useEffect(() => {
    if (!isLoaded || !hasHydrated) {
      return;
    }

    if (isSignedIn && !selectedLanguageCode) {
      router.replace("/language-selection");
    }
  }, [hasHydrated, isLoaded, isSignedIn, router, selectedLanguageCode]);

  const handleClearStorage = async () => {
    await AsyncStorage.removeItem(LANGUAGE_SELECTION_STORAGE_KEY);
    clearSelectedLanguage();
    router.replace("/language-selection");
  };

  return (
    <View className="flex-1 bg-neutral-background px-6 pt-16 items-center justify-center">
      <Text className="h1">Duolingo Clone</Text>

      {isSignedIn ? (
        <TouchableOpacity
          onPress={() => signOut()}
          className="mt-8 flex-row items-center justify-between rounded-[28px] bg-red-500 px-6 py-4"
        >
          <Text className="font-bold text-white">Sign Out</Text>
        </TouchableOpacity>
      ) : (
        <Link href="/onboarding" asChild>
          <TouchableOpacity className="mt-8 flex-row items-center justify-between rounded-[28px] bg-brand-purple px-6 py-4">
            <Text className="font-bold text-white">Open Onboarding</Text>
          </TouchableOpacity>
        </Link>
      )}

      <Link href="/language-selection" asChild>
        <TouchableOpacity className="mt-4 flex-row items-center justify-between rounded-[28px] bg-green-300 px-6 py-4">
          <Text className="text-neutral-900 ">Choose Language</Text>
        </TouchableOpacity>
      </Link>

      <TouchableOpacity
        onPress={handleClearStorage}
        className="mt-4 flex-row items-center justify-between rounded-[28px] border border-neutral-300 bg-white px-6 py-4"
      >
        <Text className="text-neutral-900">Clear saved language</Text>
      </TouchableOpacity>
    </View>
  );
}
