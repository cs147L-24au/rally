import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, SafeAreaView, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import GroupItem from "@/components/GroupItem";
import Theme from "@/assets/theme";
import { supabaseActions } from "@/utils/supabase";
import Loading from "@/components/Loading";

export default function GroupFlights() {
  const { groupId } = useLocalSearchParams();
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const { data, error } = await supabaseActions.getGroupPinnedItems(
        groupId
      );
      if (error) throw error;
      setFlights(data.filter((item) => item.type === "flight"));
    } catch (error) {
      console.error("Error fetching flights:", error);
      Alert.alert("Error", "Failed to load flights");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={flights}
        renderItem={({ item }) => (
          <GroupItem
            title={item.item_data.title}
            image={item.item_data.image}
            source={item.item_data.source}
            cost={item.item_data.cost}
            item={{
              ...item.item_data,
              type: item.type,
              id: item.id,
            }}
            isBookmarked={true}
            groupId={groupId}
            onDelete={fetchFlights}
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
