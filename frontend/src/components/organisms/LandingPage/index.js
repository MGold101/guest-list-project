import PageHeading from '@/components/atoms/PageHeading';
import NavigationCard from '@/components/molecules/NavigationCard';
import PageLayout from '@/components/organisms/PageLayout';

export default function LandingPage() {
  return (
    <PageLayout showHomeButton={false}>

      <PageHeading>
        Guest List Manager
      </PageHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        <NavigationCard
          title="View Guests"
          description="View all guests currently stored in the database."
          href="/view"
        />

        <NavigationCard
          title="Add Guest"
          description="Register a new guest."
          href="/add"
        />

        <NavigationCard
          title="Edit Guest"
          description="Update an existing guest."
          href="/edit"
        />

        <NavigationCard
          title="Delete Guest"
          description="Remove a guest from the database."
          href="/delete"
        />

      </div>

    </PageLayout>
  );
}