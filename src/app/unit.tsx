import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { images } from "@/constants/images";
import { LESSONS } from "@/data/lessons";
import { UNITS } from "@/data/units";
import { useLanguageStore } from "@/store/language-store";

export default function UnitScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const unitId = (params.unitId as string) ?? null;

  const selectedLanguage = useLanguageStore((s) => s.selectedLanguage);

  const unit = useMemo(() => {
    if (!unitId) return null;
    return UNITS.find((u) => u.id === unitId) ?? null;
  }, [unitId]);

  // Find lessons for this unit
  let unitLessons = useMemo(() => {
    if (!unit) return [];
    return LESSONS.filter((l) => l.unitId === unit.id);
  }, [unit]);

  // If selected language has fewer than 2 lessons in the dataset, extend with mock lessons
  if (selectedLanguage && unitLessons.length < 2) {
    const additional: any[] = [];
    for (let i = 1; i <= 5; i++) {
      additional.push({
        id: `${selectedLanguage.code}-auto-${i}`,
        unitId: unit?.id ?? `${selectedLanguage.code}-unit-auto`,
        title: `Lesson ${unitLessons.length + i}`,
        description: "Auto generated lesson",
        icon: "📘",
        xpReward: 5,
        goals: [{ description: "Complete activities", xpReward: 5 }],
        vocabulary: [],
        phrases: [],
        activities: [],
        image: `https://picsum.photos/seed/${selectedLanguage.code}-auto-${i}/300/200`,
        aiTeacherPrompt: {
          systemPrompt: "",
          introMessage: "",
          topics: [],
        },
      });
    }

    unitLessons = [...unitLessons, ...additional];
  }

  // Mock local progress state for lessons
  const [progressMap] = useState<
    Record<string, "completed" | "in-progress" | "locked">
  >(() => {
    const map: Record<string, "completed" | "in-progress" | "locked"> = {};

    unitLessons.forEach((lesson, idx) => {
      if (idx === 0) map[lesson.id] = "completed";
      else if (idx === 1) map[lesson.id] = "completed";
      else if (idx === 2) map[lesson.id] = "in-progress";
      else map[lesson.id] = "locked";
    });

    return map;
  });

  if (!unit) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View className="p-6">
          <Text>No unit found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const totalLessons = unitLessons.length;
  const currentIndex = unitLessons.findIndex(
    (l) => progressMap[l.id] === "in-progress",
  );

  // Header artwork: prefer the in-progress lesson image if available, otherwise fallback to unit/asset
  const headerImage =
    unitLessons[currentIndex >= 0 ? currentIndex : 0]?.image ?? !images.palace;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header image */}
        <View style={{ height: 260 }}>
          <Image
            source={
              typeof headerImage === "string"
                ? { uri: headerImage }
                : headerImage
            }
            style={{ width: "100%", height: 260 }}
            resizeMode="cover"
          />

          <View style={styles.backBtnContainer}>
            <Link href="..">
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => router.back()}
              >
                <Text style={{ fontSize: 20 }}>‹</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <View style={styles.headerTextContainer}>
            <Text style={styles.titleText}>
              {unitLessons[currentIndex >= 0 ? currentIndex : 0]?.title ??
                unit.title}
            </Text>
            <Text style={styles.subtitleText}>
              Unit {unit.order} • {Math.max(1, currentIndex + 1)} /{" "}
              {totalLessons} lessons
            </Text>
          </View>
        </View>

        {/* White rounded panel overlapping the image */}
        <View style={styles.panel}>
          {/* Tabs */}
          <View style={styles.segmentWrapper}>
            <View style={styles.segmentControl}>
              <View style={styles.segmentActive}>
                <Text style={styles.segmentActiveText}>Lessons</Text>
              </View>
              <View style={styles.segmentInactive}>
                <Text style={styles.segmentInactiveText}>Practice</Text>
              </View>
            </View>
          </View>

          {/* Lessons list */}
          <View
            style={{ paddingHorizontal: 8, paddingTop: 8, paddingBottom: 40 }}
          >
            {unitLessons.map((lesson: any, idx: number) => {
              const status = progressMap[lesson.id] ?? "locked";
              const isActive = status === "in-progress";
              const isCompleted = status === "completed";

              return (
                <TouchableOpacity
                  key={lesson.id}
                  activeOpacity={0.85}
                  onPress={() =>
                    router.push({
                      pathname: "/lesson",
                      params: { lessonId: lesson.id },
                    })
                  }
                  style={[
                    styles.lessonCard,
                    isActive
                      ? styles.lessonCardActive
                      : { borderColor: "#F1F5F9" },
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.lessonSmall,
                        isActive && styles.lessonSmallActive,
                      ]}
                    >
                      Lesson {idx + 1}
                    </Text>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    {isActive ? (
                      <Text style={styles.lessonInProgress}>In progress</Text>
                    ) : (
                      !isCompleted && (
                        <Text style={styles.lessonSmallMuted}>
                          0 / 6 lessons
                        </Text>
                      )
                    )}
                  </View>

                  <View style={{ width: 64, alignItems: "center" }}>
                    {isCompleted ? (
                      <View style={styles.completedCircle}>
                        <Text style={styles.completedCheck}>✓</Text>
                      </View>
                    ) : isActive ? (
                      <Image
                        source={
                          lesson.image ? { uri: lesson.image } : images.treasure
                        }
                        style={{ width: 48, height: 48, borderRadius: 10 }}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={styles.lockCircle}>
                        <Text style={{ color: "#9CA3AF" }}>🔒</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backBtnContainer: {
    position: "absolute",
    left: 12,
    top: 12,
  },
  backBtn: {
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderRadius: 18,
    opacity: 0.95,
  },
  headerTextContainer: {
    position: "absolute",
    left: 18,
    top: 60,
  },
  titleText: {
    color: "#6D28D9",
    fontSize: 22,
    fontWeight: "700",
  },
  subtitleText: {
    color: "#6D28D9",
    fontSize: 13,
    marginTop: 6,
  },
  panel: {
    marginTop: -26,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#FFFFFF",
    paddingTop: 18,
    minHeight: 400,
  },
  segmentWrapper: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  segmentControl: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    overflow: "hidden",
    height: 54,
    alignItems: "center",
  },
  segmentActive: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 3,
    borderBottomColor: "#6D28D9",
    borderRadius: 14,
    margin: 6,
    shadowColor: "#6D28D9",
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  segmentActiveText: {
    color: "#6D28D9",
    fontWeight: "700",
  },
  segmentInactive: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentInactiveText: {
    color: "#94A3B8",
  },
  lessonCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  lessonCardActive: {
    borderColor: "#7C3AED",
    shadowColor: "#7C3AED",
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  lessonSmall: {
    color: "#94A3B8",
    fontSize: 12,
  },
  lessonSmallMuted: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 6,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 6,
  },
  lessonInProgress: {
    color: "#6D28D9",
    marginTop: 6,
  },
  completedCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#10B981", // green
    alignItems: "center",
    justifyContent: "center",
  },
  completedCheck: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  lockCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E6E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  lessonSmallActive: {
    color: "#7C3AED",
    fontSize: 12,
  },
});
