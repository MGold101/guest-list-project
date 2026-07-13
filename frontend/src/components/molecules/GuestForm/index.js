import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import FormActions from '@/components/molecules/FormActions';

export default function GuestForm({
  formData,
  onChange,
  onSubmit,
  submitLabel = 'Add Guest',
  isLoading = false,
  loadingLabel = 'Saving...',
  showCancel = true,
  cancelHref = '/admin/view',
}) {
  return (
    <form onSubmit={onSubmit} className="grid gap-5">
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

      <FormActions
        submitLabel={submitLabel}
        loadingLabel={loadingLabel}
        isLoading={isLoading}
        showCancel={showCancel}
        cancelHref={cancelHref}
      />
    </form>
  );
}