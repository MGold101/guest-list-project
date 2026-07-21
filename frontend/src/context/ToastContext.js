'use client';

import {
  createContext,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

export const ToastContext = createContext(null);

const DEFAULT_DURATION = 5000;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timeoutIds = useRef(new Map());

  const removeToast = useCallback((toastId) => {
    const timeoutId = timeoutIds.current.get(toastId);

    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutIds.current.delete(toastId);
    }

    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== toastId)
    );
  }, []);

  const showToast = useCallback(
    ({
      type = 'success',
      title,
      message,
      duration = DEFAULT_DURATION,
    }) => {
      const id = crypto.randomUUID();

      const newToast = {
        id,
        type,
        title,
        message,
      };

      setToasts((currentToasts) => [
        ...currentToasts,
        newToast,
      ]);

      if (duration > 0) {
        const timeoutId = setTimeout(() => {
          removeToast(id);
        }, duration);

        timeoutIds.current.set(id, timeoutId);
      }

      return id;
    },
    [removeToast]
  );

  const contextValue = useMemo(
    () => ({
      toasts,
      showToast,
      removeToast,
    }),
    [toasts, showToast, removeToast]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
}