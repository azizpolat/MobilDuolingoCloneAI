import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 bg-neutral-background px-6 pt-16">
      <Text className="text-h1 font-bold text-neutral-primary font-poppins">
        lingua
      </Text>
      <Text className="mt-3 text-body-large text-neutral-secondary font-poppins">
        A playful language learning system built with the Lingua design tokens.
      </Text>

      <View className="mt-8 rounded-[28px] bg-neutral-surface border border-neutral-border p-5 shadow-lg shadow-card">
        <Text className="text-h3 font-semibold text-neutral-primary font-poppins">
          Brand colors
        </Text>
        <View className="mt-4 flex-row flex-wrap justify-between gap-3">
          <View className="h-24 w-[48%] rounded-3xl bg-brand-purple p-4">
            <Text className="text-body-medium font-semibold text-white font-poppins">
              Lingua Purple
            </Text>
            <Text className="mt-2 text-caption text-white/85 font-poppins">
              #6C4EF5
            </Text>
          </View>
          <View className="h-24 w-[48%] rounded-3xl bg-brand-deep p-4">
            <Text className="text-body-medium font-semibold text-white font-poppins">
              Deep Purple
            </Text>
            <Text className="mt-2 text-caption text-white/85 font-poppins">
              #5B3BF6
            </Text>
          </View>
          <View className="h-24 w-[48%] rounded-3xl bg-brand-blue p-4">
            <Text className="text-body-medium font-semibold text-white font-poppins">
              Lingua Blue
            </Text>
            <Text className="mt-2 text-caption text-white/85 font-poppins">
              #4DB8FF
            </Text>
          </View>
          <View className="h-24 w-[48%] rounded-3xl bg-brand-green p-4">
            <Text className="text-body-medium font-semibold text-white font-poppins">
              Lingua Green
            </Text>
            <Text className="mt-2 text-caption text-white/85 font-poppins">
              #21C16B
            </Text>
          </View>
        </View>
      </View>

      <View className="mt-6">
        <Link href="/onboarding" asChild>
          <TouchableOpacity className="rounded-3xl bg-brand-purple px-5 py-4 items-center">
            <Text className="text-body-medium font-semibold text-white font-poppins">
              Open onboarding
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-5 rounded-[28px] bg-neutral-surface border border-neutral-border p-5 shadow-lg shadow-card">
        <Text className="text-h3 font-semibold text-neutral-primary font-poppins">
          Typography
        </Text>
        <View className="mt-4 space-y-3">
          <View>
            <Text className="text-h1 font-bold text-neutral-primary font-poppins">
              H1 • 32px
            </Text>
            <Text className="text-body-small text-neutral-secondary font-poppins">
              Page / screen title
            </Text>
          </View>
          <View>
            <Text className="text-h2 font-semibold text-neutral-primary font-poppins">
              H2 • 24px
            </Text>
            <Text className="text-body-small text-neutral-secondary font-poppins">
              Section title
            </Text>
          </View>
          <View>
            <Text className="text-h3 font-semibold text-neutral-primary font-poppins">
              H3 • 20px
            </Text>
            <Text className="text-body-small text-neutral-secondary font-poppins">
              Card / module title
            </Text>
          </View>
          <View>
            <Text className="text-h4 font-medium text-neutral-primary font-poppins">
              H4 • 16px
            </Text>
            <Text className="text-body-small text-neutral-secondary font-poppins">
              Subheading
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
