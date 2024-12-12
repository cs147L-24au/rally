import { API_CONFIG, DEFAULT_IMAGES } from "./apiConfig";
import { fetchWithAuth, logError, sleep } from "./apiUtils";

const MAX_POLLING_ATTEMPTS = 5;
const POLLING_INTERVAL = 2000;

const searchLocation = async (query) => {
  if (!query) return null;

  try {
    const url = API_CONFIG.stays.endpoint.locationSearch(query);
    const data = await fetchWithAuth(url, API_CONFIG.stays.host);

    if (!data.data?.[0]) {
      throw new Error(`Could not find location for ${query}`);
    }

    const location = data.data.find(
      (item) => item.entityType === "city" || item.entityType === "hotel"
    );

    if (!location) {
      throw new Error(`No suitable location found for ${query}`);
    }

    return {
      entityId: location.entityId,
      name: location.entityName,
      type: location.entityType,
      location: location.location,
    };
  } catch (error) {
    logError("Location search", error);
  }
};

const transformHotelData = (data) => {
  const hotels = data.data.results.hotelCards;

  return hotels.map((hotel) => ({
    id: hotel.hotelId,
    title: hotel.name,
    source: "Skyscanner",
    cost: hotel.cheapestPrice || "Price unavailable",
    image: hotel.images?.[0] || DEFAULT_IMAGES.STAY,
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

export const fetchStayItems = async (searchParams) => {
  try {
    const location = await searchLocation(searchParams.destination);
    if (!location) {
      throw new Error("Could not find location");
    }

    const url = API_CONFIG.stays.endpoint.search({
      ...searchParams,
      entityId: location.entityId,
    });

    let attempts = 0;
    let finalData = null;

    while (attempts < MAX_POLLING_ATTEMPTS) {
      attempts++;
      const data = await fetchWithAuth(url, API_CONFIG.stays.host);

      const status = data?.data?.status;
      if (
        status?.finalStatus === "COMPLETED" ||
        (data?.data?.results?.hotelCards?.length > 0 &&
          data?.data?.results?.hotelCards[0]?.pricing)
      ) {
        finalData = data;
        break;
      }

      await sleep(POLLING_INTERVAL);
    }

    if (!finalData) {
      throw new Error("Search timed out without complete results");
    }

    return transformHotelData(finalData);
  } catch (error) {
    logError("Hotel search", error);
  }
};
