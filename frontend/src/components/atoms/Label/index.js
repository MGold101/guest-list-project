export default function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-foreground mb-2">
      {children}
    </label>
  );
}