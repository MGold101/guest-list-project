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

      <div className="mt-8 overflow-hidden rounded-xl border border-border bg-surface">
        <div className="border-b border-border bg-surface-muted px-6 py-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted">
            Guest Information
          </p>

          <h2 className="mt-2 text-2xl font-bold text-foreground">
            {guest.firstName} {guest.lastName}
          </h2>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-muted">First Name</p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              {guest.firstName}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted">Last Name</p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              {guest.lastName}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm font-medium text-muted">Email</p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              {guest.email}
            </p>
          </div>
        </div>

        <div className="flex gap-3 border-t border-border bg-surface-muted px-6 py-4">
          <SecondaryButton href={`/guest/${encodeURIComponent(guest.email)}/edit`}>
            Edit Guest
          </SecondaryButton>

          <SecondaryButton href={`/guest/${encodeURIComponent(guest.email)}/delete`}>
            Delete Guest
          </SecondaryButton>

          <SecondaryButton href="/view">
            Back to Guest List
          </SecondaryButton>
        </div>
      </div>
    </PageLayout>
  );
}