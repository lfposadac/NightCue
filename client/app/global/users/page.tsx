"use client"
import DashboardLayout from '@/components/layouts/DashboardLayout';
import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import usersImage from '../../../public/images/icon-user.png';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import styles from './user.module.css';

type User = {
    _id: string;
    roleId: string;
    name: string;
    lastName: string;
    password: string;
    email: string;
    cellphone: string;
    address: string;
};

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [modal, setModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [editedUser, setEditedUser] = useState<User | null>(null);

    const toggle = () => {
      setModal(!modal);
    };

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/user')
        .then((response) => response.json())
        .then((data) => setUsers(data.data));
}, []);

const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditedUser(user);
    toggle();
};

const handleDelete = (user: User) => {
    fetch(`http://localhost:3000/api/v1/user/${user._id}`, {
    method: 'DELETE',
    })
    .then((response) => response.json())
    .then((data) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== data.data._id));
    });
};

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedUser) {
      setEditedUser({ ...editedUser, [name]: value });
    }
  };

  const saveChanges = () => {
    if (selectedUser) {
      const { _id, createdAt, updatedAt,urlProfilePhoto,lastSessionDate,score,status,roleId,password, __v, ...updatedUser } = editedUser;
      fetch(`http://localhost:3000/api/v1/user/${selectedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.status === 200) { // Verifica la estructura de la respuesta
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user._id === data.data._id ? data.data : user
              )
            );
            toggle();
          } else {
            console.error("Error updating user:", data.error);
          }
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
      }
    };
  
  return (
    <DashboardLayout>
      <Container className={styles.container}>
        <img src={usersImage.src} alt="Users" className={styles.image} />
        <h2 className={styles.heading}>Users</h2>
        <p className={styles.subheading}>
          Información sobre los usuarios del sistema.
        </p>
        <div className={styles.tableContainer}>
          <Table striped bordered hover className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Cellphone</th>
                <th>Address</th>
                <th className={styles.actions}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.cellphone}</td>
                  <td>{user.address}</td>
                  <td className={styles.actions}>
                    <div className={styles.buttonContainer}>
                      <Button
                        variant="warning"
                        onClick={() => handleEdit(user)}
                        className={styles.button}
                      >
                        Edit
                      </Button>
                      <Modal isOpen={modal} toggle={toggle}>
                        <div className={styles.overlay}>
                          <div className={styles.editContainer}>
                            <ModalHeader toggle={toggle} className={styles.modalheader}>EDITAR USER</ModalHeader>
                            <ModalBody>
                              <div className={styles.formContainer}>
                                <div className={styles.gridContainer}>
                                  <div className="col">
                                    <FormGroup className={styles.formGroup}>
                                      <Label for="userName">Nombre</Label>
                                      <Input
                                        type="text"
                                        name="name"
                                        value={editedUser?.name || ''}
                                        onChange={handleUserChange}
                                      />
                                    </FormGroup>
                                  </div>
                                  <div className="col">
                                    <FormGroup className={styles.formGroup}>
                                      <Label for="userLastName">Apellidos</Label>
                                      <Input
                                        type="text"
                                        name="lastName"
                                        value={editedUser?.lastName || ''}
                                        onChange={handleUserChange}
                                      />
                                    </FormGroup>
                                  </div>
                                </div>
                                <div className={styles.gridContainer}>
                                  <div className="col">
                                    <FormGroup className={styles.formGroup}>
                                      <Label for="userEmail">Email</Label>
                                      <Input
                                        type="email"
                                        name="email"
                                        value={editedUser?.email || ''}
                                        onChange={handleUserChange}
                                      />
                                    </FormGroup>
                                  </div>
                                  <div className="col">
                                    <FormGroup className={styles.formGroup}>
                                      <Label for="userCellphone">Celular</Label>
                                      <Input
                                        type="text"
                                        name="cellphone"
                                        value={editedUser?.cellphone || ''}
                                        onChange={handleUserChange}
                                      />
                                    </FormGroup>
                                  </div>
                                </div>
                                <FormGroup className={styles.formGroup}>
                                  <Label for="userAddress">Direccion</Label>
                                  <Input
                                    type="text"
                                    name="address"
                                    value={editedUser?.address || ''}
                                    onChange={handleUserChange}
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
                        </div>
                      </Modal>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(user)}
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

export default Users;
