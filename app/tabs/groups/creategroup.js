import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import Theme from "@/assets/theme";

export default function CreateGroup() {
  const router = useRouter();
  const [groupName, setGroupName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [destination, setDestination] = useState("");
  const [people, setPeople] = useState([
    { name: "", email: "" }
  ]);

  const handlePersonChange = (index, field, value) => {
    const newPeople = [...people];
    newPeople[index][field] = value;
    setPeople(newPeople);
  };

  const handleSubmit = () => {
    // TODO: Validate and save form data
    router.push("/tabs/groups/create-group-transition");
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
          <TextInput
            style={styles.input}
            value={startDate}
            onChangeText={setStartDate}
            placeholder="MM/DD/YYYY"
          />

          <Text style={styles.label}>End Date</Text>
          <TextInput
            style={styles.input}
            value={endDate}
            onChangeText={setEndDate}
            placeholder="MM/DD/YYYY"
          />

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
              <TouchableOpacity style={styles.headerButton} onPress={addPerson}>
                <Text style={styles.headerButtonText}>+</Text>
              </TouchableOpacity>
              {people.length > 1 && (
                <TouchableOpacity 
                  style={styles.headerButton} 
                  onPress={() => removePerson(people.length - 1)}
                >
                  <Text style={styles.headerButtonText}>-</Text>
                </TouchableOpacity>
              )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Theme.colors.lightestBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonText: {
    fontSize: 20,
    color: Theme.colors.blue,
    fontWeight: '600',
  },
});
