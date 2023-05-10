import Link from "next/link";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <ul className={styles.navigation}>
        <li>
          <Link href="/roles">Roles</Link>
        </li>
        <li>
          <Link href="/access">Access</Link>
        </li>
        <li>
          <Link href="/usuarios">Usuarios</Link>
        </li>
        <li>
          <Link href="/propiedades">Propiedades</Link>
        </li>
      </ul>
    </aside>
  );
}
