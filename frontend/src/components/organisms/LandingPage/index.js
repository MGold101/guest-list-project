import PageHeading from '@/components/atoms/PageHeading';
import BodyText from '@/components/atoms/BodyText';
import Button from '@/components/atoms/Button';

export default function LandingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-primary px-6">
      <div className="w-full max-w-3xl rounded-3xl bg-white p-12 text-center shadow-xl">

        <div className="mb-6 inline-flex rounded-full bg-accent-soft px-4 py-2 text-sm font-semibold text-primary">
          Guest Management
        </div>

        <PageHeading>
          Welcome to Guest List Manager
        </PageHeading>

        <div className="mx-auto mt-6 max-w-xl">
          <BodyText>
            Manage your guest list from one simple dashboard. View guests,
            add new entries and keep attendee information organised in one
            place.
          </BodyText>
        </div>

        <div className="mt-10">
          <Button href="/view">
            Enter Application
          </Button>
        </div>

      </div>
    </main>
  );
}