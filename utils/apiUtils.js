import { API_KEYS } from "./apiConfig";

export const fetchWithAuth = async (url, host) => {
  try {
    const response = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": API_KEYS.RAPID_API_KEY,
        "X-RapidAPI-Host": host,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `API returned ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API call failed: ${error.message}`);
    throw error;
  }
};

export const formatDate = (date) => {
  return date ? new Date(date).toISOString().split("T")[0] : "";
};

export const logError = (context, error) => {
  console.error(`❌ ${context} error:`, error);
  throw error;
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
