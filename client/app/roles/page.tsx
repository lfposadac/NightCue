// roles.tsx
"use client"
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
import styles from "./roles.module.css";

type Role = {
  name: string;
  description: string;
};

const Roles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [modal, setModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/role?get=role")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);  // Agrega esta línea
        setRoles(data.data);
      });
  }, []);
  

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    toggle();
  };

  const handleRoleChange = (value: string) => {
    if (selectedRole) {
      setSelectedRole({ ...selectedRole, name: value });
    }
  };

  const saveChanges = () => {
    if (selectedRole) {
      fetch(`http://localhost:3000/api/v1/role/${selectedRole.name}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedRole),
      })
        .then((response) => response.json())
        .then((data) => {
          setRoles(
            roles.map((role) => (role.name === data.name ? data : role))
          );
          toggle();
        });
    }
  };

  return (
    <Container className={styles.container}>
      <h2 className={styles.heading}>Roles</h2>
      <div className={styles.tableContainer}>
        <Table striped bordered hover className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.name}>
                <td>{role.name}</td>
                <td>{role.description}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(role)}
                    className={styles.button}
                  >
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Editar Rol</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="roleName">Nombre</Label>
            <Input
              type="text"
              name="roleName"
              value={selectedRole?.name || ""}
              onChange={(e) => handleRoleChange(e.target.value)}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={saveChanges}>
            Guardar Cambios
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Roles;
