import PageHeading from '@/components/atoms/PageHeading';
import BodyText from '@/components/atoms/BodyText';
import NavigationCard from '@/components/molecules/NavigationCard';

export default function LandingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background bg-[radial-gradient(circle_at_top_left,_rgba(121,208,182,0.28),_transparent_35%),linear-gradient(135deg,_#F4F7F5_0%,_#E7F3EF_100%)] px-6 py-10">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border/70 bg-surface shadow-2xl shadow-slate-300/50 md:grid-cols-[1fr_1.1fr]">
        <div className="hidden bg-navbar p-10 text-white md:flex md:flex-col md:justify-between">
          <div>
            <div className="mb-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-navbar-muted">
              Guest List Manager
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              One place to manage guests and registrations.
            </h1>

            <p className="mt-5 text-base leading-relaxed text-navbar-muted">
              Choose the right flow for managing an event or confirming your
              attendance as a guest.
            </p>
          </div>

          <p className="text-sm text-navbar-muted">
            Admin and guest access
          </p>
        </div>

        <div className="p-8 sm:p-10">
          <div className="mb-8">
            <PageHeading>Welcome</PageHeading>

            <BodyText>
              Continue as an admin to manage the guest list, or enter the guest
              flow to confirm your attendance.
            </BodyText>
          </div>

          <div className="grid gap-5">
            <NavigationCard
              title="Admin Dashboard"
              description="Sign in to manage guests, update details and keep your guest list organised."
              href="/admin/login"
            />

            <NavigationCard
              title="Guest Sign Up"
              description="Confirm your attendance by entering your details through the guest registration flow."
              href="/guest"
            />
          </div>
        </div>
      </section>
    </main>
  );
}