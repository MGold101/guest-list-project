export default function Label({ children, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-semibold text-foreground"
    >
      {children}
    </label>
  );
}