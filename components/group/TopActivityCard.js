import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Theme from "@/assets/theme";

export default function TopActivitySummary({ activity, onPress }) {
  if (!activity) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Top Activity</Text>
        <Text style={styles.noDataText}>No activity selected yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Top Activity</Text>
      <View style={styles.content}>
        <Image 
          source={activity.image} 
          style={styles.image}
        />
        <View style={styles.detailsContainer}>
          <View style={styles.details}>
            <Text style={styles.activityName}>{activity.name}</Text>
            <Text style={styles.date}>on {activity.date}</Text>
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
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  details: {
    flex: 1,
  },
  activityName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
  },
  bookButton: {
    backgroundColor: Theme.colors.lightBlue,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  bookText: {
    color: Theme.colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  noDataText: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    marginVertical: 12,
  },
  seeMore: {
    color: Theme.colors.textPrimary,
    fontSize: 16,
    textAlign: 'right',
    marginTop: 12,
  },
});
