import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
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
      {/* Combined Content Card */}
      <View style={styles.card}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>{parsedItem.title}</Text>
        </View>

        {/* Main Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: parsedItem.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* Category Section */}
        <Text style={styles.sectionTitle}>Category</Text>
        <Text style={styles.category}>{details.category}</Text>
        <View style={styles.separator} />

        {/* Cost Section */}
        <Text style={styles.sectionTitle}>Cost</Text>
        <Text style={styles.price}>{displayCost()}</Text>
        <View style={styles.separator} />

        {/* Rating Section */}
        <Text style={styles.sectionTitle}>Rating</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{details.rating}/5</Text>
          <Text style={styles.reviews}>({details.reviews} reviews)</Text>
        </View>
        <View style={styles.separator} />

        {/* Location Section */}
        <Text style={styles.sectionTitle}>Location</Text>
        <Text style={styles.locationText}>{details.location}</Text>
        {details.neighborhood && (
          <Text style={styles.neighborhoodText}>{details.neighborhood}</Text>
        )}
        <View style={styles.separator} />

        {/* About Section */}
        {details.description && (
          <View>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.descriptionText}>{details.description}</Text>
            <View style={styles.separator} />
          </View>
        )}
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
  category: {
    fontSize: Theme.sizes.textMedium,
    color: Theme.colors.textSecondary,
    fontFamily: "Avenir",
    marginBottom: Theme.sizes.spacingSmall / 2,
    marginTop: Theme.sizes.spacingSmall / 4,
  },
  imageContainer: {
    height: 200,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: Theme.sizes.spacingSmall,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  price: {
    fontSize: Theme.sizes.textMedium,
    color: Theme.colors.textSecondary,
    fontFamily: "Avenir",
    marginBottom: Theme.sizes.spacingSmall / 2,
    marginTop: Theme.sizes.spacingSmall / 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: Theme.sizes.textMedium,
    color: Theme.colors.textSecondary,
    fontFamily: "Avenir",
    marginBottom: Theme.sizes.spacingSmall / 2,
    marginTop: Theme.sizes.spacingSmall / 4,
    marginRight: Theme.sizes.spacingSmall,
  },
  reviews: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
    fontFamily: "Avenir",
  },
  locationText: {
    fontSize: Theme.sizes.textMedium,
    color: Theme.colors.textSecondary,
    fontFamily: "Avenir",
    marginBottom: Theme.sizes.spacingSmall / 2,
    marginTop: Theme.sizes.spacingSmall / 4,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: Theme.colors.textPrimary,
    fontFamily: "Avenir",
  },
  separator: {
    height: 2,
    width: "99%",
    backgroundColor: Theme.colors.blue,
    alignSelf: "center",
    marginVertical: Theme.sizes.spacingSmall,
  },
  sectionTitle: {
    fontSize: Theme.sizes.textLarge,
    fontWeight: "bold",
    color: Theme.colors.textPrimary,
    fontFamily: "Avenir",
    marginBottom: Theme.sizes.spacingSmall / 10,
    fontStyle: "italic",
  },
});
