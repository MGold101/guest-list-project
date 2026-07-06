import EditGuestPage from '@/components/organisms/EditGuestPage';

export default async function Page({ params }) {
  const { email } = await params;

  return <EditGuestPage email={email} />;
}