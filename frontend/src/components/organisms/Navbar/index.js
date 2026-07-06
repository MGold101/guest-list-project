import Button from '@/components/atoms/Button';

export default function Navbar() {
  return (
    <header className="mb-8 flex items-center justify-between border-b border-border pb-4">

      <div className="text-xl font-semibold text-primary">
        Guest List Manager
      </div>

      <div className="flex gap-4">
        <Button href="/view">
          Guest List
        </Button>

        <Button href="/add">
          Add Guest
        </Button>
      </div>

    </header>
  );
}