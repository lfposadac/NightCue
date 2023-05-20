import React, { useState } from "react";
import { Button, Drawer, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";
import { styled } from "@mui/system";

const HamburgerButton = styled(Button)(({ theme }) => ({
  position: "fixed",
  top: theme.spacing(2),
  left: theme.spacing(2),
  zIndex: 1,
}));

const SidebarContainer = styled("div")(({ theme }) => ({
  width: 250,
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
        <div></div>
        <div></div>
        <div></div>
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
              onClick={handleMenuItemClick}
              component={Link}
              href="/owner/booking"
            >
              <ListItemText primary="Booking" />
            </ListItem>
            <ListItem
              button
              onClick={handleMenuItemClick}
              component={Link}
              href="/owner/propierty"
            >
              <ListItemText primary="Propiedades" />
            </ListItem>
            <ListItem
              button
              onClick={handleMenuItemClick}
              component={Link}
              href="/owner/table"
            >
              <ListItemText primary="Mesas" />
            </ListItem>
            <ListItem
              button
              onClick={handleMenuItemClick}
              component={Link}
              href="/"
            >
              <ListItemText primary="Home" />
            </ListItem>
          </List>
        </SidebarContainer>
      </Drawer>
    </div>
  );
} 
