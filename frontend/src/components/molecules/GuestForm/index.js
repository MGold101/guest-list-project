import Button from '@/components/atoms/Button';
import SecondaryButton from '@/components/atoms/SecondaryButton';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';

export default function GuestForm({
  formData,
  onChange,
  onSubmit,
  submitLabel = 'Add Guest',
  isLoading = false,
  loadingLabel = 'Saving...',
  showCancel = true,
}) {
  return (
    <form onSubmit={onSubmit} className="grid max-w-xl gap-5">
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
          placeholder="Enter first name"
        />
      </div>

      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
          placeholder="Enter last name"
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="text"
          value={formData.email}
          onChange={onChange}
          placeholder="Enter email address"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? loadingLabel : submitLabel}
        </Button>

        {showCancel && (
          <SecondaryButton href="/admin/view">
            Cancel
          </SecondaryButton>
        )}
      </div>
    </form>
  );
}