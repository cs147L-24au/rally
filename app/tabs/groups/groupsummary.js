import React from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Theme from "@/assets/theme";
import TopStayCard from "@/components/group/TopStayCard";
import TopFlightCard from "@/components/group/TopFlightCard";
import TopActivityCard from "@/components/group/TopActivityCard";

// Mock data should be moved to a separate file in a real application
const MOCK_GROUP_DATA = {
  dates: "3/15/25 to 3/25/25",
  destination: "Tokyo, Japan",
  joinCode: "463619",
  topStay: {
    name: "Airbnb in Shibuya",
    price: "$144 a night",
    image: require("@/assets/stay-shibuya.png"),
  },
  topFlight: {
    airline: "Japan Airlines",
    price: "$688 round trip",
    toJapan: {
      from: "SFO",
      to: "HND",
      time: "12:30AM to 11:15PM",
    },
    fromJapan: {
      from: "HND",
      to: "SFO",
      time: "6:14PM to 5:19PM",
    },
  },
  topActivity: {
    name: "Attend a tea ceremony",
    date: "3/21",
    image: require("@/assets/activity-tea-ceremony.png"),
  },
};

export default function GroupCard() {
  const router = useRouter();
  const { groupName } = useLocalSearchParams();

  // const handleNavigation = (route) => {
  //   router.push(`/tabs/groups/${route}`);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <LinearGradient
          colors={["#00A1EC", "#C2D7F1"]}
          style={styles.headerContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.groupName}>{groupName}</Text>
        </LinearGradient>

        <View style={styles.infoCard}>
          {[
            { label: "Dates", value: MOCK_GROUP_DATA.dates },
            { label: "Destination", value: MOCK_GROUP_DATA.destination },
            { label: "Join Code", value: MOCK_GROUP_DATA.joinCode },
          ].map(({ label, value }) => (
            <Text key={label} style={styles.infoText}>
              <Text style={styles.infoLabel}>{label}: </Text>
              {value}
            </Text>
          ))}
        </View>

        <TopStayCard
          stay={MOCK_GROUP_DATA.topStay}
          onPress={() => router.push("/tabs/groups/voting")}
        />

        <TopFlightCard
          flight={MOCK_GROUP_DATA.topFlight}
          onPress={() => router.push("/tabs/groups/voting")}
        />

        <TopActivityCard
          activity={MOCK_GROUP_DATA.topActivity}
          onPress={() => router.push("/tabs/groups/voting")}
          // onPress={() => handleNavigation("activitydetails")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    height: 150,
    justifyContent: "center",
  },
  groupName: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: Theme.colors.white,
    fontFamily: "Avenir",
  },
  infoCard: {
    backgroundColor: Theme.colors.white,
    margin: 16,
    padding: 16,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    marginVertical: 4,
    fontFamily: "Avenir",
    color: Theme.colors.textPrimary,
  },
  infoLabel: {
    fontStyle: "italic",
    color: Theme.colors.textSecondary,
  },
});
