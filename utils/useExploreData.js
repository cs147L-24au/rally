import { useState, useEffect } from "react";
import { fetchFlightItems } from "./fetchFlightItems";
import { fetchStayItems } from "./fetchStayItems";
import { fetchActivityItems } from "./fetchActivityItems";

const fetchFunctions = {
  stays: fetchStayItems,
  flights: fetchFlightItems,
  activities: fetchActivityItems,
};

export const useExploreData = (searchParams) => {
  const [activeTab, setActiveTab] = useState("stays");
  const [data, setData] = useState({ stays: [], flights: [], activities: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchParams?.destination) {
      console.log("No destination provided, skipping API call");
      return;
    }

    const fetchData = async () => {
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

    fetchData();
  }, [activeTab, searchParams]);

  return {
    activeTab,
    setActiveTab,
    currentData: data[activeTab] || [],
    isLoading,
    error,
  };
};
