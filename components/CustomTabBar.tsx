import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  View,
  TouchableOpacity,
  Text,
  LayoutChangeEvent,
  StyleSheet,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function CustomTabBar({ state, navigation }: any) {
  const [containerWidth, setContainerWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const tabCount = state.routes.length;
  const activeIndex = state.index;

  useEffect(() => {
    if (!containerWidth) return;

    const tabWidth = containerWidth / tabCount;
    const toValue = activeIndex * tabWidth + tabWidth / 2 - CIRCLE_SIZE / 2;

    Animated.spring(translateX, {
      toValue,
      useNativeDriver: true,
      stiffness: 200,
      damping: 20,
      mass: 1,
    } as any).start();
  }, [activeIndex, containerWidth]);

  const onLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width - 24); // account for horizontal padding
  };

  const renderIcon = (routeName: string, focused: boolean, color: string) => {
    const size = 20;
    switch (routeName) {
      case "home":
        return <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />;
      case "learn":
        return <Ionicons name={focused ? "book" : "book-outline"} size={size} color={color} />;
      case "ai-teacher":
        return <MaterialCommunityIcons name={"robot"} size={20} color={color} />;
      case "chat":
        return <Ionicons name={focused ? "chatbubble" : "chatbubble-outline"} size={size} color={color} />;
      case "profile":
        return <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />;
      default:
        return <Ionicons name={"ellipse"} size={size} color={color} />;
    }
  };

  return (
    <View style={styles.wrapper} onLayout={onLayout}>
      <View style={styles.container}>
        {/* Animated active circle */}
        {containerWidth > 0 && (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.activeCircle,
              {
                transform: [
                  {
                    translateX,
                  },
                ],
              },
            ]}
          />
        )}

        {state.routes.map((route: any, index: number) => {
          const focused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, key: route.key });
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              onPress={onPress}
              activeOpacity={0.8}
              style={styles.tabButton}
            >
              {focused ? (
                <View style={styles.iconOnlyContainer}>
                  {renderIcon(route.name, true, "#fff")}
                </View>
              ) : (
                <View style={styles.iconLabelContainer}>
                  {renderIcon(route.name, false, "#6B7280")}
                  <Text style={styles.label}>{getLabelForRoute(route.name)}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const CIRCLE_SIZE = 56;

function getLabelForRoute(name: string) {
  switch (name) {
    case "home":
      return "Home";
    case "learn":
      return "Learn";
    case "ai-teacher":
      return "AI Teacher";
    case "chat":
      return "Chat";
    case "profile":
      return "Profile";
    default:
      return name;
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
    paddingBottom: 24,
    paddingTop: 12,
    backgroundColor: "transparent",
  },
  container: {
    height: 76,
    backgroundColor: "#fff",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    // shadow
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 20,
    elevation: 6,
  },
  activeCircle: {
    position: "absolute",
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: "#6D28D9", // brand purple
    top: -16,
    left: 12,
    // center icon inside
    alignItems: "center",
    justifyContent: "center",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  iconOnlyContainer: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  iconLabelContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
});
