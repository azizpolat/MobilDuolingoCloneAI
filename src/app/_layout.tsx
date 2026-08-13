import { ClerkProvider, useAuth, useUser } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import { PostHogErrorBoundary, PostHogProvider } from "posthog-react-native";
import { Text, View } from "react-native";
import { useEffect, useRef } from "react";
import "../../global.css";

import { posthog } from "../config/posthog";
import { useLanguageStore } from "@/store/language-store";

const fontMap = {
  Poppins_400Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
  Poppins_500Medium: require("../../assets/fonts/Poppins-Medium.ttf"),
  Poppins_600SemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  Poppins_700Bold: require("../../assets/fonts/Poppins-Bold.ttf"),
};

function ErrorFallback() {
  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-center text-lg font-semibold text-gray-900">
        Something went wrong. Please restart the app.
      </Text>
    </View>
  );
}

function PostHogIdentity() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const identifiedUserId = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {
      if (identifiedUserId.current) {
        posthog?.reset();
        identifiedUserId.current = null;
      }
      return;
    }

    if (!user?.id || identifiedUserId.current === user.id) {
      return;
    }

    if (identifiedUserId.current) {
      posthog?.reset();
    }

    const email = user.primaryEmailAddress?.emailAddress;

    posthog?.identify(user.id, {
      $set: email ? { email } : {},
    });
    identifiedUserId.current = user.id;
  }, [isLoaded, isSignedIn, user]);

  return null;
}

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

  const navigator = (
    <>
      <PostHogIdentity />
      <NavigationGuard />

      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      {posthog ? (
        <PostHogProvider client={posthog}>
          <PostHogErrorBoundary fallback={ErrorFallback}>
            {navigator}
          </PostHogErrorBoundary>
        </PostHogProvider>
      ) : (
        navigator
      )}
    </ClerkProvider>
  );
}
