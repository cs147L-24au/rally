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
      style={[styles.button, isAdded && styles.addedButton]}
      onPress={handleAddToGroup}
      disabled={isAdded}
    >
      <Text style={[styles.buttonText, isAdded && styles.addedButtonText]}>
        {isAdded ? "Added to Group" : "Add to Group"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Theme.colors.white, // Default white background
    paddingVertical: Theme.sizes.spacingSmall, // Padding for vertical spacing
    paddingHorizontal: Theme.sizes.spacingSmall, // Padding for horizontal spacing
    borderRadius: 10, // Rounded corners
    alignItems: "center", // Center text horizontally
    justifyContent: "center", // Center text vertically
    borderWidth: 2, // Border width
    borderColor: Theme.colors.blue, // Blue border for default state
    shadowColor: Theme.colors.black, // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Shadow for Android
    width: 200, // Set a fixed width for the button
  },
  addedButton: {
    backgroundColor: Theme.colors.blue, // Filled blue background when added
    borderColor: Theme.colors.blue, // Border matches background
  },
  buttonText: {
    color: Theme.colors.blue, // Blue text for default state
    fontSize: Theme.sizes.textMedium, // Font size matches the rest of the app
    fontWeight: "600", // Semi-bold text
  },
  addedButtonText: {
    color: Theme.colors.white, // White text for added state
  },
});
