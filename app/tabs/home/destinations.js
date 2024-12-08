import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import Theme from "@/assets/theme";

export default function Destinations() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Theme.colors.background }}>
      <View style={styles.container}>
        <Text style={styles.title}>Explore Destinations</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Theme.colors.textPrimary,
    marginBottom: 16,
  },
});
