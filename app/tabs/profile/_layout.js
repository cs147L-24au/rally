import { StyleSheet, View, Text } from "react-native";
import { Stack } from "expo-router";
import Theme from "@/assets/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

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
        name="groups"
        options={{
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <MaterialCommunityIcons
                size={40}
                name="account-group"
                color={Theme.colors.iconHighlighted}
              />
              <Text style={styles.headerText}>Groups</Text>
            </View>
          ),
          headerTitleAlign: "center",
          headerBackTitle: "Home",
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
