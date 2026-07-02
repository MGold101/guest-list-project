import { API_URL } from './apiConfig';

export async function updateGuest(guest) {
  const response = await fetch(API_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(guest),
  });

  if (!response.ok) {
    throw new Error('Failed to update guest');
  }

  return response.json();
}