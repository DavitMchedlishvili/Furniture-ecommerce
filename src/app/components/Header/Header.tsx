import Link from "next/link";
import logo from "../../../../public/assets/logo.png";
import Image from "next/image";

export const Header = () => {
  return (
    <header
      id="header"
      className="  w-full z-50 fixed bg-transparent hover:bg-white transition-all duration-700 shadow-md  text-black"
    >
      <div className=" container m-auto w-full flex justify-between  mx-auto p-4">
        <Link href={"/"} className="flex items-end">
          <Image width={30} height={10} src={logo.src} alt="logo" />
          <p className=" text-lg ml-2">JORKO</p>
        </Link>
        <nav className="w-[40%]  flex justify-between items-center">
          <Link
            className="border-b-2 border-transparent hover:border-black transition-all duration-300"
            href={"#"}
          >
            Products
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
        <div className=" flex gap-5">
          <button className="border-2 border-black py-1 px-2">EN</button>
          <button className="border-2 border-black py-1 px-2">Dark</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
