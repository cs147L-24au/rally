import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Theme from "@/assets/theme";
import { MaterialIcons } from "@expo/vector-icons";

export default function StayDetails() {
  const router = useRouter();
  const { item } = useLocalSearchParams();
  const parsedItem = typeof item === "string" ? JSON.parse(item) : item;
  const { details } = parsedItem;
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToGroup = () => {
    // TODO: Implement actual group addition logic
    setIsAdded(true);
    Alert.alert(
      "Added to Group",
      "This stay has been added to your group's options.",
      [
        {
          text: "View Group",
          onPress: () => router.push("/tabs/group"),
        },
        {
          text: "OK",
          style: "default",
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with hotel name */}
      <View style={styles.header}>
        <Text style={styles.title}>{parsedItem.title}</Text>
        <View style={styles.ratingContainer}>
          {[...Array(Math.floor(details.stars))].map((_, i) => (
            <MaterialIcons
              key={i}
              name="star"
              size={20}
              color={Theme.colors.gold}
            />
          ))}
        </View>
      </View>

      {/* Main Image */}
      <View style={styles.imageContainer}>
        <Image
          source={
            typeof parsedItem.image === "string"
              ? { uri: parsedItem.image }
              : parsedItem.image
          }
          style={styles.image}
        />
      </View>

      {/* Review Summary */}
      <View style={styles.section}>
        <View style={styles.reviewHeader}>
          <Text style={styles.sectionTitle}>Guest Rating</Text>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingScore}>{details.rating}</Text>
          </View>
        </View>
        <Text style={styles.reviewText}>
          {details.reviewText} • {details.reviews} reviews
        </Text>
      </View>

      {/* Location section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <Text style={styles.locationText}>{details.distance}</Text>
        {details.landmark && (
          <Text style={styles.landmarkText}>{details.landmark}</Text>
        )}
      </View>

      {/* Dates section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Stay Dates</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Check-in</Text>
          <Text style={styles.value}>{details.checkIn}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Check-out</Text>
          <Text style={styles.value}>{details.checkOut}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Duration</Text>
          <Text style={styles.value}>{details.totalNights} nights</Text>
        </View>
      </View>

      {/* Price section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Price Breakdown</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Price per Night</Text>
          <Text style={styles.value}>${details.pricePerNight}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Base Total</Text>
          <Text style={styles.value}>
            ${details.basePrice * details.totalNights}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Taxes & Fees</Text>
          <Text style={styles.value}>
            ${details.taxAndFees * details.totalNights}
          </Text>
        </View>
        <View style={[styles.detailRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>
            Total for {details.totalNights} Nights
          </Text>
          <Text style={styles.price}>{parsedItem.cost}</Text>
        </View>
      </View>

      {/* Amenities section */}
      {details.amenities?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          {details.amenities.map((amenity, index) => (
            <View key={index} style={styles.highlightItem}>
              <Text style={styles.highlightText}>• {amenity}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Add to Group Button */}
      <View style={styles.actionSection}>
        <TouchableOpacity
          style={[
            styles.addToGroupButton,
            isAdded && styles.addedToGroupButton,
          ]}
          onPress={handleAddToGroup}
          disabled={isAdded}
        >
          <Text style={styles.addToGroupText}>
            {isAdded ? "Added to Group" : "Add to Group"}
          </Text>
        </TouchableOpacity>
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
    padding: Theme.sizes.spacingLarge,
    backgroundColor: Theme.colors.white,
  },
  title: {
    fontSize: Theme.sizes.textXLarge,
    fontWeight: "bold",
    color: Theme.colors.textPrimary,
    marginBottom: Theme.sizes.spacingSmall,
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: Theme.sizes.spacingSmall,
  },
  imageContainer: {
    height: 200,
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  section: {
    padding: Theme.sizes.spacingLarge,
    backgroundColor: Theme.colors.white,
    marginTop: Theme.sizes.spacingSmall,
  },
  sectionTitle: {
    fontSize: Theme.sizes.textLarge,
    fontWeight: "600",
    color: Theme.colors.textPrimary,
    marginBottom: Theme.sizes.spacingMedium,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingBadge: {
    backgroundColor: Theme.colors.success,
    padding: Theme.sizes.spacingSmall,
    borderRadius: Theme.sizes.borderRadius,
  },
  ratingScore: {
    color: Theme.colors.white,
    fontWeight: "bold",
  },
  reviewText: {
    color: Theme.colors.textSecondary,
    fontSize: Theme.sizes.textMedium,
  },
  locationText: {
    fontSize: Theme.sizes.textMedium,
    color: Theme.colors.textPrimary,
  },
  landmarkText: {
    fontSize: Theme.sizes.textMedium,
    color: Theme.colors.textSecondary,
    marginTop: Theme.sizes.spacingSmall,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Theme.sizes.spacingSmall,
  },
  label: {
    fontSize: Theme.sizes.textMedium,
    color: Theme.colors.textSecondary,
  },
  value: {
    fontSize: Theme.sizes.textMedium,
    color: Theme.colors.textPrimary,
    fontWeight: "500",
  },
  totalRow: {
    marginTop: Theme.sizes.spacingMedium,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.borderLight,
    paddingTop: Theme.sizes.spacingMedium,
  },
  totalLabel: {
    fontSize: Theme.sizes.textMedium,
    fontWeight: "600",
    color: Theme.colors.textPrimary,
  },
  price: {
    fontSize: Theme.sizes.textLarge,
    fontWeight: "bold",
    color: Theme.colors.primary,
  },
  highlightItem: {
    paddingVertical: Theme.sizes.spacingSmall,
  },
  highlightText: {
    fontSize: Theme.sizes.textMedium,
    color: Theme.colors.textPrimary,
  },
  actionSection: {
    padding: Theme.sizes.spacingLarge,
    backgroundColor: Theme.colors.white,
    marginTop: Theme.sizes.spacingSmall,
    marginBottom: Theme.sizes.spacingLarge,
  },
  addToGroupButton: {
    backgroundColor: Theme.colors.primary,
    padding: Theme.sizes.spacingMedium,
    borderRadius: Theme.sizes.borderRadius,
    alignItems: "center",
  },
  addedToGroupButton: {
    backgroundColor: Theme.colors.success,
  },
  addToGroupText: {
    color: Theme.colors.white,
    fontSize: Theme.sizes.textLarge,
    fontWeight: "600",
  },
});
