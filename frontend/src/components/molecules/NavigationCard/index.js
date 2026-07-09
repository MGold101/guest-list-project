import Button from '@/components/atoms/Button';

export default function NavigationCard({
  title,
  description,
  href,
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <p className="text-xl font-bold text-foreground">
        {title}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-muted">
        {description}
      </p>

      <div className="mt-6">
        <Button href={href}>
          Continue
        </Button>
      </div>
    </div>
  );
}