import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Theme from "@/assets/theme";

export default function TopFlightSummary({ flight, onPress }) {
  if (!flight) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Top Flight</Text>
        <Text style={styles.noDataText}>No flight selected yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Top Flight</Text>
      <View style={styles.content}>
        <View style={styles.flightInfo}>
          <View style={styles.airlineRow}>
            <Text style={styles.label}>Airline:</Text>
            <Text style={styles.value}>{flight.airline}</Text>
            <Text style={styles.price}>{flight.price}</Text>
          </View>

          <View style={styles.routeContainer}>
            <Text style={styles.routeText}>To Japan:</Text>
            <View style={styles.routeRow}>
              <Text style={styles.airport}>{flight.departure}</Text>
              <MaterialCommunityIcons
                name="airplane"
                size={20}
                color={Theme.colors.textSecondary}
                style={styles.icon}
              />
              <Text style={styles.airport}>{flight.arrival}</Text>
            </View>
            <Text style={styles.time}>
              {flight.departureTime} to {flight.arrivalTime}
            </Text>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'Avenir',
    color: Theme.colors.textPrimary,
    fontStyle: 'italic'
  },
  content: {
    backgroundColor: Theme.colors.lightestBlue,
    borderRadius: 12,
    padding: 16,
  },
  airlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
    fontStyle: 'italic',
    marginRight: 8,
  },
  value: {
    fontSize: 16,
    flex: 1,
    color: Theme.colors.textPrimary,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.textPrimary,
    fontStyle: 'italic'
  },
  routeText: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  airport: {
    fontSize: 16,
    color: Theme.colors.textPrimary,
  },
  seeMore: {
    color: Theme.colors.textPrimary,
    fontSize: 16,
    textAlign: 'right',
    marginTop: 8,
    fontStyle: 'italic'
  }
});
