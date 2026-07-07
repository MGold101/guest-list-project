export default function GuestMobileCard({ guest }) {
  return (
    <div className="md:hidden">
      <p className="text-lg font-semibold text-foreground">
        {guest.firstName} {guest.lastName}
      </p>

      <p className="mt-1 break-all text-sm text-muted">
        {guest.email}
      </p>
    </div>
  );
}