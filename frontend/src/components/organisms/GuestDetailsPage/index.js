'use client';

import { useEffect, useState } from 'react';

import PageHeading from '@/components/atoms/PageHeading';
import BodyText from '@/components/atoms/BodyText';
import SecondaryButton from '@/components/atoms/SecondaryButton';
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

      <div className="rounded-lg border border-border bg-surface p-6">
        <BodyText>First Name: {guest.firstName}</BodyText>
        <BodyText>Last Name: {guest.lastName}</BodyText>
        <BodyText>Email: {guest.email}</BodyText>

        <div className="mt-6 flex gap-3">
          <SecondaryButton href={`/guest/${encodeURIComponent(guest.email)}/edit`}>
            Edit
          </SecondaryButton>

          <SecondaryButton href={`/guest/${encodeURIComponent(guest.email)}/delete`}>
            Delete
          </SecondaryButton>
        </div>
      </div>
    </PageLayout>
  );
}