import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Link, useRouter, useLocalSearchParams } from "expo-router";

import { UNITS } from "@/data/units";
import { LESSONS } from "@/data/lessons";
import { useLanguageStore } from "@/store/language-store";
import { images } from "@/constants/images";

export default function UnitScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const unitId = (params.unitId as string) ?? null;

  const selectedLanguage = useLanguageStore((s) => s.selectedLanguage);

  const unit = useMemo(() => {
    if (!unitId) return null;
    return UNITS.find((u) => u.id === unitId) ?? null;
  }, [unitId]);

  // Find lessons for this unit
  let unitLessons = useMemo(() => {
    if (!unit) return [];
    return LESSONS.filter((l) => l.unitId === unit.id);
  }, [unit]);

  // If selected language has fewer than 2 lessons in the dataset, extend with mock lessons
  if (selectedLanguage && unitLessons.length < 2) {
    const additional: typeof LESSONS = [];
    for (let i = 1; i <= 5; i++) {
      additional.push({
        id: `${selectedLanguage.code}-auto-${i}`,
        unitId: unit?.id ?? `${selectedLanguage.code}-unit-auto`,
        title: `Lesson ${unitLessons.length + i}`,
        description: "Auto generated lesson",
        icon: "📘",
        xpReward: 5,
        goals: [{ description: "Complete activities", xpReward: 5 }],
        vocabulary: [],
        phrases: [],
        activities: [],
        aiTeacherPrompt: {
          systemPrompt: "",
          introMessage: "",
          topics: [],
        },
      } as any);
    }

    unitLessons = [...unitLessons, ...additional];
  }

  // Mock local progress state for lessons
  const [progressMap] = useState<Record<string, "completed" | "in-progress" | "locked">>(() => {
    const map: Record<string, "completed" | "in-progress" | "locked"> = {};

    unitLessons.forEach((lesson, idx) => {
      if (idx === 0) map[lesson.id] = "completed";
      else if (idx === 1) map[lesson.id] = "completed";
      else if (idx === 2) map[lesson.id] = "in-progress";
      else map[lesson.id] = "locked";
    });

    return map;
  });

  if (!unit) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View className="p-6">
          <Text>No unit found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const totalLessons = unitLessons.length;
  const currentIndex = unitLessons.findIndex((l) => progressMap[l.id] === "in-progress");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header image and title */}
        <View style={{ height: 230 }} className="bg-white">
          <Image
            source={images.palace}
            style={{ width: "100%", height: 230 }}
            resizeMode="cover"
          />

          <View className="absolute left-4 top-12">
            <Link href="..">
              <TouchableOpacity className="p-2 bg-white rounded-full opacity-90">
                <Text className="text-xl">‹</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <View className="absolute left-6 top-28">
            <Text className="text-2xl font-semibold text-white">{unitLessons[currentIndex >= 0 ? currentIndex : 0]?.title ?? unit.title}</Text>
            <Text className="text-sm text-white/90">Unit {unit.order} • {currentIndex + 1} / {totalLessons} lessons</Text>
          </View>
        </View>

        {/* Tab selector (Lessons / Practice) */}
        <View className="p-4 bg-transparent">
          <View className="flex-row bg-white rounded-2xl p-1 mx-4 shadow-sm">
            <View className="flex-1 items-center py-3 rounded-2xl bg-white">
              <Text className="text-purple-600 font-semibold">Lessons</Text>
            </View>
            <View className="flex-1 items-center py-3 rounded-2xl">
              <Text className="text-gray-400">Practice</Text>
            </View>
          </View>
        </View>

        {/* Lessons list */}
        <View className="mt-4 px-4">
          {unitLessons.map((lesson, idx) => {
            const status = progressMap[lesson.id] ?? "locked";
            const isActive = status === "in-progress";
            const isCompleted = status === "completed";

            return (
              <TouchableOpacity
                key={lesson.id}
                activeOpacity={0.8}
                onPress={() => router.push({ pathname: "/lesson", params: { lessonId: lesson.id } })}
                className={`bg-white rounded-2xl px-4 py-5 mb-3 flex-row items-center justify-between ${isActive ? "border-2 border-purple-300" : "border border-gray-100"}`}
              >
                <View style={{ flex: 1 }}>
                  <Text className="text-xs text-gray-400">Lesson {idx + 1}</Text>
                  <Text className="text-base font-semibold mt-1">{lesson.title}</Text>
                  {isActive ? (
                    <Text className="text-sm text-purple-600 mt-1">In progress</Text>
                  ) : (
                    !isCompleted && <Text className="text-sm text-gray-400 mt-1">0 / 6 lessons</Text>
                  )}
                </View>

                <View style={{ width: 56, alignItems: "center" }}>
                  {isCompleted ? (
                    <View className="w-8 h-8 rounded-full bg-green-100 items-center justify-center">
                      <Text className="text-green-600">✓</Text>
                    </View>
                  ) : isActive ? (
                    <Image
                      source={images.treasure}
                      style={{ width: 44, height: 44 }}
                      resizeMode="contain"
                    />
                  ) : (
                    <View className="w-8 h-8 rounded-full border border-gray-300 items-center justify-center">
                      <Text className="text-gray-400">🔒</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
