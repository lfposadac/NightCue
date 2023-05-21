"use client";

import Link from "next/link";
import styles from "./Navigation.module.css";
import { links, linksWithToken } from "./data";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";

export function Navigation() {
  const [roles, setRoles] = useState();
  const [decodeToken, setDecodeToken] = useState(null);
  const token = localStorage.getItem("token");

  if (token && !decodeToken) {
    const decodeToken = jwtDecode(token);
    setDecodeToken(decodeToken);
  }

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    let role = null;
    const roleId = decodeToken?.roelId;

    roles?.forEach((e) => {
      if (role) return;
      role = e._id === roleId ? e : null;
    });

    switch (role?.name) {
      case "Global User":
        window.location.href = "/global";
        break;

      case "Owner Admin":
        window.location.href = "/owner";
        break;

      default:
        break;
    }
  }, [decodeToken, roles]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("http://localhost:3000/api/v1/role");
      const { data: dataRoles } = data;
      setRoles(dataRoles);
    };
    getData();
  }, []);

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
          {token && (
            <li className={styles.li}>
              <a href="/" onClick={handleLogOut}>
                Cerrar
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
