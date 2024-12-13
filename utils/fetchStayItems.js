import { API_CONFIG, DEFAULT_IMAGES } from "./apiConfig";
import { fetchWithAuth, logError } from "./apiUtils";

const searchLocation = async (query) => {
  if (!query) return null;

  try {
    const url = API_CONFIG.stays.endpoint.locationSearch(query);
    const data = await fetchWithAuth(url, API_CONFIG.stays.host);
    const location = data.data?.find(
      (item) => item.entityType === "city" || item.entityType === "hotel"
    );

    return location ? { entityId: location.entityId } : null;
  } catch (error) {
    logError("Location search", error);
    return null;
  }
};

const calculateTotalNights = (fromDate, toDate) =>
  Math.ceil((new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24));

const transformHotelData = (data, searchParams) => {
  if (!data?.data?.results?.hotelCards) return [];

  const totalNights = calculateTotalNights(
    searchParams.fromDate,
    searchParams.toDate
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
  try {
    const location = await searchLocation(searchParams.destination);
    if (!location) return [];

    const url = API_CONFIG.stays.endpoint.search({
      ...searchParams,
      entityId: location.entityId,
    });

    const data = await fetchWithAuth(url, API_CONFIG.stays.host);
    return transformHotelData(data, searchParams);
  } catch (error) {
    logError("Hotel search", error);
    return [];
  }
};
