import Link from 'next/link';

import PageHeading from '@/components/atoms/PageHeading';
import BodyText from '@/components/atoms/BodyText';

export default function GuestSignupClosedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background bg-[radial-gradient(circle_at_top_left,rgba(121,208,182,0.12),transparent_35%),linear-gradient(135deg,#F4F7F5_0%,#E7F3EF_100%)] px-6 py-10">
      <section className="w-full max-w-xl rounded-3xl border border-border/70 bg-surface p-8 text-center shadow-2xl shadow-slate-300/50 sm:p-10">
        <div className="mb-4 inline-flex rounded-full bg-accent-soft px-4 py-2 text-sm font-semibold text-primary">
          Guest Registration
        </div>

        <PageHeading>Sorry, registration is closed</PageHeading>

        <div className="mt-4">
          <BodyText>
            The maximum number of guests has been reached, so we are no longer
            accepting registrations.
          </BodyText>
        </div>

        <div className="mt-8">
          <Link
            href="/guest"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Return to guest page
          </Link>
        </div>
      </section>
    </main>
  );
}