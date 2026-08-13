import React from "react";
import { View, Text } from "react-native";

import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { UNITS } from "@/data/units";
import { useLanguageStore } from "@/store/language-store";
import { useRouter } from "expo-router";

export default function LearnScreen() {
  const selectedLanguage = useLanguageStore((s) => s.selectedLanguage);
  const router = useRouter();

  const unitsForLang = UNITS.filter(
    (u) => u.languageCode === selectedLanguage?.code,
  );

  return (
    <View className="flex-1 bg-neutral-background">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text className="text-2xl font-semibold mb-4">Learn</Text>

        {unitsForLang.map((unit) => (
          <TouchableOpacity
            key={unit.id}
            activeOpacity={0.8}
            onPress={() => router.push({ pathname: "/unit", params: { unitId: unit.id } })}
            className="bg-white rounded-2xl p-4 mb-3"
          >
            <Text className="font-semibold">{unit.title}</Text>
            <Text className="text-sm text-gray-500">{unit.description}</Text>
          </TouchableOpacity>
        ))}

        {unitsForLang.length === 0 && (
          <Text className="text-gray-500 mt-6">No units available for this language.</Text>
        )}
      </ScrollView>
    </View>
  );
}
