import Navbar from '@/components/organisms/Navbar';

export default function PageLayout({
  children,
  showNavbar = true,
}) {
  return (
    <main className="min-h-screen bg-background px-6 py-8">
      <div className="mx-auto w-full max-w-5xl">
        {showNavbar && <Navbar />}

        <section className="rounded-2xl bg-surface p-8 shadow-md">
          {children}
        </section>
      </div>
    </main>
  );
}