import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Theme from "@/assets/theme";

// Add this helper function at the top of your component
const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function ExploreSearch({ onSearch, activeTab }) {
  const [fromDestination, setFromDestination] = useState("");
  const [destination, setDestination] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const validateInputs = () => {
    // For flights, check both fromDestination and destination
    if (activeTab === "flights") {
      if (!fromDestination.trim()) {
        Alert.alert("Missing Information", "Please enter a departure city");
        return false;
      }
      if (!destination.trim()) {
        Alert.alert("Missing Information", "Please enter a destination city");
        return false;
      }
    } else {
      // For stays and activities, only check destination
      if (!destination.trim()) {
        Alert.alert("Missing Information", "Please enter a destination");
        return false;
      }
    }

    // Validate dates
    if (!fromDate) {
      Alert.alert("Missing Information", "Please select a start date");
      return false;
    }
    if (!toDate) {
      Alert.alert("Missing Information", "Please select an end date");
      return false;
    }

    // Ensure dates are not the same day and end date is after start date
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);

    if (startDate.getTime() === endDate.getTime()) {
      Alert.alert(
        "Invalid Dates",
        "Check-out date must be at least one day after check-in date"
      );
      return false;
    }

    if (endDate <= startDate) {
      Alert.alert("Invalid Dates", "The end date must be after the start date");
      return false;
    }

    return true;
  };

  const handleSearch = () => {
    if (validateInputs()) {
      const formatLocalDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      const searchData = {
        fromDestination:
          activeTab === "flights" ? fromDestination.trim() : null,
        destination: destination.trim(),
        fromDate: formatLocalDate(fromDate),
        toDate: formatLocalDate(toDate),
      };

      console.log("ExploreSearch - Sending search data:", searchData);
      onSearch(searchData);
    }
  };

  // Update the date picker handlers to enforce minimum one day difference
  const handleFromDateChange = (event, selectedDate) => {
    setShowFromPicker(false);
    if (selectedDate) {
      setFromDate(selectedDate);

      // If toDate is less than or equal to the new fromDate,
      // set toDate to the day after fromDate
      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);

      if (!toDate || toDate <= selectedDate) {
        setToDate(nextDay);
      }
    }
  };

  const handleToDateChange = (event, selectedDate) => {
    setShowToPicker(false);
    if (selectedDate) {
      // Ensure selected date is after fromDate
      if (selectedDate > fromDate) {
        setToDate(selectedDate);
      } else {
        Alert.alert(
          "Invalid Date",
          "Check-out date must be after check-in date"
        );
      }
    }
  };
  return (
    <View style={styles.container}>
      {/* Only show fromDestination input when activeTab is "flights" */}
      {activeTab === "flights" && (
        <View style={styles.infoRow}>
          <Text style={styles.label}>From</Text>
          <TextInput
            style={styles.input}
            value={fromDestination}
            onChangeText={setFromDestination}
            placeholder="Departure city"
            placeholderTextColor={Theme.colors.gray}
          />
        </View>
      )}

      <View style={styles.infoRow}>
        <Text style={styles.label}>
          {activeTab === "flights" ? "To" : "Destination"}
        </Text>
        <TextInput
          style={styles.input}
          value={destination}
          onChangeText={setDestination}
          placeholder="Where to?"
          placeholderTextColor={Theme.colors.gray}
        />
      </View>

      <View style={styles.dateContainer}>
        <View style={styles.dateInput}>
          <Text style={styles.label}>From</Text>
          <Pressable onPress={() => setShowFromPicker(true)}>
            <View style={styles.input}>
              <Text style={[styles.inputText, !fromDate && styles.placeholder]}>
                {fromDate ? formatDate(fromDate) : "Select date"}
              </Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.dateInput}>
          <Text style={styles.label}>To</Text>
          <Pressable onPress={() => setShowToPicker(true)}>
            <View style={styles.input}>
              <Text style={[styles.inputText, !toDate && styles.placeholder]}>
                {toDate ? formatDate(toDate) : "Select date"}
              </Text>
            </View>
          </Pressable>
        </View>
      </View>

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      {showFromPicker && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={showFromPicker}
          onRequestClose={() => setShowFromPicker(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setShowFromPicker(false)}
          >
            <View style={styles.modalContent}>
              <DateTimePicker
                value={fromDate}
                mode="date"
                display="inline"
                onChange={handleFromDateChange}
                minimumDate={new Date()}
              />
            </View>
          </Pressable>
        </Modal>
      )}

      {showToPicker && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={showToPicker}
          onRequestClose={() => setShowToPicker(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setShowToPicker(false)}
          >
            <View style={styles.modalContent}>
              <DateTimePicker
                value={toDate}
                mode="date"
                display="inline"
                onChange={handleToDateChange}
                minimumDate={fromDate}
              />
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.white,
    padding: Theme.sizes.spacingMedium,
    gap: Theme.sizes.spacingMedium,
    marginBottom: Theme.sizes.spacingMedium, // Add margin at bottom of search container
  },
  searchButton: {
    backgroundColor: Theme.colors.blue,
    padding: Theme.sizes.spacingSmall, // Reduced padding
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    height: 40, // Reduced height from 56 to 40
    shadowColor: Theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchButtonText: {
    color: Theme.colors.white,
    fontSize: Theme.sizes.textMedium, // Reduced font size to match smaller height
    fontWeight: "600",
    letterSpacing: 0.5,
    fontFamily: "Avenir",
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
    fontFamily: "Avenir",
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
});
