import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Theme from "@/assets/theme";

export default function TopStaySummary({ stay, onPress }) {
  if (!stay || stay.length === 0) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Top Stay</Text>
        <Text style={styles.noDataText}>No stay selected yet</Text>
      </View>
    );
  }

  const stayData = stay[0].item_data;

  // Remove any numbering prefix from the stay title, if applicable
  const cleanTitle = stayData.title.replace(/^\d+\.\s*/, "");

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Top Stay</Text>
      <View style={styles.content}>
        <Image source={{ uri: stayData.image }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <View style={styles.details}>
            <Text style={styles.stayName}>{cleanTitle}</Text>
            <Text style={styles.price}>{stayData.cost}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.seeMore}>See more stays →</Text>
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
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  details: {
    flex: 1,
  },
  stayName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
    fontFamily: "Avenir",
    color: Theme.colors.textPrimary,
  },
  price: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
    fontFamily: "Avenir",
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
});

