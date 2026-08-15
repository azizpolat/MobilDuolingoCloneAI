import { images } from "@/constants/images";
import { UNITS } from "@/data/units";

import { useLanguageStore } from "@/store/language-store";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function LearnScreen() {
  const selectedLanguage = useLanguageStore((s) => s.selectedLanguage);

  const router = useRouter();

  const unitsForLang = UNITS.filter(
    (u) => u.languageCode === selectedLanguage?.code,
  );

  return (
    <View className=" bg-neutral-background">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text className="text-2xl font-semibold mb-4 mt-10">Learn</Text>

        {unitsForLang.map((unit) => (
          <TouchableOpacity
            key={unit.id}
            activeOpacity={0.8}
            onPress={() =>
              router.push({ pathname: "/unit", params: { unitId: unit.id } })
            }
            className="bg-white p-4 mb-3 flex"
          >
            <View className="rounded-xl bg-white p-4 overflow-hidden border border-gray-200">
              <Text className="font-semibold mb-2">{unit.title}</Text>
              <Text className="text-sm text-gray-500">{unit.description}</Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={images.mascotAuth}
                style={{ width: 400, height: 400 }}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        ))}

        {unitsForLang.length === 0 && (
          <Text className="text-gray-500 mt-6">
            No units available for this language.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
