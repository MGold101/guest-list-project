'use client';

import { useEffect, useState } from 'react';

import BodyText from '@/components/atoms/BodyText';

const DISPLAY_DURATION = 3000;
const ANIMATION_DURATION = 300;

export default function Toast({
  title,
  message,
  onClose,
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the entrance animation
    requestAnimationFrame(() => {
      setIsVisible(true);
    });

    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
    }, DISPLAY_DURATION);

    const removeTimeout = setTimeout(() => {
      onClose();
    }, DISPLAY_DURATION + ANIMATION_DURATION);

    return () => {
      clearTimeout(hideTimeout);
      clearTimeout(removeTimeout);
    };
  }, [onClose]);

  function handleClose() {
    setIsVisible(false);

    setTimeout(() => {
      onClose();
    }, ANIMATION_DURATION);
  }

  return (
    <div
      className={`
        flex items-start gap-4 rounded-xl border border-border border-l-4 border-l-primary
        bg-surface p-4 shadow-lg
        transform transition-all duration-300 ease-out
        ${
          isVisible
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0'
        }
      `}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
        ✓
      </div>

      <div className="flex-1">
        {title && (
          <h3 className="text-base font-semibold text-primary">
            {title}
          </h3>
        )}

        {message && (
          <div className="mt-1">
            <BodyText>{message}</BodyText>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={handleClose}
        aria-label="Dismiss notification"
        className="rounded-md p-1 text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
      >
        ✕
      </button>
    </div>
  );
}