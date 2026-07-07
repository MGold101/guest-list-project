import Button from '@/components/atoms/Button';
import PageHeading from '@/components/atoms/PageHeading';

export default function GuestListHeader() {
  return (
    <div className="mb-6 flex items-center justify-between">
      <PageHeading>Guest List</PageHeading>

      <Button href="/add">
        Add Guest
      </Button>
    </div>
  );
}