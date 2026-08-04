import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { languages } from '@/data/languages';
import { images } from '@/constants/images';

export default function LanguageSelection() {
  const [query, setQuery] = useState('');
  const [selectedCode, setSelectedCode] = useState<string | null>(languages[0]?.code ?? null);
  const router = useRouter();

  const filtered = languages.filter((l) =>
    l.name.toLowerCase().includes(query.toLowerCase()) ||
    l.nativeName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View className="flex-1 bg-neutral-background px-6 pt-12">
      {/* Header */}
      <View className="flex-row items-center mb-4">
        <Link href=".." asChild>
          <TouchableOpacity className="p-2">
            <Text className="text-2xl">‹</Text>
          </TouchableOpacity>
        </Link>
        <Text className="flex-1 text-center text-lg font-semibold">Choose a language</Text>
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

      <View className="space-y-3 flex-1">
        {filtered.map((lang) => {
          const selected = lang.code === selectedCode;
          return (
            <TouchableOpacity
              key={lang.code}
              activeOpacity={0.8}
              onPress={() => setSelectedCode(lang.code)}
              className={`flex-row items-center bg-white rounded-2xl px-4 py-4 ${selected ? 'border-2 border-purple-500' : ''}`}
            >
              <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center mr-4">
                <Text className="text-xl">{lang.flag}</Text>
              </View>
              <View className="flex-1">
                <Text className="font-medium text-base">{lang.name}</Text>
                <Text className="text-sm text-muted">{lang.description}</Text>
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

        {/* Confirmation button */}
        <View className="mt-2">
          <TouchableOpacity
            onPress={() => {
              // For now navigate back to home; in the real app this should persist selection to store
              router.push('/');
            }}
            className="flex-row items-center bg-white rounded-2xl px-4 py-4 justify-center"
          >
            <Text className="text-base font-medium">Confirm language</Text>
          </TouchableOpacity>
        </View>

        {/* Earth image at bottom */}
        <View className="items-center mt-auto mb-4">
          <Image source={images.earth} style={{ width: 360, height: 120, resizeMode: 'contain' }} />
        </View>
      </View>
    </View>
  );
}
