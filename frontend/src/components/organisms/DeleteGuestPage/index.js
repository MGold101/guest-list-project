'use client';

import { useEffect, useState } from 'react';

import PageHeading from '@/components/atoms/PageHeading';
import BodyText from '@/components/atoms/BodyText';
import Button from '@/components/atoms/Button';

import PageLayout from '@/components/organisms/PageLayout';

import { deleteGuest, getGuestByEmail } from '@/services/guestService';

export default function DeleteGuestPage({ email }) {
  const [guest, setGuest] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadGuest() {
      if (!email) {
        return;
      }

      const data = await getGuestByEmail(email);
      setGuest(data);
    }

    loadGuest();
  }, [email]);

  async function handleDelete() {
    if (!guest?.email) {
      setMessage('Guest email is required.');
      return;
    }

    setIsLoading(true);

    try {
      await deleteGuest(guest.email);
      setMessage('Guest deleted successfully.');
      setGuest(null);
    } catch {
      setMessage('Failed to delete guest.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PageLayout>
      <PageHeading>Delete Guest</PageHeading>

      {guest ? (
        <div className="rounded-lg border border-border bg-surface p-6">
          <BodyText>
            Are you sure you want to delete {guest.firstName} {guest.lastName}?
          </BodyText>

          <div className="mt-4">
            <BodyText>Email: {guest.email}</BodyText>
          </div>

          <div className="mt-6">
            <Button onClick={handleDelete} disabled={isLoading}>
              {isLoading ? 'Deleting...' : 'Delete Guest'}
            </Button>
          </div>
        </div>
      ) : (
        <BodyText>No guest selected.</BodyText>
      )}

      {message && (
        <div className="mt-6">
          <BodyText>{message}</BodyText>
        </div>
      )}
    </PageLayout>
  );
}