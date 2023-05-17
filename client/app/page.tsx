import DefaultLayout from "@/components/layouts/DefaultLayout";
import React from "react";
import Head from "next/head";
import styles from "./home.module.css";

export default function HomePage() {
  return (
    <DefaultLayout>
      <div className={styles.container}>
        <Head>
          <title className={styles.tittle}>Discoteca - Reservas</title>
        </Head>
        <main>
          <h1 className={styles.title}>Bienvenidos a la discoteca</h1>
          <p className={styles.subtittle}>
            Reserva tu mesa para disfrutar de una noche inolvidable
          </p>
          <button className={styles.button}>Reservar ahora</button>
        </main>
      </div>
    </DefaultLayout>
  );
}
