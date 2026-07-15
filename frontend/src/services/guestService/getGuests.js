export async function getGuests() {
  const response = await fetch('/api/admin/guests', {
    cache: 'no-store',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch guests');
  }

  return data.guests || [];
}