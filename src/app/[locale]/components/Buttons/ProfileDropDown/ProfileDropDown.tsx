import { Link } from "@/i18n/routing";
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import { useLocale } from "next-intl";

const ProfileDropDown = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // Track the login status
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track the dropdown visibility
  const locale = useLocale();

  useEffect(() => {
    // Fetch authentication status when the component mounts
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`/${locale}/api/status`);
        const data = await response.json();

        // Update the login status based on the response
        if (data.authenticated) {
          setIsUserLoggedIn(true);
        } else {
          setIsUserLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
      }
    };

    checkAuthStatus(); // Call the function on mount
  }, [locale]); // Re-run the effect if `locale` changes

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState); // Toggle the dropdown visibility
  };

  return (
    <div className="relative inline-block top-1">
      <button
        id="avatar-icon"
        className="focus:outline-none"
        onClick={toggleDropdown}
      >
        <Image className="border-2 border-black" src="/assets/avatar.png" alt="Avatar" width={37} height={38} />
      </button>

      {/* Dropdown Menu */}
      <div
        id="dropdown-menu"
        className={`absolute   w-[80px] bg-white border-2 border-black  shadow-lg ${isDropdownOpen ? '' : 'hidden'}`}
      >
        {isUserLoggedIn ? (
          // Options for logged-in users
          <>
            <Link
              href="/profile"
              className="px-2 py-1 text-sm text-black hover:bg-gray-100 block dark:bg-slate-700 dark:hover:bg-slate-500"
            >
              Profile
            </Link>
            <LogOutBtn />
          </>
        ) : (
          // Options for logged-out users
          <>
            <Link
              href="/login"
              className="px-2 py-1 text-sm text-black hover:bg-gray-100 block dark:bg-slate-700 dark:hover:bg-slate-500"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="px-2 py-1 text-sm text-black hover:bg-gray-100 block dark:bg-slate-700 dark:hover:bg-slate-500"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileDropDown;
