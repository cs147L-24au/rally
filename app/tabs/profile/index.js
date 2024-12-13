import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import Theme from "@/assets/theme";
import Loading from "@/components/Loading";
import db from "@/database/db";
import useSession from "@/utils/useSession";

export default function Profile() {
  const session = useSession();
  const router = useRouter();

  const signOut = async () => {
    try {
      const { error } = await db.auth.signOut();
      if (error) {
        Alert.alert(error.message);
      } else {
        router.navigate("/");
        Alert.alert("Sign out successful.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!session) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={require("@/assets/penguin.png")}
            style={styles.avatar}
          />
          <Text style={styles.greeting}>Hi, Kevina!</Text>
        </View>

        {/* Travel Assistant Card */}
        <TouchableOpacity
          style={styles.assistantCard}
          onPress={() => router.push("/tabs/profile/chatbot")}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Travel Assistant</Text>
            <Text style={styles.cardDescription}>
              Get personalized travel recommendations and advice
            </Text>
          </View>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: Theme.colors.textPrimary,
    fontFamily: "Avenir",
  },
  assistantCard: {
    backgroundColor: Theme.colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Theme.colors.textPrimary,
    marginBottom: 8,
    fontFamily: "Avenir",
  },
  cardDescription: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
    textAlign: "center",
    fontFamily: "Avenir",
  },
  logoutButton: {
    backgroundColor: Theme.colors.blue,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: "auto",
  },
  logoutButtonText: {
    color: Theme.colors.white,
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Avenir",
  },
});
