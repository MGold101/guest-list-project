import Button from '@/components/atoms/Button';
import SecondaryButton from '@/components/atoms/SecondaryButton';

export default function FormActions({
  submitLabel,
  loadingLabel = 'Saving...',
  isLoading = false,
  cancelHref,
  showCancel = true,
}) {
  return (
    <div className="flex gap-3 pt-2">
      <Button type="submit" disabled={isLoading}>
        {isLoading ? loadingLabel : submitLabel}
      </Button>

      {showCancel && cancelHref && (
        <SecondaryButton href={cancelHref}>
          Cancel
        </SecondaryButton>
      )}
    </div>
  );
}