import React, { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the bottom tabs home route
    router.replace("/(tabs)/home");
  }, [router]);

  return null;
}
