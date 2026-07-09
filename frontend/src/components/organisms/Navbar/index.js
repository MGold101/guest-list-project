'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const dropdownRef = useRef(null);

  const [username, setUsername] = useState('Admin');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('adminUsername');

    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminUsername');
    router.push('/admin/login');
  }

  return (
    <header className="mb-12 rounded-2xl bg-navbar px-8 py-5 shadow-md">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/view"
          className="text-xl font-bold tracking-tight text-white"
        >
          Guest List Manager
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/admin/view"
            className="hidden rounded-lg px-5 py-2.5 text-sm font-semibold text-navbar-muted transition hover:bg-white/10 hover:text-white sm:inline-flex"
          >
            Guest List
          </Link>

          <Link
            href="/admin/add"
            className="hidden rounded-lg px-5 py-2.5 text-sm font-semibold text-navbar-muted transition hover:bg-white/10 hover:text-white sm:inline-flex"
          >
            Add Guest
          </Link>

          <div ref={dropdownRef} className="relative ml-3">
            <button
              type="button"
              onClick={() => setIsDropdownOpen((currentValue) => !currentValue)}
              className="rounded-lg px-5 py-2.5 text-sm font-semibold text-navbar-muted transition hover:bg-white/10 hover:text-white"
            >
              {username} ▾
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 w-40 rounded-lg bg-white py-2 shadow-lg">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm font-medium text-foreground transition-colors hover:bg-red-50 hover:text-error"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}