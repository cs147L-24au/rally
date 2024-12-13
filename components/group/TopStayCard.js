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
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    paddingHorizontal: 12,
  },
  stayName: {
    fontSize: 16,
    fontWeight: '500',
  },
  price: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    marginTop: 4,
  },
  seeMore: {
    color: Theme.colors.blue,
    fontSize: 14,
  },
});
