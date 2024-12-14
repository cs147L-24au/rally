import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Theme from "@/assets/theme";
import db from "@/database/db";
import { supabaseActions } from "@/utils/supabase";

export default function Signup() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUpWithEmail = async () => {
    setLoading(true);
    try {
      // Create auth user
      const { data, error } = await db.auth.signUp({
        email: email,
        password: password,
      });

      if (error) throw error;

      // Create profile
      const { error: profileError } = await supabaseActions.createProfile(
        data.user.id,
        email.split("@")[0], // Using email prefix as username
        `${firstName} ${lastName}`
      );

      if (profileError) throw profileError;

      Alert.alert("Success", "Account created successfully!", [
        { text: "OK", onPress: () => router.push("/") },
      ]);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const isSignUpDisabled =
    loading ||
    email.length === 0 ||
    password.length === 0 ||
    firstName.length === 0 ||
    lastName.length === 0;

  return (
    <LinearGradient
      colors={[Theme.colors.blue, Theme.colors.lightestBlue]}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create Account</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={[styles.button, isSignUpDisabled && styles.buttonDisabled]}
          onPress={signUpWithEmail}
          disabled={isSignUpDisabled}
        >
          <Text style={styles.buttonText}>
            {loading ? "Creating Account..." : "Sign Up"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => router.push("/")}
        >
          <Text style={styles.linkText}>
            Already have an account? Sign in here!
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Theme.colors.white,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: Theme.colors.white,
    padding: 15,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: Theme.colors.blue,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: Theme.colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  linkButton: {
    marginTop: 15,
    alignItems: "center",
  },
  linkText: {
    color: Theme.colors.white,
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
