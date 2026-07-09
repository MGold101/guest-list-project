import Navbar from '@/components/organisms/Navbar';

export default function PageLayout({
  children,
  showNavbar = true,
}) {
  return (
    <main className="min-h-screen bg-background bg-[radial-gradient(circle_at_top_left,rgba(121,208,182,0.12),transparent_35%),linear-gradient(180deg,#F4F7F5_0%,#EDF4F1_100%)] px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-5xl">
        {showNavbar && <Navbar />}

        <section className="rounded-3xl border border-border/70 bg-surface/95 p-6 shadow-xl shadow-slate-200/60 backdrop-blur sm:p-8">
          {children}
        </section>
      </div>
    </main>
  );
}