import React, { useMemo } from "react";
import { SafeAreaView, View, Text, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";

import { LESSONS } from "@/data/lessons";
import { images } from "@/constants/images";

export default function LessonScreen() {
  const params = useLocalSearchParams();
  const lessonId = (params.lessonId as string) ?? null;

  const lesson = useMemo(() => LESSONS.find((l) => l.id === lessonId) ?? null, [lessonId]);

  if (!lesson) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View className="p-6">
          <Text>Lesson not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="p-4">
        <View className="flex-row items-center mb-4">
          <Link href="..">
            <TouchableOpacity className="p-2 mr-2 bg-white rounded-full">
              <Text className="text-xl">‹</Text>
            </TouchableOpacity>
          </Link>

          <Text className="text-xl font-semibold">{lesson.title}</Text>
        </View>

        <Image source={images.palace} style={{ width: "100%", height: 180 }} resizeMode="cover" />

        <View className="mt-4">
          <Text className="text-base font-semibold">{lesson.title}</Text>
          <Text className="text-sm text-gray-500 mt-2">{lesson.description}</Text>
        </View>

        <View className="mt-6">
          <Text className="font-semibold mb-2">Activities</Text>
          {lesson.activities.slice(0, 3).map((a) => (
            <View key={a.id} className="bg-white rounded-xl p-3 mb-2 border border-gray-100">
              <Text className="text-sm">{a.question}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
