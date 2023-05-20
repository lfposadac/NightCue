"use client";
import OwnerLayout from "@/components/layouts/OwnerLayout";
import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
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
    <OwnerLayout>
      <Container className={styles.container}>
        <h2 className={styles.heading}>Bookings</h2>
        <p className={styles.subheading}>
          Información sobre los bookings del sistema. Donde podrás eliminar y
          editarlos.
        </p>
        <div className={styles.bookingContainer}>
          <Table striped bordered hover className={styles.booking}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Accesos</th>
                <th className={styles.actions}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map((booking) => (
                <tr key={booking.name}>
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
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Editar Rol</ModalHeader>
          <ModalBody>
            <div className={styles.editContainer}>
              <FormGroup>
                <Label for="bookingName">Nombre</Label>
                <Input
                  type="text"
                  name="name"
                  value={editedBooking?.name || ""}
                  onChange={handleBookingChange}
                />
              </FormGroup>
              <FormGroup>
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
        </Modal>
      </Container>
    </OwnerLayout>
  );
};

export default Bookings;
