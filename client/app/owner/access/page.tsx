"use client";
import DashboardLayout from '@/components/layouts/DashboardLayout';
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
import styles from "./access.module.css";

type Access = {
  name: string;
  description: string;
};

const Access = () => {
  const [accesses, setAccesses] = useState<Access[]>([]);
  const [modal, setModal] = useState(false);
  const [selectedAccess, setSelectedAccess] = useState<Access | null>(null);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/access")
      .then((response) => response.json())
      .then((data) => setAccesses(data.data));
  }, []);

  const handleEdit = (access: Access) => {
    setSelectedAccess(access);
    toggle();
  };
  const handleDelete = (accessId: string) => {
    fetch(`http://localhost:3000/api/v1/access/${accessId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setAccesses(accesses.filter((access) => access._id !== accessId));
        }
      })
      .catch((error) => {
        console.error('Error deleting access:', error);
      });
  };
  

  const handleAccessChange = (field: string, value: string) => {
    if (selectedAccess) {
      setSelectedAccess({ ...selectedAccess, [field]: value });
    }
  };

  const saveChanges = () => {
    // Aquí irá la lógica para guardar los cambios en la base de datos
    toggle();
  };

  return (
    <DashboardLayout>
      <Container className={styles.container}>
        <h2 className={styles.heading}>Accesses</h2>
        <div className={styles.tableContainer}>
          <Table striped bordered hover className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accesses.map((access) => (
                <tr key={access.name}>
                  <td className={styles.tableData}>{access.name}</td>
                  <td className={styles.tableData}>{access.description}</td>
                  <td>
                  <div className={styles.buttonContainer}>
                    <Button variant="warning" onClick={() => handleEdit(access)} className={styles.button}>
                      Editar
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(access)} className={styles.button}>
                      Eliminar
                    </Button>
                  </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Modal isOpen={modal} toggle={toggle} className={styles.modal}>
          <div className={styles.modalContainer}>
            <ModalHeader toggle={toggle}>Edit Access</ModalHeader>
            <ModalBody>
              <div className={styles.editContainer}>
                <FormGroup>
                  <Label for="accessName" className={styles.editContainerLabel}>Name</Label>
                  <Input
                    type="text"
                    name="accessName"
                    value={selectedAccess?.name || ""}
                    onChange={(e) => handleAccessChange("name", e.target.value)}
                    className={styles.editContainerInput}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="accessDescription" className={styles.editContainerLabel}>Description</Label>
                  <Input
                    type="text"
                    name="accessDescription"
                    value={selectedAccess?.description || ""}
                    onChange={(e) => handleAccessChange("description", e.target.value)}
                    className={styles.editContainerTextarea}
                  />
                </FormGroup>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={saveChanges} className={styles.button}>
                Save Changes
              </Button>
              <Button color="secondary" onClick={toggle} className={styles.button}>
                Cancel
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      </Container>
    </DashboardLayout>
  );
  
};

export default Access;
