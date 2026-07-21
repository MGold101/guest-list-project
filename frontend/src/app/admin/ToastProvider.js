'use client';

import AdminRealtimeProvider from './AdminRealtimeProvider';

import ToastContainer from '@/components/molecules/ToastContainer';
import { ToastProvider } from '@/context/ToastContext';

export default function AdminToastProvider({ children }) {
  return (
    <ToastProvider>
      <AdminRealtimeProvider>
        <ToastContainer />
        {children}
      </AdminRealtimeProvider>
    </ToastProvider>
  );
}