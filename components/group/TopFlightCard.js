import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Theme from "@/assets/theme";

export default function TopFlightSummary({ flight, onPress }) {
  if (!flight || flight.length === 0) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Top Flight</Text>
        <Text style={styles.noDataText}>No flight selected yet</Text>
      </View>
    );
  }

  const flightData = flight[0].item_data;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Top Flight</Text>
      <View style={styles.content}>
        <View style={styles.flightInfo}>
          <View style={styles.airlineRow}>
            <Text style={styles.label}>Airline:</Text>
            <Text style={styles.value}>{flightData.source}</Text>
            <Text style={styles.price}>{flightData.cost}</Text>
          </View>

          <View style={styles.routeContainer}>
            <Text style={styles.routeText}>{flightData.title}</Text>
            <View style={styles.routeRow}>
              {/* You can add more specific flight details here if needed */}
              <MaterialCommunityIcons
                name="airplane"
                size={20}
                color={Theme.colors.textSecondary}
                style={styles.icon}
              />
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.seeMore}>See group suggestions →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.white,
    borderRadius: 15,
    padding: 16,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
    fontFamily: "Avenir",
    color: Theme.colors.textPrimary,
    fontStyle: "italic",
  },
  content: {
    backgroundColor: Theme.colors.lightestBlue,
    borderRadius: 12,
    padding: 16,
  },
  airlineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
    fontStyle: "italic",
    marginRight: 8,
  },
  value: {
    fontSize: 16,
    flex: 1,
    color: Theme.colors.textPrimary,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: Theme.colors.textPrimary,
    fontStyle: "italic",
  },
  routeText: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
    fontStyle: "italic",
    marginBottom: 4,
  },
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  airport: {
    fontSize: 16,
    color: Theme.colors.textPrimary,
  },
  seeMore: {
    color: Theme.colors.textPrimary,
    fontSize: 16,
    textAlign: "right",
    marginTop: 8,
    fontStyle: "italic",
  },
});
