import Link from 'next/link';

export default function Button({
  children,
  href,
  type = 'button',
  onClick,
  disabled = false,
  variant = 'primary',
}) {
  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary-hover',

    danger:
      'bg-error text-white hover:opacity-90',
  };

  const className = `
    inline-flex items-center justify-center
    rounded-lg
    px-5 py-2.5
    text-sm font-semibold
    shadow-sm
    transition
    disabled:cursor-not-allowed
    disabled:opacity-50
    ${variants[variant]}
  `;

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