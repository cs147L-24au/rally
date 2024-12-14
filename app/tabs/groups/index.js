import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import Theme from "@/assets/theme";
import Loading from "@/components/Loading";
import useSession from "@/utils/useSession";
import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { supabaseActions } from "@/utils/supabase";

export default function Groups() {
  const session = useSession();
  const router = useRouter();
  const [groups, setGroups] = useState([]);

  const fetchGroups = async () => {
    try {
      const { data, error } = await supabaseActions.getUserGroups();
      if (error) throw error;
      setGroups(data || []);
    } catch (error) {
      console.error("Error fetching groups:", error);
      Alert.alert("Error", "Failed to fetch groups");
    }
  };

  useEffect(() => {
    if (session) {
      fetchGroups();
    }
  }, [session]);

  // Handle navigation to a group's summary page when clicked
  const navigateToGroupSummary = (groupId) => {
    router.push({
      pathname: "/tabs/groups/groupsummary",
      params: { groupId },
    });
  };

  const renderGroupItem = ({ item }) => (
    <TouchableOpacity
      style={styles.groupItem}
      onPress={() => {
        navigateToGroupSummary(item.id);
      }}
    >
      <Text style={styles.groupName}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (!session) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}></View>
      <FlatList
        data={groups}
        renderItem={renderGroupItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/tabs/groups/creategroup")}
      >
        <MaterialCommunityIcons name="plus" size={35} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  listContainer: {
    padding: 16,
  },
  groupItem: {
    backgroundColor: Theme.colors.backgroundSecondary,
    padding: 20,
    borderRadius: 10,
    marginBottom: 12,
  },
  groupName: {
    color: Theme.colors.textPrimary,
    fontSize: Theme.sizes.textMedium,
    fontWeight: "bold",
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: "#64B5F6",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  headerText: {
    fontSize: Theme.sizes.textLarge,
    fontWeight: "bold",
    color: Theme.colors.textPrimary,
  },
});
