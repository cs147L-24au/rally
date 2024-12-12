const RAPID_API_KEY = "c30f614dd9mshdc0825b274e36a9p10eafcjsn3362b1f0563c";

const API_CONFIG = {
  stays: {
    host: "sky-scanner3.p.rapidapi.com",
    endpoint: (params) =>
      `https://sky-scanner3.p.rapidapi.com/hotels/search?entityId=${params.entityId}&checkin=${params.fromDate}&checkout=${params.toDate}&adults=1`,
  },
  locationSearch: {
    host: "sky-scanner3.p.rapidapi.com",
    endpoint: (query) =>
      `https://sky-scanner3.p.rapidapi.com/hotels/auto-complete?query=${encodeURIComponent(
        query
      )}`,
  },
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
      headers: {
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": config.host,
      },
    });

    const data = await response.json();
    console.log(`🏨 Location search response:`, data);

    if (!response.ok) {
      console.error(
        `❌ Location search failed with status: ${response.status}`
      );
      throw new Error(`API returned ${response.status}`);
    }

    if (!data.data?.[0]) {
      console.error(`❌ No location found for query: "${query}"`);
      throw new Error(`Could not find location for ${query}`);
    }

    // Find the first city or hotel result
    const location = data.data.find(
      (item) => item.entityType === "city" || item.entityType === "hotel"
    );

    if (!location) {
      console.error(`❌ No suitable location found for query: "${query}"`);
      throw new Error(`Could not find suitable location for ${query}`);
    }

    const result = {
      entityId: location.entityId,
      name: location.entityName,
      type: location.entityType,
      location: location.location,
    };
    console.log(`✅ Found location:`, result);
    return result;
  } catch (error) {
    console.error(`❌ Location search error for "${query}":`, error);
    throw error;
  }
};

const transformHotelData = (data) => {
  const hotels = data.data.results.hotelCards;

  return hotels.map((hotel) => ({
    id: hotel.hotelId,
    title: hotel.name,
    source: "Skyscanner",
    cost: hotel.cheapestPrice || "Price unavailable",
    image: hotel.images?.[0] || "",
    details: {
      address: hotel.distance || "",
      amenities: hotel.lowestPrice?.amenities || [],
      coordinates: {
        latitude: hotel.coordinates?.latitude,
        longitude: hotel.coordinates?.longitude,
      },
      rating: hotel.reviewsSummary?.score?.toString() || "N/A",
      reviews: hotel.reviewsSummary?.total || 0,
    },
  }));
};

// Main function to fetch hotel data
export const fetchStayItems = async (searchParams) => {
  console.log(`🔄 Starting hotel search with params:`, searchParams);

  try {
    const location = await searchLocation(searchParams.destination);
    if (!location) {
      throw new Error("Could not find location");
    }

    const config = API_CONFIG.stays;
    const url = config.endpoint({
      ...searchParams,
      entityId: location.entityId,
    });
    console.log(`📡 Hotel search URL: ${url}`);

    // Maximum number of polling attempts
    const MAX_POLLING_ATTEMPTS = 5;
    let attempts = 0;
    let finalData = null;

    while (attempts < MAX_POLLING_ATTEMPTS) {
      attempts++;
      console.log(`🔄 Polling attempt ${attempts}/${MAX_POLLING_ATTEMPTS}`);

      const response = await fetch(url, {
        headers: {
          "X-RapidAPI-Key": RAPID_API_KEY,
          "X-RapidAPI-Host": config.host,
        },
      });

      const data = await response.json();
      console.log(`🏨 Hotel search response (attempt ${attempts}):`, data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch hotel data");
      }

      // Check if search is complete
      const status = data?.data?.status;
      if (
        status?.finalStatus === "COMPLETED" ||
        (data?.data?.results?.hotelCards?.length > 0 &&
          data?.data?.results?.hotelCards[0]?.pricing)
      ) {
        finalData = data;
        break;
      }

      // If not complete, wait before next attempt
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (!finalData) {
      throw new Error("Search timed out without complete results");
    }

    const transformedData = transformHotelData(finalData);
    console.log(`✅ Transformed hotel data:`, transformedData);
    return transformedData;
  } catch (error) {
    console.error(`❌ Hotel search error:`, error);
    throw error;
  }
};
