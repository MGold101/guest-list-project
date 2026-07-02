import { API_URL } from './apiConfig';

export async function createGuest(guest) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(guest),
  });

  if (!response.ok) {
    throw new Error('Failed to create guest');
  }

  return response.json();
}