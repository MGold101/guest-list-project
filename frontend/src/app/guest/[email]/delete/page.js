import DeleteGuestPage from '@/components/organisms/DeleteGuestPage';

export default async function Page({ params }) {
  const { email } = await params;

  return <DeleteGuestPage email={email} />;
}