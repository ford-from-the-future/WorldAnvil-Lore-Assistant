/**
 * Fetches the entire world data from the World Anvil Boromir API.
 * This function makes a live API call to the GET /world endpoint.
 * @param appKey - The user's application key.
 * @param authToken - The user's auth token.
 * @param worldId - The ID of the world to fetch.
 * @returns A promise that resolves to the JSON object representing the world data.
 */
export const fetchWorldData = async (
  appKey: string,
  authToken: string,
  worldId: string
): Promise<any> => {
  
  if (!appKey || !authToken || !worldId) {
    throw new Error('World Anvil API keys and World ID are required.');
  }

  const url = `https://www.worldanvil.com/api/external/boromir/world/${worldId}?granularity=1`;

  console.log(`Fetching world data from: ${url}`);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-application-key': appKey,
        'x-auth-token': authToken,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
       const errorBody = await response.json().catch(() => ({ message: 'No error details available.' }));
       const errorMessage = errorBody?.message || `${response.status} ${response.statusText}`;
      throw new Error(`Failed to fetch from World Anvil API: ${errorMessage}`);
    }

    const data = await response.json();
    console.log("Successfully fetched world data.");
    return data;

  } catch (error) {
    console.error("Error fetching from World Anvil:", error);
    // Re-throw the error so the UI component can catch it and display a message
    throw error;
  }
};
