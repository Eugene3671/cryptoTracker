"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          CryptoTracker
        </Link>

        {/* desktop */}
        <ul className="hidden sm:flex gap-4 text-gray-700 font-medium items-center">
          <li>
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/coins" className="hover:text-blue-600 transition">
              Popular Coins
            </Link>
          </li>
          <li>
            <Link href="/favorites" className="hover:text-blue-600 transition">
              Favorites
            </Link>
          </li>
        </ul>

        {/* burger */}
        <button className="sm:hidden text-gray-700" onClick={toggleMenu}>
          <FaBars size={24} />
        </button>
      </nav>

      {/* mobile menu */}
      {isOpen && (
        <div
          className="sm:hidden fixed inset-0 z-40 flex justify-end"
          onClick={toggleMenu}
        >
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
          <div
            className="relative bg-white w-3/4 max-w-xs h-full p-6 flex flex-col gap-6 shadow-xl rounded-l-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="self-end text-gray-700 mb-4"
              onClick={toggleMenu}
            >
              <FaTimes size={24} />
            </button>

            {/* Меню */}
            <nav className="flex flex-col gap-4 text-gray-800 font-medium text-lg">
              <Link
                href="/"
                onClick={toggleMenu}
                className="hover:text-blue-600 transition"
              >
                Home
              </Link>
              <Link
                href="/coins"
                onClick={toggleMenu}
                className="hover:text-blue-600 transition"
              >
                Popular Coins
              </Link>
              <Link
                href="/favorites"
                onClick={toggleMenu}
                className="hover:text-blue-600 transition"
              >
                Favorites
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
