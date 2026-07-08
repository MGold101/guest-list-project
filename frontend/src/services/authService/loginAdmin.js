import { API_URL } from '@/services/guestService/apiConfig';

export async function loginAdmin(credentials) {
  const response = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to log in');
  }

  return data;
}