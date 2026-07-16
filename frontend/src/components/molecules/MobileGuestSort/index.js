import Label from '@/components/atoms/Label';

export default function MobileGuestSort({
  sortConfig,
  onChange,
}) {
  const selectedValue =
    `${sortConfig.key}:${sortConfig.direction}`;

  return (
    <div className="mb-4 md:hidden">
      <Label htmlFor="guestSort">
        Sort Guests
      </Label>

      <select
        id="guestSort"
        name="guestSort"
        value={selectedValue}
        onChange={onChange}
        className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        <option value="firstName:asc">
          First name: A–Z
        </option>

        <option value="firstName:desc">
          First name: Z–A
        </option>

        <option value="lastName:asc">
          Last name: A–Z
        </option>

        <option value="lastName:desc">
          Last name: Z–A
        </option>

        <option value="email:asc">
          Email: A–Z
        </option>

        <option value="email:desc">
          Email: Z–A
        </option>
      </select>
    </div>
  );
}