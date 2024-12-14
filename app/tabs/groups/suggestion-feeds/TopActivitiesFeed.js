import { useEffect, useState } from "react";
import { StyleSheet, FlatList, RefreshControl, View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

import Theme from "@/assets/theme";
import Post from "@/components/Suggestion";
import Loading from "@/components/Loading";
import { supabaseActions } from "@/utils/supabase";
import timeAgo from "@/utils/timeAgo";

export default function TopActivitiesFeed() {
  const [activities, setActivities] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { groupId } = useLocalSearchParams();

  const fetchActivities = async () => {
    setIsLoading(true);
    try {
      const { data: pinnedItems, error } = await supabaseActions.getGroupPinnedItems(groupId);
      
      if (error) throw error;

      const activityItems = pinnedItems
        .filter(item => item.type === 'activity')
        .map(activity => ({
          id: activity.id,
          username: activity.created_by,
          timestamp: timeAgo(activity.created_at),
          text: activity.item_data.title,
          score: 0,
          vote: 0,
          commentCount: 0,
          details: activity.item_data.details,
          image: activity.item_data.image,
          cost: activity.item_data.cost
        }));

      setActivities(activityItems);
    } catch (err) {
      console.error("Error fetching activities:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (groupId) {
      fetchActivities();
    }
  }, [groupId]);

  if (isLoading && !isRefreshing) {
    return <Loading />;
  }

  if (!activities || activities.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No activities have been added yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={activities}
        renderItem={({ item }) => (
          <Post
            shouldNavigateOnPress={true}
            id={item.id}
            username={item.username}
            timestamp={item.timestamp}
            text={item.text}
            score={item.score}
            vote={item.vote}
            commentCount={item.commentCount}
            details={item.details}
            image={item.image}
            cost={item.cost}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.activitiesContainer}
        style={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              setIsRefreshing(true);
              fetchActivities();
            }}
            tintColor={Theme.colors.textPrimary}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  activitiesContainer: {
    width: "100%",
  },
  list: {
    gap: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Theme.colors.textSecondary,
  },
});