import GuestDetailsPage from '@/components/organisms/GuestDetailsPage';

export default async function Page({ params }) {
  const { id } = await params;

  return <GuestDetailsPage id={id} />;
}