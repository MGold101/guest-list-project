export default function Alert({ type = 'success', children }) {
  const styles =
    type === 'error'
      ? 'border-error bg-red-50 text-error'
      : 'border-success bg-green-50 text-success';

  return (
    <div className={`rounded-lg border px-4 py-3 text-sm font-medium ${styles}`}>
      {children}
    </div>
  );
}