import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import "../../global.css";

import { useLanguageStore } from "@/store/language-store";

const fontMap = {
  Poppins_400Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
  Poppins_500Medium: require("../../assets/fonts/Poppins-Medium.ttf"),
  Poppins_600SemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  Poppins_700Bold: require("../../assets/fonts/Poppins-Bold.ttf"),
};

function NavigationGuard() {
  const { isLoaded, isSignedIn } = useAuth();

  const router = useRouter();
  const segments = useSegments();

  const hasHydrated = useLanguageStore((state) => state.hasHydrated);

  const selectedLanguageCode = useLanguageStore(
    (state) => state.selectedLanguageCode,
  );

  const currentRoute = segments[0] ?? "";

  useEffect(() => {
    if (!isLoaded || !hasHydrated) {
      return;
    }

    if (!isSignedIn) {
      return;
    }

    const shouldGoToLanguage =
      !selectedLanguageCode && currentRoute !== "language-selection";

    if (shouldGoToLanguage) {
      router.replace("/language-selection");
      return;
    }

    const shouldGoHome =
      !!selectedLanguageCode && currentRoute === "language-selection";

    if (shouldGoHome) {
      router.replace("/");
    }
  }, [
    isLoaded,
    hasHydrated,
    isSignedIn,
    selectedLanguageCode,
    currentRoute,
    router,
  ]);

  return null;
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts(fontMap);

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!fontsLoaded) {
    return null;
  }

  if (!publishableKey) {
    console.warn(
      "EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY is not set. Clerk will not be initialized.",
    );

    return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <NavigationGuard />

      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ClerkProvider>
  );
}
