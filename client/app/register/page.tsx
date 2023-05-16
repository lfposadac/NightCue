"use client";
import DefaultLayout from '@/components/layouts/DefaultLayout';
import { useState } from "react";
import axios from "axios";
import styles from "./register.module.css";

export default function RegisterPage() {
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
      "http://localhost:3000/api/v1/auth/sign-up",
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
    <DefaultLayout>
      <div className={styles.Register}>
        <div className={styles.formContainer}>
          <h2 className={styles['register-title']}>SING UP</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formControl}>
              <label htmlFor="name" className={styles['label']}>Name</label>
              <input
                name="name"
                type="name"
                placeholder="Enter name"
                onChange={handleChange}
              />
            </div>
            <div className={styles.formControl}>
              <label htmlFor="lastname" className={styles['label']}>LastName</label>
              <input
                name="lastname"
                type="lastname"
                placeholder="Enter lastname"
                onChange={handleChange}
              />
            </div>
            <div className={styles.formControl}>
              <label htmlFor="email" className={styles['label']}>Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </div>
            <div className={styles.formControl}>
              <label htmlFor="password"className={styles['label']}>Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter password"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              Register
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}
