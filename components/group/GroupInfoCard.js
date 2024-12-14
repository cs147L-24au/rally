import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from "@/assets/theme";

export default function GroupInfoCard({ name, dates, destination, joinCode }) {
  return (
    <View style={styles.card}>
      <Text style={styles.nameText}>
        <Text style={styles.nameLabel}>Name: </Text>
        {name}
      </Text>
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
    fontSize: 18,
    marginVertical: 4,
    fontFamily: 'Avenir',
    color: Theme.colors.textPrimary,
  },
  nameText: {
    fontSize: 22,
    marginVertical: 4,
    fontFamily: 'Avenir',
    color: Theme.colors.textPrimary,
    fontWeight: '700',
  },
  nameLabel: {
    fontWeight: '800',
    fontStyle: 'italic',
  },
  label: {
    fontWeight: '600',
    fontStyle: 'italic',
  },
});