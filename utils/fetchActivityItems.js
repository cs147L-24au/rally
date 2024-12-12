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
  const attractions = data.data?.attractions || [];

  return attractions.map((activity) => ({
    id: activity.cardLink?.route?.typedParams?.contentId || "",
    title: activity.cardTitle?.string || "",
    image: activity.cardPhoto?.sizes?.urlTemplate
      ? activity.cardPhoto.sizes.urlTemplate
          .replace("{width}", "500")
          .replace("{height}", "300")
      : DEFAULT_IMAGES.ACTIVITY,
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

export const fetchActivityItems = async (searchParams) => {
  try {
    const location = await searchLocation(searchParams.destination);
    if (!location) {
      throw new Error("Could not find location");
    }

    const url = API_CONFIG.activities.endpoint.search({
      ...searchParams,
      geoId: location.geoId,
    });

    const data = await fetchWithAuth(url, API_CONFIG.activities.host);

    if (!data.status) {
      throw new Error(data.message || "Failed to fetch activities data");
    }

    return transformActivityData(data);
  } catch (error) {
    logError("Activities search", error);
  }
};
