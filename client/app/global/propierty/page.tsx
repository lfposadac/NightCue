"use client";
import React, { useState, useEffect } from "react";
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
import styles from "./propierty.module.css";
import DashboardLayout from "@/components/layouts/DashboardLayout";

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
  const [propierties, setPropierties] = useState<Propierty[]>([]);
  const [modal, setModal] = useState(false);
  const [selectedPropierty, setSelectedPropierty] = useState<Propierty | null>(
    null
  );

  const toggleModal = () => setModal(!modal);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/propierty")
      .then((response) => response.json())
      .then((data) => setPropierties(data.data));
  }, []);

  const handleEdit = (propierty: Propierty) => {
    setSelectedPropierty(propierty);
    toggleModal();
  };

  const handleDelete = (propiertyId: string) => {
    fetch(`http://localhost:3000/api/v1/propierty/${propiertyId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setPropierties(
            propierties.filter((propierty) => propierty._id !== propiertyId)
          );
        }
      })
      .catch((error) => {
        console.error("Error deleting propierty:", error);
      });
  };

  const handlePropiertyChange = (field: string, value: string) => {
    if (selectedPropierty) {
      setSelectedPropierty({ ...selectedPropierty, [field]: value });
    }
  };

  const saveChanges = () => {
    // Aquí irá la lógica para guardar los cambios en la base de datos
    toggleModal();
  };

  return (
    <DashboardLayout>
      <Container className={styles.container}>
        <h2 className={styles.heading}>Propierties</h2>
        <div className={styles.tableContainer}>
          <Table striped bordered hover className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Capacity</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Schedule</th>
                <th>Actions</th>
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
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(propierty._id)}
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
        <Modal
          isOpen={modal}
          toggle={toggleModal}
          className={styles.modalContainer}
        >
          <ModalHeader toggle={toggleModal}>Editar Propierty</ModalHeader>
          <ModalBody>
            <div className={styles.editContainer}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={selectedPropierty?.name || ""}
                  onChange={(e) =>
                    handlePropiertyChange("name", e.target.value)
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="capacity">Capacity</Label>
                <Input
                  type="text"
                  name="capacity"
                  value={selectedPropierty?.capacity || ""}
                  onChange={(e) =>
                    handlePropiertyChange("capacity", e.target.value)
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="address">Address</Label>
                <Input
                  type="text"
                  name="address"
                  value={selectedPropierty?.address || ""}
                  onChange={(e) =>
                    handlePropiertyChange("address", e.target.value)
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="contact">Contact</Label>
                <Input
                  type="text"
                  name="contact"
                  value={selectedPropierty?.contact || ""}
                  onChange={(e) =>
                    handlePropiertyChange("contact", e.target.value)
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="schedule">Schedule</Label>
                <Input
                  type="text"
                  name="schedule"
                  value={selectedPropierty?.schedule || ""}
                  onChange={(e) =>
                    handlePropiertyChange("schedule", e.target.value)
                  }
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
              Save Changes
            </Button>
            <Button
              color="secondary"
              onClick={toggleModal}
              className={styles.button}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </DashboardLayout>
  );
};

export default Propierty;
