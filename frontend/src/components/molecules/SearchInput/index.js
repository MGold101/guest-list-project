import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';

export default function SearchInput({
  value,
  onChange,
  className = 'mb-6 max-w-md',
}) {
  return (
    <div className={className}>
      <Label htmlFor="guestSearch">Search Guests</Label>

      <Input
        id="guestSearch"
        name="guestSearch"
        value={value}
        onChange={onChange}
        placeholder="Search by name or email"
      />
    </div>
  );
}