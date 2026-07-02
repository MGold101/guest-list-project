import Link from 'next/link';

export default function Button({ children, href, type = 'button', onClick }) {
  const className =
    'rounded-lg bg-primary px-4 py-2 text-white text-center font-medium hover:bg-primary-hover';

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}