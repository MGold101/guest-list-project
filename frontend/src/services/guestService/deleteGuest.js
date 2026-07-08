import { API_URL } from './apiConfig';

export async function deleteGuest(id) {
  const response = await fetch(API_URL, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete guest');
  }

  return data;
}