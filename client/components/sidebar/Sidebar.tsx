"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import jwtDecode from "jwt-decode";
import axios from "axios";
import styles from "./Sidebar.module.css";
import { links, linksWithToken } from "./data";

export default function Sidebar() {
  const [isShown, setIsShown] = useState(true); // comienza mostrándose
  const [role, setRole] = useState([]);
  const [currentPage, setCurrentPage] = useState('');
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const decodeToken = jwtDecode(token);

      const getData = async () => {
        const { data } = await axios.get("http://localhost:3000/api/v1/role");
        const { data: dataRoles } = data;
        dataRoles.forEach((element) => {
          if (element.name === "Global User") {
            setRole(element);
          }
        });
      };
      getData();
    }
  }, [token]);

  const currentLinks = token ? linksWithToken : links;

  const toggleSidebar = () => {
    setIsShown(!isShown); // cambia el estado cada vez que se hace clic
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentPage('');
    // Lógica adicional de logout (por ejemplo, redireccionar al usuario a la página de inicio de sesión)
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
      {!isShown && currentPage === '' && (
        <button onClick={toggleSidebar} className={styles.hamburgerButton}>
          <div></div>
          <div></div>
          <div></div>
        </button>
      )}
    </div>
  );
}
