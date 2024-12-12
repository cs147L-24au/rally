import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Theme from "@/assets/theme";
import { useRouter } from "expo-router";

// In ExploreItem.js
export default function ExploreItem({ title, image, source, cost, item }) {
  const router = useRouter();

  const handleLearnMore = () => {
    if (item.details?.category) {
      router.push(
        "/tabs/explore/activityDetails?item=" +
          encodeURIComponent(JSON.stringify(item))
      );
    } else if (item.details?.flightDetails) {
      router.push(
        "/tabs/explore/flightDetails?item=" +
          encodeURIComponent(JSON.stringify(item))
      );
    } else {
      router.push(
        "/tabs/explore/stayDetails?item=" +
          encodeURIComponent(JSON.stringify(item))
      );
    }
  };

  const displayCost = () => {
    if (!cost) return "Price not available";
    if (cost.toLowerCase().includes("free")) return "Free";
    return cost;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.imageContainer}>
        <Image
          source={typeof image === "string" ? { uri: image } : image}
          style={styles.image}
        />
      </View>

      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.source}>{source}</Text>
          <Text style={styles.cost}>{displayCost()}</Text>
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.learnMore} onPress={handleLearnMore}>
            <Text style={styles.learnMoreText}>Learn More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.white,
    borderRadius: 15,
    padding: Theme.sizes.spacingMedium,
    marginHorizontal: Theme.sizes.spacingMedium,
    marginBottom: Theme.sizes.spacingMedium,
    borderWidth: 1,
    borderColor: Theme.colors.borderGray,
  },
  title: {
    fontSize: Theme.sizes.textLarge,
    fontWeight: "600",
    color: Theme.colors.black,
    marginBottom: Theme.sizes.spacingSmall,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    marginBottom: Theme.sizes.spacingSmall,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%", // Reduce width to prevent touching edges
    height: "100%", // Reduce height to prevent touching edges
    resizeMode: "fill",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  source: {
    fontSize: Theme.sizes.textSmall,
    color: Theme.colors.gray,
  },
  cost: {
    fontSize: Theme.sizes.textSmall,
    color: Theme.colors.gray,
    fontWeight: "500",
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.sizes.spacingSmall,
  },
  learnMore: {
    backgroundColor: Theme.colors.grayLight,
    paddingHorizontal: Theme.sizes.spacingMedium,
    paddingVertical: Theme.sizes.spacingSmall,
    borderRadius: 20,
  },
  learnMoreText: {
    color: Theme.colors.blue,
    fontSize: Theme.sizes.textSmall,
  },
  bookmark: {
    padding: Theme.sizes.spacingSmall / 2,
  },
});
