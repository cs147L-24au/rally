import { useState } from "react"; // Remove useEffect
import { fetchFlightItems } from "./fetchFlightItems";
import { fetchStayItems } from "./fetchStayItems";
import { fetchActivityItems } from "./fetchActivityItems";

const fetchFunctions = {
  stays: fetchStayItems,
  flights: fetchFlightItems,
  activities: fetchActivityItems,
};

export const useExploreData = () => {
  // Remove searchParams parameter
  const [activeTab, setActiveTab] = useState("stays");
  const [data, setData] = useState({ stays: [], flights: [], activities: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add new function to handle search
  const handleSearch = async (searchParams) => {
    if (!searchParams?.destination) {
      console.log("No destination provided, skipping API call");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const fetchFunction = fetchFunctions[activeTab];
      const transformedData = await fetchFunction(searchParams);

      setData((prevData) => ({
        ...prevData,
        [activeTab]: transformedData || [],
      }));
    } catch (err) {
      console.error(`Error fetching ${activeTab} data:`, err);
      setError(`Unable to load ${activeTab}. ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    activeTab,
    setActiveTab,
    currentData: data[activeTab] || [],
    isLoading,
    error,
    handleSearch, // Export the new function
  };
};
