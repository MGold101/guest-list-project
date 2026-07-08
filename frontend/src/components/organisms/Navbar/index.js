import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="mb-12 rounded-2xl bg-navbar px-8 py-5 shadow-md">
      <div className="flex items-center justify-between">
        <Link href="/view" className="text-xl font-bold tracking-tight text-white">
          Guest List Manager
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/admin/view"
            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-navbar-muted transition hover:bg-white/10 hover:text-white"
          >
            Guest List
          </Link>

          <Link
            href="/admin/add"
            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-navbar-muted transition hover:bg-white/10 hover:text-white"
          >
            Add Guest
          </Link>
        </nav>
      </div>
    </header>
  );
}