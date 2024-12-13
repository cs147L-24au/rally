import { StyleSheet, View, Text } from "react-native";
import { Stack  } from "expo-router";
import Theme from "@/assets/theme";

export default function ProfileStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Theme.colors.lightBlueHeader },
        headerTintColor: Theme.colors.white, 
        headerBackTitleVisible: false, 
        headerBackImage: () => (
          <View style={styles.backButtonContainer}>
            <Text style={styles.backArrow}>←</Text>
          </View>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Profile</Text>
            </View>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="chatbot"
        options={{
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Evelyn</Text>
            </View>
          ),
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: Theme.colors.white,
    fontFamily: "Avenir",
  },
  backButtonContainer: {
    paddingLeft: 30,
  },
  backArrow: {
    fontSize: 24,
    color: Theme.colors.white, 
    fontWeight: "bold",
  },
});