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
              <MaterialCommunityIcons
                size={40}
                name="airplane"
                color={Theme.colors.iconHighlighted}
              />
              <Text style={styles.headerText}>Rally</Text>
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
    fontSize: 20,
    fontWeight: "bold",
    color: Theme.colors.textPrimary,
  },
});
