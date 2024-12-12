const RAPID_API_KEY = "c30f614dd9mshdc0825b274e36a9p10eafcjsn3362b1f0563c";

const API_CONFIG = {
  activities: {
    host: "tripadvisor-com1.p.rapidapi.com",
    endpoint: (params) =>
      `https://tripadvisor-com1.p.rapidapi.com/attractions/search?geoId=${params.geoId}&units=miles&sortType=asc&startDate=${params.fromDate}&endDate=${params.toDate}`,
  },
  locationSearch: {
    host: "tripadvisor-com1.p.rapidapi.com",
    endpoint: (query) =>
      `https://tripadvisor-com1.p.rapidapi.com/auto-complete?query=${encodeURIComponent(
        query
      )}`,
  },
};

const extractLocationData = (data) => {
  // Get the first result which is usually the main city
  const firstResult = data.data[0];
  if (!firstResult?.geoId) {
    throw new Error("No location found");
  }

  return {
    geoId: firstResult.geoId,
    name: firstResult.heading.htmlString.replace(/<\/?b>/g, ""), // Remove bold tags
  };
};

// Helper function to search for location ID
const searchLocation = async (query) => {
  console.log(`🔍 Searching for location: "${query}"`);
  if (!query) return null;

  const config = API_CONFIG.locationSearch;
  const url = config.endpoint(query);
  console.log(`📡 Location search URL: ${url}`);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": config.host,
      },
    });

    const data = await response.json();
    console.log(`🎯 Location search response:`, data);

    if (!data.status || !data.data?.length) {
      console.error(`❌ No location found for query: "${query}"`);
      throw new Error(`Could not find location for ${query}`);
    }

    const result = extractLocationData(data);
    console.log(`✅ Found location:`, result);
    return result;
  } catch (error) {
    console.error(`❌ Location search error for "${query}":`, error);
    throw error;
  }
};

const transformActivityData = (data) => {
  // Check if we have attractions data
  const attractions = data.data?.attractions || [];

  return attractions.map((activity) => ({
    id: activity.cardLink?.route?.typedParams?.contentId || "",
    title: activity.cardTitle?.string || "",
    image: activity.cardPhoto?.sizes?.urlTemplate
      ? activity.cardPhoto.sizes.urlTemplate
          .replace("{width}", "500")
          .replace("{height}", "300")
      : "",
    source: "TripAdvisor",
    cost: activity.merchandisingText?.htmlString || "Free",
    details: {
      rating: activity.bubbleRating?.rating || "N/A",
      reviews: activity.bubbleRating?.numberReviews?.string
        ? parseInt(activity.bubbleRating.numberReviews.string)
        : 0,
      description: activity.descriptiveText?.string || "",
      category: activity.primaryInfo?.text || "Activity",
      address: activity.secondaryInfo?.text || "",
    },
  }));
};

// Main function to fetch activities data
export const fetchActivityItems = async (searchParams) => {
  console.log(`🔄 Starting activities search with params:`, searchParams);

  try {
    const location = await searchLocation(searchParams.destination);
    if (!location) {
      throw new Error("Could not find location");
    }

    const config = API_CONFIG.activities;
    const url = config.endpoint({
      ...searchParams,
      geoId: location.geoId,
    });
    console.log(`📡 Activities search URL: ${url}`);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": config.host,
      },
    });

    const data = await response.json();
    console.log(`🎯 Activities search response:`, data);

    if (!data.status) {
      throw new Error(data.message || "Failed to fetch activities data");
    }

    const transformedData = transformActivityData(data);
    console.log(`✅ Transformed activities data:`, transformedData);
    return transformedData;
  } catch (error) {
    console.error(`❌ Activities search error:`, error);
    throw error;
  }
};
