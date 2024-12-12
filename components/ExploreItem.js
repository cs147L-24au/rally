import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Theme from "@/assets/theme";

export default function ExploreItem({ title, image, source, cost, onPress }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Image source={image} style={styles.image} />

      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.source}>Source: {source}</Text>
          <Text style={styles.cost}>Cost: ${cost}/night</Text>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.learnMore} onPress={onPress}>
            <Text style={styles.learnMoreText}>Learn more</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bookmark}>
            <Text>🔖</Text>
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
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: Theme.sizes.spacingSmall,
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
