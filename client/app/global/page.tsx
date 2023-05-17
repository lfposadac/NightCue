"use client"
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import styles from "./dashboard.module.css";

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className={styles.welcomeContainer}>
        <h1 className={styles.welcomeTitle}>BIENVENIDO AL PANEL ADMINISTRATIVO</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <h2>ROLES</h2>
          <p>Información sobre los roles del sistema.</p>
        </div>
        <div className={styles.infoContainer}>
          <h2>ACCESS</h2>
          <p>Información sobre los niveles de acceso.</p>
        </div>
        <div className={styles.infoContainer}>
          <h2>USERS</h2>
          <p>Información sobre los usuarios del sistema.</p>
        </div>
        <div className={styles.infoContainer}>
          <h2>PROPIEDADES</h2>
          <p>Información sobre las propiedades registradas.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
