import Link from 'next/link';

export default function Button({
  children,
  href,
  type = 'button',
  onClick,
  disabled = false,
}) {
  const className =
    'rounded-lg bg-primary px-4 py-2 text-white text-center font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed';

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
}