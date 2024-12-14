import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Theme from "@/assets/theme";
import { supabaseActions } from "@/utils/supabase";

export default function ExploreItem({ title, image, source, cost, item }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [userGroups, setUserGroups] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    fetchUserGroups();
    checkIfBookmarked();
  }, []);

  const checkIfBookmarked = async () => {
    try {
      // Get all user groups
      const { data: groups, error } = await supabaseActions.getUserGroups();
      if (error) throw error;

      // Check each group's pinned items
      for (const group of groups) {
        const { data: pinnedItems } = await supabaseActions.getGroupPinnedItems(
          group.id
        );
        const exists = pinnedItems.some(
          (pinnedItem) =>
            pinnedItem.type === item.type && pinnedItem.item_data.id === item.id
        );
        if (exists) {
          setIsBookmarked(true);
          return;
        }
      }
      setIsBookmarked(false);
    } catch (error) {
      console.error("Error checking bookmark status:", error);
    }
  };

  const fetchUserGroups = async () => {
    try {
      const { data, error } = await supabaseActions.getUserGroups();
      if (error) throw error;
      setUserGroups(data || []);
    } catch (error) {
      console.error("Error fetching groups:", error);
      Alert.alert("Error", "Failed to fetch groups");
    }
  };

  const handleCardPress = () => {
    const route = `/tabs/explore/${item.type}Details`;
    router.push(`${route}?item=${encodeURIComponent(JSON.stringify(item))}`);
  };

  const displayCost = () => {
    if (!cost) return "Price not available";
    if (cost.toLowerCase().includes("free")) return "Free";
    return cost;
  };

  const handleBookmarkPress = () => {
    setShowModal(true);
  };

  const handleAddToGroup = async (groupId) => {
    try {
      // First fetch existing items for this group
      const { data: existingItems, error: fetchError } =
        await supabaseActions.getGroupPinnedItems(groupId);

      if (fetchError) throw fetchError;

      // Check if item already exists in group
      const isDuplicate = existingItems.some(
        (existingItem) =>
          existingItem.type === item.type &&
          existingItem.item_data.id === item.id
      );

      if (isDuplicate) {
        Alert.alert(
          "Already Added",
          "This item has already been added to this group."
        );
        setShowModal(false);
        return;
      }

      // If not duplicate, proceed with adding
      const { error } = await supabaseActions.addPinnedItem(
        groupId,
        item.type,
        item
      );

      if (error) throw error;

      setIsBookmarked(true);
      setShowModal(false);
      Alert.alert("Success", "Added to group successfully!");
    } catch (error) {
      console.error("Error adding to group:", error);
      Alert.alert("Error", "Failed to add to group");
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress}>
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
        <TouchableOpacity style={styles.bookmark} onPress={handleBookmarkPress}>
          <MaterialCommunityIcons
            name={isBookmarked ? "bookmark" : "bookmark-outline"}
            size={38}
            color={Theme.colors.blue}
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add to Group</Text>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={userGroups}
              keyExtractor={(item) => item.id}
              renderItem={({ item: group }) => (
                <TouchableOpacity
                  style={styles.groupItem}
                  onPress={() => handleAddToGroup(group.id)}
                >
                  <Text style={styles.groupName}>{group.name}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.groupList}
            />
          </View>
        </View>
      </Modal>
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
    fontFamily: "Avenir",
    fontWeight: "bold",
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
    maxHeight: "80%",
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
  closeButton: {
    padding: Theme.sizes.spacingSmall,
  },
  closeButtonText: {
    color: Theme.colors.blue,
    fontSize: Theme.sizes.textMedium,
    fontWeight: "600",
  },
  groupList: {
    padding: Theme.sizes.spacingMedium,
  },
  groupItem: {
    padding: Theme.sizes.spacingMedium,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.borderGray,
  },
  groupName: {
    fontSize: Theme.sizes.textMedium,
    color: Theme.colors.textPrimary,
    fontFamily: "Avenir",
  },
});
