'use client';

import { useRouter } from 'next/navigation';

import BodyText from '@/components/atoms/BodyText';
import Button from '@/components/atoms/Button';

import GuestTableRow from '@/components/molecules/GuestTableRow';
import MobileGuestSort from '@/components/molecules/MobileGuestSort';
import SortableTableHeader from '@/components/molecules/SortableTableHeader';

export default function GuestTable({
  guests,
  sortConfig,
  onSort,
  onMobileSortChange,
}) {
  const router = useRouter();

  if (guests.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface-muted px-6 py-10 text-center">
        <p className="text-lg font-semibold text-foreground">
          No guests found
        </p>

        <div className="mx-auto mt-2 max-w-md">
          <BodyText>
            Add your first guest or adjust your search to find matching results.
          </BodyText>
        </div>

        <div className="mt-6">
          <Button href="/admin/add">
            Add Guest
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <MobileGuestSort
        sortConfig={sortConfig}
        onChange={onMobileSortChange}
      />

      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <table className="w-full">
          <thead className="hidden bg-surface-muted md:table-header-group">
            <tr>
              <SortableTableHeader
                label="First Name"
                sortKey="firstName"
                sortConfig={sortConfig}
                onSort={onSort}
              />

              <SortableTableHeader
                label="Last Name"
                sortKey="lastName"
                sortConfig={sortConfig}
                onSort={onSort}
              />

              <SortableTableHeader
                label="Email"
                sortKey="email"
                sortConfig={sortConfig}
                onSort={onSort}
              />

              <th className="px-5 py-4 text-right">
                <BodyText>Actions</BodyText>
              </th>
            </tr>
          </thead>

          <tbody className="block md:table-row-group">
            {guests.map((guest) => (
              <GuestTableRow
                key={guest.id}
                guest={guest}
                onClick={() =>
                  router.push(
                    `/admin/guest/${encodeURIComponent(guest.id)}`
                  )
                }
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}