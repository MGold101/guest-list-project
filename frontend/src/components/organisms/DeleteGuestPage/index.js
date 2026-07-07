'use client';

import { useEffect, useState } from 'react';

import PageHeading from '@/components/atoms/PageHeading';
import BodyText from '@/components/atoms/BodyText';
import Alert from '@/components/atoms/Alert';
import Button from '@/components/atoms/Button';
import SecondaryButton from '@/components/atoms/SecondaryButton';

import PageLayout from '@/components/organisms/PageLayout';

import { deleteGuest, getGuestByEmail } from '@/services/guestService';

export default function DeleteGuestPage({ email }) {
  const [guest, setGuest] = useState(null);
  const [message, setMessage] = useState(null);
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
      setMessage({ type: 'error', text: 'Guest email is required.' });
      return;
    }

    setIsLoading(true);

    try {
      await deleteGuest(guest.email);
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
        <div className="mt-8 overflow-hidden rounded-xl border border-error bg-surface">
          <div className="border-b border-error bg-red-50 px-6 py-4">
            <p className="text-sm font-semibold text-error">
              Delete Confirmation
            </p>
          </div>

          <div className="grid gap-5 p-6">
            <BodyText>
              You are about to permanently delete this guest. This action cannot be undone.
            </BodyText>

            <div className="rounded-lg border border-border bg-surface-muted p-4">
              <p className="text-sm text-muted">Guest</p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                {guest.firstName} {guest.lastName}
              </p>
              <p className="mt-1 text-sm text-muted">{guest.email}</p>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleDelete} disabled={isLoading}>
                {isLoading ? 'Deleting...' : 'Delete Guest'}
              </Button>

              <SecondaryButton href="/view">
                Cancel
              </SecondaryButton>
            </div>
          </div>
        </div>
      ) : (
        <BodyText>No guest selected.</BodyText>
      )}

      {message && (
        <div className="mt-6">
          <Alert type={message.type}>{message.text}</Alert>
        </div>
      )}
    </PageLayout>
  );
}