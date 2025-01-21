'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const initialLocale = pathname.split('/')[1] || 'en';
  const [locale, setLocale] = useState<string>(initialLocale);

  useEffect(() => {
    setLocale(pathname.split('/')[1] || 'en'); // Directly recalculate here to avoid dependency issues
  }, [pathname]);

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    setLocale(newLocale);
    router.push(`/${newLocale}${pathname.slice(3)}`);
    localStorage.setItem('preferredLocale', newLocale);
  };

  return (
    <select
      value={locale}
      onChange={handleLocaleChange}
      className="border-2 bg-transparent border-black py-1.5 w-15"
    >
      <option value="en">EN</option>
      <option value="ka">KA</option>
    </select>
  );
}

