const API_URL = 'https://vsdqezf300.execute-api.eu-west-2.amazonaws.com/prod';

export async function getGuests() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch guests');
  }

  const data = await response.json();
  return data.guests || [];
}

export async function createGuest(guest) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(guest),
  });

  if (!response.ok) {
    throw new Error('Failed to create guest');
  }

  return response.json();
}

export async function deleteGuest(email) {
  const response = await fetch(API_URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to delete guest');
  }

  return response.json();
}

export async function updateGuest(guest) {
  const response = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(guest),
  });

  if (!response.ok) {
    throw new Error('Failed to update guest');
  }

  return response.json();
}