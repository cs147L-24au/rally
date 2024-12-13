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
import db from "@/database/db";

import Theme from "@/assets/theme";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async () => {
    setLoading(true);
    try {
      const { data, error } = await db.auth.signInWithPassword({
        email: email,
        password: password,
        options: {
          shouldCreateUser: false,
        },
      });

      if (error) {
        Alert.alert(error.message);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const isSignInDisabled =
    loading || email.length === 0 || password.length === 0;

  return (
    <LinearGradient
    colors={[Theme.colors.blue, Theme.colors.lightestBlue]} 
    style={styles.container}>
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* Header Section */}
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
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="email@address.com"
        placeholderTextColor={Theme.colors.textSecondary}
        autoCapitalize={"none"}
        style={styles.input}
      />
      <TextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Password"
        placeholderTextColor={Theme.colors.textSecondary}
        secureTextEntry={true}
        autoCapitalize={"none"}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => signInWithEmail()}
          disabled={isSignInDisabled}
        >
          <Text
            style={[
              styles.button,
              isSignInDisabled ? styles.buttonDisabled : undefined,
            ]}
          >
            Log In
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => {}}>
          <Text style={styles.signUpText}>
            Don't have an account? Sign up here! 
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
    backgroundColor: Theme.colors.backgroundPrimary,
    flex: 1,
  },
  splash: {
    alignItems: "center",
    marginBottom: 12,
  },
  splashText: {
    fontWeight: "bold",
    color: Theme.colors.textPrimary,
    fontSize: 60,
  },
  buttonContainer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  verticallySpaced: {
    marginVertical: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
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
  button: {
    borderColor: Theme.colors.blue,
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 40, 
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    fontFamily: "Avenir",
    color: Theme.colors.blue,
    fontWeight: "600",
    backgroundColor: "transparent", 
    backgroundColor: Theme.colors.white,
    overflow: "hidden",
  },
  buttonDisabled: {
    color: Theme.colors.textSecondary,
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 170,
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
  signUpText: {
    marginTop: 20, 
    fontSize: 16,
    color: Theme.colors.textSecondary, 
    fontFamily: "Avenir", 
    textAlign: "center", 
    textDecorationLine: "underline", 
    fontStyle: "italic", 
  },
});
