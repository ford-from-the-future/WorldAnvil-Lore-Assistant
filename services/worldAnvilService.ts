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

  const r = await fetch(`/api/boromir/world/${encodeURIComponent(worldId)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ appKey, authToken })
  });

  if (!r.ok) {
    const body = await r.text();
    throw new Error(`World Anvil proxy error: ${r.status} ${r.statusText} — ${body}`);
  }
  return r.json();
};

