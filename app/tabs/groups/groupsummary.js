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
import { LinearGradient } from "expo-linear-gradient";
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
  const [pinnedItems, setPinnedItems] = useState({
    stays: [],
    flights: [],
    activities: [],
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

        // Organize pinned items by type
        const organized = pinnedData.reduce(
          (acc, item) => {
            acc[item.type] = [...(acc[item.type] || []), item];
            return acc;
          },
          {
            stays: [],
            flights: [],
            activities: [],
          }
        );

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
    if (!pinnedItems[type] || pinnedItems[type].length === 0) return null;
    // For now, just return the first pinned item of each type
    return pinnedItems[type][0].item_data;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <LinearGradient
          colors={[Theme.colors.lightBlueHeader, Theme.colors.white]}
          style={styles.headerGradient}
        >
          <Text style={styles.groupName}>{groupData.name}</Text>
        </LinearGradient>

        <GroupInfoCard
          dates={formatDates()}
          destination={groupData.destination}
          joinCode={groupData.join_code}
        />

        <TopStayCard
          stay={getTopItem("stays")}
          onPress={() => {
            /* Navigate to stay details */
          }}
        />

        <TopFlightCard
          flight={getTopItem("flights")}
          onPress={() => {
            /* Navigate to flight details */
          }}
        />

        <TopActivityCard
          activity={getTopItem("activities")}
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
