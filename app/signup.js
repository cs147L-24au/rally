import { useState } from "react";
import {
  Text,
  Alert,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import db from "@/database/db";
import Theme from "@/assets/theme";

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
      const { data, error } = await db.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert(
          "Success",
          "Account created successfully!",
          [{ text: "OK", onPress: () => router.push("/") }]
        );
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "An unexpected error occurred");
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
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.header}>
          <MaterialCommunityIcons
            size={55}
            name="airplane"
            color={Theme.colors.white}
            style={styles.icon}
          />
          <Text style={styles.headerText}>RALLY</Text>
        </View>

        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First Name"
          placeholderTextColor={Theme.colors.textSecondary}
          autoCapitalize="words"
        />

        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last Name"
          placeholderTextColor={Theme.colors.textSecondary}
          autoCapitalize="words"
        />

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="email@address.com"
          placeholderTextColor={Theme.colors.textSecondary}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor={Theme.colors.textSecondary}
          secureTextEntry={true}
          autoCapitalize="none"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={signUpWithEmail}
            disabled={isSignUpDisabled}
          >
            <Text
              style={[
                styles.button,
                isSignUpDisabled ? styles.buttonDisabled : undefined,
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push("/")}>
          <Text style={styles.loginText}>
            Already have an account? Log in here!
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    padding: 12,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
  },
  icon: {
    marginRight: 8,
  },
  headerText: {
    fontSize: 55,
    fontWeight: "bold",
    color: Theme.colors.white,
    fontFamily: "Avenir",
  },
  input: {
    backgroundColor: Theme.colors.white,
    color: Theme.colors.textPrimary,
    width: "90%",
    padding: 13,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 14,
    fontFamily: "Avenir",
    borderWidth: 1,
    borderColor: Theme.colors.borderGray,
    alignSelf: "center",
  },
  buttonContainer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    borderColor: Theme.colors.blue,
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    fontSize: 18,
    fontFamily: "Avenir",
    color: Theme.colors.blue,
    fontWeight: "600",
    backgroundColor: Theme.colors.white,
    overflow: "hidden",
  },
  buttonDisabled: {
    color: Theme.colors.textSecondary,
    borderRadius: 10,
  },
  loginText: {
    marginTop: 20,
    fontSize: 16,
    color: Theme.colors.textSecondary,
    fontFamily: "Avenir",
    textAlign: "center",
    textDecorationLine: "underline",
    fontStyle: "italic",
  },
});