import Navbar from '@/components/organisms/Navbar';

export default function PageLayout({
  children,
  showNavbar = true,
}) {
  return (
    <main className="min-h-screen flex justify-center p-8">
      <div className="w-full max-w-5xl">

        {showNavbar && <Navbar />}

        {children}

      </div>
    </main>
  );
}