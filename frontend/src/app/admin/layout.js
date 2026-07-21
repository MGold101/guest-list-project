import AdminToastProvider from './ToastProvider';

export default function AdminLayout({ children }) {
  return (
    <AdminToastProvider>
      {children}
    </AdminToastProvider>
  );
}