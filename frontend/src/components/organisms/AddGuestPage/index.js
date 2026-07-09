'use client';

import { useState } from 'react';

import PageHeading from '@/components/atoms/PageHeading';
import BodyText from '@/components/atoms/BodyText';
import Alert from '@/components/atoms/Alert';
import GuestForm from '@/components/molecules/GuestForm';
import PageLayout from '@/components/organisms/PageLayout';

import validateGuest from '@/utils/validateGuest';
import { createGuest } from '@/services/guestService';

export default function AddGuestPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationMessage = validateGuest(formData);

    if (validationMessage) {
      setMessage({ type: 'error', text: validationMessage });
      return;
    }

    setIsLoading(true);

    try {
      await createGuest(formData);

      setMessage({ type: 'success', text: 'Guest added successfully.' });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PageLayout>
      <div className="mb-8">
        <div className="mb-3 inline-flex rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-primary">
          Admin Dashboard
        </div>

        <PageHeading>Add Guest</PageHeading>

        <BodyText>
          Enter a guest&apos;s details to add them to the admin guest list.
        </BodyText>
      </div>

      <GuestForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Add Guest"
        isLoading={isLoading}
        loadingLabel="Adding..."
      />

      {message && (
        <div className="mt-6">
          <Alert type={message.type}>{message.text}</Alert>
        </div>
      )}
    </PageLayout>
  );
}