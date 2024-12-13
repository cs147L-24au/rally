import { API_CONFIG, DEFAULT_IMAGES } from "./apiConfig";
import { fetchWithAuth, logError, sleep } from "./apiUtils";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const retryOperation = async (operation, errorMessage, attempt = 1) => {
  try {
    const result = await operation();
    if (!result && attempt < MAX_RETRIES) {
      await sleep(RETRY_DELAY);
      return retryOperation(operation, errorMessage, attempt + 1);
    }
    return result;
  } catch (error) {
    if (attempt < MAX_RETRIES) {
      await sleep(RETRY_DELAY);
      return retryOperation(operation, errorMessage, attempt + 1);
    }
    logError(errorMessage, error);
    return null;
  }
};

const searchLocation = async (query) => {
  if (!query) return null;

  const operation = async () => {
    const data = await fetchWithAuth(
      API_CONFIG.stays.endpoint.locationSearch(query),
      API_CONFIG.stays.host
    );

    const location = data?.data?.find(
      (item) => item.entityType === "city" || item.entityType === "hotel"
    );
    return location ? { entityId: location.entityId } : null;
  };

  return retryOperation(operation, "Location search");
};

const transformHotelData = (data, searchParams) => {
  if (!data?.data?.results?.hotelCards) return [];

  const totalNights = Math.ceil(
    (new Date(searchParams.toDate) - new Date(searchParams.fromDate)) /
      (1000 * 60 * 60 * 24)
  );

  return data.data.results.hotelCards.map((hotel) => ({
    type: "stay",
    id: hotel.hotelId,
    title: hotel.name,
    image: hotel.images?.[0] || DEFAULT_IMAGES.HOTEL,
    source: hotel.lowestPrice?.partnerName || "Multiple providers",
    cost: hotel.lowestPrice?.price || "Price unavailable",
    details: {
      stars: Number(hotel.stars) || 0,
      distance: hotel.distance,
      landmark: hotel.relevantPoiDistance,
      checkIn: searchParams.fromDate,
      checkOut: searchParams.toDate,
      totalNights,
      coordinates: hotel.coordinates,
      rating: hotel.reviewsSummary?.score || 0,
      reviews: hotel.reviewsSummary?.total || 0,
      reviewText: hotel.reviewsSummary?.scoreDesc || "No reviews",
      reviewImage: hotel.reviewsSummary?.imageUrl,
      pricePerNight: Math.round(hotel.lowestPrice?.rawPrice || 0),
      basePrice: Math.round(
        (hotel.lowestPrice?.rawBasePrice || 0) / totalNights
      ),
      taxAndFees: Math.round(
        (hotel.lowestPrice?.rawTaxAndFees || 0) / totalNights
      ),
      highlights: hotel.confidentMessages || [],
      bookingUrl: hotel.lowestPrice?.url || null,
    },
  }));
};

export const fetchStayItems = async (searchParams) => {
  const operation = async () => {
    const location = await searchLocation(searchParams.destination);
    if (!location) return null;

    const data = await fetchWithAuth(
      API_CONFIG.stays.endpoint.search({
        ...searchParams,
        entityId: location.entityId,
      }),
      API_CONFIG.stays.host
    );

    const transformedData = transformHotelData(data, searchParams);
    return transformedData.length > 0 ? transformedData : null;
  };

  return (await retryOperation(operation, "Hotel search")) || [];
};
