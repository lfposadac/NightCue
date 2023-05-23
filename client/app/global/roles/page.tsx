// roles.tsx
"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import rolesImage from '../../../public/images/icon-role.png';
import { parseCookies } from 'nookies'
import { GetServerSidePropsContext } from 'next'
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
  access_ids: string[];
};

type Access = {
  _id: string;
  name: string;
  description: string;
};

const Roles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [access, setAccess] = useState<Record<string, Access>>({});
  const [modal, setModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [editedRole, setEditedRole] = useState<Role | null>(null);

  const toggle = () => {setModal(!modal);}

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/access")
      .then((response) => response.json())
      .then(({ data }) => {
        const accessObj: Record<string, Access> = {};
        data.forEach((element: Access) => {
          const { _id, ...rest } = element;
          accessObj[_id] = rest;
        });
        setAccess(accessObj);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/role")
      .then((response) => response.json())
      .then((data) => {
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
      if (name === "access_ids") {
        // Obtener los access_ids seleccionados
        const selectedAccessIds = Array.from(
          e.target.selectedOptions,
          (option) => option.value
        );
        // Actualizar el arreglo de access_ids en el editedRole
        setEditedRole({ ...editedRole, [name]: selectedAccessIds });
      } else {
        // Manejar los cambios en el nombre y la descripción
        setEditedRole({ ...editedRole, [name]: value });
      }
    }
  };

  const saveChanges = () => {
    if (selectedRole) {
      const { _id, createdAt, updatedAt, __v, ...updatedRole } = editedRole;
      fetch(`http://localhost:3000/api/v1/role/${selectedRole._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRole),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.status === 200) {
            setRoles((prevRoles) =>
              prevRoles.map((role) =>
                role._id === data.data._id ? data.data : role
              )
            );
            toggle();
          } else {
            console.error("Error updating role:", data.error);
          }
        })
        .catch((error) => {
          console.error("Error updating role:", error);
        });
    }
  };
  

  return (
    <DashboardLayout>
      <Container className={styles.container}>
        <img src={rolesImage.src} alt="Roles" className={styles.image} />
        <h2 className={styles.heading}>Roles</h2>
        <p className={styles.subheading}>
          Información sobre los roles del sistema. Donde podrás eliminar y
          editarlos.
        </p>
        <div className={styles.tableContainer}>
          <Table striped bordered hover className={styles.table}>
            <thead >
              <tr className={styles.tr}>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Accesos</th>
                <th className={styles.actions}>Acciones</th>
              </tr>
            </thead>
            <tbody >
              {roles?.map((role) => (
                <tr key={role.name} className={styles.tr}>
                  <td>
                    <strong>{role.name}</strong>
                  </td>
                  <td>{role.description}</td>
                  <td>
                    {role.access_ids?.map((accessId) => {
                      return (
                        <div key={accessId}>{access?.[accessId]?.name}</div>
                      );
                    })}
                  </td>
                  <td className={styles.actions}>
                    <div className={styles.buttonContainer}>
                      <Button
                        variant="warning"
                        onClick={() => handleEdit(role)}
                        className={styles.button}
                      >
                        Editar
                      </Button>
                      <Modal isOpen={modal} toggle={toggle} className={styles.modal}>
                        <div className={styles.overlay}>
                          <div className={styles.editContainer}>
                            <ModalHeader toggle={toggle} className={styles.modalheader}>EDITAR ROL</ModalHeader>
                            <ModalBody>
                              <div className={styles.formContainer}>
                                <FormGroup className={styles.formGroup}>
                                  <Label for="roleName">Nombre</Label>
                                  <Input type="text" name="name" value={editedRole?.name || ""} onChange={handleRoleChange} />
                                </FormGroup>
                                <FormGroup className={styles.formGroup}>
                                  <Label for="roleDescription">Descripción</Label>
                                  <Input type="textarea" name="description" value={editedRole?.description || ""} onChange={handleRoleChange} />
                                </FormGroup>
                                <FormGroup className={styles.formGroup}>
                                  <Label for="roleAccess">Accesos</Label>
                                  <Input type="select" name="access_ids" multiple value={editedRole?.access_ids || []} onChange={handleRoleChange}>
                                    {Object.keys(access).map((accessId) => (
                                      <option key={accessId} value={accessId}>
                                        {access[accessId].name}
                                      </option>
                                    ))}
                                  </Input>
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
                          </div>
                        </div>
                      </Modal>
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
      </Container>
    </DashboardLayout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = parseCookies(context)
  const token = cookies.token

  // Aquí podrías decodificar y verificar el token para 
  // obtener el rol del usuario si es necesario.
  
  if (!token) {
    return {
      redirect: {
        destination: '/', // redirige a la página principal
        permanent: false,
      },
    }
  }

  return {
    props: {}, // Aquí puedes retornar los props que tu página necesita
  };
}

export default Roles;
