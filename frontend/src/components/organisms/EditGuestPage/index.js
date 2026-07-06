'use client';

import { useEffect, useState } from 'react';

import PageHeading from '@/components/atoms/PageHeading';
import BodyText from '@/components/atoms/BodyText';

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

  const [message, setMessage] = useState('');
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
      setMessage(validationMessage);
      return;
    }

    setIsLoading(true);

    try {
      await updateGuest(formData);

      setMessage('Guest updated successfully.');
    } catch {
      setMessage('Failed to update guest.');
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
          <BodyText>{message}</BodyText>
        </div>
      )}
    </PageLayout>
  );
}