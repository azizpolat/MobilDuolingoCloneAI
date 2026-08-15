import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import CustomTabBar from "@/components/CustomTabBar";
import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { LESSONS } from "@/data/lessons";
import { UNITS } from "@/data/units";

export default function LessonScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const lessonId = (params.lessonId as string) ?? null;

  const lesson = useMemo(
    () => LESSONS.find((l) => l.id === lessonId) ?? null,
    [lessonId],
  );

  const unit = useMemo(() => {
    if (!lesson) return null;
    return UNITS.find((u) => u.id === lesson.unitId) ?? null;
  }, [lesson]);

  const language = useMemo(() => {
    if (!unit) return null;
    return languages.find((ln) => ln.code === unit.languageCode) ?? null;
  }, [unit]);

  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [subtitlesOn, setSubtitlesOn] = useState(false);
  const [playing, setPlaying] = useState(false);

  if (!lesson) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ padding: 20 }}>
          <Text>Lesson not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const firstPhrase = lesson.phrases?.[0];
  const teacherBubbleTitle =
    firstPhrase?.text ?? lesson.aiTeacherPrompt?.introMessage ?? "¡Muy bien!";
  const teacherBubbleSubtitle = firstPhrase?.translation ?? "";

  function toggleCamera() {
    setCameraOn((s) => !s);
  }
  function toggleMic() {
    setMicOn((s) => !s);
  }
  function toggleSubtitles() {
    setSubtitlesOn((s) => !s);
  }
  function handlePlay() {
    setPlaying((s) => !s);
  }
  function endCall() {
    router.back();
  }

  const { width } = useWindowDimensions();

  // Adapter state/navigation for the standalone CustomTabBar render
  const tabState = {
    index: 2, // highlight AI Teacher tab to match context
    routes: [
      { key: "home", name: "home" },
      { key: "learn", name: "learn" },
      { key: "ai-teacher", name: "ai-teacher" },
      { key: "chat", name: "chat" },
      { key: "profile", name: "profile" },
    ],
  };

  const navAdapter = {
    navigate: (name: string) => {
      // map tab names to paths
      switch (name) {
        case "home":
          router.push("/home");
          break;
        case "learn":
          router.push("/learn");
          break;
        case "ai-teacher":
          router.push("/ai-teacher");
          break;
        case "chat":
          router.push("/chat");
          break;
        case "profile":
          router.push("/profile");
          break;
        default:
          router.push("/");
      }
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <View style={styles.titleWrapper}>
          <Text style={styles.title}>AI Teacher</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>Online</Text>
            {language && (
              <Text style={styles.languageText}> • {language.nativeName}</Text>
            )}
          </View>
        </View>

        <View style={styles.topIcons}>
          <TouchableOpacity style={styles.iconCircle}>
            <Ionicons name="videocam-outline" size={18} color="#0F172A" />
          </TouchableOpacity>
          <View style={[styles.iconCircle, { marginLeft: 8 }]}>
            <Text style={{ fontWeight: "700" }}>12</Text>
          </View>
          <TouchableOpacity style={[styles.iconCircle, { marginLeft: 8 }]}>
            <Ionicons name="notifications-outline" size={18} color="#0F172A" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Camera / teacher area */}
        <View style={styles.cameraArea}>
          <Image
            source={images.mascotWelcome}
            style={styles.cameraImage}
            resizeMode="cover"
          />

          {/* small teacher preview (pressable to toggle camera) */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={toggleCamera}
            style={styles.teacherPreview}
          >
            {cameraOn ? (
              <Image
                source={images.mascotAuth}
                style={styles.teacherImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.cameraOffPlaceholder}>
                <Ionicons name="videocam-off" size={28} color="#9CA3AF" />
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Controls row */}
        <View style={styles.controlsRow}>
          <View style={styles.controlItem}>
            <TouchableOpacity
              onPress={toggleCamera}
              style={styles.controlCircle}
            >
              <Ionicons
                name={cameraOn ? "videocam" : "videocam-off"}
                size={22}
                color="#0F172A"
              />
            </TouchableOpacity>
            <Text style={styles.controlLabel}>Camera</Text>
          </View>

          <View style={styles.controlItem}>
            <TouchableOpacity
              onPress={toggleMic}
              style={[
                styles.controlCircle,
                micOn ? {} : { backgroundColor: "#FEE2E2" },
              ]}
            >
              <Ionicons
                name={micOn ? "mic" : "mic-off"}
                size={22}
                color={micOn ? "#0F172A" : "#9CA3AF"}
              />
            </TouchableOpacity>
            <Text style={styles.controlLabel}>Mic</Text>
          </View>

          <View style={styles.controlItem}>
            <TouchableOpacity
              onPress={toggleSubtitles}
              style={styles.controlCircle}
            >
              <MaterialIcons
                name="translate"
                size={22}
                color={subtitlesOn ? "#6D28D9" : "#0F172A"}
              />
            </TouchableOpacity>
            <Text style={styles.controlLabel}>Subtitles</Text>
          </View>

          <View style={styles.controlItem}>
            <TouchableOpacity
              onPress={endCall}
              style={[styles.controlCircle, { backgroundColor: "#F43F5E" }]}
            >
              <Ionicons name="call" size={22} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.controlLabel}>End Call</Text>
          </View>
        </View>

        {/* Ratings card */}
        <View style={styles.ratingCard}>
          <View style={styles.ratingCol}>
            <Text style={styles.ratingHeading}>Speaking</Text>
            <Text style={[styles.ratingValue, { color: "#10B981" }]}>
              Excellent
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.ratingCol}>
            <Text style={styles.ratingHeading}>Pronunciation</Text>
            <Text style={[styles.ratingValue, { color: "#3B82F6" }]}>
              Great
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.ratingCol}>
            <Text style={styles.ratingHeading}>Grammar</Text>
            <Text style={[styles.ratingValue, { color: "#7C3AED" }]}>Good</Text>
          </View>
        </View>

        {/* Lesson details (title, goals, phrases, AI context) */}
        <View style={styles.detailsCard}>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
          <Text style={styles.lessonGoalLabel}>Goals</Text>
          {lesson.goals?.map((g: any, i: number) => (
            <Text key={i} style={styles.goalItem}>
              • {g.description}
            </Text>
          ))}

          <Text style={[styles.lessonGoalLabel, { marginTop: 12 }]}>
            Phrases
          </Text>
          {lesson.phrases?.map((p: any, i: number) => (
            <View key={i} style={styles.phraseRow}>
              <Text style={styles.phraseText}>{p.text}</Text>
              <Text style={styles.phraseTranslation}>{p.translation}</Text>
            </View>
          ))}

          <Text style={[styles.lessonGoalLabel, { marginTop: 12 }]}>
            Teacher Context
          </Text>
          <Text style={styles.teacherContext}>
            {lesson.aiTeacherPrompt?.introMessage}
          </Text>
        </View>
      </ScrollView>

      {/* Render app tab bar visually identical to the tabs layout */}
      <View style={[styles.tabBarAbsolute, { width }]}>
        <CustomTabBar state={tabState} navigation={navAdapter} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 8,
  },
  backBtn: {
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderRadius: 18,
  },
  backText: { fontSize: 20, color: "#0F172A" },
  titleWrapper: { flex: 1, paddingLeft: 8 },
  title: { fontSize: 20, fontWeight: "700", color: "#0F172A" },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#10B981",
    marginRight: 6,
  },
  onlineText: { color: "#4B5563", marginRight: 6 },
  languageText: { color: "#6B7280" },
  topIcons: { flexDirection: "row", alignItems: "center" },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  cameraArea: {
    marginHorizontal: 16,
    marginTop: 6,
    height: 420,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  tabBarAbsolute: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 12,
    alignItems: "center",
    zIndex: 50,
  },
  cameraImage: { width: "100%", height: "100%", opacity: 1 },
  teacherPreview: {
    position: "absolute",
    right: 16,
    top: 16,
    width: 84,
    height: 106,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  teacherImage: { width: "100%", height: "100%" },
  cameraOffPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
  },

  bubbleContainer: {
    position: "absolute",
    left: 14,
    bottom: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  bubble: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
    minWidth: 220,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  bubbleTitle: { fontWeight: "700", color: "#0F172A", marginBottom: 6 },
  bubbleSubtitle: { color: "#374151" },
  subtitleBox: {
    marginTop: 8,
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 8,
    borderRadius: 8,
  },
  subtitleText: { color: "#4B5563" },
  playBtn: {
    marginLeft: 8,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },

  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: -28,
    paddingHorizontal: 14,
    marginBottom: 18,
  },
  controlItem: { alignItems: "center" },
  controlCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  controlLabel: { marginTop: 8, color: "#6B7280" },

  ratingCard: {
    marginHorizontal: 18,
    marginTop: 8,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 8,
  },
  ratingCol: { flex: 1, alignItems: "center" },
  divider: { width: 1, height: 44, backgroundColor: "#EFF6FF" },
  ratingHeading: { color: "#374151", marginBottom: 8 },
  ratingValue: { fontWeight: "700" },

  detailsCard: {
    marginTop: 18,
    marginHorizontal: 18,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    padding: 16,
    paddingBottom: 28,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },
  lessonGoalLabel: { color: "#94A3B8", fontWeight: "700", marginTop: 6 },
  goalItem: { color: "#374151", marginTop: 6 },
  phraseRow: { marginTop: 8 },
  phraseText: { fontWeight: "700", color: "#0F172A" },
  phraseTranslation: { color: "#6B7280" },
  teacherContext: { color: "#374151" },
});
