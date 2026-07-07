'use client';

import { useEffect, useState } from 'react';

import PageHeading from '@/components/atoms/PageHeading';
import BodyText from '@/components/atoms/BodyText';
import Alert from '@/components/atoms/Alert';
import SecondaryButton from '@/components/atoms/SecondaryButton';
import DeleteConfirmationCard from '@/components/molecules/DeleteConfirmationCard';
import PageLayout from '@/components/organisms/PageLayout';

import { deleteGuest, getGuestById } from '@/services/guestService';

export default function DeleteGuestPage({ id }) {
  const [guest, setGuest] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadGuest() {
      if (!id) {
        return;
      }

      const data = await getGuestById(id);
      setGuest(data);
    }

    loadGuest();
  }, [id]);

  async function handleDelete() {
    if (!guest?.id) {
      setMessage({ type: 'error', text: 'Guest ID is required.' });
      return;
    }

    setIsLoading(true);

    try {
      await deleteGuest(guest.id);
      setMessage({ type: 'success', text: 'Guest deleted successfully.' });
      setGuest(null);
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete guest.' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PageLayout>
      <PageHeading>Delete Guest</PageHeading>

      {guest ? (
        <DeleteConfirmationCard
          guest={guest}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      ) : (
        <BodyText>No guest selected.</BodyText>
      )}

      {message && (
        <div className="mt-6 grid gap-4">
          <Alert type={message.type}>{message.text}</Alert>

          {message.type === 'success' && (
            <SecondaryButton href="/view">
              Back to Guest List
            </SecondaryButton>
          )}
        </div>
      )}
    </PageLayout>
  );
}