import Link from "next/link";
import logo from "../../../../public/assets/logo.png";

export const Header = () => {
  return (
    <header
      id="header"
      className="w-full z-50 fixed bg-transparent shadow-md  text-black"
    >
      <div className=" w-full flex justify-between border-2 mx-auto border-yellow-300 p-4">
        <Link href={"/"} className="flex items-end">
          <img className="w-10 h-10" src={logo.src} alt="logo" />
          <p className=" text-lg ml-2">Jorko</p>
        </Link>
        <nav className="w-[50%]  flex justify-between items-center">
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
