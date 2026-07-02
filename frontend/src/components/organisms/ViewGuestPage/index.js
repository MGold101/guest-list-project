'use client';

import { useEffect, useState } from 'react';

import PageHeading from '@/components/atoms/PageHeading';
import GuestTable from '@/components/molecules/GuestTable';
import PageLayout from '@/components/organisms/PageLayout';

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
    <PageLayout>

      <PageHeading>
        View Guests
      </PageHeading>

      <GuestTable guests={guests} />

    </PageLayout>
  );
}