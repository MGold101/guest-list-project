'use client';

import { useRouter } from 'next/navigation';

import BodyText from '@/components/atoms/BodyText';
import GuestTableRow from '@/components/molecules/GuestTableRow';

export default function GuestTable({ guests }) {
  const router = useRouter();

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <table className="w-full">
        <thead className="hidden bg-surface-muted md:table-header-group">
          <tr>
            <th className="px-5 py-4 text-left">
              <BodyText>First Name</BodyText>
            </th>

            <th className="px-5 py-4 text-left">
              <BodyText>Last Name</BodyText>
            </th>

            <th className="px-5 py-4 text-left">
              <BodyText>Email</BodyText>
            </th>

            <th className="px-5 py-4 text-right">
              <BodyText>Actions</BodyText>
            </th>
          </tr>
        </thead>

        <tbody className="block md:table-row-group">
          {guests.map((guest) => (
            <GuestTableRow
              key={guest.email}
              guest={guest}
              onClick={() =>
                router.push(`/guest/${encodeURIComponent(guest.email)}`)
              }
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}