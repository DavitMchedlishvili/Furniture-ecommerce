'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const initialLocale = pathname.split('/')[1] || 'en';
  const [locale, setLocale] = useState<string>(initialLocale);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setLocale(pathname.split('/')[1] || 'en'); // Recalculate locale when the pathname changes
  }, [pathname]);

  const handleLocaleChange = (newLocale: string) => {
    setLocale(newLocale);
    router.push(`/${newLocale}${pathname.slice(3)}`);
    localStorage.setItem('preferredLocale', newLocale);
    setIsDropdownOpen(false); // Close the dropdown after selecting a language
  };

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="px-2 py-1 bg-transparent border-2 border-black   "
      >
        {locale.toUpperCase()}
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right- mt-2 w-30 bg-white border-2 border-black shadow-lg z-10">
          <button
            onClick={() => handleLocaleChange('en')}
            className="w-full text-left px-2 py-1 text text-gray-700 hover:bg-gray-100"
          >
            EN
          </button>
          <button
            onClick={() => handleLocaleChange('ka')}
            className="w-full text-left px-2 py-1 text text-gray-700 hover:bg-gray-100"
          >
            KA
          </button>
        </div>
      )}
    </div>
  );
}


