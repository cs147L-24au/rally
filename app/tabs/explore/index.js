import React from "react";
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
  const { activeTab, setActiveTab, currentData, isLoading, handleSearch } =
    useExploreData();

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };

  const handleSearchSubmit = (params) => {
    handleSearch(params);
  };

  const TabButton = ({ title, tabKey }) => {
    const isActive = activeTab === tabKey;
    return (
      <TouchableOpacity
        style={[styles.button, isActive && styles.activeButton]}
        onPress={() => handleTabChange(tabKey)}
      >
        <Text style={[styles.buttonText, isActive && styles.activeButtonText]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => (
    <ExploreItem
      title={item.title}
      image={item.image}
      source={item.source}
      cost={item.cost}
      details={item.details}
      item={item}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ExploreSearch onSearch={handleSearchSubmit} activeTab={activeTab} />
      <View style={styles.buttonContainer}>
        <TabButton title="Stays" tabKey="stays" />
        <TabButton title="Flights" tabKey="flights" />
        <TabButton title="Activities" tabKey="activities" />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={Theme.colors.blue} />
      ) : (
        <FlatList
          data={currentData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No {activeTab} found</Text>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Theme.sizes.spacingSmall,
    paddingHorizontal: Theme.sizes.spacingMedium,
    marginBottom: Theme.sizes.spacingMedium,
    marginVertical: 3,
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
    backgroundColor: Theme.colors.lightBlueHeader,
  },
  buttonText: {
    color: Theme.colors.blue,
    fontWeight: "500",
  },
  activeButtonText: {
    color: Theme.colors.white,
  },
  listContent: {
    paddingBottom: Theme.sizes.spacingLarge,
  },
  emptyText: {
    fontFamily: "Avenir",
    fontWeight: "bold",
    fontSize: 20,
    color: Theme.colors.gray,
    textAlign: "center",
  },
});
