'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import PageHeading from '@/components/atoms/PageHeading';
import Alert from '@/components/atoms/Alert';
import LoginForm from '@/components/molecules/LoginForm';
import PageLayout from '@/components/organisms/PageLayout';

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

      localStorage.setItem('isAdminLoggedIn', 'true');
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
    <PageLayout showNavbar={false}>
      <PageHeading>Admin Login</PageHeading>

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
    </PageLayout>
  );
}