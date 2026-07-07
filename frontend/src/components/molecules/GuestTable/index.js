import BodyText from '@/components/atoms/BodyText';
import SecondaryButton from '@/components/atoms/SecondaryButton';

export default function GuestTable({ guests }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <table className="w-full border-collapse">
        <thead className="bg-surface-muted">
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

        <tbody>
          {guests.map((guest) => (
            <tr
              key={guest.email}
              className="border-t border-border transition hover:bg-accent-soft"
            >
              <td className="px-5 py-4">
                <BodyText>{guest.firstName}</BodyText>
              </td>

              <td className="px-5 py-4">
                <BodyText>{guest.lastName}</BodyText>
              </td>

              <td className="px-5 py-4">
                <BodyText>{guest.email}</BodyText>
              </td>

              <td className="px-5 py-4">
                <div className="flex justify-end gap-2">
                  <SecondaryButton href={`/guest/${encodeURIComponent(guest.email)}`}>
                    View
                  </SecondaryButton>

                  <SecondaryButton href={`/guest/${encodeURIComponent(guest.email)}/edit`}>
                    Edit
                  </SecondaryButton>

                  <SecondaryButton href={`/guest/${encodeURIComponent(guest.email)}/delete`}>
                    Delete
                  </SecondaryButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}