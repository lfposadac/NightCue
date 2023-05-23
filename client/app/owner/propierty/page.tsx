"use client"
import React, { useState, useEffect } from "react";
import OwnerLayout from "@/components/layouts/OwnerLayout";
import {
  Container,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Modal,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControl,
  FormLabel,
  Input,
  Typography,
} from "@mui/material";

type Property = {
  _id: string;
  userId: string;
  name: string;
  capacity: number;
  address: string;
  contact: string;
  schedule: string;
};

const Property = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [editedProperty, setEditedProperty] = useState<Property | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = () => {
    fetch("http://localhost:3000/api/v1/propierty")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Verifica los datos recibidos en la consola
        setProperties(data.data);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setEditedProperty(property);
    toggleModal();
  };

  const handleDelete = (property: Property) => {
    fetch(`http://localhost:3000/api/v1/propierty/${property._id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setProperties(properties.filter((property) => property._id !== data.data._id));
        }
      })
      .catch((error) => {
        console.error("Error deleting propierty:", error);
      });
  };

  const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedProperty) {
      setEditedProperty({ ...editedProperty, [name]: value });
    }
  };

  const saveChanges = () => {
    if (selectedProperty) {
      const { _id, userId, createdAt, updatedAt, __v, ...updatedProperty } = editedProperty; // Excluir las propiedades no permitidas

      fetch(`http://localhost:3000/api/v1/propierty/${selectedProperty._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProperty), // Enviar el objeto actualizado sin las propiedades no permitidas
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.status === 200) {
            setProperties((prevProperties) =>
              prevProperties.map((property) =>
                property._id === data.data._id ? data.data : property
              )
            );
            toggleModal();
          } else {
            console.error("Error updating property:", data.error);
          }
        })
        .catch((error) => {
          console.error("Error updating property:", error);
        });
    }
  };

  return (
    <OwnerLayout>
      <Container>
      <Typography variant="h4" sx={{ align: "center", color: "white", mb: 2 }}>
          Propiedades
        </Typography>
        <TableContainer style={{ backgroundColor: "white" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Capacidad</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Contacto</TableCell>
                <TableCell>Horario</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property._id}>
                  <TableCell>{property.name}</TableCell>
                  <TableCell>{property.capacity}</TableCell>
                  <TableCell>{property.address}</TableCell>
                  <TableCell>{property.contact}</TableCell>
                  <TableCell>{property.schedule}</TableCell>
                  <TableCell>
                    <div>
                      <Button variant="outlined" onClick={() => handleEdit(property)}>
                        Editar
                      </Button>
                      <Button variant="outlined" onClick={() => handleDelete(property)}>
                        Eliminar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal open={modalOpen} onClose={toggleModal}>
          <div style={{ backgroundColor: "white", padding: "20px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <DialogTitle>EDITAR PROPIEDADES</DialogTitle>
            <DialogContent>
              <div>
                <FormGroup>
                  <FormControl>
                    <FormLabel htmlFor="name">Nombre</FormLabel>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={editedProperty?.name || ""}
                      onChange={handlePropertyChange}
                    />
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <FormControl>
                    <FormLabel htmlFor="capacity">Capacidad</FormLabel>
                    <Input
                      type="number"
                      id="capacity"
                      name="capacity"
                      value={editedProperty?.capacity || ""}
                      onChange={handlePropertyChange}
                    />
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <FormControl>
                    <FormLabel htmlFor="address">Dirección</FormLabel>
                    <Input
                      type="text"
                      id="address"
                      name="address"
                      value={editedProperty?.address || ""}
                      onChange={handlePropertyChange}
                    />
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <FormControl>
                    <FormLabel htmlFor="contact">Contacto</FormLabel>
                    <Input
                      type="text"
                      id="contact"
                      name="contact"
                      value={editedProperty?.contact || ""}
                      onChange={handlePropertyChange}
                    />
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <FormControl>
                    <FormLabel htmlFor="schedule">Horario</FormLabel>
                    <Input
                      type="text"
                      id="schedule"
                      name="schedule"
                      value={editedProperty?.schedule || ""}
                      onChange={handlePropertyChange}
                    />
                  </FormControl>
                </FormGroup>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={saveChanges} variant="contained" color="primary">
                Guardar Cambios
              </Button>
              <Button onClick={toggleModal} variant="contained" color="secondary">
                Cancelar
              </Button>
            </DialogActions>
          </div>
        </Modal>
      </Container>
    </OwnerLayout>
  );
};

export default Property;















