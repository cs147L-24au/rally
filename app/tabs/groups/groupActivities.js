import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, SafeAreaView, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import ExploreItem from "@/components/ExploreItem";
import Theme from "@/assets/theme";
import { supabaseActions } from "@/utils/supabase";
import Loading from "@/components/Loading";

export default function GroupActivities() {
  const { groupId } = useLocalSearchParams();
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const { data, error } = await supabaseActions.getGroupPinnedItems(
        groupId
      );
      if (error) throw error;
      setActivities(data.filter((item) => item.type === "activity"));
    } catch (error) {
      console.error("Error fetching activities:", error);
      Alert.alert("Error", "Failed to load activities");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={activities}
        renderItem={({ item }) => (
          <ExploreItem
            title={item.item_data.title}
            image={item.item_data.image}
            source={item.item_data.source}
            cost={item.item_data.cost}
            item={item.item_data}
            isBookmarked={true}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  listContainer: {
    padding: 16,
  },
});
