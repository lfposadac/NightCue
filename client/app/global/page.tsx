"use client"
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import rolesImage from '../../public/images/icon-role.png';
import usersImage from '../../public/images/icon-user.png';
import propiedadesImage from '../../public/images/icon-propiedad.png';
import accessImage from '../../public/images/icon-access1.png';
import tableImage from '../../public/images/icon-table.png';
import bookingImage from '../../public/images/icon-booking.png';
import styles from "./dashboard.module.css";

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className={styles.welcomeContainer}>
        <h1 className={styles.welcomeTitle}>BIENVENIDO AL PANEL GLOBAL</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <div className={styles.imageContainer}>
            <img src={rolesImage.src} alt="Roles" className={styles.image} />
            <h2>ROLES</h2>
          </div>
          <p>Información sobre los roles del sistema.</p>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.imageContainer}>
            <img src={accessImage.src} alt="Access" className={styles.image} />
            <h2>ACCESS</h2>
          </div>
          <p>Información sobre los niveles de acceso.</p>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.imageContainer}>
            <img src={usersImage.src} alt="Users" className={styles.image} />
            <h2>USERS</h2>
          </div>
          <p>Información sobre los usuarios del sistema.</p>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.imageContainer}>
            <img src={propiedadesImage.src} alt="Propiedades" className={styles.image} />
            <h2>PROPIEDADES</h2>
          </div>
          <p>Información sobre las propiedades registradas.</p>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.imageContainer}>
            <img src={tableImage.src} alt="Mesas" className={styles.image} />
            <h2>MESAS</h2>
          </div>
          <p>Información sobre las caracteristicas de las mesas registradas.</p>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.imageContainer}>
            <img src={bookingImage.src} alt="Reservas" className={styles.image} />
            <h2>RESERVAS</h2>
          </div>
          <p>Información sobre las caracteristicas de las reservas registradas.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
