import { images } from "@/constants/images";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Onboarding() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View className="flex-1 bg-[#F4F3FF] px-6 pt-6">
        <View className="items-center">
          <View className="flex-row items-center gap-3">
            <Image
              source={images.mascotLogo}
              className="h-10 w-10"
              style={{ resizeMode: "contain" }}
            />
            <Text className="text-[20px] font-semibold text-neutral-primary font-poppins">
              muolingo
            </Text>
          </View>
        </View>

        <View className="mt-8 flex-1 rounded-[40px] bg-white p-6 shadow-card">
          <View className="items-center">
            <Text className="text-[34px] font-bold text-[#0D132B] font-poppins text-center">
              Your AI language
              <Text className="text-brand-purple"> teacher.</Text>
            </Text>
            <Text className="mt-3 text-[15px] leading-7 text-[#6B7280] text-center font-poppins">
              Real conversations, personalized lessons, anytime, anywhere.
            </Text>
          </View>

          <View className="relative mt-8 flex-1 items-center justify-center">
            <View className="absolute left-0 top-4 rounded-[24px] bg-[#EEF4FF] px-4 py-3">
              <Text className="text-sm font-semibold text-[#111827] font-poppins">
                Hello!
              </Text>
              <View style={styles.speechTailLightBlue} />
            </View>

            <View className="absolute right-0 top-8 rounded-[24px] bg-[#EEF2FF] px-4 py-3">
              <Text className="text-sm font-semibold text-[#4F46E5] font-poppins">
                ¡Hola!
              </Text>
              <View style={styles.speechTailLightPurple} />
            </View>

            <View className="absolute right-6 top-[40%] rounded-[24px] bg-[#FFF2F4] px-4 py-3">
              <Text className="text-sm font-semibold text-[#EF4444] font-poppins">
                你好!
              </Text>
              <View style={styles.speechTailLightPink} />
            </View>

            <Image
              source={images.mascotWelcome}
              className="h-[300px] w-full"
              style={{ resizeMode: "contain" }}
            />
          </View>

          <View className="mt-6 flex-row items-center justify-center gap-2">
            <View className="h-3 w-3 rounded-full bg-brand-purple" />
            <View className="h-3 w-3 rounded-full bg-[#D9D9D9]" />
            <View className="h-3 w-3 rounded-full bg-[#D9D9D9]" />
            <View className="h-3 w-3 rounded-full bg-[#D9D9D9]" />
          </View>

          <View className="mt-8">
            <Link href="/" asChild>
              <TouchableOpacity className="flex-row items-center justify-between rounded-[28px] bg-brand-purple px-6 py-4">
                <Text className="text-base font-semibold text-white font-poppins ">
                  Get Started
                </Text>
                <Text className="text-2xl font-semibold text-white">›</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F3FF",
  },
  speechTailLightBlue: {
    position: "absolute",
    bottom: -6,
    left: 16,
    width: 12,
    height: 12,
    backgroundColor: "#EEF4FF",
    transform: [{ rotate: "45deg" }],
  },
  speechTailLightPurple: {
    position: "absolute",
    bottom: -6,
    left: 16,
    width: 12,
    height: 12,
    backgroundColor: "#EEF2FF",
    transform: [{ rotate: "45deg" }],
  },
  speechTailLightPink: {
    position: "absolute",
    bottom: -6,
    left: 16,
    width: 12,
    height: 12,
    backgroundColor: "#FFF2F4",
    transform: [{ rotate: "45deg" }],
  },
});
