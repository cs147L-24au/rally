import { useState } from "react";

export const useExploreData = () => {
  const [activeTab, setActiveTab] = useState("stays");
  const [data] = useState({
    stays: [
      {
        id: "1",
        title: "Flat in Shibuya City",
        image: require("@/assets/japan.jpeg"),
        source: "Airbnb",
        cost: "123",
      },
      {
        id: "2",
        title: "Flat in Minato City",
        image: require("@/assets/jetski.jpg"),
        source: "Airbnb",
        cost: "290",
      },
    ],
    flights: [
      {
        id: "1",
        title: "Tokyo to Singapore",
        image: require("@/assets/japan.jpeg"),
        source: "Japan Airlines",
        cost: "450",
      },
      {
        id: "2",
        title: "Singapore to Seoul",
        image: require("@/assets/jetski.jpg"),
        source: "Korean Air",
        cost: "380",
      },
    ],
    activities: [
      {
        id: "1",
        title: "Mount Fuji Tour",
        image: require("@/assets/japan.jpeg"),
        source: "Local Guide",
        cost: "80",
      },
      {
        id: "2",
        title: "Tokyo Food Tour",
        image: require("@/assets/jetski.jpg"),
        source: "Foodie Tours",
        cost: "45",
      },
    ],
  });

  const getCurrentData = () => data[activeTab] || data.stays;

  return {
    activeTab,
    setActiveTab,
    currentData: getCurrentData(),
  };
};
