import { API_URL } from './apiConfig';

export async function deleteGuest(id) {
  const response = await fetch(API_URL, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error('Failed to delete guest');
  }

  return response.json();
}