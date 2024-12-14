import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Modal,
  View,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import Theme from "@/assets/theme";
import { supabaseActions } from "@/utils/supabase";

export default function AddToGroupButton({ item }) {
  const router = useRouter();
  const [isAdded, setIsAdded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const { data, error } = await supabaseActions.getUserGroups();
        if (error) throw error;
        setGroups(data || []);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  const handleAddToGroup = async (groupId) => {
    try {
      const type = item.type || "stay";

      // First fetch existing items for this group
      const { data: existingItems, error: fetchError } =
        await supabaseActions.getGroupPinnedItems(groupId);

      if (fetchError) throw fetchError;

      // Check if item already exists in group
      const isDuplicate = existingItems.some(
        (existingItem) =>
          existingItem.type === type && existingItem.item_data.id === item.id
      );

      if (isDuplicate) {
        Alert.alert(
          "Already Added",
          "This item has already been added to this group."
        );
        return;
      }

      // If not duplicate, proceed with adding
      await supabaseActions.addPinnedItem(groupId, type, item);
      setIsAdded(true);
      setShowModal(false);
      Alert.alert(
        "Added to Group",
        "This item has been added to your group's options.",
        [
          {
            text: "View Group",
            onPress: () =>
              router.push({
                pathname: "/tabs/groups/groupsummary",
                params: { groupId: groupId },
              }),
          },
          { text: "OK", style: "default" },
        ]
      );
    } catch (error) {
      console.error("Error adding item to group:", error);
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
    <>
      <TouchableOpacity
        style={[styles.button, isAdded && styles.addedButton]}
        onPress={() => setShowModal(true)}
        disabled={isAdded}
      >
        <Text style={[styles.buttonText, isAdded && styles.addedButtonText]}>
          {isAdded ? "Added to Group" : "Add to Group"}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Group</Text>
            <FlatList
              data={groups}
              renderItem={renderGroupItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.groupList}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Theme.colors.blue,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  addedButton: {
    backgroundColor: Theme.colors.success,
  },
  addedButtonText: {
    color: "white",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: Theme.colors.white,
    borderRadius: 15,
    padding: 20,
    width: "80%",
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
  },
  groupList: {
    paddingVertical: 10,
  },
  groupItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.lightestBlue,
  },
  groupName: {
    fontSize: 16,
    color: Theme.colors.textPrimary,
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: Theme.colors.blue,
    fontSize: 16,
    fontWeight: "600",
  },
});
