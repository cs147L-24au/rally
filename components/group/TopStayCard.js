import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Theme from "@/assets/theme";

export default function TopStaySummary({ stay, onPress }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Top Stay</Text>
      <View style={styles.contentContainer}>
        <Image 
          source={stay?.image} 
          style={styles.image} 
        />
        <View style={styles.details}>
          <Text style={styles.stayName}>{stay?.name}</Text>
          <Text style={styles.price}>{stay?.price}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.seeMore}>See more suggestions →</Text>
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
  contentContainer: {
    backgroundColor: Theme.colors.lightestBlue,
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
  },
  details: {
    flex: 1,
    padding: 12,
  },
  stayName: {
    fontSize: 18,
    fontWeight: '500',
    color: Theme.colors.textPrimary,
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
  },
  seeMore: {
    color: Theme.colors.textPrimary,
    fontSize: 16,
    textAlign: 'right',
    padding: 8,
    fontStyle: 'italic'
  }
});
