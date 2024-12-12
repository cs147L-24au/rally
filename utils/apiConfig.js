export const API_KEYS = {
  RAPID_API_KEY: "c30f614dd9mshdc0825b274e36a9p10eafcjsn3362b1f0563c",
};

export const API_CONFIG = {
  flights: {
    host: "booking-com15.p.rapidapi.com",
    endpoint: {
      search: (params) =>
        `https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights?fromId=${params.fromAirport}&toId=${params.toAirport}&departDate=${params.fromDate}&returnDate=${params.toDate}&sort=BEST&cabinClass=ECONOMY&currency_code=USD`,
      airportSearch: (query) =>
        `https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination?query=${encodeURIComponent(
          query
        )}`,
    },
  },
  stays: {
    host: "sky-scanner3.p.rapidapi.com",
    endpoint: {
      search: (params) =>
        `https://sky-scanner3.p.rapidapi.com/hotels/search?entityId=${params.entityId}&checkin=${params.fromDate}&checkout=${params.toDate}&adults=1`,
      locationSearch: (query) =>
        `https://sky-scanner3.p.rapidapi.com/hotels/auto-complete?query=${encodeURIComponent(
          query
        )}`,
    },
  },
  activities: {
    host: "tripadvisor-com1.p.rapidapi.com",
    endpoint: {
      search: (params) =>
        `https://tripadvisor-com1.p.rapidapi.com/attractions/search?geoId=${params.geoId}&units=miles&sortType=asc&startDate=${params.fromDate}&endDate=${params.toDate}`,
      locationSearch: (query) =>
        `https://tripadvisor-com1.p.rapidapi.com/auto-complete?query=${encodeURIComponent(
          query
        )}`,
    },
  },
};

export const DEFAULT_IMAGES = {
  FLIGHT:
    "https://content.skyscnr.com/m/3719e8f4a5daf43d/original/Flights-Placeholder.jpg",
  STAY: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  ACTIVITY: "https://images.unsplash.com/photo-1533105079780-92b9be482077",
};
