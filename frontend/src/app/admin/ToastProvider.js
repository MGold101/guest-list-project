'use client';

import { ToastProvider } from '@/context/ToastContext';
import ToastContainer from '@/components/molecules/ToastContainer';

export default function AdminToastProvider({ children }) {
  return (
    <ToastProvider>
      <ToastContainer />
      {children}
    </ToastProvider>
  );
}