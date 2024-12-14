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
    if (activeTab === "flights") {
      if (!fromDestination.trim()) {
        Alert.alert("Missing Information", "Please enter a departure city");
        return false;
      }
    }

    if (!destination.trim()) {
      Alert.alert("Missing Information", "Please enter a destination");
      return false;
    }

    if (!fromDate || !toDate) {
      Alert.alert("Missing Information", "Please select both dates");
      return false;
    }

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
    if (!validateInputs()) return;

    const formatLocalDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const searchData = {
      fromDestination: activeTab === "flights" ? fromDestination.trim() : null,
      destination: destination.trim(),
      fromDate: formatLocalDate(fromDate),
      toDate: formatLocalDate(toDate),
    };

    onSearch(searchData);
  };

  const handleFromDateChange = (event, selectedDate) => {
    setShowFromPicker(false);
    if (!selectedDate) return;

    setFromDate(selectedDate);
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);

    if (!toDate || toDate <= selectedDate) {
      setToDate(nextDay);
    }
  };

  const handleToDateChange = (event, selectedDate) => {
    setShowToPicker(false);
    if (!selectedDate) return;

    if (selectedDate > fromDate) {
      setToDate(selectedDate);
    } else {
      Alert.alert("Invalid Date", "Check-out date must be after check-in date");
    }
  };

  const renderDatePicker = (show, date, onChange) =>
    show && (
      <Modal transparent animationType="fade" visible={show}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => onChange(null, null)}
        >
          <View style={styles.modalContent}>
            <DateTimePicker
              value={date}
              mode="date"
              display="inline"
              onChange={onChange}
              minimumDate={date === fromDate ? new Date() : fromDate}
            />
          </View>
        </Pressable>
      </Modal>
    );

  return (
    <View style={styles.container}>
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
        {["From", "To"].map((label, index) => (
          <View key={label} style={styles.dateInput}>
            <Text style={styles.label}>{label}</Text>
            <Pressable
              onPress={() =>
                index === 0 ? setShowFromPicker(true) : setShowToPicker(true)
              }
            >
              <View style={styles.input}>
                <Text
                  style={[
                    styles.inputText,
                    !(index === 0 ? fromDate : toDate) && styles.placeholder,
                  ]}
                >
                  {index === 0
                    ? fromDate
                      ? formatDate(fromDate)
                      : "Select date"
                    : toDate
                    ? formatDate(toDate)
                    : "Select date"}
                </Text>
              </View>
            </Pressable>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      {renderDatePicker(showFromPicker, fromDate, handleFromDateChange)}
      {renderDatePicker(showToPicker, toDate, handleToDateChange)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.white,
    padding: Theme.sizes.spacingMedium,
    gap: Theme.sizes.spacingMedium,
    marginBottom: Theme.sizes.spacingMedium,
  },
  searchButton: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    backgroundColor: Theme.colors.blue,
    borderColor: Theme.colors.blue,
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Theme.colors.white,
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
