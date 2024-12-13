import { StyleSheet, View, Text, SafeAreaView, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import Theme from "@/assets/theme";

export default function CreateTransition() {
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(400)).current; // Start from right side of screen

  useEffect(() => {
    // Slide in animation
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // After 1 second, slide out to the left
    const slideOutTimer = setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: -400,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }, 2000);

    // Navigate after animations complete
    const navigationTimer = setTimeout(() => {
      router.replace("/tabs/groups");
    }, 2500);

    return () => {
      clearTimeout(slideOutTimer);
      clearTimeout(navigationTimer);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#00A1EC", "#C2D7F1"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <Animated.Text
            style={[
              styles.title,
              {
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            Let's get the plans out of the group chat...
          </Animated.Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: Theme.colors.white,
    textAlign: "center",
    fontFamily: "Avenir",
    lineHeight: 48,
  },
});
