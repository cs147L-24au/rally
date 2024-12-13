import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
            <Text style={styles.time}>{flight.departureTime} to {flight.arrivalTime}</Text>
          </View>
        </View>
        
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.seeMore}>See more →</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'Avenir',
  },
  content: {
    backgroundColor: Theme.colors.lightestBlue,
    borderRadius: 12,
    padding: 12,
  },
  flightInfo: {
    marginBottom: 8,
  },
  airlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    marginRight: 4,
  },
  value: {
    fontSize: 14,
    flex: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.textPrimary,
  },
  routeContainer: {
    marginTop: 4,
  },
  routeText: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    marginBottom: 4,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  airport: {
    fontSize: 16,
    fontWeight: '500',
  },
  icon: {
    marginHorizontal: 8,
  },
  time: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
  },
  seeMore: {
    color: Theme.colors.blue,
    fontSize: 14,
    textAlign: 'right',
    marginTop: 8,
  },
  noDataText: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    marginVertical: 12,
  },
});
