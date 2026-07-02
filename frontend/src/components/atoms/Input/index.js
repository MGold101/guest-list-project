export default function Input({ id, name, type = 'text', value, onChange, placeholder }) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground"
    />
  );
}