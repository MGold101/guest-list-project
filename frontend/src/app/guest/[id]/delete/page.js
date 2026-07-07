import DeleteGuestPage from '@/components/organisms/DeleteGuestPage';

export default async function Page({ params }) {
  const { id } = await params;

  return <DeleteGuestPage id={id} />;
}