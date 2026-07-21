'use client';

import BodyText from '@/components/atoms/BodyText';

export default function Toast({
  title,
  message,
  onClose,
}) {
  return (
    <div className="rounded-lg bg-white shadow-lg border border-gray-200 p-4 flex items-start gap-3">
      <div className="flex-1">
        {title && (
          <h3 className="font-semibold">
            {title}
          </h3>
        )}

        {message && (
          <BodyText>
            {message}
          </BodyText>
        )}
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss notification"
        className="text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
    </div>
  );
}