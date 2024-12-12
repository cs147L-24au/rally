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
  if (!searchParams?.fromDate || !searchParams?.toDate) {
    console.warn("Missing date parameters in hotel search");
    return [];
  }

  const checkInDate = new Date(searchParams.fromDate);
  const checkOutDate = new Date(searchParams.toDate);
  const totalNights = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return data.data.results.hotelCards.map((hotel) => {
    const lowestPrice = hotel.lowestPrice;
    const review = hotel.reviewsSummary;

    // Transform other providers data
    const otherProviders =
      hotel.otherPrices?.map((provider) => ({
        name: provider.name,
        price: provider.price,
        logo: provider.logo,
        url: provider.url,
        isOfficial: provider.isOfficial,
        features: provider.rateFeatures || [],
        partnerType: provider.partnerType,
      })) || [];

    return {
      id: hotel.hotelId,
      title: hotel.name,
      image: hotel.images?.[0] || DEFAULT_IMAGES.HOTEL,
      additionalImages: hotel.images?.slice(1) || [],
      source: lowestPrice?.partnerName || "Multiple providers",
      cost: lowestPrice?.price || "Price unavailable",
      details: {
        // Basic Info
        stars: Number(hotel.stars) || 0,
        rating: review?.score || 0,
        reviews: review?.total || 0,
        reviewText: review?.scoreDesc || "No reviews",

        // Dates and Duration
        checkIn: checkInDate.toLocaleDateString("en-US", dateOptions),
        checkOut: checkOutDate.toLocaleDateString("en-US", dateOptions),
        totalNights: totalNights,

        // Location
        distance: hotel.distance,
        landmark: hotel.relevantPoiDistance,
        coordinates: hotel.coordinates,

        // Pricing
        pricePerNight: Math.round((lowestPrice?.rawPrice || 0) / totalNights),
        basePrice: Math.round((lowestPrice?.rawBasePrice || 0) / totalNights),
        taxAndFees: Math.round((lowestPrice?.rawTaxAndFees || 0) / totalNights),

        // Booking
        bookingUrl: lowestPrice?.url || null,
        otherProviders: otherProviders,

        // Additional Info
        highlights: hotel.confidentMessages || [],
        amenities: lowestPrice?.rateFeatures || [],
        isCheapest: lowestPrice?.isPriceCheapest || false,
        partnerType: lowestPrice?.partnerType || null,
        partnerLogo: lowestPrice?.partnerLogo || null,
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

    return transformedData;
  } catch (error) {
    logError("Hotel search", error);
  }
};
