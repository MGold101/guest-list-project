'use client';

import { useContext } from 'react';

import AdminRealtimeContext from '@/context/AdminRealtimeContext';

export default function useAdminRealtime() {
  const context = useContext(AdminRealtimeContext);

  if (!context) {
    throw new Error(
      'useAdminRealtime must be used inside an AdminRealtimeProvider'
    );
  }

  return context;
}