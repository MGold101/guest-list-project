'use client';

import { useEffect, useState } from 'react';

import PageHeading from '@/components/atoms/PageHeading';
import BodyText from '@/components/atoms/BodyText';
import Button from '@/components/atoms/Button';
import SecondaryButton from '@/components/atoms/SecondaryButton';

export default function GuestConfirmationPage() {
  const [guest, setGuest] = useState(null);

  useEffect(() => {
    const storedGuest = sessionStorage.getItem('registeredGuest');

    if (storedGuest) {
      setGuest(JSON.parse(storedGuest));
    }
  }, []);

  if (!guest) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background bg-[radial-gradient(circle_at_top_left,rgba(121,208,182,0.12),transparent_35%),linear-gradient(135deg,#F4F7F5_0%,#E7F3EF_100%)] px-6 py-10">
        <section className="w-full max-w-xl rounded-3xl border border-border/70 bg-surface p-8 text-center shadow-2xl shadow-slate-300/50 sm:p-10">
          <PageHeading>No Registration Found</PageHeading>

          <BodyText>
            We could not find any recently submitted guest details. Please
            return to the guest registration page and complete the form.
          </BodyText>

          <div className="mt-8">
            <Button href="/guest/signup">
              Go to Guest Sign Up
            </Button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background bg-[radial-gradient(circle_at_top_left,rgba(121,208,182,0.12),transparent_35%),linear-gradient(135deg,#F4F7F5_0%,#E7F3EF_100%)] px-6 py-10">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border/70 bg-surface shadow-2xl shadow-slate-300/50 md:grid-cols-[1fr_1.1fr]">
        <div className="hidden bg-navbar p-10 text-white md:flex md:flex-col md:justify-between">
          <div>
            <div className="mb-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-navbar-muted">
              Registration Confirmed
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Thank you for confirming your attendance.
            </h1>

            <p className="mt-5 text-base leading-relaxed text-navbar-muted">
              Your details have been added to the guest list successfully.
            </p>
          </div>

          <p className="text-sm text-navbar-muted">
            Guest List Manager
          </p>
        </div>

        <div className="p-8 sm:p-10">
          <div className="mb-8">
            <div className="mb-3 inline-flex rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-primary md:hidden">
              Registration Confirmed
            </div>

            <PageHeading>Thank You for Signing Up</PageHeading>

            <BodyText>
              Your registration is complete. A confirmation email will be sent
              to you shortly.
            </BodyText>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl border border-border bg-surface-muted p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-muted">
                Guest Name
              </p>

              <p className="mt-2 text-xl font-bold text-foreground">
                {guest.firstName} {guest.lastName}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface-muted p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-muted">
                Email Address
              </p>

              <p className="mt-2 break-all text-base font-semibold text-foreground">
                {guest.email}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface-muted p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-muted">
                Registration ID
              </p>

              <p className="mt-2 break-all text-sm font-semibold text-foreground">
                {guest.id}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/">
              Return to Home
            </Button>

            <SecondaryButton href="/guest">
              Guest Welcome Page
            </SecondaryButton>
          </div>
        </div>
      </section>
    </main>
  );
}