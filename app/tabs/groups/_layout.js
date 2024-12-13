import { StyleSheet, View, Text } from "react-native";
import { Stack } from "expo-router";
import Theme from "@/assets/theme";

const SCREEN_OPTIONS = {
  headerStyle: { 
    backgroundColor: Theme.colors.lightBlueHeader 
  }
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
          presentation: "modal"
        }}
      />
      
      <Stack.Screen
        name="groupsummary"
        options={{
          headerBackVisible: true,
          headerTitle: "",
          headerBackTitleVisible: false,
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
});
