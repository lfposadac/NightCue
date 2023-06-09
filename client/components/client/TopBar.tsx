"use client";
import Link from "next/link";
import HamburgerButton from "./HamburgerButton";

export default function Header() {
  const logOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="md:sticky top-0 z-50 flex items-center justify-between w-full px-4 py-3 bg-red-900 shadow-md md:px-6 md:py-4">
      <div className="flex items-center justify-between w-full">
        <Link href="/client">
          <span className="text-xl font-bold text-gray-100 md:text-2xl">
            La Romana
          </span>
        </Link>
        <nav className="hidden ml-6 space-x-4 md:block">
          <Link href="/client" className="text-gray-100 hover:text-gray-100">
            Inicio
          </Link>
          {/* <Link
            className="text-gray-100 hover:text-gray-100"
            href="/client/propierties"
          >
            Establecimientos
          </Link> */}
          <Link
            className="text-gray-100 hover:text-gray-100"
            href="/client/booking"
          >
            Reservas
          </Link>
          <Link
            className="text-gray-100 hover:text-gray-100"
            href="/client/music"
          >
            Música
          </Link>
          <Link
            className="text-gray-100 hover:text-gray-100"
            href={"/"}
            onClick={logOut}
          >
            Salir
          </Link>
        </nav>

        <HamburgerButton />
      </div>
    </header>
  );
}
