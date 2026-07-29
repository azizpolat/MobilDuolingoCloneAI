import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { images } from "@/constants/images";

export default function Onboarding() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F3FF" }}>
      <View className="flex-1 bg-[#F4F3FF] px-6 pt-6">
        <View className="flex-row items-center gap-3">
          <Image source={images.mascotLogo} className="h-12 w-12" style={{ resizeMode: "contain" }} />
          <Text className="text-h4 font-semibold text-neutral-primary font-poppins">muolingo</Text>
        </View>

        <View className="mt-8 rounded-[42px] bg-white p-6 shadow-card">
          <View className="items-center">
            <Image
              source={images.mascotWelcome}
              className="h-72 w-full"
              style={{ resizeMode: "contain" }}
            />
          </View>

          <Text className="mt-6 text-h1 font-bold text-neutral-primary font-poppins">Welcome to muolingo</Text>
          <Text className="mt-3 text-body-large text-neutral-secondary font-poppins">
            Learn a new language with playful AI lessons, daily practice, and motivating rewards.
          </Text>

          <Link href="/" asChild>
            <TouchableOpacity className="mt-8 rounded-3xl bg-brand-purple px-5 py-4 items-center">
              <Text className="text-body-medium font-semibold text-white font-poppins">Start learning</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
