"use client";

import Link from "next/link";
import styles from "./Navigation.module.css";
import { link } from "@/interfaces/link";
import { links, linksWithToken } from "./data";

export function Navigation() {
  const token = localStorage.getItem("token");
  const currentLinks = token ? linksWithToken : links;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navigation}>
          {currentLinks.map(({ label, route }) => (
            <li className={styles.li} key={route}>
              <Link href={route}> {label} </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
