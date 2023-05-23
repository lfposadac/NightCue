"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import jwtDecode from "jwt-decode";
import axios from "axios";
import styles from "./Sidebar.module.css";
import { linksWithToken } from "./data";

export default function Sidebar() {
  const [isShown, setIsShown] = useState(true); // comienza mostrándose
  const [currentPage, setCurrentPage] = useState("");

  const currentLinks = linksWithToken;

  const toggleSidebar = () => {
    setIsShown(!isShown); // cambia el estado cada vez que se hace clic
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentPage("");
    window.location.href = "/";
  };

  return (
    <div>
      {isShown && (
        <aside className={styles.sidebar}>
          <button onClick={toggleSidebar} className={styles.toggleButton}>
            Cerrar
          </button>
          <ul className={styles.navigation}>
            {currentLinks.map(({ label, route }) => (
              <li key={route}>
                <Link href={route} onClick={() => setCurrentPage(route)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </aside>
      )}
      {!isShown && currentPage === "" && (
        <button onClick={toggleSidebar} className={styles.hamburgerButton}>
          <div></div>
          <div></div>
          <div></div>
        </button>
      )}
    </div>
  );
}
