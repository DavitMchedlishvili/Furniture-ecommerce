import { Link } from '@/i18n/routing';
import Image from 'next/image';
import logo from "../../../../../public/assets/logo.png";
import React from 'react';

const Footer = () => {
  return (
    <footer className=" bg-gray-100 py-6 px-10 border-t-2 text-black dark:bg-slate-800">
      <div className="mt-[50px] flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6 md:gap-0">
        
        {/* Logo Section */}
        <Link href={"/"} className="flex items-center justify-center md:justify-start">
          <Image src={logo.src} width={50} height={50} alt="logo" priority />
          <p className="text-lg pt-1 ml-2">14 CHAIR</p>
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-lg text-gray-600">
          <Link href="/contact-us" className="hover:text-black transition-colors duration-300">Contact Us</Link>
          <Link href="/about" className="hover:text-black transition-colors duration-300">About Us</Link>
          <Link href="/products" className="hover:text-black transition-colors duration-300">Products</Link>
          <Link href="/posts" className="hover:text-black transition-colors duration-300">Posts</Link>
          <Link href="/cart" className="hover:text-black transition-colors duration-300">Cart</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
