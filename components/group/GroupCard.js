import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Theme from "@/assets/theme";

export default function GroupCard({ group, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.groupName}>{group.name}</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.infoRow}>
          <MaterialCommunityIcons 
            name="calendar-range" 
            size={18} 
            color={Theme.colors.textSecondary} 
          />
          <Text style={styles.infoText}>{group.dates || 'Dates TBD'}</Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialCommunityIcons 
            name="map-marker" 
            size={18} 
            color={Theme.colors.textSecondary} 
          />
          <Text style={styles.infoText}>{group.destination || 'Destination TBD'}</Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialCommunityIcons 
            name="account-group" 
            size={18} 
            color={Theme.colors.textSecondary} 
          />
          <Text style={styles.infoText}>{group.memberCount || 0} members</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.white,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: Theme.colors.blue,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  groupName: {
    fontSize: 24,
    fontWeight: "bold",
    color: Theme.colors.white,
    fontFamily: "Avenir",
    textAlign: "center",
  },
  content: {
    padding: 16,
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
    fontFamily: 'Avenir',
  }
});