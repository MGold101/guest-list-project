import Button from '@/components/atoms/Button';
import BodyText from '@/components/atoms/BodyText';

export default function NavigationCard({
  title,
  description,
  href,
}) {
  return (
    <div className="rounded-xl bg-surface border border-border p-6 shadow-sm">
      <BodyText>{description}</BodyText>

      <div className="mt-4">
        <Button href={href}>{title}</Button>
      </div>
    </div>
  );
}