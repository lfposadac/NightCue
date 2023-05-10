"use client";
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
    <Container className={styles.container}>
      <h2 className={styles.heading}>Accesses</h2>
      <div className={styles.tablecontainer}>
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
                  <Button variant="warning" onClick={() => handleEdit(access)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal isOpen={modal} toggle={toggle} className={styles.modal}>
        <div className="modal-content">
          <ModalHeader toggle={toggle}>Edit Access</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="accessName">Name</Label>
              <Input
                type="text"
                name="accessName"
                value={selectedAccess?.name || ""}
                onChange={(e) => handleAccessChange("name", e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="accessDescription">Description</Label>
              <Input
                type="text"
                name="accessDescription"
                value={selectedAccess?.description || ""}
                onChange={(e) =>
                  handleAccessChange("description", e.target.value)
                }
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={saveChanges}>
              Save Changes
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </Container>
  );
};

export default Access;
