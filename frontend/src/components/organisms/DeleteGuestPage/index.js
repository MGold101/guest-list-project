'use client';

import { useState } from 'react';

import PageHeading from '@/components/atoms/PageHeading';
import BodyText from '@/components/atoms/BodyText';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';

import PageLayout from '@/components/organisms/PageLayout';

import { deleteGuest } from '@/services/guestService';

export default function DeleteGuestPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await deleteGuest(email);
      setMessage('Guest deleted successfully.');
      setEmail('');
    } catch {
      setMessage('Failed to delete guest.');
    }
  }

  return (
    <PageLayout>
      <PageHeading>Delete Guest</PageHeading>

      <form onSubmit={handleSubmit} className="grid gap-4 max-w-md">
        <div>
          <Label htmlFor="email">Guest Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="guest@example.com"
          />
        </div>

        <Button type="submit">Delete Guest</Button>
      </form>

      {message && (
        <div className="mt-6">
          <BodyText>{message}</BodyText>
        </div>
      )}
    </PageLayout>
  );
}