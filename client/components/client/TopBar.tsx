import Link from "next/link";
import HamburgerButton from "./HamburgerButton";

export default function Header() {
  return (
    <header className="md:sticky top-0 z-50 flex items-center justify-between w-full px-4 py-3 bg-white shadow-md md:px-6 md:py-4">
      <div className="flex items-center justify-between w-full">
        <Link href="/client">
          <span className="text-xl font-bold text-gray-800 md:text-2xl">
            Night Cue
          </span>
        </Link>
        <nav className="hidden ml-6 space-x-4 md:block">
          <Link href="/client" className="text-gray-800 hover:text-gray-600">
            Inicio
          </Link>
          <Link
            className="text-gray-800 hover:text-gray-600"
            href="/client/propierties"
          >
            Establecimientos
          </Link>
          <Link
            className="text-gray-800 hover:text-gray-600"
            href="/client/bookings"
          >
            Reservas
          </Link>
          <Link
            className="text-gray-800 hover:text-gray-600"
            href="/client/music"
          >
            Música
          </Link>
          <Link className="text-gray-800 hover:text-gray-600" href="/contacto">
            Salir
          </Link>
        </nav>

        <HamburgerButton />
      </div>
    </header>
  );
}
