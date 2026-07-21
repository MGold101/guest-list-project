'use client';

import {
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';

const AdminRealtimeContext = createContext(null);

export function AdminRealtimeProvider({ children }) {
  const [latestGuestEvent, setLatestGuestEvent] =
    useState(null);

  const publishGuestEvent = useCallback((event) => {
    setLatestGuestEvent({
      ...event,
      eventId: crypto.randomUUID(),
    });
  }, []);

  const value = useMemo(
    () => ({
      latestGuestEvent,
      publishGuestEvent,
    }),
    [latestGuestEvent, publishGuestEvent]
  );

  return (
    <AdminRealtimeContext.Provider value={value}>
      {children}
    </AdminRealtimeContext.Provider>
  );
}

export default AdminRealtimeContext;