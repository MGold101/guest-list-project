import Button from '@/components/atoms/Button';
import SecondaryButton from '@/components/atoms/SecondaryButton';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';

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

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>

        <SecondaryButton href="/">
          Back
        </SecondaryButton>
      </div>
    </form>
  );
}