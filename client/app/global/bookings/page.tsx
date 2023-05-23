// bookings.tsx
"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import bookingImage from '../../../public/images/icon-booking.png';
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
  numberOfGuests: int;
  
};


const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [modal, setModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [editedBooking, setEditedBooking] = useState<Booking | null>(null);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/booking")
      .then((response) => response.json())
      .then((data) => {
        setBookings(data.data);
      });
  }, []);

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
    setEditedBooking(booking);
    toggle();
  };

  const handleDelete = (booking: Booking) => {
    fetch(`http://localhost:3000/api/v1/booking/${booking._id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setBookings(bookings.filter((booking) => booking._id !== data.data._id));
      });
  };

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedBooking) {
      setEditedBooking({ ...editedBooking, [name]: value });
    }
  };

  const saveChanges = () => {
    if (selectedBooking) {
      const { _id, createdAt, updatedAt, __v, ...updatedBooking } = editedBooking; // Excluir las propiedades no permitidas

      fetch(`http://localhost:3000/api/v1/booking/${selectedBooking._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBooking), // Enviar el objeto actualizado sin las propiedades no permitidas
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.status === 200) {
            setBookings((prevBookings) =>
              prevBookings.map((booking) =>
                booking._id === data.data._id ? data.data : booking
              )
            );
            toggle();
          } else {
            console.error("Error updating booking:", data.error);
          }
        })
        .catch((error) => {
          console.error("Error updating booking:", error);
        });
    }
  };

  return (
    <DashboardLayout>
      <Container className={styles.container}>
        <img src={bookingImage.src} alt="Reservas" className={styles.image} />
        <h2 className={styles.heading}>Reservas</h2>
        <p className={styles.subheading}>
          Información sobre las Reservas del sistema. Donde podrás eliminar y
          editarlos.
        </p>
        <div className={styles.bookingContainer}>
          <Table striped bordered hover className={styles.table}>
            <thead>
              <tr className={styles.tr}>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Accesos</th>
                <th className={styles.actions}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map((booking) => (
                <tr key={booking.name} className={styles.tr}>
                  <td>
                    <strong>{booking.name}</strong>
                  </td>
                  <td>{booking.description}</td>
                  <td className={styles.actions}>
                    <div className={styles.buttonContainer}>
                      <Button
                        variant="warning"
                        onClick={() => handleEdit(booking)}
                        className={styles.button}
                      >
                        Editar
                      </Button>
                      <Modal isOpen={modal} toggle={toggle} className={styles.modal}>
                        <div className={styles.overlay}>
                          <div className={styles.editContainer}>
                            <ModalHeader toggle={toggle} className={styles.modalheader}>EDITAR RESERVA</ModalHeader>
                            <ModalBody>
                              <div className={styles.formContainer}>
                                <FormGroup className={styles.formGroup}>
                                  <Label for="bookingName">Nombre</Label>
                                  <Input
                                    type="text"
                                    name="name"
                                    value={editedBooking?.name || ""}
                                    onChange={handleBookingChange}
                                  />
                                </FormGroup>
                                <FormGroup className={styles.formGroup}>
                                  <Label for="bookingDescription">Descripción</Label>
                                  <Input
                                    type="textarea"
                                    name="description"
                                    value={editedBooking?.description || ""}
                                    onChange={handleBookingChange}
                                  />
                                </FormGroup>
                              </div>
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                color="primary"
                                onClick={saveChanges}
                                className={styles.button}
                              >
                                Guardar Cambios
                              </Button>
                              <Button
                                color="secondary"
                                onClick={toggle}
                                className={styles.button}
                              >
                                Cancelar
                              </Button>
                            </ModalFooter>
                          </div>
                        </div>
                      </Modal>
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
