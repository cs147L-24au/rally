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

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  // Add timezone offset to get correct local time
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
  return adjustedDate.toLocaleString();
};

const transformFlightData = (data) => {
  if (!data?.data?.flightOffers) return [];

  return data.data.flightOffers.map((offer) => {
    const outboundFlight = offer.segments[0];
    const returnFlight = offer.segments[1]; // Add return flight segment
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
        // Flight basics
        direct: outboundFlight.legs.length === 1,
        outbound: {
          departure: formatDateTime(outboundFlight.departureTime),
          arrival: formatDateTime(outboundFlight.arrivalTime),
          duration: `${Math.floor(
            outboundFlight.totalTime / 3600
          )}h ${Math.floor((outboundFlight.totalTime % 3600) / 60)}m`,
          segments: outboundFlight.legs.map((leg) => ({
            flightNumber: leg.flightInfo.flightNumber,
            departure: new Date(leg.departureTime).toLocaleString(),
            arrival: new Date(leg.arrivalTime).toLocaleString(),
            duration: `${Math.floor(leg.totalTime / 3600)}h ${Math.floor(
              (leg.totalTime % 3600) / 60
            )}m`,
            airline: leg.carriersData?.[0]?.name,
          })),
        },
        return: returnFlight
          ? {
              departure: formatDateTime(returnFlight.departureTime),
              arrival: formatDateTime(returnFlight.arrivalTime),
              duration: `${Math.floor(
                returnFlight.totalTime / 3600
              )}h ${Math.floor((returnFlight.totalTime % 3600) / 60)}m`,
              segments: returnFlight.legs.map((leg) => ({
                flightNumber: leg.flightInfo.flightNumber,
                departure: new Date(leg.departureTime).toLocaleString(),
                arrival: new Date(leg.arrivalTime).toLocaleString(),
                duration: `${Math.floor(leg.totalTime / 3600)}h ${Math.floor(
                  (leg.totalTime % 3600) / 60
                )}m`,
                airline: leg.carriersData?.[0]?.name,
              })),
            }
          : null,

        // Airports
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

        // Rest of the details remain the same
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

    // Log raw flight search response
    console.log("Flight Search Response:", {
      url,
      params: searchParams,
      response: JSON.stringify(data, null, 2),
    });

    const transformedData = transformFlightData(data);

    return transformedData;
  } catch (error) {
    logError("Flight search", error);
  }
};
