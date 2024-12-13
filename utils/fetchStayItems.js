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

const transformHotelData = (data, searchParams) => {
  if (!data?.data?.results?.hotelCards) return [];

  // Calculate total nights - using the exact dates from searchParams
  const fromDate = searchParams.fromDate;
  const toDate = searchParams.toDate;
  const totalNights = Math.ceil(
    (new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24)
  );

  return data.data.results.hotelCards.map((hotel) => {
    const lowestPrice = hotel.lowestPrice;
    const review = hotel.reviewsSummary;

    return {
      type: "stay",
      id: hotel.hotelId,
      title: hotel.name,
      image: hotel.images?.[0] || DEFAULT_IMAGES.HOTEL,
      source: lowestPrice?.partnerName || "Multiple providers",
      cost: lowestPrice?.price || "Price unavailable",
      details: {
        // Basic Info
        stars: Number(hotel.stars) || 0,
        distance: hotel.distance,
        landmark: hotel.relevantPoiDistance,

        // Dates and Duration - using the exact dates from searchParams
        checkIn: fromDate,
        checkOut: toDate,
        totalNights: totalNights,

        // Location
        coordinates: hotel.coordinates,

        // Reviews
        rating: review?.score || 0,
        reviews: review?.total || 0,
        reviewText: review?.scoreDesc || "No reviews",
        reviewImage: review?.imageUrl,

        // Pricing
        pricePerNight: Math.round(lowestPrice?.rawPrice || 0),
        basePrice: Math.round((lowestPrice?.rawBasePrice || 0) / totalNights),
        taxAndFees: Math.round((lowestPrice?.rawTaxAndFees || 0) / totalNights),

        // Additional Info
        highlights: hotel.confidentMessages || [],
        bookingUrl: lowestPrice?.url || null,
      },
    };
  });
};

export const fetchStayItems = async (searchParams) => {
  try {
    console.log("Stay Search Params:", searchParams);

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

      // Log each polling attempt
      console.log(`Stay Search Polling Attempt ${attempts}:`, {
        url,
        status: data?.data?.status,
        response: JSON.stringify(data, null, 2),
      });

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

    const transformedData = transformHotelData(finalData, searchParams);

    // // Log transformed data
    // console.log("Transformed Stay Data:", {
    //   count: transformedData.length,
    //   data: JSON.stringify(transformedData, null, 2),
    // });

    return transformedData;
  } catch (error) {
    logError("Hotel search", error);
  }
};
