import PageHeading from '@/components/atoms/PageHeading';
import BodyText from '@/components/atoms/BodyText';
import Button from '@/components/atoms/Button';
import SecondaryButton from '@/components/atoms/SecondaryButton';

export default function GuestWelcomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background bg-[radial-gradient(circle_at_top_left,rgba(121,208,182,0.2),transparent_35%),linear-gradient(135deg,#F4F7F5_0%,#E7F3EF_100%)] px-6 py-10">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border/70 bg-surface shadow-2xl shadow-slate-300/50 md:grid-cols-[1fr_1.1fr]">
        <div className="hidden bg-navbar p-10 text-white md:flex md:flex-col md:justify-between">
          <div>
            <div className="mb-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-navbar-muted">
              Guest Invitation
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              You're invited.
            </h1>

            <p className="mt-5 text-base leading-relaxed text-navbar-muted">
              Confirm your attendance by completing the guest registration
              form. It should only take a moment.
            </p>
          </div>

          <p className="text-sm text-navbar-muted">
            Guest List Manager
          </p>
        </div>

        <div className="p-8 sm:p-10">
          <div className="mb-8">
            <div className="mb-3 inline-flex rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-primary md:hidden">
              Guest Invitation
            </div>

            <PageHeading>Welcome</PageHeading>

            <BodyText>
              You have been invited to attend the event. Enter your details to
              confirm your attendance and join the guest list.
            </BodyText>
          </div>

          <div className="rounded-2xl border border-border bg-surface-muted p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted">
              What happens next?
            </p>

            <div className="mt-4 grid gap-3 text-sm leading-relaxed text-foreground">
              <p>1. Enter your name and email address.</p>
              <p>2. Review and confirm your details.</p>
              <p>3. Receive a confirmation email.</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/guest/signup">
              Confirm Attendance
            </Button>

            <SecondaryButton href="/">
              Back
            </SecondaryButton>
          </div>
        </div>
      </section>
    </main>
  );
}