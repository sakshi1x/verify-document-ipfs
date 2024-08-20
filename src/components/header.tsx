import { ConnectKitButton } from "connectkit";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="w-[80%] py-6 px-4 sm:px-8 flex justify-between items-center">
      <Link href="/" className="hover:text-indigo-200">
        <h1 className="text-2xl font-bold">Verify</h1>
      </Link>
      <nav>
        <ul className="flex space-x-6 items-center">
          <li>
            <ConnectKitButton />
          </li>
          <li>
            <Link href="/certify" className="hover:text-indigo-200">
              Certify
            </Link>
          </li>
          <li>
            <Link href="/verify" className="hover:text-indigo-200">
              Verify
            </Link>
          </li>

          <li>
            <Link
              href="/register"
              className="hover:text-indigo-200 bg-white p-2 text-purple-500 rounded-[50px] px-6"
            >
              Register organization
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
