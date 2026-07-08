import { API_URL } from './apiConfig';

export async function createGuest(guest) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(guest),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to create guest');
  }

  return data;
}