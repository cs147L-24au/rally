import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Theme from "@/assets/theme";

export default function TopActivitySummary({ activity, onPress }) {
  if (!activity || activity.length === 0) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Top Activity</Text>
        <Text style={styles.noDataText}>No activity selected yet</Text>
      </View>
    );
  }

  const activityData = activity[0].item_data;
  // Remove the numbering prefix (e.g., "1. ", "2. ") from the title
  const cleanTitle = activityData.title.replace(/^\d+\.\s*/, "");

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Top Activity</Text>
      <View style={styles.content}>
        <Image source={{ uri: activityData.image }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <View style={styles.details}>
            <Text style={styles.activityName}>{cleanTitle}</Text>
            <Text style={styles.price}>{activityData.cost}</Text>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
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
  activityName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
  },
  noDataText: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
    textAlign: "center",
    marginVertical: 12,
  },
  seeMore: {
    color: Theme.colors.textPrimary,
    fontSize: 16,
    textAlign: "right",
    marginTop: 12,
  },
});
