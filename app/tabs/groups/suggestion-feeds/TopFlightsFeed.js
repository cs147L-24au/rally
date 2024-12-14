import { useEffect, useState } from "react";
import { StyleSheet, FlatList, RefreshControl, View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

import Theme from "@/assets/theme";
import Post from "@/components/Suggestion";
import Loading from "@/components/Loading";
import { supabaseActions } from "@/utils/supabase";
import timeAgo from "@/utils/timeAgo";

export default function TopFlightsFeed() {
  const [flights, setFlights] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { groupId } = useLocalSearchParams();

  const fetchFlights = async () => {
    setIsLoading(true);
    try {
      const { data: pinnedItems, error } = await supabaseActions.getGroupPinnedItems(groupId);
      
      if (error) throw error;

      const flightItems = pinnedItems
        .filter(item => item.type === 'flight')
        .map(flight => ({
          id: flight.id,
          username: flight.created_by,
          timestamp: timeAgo(flight.created_at),
          text: flight.item_data.title,
          score: 0,
          vote: 0,
          commentCount: 0,
          details: flight.item_data.details,
          source: flight.item_data.source,
          cost: flight.item_data.cost
        }));

      setFlights(flightItems);
    } catch (err) {
      console.error("Error fetching flights:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (groupId) {
      fetchFlights();
    }
  }, [groupId]);

  if (isLoading && !isRefreshing) {
    return <Loading />;
  }

  if (!flights || flights.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No flights have been added yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={flights}
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
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.posts}
        style={styles.postsContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              setIsRefreshing(true);
              fetchFlights();
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
  postsContainer: {
    width: "100%",
  },
  posts: {
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
