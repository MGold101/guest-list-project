export default function Input({
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-accent-soft"
    />
  );
}