import Link from 'next/link';

export default function SecondaryButton({
  children,
  href,
  type = 'button',
  onClick,
  disabled = false,
}) {
  const className =
    'rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-background-secondary disabled:cursor-not-allowed disabled:opacity-50';

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