"use client";
import OwnerLayout from "@/components/layouts/OwnerLayout";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Container, Table, Button } from "@mui/material";
import {
  Modal,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  TextField,
} from "@mui/material";
import styles from "./table.module.css";

type TableData = {
  _id: string;
  idPropierty: string;
  type: string;
  capacity: number;
  description: string;
  ubication: string;
  typesOfSeats: string;
  reservationCost: number;
  minimumConsumption: number;
};

const Tables = () => {
  const [tables, setTables] = useState<TableData[]>([]);
  const [modal, setModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState<TableData | null>(null);
  const [editedTable, setEditedTable] = useState<TableData | null>(null);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/table")
      .then((response) => response.json())
      .then((data) => {
        setTables(data.data);
      });
  }, []);

  const handleEdit = (table: TableData) => {
    setSelectedTable(table);
    setEditedTable(table);
    toggle();
  };

  const handleDelete = (table: TableData) => {
    fetch(`http://localhost:3000/api/v1/table/${table._id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setTables(tables.filter((table) => table._id !== data.data._id));
      });
  };

  const handleTableChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedTable) {
      setEditedTable({ ...editedTable, [name]: value });
    }
  };

  const saveChanges = () => {
    if (selectedTable && editedTable) {
      const {
        _id,
        createdAt,
        updatedAt,
        __v,
        idPropierty,
        ...updatedTable
      } = editedTable; // Excluir las propiedades no permitidas
      fetch(`http://localhost:3000/api/v1/table/${selectedTable._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTable), // Enviar el objeto actualizado sin las propiedades no permitidas
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.status === 200) {
            setTables((prevTables) =>
              prevTables.map((table) =>
                table._id === data.data._id ? data.data : table
              )
            );
            toggle();
          } else {
            console.error("Error updating table:", data.error);
          }
        })
        .catch((error) => {
          console.error("Error updating table:", error);
        });
    }
  };

  return (
    <OwnerLayout>
      <Container className={styles.container}>
        <Typography variant="h4">Mesas</Typography>
        <Button onClick={toggle} variant="contained" color="primary">
          Agregar Mesa
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Capacidad</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Ubicación</TableCell>
              <TableCell>Tipos de Asientos</TableCell>
              <TableCell>Costo de Reservación</TableCell>
              <TableCell>Consumo Mínimo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tables.map((table) => (
              <TableRow key={table._id}>
                <TableCell>{table._id}</TableCell>
                <TableCell>{table.type}</TableCell>
                <TableCell>{table.capacity}</TableCell>
                <TableCell>{table.description}</TableCell>
                <TableCell>{table.ubication}</TableCell>
                <TableCell>{table.typesOfSeats}</TableCell>
                <TableCell>{table.reservationCost}</TableCell>
                <TableCell>{table.minimumConsumption}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(table)}>Editar</Button>
                  <Button onClick={() => handleDelete(table)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>

      {/* Modal de edición */}
      <Modal open={modal} onClose={toggle}>
        <div className={styles.modal}>
          <Typography variant="h5">Editar Mesa</Typography>
          {selectedTable && (
            <div className={styles.form}>
              <TextField
                label="Tipo"
                name="type"
                value={editedTable?.type}
                onChange={handleTableChange}
              />
              <TextField
                label="Capacidad"
                name="capacity"
                type="number"
                value={editedTable?.capacity}
                onChange={handleTableChange}
              />
              <TextField
                label="Descripción"
                name="description"
                value={editedTable?.description}
                onChange={handleTableChange}
              />
              <TextField
                label="Ubicación"
                name="ubication"
                value={editedTable?.ubication}
                onChange={handleTableChange}
              />
              <TextField
                label="Tipos de Asientos"
                name="typesOfSeats"
                value={editedTable?.typesOfSeats}
                onChange={handleTableChange}
              />
              <TextField
                label="Costo de Reservación"
                name="reservationCost"
                type="number"
                value={editedTable?.reservationCost}
                onChange={handleTableChange}
              />
              <TextField
                label="Consumo Mínimo"
                name="minimumConsumption"
                type="number"
                value={editedTable?.minimumConsumption}
                onChange={handleTableChange}
              />
            </div>
          )}
          <div className={styles.modalButtons}>
            <Button onClick={saveChanges} variant="contained" color="primary">
              Guardar
            </Button>
            <Button onClick={toggle} variant="contained" color="secondary">
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </OwnerLayout>
  );
};

export default Tables;

