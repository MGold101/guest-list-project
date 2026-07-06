import { getGuests } from './getGuests';

export async function getGuestByEmail(email) {
  const guests = await getGuests();

  return guests.find((guest) => guest.email === decodeURIComponent(email));
}