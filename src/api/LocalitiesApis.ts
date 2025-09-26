export const BACKEND_URL = process.env.REACT_APP_API_BASE_URL;

export async function getStates() {
  const response = await fetch(`${BACKEND_URL}/localities/states`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch states');
  }

  return response.json();
}

export async function getCities() {
  const response = await fetch(`${BACKEND_URL}/localities/cities`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch cities');
  }

  return response.json();
}

export async function getAreas() {
  const response = await fetch(`${BACKEND_URL}/localities/areas`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch areas');
  }

  return response.json();
}

export async function getPincodes() {
  const response = await fetch(`${BACKEND_URL}/localities/pincodes`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch pincodes');
  }

  return response.json();
}

export async function getAllLocalities() {
  const [states, cities, areas, pincodes] = await Promise.all([
    getStates(),
    getCities(),
    getAreas(),
    getPincodes(),
  ]);

  return {
    states,
    cities,
    areas,
    pincodes,
  };
}
