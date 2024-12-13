import { StyleSheet, View, Text } from "react-native";
import { Stack } from "expo-router";
import Theme from "@/assets/theme";

export default function ProfileStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Theme.colors.lightBlueHeader },
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
          headerTitle: "Evelyn",
          headerTitleAlign: "center",
          presentation: "card",
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: Theme.colors.white,
    fontFamily: "Avenir",
  },
});
