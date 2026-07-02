'use client';

import { useState } from 'react';

import PageHeading from '@/components/atoms/PageHeading';
import BodyText from '@/components/atoms/BodyText';
import GuestForm from '@/components/molecules/GuestForm';
import PageLayout from '@/components/organisms/PageLayout';

import { createGuest } from '@/services/guestService';

export default function AddGuestPage() {

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

      await createGuest(formData);

      setMessage('Guest added successfully.');

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
      });

    } catch {

      setMessage('Failed to add guest.');

    }

  }

  return (
    <PageLayout>

      <PageHeading>
        Add Guest
      </PageHeading>

      <GuestForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      {message && (
        <div className="mt-6">
          <BodyText>{message}</BodyText>
        </div>
      )}

    </PageLayout>
  );
}