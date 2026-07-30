import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
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
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const inputs = useRef<Array<TextInput | null>>([]);

  function openVerification() {
    // Simulate sending email then show modal
    setShowModal(true);
  }

  function handleCodeChange(text: string, idx: number) {
    if (!/^[0-9]*$/.test(text)) return;
    const digit = text.slice(-1);
    const next = [...code];
    next[idx] = digit || "";
    setCode(next);

    if (digit) {
      // focus next
      if (idx < inputs.current.length - 1) {
        inputs.current[idx + 1]?.focus();
      }
    }

    // check complete
    if (next.every((d) => d.length === 1)) {
      // close modal and navigate home
      setTimeout(() => {
        setShowModal(false);
        router.replace("/");
      }, 250);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View className="flex-1 bg-white px-6 pt-6">
        <TouchableOpacity onPress={() => router.back()} className="mb-4">
          <Text className="text-2xl">‹</Text>
        </TouchableOpacity>

        <Text className="text-[32px] font-bold text-[#0D132B] font-poppins">
          Create your account
        </Text>
        <Text className="mt-2 text-[15px] text-[#6B7280] font-poppins">
          Start your language journey today ✨
        </Text>

        <View className="items-center mt-6">
          <Image
            source={images.mascotAuth}
            style={{ width: 180, height: 160, resizeMode: "contain" }}
          />
        </View>

        <View className="mt-6">
          <View className="rounded-[12px] border border-[#EEF0F6] bg-white p-4 shadow-sm mb-4">
            <Text className="text-sm text-[#6B7280] mb-1">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="alex@gmail.com"
              className="text-base text-[#0D132B]"
            />
          </View>

          <View className="rounded-[12px] border border-[#EEF0F6] bg-white p-4 shadow-sm mb-6 flex-row items-center justify-between">
            <View style={{ flex: 1 }}>
              <Text className="text-sm text-[#6B7280] mb-1">Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="••••••••••"
                className="text-base text-[#0D132B]"
              />
            </View>
            <TouchableOpacity className="ml-3">
              <Text className="text-[#6B7280]">👁️</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={openVerification}
            className="rounded-[14px] bg-gradient-to-r from-[#5B2BFF] to-[#7C42FF] px-6 py-4 items-center mb-6"
            style={{ shadowColor: "#7C42FF", shadowOpacity: 0.2, shadowRadius: 10 }}
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

        <Modal visible={showModal} transparent animationType="fade">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              <Text className="text-lg font-semibold mb-2">Check your email</Text>
              <Text className="text-sm text-[#6B7280] mb-4">We sent a 6-digit verification code to {email || "your email"}. Enter it below.</Text>

              <View style={styles.codeRow}>
                {code.map((digit, idx) => (
                  <TextInput
                    key={idx}
                    ref={(el) => (inputs.current[idx] = el)}
                    value={digit}
                    onChangeText={(t) => handleCodeChange(t, idx)}
                    keyboardType="number-pad"
                    maxLength={1}
                    style={styles.codeInput}
                    textAlign="center"
                    placeholder="-"
                  />
                ))}
              </View>

              <TouchableOpacity className="mt-6" onPress={() => setShowModal(false)}>
                <Text className="text-[#6B7280]">Cancel</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  modalContent: { width: "100%", backgroundColor: "white", borderRadius: 16, padding: 20, alignItems: "center", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10 },
  codeRow: { flexDirection: "row", justifyContent: "space-between", width: "100%", paddingHorizontal: 12 },
  codeInput: { width: 44, height: 56, borderRadius: 10, borderWidth: 1, borderColor: "#E9E9F0", fontSize: 20 },
});
