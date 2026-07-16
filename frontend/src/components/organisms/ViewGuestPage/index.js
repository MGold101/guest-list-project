'use client';

import { useEffect, useState } from 'react';

import GuestListHeader from '@/components/molecules/GuestListHeader';
import GuestTable from '@/components/molecules/GuestTable';
import PageLayout from '@/components/organisms/PageLayout';

import exportGuestsToCsv from '@/utils/exportGuestsToCsv';
import { getGuests } from '@/services/guestService';

export default function ViewGuestsPage() {
  const [guests, setGuests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadGuests() {
      const data = await getGuests();
      setGuests(data);
    }

    loadGuests();
  }, []);

  useEffect(() => {
    let pusher;
    let channel;
    let isCancelled = false;

    async function connectToPusher() {
      const pusherModule = await import('pusher-js');
      const Pusher = pusherModule.default ?? pusherModule;

      if (isCancelled) {
        return;
      }

      pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      });

      channel = pusher.subscribe('guests');

      channel.bind('guest-added', (guest) => {
        setGuests((currentGuests) => {
          const guestAlreadyExists = currentGuests.some(
            (currentGuest) => currentGuest.id === guest.id
          );

          if (guestAlreadyExists) {
            return currentGuests;
          }

          return [...currentGuests, guest];
        });
      });
    }

    connectToPusher();

    return () => {
      isCancelled = true;

      if (channel) {
        channel.unbind_all();
        channel.unsubscribe();
      }

      if (pusher) {
        pusher.disconnect();
      }
    };
  }, []);

  const filteredGuests = guests.filter((guest) => {
    const searchValue = searchTerm.toLowerCase();

    return (
      guest.firstName.toLowerCase().includes(searchValue) ||
      guest.lastName.toLowerCase().includes(searchValue) ||
      guest.email.toLowerCase().includes(searchValue)
    );
  });

  return (
    <PageLayout>
      <GuestListHeader
        guestCount={guests.length}
        searchTerm={searchTerm}
        onSearchChange={(event) => setSearchTerm(event.target.value)}
        onExport={() => exportGuestsToCsv(guests)}
        canExport={guests.length > 0}
      />

      <GuestTable guests={filteredGuests} />
    </PageLayout>
  );
}