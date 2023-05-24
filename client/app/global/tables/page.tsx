// tables.tsx
"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import tableImage from '../../../public/images/icon-table.png';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import styles from "./table.module.css";
import internal from "stream";

type Table = {
    _id: string;
    idPropierty: string;
    type: string;
    capacity: int;
    description: string;
    ubication: string;
    typesOfSeats: string;
    reservationCost: int;
    minimumConsumption: int;
};

const Tables = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [modal, setModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [editedTable, setEditedTable] = useState<Table | null>(null);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/table")
      .then((response) => response.json())
      .then((data) => {
        setTables(data.data);
      });
  }, []);

  const handleEdit = (table: Table) => {
    setSelectedTable(table);
    setEditedTable(table);
    toggle();
  };

  const handleDelete = (table: Table) => {
    fetch(`http://localhost:3000/api/v1/table/${table._id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setTables(tables.filter((table) => table._id !== data.data._id));
      });
  };

  const handleTableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedTable) {
      setEditedTable({ ...editedTable, [name]: value });
    }
  };

  const saveChanges = () => {
    if (selectedTable && editedTable) {
      const { _id, createdAt, updatedAt, __v, idPropierty, ...updatedTable } = editedTable; // Excluir las propiedades no permitidas
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
    <DashboardLayout>
      <Container className={styles.container}>
        <img src={tableImage.src} alt="Mesas" className={styles.image} />
        <h2 className={styles.heading}>Mesas</h2>
        <p className={styles.subheading}>
        Información sobre las caracteristicas de las mesas registradas.
        </p>
        <div className={styles.tableContainer}>
          <Table striped bordered hover className={styles.table}>
            <thead>
              <tr className={styles.tr}>
              <th>Tipo</th>
              <th>Capacidad</th>
              <th>Descripción</th>
              <th>Ubicación</th>
              <th>Tipo de Asientos</th>
              <th>Costo de Reserva</th>
              <th>Consumo Mínimo</th>
              <th className={styles.actions}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tables?.map((table) => (
                <tr key={table._id}>
                  <td>{table.type}</td>
                  <td>{table.capacity}</td>
                  <td>{table.description}</td>
                  <td>{table.ubication}</td>
                  <td>{table.typesOfSeats}</td>
                  <td>{table.reservationCost}</td>
                  <td>{table.minimumConsumption}</td>
                  <td className={styles.actions}>
                    <div className={styles.buttonContainer}>
                      <Button
                        variant="warning"
                        onClick={() => handleEdit(table)}
                        className={styles.button}
                      >
                        Editar
                      </Button>
                      <Modal isOpen={modal} toggle={toggle} className={styles.modal}>
                        <div className={styles.overlay}>
                          <div className={styles.editContainer}>
                            <ModalHeader toggle={toggle} className={styles.modalheader}>EDITAR MESAS</ModalHeader>
                            <ModalBody>
                              <div className={styles.formContainer}>
                                <div className={styles.gridContainer}>
                                  <div className="col">
                                    <FormGroup className={styles.formGroup}>
                                    <Label for="tableType">Tipo</Label>
                                    <Input
                                      type="text"
                                      name="type"
                                      value={editedTable?.type || ""}
                                      onChange={handleTableChange}
                                    />
                                    </FormGroup >
                                  </div>
                                  <div className="col">
                                    <FormGroup className={styles.formGroup}>
                                      <Label for="tableCapacity">Capacidad</Label>
                                      <Input
                                        type="number"
                                        name="capacity"
                                        value={editedTable?.capacity || ""}
                                        onChange={handleTableChange}
                                      />
                                    </FormGroup>
                                  </div>
                                </div>
                                <div className={styles.gridContainer}>
                                  <div className="col">
                                    <FormGroup className={styles.formGroup}>
                                      <Label for="tableDescription">Descripción</Label>
                                      <Input
                                        type="textarea"
                                        name="description"
                                        value={editedTable?.description || ""}
                                        onChange={handleTableChange}
                                      />
                                    </FormGroup>
                                  </div>
                                  <div className="col">
                                    <FormGroup className={styles.formGroup}>
                                      <Label for="tableUbication">Ubicación</Label>
                                      <Input
                                        type="text"
                                        name="ubication"
                                        value={editedTable?.ubication || ""}
                                        onChange={handleTableChange}
                                      />
                                    </FormGroup>
                                  </div>
                                </div>
                                <div className={styles.gridContainer}>
                                  <div className={styles.gridItem}>
                                    <FormGroup className={styles.formGroup}>
                                      <Label for="tableTypesOfSeats">Tipo de Asientos</Label>
                                      <Input
                                        type="text"
                                        name="typesOfSeats"
                                        value={editedTable?.typesOfSeats || ""}
                                        onChange={handleTableChange}
                                      />
                                    </FormGroup>
                                  </div>
                                  <div className={styles.gridItem}>
                                    <FormGroup className={styles.formGroup}>
                                      <Label for="tableReservationCost">Costo de Reserva</Label>
                                      <Input
                                        type="number"
                                        name="reservationCost"
                                        value={editedTable?.reservationCost || ""}
                                        onChange={handleTableChange}
                                      />
                                    </FormGroup>
                                  </div>
                                </div>
                                <FormGroup className={styles.formGroup}>
                                  <Label for="tableMinimumConsumption">Consumo Mínimo</Label>
                                  <Input
                                    type="number"
                                    name="minimumConsumption"
                                    value={editedTable?.minimumConsumption || ""}
                                    onChange={handleTableChange}
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
                        onClick={() => handleDelete(table)}
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

export default Tables;
