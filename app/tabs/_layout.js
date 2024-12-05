import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Theme from "@/assets/theme";

import { Tabs } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerStyle: {
          backgroundColor: Theme.colors.backgroundPrimary,
        },
        tabBarStyle: { backgroundColor: Theme.colors.backgroundPrimary },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              size={size}
              name="home-outline"
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={size} name="user" color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Theme.colors.textPrimary,
  },
});
