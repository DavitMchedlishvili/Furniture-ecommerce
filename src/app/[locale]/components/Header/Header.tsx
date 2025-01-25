"use client"

import logo from "../../../../../public/assets/logo.png";
import Image from "next/image";
import ThemeSwitcher from "../Buttons/ThemeSwitcher/ThemeSwitcher";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../Buttons/LanguageSwitcher/LanguageSwitcher";
import { Link } from "@/i18n/routing";
import ProfileDropDown from "../Buttons/ProfileDropDown/ProfileDropDown";


export const Header = () => {
  const t = useTranslations('Header');
  // Get the current locale

  return (
    <header
      id="header"
      className="w-full z-50 fixed bg-transparent hover:bg-white transition-all duration-700 shadow-md text-black dark:hover:bg-slate-800"
    >
      <div className="container m-auto w-full flex justify-between mx-auto p-4">
        <Link href={"/"} className="flex items-end">
          <Image src={logo.src} width={30} height={30} alt="JORKO Logo" />
          <p className="text-lg pt-1">JORKO</p>
        </Link>
        <nav className="w-[40%] flex justify-between items-center">
          <Link
            className="border-b-2 border-transparent hover:border-black transition-all duration-300"
            href={"/products"}
          >
            {t('Products')}
          </Link>
          <Link
            className="border-b-2 border-transparent hover:border-black transition-all duration-300"
            href={"#"}
          >
            Exhibition
          </Link>
          <Link
            className="border-b-2 border-transparent hover:border-black transition-all duration-300"
            href={"#"}
          >
            Blog
          </Link>
          <Link
            className="border-b-2 border-transparent hover:border-black transition-all duration-300"
            href={"#"}
          >
            About Us
          </Link>
          <Link
            className="border-b-2 border-transparent hover:border-black transition-all duration-300"
            href={"#"}
          >
            Contact
          </Link>
        </nav>
        <div className="flex gap-3 justify-center items-center">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <ProfileDropDown />
          {/* <Link href={`/login`}>
            <Image src="/assets/avatar.png" width={35} height={35} alt="User Avatar" />
          </Link> */}
        </div>
      </div>
    </header>
  );
};

export default Header;

