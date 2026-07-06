import BodyText from '@/components/atoms/BodyText';
import SecondaryButton from '@/components/atoms/SecondaryButton';

export default function GuestTable({ guests }) {
  return (
    <table className="w-full overflow-hidden rounded-lg border border-border border-collapse bg-surface">

      <thead>
        <tr>
          <th className="border border-border p-3 text-left">
            <BodyText>First Name</BodyText>
          </th>

          <th className="border border-border p-3 text-left">
            <BodyText>Last Name</BodyText>
          </th>

          <th className="border border-border p-3 text-left">
            <BodyText>Email</BodyText>
          </th>

          <th className="border border-border p-3 text-left">
            <BodyText>Actions</BodyText>
          </th>
        </tr>
      </thead>

      <tbody>

        {guests.map((guest) => (

          <tr key={guest.email}>

            <td className="border border-border p-3">
              <BodyText>{guest.firstName}</BodyText>
            </td>

            <td className="border border-border p-3">
              <BodyText>{guest.lastName}</BodyText>
            </td>

            <td className="border border-border p-3">
              <BodyText>{guest.email}</BodyText>
            </td>

            <td className="border border-border p-3">
              <div className="flex gap-2">
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
  );
}