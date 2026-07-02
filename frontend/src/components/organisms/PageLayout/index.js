import Button from '@/components/atoms/Button';

export default function PageLayout({
  children,
  showHomeButton = true,
}) {
  return (
    <main className="min-h-screen flex justify-center p-8">
      <div className="w-full max-w-5xl">

        {children}

        {showHomeButton && (
          <div className="mt-8">
            <Button href="/">
              Return Home
            </Button>
          </div>
        )}

      </div>
    </main>
  );
}