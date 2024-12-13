import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Theme from "@/assets/theme";
import { useRouter } from "expo-router";

export default function ExploreItem({ title, image, source, cost, item }) {
  const router = useRouter();

  const handleLearnMore = () => {
    switch (item.type) {
      case "flight":
        router.push(
          "/tabs/explore/flightDetails?item=" +
            encodeURIComponent(JSON.stringify(item))
        );
        break;
      case "activity":
        router.push(
          "/tabs/explore/activityDetails?item=" +
            encodeURIComponent(JSON.stringify(item))
        );
        break;
      case "stay":
        router.push(
          "/tabs/explore/stayDetails?item=" +
            encodeURIComponent(JSON.stringify(item))
        );
        break;
      default:
        console.warn("Unknown item type:", item.type);
    }
  };

  const displayCost = () => {
    if (!cost) return "Price not available";
    if (cost.toLowerCase().includes("free")) return "Free";
    return cost;
  };

  const renderFlightInfo = () => {
    if (item.type !== "flight") return null;
    const isRoundTrip = item.details.return !== null;
    return (
      <View style={styles.flightInfo}>
        <Text style={styles.flightType}>
          {isRoundTrip ? "Round Trip" : "One Way"}
        </Text>
        <Text style={styles.flightDates}>
          {new Date(item.details.outbound.departure).toLocaleDateString()}
          {isRoundTrip &&
            ` - ${new Date(item.details.return.arrival).toLocaleDateString()}`}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {renderFlightInfo()}
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
  flightInfo: {
    marginBottom: Theme.sizes.spacingSmall,
  },
  flightType: {
    fontSize: Theme.sizes.textSmall,
    color: Theme.colors.primary,
    fontWeight: "600",
  },
  flightDates: {
    fontSize: Theme.sizes.textSmall,
    color: Theme.colors.textSecondary,
    marginTop: 2,
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
    width: "100%",
    height: "100%",
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
