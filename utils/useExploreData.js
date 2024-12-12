import { fetchFlightItems } from "./fetchFlightItems";
import { fetchStayItems } from "./fetchStayItems";
import { fetchActivityItems } from "./fetchActivityItems";
import { useState, useEffect } from "react";

export const useExploreData = (searchParams) => {
  const [activeTab, setActiveTab] = useState("stays");
  const [data, setData] = useState({
    stays: [],
    flights: [],
    activities: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);

    if (!searchParams?.destination) {
      console.log("No destination provided, skipping API call");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      console.log(`Fetching ${activeTab} data for:`, searchParams);

      try {
        let transformedData = [];

        switch (activeTab) {
          case "stays":
            transformedData = await fetchStayItems(searchParams);
            break;
          case "flights":
            transformedData = await fetchFlightItems(searchParams);
            break;
          case "activities":
            transformedData = await fetchActivityItems(searchParams);
            break;
        }

        setData((prevData) => ({
          ...prevData,
          [activeTab]: transformedData,
        }));
      } catch (err) {
        console.error(`Error fetching ${activeTab} data:`, {
          message: err.message,
          stack: err.stack,
          searchParams,
        });
        setError(`Unable to load ${activeTab}. ${err.message}`);
      } finally {
        setIsLoading(false);
        console.log(`Finished ${activeTab} data fetch`);
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
