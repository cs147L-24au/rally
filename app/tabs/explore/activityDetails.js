import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import Theme from "@/assets/theme";
import AddToGroupButton from "@/components/AddToGroupButton";

export default function ActivityDetails() {
  const { item } = useLocalSearchParams();
  const parsedItem = typeof item === "string" ? JSON.parse(item) : item;
  const { details } = parsedItem;

  const displayCost = () => {
    if (!parsedItem.cost || parsedItem.cost === "Free") {
      return "Free";
    }
    return parsedItem.cost;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{parsedItem.title}</Text>
        <Text style={styles.category}>{details.category}</Text>
      </View>

      {/* Main Image */}
      <Image
        source={{ uri: parsedItem.image }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Info Section */}
      <View style={styles.infoContainer}>
        {/* Rating & Price */}
        <View style={styles.ratingPriceRow}>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{details.rating}/5</Text>
            <Text style={styles.reviews}>({details.reviews} reviews)</Text>
          </View>
          <Text style={styles.price}>{displayCost()}</Text>
        </View>

        {/* Status */}
        {details.openStatus && (
          <Text style={styles.openStatus}>{details.openStatus}</Text>
        )}

        {/* Location */}
        <View style={styles.locationContainer}>
          <Text style={styles.sectionTitle}>Location</Text>
          <Text style={styles.locationText}>{details.location}</Text>
          {details.neighborhood && (
            <Text style={styles.neighborhoodText}>{details.neighborhood}</Text>
          )}
        </View>

        {/* Description */}
        {details.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.descriptionText}>{details.description}</Text>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        <AddToGroupButton item={parsedItem} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    padding: 16,
    backgroundColor: Theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.borderGray,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Theme.colors.textPrimary,
  },
  category: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
    marginTop: 4,
  },
  image: {
    width: "100%",
    height: 200,
  },
  infoContainer: {
    padding: 16,
    backgroundColor: Theme.colors.white,
  },
  ratingPriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
  },
  reviews: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: Theme.colors.primary,
  },
  openStatus: {
    fontSize: 16,
    color: Theme.colors.success,
    marginBottom: 16,
  },
  locationContainer: {
    marginBottom: 24,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: Theme.colors.textPrimary,
  },
  locationText: {
    fontSize: 16,
    color: Theme.colors.textPrimary,
    marginBottom: 4,
  },
  neighborhoodText: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: Theme.colors.textPrimary,
  },
  actionContainer: {
    padding: 16,
    backgroundColor: Theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.borderGray,
  },
});
