const RAPID_API_KEY = "c30f614dd9mshdc0825b274e36a9p10eafcjsn3362b1f0563c";

const API_CONFIG = {
  stays: {
    host: "tripadvisor-com1.p.rapidapi.com",
    endpoint: (params) =>
      `https://tripadvisor-com1.p.rapidapi.com/hotels/search?geoId=${params.geoId}&checkIn=${params.fromDate}&checkOut=${params.toDate}&limit=30`,
  },
  // We can reuse the same locationSearch config from activities
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

// Helper function to transform the hotel data
const transformHotelData = (data) => {
  if (!data?.data?.hotels) {
    console.warn("❌ No hotels data found in response");
    return [];
  }

  console.log(`📊 Processing ${data.data.hotels.length} hotels`);

  return data.data.hotels.map((hotel, index) => {
    // Simplify the image URL transformation to match the working activities version
    const imageUrl = hotel.cardPhotos?.[0]?.sizes?.urlTemplate
      ? hotel.cardPhotos[0].sizes.urlTemplate
          .replace("{width}", "500")
          .replace("{height}", "350")
      : "";

    // Log for debugging
    console.log(`🖼️ Hotel ${index + 1} image URL:`, imageUrl);

    return {
      id: hotel.cardLink?.route?.params?.contentId || "",
      title: hotel.cardTitle?.string || "Unknown",
      image: imageUrl,
      source: "TripAdvisor",
      cost: `$${
        hotel.commerceInfo?.priceForDisplay?.string?.replace("$", "") || "0"
      }`,
      details: {
        rating: hotel.bubbleRating?.rating || 0,
        reviews: parseInt(
          hotel.bubbleRating?.numberReviews?.string?.replace(/,/g, "") || "0"
        ),
        badge: hotel.badge?.type || "",
      },
      link: hotel.cardLink?.route?.url || "",
    };
  });
};

// Main fetch function
export const fetchStayItems = async (searchParams) => {
  try {
    const location = await searchLocation(searchParams.destination);
    if (!location) {
      throw new Error("Could not find location");
    }

    const config = API_CONFIG.stays;
    const url = config.endpoint({
      ...searchParams,
      geoId: location.geoId,
    });
    console.log(`📡 Hotels search URL: ${url}`);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": config.host,
      },
    });

    const data = await response.json();
    console.log(`🏨 Hotels search response:`, data);

    if (!data.data?.hotels) {
      throw new Error("Failed to fetch hotel data");
    }

    const transformedData = transformHotelData(data);
    console.log(`✅ Transformed hotel data:`, transformedData);
    return transformedData;
  } catch (error) {
    console.error(`❌ Hotel search error:`, error);
    throw error;
  }
};
