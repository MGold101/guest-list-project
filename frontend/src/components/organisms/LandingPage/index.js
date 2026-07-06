import PageHeading from '@/components/atoms/PageHeading';
import BodyText from '@/components/atoms/BodyText';
import Button from '@/components/atoms/Button';

import PageLayout from '@/components/organisms/PageLayout';

export default function LandingPage() {
  return (
    <PageLayout
      showNavbar={false}
    >
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center text-center">

        <PageHeading>
          Guest List Manager
        </PageHeading>

        <div className="mt-4">
          <BodyText>
            Welcome to the Guest List Manager. Use this application to view,
            add, edit and manage your guests.
          </BodyText>
        </div>

        <div className="mt-10">
          <Button href="/view">
            Enter
          </Button>
        </div>

      </div>
    </PageLayout>
  );
}