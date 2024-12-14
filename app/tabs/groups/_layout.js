import { StyleSheet, View, Text } from "react-native";
import { Stack } from "expo-router";
import Theme from "@/assets/theme";
import { LinearGradient } from "expo-linear-gradient";

const GRADIENT_OPTIONS = {
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

const MODAL_HEADER_COMPONENT = (title) => (
  <View style={styles.modalHeader}>
    <Text style={styles.headerText}>{title}</Text>
  </View>
);

export default function GroupsStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => HEADER_COMPONENT("My Groups"),
          headerTitleAlign: "center",
          ...GRADIENT_OPTIONS,
        }}
      />

      <Stack.Screen
        name="creategroup"
        options={{
          headerTitle: () => MODAL_HEADER_COMPONENT("Create New Group"),
          headerTitleAlign: "center",
          presentation: "modal",
          headerStyle: {
            backgroundColor: Theme.colors.lightBlueHeader,
          },
          animation: "slide_from_bottom",
        }}
      />

      <Stack.Screen
        name="joingroup"
        options={{
          headerTitle: () => MODAL_HEADER_COMPONENT("Join Group"),
          headerTitleAlign: "center",
          presentation: "modal",
          headerStyle: {
            backgroundColor: Theme.colors.lightBlueHeader,
          },
          animation: "slide_from_bottom",
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
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Group Summary</Text>
            </View>
          ),
          headerBackTitleVisible: false,
          headerTintColor: Theme.colors.white,
          ...GRADIENT_OPTIONS,
        })}
      />

      <Stack.Screen
        name="groupStays"
        options={{
          headerBackVisible: true,
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>All Stays</Text>
            </View>
          ),
          headerBackTitleVisible: false,
          headerTintColor: Theme.colors.white,
          ...GRADIENT_OPTIONS,
        }}
      />
      <Stack.Screen
        name="groupFlights"
        options={{
          headerBackVisible: true,
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>All Flights</Text>
            </View>
          ),
          headerBackTitleVisible: false,
          headerTintColor: Theme.colors.white,
          ...GRADIENT_OPTIONS,
        }}
      />
      <Stack.Screen
        name="groupActivities"
        options={{
          headerBackVisible: true,
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>All Activities</Text>
            </View>
          ),
          headerBackTitleVisible: false,
          headerTintColor: Theme.colors.white,
          ...GRADIENT_OPTIONS,
        }}
      />
      <Stack.Screen
        name="flightDetails"
        options={{
          headerBackVisible: true,
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Flight Details</Text>
            </View>
          ),
          headerBackTitleVisible: false,
          headerTintColor: Theme.colors.white,
          ...GRADIENT_OPTIONS,
        }}
      />
      <Stack.Screen
        name="stayDetails"
        options={{
          headerBackVisible: true,
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Stay Details</Text>
            </View>
          ),
          headerBackTitleVisible: false,
          headerTintColor: Theme.colors.white,
          ...GRADIENT_OPTIONS,
        }}
      />
      <Stack.Screen
        name="activityDetails"
        options={{
          headerBackVisible: true,
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Activity Details</Text>
            </View>
          ),
          headerBackTitleVisible: false,
          headerTintColor: Theme.colors.white,
          ...GRADIENT_OPTIONS,
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
  modalHeader: {
    backgroundColor: Theme.colors.backgroundPrimary,
  },
});
