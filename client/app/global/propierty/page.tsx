"use client";
import React, { useState, useEffect } from "react";
import propiedadesImage from '../../../public/images/icon-propiedad.png';
import styles from "./propierty.module.css";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {
  Container,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";


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
          setPropiertys(
            propierties.filter((propierty) => propierty._id !== data.data._id)
          );
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
    if (selectedPropierty) {
      const { _id, createdAt, updatedAt, __v,userId, ...updatedPropierty } = editedPropierty; // Excluir las propiedades no permitidas

      fetch(`http://localhost:3000/api/v1/propierty/${selectedPropierty._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPropierty), // Enviar el objeto actualizado sin las propiedades no permitidas
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.status === 200) {
            setPropiertys((prevPropiertys) =>
              prevPropiertys.map((propierty) =>
                propierty._id === data.data._id ? data.data : propierty
              )
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
    <DashboardLayout>
      <Container className={styles.container}>
        <img src={propiedadesImage.src} alt="Propiedades" className={styles.image} />
        <h2 className={styles.heading}>Propiedades</h2>
        <p className={styles.subheading}>
        Información sobre las propiedades registradas.
        </p>
        <div className={styles.tableContainer}>
          <Table striped bordered hover className={styles.table}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Capacidad</th>
                <th>Direccion</th>
                <th>Contacto</th>
                <th>Horario</th>
                <th className={styles.actions}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {propierties.map((propierty) => (
                <tr key={propierty._id}>
                  <td>{propierty.name}</td>
                  <td>{propierty.capacity}</td>
                  <td>{propierty.address}</td>
                  <td>{propierty.contact}</td>
                  <td>{propierty.schedule}</td>
                  <td>
                    <div className={styles.buttonContainer}>
                      <Button
                        variant="warning"
                        onClick={() => handleEdit(propierty)}
                        className={styles.button}
                      >
                        Editar
                      </Button>
                      <Modal
                        isOpen={modal}
                        toggle={toggle}
                        className={styles.modal}
                      >
                        <div className={styles.overlay}>
                          <div className={styles.editContainer}>
                            <ModalHeader toggle={toggle} className={styles.modalheader}>EDITAR PROPIEDADES</ModalHeader>
                            <ModalBody>
                              <div className={styles.formContainer}>
                                <div className={styles.gridContainer}>
                                  <div className="col">
                                    <FormGroup className={styles.formGroup}>
                                      <Label for="name">Name</Label>
                                      <Input
                                        type="text"
                                        name="name"
                                        value={editedPropierty?.name || ""}
                                        onChange={handlePropiertyChange}
                                      />
                                    </FormGroup>
                                  </div>
                                  <div className="col">
                                    <FormGroup className={styles.formGroup}>
                                      <Label for="capacity">Capacity</Label>
                                      <Input
                                        type="number"
                                        name="capacity"
                                        value={editedPropierty?.capacity || ""}
                                        onChange={handlePropiertyChange}
                                      />
                                    </FormGroup>
                                  </div>
                                </div>
                                <div className={styles.gridContainer}>
                                  <div className="col">
                                    <FormGroup className={styles.formGroup}>
                                      <Label for="address">Address</Label>
                                      <Input
                                        type="text"
                                        name="address"
                                        value={editedPropierty?.address || ""}
                                        onChange={handlePropiertyChange}
                                      />
                                      </FormGroup>
                                      </div>
                                      <div className="col">
                                      <FormGroup className={styles.formGroup}>
                                        <Label for="contact">Contact</Label>
                                        <Input
                                          type="text"
                                          name="contact"
                                          value={editedPropierty?.contact || ""}
                                          onChange={handlePropiertyChange}
                                        />
                                      </FormGroup>
                                    </div>
                                  </div>
                                <FormGroup className={styles.formGroup}>
                                  <Label for="schedule">Schedule</Label>
                                  <Input
                                    type="text"
                                    name="schedule"
                                    value={editedPropierty?.schedule || ""}
                                    onChange={handlePropiertyChange}
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
                        onClick={() => handleDelete(propierty)}
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

export default Propierty;
