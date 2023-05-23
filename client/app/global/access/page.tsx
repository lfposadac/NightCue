"use client";
import DashboardLayout from '@/components/layouts/DashboardLayout';
import React, { useState, useEffect, ChangeEvent } from "react";
import { Container, Table, Button } from "react-bootstrap";
import accessImage from '../../../public/images/icon-access1.png';
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

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/access")
      .then((response) => response.json())
      .then((data) => setAccesses(data.data));
  }, []);

  const toggle = () => setModal(!modal);

  const handleEdit = (access: Access) => {
    setSelectedAccess(access);
    setEditedAccess({ ...access });
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

  const handleAccessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedAccess) {
      setEditedAccess({ ...editedAccess, [name]: value });
    }
  };

  const saveChanges = () => {
    if (selectedAccess) {
      const { _id,createdAt,updatedAt,__v, ...updatedFields } = selectedAccess; // Desestructurar el campo _id y crear un nuevo objeto sin el campo _id
      fetch(`http://localhost:3000/api/v1/access/${selectedAccess._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields), // Enviar el nuevo objeto sin el campo _id
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
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
      <img src={accessImage.src} alt="Access" className={styles.image} />
        <h2 className={styles.heading}>Accesos</h2>
        <div className={styles.tableContainer}>
          <Table striped bordered hover className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th className={styles.actions}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accesses.map((access) => (
                <tr key={access._id} className={styles.tr}>
                  <td>
                    <strong>{access.name}</strong>
                  </td>
                  <td>{access.description}</td>
                  <td className={styles.actions}>
                    <div className={styles.buttonContainer}>
                      <Button
                        variant="warning"
                        onClick={() => handleEdit(access)}
                        className={styles.button}
                      >
                        Edit
                      </Button>
                      <Modal isOpen={modal} toggle={toggle} className={styles.modal}>
                        <div className={styles.overlay}>
                          <div className={styles.editContainer}>
                            <ModalHeader toggle={toggle} className={styles.modalheader}>
                              EDIT ACCESS
                            </ModalHeader>
                            <ModalBody>
                              <div className={styles.formContainer}>
                                <FormGroup className={styles.formGroup}>
                                  <Label for="accessName">Nombre</Label>
                                  <Input type="text" name="name" value={editedAccess?.name || ""} onChange={handleAccessChange} />
                                </FormGroup>
                                <FormGroup className={styles.formGroup}>
                                  <Label for="accessDescription">Description</Label>
                                  <Input type="text" name="description" value={editedAccess?.description || ""} onChange={handleAccessChange} />
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
                                onClick={toggle}
                                className={styles.button}
                              >
                                Cancel
                              </Button>
                            </ModalFooter>
                          </div>
                        </div>
                      </Modal>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(access._id)}
                        className={styles.button}
                      >
                        Delete
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

export default Access;
