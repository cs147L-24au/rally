import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
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
      {/* Combined Content Card */}
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>{parsedItem.title}</Text>
          <Text style={styles.airline}>{parsedItem.source}</Text>
        </View>
        <View style={styles.separator} />

        {/* Price Section */}
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
        <View style={styles.separator}/>

        {/* Outbound Flight */}
        {renderFlightSection(details.outbound, "Outbound Flight")}
        <View style={styles.separator}/>

        {/* Return Flight (if exists) */}
        {details.return && renderFlightSection(details.return, "Return Flight")}
        <View style={styles.separator}/>

        {/* Airport Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Airport Information</Text>
          <View style={styles.airportContainer}>
            <Text style={styles.subheader}>Departure</Text>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Airport</Text>
              <Text style={styles.value}>{details?.airports?.departure?.name}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Terminal</Text>
              <Text style={styles.value}>{details?.airports?.departure?.terminal || "TBD"}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>City</Text>
              <Text style={styles.value}>{details?.airports?.departure?.city}</Text>
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
              <Text style={styles.value}>{details?.airports?.arrival?.terminal || "TBD"}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>City</Text>
              <Text style={styles.value}>{details?.airports?.arrival?.city}</Text>
            </View>
          </View>
        </View>
        <View style={styles.separator}/>

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
        <View style={styles.separator}/>

        {/* Add to Group Button */}
        <View style={styles.actionSection}>
          <AddToGroupButton item={parsedItem} />
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
    marginBottom: Theme.sizes.spacingSmall / 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Theme.colors.textPrimary,
    fontFamily: "Avenir",
    marginBottom: Theme.sizes.spacingSmall,
  },
  airline: {
    fontSize: Theme.sizes.textMedium,
    color: Theme.colors.textSecondary,
    fontFamily: "Avenir",
    marginBottom: Theme.sizes.spacingSmall,
  },
  section: {
    marginBottom: Theme.sizes.spacingSmall / 2,
  },
  sectionTitle: {
    fontSize: Theme.sizes.textLarge,
    fontWeight: "bold",
    color: Theme.colors.textPrimary,
    fontFamily: "Avenir",
    marginBottom: Theme.sizes.spacingSmall,
    fontStyle: "italic",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Theme.sizes.spacingSmall / 2,
  },
  label: {
    fontSize: Theme.sizes.textMedium,
    color: Theme.colors.textSecondary,
    fontFamily: "Avenir",
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
  refundable: {
    marginTop: Theme.sizes.spacingSmall,
    padding: Theme.sizes.spacingSmall,
    backgroundColor: Theme.colors.primaryLight,
    borderRadius: Theme.sizes.borderRadius,
    alignItems: "center",
  },
  refundableText: {
    color: Theme.colors.primary,
    fontSize: Theme.sizes.textMedium,
    fontWeight: "600",
    fontFamily: "Avenir",
  },
  segmentContainer: {
    marginTop: Theme.sizes.spacingSmall,
    padding: Theme.sizes.spacingMedium,
    backgroundColor: Theme.colors.grayLight,
    borderRadius: Theme.sizes.borderRadius,
  },
  segmentTitle: {
    fontSize: Theme.sizes.textMedium,
    fontWeight: "600",
    color: Theme.colors.textPrimary,
    fontFamily: "Avenir",
    marginBottom: Theme.sizes.spacingSmall,
  },
  airportContainer: {
    marginBottom: Theme.sizes.spacingSmall,
  },
  subheader: {
    fontSize: Theme.sizes.textMedium,
    fontWeight: "600",
    color: Theme.colors.textSecondary,
    fontFamily: "Avenir",
    marginBottom: Theme.sizes.spacingSmall,
    marginTop: Theme.sizes.spacingSmall,
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
