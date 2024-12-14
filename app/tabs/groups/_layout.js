import { StyleSheet, View, Text } from "react-native";
import { Stack } from "expo-router";
import Theme from "@/assets/theme";
import { LinearGradient } from "expo-linear-gradient";

const SCREEN_OPTIONS = {
  headerBackground: () => (
    <LinearGradient
      colors={["#00A1EC", "#C2D7F1"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    />
  ),
};

const HEADER_COMPONENT = (title) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>{title}</Text>
  </View>
);

export default function GroupsStackLayout() {
  return (
    <Stack screenOptions={SCREEN_OPTIONS}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => HEADER_COMPONENT("My Groups"),
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="creategroup"
        options={{
          headerTitle: () => HEADER_COMPONENT("Create New Group"),
          headerTitleAlign: "center",
          presentation: "modal",
          headerBackVisible: true,
        }}
      />

      <Stack.Screen
        name="create-group-transition"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />

      <Stack.Screen
        name="groupsummary"
        options={({ route }) => ({
          headerBackVisible: true,
          headerTitle: () => HEADER_COMPONENT(route.params?.groupName || ""),
          headerBackTitleVisible: false,
          headerTintColor: Theme.colors.white,
        })}
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
});
