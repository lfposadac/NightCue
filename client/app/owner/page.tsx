"use client"
import React from 'react';
import OwnerLayout from '@/components/layouts/OwnerLayout';
import { Typography, Grid, useMediaQuery } from '@mui/material';
import { styled, ThemeProvider } from '@mui/system';
import Sidebar from '@/components/sidebarOwner/Sidebar';
import ChairIcon from '@mui/icons-material/Chair';
import BookIcon from '@mui/icons-material/Book';
import HouseIcon from '@mui/icons-material/House';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

const WelcomeContainer = styled('div')(({ theme }) => ({
  color: '#fff',
  padding: theme.spacing(2),
  textAlign: 'center',
}));

const InfoContainer = styled('div')(({ theme }) => ({
  backgroundColor: '#333',
  color: '#fff',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  textAlign: 'center',
  borderRadius: theme.spacing(1),
}));

const ContentContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh', // Establece la altura mínima de la pantalla para centrar el contenido verticalmente
}));

const Dashboard: React.FC = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
      <OwnerLayout>
        <ContentContainer>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <WelcomeContainer>
                <Typography variant={isSmallScreen ? 'h4' : 'h2'} style={{ backgroundColor: 'transparent' }}>
                  BIENVENIDO AL PANEL DE OWNER
                </Typography>
              </WelcomeContainer>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InfoContainer>
                <ChairIcon fontSize="large" />
                <Typography variant={isSmallScreen ? 'h6' : 'h4'}>MESAS</Typography>
                <Typography variant="body1">Información sobre las mesas en el sistema.</Typography>
              </InfoContainer>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InfoContainer>
                <BookIcon fontSize="large" />
                <Typography variant={isSmallScreen ? 'h6' : 'h4'}>RESERVAS</Typography>
                <Typography variant="body1">Información sobre las reservas en el sistema.</Typography>
              </InfoContainer>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InfoContainer>
                <HouseIcon fontSize="large" />
                <Typography variant={isSmallScreen ? 'h6' : 'h4'}>PROPIEDADES</Typography>
                <Typography variant="body1">Información sobre las propiedades registradas.</Typography>
              </InfoContainer>
            </Grid>
          </Grid>
        </ContentContainer>
      </OwnerLayout>
    </ThemeProvider>
  );
};

export default Dashboard;












