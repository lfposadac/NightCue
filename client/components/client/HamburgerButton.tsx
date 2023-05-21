"use client";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";

export default function HamburgerButton() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      {/* Hamburger menu */}
      {/* Button hamburger */}
      <GiHamburgerMenu
        className="block w-6 h-6 text-gray-800 md:hidden hover:text-gray-600"
        onClick={toggle}
      />

      {/* Menu mobile */}
      {isOpen && (
        <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full bg-white md:hidden">
          <nav className="flex flex-col items-center justify-center w-full h-full space-y-4">
            <Link href="/" className="text-gray-800 hover:text-gray-600">
              Inicio
            </Link>
            <Link
              className="text-gray-800 hover:text-gray-600"
              href="/acerca-de"
            >
              Acerca de
            </Link>
            <Link
              className="text-gray-800 hover:text-gray-600"
              href="/servicios"
            >
              Servicios
            </Link>
            <Link
              className="text-gray-800 hover:text-gray-600"
              href="/contacto"
            >
              Contacto
            </Link>
          </nav>

          {/* Button close */}
          <GrClose
            className="absolute top-0 right-0 w-6 h-6 m-4 text-gray-800 hover:text-gray-600"
            onClick={toggle}
          />
        </div>
      )}
    </>
  );
}
