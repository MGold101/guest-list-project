'use client';

import { useEffect, useState } from 'react';

import PageHeading from '@/components/atoms/PageHeading';
import GuestDetailsCard from '@/components/molecules/GuestDetailsCard';
import PageLayout from '@/components/organisms/PageLayout';

import { getGuestByEmail } from '@/services/guestService';

export default function GuestDetailsPage({ email }) {
  const [guest, setGuest] = useState(null);

  useEffect(() => {
    async function loadGuest() {
      const data = await getGuestByEmail(email);
      setGuest(data);
    }

    loadGuest();
  }, [email]);

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