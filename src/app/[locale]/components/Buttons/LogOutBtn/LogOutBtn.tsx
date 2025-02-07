import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
  // Import the useTranslation hook

const LogOutBtn = () => {

    const locale = useLocale();
    const t = useTranslations();  // Use the useTranslation hook for translations
    
    const handleLogout = async () => {
        const response = await fetch(`/${locale}/api/logout`, {
          method: "POST",
        });
    
        const data = await response.json();

        if (!response.ok) {
          console.log('Logout failed. Error message:', data.message);
        } else {
          console.log('Logout successful:', data.message);
          // Redirect to the login page
          window.location.href = `/${locale}/login`; 
        }
      };

  return (
    <button 
      className='w-full text-left px-2 py-2 text-sm text-black hover:bg-gray-100 block dark:bg-slate-800 dark:hover:bg-slate-500' 
      onClick={handleLogout}
    >
      {t('logOutBtn.logout')}  {/* Use translation key for Log Out */}
    </button>
  );
};

export default LogOutBtn;

