const API_URL = 'https://vsdqezf300.execute-api.eu-west-2.amazonaws.com/prod';

export async function getGuests() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch guests');
  }

  const data = await response.json();
  return data.guests || [];
}