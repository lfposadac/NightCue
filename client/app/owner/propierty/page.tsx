"use client"
import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material"
import styles from "./propierty.module.css";
import OwnerLayout from "@/components/layouts/OwnerLayout";

type Propierty = {
  _id: string;
  userId: string;
  name: string;
  capacity: number;
  address: string;
  contact: string;
  schedule: string;
};

const Propierty = () => {
  const [propierties, setPropiertys] = useState<Propierty[]>([]);
  const [modal, setModal] = useState(false);
  const [selectedPropierty, setSelectedPropierty] = useState<Propierty | null>(null);
  const [editedPropierty, setEditedPropierty] = useState<Propierty | null>(null);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/propierty")
      .then((response) => response.json())
      .then((data) => setPropiertys(data.data));
  }, []);

  const handleEdit = (propierty: Propierty) => {
    setSelectedPropierty(propierty);
    setEditedPropierty(propierty);
    toggle();
  };

  const handleDelete = (propierty: Propierty) => {
    fetch(`http://localhost:3000/api/v1/propierty/${propierty._id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setPropiertys(propierties.filter((prop) => prop._id !== data.data._id));
        }
      })
      .catch((error) => {
        console.error("Error deleting propierty:", error);
      });
  };

  const handlePropiertyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedPropierty) {
      setEditedPropierty({ ...editedPropierty, [name]: value });
    }
  };

  const saveChanges = () => {
    if (selectedPropierty && editedPropierty) {
      const updatedPropierty = { ...editedPropierty };
      delete updatedPropierty._id;
      delete updatedPropierty.userId;

      fetch(`http://localhost:3000/api/v1/propierty/${selectedPropierty._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPropierty),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            setPropiertys((prevPropiertys) =>
              prevPropiertys.map((prop) => (prop._id === data.data._id ? data.data : prop))
            );
            toggle();
          } else {
            console.error("Error updating propierty:", data.error);
          }
        })
        .catch((error) => {
          console.error("Error updating propierty:", error);
        });
    }
  };

  return (
    <OwnerLayout>
      <Container className={styles.container}>
        <h1 className={styles.heading}>Propiedades</h1>
        <div className={styles.tableContainer}>
          <Table className={styles.table}>
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
              {propierties.map((propierty) => (
                <TableRow key={propierty._id}>
                  <TableCell>{propierty.name}</TableCell>
                  <TableCell>{propierty.capacity}</TableCell>
                  <TableCell>{propierty.address}</TableCell>
                  <TableCell>{propierty.contact}</TableCell>
                  <TableCell>{propierty.schedule}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(propierty)}>Editar</Button>
                    <Button onClick={() => handleDelete(propierty)}>Eliminar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Editar Propiedad</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Nombre</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={editedPropierty?.name || ""}
                onChange={handlePropiertyChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="capacity">Capacidad</Label>
              <Input
                type="number"
                name="capacity"
                id="capacity"
                value={editedPropierty?.capacity || ""}
                onChange={handlePropiertyChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="address">Dirección</Label>
              <Input
                type="text"
                name="address"
                id="address"
                value={editedPropierty?.address || ""}
                onChange={handlePropiertyChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="contact">Contacto</Label>
              <Input
                type="text"
                name="contact"
                id="contact"
                value={editedPropierty?.contact || ""}
                onChange={handlePropiertyChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="schedule">Horario</Label>
              <Input
                type="text"
                name="schedule"
                id="schedule"
                value={editedPropierty?.schedule || ""}
                onChange={handlePropiertyChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={saveChanges}>
              Guardar
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </OwnerLayout>
  );
};

export default Propierty;