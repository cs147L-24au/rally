import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Theme from "@/assets/theme";

export default function GroupSummary({ route }) {
  const navigation = useNavigation();

  // TODO: Remove mock data after database is connected
  const mockGroupName = "Afleda"; // Remove
  const groupName = mockGroupName; // Remove
  // UNCOMMENT AFTER DATABASE SET UP: const { groupName } = route.params?.groupName;
  const sections = [
    { title: "Top Stay", screen: "GroupStay" },
    { title: "Top Flight", screen: "GroupFlight" },
    { title: "Top Activities", screen: "GroupActivities" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.groupTitle}>{groupName}</Text>

      {sections.map((section, index) => (
        <TouchableOpacity
          key={index}
          style={styles.section}
          onPress={() => {
            console.log(`Navigating to: ${section.screen} for group: ${groupName}`);
            // navigation.navigate(section.screen, { groupName }); 
            navigation.navigate("suggestionslist");
          }}
        >
          <Text style={styles.sectionTitle}>{section.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  groupTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
});
