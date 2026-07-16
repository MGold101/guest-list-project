function escapeCsvValue(value) {
  const stringValue = String(value ?? '');

  if (
    stringValue.includes(',') ||
    stringValue.includes('"') ||
    stringValue.includes('\n')
  ) {
    return `"${stringValue.replaceAll('"', '""')}"`;
  }

  return stringValue;
}

export default function exportGuestsToCsv(guests) {
  const headers = [
    'Guest ID',
    'First Name',
    'Last Name',
    'Email',
  ];

  const rows = guests.map((guest) => [
    guest.id,
    guest.firstName,
    guest.lastName,
    guest.email,
  ]);

  const csvContent = [
    headers,
    ...rows,
  ]
    .map((row) => row.map(escapeCsvValue).join(','))
    .join('\n');

  const blob = new Blob([csvContent], {
    type: 'text/csv;charset=utf-8;',
  });

  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = downloadUrl;
  link.download = 'guest-list.csv';

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(downloadUrl);
}