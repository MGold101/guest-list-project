'use client';

import { useEffect, useState } from 'react';

import PageHeading from '@/components/atoms/PageHeading';
import Alert from '@/components/atoms/Alert';

import GuestForm from '@/components/molecules/GuestForm';
import PageLayout from '@/components/organisms/PageLayout';

import validateGuest from '@/utils/validateGuest';
import { getGuestByEmail, updateGuest } from '@/services/guestService';

export default function EditGuestPage({ email }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadGuest() {
      if (!email) {
        return;
      }

      const guest = await getGuestByEmail(email);

      if (guest) {
        setFormData({
          firstName: guest.firstName,
          lastName: guest.lastName,
          email: guest.email,
        });
      }
    }

    loadGuest();
  }, [email]);

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
      await updateGuest(formData);

      setMessage({ type: 'success', text: 'Guest updated successfully.' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to update guest.' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PageLayout>
      <PageHeading>Edit Guest</PageHeading>

      <GuestForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Update Guest"
        isLoading={isLoading}
        loadingLabel="Updating..."
      />

      {message && (
        <div className="mt-6">
          <Alert type={message.type}>{message.text}</Alert>
        </div>
      )}
    </PageLayout>
  );
}