"use client"
import React from 'react';
import OwnerLayout from '@/components/layouts/OwnerLayout';
import styles from "./dashboard.module.css";

const Dashboard: React.FC = () => {
  return (
    <OwnerLayout>
      <div className={styles.welcomeContainer}>
        <h1 className={styles.welcomeTitle}>BIENVENIDO AL PANEL DE OWNER</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <h2>RESERVAS</h2>
          <p>Información sobre las reservas en el sistema.</p>
        </div>
        <div className={styles.infoContainer}>
          <h2>PROPIEDADES</h2>
          <p>Información sobre las propiedades registradas.</p>
        </div>
        <div className={styles.infoContainer}>
          <h2>MESAS</h2>
          <p>Información sobre las mesas en el sistema.</p>
        </div>
      </div>
    </OwnerLayout>
  );
};

export default Dashboard;