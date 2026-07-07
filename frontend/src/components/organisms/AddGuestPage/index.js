'use client';

import { useState } from 'react';

import PageHeading from '@/components/atoms/PageHeading';
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
    } catch {
      setMessage({ type: 'error', text: 'Failed to add guest.' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PageLayout>
      <PageHeading>Add Guest</PageHeading>

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