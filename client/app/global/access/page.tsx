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
  _id: string;
  name: string;
  description: string;
};

const Access = () => {
  const [accesses, setAccesses] = useState<Access[]>([]);
  const [modal, setModal] = useState(false);
  const [selectedAccess, setSelectedAccess] = useState<Access | null>(null);
  const [editedAccess, setEditedAccess] = useState<Access | null>(null);
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
    if (selectedAccess) {
      const { _id, createdAt, updatedAt,status, __v, ...updatedAccess } = editedAccess;
      fetch(`http://localhost:3000/api/v1/access/${selectedAccess._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedAccess),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            // Actualizar la lista de accesses con los cambios guardados
            setAccesses((prevAccesses) =>
              prevAccesses.map((access) =>
                access._id === data.data._id ? data.data : access
              )
            );
            toggle();
          } else {
            console.error('Error updating access:', data.error);
          }
        })
        .catch((error) => {
          console.error('Error updating access:', error);
        });
    }
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
                    <Button variant="danger" onClick={() => handleDelete(access._id)} className={styles.button}>
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
                  <Label for="accessName" >Name</Label>
                  <Input
                    type="text"
                    name="Name"
                    value={editedAccess?.name || ""}
                    onChange={handleAccessChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="accessDescription" >Description</Label>
                  <Input
                    type="text"
                    name="Description"
                    value={editedAccess?.description || ""}
                    onChange={handleAccessChange}
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
