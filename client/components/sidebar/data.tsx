// data.ts

import { Link } from "@/interfaces/link";

export const linksWithToken: Link[] = [
  {
    label: "Roles",
    route: "/global/roles",
  },
  {
    label: "Access",
    route: "/global/access",
  },
  {
    label: "Usuarios",
    route: "/global/users",
  },
  {
    label: "Propiedades",
    route: "/global/propierty",
  },
  {
    label: "Tables",
    route: "/global/tables",
  },
  {
    label: "Bookings",
    route: "/global/bookings",
  },
];

export const links: Link[] = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Login",
    route: "/login",
  },
  {
    label: "Reserva",
    route: "/reserva",
  },
  {
    label: "Post",
    route: "/posts",
  },
  {
    label: "About",
    route: "/about",
  },
];
