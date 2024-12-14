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
import { useState, useEffect } from "react";
import Theme from "@/assets/theme";
import Loading from "@/components/Loading";
import db from "@/database/db";
import useSession from "@/utils/useSession";
import { supabaseActions } from "@/utils/supabase";
import TripPlanningCard from "@/components/TripPlanningCard";
import TripSummaryCard from "@/components/TripSummary";

export default function Profile() {
  const session = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await supabaseActions.getCurrentProfile();
        setProfile(profileData);
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };

    if (session) {
      loadProfile();
    }
  }, [session]);

  const signOut = async () => {
    try {
      await supabaseActions.signOut();
      router.navigate("/");
      Alert.alert("Sign out successful.");
    } catch (err) {
      console.error(err);
      Alert.alert("Error signing out");
    }
  };

  if (!session || !profile) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <Image
            source={require("@/assets/penguin.png")}
            style={styles.avatar}
          />
          <Text style={styles.greeting}>
            Hi, {profile.full_name.split(" ")[0]}!
          </Text>
        </View>
  

        <TripPlanningCard
            title="Need some trip advice?"
            buttonText="Chat with Evelyn"
            description="Our AI chatbot assistant to give you more personalized recommendations"
            onPress={() => router.push("/tabs/profile/chatbot")}
          />
        <TripSummaryCard
            title="Our Trip Recommendation"
            summaryText="Amsterdam is the spot right now..."
            imageSource={require("@/assets/amsterdam.jpg")}
            stats={[
              { number: 125, label: "users went in the last month!" },
            ]}
          />
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
    flexDirection: "row",
    alignItems: "center", 
    marginBottom: 10,
    alignSelf: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 60,
    marginRight: 12, 
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: Theme.colors.textPrimary,
    fontFamily: "Avenir",
  },
  logoutButton: {
    alignSelf: "center",
    backgroundColor: Theme.colors.blue,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginVertical: 9,
    alignItems: "center",
    width: "50%",
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Theme.colors.white,
    fontFamily: "Avenir",
  },
});

