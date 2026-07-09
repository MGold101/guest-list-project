import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import FormActions from '@/components/molecules/FormActions';

export default function LoginForm({
  formData,
  onChange,
  onSubmit,
  isLoading = false,
}) {
  return (
    <form onSubmit={onSubmit} className="grid max-w-xl gap-5">
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          value={formData.username}
          onChange={onChange}
          placeholder="Enter username"
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={onChange}
          placeholder="Enter password"
        />
      </div>

      <FormActions
        submitLabel="Login"
        loadingLabel="Logging in..."
        isLoading={isLoading}
        cancelHref="/"
      />
    </form>
  );
}