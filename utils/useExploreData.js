import { useState } from "react";
import { fetchFlightItems } from "./fetchFlightItems";
import { fetchStayItems } from "./fetchStayItems";
import { fetchActivityItems } from "./fetchActivityItems";

const fetchFunctions = {
  stays: fetchStayItems,
  flights: fetchFlightItems,
  activities: fetchActivityItems,
};

export const useExploreData = () => {
  const [activeTab, setActiveTab] = useState("stays");
  const [tabData, setTabData] = useState({
    stays: [],
    flights: [],
    activities: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchParams) => {
    if (!searchParams?.destination) return;

    setIsLoading(true);

    try {
      const fetchFunction = fetchFunctions[activeTab];
      const transformedData = await fetchFunction(searchParams);

      setTabData((prev) => ({
        ...prev,
        [activeTab]: transformedData || [],
      }));
    } catch (err) {
      console.error(`Error fetching ${activeTab} data:`, err);
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
    currentData: tabData[activeTab],
    isLoading,
    handleSearch,
  };
};
