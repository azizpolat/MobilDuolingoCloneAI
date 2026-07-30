import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValid = email.trim().length > 0 && password.trim().length > 0;

  return (
    <SafeAreaView style={styles.appBackground}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.headerArea} className="px-6 pt-4">
          <TouchableOpacity onPress={() => router.back()} className="mb-2">
            <Text className="text-2xl">‹</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <ScrollView
            contentContainerStyle={styles.cardScroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text className="text-[34px] font-bold text-[#0D132B] font-poppins text-left">
              Create your account
            </Text>
            <Text className="mt-2 text-[15px] leading-7 text-[#6B7280] font-poppins">
              Start your language journey today ✨
            </Text>

            <View className="items-center mt-6">
              <Image
                source={images.mascotAuth}
                style={{ width: 180, height: 160, resizeMode: "contain" }}
              />
            </View>

            <View className="mt-6">
              <View className="rounded-[12px] border border-[#EEF0F6] bg-white p-4 mb-4">
                <Text className="text-sm text-[#6B7280] mb-1">Email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="alex@gmail.com"
                  placeholderTextColor="#9CA3AF"
                  className="text-base text-[#0D132B]"
                />
              </View>

              <View className="rounded-[12px] border border-[#EEF0F6] bg-white p-4 mb-6 flex-row items-center justify-between">
                <View style={{ flex: 1 }}>
                  <Text className="text-sm text-[#6B7280] mb-1">Password</Text>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholder="••••••••••"
                    placeholderTextColor="#9CA3AF"
                    className="text-base text-[#0D132B]"
                  />
                </View>
                <TouchableOpacity className="ml-3">
                  <Text className="text-[#6B7280]">👁️</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                activeOpacity={0.9}
                disabled={!isValid}
                onPress={() => {
                  if (isValid) {
                    router.replace("/");
                  }
                }}
                className={`rounded-[14px] px-6 py-4 items-center mb-6 ${
                  isValid ? "bg-gradient-to-r from-[#5B2BFF] to-[#7C42FF]" : "bg-[#D8D4FF]"
                }`}
                style={styles.primaryButton}
              >
                <Text className="text-white text-lg font-semibold font-poppins">Sign Up</Text>
              </TouchableOpacity>

              <View className="flex-row items-center justify-center mb-4">
                <View className="h-px flex-1 bg-[#E9E9F0] mr-3" />
                <Text className="text-[#9CA3AF]">or continue with</Text>
                <View className="h-px flex-1 bg-[#E9E9F0] ml-3" />
              </View>

              <TouchableOpacity className="rounded-[12px] border border-[#EEF0F6] px-4 py-3 mb-3 flex-row items-center">
                <Image source={require("../../assets/images/partial-react-logo.png")} style={{ width: 24, height: 24, marginRight: 12 }} />
                <Text className="text-base">Continue with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity className="rounded-[12px] border border-[#EEF0F6] px-4 py-3 mb-3 flex-row items-center">
                <Image source={require("../../assets/images/partial-react-logo.png")} style={{ width: 24, height: 24, marginRight: 12 }} />
                <Text className="text-base">Continue with Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity className="rounded-[12px] border border-[#EEF0F6] px-4 py-3 mb-6 flex-row items-center">
                <Image source={require("../../assets/images/partial-react-logo.png")} style={{ width: 24, height: 24, marginRight: 12 }} />
                <Text className="text-base">Continue with Apple</Text>
              </TouchableOpacity>

              <View className="items-center">
                <Text className="text-[#6B7280]">Already have an account? <Text onPress={() => router.replace("/signin")} className="text-[#5B2BFF]">Log in</Text></Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appBackground: { flex: 1, backgroundColor: "#F4F3FF" },
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  flex: { flex: 1 },
  headerArea: { height: 60 },
  card: { flex: 1, backgroundColor: "#FFFFFF", borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: 24 },
  cardScroll: { paddingBottom: 40 },
  scrollContent: { flexGrow: 1 },
  primaryButton: {
    shadowColor: "#5B2BFF",
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
  },
});
