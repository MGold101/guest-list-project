export default function PageHeading({ children }) {
  return (
    <h1 className="text-4xl font-bold text-foreground mb-6">
      {children}
    </h1>
  );
}