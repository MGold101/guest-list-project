import { useEffect, useRef } from 'react';

export default function useGuestUpdates(
  setGuests,
  onGuestAdded
) {
  const handledGuestIds = useRef(new Set());

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

      channel.bind('guest-added', (guest) => {
        setGuests((currentGuests) => {
          const guestAlreadyExists =
            currentGuests.some(
              (currentGuest) =>
                currentGuest.id === guest.id
            );

          if (guestAlreadyExists) {
            return currentGuests;
          }

          return [...currentGuests, guest];
        });

        if (!handledGuestIds.current.has(guest.id)) {
          handledGuestIds.current.add(guest.id);
          onGuestAdded?.(guest);
        }
      });
    }

    connectToPusher();

    return () => {
      isCancelled = true;

      if (channel) {
        channel.unbind_all();
        channel.unsubscribe();
      }

      if (pusher) {
        pusher.disconnect();
      }
    };
  }, [setGuests, onGuestAdded]);
}