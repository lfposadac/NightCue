"use client";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import React from "react";
import Head from "next/head";
import styles from "./home.module.css";

export default function HomePage() {
  const handleReserve = () => {
    window.location.href = "/login";
  };

  return (
    <DefaultLayout>
      <div className={styles.container}>
        <Head>
          <title className={styles.tittle}>Discoteca - Reservas</title>
        </Head>
        <main>
          <h1 className={styles.title}>Bienvenidos</h1>
          <p className={styles.subtittle}>
            Reserva tu mesa para disfrutar de una noche inolvidable
          </p>
          <button onClick={handleReserve} className={styles.button}>
            Reservar ahora
          </button>
        </main>
      </div>
    </DefaultLayout>
  );
}
