import { StyleSheet, View, Text } from "react-native";
import { Stack } from "expo-router";
import Theme from "@/assets/theme";

export default function HomeStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Theme.colors.lightBlueHeader },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="index"
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
    justifyContent: "center",
    backgroundColor: Theme.colors.lightBlueHeader,
  },
  headerText: {
    fontSize: 30,
    fontFamily: "Avenir",
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
  },
});
