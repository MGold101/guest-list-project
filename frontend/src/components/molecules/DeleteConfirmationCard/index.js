import BodyText from '@/components/atoms/BodyText';
import Button from '@/components/atoms/Button';
import SecondaryButton from '@/components/atoms/SecondaryButton';

export default function DeleteConfirmationCard({
  guest,
  onDelete,
  isLoading,
}) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-error bg-surface shadow-sm">
      <div className="bg-red-50 px-6 py-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-error">
          Delete Confirmation
        </p>

        <h2 className="mt-3 text-2xl font-bold text-foreground">
          Delete {guest.firstName} {guest.lastName}?
        </h2>

        <div className="mt-3 max-w-2xl">
          <BodyText>
            You are about to permanently delete this guest. This action cannot
            be undone.
          </BodyText>
        </div>
      </div>

      <div className="grid gap-5 p-6">
        <div className="rounded-xl border border-border bg-surface-muted p-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted">
            Guest
          </p>

          <p className="mt-2 text-lg font-semibold text-foreground">
            {guest.firstName} {guest.lastName}
          </p>

          <p className="mt-1 break-all text-sm text-muted">
            {guest.email}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface-muted p-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted">
            Guest ID
          </p>

          <p className="mt-2 break-all text-sm font-semibold text-foreground">
            {guest.id}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="danger"
            onClick={onDelete}
            disabled={isLoading}
          >
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