import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, Alert } from "react-native";
import Theme from "@/assets/theme";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Picker } from "@react-native-picker/picker";

export default function ExploreItem({ title, image, source, cost, item }) {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false); // Track bookmark state
  const [showModal, setShowModal] = useState(false); 
  const [selectedGroup, setSelectedGroup] = useState("");

  const handleCardPress = () => {
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

  const handleBookmarkPress = () => {
    if (isBookmarked) {
      // If already bookmarked, remove the bookmark
      setIsBookmarked(false);
      Alert.alert("Removed", `Removed from ${selectedGroup} group.`);
    } else {
      // If not bookmarked, show the modal to select a group
      setShowModal(true);
    }
  };

  const handleConfirmGroup = () => {
    if (!selectedGroup) {
      Alert.alert("Error", "Please select a group first.");
      return;
    }
    setIsBookmarked(true); // Change the icon to filled bookmark
    setShowModal(false); // Close the modal
    Alert.alert("Success", `Added to ${selectedGroup} group.`);
  };

  const renderGroupPicker = () => (
    <Modal
      visible={showModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Group</Text>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.doneButton}
            >
              <Text style={styles.doneButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <Picker
            selectedValue={selectedGroup}
            onValueChange={(itemValue) => setSelectedGroup(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a group" value="" />
            <Picker.Item label="Adelfa" value="Adelfa" />
            <Picker.Item label="Family" value="Family" />
            <Picker.Item label="Friends" value="Friends" />
            <Picker.Item label="Solo" value="Solo" />
          </Picker>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmGroup}>
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );


  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress}>
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
        {/* Bookmark Icon */}
        <TouchableOpacity style={styles.bookmark} onPress={handleBookmarkPress}>
          <MaterialCommunityIcons
            name={isBookmarked ? "bookmark" : "bookmark-outline"}
            size={38}
            color={Theme.colors.blue}
          />
        </TouchableOpacity>
      </View>
      {/* Group Picker Modal */}
      {renderGroupPicker()}
    </TouchableOpacity>
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
    fontFamily: "Avenir", 
  },
  flightInfo: {
    marginBottom: Theme.sizes.spacingSmall,
  },
  flightType: {
    fontSize: Theme.sizes.textSmall,
    color: Theme.colors.primary,
    fontWeight: "600",
    fontFamily: "Avenir",
  },
  flightDates: {
    fontSize: Theme.sizes.textSmall,
    color: Theme.colors.textSecondary,
    marginTop: 2,
    fontFamily: "Avenir",
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
    fontSize: Theme.sizes.textMedium,
    color: Theme.colors.gray,
    fontFamily: "Avenir",
  },
  cost: {
    fontSize: Theme.sizes.textMedium,
    color: Theme.colors.gray,
    fontWeight: "500",
    fontFamily: "Avenir",
    fontWeight: "bold"
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
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Theme.colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Theme.sizes.spacingLarge,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Theme.sizes.spacingMedium,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.borderGray,
  },
  modalTitle: {
    fontSize: Theme.sizes.textLarge,
    fontWeight: "600",
    color: Theme.colors.black,
  },
  doneButton: {
    padding: Theme.sizes.spacingSmall,
  },
  doneButtonText: {
    color: Theme.colors.blue,
    fontSize: Theme.sizes.textMedium,
    fontWeight: "600",
  },
  confirmButton: {
    backgroundColor: Theme.colors.blue,
    paddingVertical: Theme.sizes.spacingSmall,
    paddingHorizontal: Theme.sizes.spacingMedium,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: Theme.sizes.spacingSmall,
  },
  confirmButtonText: {
    color: Theme.colors.white,
    fontSize: Theme.sizes.textMedium,
    fontWeight: "600",
  },
});
