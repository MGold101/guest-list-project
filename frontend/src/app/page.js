import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Guest List Manager</h1>

      <div className="grid gap-4 max-w-md">
        <Link href="/view" className="border rounded-lg p-4 hover:bg-gray-100">
          View Guests
        </Link>

        <Link href="/add" className="border rounded-lg p-4 hover:bg-gray-100">
          Add Guest
        </Link>

        <Link href="/edit" className="border rounded-lg p-4 hover:bg-gray-100">
          Edit Guest
        </Link>

        <Link href="/delete" className="border rounded-lg p-4 hover:bg-gray-100">
          Delete Guest
        </Link>
      </div>
    </main>
  );
}