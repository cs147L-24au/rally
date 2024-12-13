import { API_CONFIG, DEFAULT_IMAGES } from "./apiConfig";
import { fetchWithAuth, logError } from "./apiUtils";

const searchLocation = async (query) => {
  if (!query) return null;

  try {
    const url = API_CONFIG.activities.endpoint.locationSearch(query);
    const data = await fetchWithAuth(url, API_CONFIG.activities.host);

    if (!data?.data?.[0]?.geoId) return null;
    return { geoId: data.data[0].geoId };
  } catch (error) {
    logError("Activity location search", error);
    return null;
  }
};

const transformActivityData = (data) => {
  if (!data?.data?.attractions) return [];

  return data.data.attractions.map((activity) => ({
    type: "activity",
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
    },
  }));
};

export const fetchActivityItems = async (searchParams) => {
  try {
    const location = await searchLocation(searchParams.destination);
    if (!location) return [];

    const url = API_CONFIG.activities.endpoint.search({
      ...searchParams,
      geoId: location.geoId,
    });

    const data = await fetchWithAuth(url, API_CONFIG.activities.host);
    return transformActivityData(data);
  } catch (error) {
    logError("Activities search", error);
    return [];
  }
};
