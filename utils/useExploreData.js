import { useState, useEffect } from "react";
import { supabaseActions } from "@/utils/supabase";
import { fetchStayItems } from "@/utils/fetchStayItems";
import { fetchFlightItems } from "@/utils/fetchFlightItems";
import { fetchActivityItems } from "@/utils/fetchActivityItems";

export default function useExploreData() {
  const [activeTab, setActiveTab] = useState("stays");
  const [tabData, setTabData] = useState({
    stays: [],
    flights: [],
    activities: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set());

  const checkBookmarkedItems = async () => {
    try {
      const { data: groups } = await supabaseActions.getUserGroups();
      const bookmarkedSet = new Set();

      for (const group of groups) {
        const { data: pinnedItems } = await supabaseActions.getGroupPinnedItems(
          group.id
        );
        pinnedItems.forEach((pinnedItem) => {
          const itemKey = `${pinnedItem.type}-${pinnedItem.item_data.id}`;
          bookmarkedSet.add(itemKey);
        });
      }

      setBookmarkedItems(bookmarkedSet);
    } catch (error) {
      console.error("Error checking bookmarked items:", error);
    }
  };

  useEffect(() => {
    checkBookmarkedItems();
  }, []);

  const handleSearch = async (params) => {
    setIsLoading(true);
    try {
      let results;
      switch (activeTab) {
        case "stays":
          results = await fetchStayItems(params);
          break;
        case "flights":
          results = await fetchFlightItems(params);
          break;
        case "activities":
          results = await fetchActivityItems(params);
          break;
        default:
          results = [];
      }
      setTabData((prev) => ({
        ...prev,
        [activeTab]: results,
      }));
    } catch (error) {
      console.error("Search error:", error);
      setTabData((prev) => ({
        ...prev,
        [activeTab]: [],
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    activeTab,
    setActiveTab,
    currentData: tabData[activeTab] || [],
    isLoading,
    handleSearch,
    bookmarkedItems,
    setBookmarkedItems,
  };
}
