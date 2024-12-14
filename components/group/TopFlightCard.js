import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
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
        {/* Airline Image Section */}
        <Image source={{ uri: flightData.image }} style={styles.image} />

        {/* Flight Details Section */}
        <View style={styles.detailsContainer}>
          <View style={styles.details}>
            <Text style={styles.airlineName}>{flightData.source}</Text>

            {/* Route Information */}
            <View style={styles.routeContainer}>
              <Text style={styles.routeText}>{flightData.title}</Text>
            </View>

            <Text style={styles.price}>{flightData.cost}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.seeMore}>See more flights →</Text>
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
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    fontFamily: "Avenir",
    color: Theme.colors.textPrimary,
    fontStyle: "italic",
  },
  content: {
    backgroundColor: Theme.colors.lightestBlue,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    marginBottom: 8,
    backgroundColor: Theme.colors.grayLight,
  },
  detailsContainer: {
    padding: 12,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  details: {
    flex: 1,
  },
  airlineName: {
    fontSize: 18,
    fontWeight: "500",
    color: Theme.colors.textPrimary,
    marginBottom: 4,
    fontFamily: "Avenir",
  },
  routeContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  routeText: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
    fontStyle: "italic",
    fontFamily: "Avenir",
  },
  price: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
    fontWeight: "600",
    fontFamily: "Avenir",
    marginTop: 8,
  },
  noDataText: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
    textAlign: "center",
    marginVertical: 12,
    fontFamily: "Avenir",
  },
  seeMore: {
    color: Theme.colors.textPrimary,
    fontSize: 16,
    textAlign: "right",
    marginTop: 12,
    fontStyle: "italic",
    fontFamily: "Avenir",
  },
  icon: {
    marginRight: 8,
  },
});
