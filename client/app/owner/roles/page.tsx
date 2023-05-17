// roles.tsx
"use client"
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
import styles from "./roles.module.css";

type Role = {
  _id: string;
  name: string;
  description: string;
};

const Roles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [modal, setModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [editedRole, setEditedRole] = useState<Role | null>(null);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/role")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);  // Agrega esta línea
        setRoles(data.data);
      });
  }, []);
  

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setEditedRole(role);
    toggle();
  };

  const handleDelete = (role: Role) => {
    fetch(`http://localhost:3000/api/v1/role/${role._id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setRoles(roles.filter((role) => role._id !== data.data._id));
      });
  };
  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedRole) {
      setEditedRole({ ...editedRole, [name]: value });
    }
  };

  const saveChanges = () => {
    console.log(selectedRole);
    if (selectedRole) {
      const { _id, createdAt, updatedAt, __v, ...updatedRole} = selectedRole; // Excluir las propiedades no permitidas
      fetch(`http://localhost:3000/api/v1/role/${selectedRole._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRole), // Enviar el objeto actualizado sin las propiedades no permitidas
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setRoles((prevRoles) =>
              prevRoles.map((role) =>
                role._id === data.data._id ? data.data : role
              )
            );
            toggle();
          } else {
            console.error('Error updating role:', data.error);
          }
        })
        .catch((error) => {
          console.error('Error updating role:', error);
        });
    }
  };
  
  

  return (
      <DashboardLayout>
        <Container className={styles.container}>
          <h2 className={styles.heading}>Roles</h2>
          <p className={styles.subheading}>Información sobre los roles del sistema. Donde podrás eliminar y editarlos.</p>
          <div className={styles.tableContainer}>
            <Table striped bordered hover className={styles.table}>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th className={styles.actions}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {roles?.map((role) => (
                  <tr key={role.name}>
                    <td><strong>{role.name}</strong></td>
                    <td>{role.description}</td>
                    <td className={styles.actions}>
                      <div className={styles.buttonContainer}>
                        <Button
                          variant="warning"
                          onClick={() => handleEdit(role)}
                          className={styles.button}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(role)}
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
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Editar Rol</ModalHeader>
            <ModalBody>
            <div className={styles.editContainer}>
            <FormGroup>
              <Label for="roleName">Nombre</Label>
              <Input
                type="text"
                name="name"
                value={editedRole?.name || ''}
                onChange={handleRoleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="roleDescription">Descripción</Label>
              <Input
                type="textarea"
                name="description"
                value={editedRole?.description || ''}
                onChange={handleRoleChange}
              />
            </FormGroup>
          </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={saveChanges} className={styles.button}>
                Guardar Cambios
              </Button>
              <Button color="secondary" onClick={toggle} className={styles.button}>
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>
        </Container>
      </DashboardLayout>
    );
};

export default Roles;
