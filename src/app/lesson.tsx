import React, { useMemo } from "react";
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";

import { LESSONS } from "@/data/lessons";
import { images } from "@/constants/images";

export default function LessonScreen() {
  const params = useLocalSearchParams();
  const lessonId = (params.lessonId as string) ?? null;

  const lesson = useMemo(() => LESSONS.find((l) => l.id === lessonId) ?? null, [lessonId]);

  if (!lesson) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ padding: 20 }}>
          <Text>Lesson not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const imageSource = lesson.image ? { uri: lesson.image } : images.palace;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={{ padding: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
          <Link href="..">
            <TouchableOpacity style={styles.backBtn}>
              <Text style={{ fontSize: 20 }}>‹</Text>
            </TouchableOpacity>
          </Link>

          <Text style={{ fontSize: 20, fontWeight: "700", marginLeft: 8 }}>{lesson.title}</Text>
        </View>

        <Image source={imageSource} style={{ width: "100%", height: 180, borderRadius: 12 }} resizeMode="cover" />

        <View style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: "700" }}>{lesson.title}</Text>
          <Text style={{ color: "#64748B", marginTop: 8 }}>{lesson.description}</Text>
        </View>

        <View style={{ marginTop: 18 }}>
          <Text style={{ fontWeight: "700", marginBottom: 8 }}>Activities</Text>
          {lesson.activities && lesson.activities.slice(0, 4).map((a) => (
            <View key={a.id} style={styles.activityRow}>
              <Text>{a.question}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderRadius: 18,
  },
  activityRow: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#EEF2FF",
    marginBottom: 8,
  },
});
