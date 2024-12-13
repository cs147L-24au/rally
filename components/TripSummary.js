import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Theme from "@/assets/theme";

export default function TripSummaryCard({ title, summaryText, imageSource, stats }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.summaryText}>{summaryText}</Text>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <Text key={index} style={styles.statText}>
            <Text style={styles.statNumber}>{stat.number} </Text>
            {stat.label}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.white,
    borderRadius: 20,
    padding: 16,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
    width: 325, 
    alignSelf: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "Avenir", 
    color: Theme.colors.textPrimary,
    marginBottom: 3,
    textAlign: "center",
    fontStyle: "italic"
  },
  summaryText: {
    fontSize: 16,
    fontFamily: "Avenir",
    color: "Theme.colors.blue",
    marginBottom: 12,
    textAlign: "center",
    fontStyle: "italic"
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    marginBottom: 16,
  },
  statsContainer: {
    backgroundColor: Theme.colors.lightBlueHeader,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
  },
  statText: {
    fontSize: 16,
    fontFamily: "Avenir",
    color: Theme.colors.white,
    marginBottom: 4,
    textAlign: "left",
  },
  statNumber: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
