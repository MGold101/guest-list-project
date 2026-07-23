'use client';

import { usePathname } from 'next/navigation';
import AdminRealtimeProvider from './AdminRealtimeProvider';

import ToastContainer from '@/components/molecules/ToastContainer';
import { ToastProvider } from '@/context/ToastContext';

export default function AdminToastProvider({ children }) {
  const pathname = usePathname();
  const isAdminLogin = pathname === '/admin/login';

  if (isAdminLogin) {
    return <>{children}</>;
  }

  return (
    <ToastProvider>
      <AdminRealtimeProvider>
        <ToastContainer />
        {children}
      </AdminRealtimeProvider>
    </ToastProvider>
  );
}