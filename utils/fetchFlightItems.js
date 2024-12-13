import { API_CONFIG, DEFAULT_IMAGES } from "./apiConfig";
import { fetchWithAuth, logError } from "./apiUtils";

const searchAirport = async (query) => {
  if (!query) return null;

  try {
    const url = API_CONFIG.flights.endpoint.airportSearch(query);
    const data = await fetchWithAuth(url, API_CONFIG.flights.host);
    const airport = data.data?.find((item) => item.type === "AIRPORT");

    return airport ? { code: `${airport.code}.AIRPORT` } : null;
  } catch (error) {
    logError("Airport search", error);
    return null;
  }
};

const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

const transformFlightData = (data) => {
  if (!data?.data?.flightOffers) return [];

  return data.data.flightOffers.map((offer) => {
    const outboundFlight = offer.segments[0];
    const returnFlight = offer.segments[1];
    const outboundLeg = outboundFlight?.legs?.[0];
    const airline = outboundLeg?.carriersData?.[0];

    return {
      type: "flight",
      id: offer.token,
      title: `${outboundFlight.departureAirport.cityName} to ${outboundFlight.arrivalAirport.cityName}`,
      image: airline?.logo || DEFAULT_IMAGES.FLIGHT,
      cost: `$${Math.round(offer.priceBreakdown.total.units)}`,
      source: airline?.name || "Multiple Airlines",
      details: {
        direct: outboundFlight.legs.length === 1,
        outbound: {
          departure: new Date(outboundFlight.departureTime).toLocaleString(),
          arrival: new Date(outboundFlight.arrivalTime).toLocaleString(),
          duration: formatDuration(outboundFlight.totalTime),
          segments: outboundFlight.legs.map((leg) => ({
            flightNumber: leg.flightInfo.flightNumber,
            departure: new Date(leg.departureTime).toLocaleString(),
            arrival: new Date(leg.arrivalTime).toLocaleString(),
            duration: formatDuration(leg.totalTime),
            airline: leg.carriersData?.[0]?.name,
          })),
        },
        return: returnFlight
          ? {
              departure: new Date(returnFlight.departureTime).toLocaleString(),
              arrival: new Date(returnFlight.arrivalTime).toLocaleString(),
              duration: formatDuration(returnFlight.totalTime),
              segments: returnFlight.legs.map((leg) => ({
                flightNumber: leg.flightInfo.flightNumber,
                departure: new Date(leg.departureTime).toLocaleString(),
                arrival: new Date(leg.arrivalTime).toLocaleString(),
                duration: formatDuration(leg.totalTime),
                airline: leg.carriersData?.[0]?.name,
              })),
            }
          : null,
        airports: {
          departure: {
            code: outboundFlight.departureAirport.code,
            name: outboundFlight.departureAirport.name,
            city: outboundFlight.departureAirport.cityName,
            terminal: outboundFlight.departureTerminal,
          },
          arrival: {
            code: outboundFlight.arrivalAirport.code,
            name: outboundFlight.arrivalAirport.name,
            city: outboundFlight.arrivalAirport.cityName,
            terminal: outboundFlight.arrivalTerminal,
          },
        },
        pricing: {
          base: offer.priceBreakdown.baseFare?.units,
          taxes: offer.priceBreakdown.tax?.units,
          fees: offer.priceBreakdown.fee?.units,
          total: offer.priceBreakdown.total.units,
          currency: offer.priceBreakdown.total.currencyCode,
        },
        airline: {
          name: airline?.name,
          code: airline?.code,
          logo: airline?.logo,
        },
        booking: {
          refundable: offer.brandedFareInfo?.features?.some(
            (f) => f.featureName === "REFUNDABLE"
          ),
          cabinClass: outboundLeg.cabinClass,
          seatsAvailable: offer.seatAvailability?.numberOfSeatsAvailable,
        },
      },
    };
  });
};

export const fetchFlightItems = async (searchParams) => {
  try {
    const [fromAirport, toAirport] = await Promise.all([
      searchAirport(searchParams.fromDestination),
      searchAirport(searchParams.destination),
    ]);

    if (!fromAirport || !toAirport) return [];

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
    return [];
  }
};
