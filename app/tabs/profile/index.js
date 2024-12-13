import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Alert,
  Image
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
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={require("@/assets/penguin.png")}
          style={styles.avatar}
        />
        <Text style={styles.greeting}>Hi, Kevina!</Text>
      </View>
      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    justifyContent: "space-between", 
  },
  profileHeader: {
    flexDirection: "row", 
    alignItems: "center", 
    marginTop: 20, 
    marginLeft: 16, 
  },
  avatar: {
    width: 60, 
    height: 60,
    borderRadius: 35,
    marginRight: 12, 
  },
  greeting: {
    fontSize: 28, 
    fontWeight: "bold",
    color: Theme.colors.blue, 
    fontFamily: "Avenir",
  },
  logoutButton: {
    backgroundColor: Theme.colors.blue,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10, 
    alignSelf: "flex-end", 
    marginRight: 16, 
    marginBottom: 16, 
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
