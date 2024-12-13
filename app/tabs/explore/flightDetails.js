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
import AddToGroupButton from "@/components/AddToGroupButton";

export default function FlightDetails() {
  const { item } = useLocalSearchParams();
  const parsedItem = typeof item === "string" ? JSON.parse(item) : item;
  const { details } = parsedItem;

  const renderFlightSection = (flight, title) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Departure</Text>
        <Text style={styles.value}>{flight.departure}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Arrival</Text>
        <Text style={styles.value}>{flight.arrival}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Duration</Text>
        <Text style={styles.value}>{flight.duration}</Text>
      </View>
      {flight.segments.map((segment, index) => (
        <View key={index} style={styles.segmentContainer}>
          <Text style={styles.segmentTitle}>Flight {segment.flightNumber}</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Airline</Text>
            <Text style={styles.value}>{segment.airline}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Departure</Text>
            <Text style={styles.value}>{segment.departure}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Arrival</Text>
            <Text style={styles.value}>{segment.arrival}</Text>
          </View>
        </View>
      ))}
    </View>
  );

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

      {/* Outbound Flight */}
      {renderFlightSection(details.outbound, "Outbound Flight")}

      {/* Return Flight (if exists) */}
      {details.return && renderFlightSection(details.return, "Return Flight")}

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
  segmentContainer: {
    marginTop: Theme.sizes.spacingMedium,
    padding: Theme.sizes.spacingMedium,
    backgroundColor: Theme.colors.grayLight,
    borderRadius: Theme.sizes.borderRadius,
  },
  segmentTitle: {
    fontSize: Theme.sizes.textMedium,
    fontWeight: "600",
    color: Theme.colors.textPrimary,
    marginBottom: Theme.sizes.spacingSmall,
  },
});
