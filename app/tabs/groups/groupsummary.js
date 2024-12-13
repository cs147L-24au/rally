import React from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Theme from "@/assets/theme";
import { LinearGradient } from "expo-linear-gradient";
import TopStayCard from "@/components/group/TopStayCard";
import TopFlightCard from "@/components/group/TopFlightCard";
import TopActivityCard from "@/components/group/TopActivityCard";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function GroupCard() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const groupName = params.groupName;

  // Mock data
  const groupData = {
    name: groupName,
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Group Header */}
        <LinearGradient
          colors={["#00A1EC", "#C2D7F1"]}
          style={styles.headerContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.groupName}>{groupData.name}</Text>
        </LinearGradient>

        {/* Group Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Dates: </Text>
            {groupData.dates}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Destination: </Text>
            {groupData.destination}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Join Code: </Text>
            {groupData.joinCode}
          </Text>
        </View>

        {/* Card Cards */}
        <TopStayCard
          stay={groupData.topStay}
          onPress={() => router.push("/tabs/groups/staydetails")}
        />

        <TopFlightCard
          flight={groupData.topFlight}
          onPress={() => router.push("/tabs/groups/flightdetails")}
        />

        <TopActivityCard
          activity={groupData.topActivity}
          onPress={() => router.push("/tabs/groups/activitydetails")}
        />
      </ScrollView>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => router.push("/tabs/groups/creategroup")}
      >
        <MaterialCommunityIcons
          name="plus"
          size={30}
          color={Theme.colors.textPrimary}
        />
      </TouchableOpacity>
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
    justifyContent: 'center',
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
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Theme.colors.white,
    borderRadius: 50,
    padding: 10,
    elevation: 3,
  },
});
