import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import Theme from "@/assets/theme";
import TripPlanningCard from "@/components/TripPlanningCard";
import ExplorePPCard from "@/components/ExplorePPCard";
import LastTripCard from "@/components/LastTripCard";
import { Link, router } from "expo-router";

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Theme.colors.background }}>
      <ScrollView style={styles.container}>
        {/* Start A Trip Section */}
        <Link href="/tabs/home/groups" asChild>
          <TripPlanningCard
            title="Simplify Group Trip Planning!"
            buttonText="Create a Group"
            description="Start a trip itinerary and invite your friends!"
            onPress={() => {
              console.log("Navigating to Groups");
            }}
          />
        </Link>
        {/* Popular Places Section */}
        <Link href="/tabs/home/destinations" asChild>
          <ExplorePPCard
            imageSource={require("@/assets/japan.jpeg")}
            title="Explore Destinations"
            description="Japan's a popular destination!"
            onPress={() => {
              console.log("Navigating to Popular Places");
            }}
          />
        </Link>
        <Link href="/tabs/home/activities" asChild>
          <ExplorePPCard
            imageSource={require("@/assets/jetski.jpg")}
            title="Explore Activities"
            description="Watersports are dope!"
            onPress={() => {
              console.log("Navigating to Popular Places");
            }}
          />
        </Link>
        {/* Last Trip Summary Section
        <LastTripCard
          title="Your Last Trip Summary"
          description=""
          onPress={() => {
            console.log("Navigating to Last Trip Summary");
          }}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: 16,
  },
});
