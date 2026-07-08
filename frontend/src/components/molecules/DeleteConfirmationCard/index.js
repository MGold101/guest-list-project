import BodyText from '@/components/atoms/BodyText';
import Button from '@/components/atoms/Button';
import SecondaryButton from '@/components/atoms/SecondaryButton';

export default function DeleteConfirmationCard({
  guest,
  onDelete,
  isLoading,
}) {
  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-error bg-surface">
      <div className="border-b border-error bg-surface-muted px-6 py-4">
        <p className="text-sm font-semibold text-error">
          Delete Confirmation
        </p>
      </div>

      <div className="grid gap-5 p-6">
        <BodyText>
          You are about to permanently delete this guest. This action cannot be undone.
        </BodyText>

        <div className="rounded-lg border border-border bg-surface-muted p-4">
          <p className="text-sm text-muted">Guest ID</p>

          <p className="mt-1 break-all text-sm font-semibold text-foreground">
            {guest.id}
          </p>

          <div className="mt-4">
            <p className="text-sm text-muted">Guest</p>

            <p className="mt-1 text-lg font-semibold text-foreground">
              {guest.firstName} {guest.lastName}
            </p>

            <p className="mt-1 text-sm text-muted">
              {guest.email}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={onDelete} disabled={isLoading}>
            {isLoading ? 'Deleting...' : 'Delete Guest'}
          </Button>

          <SecondaryButton href="/admin/view">
            Cancel
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}