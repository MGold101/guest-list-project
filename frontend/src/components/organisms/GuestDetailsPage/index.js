'use client';

import { useEffect, useState } from 'react';

import PageHeading from '@/components/atoms/PageHeading';
import GuestDetailsCard from '@/components/molecules/GuestDetailsCard';
import PageLayout from '@/components/organisms/PageLayout';

import { getGuestById } from '@/services/guestService';

export default function GuestDetailsPage({ id }) {
  const [guest, setGuest] = useState(null);

  useEffect(() => {
    async function loadGuest() {
      const data = await getGuestById(id);
      setGuest(data);
    }

    loadGuest();
  }, [id]);

  if (!guest) {
    return (
      <PageLayout>
        <PageHeading>Guest Not Found</PageHeading>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHeading>Guest Details</PageHeading>

      <GuestDetailsCard guest={guest} />
    </PageLayout>
  );
}