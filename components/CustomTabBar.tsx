import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CIRCLE_SIZE = 56;

export default function CustomTabBar({ state, navigation }: any) {
  const [containerWidth, setContainerWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const tabCount = state.routes.length;

  useEffect(() => {
    if (!containerWidth || tabCount === 0) return;

    const tabWidth = containerWidth / tabCount;

    const position = state.index * tabWidth + (tabWidth - CIRCLE_SIZE) / 2;

    Animated.spring(translateX, {
      toValue: position,
      useNativeDriver: true,
      damping: 18,
      stiffness: 180,
    }).start();
  }, [state.index, containerWidth, tabCount]);

  const onLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  const renderIcon = (routeName: string, focused: boolean) => {
    const color = focused ? "#FFFFFF" : "#6B7280";
    const size = 24;

    switch (routeName) {
      case "home":
        return (
          <Ionicons
            name={focused ? "home" : "home-outline"}
            size={size}
            color={color}
          />
        );
      case "learn":
        return (
          <Ionicons
            name={focused ? "book" : "book-outline"}
            size={size}
            color={color}
          />
        );
      case "ai-teacher":
        return (
          <MaterialCommunityIcons name="robot" size={size} color={color} />
        );
      case "chat":
        return (
          <Ionicons
            name={focused ? "chatbubble" : "chatbubble-outline"}
            size={size}
            color={color}
          />
        );
      case "profile":
        return (
          <Ionicons
            name={focused ? "person" : "person-outline"}
            size={size}
            color={color}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container} onLayout={onLayout}>
        {containerWidth > 0 && (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.activeCircle,
              {
                transform: [{ translateX }],
              },
            ]}
          />
        )}

        {state.routes.map((route: any, index: number) => {
          const focused = state.index === index;

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={styles.tabButton}
              activeOpacity={0.8}
            >
              <View style={styles.iconContainer}>
                {renderIcon(route.name, focused)}
              </View>

              {!focused && (
                <Text style={styles.label}>{getLabelForRoute(route.name)}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

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
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 12,
  },

  container: {
    height: 76,
    backgroundColor: "transparent",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },

  activeCircle: {
    position: "absolute",
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: "#6D28D9",
    top: (76 - CIRCLE_SIZE) / 2,
    left: 0,
    zIndex: 1,
  },

  tabButton: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },

  iconContainer: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    fontSize: 11,
    color: "#6B7280",
    position: "absolute",
    bottom: 8,
  },
});
