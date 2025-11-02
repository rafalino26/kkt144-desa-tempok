'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PotensiTabsClient() {
  const pathname = usePathname() ?? ''; // null-safe

  const isPeternakan = pathname.startsWith('/potensi/peternakan');
  const isPertanian = !isPeternakan;

  return (
    <div className="flex justify-center border-b border-gray-200 -mt-5 pb-2">
      <div className="flex gap-6">
        <TabLink href="/potensi" active={isPertanian} label="Pertanian" />
        <TabLink href="/potensi/peternakan" active={isPeternakan} label="Peternakan" />
      </div>
    </div>
  );
}

function TabLink({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`px-5 py-2 text-sm font-medium rounded-t-md border-b-2 transition-colors ${
        active
          ? 'text-brand-dark border-brand-dark'
          : 'text-gray-500 border-transparent hover:text-ink hover:border-gray-300'
      }`}
    >
      {label}
    </Link>
  );
}
