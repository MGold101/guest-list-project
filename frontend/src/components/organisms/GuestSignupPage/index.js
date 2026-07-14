'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import PageHeading from '@/components/atoms/PageHeading';
import BodyText from '@/components/atoms/BodyText';
import Alert from '@/components/atoms/Alert';
import GuestForm from '@/components/molecules/GuestForm';

import validateGuest from '@/utils/validateGuest';
import { createGuest } from '@/services/guestService';

export default function GuestSignupPage() {
  const router = useRouter();

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

    setMessage(null);

    const validationMessage = validateGuest(formData);

    if (validationMessage) {
      setMessage({
        type: 'error',
        text: validationMessage,
      });

      return;
    }

    setIsLoading(true);

    try {
      const data = await createGuest({
        ...formData,
        source: 'guest-signup',
      });

      sessionStorage.setItem(
        'registeredGuest',
        JSON.stringify(data.guest)
      );

      router.push('/guest/confirmation');
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
    <main className="flex min-h-screen items-center justify-center bg-background bg-[radial-gradient(circle_at_top_left,rgba(121,208,182,0.12),transparent_35%),linear-gradient(135deg,#F4F7F5_0%,#E7F3EF_100%)] px-6 py-10">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border/70 bg-surface shadow-2xl shadow-slate-300/50 md:grid-cols-[1fr_1.1fr]">
        <div className="hidden bg-navbar p-10 text-white md:flex md:flex-col md:justify-between">
          <div>
            <div className="mb-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-navbar-muted">
              Guest Registration
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Confirm your place on the guest list.
            </h1>

            <p className="mt-5 text-base leading-relaxed text-navbar-muted">
              Enter your contact details so the event organiser can confirm
              your attendance and keep you informed.
            </p>
          </div>

          <p className="text-sm text-navbar-muted">
            Guest List Manager
          </p>
        </div>

        <div className="p-8 sm:p-10">
          <div className="mb-8">
            <div className="mb-3 inline-flex rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-primary md:hidden">
              Guest Registration
            </div>

            <PageHeading>Enter Your Details</PageHeading>

            <BodyText>
              Complete the form below to confirm your attendance.
            </BodyText>
          </div>

          <GuestForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitLabel="Confirm Attendance"
            loadingLabel="Confirming..."
            isLoading={isLoading}
            cancelHref="/guest"
          />

          {message && (
            <div className="mt-6">
              <Alert type={message.type}>{message.text}</Alert>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}