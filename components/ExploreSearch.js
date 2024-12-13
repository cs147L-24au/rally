import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Theme from "@/assets/theme";

export default function ExploreSearch({ onSearch }) {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [isFromDatePickerVisible, setFromDatePickerVisible] = useState(false);
  const [isToDatePickerVisible, setToDatePickerVisible] = useState(false);
  const [fromDestination, setFromDestination] = useState("");
  const [toDestination, setToDestination] = useState("");

  const handleSearch = () => {
    if (!fromDestination || !toDestination) {
      alert("Please enter both departure and arrival destinations");
      return;
    }
    if (!fromDate || !toDate) {
      alert("Please select travel dates");
      return;
    }

    onSearch({
      fromDestination,
      destination: toDestination,
      fromDate: fromDate.toISOString().split("T")[0],
      toDate: toDate.toISOString().split("T")[0],
      group: selectedGroup,
    });
  };

  const groups = [
    { label: "Select a group", value: "" },
    { label: "Adelfa", value: "Adelfa" },
    { label: "Family", value: "Family" },
    { label: "Friends", value: "Friends" },
    { label: "Solo", value: "Solo" },
  ];

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
    });
  };

  const handleFromDateConfirm = (date) => {
    setFromDatePickerVisible(false);
    setFromDate(date);
  };

  const handleToDateConfirm = (date) => {
    setToDatePickerVisible(false);
    setToDate(date);
  };

  const renderGroupPicker = () => (
    <Modal
      visible={showModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Group</Text>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.doneButton}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
          <Picker
            selectedValue={selectedGroup}
            onValueChange={(itemValue) => {
              setSelectedGroup(itemValue);
              setShowModal(false);
            }}
            style={styles.picker}
          >
            {groups.map((group) => (
              <Picker.Item
                key={group.value}
                label={group.label}
                value={group.value}
              />
            ))}
          </Picker>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.card}>
      <View style={styles.tripInfo}>
        <View style={styles.infoRow}>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Dates</Text>
          <View style={styles.dateContainer}>
            <TouchableOpacity
              style={[styles.dateInput, styles.input]}
              onPress={() => setFromDatePickerVisible(true)}
            >
              <Text style={[styles.inputText, !fromDate && styles.placeholder]}>
                {fromDate ? formatDate(fromDate) : "From"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.dateInput, styles.input]}
              onPress={() => setToDatePickerVisible(true)}
            >
              <Text style={[styles.inputText, !toDate && styles.placeholder]}>
                {toDate ? formatDate(toDate) : "To"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <DateTimePickerModal
          isVisible={isFromDatePickerVisible}
          mode="date"
          onConfirm={handleFromDateConfirm}
          onCancel={() => setFromDatePickerVisible(false)}
          minimumDate={new Date()}
        />

        <DateTimePickerModal
          isVisible={isToDatePickerVisible}
          mode="date"
          onConfirm={handleToDateConfirm}
          onCancel={() => setToDatePickerVisible(false)}
          minimumDate={fromDate || new Date()}
        />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Locations</Text>
          <View style={styles.destinationContainer}>
            <TextInput
              style={[styles.dateInput, styles.input]}
              placeholder="From"
              placeholderTextColor="#999"
              value={fromDestination}
              onChangeText={setFromDestination}
            />
            <TextInput
              style={[styles.dateInput, styles.input]}
              placeholder="To"
              placeholderTextColor="#999"
              value={toDestination}
              onChangeText={setToDestination}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.white,
    margin: Theme.sizes.spacingSmall,
    borderRadius: 15,
    padding: Theme.sizes.spacingSmall,
    borderWidth: 1,
    borderColor: Theme.colors.borderGray,
    width: '90%',
    alignSelf: "center", // Center the card horizontally
    marginTop: 12, // Add more space below the header
  },
  tripInfo: {
    gap: Theme.sizes.spacingSmall,
  },
  infoRow: {
    gap: 2,
  },
  label: {
    fontSize: Theme.sizes.textMedium,
    color: Theme.colors.gray,
    fontFamily: "Avenir",
    fontWeight: "bold",
    
  },
  input: {
    fontSize: Theme.sizes.textSmall,
    color: Theme.colors.black,
    backgroundColor: Theme.colors.grayLight,
    padding: Theme.sizes.spacingSmall,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Theme.colors.borderGray,
    height: 36,
    justifyContent: "center",
    fontFamily: "Avenir",
  },
  inputText: {
    fontSize: Theme.sizes.textSmall,
    color: Theme.colors.black,
  },
  placeholder: {
    color: Theme.colors.gray,
  },
  dateContainer: {
    flexDirection: "row",
    gap: Theme.sizes.spacingSmall,
  },
  destinationContainer: {
    flexDirection: "row",
    gap: Theme.sizes.spacingSmall,
  },
  dateInput: {
    flex: 1,
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
    fontFamily: "Avenir",
  },
  searchButton: {
    backgroundColor: Theme.colors.blue,
    paddingVertical: Theme.sizes.spacingSmall,
    paddingHorizontal: Theme.sizes.spacingMedium,
    borderRadius: 10, // Smaller border radius
    marginTop: Theme.sizes.spacingMedium,
    alignSelf: "center", // Center the button
    minWidth: 100, // Set minimum width
  },
  searchButtonText: {
    color: Theme.colors.white,
    fontSize: Theme.sizes.textSmall, // Smaller font size
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "Avenir",
  },
});
