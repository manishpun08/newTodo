import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Component/Header';
import CustomSnackbar from '../Component/CustomSnackbar';
import AuthGuard from '../guards/AuthGuard';

const MainLayout = () => {
  return (
    <>
      <AuthGuard>
        <Header />
        <Outlet />
        <CustomSnackbar />
      </AuthGuard>
    </>
  );
};

export default MainLayout;
