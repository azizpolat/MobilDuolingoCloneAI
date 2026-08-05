import { useUser } from "@clerk/expo";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { images } from "@/constants/images";
import { LESSONS } from "@/data/lessons";
import { UNITS } from "@/data/units";
import { useLanguageStore } from "@/store/language-store";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const { user } = useUser();

  const selectedLanguage = useLanguageStore((s) => s.selectedLanguage);

  // Find a representative unit and lesson for the selected language
  const primaryUnit = UNITS.find(
    (u) => u.languageCode === selectedLanguage?.code,
  );

  const primaryLesson = primaryUnit
    ? (LESSONS.find((l) => l.unitId === primaryUnit.id) ?? null)
    : null;

  // Simple progress values to match design (15 / 20)
  const dailyXP = 15;
  const dailyGoal = 20;
  const progressRatio = Math.min(1, dailyXP / dailyGoal);
  const color = "#6B7280";
  const size = 26;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full overflow-hidden mr-3">
              {selectedLanguage?.flag ? (
                <Image
                  source={{ uri: selectedLanguage.flag }}
                  style={{ width: 40, height: 40 }}
                />
              ) : (
                <View className="bg-gray-200 w-10 h-10 justify-center items-center">
                  <Text>🏳️</Text>
                </View>
              )}
            </View>

            <Text className="text-lg font-semibold">{`Hola, ${
              user?.firstName ?? "User"
            }! 👋`}</Text>
          </View>

          <View className="flex-row items-center">
            <View className="flex-row items-center mr-4">
              <Image
                source={images.streakFire}
                style={{ width: 20, height: 20 }}
              />
              <Text className="ml-2 font-medium">12</Text>
            </View>

            <TouchableOpacity>
              <View className="w-8 h-8 rounded-full justify-center items-center border border-gray-200">
                <Text>🔔</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Daily goal card */}
        <View className="bg-[#FFF6EC] rounded-2xl p-4 flex-row items-center justify-between mb-4">
          <View style={{ flex: 1 }}>
            <Text className="text-sm text-gray-600">Daily goal</Text>
            <View className="flex-row items-baseline mt-1">
              <Text className="text-3xl font-bold">{dailyXP}</Text>
              <Text className="ml-2 text-base text-gray-500">
                / {dailyGoal} XP
              </Text>
            </View>

            <View className="mt-3 w-full bg-[#FFE8C9] h-3 rounded-full overflow-hidden">
              <View
                style={{ width: `${progressRatio * 100}%`, height: 12 }}
                className="bg-orange-500"
              />
            </View>
          </View>

          <Image
            source={images.treasure}
            style={{ width: 72, height: 72, marginLeft: 12 }}
            resizeMode="contain"
          />
        </View>

        {/* Continue learning card */}
        <View className="rounded-2xl overflow-hidden mb-5 bg-gradient-to-r from-purple-600 to-purple-500">
          <View className="p-5 flex-row items-center justify-between">
            <View style={{ flex: 1 }}>
              <Text className="text-sm text-white/90">Continue learning</Text>
              <Text className="text-2xl font-bold text-white mt-2">
                {selectedLanguage?.name ?? "Language"}
              </Text>
              <Text className="text-sm text-white/90 mt-1">
                A1 • Unit {primaryUnit?.order ?? 1}
              </Text>

              <TouchableOpacity className="mt-4 bg-white px-4 py-2 rounded-full w-28 items-center">
                <Text className="text-purple-600 font-semibold">Continue</Text>
              </TouchableOpacity>
            </View>

            <Image
              source={images.palace}
              style={{ width: 110, height: 110, marginLeft: 12 }}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Today's plan header */}
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-base font-semibold">Today's plan</Text>
          <TouchableOpacity>
            <Text className="text-purple-600">View all</Text>
          </TouchableOpacity>
        </View>

        {/* Today's plan items */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between py-3">
            <View className="flex-row items-center">
              <View className="w-11 h-11 rounded-xl bg-purple-100 justify-center items-center mr-3">
                <Text className="text-xl">📘</Text>
              </View>
              <View>
                <Text className="font-medium">Lesson</Text>
                <Text className="text-sm text-gray-500">
                  {primaryLesson?.title ?? "At the café"}
                </Text>
              </View>
            </View>
            <View className="w-7 h-7 rounded-full bg-purple-600 justify-center items-center">
              <Text className="text-white">✓</Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between py-3">
            <View className="flex-row items-center">
              <View className="w-11 h-11 rounded-xl bg-purple-50 justify-center items-center mr-3">
                <Text className="text-xl">🎧</Text>
              </View>
              <View>
                <Text className="font-medium">AI Conversation</Text>
                <Text className="text-sm text-gray-500">
                  Talk about your day
                </Text>
              </View>
            </View>
            <View className="w-7 h-7 rounded-full border border-gray-300 justify-center items-center">
              <Text className="text-gray-400">○</Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between py-3">
            <View className="flex-row items-center">
              <View className="w-11 h-11 rounded-xl bg-red-100 justify-center items-center mr-3">
                <Text className="text-xl">🧠</Text>
              </View>
              <View>
                <Text className="font-medium">New words</Text>
                <Text className="text-sm text-gray-500">10 words</Text>
              </View>
            </View>
            <View className="w-7 h-7 rounded-full border border-gray-300 justify-center items-center">
              <Text className="text-gray-400">○</Text>
            </View>
          </View>
        </View>

        {/* Next up card */}
        <View className="bg-[#F2FFF3] rounded-2xl p-4 flex-row items-center justify-between">
          <View style={{ flex: 1 }}>
            <Text className="text-sm text-gray-600">Next up</Text>
            <Text className="text-lg font-semibold mt-1">AI Video Call</Text>
            <Text className="text-sm text-gray-500">Practice speaking</Text>
          </View>

          <View className="flex-row items-center">
            <Image
              source={{
                uri:
                  user?.imageUrl ??
                  "https://as2.ftcdn.net/v2/jpg/09/61/69/75/1000_F_961697523_EFd1m8P4tdcwB0TYvlQAagqKR1xHSuwk.webp",
              }}
              style={{
                width: 66,
                height: 66,
                borderRadius: 28,
                marginRight: 10,
              }}
            />

            <TouchableOpacity className="w-15 h-12 bg-green-300 rounded-full justify-center items-center">
              <Ionicons name="videocam" size={size} color={color} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
