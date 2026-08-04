import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import "../../global.css";
import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";

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
  const { hasHydrated, selectedLanguageCode } = useLanguageStore((state) => ({
    hasHydrated: state.hasHydrated,
    selectedLanguageCode: state.selectedLanguageCode,
  }));

  useEffect(() => {
    if (!isLoaded || !hasHydrated) {
      return;
    }

    const isOnLanguageSelectionRoute = segments[0] === "language-selection";

    if (isSignedIn && !selectedLanguageCode && !isOnLanguageSelectionRoute) {
      router.replace("/language-selection");
      return;
    }

    if (isSignedIn && selectedLanguageCode && isOnLanguageSelectionRoute) {
      router.replace("/");
    }
  }, [hasHydrated, isLoaded, isSignedIn, router, segments, selectedLanguageCode]);

  return null;
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts(fontMap);

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!fontsLoaded) {
    return null;
  }

  // If publishable key is not provided, render normally but warn — the app will not have auth enabled.
  if (!publishableKey) {
    console.warn("EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY is not set. Clerk will not be initialized.");
    return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      ></Stack>
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <NavigationGuard />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      ></Stack>
    </ClerkProvider>
  );
}
