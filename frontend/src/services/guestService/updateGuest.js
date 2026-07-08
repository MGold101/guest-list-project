import { API_URL } from './apiConfig';

export async function updateGuest(guest) {
  const response = await fetch(API_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(guest),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to update guest');
  }

  return data;
}