import { StyleSheet, ScrollView, View, SafeAreaView, Text } from "react-native";
import { Link } from "expo-router";
import Theme from "@/assets/theme";
import TripPlanningCard from "@/components/TripPlanningCard";
import TripSummaryCard from "@/components/TripSummary";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Home() {
  return (
    <View style={styles.mainContainer}>
      {/* Background that extends under status bar */}
      <View style={styles.backgroundFill} />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons
              name="airplane"
              size={32}
              color="white"
              style={styles.logo}
            />
          </View>
          <Text style={styles.headerText}>RALLY</Text>
        </View>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {/* Group Section */}
          <Link href="/tabs/groups/creategroup?presentation=modal" asChild>
            <TripPlanningCard
              title="Rally the Group Chat"
              buttonText="Create Group"
              description="You give us who, where, and we'll give you everything else"
            />
          </Link>

          {/* Explore Section */}
          <Link href="/tabs/explore" asChild>
            <TripPlanningCard
              title="Explore Your Options"
              buttonText="Visit Explore Page"
              description="Find flights, activities, and stays for any location you want!"
              onPress={() => {
                console.log("Explore page button pressed");
              }}
            />
          </Link>
    

          {/* Your Last Trip */}
          <TripSummaryCard
            title="Your Last Trip Summary"
            summaryText="You and Adelfa went to Barcelona..."
            imageSource={require("@/assets/barcelona.png")}
            stats={[
              { number: 5, label: "people went on the last trip" },
              { number: 10, label: "restaurants were visited" },
              { number: 7, label: "landmarks were seen" },
            ]}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  backgroundFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Theme.colors.lightBlueHeader,
    height: '30%',
    zIndex: 1 
  },
  safeArea: {
    flex: 1,
    zIndex: 2,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  logoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    padding: 4,
    marginRight: 8,
  },
  logo: {
    transform: [{rotate: '-45deg'}]
  },
  headerText: {
    fontSize: 40,
    fontFamily: "Avenir",
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
});