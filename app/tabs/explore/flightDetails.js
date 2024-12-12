import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import Theme from "@/assets/theme";

export default function FlightDetails() {
  const { item } = useLocalSearchParams();
  const parsedItem = typeof item === "string" ? JSON.parse(item) : item;
  const { details } = parsedItem;

  return (
    <ScrollView style={styles.container}>
      {/* Header with flight route */}
      <View style={styles.header}>
        <Text style={styles.title}>{parsedItem.title}</Text>
        <Text style={styles.airline}>{parsedItem.source}</Text>
      </View>

      {/* Price section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Price Breakdown</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Base Fare</Text>
          <Text style={styles.value}>${details?.pricing?.base || "0"}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Taxes</Text>
          <Text style={styles.value}>${details?.pricing?.taxes || "0"}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Fees</Text>
          <Text style={styles.value}>${details?.pricing?.fees || "0"}</Text>
        </View>
        <View style={[styles.detailRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.price}>{parsedItem.cost}</Text>
        </View>
      </View>

      {/* Flight details section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Flight Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Departure</Text>
          <Text style={styles.value}>{details.departure}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Arrival</Text>
          <Text style={styles.value}>{details.arrival}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Duration</Text>
          <Text style={styles.value}>{details.duration}</Text>
        </View>
        {details.direct && (
          <View style={styles.directFlight}>
            <Text style={styles.directFlightText}>Direct Flight ✈️</Text>
          </View>
        )}
      </View>

      {/* Airport Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Airport Information</Text>
        <View style={styles.airportContainer}>
          <Text style={styles.subheader}>Departure</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Airport</Text>
            <Text style={styles.value}>
              {details?.airports?.departure?.name}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Terminal</Text>
            <Text style={styles.value}>
              {details?.airports?.departure?.terminal || "TBD"}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>City</Text>
            <Text style={styles.value}>
              {details?.airports?.departure?.city}
            </Text>
          </View>
        </View>

        <View style={[styles.airportContainer, styles.marginTop]}>
          <Text style={styles.subheader}>Arrival</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Airport</Text>
            <Text style={styles.value}>{details?.airports?.arrival?.name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Terminal</Text>
            <Text style={styles.value}>
              {details?.airports?.arrival?.terminal || "TBD"}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>City</Text>
            <Text style={styles.value}>{details?.airports?.arrival?.city}</Text>
          </View>
        </View>
      </View>

      {/* Airline Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Airline Information</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Airline</Text>
          <Text style={styles.value}>{details?.airline?.name}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Flight Class</Text>
          <Text style={styles.value}>{details?.booking?.cabinClass}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Seats Available</Text>
          <Text style={styles.value}>{details?.booking?.seatsAvailable}</Text>
        </View>
        {details?.booking?.refundable && (
          <View style={styles.refundable}>
            <Text style={styles.refundableText}>✓ Refundable Ticket</Text>
          </View>
        )}
      </View>

      {/* Add to Group button */}
      <View style={styles.actionSection}>
        <TouchableOpacity
          style={styles.addToGroupButton}
          onPress={() => {
            /* Add to group logic */
          }}
        >
          <Text style={styles.addToGroupText}>Add to Group</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.borderGray,
  },
  title: {
    fontSize: Theme.sizes.textXLarge,
    fontWeight: "600",
    color: Theme.colors.textPrimary,
    marginBottom: Theme.sizes.spacingSmall,
  },
  airline: {
    fontSize: Theme.sizes.textMedium,
    color: Theme.colors.textSecondary,
  },
  section: {
    backgroundColor: Theme.colors.white,
    padding: Theme.sizes.spacingLarge,
    marginTop: Theme.sizes.spacingMedium,
    borderRadius: Theme.sizes.borderRadius,
    shadowColor: Theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: Theme.sizes.textLarge,
    fontWeight: "600",
    color: Theme.colors.textPrimary,
    marginBottom: Theme.sizes.spacingMedium,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Theme.sizes.spacingSmall,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.borderLight,
  },
  label: {
    fontSize: Theme.sizes.textMedium,
    color: Theme.colors.textSecondary,
    flex: 1,
  },
  value: {
    fontSize: Theme.sizes.textMedium,
    color: Theme.colors.textPrimary,
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
  },
  totalRow: {
    marginTop: Theme.sizes.spacingMedium,
    borderTopWidth: 2,
    borderTopColor: Theme.colors.borderGray,
    borderBottomWidth: 0,
    paddingTop: Theme.sizes.spacingMedium,
  },
  totalLabel: {
    fontSize: Theme.sizes.textLarge,
    fontWeight: "600",
    color: Theme.colors.textPrimary,
  },
  price: {
    fontSize: Theme.sizes.textLarge,
    fontWeight: "700",
    color: Theme.colors.primary,
  },
  directFlight: {
    marginTop: Theme.sizes.spacingMedium,
    padding: Theme.sizes.spacingMedium,
    backgroundColor: Theme.colors.successLight,
    borderRadius: Theme.sizes.borderRadius,
    alignItems: "center",
  },
  directFlightText: {
    color: Theme.colors.success,
    fontSize: Theme.sizes.textMedium,
    fontWeight: "600",
  },
  refundable: {
    marginTop: Theme.sizes.spacingMedium,
    padding: Theme.sizes.spacingMedium,
    backgroundColor: Theme.colors.primaryLight,
    borderRadius: Theme.sizes.borderRadius,
    alignItems: "center",
  },
  refundableText: {
    color: Theme.colors.primary,
    fontSize: Theme.sizes.textMedium,
    fontWeight: "600",
  },
  airportContainer: {
    marginBottom: Theme.sizes.spacingMedium,
  },
  subheader: {
    fontSize: Theme.sizes.textMedium,
    fontWeight: "600",
    color: Theme.colors.textSecondary,
    marginBottom: Theme.sizes.spacingSmall,
    marginTop: Theme.sizes.spacingMedium,
  },
  marginTop: {
    marginTop: Theme.sizes.spacingLarge,
  },
  actionSection: {
    padding: Theme.sizes.spacingLarge,
    backgroundColor: Theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.borderGray,
    marginTop: Theme.sizes.spacingMedium,
  },
  addToGroupButton: {
    backgroundColor: Theme.colors.success,
    padding: Theme.sizes.spacingMedium,
    borderRadius: Theme.sizes.borderRadius,
    alignItems: "center",
    shadowColor: Theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  addToGroupText: {
    color: Theme.colors.white,
    fontSize: Theme.sizes.textLarge,
    fontWeight: "600",
  },
});
