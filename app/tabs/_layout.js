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
        headerShown: false,
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
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={size} name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: "Groups",
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              size={size}
              name="account-group"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={size} name="user" color={color} />
          ),
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
