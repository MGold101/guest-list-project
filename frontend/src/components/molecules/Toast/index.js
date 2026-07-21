'use client';

import BodyText from '@/components/atoms/BodyText';

export default function Toast({
  title,
  message,
  onClose,
}) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-border border-l-4 border-l-primary bg-surface p-4 shadow-lg">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
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
        onClick={onClose}
        aria-label="Dismiss notification"
        className="rounded-md p-1 text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
      >
        ✕
      </button>
    </div>
  );
}