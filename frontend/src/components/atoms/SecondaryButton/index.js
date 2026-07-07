import Link from 'next/link';

export default function SecondaryButton({
  children,
  href,
  type = 'button',
  onClick,
  disabled = false,
}) {
  const className =
    'inline-flex items-center justify-center rounded-lg border border-secondary bg-surface px-3.5 py-2 text-sm font-semibold text-secondary shadow-sm transition hover:bg-secondary hover:text-white disabled:cursor-not-allowed disabled:opacity-50';

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