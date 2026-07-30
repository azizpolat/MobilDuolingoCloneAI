import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "../../global.css";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";

const fontMap = {
  Poppins_400Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
  Poppins_500Medium: require("../../assets/fonts/Poppins-Medium.ttf"),
  Poppins_600SemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  Poppins_700Bold: require("../../assets/fonts/Poppins-Bold.ttf"),
};

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
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      ></Stack>
    </ClerkProvider>
  );
}
