import Button from '@/components/atoms/Button';
import SecondaryButton from '@/components/atoms/SecondaryButton';

export default function GuestDetailsCard({ guest }) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="bg-surface-muted px-6 py-6">
        <div className="inline-flex rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-primary">
          Guest Profile
        </div>

        <h2 className="mt-4 text-3xl font-bold text-foreground">
          {guest.firstName} {guest.lastName}
        </h2>

        <p className="mt-2 break-all text-base text-muted">
          {guest.email}
        </p>
      </div>

      <div className="grid gap-4 p-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface-muted p-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted">
            First Name
          </p>

          <p className="mt-2 text-lg font-semibold text-foreground">
            {guest.firstName}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface-muted p-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted">
            Last Name
          </p>

          <p className="mt-2 text-lg font-semibold text-foreground">
            {guest.lastName}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface-muted p-4 md:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted">
            Email
          </p>

          <p className="mt-2 break-all text-lg font-semibold text-foreground">
            {guest.email}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface-muted p-4 md:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted">
            Guest ID
          </p>

          <p className="mt-2 break-all text-sm font-semibold text-foreground">
            {guest.id}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-border bg-surface-muted px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3">
          <Button href={`/admin/guest/${guest.id}/edit`}>
            Edit Guest
          </Button>

          <SecondaryButton href="/admin/view">
            Back to Guest List
          </SecondaryButton>
        </div>

        <Button
          href={`/admin/guest/${guest.id}/delete`}
          variant="danger"
        >
          Delete Guest
        </Button>
      </div>
    </div>
  );
}