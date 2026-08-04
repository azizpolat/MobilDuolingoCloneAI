import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { useLanguageStore } from "@/store/language-store";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LanguageSelection() {
  const [query, setQuery] = useState("");

  const selectedLanguageCode = useLanguageStore(
    (state) => state.selectedLanguageCode,
  );

  const setSelectedLanguageCode = useLanguageStore(
    (state) => state.setSelectedLanguageCode,
  );

  const router = useRouter();

  const filtered = languages.filter(
    (language) =>
      language.name.toLowerCase().includes(query.toLowerCase()) ||
      language.nativeName.toLowerCase().includes(query.toLowerCase()),
  );

  const selectedCode = selectedLanguageCode;

  const handleConfirmLanguage = () => {
    if (!selectedCode) return;

    setSelectedLanguageCode(selectedCode);

    router.replace("/");
  };

  const handlePress = () => {
    router.replace("/");
  };

  return (
    <View className="flex-1 bg-neutral-background px-6 pt-12">
      {/* Header */}
      <View className="flex-row items-center mb-4">
        <Link href="..">
          <TouchableOpacity className="p-2" onPress={() => handlePress()}>
            <Text className="text-2xl">‹</Text>
          </TouchableOpacity>
        </Link>

        <Text className="flex-1 text-center text-lg font-semibold">
          Choose a language
        </Text>

        <View style={{ width: 40 }} />
      </View>

      {/* Search */}
      <View className="mb-6">
        <View className="flex-row items-center bg-white rounded-full px-4 py-3 shadow-sm">
          <Text className="text-muted mr-3">🔍</Text>

          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search languages"
            placeholderTextColor="#9AA0B4"
            className="flex-1 text-base"
          />
        </View>
      </View>

      <Text className="mb-3 font-semibold">Popular</Text>

      <View className="flex-1">
        {filtered.map((lang) => {
          const selected = lang.code === selectedCode;

          return (
            <TouchableOpacity
              key={lang.code}
              activeOpacity={0.8}
              onPress={() => setSelectedLanguageCode(lang.code)}
              className={`
                flex-row items-center
                bg-white
                rounded-2xl
                px-4
                py-4
                mb-3
                ${selected ? "border-2 border-purple-500" : ""}
              `}
            >
              <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center mr-4">
                <Image
                  source={{
                    uri: lang.flag,
                  }}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                  }}
                />
              </View>

              <View className="flex-1">
                <Text className="font-medium text-base">{lang.name}</Text>

                <Text className="text-sm text-muted">{lang.learners}</Text>
              </View>

              {selected ? (
                <View className="w-8 h-8 rounded-full bg-purple-500 items-center justify-center">
                  <Text className="text-white">✓</Text>
                </View>
              ) : (
                <Text className="text-muted">›</Text>
              )}
            </TouchableOpacity>
          );
        })}

        <View className="items-center mt-4">
          <TouchableOpacity
            onPress={handleConfirmLanguage}
            className="
              rounded-[28px]
              bg-brand-purple
              px-6
              py-4
            "
          >
            <Text className="text-base text-white font-bold">
              Confirm Language
            </Text>
          </TouchableOpacity>
        </View>

        {/* Earth Image */}
        <View className="flex-1 justify-end items-center">
          <Image
            source={images.earth}
            style={{
              width: 360,
              height: 220,
              resizeMode: "contain",
            }}
          />
        </View>
      </View>
    </View>
  );
}
