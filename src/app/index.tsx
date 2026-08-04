import { useAuth, useClerk } from "@clerk/expo";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { useLanguageStore } from "@/store/language-store";

export default function Index() {
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();

  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);

  const clearSelectedLanguage = useLanguageStore(
    (state) => state.clearSelectedLanguage,
  );

  const handleClearStorage = () => {
    clearSelectedLanguage();
  };

  return (
    <View className="flex-1 bg-neutral-background items-center justify-center px-6 pt-16">
      <Text className="h1">Duolingo Clone</Text>

      {selectedLanguage && (
        <View className="flex-row items-center mt-4 bg-white px-4 py-3 rounded-2xl">
          <Image
            source={{
              uri: selectedLanguage.flag,
            }}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
            }}
          />

          <Text className="ml-3 font-semibold">{selectedLanguage.name}</Text>
        </View>
      )}

      {isSignedIn ? (
        <TouchableOpacity
          onPress={() => signOut()}
          className="mt-8 rounded-[28px] bg-red-500 px-6 py-4"
        >
          <Text className="font-bold text-white">Sign Out</Text>
        </TouchableOpacity>
      ) : (
        <Link href="/onboarding" asChild>
          <TouchableOpacity className="mt-8 rounded-[28px] bg-brand-purple px-6 py-4">
            <Text className="font-bold text-white">Open Onboarding</Text>
          </TouchableOpacity>
        </Link>
      )}

      <Link href="/language-selection" asChild>
        <TouchableOpacity className="mt-4 rounded-[28px] bg-green-300 px-6 py-4">
          <Text className="text-neutral-900">Choose Language</Text>
        </TouchableOpacity>
      </Link>

      <TouchableOpacity
        onPress={handleClearStorage}
        className="mt-4 rounded-[28px] border border-neutral-300 bg-orange-300 px-6 py-4"
      >
        <Text className="text-neutral-900">Clear saved language</Text>
      </TouchableOpacity>
    </View>
  );
}
