import React, { useState } from "react";
import { Button, Drawer, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";
import { styled } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import BookIcon from "@mui/icons-material/Book";
import HomeIcon from "@mui/icons-material/Home";
import ChairIcon from "@mui/icons-material/Chair";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const HamburgerButton = styled(Button)(({ theme }) => ({
  position: "fixed",
  top: theme.spacing(2),
  left: theme.spacing(2),
  zIndex: 1,
  color: "#fff", // Cambiar el color del icono a blanco
}));

const SidebarContainer = styled("div")(({ theme }) => ({
  width: 250,
  backgroundColor: "#000", // Cambiar el color de fondo a negro
  color: "#fff", // Cambiar el color del texto a blanco
  height: "100vh"
}));

const BottomItem = styled(ListItem)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  width: "100%",
}));

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuItemClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div>
      <HamburgerButton onClick={toggleSidebar}>
        <MenuIcon />
      </HamburgerButton>
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      >
        <SidebarContainer>
          <List>
            <ListItem
              button
              component={Link}
              href="/owner/booking"
              onClick={handleMenuItemClick}
            >
              <div>
                <BookIcon /> {/* Icono de libro */}
              </div>
              <ListItemText primary="Reservas" />
            </ListItem>
            <ListItem
              button
              component={Link}
              href="/owner/propierty"
              onClick={handleMenuItemClick}
            >
              <div>
                <HomeIcon /> {/* Icono de casa */}
              </div>
              <ListItemText primary="Propiedades" />
            </ListItem>
            <ListItem
              button
              component={Link}
              href="/owner/table"
              onClick={handleMenuItemClick}
            >
              <div>
                <ChairIcon /> {/* Icono de silla */}
              </div>
              <ListItemText primary="Mesas" />
            </ListItem>
          </List>
          <ListItem
            button
            component={Link}
            href="/owner"
            onClick={handleMenuItemClick}
          >
            <div>
              <ExitToAppIcon /> {/* Icono genérico de salida */}
            </div>
            <ListItemText primary="Salir" />
          </ListItem>
        </SidebarContainer>
      </Drawer>
    </div>
  );
}

























