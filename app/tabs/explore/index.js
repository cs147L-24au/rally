import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";

import ExploreSearch from "@/components/ExploreSearch";
import ExploreItem from "@/components/ExploreItem";
import { useExploreData } from "@/utils/useExploreData";
import Theme from "@/assets/theme";

export default function Explore() {
  const [searchParams, setSearchParams] = useState({
    fromDestination: "",
    destination: "",
    fromDate: null,
    toDate: null,
    group: "",
  });

  const { activeTab, setActiveTab, currentData, isLoading, error } =
    useExploreData(searchParams);

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  const renderItem = ({ item }) => (
    <ExploreItem
      title={item.title}
      image={item.image}
      source={item.source}
      cost={item.cost}
      details={item.details}
      item={item} // Pass the full item
    />
  );

  const TabButton = ({ title, tabKey }) => {
    const isActive = activeTab === tabKey;
    return (
      <TouchableOpacity
        style={[styles.button, isActive && styles.activeButton]}
        onPress={() => setActiveTab(tabKey)}
      >
        <Text style={[styles.buttonText, isActive && styles.activeButtonText]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ExploreSearch onSearch={handleSearch} />
      <View style={styles.buttonContainer}>
        <TabButton title="Stays" tabKey="stays" />
        <TabButton title="Flights" tabKey="flights" />
        <TabButton title="Activities" tabKey="activities" />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={Theme.colors.blue} />
      ) : (
        <FlatList
          key={activeTab}
          data={currentData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No {activeTab} found</Text> // TODO: STYLE THIS
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  listContent: {
    paddingBottom: Theme.sizes.spacingLarge,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Theme.sizes.spacingSmall,
    paddingHorizontal: Theme.sizes.spacingMedium,
    marginBottom: Theme.sizes.spacingMedium,
  },
  button: {
    flex: 1,
    paddingVertical: Theme.sizes.spacingSmall,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Theme.colors.blue,
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: Theme.colors.blue,
  },
  buttonText: {
    color: Theme.colors.blue,
    fontWeight: "500",
  },
  activeButtonText: {
    color: Theme.colors.white,
  },
  errorText: {
    color: Theme.colors.coral,
    textAlign: "center",
    margin: Theme.sizes.spacingMedium,
  },
});
