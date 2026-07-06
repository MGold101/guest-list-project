'use client';

import { useEffect, useState } from 'react';

import Button from '@/components/atoms/Button';
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
      <div className="mb-6 flex items-center justify-between">
        <PageHeading>
          Guest List
        </PageHeading>

        <Button href="/add">
          Add Guest
        </Button>
      </div>

      <GuestTable guests={guests} />
    </PageLayout>
  );
}