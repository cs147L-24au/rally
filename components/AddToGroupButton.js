import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import Theme from "@/assets/theme";

export default function AddToGroupButton({ item }) {
  const router = useRouter();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToGroup = () => {
    // TODO: Implement actual group addition logic with the item
    console.log("Adding to group:", item);
    setIsAdded(true);
    Alert.alert(
      "Added to Group",
      "This item has been added to your group's options.",
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
    <TouchableOpacity
      style={[styles.addToGroupButton, isAdded && styles.addedToGroupButton]}
      onPress={handleAddToGroup}
      disabled={isAdded}
    >
      <Text style={[styles.addToGroupText, isAdded && styles.addedToGroupText]}>
        {isAdded ? "Added to Group" : "Add to Group"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addToGroupButton: {
    backgroundColor: Theme.colors.white,
    padding: Theme.sizes.spacingMedium,
    borderRadius: Theme.sizes.spacingLarge,
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    borderWidth: 2,
    borderColor: Theme.colors.blue,
    shadowColor: Theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  addedToGroupButton: {
    backgroundColor: Theme.colors.blue,
    borderColor: Theme.colors.blue,
  },
  addToGroupText: {
    color: Theme.colors.blue,
    fontSize: Theme.sizes.textLarge,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  addedToGroupText: {
    color: Theme.colors.white,
  },
});
