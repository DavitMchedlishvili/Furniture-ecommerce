"use client";

import { useState } from "react";
import logo from "../../../../../public/assets/logo.png";
import Image from "next/image";
import ThemeSwitcher from "../Buttons/ThemeSwitcher/ThemeSwitcher";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../Buttons/LanguageSwitcher/LanguageSwitcher";
import { Link } from "@/i18n/routing";
import ProfileDropDown from "../Buttons/ProfileDropDown/ProfileDropDown";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const t = useTranslations("Header");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      id="header"
      className="w-full z-50 fixed bg-transparent hover:bg-white transition-all duration-700 shadow-md text-black dark:hover:bg-slate-800"
    >
      <div className="container m-auto w-full flex justify-between items-center p-4">
        {/* Logo */}
        <Link href={"/"} className="flex items-center">
          <Image src={logo.src} width={50} height={50} alt="logo" priority />
          <p className="text-lg pt-1">14 CHAIR</p>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:w-[40%] justify-between items-center gap-4">
          <Link className="nav-link hover:underline" href={"/products"}>
            {t("Products")}
          </Link>
          <Link className="nav-link hover:underline" href={"/posts"}>
            {t("Posts")}
          </Link>
          <Link className="nav-link hover:underline" href={"/subscription"}>
            {t("Subscriptions")}
          </Link>
          <Link className="nav-link hover:underline" href={"/cart"}>
            {t("Cart")}
          </Link>
          <Link className="nav-link hover:underline" href={"/contact-us"}>
            {t("Contact")}
          </Link>
        </nav>

        {/* Right Icons */}
        <div className="hidden md:flex gap-3 items-center">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <ProfileDropDown />
        </div>

        {/* Mobile Hamburger Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="p-5 flex flex-col gap-5">
          <button className="self-end" onClick={() => setMenuOpen(false)}>
            <X size={30} />
          </button>
          <Link
            className="nav-link-mobile"
            href={"/products"}
            onClick={() => setMenuOpen(false)}
          >
            {t("Products")}
          </Link>
          <Link
            className="nav-link-mobile"
            href={"/posts"}
            onClick={() => setMenuOpen(false)}
          >
            {t("Posts")}
          </Link>
          <Link
            className="nav-link-mobile"
            href={"/subscriptions"}
            onClick={() => setMenuOpen(false)}
          >
            {t("Subscriptions")}
          </Link>
          <Link
            className="nav-link-mobile"
            href={"/cart"}
            onClick={() => setMenuOpen(false)}
          >
            {t("Cart")}
          </Link>
          <Link
            className="nav-link-mobile"
            href={"/contact-us"}
            onClick={() => setMenuOpen(false)}
          >
            {t("Contact")}
          </Link>

          <div className="flex gap-3 mt-4">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <ProfileDropDown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


