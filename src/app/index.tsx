import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 bg-neutral-background px-6 pt-16 items-center justify-center">
      <Text className="h1">Duolingo Clone</Text>
      <Link href="/onboarding" asChild>
        <TouchableOpacity className="rounded-3xl bg-brand-purple px-5 py-5 items-center justify-center">
          <Text className="text-white font-bold">Open Onboarding</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
