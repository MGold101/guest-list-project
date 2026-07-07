import { getGuests } from './getGuests';

export async function getGuestById(id) {
  const guests = await getGuests();

  return guests.find((guest) => guest.id === id);
}