"use client";

import DefaultLayout from "@/components/layouts/DefaultLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";
import jwtDecode from "jwt-decode";

export default function LoginPage() {
  const [roles, setRoles] = useState([]);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/sign-in",
        credentials
      );
      const { data: dataRes } = res;
      const { status, data } = dataRes;
      if (status !== 200) {
        alert("Correo o contraseña incorrectos");
        return;
      }
      const { token } = data;
      localStorage.setItem("token", token);

      // Relocate to home page
      const decodeJWT = jwtDecode(token);
      const roleId = decodeJWT?.roelId;

      let role = null;
      roles?.forEach((e) => {
        if (role) return;
        role = e._id === roleId ? e : null;
      });

      switch (role.name) {
        case "Global User":
          window.location.href = "/global";
          break;

        case "Owner Admin":
          window.location.href = "/owner";
          break;

        default:
          window.location.href = "/";
          break;
      }
    } catch ({ response }) {
      alert("Correo o contraseña incorrectos");
    }
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("http://localhost:3000/api/v1/role");
      const { data: dataRoles } = data;
      setRoles(dataRoles);
    };
    getData();
  }, []);

  return (
    <DefaultLayout>
      <div className={styles.login}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2>LOGIN</h2>
            <div className={styles.formControl}>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </div>
            <div className={styles.formControl}>
              <label htmlFor="email">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter password"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              login
            </button>
          </form>
          <div className={styles.externalLogin}>
            <a href="#">
              <img src="/images/facebook-logo.png" alt="Facebook" />
            </a>
            <a href="#">
              <img src="/images/google-logo.png" alt="Google" />
            </a>
          </div>
          <div className={styles.registerLink}>
            <p>
              No tienes una cuenta, <a href="#">REGISTRATE</a>
            </p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
