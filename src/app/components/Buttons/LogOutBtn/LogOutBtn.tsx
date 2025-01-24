import { useLocale } from 'next-intl';
import React from 'react'

const LogOutBtn = () => {

    const locale = useLocale();
    
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
    <button className='w-full text-left px-2 py-2 text-sm text-black hover:bg-gray-100 block' onClick={handleLogout} >Log Out</button>
  )
}

export default LogOutBtn
