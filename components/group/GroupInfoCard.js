import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from "@/assets/theme";

export default function GroupInfoCard({ dates, destination, joinCode }) {
  return (
    <View style={styles.card}>
      <Text style={styles.infoText}>
        <Text style={styles.label}>Dates: </Text>
        {dates}
      </Text>
      <Text style={styles.infoText}>
        <Text style={styles.label}>Destination: </Text>
        {destination}
      </Text>
      <Text style={styles.infoText}>
        <Text style={styles.label}>Join Code: </Text>
        {joinCode}
      </Text>
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
  infoText: {
    fontSize: 16,
    marginVertical: 4,
    fontFamily: 'Avenir',
    color: Theme.colors.textPrimary,
  },
  label: {
    fontWeight: '600',
    fontStyle: 'italic',
  },
});