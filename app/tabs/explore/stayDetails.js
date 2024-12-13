import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Theme from "@/assets/theme";
import AddToGroupButton from "@/components/AddToGroupButton";

export default function StayDetails() {
  const router = useRouter();
  const { item } = useLocalSearchParams();
  const parsedItem = typeof item === "string" ? JSON.parse(item) : item;
  const { details } = parsedItem;
  const [isAdded, setIsAdded] = useState(false);

  return (
  <ScrollView style={styles.container}>
  {/* Combined Content Card */}
  <View style={styles.card}>
    <View style={styles.header}>
      <Text style={styles.title}>{parsedItem.title}</Text>
    </View>
    {/* Image Section */}
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

    {/* Guest Rating Section */}
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
    <View style={styles.separator}/>

    {/* Location Section */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Location</Text>
      <Text style={styles.locationText}>{details.distance}</Text>
      {details.landmark && (
        <Text style={styles.landmarkText}>{details.landmark}</Text>
      )}
    </View>
    <View style={styles.separator}/>

    {/* Stay Dates Section */}
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
    <View style={styles.separator}/>

    {/* Price Breakdown Section */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Price Breakdown</Text>
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
        <Text style={styles.price}>
          $
          {details.basePrice * details.totalNights +
            details.taxAndFees * details.totalNights}
        </Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Price per Night</Text>
        <Text style={styles.value}>${details.pricePerNight}</Text>
      </View>
      <View style={styles.separator}/>

    {/* Amenities Section */}
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
        <AddToGroupButton item={parsedItem} />
      </View>
    </View>
  </View>
</ScrollView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  card: {
    backgroundColor: Theme.colors.white,
    borderRadius: 15,
    marginHorizontal: Theme.sizes.spacingMedium,
    marginTop: Theme.sizes.spacingSmall,
    padding: Theme.sizes.spacingLarge,
    borderWidth: 1,
    borderColor: Theme.colors.borderGray,
  },
  header: {
    marginBottom: Theme.sizes.spacingSmall, 
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Theme.colors.textPrimary,
    fontFamily: "Avenir",
    marginBottom: Theme.sizes.spacingSmall,
  },
  imageContainer: {
    height: 200,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: Theme.sizes.spacingLarge,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  section: {
    marginBottom: Theme.sizes.spacingSmall, 
  },
  sectionTitle: {
    fontSize: Theme.sizes.textLarge,
    fontWeight: "600",
    color: Theme.colors.textPrimary,
    fontFamily: "Avenir",
    marginBottom: Theme.sizes.spacingSmall,
    fontWeight: "bold", 
    fontStyle: "italic",
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
    fontFamily: "Avenir",
  },
  reviewText: {
    color: Theme.colors.textSecondary,
    fontSize: Theme.sizes.textMedium,
    fontFamily: "Avenir",
  },
  locationText: {
    fontSize: Theme.sizes.textMedium,
    color: Theme.colors.textPrimary,
    fontFamily: "Avenir",
  },
  landmarkText: {
    fontSize: Theme.sizes.textMedium,
    color: Theme.colors.textSecondary,
    marginTop: Theme.sizes.spacingMedium,
    fontFamily: "Avenir",
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
    fontFamily: "Avenir"
  },
  value: {
    fontSize: Theme.sizes.textMedium,
    color: Theme.colors.textPrimary,
    fontWeight: "500",
    fontFamily: "Avenir",
  },
  totalRow: {
    marginTop: Theme.sizes.spacingSmall,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.borderLight,
    paddingTop: Theme.sizes.spacingSmall,
  },
  totalLabel: {
    fontSize: Theme.sizes.textMedium,
    fontWeight: "600",
    color: Theme.colors.textPrimary,
    fontFamily: "Avenir",
  },
  price: {
    fontSize: Theme.sizes.textLarge,
    fontWeight: "bold",
    color: Theme.colors.primary,
    fontFamily: "Avenir",
  },
  actionSection: {
    alignItems: "center", 
    marginTop: Theme.sizes.spacingSmall,
  },
  separator: {
    height: 2,
    width: "99%",
    backgroundColor: Theme.colors.blue,
    alignSelf: "center",
    marginVertical: Theme.sizes.spacingSmall,
  },
});
