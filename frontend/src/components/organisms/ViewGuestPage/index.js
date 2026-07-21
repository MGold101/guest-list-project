'use client';

import { useEffect, useState } from 'react';

import GuestListHeader from '@/components/molecules/GuestListHeader';
import GuestTable from '@/components/molecules/GuestTable';
import PageLayout from '@/components/organisms/PageLayout';

import useAdminRealtime from '@/hooks/useAdminRealtime';
import { getGuests } from '@/services/guestService';
import exportGuestsToCsv from '@/utils/exportGuestsToCsv';

export default function ViewGuestsPage() {
  const [guests, setGuests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'firstName',
    direction: 'asc',
  });

  const { latestGuestEvent } = useAdminRealtime();

  useEffect(() => {
    async function loadGuests() {
      const data = await getGuests();
      setGuests(data);
    }

    loadGuests();
  }, []);

  useEffect(() => {
    if (!latestGuestEvent) {
      return;
    }

    setGuests((currentGuests) => {
      switch (latestGuestEvent.type) {
        case 'guest-added': {
          const newGuest = latestGuestEvent.guest;

          const guestAlreadyExists = currentGuests.some(
            (guest) => guest.id === newGuest.id
          );

          if (guestAlreadyExists) {
            return currentGuests;
          }

          return [...currentGuests, newGuest];
        }

        case 'guest-updated': {
          const updatedGuest = latestGuestEvent.guest;

          return currentGuests.map((guest) =>
            guest.id === updatedGuest.id
              ? updatedGuest
              : guest
          );
        }

        case 'guest-deleted': {
          const deletedGuestId =
            latestGuestEvent.guestId;

          return currentGuests.filter(
            (guest) => guest.id !== deletedGuestId
          );
        }

        default:
          return currentGuests;
      }
    });
  }, [latestGuestEvent]);

  function handleSort(key) {
    setSortConfig((currentConfig) => {
      if (currentConfig.key !== key) {
        return {
          key,
          direction: 'asc',
        };
      }

      return {
        key,
        direction:
          currentConfig.direction === 'asc'
            ? 'desc'
            : 'asc',
      };
    });
  }

  function handleMobileSortChange(event) {
    const [key, direction] =
      event.target.value.split(':');

    setSortConfig({
      key,
      direction,
    });
  }

  const filteredGuests = guests.filter((guest) => {
    const searchValue = searchTerm.toLowerCase();

    return (
      guest.firstName
        .toLowerCase()
        .includes(searchValue) ||
      guest.lastName
        .toLowerCase()
        .includes(searchValue) ||
      guest.email
        .toLowerCase()
        .includes(searchValue)
    );
  });

  const sortedGuests = [...filteredGuests].sort(
    (firstGuest, secondGuest) => {
      const firstValue =
        firstGuest[sortConfig.key] || '';
      const secondValue =
        secondGuest[sortConfig.key] || '';

      const comparison = firstValue.localeCompare(
        secondValue,
        undefined,
        {
          sensitivity: 'base',
        }
      );

      return sortConfig.direction === 'asc'
        ? comparison
        : -comparison;
    }
  );

  return (
    <PageLayout>
      <GuestListHeader
        guestCount={guests.length}
        searchTerm={searchTerm}
        onSearchChange={(event) =>
          setSearchTerm(event.target.value)
        }
        onExport={() => exportGuestsToCsv(guests)}
        canExport={guests.length > 0}
      />

      <GuestTable
        guests={sortedGuests}
        sortConfig={sortConfig}
        onSort={handleSort}
        onMobileSortChange={handleMobileSortChange}
      />
    </PageLayout>
  );
}