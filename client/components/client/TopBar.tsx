import Link from "next/link";
import HamburgerButton from "./HamburgerButton";

export default function Header() {
  return (
    <header className="flex items-center justify-between w-full px-4 py-3 bg-white shadow-md md:px-6 md:py-4">
      <div className="flex items-center justify-between w-full">
        <Link href="/">
          <img src="/next.svg" alt="Logo" className="w-8 h-8 mr-2" />
        </Link>
        <nav className="hidden ml-6 space-x-4 md:block">
          <Link href="/" className="text-gray-800 hover:text-gray-600">
            Inicio
          </Link>
          <Link className="text-gray-800 hover:text-gray-600" href="/acerca-de">
            Acerca de
          </Link>
          <Link className="text-gray-800 hover:text-gray-600" href="/servicios">
            Servicios
          </Link>
          <Link className="text-gray-800 hover:text-gray-600" href="/contacto">
            Contacto
          </Link>
        </nav>

        <HamburgerButton />
      </div>
    </header>
  );
}
