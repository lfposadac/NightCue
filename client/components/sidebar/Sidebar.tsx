import { useState } from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const [isShown, setIsShown] = useState(true); // comienza mostrándose

  const toggleSidebar = () => {
    setIsShown(!isShown); // cambia el estado cada vez que se hace clic
  };

  return (
    <div>
      {isShown && (
        <aside className={styles.sidebar}>
          <button onClick={toggleSidebar} className={styles.toggleButton}>
            Cerrar
          </button>
          <ul className={styles.navigation}>
            <li>
              <Link href="/global/roles">Roles</Link>
            </li>
            <li>
              <Link href="/global/access">Access</Link>
            </li>
            <li>
              <Link href="/global/users">Usuarios</Link>
            </li>
            <li>
              <Link href="/global/propierty">Propiedades</Link>
            </li>
            <li>
              <Link href="/">IR A PAG PRINCIPAL</Link>
            </li>
          </ul>
        </aside>
      )}
      {!isShown && (
        <button onClick={toggleSidebar} className={styles.hamburgerButton}>
          <div></div>
          <div></div>
          <div></div>
        </button>
      )}
    </div>
  );
}
