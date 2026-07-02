'use client';

import { useState } from 'react';

import PageHeading from '@/components/atoms/PageHeading';
import BodyText from '@/components/atoms/BodyText';

import GuestForm from '@/components/molecules/GuestForm';
import PageLayout from '@/components/organisms/PageLayout';

import { updateGuest } from '@/services/guestService';

export default function EditGuestPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [message, setMessage] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await updateGuest(formData);

      setMessage('Guest updated successfully.');

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
      });
    } catch {
      setMessage('Failed to update guest.');
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
      />

      {message && (
        <div className="mt-6">
          <BodyText>{message}</BodyText>
        </div>
      )}
    </PageLayout>
  );
}