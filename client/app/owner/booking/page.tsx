"use client";
import React, { useState, useEffect } from "react";
import OwnerLayout from "@/components/layouts/OwnerLayout";
import {
  Container,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import { SelectChangeEvent } from "@mui/material/Select";
import BookIcon from "@mui/icons-material/Book";
import Alert from "@mui/material/Alert";

type Booking = {
  _id: string;
  idTable: string;
  userId: string;
  numberOfGuests: number;
  status: "Espera" | "Rechazado" | "Aceptado";
};

type EditedBookings = Record<string, Partial<Booking>>;

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [editedBookings, setEditedBookings] = useState<EditedBookings>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/booking")
      .then((response) => response.json())
      .then((data) => {
        setBookings(data.data);
        const initialEditedBookings: EditedBookings = {};
        data.data.forEach((booking: Booking) => {
          initialEditedBookings[booking._id] = { ...booking };
        });
        setEditedBookings(initialEditedBookings);
      });
  }, []);

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  const handleDelete = (booking: Booking) => {
    fetch(`http://localhost:3000/api/v1/booking/${booking._id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setBookings(bookings.filter((booking) => booking._id !== data.data._id));
        setEditedBookings((prevEditedBookings) => {
          const { [data.data._id]: deletedBooking, ...rest } = prevEditedBookings;
          return rest;
        });
      });
  };

  const handleBookingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    bookingId: string
  ) => {
    const { name, value } = e.target;
    setEditedBookings((prevEditedBookings) => ({
      ...prevEditedBookings,
      [bookingId]: { ...prevEditedBookings[bookingId], [name]: value },
    }));
  };

  const handleStatusChange = (
    e: SelectChangeEvent<"Espera" | "Rechazado" | "Aceptado">,
    bookingId: string
  ) => {
    setEditedBookings((prevEditedBookings) => ({
      ...prevEditedBookings,
      [bookingId]: {
        ...prevEditedBookings[bookingId],
        status: e.target.value as "Espera" | "Rechazado" | "Aceptado",
      },
    }));
  };

  const saveChanges = () => {
    if (selectedBooking) {
      const { _id, createdAt, updatedAt, __v, ...updatedBooking } = editedBookings[
        selectedBooking._id
      ] as Booking; // Excluir las propiedades no permitidas
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
            setModalOpen(false);
          } else {
            console.error("Error updating booking:", data.error);
            setError("Error al actualizar la reserva");
          }
        })
        .catch((error) => {
          console.error("Error updating booking:", error);
          setError("Error al actualizar la reserva");
        });
    }
  };

  return (
    <OwnerLayout>
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "transparent",
            py: 3,
            mb: 3,
          }}
        >
          <BookIcon sx={{ color: "white", mr: 1 }} />
          <Typography variant="h4" component="h4" color="white">
            Reservas
          </Typography>
        </Box>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        <TableContainer sx={{ bgcolor: "white" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>idTable</TableCell>
                <TableCell>userId</TableCell>
                <TableCell>numberOfGuests</TableCell>
                <TableCell>status</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>
                    <strong>{booking.idTable}</strong>
                  </TableCell>
                  <TableCell>{booking.userId}</TableCell>
                  <TableCell>{booking.numberOfGuests}</TableCell>
                  <TableCell>
                    <Select
                      value={editedBookings[booking._id]?.status || ""}
                      onChange={(e) => handleStatusChange(e, booking._id)}
                      aria-label="booking status"
                    >
                      <MenuItem value="Espera">Espera</MenuItem>
                      <MenuItem value="Rechazado">Rechazado</MenuItem>
                      <MenuItem value="Aceptado">Aceptado</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleEdit(booking)}>
                      Editar
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleDelete(booking)}>
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Box
            sx={{
              p: 2,
              maxWidth: 400,
              bgcolor: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" component="h5" gutterBottom>
              Editar Reserva
            </Typography>
            {selectedBooking && (
              <FormGroup sx={{ width: "100%", mb: 2 }}>
                <TextField
                  name="idTable"
                  label="idTable"
                  value={editedBookings[selectedBooking._id]?.idTable || ""}
                  onChange={(e) => handleBookingChange(e, selectedBooking._id)}
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  autoFocus
                />
                <TextField
                  name="numberOfGuests"
                  label="Número de Invitados"
                  type="number"
                  value={editedBookings[selectedBooking._id]?.numberOfGuests || ""}
                  onChange={(e) => handleBookingChange(e, selectedBooking._id)}
                  fullWidth
                  margin="dense"
                  variant="outlined"
                />
              </FormGroup>
            )}
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <Button variant="contained" onClick={() => setModalOpen(false)}>
                Cancelar
              </Button>
              <Button variant="contained" onClick={saveChanges}>
                Guardar
              </Button>
            </Box>
          </Box>
        </Modal>
      </Container>
    </OwnerLayout>
  );
};

export default Bookings;

































