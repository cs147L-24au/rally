import { StyleSheet, View, SafeAreaView, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import Theme from "@/assets/theme";

const SLIDE_DISTANCE = 400;
const SLIDE_DURATION = 600;
const TRANSITION_DELAY = 2000;
const NAVIGATION_DELAY = 2500;

export default function CreateTransition() {
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(SLIDE_DISTANCE)).current;

  useEffect(() => {
    const slideIn = Animated.timing(slideAnim, {
      toValue: 0,
      duration: SLIDE_DURATION,
      useNativeDriver: true,
    });

    const slideOut = Animated.timing(slideAnim, {
      toValue: -SLIDE_DISTANCE,
      duration: SLIDE_DURATION,
      useNativeDriver: true,
    });

    slideIn.start();

    const slideOutTimer = setTimeout(() => {
      slideOut.start();
    }, TRANSITION_DELAY);

    const navigationTimer = setTimeout(() => {
      router.navigate("/tabs/groups");
    }, NAVIGATION_DELAY);

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
              { transform: [{ translateX: slideAnim }] },
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