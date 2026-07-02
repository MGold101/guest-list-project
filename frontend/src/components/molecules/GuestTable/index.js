import BodyText from '@/components/atoms/BodyText';

export default function GuestTable({ guests }) {
  return (
    <table className="w-full border-collapse border border-border bg-surface rounded-lg overflow-hidden">

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

          </tr>

        ))}

      </tbody>

    </table>
  );
}