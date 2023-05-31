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
  Snackbar,
  Alert,
} from "@mui/material";
import jwtDecode from "jwt-decode";
import { createTheme, ThemeProvider } from "@mui/material/styles";


type Property = {
  _id: string;
  userId: string;
  name: string;
  capacity: number;
  address: string;
  contact: string;
  schedule: string;
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

const Property = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [editedProperty, setEditedProperty] = useState<Property | null>(null);
  const [successAlert, setSuccessAlert] = useState<string | null>(null);
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const [token, settoken] = useState<string | null>(null);
  const [createdProperty, setCreatedProperty] = useState<Property | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decode =jwtDecode(token);
    const { userId } = decode;
    settoken(userId)
  });
  

  useEffect(() => {
    if (!token || token?.length <= 0){
      return 
    } 
    fetchProperties();
  }, [token]);

  const fetchProperties = () => {
    console.log(token);
    if (!token || token?.length <= 0){
      return 
    } 
    fetch(`http://localhost:3000/api/v1/propierty?userId=${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProperties(data.data);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    setSuccessAlert(null);
    setErrorAlert(null);
  };

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
        console.error("Error deleting property:", error);
      });
  };
  const handlePropertyChangeAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (createdProperty) {
      setCreatedProperty({ ...createdProperty, [name]: value });
    }
  };

  const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedProperty) {
      setEditedProperty({ ...editedProperty, [name]: value });
    }
  };

  const saveChanges = () => {
    if (selectedProperty) {
      const { _id, userId, createdAt, updatedAt, __v, ...updatedProperty } = editedProperty;

      fetch(`http://localhost:3000/api/v1/propierty/${selectedProperty._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProperty),
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
            setSuccessAlert("Propiedad actualizada exitosamente.");
          } else {
            console.error("Error updating property:", data.error);
            setErrorAlert("Error al actualizar la propiedad. Por favor, intenta nuevamente.");
          }
        })
        .catch((error) => {
          console.error("Error updating property:", error);
          setErrorAlert("Error al actualizar la propiedad. Por favor, intenta nuevamente.");
        });
    }
  };

  const addProperty = () => {
    if (createdProperty) {
      fetch("http://localhost:3000/api/v1/propierty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "64653384b532c1635f84cefb",
          name: createdProperty.name,
          capacity: createdProperty.capacity,
          address: createdProperty.address,
          contact: createdProperty.contact,
          schedule: createdProperty.schedule
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.status === 201) {
            setProperties([...properties, data.data]);
            toggleModal();
            setSuccessAlert("Propiedad agregada exitosamente.");
          } else {
            console.error("Error adding property:", data.error);
            setErrorAlert("Error al agregar la propiedad. Por favor, intenta nuevamente.");
          }
        })
        .catch((error) => {
          console.error("Error adding property:", error);
          setErrorAlert("Error al agregar la propiedad. Por favor, intenta nuevamente.");
        });
    }
  };

  return (
  <ThemeProvider theme={theme}>
    <OwnerLayout>
      <Container>
        <Typography variant="h4" sx={{ align: "center", color: "white", mb: 2 }}>
          Propiedades
        </Typography>
        <TableContainer sx={{ backgroundColor: "black" }}>
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
              {properties?.map((property) => (
                <TableRow key={property._id}>
                  <TableCell>{property.name}</TableCell>
                  <TableCell>{property.capacity}</TableCell>
                  <TableCell>{property.address}</TableCell>
                  <TableCell>{property.contact}</TableCell>
                  <TableCell>{property.schedule}</TableCell>
                  <TableCell>
                    <div>
                      <Button variant="contained" onClick={() => handleEdit(property)}>
                        Editar
                      </Button>
                      <Button variant="contained" color= "error" onClick={() => handleDelete(property)}>
                        Eliminar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" onClick={() => handlePropertyChangeAdd} style={{ marginBottom: "10px", marginTop: "10px" }} className="mt-6">
          Agregar Propiedad
        </Button>
        <Modal open={modalOpen} onClose={toggleModal}>
          <div style={{ backgroundColor: "black", padding: "20px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <DialogTitle>{selectedProperty ? "Editar Propiedad" : "Editar Propiedad"}</DialogTitle>
            <DialogContent>
              <FormGroup>
                <FormControl>
                  <FormLabel>Nombre:</FormLabel>
                  <Input type="text" name="name" value={editedProperty?.name || ''} onChange={handlePropertyChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Capacidad:</FormLabel>
                  <Input type="number" name="capacity" value={editedProperty?.capacity || 0} onChange={handlePropertyChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Dirección:</FormLabel>
                  <Input type="text" name="address" value={editedProperty?.address || ''} onChange={handlePropertyChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Contacto:</FormLabel>
                  <Input type="text" name="contact" value={editedProperty?.contact || ''} onChange={handlePropertyChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Horario:</FormLabel>
                  <Input type="text" name="schedule" value={editedProperty?.schedule || ''} onChange={handlePropertyChange} />
                </FormControl>
              </FormGroup>
            </DialogContent>
            <DialogActions>
              <Button onClick={toggleModal}>Cancelar</Button>
              <Button onClick={selectedProperty ? saveChanges : addProperty} color="primary" variant="contained">
                {selectedProperty ? "Guardar Cambios" : "Agregar"}
              </Button>
            </DialogActions>
          </div>
        </Modal>
        <Modal open={modalOpen} onClose={toggleModal}>
          <div style={{ backgroundColor: "black", padding: "20px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <DialogTitle>{createdProperty ? "Agregar Propiedad" : "Agregar Propiedad"}</DialogTitle>
            <DialogContent>
              <FormGroup>
                <FormControl>
                  <FormLabel>Nombre:</FormLabel>
                  <Input type="text" name="name" value={editedProperty?.name || ''} onChange={handlePropertyChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Capacidad:</FormLabel>
                  <Input type="number" name="capacity" value={editedProperty?.capacity || 0} onChange={handlePropertyChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Dirección:</FormLabel>
                  <Input type="text" name="address" value={editedProperty?.address || ''} onChange={handlePropertyChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Contacto:</FormLabel>
                  <Input type="text" name="contact" value={editedProperty?.contact || ''} onChange={handlePropertyChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Horario:</FormLabel>
                  <Input type="text" name="schedule" value={editedProperty?.schedule || ''} onChange={handlePropertyChange} />
                </FormControl>
              </FormGroup>
            </DialogContent>
            <DialogActions>
              <Button onClick={toggleModal}>Cancelar</Button>
              <Button onClick={selectedProperty ? saveChanges : addProperty} color="primary" variant="contained">
                {selectedProperty ? "Guardar Cambios" : "Agregar"}
              </Button>
            </DialogActions>
          </div>
        </Modal>
        <Snackbar open={!!successAlert} autoHideDuration={6000} onClose={() => setSuccessAlert(null)}>
          <Alert severity="success" onClose={() => setSuccessAlert(null)}>
            {successAlert}
          </Alert>
        </Snackbar>
        <Snackbar open={!!errorAlert} autoHideDuration={6000} onClose={() => setErrorAlert(null)}>
          <Alert severity="error" onClose={() => setErrorAlert(null)}>
            {errorAlert}
          </Alert>
        </Snackbar>
      </Container>
    </OwnerLayout>
  </ThemeProvider>
  );
};

const PropertyPage = () => {
  return (
    <>
    
      <Property />
    </>
  );
};

export default PropertyPage;


























