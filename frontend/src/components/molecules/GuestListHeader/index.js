import Button from '@/components/atoms/Button';
import PageHeading from '@/components/atoms/PageHeading';
import BodyText from '@/components/atoms/BodyText';
import SearchInput from '@/components/molecules/SearchInput';

export default function GuestListHeader({
  guestCount,
  searchTerm,
  onSearchChange,
}) {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-primary">
            Admin Dashboard
          </div>

          <PageHeading>Guest List</PageHeading>

          <BodyText>
            Manage your guests, registrations and event attendance from one
            central dashboard.
          </BodyText>
        </div>

        <Button href="/admin/add">
          Add Guest
        </Button>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[220px_1fr]">
        <div className="rounded-2xl border border-border bg-surface-muted p-6 shadow-sm">
          <p className="text-4xl font-bold text-primary">
            {guestCount}
          </p>

          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-muted">
            Guests Registered
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface-muted p-6 shadow-sm">
          <SearchInput
            value={searchTerm}
            onChange={onSearchChange}
            className="max-w-md"
          />
        </div>
      </div>
    </div>
  );
}