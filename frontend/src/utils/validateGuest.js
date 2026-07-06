export default function validateGuest(guest) {
  if (
    !guest.firstName.trim() ||
    !guest.lastName.trim() ||
    !guest.email.trim()
  ) {
    return 'First name, last name and email are required.';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(guest.email)) {
    return 'Please enter a valid email address.';
  }

  return '';
}