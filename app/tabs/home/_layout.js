// _layout.js
import { StyleSheet, View, Text } from "react-native";
import { Stack } from "expo-router";
import Theme from "@/assets/theme";

export default function FeedStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Theme.colors.lightBlueHeader },
        headerTintColor: "white", 
      }}
    >
      {/* Home Screen */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, 
        }}
      />
      {/* Groups Screen */}
      <Stack.Screen
        name="groups"
        options={{
          headerTitle: () => (
            <View style={styles.headerContainer}>
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
    justifyContent: "center",
    backgroundColor: Theme.colors.lightBlueHeader
  },
  headerText: {
    fontSize: 30,
    fontFamily: "Avenir",
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
  },
});

