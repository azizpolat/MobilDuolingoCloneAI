import { images } from "@/constants/images";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useAuth, useSignIn } from "@clerk/expo";

export default function SignIn() {
  const router = useRouter();

  const { isLoaded, isSignedIn } = useAuth();
  const { signIn } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const codeInputs = useRef<(TextInput | null)[]>([]);

  const isFormValid = email.trim().length > 0;

  const handleSignIn = async () => {
    if (!isFormValid) return;

    // Clear code
    setCode(["", "", "", "", "", ""]);

    try {
      if (password.trim().length > 0) {
        // Attempt password authentication
        const { error } = await signIn.create({ identifier: email, password });
        if (error) {
          console.error("signIn.create error:", error);
          return;
        }

        // If sign-in creates a session, navigate to home
        router.replace("/");
        return;
      }

      // Passwordless: send email code
      const { error } = await signIn.create({ identifier: email });
      if (error) {
        console.error("signIn.create (passwordless) error:", error);
        return;
      }

      const { error: sendError } = await (
        signIn as any
      ).verifications.sendEmailCode();
      if (sendError) {
        console.error("sendEmailCode error:", sendError);
        return;
      }

      // Show verification modal and focus first input
      setShowVerificationModal(true);
      setTimeout(() => {
        codeInputs.current[0]?.focus();
      }, 300);
    } catch (e) {
      console.error("handleSignIn error:", e);
    }
  };

  /*
   * 6 haneli doğrulama kodu
   */
  const handleCodeChange = (text: string, index: number) => {
    // Sadece rakam kabul et
    if (!/^\d*$/.test(text)) {
      return;
    }

    // Her kutuda sadece son girilen rakamı tut
    const digit = text.slice(-1);

    const nextCode = [...code];

    nextCode[index] = digit;

    setCode(nextCode);

    // Rakam girildiyse sonraki kutuya geç
    if (digit && index < 5) {
      codeInputs.current[index + 1]?.focus();
    }

    // 6 hane tamamlandı
    if (nextCode.every((item) => item.length === 1)) {
      const combinedCode = nextCode.join("");
      (async () => {
        try {
          const { error } = await (signIn as any).verifications.verifyEmailCode(
            { code: combinedCode },
          );
          if (error) {
            console.error("verifyEmailCode error:", error);
            return;
          }

          // On successful verification, navigate to home
          setTimeout(() => {
            setShowVerificationModal(false);
            router.replace("/");
          }, 150);
        } catch (e) {
          console.error("verification error:", e);
        }
      })();
    }
  };

  /*
   * Backspace ile önceki kutuya dön
   */
  const handleCodeKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      codeInputs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            hitSlop={12}
          >
            <Ionicons name="chevron-back" size={27} color="#0D132B" />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>Welcome back!</Text>

            <Text style={styles.subtitle}>
              Continue your language journeyaad ✨
            </Text>
          </View>

          {/* Mascot */}
          <View style={styles.mascotContainer}>
            {/* Left sparkle */}
            <View style={styles.sparkleLeft}>
              <Text style={styles.sparkleText}>✨</Text>
            </View>

            {/* Blue sparkle */}
            <View style={styles.sparkleBlue}>
              <Text style={styles.blueSparkleText}>✦</Text>
            </View>

            {/* Small sparkle */}
            <View style={styles.sparkleSmall}>
              <Text style={styles.blueSparkleText}>✦</Text>
            </View>

            <Image
              source={images.mascotAuth}
              style={styles.mascot}
              resizeMode="contain"
            />
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Email */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>

              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="alex@gmail.com"
                placeholderTextColor="#A0A7B8"
                style={styles.input}
                returnKeyType="next"
              />
            </View>

            {/* Password */}
            <View style={styles.passwordContainer}>
              <View style={styles.passwordContent}>
                <Text style={styles.inputLabel}>Password</Text>

                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="••••••••••"
                  placeholderTextColor="#A0A7B8"
                  style={styles.input}
                  returnKeyType="done"
                  onSubmitEditing={handleSignIn}
                />
              </View>

              <TouchableOpacity
                onPress={() => setShowPassword((previous) => !previous)}
                hitSlop={10}
                style={styles.eyeButton}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye"}
                  size={23}
                  color="#70778A"
                />
              </TouchableOpacity>
            </View>

            {/* Sign In */}
            <Pressable
              onPress={handleSignIn}
              disabled={!isFormValid}
              style={[
                styles.signInButton,
                isFormValid
                  ? styles.signInButtonActive
                  : styles.signInButtonDisabled,
              ]}
              testID="sign-in-button"
            >
              <Text style={styles.signInText}>Sign In</Text>
            </Pressable>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />

              <Text style={styles.dividerText}>or continue with</Text>

              <View style={styles.divider} />
            </View>

            {/* Google */}
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
              <View style={styles.socialIcon}>
                <AntDesign name="google" size={21} color="#4285F4" />
              </View>

              <Text style={styles.socialText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Facebook */}
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
              <View style={styles.socialIcon}>
                <FontAwesome name="facebook" size={21} color="#1877F2" />
              </View>

              <Text style={styles.socialText}>Continue with Facebook</Text>
            </TouchableOpacity>

            {/* Apple */}
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
              <View style={styles.socialIcon}>
                <AntDesign name="apple" size={21} color="#000000" />
              </View>

              <Text style={styles.socialText}>Continue with Apple</Text>
            </TouchableOpacity>

            {/* Sign Up */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupNormalText}>
                Don't have an account?{" "}
              </Text>

              <TouchableOpacity onPress={() => router.replace("/signup")}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        visible={showVerificationModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowVerificationModal(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.modalContent}>
            {/* Close */}
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setShowVerificationModal(false)}
              hitSlop={10}
            >
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>

            {/* Email Icon */}
            <View style={styles.emailIconCircle}>
              <Ionicons name="mail-outline" size={27} color="#5B2BFF" />
            </View>

            {/* Title */}
            <Text style={styles.modalTitle}>Check your email</Text>

            {/* Description */}
            <Text style={styles.modalDescription}>
              We sent a 6-digit verification code to{" "}
              <Text style={styles.modalEmail}>{email}</Text>. Enter it below.
            </Text>

            {/* Code Inputs */}
            <View style={styles.codeRow}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(element) => {
                    codeInputs.current[index] = element;
                  }}
                  value={digit}
                  onChangeText={(text) => handleCodeChange(text, index)}
                  onKeyPress={(event) => handleCodeKeyPress(event, index)}
                  keyboardType="number-pad"
                  inputMode="numeric"
                  maxLength={1}
                  textAlign="center"
                  selectTextOnFocus
                  style={[
                    styles.codeInput,
                    digit ? styles.codeInputActive : null,
                  ]}
                />
              ))}
            </View>

            {/* Cancel */}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowVerificationModal(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scroll: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    paddingHorizontal: 40,
    paddingBottom: 35,
  },

  backButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 12,
    marginLeft: -6,
  },

  header: {
    alignItems: "flex-end",
  },

  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 32,
    lineHeight: 40,
    color: "#0D132B",
    letterSpacing: -0.7,
  },

  subtitle: {
    marginTop: 7,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    lineHeight: 24,
    color: "#6B7280",
  },

  mascotContainer: {
    height: 185,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: 4,
    marginBottom: 8,
  },

  mascot: {
    width: 230,
    height: 175,
  },

  sparkleLeft: {
    position: "absolute",
    left: 66,
    top: 32,
    width: 55,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#FFF0CE",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },

  sparkleText: {
    fontSize: 17,
  },

  sparkleBlue: {
    position: "absolute",
    right: 75,
    top: 48,
    width: 40,
    height: 32,
    borderRadius: 18,
    backgroundColor: "#E6F0FF",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },

  sparkleSmall: {
    position: "absolute",
    right: 48,
    top: 95,
    width: 30,
    height: 28,
    borderRadius: 15,
    backgroundColor: "#F1F7FF",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },

  blueSparkleText: {
    color: "#5266E8",
    fontSize: 14,
  },

  form: {
    width: "100%",
  },

  inputContainer: {
    height: 96,
    borderWidth: 1.2,
    borderColor: "#E8EAF1",
    borderRadius: 18,
    backgroundColor: "#FCFCFF",
    paddingHorizontal: 17,
    paddingTop: 13,
    marginBottom: 12,
  },

  passwordContainer: {
    height: 96,
    borderWidth: 1.2,
    borderColor: "#E8EAF1",
    borderRadius: 18,
    backgroundColor: "#FCFCFF",
    paddingLeft: 17,
    paddingRight: 13,
    paddingTop: 13,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  passwordContent: {
    flex: 1,
  },

  inputLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    lineHeight: 20,
    color: "#6B7280",
    marginBottom: 4,
  },

  input: {
    height: 32,
    padding: 0,
    margin: 0,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#0D132B",
  },

  eyeButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },

  signInButton: {
    width: "100%",
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },

  signInButtonActive: {
    backgroundColor: "#5B2BFF",

    shadowColor: "#5B2BFF",
    shadowOpacity: 0.2,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 5,
  },

  signInButtonDisabled: {
    backgroundColor: "#D9D5FF",
  },

  signInText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#FFFFFF",
  },

  dividerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E7E8ED",
  },

  dividerText: {
    marginHorizontal: 12,
    fontFamily: "Poppins-Regular",
    fontSize: 15,
    color: "#9CA3AF",
  },

  socialButton: {
    width: "100%",
    height: 64,
    borderWidth: 1.2,
    borderColor: "#E8EAF1",
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  socialIcon: {
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 17,
  },

  socialText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#111827",
  },

  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },

  signupNormalText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#6B7280",
  },

  signupLink: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#5B2BFF",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(13, 19, 43, 0.45)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  modalContent: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    paddingHorizontal: 22,
    paddingTop: 30,
    paddingBottom: 24,
    alignItems: "center",

    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowRadius: 25,
    shadowOffset: {
      width: 0,
      height: 10,
    },

    elevation: 10,
  },

  modalClose: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },

  emailIconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#F0ECFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  modalTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    lineHeight: 30,
    color: "#0D132B",
    textAlign: "center",
    marginBottom: 8,
  },

  modalDescription: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    lineHeight: 20,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 23,
  },

  modalEmail: {
    fontFamily: "Poppins-SemiBold",
    color: "#0D132B",
  },

  codeRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  codeInput: {
    width: 43,
    height: 54,
    borderWidth: 1.2,
    borderColor: "#E8EAF1",
    borderRadius: 13,
    backgroundColor: "#FCFCFF",

    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: "#0D132B",

    padding: 0,
  },

  codeInputActive: {
    borderColor: "#5B2BFF",
    backgroundColor: "#F8F6FF",
  },

  cancelButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },

  cancelText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#6B7280",
  },
});
