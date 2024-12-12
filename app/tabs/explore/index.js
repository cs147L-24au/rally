import React from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import ExploreSearch from "@/components/ExploreSearch";
import ExploreItem from "@/components/ExploreItem";
import { useExploreData } from "@/utils/useExploreData";
import Theme from "@/assets/theme";

export default function Explore() {
  const { activeTab, setActiveTab, currentData } = useExploreData();

  const renderItem = ({ item }) => (
    <ExploreItem
      title={item.title}
      image={item.image}
      source={item.source}
      cost={item.cost}
      onPress={() => {
        console.log("Learn more about:", item.title);
      }}
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
      <ExploreSearch />
      <View style={styles.buttonContainer}>
        <TabButton title="Stays" tabKey="stays" />
        <TabButton title="Flights" tabKey="flights" />
        <TabButton title="Activities" tabKey="activities" />
      </View>
      <FlatList
        key={activeTab}
        data={currentData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
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
});
