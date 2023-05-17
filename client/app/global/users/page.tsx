"use client"
import DashboardLayout from '@/components/layouts/DashboardLayout';
import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
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

    const toggle = () => setModal(!modal);

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
      fetch(`http://localhost:3000/api/v1/user/${selectedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedUser),
      })
        .then((response) => response.json())
        .then((data) => {
          setUsers((prevUsers) =>
            prevUsers.map((user) => (user._id === data._id ? data : user))
          );
          toggle();
        });
    }
  };
  return (
    <DashboardLayout>
      <Container className={styles.container}>
        <h2 className={styles.heading}>Users</h2>
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
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Edit User</ModalHeader>
          <ModalBody>
            <div className={styles.editContainer}>
              <FormGroup>
                <Label for="userName">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={editedUser?.name || ''}
                  onChange={handleUserChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="userLastName">Last Name</Label>
                <Input
                  type="text"
                  name="lastName"
                  value={editedUser?.lastName || ''}
                  onChange={handleUserChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="userEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={editedUser?.email || ''}
                  onChange={handleUserChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="userCellphone">Cellphone</Label>
                <Input
                  type="text"
                  name="cellphone"
                  value={editedUser?.cellphone || ''}
                  onChange={handleUserChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="userAddress">Address</Label>
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
        </Modal>
      </Container>
    </DashboardLayout>
  );
};

export default Users;
