import { API_CONFIG, DEFAULT_IMAGES } from "./apiConfig";
import { fetchWithAuth, logError } from "./apiUtils";

const searchAirport = async (query) => {
  if (!query) return null;

  try {
    const url = API_CONFIG.flights.endpoint.airportSearch(query);
    const data = await fetchWithAuth(url, API_CONFIG.flights.host);

    const airport = data.data.find((item) => item.type === "AIRPORT");
    if (!airport) throw new Error("No airport found");

    return {
      code: `${airport.code}.AIRPORT`,
      name: airport.name,
      city: airport.cityName,
    };
  } catch (error) {
    logError("Airport search", error);
  }
};

const transformFlightData = (data) => {
  if (!data?.data?.flightOffers) return [];

  return data.data.flightOffers.map((offer) => ({
    id: offer.token,
    title: `${offer.segments[0].departureAirport.cityName} to ${offer.segments[0].arrivalAirport.cityName}`,
    image:
      offer.segments[0].legs[0]?.carriersData?.[0]?.logo ||
      DEFAULT_IMAGES.FLIGHT,
    cost: `$${Math.round(offer.priceBreakdown.total.units)}`,
    source:
      offer.segments[0].legs[0]?.carriersData?.[0]?.name || "Multiple Airlines",
    details: {
      direct: offer.segments[0].legs.length === 1,
      departure: new Date(offer.segments[0].departureTime).toLocaleString(),
      arrival: new Date(offer.segments[0].arrivalTime).toLocaleString(),
      duration: `${Math.floor(
        offer.segments[0].totalTime / 3600
      )}h ${Math.floor((offer.segments[0].totalTime % 3600) / 60)}m`,
    },
  }));
};

export const fetchFlightItems = async (searchParams) => {
  try {
    const [fromAirport, toAirport] = await Promise.all([
      searchAirport(searchParams.fromDestination),
      searchAirport(searchParams.destination),
    ]);

    if (!fromAirport || !toAirport) {
      throw new Error("Could not find one or both airports");
    }

    const url = API_CONFIG.flights.endpoint.search({
      fromAirport: fromAirport.code,
      toAirport: toAirport.code,
      fromDate: searchParams.fromDate,
      toDate: searchParams.toDate,
    });

    const data = await fetchWithAuth(url, API_CONFIG.flights.host);
    return transformFlightData(data);
  } catch (error) {
    logError("Flight search", error);
  }
};
