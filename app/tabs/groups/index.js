import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Theme from "@/assets/theme";
import Loading from "@/components/Loading";
import useSession from "@/utils/useSession";
import { useState, useEffect } from "react";
import { supabaseActions } from "@/utils/supabase";
import GroupCard from "@/components/group/GroupCard";
import { Platform, ActionSheetIOS } from "react-native";

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

  const navigateToGroupSummary = (groupId) => {
    router.push({
      pathname: "/tabs/groups/groupsummary",
      params: { groupId },
    });
  };

  const renderGroupItem = ({ item }) => {
    // Format dates for display
    const formatDates = () => {
      if (!item.start_date || !item.end_date) return 'Dates TBD';
      const start = new Date(item.start_date).toLocaleDateString();
      const end = new Date(item.end_date).toLocaleDateString();
      return `${start} to ${end}`;
    };

    // Add memberCount to the group object
    const groupWithMemberCount = {
      ...item,
      dates: formatDates(),
      memberCount: item.group_members?.length || 0
    };

    return (
      <GroupCard
        group={groupWithMemberCount}
        onPress={() => navigateToGroupSummary(item.id)}
      />
    );
  };

  const handleAddButtonPress = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Create Group', 'Join Group'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            router.push("/tabs/groups/creategroup");
          } else if (buttonIndex === 2) {
            router.push("/tabs/groups/joingroup");
          }
        }
      );
    } else {
      // For Android and other platforms, show Alert with buttons
      Alert.alert(
        "Group Options",
        "What would you like to do?",
        [
          {
            text: "Create Group",
            onPress: () => router.push("/tabs/groups/creategroup"),
          },
          {
            text: "Join Group",
            onPress: () => router.push("/tabs/groups/joingroup"),
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ],
        { cancelable: true }
      );
    }
  };

  if (!session) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}></View>
      {groups.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyTitle}>
            No trips planned right now!{"\n"}
          </Text>
          <Text style={styles.emptySubtitle}>
            (Come on, go text that group chat.)
          </Text>
        </View>
      ) : (
        <FlatList
          data={groups}
          renderItem={renderGroupItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddButtonPress}
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
    paddingBottom: 80,
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
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 24,
    color: Theme.colors.textPrimary,
    textAlign: "center",
    fontFamily: "Avenir",
    lineHeight: 32,
  },
  emptySubtitle: {
    fontSize: 16,
    color: Theme.colors.textPrimary,
    textAlign: "center",
    fontFamily: "Avenir",
    lineHeight: 24,
    fontStyle: "italic",
  },
});
