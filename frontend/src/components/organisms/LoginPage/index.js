'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import PageHeading from '@/components/atoms/PageHeading';
import BodyText from '@/components/atoms/BodyText';
import Alert from '@/components/atoms/Alert';
import LoginForm from '@/components/molecules/LoginForm';

import { loginAdmin } from '@/services/authService';

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage(null);

    if (!formData.username.trim() || !formData.password.trim()) {
      setMessage({
        type: 'error',
        text: 'Username and password are required.',
      });
      return;
    }

    setIsLoading(true);

    try {
      await loginAdmin(formData);

      localStorage.setItem('adminUsername', formData.username);
      router.push('/admin/view');
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background bg-[radial-gradient(circle_at_top_left,rgba(121,208,182,0.25),transparent_35%),linear-gradient(135deg,#F4F7F5_0%,#E7F3EF_100%)] px-6 py-10">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border/70 bg-surface shadow-2xl shadow-slate-300/50 md:grid-cols-[1fr_1.1fr]">
        <div className="hidden bg-navbar p-10 text-white md:flex md:flex-col md:justify-between">
          <div>
            <div className="mb-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-navbar-muted">
              Admin Portal
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Manage your guest list with confidence.
            </h1>

            <p className="mt-5 text-base leading-relaxed text-navbar-muted">
              Sign in to access the admin dashboard, manage guests and keep
              event information organised.
            </p>
          </div>

          <p className="text-sm text-navbar-muted">
            Guest List Manager
          </p>
        </div>

        <div className="p-8 sm:p-10">
          <div className="mb-8">
            <PageHeading>Admin Login</PageHeading>

            <BodyText>
              Enter your admin credentials to continue to the dashboard.
            </BodyText>
          </div>

          <LoginForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />

          {message && (
            <div className="mt-6">
              <Alert type={message.type}>{message.text}</Alert>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}