import { API_URL } from './apiConfig';

export async function getGuests() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch guests');
  }

  const data = await response.json();
  return data.guests || [];
}