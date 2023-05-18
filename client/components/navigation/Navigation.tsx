"use client";

import Link from "next/link";
import styles from "./Navigation.module.css";
import { links, linksWithToken } from "./data";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";

export function Navigation() {
  const [role, setRole] = useState([]);
  const token = localStorage.getItem("token");

  if (token) {
    const decodeToken = jwtDecode(token);
    console.log(decodeToken?.roelId);
    console.log(role?._id);
  }

  useEffect(() => {
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
        </ul>
      </nav>
    </header>
  );
}
