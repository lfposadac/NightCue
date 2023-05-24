"use client";
import React from "react";
import OwnerLayout from "@/components/layouts/OwnerLayout";
import { Typography, Grid, Box } from "@mui/material";
import { styled } from "@mui/system";
import ChairIcon from "@mui/icons-material/Chair";
import BookIcon from "@mui/icons-material/Book";
import HouseIcon from "@mui/icons-material/House";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import Link from "next/link";

const WelcomeContainer = styled("div")(({ theme }) => ({
  color: "#fff",
  padding: theme.spacing(2),
  textAlign: "center",
}));

const InfoContainer = styled("div")(({ theme }) => ({
  backgroundColor: "#333",
  color: "#fff",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  textAlign: "center",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#444",
    borderRadius: theme.spacing(1),
  },
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
}));

const Dashboard: React.FC = () => {
  return (
    <OwnerLayout>
      <ContentContainer>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <WelcomeContainer>
              <Typography
                variant="h2"
                style={{ backgroundColor: "transparent" }}
              >
                BIENVENIDO AL PANEL DE OWNER
              </Typography>
            </WelcomeContainer>
          </Grid>
          {/* <Grid item xs={12} sm={4}>
            <Link href="/owner/table" passHref>
              <InfoContainer>
                <ChairIcon fontSize="large" />
                <Typography variant="h4">MESAS</Typography>
                <Typography variant="body1">Información sobre las mesas en el sistema.</Typography>
              </InfoContainer>
            </Link>
          </Grid> */}
          <Grid item xs={12} sm={4}>
            <Link href="/owner/booking" passHref>
              <InfoContainer>
                <BookIcon fontSize="large" />
                <Typography variant="h4">RESERVAS</Typography>
                <Typography variant="body1">
                  Información sobre las reservas en el sistema.
                </Typography>
              </InfoContainer>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Link href="/owner/music" passHref>
              <InfoContainer>
                <ReportProblemIcon fontSize="large" />
                <Typography variant="h4">BOTON DE ALERTA</Typography>
                <Typography variant="body1">ALERTA.</Typography>
              </InfoContainer>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Link href="/owner/music" passHref>
              <InfoContainer>
                <LibraryMusicIcon fontSize="large" />
                <Typography variant="h4">LISTA DE CANCIONES</Typography>
                <Typography variant="body1">
                  Acá podes encontrar la lista de canciones
                </Typography>
              </InfoContainer>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Link href="/owner/propierty" passHref>
              <InfoContainer>
                <HouseIcon fontSize="large" />
                <Typography variant="h4">PROPIEDADES</Typography>
                <Typography variant="body1">
                  Información sobre las propiedades registradas.
                </Typography>
              </InfoContainer>
            </Link>
          </Grid>
        </Grid>
      </ContentContainer>
    </OwnerLayout>
  );
};

export default Dashboard;
