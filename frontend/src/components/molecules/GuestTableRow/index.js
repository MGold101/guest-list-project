import BodyText from '@/components/atoms/BodyText';
import SecondaryButton from '@/components/atoms/SecondaryButton';

import GuestMobileCard from '@/components/molecules/GuestMobileCard';

export default function GuestTableRow({ guest, onClick }) {
  return (
    <tr
      onClick={onClick}
      className="mb-3 block cursor-pointer rounded-lg border border-border p-4 transition hover:bg-accent-soft md:mb-0 md:table-row md:rounded-none md:border-0 md:border-t"
    >
      <td className="block md:table-cell md:px-5 md:py-4">
        <GuestMobileCard guest={guest} />

        <div className="hidden md:block">
          <BodyText>{guest.firstName}</BodyText>
        </div>
      </td>

      <td className="hidden md:table-cell md:px-5 md:py-4">
        <BodyText>{guest.lastName}</BodyText>
      </td>

      <td className="hidden md:table-cell md:px-5 md:py-4">
        <BodyText>{guest.email}</BodyText>
      </td>

      <td className="hidden md:table-cell md:px-5 md:py-4">
        <div
          className="flex justify-end gap-2"
          onClick={(event) => event.stopPropagation()}
        >
          <SecondaryButton href={`/admin/guest/${encodeURIComponent(guest.id)}/edit`}>
            Edit
          </SecondaryButton>

          <SecondaryButton href={`/admin/guest/${encodeURIComponent(guest.id)}/delete`}>
            Delete
          </SecondaryButton>
        </div>
      </td>
    </tr>
  );
}