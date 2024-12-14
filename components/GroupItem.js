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

export default function GroupItem({
  title,
  image,
  source,
  cost,
  item,
  isBookmarked,
  onBookmarkChange,
  groupId,
  onDelete,
}) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    fetchUserGroups();
  }, []);

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

  const handleDelete = async () => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to remove this item from the group?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const { error } = await supabaseActions.deleteGroupPinnedItem(
                groupId,
                item.id
              );
              if (error) throw error;
              if (onDelete) onDelete();
            } catch (error) {
              console.error("Error deleting item:", error);
              Alert.alert("Error", "Failed to delete item");
            }
          },
        },
      ]
    );
  };

  const handleAddToGroup = async (groupId) => {
    try {
      const { data: existingItems, error: fetchError } =
        await supabaseActions.getGroupPinnedItems(groupId);

      if (fetchError) throw fetchError;

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

      const { error } = await supabaseActions.addPinnedItem(
        groupId,
        item.type,
        item
      );
      if (error) throw error;

      Alert.alert("Success", "Item added to group successfully");
      setShowModal(false);
      if (onBookmarkChange) onBookmarkChange(true);
    } catch (error) {
      console.error("Error adding to group:", error);
      Alert.alert("Error", "Failed to add item to group");
    }
  };

  const renderGroupItem = ({ item: group }) => (
    <TouchableOpacity
      style={styles.groupItem}
      onPress={() => handleAddToGroup(group.id)}
    >
      <Text style={styles.groupName}>{group.name}</Text>
    </TouchableOpacity>
  );

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        const detailsRoute = `${item.type}Details`;
        router.push({
          pathname: `/tabs/groups/${detailsRoute}`,
          params: { item: JSON.stringify(item) },
        });
      }}
    >
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
          <Text style={styles.cost}>
            {!cost
              ? "Price not available"
              : cost.toLowerCase().includes("free")
              ? "Free"
              : cost}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={36}
              color={Theme.colors.blue}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bookmark}
            onPress={() => setShowModal(true)}
          >
            <MaterialCommunityIcons
              name={isBookmarked ? "bookmark" : "bookmark-outline"}
              size={38}
              color={Theme.colors.blue}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select a Group</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={userGroups}
              renderItem={renderGroupItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.groupList}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.white,
    borderRadius: 12,
    padding: Theme.sizes.spacingMedium,
    marginBottom: Theme.sizes.spacingMedium,
    shadowColor: Theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: Theme.sizes.textLarge,
    fontWeight: "600",
    marginBottom: Theme.sizes.spacingSmall,
    color: Theme.colors.textPrimary,
    fontFamily: "Avenir",
  },
  imageContainer: {
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: Theme.sizes.spacingSmall,
  },
  image: {
    width: "100%",
    height: "100%",
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
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    padding: Theme.sizes.spacingSmall / 2,
    marginRight: Theme.sizes.spacingSmall,
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
