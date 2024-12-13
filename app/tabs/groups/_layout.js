import { StyleSheet, View, Text } from "react-native";
import { Stack } from "expo-router";
import Theme from "@/assets/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function GroupsStackLayout() {
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
              <Text style={styles.headerText}>Groups</Text>
            </View>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="creategroup"
        options={{
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Create New Group</Text>
            </View>
          ),
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
          headerShown: false,
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
    color: Theme.colors.white,
    fontFamily: "Avenir",
  },
});
