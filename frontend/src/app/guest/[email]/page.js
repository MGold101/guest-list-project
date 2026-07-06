import GuestDetailsPage from '@/components/organisms/GuestDetailsPage';

export default async function Page({ params }) {
  const { email } = await params;

  return <GuestDetailsPage email={email} />;
}