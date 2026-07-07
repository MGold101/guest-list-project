'use client';

import { useEffect, useState } from 'react';

import PageHeading from '@/components/atoms/PageHeading';
import Alert from '@/components/atoms/Alert';

import GuestForm from '@/components/molecules/GuestForm';
import PageLayout from '@/components/organisms/PageLayout';

import validateGuest from '@/utils/validateGuest';
import { getGuestById, updateGuest } from '@/services/guestService';

export default function EditGuestId({ id }) {
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadGuest() {
      if (!id) {
        return;
      }

      const guest = await getGuestById(id);

      if (guest) {
        setFormData({
          id: guest.id,
          firstName: guest.firstName,
          lastName: guest.lastName,
          email: guest.email,
        });
      }
    }

    loadGuest();
  }, [id]);

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