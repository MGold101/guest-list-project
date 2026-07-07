'use client';

import { useEffect, useState } from 'react';

import GuestListHeader from '@/components/molecules/GuestListHeader';
import GuestTable from '@/components/molecules/GuestTable';
import SearchInput from '@/components/molecules/SearchInput';
import PageLayout from '@/components/organisms/PageLayout';

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
      <GuestListHeader />

      <SearchInput
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <GuestTable guests={filteredGuests} />
    </PageLayout>
  );
}