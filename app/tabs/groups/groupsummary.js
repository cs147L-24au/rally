import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import Theme from "@/assets/theme";
import TopStayCard from "@/components/group/TopStayCard";
import TopFlightCard from "@/components/group/TopFlightCard";
import TopActivityCard from "@/components/group/TopActivityCard";
import GroupInfoCard from "@/components/group/GroupInfoCard";
import { supabaseActions } from "@/utils/supabase";
import Loading from "@/components/Loading";

export default function GroupSummary() {
  const { groupId } = useLocalSearchParams();
  const [groupData, setGroupData] = useState(null);
  // Change initial state to singular
  const [pinnedItems, setPinnedItems] = useState({
    stay: [],
    flight: [],
    activity: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const { data, error } = await supabaseActions.getGroupDetails(groupId);
        if (error) throw error;
        setGroupData(data);

        const { data: pinnedData, error: pinnedError } =
          await supabaseActions.getGroupPinnedItems(groupId);
        if (pinnedError) throw pinnedError;

        // Organize pinned items by type (using singular form)
        const organized = pinnedData.reduce(
          (acc, item) => {
            const type = item.type || "stay"; // Get the type from the item
            if (!acc[type]) {
              acc[type] = [];
            }
            acc[type].push(item);
            return acc;
          },
          {
            stay: [],
            flight: [],
            activity: [],
          }
        );

        console.log("Organized pinned items:", organized); // For debugging
        setPinnedItems(organized);
      } catch (error) {
        console.error("Error fetching group data:", error);
        Alert.alert("Error", "Failed to load group data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroupData();
  }, [groupId]);

  if (isLoading) {
    return <Loading />;
  }

  if (!groupData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Group not found</Text>
      </SafeAreaView>
    );
  }

  const formatDates = () => {
    if (!groupData.start_date || !groupData.end_date) return "Dates not set";
    const start = new Date(groupData.start_date).toLocaleDateString();
    const end = new Date(groupData.end_date).toLocaleDateString();
    return `${start} to ${end}`;
  };

  const getTopItem = (type) => {
    console.log("Getting top item for type:", type, pinnedItems[type]);
    if (!pinnedItems[type] || pinnedItems[type].length === 0) return null;
    return pinnedItems[type];
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <GroupInfoCard
          name={groupData.name}
          dates={formatDates()}
          destination={groupData.destination}
          joinCode={groupData.join_code}
        />

        <TopStayCard
          stay={getTopItem("stay")}
          onPress={() => {
            /* Navigate to stay details */
          }}
        />

        <TopFlightCard
          flight={getTopItem("flight")}
          onPress={() => {
            /* Navigate to flight details */
          }}
        />

        <TopActivityCard
          activity={getTopItem("activity")}
          onPress={() => {
            /* Navigate to activity details */
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  headerGradient: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  groupName: {
    fontSize: 28,
    fontWeight: "600",
    color: Theme.colors.white,
    textAlign: "center",
    fontFamily: "Avenir",
  },
  errorText: {
    fontSize: 16,
    color: Theme.colors.textPrimary,
    textAlign: "center",
    marginTop: 20,
  },
});
