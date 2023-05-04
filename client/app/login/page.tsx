"use client";
import { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";

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
    // try {
    e.preventDefault();
    console.log(credentials);
    const res = await axios.post(
      "http://localhost:3000/api/v1/auth/sign-in",
      credentials
    );
    const { data, status } = res;
    // If status > 400
    if (status > 400) {
      // alert de que no funciona
    }
    //
    // } catch (error) {
    //   console.log('Error:', error.message)
    // }
  };

  return (
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
      </div>
    </div>
  );
}
