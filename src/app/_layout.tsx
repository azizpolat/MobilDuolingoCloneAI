import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import "../../global.css";

const fontMap = {
  Poppins_400Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
  Poppins_500Medium: require("../../assets/fonts/Poppins-Medium.ttf"),
  Poppins_600SemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  Poppins_700Bold: require("../../assets/fonts/Poppins-Bold.ttf"),
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts(fontMap);

  if (!fontsLoaded) {
    return null;
  }

  return <Stack />;
}
