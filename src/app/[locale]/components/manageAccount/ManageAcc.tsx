'use client';

import { useLocale } from 'next-intl';
import { useState } from 'react';

export default function Account() {

  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);

  const handleManageSubscription = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`api/create-portal-session`, {
        method: 'POST',
      });
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <button onClick={handleManageSubscription} disabled={isLoading} className='w-full mt-5 py-2 text-black bg-transparent border-2 border-black hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-500'>
        {isLoading ? 'Loading...' : 'Manage Subscription'}
      </button>
  
  );
}