import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Theme from "@/assets/theme";

export default function TripPlanningCard({
  title,
  buttonText,
  description,
  onPress,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.white,
    borderRadius: 25,
    padding: 20,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
    width: 325,
    alignSelf: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Theme.colors.black,
    marginBottom: 2,
    textAlign: "center",
    fontFamily: "Avenir",
    fontStyle: "italic",
  },
  button: {
    backgroundColor: Theme.colors.blue,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginVertical: 9,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Theme.colors.white,
    fontFamily: "Avenir",
  },
  description: {
    fontSize: 14,
    color: Theme.colors.gray,
    textAlign: "center",
  },
});
