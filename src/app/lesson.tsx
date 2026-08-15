import React, { useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { images } from "@/constants/images";
import { LESSONS } from "@/data/lessons";
import { UNITS } from "@/data/units";
import { languages } from "@/data/languages";

export default function LessonScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const lessonId = (params.lessonId as string) ?? null;

  const lesson = useMemo(() => {
    return LESSONS.find((l) => l.id === lessonId) ?? null;
  }, [lessonId]);

  const unit = useMemo(() => {
    if (!lesson) return null;
    return UNITS.find((u) => u.id === lesson.unitId) ?? null;
  }, [lesson]);

  const language = useMemo(() => {
    if (!unit) return null;
    return languages.find((ln) => ln.code === unit.languageCode) ?? null;
  }, [unit]);

  if (!lesson) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ padding: 20 }}>
          <Text>Lesson not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const teacherBubbleTitle = lesson.aiTeacherPrompt?.introMessage ?? "¡Muy bien!";

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
          <Image source={images.mascotWelcome} style={styles.cameraImage} resizeMode="cover" />

          {/* small teacher preview */}
          <View style={styles.teacherPreview}>
            <Image source={images.mascotAuth} style={styles.teacherImage} resizeMode="cover" />
          </View>

          {/* Teacher speech bubble */}
          <View style={styles.bubbleContainer}>
            <View style={styles.bubble}>
              <Text style={styles.bubbleTitle}>{lesson.phrases?.[0]?.text ?? "¡Muy bien!"}</Text>
              <Text style={styles.bubbleSubtitle}>{lesson.phrases?.[0]?.translation ?? teacherBubbleTitle}</Text>
            </View>
            <TouchableOpacity style={styles.playBtn}>
              <Ionicons name="volume-high" size={20} color="#6D28D9" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Controls row */}
        <View style={styles.controlsRow}>
          <View style={styles.controlItem}>
            <View style={styles.controlCircle}>
              <Ionicons name="videocam" size={20} color="#0F172A" />
            </View>
            <Text style={styles.controlLabel}>Camera</Text>
          </View>

          <View style={styles.controlItem}>
            <View style={styles.controlCircle}>
              <Ionicons name="mic" size={20} color="#0F172A" />
            </View>
            <Text style={styles.controlLabel}>Mic</Text>
          </View>

          <View style={styles.controlItem}>
            <View style={styles.controlCircle}>
              <MaterialIcons name="translate" size={20} color="#0F172A" />
            </View>
            <Text style={styles.controlLabel}>Subtitles</Text>
          </View>

          <View style={styles.controlItem}>
            <View style={[styles.controlCircle, { backgroundColor: "#F43F5E" }]}> 
              <Ionicons name="call" size={20} color="#fff" />
            </View>
            <Text style={styles.controlLabel}>End Call</Text>
          </View>
        </View>

        {/* Ratings card */}
        <View style={styles.ratingCard}>
          <View style={styles.ratingCol}>
            <Text style={styles.ratingHeading}>Speaking</Text>
            <Text style={[styles.ratingValue, { color: "#10B981" }]}>Excellent</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.ratingCol}>
            <Text style={styles.ratingHeading}>Pronunciation</Text>
            <Text style={[styles.ratingValue, { color: "#3B82F6" }]}>Great</Text>
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
            <Text key={i} style={styles.goalItem}>• {g.description}</Text>
          ))}

          <Text style={[styles.lessonGoalLabel, { marginTop: 12 }]}>Phrases</Text>
          {lesson.phrases?.map((p: any, i: number) => (
            <View key={i} style={styles.phraseRow}>
              <Text style={styles.phraseText}>{p.text}</Text>
              <Text style={styles.phraseTranslation}>{p.translation}</Text>
            </View>
          ))}

          <Text style={[styles.lessonGoalLabel, { marginTop: 12 }]}>Teacher Context</Text>
          <Text style={styles.teacherContext}>{lesson.aiTeacherPrompt?.introMessage}</Text>
        </View>
      </ScrollView>
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
  onlineDot: { width: 8, height: 8, borderRadius: 8, backgroundColor: "#10B981", marginRight: 6 },
  onlineText: { color: "#4B5563", marginRight: 6 },
  languageText: { color: "#6B7280" },
  topIcons: { flexDirection: "row", alignItems: "center" },
  iconCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center" },

  cameraArea: {
    marginHorizontal: 16,
    marginTop: 6,
    height: 420,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#F3F4F6",
  },
  cameraImage: { width: "100%", height: "100%", opacity: 1 },
  teacherPreview: { position: "absolute", right: 16, top: 16, width: 84, height: 106, borderRadius: 12, overflow: "hidden", borderWidth: 3, borderColor: "#FFFFFF" },
  teacherImage: { width: "100%", height: "100%" },

  bubbleContainer: { position: "absolute", left: 14, bottom: 24, flexDirection: "row", alignItems: "center" },
  bubble: { backgroundColor: "#FFFFFF", padding: 14, borderRadius: 12, minWidth: 220, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 6 },
  bubbleTitle: { fontWeight: "700", color: "#0F172A", marginBottom: 6 },
  bubbleSubtitle: { color: "#374151" },
  playBtn: { marginLeft: 8, backgroundColor: "#FFFFFF", padding: 10, borderRadius: 12, shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 6 },

  controlsRow: { flexDirection: "row", justifyContent: "space-around", marginTop: -28, paddingHorizontal: 14, marginBottom: 18 },
  controlItem: { alignItems: "center" },
  controlCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 8 },
  controlLabel: { marginTop: 8, color: "#6B7280" },

  ratingCard: { marginHorizontal: 18, marginTop: 8, borderRadius: 14, backgroundColor: "#FFFFFF", padding: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", shadowColor: "#000", shadowOpacity: 0.03, shadowRadius: 8 },
  ratingCol: { flex: 1, alignItems: "center" },
  divider: { width: 1, height: 44, backgroundColor: "#EFF6FF" },
  ratingHeading: { color: "#374151", marginBottom: 8 },
  ratingValue: { fontWeight: "700" },

  detailsCard: { marginTop: 18, marginHorizontal: 18, borderRadius: 14, backgroundColor: "#FFFFFF", padding: 16, paddingBottom: 28 },
  lessonTitle: { fontSize: 18, fontWeight: "700", color: "#0F172A", marginBottom: 8 },
  lessonGoalLabel: { color: "#94A3B8", fontWeight: "700", marginTop: 6 },
  goalItem: { color: "#374151", marginTop: 6 },
  phraseRow: { marginTop: 8 },
  phraseText: { fontWeight: "700", color: "#0F172A" },
  phraseTranslation: { color: "#6B7280" },
  teacherContext: { color: "#374151" },
});
