import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { BiLogInCircle } from "react-icons/bi";
const poppins = Poppins({ weight: "400", subsets: ["latin"] });
const Navbar = () => {
  return (
    <nav className="flex w-full border-b p-5 items-center align-middle border-gray-200 bg-white md:justify-between justify-between">
      <div
        className={`flex bg-white text-black text-4xl ${poppins.className} `}
      >
        <Image src="/plane.svg" width={36} height={36} alt="logo" />
        <p>Ankasa</p>
      </div>
      <div className="md:flex md:items-center">
        <ul className="lg:flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white hidden mx-10">
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-black font-semibold hover:border-b-2 hover:border-ankasa-blue"
            >
              Find Ticket
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-black font-semibold hover:border-b-2 hover:border-ankasa-blue"
            >
              My Bookings
            </a>
          </li>
        </ul>
        <div className="relative hidden md:block mx-10">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Search icon</span>
          </div>
          <input
            type="text"
            id="search-navbar"
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search..."
          />
        </div>

        <Link href={"/auth/register"}>
          <BiLogInCircle size={32} className="md:hidden text-ankasa-blue"/>
        </Link>
        <Link href={"/auth/register"}>
          <button className="bg-blue-500 m-sm w-36 h-14 rounded-xl hidden lg:block mx-10">
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
