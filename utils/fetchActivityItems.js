import { API_CONFIG, DEFAULT_IMAGES } from "./apiConfig";
import { fetchWithAuth, logError } from "./apiUtils";

const extractLocationData = (data) => {
  const firstResult = data.data[0];
  if (!firstResult?.geoId) {
    throw new Error("No location found");
  }

  return {
    geoId: firstResult.geoId,
    name: firstResult.heading.htmlString.replace(/<\/?b>/g, ""),
  };
};

const searchLocation = async (query) => {
  if (!query) return null;

  try {
    const url = API_CONFIG.activities.endpoint.locationSearch(query);
    const data = await fetchWithAuth(url, API_CONFIG.activities.host);

    if (!data.status || !data.data?.length) {
      throw new Error(`Could not find location for ${query}`);
    }

    return extractLocationData(data);
  } catch (error) {
    logError("Location search", error);
  }
};

const transformActivityData = (data) => {
  // The attractions are in data.data.attractions
  const attractions = data.data?.attractions || [];

  return attractions.map((activity) => ({
    id: activity.cardLink?.route?.typedParams?.contentId || "",
    title: activity.cardTitle?.string || "",
    image: activity.cardPhoto?.sizes?.urlTemplate
      ? activity.cardPhoto.sizes.urlTemplate
          .replace(/{width}/, "800")
          .replace(/{height}/, "600")
      : DEFAULT_IMAGES.ACTIVITY,
    cost: activity.merchandisingText?.htmlString || "Free",
    source: "TripAdvisor",
    details: {
      category: activity.primaryInfo?.text || "",
      location: activity.secondaryInfo?.text || "",
      rating: activity.bubbleRating?.rating || 0,
      reviews: activity.bubbleRating?.numberReviews?.string || "0",
      openStatus: activity.secondaryInfo?.text?.includes("Open now")
        ? "Open"
        : null,
      pricing: {
        isFree: !activity.merchandisingText?.htmlString,
        fromPrice: activity.merchandisingText?.htmlString || null,
      },
      source: "TripAdvisor",
    },
  }));
};

export const fetchActivityItems = async (searchParams) => {
  try {
    console.log("Activity Search Params:", searchParams);

    const location = await searchLocation(searchParams.destination);
    if (!location) {
      throw new Error("Could not find location");
    }

    const url = API_CONFIG.activities.endpoint.search({
      ...searchParams,
      geoId: location.geoId,
    });

    const data = await fetchWithAuth(url, API_CONFIG.activities.host);
    console.log("Activity Search Response:", {
      url,
      params: searchParams,
      response: JSON.stringify(data, null, 2),
    });

    const transformedData = transformActivityData(data);
    return transformedData;
  } catch (error) {
    logError("Activities search", error);
  }
};
