const RAPID_API_KEY = "c30f614dd9mshdc0825b274e36a9p10eafcjsn3362b1f0563c";

const API_CONFIG = {
  flights: {
    host: "booking-com15.p.rapidapi.com",
    endpoint: (params) =>
      `https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights?fromId=${params.fromAirport}&toId=${params.toAirport}&departDate=${params.fromDate}&returnDate=${params.toDate}&sort=BEST&cabinClass=ECONOMY&currency_code=USD`,
  },
  airportSearch: {
    host: "booking-com15.p.rapidapi.com",
    endpoint: (query) =>
      `https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination?query=${encodeURIComponent(
        query
      )}`,
  },
};

// Helper function to search for airport codes
const searchAirport = async (query) => {
  console.log(`🔍 Searching for airport with query: "${query}"`);
  if (!query) return null;

  const config = API_CONFIG.airportSearch;
  const url = config.endpoint(query);
  console.log(`📡 Airport search URL: ${url}`);

  try {
    const response = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": config.host,
      },
    });

    const data = await response.json();
    console.log(`✈️ Airport search response:`, data);

    if (!data.status) {
      throw new Error(data.message || "Failed to fetch airport data");
    }

    // Get the first airport result
    const airport = data.data.find((item) => item.type === "AIRPORT");
    if (!airport) {
      throw new Error("No airport found");
    }

    return {
      code: `${airport.code}.AIRPORT`,
      name: airport.name,
      city: airport.cityName,
    };
  } catch (error) {
    console.error(`❌ Airport search error:`, error);
    throw error;
  }
};

// Helper function to transform flight data
// Helper function to transform flight data
const transformFlightData = (data) => {
  if (!data?.data?.flightOffers) {
    console.warn("No flight offers found in response");
    return [];
  }

  return data.data.flightOffers.map((offer) => {
    const outboundFlight = offer.segments[0];
    const outboundLeg = outboundFlight.legs[0];

    // Format price to match "$XXX" format
    const price = Math.round(offer.priceBreakdown.total.units);

    return {
      id: offer.token,
      title: `${outboundFlight.departureAirport.cityName} to ${outboundFlight.arrivalAirport.cityName}`,
      // Use airline logo if available, fallback to placeholder
      image:
        outboundLeg?.carriersData?.[0]?.logo ||
        "https://content.skyscnr.com/m/3719e8f4a5daf43d/original/Flights-Placeholder.jpg",
      cost: `$${price}`,
      source: outboundLeg?.carriersData?.[0]?.name || "Multiple Airlines",
      details: {
        direct: outboundFlight.legs.length === 1,
        departure: new Date(outboundFlight.departureTime).toLocaleString(),
        arrival: new Date(outboundFlight.arrivalTime).toLocaleString(),
        duration: `${Math.floor(outboundFlight.totalTime / 3600)}h ${Math.floor(
          (outboundFlight.totalTime % 3600) / 60
        )}m`,
      },
    };
  });
};

// Main function to fetch flight data
export const fetchFlightItems = async (searchParams) => {
  try {
    // First search for airport codes
    const [fromAirport, toAirport] = await Promise.all([
      searchAirport(searchParams.fromDestination),
      searchAirport(searchParams.destination),
    ]);

    if (!fromAirport || !toAirport) {
      throw new Error("Could not find one or both airports");
    }

    // Then search for flights
    const config = API_CONFIG.flights;
    const response = await fetch(
      config.endpoint({
        fromAirport: fromAirport.code,
        toAirport: toAirport.code,
        fromDate: searchParams.fromDate,
        toDate: searchParams.toDate,
      }),
      {
        headers: {
          "X-RapidAPI-Key": RAPID_API_KEY,
          "X-RapidAPI-Host": config.host,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch flight data");
    }

    return transformFlightData(data);
  } catch (error) {
    console.error("Error in fetchFlightItems:", error);
    throw error; // Re-throw to handle in the component
  }
};
