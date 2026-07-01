'use client';

import { useEffect, useState } from 'react';
import { getGuests } from '@/services/guestService';

export default function ViewGuestsPage() {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    async function loadGuests() {
      const data = await getGuests();
      setGuests(data);
    }

    loadGuests();
  }, []);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">View Guests</h1>

      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2 text-left">First Name</th>
            <th className="border p-2 text-left">Last Name</th>
            <th className="border p-2 text-left">Email</th>
          </tr>
        </thead>

        <tbody>
          {guests.map((guest) => (
            <tr key={guest.email}>
              <td className="border p-2">{guest.firstName}</td>
              <td className="border p-2">{guest.lastName}</td>
              <td className="border p-2">{guest.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}