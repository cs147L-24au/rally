import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import Theme from "@/assets/theme";
import { supabaseActions } from "@/utils/supabase";

export default function JoinGroup() {
  const router = useRouter();
  const [joinCode, setJoinCode] = useState("");

  const handleSubmit = async () => {
    if (!joinCode) {
      Alert.alert("Error", "Please enter a join code");
      return;
    }

    try {
      const { error } = await supabaseActions.joinGroup(joinCode);
      if (error) throw error;
      router.push("/tabs/groups/create-group-transition");
    } catch (error) {
      Alert.alert("Error", "Invalid join code. Please try again.");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Theme.colors.background }}>
      <View style={styles.container}>
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Enter Join Code</Text>
          <Text style={styles.label}>
            Ask your friend for the 6-character code
          </Text>
          <TextInput
            style={styles.input}
            value={joinCode}
            onChangeText={setJoinCode}
            placeholder="Enter code"
            autoCapitalize="characters"
            maxLength={6}
          />

          <TouchableOpacity
            style={[
              styles.submitButton,
              !joinCode && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!joinCode}
          >
            <Text style={styles.submitButtonText}>Join Group</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
    marginBottom: 16,
  },
  input: {
    backgroundColor: Theme.colors.lightestBlue,
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 2,
  },
  submitButton: {
    backgroundColor: Theme.colors.blue,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: Theme.colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
});
