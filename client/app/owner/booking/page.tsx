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
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";

type Booking = {
  _id: string;
  idTable: string;
  userId: string;
  numberOfGuests: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
};

type User = {
  _id: string;
  name: string;
};
type Table = {
  _id: string;
  type: string;
};

const theme = createTheme({
  palette: {
    text: {
      primary: "#ffffff", // Color del texto blanco
    },
    background: {
      default: "#000000", // Color de fondo negro
    },
  },
});

type EditedBookings = Record<string, Partial<Booking>>;

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [editedBookings, setEditedBookings] = useState<EditedBookings>({});
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<Record<string, User>>({});
  const [table, setTable] = useState<Record<string, Table>>({});

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
        setBookings(
          bookings.filter((booking) => booking._id !== data.data._id)
        );
        setEditedBookings((prevEditedBookings) => {
          const { [data.data._id]: deletedBooking, ...rest } =
            prevEditedBookings;
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

  const handleStatusChange = async (
    e: SelectChangeEvent<"PENDING" | "CONFIRMED" | "CANCELLED">,
    bookingId: string
  ) => {
    const { value } = e.target;
    const res = await axios.put(
      `http://localhost:3000/api/v1/booking/${bookingId}`,
      {
        status: value,
      }
    );
    const { status } = res?.data?.data;

    if (!status) return;

    const booking = bookings.find((booking) => {
      return booking._id === bookingId;
    });
    if (booking) {
      setBookings((prevBookings) => {
        const index = prevBookings.indexOf(booking);
        const newBookings = [...prevBookings];
        newBookings[index] = { ...booking, status };
        return newBookings;
      });
    }
  };

  const saveChanges = () => {
    if (selectedBooking) {
      const { _id, createdAt, updatedAt, __v, ...updatedBooking } =
        editedBookings[selectedBooking._id] as Booking; // Excluir las propiedades no permitidas
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
            setError(null); // Limpiar el error
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
  <ThemeProvider theme={theme}>
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
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        <TableContainer sx={{ bgcolor: "black" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mesa</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell>Invitados</TableCell>
                <TableCell>status</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => {
                return (
                  <TableRow key={booking._id}>
                    <TableCell>
                      <strong>{table?.[booking.idTable]?.type}</strong>
                    </TableCell>
                    <TableCell>{user?.[booking.userId]?.name}</TableCell>
                    <TableCell>{booking.numberOfGuests}</TableCell>
                    <TableCell>
                      <Select
                        value={booking?.status}
                        onChange={(e) => handleStatusChange(e, booking._id)}
                        aria-label="booking status"
                      >
                        <MenuItem color="white" value="PENDING">Pendiente</MenuItem>
                        <MenuItem color= "white" value="CONFIRMED">Confirmado</MenuItem>
                        <MenuItem color="white" value="CANCELLED">Cancelado</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => handleEdit(booking)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(booking)}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
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
                  name="idtable"
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
                  value={
                    editedBookings[selectedBooking._id]?.numberOfGuests || ""
                  }
                  onChange={(e) => handleBookingChange(e, selectedBooking._id)}
                  fullWidth
                  margin="dense"
                  variant="outlined"
                />
              </FormGroup>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
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
  </ThemeProvider>
  );
};

export default Bookings;
