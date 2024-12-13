import { StyleSheet, View, Text } from "react-native";
import { Stack } from "expo-router";
import Theme from "@/assets/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function ExploreStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Theme.colors.backgroundPrimary },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Explore</Text>
            </View>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="flightDetails"
        options={{
          headerTitle: "Flight Details",
          headerTitleAlign: "center",
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="stayDetails"
        options={{
          headerTitle: "Stay Details",
          headerTitleAlign: "center",
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="activityDetails"
        options={{
          headerTitle: "Activity Details",
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
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Theme.colors.textPrimary,
  },
});
