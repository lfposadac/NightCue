// bookings.tsx
"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import bookingImage from "../../../public/images/icon-booking.png";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import styles from "./booking.module.css";
import internal from "stream";

type Booking = {
  _id: string;
  idTable: string;
  userId: string;
  date: Date;
  numberOfGuests: number;
  status: string;
};

type User = {
  _id: string;
  name: string;
};
type Table = {
  _id: string;
  type: string;
};

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [modal, setModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [editedBooking, setEditedBooking] = useState<Booking | null>(null);
  const [user, setUser] = useState<Record<string, User>>({});
  const [table, setTable] = useState<Record<string, Table>>({});
  console.log(table);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/booking")
      .then((response) => response.json())
      .then((data) => {
        setBookings(data.data);
  
        fetch("http://localhost:3000/api/v1/user")
          .then((response) => response.json())
          .then((userData) => {
            const userMap: Record<string, User> = {};
            userData.data.forEach((prop: User) => {
              userMap[prop._id] = prop;
            });
            setUser(userMap);
          });
  
        fetch("http://localhost:3000/api/v1/table")
          .then((response) => response.json())
          .then((tableData) => {
            const tableMap: Record<string, Table> = {};
            tableData.data.forEach((prop: Table) => {
              tableMap[prop._id] = prop;
            });
            setTable(tableMap);
          });
      });
  }, []);
  

  const handleDelete = (booking: Booking) => {
    fetch(`http://localhost:3000/api/v1/booking/${booking._id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setBookings(bookings.filter((booking) => booking._id !== data.data._id));
      });
  };

  return (
    <DashboardLayout>
      <Container className={styles.container}>
        <img src={bookingImage.src} alt="Reservas" className={styles.image} />
        <h2 className={styles.heading}>Reservas</h2>
        <p className={styles.subheading}>
          Información sobre las Reservas del sistema. Donde podrás eliminar y editarlos.
        </p>
        <div className={styles.bookingContainer}>
          <Table striped bordered hover className={styles.table}>
            <thead>
              <tr className={styles.tr}>
                <th>Mesa</th>
                <th>Usuario</th>
                <th>Fecha</th>
                <th>Cantidad de Invitados</th>
                <th>Estado</th>
                <th className={styles.actions}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map((booking) => (
                <tr key={booking._id} className={styles.tr}>
                  <td>{table?.[booking.idTable]?.type || 'Nombre no encontrado'}</td>
                  <td>{user?.[booking.userId]?.name || 'Nombre no encontrado'}</td>
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                  <td>{booking.numberOfGuests}</td>
                  <td>{booking.status}</td>
                  <td className={styles.actions}>
                    <div className={styles.buttonContainer}>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(booking)}
                        className={styles.button}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </DashboardLayout>
  );
};

export default Bookings;
