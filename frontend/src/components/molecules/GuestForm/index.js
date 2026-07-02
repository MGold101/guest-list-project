import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import Button from '@/components/atoms/Button';

export default function GuestForm({
  formData,
  onChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="grid gap-4 max-w-md">

      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
        />
      </div>

      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
        />
      </div>

      <Button type="submit">
        Add Guest
      </Button>

    </form>
  );
}