import { Link } from '@/i18n/routing';
import Image from 'next/image';
import logo from "../../../../../public/assets/logo.png";
import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-[50px] bg-gray-100 py-6 px-10 flex justify-between items-center border-t-2 border-gray-300">
      {/* Logo Section */}
      <Link href={"/"} className="flex  items-center">
          <Image src={logo.src} width={50} height={50} alt="logo" priority/>
          <p className="text-lg pt-1">14 CHAIR</p>
        </Link>
      
      {/* Navigation Links */}
      <div className="flex gap-8 text-lg text-gray-600">
        <Link href="/contact-us" className="hover:text-blue-500 transition-colors duration-300">Contact Us</Link>
        <Link href="/about" className="hover:text-blue-500 transition-colors duration-300">About Us</Link>
        <Link href="/products" className="hover:text-blue-500 transition-colors duration-300">Products</Link>
        <Link href="/posts" className="hover:text-blue-500 transition-colors duration-300">Posts</Link>
        <Link href="/cart" className="hover:text-blue-500 transition-colors duration-300">Cart</Link>
      </div>
    </footer>
  );
}

export default Footer;