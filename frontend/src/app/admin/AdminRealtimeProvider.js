'use client';

import { useEffect } from 'react';

import {
  AdminRealtimeProvider as RealtimeContextProvider,
} from '@/context/AdminRealtimeContext';
import useAdminRealtime from '@/hooks/useAdminRealtime';
import useToast from '@/hooks/useToast';

function AdminRealtimeListener({ children }) {
  const { publishGuestEvent } = useAdminRealtime();
  const { showToast } = useToast();

  useEffect(() => {
    let pusher;
    let channel;
    let isCancelled = false;

    async function connectToPusher() {
      const pusherModule = await import('pusher-js');
      const Pusher = pusherModule.default ?? pusherModule;

      if (isCancelled) {
        return;
      }

      pusher = new Pusher(
        process.env.NEXT_PUBLIC_PUSHER_KEY,
        {
          cluster:
            process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
        }
      );

      channel = pusher.subscribe('guests');

      channel.bind('guest-added', (guestEvent) => {
        const { source, ...guest } = guestEvent;

        publishGuestEvent({
          type: 'guest-added',
          guest,
        });

        if (source === 'guest-signup') {
          showToast({
            title: 'New Guest Signup',
            message: `${guest.firstName} ${guest.lastName} has signed up.`,
          });
        }
      });

      channel.bind('guest-updated', (guest) => {
        publishGuestEvent({
          type: 'guest-updated',
          guest,
        });
      });

      channel.bind('guest-deleted', ({ id }) => {
        publishGuestEvent({
          type: 'guest-deleted',
          guestId: id,
        });
      });
    }

    connectToPusher();

    return () => {
      isCancelled = true;

      if (channel) {
        channel.unbind_all();
        pusher.unsubscribe('guests');
      }

      if (pusher) {
        pusher.disconnect();
      }
    };
  }, [publishGuestEvent, showToast]);

  return children;
}

export default function AdminRealtimeProvider({
  children,
}) {
  return (
    <RealtimeContextProvider>
      <AdminRealtimeListener>
        {children}
      </AdminRealtimeListener>
    </RealtimeContextProvider>
  );
}