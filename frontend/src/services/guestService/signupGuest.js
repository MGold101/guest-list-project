import { API_URL } from './apiConfig';

export async function getSignupStatus() {
  const response = await fetch(`${API_URL}/guest/signup-status`, {
    method: 'GET',
    cache: 'no-store',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to check guest signup availability'
    );
  }

  return data;
}

export async function signupGuest(guest) {
  const response = await fetch(`${API_URL}/guest/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(guest),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to register guest');
  }

  return data;
}