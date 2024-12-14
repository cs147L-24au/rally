import { useEffect, useState } from "react";
import { StyleSheet, FlatList, RefreshControl, View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

import Theme from "@/assets/theme";
import Post from "@/components/Suggestion";
import Loading from "@/components/Loading";
import { supabaseActions } from "@/utils/supabase";
import timeAgo from "@/utils/timeAgo";

export default function TopStaysFeed() {
  const [stays, setStays] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { groupId } = useLocalSearchParams();

  const fetchStays = async () => {
    setIsLoading(true);
    try {
      const { data: pinnedItems, error } = await supabaseActions.getGroupPinnedItems(groupId);
      
      if (error) throw error;

      // Filter only stay items and format them for the Post component
      const stayItems = pinnedItems
        .filter(item => item.type === 'stay')
        .map(stay => ({
          id: stay.id,
          username: stay.created_by,
          timestamp: timeAgo(stay.created_at),
          text: stay.item_data.title,
          score: 0,
          vote: 0,
          commentCount: 0,
          details: stay.item_data.details,
          image: stay.item_data.image,
          cost: stay.item_data.cost
        }));

      setStays(stayItems);
    } catch (err) {
      console.error("Error fetching stays:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (groupId) {
      fetchStays();
    }
  }, [groupId]);

  if (isLoading && !isRefreshing) {
    return <Loading />;
  }

  if (!stays || stays.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No stays have been added yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={stays}
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
            image={item.image}
            cost={item.cost}
            details={item.details}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.staysContainer}
        style={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              setIsRefreshing(true);
              fetchStays();
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
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  list: {
    width: "100%",
  },
  staysContainer: {
    padding: 16,
    gap: 12,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: Theme.colors.textSecondary,
    fontFamily: "Avenir",
    textAlign: "center",
  }
});
