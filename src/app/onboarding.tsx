import { images } from "@/constants/images";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Onboarding() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.screen}>
        <View style={styles.logoContainer}>
          <Image
            source={images.mascotLogo}
            style={styles.logoImage}
            resizeMode="contain"
          />

          <Text style={styles.logoText}>Duolingo</Text>
        </View>

        <View style={styles.content}>
          {/* Header */}
          <View style={styles.heading}>
            <Text style={styles.title}>
              Your AI language
              <Text style={styles.titlePurple}> teacher.</Text>
            </Text>

            <Text style={styles.subtitle}>
              Real conversations, personalized lessons, anytime, anywhere.
            </Text>
          </View>

          <View style={styles.illustrationArea}>
            {/* Hello */}
            <View style={styles.helloBubble}>
              <Text style={styles.helloText}>Hello!</Text>

              <View style={styles.helloTail} />
            </View>

            {/* Hola */}
            <View style={styles.holaBubble}>
              <Text style={styles.holaText}>¡Hola!</Text>

              <View style={styles.holaTail} />
            </View>

            {/* Chinese */}
            <View style={styles.chineseBubble}>
              <Text style={styles.chineseText}>你好!</Text>

              <View style={styles.chineseTail} />
            </View>

            {/* Mascot */}
            <Image
              source={images.mascotWelcome}
              style={styles.mascot}
              resizeMode="contain"
            />
          </View>

          <View style={styles.pagination}>
            <View style={[styles.paginationDot, styles.paginationDotActive]} />

            <View style={styles.paginationDot} />
            <View style={styles.paginationDot} />
            <View style={styles.paginationDot} />
          </View>

          <Link href="/signup" asChild>
            <TouchableOpacity activeOpacity={0.85} style={styles.getStarted}>
              <Text style={styles.getStartedText}>Get Started</Text>

              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 40,
    paddingTop: 16,
  },

  logoContainer: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  logoImage: {
    width: 42,
    height: 42,
    marginRight: 10,
  },

  logoText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 21,
    color: "#0D132B",
  },

  content: {
    flex: 1,
    marginTop: 18,
    paddingTop: 10,
    paddingBottom: 25,
  },

  heading: {
    alignItems: "center",
    paddingHorizontal: 0,
  },

  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 32,
    lineHeight: 40,
    color: "#0D132B",
    textAlign: "center",
    letterSpacing: -0.7,
  },

  titlePurple: {
    color: "#5B2BFF",
  },

  subtitle: {
    marginTop: 8,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    lineHeight: 24,
    color: "#6B7280",
    textAlign: "center",
    maxWidth: 330,
  },

  illustrationArea: {
    flex: 1,
    minHeight: 300,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 4,
  },

  mascot: {
    width: "100%",
    height: 300,
  },

  helloBubble: {
    position: "absolute",
    left: -4,
    top: 38,
    minWidth: 80,
    height: 48,
    paddingHorizontal: 17,
    borderRadius: 24,
    backgroundColor: "#EEF4FF",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },

  helloText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#111827",
  },

  helloTail: {
    position: "absolute",
    left: 18,
    bottom: -6,
    width: 13,
    height: 13,
    backgroundColor: "#EEF4FF",
    transform: [
      {
        rotate: "45deg",
      },
    ],
  },

  holaBubble: {
    position: "absolute",
    right: -4,
    top: 58,
    minWidth: 80,
    height: 48,
    paddingHorizontal: 17,
    borderRadius: 24,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },

  holaText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#4F46E5",
  },

  holaTail: {
    position: "absolute",
    left: 18,
    bottom: -6,
    width: 13,
    height: 13,
    backgroundColor: "#EEF2FF",
    transform: [
      {
        rotate: "45deg",
      },
    ],
  },

  chineseBubble: {
    position: "absolute",
    right: 20,
    top: "48%",
    minWidth: 76,
    height: 48,
    paddingHorizontal: 17,
    borderRadius: 24,
    backgroundColor: "#FFF2F4",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },

  chineseText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#EF4444",
  },

  chineseTail: {
    position: "absolute",
    left: 18,
    bottom: -6,
    width: 13,
    height: 13,
    backgroundColor: "#FFF2F4",
    transform: [
      {
        rotate: "45deg",
      },
    ],
  },

  pagination: {
    height: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
    marginBottom: 22,
  },

  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#D9D9D9",
  },

  paginationDotActive: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#5B2BFF",
  },

  getStarted: {
    width: "100%",
    height: 64,
    borderRadius: 32,
    backgroundColor: "#5B2BFF",
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#5B2BFF",
    shadowOpacity: 0.2,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 5,
  },

  getStartedText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#FFFFFF",
  },

  arrow: {
    fontFamily: "Poppins-Regular",
    fontSize: 32,
    lineHeight: 34,
    color: "#FFFFFF",
    marginTop: -2,
  },
});
