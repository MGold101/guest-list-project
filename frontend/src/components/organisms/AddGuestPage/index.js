'use client';

import { useState } from 'react';
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

      setMessage('Guest added successfully');

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
      });
    } catch (error) {
      setMessage('Failed to add guest');
    }
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Add Guest</h1>

      <form onSubmit={handleSubmit} className="grid gap-4 max-w-md">
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First name"
          className="border p-2 rounded"
        />

        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last name"
          className="border p-2 rounded"
        />

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded"
        />

        <button type="submit" className="border p-2 rounded hover:bg-gray-100">
          Add Guest
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}