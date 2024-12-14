import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Theme from "@/assets/theme";

const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function CreateGroup() {
  const router = useRouter();
  const [groupName, setGroupName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [destination, setDestination] = useState("");
  const [people, setPeople] = useState([{ name: "", email: "" }]);

  const handlePersonChange = (index, field, value) => {
    const newPeople = [...people];
    newPeople[index][field] = value;
    setPeople(newPeople);
  };

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartPicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);

      // If endDate is less than or equal to the new startDate,
      // set endDate to the day after startDate
      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);

      if (!endDate || endDate <= selectedDate) {
        setEndDate(nextDay);
      }
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndPicker(false);
    if (selectedDate) {
      if (selectedDate > startDate) {
        setEndDate(selectedDate);
      } else {
        Alert.alert("Invalid Date", "End date must be after start date");
      }
    }
  };

  const handleSubmit = async () => {
    try {
      await supabaseActions.createGroup(
        groupName,
        startDate,
        endDate,
        destination
      );
      router.push("/tabs/groups/create-group-transition");
    } catch (error) {
      Alert.alert("Error", "Failed to create group. Please try again.");
      console.error(error);
    }
  };

  const addPerson = () => {
    setPeople([...people, { name: "", email: "" }]);
  };

  const removePerson = (index) => {
    const newPeople = [...people];
    newPeople.splice(index, 1);
    setPeople(newPeople);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Theme.colors.background }}>
      <ScrollView style={styles.container}>
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Group Name</Text>
          <TextInput
            style={styles.input}
            value={groupName}
            onChangeText={setGroupName}
            placeholder="Enter group name"
          />

          <Text style={styles.sectionTitle}>Dates</Text>
          <Text style={styles.label}>Start Date</Text>
          <Pressable onPress={() => setShowStartPicker(true)}>
            <View style={styles.input}>
              <Text style={styles.dateText}>{formatDate(startDate)}</Text>
            </View>
          </Pressable>

          <Text style={styles.label}>End Date</Text>
          <Pressable onPress={() => setShowEndPicker(true)}>
            <View style={styles.input}>
              <Text style={styles.dateText}>{formatDate(endDate)}</Text>
            </View>
          </Pressable>

          <Text style={styles.sectionTitle}>Destination</Text>
          <TextInput
            style={styles.input}
            value={destination}
            onChangeText={setDestination}
            placeholder="Enter destination"
          />
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>People</Text>
            <View style={styles.headerButtons}>
              {people.length > 1 && (
                <TouchableOpacity
                  style={styles.headerButton}
                  onPress={() => removePerson(people.length - 1)}
                >
                  <Text style={styles.headerButtonText}>-</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.headerButton} onPress={addPerson}>
                <Text style={styles.headerButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.peopleSection}>
            <View style={styles.peopleHeader}>
              <Text style={styles.columnHeader}>Name</Text>
              <Text style={styles.columnHeader}>Email</Text>
            </View>
            {people.map((person, index) => (
              <View key={index} style={styles.personRow}>
                <TextInput
                  style={[styles.input, styles.nameInput]}
                  value={person.name}
                  onChangeText={(value) =>
                    handlePersonChange(index, "name", value)
                  }
                  placeholder="Name"
                />
                <TextInput
                  style={[styles.input, styles.emailInput]}
                  value={person.email}
                  onChangeText={(value) =>
                    handlePersonChange(index, "email", value)
                  }
                  placeholder="Email"
                  keyboardType="email-address"
                />
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>

          {showStartPicker && (
            <Modal
              transparent={true}
              animationType="fade"
              visible={showStartPicker}
              onRequestClose={() => setShowStartPicker(false)}
            >
              <Pressable
                style={styles.modalOverlay}
                onPress={() => setShowStartPicker(false)}
              >
                <View style={styles.modalContent}>
                  <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="inline"
                    onChange={handleStartDateChange}
                    minimumDate={new Date()}
                  />
                </View>
              </Pressable>
            </Modal>
          )}

          {showEndPicker && (
            <Modal
              transparent={true}
              animationType="fade"
              visible={showEndPicker}
              onRequestClose={() => setShowEndPicker(false)}
            >
              <Pressable
                style={styles.modalOverlay}
                onPress={() => setShowEndPicker(false)}
              >
                <View style={styles.modalContent}>
                  <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="inline"
                    onChange={handleEndDateChange}
                    minimumDate={startDate}
                  />
                </View>
              </Pressable>
            </Modal>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  formCard: {
    backgroundColor: Theme.colors.white,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Theme.colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
    marginBottom: 4,
  },
  input: {
    backgroundColor: Theme.colors.lightestBlue,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  peopleSection: {
    marginTop: 8,
  },
  peopleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  columnHeader: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
    flex: 1,
  },
  personRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  nameInput: {
    flex: 1,
  },
  emailInput: {
    flex: 1.5,
  },
  submitButton: {
    backgroundColor: Theme.colors.blue,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  submitButtonText: {
    color: Theme.colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  headerButtons: {
    flexDirection: "row",
    gap: 8,
  },
  headerButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Theme.colors.lightestBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  headerButtonText: {
    fontSize: 20,
    color: Theme.colors.blue,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Theme.colors.white,
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  dateText: {
    fontSize: 16,
    color: Theme.colors.textPrimary,
  },
});
