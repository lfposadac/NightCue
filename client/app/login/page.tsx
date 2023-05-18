"use client";

import DefaultLayout from "@/components/layouts/DefaultLayout";
import { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";
import { useRouter } from "next/router";

export default function LoginPage() {
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
      window.location.href = "/";
    } catch ({ response }) {
      alert("Correo o contraseña incorrectos");
    }
  };

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
