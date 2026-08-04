import { useAuth, useClerk } from "@clerk/expo";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();

  return (
    <View className="flex-1 bg-neutral-background px-6 pt-16 items-center justify-center">
      <Text className="h1">Duolingo Clone</Text>

      {isSignedIn ? (
        <TouchableOpacity
          onPress={() => signOut()}
          className="mt-8 flex-row items-center justify-between rounded-[28px] bg-red-500 px-6 py-4"
        >
          <Text className="font-bold text-white">Sign Out</Text>
        </TouchableOpacity>
      ) : (
        <Link href="/onboarding" asChild>
          <TouchableOpacity className="mt-8 flex-row items-center justify-between rounded-[28px] bg-brand-purple px-6 py-4">
            <Text className="font-bold text-white">Open Onboarding</Text>
          </TouchableOpacity>
        </Link>
      )}

      <Link href="/language-selection" asChild>
        <TouchableOpacity className="mt-4 flex-row items-center justify-between rounded-[28px] bg-white px-6 py-4">
          <Text className="text-neutral-900">Choose language</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
