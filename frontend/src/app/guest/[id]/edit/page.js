import EditGuestPage from '@/components/organisms/EditGuestPage';

export default async function Page({ params }) {
  const { id } = await params;

  return <EditGuestPage id={id} />;
}